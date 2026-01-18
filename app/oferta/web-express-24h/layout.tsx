import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Express 24h - Tu Web Profesional en 24 Horas desde €100 | Stratoma AI',
  description:
    'Web profesional en solo 24 horas desde €100. Landing o multipágina, 100% responsive, 1 revisión gratis, 30 días soporte. Pago único, sin letra pequeña. Garantía de satisfacción.',
  keywords: [
    'web en 24 horas',
    'página web rápida',
    'web barata',
    'web económica',
    'diseño web express',
    'web profesional',
    'landing page',
    'web negocio',
    'web empresa',
    'Stratoma AI',
    'Madrid',
  ],
  openGraph: {
    title: 'Web Express 24h - Tu Web Profesional en 24 Horas desde €100',
    description:
      '€100 Landing | €200 Multipágina | Entrega garantizada en 24h | 1 revisión gratis | 30 días soporte',
    type: 'website',
    url: 'https://stratoma.ai/oferta/web-express-24h',
    siteName: 'Stratoma AI',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Express 24h - €100 en 24 horas',
    description:
      'Tu web profesional en 24 horas. Desde €100. 1 revisión gratis. Garantía de satisfacción.',
  },
  alternates: {
    canonical: 'https://stratoma.ai/oferta/web-express-24h',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WebExpress24hLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
