import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 border-b border-[#E7E0D8] bg-[#FAF7F2]/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#44312A] rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-300">
            <span className="text-[#FAF7F2] font-black text-2xl tracking-tighter">L</span>
          </div>
          <span className="font-black text-2xl text-[#1C1008] tracking-tighter">
            LegalLens <span className="text-[#92400E]">AI</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/dashboard" className="hidden sm:block px-5 py-2.5 rounded-xl text-sm text-[#78716C] hover:text-[#1C1008] hover:bg-[#F0EAE0] transition-all font-semibold">
            Dashboard
          </Link>
          <Link href="/about" className="hidden sm:block px-5 py-2.5 rounded-xl text-sm text-[#78716C] hover:text-[#1C1008] hover:bg-[#F0EAE0] transition-all font-semibold">
            About Us
          </Link>
          <Link href="/upload" className="sm:ml-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#44312A] text-[#FAF7F2] hover:bg-[#2C1A10] transition-all shadow-md hover:scale-105 active:scale-95 group flex items-center gap-2">
            Analyze <span className="hidden xs:inline">Document</span> <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </nav>
  )
}