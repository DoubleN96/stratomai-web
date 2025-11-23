import type Phaser from 'phaser';
import { GAME_CONFIG } from './config/gameConfig';
import Boot from './scenes/Boot';
import Preloader from './scenes/Preloader';
import Title from './scenes/Title';
import Intro from './scenes/Intro';
import Overworld from './scenes/Overworld';
import Battle from './scenes/Battle';
import Menu from './scenes/Menu';
import Shop from './scenes/Shop';

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
      // No fixed zoom - scales automatically for mobile/desktop
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
      Intro,
      Overworld,
      Battle,
      Menu,
      Shop,
    ],
  };
};

export { GAME_CONFIG, SCENES, MADRID_PALETTE, TILE_SIZE } from './config/gameConfig';
export { Boot, Preloader, Title, Intro, Overworld, Battle, Menu, Shop };