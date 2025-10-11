import { Camera, FileSpreadsheet, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Upload Invoice",
    description: "Snap a photo or upload PDF of your invoice",
    example: "Invoice #1234 from ABC Suppliers captured in seconds",
  },
  {
    icon: FileSpreadsheet,
    title: "Auto-add to Ledger & Analyze",
    description: "AI extracts data and updates your books automatically",
    example: "Amount: ₹15,240 | GST: ₹2,286 | Due: 15th March",
  },
  {
    icon: MessageSquare,
    title: "AI Reminders & Daily Digest",
    description: "Get smart notifications and vendor follow-ups",
    example: "Reminder sent to vendor XYZ for ₹8,500 due tomorrow",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your business operations
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-hero flex items-center justify-center font-bold text-white text-lg shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="glass-card p-8 rounded-3xl hover-lift text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>

                  {/* Example */}
                  <div className="bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground border border-border/50">
                    {step.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
