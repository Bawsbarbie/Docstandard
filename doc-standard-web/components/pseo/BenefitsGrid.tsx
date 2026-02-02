import type { BlockItem } from "@/lib/pseo/types"
import { CheckCircle2 } from "lucide-react"

interface BenefitsGridProps {
  benefits: BlockItem[]
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="py-16 bg-white">
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
