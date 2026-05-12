"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Highlights {
  risky: string[]
  dates: string[]
  obligations: string[]
}

function HighlightedText({ text, highlights }: { text: string; highlights: Highlights }) {
  if (!highlights.risky.length && !highlights.dates.length && !highlights.obligations.length) {
    return <p className="text-sm whitespace-pre-wrap">{text}</p>
  }

  let result = text
  const parts: { text: string; type: "risky" | "dates" | "obligations" | "normal" }[] = []

  // Simple highlight by splitting text
  const allPhrases = [
    ...highlights.risky.map(p => ({ phrase: p, type: "risky" as const })),
    ...highlights.dates.map(p => ({ phrase: p, type: "dates" as const })),
    ...highlights.obligations.map(p => ({ phrase: p, type: "obligations" as const })),
  ]

  let remaining = text
  while (remaining.length > 0) {
    let earliestIndex = -1
    let earliestPhrase = null as { phrase: string; type: "risky" | "dates" | "obligations" } | null

    for (const p of allPhrases) {
      const idx = remaining.indexOf(p.phrase)
      if (idx !== -1 && (earliestIndex === -1 || idx < earliestIndex)) {
        earliestIndex = idx
        earliestPhrase = p
      }
    }

    if (earliestPhrase && earliestIndex !== -1) {
      if (earliestIndex > 0) {
        parts.push({ text: remaining.slice(0, earliestIndex), type: "normal" })
      }
      parts.push({ text: earliestPhrase.phrase, type: earliestPhrase.type })
      remaining = remaining.slice(earliestIndex + earliestPhrase.phrase.length)
    } else {
      parts.push({ text: remaining, type: "normal" })
      break
    }
  }

  const colorMap = {
    risky: "bg-red-200 text-red-900 rounded px-0.5",
    dates: "bg-yellow-200 text-yellow-900 rounded px-0.5",
    obligations: "bg-blue-200 text-blue-900 rounded px-0.5",
    normal: "",
  }

  return (
    <p className="text-sm whitespace-pre-wrap leading-relaxed">
      {parts.map((part, i) => (
        <span key={i} className={colorMap[part.type]}>{part.text}</span>
      ))}
    </p>
  )
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [highlights, setHighlights] = useState<Highlights>({ risky: [], dates: [], obligations: [] })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()
    setExtractedText(data.text)
    setLoading(false)
  }

  const handleAnalyze = async () => {
    if (!extractedText) return
    setAnalyzing(true)

    const [analysisRes, highlightRes] = await Promise.all([
      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      }),
      fetch("/api/highlight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: extractedText }),
      }),
    ])

    const analysisData = await analysisRes.json()
    const highlightData = await highlightRes.json()

    setAnalysis(analysisData.analysis)
    setHighlights(highlightData)
    setAnalyzing(false)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">Upload Legal Document</h1>
        <p className="text-muted-foreground text-center">
          Upload a PDF and get instant AI-powered legal analysis.
        </p>

        <Card className="p-6 space-y-4">
          <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full border rounded p-2 text-sm" />
          {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
          <Button onClick={handleUpload} disabled={!file || loading} className="w-full">
            {loading ? "Extracting..." : "Upload & Extract Text"}
          </Button>
        </Card>

        {extractedText && (
          <Card className="p-6 space-y-4">
            <div className="flex gap-4 text-xs">
              <span className="bg-red-200 text-red-900 px-2 py-0.5 rounded">🔴 Risky</span>
              <span className="bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded">🟡 Dates</span>
              <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded">🔵 Obligations</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <HighlightedText text={extractedText} highlights={highlights} />
            </div>
            <Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
              {analyzing ? "Analyzing with AI..." : "Analyze with AI"}
            </Button>
          </Card>
        )}

        {analysis && (
          <Card className="p-6">
            <h2 className="font-semibold mb-3">AI Legal Analysis:</h2>
            <div className="text-sm whitespace-pre-wrap text-muted-foreground">
              {analysis.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('**') ? 'font-bold mt-3 text-foreground' : ''}>
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}