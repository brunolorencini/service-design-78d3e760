import { useState } from 'react';

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

  // Use secure API route instead of direct OpenAI calls

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

      // Call secure API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.length === 0 
            ? [{ type: 'user', content: messageContent }]
            : conversationHistory,
          type: 'chat'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro na comunicação com o servidor');
      }

      const data = await response.json();
      const aiResponse = data.response || 'Desculpe, não consegui processar sua mensagem.';

      // Add AI response
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAiMessage]);

    } catch (err) {
      console.error('Erro ao comunicar com API:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar mensagem');
    } finally {
      setIsLoading(false);
    }
  };

  const generateProposal = async (conversationHistory: Message[]): Promise<string> => {
    try {
      // Call secure API route for proposal generation
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { type: 'user', content: `Ideia inicial: ${initialDescription}` },
            ...conversationHistory
          ],
          type: 'proposal'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro na comunicação com o servidor');
      }

      const data = await response.json();
      return data.response || 'Erro ao gerar proposta.';

    } catch (err) {
      console.error('Erro ao gerar proposta:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao gerar proposta. Tente novamente.');
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
