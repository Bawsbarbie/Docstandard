import type { Metadata } from "next"
import Link from "next/link"
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

  return {
    title: `${label} Services Hub | DocStandard`,
    description: `Browse all ${label.toLowerCase()} processing intents and document services from DocStandard.`,
  }
}

const buildIntentItems = (intents: Intent[]) =>
  intents.map((intent) => ({
    id: intent.id,
    name: intent.name,
    description: intent.description,
    slug: intent.slug,
  }))

const buildFallbackItems = (vertical: string) =>
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

  const items = intents.length
    ? buildIntentItems(intents.sort((a, b) => a.priority - b.priority))
    : buildFallbackItems(resolved)

  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          {label} hub
        </p>
        <h1 className="text-4xl font-semibold text-gray-900">
          {label} service intents, laid out for execution
        </h1>
        <p className="text-lg text-gray-600">
          You are not here for marketing. You are here for throughput, control, and audit-ready
          data. Pick the exact intent below and we will standardize it the way seasoned operators
          expect.
        </p>
      </header>

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
  )
}
