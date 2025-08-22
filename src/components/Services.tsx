import { BarChart3, Palette, Settings, Code, Zap, ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const corporateServices = [
    {
      icon: BarChart3,
      title: "📊 Analytics",
      description: "Dados sólidos para provar ROI aos seus clientes",
      features: ["Google Analytics 4 configurado", "Eventos personalizados", "Relatórios de performance", "Dashboards executivos"]
    },
    {
      icon: Palette,
      title: "🎨 Design",
      description: "Visuais impactantes que valorizam sua entrega",
      features: ["Interfaces modernas", "Protótipos interativos", "Design systems", "Otimização de conversão"]
    },
    {
      icon: Settings,
      title: "📈 Product Management",
      description: "Processos ágeis que eliminam gargalos",
      features: ["Roadmaps estratégicos", "Sprint planning", "User stories", "Métricas de produto"]
    },
    {
      icon: Code,
      title: "💻 Vibe Coding",
      description: "Protótipos funcionais e integrações modernas que tiram ideias do papel",
      features: ["Protótipos funcionais", "Integrações APIs", "MVPs rápidos", "Sem depender de devs tradicionais"]
    },
    {
      icon: Zap,
      title: "⚙️ Automação com N8N",
      description: "Fluxos inteligentes que aceleram tarefas repetitivas e reduzem custos",
      features: ["Workflows automatizados", "Integrações entre sistemas", "Redução de custos operacionais", "Processos no piloto automático"]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-secondary mb-6">
            <Target size={20} />
            <span className="text-sm font-medium tracking-wider uppercase">Porque você precisa de mim</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Sua agência é boa em{" "}
            <span className="text-gradient">ideias</span>.{" "}
            Mas perde velocidade na{" "}
            <span className="text-gradient">execução</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Eu sou o parceiro invisível que faz seus projetos chegarem ao mercado 
            sem atrasos, sem retrabalho e sem aquela correria que queima sua equipe.
          </p>
        </div>

        {/* Corporate Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {corporateServices.map((service, index) => (
            <div 
              key={service.title}
              className="card-gradient rounded-2xl p-6 hover-lift group transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/20 rounded-xl mb-4 group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                <service.icon className="text-secondary" size={24} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 card-gradient rounded-2xl p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full">
              <Target className="text-primary" size={20} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg mb-1">Não encontrou o que precisa?</h3>
              <p className="text-muted-foreground text-sm">
                Trabalho com soluções personalizadas para cada projeto. Vamos conversar!
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://wa.me/351934078424" target="_blank" rel="noopener noreferrer">
                Conversar
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;