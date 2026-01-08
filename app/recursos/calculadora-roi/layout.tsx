import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora ROI Automatización IA Gratuita | Stratoma AI Madrid',
  description: 'Calcula cuánto dinero y tiempo puedes ahorrar automatizando tu negocio con IA. Calculadora gratuita e interactiva. Resultados en segundos. Madrid.',
  keywords: [
    'calculadora ROI IA Madrid',
    'calculadora automatización Madrid',
    'ROI chatbot Madrid',
    'ahorro automatización IA Madrid',
    'calcular ROI IA Madrid',
    'costo automatización Madrid',
    'ahorro tiempo IA Madrid',
    'calculadora chatbot gratuita Madrid',
    'ROI WhatsApp automatización Madrid',
    'calcular ahorro IA empresas Madrid',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/recursos/calculadora-roi',
    siteName: 'Stratoma AI',
    title: 'Calculadora ROI Automatización IA | Gratis | Stratoma AI',
    description: 'Descubre cuánto puedes ahorrar automatizando con IA. Calculadora gratuita e interactiva. Resultados personalizados en segundos.',
    images: [
      {
        url: '/og-calculadora-roi.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora ROI Automatización IA - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora ROI Automatización IA Gratuita',
    description: 'Calcula cuánto dinero y tiempo puedes ahorrar automatizando tu negocio con IA. Gratis.',
    images: ['/twitter-calculadora-roi.jpg'],
    creator: '@stratomai',
  },
  alternates: {
    canonical: 'https://stratomai.com/recursos/calculadora-roi',
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

export default function CalculadoraROILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
