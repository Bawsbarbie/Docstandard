/**
 * lib/pseo/schema.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised JSON-LD schema builders for DocStandard.
 * All schema objects follow schema.org specs.
 *
 * Usage:
 *   import { buildBreadcrumbSchema, buildFaqSchema, serializeSchemas } from "@/lib/pseo/schema"
 *   const json = serializeSchemas([buildBreadcrumbSchema(...), buildFaqSchema(...)])
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SITE_NAME = "DocStandard"
const SITE_URL = "https://docstandard.co"
const LOGO_URL = `${SITE_URL}/images/logo.png`

// ── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FaqItem {
  question: string
  answer: string
}

// ── Builders ─────────────────────────────────────────────────────────────────

/**
 * BreadcrumbList — shows breadcrumb trail in Google results.
 * Provide absolute URLs.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * FAQPage — enables FAQ rich results in Google SERP.
 * Best with 3–10 Q&A pairs.
 */
export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Service — used for integration pages.
 */
export function buildServiceSchema(opts: {
  name: string
  description: string
  url: string
  serviceType?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: opts.serviceType ?? "Document Normalization",
    areaServed: "Worldwide",
  }
}

/**
 * WebPage — used for hub / category pages.
 */
export function buildWebPageSchema(opts: {
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

/**
 * Article — used for blog posts.
 */
export function buildArticleSchema(opts: {
  headline: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  imageUrl?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    author: {
      "@type": "Organization",
      name: opts.authorName ?? SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    ...(opts.imageUrl && {
      image: { "@type": "ImageObject", url: opts.imageUrl },
    }),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

/**
 * Organization — sitewide entity definition.
 * Used on homepage and primary hub pages.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    description:
      "B2B document processing service specialising in logistics, accounting, real estate, and warehousing automation.",
  }
}

/**
 * Serialize one or more schema objects into a string safe for
 * dangerouslySetInnerHTML.
 *
 * Multiple schemas are wrapped in an @graph array (recommended by Google)
 * so the page only needs a single <script> tag.
 */
export function serializeSchemas(schemas: object[]): string {
  if (schemas.length === 0) return "{}"
  if (schemas.length === 1) return JSON.stringify(schemas[0])

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas.map((s) => {
      // Strip @context from individual schemas when wrapping in @graph
      const { "@context": _ctx, ...rest } = s as Record<string, unknown>
      return rest
    }),
  })
}
