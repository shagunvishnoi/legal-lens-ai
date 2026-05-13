import { NextRequest, NextResponse } from "next/server"
import { analyzeDocument } from "@/ai/simplify"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    const result = await analyzeDocument(text)
    
    if (!result || !result.summary) {
      console.error("AI returned empty analysis for provided text");
      return NextResponse.json({ error: "The AI was unable to generate a summary for this document. Please try a different section or a shorter document." }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "AI analysis temporarily unavailable. Please try again shortly." }, { status: 500 })
  }
}