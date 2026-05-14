"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "About Us", href: "/about" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-[#E7E0D8] bg-[#FAF7F2]/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#44312A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-300">
              <span className="text-[#FAF7F2] font-black text-xl sm:text-2xl tracking-tighter">L</span>
            </div>
            <span className="font-black text-lg sm:text-2xl text-[#1C1008] tracking-tighter">
              LegalLens <span className="text-[#92400E]">AI</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="px-5 py-2.5 rounded-xl text-sm text-[#78716C] hover:text-[#1C1008] hover:bg-[#F0EAE0] transition-all font-semibold"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/upload" className="ml-4 px-6 py-3 rounded-xl text-sm font-bold bg-[#44312A] text-[#FAF7F2] hover:bg-[#2C1A10] transition-all shadow-md hover:scale-105 active:scale-95 group flex items-center gap-2">
              Analyze Document <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex sm:hidden items-center gap-3">
            <Link href="/upload" className="px-4 py-2 rounded-lg text-xs font-bold bg-[#44312A] text-[#FAF7F2] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all">
              Analyze <ArrowRight className="w-3 h-3" />
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#44312A] hover:bg-[#F0EAE0] rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 bg-[#FAF7F2] z-40 sm:hidden flex flex-col p-6 gap-4 border-t border-[#E7E0D8]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 rounded-2xl text-lg font-bold text-[#1C1008] bg-[#F5F1EA] active:bg-[#F0EAE0] transition-all flex items-center justify-between group"
              >
                {link.name}
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            
            <div className="mt-auto p-8 rounded-3xl bg-[#44312A] text-[#FAF7F2] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2">Ready to start?</h3>
                <p className="text-[#E7E0D8] text-sm mb-6">Analyze your documents in seconds with AI.</p>
                <Link 
                  href="/upload"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF7F2] text-[#44312A] rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
                >
                  Start Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#92400E] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}