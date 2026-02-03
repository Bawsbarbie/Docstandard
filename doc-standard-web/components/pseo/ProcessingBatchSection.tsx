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

const PROCESSING_STEPS_BY_KIND: Record<string, ProcessingItem[]> = {
  finance: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Charge and Invoice Capture",
      description:
        "We extract line level charges, totals, and vendor details so every invoice is accounted for with clean fields.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Line Level Validation",
      description:
        "We reconcile totals to line items, flag mismatches, and normalize currencies to prevent downstream posting errors.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "GL and Cost Center Mapping",
      description:
        "We apply your chart of accounts and cost center rules so the data lands in the right bucket the first time.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Audit Trail Delivery",
      description:
        "You receive a clean export plus validation notes that support audits and close reviews.",
    },
  ],
  invoice: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Vendor Invoice Capture",
      description:
        "We extract vendor details, totals, and tax fields from commercial invoices with consistent naming.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Three Way Match Prep",
      description:
        "We link invoices to PO and receipt references to support AP reconciliation.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Currency and Tax Normalization",
      description:
        "We standardize currency and tax fields so AP posting rules stay consistent.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "AP Ready Output",
      description:
        "We deliver a structured voucher file ready for NetSuite, SAP, or QuickBooks import.",
    },
  ],
  shipping: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Document Ingest",
      description:
        "We extract key fields from BOL, AWB, and packing lists across carriers and formats.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Party and Routing Normalization",
      description:
        "We standardize shipper, consignee, notify party, and routing details into one schema.",
    },
    {
      icon: <CopyX className="w-6 h-6" />,
      title: "Equipment and Container Checks",
      description:
        "We validate container IDs, seal numbers, and equipment types to reduce tracking errors.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "TMS Ready Delivery",
      description:
        "You get clean, validated files that load into your TMS without manual edits.",
    },
  ],
  customs: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Entry Field Extraction",
      description:
        "We capture HTS, value, quantity, and origin fields from customs documentation.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Format and Rule Validation",
      description:
        "We validate key fields against standard CBP formats and flag missing data.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Document Completeness",
      description:
        "We verify invoice, packing list, and bond documents are aligned and consistent.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Broker Ready Output",
      description:
        "Your broker receives a structured package that is ready to file.",
    },
  ],
  compliance: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "License and Permit Capture",
      description:
        "We extract license numbers, ECCN, and permit details into structured fields.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Decrementing and Expiry Checks",
      description:
        "We validate usage limits and expiration dates to reduce violation risk.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "End User Verification",
      description:
        "We standardize consignee details and flag mismatches that invalidate a license.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Audit Ready Archive",
      description:
        "You receive a clean compliance record that supports audits and filings.",
    },
  ],
  integration: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Source Export Review",
      description:
        "We analyze your TMS or forwarder export to find schema gaps and noisy fields.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Field Mapping",
      description:
        "We map source fields to ERP targets with explicit transformation rules.",
    },
    {
      icon: <CopyX className="w-6 h-6" />,
      title: "Normalization and Cleanup",
      description:
        "We standardize dates, currencies, and codes so the ERP accepts the payload.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Integration Ready Payload",
      description:
        "We deliver a validated file that clears import checks on first load.",
    },
  ],
  general: [
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Data Extraction",
      description:
        "We capture critical fields and context from messy document sets and scans.",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Accuracy Review",
      description:
        "We verify fields, flag inconsistencies, and correct common errors before delivery.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Format Standardization",
      description:
        "We normalize dates, currencies, and naming conventions across all files.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quality Assurance",
      description:
        "We run final checks so the output is clean, consistent, and ready to use.",
    },
  ],
}

interface ProcessingBatchSectionProps {
  kind?: string
}

export function ProcessingBatchSection({ kind }: ProcessingBatchSectionProps) {
  const normalizedKind = (kind || "general").toLowerCase()
  const processingItems =
    PROCESSING_STEPS_BY_KIND[normalizedKind] || PROCESSING_STEPS_BY_KIND.general
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
