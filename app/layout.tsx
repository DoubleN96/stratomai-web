import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConsentBanner from '@/components/shared/ConsentBanner';

const GTM_ID = 'GTM-WW7CNFQN';
const GTM_GATEWAY_PATH = '/y44s';
// Keep in sync with CONSENT_KEY in components/shared/ConsentBanner.tsx. Not
// imported: that module is 'use client', and a value pulled from a client
// module into a Server Component is a client reference, not the string.
const CONSENT_KEY = 'stratomai_consent';

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
        alt: 'Stratoma AI - Automatización Empresarial con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratoma AI - Inteligencia Artificial en Madrid',
    description: 'Agencia de IA en Madrid. Chatbots, automatización y asistentes virtuales para empresas. Consultoría gratuita.',
    images: ['/og-image-home.jpg'],
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
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0b1326" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Stratoma AI",
              url: "https://stratomai.com",
              description: "Automatización empresarial con Inteligencia Artificial en Madrid",
              address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
              contactPoint: { "@type": "ContactPoint", telephone: "+34611031947", contactType: "sales" },
              sameAs: ["https://linkedin.com/company/stratomai", "https://x.com/stratomai"],
            }),
          }}
        />
        {/*
          Google Consent Mode defaults. A raw inline script on purpose: it is in
          the server HTML and runs during parse, so it is guaranteed to land
          before the afterInteractive GTM tag below. It also re-applies a stored
          acceptance, so a returning visitor is not denied for the first 500 ms.
          The banner (components/shared/ConsentBanner.tsx) only ever lifts this.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',personalization_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted',personalization_storage:'granted'})}}catch(e){}`,
          }}
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'${GTM_GATEWAY_PATH}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
        {/* Stratoma Branding */}
        <div className="fixed bottom-5 left-5 z-[100]">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200 text-[10px] text-gray-500 shadow-sm">
            <div className="font-semibold text-gray-900 mb-0.5">Desarrollado por</div>
            <div className="font-bold">Stratoma AI</div>
            <div className="mt-1 pt-1 border-t border-gray-100">+34 611 03 19 47</div>
          </div>
        </div>
        <FloatingWhatsApp />
        <ConsentBanner />
      </body>
    </html>
  );
}