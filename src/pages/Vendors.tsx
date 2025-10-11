import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Trash2, Edit, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Vendor {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  trust_score: number;
  total_deals: number;
  last_payment: string | null;
  created_at: string;
}

export default function Vendors() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    last_payment: ""
  });

  useEffect(() => {
    if (user) {
      fetchVendors();
    }
  }, [user]);

  const fetchVendors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .order("trust_score", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch vendors",
        variant: "destructive"
      });
    } else {
      setVendors(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vendorData = {
      user_id: user!.id,
      name: formData.name,
      phone: formData.phone || null,
      email: formData.email || null,
      last_payment: formData.last_payment || null,
      trust_score: editingVendor ? editingVendor.trust_score : Math.floor(Math.random() * 40) + 60,
      total_deals: editingVendor ? editingVendor.total_deals : 0
    };

    if (editingVendor) {
      const { error } = await supabase
        .from("vendors")
        .update(vendorData)
        .eq("id", editingVendor.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update vendor",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Vendor updated successfully" });
        fetchVendors();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("vendors").insert(vendorData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create vendor",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Vendor created successfully" });
        fetchVendors();
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      last_payment: ""
    });
    setEditingVendor(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      phone: vendor.phone || "",
      email: vendor.email || "",
      last_payment: vendor.last_payment || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;

    const { error } = await supabase.from("vendors").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete vendor",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Vendor deleted successfully" });
      fetchVendors();
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Vendors</h1>
              <p className="text-muted-foreground mt-2">Manage your business vendors</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vendor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingVendor ? "Edit Vendor" : "Add New Vendor"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Vendor Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_payment">Last Payment Date (Optional)</Label>
                    <Input
                      id="last_payment"
                      type="date"
                      value={formData.last_payment}
                      onChange={(e) => setFormData({ ...formData, last_payment: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                    <Button type="submit">{editingVendor ? "Update" : "Create"} Vendor</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : vendors.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No vendors found. Add your first vendor to get started.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="glass-card rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{vendor.name}</h3>
                      <div className="flex items-center gap-2">
                        <Star className={`w-4 h-4 ${getTrustScoreColor(vendor.trust_score)}`} />
                        <span className={`font-bold ${getTrustScoreColor(vendor.trust_score)}`}>
                          {vendor.trust_score}/100
                        </span>
                        <span className="text-xs text-muted-foreground">Trust Score</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(vendor)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(vendor.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {vendor.phone && (
                      <p className="text-muted-foreground">📞 {vendor.phone}</p>
                    )}
                    {vendor.email && (
                      <p className="text-muted-foreground">✉️ {vendor.email}</p>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Deals</p>
                      <p className="text-lg font-bold">{vendor.total_deals}</p>
                    </div>
                    {vendor.last_payment && (
                      <div>
                        <p className="text-xs text-muted-foreground">Last Payment</p>
                        <p className="text-sm font-medium">
                          {new Date(vendor.last_payment).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}