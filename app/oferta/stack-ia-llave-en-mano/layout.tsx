import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Tu propio operador de IA en tu servidor | 990 € + 500 €/mes | Stratoma AI",
  },
  description:
    "Stack de IA completo en TU servidor, con TU cuenta y TU bot de Telegram. Montado y verificado en 24-48 h. 990 € + 500 €/mes, IVA aparte. Sin lock-in.",
  keywords: [
    "operador de IA para empresas",
    "agentes de IA en tu propio servidor",
    "automatizar negocio con IA y Telegram",
    "implantación stack IA self-hosted",
    "n8n Supabase Paperclip autoalojado",
    "automatización con IA para pymes España",
    "bot de Telegram que gestiona tu empresa",
    "IA sin lock-in servidor propio",
    "Claude Code para negocios",
    "consultoría automatización IA 990 euros",
    "implantación agentes IA Madrid",
    "automatización con IA Madrid",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://stratomai.com/oferta/stack-ia-llave-en-mano",
    siteName: "Stratoma AI",
    title: "Tu propio operador de IA, en tu servidor y a tu nombre",
    description:
      "En 24-48 h desde tus accesos: el stack corriendo, nueve agentes, 35 habilidades y tu bot contestándote desde el móvil. 990 € + 500 €/mes, IVA aparte.",
    // Sin `images`: los ficheros /og-*.jpg no existen en public/ y una URL rota
    // deja la tarjeta en blanco. Volver a declararla cuando exista el archivo.
  },
  twitter: {
    // `summary` (y no `summary_large_image`) mientras no haya imagen real.
    card: "summary",
    title: "Tu propio operador de IA — 990 € + 500 €/mes, IVA aparte",
    description:
      "Stack de IA en TU servidor, operado desde Telegram. Código público, todo a tu nombre.",
    creator: "@stratomai",
  },
  alternates: {
    canonical: "https://stratomai.com/oferta/stack-ia-llave-en-mano",
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

export default function StackIaLlaveEnManoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
