import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';
import type { Pokemon, Move } from '../types/Pokemon';
import { calculateDamage } from '../types/Pokemon';

/**
 * Battle Scene - Escena de batalla Pokémon
 *
 * Características:
 * - Sistema de turnos
 * - HP bars animadas
 * - Menú de acciones (Fight, Bag, Pokemon, Run)
 * - Selección de movimientos
 * - Cálculo de daño con efectividad de tipos
 * - Animaciones de ataques
 * - Sistema de captura con Pokéballs
 */
export default class Battle extends Phaser.Scene {
  private playerPokemon!: Pokemon;
  private enemyPokemon!: Pokemon;

  private playerSprite!: Phaser.GameObjects.Sprite;
  private enemySprite!: Phaser.GameObjects.Sprite;

  private playerHPBar!: Phaser.GameObjects.Graphics;
  private enemyHPBar!: Phaser.GameObjects.Graphics;

  private playerHPText!: Phaser.GameObjects.Text;
  private enemyHPText!: Phaser.GameObjects.Text;

  private hpNumTexts: Map<string, Phaser.GameObjects.Text> = new Map();

  private dialogBox!: Phaser.GameObjects.Image;
  private dialogText!: Phaser.GameObjects.Text;

  private actionMenu!: Phaser.GameObjects.Container;
  private moveMenu!: Phaser.GameObjects.Container;

  private currentMenu: 'action' | 'move' | 'none' = 'none';
  private selectedAction: number = 0;
  private selectedMove: number = 0;

  private battleState: 'start' | 'player_turn' | 'enemy_turn' | 'player_attack' | 'enemy_attack' | 'win' | 'lose' | 'caught' | 'run' = 'start';

  private canInput: boolean = false;

  constructor() {
    super({ key: SCENES.BATTLE });
  }

  init(data: { playerPokemon: Pokemon; enemyPokemon: Pokemon }) {
    this.playerPokemon = data.playerPokemon;
    this.enemyPokemon = data.enemyPokemon;
  }

  create(): void {
    console.log('[Battle] Iniciando batalla');
    console.log('[Battle] Player:', this.playerPokemon.name, 'Lv.', this.playerPokemon.stats.level);
    console.log('[Battle] Enemy:', this.enemyPokemon.name, 'Lv.', this.enemyPokemon.stats.level);

    this.createBackground();
    this.createPokemonSprites();
    this.createHPBars();
    this.createDialogBox();
    this.createActionMenu();
    this.createMoveMenu();

    this.setupInput();

    // Iniciar batalla
    this.time.delayedCall(500, () => {
      this.showMessage(`¡Un ${this.enemyPokemon.name} salvaje apareció!`, () => {
        this.showMessage(`¡Adelante, ${this.playerPokemon.name}!`, () => {
          this.battleState = 'player_turn';
          this.showActionMenu();
        });
      });
    });
  }

  update(): void {
    // Actualizar lógica de batalla si es necesario
  }

  /**
   * Crea el fondo de batalla
   */
  private createBackground(): void {
    const { width, height } = this.cameras.main;

    // Fondo de hierba (placeholder)
    const bg = this.add.graphics();
    bg.fillStyle(0x88CC88, 1);
    bg.fillRect(0, 0, width, height / 2);

    // Área de jugador
    const playerArea = this.add.graphics();
    playerArea.fillStyle(0x66AA66, 1);
    playerArea.fillRect(0, height / 2, width, height / 2);
  }

  /**
   * Crea los sprites de Pokémon
   */
  private createPokemonSprites(): void {
    const { width, height } = this.cameras.main;

    // Sprite del enemigo (arriba derecha)
    this.enemySprite = this.add.sprite(
      width * 0.75,
      height * 0.3,
      this.enemyPokemon.spriteKey.front
    );
    this.enemySprite.setScale(3);
    this.enemySprite.setAlpha(0);

    // Animación de entrada enemigo
    this.tweens.add({
      targets: this.enemySprite,
      alpha: 1,
      duration: 500,
      ease: 'Power2',
    });

    // Sprite del jugador (abajo izquierda)
    this.playerSprite = this.add.sprite(
      width * 0.25,
      height * 0.7,
      this.playerPokemon.spriteKey.back
    );
    this.playerSprite.setScale(3);
    this.playerSprite.setAlpha(0);

    // Animación de entrada jugador
    this.time.delayedCall(300, () => {
      this.tweens.add({
        targets: this.playerSprite,
        alpha: 1,
        duration: 500,
        ease: 'Power2',
      });
    });
  }

