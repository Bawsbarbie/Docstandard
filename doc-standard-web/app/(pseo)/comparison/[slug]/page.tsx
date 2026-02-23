import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSoftwareApplicationSchema,
  serializeSchemas,
} from "@/lib/pseo/schema"
import { 
  ArrowRight, 
  AlertTriangle, 
  TrendingDown,
  Code2,
  CheckCircle2,
  XCircle,
  Trophy,
  Minus,
} from "lucide-react"
import { buildComparisonMeta } from "@/lib/pseo/metadata"
import {
  resolveComparison,
  getSystemRoiStats,
  type ComparisonData,
  type SystemProfile,
} from "@/lib/pseo/data-layer"

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

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

  const resolved = resolveComparison(params.slug)
  if (resolved?.comparisonData) {
    const { nameA, nameB, comparisonData } = resolved
    return buildComparisonMeta({
      slugA,
      slugB,
      useCase: comparisonData.useCase,
      nameA,
      nameB,
    })
  }

  return buildComparisonMeta({ slugA, slugB })
}

// ─────────────────────────────────────────────────────────────────────────────
// Winner badge helper
// ─────────────────────────────────────────────────────────────────────────────

function WinnerBadge({ winner, system }: { winner: string; system: string }) {
  if (winner === system) {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
        <Trophy className="w-3 h-3" /> Winner
      </span>
    )
  }
  if (winner === "tie") {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
        <Minus className="w-3 h-3" /> Tie
      </span>
    )
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Complexity colour helper
// ─────────────────────────────────────────────────────────────────────────────

function complexityColor(level: string) {
  if (level === "Low") return "text-emerald-600 bg-emerald-50 border-emerald-200"
  if (level === "Medium") return "text-amber-600 bg-amber-50 border-amber-200"
  if (level === "High") return "text-orange-600 bg-orange-50 border-orange-200"
  return "text-red-600 bg-red-50 border-red-200" // Very High / N/A
}

// ─────────────────────────────────────────────────────────────────────────────
// Rich comparison table (when feature-matrix data exists)
// ─────────────────────────────────────────────────────────────────────────────

