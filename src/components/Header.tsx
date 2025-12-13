import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/10 rounded-lg">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Smart City AI</h1>
            <p className="text-sm text-primary-foreground/80">Complaint Analyzer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
