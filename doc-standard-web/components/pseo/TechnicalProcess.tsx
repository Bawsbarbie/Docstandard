"use client"

import type { ProcessBlock } from "@/lib/pseo/types"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface TechnicalProcessProps {
  process?: ProcessBlock
}

export function TechnicalProcess({ process }: TechnicalProcessProps) {
  if (!process) return null

  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {process.title}
            </h2>
            <div className="w-28 h-1.5 bg-brand-600 mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-6">
            {process.steps.map((step, index) => (
              <motion.div
                key={`${process.id}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col md:flex-row items-start gap-6 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-600" />
                    <h3 className="text-xl font-bold text-gray-900">{step.name}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
