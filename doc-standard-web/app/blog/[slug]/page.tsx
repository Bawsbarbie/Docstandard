import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"

interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  readingTime: string
  sections: Array<{
    heading: string
    body: string[]
  }>
  diagram?: {
    title: string
    caption: string
  }
  relatedLinks: Array<{ label: string; href: string }>
}

const posts: BlogPost[] = [
  {
    slug: "cargowise-xml-labyrinth-field-errors-sap-ingestion-2026",
    title: "The CargoWise XML Labyrinth: 5 Field Errors that Break SAP Ingestion (2026)",
    description:
      "Five recurring XML mapping failures that derail SAP ingestion and how we resolve each during normalization.",
    publishedAt: "2026-02-04",
    readingTime: "8 min read",
    sections: [
      {
        heading: "Field-level reality, not theory",
        body: [
          "I have watched otherwise solid integrations fail because one field violates a rigid SAP schema. CargoWise exports carry nested structures that look correct to operators but fail SAP validation.",
          "The fastest way to reduce breakage is to build deterministic normalization rules that convert every export into a single, predictable payload.",
        ],
      },
      {
        heading: "Five errors that repeatedly break ingestion",
        body: [
          "1) Multi-currency rounding mismatches at the line-item level.",
          "2) Unit-of-measure drift between CargoWise and SAP master data.",
          "3) Invalid date formats in nested XML nodes.",
          "4) Duplicate shipment references that violate uniqueness constraints.",
          "5) Character encoding conflicts in memo fields.",
        ],
      },
      {
        heading: "How we normalize them",
        body: [
          "We enforce currency ISO 4217 codes, align UOM values to SAP master data, and normalize all date fields to YYYY-MM-DD.",
          "We also consolidate duplicates and clean memo fields before the export ever hits SAP.",
        ],
      },
    ],
    diagram: {
      title: "Normalization Flow",
      caption: "CargoWise XML → deterministic normalization → SAP ingestion-ready payload.",
    },
    relatedLinks: [
      { label: "CargoWise → NetSuite Integration", href: "/integration/cargowise-to-netsuite-data-bridge" },
      { label: "Clean Logistics Data for SAP S/4HANA", href: "/integration/clean-logistics-data-for-sap-s4hana" },
    ],
  },
  {
    slug: "standardizing-1000-documents-50m-ap-ledger",
    title: "Standardizing 1,000 Logical Documents: Lessons from Normalizing a $50M AP Ledger",
    description:
      "What actually breaks at scale when normalizing AP documentation, and how to keep the ledger audit-ready.",
    publishedAt: "2026-02-04",
    readingTime: "7 min read",
    sections: [
      {
        heading: "Scale reveals hidden failure points",
        body: [
          "At 1,000 documents per batch, the errors are never obvious. They hide in duplicate vendor records, drifting currency conversions, and missing PO references.",
          "Normalization must be deterministic. Otherwise the ledger closes, but the audit fails.",
        ],
      },
      {
        heading: "Three checks we never skip",
        body: [
          "1) Line-item reconciliation against header totals.",
          "2) Currency validation against the ERP spot rate.",
          "3) Vendor master consistency checks before GL coding.",
        ],
      },
    ],
    diagram: {
      title: "AP Ledger Integrity Loop",
      caption: "Capture → validate → reconcile → publish. Every batch follows the same loop.",
    },
    relatedLinks: [
      { label: "Freight Bill Audit Data Preparation", href: "/finance/freight-bill-audit-data-preparation" },
      { label: "Commercial Invoice Data Digitization", href: "/invoice/commercial-invoice-data-digitization" },
    ],
  },
  {
    slug: "ocr-only-10-percent-solution-deterministic-normalization",
    title: "Why OCR Is Only 10% of the Solution: The Case for Deterministic Document Normalization",
    description:
      "OCR is capture. Normalization is trust. Here is the difference and why it matters for downstream systems.",
    publishedAt: "2026-02-04",
    readingTime: "6 min read",
    sections: [
      {
        heading: "OCR is capture, not compliance",
        body: [
          "OCR extracts text. It does not guarantee that the data aligns with operational or compliance rules.",
          "Deterministic normalization applies repeatable rules to every batch so the output is audit-ready.",
        ],
      },
      {
        heading: "What deterministic actually means",
        body: [
          "We convert every incoming document into a standard schema, validate each field, and reject anything that fails validation.",
          "That is why integration payloads survive real-world ERP ingestion.",
        ],
      },
    ],
    diagram: {
      title: "OCR vs Normalization",
      caption: "Capture text vs validate, align, and publish to a strict schema.",
    },
    relatedLinks: [
      { label: "Bill of Lading Data Processing", href: "/shipping/bill-of-lading-data-processing" },
      { label: "Customs Document Data Extraction", href: "/customs/customs-document-data-extraction" },
    ],
  },
]

const getPost = (slug: string) => posts.find((post) => post.slug === slug) || null

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return { title: "Not Found" }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) {
    notFound()
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: "DocStandard Logistics Architect",
    },
    publisher: {
      "@type": "Organization",
      name: "DocStandard",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schema)}
      </script>

      <section className="px-4 pt-16 pb-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">
            Expert Perspective
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 mt-6">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-10 text-[1.05rem] leading-relaxed text-slate-700">
          {post.sections.map((section) => (
            <article key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          ))}

          {post.diagram && (
            <figure className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <figcaption className="text-sm font-semibold text-slate-700 mb-4">
                {post.diagram.title}
              </figcaption>
              <svg
                className="w-full h-40 text-slate-400"
                viewBox="0 0 600 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="20" y="30" width="150" height="60" rx="12" fill="#E2E8F0" />
                <rect x="230" y="30" width="150" height="60" rx="12" fill="#CBD5F5" />
                <rect x="440" y="30" width="140" height="60" rx="12" fill="#E2E8F0" />
                <path d="M170 60H230" stroke="#64748B" strokeWidth="2" />
                <path d="M380 60H440" stroke="#64748B" strokeWidth="2" />
                <text x="45" y="65" fontSize="12" fill="#334155">
                  Source Docs
                </text>
                <text x="255" y="65" fontSize="12" fill="#334155">
                  Normalize
                </text>
                <text x="465" y="65" fontSize="12" fill="#334155">
                  Output
                </text>
              </svg>
              <p className="text-xs text-slate-500 mt-3">{post.diagram.caption}</p>
            </figure>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Related Technical Guides</h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-700">
              {post.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:underline" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
