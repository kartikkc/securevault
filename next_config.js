/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react']
  },
  transpilePackages: ['motion']
}

module.exports = nextConfig