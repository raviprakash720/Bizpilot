import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Database, Trophy, Bell, User, LayoutDashboard, Zap, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatbotDrawer } from "@/components/ChatbotDrawer";

interface Stats {
  totalChats: number;
  resourcesUsed: number;
  leaderboardRank: number;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalChats: 0,
    resourcesUsed: 47,
    leaderboardRank: 12
  });
  const [loadingData, setLoadingData] = useState(true);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (user) {
      fetchDashboardData();
    }
  }, [user, loading, navigate]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    
    const { count } = await supabase
      .from("chat_logs")
      .select("*", { count: "exact", head: true });

    setStats(prev => ({
      ...prev,
      totalChats: count || 0
    }));

    setLoadingData(false);
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user?.email?.split("@")[0] || "User";
  const userInitials = userName.substring(0, 2).toUpperCase();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', action: null },
    { id: 'chatbot', icon: MessageSquare, label: 'Chatbot', path: null, action: () => setIsChatbotOpen(true) },
    { id: 'resources', icon: Database, label: 'Resources', path: '/invoices', action: null },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard', path: '/analytics', action: null },
    { id: 'profile', icon: User, label: 'Profile', path: '/dashboard', action: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex">
      {/* Left Sidebar */}
      <aside className="w-20 glass-panel border-r flex flex-col items-center py-8 space-y-8 sticky top-0 h-screen">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-slow">
          <Zap className="w-6 h-6 text-white" />
        </div>

        <nav className="flex-1 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                if (item.action) {
                  item.action();
                } else if (item.path && item.path !== '/dashboard') {
                  navigate(item.path);
                }
              }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                activeNav === item.id
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover-glow-strong'
                  : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-white/10 hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        <button
          onClick={signOut}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="glass-panel border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gradient">AI Workspace</h1>
            <p className="text-sm text-muted-foreground">Your intelligent business companion</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-white/50 dark:hover:bg-white/10 hover:text-foreground transition-all duration-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
            </button>

            <Avatar className="w-10 h-10 ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-300 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold mb-2">
                Welcome back, <span className="text-gradient">{userName}</span>! 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                Ready to supercharge your productivity today?
              </p>
            </div>

            {/* Analytics Cards */}
            <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {/* Total Chats Card */}
              <div className="glass-card rounded-3xl p-6 hover-glow-strong group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Live</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Total Chats</p>
                <p className="text-4xl font-bold text-gradient">{stats.totalChats}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active conversations
                </div>
              </div>

              {/* Resources Used Card */}
              <div className="glass-card rounded-3xl p-6 hover-glow-strong group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Database className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">Tracked</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Resources Used</p>
                <p className="text-4xl font-bold text-gradient">{stats.resourcesUsed}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary to-accent" style={{ width: '68%' }}></div>
                  </div>
                  68% capacity
                </div>
              </div>

              {/* Leaderboard Rank Card */}
              <div className="glass-card rounded-3xl p-6 hover-glow-strong group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">Top 15</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Leaderboard Rank</p>
                <p className="text-4xl font-bold text-gradient">#{stats.leaderboardRank}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                  <span>↑</span>
                  +3 positions this week
                </div>
              </div>
            </div>

            {/* Main Center Panel */}
            <div className="glass-panel rounded-3xl p-12 text-center animate-fade-in hover-glow relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-50"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse-slow">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-2 text-gradient">Start a New Conversation</h3>
                  <p className="text-muted-foreground text-lg">
                    Chat with BizPilot AI to manage your business intelligence
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={() => {
                    setActiveNav('chatbot');
                    setIsChatbotOpen(true);
                  }}
                  className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-6 text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover-glow-strong border-0"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>

                <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AI Online
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Fast Response
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    24/7 Available
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div
                onClick={() => navigate('/invoices')}
                className="glass-card rounded-2xl p-6 cursor-pointer hover-glow transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">Manage Resources</h4>
                    <p className="text-sm text-muted-foreground">View and organize your data</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => navigate('/analytics')}
                className="glass-card rounded-2xl p-6 cursor-pointer hover-glow transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">View Leaderboard</h4>
                    <p className="text-sm text-muted-foreground">Check your ranking and stats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot Drawer */}
      <ChatbotDrawer 
        isOpen={isChatbotOpen} 
        onClose={() => {
          setIsChatbotOpen(false);
          setActiveNav('dashboard');
        }} 
      />
    </div>
  );
};

export default Dashboard;