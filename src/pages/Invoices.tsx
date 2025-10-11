import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Loader2, Trash2, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Invoice {
  id: string;
  invoice_no: string;
  vendor_name: string;
  amount: number;
  gst_amount: number;
  due_date: string;
  status: string;
  category: string | null;
  created_at: string;
}

export default function Invoices() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState({
    invoice_no: "",
    vendor_name: "",
    amount: "",
    gst_amount: "",
    due_date: "",
    status: "unpaid",
    category: ""
  });

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user]);

  useEffect(() => {
    filterInvoices();
  }, [invoices, searchTerm, statusFilter]);

  const fetchInvoices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch invoices",
        variant: "destructive"
      });
    } else {
      setInvoices(data || []);
    }
    setLoading(false);
  };

  const filterInvoices = () => {
    let filtered = invoices;

    if (statusFilter !== "all") {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(inv =>
        inv.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.invoice_no.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInvoices(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const invoiceData = {
      user_id: user!.id,
      invoice_no: formData.invoice_no,
      vendor_name: formData.vendor_name,
      amount: parseFloat(formData.amount),
      gst_amount: parseFloat(formData.gst_amount),
      due_date: formData.due_date,
      status: formData.status,
      category: formData.category || null
    };

    if (editingInvoice) {
      const { error } = await supabase
        .from("invoices")
        .update(invoiceData)
        .eq("id", editingInvoice.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update invoice",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Invoice updated successfully" });
        fetchInvoices();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("invoices").insert(invoiceData);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create invoice",
          variant: "destructive"
        });
      } else {
        toast({ title: "Success", description: "Invoice created successfully" });
        fetchInvoices();
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      invoice_no: "",
      vendor_name: "",
      amount: "",
      gst_amount: "",
      due_date: "",
      status: "unpaid",
      category: ""
    });
    setEditingInvoice(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      invoice_no: invoice.invoice_no,
      vendor_name: invoice.vendor_name,
      amount: invoice.amount.toString(),
      gst_amount: invoice.gst_amount.toString(),
      due_date: invoice.due_date,
      status: invoice.status,
      category: invoice.category || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    const { error } = await supabase.from("invoices").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete invoice",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Invoice deleted successfully" });
      fetchInvoices();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: "bg-green-500/10 text-green-500",
      unpaid: "bg-yellow-500/10 text-yellow-500",
      overdue: "bg-red-500/10 text-red-500"
    };
    return variants[status as keyof typeof variants] || "";
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalGst = filteredInvoices.reduce((sum, inv) => sum + inv.gst_amount, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Invoices</h1>
              <p className="text-muted-foreground mt-2">Manage all your business invoices</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingInvoice ? "Edit Invoice" : "Add New Invoice"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoice_no">Invoice Number</Label>
                      <Input
                        id="invoice_no"
                        value={formData.invoice_no}
                        onChange={(e) => setFormData({ ...formData, invoice_no: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor_name">Vendor Name</Label>
                      <Input
                        id="vendor_name"
                        value={formData.vendor_name}
                        onChange={(e) => setFormData({ ...formData, vendor_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gst_amount">GST Amount</Label>
                      <Input
                        id="gst_amount"
                        type="number"
                        step="0.01"
                        value={formData.gst_amount}
                        onChange={(e) => setFormData({ ...formData, gst_amount: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="due_date">Due Date</Label>
                      <Input
                        id="due_date"
                        type="date"
                        value={formData.due_date}
                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="unpaid">Unpaid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category (Optional)</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Marketing, Operations"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                    <Button type="submit">{editingInvoice ? "Update" : "Create"} Invoice</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="text-3xl font-bold">₹{totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total GST</p>
                <p className="text-3xl font-bold">₹{totalGst.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Invoices</p>
                <p className="text-3xl font-bold">{filteredInvoices.length}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No invoices found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Invoice #</th>
                      <th className="text-left py-3 px-4">Vendor</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">GST</th>
                      <th className="text-left py-3 px-4">Due Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border/50 hover:bg-accent/50">
                        <td className="py-3 px-4 font-medium">{invoice.invoice_no}</td>
                        <td className="py-3 px-4">{invoice.vendor_name}</td>
                        <td className="py-3 px-4">₹{invoice.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">₹{invoice.gst_amount.toFixed(2)}</td>
                        <td className="py-3 px-4">{format(new Date(invoice.due_date), "MMM dd, yyyy")}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusBadge(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(invoice)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(invoice.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}