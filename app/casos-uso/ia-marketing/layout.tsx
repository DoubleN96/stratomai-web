import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IA para Marketing Digital en Madrid | Automatización con Inteligencia Artificial | Stratoma AI',
  description:
    'Automatiza y optimiza tu marketing digital con IA. Aumenta ROI +127%, reduce CPA -45% y ahorra 25h/semana. Personalización a escala, lead scoring inteligente y optimización predictiva de campañas en Madrid.',
  keywords: [
    'IA marketing digital Madrid',
    'automatización marketing IA Madrid',
    'marketing automation IA Madrid',
    'inteligencia artificial marketing Madrid',
    'optimización campañas IA',
    'personalización marketing IA',
    'lead scoring inteligente Madrid',
    'predicción marketing IA',
    'automatización email marketing IA',
    'optimización Google Ads IA Madrid',
    'Facebook Ads IA Madrid',
    'análisis predictivo marketing',
    'marketing automation España',
    'IA publicidad digital Madrid',
    'machine learning marketing',
    'optimización ROI IA',
    'segmentación automática IA',
    'content generation IA marketing',
    'sentiment analysis marketing',
    'churn prediction IA',
  ],
  openGraph: {
    title: 'IA para Marketing Digital en Madrid | Aumenta ROI +127% | Stratoma AI',
    description:
      'Automatización y optimización de marketing con IA. Personalización a escala, lead scoring inteligente y campañas predictivas. Resultados medibles en 3 meses.',
    type: 'website',
    locale: 'es_ES',
  },
  alternates: {
    canonical: '/casos-uso/ia-marketing',
  },
};

export default function IAMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
