import Link from "next/link"
import { Terminal, Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] text-[#78716C] border-t border-[#E7E0D8]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#44312A] rounded-lg flex items-center justify-center">
                <span className="text-[#FAF7F2] font-bold text-base">L</span>
              </div>
              <span className="font-black text-[#1C1008] text-lg tracking-tighter uppercase">
                LegalLens <span className="text-[#92400E]">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-[200px]">
              AI-powered document intelligence for the modern professional.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-[#1C1008] font-bold text-[10px] tracking-widest uppercase">Platform</h3>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/upload" className="hover:text-[#92400E] transition-colors">Analyzer</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#92400E] transition-colors">Intelligence</Link></li>
              <li><Link href="/about" className="hover:text-[#92400E] transition-colors">Methodology</Link></li>
            </ul>
          </div>

          {/* Technical */}
          <div className="space-y-4">
            <h3 className="text-[#1C1008] font-bold text-[10px] tracking-widest uppercase">Technical</h3>
            <ul className="space-y-2 text-[13px]">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#92400E] rounded-full" /> Groq / Gemini API</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#92400E] rounded-full" /> OCR Extraction</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#92400E] rounded-full" /> API Routes</li>
            </ul>
          </div>

          {/* Social/Repo */}
          <div className="space-y-4">
            <h3 className="text-[#1C1008] font-bold text-[10px] tracking-widest uppercase">Resources</h3>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="https://github.com/shagunvishnoi/legal-lens-ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#92400E] transition-colors flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Source Code
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#92400E] transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Live URL
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E7E0D8] pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-medium uppercase tracking-widest">
          <p>© 2026 LegalLens AI. Built by Shagun Vishnoi.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span>System Verified</span>
          </div>
        </div>

      </div>
    </footer>
  )
}