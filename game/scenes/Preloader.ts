import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';

export default class Preloader extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private loadingText!: Phaser.GameObjects.Text;
  private percentText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SCENES.PRELOADER });
  }

  preload(): void {
    this.createLoadingScreen();
    this.loadAssets();
    this.setupLoadingEvents();
  }

  create(): void {
    console.log('[Preloader] Assets cargados, iniciando Title...');

    this.time.delayedCall(500, () => {
      this.scene.start(SCENES.TITLE);
    });
  }

  private createLoadingScreen(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Cargando...', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
    });
    this.loadingText.setOrigin(0.5);

    this.percentText = this.add.text(width / 2, height / 2, '0%', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
    });
    this.percentText.setOrigin(0.5);

    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(width / 2 - 160, height / 2 + 20, 320, 30);

    this.progressBar = this.add.graphics();
  }

  private loadAssets(): void {
    console.log('[Preloader] Cargando assets de Pokémon Madrid...');

    this.load.spritesheet('player', '/assets/sprites/player/character.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image('overworld-tileset', '/assets/tilesets/Overworld.png');
    this.load.image('tileset', '/assets/tilesets/tileset.png');
    this.load.image('indoor-tileset', '/assets/tilesets/Inner.png');

    this.load.spritesheet('npc', '/assets/sprites/npc/npc.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('objects', '/assets/sprites/objects/objects.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    for (let i = 1; i <= 9; i++) {
      this.load.image(`pokemon-front-${i}`, `/assets/sprites/pokemon/front/${i}.png`);
    }

    for (let i = 1; i <= 9; i++) {
      this.load.image(`pokemon-back-${i}`, `/assets/sprites/pokemon/back/${i}.png`);
    }

    this.load.image('pokemon-gatolegre-front', '/assets/sprites/pokemon/front/1.png');
    this.load.image('pokemon-gatolegre-back', '/assets/sprites/pokemon/back/1.png');

    this.load.image('pokemon-ursabon-front', '/assets/sprites/pokemon/front/2.png');
    this.load.image('pokemon-ursabon-back', '/assets/sprites/pokemon/back/2.png');

    this.load.image('pokemon-azulejin-front', '/assets/sprites/pokemon/front/3.png');
    this.load.image('pokemon-azulejin-back', '/assets/sprites/pokemon/back/3.png');

    this.load.image('arrow', '/assets/ui/arrow.png');

    console.log('[Preloader] Assets encolados para carga');
  }

  private setupLoadingEvents(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.load.on('progress', (value: number) => {
      this.progressBar.clear();
      this.progressBar.fillStyle(0x00ff00, 1);
      this.progressBar.fillRect(
        width / 2 - 150,
        height / 2 + 25,
        300 * value,
        20
      );
      this.percentText.setText(`${Math.floor(value * 100)}%`);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
    });
  }
}