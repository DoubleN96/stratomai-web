'use client';

import { useEffect, useRef } from 'react';
import type Phaser from 'phaser';

interface PhaserGameProps {
  config: Phaser.Types.Core.GameConfig;
  onGameReady?: (game: Phaser.Game) => void;
}

export default function PhaserGame({ config, onGameReady }: PhaserGameProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initGame = async () => {
      const Phaser = (await import('phaser')).default;

      if (gameRef.current) return;

      const gameConfig: Phaser.Types.Core.GameConfig = {
        ...config,
        parent: containerRef.current || undefined,
      };

      const game = new Phaser.Game(gameConfig);
      gameRef.current = game;

      onGameReady?.(game);

      console.log('[PhaserGame] Juego inicializado correctamente');
    };

    initGame();

    return () => {
      if (gameRef.current) {
        console.log('[PhaserGame] Destruyendo instancia del juego');
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      id="game-container"
      className="flex items-center justify-center w-full h-full"
    />
  );
}