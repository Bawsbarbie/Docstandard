/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // Ensure data files are included in production builds
  outputFileTracingIncludes: {
    '/**': [
      './data/**/*',
      './data/content/*.json',
      './data/*.csv',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
