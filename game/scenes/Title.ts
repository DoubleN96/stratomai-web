import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';

/**
 * Title Scene - Pantalla de título con temática de Madrid
 * 
 * Características:
 * - Gradiente de cielo al atardecer (naranja, morado)
 * - Silueta del skyline de Madrid
 * - Partículas cayendo (hojas de madroño)
 * - Logo "POKÉMON MADRID"
 * - Texto parpadeante "PRESS START"
 */
export default class Title extends Phaser.Scene {
  private startText?: Phaser.GameObjects.Text;
  private particles?: Phaser.GameObjects.Particles.ParticleEmitter;
  private startKey?: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: SCENES.TITLE });
  }

  create(): void {
    console.log('[Title] Pantalla de título cargada');

    this.createBackground();
    this.createTitle();
    this.createPressStart();
    this.createMadronioParticles();
    this.setupInput();
  }

  /**
   * Crea el fondo con gradiente de cielo de Madrid al atardecer
   */
  private createBackground(): void {
    const { width, height } = this.cameras.main;

    // Gradiente de cielo (arriba: naranja claro, abajo: morado oscuro)
    const sky = this.add.graphics();
    const gradient = sky.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#FF7F50'); // Coral (atardecer)
    gradient.addColorStop(0.5, '#FF6B9D'); // Rosa-naranja
    gradient.addColorStop(1, '#4A235A'); // Morado oscuro

    sky.fillGradientStyle(
      Phaser.Display.Color.HexStringToColor('#FF7F50').color,
      Phaser.Display.Color.HexStringToColor('#FF7F50').color,
      Phaser.Display.Color.HexStringToColor('#FF6B9D').color,
      Phaser.Display.Color.HexStringToColor('#4A235A').color
    );
    sky.fillRect(0, 0, width, height);

    // Silueta del skyline de Madrid (simplificada)
    this.createMadridSkyline();
  }

  /**
   * Crea una silueta simplificada del skyline de Madrid
   * (Cuatro Torres, etc.)
   */
  private createMadridSkyline(): void {
    const { width, height } = this.cameras.main;
    const skyline = this.add.graphics();
    skyline.fillStyle(0x1a1a1a, 0.7); // Gris oscuro semi-transparente

    // Torre 1 (más alta)
    skyline.fillRect(10, 80, 15, 80);

    // Torre 2
    skyline.fillRect(30, 85, 15, 75);

    // Torre 3
    skyline.fillRect(50, 90, 15, 70);

    // Torre 4 (más baja)
    skyline.fillRect(70, 95, 15, 65);

    // Edificios más pequeños
    for (let i = 0; i < 10; i++) {
      const x = 90 + i * 15;
      const buildingHeight = Phaser.Math.Between(30, 60);
      skyline.fillRect(x, height - buildingHeight, 12, buildingHeight);
    }
  }

  /**
   * Crea el logo del juego
   */
  private createTitle(): void {
    const { width } = this.cameras.main;

    // "POKÉMON" en amarillo
    const pokemonText = this.add.text(width / 2, 30, 'POKÉMON', {
      fontFamily: 'Arial Black',
      fontSize: '24px',
      color: '#FFCC00',
      stroke: '#0066CC',
      strokeThickness: 4,
    });
    pokemonText.setOrigin(0.5);

    // "MADRID" en rojo
    const madridText = this.add.text(width / 2, 55, 'MADRID', {
      fontFamily: 'Arial Black',
      fontSize: '20px',
      color: '#E60026',
      stroke: '#FFFFFF',
      strokeThickness: 3,
    });
    madridText.setOrigin(0.5);

    // Subtítulo "Edición Castiza"
    const subtitleText = this.add.text(width / 2, 75, 'Edición Castiza', {
      fontFamily: 'Arial',
      fontSize: '10px',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 2,
    });
    subtitleText.setOrigin(0.5);
  }

  /**
   * Crea el texto parpadeante "PRESS START"
   */
  private createPressStart(): void {
    const { width, height } = this.cameras.main;

    this.startText = this.add.text(width / 2, height - 30, 'PRESS START', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 2,
    });
    this.startText.setOrigin(0.5);

    // Parpadeo
    this.tweens.add({
      targets: this.startText,
      alpha: { from: 1, to: 0.3 },
      duration: 800,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   * Crea partículas cayendo (hojas de madroño)
   */
  private createMadronioParticles(): void {
    const { width, height } = this.cameras.main;

    // Crear partículas simples como puntos
    const particles = this.add.particles(0, -10, 'arrow', {
      speed: { min: 10, max: 30 },
      angle: { min: 85, max: 95 },
      scale: { start: 0.3, end: 0.1 },
      alpha: { start: 0.8, end: 0.2 },
      lifespan: 4000,
      frequency: 200,
      emitZone: {
        type: 'edge',
        source: new Phaser.Geom.Rectangle(0, 0, width, 0),
        quantity: 1,
      },
      tint: 0xFF6B6B, // Rojo madroño
    });
  }

  /**
   * Configura los controles de entrada
   */
  private setupInput(): void {
    // Enter o Espacio para comenzar
    this.input.keyboard?.once('keydown-ENTER', this.startGame, this);
    this.input.keyboard?.once('keydown-SPACE', this.startGame, this);

    // Click del mouse
    this.input.once('pointerdown', this.startGame, this);
  }

  /**
   * Inicia el juego (transición a Overworld)
   */
  private startGame(): void {
    console.log('[Title] Iniciando juego...');

    // Fade out
    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start(SCENES.OVERWORLD);
      }
    );
  }
}
