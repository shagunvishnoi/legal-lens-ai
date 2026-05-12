import { NextRequest, NextResponse } from "next/server"
import { extractText } from "unpdf"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    const { text } = await extractText(buffer, { mergePages: true })

    return NextResponse.json({
      text: text,
      fileName: file.name,
    })
  } catch (error) {
    console.error("PDF extraction error:", error)
    return NextResponse.json({ error: "Failed to extract text", details: String(error) }, { status: 500 })
  }
}