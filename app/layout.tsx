import type { Metadata, Viewport } from 'next';
import './globals.css';

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}