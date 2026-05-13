import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface AnalysisResult {
  summary: string
  highlights: {
    risky: string[]
    dates: string[]
    obligations: string[]
  }
}

export async function analyzeDocument(text: string): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are an expert legal assistant. Analyze the following legal text and provide a summary and highlight extraction in a SINGLE JSON object.

Format your response EXACTLY like this (no other text, no markdown, no backticks):
{
  "summary": "**SUMMARY**\\n[2-3 sentence overview]\\n\\n**KEY OBLIGATIONS**\\n* [obligation 1]\\n* [obligation 2]\\n\\n**IMPORTANT DATES**\\n* [date 1]\\n\\n**RISK FLAGS**\\n* [risk 1]",
  "highlights": {
    "risky": ["phrase 1", "phrase 2"],
    "dates": ["date phrase 1"],
    "obligations": ["action phrase 1"]
  }
}

Rules for highlights:
- Phrases must be EXACTLY as they appear in the text.
- Short phrases (under 8 words).
- Max 5 per category.

Legal text:
${text.slice(0, 100000)}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();
    // Gemini sometimes adds backticks even if told not to
    const cleaned = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Gemini Analysis failed:", e);
    return {
      summary: "Error analyzing document with Gemini.",
      highlights: { risky: [], dates: [], obligations: [] }
    };
  }
}