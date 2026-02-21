/**
 * metadata.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Central metadata factory for all pSEO and marketing routes.
 *
 * Rules enforced here:
 *  - Consistent " | DocStandard" title suffix
 *  - Canonical URL always set (no trailing slash)
 *  - openGraph always populated from the same title/description
 *  - Description trimmed to ≤160 chars at word boundary
 *  - robots field explicit on every page
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Metadata } from "next"

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_NAME = "DocStandard"
export const SITE_URL = "https://docstandard.co"
export const TITLE_SUFFIX = `| ${SITE_NAME}`

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Append "| DocStandard" unless already present */
export function buildTitle(page: string): string {
  if (page.includes(SITE_NAME)) return page
  return `${page} ${TITLE_SUFFIX}`
}

/** Full canonical URL from a root-relative path */
export function buildCanonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${clean}`.replace(/\/$/, "")
}

/** Trim description to ≤160 chars, ending on a word boundary */
export function trimDescription(text: string, maxLen = 160): string {
  if (text.length <= maxLen) return text
  const cut = text.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(" ")
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?]$/, "") + "…"
}

/** Slug → display name: "quickbooks-online" → "QuickBooks Online" */
export function slugToName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// ─────────────────────────────────────────────────────────────────────────────
// Core builder
// ─────────────────────────────────────────────────────────────────────────────

interface BuildMetaOptions {
  title: string            // Page-specific title (suffix added automatically)
  description: string
  canonicalPath: string    // Root-relative path e.g. "/logistics/integration/cargowise-to-netsuite"
  noIndex?: boolean
  imageUrl?: string        // OG image (defaults to site default)
}

export function buildMeta({
  title,
  description,
  canonicalPath,
  noIndex = false,
  imageUrl,
}: BuildMetaOptions): Metadata {
  const fullTitle = buildTitle(title)
  const trimmedDesc = trimDescription(description)
  const canonical = buildCanonical(canonicalPath)

  const meta: Metadata = {
    title: fullTitle,
    description: trimmedDesc,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: trimmedDesc,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: trimmedDesc,
    },
  }

  return meta
}

/** Returns metadata that explicitly noindexes a page */
export function noindexMeta(): Metadata {
  return { robots: { index: false, follow: false } }
}

// ─────────────────────────────────────────────────────────────────────────────
// Domain-specific builders
// ─────────────────────────────────────────────────────────────────────────────

/** Integration page: /{vertical}/integration/{source}-to-{dest} */
export function buildIntegrationMeta(params: {
  verticalName: string
  verticalSlug: string
  sourceName: string
  destName: string
  sourceSlug: string
  destSlug: string
}): Metadata {
  const { verticalName, verticalSlug, sourceName, destName, sourceSlug, destSlug } = params
  return buildMeta({
    title: `${sourceName} to ${destName} Data Normalization | ${verticalName}`,
    description: `Clean, structured data from ${sourceName} into ${destName} — fast. DocStandard normalizes ${verticalName.toLowerCase()} documents for error-free ${destName} import. Audit-ready output, 24–72h turnaround.`,
    canonicalPath: `/${verticalSlug}/integration/${sourceSlug}-to-${destSlug}`,
  })
}

/** Comparison page: /comparison/{systemA}-vs-{systemB} */
export function buildComparisonMeta(params: {
  slugA: string
  slugB: string
}): Metadata {
  const { slugA, slugB } = params
  const nameA = slugToName(slugA)
  const nameB = slugToName(slugB)
  return buildMeta({
    title: `${nameA} vs ${nameB} | Comparison`,
    description: `Compare ${nameA} and ${nameB} for document normalization and ERP integration. See field mapping differences, integration capabilities, and which platform fits your workflow.`,
    canonicalPath: `/comparison/${slugA}-vs-${slugB}`,
  })
}

/** Vertical hub page: /{vertical} */
export function buildVerticalHubMeta(params: {
  verticalSlug: string
  verticalName: string
  description?: string
}): Metadata {
  const { verticalSlug, verticalName, description } = params
  return buildMeta({
    title: `${verticalName} Document Processing Hub`,
    description:
      description ??
      `Transform ${verticalName.toLowerCase()} documents into clean, structured data for your software stack. Integration guides, field mapping references, and normalization services.`,
    canonicalPath: `/${verticalSlug}`,
  })
}

/** City integration page: /{vertical}/integration/{source}-to-{dest}/{hurdle}/{city} */
export function buildCityIntegrationMeta(params: {
  verticalSlug: string
  sourceName: string
  destName: string
  cityName: string
  sourceSlug: string
  destSlug: string
  hurdle?: string
}): Metadata {
  const { verticalSlug, sourceName, destName, cityName, sourceSlug, destSlug, hurdle } = params
  const hurdleSegment = hurdle ? `/${hurdle}` : ""
  const citySegment = cityName.toLowerCase().replace(/\s+/g, "-")
  return buildMeta({
    title: `${sourceName} to ${destName} in ${cityName}`,
    description: `DocStandard normalizes ${sourceName} documents for ${destName} import in ${cityName}. Audit-ready, 24–72h turnaround. ${cityName} teams served locally and remotely.`,
    canonicalPath: `/${verticalSlug}/integration/${sourceSlug}-to-${destSlug}${hurdleSegment}/${citySegment}`,
  })
}

/** Document type page: /{vertical}/documents/{document-slug} */
export function buildDocumentMeta(params: {
  verticalSlug: string
  verticalName: string
  documentName: string
  documentSlug: string
}): Metadata {
  const { verticalSlug, verticalName, documentName, documentSlug } = params
  return buildMeta({
    title: `${documentName} Processing | ${verticalName}`,
    description: `Extract and normalize ${documentName.toLowerCase()} data into clean, structured records for your ${verticalName.toLowerCase()} software. Audit-ready, ERP-compatible output.`,
    canonicalPath: `/${verticalSlug}/documents/${documentSlug}`,
  })
}

/** Near-me page: /near-me/{slug} */
export function buildNearMeMeta(params: {
  slug: string
  title: string
  description: string
}): Metadata {
  return buildMeta({
    title: params.title,
    description: params.description,
    canonicalPath: `/near-me/${params.slug}`,
  })
}

/** Blog post page */
export function buildBlogPostMeta(params: {
  slug: string
  title: string
  description: string
}): Metadata {
  return buildMeta({
    title: params.title,
    description: params.description,
    canonicalPath: `/blog/${params.slug}`,
  })
}
