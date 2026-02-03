import type { BlockItem } from "@/lib/pseo/types"

interface PainSectionProps {
  content: BlockItem
}

export function PainSection({ content }: PainSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">The Challenge</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content.text}
          </p>
        </div>
      </div>
    </section>
  )
}
