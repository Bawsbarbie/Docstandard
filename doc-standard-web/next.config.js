/** @type {import('next').NextConfig} */
const { legacyRedirects } = require("./config/legacyRedirects")

const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/**/*": ["./data/**/*", "./content/**/*"],
    },
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },
      {
        source: "/sitemaps/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // ─────────────────────────────────────────────────────────────────────
      // SECTION 1: New canonical URL structure — integration pages
      // Old flat /integration/:slug → new canonical /:vertical/integration/:slug
      // These are the proven click drivers; must be 308 to preserve link equity.
      // ─────────────────────────────────────────────────────────────────────
      {
        source: "/integration/:slug",
        destination: "/logistics/integration/:slug",
        permanent: true,
      },

      // ─────────────────────────────────────────────────────────────────────
      // SECTION 2: Sub-vertical hub consolidation
      // /shipping, /customs, /compliance, /finance, /invoice all fold into
      // /logistics in the new architecture. Intent-slug pages under each
      // sub-vertical redirect to the equivalent logistics path.
      // ─────────────────────────────────────────────────────────────────────
      {
        source: "/shipping",
        destination: "/logistics",
        permanent: true,
      },
      {
        source: "/shipping/:path*",
        destination: "/logistics/:path*",
        permanent: true,
      },
      {
        source: "/customs",
        destination: "/logistics",
        permanent: true,
      },
      {
        source: "/customs/:path*",
        destination: "/logistics/:path*",
        permanent: true,
      },
      {
        source: "/compliance",
        destination: "/logistics",
        permanent: true,
      },
      {
        source: "/compliance/:path*",
        destination: "/logistics/:path*",
        permanent: true,
      },
      {
        source: "/finance",
        destination: "/logistics",
        permanent: true,
      },
      {
        source: "/finance/:path*",
        destination: "/logistics/:path*",
        permanent: true,
      },
      {
        source: "/invoice",
        destination: "/logistics",
        permanent: true,
      },
      {
        source: "/invoice/:path*",
        destination: "/logistics/:path*",
        permanent: true,
      },

      // ─────────────────────────────────────────────────────────────────────
      // SECTION 3: Old flat geo slug redirects
      // Pattern: /:city-:systemA-:systemB-mdec-ades and /:city-:systemA-:systemB-integration
      // These were root-level pages never indexed. All redirect to /logistics.
      // The [..vertical] catch-all also handles these generically, but explicit
      // rules here ensure Googlebot gets a fast 301 without hitting the app layer.
      // ─────────────────────────────────────────────────────────────────────
      // CargoWise + NetSuite city slugs
      { source: "/:city-cargowise-netsuite-integration",   destination: "/logistics/integration/cargowise-to-netsuite-bridge", permanent: true },
      { source: "/:city-cargowise-netsuite-mdec-ades",      destination: "/logistics/integration/cargowise-to-netsuite-bridge", permanent: true },
      // SAP + QuickBooks city slugs
      { source: "/:city-sap-quickbooks-integration",        destination: "/logistics", permanent: true },
      { source: "/:city-sap-quickbooks-mdec-ades",          destination: "/logistics", permanent: true },
      // Magaya + Oracle city slugs
      { source: "/:city-magaya-oracle-integration",         destination: "/logistics/integration/magaya-to-oracle-erp-cloud-bridge", permanent: true },
      { source: "/:city-magaya-oracle-mdec-ades",           destination: "/logistics/integration/magaya-to-oracle-erp-cloud-bridge", permanent: true },
      // Motive + Microsoft city slugs
      { source: "/:city-motive-microsoft-dynamics-integration", destination: "/logistics", permanent: true },
      { source: "/:city-motive-microsoft-mdec-ades",        destination: "/logistics", permanent: true },
      // Truncated / malformed slugs (the valencia long URL etc.)
      { source: "/:city-cargowise-netsuite-manual-data-entry-:rest*", destination: "/logistics/integration/cargowise-to-netsuite-bridge", permanent: true },
      { source: "/:city-sap-quickbooks-manual-data-entry-:rest*",     destination: "/logistics", permanent: true },

      // ─────────────────────────────────────────────────────────────────────
      // SECTION 4: Legacy one-off redirects
      // ─────────────────────────────────────────────────────────────────────
      {
        source: "/invoice-processing-automation",
        destination: "/blog/invoice-data-extraction",
        permanent: true,
      },
      {
        source: "/invoice-matching-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/sitemap-batch-:batch.xml",
        destination: "/sitemaps/sitemap-batch-:batch.xml",
        permanent: true,
      },

      // ─────────────────────────────────────────────────────────────────────
      // SECTION 4: Legacy city/vertical redirects
      // These were previously sending /vertical/city to batch-generated pages.
      // Preserved here to avoid breaking any inbound links, but they now point
      // to the correct logistics vertical path.
      // NOTE: legacyRedirects entries are processed after the above rules;
      // any /compliance/:city or /shipping/:city entries there are now
      // superseded by the wildcards above (Section 2).
      // ─────────────────────────────────────────────────────────────────────
      ...legacyRedirects,
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

module.exports = nextConfig
