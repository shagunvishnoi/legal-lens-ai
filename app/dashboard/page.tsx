import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scale, FileText, ShieldAlert, MessageSquare, ArrowRight, CheckCircle2, Bot, Sparkles } from "lucide-react"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center min-h-[85vh] animate-in fade-in duration-1000">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 px-6 py-2.5 rounded-full text-xs text-primary font-bold uppercase tracking-widest animate-in slide-in-from-top-4 duration-700">
            Next-Gen Document Intelligence
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] max-w-5xl mx-auto text-[#0F172A] animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Stop signing <br className="hidden md:block" />
            <span className="text-primary italic">blindly.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200">
            LegalLens AI decodes complex agreements in seconds. Identify hidden risks, obligations, and critical terms with enterprise-grade precision.
          </p>
          
          <div className="flex justify-center pt-10 animate-in zoom-in-95 duration-700 delay-300">
            <Link href="/upload">
              <Button size="lg" className="bg-primary hover:bg-[#1d4ed8] text-white font-black px-12 h-20 text-xl rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.03] hover:-rotate-1 active:scale-95 group">
                <span className="relative z-10 flex items-center gap-3">
                  Analyze Your First Document <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32 animate-in slide-in-from-bottom-12 duration-1000 delay-500">
        {[
          { value: "100%", label: "Privacy Guaranteed", icon: <Scale className="w-7 h-7 text-primary" /> },
          { value: "Zero", label: "Hidden Clauses", icon: <ShieldAlert className="w-7 h-7 text-primary" /> },
          { value: "< 5s", label: "Analysis Time", icon: <CheckCircle2 className="w-7 h-7 text-primary" /> },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-[2.5rem] p-10 text-center border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
            <div className="mx-auto w-16 h-16 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
              {stat.icon}
            </div>
            <div className="text-5xl font-black text-[#0F172A] mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-48 animate-in slide-in-from-bottom-12 duration-1000 delay-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { icon: <FileText className="w-7 h-7 text-primary" />, title: "Precision Extraction", desc: "Our proprietary OCR engine reconstructs document structure with 99.9% semantic accuracy." },
            { icon: <Sparkles className="w-7 h-7 text-primary" />, title: "Semantic Simplification", desc: "Complex legal jargon is distilled into high-velocity summaries for instant decision making." },
            { icon: <ShieldAlert className="w-7 h-7 text-primary" />, title: "Exposure Detection", desc: "Automatically identify outlier clauses, predatory liabilities, and critical compliance gaps." },
            { icon: <MessageSquare className="w-7 h-7 text-primary" />, title: "Contextual Interrogation", desc: "Chat directly with your document. Our RAG pipeline provides source-cited legal intelligence." },
          ].map(f => (
            <div key={f.title} className="bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-3xl font-black text-[#0F172A] mb-4 tracking-tighter leading-none">{f.title}</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-40">
        <div className="bg-card border border-border rounded-3xl p-16 md:p-24 text-center shadow-sm">
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">Ready to eliminate legal blindspots?</h2>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto font-light pb-4">Join professionals who trust our AI to review documents faster, safer, and with perfect precision.</p>
            <div className="flex justify-center">
              <Link href="/upload">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-12 h-16 text-lg rounded-full shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
                  Begin Document Analysis <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}