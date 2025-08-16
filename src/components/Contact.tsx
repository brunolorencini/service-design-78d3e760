import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Calendar, ArrowRight, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useContactForm } from "@/hooks/use-contact-form";
const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  budget: z.string().optional()
});
const Contact = () => {
  const { isLoading, error, success, submitForm, resetForm } = useContactForm();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      description: "",
      budget: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submitForm({
      name: values.name,
      email: values.email,
      project_type: values.projectType,
      description: values.description,
      budget: values.budget
    });
    
    if (success) {
      form.reset();
    }
  };
  const contactMethods = [{
    icon: Mail,
    title: "Email",
    description: "Mande um email com sua ideia",
    action: "Enviar email",
    link: "mailto:bruno.lorencini@gmail.com"
  }, {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Vamos conversar no WhatsApp",
    action: "Iniciar conversa",
    link: "https://wa.me/351934078424"
  }, {
    icon: Calendar,
    title: "Reunião",
    description: "Agende uma reunião online",
    action: "Agendar",
    link: "https://calendly.com/brulorencini/30min"
  }];
  return <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Vamos tirar sua ideia{" "}
            <span className="text-gradient">do papel?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Escolha a forma que preferir para entrar em contato. 
            Prometo responder rapidinho!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map(method => <a key={method.title} href={method.link} className="block card-gradient rounded-2xl p-8 text-center hover-lift group transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary/30 transition-colors">
                <method.icon className="text-primary" size={28} />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{method.title}</h3>
              <p className="text-muted-foreground mb-6">{method.description}</p>
              
              <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                {method.action}
                <ArrowRight size={16} />
              </div>
            </a>)}
        </div>

        {/* Project Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="card-gradient">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl lg:text-4xl font-bold mb-4">
                Conte-me sobre sua <span className="text-gradient">ideia</span>
              </CardTitle>
              <CardDescription className="text-lg">
                Preencha o formulário abaixo e vamos conversar sobre como transformar sua ideia em realidade
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Seu nome</FormLabel>
                          <FormControl>
                            <Input placeholder="João Silva" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="email" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Seu email</FormLabel>
                          <FormControl>
                            <Input placeholder="joao@exemplo.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="projectType" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Tipo de projeto</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website">Website/Landing Page</SelectItem>
                              <SelectItem value="webapp">Aplicação Web</SelectItem>
                              <SelectItem value="ecommerce">E-commerce</SelectItem>
                              <SelectItem value="mobile">App Mobile</SelectItem>
                              <SelectItem value="sistema">Sistema Interno</SelectItem>
                              <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="budget" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Orçamento estimado (opcional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a faixa" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ate-5k">Até R$ 5.000</SelectItem>
                              <SelectItem value="5k-15k">R$ 5.000 - R$ 15.000</SelectItem>
                              <SelectItem value="15k-30k">R$ 15.000 - R$ 30.000</SelectItem>
                              <SelectItem value="30k-plus">Acima de R$ 30.000</SelectItem>
                              <SelectItem value="conversar">Prefiro conversar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  <FormField control={form.control} name="description" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Descrição da sua ideia</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Conte-me sobre sua ideia, objetivos, público-alvo e qualquer detalhe importante que você considera relevante..." className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  {/* Status Messages */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="border-green-200 bg-green-50 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Mensagem enviada com sucesso! Entrarei em contato em breve.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="min-w-[200px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          Enviando...
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </>
                      ) : (
                        <>
                          Enviar proposta
                          <Send size={20} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Main CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="hero-gradient rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 gap-4 h-full rotate-12 scale-150">
                {Array.from({
                length: 24
              }).map((_, i) => <div key={i} className="bg-white/20 rounded"></div>)}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ou prefere conversar direto?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Não tem problema! Escolha a forma que preferir para entrarmos em contato.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <a href="https://wa.me/351934078424" target="_blank" rel="noopener noreferrer">
                    Chamar no WhatsApp
                    <ArrowRight size={20} />
                  </a>
                </Button>
                
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <a href="https://rebel-dog-6e7.notion.site/Welcome-Bem-vindo-24784a3712c7804988efd15f3ce2a582" target="_blank" rel="noopener noreferrer">
                    Ver portfolio
                  </a>
                </Button>
              </div>
              
              <div className="mt-8 text-white/80 text-sm">
                ✨ Primeira consulta sempre gratuita
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">9 anos</div>
            <div className="text-sm text-muted-foreground">de experiência</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary mb-1">50+</div>
            <div className="text-sm text-muted-foreground">projetos entregues</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent mb-1">24h</div>
            <div className="text-sm text-muted-foreground">resposta máxima</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">satisfação</div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;