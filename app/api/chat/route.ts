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
          content: `You are a legal document assistant. Answer the question based ONLY on the document context below. If the answer is not in the context, say "I couldn't find that in the document."

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