/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com'],
  },
  async redirects() {
    return [{
      source: '/canceled',
      destination: '/',
      permanent: true,
    }]
  }
}

module.exports = nextConfig
