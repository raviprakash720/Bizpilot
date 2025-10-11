import { Users, Clock, Target } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "200+",
    label: "MSMEs onboarded",
  },
  {
    icon: Clock,
    value: "4 hrs",
    label: "Avg. saved per week",
  },
  {
    icon: Target,
    value: "99%",
    label: "Invoice extraction accuracy",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto">
        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center glass-card p-8 rounded-3xl hover-lift"
            >
              <div className="w-14 h-14 rounded-2xl gradient-card flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-gradient mb-2">
                {metric.value}
              </div>
              <div className="text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Partner Logos Placeholder */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by businesses across India</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-16 bg-muted/30 rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground">Partner {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
