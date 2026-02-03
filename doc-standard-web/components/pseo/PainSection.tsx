import type { BlockItem } from "@/lib/pseo/types"
import { AlertTriangle } from "lucide-react"

interface PainSectionProps {
  content: BlockItem
  // Technical pain points from Leah's research
  painPoints?: string[]
  valueLogic?: string
}

export function PainSection({ content, painPoints, valueLogic }: PainSectionProps) {
  // If we have specific pain points, show the detailed view
  if (painPoints && painPoints.length > 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">The High-Stakes Reality</h2>
              <p className="text-lg text-gray-600">
                Why getting this wrong costs more than getting it right.
              </p>
            </div>

            {/* Pain Points Grid */}
            <div className="grid md:grid-cols-1 gap-4 mb-8">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-red-50 border border-red-100 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-gray-800 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Value Logic - Why Professional Service > SaaS */}
            {valueLogic && (
              <div className="p-6 bg-brand-50 border border-brand-100 rounded-lg">
                <h3 className="text-sm font-semibold text-brand-800 uppercase tracking-wide mb-2">
                  Why Professional Service Matters
                </h3>
                <p className="text-gray-700 leading-relaxed">{valueLogic}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Fallback to generic content
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">The Challenge</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{content.text}</p>
        </div>
      </div>
    </section>
  )
}
