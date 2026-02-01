import type { BlockItem } from "@/lib/pseo/types"

interface CTASectionProps {
  content: BlockItem
}

export function CTASection({ content }: CTASectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-xl bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">{content.text}</p>
            <button className="px-8 py-4 bg-background text-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Upload Your Documents
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
