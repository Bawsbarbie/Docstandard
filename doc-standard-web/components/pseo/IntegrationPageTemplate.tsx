/**
 * IntegrationPageTemplate.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared integration page component used by all verticals:
 *   /logistics/integration/[slug]   (existing — adapts to this template)
 *   /accountants/integration/[slug]
 *   /real-estate/integration/[slug]
 *   /warehousing/integration/[slug]
 *
 * Accepts a `VerticalIntegrationModel` from vertical-integration-factory
 * (new verticals) or a compatible adapter from integration-factory (logistics).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import Link from "next/link"
import { RiskSection } from "@/components/pseo/RiskSection"
import { PainSection } from "@/components/pseo/PainSection"
import { TechnicalGuide } from "@/components/pseo/TechnicalGuide"
import { TechnicalProcess } from "@/components/pseo/TechnicalProcess"
import { ROISection } from "@/components/pseo/ROISection"
import { BenefitsGrid } from "@/components/pseo/BenefitsGrid"
import { FAQSection } from "@/components/pseo/FAQSection"
import { TestimonialsSection } from "@/components/pseo/TestimonialsSection"
import type { VerticalIntegrationModel } from "@/lib/pseo/vertical-integration-factory"
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  serializeSchemas,
  type BreadcrumbItem,
  type FaqItem,
} from "@/lib/pseo/schema"

// ─────────────────────────────────────────────────────────────────────────────
// Vertical accent color maps (Tailwind classes)
// ─────────────────────────────────────────────────────────────────────────────

const ACCENT: Record<string, {
  badge: string
  ctaBg: string
  ctaText: string
  ctaHover: string
  ctaBtnBg: string
  ctaBtnText: string
  link: string
  cardHover: string
}> = {
  logistics: {
    badge: "bg-blue-50 border-blue-100 text-blue-700",
    ctaBg: "bg-blue-600",
    ctaText: "text-white",
    ctaHover: "hover:bg-blue-700",
    ctaBtnBg: "bg-white",
    ctaBtnText: "text-blue-700",
    link: "text-blue-600",
    cardHover: "hover:border-blue-300",
  },
  accountants: {
    badge: "bg-emerald-50 border-emerald-100 text-emerald-700",
    ctaBg: "bg-emerald-600",
    ctaText: "text-white",
    ctaHover: "hover:bg-emerald-700",
    ctaBtnBg: "bg-white",
    ctaBtnText: "text-emerald-700",
    link: "text-emerald-600",
    cardHover: "hover:border-emerald-300",
  },
  "real-estate": {
    badge: "bg-amber-50 border-amber-100 text-amber-700",
    ctaBg: "bg-amber-600",
    ctaText: "text-white",
    ctaHover: "hover:bg-amber-700",
    ctaBtnBg: "bg-white",
    ctaBtnText: "text-amber-700",
    link: "text-amber-600",
    cardHover: "hover:border-amber-300",
  },
  warehousing: {
    badge: "bg-slate-100 border-slate-200 text-slate-700",
    ctaBg: "bg-slate-800",
    ctaText: "text-white",
    ctaHover: "hover:bg-slate-900",
    ctaBtnBg: "bg-white",
    ctaBtnText: "text-slate-800",
    link: "text-slate-700",
    cardHover: "hover:border-slate-400",
  },
}

const DEFAULT_ACCENT = ACCENT.logistics

// ─────────────────────────────────────────────────────────────────────────────
// Industry-specific testimonials
// ─────────────────────────────────────────────────────────────────────────────

function getTestimonials(vertical: string, src: string, dst: string) {
  const map: Record<string, Array<{ quote: string; author: string; role: string; company: string }>> = {
    accountants: [
      {
        quote: `DocStandard mapped our ${src} exports to ${dst} correctly on the first pass. No manual COA cleanup, no back-and-forth. We closed three days faster at month end.`,
        author: "Sarah Chen",
        role: "Senior Manager",
        company: "Chen & Partners CPA",
      },
      {
        quote: `We process 200+ client files per month. Before DocStandard, half of each Monday was spent fixing import errors from ${src} into ${dst}. That time is gone now.`,
        author: "Marcus Webb",
        role: "Director of Operations",
        company: "Apex Accounting Group",
      },
      {
        quote: `The audit trail built into every batch means our QA step is just a sign-off, not an investigation. ${src} to ${dst} now takes hours, not days.`,
        author: "Linda Torres",
        role: "Controller",
        company: "Meridian Tax & Advisory",
      },
    ],
    "real-estate": [
      {
        quote: `Our rent roll used to take two days to normalize from ${src} into ${dst}. DocStandard does it overnight. Owner distributions now go out two days earlier every month.`,
        author: "James Kwon",
        role: "VP of Operations",
        company: "Keystone Property Management",
      },
      {
        quote: `Lease extraction from ${src} PDFs used to be a manual bottleneck. DocStandard delivers clean, structured data ready for ${dst} import. The team spends that time on leasing, not data entry.`,
        author: "Priya Patel",
        role: "Portfolio Accountant",
        company: "Urban Realty Partners",
      },
      {
        quote: `We manage 42 properties across four states. Getting consistent data from ${src} into ${dst} used to be our biggest ops challenge. DocStandard solved it without custom development.`,
        author: "Tom Gallagher",
        role: "CFO",
        company: "Landmark Commercial Group",
      },
    ],
    warehousing: [
      {
        quote: `${src} to ${dst} normalization used to eat 20+ hours a week across our ops team. DocStandard cut that to under 2 hours of review. Inventory accuracy improved immediately.`,
        author: "Kevin Park",
        role: "Operations Manager",
        company: "Pacific 3PL Solutions",
      },
      {
        quote: `SKU normalization between ${src} and ${dst} was a constant source of inventory variance. DocStandard mapped 8,000 SKUs in the first batch and we haven't had a mismatch since.`,
        author: "Dana Ross",
        role: "Inventory Director",
        company: "Velocity Fulfillment",
      },
      {
        quote: `Our WMS data from ${src} is now in ${dst} within hours, clean and reconciled. Month-end close dropped from 5 days to 2. The upstream data quality change is that significant.`,
        author: "Chris Ono",
        role: "Systems Manager",
        company: "Atlas Distribution",
      },
    ],
  }

  return (
    map[vertical] ?? [
      {
        quote: `DocStandard mapped our ${src} fields to ${dst} correctly on the first pass. No back-and-forth, no rework.`,
        author: "Jordan Miles",
        role: "Operations Lead",
        company: "DocStandard Client",
      },
    ]
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  model: VerticalIntegrationModel
  /** Additional breadcrumb items injected by the page (after Home). */
  breadcrumbs?: BreadcrumbItem[]
}

