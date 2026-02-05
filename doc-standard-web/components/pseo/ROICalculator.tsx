"use client"

import { motion } from "framer-motion"

export function ROICalculator() {
  return (
    <section className="bg-blue-600 py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">ROI Analysis: The Cost of Manual Cleanup</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Based on a mid-sized 3PL processing 100 multi-page invoices per day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="text-4xl font-extrabold mb-2">13.3h</div>
            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
              Manual Effort / Day
            </div>
            <div className="text-xs text-blue-200/60 mt-2">8 mins per invoice</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="text-4xl font-extrabold mb-2 text-green-300">5m</div>
            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
              With DocStandard
            </div>
            <div className="text-xs text-blue-200/60 mt-2">30 secs per batch</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-white shadow-xl transform md:-translate-y-4 text-slate-900"
          >
            <div className="text-4xl font-extrabold mb-2 text-blue-600">$120k</div>
            <div className="text-slate-600 text-sm font-medium uppercase tracking-wider">
              Annual Savings
            </div>
            <div className="text-xs text-slate-400 mt-2">Reclaimed Capacity</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="text-4xl font-extrabold mb-2">100%</div>
            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
              Error Reduction
            </div>
            <div className="text-xs text-blue-200/60 mt-2">Audit Value</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
