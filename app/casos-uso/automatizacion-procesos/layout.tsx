import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automatización de Procesos con IA en Madrid | Stratoma AI',
  description: 'Automatización de procesos empresariales con IA en Madrid. Conecta todas tus herramientas, automatiza flujos de trabajo y ahorra 15-20h/semana. n8n Madrid.',
  keywords: [
    'automatización procesos Madrid',
    'automatización empresarial Madrid',
    'n8n Madrid',
    'automatización workflows Madrid',
    'integración herramientas Madrid',
    'automatización IA Madrid',
    'procesos automáticos Madrid',
    'workflow automation Madrid',
    'zapier alternativa Madrid',
    'make alternativa Madrid',
    'automatización marketing Madrid',
    'automatización ventas Madrid',
    'automatización facturación Madrid',
    'sincronización datos Madrid',
    'automatización CRM Madrid',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/casos-uso/automatizacion-procesos',
    siteName: 'Stratoma AI',
    title: 'Automatización de Procesos con IA en Madrid | Ahorra 15-20h/semana',
    description: 'Automatiza procesos empresariales con IA y n8n en Madrid. Conecta +300 apps, elimina tareas repetitivas y ahorra hasta 20h semanales. Consultoría gratuita.',
    images: [
      {
        url: '/og-automatizacion-procesos.jpg',
        width: 1200,
        height: 630,
        alt: 'Automatización de Procesos Empresariales con IA - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatización de Procesos con IA en Madrid | Stratoma AI',
    description: 'Automatiza workflows empresariales con IA. Ahorra 15-20h/semana conectando todas tus herramientas. n8n Madrid.',
    images: ['/twitter-automatizacion-procesos.jpg'],
    creator: '@stratomai',
  },
  alternates: {
    canonical: 'https://stratomai.com/casos-uso/automatizacion-procesos',
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

export default function AutomatizacionProcesosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
