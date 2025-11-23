import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';
import { GameState } from '../managers/GameState';
import { DialogSystem } from '../components/DialogSystem';

export default class Menu extends Phaser.Scene {
    private options: string[] = ['POKEDEX', 'POKEMON', 'MOCHILA', 'GUARDAR', 'SALIR'];
    private selectedIndex: number = 0;
    private menuContainer!: Phaser.GameObjects.Container;
    private optionTexts: Phaser.GameObjects.BitmapText[] = [];
    private dialogSystem!: DialogSystem;

    constructor() {
        super({ key: SCENES.MENU });
    }

    create(): void {
        console.log('[Menu] Menú abierto');

        // Fondo semitransparente
        const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);
        bg.setOrigin(0);

        this.createMenu();
        this.setupInput();

        this.dialogSystem = new DialogSystem(this);
    }

    private createMenu(): void {
        const { width, height } = this.cameras.main;
        const menuWidth = 100;
        const menuHeight = 120;
        const x = width - menuWidth - 10;
        const y = 10;

        this.menuContainer = this.add.container(x, y);

        // Fondo del menú
        const menuBg = this.add.rectangle(0, 0, menuWidth, menuHeight, 0xFFFFFF);
        menuBg.setOrigin(0);
        menuBg.setStrokeStyle(2, 0x333333);
        this.menuContainer.add(menuBg);

        // Opciones
        this.options.forEach((option, index) => {
            const text = this.add.bitmapText(10, 10 + (index * 20), 'pixel-font', option, 8);
            text.setTint(0x000000);
            this.optionTexts.push(text);
            this.menuContainer.add(text);
        });

        this.updateSelection();
    }

    private updateSelection(): void {
        this.optionTexts.forEach((text, index) => {
            text.setTint(index === this.selectedIndex ? 0xFF0000 : 0x000000);
            // Añadir cursor '>' si está seleccionado
            text.text = (index === this.selectedIndex ? '> ' : '  ') + this.options[index];
        });
    }

    private setupInput(): void {
        const cursors = this.input.keyboard!.createCursorKeys();
        const zKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        const xKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        const enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        const moveSelection = (direction: number) => {
            this.selectedIndex += direction;
            if (this.selectedIndex < 0) this.selectedIndex = this.options.length - 1;
            if (this.selectedIndex >= this.options.length) this.selectedIndex = 0;
            this.updateSelection();
        };

        cursors.up.on('down', () => moveSelection(-1));
        cursors.down.on('down', () => moveSelection(1));

        const selectOption = () => {
            const option = this.options[this.selectedIndex];
            this.handleOption(option);
        };

        zKey.on('down', selectOption);
        enterKey.on('down', selectOption);

        // Salir con X
        xKey.on('down', () => {
            this.closeMenu();
        });
    }

    private handleOption(option: string): void {
        switch (option) {
            case 'POKEDEX':
                this.dialogSystem.show(['Pokédex aún no implementada.']);
                break;
            case 'POKEMON':
                this.closeMenu();
                break;
        }
    }

    private closeMenu(): void {
        this.scene.stop();
        this.scene.resume(SCENES.OVERWORLD);
    }
}
