import type { BlockItem } from "@/lib/pseo/types"

interface BenefitsGridProps {
  benefits: BlockItem[]
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose DocStandard?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex items-start gap-4 p-6 rounded-lg border bg-card"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-base leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
