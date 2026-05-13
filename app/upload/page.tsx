"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { UploadCloud, FileText, Loader2, Bot, X, Sparkles, Send } from "lucide-react"

interface Highlights {
  risky: string[]
  dates: string[]
  obligations: string[]
}

interface Message {
  role: "user" | "ai"
  content: string
}

function HighlightedText({ text, highlights }: { text: string; highlights: Highlights }) {
  if (!highlights.risky.length && !highlights.dates.length && !highlights.obligations.length) {
    return <p className="text-sm whitespace-pre-wrap leading-relaxed text-[#44312A]/80">{text}</p>
  }
  const parts: { text: string; type: "risky" | "dates" | "obligations" | "normal" }[] = []
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
      if (earliestIndex > 0) parts.push({ text: remaining.slice(0, earliestIndex), type: "normal" })
      parts.push({ text: earliestPhrase.phrase, type: earliestPhrase.type })
      remaining = remaining.slice(earliestIndex + earliestPhrase.phrase.length)
    } else {
      parts.push({ text: remaining, type: "normal" })
      break
    }
  }
  const colorMap = {
    risky: "bg-red-100 text-red-700 rounded px-1 border border-red-200 font-medium",
    dates: "bg-amber-100 text-amber-700 rounded px-1 border border-amber-200 font-medium",
    obligations: "bg-green-100 text-green-700 rounded px-1 border border-green-200 font-medium",
    normal: "text-[#78716C]",
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
  const [messages, setMessages] = useState<Message[]>([])
  const [question, setQuestion] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type === "application/pdf") setFile(dropped)
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

  const sendChat = async (q: string) => {
    if (!q.trim() || !extractedText) return
    setMessages(prev => [...prev, { role: "user", content: q }])
    setQuestion("")
    setChatLoading(true)
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, documentText: extractedText }),
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: "ai", content: data.answer }])
    setChatLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] font-sans">

      {/* Page Header */}
      <div className="bg-[#FFFCF7] border-b border-[#E7E0D8] py-24 px-6 text-center animate-in fade-in duration-1000">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#F0EAE0] border border-[#E7E0D8] px-5 py-2 rounded-full text-[10px] text-[#92400E] font-bold uppercase tracking-[0.2em] animate-in slide-in-from-top-4 duration-700">
            AI-Powered Legal Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1C1008] leading-[0.9] animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Analyze Your <span className="text-[#92400E] italic">Document</span>
          </h1>
          <p className="text-[#78716C] text-xl font-light max-w-xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200">
            Upload any legal document and understand exactly what you're signing — in plain English.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">

        {/* Upload Card */}
        <div className="bg-[#FFFCF7] border border-[#E7E0D8] rounded-3xl shadow-sm overflow-hidden">
          <div className="border-b border-[#E7E0D8] px-8 py-6 flex items-center gap-4 bg-[#F0EAE0]/50">
            <div className="w-10 h-10 bg-[#F0EAE0] rounded-xl flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-[#92400E]" />
            </div>
            <h2 className="text-[#1C1008] font-bold text-xl">Upload Document</h2>
          </div>
          <div className="p-8">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all duration-300 ${dragOver
                  ? "border-[#92400E] bg-[#F0EAE0]"
                  : "border-[#E7E0D8] hover:border-[#92400E]/50 hover:bg-[#F0EAE0]/30"
                }`}
            >
              <UploadCloud className="w-10 h-10 text-[#A8998A] mx-auto mb-3" />
              <p className="font-semibold text-[#44312A] text-base">Drop your PDF here</p>
              <p className="text-sm text-[#A8998A] mt-1">or click to browse files</p>
              <p className="text-xs text-[#C4B8AA] mt-2">Supports PDF up to 10MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {file && (
              <div className="mt-5 flex items-center gap-4 bg-[#F0EAE0] border border-[#E7E0D8] rounded-xl px-5 py-4">
                <FileText className="w-5 h-5 text-[#92400E]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1C1008] truncate">{file.name}</p>
                  <p className="text-xs text-[#A8998A] mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button onClick={() => setFile(null)} className="text-[#A8998A] hover:text-red-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`mt-10 w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 ${!file || loading
                  ? "bg-[#E7E0D8] text-[#A8998A] cursor-not-allowed"
                  : "bg-[#44312A] text-[#FAF7F2] hover:bg-[#2C1A10] shadow-xl hover:scale-[1.02] active:scale-95 group"
                }`}
            >
              {loading ? (
                <><Loader2 className="w-6 h-6 animate-spin" /> Processing Neural Core...</>
              ) : (
                <><Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" /> Upload & Extract Text</>
              )}
            </button>
          </div>
        </div>

        {/* Extracted Text */}
        {extractedText && (
          <div className="group relative bg-[#FFFCF7] border border-[#E7E0D8] hover:border-[#92400E] rounded-[2.5rem] shadow-sm overflow-hidden transition-all duration-200 inner-glow">
            {/* Watermark Decoration */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-[0.02] text-9xl font-black text-[#44312A] -rotate-90 pointer-events-none select-none tracking-[0.5em]">
              SOURCE
            </div>

            <div className="border-b border-[#E7E0D8] px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#F0EAE0]/30">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#44312A] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                  <FileText className="w-6 h-6 text-[#FAF7F2]" />
                </div>
                <div>
                  <h2 className="text-[#1C1008] font-black text-2xl tracking-tighter leading-none">Document Source</h2>
                  <p className="text-[#78716C] text-xs font-mono mt-1 uppercase tracking-widest">OCR Extraction Layer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-red-50 text-red-600 border border-red-100 text-xs px-3 py-1.5 rounded-full font-medium">🔴 Risky</span>
                <span className="bg-amber-50 text-amber-600 border border-amber-100 text-xs px-3 py-1.5 rounded-full font-medium">🟡 Dates</span>
                <span className="bg-green-50 text-green-600 border border-green-100 text-xs px-3 py-1.5 rounded-full font-medium">🟢 Obligations</span>
              </div>
            </div>
            <div className="p-8">
              <div className="max-h-72 overflow-y-auto bg-[#FAF7F2] rounded-xl p-5 border border-[#E7E0D8]">
                <HighlightedText text={extractedText} highlights={highlights} />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className={`mt-6 w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 ${analyzing
                    ? "bg-[#E7E0D8] text-[#A8998A] cursor-not-allowed"
                    : "bg-[#44312A] text-[#FAF7F2] hover:bg-[#2C1A10] shadow-md active:scale-[0.98]"
                  }`}
              >
                {analyzing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
                ) : (
                  <><Bot className="w-5 h-5" /> Analyze with AI</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Analysis + Chat */}
        {(analysis || messages.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* AI Summary */}
            <div className="bg-[#FFFCF7] border border-[#E7E0D8] hover:border-[#92400E] rounded-3xl shadow-sm overflow-hidden flex flex-col h-[650px] transition-all duration-300">
              <div className="border-b border-[#E7E0D8] px-8 py-6 flex items-center gap-4 bg-[#F0EAE0]/50">
                <div className="w-10 h-10 bg-[#F0EAE0] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#92400E]" />
                </div>
                <h2 className="text-[#1C1008] font-bold text-xl">AI Summary</h2>
              </div>
              <div className="p-8 overflow-y-auto flex-1 space-y-3 text-sm leading-relaxed">
                {analysis ? (
                  analysis.split('\n').map((line, i) => (
                    <p key={i} className={
                      line.startsWith('**')
                        ? 'font-bold text-[#1C1008] text-base mt-5 pb-2 border-b border-[#E7E0D8]'
                        : line.startsWith('*')
                          ? 'pl-4 border-l-2 border-[#92400E]/30 text-[#44312A]'
                          : 'text-[#78716C]'
                    }>
                      {line.replace(/\*\*/g, '').replace(/^\* /, '')}
                    </p>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-[#A8998A] text-center">
                    <p>Your analysis will appear here.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-[#FFFCF7] border border-[#E7E0D8] hover:border-[#92400E] rounded-3xl shadow-sm overflow-hidden flex flex-col h-[650px] transition-all duration-300">
              <div className="border-b border-[#E7E0D8] px-8 py-6 flex items-center gap-4 bg-[#F0EAE0]/50">
                <div className="w-10 h-10 bg-[#F0EAE0] rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#92400E]" />
                </div>
                <h2 className="text-[#1C1008] font-bold text-xl">Ask a Question</h2>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-3 flex flex-col">
                {messages.length === 0 && (
                  <div className="flex-1 flex flex-col justify-center space-y-3">
                    <p className="text-xs text-[#A8998A] font-medium text-center mb-2">Try asking:</p>
                    {["What are my obligations?", "Are there any penalties?", "What are the key dates?"].map(q => (
                      <button
                        key={q}
                        onClick={() => sendChat(q)}
                        className="text-left px-4 py-3 rounded-xl border border-[#E7E0D8] bg-[#FAF7F2] hover:bg-[#F0EAE0] hover:border-[#92400E]/30 transition-all text-sm text-[#78716C] hover:text-[#44312A]"
                      >
                        💡 {q}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 text-sm leading-relaxed rounded-2xl ${msg.role === "user"
                        ? "bg-[#44312A] text-[#FAF7F2]"
                        : "bg-[#F0EAE0] border border-[#E7E0D8] text-[#1C1008]"
                      }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#F0EAE0] p-4 rounded-xl text-xs text-[#A8998A] flex items-center gap-2 border border-[#E7E0D8]">
                      <Loader2 className="w-3 h-3 animate-spin" /> Thinking...
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-[#E7E0D8] bg-[#F0EAE0]/30">
                <div className="flex gap-2">
                  <Input
                    value={question}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendChat(question)}
                    placeholder="Ask about your document..."
                    className="flex-1 bg-[#FFFCF7] border-[#E7E0D8] h-11 text-sm rounded-xl text-[#1C1008]"
                  />
                  <button
                    onClick={() => sendChat(question)}
                    disabled={chatLoading || !question.trim()}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${chatLoading || !question.trim()
                        ? "bg-[#E7E0D8] text-[#A8998A]"
                        : "bg-[#44312A] text-[#FAF7F2] hover:bg-[#2C1A10]"
                      }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pb-6">
          <Link href="/dashboard" className="text-sm text-[#A8998A] hover:text-[#44312A] transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </main>
  )
}