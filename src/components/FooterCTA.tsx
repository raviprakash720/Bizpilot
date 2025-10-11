import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FooterCTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to simplify your business?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join 200+ MSMEs already saving time and money with BizPilot
          </p>
          <Button
            variant="glass"
            size="lg"
            className="bg-white/90 text-primary hover:bg-white font-semibold group"
          >
            Get Started — It's Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
