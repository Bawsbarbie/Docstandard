import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getIntentsByKind } from "@/lib/pseo/intents"
import type { Intent } from "@/lib/pseo/types"

const verticalAliases: Record<string, string> = {
  audit: "finance",
  logistics: "shipping",
  tms: "integration",
}

const verticalLabels: Record<string, string> = {
  customs: "Customs",
  compliance: "Compliance",
  finance: "Finance",
  invoice: "Invoice",
  shipping: "Shipping",
  integration: "Integrations",
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

const fallbackServices: Record<string, string[]> = {
  customs: [
    "Customs Document Processing",
    "HS Code Validation",
    "Bond Documentation Digitization",
    "Entry Packet QA",
  ],
  compliance: [
    "Import & Export License Data Extraction",
    "Audit-Ready Compliance Normalization",
    "Regulatory Evidence Packaging",
  ],
  finance: [
    "Freight Bill Audit Data Preparation",
    "Spend Normalization for Finance",
    "Accrual-Ready Charge Extraction",
  ],
  invoice: [
    "Commercial Invoice Data Digitization",
    "Invoice Line-Item Extraction",
    "ERP-Ready Invoice Normalization",
  ],
  shipping: [
    "Bill of Lading Data Processing",
    "Packing List Data Extraction",
    "Air Waybill Digitization",
  ],
  integration: [
    "TMS/ERP Integration Data Mapping",
    "EDI Document Normalization",
    "System Export Cleanup",
  ],
}

const supportedVerticals = new Set(Object.keys(verticalLabels))

const toTitleCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

export const resolveVertical = (vertical: string) => {
  const normalized = vertical.toLowerCase()
  return verticalAliases[normalized] || normalized
}

export const getVerticalLabel = (vertical: string) => {
  const resolved = resolveVertical(vertical)
  return verticalLabels[resolved] || toTitleCase(resolved)
}

export async function generateMetadataForVertical(vertical: string): Promise<Metadata> {
  const resolved = resolveVertical(vertical)
  const label = getVerticalLabel(resolved)
  const canonicalUrl = `https://docstandard.co/${resolved}`

  return {
    title: `${label} Services Hub | DocStandard`,
    description: `Browse all ${label.toLowerCase()} processing intents and document services from DocStandard.`,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

type HubItem = {
  id: string
  name: string
  description?: string
  slug?: string
}

const buildIntentItems = (intents: Intent[]): HubItem[] =>
  intents.map((intent) => ({
    id: intent.id,
    name: intent.name,
    description: intent.description,
    slug: intent.slug,
  }))

const buildFallbackItems = (vertical: string): HubItem[] =>
  (fallbackServices[vertical] || []).map((name) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
  }))

export async function VerticalHub({ vertical }: { vertical: string }) {
  const resolved = resolveVertical(vertical)

  if (!supportedVerticals.has(resolved)) {
    notFound()
  }

  const label = getVerticalLabel(resolved)

  let intents: Intent[] = []
  try {
    intents = await getIntentsByKind(resolved)
  } catch {
    intents = []
  }

  const items: HubItem[] = intents.length
    ? buildIntentItems(intents.sort((a, b) => a.priority - b.priority))
    : buildFallbackItems(resolved)

  const bannerImage = verticalImages[resolved] || verticalImages.logistics

  return (
    <div>
      {/* Hero Banner with Image */}
      <section className="relative overflow-hidden py-20 px-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage}
            alt={`${label} services background`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability - lighter to show image */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-4">
            {label} Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {label} Services
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Expert document processing for {label.toLowerCase()} operations. 
            Standardized data, audit-ready outputs, ERP compatibility.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-14">

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow"
          >
            {item.slug ? (
              <Link href={`/${resolved}/${item.slug}`} className="block">
                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                <p className="mt-2 text-sm text-gray-600">
                  {item.description || `Execution-ready ${item.name.toLowerCase()} workflows.`}
                </p>
              </Link>
            ) : (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Execution-ready workflows scoped for {label.toLowerCase()} operators.
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
    </div>
  )
}
