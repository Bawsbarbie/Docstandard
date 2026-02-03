import type { BlockItem } from "@/lib/pseo/types"
import { FileCheck, Zap } from "lucide-react"
import Image from "next/image"

interface IntroBlockProps {
  content: BlockItem
  cityName: string
  serviceName: string
  imageUrl?: string
  // Technical data from Leah's research
  operationalRequirements?: string[]
  technicalSpecs?: string
  useCase?: string
  integrationPair?: string
}

export function IntroBlock({
  content,
  cityName,
  serviceName,
  imageUrl,
  operationalRequirements,
  technicalSpecs,
  useCase,
  integrationPair,
}: IntroBlockProps) {
  return (
    <section className="py-12 md:py-20 bg-slate-50 border-b border-gray-100">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column: Headline and Intro Text */}
          <div>
            {/* Integration badge */}
            {integrationPair && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                {integrationPair}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
              {serviceName} in {cityName}
            </h1>

            {/* Use case (for integrations) or generic intro */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {useCase || content.text}
            </p>

            {/* Technical specs badge */}
            {technicalSpecs && (
              <p className="mt-4 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-md inline-block">
                <span className="font-medium">Tech:</span> {technicalSpecs}
              </p>
            )}

            {/* Operational Requirements (for services) */}
            {operationalRequirements && operationalRequirements.length > 0 && (
              <div className="mt-8 p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-brand-600" />
                  Required Documentation
                </h3>
                <ul className="space-y-2">
                  {operationalRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${serviceName} in ${cityName}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
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
