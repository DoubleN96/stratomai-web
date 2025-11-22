import Phaser from 'phaser';
import { SCENES, TILE_SIZE, PLAYER_SPEED } from '../config/gameConfig';
import { VirtualControls } from '../components/VirtualControls';
import { GameState } from '../managers/GameState';
import { createWildPokemon } from '../types/Pokemon';

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

  // Sistema de encuentros aleatorios
  private stepsSinceLastEncounter: number = 0;
  private stepsToNextEncounter: number = 0;
  private lastPlayerPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    super({ key: SCENES.OVERWORLD });
  }

  create(): void {
    console.log('[Overworld] Mundo creado');

    // Inicializar GameState si es nuevo juego
    if (GameState.party.length === 0) {
      console.log('[Overworld] Inicializando nuevo juego...');
      GameState.initializeGame(1); // Gatolegre como inicial
    }

    // Cargar mapa desde Tiled
    this.createMap();

    // Crear jugador
    this.createPlayer();

    // Configurar controles
    this.setupControls();

    // Configurar cámara
    this.setupCamera();

    // Inicializar sistema de encuentros
    this.resetEncounterSteps();
  }

  update(): void {
    if (!this.player || !this.cursors) return;

    this.handlePlayerMovement();
    this.checkRandomEncounter();
  }

  private createMap(): void {
    // Crear mapa desde JSON
    this.map = this.make.tilemap({ key: 'madrid_start' });

    // Añadir tileset (nombre en Tiled, clave en Phaser)
    const tileset = this.map.addTilesetImage('overworld_tileset', 'overworld-tileset');

    if (!tileset) {
      console.error('[Overworld] No se pudo cargar el tileset');
      return;
    }

    // Crear capas
    const groundLayer = this.map.createLayer('Ground', tileset, 0, 0);
    const objectsLayer = this.map.createLayer('Objects', tileset, 0, 0);

    // Configurar colisiones
    if (objectsLayer) {
      objectsLayer.setCollisionByProperty({ collides: true });
      // También podemos configurar colisiones por ID de tile si es necesario
    }

    // Si hay capa de colisiones dedicada (Object Layer en Tiled)
    const collisionLayer = this.map.getObjectLayer('Collisions');
    if (collisionLayer) {
      const obstacles = this.physics.add.staticGroup();
      collisionLayer.objects.forEach(obj => {
        const rect = this.add.rectangle(
          (obj.x || 0) + (obj.width || 0) / 2,
          (obj.y || 0) + (obj.height || 0) / 2,
          obj.width,
          obj.height
        );
        this.physics.add.existing(rect, true);
        obstacles.add(rect);
      });
      this.physics.add.collider(this.player, obstacles);
    }

    // Límites del mundo
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  }

  /**
   * Crea el sprite del jugador con animaciones
   */
  private createPlayer(): void {
    const { width, height } = this.cameras.main;

    // Posición inicial (idealmente vendría del mapa o GameState)
    const startX = this.map ? this.map.widthInPixels / 2 : width / 2;
    const startY = this.map ? this.map.heightInPixels / 2 : height / 2;

    // Crear sprite del jugador
    this.player = this.physics.add.sprite(startX, startY, 'player');

    // Configurar física
    this.player.setCollideWorldBounds(true);
    // Hitbox más pequeña para los pies
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setSize(12, 8);
    body.setOffset(2, 8);

    // Crear animaciones
    this.createPlayerAnimations();

    // Animación inicial (mirando hacia abajo, idle)
    this.player.anims.play('walk-down', true);
    this.player.anims.stop();
    this.player.setFrame(1);
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

    // Si estamos en móvil, mostramos controles virtuales
    // Detectamos móvil si hay soporte táctil
    if (this.sys.game.device.input.touch) {
      this.virtualControls = new VirtualControls({
        scene: this,
        x: 20, // Izquierda
        y: this.scale.height - 70, // Abajo
        size: 60, // Tamaño del D-Pad
        alpha: 0.5,
      });
    }
  }

  /**
   * Configura la cámara para seguir al jugador
   */
  private setupCamera(): void {
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1); // Zoom normal GBA
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

  /**
   * Resetea el contador de pasos para encuentros
   */
  private resetEncounterSteps(): void {
    // Entre 5 y 15 pasos para el próximo encuentro
    this.stepsToNextEncounter = Phaser.Math.Between(5, 15);
    this.stepsSinceLastEncounter = 0;
    this.lastPlayerPosition = { x: this.player.x, y: this.player.y };
  }

  /**
   * Verifica si debe ocurrir un encuentro aleatorio
   */
  private checkRandomEncounter(): void {
    // Solo en hierba (área verde)
    const currentX = Math.floor(this.player.x);
    const currentY = Math.floor(this.player.y);

    // Detectar si el jugador se movió (cambió de tile)
    const movedX = Math.abs(currentX - this.lastPlayerPosition.x) >= TILE_SIZE;
    const movedY = Math.abs(currentY - this.lastPlayerPosition.y) >= TILE_SIZE;

    if (movedX || movedY) {
      this.lastPlayerPosition = { x: currentX, y: currentY };
      this.stepsSinceLastEncounter++;

      // console.log(`[Overworld] Pasos: ${this.stepsSinceLastEncounter}/${this.stepsToNextEncounter}`);

      if (this.stepsSinceLastEncounter >= this.stepsToNextEncounter) {
        this.triggerWildEncounter();
      }
    }
  }

  /**
   * Inicia un encuentro con un Pokémon salvaje
   */
  private triggerWildEncounter(): void {
    console.log('[Overworld] ¡Encuentro Pokémon!');

    // Resetear contador
    this.resetEncounterSteps();

    // Elegir Pokémon salvaje aleatorio (1-9)
    const wildPokemonId = Phaser.Math.Between(1, 9);
    const wildLevel = Phaser.Math.Between(2, 7);

    // Crear Pokémon salvaje
    const wildPokemon = createWildPokemon(wildPokemonId, wildLevel);

    // Registrar en Pokédex como visto
    GameState.seePokemon(wildPokemonId);

    // Obtener Pokémon del jugador
    const playerPokemon = GameState.getLeadPokemon();

    if (!playerPokemon) {
      console.error('[Overworld] No hay Pokémon disponible para batalla');
      return;
    }

    // Transición a batalla con efecto fade
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.BATTLE, {
        playerPokemon,
        enemyPokemon: wildPokemon,
      });
    });
  }
}
