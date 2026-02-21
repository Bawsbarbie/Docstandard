/**
 * DEPRECATED: /integration/[slug]
 *
 * The canonical URL for integration pages is now /logistics/integration/[slug].
 * This route is kept as a safety net in case Next.js processes an inbound
 * request before the next.config.js redirect fires (e.g. in dev mode).
 *
 * In production, the redirect in next.config.js handles this at the edge
 * before the page ever renders.
 */
import type { Metadata } from "next"
import { permanentRedirect } from "next/navigation"

// Deprecated redirect route. Explicitly noindex in case the redirect fires
// after Googlebot reads the page headers.
export const metadata: Metadata = { robots: { index: false, follow: false } }

export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export default function DeprecatedIntegrationPage({
  params,
}: {
  params: { slug: string }
}) {
  permanentRedirect(`/logistics/integration/${params.slug}`)
}
