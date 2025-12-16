import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import { Loader2, FileText, Plus, Calendar, Building2 } from "lucide-react";
import { format } from "date-fns";

interface Complaint {
  id: string;
  complaint_text: string;
  city: string | null;
  category: string | null;
  priority: string | null;
  department: string | null;
  status: string | null;
  created_at: string;
}

const priorityColors: Record<string, string> = {
  Low: "bg-green-500/10 text-green-700 border-green-500/30",
  Medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  High: "bg-red-500/10 text-red-700 border-red-500/30",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-700",
  "in-progress": "bg-blue-500/10 text-blue-700",
  resolved: "bg-green-500/10 text-green-700",
};

const MyComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setComplaints(data);
      }
      setIsLoading(false);
    };

    fetchComplaints();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Complaints</h1>
            <p className="text-muted-foreground mt-1">View and track your submitted complaints</p>
          </div>
          <Link to="/complaint">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Complaint
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : complaints.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No complaints yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't submitted any complaints. Start by raising your first issue.
              </p>
              <Link to="/complaint">
                <Button>Raise a Complaint</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <p className="text-foreground line-clamp-2 mb-3">
                        {complaint.complaint_text}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {complaint.category && (
                          <Badge variant="outline">{complaint.category}</Badge>
                        )}
                        {complaint.priority && (
                          <Badge className={priorityColors[complaint.priority] || ""}>
                            {complaint.priority}
                          </Badge>
                        )}
                        {complaint.status && (
                          <Badge className={statusColors[complaint.status] || ""}>
                            {complaint.status}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {complaint.department && (
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {complaint.department}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(complaint.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyComplaints;
