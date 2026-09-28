import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // Quita los console.log en producción, pero NUNCA error ni warn.
  //
  // Por qué la excepción: `removeConsole: true` los borraba todos, así que los tres avisos del
  // webhook de Stripe que explican por qué se descarta un pago se compilaban a nada. El 24/09/2026
  // se comprobó sobre el build: los literales "pago ajeno" y "sin configurar: ignoro el pago" no
  // existían en .next/server/.../webhook/route.js, y los logs del contenedor no tenían una sola
  // línea [stripe]. Cuatro pagos se perdieron sin un rastro que mirar.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Enable compression
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Vídeos y capturas del escaparate de QIU (tabla web_media, bucket público web-media).
  // Se sirven como stratomai.com/media/… para que el HTML público no lleve el host de Supabase.
  // La URL entra al compilar (NEXT_PUBLIC_*, variable de build en Coolify).
  async rewrites() {
    const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, '');
    return supabase
      ? [{ source: '/media/:ruta*', destination: `${supabase}/storage/v1/object/public/web-media/:ruta*` }]
      : [];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;