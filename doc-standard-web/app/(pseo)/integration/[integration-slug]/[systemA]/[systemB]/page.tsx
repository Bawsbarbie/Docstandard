import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { 
  ArrowRight, 
  Database,
  FileJson,
  RefreshCw,
  AlertTriangle,
  Clock,
  TrendingDown,
  FileText,
  BarChart3,
  Shield,
  Zap,
  DollarSign,
  Building2,
  CheckCircle,
  MapPin,
  Ship,
  Plane
} from "lucide-react"

// Types
interface IntegrationEntry {
  slug: string
  systemA: string
  systemB: string
  friction: string
  solution: string
  technicalData: string
}

interface PageProps {
  params: {
    "integration-slug": string
    systemA: string
    systemB: string
  }
}

const slugifySystemName = (value: string): string =>
  value
    .replace(/\([^)]*\)/g, "")
    .replace(/s\/4hana/gi, "s4hana")
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, " and ")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-")

const integrationRouteOverrides: Record<string, { systemA: string; systemB: string }> = {
  "edi-document-normalization-services": { systemA: "edi-documents", systemB: "erp-systems" },
  "clean-logistics-data-for-sap-s4hana": { systemA: "logistics-data", systemB: "sap-s4hana" },
  "oracle-erp-cloud-ap-invoice-integration": { systemA: "source-systems", systemB: "oracle-erp-cloud" },
  "sap-s4hana-logistics-integration-technical": { systemA: "tms-wms-systems", systemB: "sap-s4hana" },
}

// Load integration details
const loadIntegrationDetails = async (): Promise<IntegrationEntry[]> => {
  try {
    const { promises: fs } = await import("fs")
    const { resolveDataPath } = await import("@/lib/pseo/data-path")
    const filePath = resolveDataPath("data", "content", "integration-details.json")
    const content = await fs.readFile(filePath, "utf-8")
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Derive systems from slug like "cargowise-netsuite"
const parseSystemSlug = (slug: string): { systemA: string; systemB: string } | null => {
  // Try "systemA-to-systemB" format
  const toMatch = slug.match(/^([a-z0-9]+)-to-([a-z0-9-]+)$/i)
  if (toMatch) {
    return {
      systemA: toMatch[1].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      systemB: toMatch[2].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    }
  }
  
  // Try "systemA-systemB-integration" format
  const integrationMatch = slug.match(/^([a-z0-9]+)-([a-z0-9]+)-integration$/i)
  if (integrationMatch) {
    return {
      systemA: integrationMatch[1].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      systemB: integrationMatch[2].replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    }
  }
  
  return null
}

// Format system name for display
const formatSystemName = (name: string): string => {
  const specialCases: Record<string, string> = {
    "Cargowise": "CargoWise",
    "Netsuite": "NetSuite",
    "Quickbooks": "QuickBooks",
    "Sap": "SAP",
    "Oracle": "Oracle",
    "Flexport": "FlexPort",
    "Magaya": "Magaya",
    "Mercurygate": "MercuryGate",
    "Descartes": "Descartes",
    "Motive": "Motive",
    "Eld": "ELD"
  }
  
  return specialCases[name] || name
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params["integration-slug"])
  const systems = {
    systemA: formatSystemName(params.systemA.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())),
    systemB: formatSystemName(params.systemB.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())),
  }
  
  if (!cityData) {
    return { title: "Not Found" }
  }
  
  const { name: cityName } = cityData
  const { systemA, systemB } = systems
  
  return {
    title: `${formatSystemName(systemA)} to ${formatSystemName(systemB)} Integration in ${cityName} | DocStandard`,
    description: `Streamline ${formatSystemName(systemA)} to ${formatSystemName(systemB)} data integration in ${cityName}. Automate field mapping, validation, and synchronization for your logistics operations.`,
  }
}

export async function generateStaticParams() {
  const [{ cities }, integrations] = await Promise.all([
    import("@/lib/pseo/city-data").then(m => ({ cities: m.cities })),
    loadIntegrationDetails()
  ])
  
  const params: Array<{ "integration-slug": string; systemA: string; systemB: string }> = []
  const seen = new Set<string>()
  
  for (const city of cities) {
    for (const integration of integrations) {
      // Canonical params from declared system names (covers special integrations too).
      const canonicalA = slugifySystemName(integration.systemA)
      const canonicalB = slugifySystemName(integration.systemB)
      const canonicalKey = `${city.slug}|${canonicalA}|${canonicalB}`

      if (!seen.has(canonicalKey)) {
        seen.add(canonicalKey)
        params.push({
          "integration-slug": city.slug,
          systemA: canonicalA,
          systemB: canonicalB
        })
      }

      // Backward-compatible params for legacy `*-to-*` slugs.
      const cleanSlug = integration.slug.replace(/-(data-bridge|bridge|normalization|integration|services|technical)$/i, "")
      const toMatch = cleanSlug.match(/^([a-z0-9-]+)-to-([a-z0-9-]+)$/i)
      if (toMatch) {
        const legacyA = toMatch[1].toLowerCase()
        const legacyB = toMatch[2].toLowerCase()
        const legacyKey = `${city.slug}|${legacyA}|${legacyB}`

        if (!seen.has(legacyKey)) {
          seen.add(legacyKey)
          params.push({
            "integration-slug": city.slug,
            systemA: legacyA,
            systemB: legacyB
          })
        }
      }

      // Explicit aliases for special integration URLs used in sitemap/navigation.
      const override = integrationRouteOverrides[integration.slug]
      if (override) {
        const overrideKey = `${city.slug}|${override.systemA}|${override.systemB}`
        if (!seen.has(overrideKey)) {
          seen.add(overrideKey)
          params.push({
            "integration-slug": city.slug,
            systemA: override.systemA,
            systemB: override.systemB
          })
        }
      }
    }
  }
  
  console.log(`Generated ${params.length} static params for city-integration pages`)
  return params
}

