import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload(): void {
    console.log('[Boot] Inicializando juego...');
  }

  create(): void {
    console.log('[Boot] Juego inicializado, cargando Preloader...');

    this.setupGlobalSettings();

    this.scene.start(SCENES.PRELOADER);
  }

  private setupGlobalSettings(): void {
    this.input.mouse?.disableContextMenu();
  }
}