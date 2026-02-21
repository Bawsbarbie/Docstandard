/**
 * VerticalHubTemplate.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared hub page layout for accountants / real-estate / warehousing verticals.
 * Each hub is the top of the hub-and-spoke structure for that vertical.
 *
 * Sections:
 *   1. Hero + tagline
 *   2. Top integration links grid (spoke links)
 *   3. Document types grid
 *   4. Cross-vertical footer links
 * ─────────────────────────────────────────────────────────────────────────────
 */
import Link from "next/link"
import {
  buildHubIntegrationLinks,
  CROSS_VERTICAL_LINKS,
} from "@/lib/pseo/internal-links"
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
  buildWebPageSchema,
  serializeSchemas,
} from "@/lib/pseo/schema"

interface System {
  slug: string
  name: string
}

interface Document {
  slug: string
  name: string
  abbr?: string
}

interface VerticalHubConfig {
  id: string
  name: string
  hubTitle: string
  hubDescription: string
  canonical: string
  /** Tailwind accent color token — e.g. "emerald", "amber", "slate" */
  color: string
  industries: string[]
  sources: System[]
  destinations: System[]
  documents: Document[]
}

const COLOR_MAP: Record<string, { badge: string; btn: string; link: string; border: string }> = {
  emerald: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    link: "text-emerald-600 hover:text-emerald-800",
    border: "border-emerald-200 hover:border-emerald-400",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    btn: "bg-amber-600 hover:bg-amber-700 text-white",
    link: "text-amber-600 hover:text-amber-800",
    border: "border-amber-200 hover:border-amber-400",
  },
  slate: {
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    btn: "bg-slate-800 hover:bg-slate-900 text-white",
    link: "text-slate-700 hover:text-slate-900",
    border: "border-slate-200 hover:border-slate-400",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    btn: "bg-blue-600 hover:bg-blue-700 text-white",
    link: "text-blue-600 hover:text-blue-800",
    border: "border-blue-200 hover:border-blue-400",
  },
}

const DEFAULT_COLOR = COLOR_MAP.slate

export function VerticalHubTemplate({ config }: { config: VerticalHubConfig }) {
  const c = COLOR_MAP[config.color] ?? DEFAULT_COLOR
  const integrationLinks = buildHubIntegrationLinks(
    config.id,
    config.name,
    config.sources,
    config.destinations,
    8,
  )

  const schemaJson = serializeSchemas([
    buildWebPageSchema({
      name: config.hubTitle,
      description: config.hubDescription,
      url: config.canonical,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "https://docstandard.co" },
      { name: config.name, url: config.canonical },
    ]),
    buildOrganizationSchema(),
  ])

  return (
    <div className="bg-white text-slate-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden py-20 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <nav className="mb-6 text-sm text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{config.name}</span>
          </nav>
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border mb-4 ${c.badge}`}>
            {config.name} Document Processing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {config.hubTitle}
          </h1>
          <p className="text-lg text-white/75 max-w-3xl mb-8">
            {config.hubDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${config.id}/integration`}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${c.btn}`}
            >
              View All Integrations →
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white/10 text-white border border-white/30 hover:bg-white/20 transition"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {config.industries.map((ind) => (
              <span
                key={ind}
                className="text-xs text-white/60 border border-white/20 rounded-full px-3 py-1"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. TOP INTEGRATIONS GRID ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Popular {config.name} Integrations
          </h2>
          <p className="text-slate-600">
            Most-requested document normalization pipelines for {config.name.toLowerCase()} teams.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition-all ${c.border}`}
            >
              <h3 className={`font-semibold mb-1 transition-colors group-hover:${c.link.split(" ")[0]}`}>
                {link.label}
              </h3>
              <p className="text-sm text-slate-500 leading-snug">{link.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={`/${config.id}/integration`}
            className={`inline-flex items-center gap-1 font-semibold ${c.link}`}
          >
            View all {config.name.toLowerCase()} integrations →
          </Link>
        </div>
      </section>

      {/* ── 3. DOCUMENT TYPES ── */}
      <section className="bg-slate-50 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Document Types Processed</h2>
          <p className="text-slate-600 mb-8">
            Every document type common to {config.name.toLowerCase()} operations, normalised for
            system import.
          </p>
          <div className="flex flex-wrap gap-3">
            {config.documents.map((doc) => (
              <span
                key={doc.slug}
                className="inline-block px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm"
              >
                {doc.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CROSS-VERTICAL FOOTER ── */}
      <section className="py-14 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Other Verticals</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CROSS_VERTICAL_LINKS.filter((l) => l.href !== `/${config.id}`).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-all hover:border-slate-300"
              >
                <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {link.label}
                </p>
                <p className="text-sm text-slate-500">{link.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/comparison" className="text-blue-600 hover:underline font-medium">
              Compare Platforms
            </Link>
            <Link href="/blog" className="text-blue-600 hover:underline font-medium">
              DocStandard Blog
            </Link>
            <Link href="/services" className="text-blue-600 hover:underline font-medium">
              All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
