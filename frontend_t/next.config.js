/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de fonte
  optimizeFonts: true,

  // Configurações experimentais para melhor performance
  experimental: {
    // Otimiza carregamento de fontes
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },

  // Headers para cache de fontes
  async headers() {
    return [
      {
        source: '/_next/static/media/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
