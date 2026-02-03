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
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/30">
                <ShieldAlert className="w-3.5 h-3.5" />
                Industry Risk Report
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                The High-Stakes Reality of <span className="text-red-400">Processing Failures</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-10 italic">
                &ldquo;{content.text}&rdquo;
              </p>

              {/* CTAs */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl shadow-white/5"
                >
                  Mitigate Risk Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Pain Points Grid */}
            <div className="space-y-4">
              {pointsToRender.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-gray-300 leading-relaxed font-medium">{point}</p>
                  </motion.div>
                ))
              }
            </div>
          </div>

          {/* Value Logic - Why Professional Service > SaaS */}
          {valueLogic && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 p-8 bg-brand-600/10 border border-brand-500/20 rounded-[2.5rem] relative overflow-hidden group"
            >
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative">
                <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/20">
                  <ShieldAlert className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-brand-400 uppercase tracking-[0.2em] mb-3">
                    The DocStandard Advantage
                  </h3>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    {valueLogic}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
