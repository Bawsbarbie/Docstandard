/**
 * RETIRED: Geo-pattern catch-all (/us/ca/los-angeles/intent)
 *
 * These URLs were never indexed — Google placed them in the "Discovered" queue
 * and never crawled them. They consumed crawl budget without producing any
 * impressions or clicks. We return 404 here so Google deprioritises them
 * and we stop wasting crawl budget on this pattern.
 *
 * The new architecture uses /{vertical}/integration/[slug] for all
 * integration-level pages. City pages are a Phase 2 concern, gated on
 * achieving 60%+ indexing on the Phase 1 integration pages first.
 *
 * If a legitimate inbound link lands on one of these old geo URLs, the user
 * gets a 404. There are no known indexed pages at this URL pattern (confirmed
 * via GSC — all pages are in Discovered/Crawled-not-indexed state).
 */
import type { Metadata } from "next"
import { notFound } from "next/navigation"

// This route always returns 404. Noindex prevents it consuming crawl budget
// if somehow crawled before the 404 is processed.
export const metadata: Metadata = { robots: { index: false, follow: false } }

export const dynamicParams = true

export async function generateStaticParams() {
  // Return empty — we want zero pre-rendered pages at this pattern.
  return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RetiredGeoPage(_props: { params: { vertical: string[] } }) {
  notFound()
}
