import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export interface AnalysisResult {
  summary: string
  highlights: {
    risky: string[]
    dates: string[]
    obligations: string[]
  }
}

export async function analyzeDocument(text: string): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      }
    })

    const prompt = `You are an expert legal assistant. Analyze the following legal text and provide a summary and highlight extraction in a SINGLE JSON object.

Format your response EXACTLY like this:
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
${text.slice(0, 10000)}`

    const result = await model.generateContent(prompt)
    const content = result.response.text()
    
    return JSON.parse(content)
  } catch (e) {
    console.error("Analysis parsing or API failed:", e)
    return {
      summary: "Error analyzing document.",
      highlights: { risky: [], dates: [], obligations: [] }
    }
  }
}