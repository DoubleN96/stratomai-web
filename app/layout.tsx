import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stratomai.com'),
  title: {
    default: 'Stratoma AI | Automatización con Inteligencia Artificial en Madrid',
    template: '%s | Stratoma AI',
  },
  description: 'Agencia de IA en Madrid. Chatbots inteligentes, automatización WhatsApp y asistentes virtuales para empresas. Aumenta ventas y ahorra tiempo con inteligencia artificial.',
  keywords: [
    'automatización IA Madrid',
    'chatbot empresas Madrid',
    'inteligencia artificial Madrid',
    'agencia IA Madrid',
    'automatización WhatsApp Madrid',
    'chatbot español Madrid',
    'asistente virtual IA Madrid',
    'consultoría IA Madrid',
    'desarrollo IA Madrid',
    'automatización procesos Madrid',
    'chatbot para negocios',
    'IA empresas España',
    'automatizar atención cliente',
    'chatbot WhatsApp empresas',
  ],
  authors: [{ name: 'Stratoma AI' }],
  creator: 'Stratoma AI',
  publisher: 'Stratoma AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stratomai.com',
    siteName: 'Stratoma AI',
    title: 'Stratoma AI - Agencia de Inteligencia Artificial en Madrid',
    description: 'Automatización con IA para empresas de Madrid. Chatbots inteligentes, WhatsApp automation y asistentes virtuales. Consultoría gratuita.',
    images: [
      {
        url: '/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'ScaleOps Automation - Automatización Empresarial con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratoma AI - Inteligencia Artificial en Madrid',
    description: 'Agencia de IA en Madrid. Chatbots, automatización y asistentes virtuales para empresas. Consultoría gratuita.',
    images: ['/twitter-card-home.jpg'],
    creator: '@stratomai',
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
  alternates: {
    canonical: 'https://stratomai.com',
  },
  verification: {
    google: 'Atm4vTOlZegKW9VwkjZxrh43UQ61QRu6mNsGoHp6hv0',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7C3AED',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}