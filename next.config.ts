import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuración de Next.js para Stratomai - Plataforma AI-First */

  // Habilitar experimental features
  experimental: {
    // Optimización de paquetes para node_modules
    optimizePackageImports: [
      "recharts",
      "lucide-react",
      "@radix-ui/react-icons"
    ],
  },

  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "supabase.stratomai.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "*.stratomai.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/clientes",
        permanent: false,
      },
      {
        source: "/cliente",
        destination: "/cliente/dashboard",
        permanent: false,
      },
    ];
  },

  // Rewrites para API
  async rewrites() {
    // Solo habilitar rewrites si la variable de entorno está configurada
    if (process.env.N8N_WEBHOOK_URL) {
      return [
        {
          source: "/api/n8n/:path*",
          destination: `${process.env.N8N_WEBHOOK_URL}/:path*`,
        },
      ];
    }
    return [];
  },

  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_DEFAULT_LOCALE: "es-ES",
    NEXT_PUBLIC_TIMEZONE: "Europe/Madrid",
  },

  // Configuración de cache
  onDemandEntries: {
    // Tiempo que las páginas se mantienen en memoria (ms)
    maxInactiveAge: 60 * 60 * 1000,
    // Número de páginas simultáneas que se mantienen en memoria
    pagesBufferLength: 5,
  },

  // Output standalone para Docker
  output: "standalone",

  // Typescript estricto
  typescript: {
    // Fallar el build en errores de TypeScript
    ignoreBuildErrors: false,
  },

  // ESLint estricto
  eslint: {
    // Fallar el build en errores de ESLint
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
