/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
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
      {
        source: "/sitemap-batch-:batch.xml",
        destination: "/sitemaps/sitemap-batch-:batch.xml",
        permanent: true,
      },
      // Redirect old city-system URLs to new format
      {
        source: "/:city-:systemA-:systemB-integration",
        destination: "/integration/:city/:systemA/:systemB",
        permanent: true,
      },
      {
        source: "/:city-:systemA-:systemB-data-bridge",
        destination: "/integration/:city/:systemA/:systemB",
        permanent: true,
      },
      {
        source: "/:city-:systemA-:systemB-bridge",
        destination: "/integration/:city/:systemA/:systemB",
        permanent: true,
      },
      {
        source: "/:city-:systemA-:systemB-normalization",
        destination: "/integration/:city/:systemA/:systemB",
        permanent: true,
      },
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
