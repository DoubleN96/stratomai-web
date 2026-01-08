import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA para Ventas en Madrid - Aumenta Conversión y Cierra Más Deals | Stratoma AI',
  description:
    'Automatiza tu proceso de ventas con IA: lead scoring predictivo, seguimiento automático y análisis inteligente. Aumenta la tasa de cierre hasta 38% y ahorra 25h/semana. Integración con HubSpot, Salesforce y más CRMs.',
  keywords: [
    'IA para ventas Madrid',
    'inteligencia artificial ventas Madrid',
    'automatización ventas IA Madrid',
    'CRM con IA Madrid',
    'lead scoring predictivo Madrid',
    'automatización proceso ventas',
    'IA análisis conversaciones ventas',
    'predicción de ventas IA',
    'seguimiento automático leads',
    'inteligencia artificial CRM',
    'ventas con IA España',
    'automatizar equipo ventas Madrid',
    'forecasting ventas IA',
    'optimización ventas inteligencia artificial',
    'herramientas IA vendedores Madrid',
    'software ventas IA español',
    'agente IA ventas B2B',
    'calificación leads IA',
  ],
  openGraph: {
    title: 'IA para Ventas en Madrid - Aumenta Conversión +38% | Stratoma AI',
    description:
      'Automatiza scoring de leads, seguimiento y análisis con IA. Aumenta conversión 38% y ahorra 25h/semana.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com/casos-uso/ia-ventas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IA para Ventas en Madrid - Aumenta Conversión +38% | Stratoma AI',
    description:
      'Automatiza scoring de leads, seguimiento y análisis con IA. Aumenta conversión 38% y ahorra 25h/semana.',
  },
  alternates: {
    canonical: 'https://stratomai.com/casos-uso/ia-ventas',
  },
};

export default function IAVentasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
