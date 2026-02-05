"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Check,
  DollarSign,
  FileText,
  Layers,
  Zap,
  Shield,
  Package,
  FileCheck,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"

interface BenefitsGridProps {
  benefits: BlockItem[]
  // Technical data flow points from Leah's research (for integrations)
  dataFlow?: string[]
  prerequisites?: string
  isIntegration?: boolean
}

const DEFAULT_BENEFITS: BlockItem[] = [
  {
    id: "benefit-default-1",
    text: "High-Integrity Extraction: We move beyond simple OCR to validate field logic across your entire batch.",
  },
  {
    id: "benefit-default-2",
    text: "System-Ready Deliverables: Final files are structured for direct import into ERPs like SAP, NetSuite, or QuickBooks.",
  },
  {
    id: "benefit-default-3",
    text: "Operational Scalability: Remove the data-cleansing bottleneck so your team can focus on operations, not fixing PDFs.",
  },
]

// Map benefit text to appropriate icons
const getIconForBenefit = (text: string) => {
  const lowerText = text.toLowerCase()
  
  if (lowerText.includes("$799") || lowerText.includes("pricing") || lowerText.includes("flat")) {
    return DollarSign
  }
  if (lowerText.includes("flexible") || lowerText.includes("mixed formats") || lowerText.includes("document types")) {
    return Layers
  }
  if (lowerText.includes("clean") || lowerText.includes("structured data") || lowerText.includes("accuracy")) {
    return FileCheck
  }
  if (lowerText.includes("standardized") || lowerText.includes("reduce manual") || lowerText.includes("operational friction")) {
    return Sparkles
  }
  if (lowerText.includes("compatibility") || lowerText.includes("business software") || lowerText.includes("internal tools")) {
    return Zap
  }
  if (lowerText.includes("faster") || lowerText.includes("without internal cleanup") || lowerText.includes("usable data")) {
    return ArrowRight
  }
  if (lowerText.includes("consistency") || lowerText.includes("multiple sources")) {
    return Package
  }
  if (lowerText.includes("risk") || lowerText.includes("dirty") || lowerText.includes("unreliable")) {
    return Shield
  }
  if (lowerText.includes("separation") || lowerText.includes("data entry") || lowerText.includes("virtual assistant")) {
    return FileText
  }
  if (lowerText.includes("ready for operational use") || lowerText.includes("not manual fixing") || lowerText.includes("delivered")) {
    return CheckCircle2
  }
  
  // Default icon
  return Check
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function BenefitsGrid({ benefits, dataFlow, prerequisites, isIntegration }: BenefitsGridProps) {
  const hasDataFlow = Boolean(isIntegration && dataFlow && dataFlow.length > 0)

  // For integrations with specific data flow, show technical view
  if (hasDataFlow) {
    const flows = dataFlow || []
    return (
      <section className="py-24 bg-slate-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                What Gets Synchronized
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Clean, validated data flows autonomously between your mission-critical systems.
              </p>
            </motion.div>

            {/* Data Flow Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 mb-12"
            >
              {flows.map((flow, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center group-hover:bg-brand-600 group-hover:rotate-90 transition-all duration-500">
                    <ArrowRight className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-lg font-medium text-gray-800">{flow}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Prerequisites */}
            {prerequisites && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-8 bg-amber-50 border border-amber-100 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 shadow-inner"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Database className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-800 uppercase tracking-[0.2em] mb-2">Technical Prerequisites</h4>
                  <p className="text-lg text-amber-900 leading-relaxed font-medium">{prerequisites}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Fallback to generic benefits grid
  const safeBenefits = benefits && benefits.length > 0 ? benefits : DEFAULT_BENEFITS
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Operational Excellence <br /> <span className="text-brand-600 italic">Delivered as a Service</span>
            </h2>
            <div className="w-24 h-1.5 bg-brand-600 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {safeBenefits.map((benefit) => {
              const IconComponent = getIconForBenefit(benefit.text)
              return (
                <motion.div
                  key={benefit.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="flex flex-col p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:border-brand-100 transition-all group relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-600 transition-colors">
                    <IconComponent className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-lg font-semibold leading-snug text-gray-900 relative z-10">{benefit.text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
