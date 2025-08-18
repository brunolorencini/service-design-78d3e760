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

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Note: In production, this should be done server-side
  });

  const systemPrompt = `Você é um especialista em refinamento de propostas de projetos digitais. Sua função é:

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

  const sendMessage = async (userMessage: string) => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      setError('Chave da OpenAI não configurada. Adicione VITE_OPENAI_API_KEY no arquivo .env');
      return;
    }

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

      // Prepare conversation history for OpenAI
      const conversationHistory = [
        ...messages,
        newUserMessage
      ].map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      // Add initial context if this is the first message
      const messagesForAPI = messages.length === 0 
        ? [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: `Contexto inicial: O usuário descreveu sua ideia como: "${initialDescription}". Agora ele disse: "${userMessage}". Comece a conversa fazendo perguntas estratégicas para refinar a proposta.` }
          ]
        : [
            { role: 'system' as const, content: systemPrompt },
            ...conversationHistory
          ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Modelo mais econômico e rápido
        messages: messagesForAPI,
        max_tokens: 150,
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';

      // Add AI response
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAiMessage]);

    } catch (err) {
      console.error('Erro ao comunicar com OpenAI:', err);
      setError('Erro ao processar mensagem. Verifique sua chave da API.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateProposal = async (conversationHistory: Message[]): Promise<string> => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('Chave da OpenAI não configurada');
    }

    try {
      // Prepare full conversation context
      const fullContext = `
Ideia inicial: ${initialDescription}

Conversa de refinamento:
${conversationHistory.map(msg => `${msg.type === 'user' ? 'Cliente' : 'Consultor'}: ${msg.content}`).join('\n')}
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: proposalSystemPrompt },
          { role: 'user', content: `Com base nesta conversa de refinamento, crie uma proposta técnica completa e profissional:\n\n${fullContext}` }
        ],
        max_tokens: 2000,
        temperature: 0.3, // Menos criativo, mais focado e consistente
      });

      return completion.choices[0]?.message?.content || 'Erro ao gerar proposta.';

    } catch (err) {
      console.error('Erro ao gerar proposta:', err);
      throw new Error('Erro ao gerar proposta. Tente novamente.');
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
