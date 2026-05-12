import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function simplifyLegalText(text: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
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