import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';

export default class Title extends Phaser.Scene {
  private startText!: Phaser.GameObjects.Text;
  private titleText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SCENES.TITLE });
  }

  create(): void {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

    // Title Text
    this.titleText = this.add.text(width / 2, height / 3, 'POKÉMON\nMADRID', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 3 + 30, 'EDICIÓN CASTIZA', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#FFA500',
      align: 'center'
    }).setOrigin(0.5);

    // Press Start Text
    this.startText = this.add.text(width / 2, height * 0.7, 'PULSA START', {
      fontFamily: 'Arial',
      fontSize: '10px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Blink effect
    this.tweens.add({
      targets: this.startText,
      alpha: 0,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Input
    this.input.keyboard?.once('keydown-ENTER', this.startGame, this);
    this.input.keyboard?.once('keydown-SPACE', this.startGame, this);
    this.input.keyboard?.once('keydown-Z', this.startGame, this);
    this.input.once('pointerdown', this.startGame, this);
  }

  private startGame(): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(SCENES.INTRO);
    });
  }
}
