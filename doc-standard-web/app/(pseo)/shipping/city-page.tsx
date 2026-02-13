import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { 
  ArrowRight, 
  Ship,
  Anchor,
  Globe,
  Container,
  AlertTriangle,
  Clock,
  TrendingDown,
  FileText,
  BarChart3,
  Database,
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  MapPin
} from "lucide-react"

interface PageProps {
  params: {
    city: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cityData = getCityBySlug(params.city)
  if (!cityData) return { title: "Not Found" }

  return {
    title: `Shipping Document Processing in ${cityData.name} | DocStandard`,
    description: `Streamline ocean freight and shipping document processing in ${cityData.name}. Automate bills of lading, manifests, and customs documentation for faster port clearance.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function ShippingCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country, region, majorPorts = [], airports = [] } = cityData

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-400 mb-4">{cityName} Maritime Operations</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Shipping Document Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            Transform ocean bills of lading, shipping manifests, and port documentation 
            into structured data for your {cityName} freight operations. Eliminate demurrage 
            delays and accelerate vessel turnaround.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
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
                Port Delay Risk
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Documentation Errors Cost You Port Access
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                In {cityName}'s busy port environment, incomplete or inaccurate shipping 
                documents trigger customs holds, demurrage fees, and missed vessel connections. 
                Every hour of delay multiplies costs.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$2-5K</div>
                  <p className="text-slate-400 text-sm">Daily demurrage per container</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">48-72 hrs</div>
                  <p className="text-slate-400 text-sm">Average customs hold time</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">35%</div>
                  <p className="text-slate-400 text-sm">Of BOLs have discrepancies</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$15K+</div>
                  <p className="text-slate-400 text-sm">Per vessel delay penalty</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  Common Shipping Document Failures
                </h3>
                <div className="space-y-4">
                  {[
                    "Container weight mismatch flagged by VGM rules",
                    "HS code errors trigger customs inspection",
                    "Shipper/consignee name discrepancies",
                    "Missing or incorrect cargo descriptions",
                    "Late document submission misses vessel cutoff"
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
              The Maritime Documentation Challenge
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {cityName} shipping teams battle document complexity that slows cargo movement
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Document Chaos</h3>
              <p className="text-slate-600">
                Ocean B/L, packing lists, certificates of origin, and customs declarations 
                pile up. Each uses different formats, yet all must align perfectly for clearance.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cutoff Pressure</h3>
              <p className="text-slate-600">
                Vessel cutoffs don't wait for document corrections. Missing a sailing 
                means inventory shortages, expedited freight costs, and angry customers.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visibility Blackouts</h3>
              <p className="text-slate-600">
                When shipping docs aren't digitized, you can't track cargo status, 
                predict arrivals, or proactively manage exceptions before they become crises.
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
              Master Mapping Blueprint
            </h2>
            <p className="text-slate-600 text-lg">
              How DocStandard extracts and validates shipping document fields for {cityName} port operations
            </p>
          </div>
          <div className="bg-slate-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-950 p-4 text-sm font-semibold text-slate-400 border-b border-slate-800">
              <div>Source Field</div>
              <div>Document Location</div>
              <div>Validation Rule</div>
              <div>Output Format</div>
            </div>
            {[
              ["B/L Number", "Top-right corner", "SCAC + 8-12 digits", "String, validated"],
              ["Vessel Name", "Vessel block", "IMO vessel database match", "Verified vessel ID"],
              ["Voyage Number", "Voyage field", "Alphanumeric, 4-8 chars", "String"],
              ["Port of Loading", "POL field", "Valid UN/LOCODE", "Port code"],
              ["Port of Discharge", "POD field", "Valid UN/LOCODE", "{cityName} port code"],
              ["Container Number", "Equipment section", "ISO 6346 checksum", "Validated container ID"],
              ["Seal Number", "Seal field", "Alphanumeric", "String"],
              ["Cargo Weight", "Weight block", "Numeric, VGM compliant", "KG, verified against VGM"],
              ["HS Code", "Cargo description", "Valid harmonized code", "6-10 digit code"],
              ["Shipper Reference", "Ref field", "Max 35 characters", "Normalized string"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-4 text-sm border-b border-slate-800 hover:bg-slate-800/50">
                <div className="text-blue-400 font-medium">{row[0]}</div>
                <div className="text-slate-300">{row[1]}</div>
                <div className="text-slate-400">{row[2]}</div>
                <div className="text-slate-300">{row[3]}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Ocean B/L Support</h4>
              <p className="text-sm text-slate-600">Original, surrender, and telex release bills. Handles straight, order, and bearer B/L formats from all major carriers.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">VGM Integration</h4>
              <p className="text-sm text-slate-600">Validates container weights against SOLAS VGM requirements. Flags discrepancies before port submission.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Manifest Reconciliation</h4>
              <p className="text-sm text-slate-600">Cross-reference house bills against master bills. Identify missing documents before vessel arrival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL PROCESS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The DocStandard Engine
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              From document receipt to port submission — automated shipping document pipeline
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { 
                  num: "01", 
                  title: "Document Capture", 
                  desc: "Receive ocean B/Ls, manifests, and shipping instructions via EDI, email, or portal upload. OCR handles scanned originals, low-quality faxes, and mobile photos.",
                  icon: FileText
                },
                { 
                  num: "02", 
                  title: "Field Extraction", 
                  desc: "AI identifies document type and extracts 50+ data fields — vessel, voyage, containers, cargo details, parties, and routing. No templates to maintain.",
                  icon: Database
                },
                { 
                  num: "03", 
                  title: "Port Compliance Check", 
                  desc: "Validate against port requirements for {cityName}. Check container numbers via ISO 6346 algorithm, verify VGM weights, confirm HS codes.",
                  icon: Shield
                },
                { 
                  num: "04", 
                  title: "Submission & Tracking", 
                  desc: "Submit to port community systems, customs platforms, and carrier portals. Track submission status and receive automated confirmation receipts.",
                  icon: Globe
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-1">STEP {step.num}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl" />
              <div className="relative bg-slate-900 p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Ship className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Shipping Dashboard</div>
                      <div className="text-slate-400 text-sm">{cityName} Port</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Active</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Documents Today</span>
                    <span className="text-white font-medium">156 processed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Processing Time</span>
                    <span className="text-white font-medium">4.2 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Port Submission Rate</span>
                    <span className="text-white font-medium">99.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Demurrage Avoided</span>
                    <span className="text-white font-medium">$48K this month</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">8</div>
                      <div className="text-xs text-slate-400">Pending</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-400">142</div>
                      <div className="text-xs text-slate-400">Submitted</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-400">6</div>
                      <div className="text-xs text-slate-400">Review</div>
                    </div>
                  </div>
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
              Operational Impact
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real savings for {cityName} shipping operations handling 200+ B/Ls monthly
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4-8 hrs</div>
              <p className="text-slate-400 text-sm mb-2">Manual B/L processing</p>
              <div className="text-red-400 text-sm">Per vessel call</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">25 min</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">90% faster</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$240K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-blue-400 text-sm">Labor + demurrage</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">Zero</div>
              <p className="text-slate-400 text-sm mb-2">Missed cutoffs</p>
              <div className="text-purple-400 text-sm">Last 6 months</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Built for {cityName} Maritime Operations
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Ship className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Carrier Connectivity</h3>
              <p className="text-slate-600">
                Direct integrations with MSC, Maersk, CMA CGM, COSCO, and regional carriers 
                serving {cityName}. Pull sailing schedules and container status automatically.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Container className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Container Tracking</h3>
              <p className="text-slate-600">
                Monitor container movements from origin through {cityName} to final destination. 
                Automated alerts for delays, customs holds, and availability.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Anchor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Port Compliance</h3>
              <p className="text-slate-600">
                Pre-validated submissions for {cityName} port community systems. Ensure 
                documents meet local requirements before submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
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
                q: `Can you handle B/Ls for ${cityName} port operations?`,
                a: `Yes. We process ocean bills of lading from all major carriers serving ${cityName}, including telex release, express release, and original document formats. Extracted data submits directly to ${cityName} port community systems.`
              },
              {
                q: "How do you ensure VGM compliance?",
                a: "We validate container weights against SOLAS VGM requirements during extraction. Discrepancies between B/L declared weights and VGM submissions are flagged before port filing."
              },
              {
                q: "Can you process house B/Ls and master B/Ls?",
                a: "Absolutely. We handle both NVOCC house bills and carrier master bills, reconciling cargo manifests to ensure all containers are accounted for and documented correctly."
              },
              {
                q: "What about customs documentation integration?",
                a: "Extracted shipping data flows to customs declaration systems for import/export filings. HS codes, cargo descriptions, and values are normalized for customs submission."
              },
              {
                q: "How quickly can we process documents before vessel cutoff?",
                a: "Most B/Ls process in 2-4 minutes. During peak periods, our system scales automatically to handle surges, ensuring you never miss a vessel cutoff due to document delays."
              },
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
              What Shipping Teams Say
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
                "We eliminated missed vessel cutoffs entirely. What used to take our team 
                6 hours now happens automatically while we focus on customer service."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Shipping Manager</div>
                <div className="text-sm text-slate-500">NVOCC, {region}</div>
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
                "Demurrage costs dropped 80% in the first quarter. The system catches 
                document errors before they become port delays."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Operations Director</div>
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
                "During peak season we process 500+ B/Ls weekly with the same team. 
                Without DocStandard, we'd need 3x the staff."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Documentation Manager</div>
                <div className="text-sm text-slate-500">Ocean Carrier Agency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Accelerate {cityName} Shipping?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join freight forwarders and NVOCCs processing thousands of B/Ls with 99%+ accuracy. 
            Get your first vessel documents processed before the next sailing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
            </Link>
          </div>
          {majorPorts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">
                Serving shipping operations at {majorPorts.join(", ")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
