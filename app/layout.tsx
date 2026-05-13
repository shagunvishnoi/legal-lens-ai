import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ReloadRedirect from "@/components/ReloadRedirect"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LegalLens AI — Legal Document Analyzer",
  description: "Upload any legal document and get instant AI-powered simplification, summaries, and risk analysis.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ReloadRedirect />
        <Navbar />
        <div className="pt-16 min-h-[calc(100vh-64px)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}