import { Metadata } from "next"
import type { Route } from "next"
import Link from "next/link"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { loadIntents } from "@/lib/pseo/intents"
import type { Intent } from "@/lib/pseo/types"
import { ArrowRight, FileText, Globe, Layers, ShieldCheck } from "lucide-react"
import { promises as fs } from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "Logistics Document Services & Integrations | DocStandard",
  description: "Browse our full catalog of logistics document processing services and B2B software integrations.",
}

// Map kinds to display names and icons
const KIND_CONFIG: Record<string, { label: string; icon: any }> = {
  integration: { label: "Software Integrations", icon: Layers },
  shipping: { label: "Shipping Documents", icon: Globe },
  customs: { label: "Customs & Compliance", icon: ShieldCheck },
  invoice: { label: "Financial Documents", icon: FileText },
  logistics: { label: "Logistics Operations", icon: Globe },
  finance: { label: "Freight Finance", icon: FileText },
  compliance: { label: "Trade Compliance", icon: ShieldCheck },
  forwarding: { label: "Freight Forwarding", icon: Globe },
  notification: { label: "Notifications", icon: FileText },
  warehousing: { label: "Warehousing", icon: Layers },
  insurance: { label: "Insurance", icon: ShieldCheck },
}

interface IntegrationEntry {
  slug: string
  systemA: string
  systemB: string
  friction?: string
  solution?: string
}

const loadIntegrationDetails = async (): Promise<IntegrationEntry[]> => {
  const filePath = path.join(process.cwd(), "data", "content", "integration-details.json")
  try {
    const content = await fs.readFile(filePath, "utf-8")
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? (parsed as IntegrationEntry[]) : []
  } catch {
    return []
  }
}

export default async function ServicesPage() {
  const intents = await loadIntents().catch(() => [] as Intent[])
  const integrations = await loadIntegrationDetails().catch(() => [])

  // Group intents by kind
  const grouped = intents.reduce<Record<string, Intent[]>>((acc, intent) => {
    const kind = intent.kind || "other"
    if (!acc[kind]) acc[kind] = []
    acc[kind].push(intent)
    return acc
  }, {})

  const integrationIntents = grouped.integration || []
  delete grouped.integration

  // Sort groups by config order
  const sortedKinds = Object.keys(grouped).sort((a, b) => {
    // Integration first
    if (a === "integration") return -1
    if (b === "integration") return 1
    return 0
  })

  const normalizeKey = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  const mergedIntegrations = (() => {
    const seen = new Set<string>()
    const items: Array<{
      key: string
      title: string
      description: string
      href: string
    }> = []

    integrations.forEach((integration) => {
      const title = `${integration.systemA} to ${integration.systemB}`
      const key = integration.slug || normalizeKey(title)
      if (seen.has(key)) return
      seen.add(key)
      items.push({
        key,
        title,
        description:
          integration.solution ||
          integration.friction ||
          `Streamlined ${integration.systemA} to ${integration.systemB} data flows.`,
        href: `/integration/${integration.slug}`,
      })
    })

    integrationIntents.forEach((intent) => {
      const key = intent.slug || normalizeKey(intent.name)
      if (seen.has(key)) return
      seen.add(key)
      items.push({
        key,
        title: intent.name,
        description:
          intent.description ||
          `Professional ${intent.name} processing and standardization.`,
        href: `/us/ny/new-york/${intent.slug}`,
      })
    })

    return items
  })()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Service Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive catalog of document processing services and software integrations.
          </p>
        </div>

        <div className="space-y-16">
          <div id="enterprise-software-integrations" className="scroll-mt-28">
            <div className="flex items-center space-x-3 mb-6 border-b border-gray-200 pb-4">
              <div className="p-2 bg-brand-100 rounded-lg">
                <Layers className="w-6 h-6 text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Enterprise Software Integrations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mergedIntegrations.map((integration) => (
                <Link
                  key={integration.key}
                  href={integration.href as Route}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 hover:border-brand-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-600">
                      {integration.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {integration.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {sortedKinds.map((kind) => {
            const config = KIND_CONFIG[kind] || { label: kind, icon: FileText }
            const Icon = config.icon
            const items = grouped[kind]

            return (
              <div key={kind} id={kind} className="scroll-mt-28">
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-200 pb-4">
                  <div className="p-2 bg-brand-100 rounded-lg">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{config.label}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((intent) => (
                    <Link
                      key={intent.id}
                      // Linking to NY as a canonical example for now
                      href={`/us/ny/new-york/${intent.slug}` as Route}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 hover:border-brand-200"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 mb-2 flex items-center justify-between">
                        {intent.name}
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {intent.description || `Professional ${intent.name} processing and standardization.`}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
