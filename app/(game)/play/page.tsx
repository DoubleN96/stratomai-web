'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type Phaser from 'phaser';

const PhaserGame = dynamic(() => import('@/components/game/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <div className="text-white text-2xl">Cargando juego...</div>
    </div>
  ),
});

export default function PlayPage() {
  const [gameConfig, setGameConfig] = useState<Phaser.Types.Core.GameConfig | null>(
    null
  );
  const [gameInstance, setGameInstance] = useState<Phaser.Game | null>(null);

  useEffect(() => {
    const loadGameConfig = async () => {
      const { createGameConfig } = await import('@/game');
      const config = await createGameConfig();
      setGameConfig(config);
    };

    loadGameConfig();
  }, []);

  const handleGameReady = (game: Phaser.Game) => {
    setGameInstance(game);
    console.log('[PlayPage] Instancia del juego disponible:', game);
  };

  if (!gameConfig) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="text-white text-2xl">Inicializando...</div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-4xl">
        <PhaserGame config={gameConfig} onGameReady={handleGameReady} />
      </div>

      {process.env.NODE_ENV === 'development' && gameInstance && (
        <div className="mt-4 p-4 bg-gray-800 text-white text-sm rounded">
          <p>🎮 Modo Desarrollo</p>
          <p>Instancia del juego: {gameInstance ? '✓ Activa' : '✗ Inactiva'}</p>
        </div>
      )}
    </main>
  );
}