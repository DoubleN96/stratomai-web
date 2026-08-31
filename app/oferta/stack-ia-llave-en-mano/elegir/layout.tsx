import type { Metadata } from "next";

// La página de al lado es un componente de cliente (`"use client"`), y Next no
// deja exportar `metadata` desde uno. Mismo apaño que en
// app/oferta/stack-ia-llave-en-mano/layout.tsx: el layout pone la metadata.
export const metadata: Metadata = {
  title: {
    absolute: "Elige tu modalidad del stack de IA | Stratoma AI",
  },
  description:
    "Tres formas de montar el mismo stack de IA en tu servidor: Done for you (990 € + 500 €/mes), guiada (690 € + 350 €/mes) o solo el coste del servidor. Elige antes de pagar.",
  alternates: {
    canonical: "https://stratomai.com/oferta/stack-ia-llave-en-mano/elegir",
  },
  robots: { index: true, follow: true },
};

export default function ElegirModalidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
