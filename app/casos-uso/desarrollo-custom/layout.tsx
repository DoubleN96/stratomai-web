import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo Custom de IA en Madrid | Soluciones IA a Medida | Stratoma AI',
  description: 'Desarrollo personalizado de soluciones de IA en Madrid. Machine Learning, Computer Vision, NLP y modelos predictivos a medida. Consultoría técnica especializada.',
  keywords: [
    'desarrollo IA personalizado Madrid',
    'desarrollo custom IA Madrid',
    'soluciones IA a medida Madrid',
    'desarrollo machine learning Madrid',
    'desarrollo AI custom Madrid',
    'programación IA Madrid',
    'desarrollo modelos IA Madrid',
    'desarrollo NLP Madrid',
    'desarrollo computer vision Madrid',
    'desarrollo IA empresas Madrid',
    'consultoría desarrollo IA Madrid',
    'desarrollo API IA Madrid',
    'desarrollo modelos predictivos Madrid',
    'desarrollo deep learning Madrid',
    'desarrollo IA Python Madrid',
    'MLOps Madrid',
    'desarrollo TensorFlow Madrid',
    'desarrollo PyTorch Madrid',
    'inteligencia artificial a medida Madrid',
    'desarrollo IA B2B Madrid',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/casos-uso/desarrollo-custom',
    siteName: 'Stratoma AI',
    title: 'Desarrollo Custom de IA en Madrid | Soluciones Machine Learning a Medida',
    description: 'Desarrollo personalizado de soluciones IA en Madrid: Computer Vision, NLP, modelos predictivos y APIs de machine learning. Desde MVP hasta producción completa.',
    images: [
      {
        url: '/og-desarrollo-custom.jpg',
        width: 1200,
        height: 630,
        alt: 'Desarrollo Custom de Inteligencia Artificial - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desarrollo Custom de IA en Madrid | Stratoma AI',
    description: 'Desarrollo personalizado de IA: Machine Learning, Computer Vision, NLP y modelos predictivos a medida. Consultoría técnica especializada.',
    images: ['/twitter-desarrollo-custom.jpg'],
    creator: '@stratomai',
  },
  alternates: {
    canonical: 'https://stratomai.com/casos-uso/desarrollo-custom',
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

export default function DesarrolloCustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
