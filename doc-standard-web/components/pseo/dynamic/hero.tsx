"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { ArrowRight, Layers, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface HeroProps {
  intro?: BlockItem
  pain?: BlockItem
  intentName?: string
  title?: string
  subtitle?: string
  systemA?: string
  systemB?: string
  visual?: "data-card"
  showVisual?: boolean
  imageUrl?: string
  integrationPair?: string
  useCase?: string
  technicalSpecs?: string
  operationalRequirements?: string[]
  painPoints?: string[]
  valueLogic?: string
  vertical?: string
}

const verticalImages: Record<string, string> = {
  customs: "/images/banners/customs.webp",
  compliance: "/images/banners/compliance.webp",
  finance: "/images/banners/finance.webp",
  invoice: "/images/banners/invoice.webp",
  shipping: "/images/banners/shipping.webp",
  logistics: "/images/banners/logistics.webp",
  integration: "/images/banners/logistics.webp",
}

export function Hero({
  intro,
  pain,
  intentName,
  title,
  subtitle,
  systemA,
  systemB,
  visual,
  showVisual = true,
  imageUrl,
  integrationPair,
  useCase,
  technicalSpecs,
  operationalRequirements,
  painPoints,
  valueLogic,
  vertical,
}: HeroProps) {
  // Extract System A from intent name or integration pair for the dynamic headline
  const derivedSystemA = integrationPair
    ? integrationPair.split("<->")[0].trim()
    : intentName
      ? intentName.split(" ")[0]
      : systemA || "Source"
  const headlineSystemA = systemA || derivedSystemA
  const headline = title || (intentName ? `Clean Data for ${intentName}` : "Clean Data for Your Systems")
  const introText = useCase || intro?.text || subtitle || ""
  
  // Determine background image
  const bgImage = imageUrl || (vertical ? verticalImages[vertical.toLowerCase()] : null)

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background - Image or Abstract */}
      <div className="absolute inset-0 -z-10">
        {bgImage ? (
          <>
            <Image
              src={bgImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for text readability - lighter to show image */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${bgImage ? 'bg-white/10 border-white/20 text-blue-300' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${bgImage ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
            Zero-latency data extraction enabled
          </div>
          
          <h1 className={`text-4xl lg:text-6xl font-extrabold leading-[1.1] ${bgImage ? 'text-white' : 'text-slate-900'}`}>
            {headline}
          </h1>
          
          <p className={`text-lg leading-relaxed max-w-xl ${bgImage ? 'text-white/80' : 'text-slate-600'}`}>
            {introText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/login"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#how-it-works"
              className="group bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              How It Works
            </Link>
          </div>
        </div>

        {showVisual && visual === "data-card" && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-mono text-slate-400">ingestion_log_v2.json</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 opacity-75">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="h-2 w-24 bg-red-200 rounded mb-1"></div>
                      <div className="h-2 w-16 bg-red-100 rounded"></div>
                    </div>
                  </div>
                  <span className="text-xs text-red-600 font-medium">Schema Mismatch</span>
                </div>
                <div className="flex justify-center my-2">
                  <ArrowRight className="w-5 h-5 text-slate-300 transform rotate-90" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="h-2 w-24 bg-green-200 rounded mb-1"></div>
                      <div className="h-2 w-32 bg-green-100 rounded"></div>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Normalized</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="h-2 w-20 bg-green-200 rounded mb-1"></div>
                      <div className="h-2 w-28 bg-green-100 rounded"></div>
                    </div>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Validated</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
