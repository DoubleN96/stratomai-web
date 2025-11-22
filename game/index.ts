import type Phaser from 'phaser';
import { GAME_CONFIG } from './config/gameConfig';
import Boot from './scenes/Boot';
import Preloader from './scenes/Preloader';
import Title from './scenes/Title';
import Overworld from './scenes/Overworld';

export const createGameConfig = async (): Promise<Phaser.Types.Core.GameConfig> => {
  const Phaser = (await import('phaser')).default;

  return {
    ...GAME_CONFIG,
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_CONFIG.width,
      height: GAME_CONFIG.height,
      zoom: GAME_CONFIG.scale.zoom,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: process.env.NODE_ENV === 'development',
      },
    },
    scene: [
      Boot,
      Preloader,
      Title,
      Overworld,
    ],
  };
};

export { GAME_CONFIG, SCENES, MADRID_PALETTE, TILE_SIZE } from './config/gameConfig';
export { Boot, Preloader, Title, Overworld };