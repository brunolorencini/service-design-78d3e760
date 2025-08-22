import { Zap, Lightbulb, Shield, TrendingUp } from "lucide-react";

const Expertise = () => {
  const benefits = [
    {
      icon: Zap,
      title: "🚀 Velocidade de entrega",
      description: "Você foca em captar clientes, eu garanto que os projetos não travam",
      color: "text-primary"
    },
    {
      icon: Lightbulb,
      title: "💡 Execução criativa",
      description: "Cada entrega melhora a percepção da sua agência no mercado",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "🔒 Confiança",
      description: "Você apresenta resultados previsíveis, não desculpas",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "⚡ Escalabilidade real",
      description: "Mais clientes sem aumentar a dor de cabeça, com processos automatizados que funcionam no piloto automático",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            O que sua{" "}
            <span className="text-gradient">agência ganha</span>{" "}
            comigo
          </h2>
          <p className="text-xl text-muted-foreground">
            Enquanto você cuida do estratégico, eu cuido da execução 
            que faz seus clientes renovarem contratos
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="card-gradient rounded-2xl p-6 hover-lift group transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${benefit.color} mb-6 transition-transform group-hover:scale-110`}>
                <benefit.icon size={32} />
              </div>
              
              <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Decorative element */}
              <div className={`w-8 h-1 ${benefit.color.replace('text-', 'bg-')} rounded-full mt-4 transition-all group-hover:w-12`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;