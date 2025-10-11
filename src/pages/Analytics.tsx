import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Invoice {
  amount: number;
  category: string | null;
  vendor_name: string;
  created_at: string;
}

export default function Analytics() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("invoices")
      .select("amount, category, vendor_name, created_at");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive"
      });
    } else {
      setInvoices(data || []);
    }
    setLoading(false);
  };

  const monthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map((month, index) => {
      const monthInvoices = invoices.filter(inv => {
        const date = new Date(inv.created_at);
        return date.getMonth() === index;
      });
      return {
        month,
        revenue: monthInvoices.reduce((sum, inv) => sum + inv.amount, 0)
      };
    });
    return data.filter(d => d.revenue > 0);
  };

  const categoryData = () => {
    const categories = invoices.reduce((acc, inv) => {
      const cat = inv.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + inv.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  const topVendorsData = () => {
    const vendors = invoices.reduce((acc, inv) => {
      acc[inv.vendor_name] = (acc[inv.vendor_name] || 0) + inv.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(vendors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, amount]) => ({ name, amount }));
  };

  const exportToCSV = () => {
    const csv = [
      ["Vendor", "Amount", "Category", "Date"],
      ...invoices.map(inv => [
        inv.vendor_name,
        inv.amount,
        inv.category || "N/A",
        new Date(inv.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bizpilot-analytics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast({ title: "Success", description: "Data exported successfully" });
  };

  const COLORS = ["#6C63FF", "#1E2A78", "#4F46E5", "#7C3AED", "#EC4899"];

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Analytics</h1>
              <p className="text-muted-foreground mt-2">Business insights and trends</p>
            </div>
            <Button onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2">Total Revenue</h2>
            <p className="text-4xl font-bold gradient-text">₹{totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">From {invoices.length} invoices</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Monthly Revenue Trend</h3>
              {monthlyData().length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" fill="#6C63FF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Category Distribution</h3>
              {categoryData().length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ₹${entry.value.toFixed(0)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">Top 5 Vendors by Amount</h3>
            {topVendorsData().length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No vendor data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topVendorsData()} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--foreground))" />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--foreground))" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="amount" fill="#1E2A78" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}