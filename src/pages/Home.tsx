import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Shield, 
  BarChart3, 
  Brain,
  ArrowRight,
  Building2,
  Users,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <Brain className="w-4 h-4" />
              Powered by AI
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Smart City Complaint
              <span className="block text-primary">Management System</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Report city issues effortlessly. Our AI automatically categorizes, prioritizes, 
              and routes your complaints to the right department.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/complaint">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8">
                  Raise a Complaint
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                  Login / Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">1. Submit Complaint</h3>
                <p className="text-muted-foreground">
                  Describe your issue with text and attach images as evidence
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">2. AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI categorizes, assigns priority, and routes to the right department
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-none shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">3. Track & Resolve</h3>
                <p className="text-muted-foreground">
                  Track your complaint status and get updates on resolution progress
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4">
              <Shield className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <BarChart3 className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">Admins get insights with charts and reports</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <Building2 className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Auto Department Routing</h3>
                <p className="text-sm text-muted-foreground">AI routes complaints to the correct department</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <Users className="w-10 h-10 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Role-Based Access</h3>
                <p className="text-sm text-muted-foreground">Citizens and admins have appropriate views</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-card/30">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Smart City Complaint Management System © {new Date().getFullYear()}</p>
          <p className="mt-1">Built for efficient urban governance</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
