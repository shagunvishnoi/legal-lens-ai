"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, CalendarClock, Scale, Loader2, Bot, ArrowRight, X, Sparkles, Send, MessageSquare } from "lucide-react"

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
    return <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground/80">{text}</p>
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
    risky: "bg-red-500/20 text-red-500 rounded-md px-1.5 py-0.5 border border-red-500/30 font-bold uppercase text-[10px] tracking-tight",
    dates: "bg-amber-500/20 text-amber-500 rounded-md px-1.5 py-0.5 border border-amber-500/30 font-bold uppercase text-[10px] tracking-tight",
    obligations: "bg-green-500/20 text-green-500 rounded-md px-1.5 py-0.5 border border-green-500/30 font-bold uppercase text-[10px] tracking-tight",
    normal: "text-muted-foreground",
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
    <main className="min-h-screen bg-background relative overflow-hidden font-sans">
      {/* Workspace Header */}
      <div className="relative py-24 px-6 text-center z-10 bg-white border-b border-slate-100 animate-in fade-in duration-1000">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 px-4 py-1.5 rounded-full text-[10px] text-primary font-bold uppercase tracking-widest animate-in slide-in-from-top-4 duration-700">
            Encrypted Analysis Workspace
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-[#0F172A] animate-in slide-in-from-bottom-8 duration-700 delay-100 leading-none">
            Agreement <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-xl font-light max-w-xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200">
            Zero-knowledge document interrogation. Securely upload and deconstruct any agreement with neural precision.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-16 relative z-10">

        {/* Upload Card */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden animate-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="border-b border-slate-100 px-10 py-8 flex items-center gap-4 bg-slate-50/30">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <UploadCloud className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-[#0F172A] font-black text-2xl tracking-tighter">Document Depository</h2>
          </div>
          <div className="p-8">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 relative ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <UploadCloud className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-bold text-foreground text-lg">Drop PDF document here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse your files</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {file && (
              <div className="mt-6 flex items-center gap-4 bg-muted/50 border border-border rounded-xl px-6 py-4">
                <FileText className="w-6 h-6 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                !file || loading
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Extract Text</>
              )}
            </button>
          </div>
        </div>

        {/* Source Content */}
        {extractedText && (
          <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            <div className="border-b border-border px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-[#0F172A] font-bold text-xl tracking-tight">Source Verification</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                   High Risk
                </span>
                <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                   Medium Risk
                </span>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                   Safe
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="max-h-80 overflow-y-auto bg-background rounded-xl p-6 border border-border">
                <HighlightedText text={extractedText} highlights={highlights} />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  analyzing
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                }`}
              >
                {analyzing ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Analyzing...</>
                ) : (
                  <><Bot className="w-6 h-6" /> Run Full AI Analysis</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* AI Results & Chat Panel */}
        {(analysis || messages.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Summary Column */}
            <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden h-[700px] flex flex-col">
              <div className="border-b border-border px-8 py-6 flex items-center gap-4 bg-slate-50/50">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-[#0F172A] font-bold text-xl tracking-tight">Executive Insight</h2>
              </div>
              <div className="p-8 overflow-y-auto flex-1 space-y-4 text-sm text-slate-600 leading-relaxed">
                {analysis ? (
                  analysis.split('\n').map((line, i) => (
                    <p key={i} className={
                      line.startsWith('**')
                        ? 'font-bold text-[#0F172A] text-lg mt-6 pb-2 border-b border-border mb-2'
                        : line.startsWith('*')
                        ? 'pl-4 border-l-2 border-primary/30'
                        : ''
                    }>
                      {line.replace(/\*\*/g, '').replace(/^\* /, '')}
                    </p>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-center px-10">
                    <p>Analysis will appear here after processing.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Column */}
            <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-[700px]">
              <div className="border-b border-border px-8 py-6 flex items-center gap-4 bg-slate-50/50">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-[#0F172A] font-bold text-xl tracking-tight">AI Counsel</h2>
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto space-y-4 flex flex-col">
                {messages.length === 0 && (
                  <div className="flex-1 flex flex-col justify-center space-y-4 px-4 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Prompt Suggestions</p>
                    {["Summarize the termination clauses.", "Identify any hidden penalty fees.", "What are the key deadlines?"].map(q => (
                      <button
                        key={q}
                        onClick={() => sendChat(q)}
                        className="text-left px-5 py-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-primary/30 transition-all text-xs font-medium text-slate-500 hover:text-[#0F172A] shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[90%] p-4 text-sm leading-relaxed rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-white shadow-sm"
                        : "bg-slate-100 border border-slate-200 text-slate-800"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-400 flex items-center gap-2 border border-slate-100">
                      <Loader2 className="w-3 h-3 animate-spin" /> Copilot is researching...
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={question}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendChat(question)}
                    placeholder="Inquire about document details..."
                    className="flex-1 bg-white border-border h-12 text-sm rounded-xl shadow-sm focus:ring-primary"
                  />
                  <button
                    onClick={() => sendChat(question)}
                    disabled={chatLoading || !question.trim()}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      chatLoading || !question.trim()
                        ? "bg-slate-200 text-slate-400"
                        : "bg-primary text-white hover:bg-primary/90 shadow-md"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}