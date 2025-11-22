import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokémon Madrid - Jugar',
  description: 'Pokémon Madrid: Edición Castiza - GBA-style game',
};

export default function GameLayout({
  children,
}: {
  children: React.NodeNode;
}) {
  return children;
}