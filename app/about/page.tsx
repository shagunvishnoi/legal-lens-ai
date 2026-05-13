import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target, Activity, Wrench, ArrowRight, FileText, Scale, ShieldAlert, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] relative overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-6 flex flex-col items-center justify-center text-center z-10 border-b border-[#E7E0D8] bg-[#FFFCF7] animate-in fade-in duration-1000 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#44312A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-3 bg-[#F0EAE0] border border-[#E7E0D8] px-4 py-1.5 rounded-full text-[10px] text-[#92400E] font-bold uppercase tracking-[0.2em] animate-in slide-in-from-top-4 duration-700">
            The LegalLens Protocol
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] max-w-4xl mx-auto text-[#1C1008] animate-float">
            Absolute legal <br className="hidden md:block" />
            <span className="text-[#92400E] italic">clarity.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#78716C] max-w-3xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200">
            We are engineering a future where agreements are understood, not just signed. Zero jargon. Full transparency.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-24 space-y-16 relative z-10">

        {/* Mission */}
        <div className="bg-[#FFFCF7] border border-[#E7E0D8] shadow-sm rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-md">
          <div className="border-b border-[#E7E0D8] px-8 py-5 flex items-center gap-3 bg-[#F0EAE0]/30">
            <div className="w-8 h-8 bg-[#F0EAE0] rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-[#92400E]" />
            </div>
            <h2 className="text-[#1C1008] font-bold text-xl tracking-tight">Our Mission</h2>
          </div>
          <div className="p-8 space-y-4">
            <p className="text-[#44312A] leading-relaxed text-lg font-light">
              Legal documents are often dense, confusing, and difficult for ordinary people to understand. Hidden clauses, legal jargon, and complex agreements can lead to unfair decisions, financial loss, or obligations users never fully understood.
            </p>
            <p className="text-[#44312A] leading-relaxed text-lg font-light">
              LegalLens AI was built to make legal understanding accessible to everyone. By combining artificial intelligence with intelligent document analysis, LegalLens AI simplifies contracts, highlights risks, explains obligations, and helps users make informed decisions before signing important agreements.
            </p>
            <p className="text-[#44312A] leading-relaxed text-lg font-light">
              We believe legal clarity should not be limited to lawyers or large corporations — it should be accessible, transparent, and understandable for everyone.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-[#FFFCF7] border border-[#E7E0D8] shadow-sm rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="border-b border-[#E7E0D8] px-8 py-5 flex items-center gap-3 bg-[#F0EAE0]/30">
            <div className="w-8 h-8 bg-[#F0EAE0] rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#92400E]" />
            </div>
            <h2 className="text-[#1C1008] font-bold text-xl tracking-tight">Our Platform</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: <FileText className="w-5 h-5 text-[#92400E]" />, title: "Smart Text Extraction", desc: "High-fidelity extraction that preserves the structural integrity and formatting of your legal documents." },
                { icon: <Scale className="w-5 h-5 text-[#92400E]" />, title: "Linguistic Simplification", desc: "Advanced LLMs translate dense legalese into plain, actionable English summaries." },
                { icon: <ShieldAlert className="w-5 h-5 text-[#92400E]" />, title: "Intelligent Risk Detection", desc: "AI-driven analysis that identifies unusual clauses, hidden liabilities, and critical deadlines." },
                { icon: <MessageSquare className="w-5 h-5 text-[#92400E]" />, title: "Document Intelligence Chat", desc: "Context-aware interrogation of your document to get instant answers about specific terms." },
              ].map((f, i) => (
                <div key={f.title} className={`p-8 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D8] hover:border-[#92400E] space-y-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 delay-${(i+1)*100}`}>
                  <div className="w-12 h-12 bg-[#FFFCF7] border border-[#E7E0D8] rounded-xl flex items-center justify-center mb-2 shadow-sm">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-[#1C1008] text-2xl tracking-tight leading-none">{f.title}</h3>
                  <p className="text-lg text-[#78716C] leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1C1008] border border-[#2C1A10] shadow-xl rounded-[3rem] p-16 text-center mt-12 animate-in zoom-in-95 duration-700">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#FAF7F2] tracking-tight leading-none">Start your first analysis.</h2>
            <p className="text-[#A8998A] text-xl max-w-2xl mx-auto font-light">Join the new standard in document intelligence. Free for individual users.</p>
            <div className="flex justify-center">
              <Link href="/upload">
                <Button size="lg" className="bg-[#92400E] text-[#FAF7F2] hover:bg-[#78350F] font-bold px-12 h-16 text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center gap-2">
                  Launch Analyzer <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 pb-4">
          <Link href="/dashboard" className="text-sm text-[#A8998A] hover:text-[#1C1008] transition-colors inline-flex items-center gap-2 font-medium">
            ← Return to Dashboard
          </Link>
        </div>

      </div>
    </main>
  )
}