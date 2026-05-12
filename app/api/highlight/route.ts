import { NextRequest, NextResponse } from "next/server"
import { detectRiskyClasses } from "@/ai/simplify"

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text) return NextResponse.json({ error: "No text" }, { status: 400 })
    const highlights = await detectRiskyClasses(text)
    return NextResponse.json(highlights)
  } catch (error) {
    console.error("Highlight error:", error)
    return NextResponse.json({ risky: [], dates: [], obligations: [] })
  }
}