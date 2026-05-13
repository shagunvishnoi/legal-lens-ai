import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Activity, Wrench, ArrowRight, FileText, Scale, ShieldAlert, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center text-center z-10 border-b border-slate-100 bg-white animate-in fade-in duration-1000">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 px-5 py-2 rounded-full text-[10px] text-primary font-bold uppercase tracking-[0.2em] animate-in slide-in-from-top-4 duration-700">
            The LegalLens Protocol
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto text-[#0F172A] animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Absolute legal <br className="hidden md:block" />
            <span className="text-[#2563EB] italic">clarity.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200">
            We are engineering a future where agreements are understood, not just signed. Zero jargon. Full transparency.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-24 space-y-16 relative z-10">

        {/* Mission */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <div className="border-b border-slate-200 px-10 py-6 flex items-center gap-4 bg-slate-50/50">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-[#0F172A] font-bold text-2xl tracking-tight">Our Mission</h2>
          </div>
          <div className="p-10">
            <p className="text-slate-600 leading-relaxed text-xl font-light">
              Legal documents are complex, confusing, and often asymmetric. LegalLens AI was built to democratize legal understanding — giving individuals and professionals the power to analyze agreements with perfect precision. We believe legal clarity is a fundamental right.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
          <div className="border-b border-slate-200 px-10 py-6 flex items-center gap-4 bg-slate-50/50">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-[#0F172A] font-bold text-2xl tracking-tight">Our Platform</h2>
          </div>
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: <FileText className="w-5 h-5 text-primary" />, title: "Intelligent Extraction", desc: "OCR-powered extraction that preserves complex legal formatting and structure." },
                { icon: <Scale className="w-5 h-5 text-primary" />, title: "Linguistic Simplification", desc: "Advanced LLMs translate dense legalese into plain, actionable English summaries." },
                { icon: <ShieldAlert className="w-5 h-5 text-primary" />, title: "Automated Risk Scoring", desc: "Heuristic-driven AI identifies unusual clauses, liabilities, and hidden deadlines." },
                { icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "Semantic Document Chat", desc: "Context-aware interrogation of your document using a secure RAG pipeline." },
              ].map(f => (
                <div key={f.title} className="p-6 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-2">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-xl tracking-tight">{f.title}</h3>
                  <p className="text-base text-slate-500 leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-16 text-center mt-12">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">Start your first analysis.</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-light">Join the new standard in document intelligence. Free for individual users.</p>
            <div className="flex justify-center">
              <Link href="/upload">
                <Button size="lg" className="bg-[#2563EB] text-white hover:bg-[#1d4ed8] font-bold px-12 h-16 text-lg rounded-full shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
                  Launch Analyzer <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 pb-4">
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-[#0F172A] transition-colors inline-flex items-center gap-2 font-medium">
            ← Return to Dashboard
          </Link>
        </div>

      </div>
    </main>
  )
}