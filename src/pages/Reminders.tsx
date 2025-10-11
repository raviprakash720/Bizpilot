import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Trash2, CheckCircle2, Circle } from "lucide-react";
import { format } from "date-fns";

interface Reminder {
  id: string;
  title: string;
  due_date: string;
  status: string;
  created_at: string;
}

export default function Reminders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    due_date: ""
  });

  useEffect(() => {
    if (user) {
      fetchReminders();
    }
  }, [user]);

  const fetchReminders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reminders")
      .select("*")
      .order("due_date", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reminders",
        variant: "destructive"
      });
    } else {
      setReminders(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("reminders").insert({
      user_id: user!.id,
      title: formData.title,
      due_date: formData.due_date,
      status: "pending"
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create reminder",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Reminder created successfully" });
      fetchReminders();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      due_date: ""
    });
    setIsDialogOpen(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "done" : "pending";
    
    const { error } = await supabase
      .from("reminders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update reminder",
        variant: "destructive"
      });
    } else {
      fetchReminders();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;

    const { error } = await supabase.from("reminders").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete reminder",
        variant: "destructive"
      });
    } else {
      toast({ title: "Success", description: "Reminder deleted successfully" });
      fetchReminders();
    }
  };

  const pendingReminders = reminders.filter(r => r.status === "pending");
  const doneReminders = reminders.filter(r => r.status === "done");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text">Reminders</h1>
              <p className="text-muted-foreground mt-2">Never miss an important task</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reminder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Reminder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Pay vendor invoice"
                      required
                    />
                  </div>
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
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                    <Button type="submit">Create Reminder</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Circle className="w-5 h-5 text-yellow-500" />
                  Pending ({pendingReminders.length})
                </h2>
                {pendingReminders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No pending reminders</p>
                ) : (
                  <div className="space-y-3">
                    {pendingReminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleStatus(reminder.id, reminder.status)}
                            className="p-1 rounded-full hover:bg-background transition-colors"
                          >
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          </button>
                          <div>
                            <p className="font-medium">{reminder.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {format(new Date(reminder.due_date), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(reminder.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Completed ({doneReminders.length})
                </h2>
                {doneReminders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No completed reminders</p>
                ) : (
                  <div className="space-y-3">
                    {doneReminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-accent/30 opacity-60"
                      >
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => toggleStatus(reminder.id, reminder.status)}
                            className="p-1 rounded-full hover:bg-background transition-colors"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          </button>
                          <div>
                            <p className="font-medium line-through">{reminder.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {format(new Date(reminder.due_date), "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(reminder.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}