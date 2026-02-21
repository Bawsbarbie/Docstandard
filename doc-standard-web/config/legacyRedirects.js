/**
 * Legacy redirect map — rewritten 2026-02-21
 *
 * BEFORE: All destinations pointed to flat geo slugs like /antwerp-compliance-mdec-ades
 *         which no longer exist → resulted in broken 301 chains ending in 404.
 *
 * AFTER:  All city-hub entries go directly to /logistics (the canonical hub).
 *         City-integration entries go to the matching /logistics/integration/:slug
 *         where a real page exists, or /logistics otherwise.
 *
 * These entries handle the subset of paths NOT already covered by the wildcards
 * in next.config.js Section 2. Specifically:
 *   - /logistics/:city  (NOT caught by /logistics/* wildcard — that's not in Section 2)
 *   - /integration/:city/:source/:dest  (NOT caught by /integration/:slug — wrong depth)
 *   - /invoice/:city  (caught by /invoice/:path* but kept for safety)
 */

// ─────────────────────────────────────────────────────────────────────────────
// INTEGRATION SLUG MAPPING
// Old: /integration/:city/:source/:dest
// New: /logistics/integration/:source-to-:dest-bridge (where a real page exists)
//      /logistics (fallback)
//
// Note: city segment is DROPPED — the new architecture has no city dimension
// on integration pages (that's Phase 2). Source+dest is what matters.
// ─────────────────────────────────────────────────────────────────────────────

const INTEGRATION_DEST = {
  "cargowise/netsuite":              "/logistics/integration/cargowise-to-netsuite-bridge",
  "cargowise/sap":                   "/logistics/integration/cargowise-to-sap-business-one-bridge",
  "cargowise/dynamics-bc":           "/logistics",
  "magaya/quickbooks":               "/logistics/integration/magaya-to-quickbooks-desktop-bridge",
  "mercurygate/oracle":              "/logistics/integration/mercurygate-to-oracle-erp-cloud-bridge",
  "flexport/netsuite":               "/logistics/integration/flexport-to-netsuite-bridge",
  "freightpop/netsuite":             "/logistics/integration/freightpop-to-netsuite-bridge",
  "kuebix/quickbooks":               "/logistics/integration/kuebix-to-quickbooks-desktop-bridge",
  "shipstation/sage":                "/logistics/integration/shipstation-to-sage-300-bridge",
  "3pl-central/dynamics365":         "/logistics",
  "blueyonder/dynamics365":          "/logistics",
  "descartes/netsuite-customs":      "/logistics",
  "edi-documents/erp-systems":       "/logistics",
  "logistics-data/sap-s4hana":       "/logistics",
  "manhattan/sap":                   "/logistics",
  "motive/sap-ifta":                 "/logistics",
  "roserocket/quickbooks":           "/logistics",
  "source-systems/oracle-erp-cloud": "/logistics",
  "tms-wms-systems/sap-s4hana":      "/logistics",
}

const CITIES = [
  "antwerp","busan","charleston","chicago","dubai","hamburg","hong-kong",
  "houston","london","long-beach","los-angeles","memphis","miami",
  "new-york","oakland","rotterdam","savannah","shanghai","singapore",
]

const CITY_VERTICALS = ["compliance","customs","finance","shipping","invoice","logistics"]

// Build all redirect entries
const legacyRedirects = []

// 1. City-hub redirects (all → /logistics)
for (const vertical of CITY_VERTICALS) {
  for (const city of CITIES) {
    legacyRedirects.push({
      source: `/${vertical}/${city}`,
      destination: "/logistics",
      permanent: true,
    })
  }
}

// 2. City-integration redirects (/integration/:city/:source/:dest)
for (const city of CITIES) {
  for (const [combo, destination] of Object.entries(INTEGRATION_DEST)) {
    const [src, dst] = combo.split("/")
    legacyRedirects.push({
      source: `/integration/${city}/${src}/${dst}`,
      destination,
      permanent: true,
    })
  }
}

module.exports = { legacyRedirects }
