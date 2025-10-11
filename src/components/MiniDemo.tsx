import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, FileText, DollarSign, Calendar } from "lucide-react";

export const MiniDemo = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch how BizPilot extracts invoice data instantly
            </p>
          </div>

          {/* Demo Widget */}
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Upload Area */}
              <div className="space-y-6" id="upload-invoice">
                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-full gradient-card flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-medium mb-2">Upload Invoice</p>
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, JPG, or PNG (Max 5MB)
                  </p>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  View Full Demo
                </Button>
              </div>

              {/* Right - Extracted Data Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent font-medium mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Invoice Data Extracted</span>
                </div>

                {/* Data Fields */}
                <div className="space-y-3">
                  <div className="bg-background/50 border border-border rounded-xl p-4 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Invoice Number</p>
                      <p className="font-medium">INV-2024-0847</p>
                    </div>
                  </div>

                  <div className="bg-background/50 border border-border rounded-xl p-4 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-medium">₹24,850 (incl. GST ₹3,728)</p>
                    </div>
                  </div>

                  <div className="bg-background/50 border border-border rounded-xl p-4 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-medium">March 15, 2025</p>
                    </div>
                  </div>
                </div>

                {/* Success Badge */}
                <div className="glass-card p-4 rounded-xl flex items-center justify-between bg-accent/10 border-accent/20">
                  <span className="text-sm font-medium">Added to Sheet</span>
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
