export const GAME_CONFIG = {
  title: 'Pokémon Madrid - Edición Castiza',
  version: '1.0.0',
  width: 240,
  height: 160,
  type: 'AUTO' as const,
  parent: 'game-container',
  backgroundColor: '#000000',
  scale: {
    mode: 2, // Phaser.Scale.FIT
    autoCenter: 1, // Phaser.Scale.CENTER_BOTH
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
    touch: true,
  },
  dom: {
    createContainer: true,
  },
} as const;

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
  export const GAME_CONFIG = {
    title: 'Pokémon Madrid - Edición Castiza',
    version: '1.0.0',
    width: 240,
    height: 160,
    type: 'AUTO' as const,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
      mode: 2, // Phaser.Scale.FIT
      autoCenter: 1, // Phaser.Scale.CENTER_BOTH
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
      touch: true,
    },
    dom: {
      createContainer: true,
    },
  } as const;

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

  export const SCENES = {
    BOOT: 'Boot',
    PRELOADER: 'Preloader',
    TITLE: 'Title',
    INTRO: 'Intro',
    OVERWORLD: 'Overworld',
    BATTLE: 'Battle',
    MENU: 'Menu',
    SHOP: 'Shop',
  } as const;