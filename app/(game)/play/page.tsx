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
    <main className="flex flex-col h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Game Boy SP Screen Area (Top 65%) */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Screen Border (GBA SP style) */}
        <div className="relative rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl">
          {/* Inner screen bezel */}
          <div className="rounded bg-black p-2">
            <PhaserGame config={gameConfig} onGameReady={handleGameReady} />
          </div>

          {/* Power LED */}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500"></div>
          </div>
        </div>
      </div>

      {/* GBA SP Controls Area (Bottom 35%) */}
      <div className="h-[35vh] bg-gradient-to-b from-indigo-900 to-purple-900 border-t-4 border-purple-700 relative">
        {/* Virtual controls will be positioned here by VirtualControls component */}
        {/* The component auto-shows on touch devices */}

        {/* GBA SP Logo */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="text-purple-300 text-xs font-bold tracking-widest opacity-50">
            GAME BOY ADVANCE SP
          </div>
        </div>

        {/* Keyboard hint for desktop */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-purple-300 text-xs opacity-50 hidden md:block">
          Use arrow keys to move
        </div>
      </div>

      {/* Dev info */}
      {process.env.NODE_ENV === 'development' && gameInstance && (
        <div className="absolute top-2 left-2 p-2 bg-black bg-opacity-75 text-white text-xs rounded">
          <p>🎮 Dev Mode</p>
          <p>Game: {gameInstance ? '✓' : '✗'}</p>
        </div>
      )}
    </main>
  );
}