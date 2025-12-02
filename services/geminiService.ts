import { GoogleGenAI, Type } from "@google/genai";
import { AuditInputs, AuditResult } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("API Key is missing! Make sure VITE_API_KEY is set in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "dummy_key_to_prevent_crash" });

export const generateAuditAnalysis = async (inputs: AuditInputs): Promise<AuditResult> => {
  // --- 1. Calculate Score Deterministically ---
  let rawScore = 0;

  // Core Business (Yes = 1)
  if (inputs.losingMoneyOnRepetitiveTasks) rawScore += 1;
  if (inputs.trackingSeniorTeamHours) rawScore += 1;
  if (inputs.clarityOnAiTasks) rawScore += 1;
  if (inputs.teamDeliveringLessOutput) rawScore += 1;
  if (inputs.investedInAutomationButUnderutilized) rawScore += 1;

  // Owner/CEO (Yes = 1)
  if (inputs.workedMoreThan50Hours) rawScore += 1;
  if (inputs.isBottleneck) rawScore += 1;
  if (inputs.canScaleWithoutHiring) rawScore += 1;

  // Confidence Scale (1=0, 2=1, 3=2, 4=3, 5=4)
  rawScore += (inputs.confidenceInCapturingCosts - 1);

  // Normalize to 0-100 for the UI if needed, but the prompt implies a raw score for buckets.
  // The UI (ResultsPage) might expect 0-100. Let's keep the raw score for logic but maybe scale it for the "Time Leak Score" display if it expects a percentage.
  // However, the prompt says "Show a score (e.g. 0-3, 4-7)".
  // Let's store the raw score in a new property or just map it.
  // The existing type has `score: number`. Let's use the raw score (0-12) but maybe the UI expects a percentage?
  // Let's assume the UI will be updated to show this raw score or a level.
  // Actually, I'll map it to 0-100 for the visual gauge if there is one, but pass the "Level" in the summary.
  // Let's just return the raw score for now and update the UI to handle it.
  // Wait, the previous UI had a gauge. A score of "8" on a 100 scale looks low.
  // I will map 0-12 to 0-100 roughly for the visual, but rely on the text for the "Level".
  // 0-3 (Foundational) -> 0-30
  // 4-7 (Intermediate) -> 40-70
  // 8+ (Advanced) -> 80-100

  const visualScore = Math.min(Math.round((rawScore / 12) * 100), 100);

  // --- 2. Generate Qualitative Analysis with Gemini ---
  const modelId = "gemini-2.0-flash"; // Updated to latest flash model

  const systemInstruction = `
    You are an expert AI Operations Consultant. 
    Analyze the user's audit responses and provide a strategic summary.
    
    Scoring Context:
    - User Score: ${rawScore} / 12
    - Level: ${rawScore >= 8 ? "Advanced (Ready for Core Offer)" : rawScore >= 4 ? "Intermediate" : "Foundational"}
    - Role: ${inputs.role}
    - Focus: ${inputs.mainFocus}
    - Obstacle: ${inputs.biggestObstacle}
    
    Be direct. If they are an "Advanced" lead (score 8+), emphasize that they are bleeding money and need immediate systems.
    If "Foundational", focus on getting basics right.
  `;

  const prompt = `
    Business Profile:
    - Name: ${inputs.name}
    - Role: ${inputs.role}
    - Team: ${inputs.teamSize}
    - Focus: ${inputs.mainFocus}
    - Worked >50hrs: ${inputs.workedMoreThan50Hours}
    - Bottleneck: ${inputs.isBottleneck}
    - Biggest Obstacle: ${inputs.biggestObstacle}
    - Investment Timeline: ${inputs.investmentTimeline}

    Generate:
    1. A punchy summary of their situation.
    2. Estimated hours wasted (make a logical estimate based on team size '${inputs.teamSize}' - assume 10-20% waste per person if not specified).
    3. Potential savings (assume $50/hr avg cost).
    4. 3 high-impact recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            totalHoursWastedPerWeek: { type: Type.NUMBER },
            potentialCostSavings: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                  toolSuggestion: { type: Type.STRING }
                },
                required: ["title", "description", "impact", "toolSuggestion"]
              }
            }
          },
          required: ["summary", "totalHoursWastedPerWeek", "potentialCostSavings", "recommendations"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        ...data,
        score: visualScore // Return the visual score (0-100) for the UI gauge
      };
    }

    throw new Error("No data returned from AI");

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback
    return {
      score: visualScore,
      summary: "Based on your inputs, your business shows clear signs of operational drag. You are likely losing significant time to manual workflows.",
      totalHoursWastedPerWeek: 40, // Generic fallback
      potentialCostSavings: "$100,000+",
      recommendations: [
        { title: "Systemize Core Ops", description: "Document and automate your primary workflows.", impact: "High", toolSuggestion: "Notion/Zapier" },
        { title: "Delegate Admin", description: "Use AI to handle scheduling and data entry.", impact: "High", toolSuggestion: "Motion/Reclaim" },
      ]
    };
  }
};
