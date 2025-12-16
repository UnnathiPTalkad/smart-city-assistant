import { useLocation, Navigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  AlertTriangle,
  Building2,
  FileText,
  CheckCircle,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import Header from "@/components/Header";

const priorityConfig = {
  Low: { color: "bg-green-500/10 text-green-700 border-green-500/30", icon: CheckCircle },
  Medium: { color: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30", icon: AlertTriangle },
  High: { color: "bg-red-500/10 text-red-700 border-red-500/30", icon: AlertTriangle },
};

const Result = () => {
  const location = useLocation();
  const { analysis, complaintId, complaintText, imageUrls } = location.state || {};

  if (!analysis) {
    return <Navigate to="/complaint" replace />;
  }

  const priorityStyle = priorityConfig[analysis.priority as keyof typeof priorityConfig] || priorityConfig.Medium;
  const PriorityIcon = priorityStyle.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Complaint Submitted Successfully</h1>
          <p className="text-muted-foreground mt-2">
            Your complaint has been analyzed and recorded. Here are the results:
          </p>
        </div>

        {/* AI Analysis Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Category</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-foreground">{analysis.category}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <PriorityIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Priority Level</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Badge className={`text-base px-4 py-1 ${priorityStyle.color}`}>
                {analysis.priority}
              </Badge>
            </CardContent>
          </Card>

          <Card className="shadow-lg animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Department</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold text-foreground">{analysis.department}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{analysis.summary}</p>
            </CardContent>
          </Card>
        </div>

        {/* Attached Images */}
        {imageUrls && imageUrls.length > 0 && (
          <Card className="shadow-lg mb-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ImageIcon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg">Attached Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {imageUrls.map((url: string, index: number) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-32 h-32 rounded-lg overflow-hidden border hover:opacity-80 transition-opacity"
                  >
                    <img src={url} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <Link to="/my-complaints">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              View Complaint Status
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/complaint">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Submit Another Complaint
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Result;
