"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: "📄",
    title: "Upload Document",
    description: "Upload any legal PDF and extract text instantly",
    href: "/upload",
    action: "Upload Now",
  },
  {
    icon: "🤖",
    title: "AI Analysis",
    description: "Get plain-English summary, key obligations and risk flags",
    href: "/upload",
    action: "Analyze",
  },
  {
    icon: "🔴",
    title: "Risk Detection",
    description: "Visually highlight risky clauses, dates and obligations",
    href: "/upload",
    action: "Detect Risks",
  },
  {
    icon: "💬",
    title: "Chat with Document",
    description: "Ask any question about your legal document",
    href: "/upload",
    action: "Start Chat",
  },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            Legal<span className="text-primary">Lens</span> AI
          </h1>
          <p className="text-muted-foreground">
            Your AI-powered legal document assistant
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-muted-foreground">AI Features</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold">∞</p>
            <p className="text-sm text-muted-foreground">Documents</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-bold">Free</p>
            <p className="text-sm text-muted-foreground">Forever</p>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 space-y-3">
              <div className="text-3xl">{feature.icon}</div>
              <h2 className="font-semibold">{feature.title}</h2>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              <Link href={feature.href}>
                <Button size="sm" className="w-full">{feature.action}</Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to analyze your document?</h2>
          <p className="text-muted-foreground">Upload any legal PDF and get instant AI insights</p>
          <Link href="/upload">
            <Button size="lg">Upload Document →</Button>
          </Link>
        </Card>

      </div>
    </main>
  )
}