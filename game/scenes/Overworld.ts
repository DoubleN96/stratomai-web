import Phaser from 'phaser';
import { SCENES, TILE_SIZE, PLAYER_SPEED } from '../config/gameConfig';
import { VirtualControls } from '../components/VirtualControls';

/**
 * Overworld Scene - Escena principal del juego
 *
 * Características:
 * - Mapa del mundo (tilemap)
 * - Jugador con animaciones de caminar (4 direcciones)
 * - Sistema de colisiones
 * - Cámara que sigue al jugador
 * - NPCs y objetos interactivos
 * - Controles táctiles para móvil
 */
export default class Overworld extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private virtualControls?: VirtualControls;
  private map?: Phaser.Tilemaps.Tilemap;
  private currentDirection: 'down' | 'up' | 'left' | 'right' = 'down';

  constructor() {
    super({ key: SCENES.OVERWORLD });
  }

  create(): void {
    console.log('[Overworld] Mundo creado');

    // Por ahora, mapa temporal con imagen de fondo
    this.createTemporaryMap();

    // Crear jugador
    this.createPlayer();

    // Configurar controles
    this.setupControls();

    // Configurar cámara
    this.setupCamera();
  }

  update(): void {
    if (!this.player || !this.cursors) return;

    this.handlePlayerMovement();
  }

  /**
   * Crea un mapa temporal (hasta que tengamos el tilemap JSON)
   */
  private createTemporaryMap(): void {
    const { width, height } = this.cameras.main;

    // Fondo verde (placeholder para el mapa)
    const bg = this.add.graphics();
    bg.fillStyle(0x90C850, 1); // Verde césped GBA
    bg.fillRect(0, 0, width * 3, height * 3); // Mapa 3x más grande que la pantalla

    // Grid de tiles (visual)
    bg.lineStyle(1, 0x7AA840, 0.3);
    for (let x = 0; x < width * 3; x += TILE_SIZE) {
      bg.lineBetween(x, 0, x, height * 3);
    }
    for (let y = 0; y < height * 3; y += TILE_SIZE) {
      bg.lineBetween(0, y, width * 3, y);
    }

    // Texto indicativo
    const text = this.add.text(width / 2, 20, 'Mapa Temporal - Use Flechas para Moverse', {
      fontFamily: 'Arial',
      fontSize: '10px',
      color: '#FFFFFF',
      stroke: '#000000',
      strokeThickness: 3,
    });
    text.setOrigin(0.5);
    text.setScrollFactor(0); // Fijo en pantalla
  }

  /**
   * Crea el sprite del jugador con animaciones
   */
  private createPlayer(): void {
    const { width, height } = this.cameras.main;

    // Crear sprite del jugador en el centro
    this.player = this.physics.add.sprite(
      width / 2,
      height / 2,
      'player'
    );

    // Configurar física
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, width * 3, height * 3);

    // Crear animaciones
    this.createPlayerAnimations();

    // Animación inicial (mirando hacia abajo, idle)
    this.player.anims.play('walk-down', true);
    this.player.anims.stop();
  }

  /**
   * Crea las animaciones del jugador (caminar en 4 direcciones)
   */
  private createPlayerAnimations(): void {
    // Animación caminar hacia abajo
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación caminar hacia arriba
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación caminar hacia la izquierda
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    // Animación caminar hacia la derecha
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  /**
   * Configura los controles del teclado y táctiles
   */
  private setupControls(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Crear controles virtuales para dispositivos móviles
    const { width, height } = this.cameras.main;
    this.virtualControls = new VirtualControls({
      scene: this,
      x: 20,
      y: height - 140,
      size: 120,
      alpha: 0.6,
    });
  }

  /**
   * Configura la cámara para seguir al jugador
   */
  private setupCamera(): void {
    const { width, height } = this.cameras.main;

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, width * 3, height * 3);
  }

  /**
   * Maneja el movimiento del jugador basado en input (teclado o táctil)
   */
  private handlePlayerMovement(): void {
    this.player.setVelocity(0);

    let moving = false;
    let velocityX = 0;
    let velocityY = 0;

    // Verificar input de controles virtuales (móvil)
    const virtualUp = this.virtualControls?.isUp() || false;
    const virtualDown = this.virtualControls?.isDown() || false;
    const virtualLeft = this.virtualControls?.isLeft() || false;
    const virtualRight = this.virtualControls?.isRight() || false;

    // Movimiento vertical (teclado o táctil)
    if (this.cursors.up.isDown || virtualUp) {
      velocityY = -PLAYER_SPEED;
      this.currentDirection = 'up';
      moving = true;
    } else if (this.cursors.down.isDown || virtualDown) {
      velocityY = PLAYER_SPEED;
      this.currentDirection = 'down';
      moving = true;
    }

    // Movimiento horizontal (teclado o táctil)
    if (this.cursors.left.isDown || virtualLeft) {
      velocityX = -PLAYER_SPEED;
      this.currentDirection = 'left';
      moving = true;
    } else if (this.cursors.right.isDown || virtualRight) {
      velocityX = PLAYER_SPEED;
      this.currentDirection = 'right';
      moving = true;
    }

    // Normalizar velocidad diagonal
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= Math.SQRT1_2; // Aproximadamente 0.707
      velocityY *= Math.SQRT1_2;
    }

    this.player.setVelocity(velocityX, velocityY);

    // Actualizar animación
    if (moving) {
      this.player.anims.play(`walk-${this.currentDirection}`, true);
    } else {
      this.player.anims.stop();
      // Frame idle basado en la última dirección
      const idleFrames = {
        down: 1,
        up: 10,
        left: 4,
        right: 7,
      };
      this.player.setFrame(idleFrames[this.currentDirection]);
    }
  }
}
