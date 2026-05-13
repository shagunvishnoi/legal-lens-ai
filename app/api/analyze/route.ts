import { NextRequest, NextResponse } from "next/server"
import { simplifyLegalText } from "@/ai/simplify"

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    const analysis = await simplifyLegalText(text)

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "AI analysis temporarily unavailable. Please try again shortly." }, { status: 500 })
  }
}