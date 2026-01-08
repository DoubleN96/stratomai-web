import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultoría e Implementación de IA en Madrid | Proceso Completo | Stratoma AI',
  description: 'Proceso completo de consultoría e implementación de IA para empresas de Madrid. Metodología en 5 fases: auditoría, diseño, implementación, lanzamiento y optimización. Resultados en 4-6 semanas.',
  keywords: [
    'consultoría IA Madrid',
    'consultoría inteligencia artificial Madrid',
    'implementación IA Madrid',
    'proceso implementación IA Madrid',
    'agencia IA Madrid',
    'consultor IA Madrid',
    'estrategia IA Madrid',
    'transformación digital IA Madrid',
    'roadmap IA Madrid',
    'automatización IA Madrid',
    'consultoría automatización Madrid',
    'implementación automatización Madrid',
    'consultoría chatbot Madrid',
    'asesoría IA empresas Madrid',
    'consultoría transformación IA Madrid',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/consultoria',
    siteName: 'Stratoma AI',
    title: 'Consultoría e Implementación de IA en Madrid | Proceso en 5 Fases',
    description: 'Metodología probada de consultoría e implementación de IA en Madrid. De análisis inicial a resultados medibles en 4-6 semanas. Proceso transparente, soporte continuo.',
    images: [
      {
        url: '/og-consultoria.jpg',
        width: 1200,
        height: 630,
        alt: 'Proceso de Consultoría e Implementación de IA - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoría e Implementación de IA en Madrid | Stratoma AI',
    description: 'Proceso completo de consultoría IA: auditoría, diseño, implementación, lanzamiento y optimización. Resultados en 4-6 semanas. Madrid.',
    images: ['/twitter-consultoria.jpg'],
    creator: '@stratomai',
  },
  alternates: {
    canonical: 'https://stratomai.com/consultoria',
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

export default function ConsultoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
