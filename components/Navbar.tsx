import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#2563EB] rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
            <span className="text-white font-black text-2xl tracking-tighter">L</span>
          </div>
          <span className="font-black text-2xl text-[#0F172A] tracking-tighter">LegalLens <span className="text-[#2563EB]">AI</span></span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-xl text-sm text-slate-500 hover:text-[#0F172A] hover:bg-slate-50 transition-all font-bold tracking-tight">
            Dashboard
          </Link>
          <Link href="/about" className="px-5 py-2.5 rounded-xl text-sm text-slate-500 hover:text-[#0F172A] hover:bg-slate-50 transition-all font-bold tracking-tight">
            Mission
          </Link>
          <Link href="/upload" className="ml-4 px-6 py-3 rounded-xl text-sm font-black bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-all shadow-xl hover:scale-105 active:scale-95 group flex items-center gap-3">
            Launch Analyzer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  )
}