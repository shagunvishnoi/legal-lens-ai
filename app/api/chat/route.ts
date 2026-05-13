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
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "user",
          content: `You are an AI Legal Assistant. While your primary job is to answer questions about the provided document context, you should also:
1. Respond politely to general greetings (like 'how are you' or 'hello').
2. If a question is off-topic or about a different context, give a short, polite answer and then guide the user back to asking about the document.
3. If the answer is not in the context, say "I couldn't find that in the document."
4. Always maintain a professional yet warm tone.

Document context:
${context}

Question: ${question}

Give a clear, simple answer in 2-3 sentences.`,
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
    return NextResponse.json({ error: "Failed to answer question" }, { status: 500 })
  }
}