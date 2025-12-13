import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Folder, AlertTriangle, Building, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnalysisData {
  category: string;
  priority: "Low" | "Medium" | "High";
  department: string;
  summary: string;
}

interface AnalysisResultProps {
  data: AnalysisData;
}

const priorityConfig = {
  Low: {
    className: "bg-priority-low text-white",
    icon: "●",
  },
  Medium: {
    className: "bg-priority-medium text-foreground",
    icon: "●●",
  },
  High: {
    className: "bg-priority-high text-white",
    icon: "●●●",
  },
};

const AnalysisResult = ({ data }: AnalysisResultProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
      <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Folder className="w-5 h-5 text-primary" />
            </div>
            Complaint Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">{data.category}</p>
        </CardContent>
      </Card>

      <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            Priority Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge
            className={cn(
              "text-base px-4 py-1 font-semibold",
              priorityConfig[data.priority].className
            )}
          >
            {priorityConfig[data.priority].icon} {data.priority}
          </Badge>
        </CardContent>
      </Card>

      <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Building className="w-5 h-5 text-secondary" />
            </div>
            Suggested Department
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-foreground">{data.department}</p>
        </CardContent>
      </Card>

      <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <FileText className="w-5 h-5 text-secondary" />
            </div>
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResult;