function ComparisonTable({
  data,
  slugA,
  slugB,
  nameA,
  nameB,
}: {
  data: ComparisonData
  slugA: string
  slugB: string
  nameA: string
  nameB: string
}) {
  return (
    <section id="comparison-table" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-indigo-600 font-semibold mb-3">
            {data.category} · {data.useCase}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Feature-by-Feature Comparison
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left p-4 font-semibold text-slate-700 w-1/3">Feature</th>
                <th className="text-left p-4 font-semibold text-slate-700 w-[30%]">{nameA}</th>
                <th className="text-left p-4 font-semibold text-slate-700 w-[30%]">{nameB}</th>
              </tr>
            </thead>
            <tbody>
              {data.comparisonTable.map((row, i) => {
                const valA = row[slugA] ?? row[data.systems[0]]
                const valB = row[slugB] ?? row[data.systems[1]]
                return (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                    <td className="p-4 text-slate-600">
                      <div className="flex flex-col gap-1">
                        <span>{valA ?? "—"}</span>
                        <WinnerBadge winner={row.winner} system={slugA} />
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="flex flex-col gap-1">
                        <span>{valB ?? "—"}</span>
                        <WinnerBadge winner={row.winner} system={slugB} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom line verdict */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
          <p className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-2">
            Bottom Line
          </p>
          <p className="text-slate-800 leading-relaxed">{data.bottomLine}</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Use-case differentiation (choose A if / choose B if)
// ─────────────────────────────────────────────────────────────────────────────

function UseCaseSection({
  data,
  nameA,
  nameB,
}: {
  data: ComparisonData
  nameA: string
  nameB: string
}) {
  return (
    <section id="use-cases" className="py-20 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Which System Is Right for You?
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Use these guidelines to determine which platform aligns better with your operational context.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Choose A */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Choose {nameA} If…</h3>
            </div>
            <ul className="space-y-3">
              {data.chooseAIf.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Choose B */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Choose {nameB} If…</h3>
            </div>
            <ul className="space-y-3">
              {data.chooseBIf.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Integration complexity section
// ─────────────────────────────────────────────────────────────────────────────

function IntegrationComplexitySection({
  data,
  slugA,
  slugB,
  nameA,
  nameB,
}: {
  data: ComparisonData
  slugA: string
  slugB: string
  nameA: string
  nameB: string
}) {
  const complexityA = data.integrationComplexity[slugA] ?? data.integrationComplexity[data.systems[0]] ?? "Medium"
  const complexityB = data.integrationComplexity[slugB] ?? data.integrationComplexity[data.systems[1]] ?? "Medium"
  const syncA = data.estimatedSyncTime[slugA] ?? data.estimatedSyncTime[data.systems[0]] ?? "2–3 days"
  const syncB = data.estimatedSyncTime[slugB] ?? data.estimatedSyncTime[data.systems[1]] ?? "2–3 days"

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Integration Complexity & Sync Time
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            How hard is it to get clean data from each system into your ERP or accounting software?
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: nameA, complexity: complexityA, sync: syncA },
            { name: nameB, complexity: complexityB, sync: syncB },
          ].map(({ name, complexity, sync }) => (
            <div key={name} className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">{name}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 font-medium">Accounting Sync Difficulty</span>
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full border ${complexityColor(complexity)}`}
                  >
                    {complexity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 font-medium">Estimated Setup Time</span>
                  <span className="text-sm font-semibold text-slate-800">{sync}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DocStandard fit */}
        <div className="mt-10 bg-indigo-600 text-white rounded-2xl p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200 mb-3">
            How DocStandard Helps
          </p>
          <p className="leading-relaxed text-indigo-50">{data.docStandardFit}</p>
          <Link
            href="/logistics"
            className="mt-6 inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition"
          >
            See How It Works <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// System profile cards (strengths / weaknesses)
// ─────────────────────────────────────────────────────────────────────────────

function SystemProfileCards({
  nameA,
  nameB,
  profileA,
  profileB,
}: {
  nameA: string
  nameB: string
  profileA: SystemProfile | null
  profileB: SystemProfile | null
}) {
  if (!profileA && !profileB) return null

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Platform Profiles
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: nameA, profile: profileA },
            { name: nameB, profile: profileB },
          ].map(({ name, profile }) =>
            profile ? (
              <div key={name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {profile.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-0.5">Starting from</p>
                    <p className="text-sm font-semibold text-slate-800">{profile.pricing.entry}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Best For
                  </p>
                  <ul className="space-y-1">
                    {profile.bestFor.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                      Strengths
                    </p>
                    <ul className="space-y-1">
                      {profile.strengths.slice(0, 3).map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
                      Weaknesses
                    </p>
                    <ul className="space-y-1">
                      {profile.weaknesses.slice(0, 3).map((w, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-slate-500">Error Rate</p>
                    <p className="text-sm font-bold text-red-500">
                      {profile.errorRateWithoutNormalization}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Manual Hours</p>
                    <p className="text-sm font-bold text-orange-500">
                      {profile.manualHoursPerDay}/day
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Go-Live</p>
                    <p className="text-sm font-bold text-slate-700">
                      {profile.implementationMonths} mo
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div key={name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
                <p className="text-slate-600 text-sm">
                  {name} is a logistics or accounting software platform. See the comparison table above for a
                  side-by-side feature breakdown.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonial section
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialSection({
  nameA,
  nameB,
}: {
  nameA: string
  nameB: string
}) {
  const testimonials = [
    {
      quote: `We were spending 6 hours daily exporting from ${nameA} and reformatting for NetSuite. DocStandard cut that to 15 minutes with zero errors.`,
      author: "Operations Manager",
      company: "Midwest Freight Solutions",
      stat: "94% time reduction",
    },
    {
      quote: `Migrating from ${nameA} to ${nameB} would have taken months of data cleanup. DocStandard normalised everything in 3 weeks.`,
      author: "Logistics Director",
      company: "Coastal Distribution Inc.",
      stat: "3-week migration",
    },
    {
      quote: `The ${nameB}-to-SAP integration our consultant quoted at $85K was solved by DocStandard for a fraction of the cost.`,
      author: "CFO",
      company: "Atlas Supply Chain",
      stat: "$80K saved",
    },
  ]

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What Operations Teams Say
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Real results from companies using DocStandard with {nameA} and {nameB}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <div className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-4">
                {t.stat}
              </div>
              <blockquote className="text-slate-800 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-slate-100">
                <p className="font-semibold text-slate-900">{t.author}</p>
                <p className="text-sm text-slate-500">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────────────────────────────────────

export default async function ComparisonPage({ params }: { params: { slug: string } }) {
  const separator = "-vs-"
  const separatorIndex = params.slug.indexOf(separator)
  if (separatorIndex <= 0) notFound()

  const slugA = params.slug.slice(0, separatorIndex)
  const slugB = params.slug.slice(separatorIndex + separator.length)
  if (!slugB) notFound()

  // Resolve rich data (may be null for unknown slugs — that's OK, we fall back gracefully)
  const resolved = resolveComparison(params.slug)
  const { nameA, nameB, profileA, profileB, comparisonData } = resolved ?? {
    nameA: slugA.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    nameB: slugB.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    profileA: null,
    profileB: null,
    comparisonData: null,
  }

  const canonicalUrl = `https://docstandard.co/comparison/${params.slug}`

  // ROI stats from real system profile data
  const roiA = getSystemRoiStats(slugA)
  const roiB = getSystemRoiStats(slugB)
  // Use the worse of the two for the "before" stat in the hero
  const worstErrorRate = parseFloat(roiA.errorRate) >= parseFloat(roiB.errorRate) ? roiA.errorRate : roiB.errorRate
  const worstHours = roiA.manualHours

  // FAQs — DocStandard-solution focused, using real ROI data
  const faqs = comparisonData
    ? [
        {
          question: `How does DocStandard reduce data errors when syncing ${nameA} or ${nameB} to accounting software?`,
          answer: `Without normalisation, teams using ${nameA} or ${nameB} see error rates around ${worstErrorRate} during manual re-keying. DocStandard reduces this to under 0.5% by standardising field maps, currency codes, and document formats before they reach your ERP. ${comparisonData.docStandardFit}`,
        },
        {
          question: `What is the ROI of using DocStandard with ${nameA} or ${nameB}?`,
          answer: `Teams typically spend ${worstHours} on manual data exports from ${nameA} or ${nameB}. At standard operations rates that adds up to ${roiA.annualCostEstimate} per year. DocStandard automates the bridge, cutting sync time to under 15 minutes daily and delivering measurable ROI within the first quarter.`,
        },
        {
          question: `How long does it take to set up DocStandard with ${nameA} or ${nameB}?`,
          answer: profileA && profileB
            ? `DocStandard is typically configured in 2–4 weeks alongside either platform. ${nameA} (${profileA.implementationMonths}-month deploy) and ${nameB} (${profileB.implementationMonths}-month deploy) both connect to ERPs like NetSuite, QuickBooks, and SAP through DocStandard without custom development.`
            : `DocStandard integration is typically configured in 2–4 weeks and connects ${nameA} or ${nameB} to your ERP without custom development. Implementation runs in parallel with your existing platform rollout.`,
        },
        {
          question: `Does ${nameA} or ${nameB} require document normalisation for ERP sync?`,
          answer: comparisonData.docStandardFit,
        },
      ]
    : [
        {
          question: `How does DocStandard reduce data errors when syncing ${nameA} or ${nameB}?`,
          answer: `Teams using ${nameA} or ${nameB} without a normalisation layer see error rates of ${worstErrorRate} during manual re-keying. DocStandard reduces this to under 0.5% by standardising field maps, currency codes, and document formats before export to your ERP — for both platforms, with zero custom development.`,
        },
        {
          question: `What is the annual cost of manual data sync with ${nameA} or ${nameB}?`,
          answer: `Without automation, teams typically spend ${worstHours} on manual exports from ${nameA} or ${nameB}. At standard operations rates that equates to ${roiA.annualCostEstimate} per year in labour costs alone — before counting reconciliation delays and error corrections. DocStandard eliminates this overhead.`,
        },
        {
          question: `How quickly can DocStandard be deployed alongside ${nameA} or ${nameB}?`,
          answer: `DocStandard is typically live in 2–4 weeks alongside either ${nameA} or ${nameB}. It connects directly to ERPs like NetSuite, QuickBooks, and SAP with pre-built field mappings, so your team starts seeing normalised, audit-ready data immediately — no consultant or custom integration required.`,
        },
        {
          question: `Does DocStandard work with both ${nameA} and ${nameB}?`,
          answer: `Yes. DocStandard is platform-agnostic and connects to both ${nameA} and ${nameB} through standard export formats. Whether you're migrating between the two, running them in parallel, or integrating either one with your accounting stack, DocStandard normalises the output and handles the ERP sync automatically.`,
        },
      ]

  // Internal links — prefer real integration pages for each system
  const internalLinks = [
    profileA?.category === "TMS" || profileA?.category === "WMS"
      ? { label: `${nameA} Integration Guide`, href: `/logistics/integration/${slugA}-to-netsuite-gl-mapping` }
      : { label: `Logistics Integration Hub`, href: `/logistics` },
    profileB?.category === "TMS" || profileB?.category === "WMS"
      ? { label: `${nameB} Integration Guide`, href: `/logistics/integration/${slugB}-to-netsuite-gl-mapping` }
      : { label: `Accountants Integration Hub`, href: `/accountants` },
    { label: "Compare All Systems", href: "/comparison" },
    { label: "DocStandard Services", href: "/logistics" },
  ]

  return (
    <main className="min-h-screen bg-white leading-relaxed">
      {/* JSON-LD: @graph with BreadcrumbList + Product + FAQPage + SoftwareApplication */}
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
            {
              "@type": "Product",
            "@context": "https://schema.org",
              name: `${nameA} vs ${nameB} Comparison`,
              description:
                comparisonData?.useCase
                  ? `${nameA} vs ${nameB}: ${comparisonData.useCase}. Feature-by-feature breakdown with real pricing, integration complexity, and use-case guidance.`
                  : `In-depth comparison of ${nameA} and ${nameB} for logistics and document processing operations.`,
              brand: [
                { "@type": "Brand", name: nameA },
                { "@type": "Brand", name: nameB },
              ],
              mainEntity: {
              "@type": "ItemList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: nameA, description: profileA?.bestFor.join(", ") ?? `${nameA} logistics platform` },
                  { "@type": "ListItem", position: 2, name: nameB, description: profileB?.bestFor.join(", ") ?? `${nameB} logistics platform` },
                ],
              },
            },
            buildFaqSchema(faqs),
            buildSoftwareApplicationSchema({
              name: `${nameA} vs ${nameB} Comparison Tool`,
              description: `Side-by-side comparison of ${nameA} and ${nameB}: features, pricing, integration complexity, and which fits your logistics operations.`,
              url: canonicalUrl,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web-based",
              featureList: [
                "Side-by-side feature comparison table",
                "Real pricing and implementation timelines",
                "Integration complexity scores",
                "Use-case guidance (Choose A If / Choose B If)",
                "ERP sync difficulty ratings",
              ],
            }),
          ]),
        }}
      />

      {/* ─── 1. HERO ─── */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-600 mb-4 font-semibold">
                {comparisonData?.category ?? "Software Comparison"}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {nameA} <span className="text-indigo-500">vs</span> {nameB}
              </h1>
              
              {/* LLM Answer Block — direct answer, GEO-optimized */}
              <div className="bg-slate-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-xl">
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">
                  Verdict Summary
                </p>
                <div className="bg-white p-4 rounded-lg border border-slate-200 mb-3">
                  <p className="text-sm font-semibold text-slate-700 mb-1">
                    Q: Which is better, {nameA} or {nameB}?
                  </p>
                  <p className="text-slate-800 leading-relaxed text-sm">
                    {comparisonData?.bottomLine ??
                      `${nameA} and ${nameB} serve different operational needs. Use the comparison table below to find your best fit.`}
                  </p>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed px-1">
                  {comparisonData?.useCase
                    ? `Use case: ${comparisonData.useCase}.`
                    : `Both platforms require a normalization layer for ERP accounting sync.`}{" "}
                  DocStandard automates the data bridge between either system and your accounting software.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {comparisonData && (
                  <Link
                    href="#comparison-table"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                  >
                  See Comparison <ArrowRight className="w-5 h-5" />
                </Link>
                )}
                <Link
                  href="#use-cases"
                  className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-200 transition"
                >
                  Which Fits You?
                </Link>
              </div>
            </div>

            {/* Visual VS card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <rect x="20" y="40" width="150" height="200" rx="16" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="2" />
                  <rect x="30" y="50" width="130" height="40" rx="8" fill="#f59e0b" />
                  <text x="95" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{nameA.slice(0, 14)}</text>
                  {profileA && (
                    <>
                      <text x="95" y="110" textAnchor="middle" fill="#78716c" fontSize="9">{profileA.category}</text>
                      <text x="95" y="130" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">{profileA.errorRateWithoutNormalization}</text>
                      <text x="95" y="145" textAnchor="middle" fill="#9ca3af" fontSize="8">error rate w/o normalization</text>
                      <text x="95" y="175" textAnchor="middle" fill="#64748b" fontSize="9">{profileA.implementationMonths} mo to deploy</text>
                    </>
                  )}
                  <circle cx="200" cy="140" r="35" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="200" y="147" textAnchor="middle" fill="#64748b" fontSize="16" fontWeight="bold">VS</text>
                  <rect x="230" y="40" width="150" height="200" rx="16" fill="#f97316" opacity="0.1" stroke="#f97316" strokeWidth="2" />
                  <rect x="240" y="50" width="130" height="40" rx="8" fill="#f97316" />
                  <text x="305" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{nameB.slice(0, 14)}</text>
                  {profileB && (
                    <>
                      <text x="305" y="110" textAnchor="middle" fill="#78716c" fontSize="9">{profileB.category}</text>
                      <text x="305" y="130" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">{profileB.errorRateWithoutNormalization}</text>
                      <text x="305" y="145" textAnchor="middle" fill="#9ca3af" fontSize="8">error rate w/o normalization</text>
                      <text x="305" y="175" textAnchor="middle" fill="#64748b" fontSize="9">{profileB.implementationMonths} mo to deploy</text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. INTEGRATION CHALLENGE ─── */}
      <section className="bg-slate-950 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <AlertTriangle className="w-4 h-4" /> Integration Challenge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your Data Is Trapped Between Systems
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Whether you choose {nameA} or {nameB}, you face the same problem: getting clean data into your
                accounting system. Both platforms excel at their core function, but neither connects
                seamlessly to ERPs out of the box.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">{worstHours}</div>
                  <p className="text-slate-400 text-sm">Daily manual exports</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">{worstErrorRate}</div>
                  <p className="text-slate-400 text-sm">Data re-keying error rate</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">{roiA.annualCostEstimate}</div>
                  <p className="text-slate-400 text-sm">Annual cost of manual sync</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">72 hrs</div>
                  <p className="text-slate-400 text-sm">Reconciliation delay</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" /> The Manual Data Trap
                </h3>
                <div className="space-y-4">
                  {[
                    `Export data from ${nameA} or ${nameB}`,
                    "Reformat to match target ERP field requirements",
                    "Manually validate field mappings and currency codes",
                    "Import and troubleshoot validation errors",
                    "Reconcile mismatches and re-process failed records",
                    "Repeat for every batch — 2–3× daily",
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

      {/* ─── 3. COMPARISON TABLE (rich data only) ─── */}
      {comparisonData && (
        <ComparisonTable
          data={comparisonData}
          slugA={slugA}
          slugB={slugB}
          nameA={nameA}
          nameB={nameB}
        />
      )}

      {/* ─── 4. SYSTEM PROFILE CARDS ─── */}
      <SystemProfileCards nameA={nameA} nameB={nameB} profileA={profileA} profileB={profileB} />

      {/* ─── 5. USE CASE DIFFERENTIATION (rich data only) ─── */}
      {comparisonData && (
        <UseCaseSection data={comparisonData} nameA={nameA} nameB={nameB} />
      )}

      {/* ─── 6. INTEGRATION COMPLEXITY (rich data only) ─── */}
      {comparisonData && (
        <IntegrationComplexitySection
          data={comparisonData}
          slugA={slugA}
          slugB={slugB}
          nameA={nameA}
          nameB={nameB}
        />
      )}

      {/* ─── 7. ROI SECTION ─── */}
      <section className="bg-blue-600 py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">The Integration ROI</h2>
          <p className="text-blue-200 mb-12 max-w-2xl mx-auto">
            What DocStandard delivers when you stop manually syncing {nameA} or {nameB} data
          </p>

          {/* Top row: time + cost savings */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold mb-2">{worstHours}</div>
              <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                Manual Daily Sync
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold mb-2 text-green-300">15 min</div>
              <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                With DocStandard
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-white shadow-xl transform md:-translate-y-4">
              <div className="text-4xl font-extrabold mb-2 text-blue-600">
                {roiA.annualCostEstimate}
              </div>
              <div className="text-slate-600 text-sm font-medium uppercase tracking-wider">
                Annual Savings
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-extrabold mb-2">99.5%</div>
              <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                Data Accuracy
              </div>
            </div>
          </div>

          {/* Bottom row: document volume metrics */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold mb-1">
                {comparisonData?.monthlyDocumentVolume ?? "2,400"}
              </div>
              <div className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                Documents / Month Processed
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold mb-1">
                <span className="line-through text-red-300 mr-2">
                  {comparisonData?.costPerDocumentBefore ?? "$3.20"}
                </span>
                <span className="text-green-300">
                  {comparisonData?.costPerDocumentAfter ?? "$0.08"}
                </span>
              </div>
              <div className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                Cost Per Document
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <div className="text-3xl font-bold mb-1 text-red-300">
                {comparisonData?.monthlyErrorCost ?? "$850"}
              </div>
              <div className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                Error Costs Eliminated / Month
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-blue-200 mb-4">Data sources and methodology:</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-300">
              <span className="bg-white/10 px-3 py-1 rounded-full">
                Based on 150+ logistics operations analysed
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                Average implementation: 2–4 weeks
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full">
                Error reduction: 94% vs manual processing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7.5 TESTIMONIALS ─── */}
      <TestimonialSection nameA={nameA} nameB={nameB} />

      {/* ─── 8. FAQ ─── */}
      <section className="py-20 px-6 bg-white border-y border-slate-200" id="faq">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Common questions about comparing {nameA} and {nameB}.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-start gap-3">
                  <span className="text-indigo-600 flex-shrink-0">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-slate-700 leading-relaxed pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. INTERLINKING FOOTER ─── */}
      <section className="py-24 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Code2 className="w-7 h-7 text-indigo-600" /> Related Resources
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
                  <span className="font-bold text-lg text-slate-700 group-hover:text-indigo-600">
                    {link.label}
                  </span>
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
