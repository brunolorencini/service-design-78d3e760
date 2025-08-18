import { useState } from 'react';
import OpenAI from 'openai';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface UseOpenAIChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  generateProposal: (conversationHistory: Message[]) => Promise<string>;
  resetChat: () => void;
}

export const useOpenAIChat = (initialDescription: string): UseOpenAIChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect if we're in development and can use direct OpenAI calls
  const isDevelopment = import.meta.env.DEV;
  const hasApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // Initialize OpenAI client for local development only
  const openai = isDevelopment && hasApiKey ? new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  }) : null;

  const chatSystemPrompt = `Você é um especialista em refinamento de propostas de projetos digitais. Sua função é:

1. Analisar a ideia inicial do usuário
2. Fazer perguntas estratégicas para entender melhor o projeto
3. Identificar pontos que precisam ser aprofundados
4. Sugerir melhorias e oportunidades

Mantenha um tom profissional, mas amigável. Faça perguntas uma de cada vez e seja específico. 
Foque em entender: público-alvo, objetivos, diferencial competitivo, tecnologias preferidas, e resultados esperados.

Quando o usuário responder suas perguntas, faça follow-ups inteligentes para aprofundar o entendimento.
Limite suas respostas a 2-3 frases por vez para manter a conversa dinâmica.`;

  const proposalSystemPrompt = `Você é um especialista em criação de propostas técnicas para projetos digitais. 
Com base na conversa anterior, crie uma proposta detalhada e profissional que inclua:

1. Resumo executivo
2. Escopo detalhado do projeto  
3. Fases de desenvolvimento
4. Tecnologias recomendadas
5. Cronograma estimado
6. Diferenciais técnicos
7. Resultados esperados
8. Investimento sugerido (baseado no que foi discutido)

Use formatação markdown e seja específico e técnico. A proposta deve ser convincente e profissional.`;

  // Function to call OpenAI directly (local development)
  const callOpenAIDirect = async (messages: any[], isProposal = false) => {
    if (!openai) {
      throw new Error('OpenAI não configurado para desenvolvimento local');
    }

    const systemPrompt = isProposal ? proposalSystemPrompt : chatSystemPrompt;
    const maxTokens = isProposal ? 2000 : 150;
    const temperature = isProposal ? 0.3 : 0.7;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg: any) => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }))
      ],
      max_tokens: maxTokens,
      temperature: temperature,
    });

    return completion.choices[0]?.message?.content || 'Erro ao processar resposta.';
  };

  // Function to call secure API route (production)
  const callAPIRoute = async (messages: any[], type: string) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        type
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro na comunicação com o servidor');
    }

    const data = await response.json();
    return data.response || 'Erro ao processar resposta.';
  };

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message
      const newUserMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: userMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newUserMessage]);

      // Prepare conversation history
      const conversationHistory = [
        ...messages,
        newUserMessage
      ];

      // Add initial context if this is the first message
      const messageContent = messages.length === 0 
        ? `Contexto inicial: O usuário descreveu sua ideia como: "${initialDescription}". Agora ele disse: "${userMessage}". Comece a conversa fazendo perguntas estratégicas para refinar a proposta.`
        : userMessage;

      const messagesToSend = messages.length === 0 
        ? [{ type: 'user', content: messageContent }]
        : conversationHistory;

      let aiResponse: string;

      // Use direct OpenAI call in development, API route in production
      if (isDevelopment && openai) {
        console.log(' Modo desenvolvimento: Usando OpenAI diretamente');
        aiResponse = await callOpenAIDirect(messagesToSend, false);
      } else {
        console.log(' Modo produção: Usando API route segura');
        aiResponse = await callAPIRoute(messagesToSend, 'chat');
      }

      // Add AI response
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAiMessage]);

    } catch (err) {
      console.error('Erro ao comunicar:', err);
      let errorMessage = 'Erro ao processar mensagem';
      
      if (isDevelopment && !hasApiKey) {
        errorMessage = 'Para desenvolvimento local, adicione VITE_OPENAI_API_KEY no arquivo .env.local';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateProposal = async (conversationHistory: Message[]): Promise<string> => {
    try {
      const messagesToSend = [
        { type: 'user', content: `Ideia inicial: ${initialDescription}` },
        ...conversationHistory
      ];

      let response: string;

      // Use direct OpenAI call in development, API route in production
      if (isDevelopment && openai) {
        console.log(' Modo desenvolvimento: Gerando proposta via OpenAI diretamente');
        response = await callOpenAIDirect(messagesToSend, true);
      } else {
        console.log(' Modo produção: Gerando proposta via API route segura');
        response = await callAPIRoute(messagesToSend, 'proposal');
      }

      return response;

    } catch (err) {
      console.error('Erro ao gerar proposta:', err);
      let errorMessage = 'Erro ao gerar proposta. Tente novamente.';
      
      if (isDevelopment && !hasApiKey) {
        errorMessage = 'Para desenvolvimento local, adicione VITE_OPENAI_API_KEY no arquivo .env.local';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    generateProposal,
    resetChat
  };
};
