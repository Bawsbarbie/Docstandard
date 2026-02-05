"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface PainSectionProps {
  content: BlockItem
  // Technical pain points from Leah's research
  painPoints?: string[]
  valueLogic?: string
}

export function PainSection({ content, painPoints, valueLogic }: PainSectionProps) {
  const fallbackPoints: string[] = [
    "Inconsistent document formats force manual cleanup and slow processing.",
    "Missing or mismatched reference fields create reconciliation delays.",
    "Unvalidated data increases audit risk and downstream exceptions.",
  ]
  const pointsToRender = painPoints && painPoints.length > 0 ? painPoints : fallbackPoints

  return (
    <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              Industry Risk Report
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              The High-Stakes Reality of Processing Failures
            </h2>
            <p className="text-slate-400 text-lg mb-8 italic">
              &ldquo;{content.text}&rdquo;
            </p>
            
            <Link
              href="/login"
              className="text-white border-b border-red-500 pb-1 hover:text-red-400 transition-colors inline-flex items-center gap-2"
            >
              Mitigate Risk Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Pain Points Box */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
             <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">40%</span>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">Direct Sync Failure Rate</h4>
                        <p className="text-sm text-slate-400">
                          Processing errors often lead to &ldquo;Data Friction&rdquo;&mdash;unstructured,
                          inconsistent, or invalid data that fails ERP ingestion.
                        </p>
                    </div>
                </div>
                <div className="h-px bg-slate-700 w-full"></div>
                <div className="space-y-4">
                   {pointsToRender.slice(0, 3).map((point, index) => (
                      <div key={index} className="flex gap-3">
                          <AlertTriangle className="text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-300">{point}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
          
          {/* Value Logic - Optional */}
          {valueLogic && (
             <div className="md:col-span-2 mt-8 p-6 bg-blue-900/20 border border-blue-800 rounded-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                      The DocStandard Advantage
                    </h3>
                    <p className="text-base text-slate-300">
                      {valueLogic}
                    </p>
                  </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
