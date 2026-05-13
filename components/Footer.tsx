import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-white text-xl tracking-tight">LegalLens <span className="text-primary">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed font-light text-slate-400">
              Transforming complex legal documents into clear, actionable intelligence. Enterprise-grade security. Human-centered design.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-xs tracking-widest uppercase">Product</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><Link href="/upload" className="hover:text-primary transition-colors">Analyze Document</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-xs tracking-widest uppercase">Technology</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><span>Intelligent PDF Extraction</span></li>
              <li><span>AI Plain-English Summary</span></li>
              <li><span>Automated Risk Assessment</span></li>
              <li><span>Semantic Chat Retrieval</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-xs tracking-widest uppercase">Legal</h3>
            <ul className="space-y-3 text-sm font-light">
              <li><span>Privacy Policy</span></li>
              <li><span>Terms of Service</span></li>
              <li><span>Security Standards</span></li>
              <li><span>GDPR Compliance</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between text-xs font-light text-slate-500">
          <p>© 2026 LegalLens AI. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-6 md:mt-0">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            <span>Status: All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  )
}