import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, Work_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Stratoma Interchange - Global Commodities Trading',
  description: 'Premier intermediary for international trade in Urea 46% and petrochemical derivatives. Reliable supply chain solutions for global markets.',
  keywords: 'commodities trading, urea 46%, petrochemicals, international trade, supply chain',
  openGraph: {
    title: 'Stratoma Interchange - Global Commodities Trading',
    description: 'Premier intermediary for international trade in Urea 46% and petrochemical derivatives.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${jetbrains.variable} ${workSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}