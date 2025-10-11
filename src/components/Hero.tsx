import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/5 to-accent/10 -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full w-fit mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Your MSME AI Co-Pilot</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">BizPilot</span> — Simplify your MSME operations with AI
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Your personal accountant, advisor and assistant — invoice scanning, bookkeeping, GST help, and smart reminders — all in one place.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group" id="try-demo-modal">
                Try Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group" id="chatbot-trigger">
                <MessageCircle className="w-5 h-5" />
                Talk to BizPilot
              </Button>
            </div>

            {/* Micro copy */}
            <p className="text-sm text-muted-foreground flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                No accounting skills required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Works in English & regional languages
              </span>
            </p>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative animate-float">
              <img
                src={heroIllustration}
                alt="AI assistant helping MSME shop owner with invoices and business operations"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-3xl blur-2xl -z-10" />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-2xl animate-bounce-subtle">
              <p className="text-xs font-medium text-muted-foreground">Auto Extract</p>
              <p className="text-lg font-bold text-accent">99% Accuracy</p>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-2xl animate-bounce-subtle" style={{ animationDelay: "0.5s" }}>
              <p className="text-xs font-medium text-muted-foreground">Time Saved</p>
              <p className="text-lg font-bold text-secondary">4 hrs/week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
