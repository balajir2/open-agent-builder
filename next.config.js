/** @type {import('next').NextConfig} */
// Force rebuild 9
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
  // Mark server-only packages for Next.js 16+
  serverExternalPackages: [
    '@langchain/langgraph',
    '@langchain/langgraph-checkpoint-redis',
    'redis',
    '@redis/client',
    '@e2b/code-interpreter',
    'e2b',
  ],
}

module.exports = nextConfig