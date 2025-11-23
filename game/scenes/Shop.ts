import Phaser from 'phaser';
import { SCENES } from '../config/gameConfig';
import { GameState } from '../managers/GameState';
import { DialogSystem } from '../components/DialogSystem';

export default class Shop extends Phaser.Scene {
    private items = [
        { name: 'Pokéball', price: 200, key: 'pokeballs' },
        { name: 'Poción', price: 300, key: 'potions' },
        { name: 'Superpoción', price: 700, key: 'superPotions' },
        { name: 'Ultra Ball', price: 1200, key: 'ultraBalls' },
        { name: 'SALIR', price: 0, key: 'exit' }
    ];
    private selectedIndex: number = 0;
    private menuContainer!: Phaser.GameObjects.Container;
    private optionTexts: Phaser.GameObjects.BitmapText[] = [];
    private dialogSystem!: DialogSystem;

    constructor() {
        super({ key: SCENES.SHOP });
    }

    create(): void {
        console.log('[Shop] Tienda abierta');

        // Fondo semitransparente
        const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.7);
        bg.setOrigin(0);

        this.createMenu();
        this.setupInput();

        this.dialogSystem = new DialogSystem(this);
        this.dialogSystem.show(['¡Bienvenido! ¿En qué puedo ayudarte?']);
    }

    private createMenu(): void {
        const { width, height } = this.cameras.main;
        const menuWidth = 160;
        const menuHeight = 140;
        const x = (width - menuWidth) / 2;
        const y = (height - menuHeight) / 2;

        this.menuContainer = this.add.container(x, y);

        // Fondo del menú
        const menuBg = this.add.rectangle(0, 0, menuWidth, menuHeight, 0xFFFFFF);
        menuBg.setOrigin(0);
        menuBg.setStrokeStyle(2, 0x333333);
        this.menuContainer.add(menuBg);

        // Título
        const title = this.add.bitmapText(10, 5, 'pixel-font', `Dinero: ${GameState.money} Ptas`, 8);
        title.setTint(0x000000);
        this.menuContainer.add(title);

        // Opciones
        this.items.forEach((item, index) => {
            const textStr = item.key === 'exit' ? item.name : `${item.name} - ${item.price}`;
            const text = this.add.bitmapText(10, 25 + (index * 20), 'pixel-font', textStr, 8);
            text.setTint(0x000000);
            this.optionTexts.push(text);
            this.menuContainer.add(text);
        });

        this.updateSelection();
    }

    private updateSelection(): void {
        this.optionTexts.forEach((text, index) => {
            text.setTint(index === this.selectedIndex ? 0xFF0000 : 0x000000);
            const item = this.items[index];
            const textStr = item.key === 'exit' ? item.name : `${item.name} - ${item.price}`;
            text.text = (index === this.selectedIndex ? '> ' : '  ') + textStr;
        });
    }

    private setupInput(): void {
        const cursors = this.input.keyboard!.createCursorKeys();
        const zKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        const xKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        const moveSelection = (direction: number) => {
            this.selectedIndex += direction;
            if (this.selectedIndex < 0) this.selectedIndex = this.items.length - 1;
            if (this.selectedIndex >= this.items.length) this.selectedIndex = 0;
            this.updateSelection();
        };

        cursors.up.on('down', () => moveSelection(-1));
        cursors.down.on('down', () => moveSelection(1));

        const selectOption = () => {
            const item = this.items[this.selectedIndex];
            this.handleOption(item);
        };

        zKey.on('down', selectOption);

        // Salir con X
        xKey.on('down', () => {
            this.closeShop();
        });
    }

    private handleOption(item: any): void {
        if (item.key === 'exit') {
            this.closeShop();
            return;
        }

        if (GameState.money >= item.price) {
            GameState.money -= item.price;
            GameState.items[item.key as keyof typeof GameState.items]++;
            this.dialogSystem.show([`¡Has comprado ${item.name}!`], () => {
                // Actualizar dinero en UI
                // Re-renderizar menú completo o actualizar texto (simplificado: re-crear escena o actualizar texto manual)
                this.scene.restart();
            });
        } else {
            this.dialogSystem.show(['No tienes suficiente dinero.']);
        }
    }

    private closeShop(): void {
        this.scene.stop();
        this.scene.resume(SCENES.OVERWORLD);
    }
}
