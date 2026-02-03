"use client"

import {
  FileSearch,
  CheckCircle2,
  LayoutGrid,
  CopyX,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"

interface ProcessingItem {
  icon: React.ReactNode
  title: string
  description: string
}

const processingItems: ProcessingItem[] = [
  {
    icon: <FileSearch className="w-6 h-6" />,
    title: "Data Extraction & Enrichment",
    description:
      "We capture more than just text. Our team extracts critical business data, context, and relationships from your documents—whether they're scanned forms, complex tables, or mixed-format PDFs. We enrich raw document content into structured fields your systems can actually use, including cross-references to external data sources when needed.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Accuracy Validation",
    description:
      "Every field is verified before delivery. Our specialists check for inconsistencies, missing information, and formatting errors that automated tools miss. You receive data you can trust for critical decisions without the manual review burden on your internal team.",
  },
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    title: "Format Standardization",
    description:
      "Stop wrestling with inconsistent layouts. We transform documents into uniform, predictable structures—standardizing date formats, currency representations, naming conventions, and taxonomy across your entire document set. Your downstream systems receive consistently formatted outputs regardless of source.",
  },
  {
    icon: <CopyX className="w-6 h-6" />,
    title: "Duplicate Detection & Removal",
    description:
      "We identify and eliminate redundant documents, revised versions, and overlapping records that clutter your database and confuse reporting. Our process ensures only the authoritative, most current version of each document enters your workflow.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Quality Assurance Audits",
    description:
      "Before any batch is delivered, we run integrity checks against your specific requirements. This final verification ensures compliance with your internal data standards and confirms every output meets our accuracy thresholds.",
  },
]

export function ProcessingBatchSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title with blue underline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              What&apos;s Included in <br /> <span className="text-brand-600 italic">Every Processing Batch</span>
            </h2>
            <div className="w-32 h-2 bg-brand-600 mx-auto mb-8 rounded-full shadow-lg shadow-brand-100" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professional document handling without the overhead of software or
              internal teams.
            </p>
          </motion.div>

          {/* Processing Items */}
          <div className="mt-12 space-y-0">
            {processingItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="group flex flex-col md:flex-row items-start gap-8 py-12 relative">
                  {/* Item Number or Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-600 group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-brand-200">
                      <div className="text-brand-600 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-black text-brand-500 uppercase tracking-widest">Step 0{index + 1}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl group-hover:text-gray-900 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Dashed separator (except after last item) */}
                {index < processingItems.length - 1 && (
                  <div className="border-t border-dashed border-gray-200 relative">
                    <div className="absolute top-0 left-0 w-12 h-px bg-brand-500 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
