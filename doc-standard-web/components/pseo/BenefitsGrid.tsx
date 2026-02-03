import type { BlockItem } from "@/lib/pseo/types"
import { CheckCircle2, ArrowRight, Database } from "lucide-react"

interface BenefitsGridProps {
  benefits: BlockItem[]
  // Technical data flow points from Leah's research (for integrations)
  dataFlow?: string[]
  prerequisites?: string
  isIntegration?: boolean
}

export function BenefitsGrid({ benefits, dataFlow, prerequisites, isIntegration }: BenefitsGridProps) {
  // For integrations with specific data flow, show technical view
  if (isIntegration && dataFlow && dataFlow.length > 0) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                What Gets Synchronized
              </h2>
              <p className="text-gray-600">
                Real-time data flow between your systems
              </p>
            </div>

            {/* Data Flow Items */}
            <div className="space-y-4 mb-8">
              {dataFlow.map((flow, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-brand-600" />
                  </div>
                  <p className="text-base leading-relaxed text-gray-700 pt-2">{flow}</p>
                </div>
              ))}
            </div>

            {/* Prerequisites */}
            {prerequisites && (
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800 mb-1">Prerequisites</h4>
                    <p className="text-sm text-amber-700">{prerequisites}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Fallback to generic benefits grid
  return (
    <section className="py-20 bg-slate-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Why Choose DocStandard?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                </div>
                <p className="text-base leading-relaxed text-gray-700">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
