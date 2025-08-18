import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, Bot, User, Edit, Check, Sparkles, Wand2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOpenAIChat } from "@/hooks/use-openai-chat";



interface ProposalGeneratorProps {
  initialDescription: string;
  onProposalGenerated: (proposal: string) => void;
}

const ProposalGenerator = ({ initialDescription, onProposalGenerated }: ProposalGeneratorProps) => {
  const {
    messages,
    isLoading: isChatLoading,
    error: chatError,
    sendMessage,
    generateProposal,
    resetChat
  } = useOpenAIChat(initialDescription);

  const [currentMessage, setCurrentMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [editedProposal, setEditedProposal] = useState('');
  const [showProposal, setShowProposal] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);



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

  // Initialize chat with first message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      // Send initial context to OpenAI
      sendMessage("Olá! Estou aqui para refinar minha ideia de projeto. Aqui está minha descrição inicial: " + initialDescription);
    }
  }, []); // Run only once when component mounts

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isChatLoading) return;

    const messageToSend = currentMessage;
    setCurrentMessage('');
    
    try {
      await sendMessage(messageToSend);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    setProposalError(null);
    
    try {
      // Generate proposal using OpenAI
      const proposal = await generateProposal(messages);
      setGeneratedProposal(proposal);
      setEditedProposal(proposal);
      setShowProposal(true);
    } catch (error) {
      console.error('Erro ao gerar proposta:', error);
      setProposalError(error instanceof Error ? error.message : 'Erro ao gerar proposta');
    } finally {
      setIsGenerating(false);
    }
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
              
              {(isChatLoading || isGenerating) && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 mr-2">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">
                        {isGenerating ? 'Gerando proposta...' : 'Pensando...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Error Display */}
          {(chatError || proposalError) && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {chatError || proposalError}
              </AlertDescription>
            </Alert>
          )}

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
                  disabled={isChatLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isChatLoading}
                  size="lg"
                >
                  {isChatLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send size={16} />
                  )}
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
