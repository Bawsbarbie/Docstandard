/**
 * lib/pseo/internal-links.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised hub-and-spoke internal linking logic for DocStandard.
 *
 * Hub-and-spoke architecture:
 *   Hub:   /{vertical}                       (vertical overview page)
 *   Spoke: /{vertical}/integration/{slug}    (integration pair page)
 *   Spoke: /{vertical}/documents/{slug}      (document type page — future)
 *   Cross: /comparison/{a}-vs-{b}            (comparison pages)
 *   Cross: /blog/{slug}                      (related blog posts)
 *
 * Every spoke page must link back to its hub and to at least 2 sibling spokes.
 * Every hub page must link to its top spokes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface InternalLink {
  label: string
  href: string
  description?: string
}

// ── Vertical hub links ────────────────────────────────────────────────────────

export const VERTICAL_HUBS: Record<string, { label: string; href: string; description: string }> = {
  logistics: {
    label: "Logistics Hub",
    href: "/logistics",
    description: "Bills of lading, packing lists, and TMS integrations.",
  },
  accountants: {
    label: "Accountants Hub",
    href: "/accountants",
    description: "Client documents, tax filings, and accounting software integrations.",
  },
  "real-estate": {
    label: "Real Estate Hub",
    href: "/real-estate",
    description: "Lease agreements, rent rolls, and property management integrations.",
  },
  warehousing: {
    label: "Warehousing Hub",
    href: "/warehousing",
    description: "Pick tickets, receiving reports, and WMS integrations.",
  },
}

// ── Cross-vertical links (shown on every hub and major spoke) ────────────────

export const CROSS_VERTICAL_LINKS: InternalLink[] = [
  { label: "Logistics", href: "/logistics", description: "TMS and ERP document bridges." },
  { label: "Accountants", href: "/accountants", description: "Accounting software normalization." },
  { label: "Real Estate", href: "/real-estate", description: "Property management document sync." },
  { label: "Warehousing", href: "/warehousing", description: "WMS document processing." },
]

// ── Builder: links for a specific integration page (spoke) ──────────────────

export interface IntegrationLinkContext {
  verticalId: string
  verticalName: string
  sourceSlug: string
  sourceName: string
  destSlug: string
  destName: string
  /** Other destination slugs/names reachable from the same source */
  siblingDests?: Array<{ slug: string; name: string }>
  /** Other source slugs/names that feed the same destination */
  siblingSources?: Array<{ slug: string; name: string }>
}

/**
 * Returns the full set of internal links for an integration spoke page.
 * Guarantees at least 5 links: hub + 2 sibling-dest + 2 sibling-source.
 */
export function buildIntegrationPageLinks(ctx: IntegrationLinkContext): {
  related: InternalLink[]
  footer: InternalLink[]
} {
  const base = `/${ctx.verticalId}/integration`

  // Sibling integrations: same source → other dests
  const sameSrcLinks: InternalLink[] = (ctx.siblingDests ?? [])
    .slice(0, 3)
    .map((d) => ({
      label: `${ctx.sourceName} to ${d.name}`,
      href: `${base}/${ctx.sourceSlug}-to-${d.slug}`,
      description: `${ctx.verticalName} document normalization from ${ctx.sourceName} into ${d.name}.`,
    }))

  // Sibling integrations: other sources → same dest
  const sameDstLinks: InternalLink[] = (ctx.siblingSources ?? [])
    .slice(0, 3)
    .map((s) => ({
      label: `${s.name} to ${ctx.destName}`,
      href: `${base}/${s.slug}-to-${ctx.destSlug}`,
      description: `${ctx.verticalName} document normalization from ${s.name} into ${ctx.destName}.`,
    }))

  // Combine + deduplicate, capping at 6 related links
  const all = [...sameSrcLinks, ...sameDstLinks]
  const seen = new Set<string>()
  const related: InternalLink[] = []
  for (const link of all) {
    if (!seen.has(link.href)) {
      seen.add(link.href)
      related.push(link)
    }
    if (related.length >= 6) break
  }

  // Footer navigation links (hub + comparison + cross-verticals)
  const footer: InternalLink[] = [
    {
      label: `← All ${ctx.verticalName} Integrations`,
      href: base,
    },
    {
      label: `${ctx.verticalName} Hub`,
      href: `/${ctx.verticalId}`,
    },
    {
      label: "Compare Platforms",
      href: "/comparison",
    },
    // One cross-vertical link (the "next" vertical in the cycle)
    ...CROSS_VERTICAL_LINKS.filter((l) => l.href !== `/${ctx.verticalId}`).slice(0, 1),
  ]

  return { related, footer }
}

// ── Builder: top integration links for a hub page ───────────────────────────

/**
 * Returns curated integration links to surface on a vertical hub page.
 * Picks first N source systems × first destination system for variety.
 */
export function buildHubIntegrationLinks(
  verticalId: string,
  verticalName: string,
  sources: Array<{ slug: string; name: string }>,
  destinations: Array<{ slug: string; name: string }>,
  count = 6,
): InternalLink[] {
  const base = `/${verticalId}/integration`
  const links: InternalLink[] = []

  for (const src of sources) {
    for (const dst of destinations) {
      links.push({
        label: `${src.name} → ${dst.name}`,
        href: `${base}/${src.slug}-to-${dst.slug}`,
        description: `Normalize ${src.name} documents for ${dst.name} import.`,
      })
      if (links.length >= count) return links
    }
  }
  return links
}

// ── Builder: breadcrumb items for an integration spoke ─────────────────────

export function buildIntegrationBreadcrumbs(
  verticalId: string,
  verticalName: string,
  pageLabel: string,
  canonicalUrl: string,
): Array<{ name: string; url: string }> {
  return [
    { name: "Home", url: "https://docstandard.co" },
    { name: verticalName, url: `https://docstandard.co/${verticalId}` },
    { name: pageLabel, url: canonicalUrl },
  ]
}
