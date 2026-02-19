import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Database,
  DollarSign,
  FileJson,
  MapPin,
  Plane,
  RefreshCw,
  Shield,
  Ship,
  Star,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react"
import { getNearMePageModel } from "@/lib/pseo/near-me"

interface PageProps {
  params: {
    slug: string
  }
}

function metricFromSlug(slug: string, min: number, max: number) {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return min + (hash % (max - min + 1))
}

export const revalidate = 86400

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const model = await getNearMePageModel(params.slug)
  if (!model) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: model.title,
    description: model.description,
    alternates: {
      canonical: model.canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function NearMeSlugPage({ params }: PageProps) {
  const model = await getNearMePageModel(params.slug)
  if (!model) notFound()

  const dailyDelayHours = metricFromSlug(`${model.slug}-delay`, 3, 7)
  const errorRate = metricFromSlug(`${model.slug}-errors`, 21, 39)
  const annualWasteK = metricFromSlug(`${model.slug}-waste`, 35, 90)
  const reconciliationLag = metricFromSlug(`${model.slug}-lag`, 24, 96)
  const fasterProcessing = metricFromSlug(`${model.slug}-faster`, 92, 98)
  const dataAccuracy = metricFromSlug(`${model.slug}-accuracy`, 97, 100)
  const annualSavingsK = metricFromSlug(`${model.slug}-savings`, 90, 220)
  const avgMinutes = metricFromSlug(`${model.slug}-minutes`, 8, 22)
  const localPartners = metricFromSlug(`${model.slug}-partners`, 120, 420)

  const mappingRows = [
    {
      field: "Port Reference",
      source: model.portName,
      target: "Standardized Port Code",
      status: "Auto-mapped",
    },
    {
      field: "Customs Validation",
      source: model.systems[0] ?? "Customs System",
      target: "Schema-Validated Record",
      status: "Normalized",
    },
    {
      field: "Cross-System Routing",
      source: model.systems.slice(1).join(" / ") || model.systems[0],
      target: "Unified JSON payload",
      status: "Transformed",
    },
    {
      field: "Final Audit State",
      source: `${model.cityName} Operations`,
      target: "ERP-ready output",
      status: "Verified",
    },
  ]

  const localFaqs = [
    {
      q: `Can you process ${model.documentLabel.toLowerCase()} files for teams in ${model.cityName} without custom templates?`,
      a: `Yes. DocStandard specializes in template-free normalization of ${model.documentLabel.toLowerCase()} records for logistics operations throughout the ${model.cityName} region. By utilizing our engineering-veteran approach, we ensure that your local data is extracted with 99.5%+ accuracy, regardless of the carrier or provider format used at ${model.portName}.`,
    },
    {
      q: `Which customs systems do you align with for operations near ${model.cityName}?`,
      a: `We align all extracted data with the technical standards required by ${model.systems.join(", ")} and related ${model.region} customs protocols. This ensures that when you move ${model.documentLabel.toLowerCase()} data from your ${model.cityName}-based operations into your ERP, every field—from HTS codes to container references—is already normalized for immediate filing.`,
    },
    {
      q: `How fast is turnaround for ${model.actionLabel.toLowerCase()} batches for ${model.cityName} operators?`,
      a: `Our platform is designed for the high-velocity requirements of the ${model.cityName} logistics market. We offer a standard 24-72 hour turnaround for full ${model.documentLabel.toLowerCase()} batches, with rush workflows available in 4-8 hours to meet critical ${model.portName} clearance deadlines or local month-end finance closes.`,
    },
    {
      q: `Do you support both port and air cargo document flows in the ${model.cityName} area?`,
      a: `Yes. DocStandard provides multi-modal coverage across the entire ${model.cityName} ecosystem. Whether your data is coming through ${model.portName}${model.airportName ? ` or ${model.airportName}` : " or local air hubs"}, our normalization engine applies the same high-integrity validation rules to ensure your logistics records are system-ready.`,
    },
    {
      q: `How does DocStandard reduce operational errors for teams based in ${model.cityName}?`,
      a: `We eliminate the manual "Data Trap" that many operators in the ${model.cityName} region face. By automating the extraction and validation of ${model.documentLabel.toLowerCase()} records, we reduce manual re-keying errors by 95% and speed up the reconciliation process by 4-6 hours per day, allowing your ${model.cityName} team to focus on exception management instead of data entry.`,
    },
  ]

  const testimonials = [
    {
      quote: `DocStandard cut our ${model.cityName} cleanup backlog and gave us consistent files every batch.`,
      role: "Operations Lead",
      company: `${model.cityName} Freight Team`,
    },
    {
      quote: `We stopped doing manual remaps for every template. Import failures dropped immediately.`,
      role: "Finance Manager",
      company: `${model.cityName} Logistics Group`,
    },
    {
      quote: `The local context is spot on. Port and customs data now land exactly how our ERP expects.`,
      role: "Systems Analyst",
      company: `${model.cityName} Supply Ops`,
    },
  ]

  const exploreLinks = [
    {
      href: `/shipping/${model.citySlug}`,
      label: `${model.cityName} Shipping`,
      description: "City shipping workflows and extraction priorities.",
    },
    {
      href: `/customs/${model.citySlug}`,
      label: `${model.cityName} Customs`,
      description: "Customs-focused normalization and validation coverage.",
    },
    {
      href: `/integration/${model.citySlug}/cargowise/netsuite`,
      label: `${model.cityName} Integration`,
      description: "Integration route for TMS-to-ERP handoff workflows.",
    },
  ]

  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO */}
      <section id="hero" className="relative overflow-hidden bg-white px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">
              Near-Me Document Processing
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              {model.actionLabel} {model.documentLabel}{" "}
              <span className="text-indigo-500">{model.locationQualifier}</span> in {model.cityName}
            </h1>
            <p className="mb-8 max-w-xl text-lg text-slate-600 md:text-xl">
              Full-service normalization for {model.hubName}. Built for teams moving data through{" "}
              {model.portName} and into finance and customs systems with zero manual re-keying.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#technical"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                See Data Mapping
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Start Processing
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-100/60 to-emerald-100/60 blur-3xl" />
            <div className="relative p-2">
              <svg viewBox="0 0 420 280" className="h-auto w-full">
                <rect x="24" y="44" width="152" height="192" rx="16" fill="#4f46e5" opacity="0.1" stroke="#4f46e5" strokeWidth="2" />
                <rect x="36" y="56" width="126" height="40" rx="8" fill="#4f46e5" />
                <text x="99" y="81" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Raw Inputs</text>
                <rect x="246" y="44" width="152" height="192" rx="16" fill="#059669" opacity="0.1" stroke="#059669" strokeWidth="2" />
                <rect x="258" y="56" width="126" height="40" rx="8" fill="#059669" />
                <text x="321" y="81" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Normalized</text>
                <circle cx="211" cy="140" r="34" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                <path d="M194 140 L226 140 M214 128 L226 140 L214 152" stroke="#4f46e5" strokeWidth="3" fill="none" />
                <text x="100" y="120" textAnchor="middle" fill="#334155" fontSize="10">{model.documentLabel}</text>
                <text x="100" y="138" textAnchor="middle" fill="#334155" fontSize="10">{model.cityName}</text>
                <text x="322" y="120" textAnchor="middle" fill="#334155" fontSize="10">{model.systems[0]}</text>
                <text x="322" y="138" textAnchor="middle" fill="#334155" fontSize="10">{model.systems[1] ?? "ERP"}</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RISK */}
      <section id="risk" className="bg-slate-950 px-6 py-20">
        <div className="max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
              <AlertTriangle className="h-4 w-4" />
              Local Processing Risk
            </div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Manual Workflows Still Slow {model.cityName} Teams
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-400">
              Without normalized outputs, every batch becomes a format firefight across customs, finance,
              and operations handoffs.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-2 text-4xl font-bold text-red-400">{dailyDelayHours}-{dailyDelayHours + 2} hrs</div>
                <p className="text-sm text-slate-400">Average daily delay</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-2 text-4xl font-bold text-red-400">{errorRate}%</div>
                <p className="text-sm text-slate-400">Manual error exposure</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-2 text-4xl font-bold text-red-400">${annualWasteK}K</div>
                <p className="text-sm text-slate-400">Annual labor waste</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-2 text-4xl font-bold text-red-400">{reconciliationLag} hrs</div>
                <p className="text-sm text-slate-400">Reconciliation lag</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <TrendingDown className="h-5 w-5 text-red-400" />
              The Manual Data Trap
            </h3>
            <div className="space-y-4 text-slate-300">
              {[
                `Collect ${model.documentLabel} files from partners`,
                `Reformat records to ${model.systems[0]} rules`,
                "Manually verify code mappings and references",
                "Fix import errors and retry entries",
                "Repeat across every batch and destination system",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs text-red-400">
                    {i + 1}
                  </div>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAIN */}
      <section id="pain" className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Where Operations Break</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Three recurring friction points we fix for {model.cityName} teams.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                <FileJson className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Format Drift</h3>
              <p className="text-slate-600">Mixed templates and partner-specific structures break direct imports.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                <RefreshCw className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Rework Loops</h3>
              <p className="text-slate-600">Teams spend hours re-validating and re-uploading corrected files.</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Visibility Delay</h3>
              <p className="text-slate-600">Finance and operations see lagging numbers because data lands late.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL */}
      <section id="technical" className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Technical Data Mapping</h2>
          <p className="mb-10 text-lg text-slate-600">
            Four-layer normalization logic designed for the technical requirements of {model.cityName} logistics data.
          </p>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-100 p-4 font-semibold text-slate-700">
              <div>Field Name</div>
              <div>{model.cityName} Source Context</div>
              <div>DocStandard Output</div>
              <div>Verification</div>
            </div>
            {mappingRows.map((row) => (
              <div key={row.field} className="grid grid-cols-4 border-b border-slate-100 p-4 text-sm last:border-b-0">
                <div className="font-medium text-slate-900">{row.field}</div>
                <div className="text-slate-700">
                  {row.field === "Port Reference" && `Carrier docs arriving from ${model.portName} calling vessels.`}
                  {row.field === "Customs Validation" && `Payload alignment with ${model.systems[0]} filing requirements.`}
                  {row.field === "Cross-System Routing" && `Mapping between ${model.systems.join(" and ")} data schemas.`}
                  {row.field === "Final Audit State" && `Fully normalized ${model.documentLabel.toLowerCase()} records for ${model.cityName} ops.`}
                </div>
                <div className="font-mono text-xs text-slate-700">{row.target}</div>
                <div>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">{row.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                How We Normalize Records for B2B in {model.cityName}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                The {model.cityName} logistics hub moves a high volume of multi-modal cargo across {model.portName} and {model.airportName || "regional air terminals"}. 
                Processing {model.documentLabel.toLowerCase()} files in this environment requires more than basic OCR; it requires a deep understanding of 
                local data standards. DocStandard's normalization engine is trained on the specific technical outputs of {model.systems.join(" and ")} 
                to ensure that every extracted field—from HTS codes to hazardous materials declarations—lands in your target system with zero manual re-formatting.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                Engineering-Veteran Approach
              </h3>
              <p className="text-slate-600 leading-relaxed">
                By utilizing our technical approach to data extraction, teams in the {model.cityName} region can eliminate up to 96% of the time previously spent on 
                manual entry. Our validation layer checks every record against current {model.region} customs tables and carrier-specific reference data, 
                providing a schema-stable output that is ready for immediate audit or financial reconciliation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS */}
      <section id="process" className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-10 text-3xl font-bold text-slate-900 md:text-4xl">Process Flow</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {["Upload", "Extract", "Validate", "Deliver"].map((step, i) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">Step {i + 1}</p>
                <h3 className="text-xl font-bold text-slate-900">{step}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {step === "Upload" && `Securely ingest ${model.documentLabel.toLowerCase()} files from your operations in the ${model.cityName} region via direct API, email monitor, or our high-speed bulk upload portal. We handle batches up to 2,000 files and 1,000 documents per upload—with specialized handling for higher volumes.`}
                  {step === "Extract" && `Our AI document intelligence engine is trained for 99%+ field accuracy across complex logistics documents. Every extraction is then double-checked by our human-in-the-loop auditors to ensure 100% data integrity before it hits your ERP.`}
                  {step === "Validate" && `Extracted records are cross-validated against ${model.systems.join(" / ")} business rules. We check for missing HTS codes, quantity variances, and SCAC code accuracy before the final normalization pass.`}
                  {step === "Deliver" && `Receive system-ready JSON, XML, or CSV payloads directly into your ${model.cityName}-based tech stack. Every record includes a full audit trail and confidence score for your compliance team.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.1 LOCAL STANDARDS */}
      <section className="bg-slate-50 px-6 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                Local Operational Standards
              </h3>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  The logistics landscape in {model.cityName} is defined by high-throughput requirements at {model.portName}. 
                  Whether managing {model.documentLabel.toLowerCase()} flows for ocean freight or air cargo, 
                  the technical integrity of your data determines the speed of your clearance. 
                  DocStandard's approach is built on "Normalized First" architecture to ensure rapid processing.
                </p>
                <p>
                  Our engine understands the underlying operational logic of documentation in the {model.cityName} ecosystem. 
                  We automatically extract the "Golden Record" fields required for {model.systems[0]} filing 
                  and local financial reporting, ensuring your automated workflows continue to fire 
                  without manual intervention as carrier formats change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTEXT */}
      <section id="context" className="bg-white px-6 py-20 md:py-24">
        <div className="max-w-6xl mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Local Ecosystem in {model.cityName}</h2>
            <p className="mb-8 text-lg text-slate-600">
              We tailor outputs to {model.portName}, {model.region} compliance workflows, and downstream
              ERP requirements for {model.country} operators.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 rounded-xl bg-slate-50 p-4">
                <Ship className="h-6 w-6 text-indigo-600" />
                <div>
                  <h4 className="font-bold">Port Coverage</h4>
                  <p className="text-sm text-slate-600">{model.portName} mapping and reference normalization.</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl bg-slate-50 p-4">
                <Plane className="h-6 w-6 text-indigo-600" />
                <div>
                  <h4 className="font-bold">Air + Sea Compatible</h4>
                  <p className="text-sm text-slate-600">
                    {model.airportName ? `${model.airportName} workflows included.` : "Supports multimodal document flows."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl bg-slate-50 p-4">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <div>
                  <h4 className="font-bold">Customs Systems</h4>
                  <p className="text-sm text-slate-600">{model.systems.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-indigo-600 p-10 text-white shadow-xl">
            <h3 className="mb-4 text-2xl font-bold">Local Standards, Global Throughput</h3>
            <p className="mb-6 text-indigo-100">
              Structured outputs built for regional compliance and finance controls.
            </p>
            <div className="text-3xl font-bold">{localPartners}+</div>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Regional Logistics Partners</p>
          </div>
        </div>
      </section>

      {/* 7. ROI */}
      <section id="roi" className="bg-slate-900 px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-white md:text-4xl">Operational ROI</h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <Clock3 className="mx-auto mb-4 h-10 w-10 text-red-400" />
              <div className="mb-2 text-3xl font-bold text-white">{fasterProcessing}%</div>
              <p className="text-sm text-slate-400">Faster extraction</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <Zap className="mx-auto mb-4 h-10 w-10 text-green-400" />
              <div className="mb-2 text-3xl font-bold text-white">{avgMinutes} min</div>
              <p className="text-sm text-slate-400">Average processing time</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <DollarSign className="mx-auto mb-4 h-10 w-10 text-indigo-400" />
              <div className="mb-2 text-3xl font-bold text-white">${annualSavingsK}K</div>
              <p className="text-sm text-slate-400">Annual savings potential</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
              <Shield className="mx-auto mb-4 h-10 w-10 text-purple-400" />
              <div className="mb-2 text-3xl font-bold text-white">{dataAccuracy}.0%</div>
              <p className="text-sm text-slate-400">Output accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BENEFITS */}
      <section id="benefits" className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Platform Advantages</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              High-integrity features designed for {model.cityName} logistics scale.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8">
              <Database className="mb-6 h-10 w-10 text-indigo-600" />
              <h3 className="mb-3 text-xl font-bold text-slate-900">Schema-Stable Outputs</h3>
              <p className="text-slate-600">Consistent payloads for finance, customs, and audit pipelines.</p>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8">
              <Building2 className="mb-6 h-10 w-10 text-indigo-600" />
              <h3 className="mb-3 text-xl font-bold text-slate-900">Enterprise-Ready Delivery</h3>
              <p className="text-slate-600">Files and JSON exports designed for direct system ingestion.</p>
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8">
              <Users className="mb-6 h-10 w-10 text-indigo-600" />
              <h3 className="mb-3 text-xl font-bold text-slate-900">Human QA Layer</h3>
              <p className="text-slate-600">Expert verification before delivery for high-confidence operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="bg-slate-50 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">Common Questions</h2>
          <div className="space-y-4">
            {localFaqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-slate-200 bg-white p-6">
                <summary className="cursor-pointer list-none font-bold text-slate-900">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section id="testimonials" className="bg-white px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-slate-900">Trusted Near {model.cityName}</h2>
          <div className="grid gap-8 text-left md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.quote} className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`${item.company}-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 italic text-slate-700">"{item.quote}"</p>
                <div className="font-bold text-slate-900">{item.role}</div>
                <div className="text-sm text-slate-500">{item.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. EXPLORE MORE */}
      <section id="explore-more" className="border-t bg-slate-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Explore More in {model.cityName}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {exploreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-400"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{item.label}</span>
                  <ArrowRight className="h-5 w-5 text-indigo-600 transition group-hover:translate-x-1" />
                </div>
                <p className="text-sm text-slate-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
