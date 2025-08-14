import { MessageCircle, Search, Palette, Rocket } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Conversa",
      description: "Você me conta sua ideia e eu entendo exatamente o que você precisa",
      color: "primary"
    },
    {
      number: "02", 
      icon: Search,
      title: "Análise",
      description: "Estudo seu mercado e seus clientes para criar a melhor estratégia",
      color: "secondary"
    },
    {
      number: "03",
      icon: Palette,
      title: "Criação",
      description: "Desenho e desenvolvo seu projeto com foco na experiência do usuário",
      color: "accent"
    },
    {
      number: "04",
      icon: Rocket,
      title: "Lançamento",
      description: "Seu projeto sai do papel e chega ao mundo pronto para conquistar",
      color: "primary"
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="bg-primary/20 rounded"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como funciona o{" "}
            <span className="text-gradient">processo</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Um processo simples e transparente para tirar sua ideia do papel
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-4 z-0"></div>
              )}
              
              <div className="card-gradient rounded-2xl p-8 text-center hover-lift relative z-10">
                {/* Step Number */}
                <div className={`text-${step.color} text-sm font-bold tracking-wider mb-4`}>
                  PASSO {step.number}
                </div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${step.color}/20 rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`text-${step.color}`} size={28} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {/* Progress indicator */}
                <div className={`w-8 h-1 bg-${step.color} rounded-full mx-auto mt-6`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-gradient rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-muted-foreground mb-6">
              O primeiro passo é simples: vamos conversar sobre sua ideia
            </p>
            <div className="text-sm text-primary">
              ⏱️ Resposta em até 24 horas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;