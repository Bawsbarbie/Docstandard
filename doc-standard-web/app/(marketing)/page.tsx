"use client"

import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { CredibilityStrip } from "@/components/landing/CredibilityStrip"
import { ProblemSolution } from "@/components/landing/ProblemSolution"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Deliverables } from "@/components/landing/Deliverables"
import { WeeklyProcessing } from "@/components/landing/WeeklyProcessing"
import { Comparison } from "@/components/landing/Comparison"
import { NotFor } from "@/components/landing/NotFor"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <CredibilityStrip />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Deliverables />
        <WeeklyProcessing />
        <Comparison />
        <NotFor />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
