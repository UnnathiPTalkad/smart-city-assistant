import { useState } from "react";
import Header from "@/components/Header";
import ComplaintForm from "@/components/ComplaintForm";
import AnalysisResult, { AnalysisData } from "@/components/AnalysisResult";
import { analyzeComplaint } from "@/lib/analyzeComplaint";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Shield } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (complaint: string, city: string) => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeComplaint(complaint, city);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your complaint has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Report & Analyze City Issues
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit your complaints and let our AI-powered system categorize, prioritize, 
            and route them to the appropriate city department for faster resolution.
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
            <div className="p-2 bg-secondary/10 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Smart Categorization</p>
              <p className="text-sm text-muted-foreground">AI-powered sorting</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
            <div className="p-2 bg-secondary/10 rounded-full">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Instant Analysis</p>
              <p className="text-sm text-muted-foreground">Results in seconds</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-card">
            <div className="p-2 bg-secondary/10 rounded-full">
              <Shield className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Priority Routing</p>
              <p className="text-sm text-muted-foreground">Urgent issues first</p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <Card className="shadow-card mb-10">
          <CardContent className="pt-6">
            <ComplaintForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysisResult && (
          <section className="animate-slide-up">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-secondary rounded-full"></span>
              Analysis Results
            </h3>
            <AnalysisResult data={analysisResult} />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Smart City AI Complaint Analyzer — A public service initiative
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Your data is processed securely and used only to improve city services.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
