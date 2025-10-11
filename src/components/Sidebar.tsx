import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Users, BarChart3, MessageSquare, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const { signOut } = useAuth();

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/invoices", icon: FileText, label: "Invoices" },
    { to: "/vendors", icon: Users, label: "Vendors" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/chatbot", icon: MessageSquare, label: "Chatbot" },
    { to: "/reminders", icon: Bell, label: "Reminders" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold gradient-text">BizPilot</h2>
        <p className="text-xs text-muted-foreground mt-1">MSME AI Co-Pilot</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-destructive/10 text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};