import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export interface AnalysisResult {
  summary: string
  highlights: {
    risky: string[]
    dates: string[]
    obligations: string[]
  }
}

export async function analyzeDocument(text: string): Promise<AnalysisResult> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `You are an expert legal assistant. Analyze the following legal text and provide a summary and highlight extraction in a SINGLE JSON object.

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
${text.slice(0, 10000)}`,
      },
    ],
    max_tokens: 800,
    response_format: { type: "json_object" }
  })

  try {
    const content = completion.choices[0]?.message?.content ?? "{}"
    return JSON.parse(content)
  } catch (e) {
    console.error("Analysis parsing failed:", e)
    return {
      summary: "Error analyzing document.",
      highlights: { risky: [], dates: [], obligations: [] }
    }
  }
}