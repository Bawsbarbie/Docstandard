"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function MiddleCTA() {
  return (
    <section className="py-10 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-600 rounded-[2.5rem] p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-brand-100"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">Operational Efficiency</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
              Optimize Your Document Workflows
            </h2>
            <p className="text-base text-white/90 max-w-xl">
              Join dozens of logistics and finance teams who have eliminated manual data entry backlogs.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/login"
              className="group bg-white text-brand-600 px-6 py-3 rounded-xl font-black text-base shadow-lg hover:bg-brand-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Get Started for $799
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
