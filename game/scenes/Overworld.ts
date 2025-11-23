import Phaser from 'phaser';
import { SCENES, TILE_SIZE, PLAYER_SPEED } from '../config/gameConfig';
import { VirtualControls } from '../components/VirtualControls';
import { GameState } from '../managers/GameState';
import { createWildPokemon } from '../types/Pokemon';
import { DialogSystem } from '../components/DialogSystem';
import { Audio } from '../managers/AudioManager';

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

  private mapKey: string = 'madrid_start';
  private startPosition: { x: number; y: number } | null = null;

  private dialogSystem!: DialogSystem;
  private isPaused: boolean = false;

  constructor() {
    super({ key: SCENES.OVERWORLD });
  }

  init(data: { map?: string; x?: number; y?: number }) {
    this.mapKey = data.map || 'madrid_start';
    if (data.x !== undefined && data.y !== undefined) {
      this.startPosition = { x: data.x, y: data.y };
    } else {
      this.startPosition = null;
    }
  }

  create(): void {
    console.log(`[Overworld] Mundo creado: ${this.mapKey}`);
    Audio.setScene(this);
    Audio.playMusic('overworld-theme');

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

    // Inicializar sistema de diálogos
    this.dialogSystem = new DialogSystem(this);

    // Escuchar eventos de diálogo para pausar/reanudar
    this.events.on('dialog-start', () => {
      this.isPaused = true;
      if (this.player) {
        this.player.setVelocity(0);
        this.player.anims.stop();
      }
    });
    this.events.on('dialog-end', () => {
      this.isPaused = false;
    });

    // Configurar tecla de interacción
    if (this.input.keyboard) {
      this.input.keyboard.on('keydown-Z', () => this.handleInteraction());
      this.input.keyboard.on('keydown-SPACE', () => this.handleInteraction());
      this.input.keyboard.on('keydown-ENTER', () => this.openMenu());
    }
  }

  private openMenu(): void {
    if (this.isPaused) return;
    this.scene.pause();
    this.scene.launch(SCENES.MENU);
  }

  update(): void {
    if (this.isPaused || !this.player || !this.cursors) return;

    this.handlePlayerMovement();
    this.checkRandomEncounter();
    this.checkWarps();
    this.checkStoryEvents();
    this.updateDayNightCycle();
  }

  private updateDayNightCycle(): void {
    // Ciclo simple basado en la hora del sistema
    const hour = new Date().getHours();
    let tint = 0xFFFFFF; // Día

    if (hour >= 20 || hour < 6) {
      tint = 0x8888AA; // Noche (azulado oscuro)
    } else if (hour >= 18) {
      tint = 0xFFCC88; // Atardecer (anaranjado)
    }

    // Aplicar tinte al mapa (capas)
    if (this.map) {
      this.map.layers.forEach(layer => {
        const tilemapLayer = layer.tilemapLayer;
        if (tilemapLayer) {
          tilemapLayer.setTint(tint);
        }
      });
    }

    // Aplicar tinte al jugador
    if (this.player) {
      this.player.setTint(tint);
    }
  }

  private checkStoryEvents(): void {
    // Evento: Encuentro con Rival en Madrid (al intentar salir por el norte)
    if (this.mapKey === 'madrid_start' && !GameState.storyFlags.has('RIVAL_MET')) {
      const x = Math.floor(this.player.x / TILE_SIZE);
      const y = Math.floor(this.player.y / TILE_SIZE);

      // Coordenadas ficticias para el evento (ajustar según mapa)
      if (y < 10 && x > 10 && x < 20) {
        this.triggerRivalEncounter();
      }
    }
  }

  private triggerRivalEncounter(): void {
    this.isPaused = true;
    this.player.setVelocity(0);
    this.player.anims.stop();

    this.dialogSystem.show([
      "RIVAL: ¡Eh, tú!",
      "¡Espera un momento!",
      "¿Vas a ver al Profesor Galdós?",
      "¡Yo también! ¡Vamos a ver quién llega antes!"
    ], () => {
      GameState.storyFlags.add('RIVAL_MET');
      this.isPaused = false;
    });
  }

  private checkWarps(): void {
    const x = Math.floor(this.player.x / TILE_SIZE);
    const y = Math.floor(this.player.y / TILE_SIZE);

    // Warps hardcoded (Prototipo)
    if (this.mapKey === 'room_start') {
      // Salida de casa
      if (x === 5 && y === 9) {
        this.warpTo('madrid_start', 10 * TILE_SIZE, 11 * TILE_SIZE);
      }
    } else if (this.mapKey === 'madrid_start') {
      // Warp a Casa (ejemplo: puerta de casa)
      if (x === 10 && y === 10) {
        this.warpTo('room_start', 5 * TILE_SIZE, 8 * TILE_SIZE);
      }
      // Warp a Chamberí (ejemplo: borde norte)
      if (x === 20 && y === 0) {
        this.warpTo('chamberi', 20 * TILE_SIZE, 28 * TILE_SIZE);
      }
    } else if (this.mapKey === 'chamberi') {
      // Warp de vuelta a Madrid Centro
      if (x === 20 && y === 29) {
        this.warpTo('madrid_start', 20 * TILE_SIZE, 1 * TILE_SIZE);
      }
    }
  }

  private warpTo(mapKey: string, x: number, y: number): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.restart({ map: mapKey, x: x, y: y });
    });
  }

  private createMap(): void {
    // Crear mapa desde JSON
    this.map = this.make.tilemap({ key: this.mapKey });

    // Añadir tileset (nombre en Tiled, clave en Phaser)
    // Determinar qué tileset usar según el mapa
    let tilesetName = 'Overworld'; // Nombre en Tiled
    let tilesetKey = 'overworld-tileset'; // Clave en Phaser

    if (this.mapKey === 'room_start') {
      tilesetName = 'Inner'; // Nombre en Tiled (verificar en JSON si es posible, asumiendo 'Inner')
      tilesetKey = 'indoor-tileset';
    }

    // Intentar cargar el tileset
    let tileset = this.map.addTilesetImage(tilesetName, tilesetKey);

    // Fallback si el nombre en Tiled es diferente
    if (!tileset) {
      console.warn(`[Overworld] Tileset '${tilesetName}' no encontrado. Intentando con nombres alternativos...`);
      // Intentar con nombres comunes
      const commonNames = ['indoor_tileset', 'overworld_tileset', 'tileset', 'Inner', 'Overworld'];
      for (const name of commonNames) {
        tileset = this.map.addTilesetImage(name, tilesetKey);
        if (tileset) break;
      }
    }

    if (!tileset) {
      console.error(`[Overworld] CRITICAL: No se pudo cargar el tileset para el mapa ${this.mapKey}`);
      // Crear un tileset de fallback (basic-colors) para evitar crash
      tileset = this.map.addTilesetImage('basic_colors', 'basic-colors');
    }

    if (!tileset) return;

    // Crear capas (Asumiendo nombres estándar de Tiled)
    // Intentar encontrar capas por nombre
    const layers = this.map.layers.map(l => l.name);
    console.log(`[Overworld] Capas encontradas: ${layers.join(', ')}`);

    const groundLayer = this.map.createLayer('Ground', tileset, 0, 0) || this.map.createLayer(layers[0], tileset, 0, 0);
    const objectsLayer = this.map.createLayer('Objects', tileset, 0, 0);
    // const decorationLayer = this.map.createLayer('Decoration', tileset, 0, 0); // Optional

    // Configurar colisiones
    if (objectsLayer) {
      objectsLayer.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player, objectsLayer);
    }

    if (groundLayer) {
      groundLayer.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player, groundLayer);
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

    // Posición inicial
    let startX = width / 2;
    let startY = height / 2;

    if (this.startPosition) {
      startX = this.startPosition.x;
      startY = this.startPosition.y;
    } else if (this.map) {
      // Centro del mapa por defecto
      startX = this.map.widthInPixels / 2;
      startY = this.map.heightInPixels / 2;

      // Intentar buscar Spawn Point en el mapa
      const spawnPoint = this.map.findObject('Objects', obj => obj.name === 'SpawnPoint');
      if (spawnPoint) {
        startX = spawnPoint.x || startX;
        startY = spawnPoint.y || startY;
      }
    }

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
    if (!this.anims.exists('walk-down')) {
      this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Animación caminar hacia arriba
    if (!this.anims.exists('walk-up')) {
      this.anims.create({
        key: 'walk-up',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Animación caminar hacia la izquierda
    if (!this.anims.exists('walk-left')) {
      this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    // Animación caminar hacia la derecha
    if (!this.anims.exists('walk-right')) {
      this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });
    }
  }

  /**
   * Configura los controles del teclado y táctiles
   */
  private setupControls(): void {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

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
    if ((this.cursors && this.cursors.up.isDown) || virtualUp) {
      velocityY = -PLAYER_SPEED;
      this.currentDirection = 'up';
      moving = true;
    } else if ((this.cursors && this.cursors.down.isDown) || virtualDown) {
      velocityY = PLAYER_SPEED;
      this.currentDirection = 'down';
      moving = true;
    }

    // Movimiento horizontal (teclado o táctil)
    if ((this.cursors && this.cursors.left.isDown) || virtualLeft) {
      velocityX = -PLAYER_SPEED;
      this.currentDirection = 'left';
      moving = true;
    } else if ((this.cursors && this.cursors.right.isDown) || virtualRight) {
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
    // Esto es una simplificación, idealmente checking tile properties
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


  private handleInteraction(): void {
    if (this.isPaused) return;

    const { x, y } = this.player;
    let targetX = x;
    let targetY = y;

    // Calcular posición objetivo basada en la dirección
    switch (this.currentDirection) {
      case 'up': targetY -= TILE_SIZE; break;
      case 'down': targetY += TILE_SIZE; break;
      case 'left': targetX -= TILE_SIZE; break;
      case 'right': targetX += TILE_SIZE; break;
    }

    // Convertir a coordenadas de tile
    const tileX = Math.floor(targetX / TILE_SIZE);
    const tileY = Math.floor(targetY / TILE_SIZE);

    console.log(`[Overworld] Interacción en: ${tileX}, ${tileY} (${this.mapKey})`);

    // Lógica de interacción hardcoded (Prototipo)
    if (this.mapKey === 'room_start') {
      // Ejemplo: PC
      if (tileX === 1 && tileY === 1) {
        this.dialogSystem.show([
          "Es tu PC.",
          "Tiene instalado Linux Mint."
        ]);
        return;
      }
      // Ejemplo: Consola
      if (tileX === 2 && tileY === 1) {
        this.dialogSystem.show([
          "Es una Nintendo Switch.",
          "¡Estás jugando al Pokémon Escarlata!"
        ]);
        return;
      }
      // Mamá
      if (tileX === 5 && tileY === 4) { // Coordenada aproximada
        if (!GameState.storyFlags.has('MOM_TALKED')) {
          this.dialogSystem.show([
            "MAMÁ: ¡Hola cariño!",
            "El Profesor Galdós te estaba buscando.",
            "Deberías ir a su laboratorio en el centro."
          ], () => {
            GameState.storyFlags.add('MOM_TALKED');
          });
        } else {
          this.dialogSystem.show([
            "MAMÁ: ¡Ten cuidado fuera!",
            "Tus Pokémon se ven cansados, déjame curarlos."
          ], () => {
            GameState.healAllPokemon();
            this.dialogSystem.show(["(Tus Pokémon han sido curados)"]);
          });
        }
        return;
      }
    } else if (this.mapKey === 'madrid_start') {
      // Ejemplo: Cartel
      if (tileX === 10 && tileY === 10) { // Coordenada ficticia
        this.dialogSystem.show([
          "MADRID - KM 0",
          "Todas las carreteras empiezan aquí."
        ]);
        return;
      }
      // Tienda (NPC)
      if (tileX === 15 && tileY === 10) { // Coordenada ficticia
        this.dialogSystem.show([
          "VENDEDOR: ¡Hola!",
          "Tengo los mejores productos de Madrid.",
          "¿Quieres echar un vistazo?"
        ], () => {
          this.scene.pause();
          this.scene.launch(SCENES.SHOP);
        });
        return;
      }
    } else if (this.mapKey === 'chamberi') {
      if (tileX === 15 && tileY === 15) {
        this.dialogSystem.show(['GIMNASIO DE CHAMBERÍ', 'Líder: Carmencita', 'Tipo: Lucha']);
        return;
      } else {
        this.dialogSystem.show(['Estás en el distrito de Chamberí.', '¡Cuna del casticismo!']);
        return;
      }
    }

    // Si no hay interacción específica, buscar en la capa de objetos del mapa
    const tile = this.map?.getTileAt(tileX, tileY, true, 'Objects');
    if (tile && tile.properties && (tile.properties as any).message) {
      this.dialogSystem.show([(tile.properties as any).message]);
    }
  }
}
