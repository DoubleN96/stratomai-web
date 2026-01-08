import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chatbot WhatsApp con IA para Empresas en Madrid | Stratoma AI',
  description:
    'Automatiza atención al cliente en WhatsApp 24/7 con inteligencia artificial que habla español perfectamente. Aumenta conversión hasta 180% y ahorra 15h/semana.',
  keywords: [
    'chatbot whatsapp Madrid',
    'automatización whatsapp empresas',
    'whatsapp business API Madrid',
    'chatbot IA español',
    'automatizar whatsapp negocio',
    'chatbot atención cliente',
    'whatsapp automation España',
  ],
  openGraph: {
    title: 'Chatbot WhatsApp con IA para Empresas en Madrid | Stratoma AI',
    description:
      'Automatiza atención al cliente en WhatsApp 24/7 con IA. Aumenta conversión +180% y ahorra tiempo.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function ChatbotWhatsAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
