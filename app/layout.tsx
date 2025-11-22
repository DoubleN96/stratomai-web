import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokémon Madrid: Edición Castiza',
  description: 'Juego de Pokémon estilo GBA ambientado en Madrid - Next.js + Phaser',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}