export default async function CityIntegrationPage({ params }: PageProps) {
  const cityData = getCityBySlug(params["integration-slug"])
  const integrations = await loadIntegrationDetails()
  
  if (!cityData) {
    notFound()
  }
  
  const reqSystemA = slugifySystemName(params.systemA)
  const reqSystemB = slugifySystemName(params.systemB)

  // Match by canonical system names first; then fallback to legacy slug pattern.
  const integration = integrations.find(i => {
    const override = integrationRouteOverrides[i.slug]
    if (override && override.systemA === reqSystemA && override.systemB === reqSystemB) {
      return true
    }

    const canonicalA = slugifySystemName(i.systemA)
    const canonicalB = slugifySystemName(i.systemB)
    if (canonicalA === reqSystemA && canonicalB === reqSystemB) {
      return true
    }

    const cleanSlug = i.slug.replace(/-(data-bridge|bridge|normalization|integration|services|technical)$/i, "")
    return cleanSlug === `${reqSystemA}-to-${reqSystemB}`
  })
  
  if (!integration) {
    notFound()
  }
  
  const { name: cityName, country, region, majorPorts = [], airports = [] } = cityData
  const systemA = integration.systemA
  const systemB = integration.systemB
  const { friction, solution, technicalData } = integration

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-400 mb-4">
            {cityName} Systems Integration
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {systemA} to {systemB} Integration in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            Eliminate manual data transfers between {systemA} and {systemB} for your {cityName} operations. 
            Automate field mapping, validation, and synchronization to accelerate your {cityName} logistics workflows.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-900/50">
              Start Integration <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View All Integrations
            </Link>
          </div>
        </div>
      </section>

      {/* RISK SECTION */}
      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" />
                Data Sync Risk
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Manual {systemA} to {systemB} Transfers Are Costing You
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {friction} For {cityName} operations handling high shipment volumes, 
                these manual processes create bottlenecks that impact customer service and operational efficiency.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">35%</div>
                  <p className="text-slate-400 text-sm">Data re-keying error rate</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">4-6 hrs</div>
                  <p className="text-slate-400 text-sm">Daily manual sync time</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$45K</div>
                  <p className="text-slate-400 text-sm">Annual error correction costs</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div>
                  <p className="text-slate-400 text-sm">Avg reconciliation delay</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  The Manual Data Trap
                </h3>
                <div className="space-y-4">
                  {[
                    `Export data from ${systemA} (CSV/XML/manual)`,
                    `Reformat to match ${systemB} requirements`,
                    `Manually validate field mappings`,
                    `Import to ${systemB} and troubleshoot errors`,
                    `Reconcile mismatches and re-process`,
                    `Repeat for every batch - 2-3x daily`
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-xs">{i + 1}</span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The {cityName} Integration Challenge
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {cityName} logistics teams waste hours on data transfers that should be instant
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileJson className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Schema Mismatch</h3>
              <p className="text-slate-600">
                {systemA} and {systemB} use different data formats, field names, and validation rules. 
                Every transfer requires manual mapping and transformation.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sync Delays</h3>
              <p className="text-slate-600">
                Batch exports create data lag. By the time data reaches {systemB}, 
                it's already outdated — causing decision delays and customer service issues.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reconciliation Gaps</h3>
              <p className="text-slate-600">
                When data doesn't match between systems, {cityName} teams spend hours 
                hunting discrepancies instead of serving customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL GUIDE */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Master Field Mapping Blueprint
            </h2>
            <p className="text-slate-600 text-lg">
              How DocStandard maps {systemA} fields to {systemB} for {cityName} operations
            </p>
          </div>
          <div 
            className="bg-slate-900 rounded-2xl overflow-auto text-slate-100 [&_table]:w-full [&_table]:min-w-[920px] [&_table]:border-collapse [&_thead]:bg-slate-950 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-slate-300 [&_th]:border-b [&_th]:border-slate-800 [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-slate-100 [&_td]:align-top [&_td]:border-b [&_td]:border-slate-800"
            dangerouslySetInnerHTML={{ __html: technicalData }}
          />
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Auto-Validation</h4>
              <p className="text-sm text-slate-600">
                Every field is validated against {systemB} requirements before transfer. 
                Errors caught early, not after import.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">ID Resolution</h4>
              <p className="text-sm text-slate-600">
                External IDs from {systemA} automatically resolved to {systemB} internal IDs 
                using your master data mappings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Error Handling</h4>
              <p className="text-sm text-slate-600">
                Failed records routed to exception queue with detailed error context 
                for quick resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CITY CONTEXT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Built for {cityName} Operations
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                {cityName} is a major logistics hub connecting {region} supply chains. 
                Operations here depend on fast, accurate data flows between systems.
              </p>
              
              {(majorPorts.length > 0 || airports.length > 0) && (
                <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-6">
                  <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Local Infrastructure
                  </h3>
                  
                  {majorPorts.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                        <Ship className="w-4 h-4" />
                        Port Facilities
                      </div>
                      <p className="text-slate-600">{majorPorts.join(", ")}</p>
                    </div>
                  )}
                  
                  {airports.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-indigo-700 font-medium mb-2">
                        <Plane className="w-4 h-4" />
                        Air Cargo
                      </div>
                      <p className="text-slate-600">{airports.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Local Data Compliance</h3>
                  <p className="text-slate-600">
                    Field mappings respect {country} regulatory requirements and local 
                    tax codes for compliant data transfers.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Time Zone Awareness</h3>
                  <p className="text-slate-600">
                    Sync schedules aligned to {cityName} business hours and cutoff times 
                    for optimal workflow integration.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Multi-Modal Support</h3>
                  <p className="text-slate-600">
                    Handles ocean, air, and ground shipment data common to {cityName} 
                    logistics operations with equal precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI SECTION */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Operational Impact for {cityName}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings for {cityName} operations processing 500+ records monthly
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4-6 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Manual daily sync</p>
              <div className="text-red-400 text-sm">Per day</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">15 min</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">96% faster</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$180K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-indigo-400 text-sm">Labor + errors</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">99.5%</div>
              <p className="text-slate-400 text-sm mb-2">Data accuracy</p>
              <div className="text-purple-400 text-sm">Zero re-keying</div>
            </div>
          </div>        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why {cityName} Teams Choose DocStandard
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Database className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live Field Mapping</h3>
              <p className="text-slate-600">
                Maps {systemA} fields to {systemB} in real-time. No pre-configuration needed — 
                works with your custom fields and extensions.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{systemB}-Ready Output</h3>
              <p className="text-slate-600">
                Data delivered in {systemB}-native format. Import directly without transformation 
                or post-processing.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sync Analytics</h3>
              <p className="text-slate-600">
                Track transfer volumes, error rates, and processing times. Identify bottlenecks 
                and optimize your integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: `How does the ${systemA} to ${systemB} integration work for ${cityName} operations?`,
                a: `We extract data from ${systemA} using your existing export capabilities, transform and validate it using our field mapping blueprint, then deliver it in ${systemB}-ready format. For ${cityName} operations, we can schedule transfers to align with your local business hours and cutoff times.`
              },
              {
                q: `Can you handle custom fields in our ${systemA} setup?`,
                a: `Yes. Our mapping engine detects custom fields in your ${systemA} configuration and can map them to corresponding custom fields in ${systemB} or standard fields with transformation logic.`
              },
              {
                q: `How do you validate data before sending to ${systemB}?`,
                a: `Every record passes through validation rules specific to ${systemB} requirements — field formats, required fields, ID lookups, and referential integrity. Failed records are queued for review with detailed error descriptions.`
              },
              {
                q: `What formats do you deliver to ${systemB}?`,
                a: `We deliver ${systemB}-ready CSV, JSON, XML, or direct API payload depending on your import method. All formats follow ${systemB} schema requirements exactly.`
              },
              {
                q: `How quickly can you process a batch?`,
                a: `Most batches process within 1-4 hours depending on record count and complexity. ${cityName} customers can request expedited processing for urgent transfers.`
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Operations Teams Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                `We eliminated 4 hours of daily manual work between {systemA} and {systemB}. 
                Data accuracy went from 82% to 99.5% — game changer for our team.`
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Manager</div>
                <div className="text-sm text-slate-500">3PL Provider, {region}</div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                `The field mapping was incredibly detailed. Every {systemA} field found its 
                home in {systemB} without us writing a single line of code.`
              </p>
              <div>
                <div className="font-semibold text-slate-900">Systems Analyst</div>
                <div className="text-sm text-slate-500">Freight Forwarder, {country}</div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                `We process 10x the data with the same team. Integration that used to take 
                a week now happens in hours automatically.`
              </p>
              <div>
                <div className="font-semibold text-slate-900">IT Director</div>
                <div className="text-sm text-slate-500">Logistics Company</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Connect {systemA} and {systemB} in {cityName}?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join operations teams eliminating manual data transfers. Get your first 
            {systemA} to {systemB} batch processed within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-900/50">
              Start Integration <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View All Integrations
            </Link>
          </div>
          
          {(majorPorts.length > 0 || airports.length > 0) && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                Serving {cityName} operations near {majorPorts.concat(airports).slice(0, 3).join(", ")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
