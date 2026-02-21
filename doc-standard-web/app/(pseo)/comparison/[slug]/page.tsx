import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { buildBreadcrumbSchema, serializeSchemas } from "@/lib/pseo/schema"
import { 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Database, 
  AlertTriangle, 
  RefreshCw, 
  FileJson,
  CheckCircle2,
  TrendingDown,
  ChevronRight,
  Code2,
  Zap,
  Shield,
  Building2,
  DollarSign
} from "lucide-react"
import { buildComparisonMeta } from "@/lib/pseo/metadata"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const separator = "-vs-"
  const separatorIndex = params.slug.indexOf(separator)
  if (separatorIndex <= 0) return { robots: { index: false } }

  const slugA = params.slug.slice(0, separatorIndex)
  const slugB = params.slug.slice(separatorIndex + separator.length)
  if (!slugB) return { robots: { index: false } }

  return buildComparisonMeta({ slugA, slugB })
}

export default async function ComparisonPage({ params }: { params: { slug: string } }) {
  // Parse slug using the explicit "-vs-" delimiter so multi-segment slugs
  // like "3pl-central-vs-oracle-erp-cloud" resolve correctly.
  const separator = "-vs-"
  const separatorIndex = params.slug.indexOf(separator)
  if (separatorIndex <= 0) notFound()

  const systemA = params.slug.slice(0, separatorIndex)
  const systemB = params.slug.slice(separatorIndex + separator.length)
  if (!systemB) notFound()

  const toDisplayName = (value: string) =>
    value
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

  const nameA = toDisplayName(systemA)
  const nameB = toDisplayName(systemB)

  const internalLinks = [
    { label: `${nameA} Integration Guide`, href: `/integration/${systemA}-to-netsuite-bridge` },
    { label: `${nameB} Integration Guide`, href: `/integration/${systemB}-to-netsuite-bridge` },
    { label: "High-Volume Data Cleaning", href: "/services" },
    { label: "Logistics Finance Hub", href: "/finance" }
  ]

  const canonicalUrl = `https://docstandard.co/comparison/${slug}`

  return (
    <main className="min-h-screen bg-white leading-relaxed">
      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: serializeSchemas([
            buildBreadcrumbSchema([
              { name: "Home", url: "https://docstandard.co" },
              { name: "Comparisons", url: "https://docstandard.co/comparison" },
              { name: `${nameA} vs ${nameB}`, url: canonicalUrl },
            ]),
          ]),
        }}
      />
      {/* LLM Entity Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `${nameA} vs ${nameB} Comparison`,
            "description": `In-depth comparison of ${nameA} and ${nameB} for logistics and warehouse management operations.`,
            "brand": [
              { "@type": "Brand", "name": nameA },
              { "@type": "Brand", "name": nameB }
            ],
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": nameA,
                  "description": `${nameA} logistics system capabilities and integration points.`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": nameB,
                  "description": `${nameB} logistics system capabilities and integration points.`
                }
              ]
            }
          })
        }}
      />

      {/* 1. HERO - V1 Standard */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">WMS Comparison</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {nameA} <span className="text-indigo-500">vs</span> {nameB}
              </h1>
              
              {/* LLM Answer Block / GEO Optimization */}
              <div className="bg-slate-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-xl">
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Verdict Summary</p>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {nameA} and {nameB} are leading logistics platforms. {nameA} is typically preferred for large-scale freight forwarding, while {nameB} excels in agile warehouse management. The primary operational bottleneck for both is accounting synchronization, which DocStandard automates.
                </p>
              </div>

              <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8 leading-relaxed">
                Compare {nameA} and {nameB} for logistics operations. Side-by-side analysis of features, pricing, and capabilities to find your best fit.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#comparison-table" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                  See Comparison <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#use-cases" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition">
                  Which Fits You?
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#f59e0b"/>
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{nameA}</text>
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#f97316" opacity="0.1" stroke="#f97316" strokeWidth="2"/>
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#f97316"/>
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{nameB}</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTEGRATION CHALLENGE - V1 Standard */}
      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6"><AlertTriangle className="w-4 h-4" />Integration Challenge</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Data Is Trapped Between Systems</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Whether you choose {nameA} or {nameB}, you are facing the same problem: getting clean data into your accounting system. Both platforms excel at their core function, but neither connects seamlessly to ERPs out of the box.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">4-6 hrs</div><p className="text-slate-400 text-sm">Daily manual exports</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">35%</div><p className="text-slate-400 text-sm">Data re-keying error rate</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">$45K</div><p className="text-slate-400 text-sm">Annual error costs</p></div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800"><div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div><p className="text-slate-400 text-sm">Reconciliation delay</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-red-400" />The Manual Data Trap</h3>
                <div className="space-y-4">
                  {[`Export data from ${nameA}`, `Reformat to match target system requirements`, "Manually validate field mappings", "Import and troubleshoot errors", "Reconcile mismatches and re-process", "Repeat for every batch - 2-3x daily"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-red-400 text-xs">{i + 1}</span></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROI SECTION - V1 Standard */}
      <section className="bg-blue-600 py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">The Integration ROI</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold mb-2">4-6 hrs</div>
              <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Manual Daily Sync</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold mb-2 text-green-300">15 min</div>
              <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">With DocStandard</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-white shadow-xl transform md:-translate-y-4 min-w-[200px]">
              <div className="text-4xl font-extrabold mb-2 text-blue-600">$180K/year</div>
              <div className="text-slate-600 text-sm font-medium uppercase tracking-wider">Annual Savings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold mb-2">99.5%</div>
              <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">Data Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. INTERLINKING FOOTER */}
      <section className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
               <Code2 className="w-7 h-7 text-indigo-600" /> Engineering Resources
            </h3>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            {internalLinks.map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-slate-700 group-hover:text-indigo-600">{link.label}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
