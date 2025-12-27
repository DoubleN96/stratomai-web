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
  metadataBase: new URL('https://stratomai.com'),
  title: {
    default: 'Stratoma Interchange - Global Urea 46% Trading',
    template: '%s | Stratoma Interchange',
  },
  description: 'Premier intermediary for international Urea 46% and petrochemical trading. ISO 9001:2015 certified. SGS inspected. Secure SBLC/DLC transactions.',
  keywords: [
    'urea 46% trading',
    'commodities trading',
    'petrochemical derivatives',
    'international trade',
    'SBLC transactions',
    'DLC trading',
    'SGS inspection',
    'ISO 9001 certified',
    'urea granular',
    'urea prilled',
    'supply chain solutions',
    'ICPO trading',
    'commodity intermediary',
  ],
  authors: [{ name: 'Stratoma Interchange' }],
  creator: 'Stratoma Interchange',
  publisher: 'Ribon Real Estate Services SL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://stratomai.com',
    siteName: 'Stratoma Interchange',
    title: 'Stratoma Interchange - Global Urea 46% Trading',
    description: 'Premier intermediary for international Urea 46% and petrochemical trading. ISO 9001:2015 certified with SGS inspection.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stratoma Interchange - Global Commodities Trading',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stratoma Interchange - Global Urea 46% Trading',
    description: 'Premier intermediary for international Urea 46% and petrochemical trading. ISO 9001:2015 certified.',
    images: ['/twitter-image.jpg'],
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
    languages: {
      'en-US': 'https://stratomai.com',
      'es-ES': 'https://stratomai.com/es',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'business',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0066CC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#0066CC" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}