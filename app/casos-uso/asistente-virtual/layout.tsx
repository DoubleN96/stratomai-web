import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asistentes Virtuales con IA en Madrid | Atención Cliente 24/7',
  description: 'Asistente virtual IA entrenado con tus datos que atiende como tu mejor empleado 24/7. Resuelve 90% consultas automáticamente. WhatsApp, web, Instagram. Demo gratuita.',
  keywords: [
    'asistente virtual IA Madrid',
    'chatbot inteligente Madrid',
    'asistente virtual empresas Madrid',
    'IA atención cliente Madrid',
    'automatización atención cliente',
    'asistente IA español',
    'chatbot WhatsApp empresas Madrid',
    'asistente virtual 24/7',
    'IA para negocios Madrid',
    'automatizar consultas clientes',
    'asistente virtual entrenado',
    'IA conversacional Madrid',
  ],
  openGraph: {
    title: 'Asistentes Virtuales con IA para Empresas en Madrid',
    description: 'IA entrenada con tus datos que atiende clientes 24/7. Resuelve el 90% de consultas automáticamente. Demo gratuita.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/casos-uso/asistente-virtual',
    siteName: 'Stratoma AI',
    images: [
      {
        url: '/og-asistente-virtual.jpg',
        width: 1200,
        height: 630,
        alt: 'Asistentes Virtuales IA - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asistentes Virtuales con IA en Madrid',
    description: 'Atiende clientes 24/7 con IA entrenada con tus datos. Resuelve 90% consultas automáticamente.',
    images: ['/twitter-asistente-virtual.jpg'],
  },
  alternates: {
    canonical: 'https://stratomai.com/casos-uso/asistente-virtual',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AsistenteVirtualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
