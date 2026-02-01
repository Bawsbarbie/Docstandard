import type { BlockItem } from "@/lib/pseo/types"

interface IntroBlockProps {
  content: BlockItem
  cityName: string
  serviceName: string
}

export function IntroBlock({ content, cityName, serviceName }: IntroBlockProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {serviceName} in {cityName}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {content.text}
          </p>
        </div>
      </div>
    </section>
  )
}
