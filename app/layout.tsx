import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stratomai.com"),
  title: {
    default: "Stratomai - Agencia AI-First | Automatización Inteligente",
    template: "%s | Stratomai",
  },
  description:
    "Transformamos tu negocio con automatización inteligente. Generación de leads, SEO con IA, WhatsApp automation y workflows personalizados. Expertos en n8n, Claude AI y soluciones empresariales en Madrid.",
  keywords: [
    "automatización con IA",
    "agencia AI-First Madrid",
    "generación de leads automática",
    "SEO con inteligencia artificial",
    "WhatsApp automation Evolution API",
    "n8n workflows",
    "Claude AI",
    "automatización empresarial",
    "marketing automation",
    "chatbots inteligentes",
    "lead generation",
    "agencia digital Madrid",
    "automatización procesos",
  ],
  authors: [{ name: "Stratomai", url: "https://stratomai.com" }],
  creator: "Stratomai",
  publisher: "Stratomai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://stratomai.com",
    title: "Stratomai - Automatización Inteligente para Tu Negocio",
    description:
      "Agencia AI-First especializada en automatización empresarial. Generación de leads, SEO automático y workflows inteligentes que escalan tu negocio 24/7.",
    siteName: "Stratomai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stratomai - Agencia AI-First",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratomai - Agencia AI-First",
    description:
      "Automatización inteligente de procesos empresariales. Generación de leads, SEO con IA y workflows 24/7.",
    images: ["/og-image.png"],
    creator: "@stratomai",
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
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://stratomai.com",
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
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
