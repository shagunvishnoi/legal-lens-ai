import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function simplifyLegalText(text: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `You are a legal document simplifier.

Analyze the following legal text and provide:
1. A simple plain-English summary (2-3 sentences)
2. Key obligations (bullet points)
3. Important dates or deadlines (if any)
4. Risk flags (clauses that seem unfair or risky)

Legal text:
${text.slice(0, 3000)}

Format your response with these exact sections:
**SUMMARY**
**KEY OBLIGATIONS**
**IMPORTANT DATES**
**RISK FLAGS**`,
      },
    ],
    max_tokens: 1024,
  })

  return completion.choices[0]?.message?.content ?? ""
}

export async function detectRiskyClasses(text: string): Promise<{
  risky: string[]
  dates: string[]
  obligations: string[]
}> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `You are a legal risk detector. Extract exact phrases from the following legal text.

Return ONLY a valid JSON object with no extra text, no markdown, no backticks:
{
  "risky": ["exact risky phrase 1", "exact risky phrase 2"],
  "dates": ["exact date phrase 1"],
  "obligations": ["exact obligation phrase 1"]
}

Rules:
- phrases must be EXACTLY as they appear in the text
- max 5 items per category
- keep phrases short (under 10 words)

Legal text:
${text.slice(0, 2000)}`,
      },
    ],
    max_tokens: 512,
  })

  try {
    const content = completion.choices[0]?.message?.content ?? "{}"
    const cleaned = content.replace(/```json|```/g, "").trim()
    return JSON.parse(cleaned)
  } catch (e) {
    const content = completion.choices[0]?.message?.content ?? "{}"
    console.error("JSON Parsing failed. Raw content from Groq:", content);
    return { risky: [], dates: [], obligations: [] }
  }
}