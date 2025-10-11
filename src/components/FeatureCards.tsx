import { Scan, BookOpen, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Scan,
    title: "Smart Invoice Scanner",
    description: "Upload invoices by camera or PDF. Auto-extract GST, amount, due date with AI precision.",
    color: "text-secondary",
  },
  {
    icon: BookOpen,
    title: "Auto Reconciliation & Bookkeeping",
    description: "Auto-add to ledger, match payments, generate reports without manual data entry.",
    color: "text-accent",
  },
  {
    icon: Bell,
    title: "Vendor Follow-ups & Reminders",
    description: "Send polite WhatsApp/email reminders automatically to vendors for pending payments.",
    color: "text-primary",
  },
];

export const FeatureCards = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything your business needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features to automate your MSME operations and save hours every week
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-3xl hover-lift hover-glow group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl gradient-card flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Try Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary group-hover:translate-x-1 transition-transform"
              >
                Try it →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
