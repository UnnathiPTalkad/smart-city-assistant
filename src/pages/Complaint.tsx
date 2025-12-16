import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeComplaint } from "@/lib/analyzeComplaint";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
  "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
];

const Complaint = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [complaint, setComplaint] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 3) {
      toast({ title: "Maximum 3 images allowed", variant: "destructive" });
      return;
    }
    setImages(prev => [...prev, ...files].slice(0, 3));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (!user || images.length === 0) return [];
    
    const uploadedUrls: string[] = [];
    for (const image of images) {
      const fileName = `${user.id}/${Date.now()}-${image.name}`;
      const { error } = await supabase.storage
        .from("complaint-images")
        .upload(fileName, image);
      
      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from("complaint-images")
          .getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({ title: "Please login to submit a complaint", variant: "destructive" });
      navigate("/login");
      return;
    }

    if (complaint.trim().length < 10) {
      toast({ title: "Complaint must be at least 10 characters", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      // Analyze complaint with AI
      const analysis = await analyzeComplaint(complaint, city);
      
      // Save to database
      const { data: complaintData, error: insertError } = await supabase
        .from("complaints")
        .insert({
          user_id: user.id,
          complaint_text: complaint,
          city: city || null,
          category: analysis.category,
          priority: analysis.priority,
          department: analysis.department,
          summary: analysis.summary,
          image_urls: imageUrls,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast({ title: "Complaint submitted successfully!" });
      
      // Navigate to result page with data
      navigate("/result", { 
        state: { 
          analysis,
          complaintId: complaintData.id,
          complaintText: complaint,
          imageUrls 
        } 
      });
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({ 
        title: "Failed to submit complaint", 
        description: error.message,
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Submit a Complaint</CardTitle>
            <p className="text-muted-foreground">
              Describe your issue in detail. Our AI will analyze and route it to the appropriate department.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="complaint" className="text-base font-medium">
                  Describe your complaint *
                </Label>
                <Textarea
                  id="complaint"
                  placeholder="Please describe your complaint in detail. Include information such as location, date, and any relevant details..."
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  className="min-h-[180px] text-base resize-none"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Minimum 10 characters required
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-base font-medium">
                  Select your city
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city" className="w-full md:w-80">
                    <SelectValue placeholder="Choose a city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((cityName) => (
                      <SelectItem key={cityName} value={cityName}>
                        {cityName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Attach Images (Optional, max 3)
                </Label>
                <div className="flex flex-wrap gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive rounded-full"
                      >
                        <X className="w-3 h-3 text-destructive-foreground" />
                      </button>
                    </div>
                  ))}
                  {images.length < 3 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-xs">Add Image</span>
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
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
                    Submit & Analyze
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Complaint;
