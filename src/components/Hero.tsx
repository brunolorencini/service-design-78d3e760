import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-20"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4 mt-5">
              <div className="flex items-center gap-2 text-secondary">
                <Sparkles size={20} />
                <span className="text-sm font-medium tracking-wider uppercase">Bruno Lorencini</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Se sua agência não entrega{" "}
                <span className="text-gradient text-glow">rápido</span>{" "}
                e{" "}
                <span className="text-gradient text-glow">bonito</span>,{" "}
                seus clientes vão trocar você
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Eu sou o cara que transforma briefing em resultado real em 
                <strong> semanas — não em meses</strong>. O parceiro invisível 
                que faz seus projetos chegarem ao mercado sem atrasos, 
                sem retrabalho e sem queimar sua equipe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" asChild>
                <a href="https://wa.me/351934078424" target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <a href="https://rebel-dog-6e7.notion.site/Welcome-Bem-vindo-24784a3712c7804988efd15f3ce2a582" target="_blank" rel="noopener noreferrer">
                  Ver portfólio
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projetos entregues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">24h</div>
                <div className="text-sm text-muted-foreground">Resposta garantida</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">9</div>
                <div className="text-sm text-muted-foreground">Anos de experiência</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden elegant-shadow hover-lift">
              <img 
                src={heroIllustration} 
                alt="Service Design Process Illustration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 card-gradient rounded-xl p-4 hover-lift animate-float">
              <div className="text-sm font-medium text-primary">📊 Analytics</div>
              <div className="text-xs text-muted-foreground">Dados sólidos para provar ROI</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 card-gradient rounded-xl p-4 hover-lift animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-sm font-medium text-secondary">🎨 Design</div>
              <div className="text-xs text-muted-foreground">Visuais que valorizam entrega</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;