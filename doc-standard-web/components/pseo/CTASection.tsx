"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { motion } from "framer-motion"
import { ArrowRight, FileCheck, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

interface CTASectionProps {
  content: BlockItem
}

export function CTASection({ content }: CTASectionProps) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-brand-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="container px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[3rem] p-8 md:p-16 lg:p-20 text-center text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]" />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                Ready to Offload Your <br /> <span className="text-brand-400">Document Complexity?</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                {content.text}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/login"
                  className="group w-full sm:w-auto bg-brand-500 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-brand-900/20 hover:bg-brand-400 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
                >
                  Upload First Batch
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  Talk to an Expert
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">ISO 27001 Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">24-Hour Turnaround</span>
                </div>
              </div>
            </motion.div>

            {/* Accent light effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
