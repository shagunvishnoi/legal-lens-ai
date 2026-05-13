import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { findRelevantChunks, storeDocument } from "@/rag";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { question, documentText } = await req.json();

    if (!question || !documentText) {
      return NextResponse.json({ error: "Missing question or document" }, { status: 400 });
    }

    // Store and chunk the document
    storeDocument(documentText);

    // Find relevant chunks
    const relevantChunks = findRelevantChunks(question);
    const context = relevantChunks.join("\n\n");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a warm, helpful, and natural AI Legal Assistant. Your goal is to help the user understand their document in plain, simple English.

Guidelines:
1. Be natural: Use a friendly, human-like tone.
2. Be smart: If the user asks about 'risks' or 'problems', look for 'liabilities', 'indemnities', 'termination', or anything that seems unfair.
3. Be inclusive: Respond with very clear and simple language.
4. Be helpful: If you don't see an exact answer, find the most related information and explain it.
5. Stay on track: Focus on the document provided.

Document context:
${context}

Question: ${question}

Respond in 2-3 natural sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    return NextResponse.json({
      answer: answer,
      context: relevantChunks,
    });
  } catch (error) {
    console.error("Gemini Chat error:", error);
    return NextResponse.json({ error: "AI assistant is currently busy. Please try again in 10 seconds." }, { status: 500 });
  }
}