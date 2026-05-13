import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { findRelevantChunks, storeDocument } from "@/rag"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { question, documentText } = await req.json()

    if (!question || !documentText) {
      return NextResponse.json({ error: "Missing question or document" }, { status: 400 })
    }

    // Store and chunk the document
    storeDocument(documentText)

    // Find relevant chunks
    const relevantChunks = findRelevantChunks(question)
    const context = relevantChunks.join("\n\n")

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      messages: [
        {
          role: "user",
          content: `You are a warm, helpful, and natural AI Legal Assistant. Your goal is to help the user understand their document in plain, simple English.

Guidelines:
1. Be natural: Use a friendly, human-like tone. Don't sound like a robot.
2. Be smart: If the user asks about 'risks' or 'problems', look for 'liabilities', 'indemnities', 'termination', or anything that seems unfair.
3. Be inclusive: If the user uses simple or broken English, respond with very clear and simple language to help them understand.
4. Be helpful: If you don't see an exact answer, find the most related information and explain it. Never just say "I don't know."
5. Stay on track: If they ask something totally unrelated to legal docs, give a quick friendly answer but gently bring them back to the document.

Document context:
${context.slice(0, 2000)}

Question: ${question}

Respond in 2-3 natural sentences.`,
        },
      ],
      max_tokens: 512,
    })

    return NextResponse.json({
      answer: completion.choices[0]?.message?.content ?? "No answer found",
      context: relevantChunks,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "AI analysis temporarily unavailable. Please try again shortly." }, { status: 500 })
  }
}