import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  metadataBase: new URL('https://scaleops.com'),
  title: {
    default: 'ScaleOps Automation | Automatización con IA para Escalar tu Negocio',
    template: '%s | ScaleOps Automation',
  },
  description: 'Automatiza tu negocio con IA, chatbots y sistemas 24/7. Recupera hasta 80% de tu tiempo en tareas repetitivas. Consultoría gratuita.',
  keywords: [
    'automatización con IA',
    'automatizar negocio',
    'chatbot empresas',
    'automatización empresarial',
    'sistemas automatización',
    'chatbot whatsapp',
    'gohighlevel español',
    'n8n automatización',
    'WhatsApp Business automation',
    'GoHighLevel',
    'agentes de IA',
    'CRM automation',
    'workflow automation',
    'chatbots IA',
    'automatización de procesos',
  ],
  authors: [{ name: 'ScaleOps Automation' }],
  creator: 'ScaleOps Automation',
  publisher: 'ScaleOps Automation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://scaleops.com',
    siteName: 'ScaleOps Automation',
    title: 'ScaleOps Automation - Automatiza y Escala tu Negocio con IA',
    description: 'Libera 20 horas semanales con automatización inteligente. Chatbots, IA, WhatsApp, CRM y más. Consultoría gratis.',
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
    title: 'ScaleOps Automation - Automatización con IA',
    description: 'Automatiza WhatsApp, CRM y procesos. Recupera tiempo, aumenta ventas. Consultoría gratuita.',
    images: ['/twitter-card-home.jpg'],
    creator: '@scaleops',
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
    canonical: 'https://scaleops.com',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
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
      </body>
    </html>
  );
}