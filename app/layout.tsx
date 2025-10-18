import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Stratomai - Agencia AI-First",
    template: "%s | Stratomai",
  },
  description:
    "Plataforma integral para automatización de procesos y generación de leads con IA. Soluciones de SEO, WhatsApp automation y workflows inteligentes.",
  keywords: [
    "automatización",
    "IA",
    "generación de leads",
    "SEO",
    "WhatsApp automation",
    "n8n",
    "agencia digital",
    "Madrid",
  ],
  authors: [{ name: "Stratomai" }],
  creator: "Stratomai",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://stratomai.com",
    title: "Stratomai - Agencia AI-First",
    description:
      "Automatización inteligente de procesos empresariales y generación de leads con IA",
    siteName: "Stratomai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratomai - Agencia AI-First",
    description:
      "Automatización inteligente de procesos empresariales y generación de leads con IA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