  /**
   * Crea las barras de HP
   */
  private createHPBars(): void {
    const { width, height } = this.cameras.main;

    // HP Bar del enemigo
    this.enemyHPBar = this.add.graphics();
    this.updateHPBar(this.enemyHPBar, width * 0.55, height * 0.1, this.enemyPokemon);

    // Nombre y nivel del enemigo
    this.enemyHPText = this.add.text(
      width * 0.55,
      height * 0.08,
      `${this.enemyPokemon.name} Lv.${this.enemyPokemon.stats.level}`,
      {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#000000',
      }
    );

    // HP Bar del jugador
    this.playerHPBar = this.add.graphics();
    this.updateHPBar(this.playerHPBar, width * 0.1, height * 0.5, this.playerPokemon);

    // Nombre y nivel del jugador
    this.playerHPText = this.add.text(
      width * 0.1,
      height * 0.48,
      `${this.playerPokemon.name} Lv.${this.playerPokemon.stats.level}`,
      {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#000000',
      }
    );
  }

  /**
   * Actualiza barra de HP
   */
  private updateHPBar(graphics: Phaser.GameObjects.Graphics, x: number, y: number, pokemon: Pokemon): void {
    graphics.clear();

    // Fondo de la barra
    graphics.fillStyle(0xF8F8F8, 1);
    graphics.fillRoundedRect(x, y, 100, 10, 4);

    // Borde
    graphics.lineStyle(2, 0x000000, 1);
    graphics.strokeRoundedRect(x, y, 100, 10, 4);

    // HP actual
    const hpPercentage = pokemon.stats.hp / pokemon.stats.maxHP;
    const hpWidth = 96 * hpPercentage;

    let hpColor = 0x00FF00; // Verde
    if (hpPercentage < 0.5) hpColor = 0xFFFF00; // Amarillo
    if (hpPercentage < 0.2) hpColor = 0xFF0000; // Rojo

    graphics.fillStyle(hpColor, 1);
    graphics.fillRoundedRect(x + 2, y + 2, hpWidth, 6, 2);

    // HP numérico
    const hpText = `${pokemon.stats.hp}/${pokemon.stats.maxHP}`;
    const key = `${x}_${y}`;

    if (!this.hpNumTexts.has(key)) {
      const text = this.add.text(x, y + 12, hpText, {
        fontFamily: 'Arial',
        fontSize: '10px',
        color: '#000000',
      });
      this.hpNumTexts.set(key, text);
    } else {
      const existingText = this.hpNumTexts.get(key);
      if (existingText) {
        existingText.setText(hpText);
      }
    }
  }

