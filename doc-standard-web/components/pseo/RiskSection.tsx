"use client"

import { AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface RiskSectionProps {
  quote?: string
  painPoints?: string[]
  compact?: boolean
}

export function RiskSection({ quote, painPoints, compact = false }: RiskSectionProps) {
  const fallbackQuote =
    "Audit risk from 'Dirty Data': Unstructured reference numbers and mismatched dates create downstream reconciliation errors."

  const fallbackAlerts = [
    "XML Encoding & Schema Mismatches: Rigid ERP schemas cannot parse inconsistent exports without custom middleware.",
    "UOM (Unit of Measure) Desync: A TMS might record a shipment in 'PLT' while the ERP requires 'EA'.",
  ]

  const alerts =
    painPoints && painPoints.length >= 2 ? painPoints.slice(0, 2) : fallbackAlerts

  return (
    <section className={`bg-slate-900 text-white ${compact ? "py-6" : "py-24"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              Industry Risk Report
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              The High-Stakes Reality of Processing Failures
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              “{quote || fallbackQuote}”
            </p>
            <Link
              href="/login"
              className="text-white hover:text-red-400 transition-colors inline-flex items-center gap-2"
            >
              <span className="border-b border-red-500 pb-1">Mitigate Risk Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">40%</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Direct Sync Failure Rate</h4>
                  <p className="text-sm text-slate-400">
                    Direct TMS-to-ERP syncs fail 40% of the time due to data friction—unstructured, inconsistent, or
                    invalid data.
                  </p>
                </div>
              </div>
              <div className="h-px bg-slate-700 w-full"></div>
              {alerts.map((alert, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <AlertTriangle className="text-yellow-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{idx === 0 ? "Operational Bottlenecks" : "Downstream Risk"}</h4>
                    <p className="text-sm text-slate-400">{alert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
