"use client"

import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { ProblemSolution } from "@/components/landing/ProblemSolution"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Comparison } from "@/components/landing/Comparison"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
