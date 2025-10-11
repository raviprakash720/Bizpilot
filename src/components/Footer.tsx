import { Mail, Linkedin, Twitter, Facebook, Sparkles } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Invoices", href: "#invoices" },
    { name: "Chatbot", href: "#chatbot-trigger" },
    { name: "Pricing", href: "#pricing" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
  ],
  resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "Blog", href: "#blog" },
    { name: "API", href: "#api" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BizPilot</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Your AI co-pilot for MSME operations. Simplifying invoicing, bookkeeping, and vendor management for small businesses.
            </p>
            <div className="flex gap-3">
              <a
                href="#linkedin"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#facebook"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 BizPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <a href="mailto:support@bizpilot.com" className="hover:text-primary transition-colors">
              support@bizpilot.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
