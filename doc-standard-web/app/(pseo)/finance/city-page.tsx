import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCityBySlug } from "@/lib/pseo/city-data"
import { 
  ArrowRight, 
  DollarSign,
  Receipt,
  Calculator,
  AlertTriangle,
  Clock,
  TrendingDown,
  FileText,
  BarChart3,
  Database,
  Shield,
  Zap,
  CheckCircle,
  Wallet
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
    title: `Freight Bill Processing in ${cityData.name} | DocStandard`,
    description: `Automate freight bill auditing and payment processing in ${cityData.name}. Catch billing errors, validate carrier charges, and streamline AP workflows with 99%+ accuracy.`,
  }
}

export async function generateStaticParams() {
  const { cities } = await import("@/lib/pseo/city-data")
  return cities.map((city) => ({ city: city.slug }))
}

export default async function FinanceCityPage({ params }: PageProps) {
  const cityData = getCityBySlug(params.city)
  if (!cityData) notFound()

  const { name: cityName, country, region } = cityData

  return (
    <div className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-6 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400 mb-4">{cityName} Finance Operations</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Freight Bill Processing in {cityName}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            Transform freight invoices, carrier bills, and payment documents into structured, 
            audit-ready data. Catch billing errors, validate charges against contracts, and 
            accelerate accounts payable workflows for your {cityName} operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/upload" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/50">
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
                Revenue Leakage Alert
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Carrier Billing Errors Are Eating Your Margins
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Freight carriers make mistakes — lots of them. Without systematic auditing, 
                {cityName} shippers overpay by 5-15% annually. Duplicate invoices, wrong rates, 
                and phantom charges slip through manual processes every day.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">12-18%</div>
                  <p className="text-slate-400 text-sm">Of freight bills contain errors</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">$850</div>
                  <p className="text-slate-400 text-sm">Average overpayment per invoice</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">45 days</div>
                  <p className="text-slate-400 text-sm">Average to identify billing errors</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                  <div className="text-4xl font-bold text-red-400 mb-2">23%</div>
                  <p className="text-slate-400 text-sm">Duplicate invoice rate</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  Common Billing Errors We Catch
                </h3>
                <div className="space-y-4">
                  {[
                    "Duplicate invoice submitted 2 weeks apart",
                    "Wrong freight class applied (higher rate)",
                    "Accessorial charge without approval code",
                    "Fuel surcharge calculated on wrong base rate",
                    "Weight bumped up to next bracket (+$340)",
                    "Discount percentage incorrectly applied"
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
              The Freight Payment Problem
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {cityName} finance teams struggle with carrier invoices that resist automation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Invoice Chaos</h3>
              <p className="text-slate-600">
                Every carrier uses different invoice formats. Some PDF, some paper, some EDI. 
                Extracting consistent data for audit and payment creates endless manual work.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rate Verification</h3>
              <p className="text-slate-600">
                Contract rates span hundreds of lanes, weight breaks, and accessorials. 
                Manually checking each charge against agreements is impossibly slow.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visibility Gaps</h3>
              <p className="text-slate-600">
                Without digitized invoice data, you can't analyze spend patterns, identify 
                problematic carriers, or negotiate better rates based on actual volume.
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
              How DocStandard extracts and validates freight bill fields for {cityName} payment operations
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
              ["Invoice Number", "Header", "Unique, 6-20 alphanumeric", "String"],
              ["Carrier SCAC", "Carrier block", "Valid 4-letter SCAC code", "Validated SCAC"],
              ["Pro Number", "Shipment ref", "Numeric or alphanumeric", "String"],
              ["BOL Reference", "Reference field", "Match against shipment BOL", "Cross-referenced ID"],
              ["Ship Date", "Date field", "Valid date, not future", "ISO date"],
              ["Origin", "Route origin", "City/state match", "Normalized location"],
              ["Destination", "Route destination", "City/state match", "{cityName} area validated"],
              ["Freight Charges", "Line items", "Numeric, positive", "Decimal(10,2)"],
              ["Fuel Surcharge", "Accessorials", "% or flat rate valid", "Calculated vs expected"],
              ["Total Amount", "Invoice total", "Sum of line items match", "Decimal(10,2), verified"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 p-4 text-sm border-b border-slate-800 hover:bg-slate-800/50">
                <div className="text-emerald-400 font-medium">{row[0]}</div>
                <div className="text-slate-300">{row[1]}</div>
                <div className="text-slate-400">{row[2]}</div>
                <div className="text-slate-300">{row[3]}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Contract Rate Matching</h4>
              <p className="text-sm text-slate-600">Extracted charges automatically compared against your contracted rates, fuel indices, and accessorial agreements.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">Duplicate Detection</h4>
              <p className="text-sm text-slate-600">AI identifies duplicate submissions by invoice number, pro number, BOL reference, and shipment characteristics.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">GL Coding Automation</h4>
              <p className="text-sm text-slate-600">Automatically assign general ledger codes based on carrier, lane, commodity, and cost center rules.</p>
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
              From invoice receipt to payment approval — automated freight bill auditing pipeline
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { 
                  num: "01", 
                  title: "Invoice Ingestion", 
                  desc: "Receive freight bills via EDI, email, portal, or mailroom scan. OCR handles paper invoices, PDFs, and image files regardless of carrier format.",
                  icon: FileText
                },
                { 
                  num: "02", 
                  title: "Data Extraction", 
                  desc: "AI identifies invoice type and extracts 40+ data fields — charges, references, dates, lanes, and shipment details. No template configuration needed.",
                  icon: Database
                },
                { 
                  num: "03", 
                  title: "Audit & Validation", 
                  desc: "Check against rate contracts, flag duplicates, validate math, verify fuel calculations, and confirm accessorial approvals. Exceptions route to specialists.",
                  icon: Shield
                },
                { 
                  num: "04", 
                  title: "Payment Integration", 
                  desc: "Approved invoices flow to your ERP/AP system with GL coding. Generate payment files, accrual reports, and carrier remittance advices.",
                  icon: Wallet
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-600 mb-1">STEP {step.num}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl" />
              <div className="relative bg-slate-900 p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Freight Audit Dashboard</div>
                      <div className="text-slate-400 text-sm">{cityName} Operations</div>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">Active</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Invoices Today</span>
                    <span className="text-white font-medium">89 processed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Errors Caught</span>
                    <span className="text-white font-medium">12 ($8,450)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duplicates Blocked</span>
                    <span className="text-white font-medium">3 ($2,890)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Processing Time</span>
                    <span className="text-white font-medium">6.2 minutes</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-400">74</div>
                      <div className="text-xs text-slate-400">Approved</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-yellow-400">12</div>
                      <div className="text-xs text-slate-400">Exception</div>
                    </div>
                    <div className="flex-1 bg-slate-800 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-400">3</div>
                      <div className="text-xs text-slate-400">Rejected</div>
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
              Real savings for {cityName} finance operations processing 500+ freight bills monthly
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">8-15%</div>
              <p className="text-slate-400 text-sm mb-2">Overpayment rate</p>
              <div className="text-red-400 text-sm">Without automation</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">0.3%</div>
              <p className="text-slate-400 text-sm mb-2">With DocStandard</p>
              <div className="text-green-400 text-sm">97% improvement</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">$320K</div>
              <p className="text-slate-400 text-sm mb-2">Annual savings</p>
              <div className="text-emerald-400 text-sm">Errors + labor</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">4x</div>
              <p className="text-slate-400 text-sm mb-2">Faster processing</p>
              <div className="text-purple-400 text-sm">Same headcount</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why {cityName} Finance Teams Choose DocStandard
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Receipt className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Carrier Coverage</h3>
              <p className="text-slate-600">
                Process invoices from all major LTL, truckload, and parcel carriers. 
                We handle their unique formats, rules, and billing quirks automatically.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rate Contract Management</h3>
              <p className="text-slate-600">
                Upload your carrier agreements and let AI verify every charge against 
                contracted rates, minimums, discounts, and fuel surcharge tables.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Spend Analytics</h3>
              <p className="text-slate-600">
                Turn invoice data into actionable insights. Identify cost per lane, 
                carrier performance trends, and opportunities for freight consolidation.
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
                q: `Can you process invoices from carriers serving ${cityName}?`,
                a: `Yes. We handle invoices from all major national and regional carriers operating in ${cityName} and ${country}. This includes LTL, truckload, parcel, and specialized freight carriers.`
              },
              {
                q: "How do you handle rate contract validation?",
                a: "Upload your carrier agreements in any format. Our system extracts rate tables, discounts, fuel surcharge rules, and accessorial pricing. Every invoice charge is automatically checked against these contracts."
              },
              {
                q: "Can you detect duplicate invoices?",
                a: "Absolutely. We identify duplicates by invoice number, pro number, BOL reference, shipment date, and amount combinations. Even subtle duplicates with slight variations get flagged for review."
              },
              {
                q: "Does this integrate with our ERP system?",
                a: "We integrate with SAP, Oracle, NetSuite, Microsoft Dynamics, and custom ERP systems. Processed invoices flow with GL coding, cost center allocation, and approval workflows already applied."
              },
              {
                q: "What about fuel surcharge verification?",
                a: "We validate fuel surcharges against DOE indices or your carrier-specific fuel tables. Incorrect calculations are flagged instantly — no more overpaying on fuel adjustments."
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
              What Finance Teams Say
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
                "We caught $47,000 in duplicate invoices in the first month. The system 
                pays for itself just in error detection, never mind the time savings."
              </p>
              <div>
                <div className="font-semibold text-slate-900">CFO</div>
                <div className="text-sm text-slate-500">Mid-size Shipper, {region}</div>
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
                "Our AP team was drowning in freight invoices. Now they handle 3x the volume 
                with the same headcount and actually catch errors before payment."
              </p>
              <div>
                <div className="font-semibold text-slate-900">Controller</div>
                <div className="text-sm text-slate-500">3PL Provider, {country}</div>
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
                "We finally have visibility into freight spend by lane, carrier, and month. 
                Used that data to negotiate better rates and saved 12% on transportation."
              </p>
              <div>
                <div className="font-semibold text-slate-900">VP Finance</div>
                <div className="text-sm text-slate-500">Distribution Company</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stop Overpaying on Freight
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join shippers recovering 8-15% on freight spend through automated auditing. 
            Get your first batch of invoices processed and start catching errors today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/upload" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/50">
              Start Processing <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/integration" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition">
              View Integrations
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
