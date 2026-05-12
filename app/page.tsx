"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [analysis, setAnalysis] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
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
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: extractedText }),
    })
    const data = await res.json()
    setAnalysis(data.analysis)
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
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border rounded p-2 text-sm"
          />
          {file && (
            <p className="text-sm text-muted-foreground">Selected: {file.name}</p>
          )}
          <Button onClick={handleUpload} disabled={!file || loading} className="w-full">
            {loading ? "Extracting..." : "Upload & Extract Text"}
          </Button>
        </Card>

        {extractedText && (
          <Card className="p-6 space-y-4">
            <h2 className="font-semibold">Extracted Text:</h2>
            <p className="text-sm whitespace-pre-wrap text-muted-foreground max-h-48 overflow-y-auto">
              {extractedText}
            </p>
            <Button onClick={handleAnalyze} disabled={analyzing} className="w-full">
              {analyzing ? "Analyzing with AI..." : "Analyze with AI"}
            </Button>
          </Card>
        )}

{analysis && (
  <Card className="p-6">
    <h2 className="font-semibold mb-3">AI Legal Analysis:</h2>
    <div className="text-sm whitespace-pre-wrap text-muted-foreground prose prose-sm max-w-none">
      {analysis.split('\n').map((line, i) => (
        <p key={i} className={line.startsWith('**') ? 'font-bold mt-3' : ''}>
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