"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { FileJson, RefreshCw, BarChart } from "lucide-react"

interface PainSectionProps {
  content: BlockItem
  // Technical pain points from Leah's research
  painPoints?: string[]
  valueLogic?: string
  intentName?: string
  vertical?: string
  kind?: string
  systemA?: string
  systemB?: string
  compact?: boolean
}

export function PainSection({
  content,
  painPoints,
  valueLogic,
  intentName,
  vertical,
  kind,
  systemA,
  systemB,
  compact = false,
}: PainSectionProps) {
  // Generate dynamic headline based on vertical/kind
  const getHeadline = (): string => {
    const normalizedKind = (kind || vertical || "").toLowerCase()
    const serviceName = intentName || "Document Processing"
    
    // For integration pages with systemA and systemB, show system-specific headline
    if ((normalizedKind === "integration" || normalizedKind === "tms") && systemA && systemB) {
      return `Why ${systemA} to ${systemB} Syncs Fail`
    }
    
    // For other integration-like pages (EDI, etc.), use intentName-based headline
    if (normalizedKind === "integration" || normalizedKind === "tms") {
      return intentName ? `Why Manual ${intentName} Processes Fail` : "The Cost of Manual Operational Friction"
    }
    
    if (normalizedKind === "customs") {
      return `Why Manual ${serviceName} Processes Fail`
    }
    
    if (normalizedKind === "finance" || normalizedKind === "audit") {
      return `The Operational Risk of Unstructured ${serviceName} Data`
    }
    
    if (normalizedKind === "shipping" || normalizedKind === "logistics") {
      return `Why ${serviceName} Data Inconsistencies Create Delays`
    }
    
    if (normalizedKind === "invoice") {
      return `The Hidden Cost of Manual ${serviceName} Processing`
    }
    
    if (normalizedKind === "compliance") {
      return `Why ${serviceName} Compliance Failures Risk Audits`
    }
    
    if (normalizedKind === "inventory") {
      return `Why Unstructured ${serviceName} Data Breaks Workflows`
    }
    
    // Default fallback
    return `Why Manual ${serviceName} Processes Create Risk`
  }
  const fallbackPoints: string[] = [
    "XML encoding mismatches trigger failed ERP ingestion.",
    "Unit-of-measure desync causes invoice rejection.",
    "Rounding errors create reconciliation gaps.",
  ]
  const normalizePoints = (points: string[]) => {
    const cleaned = points.filter(Boolean)
    if (cleaned.length >= 3) return cleaned.slice(0, 3)
    if (cleaned.length === 0) return fallbackPoints
    const padded = [...cleaned]
    while (padded.length < 3) {
      padded.push(fallbackPoints[padded.length % fallbackPoints.length])
    }
    return padded.slice(0, 3)
  }

  const points = normalizePoints(painPoints && painPoints.length > 0 ? painPoints : fallbackPoints)

  const iconSet = [FileJson, RefreshCw, BarChart]

  const fallbackTitles = [
    "Schema & Format Mismatch",
    "Manual Keying Errors",
    "Reconciliation Gaps",
  ]

  const splitPoint = (text: string, index: number) => {
    const divider = text.match(/[:—-]|\. /)
    if (!divider) {
      return { title: fallbackTitles[index] || "Operational Risk", description: text }
    }
    const parts = text.split(/[:—-]|\.\s/).map((part) => part.trim()).filter(Boolean)
    if (parts.length === 0) return { title: fallbackTitles[index] || "Operational Risk", description: text }
    const [title, ...rest] = parts
    const wordCount = title.split(/\s+/).filter(Boolean).length
    if (wordCount > 6 || wordCount < 3) {
      return { title: fallbackTitles[index] || "Operational Risk", description: text }
    }
    return { title, description: rest.join(". ") }
  }

  const frictionText = content?.text || ""
  const useStaticTitles = !painPoints || painPoints.length === 0

  const cards = points.map((point, index) => {
    if (useStaticTitles) {
      return {
        title: fallbackTitles[index] || "Operational Risk",
        description: frictionText || point,
        Icon: iconSet[index % iconSet.length],
      }
    }
    const { title, description } = splitPoint(point, index)
    return { title, description, Icon: iconSet[index % iconSet.length] }
  })

  return (
    <section className={`bg-white ${compact ? "pt-6 pb-0" : "py-24"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {getHeadline()}
          </h2>
          <p className="text-slate-600">
            {content?.text || "Operational bottlenecks in logistics are often caused by unstructured data files. DocStandard cleans, validates, and re-structures these batches for immediate system ingestion."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(({ title, description, Icon }, idx) => (
            <div
              key={`${title}-${idx}`}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
              {description && (
                <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
