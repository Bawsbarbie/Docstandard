import type { BlockItem } from "@/lib/pseo/types"

interface IntroBlockProps {
  content: BlockItem
  cityName: string
  serviceName: string
  imageUrl?: string
}

export function IntroBlock({ content, cityName, serviceName, imageUrl }: IntroBlockProps) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Intro Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              {serviceName} in {cityName}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {content.text}
            </p>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${serviceName} in ${cityName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image placeholder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
