import { Sidebar } from "@/components/Sidebar";
import { ChatbotDrawer } from "@/components/ChatbotDrawer";

export default function Chatbot() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <ChatbotDrawer isOpen={true} onClose={() => {}} />
      </main>
    </div>
  );
}