/**
 * RETIRED: Geo-pattern catch-all (/us/ca/los-angeles/intent)
 *
 * All old geo URLs (flat slugs, city+urgency+doc+action, old sub-vertical paths)
 * redirect permanently to /logistics. This resolves ~950 broken redirect chains
 * where legacyRedirects pointed to dead flat geo slugs that no longer exist.
 *
 * Google was discovering these via old internal links / sitemaps.
 * A 301 to /logistics tells Google to consolidate any residual signal there.
 */
import { permanentRedirect } from "next/navigation"

export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RetiredGeoPage(_props: { params: { vertical: string[] } }) {
  permanentRedirect("/logistics")
}