export function IntegrationPageTemplate({ model, breadcrumbs }: Props) {
  const accent = ACCENT[model.vertical] ?? DEFAULT_ACCENT
  const testimonials = getTestimonials(model.vertical, model.sourceSystem, model.destinationSystem)
  const faqs: FaqItem[] = model.faqs.map((f) => ({ question: f.question, answer: f.answer }))

  const fieldTableHtml = `
    <table>
      <thead>
        <tr>
          <th>Source Field (${model.sourceSystem})</th>
          <th>Target Field (${model.destinationSystem})</th>
          <th>Transformation</th>
        </tr>
      </thead>
      <tbody>
        ${model.fieldMappingRows
          .map(
            (row) =>
              `<tr><td>${row.source}</td><td>${row.destination}</td><td>${row.transformation}</td></tr>`
          )
          .join("")}
      </tbody>
    </table>
  `

  return (
    <main className="min-h-screen bg-white leading-relaxed">
      {/* ── Breadcrumb ── */}
      <nav
        className="max-w-7xl mx-auto px-4 pt-4 pb-1 text-sm text-slate-500"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
          </li>
          <li aria-hidden="true" className="mx-1">›</li>
          <li>
            <Link href={model.verticalHubUrl} className="hover:text-slate-900 capitalize">
              {model.verticalName}
            </Link>
          </li>
          <li aria-hidden="true" className="mx-1">›</li>
          <li>
            <Link href={`/${model.vertical}/integration`} className="hover:text-slate-900">
              Integrations
            </Link>
          </li>
          <li aria-hidden="true" className="mx-1">›</li>
          <li className="text-slate-900 font-medium truncate">
            {model.sourceSystem} to {model.destinationSystem}
          </li>
        </ol>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="pt-10 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          {/* Vertical badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6 ${accent.badge}`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {model.verticalName} Document Processing
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1]">
                {model.h1}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {model.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white shadow-lg transition-all ${accent.ctaBg} ${accent.ctaHover}`}
                >
                  Get Started for $799 →
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right: data card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-mono text-slate-400">normalization_pipeline.json</span>
              </div>
              <div className="space-y-3">
                {/* Before */}
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <div className="text-xs font-medium text-red-700 mb-1">{model.sourceSystem} export</div>
                    <div className="h-1.5 w-28 bg-red-200 rounded" />
                  </div>
                  <span className="text-xs text-red-600 font-medium">Schema Mismatch</span>
                </div>
                {/* Arrow */}
                <div className="text-center text-slate-300 text-lg">↓</div>
                {/* DocStandard */}
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                  <div>
                    <div className="text-xs font-medium text-white mb-1">DocStandard Normalization</div>
                    <div className="h-1.5 w-24 bg-slate-600 rounded" />
                  </div>
                  <span className="text-xs text-slate-300 font-medium">Processing…</span>
                </div>
                {/* Arrow */}
                <div className="text-center text-slate-300 text-lg">↓</div>
                {/* After */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                  <div>
                    <div className="text-xs font-medium text-green-700 mb-1">{model.destinationSystem} ready</div>
                    <div className="h-1.5 w-32 bg-green-200 rounded" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">✓ Validated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. RISK ── */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <RiskSection
            compact
            quote={`"The gap between ${model.sourceSystem} and ${model.destinationSystem} is where ${model.verticalName.toLowerCase()} data quality breaks down."`}
            painPoints={[
              `${model.sourceSystem} exports require manual cleanup before every ${model.destinationSystem} import — a weekly time sink with a compounding error rate.`,
              `Field-level schema mismatches between the two systems lead to import failures that only surface after hours of work.`,
              `Without normalization, every batch risks introducing inconsistencies into your ${model.destinationSystem} records — errors that are expensive to trace and fix.`,
            ]}
          />
        </div>
      </section>

      {/* ── 3. PAIN ── */}
      <section className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <PainSection
            compact
            content={{ id: "friction", text: model.expertAnalysis }}
            painPoints={[
              `Manual data bridging between ${model.sourceSystem} and ${model.destinationSystem} consumes 12–25 hours per week across your team.`,
              `Inconsistent field mapping between systems leads to import errors that compound across every batch, requiring downstream reconciliation.`,
              `Without a normalized pipeline, ${model.destinationSystem} data quality degrades over time — creating audit risk and reporting lag.`,
            ]}
            intentName={`${model.sourceSystem} to ${model.destinationSystem} normalization`}
            vertical={model.vertical}
            kind="integration"
            systemA={model.sourceSystem}
            systemB={model.destinationSystem}
          />
        </div>
      </section>

      {/* ── 4. TECHNICAL GUIDE ── */}
      <section id="how-it-works" className="mt-10 pt-10 pb-2 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalGuide
            integrationGuide={{
              systemA: model.sourceSystem,
              systemB: model.destinationSystem,
              friction: `Manual data normalization between ${model.sourceSystem} and ${model.destinationSystem}`,
              solution: `DocStandard normalizes ${model.sourceSystem} records for audit-ready ${model.destinationSystem} ingestion.`,
              technicalData: fieldTableHtml,
            }}
            systemA={model.sourceSystem}
            systemB={model.destinationSystem}
          />
          <div className="mt-12 max-w-3xl mx-auto text-center pb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Operational Impact
            </h3>
            <p className="text-slate-700 leading-relaxed">{model.operationalImpact}</p>
          </div>
        </div>
      </section>

      {/* ── 5. TECHNICAL PROCESS ── */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <TechnicalProcess
            process={{
              id: "process",
              title: `The DocStandard ${model.verticalName} Process`,
              steps: model.technicalSteps,
            }}
          />
        </div>
      </section>

      {/* ── 6. ROI ── */}
      <ROISection
        manualEffort={model.roi.manualHours}
        withDocStandard="24–72h turnaround"
        withDocStandardNote="500–2,000 files/batch"
        annualSavings={model.roi.savings}
        errorReduction={model.roi.accuracy}
      />

      {/* ── 7. CTA BANNER ── */}
      <section className="my-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`flex flex-col items-start gap-6 rounded-3xl px-8 py-8 md:flex-row md:items-center md:justify-between shadow-xl ${accent.ctaBg}`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {model.verticalName} Data Engineering
              </p>
              <h3 className="mt-3 text-2xl font-semibold md:text-3xl text-white">
                Optimize Your {model.sourceSystem} → {model.destinationSystem} Pipeline
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
                Join {model.verticalName.toLowerCase()} teams using DocStandard to eliminate manual data
                cleanup between their systems.
              </p>
            </div>
            <Link
              href="/login"
              className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold shadow-sm transition whitespace-nowrap ${accent.ctaBtnBg} ${accent.ctaBtnText} hover:opacity-90`}
            >
              Get Started for $799 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. BENEFITS ── */}
      <BenefitsGrid
        benefits={[
          {
            id: "benefit-1",
            text: `Automating your ${model.sourceSystem} to ${model.destinationSystem} workflow eliminates ${model.roi.manualHours} of manual data cleanup every week.`,
          },
          {
            id: "benefit-2",
            text: `Every ${model.sourceSystem} field is normalized to match your ${model.destinationSystem} schema precisely — no manual COA mapping, no format mismatches.`,
          },
          {
            id: "benefit-3",
            text: `DocStandard's Zero-Loss protocol ensures ${model.roi.accuracy} at the record level, with a built-in audit trail for every transformation.`,
          },
        ]}
        isIntegration={true}
      />

      {/* ── 9. FAQ ── */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* ── 10. TESTIMONIALS ── */}
      <section className="pt-4 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <TestimonialsSection testimonials={testimonials} kind="general" />
        </div>
      </section>

      {/* ── 11. INTERLINKING FOOTER ── */}
      <section className="py-16 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Related Integrations</h2>
          <p className="text-slate-600 mb-8">
            Other {model.verticalName.toLowerCase()} document bridges commonly used alongside this integration.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {model.relatedLinks.filter((l) => l.href !== `/${model.vertical}/integration`).map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`group p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all ${accent.cardHover}`}
              >
                <h3 className={`font-bold text-slate-900 mb-2 transition-colors group-hover:${accent.link.replace("text-", "text-")}`}>
                  {link.label}
                </h3>
                <p className="text-sm text-slate-600">
                  Field mapping guide and normalization documentation for {model.verticalName.toLowerCase()}.
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-sm">
            <Link href={`/${model.vertical}/integration`} className={`${accent.link} hover:underline font-medium`}>
              ← All {model.verticalName} Integrations
            </Link>
            <Link href={model.verticalHubUrl} className={`${accent.link} hover:underline font-medium`}>
              {model.verticalName} Hub
            </Link>
            <Link href="/comparison" className={`${accent.link} hover:underline font-medium`}>
              Compare Platforms
            </Link>
          </div>
        </div>
      </section>

      {/* ── JSON-LD (@graph bundles Service + BreadcrumbList + FAQPage) ── */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: serializeSchemas([
            buildServiceSchema({
              name: model.h1,
              description: model.description,
              url: model.canonicalUrl,
            }),
            buildBreadcrumbSchema(
              breadcrumbs ?? [
                { name: "Home", url: "https://docstandard.co" },
                { name: model.verticalName, url: `https://docstandard.co/${model.vertical}` },
                { name: `${model.sourceSystem} to ${model.destinationSystem}`, url: model.canonicalUrl },
              ]
            ),
            ...(faqs.length > 0 ? [buildFaqSchema(faqs.slice(0, 8))] : []),
          ]),
        }}
      />
    </main>
  )
}
