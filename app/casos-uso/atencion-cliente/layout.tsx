import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA para Atención al Cliente en Madrid | Soporte Automatizado 24/7 | Stratoma AI',
  description:
    'Automatiza tu servicio de atención al cliente con IA en Madrid. Chatbots inteligentes, soporte 24/7, análisis de sentimiento y resolución automática del 73% de consultas. CSAT +24% en 2 meses.',
  keywords: [
    'IA atención cliente Madrid',
    'automatización soporte cliente Madrid',
    'chatbot atención cliente Madrid',
    'servicio cliente IA Madrid',
    'soporte cliente automatizado Madrid',
    'customer service IA España',
    'chatbot servicio cliente español',
    'IA customer support Madrid',
    'automatizar atención cliente',
    'soporte 24/7 IA Madrid',
    'helpdesk inteligente Madrid',
    'chatbot multicanal Madrid',
    'IA WhatsApp soporte cliente',
    'análisis sentimiento cliente IA',
    'tickets automáticos IA Madrid',
    'Zendesk IA integración',
    'Intercom IA Madrid',
    'customer experience IA Madrid',
    'reducir costos soporte cliente',
    'escalamiento inteligente tickets',
  ],
  openGraph: {
    title: 'IA para Atención al Cliente en Madrid | Soporte Automatizado 24/7 | Stratoma AI',
    description:
      'Resuelve el 73% de consultas automáticamente con IA. Soporte 24/7 en WhatsApp, email y chat. CSAT +24%. Caso de éxito real en Madrid.',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og-atencion-cliente.jpg',
        width: 1200,
        height: 630,
        alt: 'IA para Atención al Cliente - Stratoma AI Madrid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA para Atención al Cliente en Madrid | Stratoma AI',
    description:
      'Automatiza soporte 24/7. Resuelve 73% consultas con IA. CSAT +24% en 2 meses.',
  },
  alternates: {
    canonical: 'https://stratomai.com/casos-uso/atencion-cliente',
  },
};

export default function AtencionClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
