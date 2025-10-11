import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatbotDrawer } from "./ChatbotDrawer";

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-all animate-float z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <ChatbotDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};