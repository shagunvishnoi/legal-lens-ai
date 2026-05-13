"use client"

import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { 
  ArrowRight, X, Shield, Zap, Search, MessageCircle, 
  FileText, Scale, ShieldAlert, Bot, Sparkles, 
  Cpu, Layout, Layers, Terminal, CheckCircle2, UploadCloud
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98])

  const currentTech = [
    { 
      category: "Frontend", 
      items: ["Next.js 16", "TypeScript", "Tailwind CSS"],
      icon: <Layout className="w-5 h-5 text-[#92400E]" />
    },
    { 
      category: "AI Layer", 
      items: ["Groq / Gemini API", "Llama 3.3 Model", "Vision Analysis"],
      icon: <Cpu className="w-5 h-5 text-[#92400E]" />
    },
    { 
      category: "Backend", 
      items: ["API Routes", "OCR Extraction", "PDF Processing"],
      icon: <Terminal className="w-5 h-5 text-[#92400E]" />
    },
  ]

  return (
    <main className="min-h-screen bg-[#FAF7F2] font-sans selection:bg-[#92400E] selection:text-[#FAF7F2] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden border-b border-[#E7E0D8]">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto space-y-6 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#F0EAE0] border border-[#E7E0D8] px-3 py-1 rounded-full text-[10px] text-[#92400E] font-bold uppercase tracking-[0.2em] shadow-sm"
          >
            <CheckCircle2 className="w-3 h-3" /> Version 1.0 Live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-[#1C1008]"
          >
            Stop signing <br />
            <span className="text-[#92400E] italic relative inline-block">
              blindly.
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-1.5 left-0 h-1.5 bg-[#92400E]/10 -z-10"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-[#78716C] max-w-2xl mx-auto leading-relaxed font-light"
          >
            AI-powered legal document analysis that simplifies agreements, highlights risky clauses, and explains contracts in plain English.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href="/upload">
              <Button size="lg" className="bg-[#44312A] hover:bg-[#2C1A10] text-[#FAF7F2] font-bold px-8 h-14 text-base rounded-xl shadow-xl transition-all group overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">
                  Analyze Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="#preview">
              <Button variant="outline" size="lg" className="border-[#E7E0D8] text-[#1C1008] hover:bg-[#F0EAE0] font-bold px-8 h-14 text-base rounded-xl">
                View Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#44312A 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </section>

      {/* 2. LIVE AI PREVIEW SECTION */}
      <section id="preview" className="max-w-6xl mx-auto px-6 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white border border-[#E7E0D8] rounded-[2rem] shadow-xl overflow-hidden relative group"
          >
            <div className="border-b border-[#E7E0D8] bg-[#F0EAE0]/10 px-6 py-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
              </div>
              <span className="text-[10px] font-mono text-[#A8998A] uppercase tracking-[0.3em]"></span>
            </div>
            
            <div className="p-8 md:p-10 space-y-6 font-serif text-[#1C1008] leading-relaxed relative text-[15px]">
              <motion.div 
                initial={{ top: "0%" }}
                whileInView={{ top: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-[#92400E]/60 z-20 shadow-[0_0_15px_rgba(146,64,14,0.4)]"
              />

              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-[#E7E0D8] opacity-30" />
              <h3 className="text-xl font-bold mb-8 pl-8 tracking-tight">Standard Service Agreement</h3>
              
              <motion.p 
                initial={{ opacity: 0.1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.2 }}
                className="pl-8 relative"
              >
                This agreement is effective as of <span className="bg-amber-100/60 text-amber-900 px-1.5 py-0.5 rounded border border-amber-200/50 font-bold">January 20, 2026</span>...
              </motion.p>

              <motion.p 
                initial={{ opacity: 0.1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.2 }}
                className="pl-8 relative"
              >
                Section 4. <span className="font-bold">Liability.</span> The total liability shall be <span className="bg-red-100/60 text-red-900 px-1.5 py-0.5 rounded border border-red-200/50 font-bold">limited to $0.00 regardless of the nature of the claim</span>...
              </motion.p>

              <motion.p 
                initial={{ opacity: 0.1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.8, duration: 0.2 }}
                className="pl-8 relative"
              >
                Section 9. <span className="font-bold">Confidentiality.</span> The parties agree to <span className="bg-blue-100/60 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200/50 font-bold">maintain strict confidentiality</span> for a period of five years...
              </motion.p>

              <p className="pl-8 text-gray-300 select-none blur-[0.5px] text-sm">Additional terms continue with complex legal definitions and jurisdictional boilerplate...</p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-5">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1C1008] text-[#FAF7F2] p-8 rounded-[2rem] shadow-xl space-y-6 border border-white/5 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <div className="w-8 h-8 bg-[#92400E] rounded-lg flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[10px] tracking-[0.2em] uppercase text-[#92400E]">AI Analysis</h3>
              </div>
              
              <ul className="space-y-3">
                {[
                  { text: "Unfair Liability Limit Detected", color: "text-red-400", delay: 0.6 },
                  { text: "Auto-renewal Clause Identified", color: "text-amber-400", delay: 1.2 },
                  { text: "Execution Deadline: Jan 20", color: "text-blue-400", delay: 1.8 },
                  { text: "Confidentiality Term Found", color: "text-green-400", delay: 2.2 },
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    className="flex items-center gap-3 text-[13px] font-medium p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text', 'bg')} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                    {item.text}
                  </motion.li>
                ))}
              </ul>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.8 }}
                className="pt-5 border-t border-white/10 space-y-4"
              >
                <div className="flex justify-end">
                  <div className="bg-[#92400E] text-[11px] p-3 rounded-xl rounded-tr-none font-medium max-w-[90%]">
                    Can they terminate immediately?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/5 text-[11px] p-3 rounded-xl rounded-tl-none font-light max-w-[90%] border border-white/10 leading-relaxed italic">
                    <span className="text-[#92400E] font-bold mr-1">AI:</span>
                    Yes. Clause 7 allows termination without notice under specific conditions.
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E7E0D8] p-4 rounded-xl flex items-center justify-between shadow-sm group cursor-help"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                <p className="text-[#1C1008] font-bold text-[9px] uppercase tracking-widest">How it helps!</p>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#92400E]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="bg-[#F0EAE0]/20 py-20 border-y border-[#E7E0D8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-[#1C1008] tracking-tighter uppercase"
            >
              Professional Workflow
            </motion.h2>
            <p className="text-[#78716C] max-w-md mx-auto font-light text-base">Three steps to total contract transparency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <UploadCloud className="w-7 h-7" />, title: "Upload PDF", desc: "Drop your legal agreement into our secure analyzer." },
              { icon: <Cpu className="w-7 h-7" />, title: "AI Analysis", desc: "AI extracts and analyzes legal text in seconds." },
              { icon: <MessageCircle className="w-7 h-7" />, title: "Smart Chat", desc: "Ask specific questions about your document terms." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-white border border-[#E7E0D8] rounded-2xl mx-auto flex items-center justify-center shadow-sm text-[#92400E]">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-[#1C1008] tracking-tight">{step.title}</h3>
                <p className="text-[13px] text-[#78716C] leading-relaxed font-light px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECH STACK SECTION */}
      <section className="bg-[#1C1008] py-20 border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-black text-[#FAF7F2] tracking-tighter uppercase">Production Tech Stack</h2>
              <p className="text-[#A8998A] text-base font-light">The architecture powering LegalLens AI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentTech.map((group, i) => (
                <motion.div 
                  key={group.category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-[#92400E]/40 transition-colors">
                        {group.icon}
                      </div>
                      <h3 className="text-lg font-bold text-[#FAF7F2] tracking-tight">{group.category}</h3>
                    </div>
                    <ul className="space-y-3">
                      {group.items.map(item => (
                        <li key={item} className="flex items-center gap-2.5 text-[#A8998A] text-[13px] font-medium">
                          <div className="w-1 h-1 bg-[#92400E] rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY LEGALLENS AI SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#E7E0D8] rounded-[3rem] p-12 md:p-16 shadow-lg relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-[#1C1008] tracking-tighter leading-none">Why LegalLens <br /> <span className="text-[#92400E]">AI?</span></h2>
              <p className="text-lg text-[#78716C] leading-relaxed font-light">
                Most people sign agreements without understanding the hidden traps. LegalLens AI simplifies legal agreements into actionable insights.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Liabilities", "Penalties", "Auto-renewals", "Obligations"].map(trap => (
                  <div key={trap} className="flex items-center gap-3 text-[#1C1008] font-black text-[10px] uppercase tracking-widest bg-[#FAF7F2] p-4 rounded-xl border border-[#E7E0D8]">
                    <ShieldAlert className="w-4 h-4 text-[#92400E]" /> {trap}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#FAF7F2] p-10 rounded-[2rem] border border-[#E7E0D8] text-center italic relative shadow-inner">
              <p className="text-lg text-[#92400E] leading-relaxed font-medium">"A tool that makes legal documents actually readable and understandable."</p>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#92400E]/5 rounded-full blur-3xl" />
        </motion.div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div 
          className="bg-[#92400E] rounded-[2.5rem] p-12 md:p-14 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-[#FAF7F2] tracking-tighter leading-tight"
            >
              Understand every clause <br /> before you sign.
            </motion.h2>
            <p className="text-amber-100/70 text-base max-w-md mx-auto font-light">Upload agreements and receive AI-powered legal insights in seconds.</p>
            <div className="flex justify-center pt-2">
              <Link href="/upload">
                <Button size="lg" className="bg-[#FAF7F2] text-[#92400E] hover:bg-white font-black px-10 h-14 text-base rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95">
                  Launch Analyzer
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  )
}