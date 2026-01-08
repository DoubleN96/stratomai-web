import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sprint de Automatización IA en 14 Días | Garantía ROI 90 Días | Stratoma AI Madrid',
  description: 'Oferta exclusiva: Automatización completa de tu negocio en 14 días. Ahorra 20+ horas/semana garantizado. Solo 3 empresas por mes. Garantía de ROI en 90 días o devolución 100%. Madrid.',
  keywords: [
    'automatización IA Madrid',
    'sprint automatización Madrid',
    'automatización rápida IA Madrid',
    'garantía ROI IA Madrid',
    'automatización 14 días Madrid',
    'chatbot garantizado Madrid',
    'automatización procesos garantía Madrid',
    'IA implementación rápida Madrid',
    'automatización empresarial Madrid',
    'IA ahorro tiempo garantizado Madrid',
    'sprint IA Madrid',
    'transformación digital rápida Madrid',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/oferta/sprint-automatizacion',
    siteName: 'Stratoma AI',
    title: 'Sprint de Automatización IA en 14 Días | Garantía ROI | Stratoma AI',
    description: 'Oferta exclusiva: Automatización completa en 14 días. Ahorra 20+ horas/semana garantizado. Solo 3 empresas/mes. Garantía ROI 90 días. Madrid.',
    images: [
      {
        url: '/og-oferta-sprint.jpg',
        width: 1200,
        height: 630,
        alt: 'Sprint de Automatización IA - Oferta Exclusiva Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sprint de Automatización IA en 14 Días | Garantía ROI',
    description: 'Automatización completa en 14 días. 20+ horas/semana ahorradas. Solo 3 empresas/mes. Garantía ROI 90 días o devolución 100%.',
    images: ['/twitter-oferta-sprint.jpg'],
    creator: '@stratomai',
  },
  alternates: {
    canonical: 'https://stratomai.com/oferta/sprint-automatizacion',
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

export default function SprintAutomatizacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
