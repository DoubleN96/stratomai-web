import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA para Recursos Humanos en Madrid | Automatización RRHH | Stratoma AI',
  description: 'IA para Recursos Humanos en Madrid. Automatiza screening de CVs, entrevistas, onboarding y reduce time-to-hire 40%. Reclutamiento inteligente con IA.',
  keywords: [
    'IA recursos humanos Madrid',
    'automatización RRHH Madrid',
    'reclutamiento IA Madrid',
    'HR tech IA Madrid',
    'screening CVs IA Madrid',
    'entrevistas IA Madrid',
    'onboarding automatizado Madrid',
    'ATS inteligente Madrid',
    'talent acquisition IA Madrid',
    'hiring automation Madrid',
    'predicción rotación IA Madrid',
    'employee engagement IA Madrid',
    'performance management IA Madrid',
    'learning development IA Madrid',
    'people analytics Madrid',
    'HR automation Madrid',
    'chatbot reclutamiento Madrid',
    'candidate experience IA Madrid',
    'cultural fit IA Madrid',
    'retention analytics Madrid',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/casos-uso/ia-rrhh',
    siteName: 'Stratoma AI',
    title: 'IA para Recursos Humanos en Madrid | Reduce Time-to-Hire 40%',
    description: 'Automatiza procesos de RRHH con IA en Madrid. Screening inteligente de CVs, entrevistas automatizadas, predicción de rotación. Consultoría gratuita.',
    images: [
      {
        url: '/og-ia-rrhh.jpg',
        width: 1200,
        height: 630,
        alt: 'IA para Recursos Humanos - Automatización de RRHH - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA para Recursos Humanos en Madrid | Stratoma AI',
    description: 'Automatiza screening, entrevistas y onboarding con IA. Reduce time-to-hire 40% y mejora calidad de candidatos. HR tech Madrid.',
    images: ['/twitter-ia-rrhh.jpg'],
    creator: '@stratomai',
  },
  alternates: {
    canonical: 'https://stratomai.com/casos-uso/ia-rrhh',
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

export default function IARRHHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
