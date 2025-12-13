import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2 } from "lucide-react";

interface ComplaintFormProps {
  onSubmit: (complaint: string, city: string) => void;
  isLoading: boolean;
}

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const ComplaintForm = ({ onSubmit, isLoading }: ComplaintFormProps) => {
  const [complaint, setComplaint] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (complaint.trim()) {
      onSubmit(complaint, city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="complaint" className="text-base font-medium">
          Describe your complaint or issue
        </Label>
        <Textarea
          id="complaint"
          placeholder="Please describe your complaint in detail. Include information such as location, date, and any other relevant details that would help us understand and address your concern..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          className="min-h-[180px] text-base resize-none bg-card border-input focus:ring-2 focus:ring-primary/20"
          required
        />
        <p className="text-sm text-muted-foreground">
          Minimum 10 characters required
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="text-base font-medium">
          Select your city (optional)
        </Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger id="city" className="w-full md:w-80 bg-card">
            <SelectValue placeholder="Choose a city..." />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {cities.map((cityName) => (
              <SelectItem key={cityName} value={cityName}>
                {cityName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading || complaint.trim().length < 10}
        className="w-full md:w-auto px-8 font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Analyze Complaint
          </>
        )}
      </Button>
    </form>
  );
};

export default ComplaintForm;