  /**
   * Crea la caja de diálogo
   */
  private createDialogBox(): void {
    const { width, height } = this.cameras.main;

    // Caja de diálogo
    const dialogBg = this.add.graphics();
    dialogBg.fillStyle(0xFFFFFF, 0.9);
    dialogBg.fillRoundedRect(10, height - 80, width - 20, 70, 8);
    dialogBg.lineStyle(3, 0x000000, 1);
    dialogBg.strokeRoundedRect(10, height - 80, width - 20, 70, 8);

    // Texto de diálogo
    this.dialogText = this.add.text(20, height - 70, '', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#000000',
      wordWrap: { width: width - 50 },
    });
  }

  /**
   * Crea menú de acciones
   */
  private createActionMenu(): void {
    const { width, height } = this.cameras.main;

    const menuX = width - 140;
    const menuY = height - 70;

    this.actionMenu = this.add.container(menuX, menuY);
    this.actionMenu.setVisible(false);

    // Opciones
    const options = ['FIGHT', 'BAG', 'POKEMON', 'RUN'];
    const optionTexts: Phaser.GameObjects.Text[] = [];

    options.forEach((option, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;

      const text = this.add.text(col * 60, row * 25, option, {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#000000',
      });

      optionTexts.push(text);
      this.actionMenu.add(text);
    });

    this.actionMenu.setData('options', optionTexts);
  }

  /**
   * Crea menú de movimientos
   */
  private createMoveMenu(): void {
    const { width, height } = this.cameras.main;

    const menuX = width - 140;
    const menuY = height - 70;

    this.moveMenu = this.add.container(menuX, menuY);
    this.moveMenu.setVisible(false);

    // Crear textos de movimientos
    const moveTexts: Phaser.GameObjects.Text[] = [];

    this.playerPokemon.moves.forEach((move, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;

      const text = this.add.text(col * 60, row * 25, move.name, {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#000000',
      });

      moveTexts.push(text);
      this.moveMenu.add(text);
    });

    this.moveMenu.setData('moves', moveTexts);
  }

  /**
   * Muestra mensaje en caja de diálogo
   */
  private showMessage(message: string, callback?: () => void): void {
    this.canInput = false;
    this.dialogText.setText(message);

    // Auto-cerrar después de 2 segundos
    this.time.delayedCall(2000, () => {
      if (callback) callback();
      this.canInput = true;
    });
  }

  /**
   * Muestra menú de acciones
   */
  private showActionMenu(): void {
    this.currentMenu = 'action';
    this.selectedAction = 0;
    this.actionMenu.setVisible(true);
    this.moveMenu.setVisible(false);
    this.dialogText.setText('¿Qué debería hacer?');
    this.updateMenuSelection();
    this.canInput = true;
  }

  /**
   * Muestra menú de movimientos
   */
  private showMoveMenu(): void {
    this.currentMenu = 'move';
    this.selectedMove = 0;
    this.actionMenu.setVisible(false);
    this.moveMenu.setVisible(true);
    this.dialogText.setText('Elige un movimiento');
    this.updateMenuSelection();
    this.canInput = true;
  }

  /**
   * Actualiza selección visual del menú
   */
  private updateMenuSelection(): void {
    if (this.currentMenu === 'action') {
      const options = this.actionMenu.getData('options') as Phaser.GameObjects.Text[];
      options.forEach((text, index) => {
        text.setColor(index === this.selectedAction ? '#FF0000' : '#000000');
      });
    } else if (this.currentMenu === 'move') {
      const moves = this.moveMenu.getData('moves') as Phaser.GameObjects.Text[];
      moves.forEach((text, index) => {
        text.setColor(index === this.selectedMove ? '#FF0000' : '#000000');
      });
    }
  }

  /**
   * Configura controles
   */
  private setupInput(): void {
    const cursors = this.input.keyboard!.createCursorKeys();
    const zKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    const xKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    // Z = Confirmar
    zKey.on('down', () => {
      if (!this.canInput) return;

      if (this.currentMenu === 'action') {
        this.handleActionSelection();
      } else if (this.currentMenu === 'move') {
        this.handleMoveSelection();
      }
    });

    // X = Cancelar
    xKey.on('down', () => {
      if (!this.canInput) return;

      if (this.currentMenu === 'move') {
        this.showActionMenu();
      }
    });

    // Flechas
    cursors.up!.on('down', () => {
      if (!this.canInput) return;
      this.moveSelection('up');
    });

    cursors.down!.on('down', () => {
      if (!this.canInput) return;
      this.moveSelection('down');
    });

    cursors.left!.on('down', () => {
      if (!this.canInput) return;
      this.moveSelection('left');
    });

    cursors.right!.on('down', () => {
      if (!this.canInput) return;
      this.moveSelection('right');
    });
  }

  /**
   * Mueve selección en menú
   */
  private moveSelection(direction: 'up' | 'down' | 'left' | 'right'): void {
    if (this.currentMenu === 'action') {
      const maxOptions = 4;
      if (direction === 'up') this.selectedAction = Math.max(0, this.selectedAction - 2);
      if (direction === 'down') this.selectedAction = Math.min(maxOptions - 1, this.selectedAction + 2);
      if (direction === 'left') this.selectedAction = Math.max(0, this.selectedAction - 1);
      if (direction === 'right') this.selectedAction = Math.min(maxOptions - 1, this.selectedAction + 1);
    } else if (this.currentMenu === 'move') {
      const maxMoves = this.playerPokemon.moves.length;
      if (direction === 'up') this.selectedMove = Math.max(0, this.selectedMove - 2);
      if (direction === 'down') this.selectedMove = Math.min(maxMoves - 1, this.selectedMove + 2);
      if (direction === 'left') this.selectedMove = Math.max(0, this.selectedMove - 1);
      if (direction === 'right') this.selectedMove = Math.min(maxMoves - 1, this.selectedMove + 1);
    }

    this.updateMenuSelection();
  }

  /**
   * Maneja selección del menú de acciones
   */
  private handleActionSelection(): void {
    const actions = ['FIGHT', 'BAG', 'POKEMON', 'RUN'];
    const action = actions[this.selectedAction];

    this.canInput = false;

    switch (action) {
      case 'FIGHT':
        this.showMoveMenu();
        break;
      case 'BAG':
        this.showMessage('No hay items disponibles.', () => this.showActionMenu());
        break;
      case 'POKEMON':
        this.showMessage('No hay otros Pokémon.', () => this.showActionMenu());
        break;
      case 'RUN':
        this.runFromBattle();
        break;
    }
  }

  /**
   * Maneja selección de movimiento
   */
  private handleMoveSelection(): void {
    const move = this.playerPokemon.moves[this.selectedMove];
    this.executePlayerAttack(move);
  }

  /**
   * Ejecuta ataque del jugador
   */
  private executePlayerAttack(move: Move): void {
    this.currentMenu = 'none';
    this.actionMenu.setVisible(false);
    this.moveMenu.setVisible(false);

    this.showMessage(`${this.playerPokemon.name} usó ${move.name}!`, () => {
      const { damage, effectiveness } = calculateDamage(this.playerPokemon, this.enemyPokemon, move);

      // Aplicar daño
      this.enemyPokemon.stats.hp = Math.max(0, this.enemyPokemon.stats.hp - damage);

      // Actualizar HP bar
      const { width, height } = this.cameras.main;
      this.updateHPBar(this.enemyHPBar, width * 0.55, height * 0.1, this.enemyPokemon);

      // Mensaje de efectividad
      let effectMsg = '';
      if (effectiveness > 1) effectMsg = '¡Es super efectivo!';
      if (effectiveness < 1) effectMsg = 'No es muy efectivo...';
      if (effectiveness === 0) effectMsg = 'No afecta...';

      if (effectMsg) {
        this.time.delayedCall(1000, () => {
          this.showMessage(effectMsg, () => this.checkBattleEnd());
        });
      } else {
        this.time.delayedCall(1000, () => this.checkBattleEnd());
      }
    });
  }

  /**
   * Ejecuta ataque del enemigo
   */
  private executeEnemyAttack(): void {
    // Enemigo elige movimiento aleatorio
    const move = Phaser.Math.RND.pick(this.enemyPokemon.moves);

    this.showMessage(`${this.enemyPokemon.name} usó ${move.name}!`, () => {
      const { damage, effectiveness } = calculateDamage(this.enemyPokemon, this.playerPokemon, move);

      // Aplicar daño
      this.playerPokemon.stats.hp = Math.max(0, this.playerPokemon.stats.hp - damage);

      // Actualizar HP bar
      const { width, height } = this.cameras.main;
      this.updateHPBar(this.playerHPBar, width * 0.1, height * 0.5, this.playerPokemon);

      // Mensaje de efectividad
      let effectMsg = '';
      if (effectiveness > 1) effectMsg = '¡Es super efectivo!';
      if (effectiveness < 1) effectMsg = 'No es muy efectivo...';
      if (effectiveness === 0) effectMsg = 'No afecta...';

      if (effectMsg) {
        this.time.delayedCall(1000, () => {
          this.showMessage(effectMsg, () => this.checkBattleEnd());
        });
      } else {
        this.time.delayedCall(1000, () => this.checkBattleEnd());
      }
    });
  }

  /**
   * Verifica si la batalla terminó
   */
  private checkBattleEnd(): void {
    if (this.enemyPokemon.stats.hp === 0) {
      this.battleState = 'win';
      this.showMessage(`¡${this.enemyPokemon.name} se debilitó!`, () => {
        this.showMessage(`¡${this.playerPokemon.name} ganó!`, () => {
          this.endBattle(true);
        });
      });
    } else if (this.playerPokemon.stats.hp === 0) {
      this.battleState = 'lose';
      this.showMessage(`¡${this.playerPokemon.name} se debilitó!`, () => {
        this.showMessage('No hay más Pokémon. ¡Perdiste!', () => {
          this.endBattle(false);
        });
      });
    } else {
      // Turno del enemigo
      this.time.delayedCall(1000, () => {
        this.executeEnemyAttack();
      });
    }
  }

  /**
   * Huir de la batalla
   */
  private runFromBattle(): void {
    this.showMessage('¡Escapaste con éxito!', () => {
      this.endBattle(false);
    });
  }

  /**
   * Termina la batalla
   */
  private endBattle(won: boolean): void {
    this.time.delayedCall(1000, () => {
      this.scene.start(SCENES.OVERWORLD);
    });
  }
}
