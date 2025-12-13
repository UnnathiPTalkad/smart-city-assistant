import { AnalysisData } from "@/components/AnalysisResult";

// Simulated AI analysis - in production, this would call an actual AI API
export const analyzeComplaint = async (
  complaint: string,
  city: string
): Promise<AnalysisData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const complaintLower = complaint.toLowerCase();

  // Category detection
  let category = "General Inquiry";
  if (
    complaintLower.includes("road") ||
    complaintLower.includes("pothole") ||
    complaintLower.includes("street") ||
    complaintLower.includes("traffic")
  ) {
    category = "Infrastructure & Roads";
  } else if (
    complaintLower.includes("water") ||
    complaintLower.includes("sewage") ||
    complaintLower.includes("drain") ||
    complaintLower.includes("flood")
  ) {
    category = "Water & Sanitation";
  } else if (
    complaintLower.includes("garbage") ||
    complaintLower.includes("trash") ||
    complaintLower.includes("waste") ||
    complaintLower.includes("litter")
  ) {
    category = "Waste Management";
  } else if (
    complaintLower.includes("power") ||
    complaintLower.includes("electricity") ||
    complaintLower.includes("light") ||
    complaintLower.includes("streetlight")
  ) {
    category = "Electricity & Lighting";
  } else if (
    complaintLower.includes("noise") ||
    complaintLower.includes("pollution") ||
    complaintLower.includes("air quality")
  ) {
    category = "Environmental";
  } else if (
    complaintLower.includes("park") ||
    complaintLower.includes("playground") ||
    complaintLower.includes("recreation")
  ) {
    category = "Parks & Recreation";
  } else if (
    complaintLower.includes("safety") ||
    complaintLower.includes("crime") ||
    complaintLower.includes("dangerous")
  ) {
    category = "Public Safety";
  }

  // Priority detection
  let priority: "Low" | "Medium" | "High" = "Medium";
  if (
    complaintLower.includes("urgent") ||
    complaintLower.includes("emergency") ||
    complaintLower.includes("dangerous") ||
    complaintLower.includes("immediate") ||
    complaintLower.includes("hazard")
  ) {
    priority = "High";
  } else if (
    complaintLower.includes("minor") ||
    complaintLower.includes("small") ||
    complaintLower.includes("suggestion")
  ) {
    priority = "Low";
  }

  // Department mapping
  const departmentMap: Record<string, string> = {
    "Infrastructure & Roads": "Department of Public Works",
    "Water & Sanitation": "Water Utilities Department",
    "Waste Management": "Sanitation Department",
    "Electricity & Lighting": "Power & Utilities Department",
    Environmental: "Environmental Protection Agency",
    "Parks & Recreation": "Parks & Recreation Department",
    "Public Safety": "Public Safety Department",
    "General Inquiry": "City Services Department",
  };

  const department = departmentMap[category];

  // Generate summary
  const cityText = city ? ` in ${city}` : "";
  const summaryTemplates = [
    `A citizen has reported an issue${cityText} related to ${category.toLowerCase()}. The complaint indicates a ${priority.toLowerCase()} priority concern that requires attention from the ${department}.`,
    `This complaint${cityText} pertains to ${category.toLowerCase()} matters. Based on the content analysis, it has been classified as ${priority.toLowerCase()} priority and should be directed to the ${department} for resolution.`,
    `The reported issue${cityText} falls under the ${category.toLowerCase()} category. The AI analysis suggests ${priority.toLowerCase()} priority handling by the ${department}.`,
  ];

  const summary = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];

  return {
    category,
    priority,
    department,
    summary,
  };
};
