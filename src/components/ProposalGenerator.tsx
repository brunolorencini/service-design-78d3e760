import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Edit, Check, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ProposalGeneratorProps {
  initialDescription: string;
  onProposalGenerated: (proposal: string) => void;
}

const ProposalGenerator = ({ initialDescription, onProposalGenerated }: ProposalGeneratorProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [editedProposal, setEditedProposal] = useState('');
  const [showProposal, setShowProposal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  // Simulate AI responses focused on refinement
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "Excelente! 🎯 Agora me conte: qual é o principal resultado que você espera alcançar com este projeto?",
      "Perfeito! Para refinar ainda mais sua proposta, que tipo de usuários você quer impactar especificamente?",
      "Ótimo insights! 💡 Qual seria o diferencial único que seu projeto teria no mercado?",
      "Muito bom! Para finalizar o refinamento, você tem alguma inspiração ou referência em mente?",
      "Fantástico! 🚀 Com essas informações vou criar uma proposta refinada que vai destacar todo o potencial da sua ideia...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Typewriter effect hook
  const useTypewriter = (text: string, speed: number = 30) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      if (!text) return;
      
      setDisplayText('');
      setIsComplete(false);
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    }, [text, speed]);

    return { displayText, isComplete };
  };

  // Generate detailed proposal simulation
  const generateDetailedProposal = () => {
    const proposal = `
## Proposta Refinada: ${getProjectTitle()}

### ✨ Resumo Executivo Aprimorado
Após nossa conversa de refinamento, sua ideia original foi elevada a um novo patamar! Desenvolvi uma proposta estratégica que maximiza o potencial do seu conceito.

### 📋 Escopo do Projeto

**Fase 1: Planejamento & Design (2-3 semanas)**
• Pesquisa de mercado e análise de concorrentes
• Arquitetura da informação e fluxos de usuário
• Design UI/UX responsivo e moderno
• Prototipação interativa

**Fase 2: Desenvolvimento (4-6 semanas)**
• Desenvolvimento frontend com tecnologias modernas
• Integração com APIs e banco de dados
• Implementação de funcionalidades core
• Testes e otimização de performance

**Fase 3: Lançamento & Suporte (1-2 semanas)**
• Deploy em ambiente de produção
• Configuração de analytics e monitoramento
• Treinamento e documentação
• Suporte pós-lançamento

### 💡 Diferenciais Técnicos
✨ Interface moderna e intuitiva
🚀 Performance otimizada para SEO
📱 Totalmente responsivo
🔒 Segurança e proteção de dados
⚡ Carregamento ultra-rápido

### 📈 Resultados Esperados
• Aumento de 40-60% no engajamento
• Melhoria na experiência do usuário
• Redução de 50% no tempo de carregamento
• Interface preparada para crescimento

### 💰 Investimento
O projeto será desenvolvido com dedicação total, utilizando as melhores práticas e tecnologias do mercado.

**Valor total: A partir de R$ 15.000**
*Parcelamento em até 6x sem juros*

### 🎁 Bônus Inclusos
• Domínio e hospedagem por 1 ano
• SSL certificado
• Backup automático
• 30 dias de suporte gratuito

---

**Próximos Passos:**
1. Aprovação da proposta
2. Assinatura do contrato
3. Início imediato do projeto

*Esta proposta é válida por 15 dias e pode ser personalizada conforme suas necessidades específicas.*
    `.trim();

    return proposal;
  };

  const getProjectTitle = () => {
    const titles = [
      "Plataforma Digital Inovadora",
      "Solução Web Personalizada", 
      "Sistema Inteligente",
      "Aplicação Web Moderna"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const { displayText: typedProposal, isComplete: typingComplete } = useTypewriter(
    showProposal ? generatedProposal : '', 
    20
  );

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, typedProposal]);

  // Initialize with user's description
  useEffect(() => {
    if (initialDescription && messages.length === 0) {
      const initialMessage: Message = {
        id: '1',
        type: 'user',
        content: initialDescription,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      
      // Add AI welcome response
      setTimeout(() => {
        const aiResponse: Message = {
          id: '2',
          type: 'ai',
          content: "Olá! Sua ideia já está muito boa! 🎯 Como especialista em refinamento de propostas, vou fazer algumas perguntas para deixá-la ainda mais poderosa e detalhada. Pronto para elevar sua proposta ao próximo nível?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  }, [initialDescription, messages.length]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(currentMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000 + Math.random() * 1000);
  };

  const handleGenerateProposal = () => {
    setIsGenerating(true);
    
    // Add final AI message
    const finalMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: "Perfeito! 🎉 Agora vou refinar e potencializar sua ideia original. Com base em nossa conversa, vou criar uma proposta estratégica que vai impressionar. Preparando sua proposta refinada...",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, finalMessage]);

    // Generate proposal after delay
    setTimeout(() => {
      const proposal = generateDetailedProposal();
      setGeneratedProposal(proposal);
      setEditedProposal(proposal);
      setShowProposal(true);
      setIsGenerating(false);
    }, 3000);
  };

  const handleEditProposal = () => {
    setIsEditingProposal(true);
  };

  const handleSaveProposal = () => {
    setGeneratedProposal(editedProposal);
    setIsEditingProposal(false);
  };

  const handleApproveProposal = () => {
    onProposalGenerated(editedProposal);
  };

  return (
    <div className="space-y-6">
      {/* Chat Interface */}
      <Card className="card-gradient">
        <CardHeader>
                      <CardTitle className="flex items-center gap-2">
            <Bot className="text-primary" size={24} />
            Assistente de Refinamento IA
            <Sparkles className="text-yellow-500" size={20} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    message.type === 'user' ? "ml-auto" : "mr-auto"
                  )}
                >
                  <Avatar className={cn(
                    "w-8 h-8",
                    message.type === 'user' ? "order-2" : ""
                  )}>
                    <AvatarFallback className={cn(
                      message.type === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                    )}>
                      {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={cn(
                    "rounded-lg p-3 prose prose-sm max-w-none",
                    message.type === 'user'
                      ? "bg-primary text-primary-foreground ml-2"
                      : "bg-muted mr-2"
                  )}>
                    <p className="m-0 whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 mr-2">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">Gerando proposta...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          {!showProposal && (
            <div className="mt-4 space-y-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Digite sua resposta aqui..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  size="lg"
                >
                  <Send size={16} />
                </Button>
              </div>
              
              {messages.length >= 4 && (
                <div className="text-center">
                  <Button 
                    onClick={handleGenerateProposal}
                    variant="hero"
                    size="lg"
                    disabled={isGenerating}
                    className="min-w-[200px]"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} className="mr-2" />
                        Gerar Proposta
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Proposal */}
      {showProposal && (
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={24} />
                Sua Proposta Refinada ✨
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEditProposal}
                  disabled={isEditingProposal}
                >
                  <Edit size={16} className="mr-1" />
                  Editar
                </Button>
                {isEditingProposal && (
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={handleSaveProposal}
                  >
                    <Check size={16} className="mr-1" />
                    Salvar
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditingProposal ? (
              <Textarea
                value={editedProposal}
                onChange={(e) => setEditedProposal(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
              />
            ) : (
              <div 
                ref={typewriterRef}
                className="prose prose-lg max-w-none min-h-[500px] p-4 bg-muted/50 rounded-lg"
              >
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {typedProposal}
                  {!typingComplete && <span className="animate-pulse">▋</span>}
                </pre>
              </div>
            )}
            
            {typingComplete && !isEditingProposal && (
              <div className="mt-6 text-center">
                <Button 
                  onClick={handleApproveProposal}
                  variant="hero"
                  size="lg"
                  className="min-w-[200px]"
                >
                  <Check size={20} className="mr-2" />
                  Aprovar e Enviar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProposalGenerator;
