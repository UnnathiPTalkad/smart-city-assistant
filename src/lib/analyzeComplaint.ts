import { AnalysisData } from "@/components/AnalysisResult";
import { supabase } from "@/integrations/supabase/client";

export const analyzeComplaint = async (
  complaint: string,
  city: string
): Promise<AnalysisData> => {
  const { data, error } = await supabase.functions.invoke('analyze-complaint', {
    body: { complaint, city }
  });

  if (error) {
    console.error('Analysis error:', error);
    throw new Error(error.message || 'Failed to analyze complaint');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return {
    category: data.category,
    priority: data.priority,
    department: data.department,
    summary: data.summary,
  };
};
