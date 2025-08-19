import { Monitor, Mail, Share2, Instagram, BarChart3, Target, Code, Megaphone, Route, Users, TrendingUp, GitBranch, Lightbulb, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const Services = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainServices = [
    {
      icon: Monitor,
      title: "Landing Pages",
      description: "Páginas de alta conversão que transformam visitantes em clientes",
      features: ["Design responsivo", "Otimização de conversão", "Integração com analytics"]
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Campanhas estratégicas que nutrem relacionamentos e geram vendas",
      features: ["Automação de emails", "Segmentação avançada", "Templates personalizados"]
    },
    {
      icon: Share2,
      title: "Social Media",
      description: "Estratégias que conectam sua marca com o público certo",
      features: ["Estratégia de conteúdo", "Calendário editorial", "Análise de performance"]
    },
    {
      icon: Instagram,
      title: "Design para Instagram",
      description: "Feed visual impactante que destaca sua marca nas redes sociais",
      features: ["Templates únicos", "Stories animados", "Posts engajadores"]
    },
    {
      icon: BarChart3,
      title: "Implementação de Analytics",
      description: "Dados precisos para decisões inteligentes e crescimento sustentável",
      features: ["Google Analytics 4", "Eventos personalizados", "Relatórios detalhados"]
    },
    {
      icon: Target,
      title: "Pixel & Tracking",
      description: "Rastreamento completo para otimizar campanhas e maximizar ROI",
      features: ["Facebook Pixel", "Conversions API", "Otimização de campanhas"]
    },
    {
      icon: Users,
      title: "User Research & UX Discovery",
      description: "Entrevistas, testes e análise de comportamento para descobrir necessidades reais",
      features: ["Lançamento de novos serviços", "Identificação de oportunidades", "Compreensão do churn"]
    },
    {
      icon: TrendingUp,
      title: "Data Analysis for Experience",
      description: "Transformo dados em decisões acionáveis usando Analytics e heatmaps",
      features: ["Decisões baseadas em evidências", "Diagnósticos de performance", "Monitoramento de KPIs"]
    },
    {
      icon: Megaphone,
      title: "Consultoria Digital",
      description: "Estratégias personalizadas para acelerar seu crescimento online",
      features: ["Auditoria digital", "Plano de ação", "Mentoria especializada"]
    }
  ];

  const corporateServices = [
    {
      icon: GitBranch,
      title: "Service Blueprints & Architecture",
      description: "Blueprints visuais que alinham frontstage e backstage para experiências consistentes",
      features: ["Escalar produtos digitais", "Serviços mais consistentes", "Alinhar equipes internas"]
    },
    {
      icon: Lightbulb,
      title: "Workshop Facilitation & Co-creation",
      description: "Facilito workshops para acelerar soluções e gerar alinhamento entre equipes",
      features: ["Design Sprint", "Alinhamento multidisciplinar", "Resolução colaborativa"]
    },
    {
      icon: Route,
      title: "Journey Mapping & Experience Redesign",
      description: "Mapeamento completo da jornada do usuário para resolver problemas de experiência",
      features: ["Onboarding confuso", "Funis com alta taxa de desistência", "Experiências desconectadas"]
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
            <span className="text-sm font-medium tracking-wider uppercase">Serviços Especializados</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Soluções completas para{" "}
            <span className="text-gradient">impulsionar</span>{" "}
            seu negócio
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Trabalho com as principais ferramentas e estratégias do mercado digital 
            para entregar resultados que realmente importam para seu crescimento.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <div 
              key={service.title}
              className="card-gradient rounded-2xl p-6 hover-lift group transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-xl mb-4 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <service.icon className="text-primary" size={24} />
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
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Corporate Services Collapsible */}
        <div className="mb-16">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full md:w-auto mx-auto flex items-center gap-2 mb-8 hover:bg-primary/5 transition-all duration-300"
              >
                <Target size={20} />
                <span className="font-semibold">Soluções Corporate</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </CollapsibleContent>
          </Collapsible>
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