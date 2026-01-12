
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeBeauty = async (imageBuffer: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBuffer,
          },
        },
        {
          text: "Analyze this person's facial features and provide professional beauty recommendations. Return the analysis in JSON format focusing on face shape, skin tone, eye color, and specific product recommendations from a high-end makeover line (Lipstick, Foundation, Eyeshadow). Be encouraging and professional."
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          faceShape: { type: Type.STRING },
          skinTone: { type: Type.STRING },
          eyeColor: { type: Type.STRING },
          styleAdvice: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                productName: { type: Type.STRING },
                reason: { type: Type.STRING },
                shadeSuggestion: { type: Type.STRING }
              },
              required: ["productName", "reason", "shadeSuggestion"]
            }
          }
        },
        required: ["faceShape", "skinTone", "eyeColor", "recommendations", "styleAdvice"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text.trim()) as AnalysisResult;
};
