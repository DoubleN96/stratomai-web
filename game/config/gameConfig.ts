export const GAME_CONFIG = {
  title: 'Pokémon Madrid - Edición Castiza',
  version: '1.0.0',
  width: 240,
  height: 160,
  type: 'AUTO' as const,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: 2, // Phaser.Scale.FIT - scales to fit viewport while maintaining aspect ratio
    autoCenter: 1, // Phaser.Scale.CENTER_BOTH - centers the game canvas
    // No fixed zoom - let it scale automatically for mobile
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: process.env.NODE_ENV === 'development',
    },
  },
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true,
  },
  fps: {
    target: 60,
    forceSetTimeOut: false,
  },
  input: {
    touch: true, // Enable touch input for mobile
  },
} as const;

export const SCENES = {
  BOOT: 'BootScene',
  PRELOADER: 'PreloaderScene',
  TITLE: 'TitleScene',
  INTRO: 'IntroScene',
  OVERWORLD: 'OverworldScene',
  BATTLE: 'BattleScene',
  MENU: 'MenuScene',
  BAG: 'BagScene',
  POKEMON: 'PokemonScene',
  POKEDEX: 'PokedexScene',
} as const;

export type SceneKey = (typeof SCENES)[keyof typeof SCENES];

export const MADRID_PALETTE = {
  SKY_DAY: 0x87CEEB,
  SKY_SUNSET: 0xFF7F50,
  SKY_NIGHT: 0x191970,
  BRICK: 0xCD5C5C,
  LIMESTONE: 0xF5F5DC,
  METRO_BLUE: 0x0047AB,
  METRO_WHITE: 0xFFFFF0,
  RETIRO_GREEN: 0x50C878,
  GRASS_WILD: 0x228B22,
  WATER: 0x40E0D0,
  ASPHALT: 0x696969,
  GOLD: 0xFFD700,
  SILVER: 0xC0C0C0,
} as const;

export const TILE_SIZE = 16;
export const PLAYER_SPEED = 80;
export const FRAME_RATE = 60;