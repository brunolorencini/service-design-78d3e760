import { BarChart3, Palette, Target, Zap, Users, Lightbulb } from "lucide-react";

const Expertise = () => {
  const skills = [
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Analiso dados para entender o que realmente funciona no seu negócio",
      color: "text-primary"
    },
    {
      icon: Palette,
      title: "Design",
      description: "Crio experiências visuais que seus clientes vão amar e lembrar",
      color: "text-secondary"
    },
    {
      icon: Target,
      title: "Product Management",
      description: "Organizo tudo para que seu projeto saia do papel rapidinho",
      color: "text-accent"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Rapidez",
      description: "Projetos saem do papel em semanas, não meses"
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Trabalhamos juntos em cada etapa do processo"
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Ideias criativas que fazem diferença de verdade"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Como posso ajudar{" "}
            <span className="text-gradient">seu projeto</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Uso três superpoderes para transformar suas ideias em projetos que funcionam de verdade
          </p>
        </div>

        {/* Main Skills */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skills.map((skill, index) => (
            <div 
              key={skill.title}
              className="card-gradient rounded-2xl p-8 hover-lift group"
            >
              <div className={`${skill.color} mb-6 transition-transform group-hover:scale-110`}>
                <skill.icon size={48} />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
              
              {/* Decorative element */}
              <div className={`w-12 h-1 ${skill.color.replace('text-', 'bg-')} rounded-full mt-6 transition-all group-hover:w-16`}></div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Por que trabalhar comigo?</h3>
          <p className="text-muted-foreground text-lg">Porque seu tempo é valioso e seus projetos merecem sair do papel</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="bg-muted/30 backdrop-blur-sm rounded-xl p-6 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <benefit.icon className="text-primary" size={24} />
              </div>
              <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;