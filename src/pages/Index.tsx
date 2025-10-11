import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { HowItWorks } from "@/components/HowItWorks";
import { MiniDemo } from "@/components/MiniDemo";
import { SocialProof } from "@/components/SocialProof";
import { Testimonials } from "@/components/Testimonials";
import { FooterCTA } from "@/components/FooterCTA";
import { Footer } from "@/components/Footer";
import { ChatbotButton } from "@/components/ChatbotButton";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <FeatureCards />
          <HowItWorks />
          <MiniDemo />
          <SocialProof />
          <Testimonials />
          <FooterCTA />
        </main>
        <Footer />
        <ChatbotButton />
      </div>
    </ThemeProvider>
  );
};

export default Index;
