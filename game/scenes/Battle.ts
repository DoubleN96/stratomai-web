// Sprite del jugador (abajo izquierda)
this.playerSprite = this.add.sprite(
  width * 0.25,
  height * 0.75,
  this.playerPokemon.spriteKey.back
);
// this.playerSprite.setScale(1);
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
   * Crea menú de acciones
   */
  private createActionMenu(): void {
  const { width, height } = this.cameras.main;

  // Posicionar menú sobre la caja de diálogo (derecha)
  const menuX = width - 100;
  const menuY = height - 45;

  this.actionMenu = this.add.container(menuX, menuY);
  this.actionMenu.setVisible(false);

  // Fondo del menú (opcional, si no está integrado en el dialog box)
  // const bg = this.add.rectangle(0, 0, 100, 50, 0xFFFFFF);
  // this.actionMenu.add(bg);

  // Opciones
  const options = ['LUCHA', 'MOCHILA', 'POKEMON', 'HUIR'];
  const optionTexts: Phaser.GameObjects.BitmapText[] = [];

  options.forEach((option, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;

    const text = this.add.bitmapText(col * 50, row * 15, 'pixel-font', option, 8);
    text.setTint(0x000000);

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

  const menuX = 20; // Izquierda
  const menuY = height - 45;

  this.moveMenu = this.add.container(menuX, menuY);
  this.moveMenu.setVisible(false);

  // Crear textos de movimientos
  const moveTexts: Phaser.GameObjects.BitmapText[] = [];

  this.playerPokemon.moves.forEach((move, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;

    const text = this.add.bitmapText(col * 80, row * 15, 'pixel-font', move.name, 8);
    text.setTint(0x000000);

    moveTexts.push(text);
    this.moveMenu.add(text);
  });

  this.moveMenu.setData('moves', moveTexts);
}

  /**
   * Muestra menú de acciones
   */
  private showActionMenu(): void {
  this.currentMenu = 'action';
  this.selectedAction = 0;
  this.actionMenu.setVisible(true);
  this.moveMenu.setVisible(false);

  // Mostrar mensaje estático o vacío para dejar ver el menú
  this.dialogSystem.show(['¿Qué hará?'], undefined, false); // false = no esperar input para cerrar

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
  this.updateMenuSelection();
  this.canInput = true;
}

  /**
   * Actualiza selección visual del menú
   */
  private updateMenuSelection(): void {
  if(this.currentMenu === 'action') {
  const options = this.actionMenu.getData('options') as Phaser.GameObjects.BitmapText[];
  options.forEach((text, index) => {
    // Indicar selección con color o cursor
    text.setTint(index === this.selectedAction ? 0xFF0000 : 0x000000);
  });
} else if (this.currentMenu === 'move') {
  const moves = this.moveMenu.getData('moves') as Phaser.GameObjects.BitmapText[];
  moves.forEach((text, index) => {
    text.setTint(index === this.selectedMove ? 0xFF0000 : 0x000000);
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
  const moveCursor = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!this.canInput) return;
    this.moveSelection(direction);
  };

  cursors.up.on('down', () => moveCursor('up'));
  cursors.down.on('down', () => moveCursor('down'));
  cursors.left.on('down', () => moveCursor('left'));
  cursors.right.on('down', () => moveCursor('right'));
}

  /**
   * Mueve selección en menú
   */
  private moveSelection(direction: 'up' | 'down' | 'left' | 'right'): void {
  if(this.currentMenu === 'action') {
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
  const actions = ['LUCHA', 'MOCHILA', 'POKEMON', 'HUIR'];
  const action = actions[this.selectedAction];

  this.canInput = false;

  switch(action) {
      case 'LUCHA':
  this.showMoveMenu();
  break;
  case 'MOCHILA':
  this.dialogSystem.show(['No hay items disponibles.'], () => this.showActionMenu());
  break;
  case 'POKEMON':
  this.dialogSystem.show(['No hay otros Pokémon.'], () => this.showActionMenu());
  break;
  case 'HUIR':
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

  this.dialogSystem.show([`¡${this.playerPokemon.name} usó ${move.name}!`], () => {
    const { damage, effectiveness } = calculateDamage(this.playerPokemon, this.enemyPokemon, move);

    // Aplicar daño
    const newHP = Math.max(0, this.enemyPokemon.stats.hp - damage);
    this.enemyHUD.updateHP(newHP);

    // Mensaje de efectividad
    let effectMsg = '';
    if (effectiveness > 1) effectMsg = '¡Es super efectivo!';
    if (effectiveness < 1) effectMsg = 'No es muy efectivo...';
    if (effectiveness === 0) effectMsg = 'No afecta...';

    const nextStep = () => {
      if (effectMsg) {
        this.dialogSystem.show([effectMsg], () => this.checkBattleEnd());
      } else {
        this.checkBattleEnd();
      }
    };

    // Esperar animación de HP
    this.time.delayedCall(500, nextStep);
  });
}

  /**
   * Ejecuta ataque del enemigo
   */
  private executeEnemyAttack(): void {
  // Enemigo elige movimiento aleatorio
  const move = Phaser.Math.RND.pick(this.enemyPokemon.moves);

  this.dialogSystem.show([`¡${this.enemyPokemon.name} usó ${move.name}!`], () => {
    const { damage, effectiveness } = calculateDamage(this.enemyPokemon, this.playerPokemon, move);

    // Aplicar daño
    const newHP = Math.max(0, this.playerPokemon.stats.hp - damage);
    this.playerHUD.updateHP(newHP);

    // Mensaje de efectividad
    let effectMsg = '';
    if (effectiveness > 1) effectMsg = '¡Es super efectivo!';
    if (effectiveness < 1) effectMsg = 'No es muy efectivo...';
    if (effectiveness === 0) effectMsg = 'No afecta...';

    const nextStep = () => {
      if (effectMsg) {
        this.dialogSystem.show([effectMsg], () => this.checkBattleEnd());
      } else {
        this.checkBattleEnd();
      }
    };

    // Esperar animación de HP
    this.time.delayedCall(500, nextStep);
  });
}

  /**
   */
  private checkBattleEnd(): void {
  if(this.enemyPokemon.stats.hp === 0) {
  this.battleState = 'win';
  this.dialogSystem.show([`¡${this.enemyPokemon.name} se debilitó!`, `¡${this.playerPokemon.name} ganó!`], () => {
    this.gainExperience();
  });
} else if (this.playerPokemon.stats.hp === 0) {
  this.battleState = 'lose';
  this.dialogSystem.show([`¡${this.playerPokemon.name} se debilitó!`, 'No hay más Pokémon. ¡Perdiste!'], () => {
    this.endBattle(false);
  });
} else {
  // Si era turno del jugador, ahora va el enemigo
  if (this.battleState === 'player_turn') {
    this.battleState = 'enemy_turn';
    this.time.delayedCall(500, () => this.executeEnemyAttack());
  } else {
    // Turno del jugador
    this.battleState = 'player_turn';
    this.showActionMenu();
  }
}
  }

  /**
   * Huir de la batalla
   */
  private runFromBattle(): void {
  this.dialogSystem.show(['¡Escapaste con éxito!'], () => {
    this.endBattle(false);
  });
}

  /**
   * Ganar experiencia
   */
  private gainExperience(): void {
  const expGain = Math.floor((this.enemyPokemon.stats.level * 10) / 7); // Fórmula simple
  this.playerPokemon.stats.exp += expGain;

  this.dialogSystem.show([`¡${this.playerPokemon.name} ganó ${expGain} puntos de EXP!`], () => {
    // Verificar nivel
    if (this.playerPokemon.stats.exp >= this.playerPokemon.stats.expToNext) {
      this.levelUp();
    } else {
      this.endBattle(true);
    }
  });
}

  /**
   * Subir de nivel
   */
  private levelUp(): void {
  this.playerPokemon.stats.level++;
  this.playerPokemon.stats.exp = 0;
  this.playerPokemon.stats.expToNext = Math.pow(this.playerPokemon.stats.level, 3); // Cúbica

  // Aumentar stats (simplificado)
  this.playerPokemon.stats.maxHP += 5;
  this.playerPokemon.stats.attack += 2;
  this.playerPokemon.stats.defense += 2;
  this.playerPokemon.stats.speed += 2;

  // Curar al subir de nivel
  this.playerPokemon.stats.hp = this.playerPokemon.stats.maxHP;

  this.dialogSystem.show([
    `¡${this.playerPokemon.name} subió al nivel ${this.playerPokemon.stats.level}!`,
    `¡Sus estadísticas aumentaron!`
  ], () => {
    this.checkEvolution();
  });
}

  private checkEvolution(): void {
  if(this.playerPokemon.evolutions) {
  const evolution = this.playerPokemon.evolutions.find(e => this.playerPokemon.stats.level >= e.level);
  if (evolution) {
    // Lógica de evolución simplificada
    this.dialogSystem.show([
      `¡Anda! ¡${this.playerPokemon.name} está evolucionando!`,
      `(Evolución a ID ${evolution.targetId} pendiente de implementación completa)`
    ], () => {
      this.endBattle(true);
    });
    return;
  }
}
this.endBattle(true);
  }

  /**
   * Termina la batalla
   */
  private endBattle(won: boolean): void {
  this.cameras.main.fadeOut(500, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start(SCENES.OVERWORLD);
  });
}
}
