import { Users, Target, Palette, Trophy } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: Users,
      title: "Integração",
      description: "Você me apresenta o cliente e o escopo. Entendo as expectativas e deadlines.",
      color: "primary"
    },
    {
      number: "02", 
      icon: Target,
      title: "Estratégia",
      description: "Defino plano de execução com dados, visão criativa e automações que aceleram a entrega.",
      color: "secondary"
    },
    {
      number: "03",
      icon: Palette,
      title: "Produção",
      description: "Entrego design, analytics, Vibe Coding e N8N rodando. Tudo testado e aprovado.",
      color: "accent"
    },
    {
      number: "04",
      icon: Trophy,
      title: "Resultados",
      description: "Você apresenta ao cliente com orgulho (e sem atraso). Eu fico nos bastidores.",
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
            Como{" "}
            <span className="text-gradient">funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Um processo transparente que não atrapalha sua rotina. 
            Você cuida dos clientes, eu cuido da execução.
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
            <h3 className="text-2xl font-bold mb-6">Quem já trabalhou comigo sabe</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <span><strong>50+ projetos entregues.</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <span><strong>9 anos ajudando agências e empresas a não perderem clientes por falha de execução.</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <span><strong>Atuação discreta: eu entrego, você leva o crédito.</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;