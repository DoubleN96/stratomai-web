import Phaser from 'phaser';
import { SCENES, MADRID_PALETTE } from '../config/gameConfig';
import { GameState } from '../managers/GameState';

export default class Intro extends Phaser.Scene {
    private dialogBox!: Phaser.GameObjects.Sprite;
    private dialogText!: Phaser.GameObjects.Text;
    private professorSprite!: Phaser.GameObjects.Sprite;
    private playerSprite!: Phaser.GameObjects.Sprite;
    private rivalSprite!: Phaser.GameObjects.Sprite;

    private currentStep: number = 0;
    private textIndex: number = 0;
    private currentDialog: string[] = [];
    private isTyping: boolean = false;
    private canAdvance: boolean = true;

    // Gender Selection
    private genderSelectionContainer!: Phaser.GameObjects.Container;
    private selectedGender: 'boy' | 'girl' = 'boy';
    private boySprite!: Phaser.GameObjects.Sprite;
    private girlSprite!: Phaser.GameObjects.Sprite;
    private selectionCursor!: Phaser.GameObjects.Image;

    // Name Input
    private nameInputContainer!: Phaser.GameObjects.Container;
    private nameText!: Phaser.GameObjects.Text;
    private currentName: string = '';
    private keyboardKeys: Phaser.GameObjects.Text[][] = [];
    private selectedKeyRow: number = 0;
    private selectedKeyCol: number = 0;
    private readonly KEYBOARD_LAYOUT = [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
        ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
        ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '],
        ['DEL', 'END']
    ];

    constructor() {
        super({ key: SCENES.INTRO });
    }

    create(): void {
        console.log('[Intro] Iniciando secuencia de introducción');

        this.createBackground();
        this.createDialogBox();

        // Start the sequence
        this.startProfessorIntro();
    }

    private createBackground(): void {
        const { width, height } = this.cameras.main;

        // Simple gradient background
        const bg = this.add.graphics();
        bg.fillGradientStyle(0xE6E6FA, 0xE6E6FA, 0xFFFFFF, 0xFFFFFF, 1);
        bg.fillRect(0, 0, width, height);
    }

    private createDialogBox(): void {
        const { width, height } = this.cameras.main;

        // Usar sprite de caja de diálogo (9-slice si fuera necesario, pero aquí escalamos simple)
        this.dialogBox = this.add.sprite(width / 2, height - 25, 'battle-dialog');
        this.dialogBox.setDisplaySize(width - 10, 45);

        // Texto normal
        this.dialogText = this.add.text(20, height - 40, '', {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#000000',
            wordWrap: { width: width - 40 }
        });
    }

    private showDialog(lines: string[], callback?: () => void): void {
        this.currentDialog = lines;
        this.textIndex = 0;
        this.isTyping = true;
        this.canAdvance = false;

        // Clear previous text
        this.dialogText.setText('');

        // Start typing effect
        this.time.addEvent({
            delay: 30,
            callback: () => {
                if (this.textIndex < lines[0].length) {
                    this.dialogText.setText(lines[0].substring(0, this.textIndex + 1));
                    this.textIndex++;
                } else {
                    this.isTyping = false;
                    this.canAdvance = true;

                    // Wait for input to show next line or finish
                    const advance = () => {
                        if (lines.length > 1) {
                            this.showDialog(lines.slice(1), callback);
                        } else {
                            if (callback) callback();
                        }
                    };

                    this.input.keyboard?.once('keydown-Z', advance);
                    this.input.keyboard?.once('keydown-ENTER', advance);
                    this.input.keyboard?.once('keydown-SPACE', advance);
                    this.input.once('pointerdown', advance);
                }
            },
            repeat: lines[0].length - 1
        });
    }

    // --- SEQUENCE STEPS ---

    private startProfessorIntro(): void {
        const { width, height } = this.cameras.main;

        // Professor Sprite
        // Usar frame específico si es spritesheet, o imagen si es imagen única
        // Asumiendo 'npc' es spritesheet, frame 0 podría ser el profesor o placeholder
        this.professorSprite = this.add.sprite(width / 2, height / 2 - 20, 'npc', 0);
        this.professorSprite.setScale(2);
        this.professorSprite.setAlpha(0);

        this.tweens.add({
            targets: this.professorSprite,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.showDialog([
                    "HOLA! BIENVENIDO AL MUNDO",
                    "DE LOS POKEMON DE MADRID!"
                ], () => {
                    this.showDialog([
                        "MI NOMBRE ES GALDOS.",
                        "PERO LA GENTE ME LLAMA",
                        "EL PROFESOR POKEMON!"
                    ], () => {
                        this.showDialog([
                            "ESTE MUNDO ESTA HABITADO",
                            "POR CRIATURAS LLAMADAS POKEMON."
                        ], () => {
                            this.startGenderSelection();
                        });
                    });
                });
            }
        });
    }

    private startGenderSelection(): void {
        this.showDialog(["PERO ANTES DE CONTINUAR...", "CUENTAME SOBRE TI!", "ERES CHICO O CHICA?"], () => {
            this.createGenderSelectionUI();
        });
    }

    private createGenderSelectionUI(): void {
        const { width, height } = this.cameras.main;

        this.professorSprite.setVisible(false);
        this.dialogBox.setVisible(false);
        this.dialogText.setVisible(false);

        this.genderSelectionContainer = this.add.container(0, 0);

        // Boy Option
        this.boySprite = this.add.sprite(width * 0.3, height / 2, 'player', 1); // Frame 1 (down)
        this.boySprite.setScale(2);

        const boyText = this.add.text(width * 0.3, height / 2 + 30, 'CHICO', { fontFamily: 'monospace', fontSize: '16px' }).setOrigin(0.5);

        // Girl Option
        this.girlSprite = this.add.sprite(width * 0.7, height / 2, 'player', 1); // Same sprite for now
        this.girlSprite.setScale(2);
        this.girlSprite.setTint(0xFFB6C1); // Tint to differentiate

        const girlText = this.add.text(width * 0.7, height / 2 + 30, 'CHICA', { fontFamily: 'monospace', fontSize: '16px' }).setOrigin(0.5);

        this.genderSelectionContainer.add([this.boySprite, boyText, this.girlSprite, girlText]);

        // Cursor
        this.selectionCursor = this.add.image(0, 0, 'arrow');
        this.selectionCursor.setRotation(Math.PI / 2); // Point down
        this.updateGenderCursor();
        this.genderSelectionContainer.add(this.selectionCursor);

        // Input
        this.input.keyboard?.on('keydown-LEFT', () => {
            this.selectedGender = 'boy';
            this.updateGenderCursor();
        });

        this.input.keyboard?.on('keydown-RIGHT', () => {
            this.selectedGender = 'girl';
            this.updateGenderCursor();
        });

        const confirm = () => this.confirmGender();
        this.input.keyboard?.once('keydown-Z', confirm);
        this.input.keyboard?.once('keydown-ENTER', confirm);
        this.input.keyboard?.once('keydown-SPACE', confirm);
    }

    private updateGenderCursor(): void {
        const { width, height } = this.cameras.main;
        const x = this.selectedGender === 'boy' ? width * 0.3 : width * 0.7;
        this.selectionCursor.setPosition(x, height / 2 - 30);
    }

    private confirmGender(): void {
        GameState.setPlayerGender(this.selectedGender);
        console.log(`[Intro] Género seleccionado: ${this.selectedGender}`);

        this.input.keyboard?.off('keydown-LEFT');
        this.input.keyboard?.off('keydown-RIGHT');

        this.genderSelectionContainer.destroy();
        this.dialogBox.setVisible(true);
        this.dialogText.setVisible(true);
        this.professorSprite.setVisible(true);

        this.showDialog(["MUY BIEN!", "Y CUAL ES TU NOMBRE?"], () => {
            this.startNameInput();
        });
    }

    private startNameInput(): void {
        this.professorSprite.setVisible(false);
        this.createNameInputUI();
    }

    private createNameInputUI(): void {
        const { width, height } = this.cameras.main;

        this.nameInputContainer = this.add.container(0, 0);

        // Name Display
        const nameLabel = this.add.text(width / 2, 20, 'TU NOMBRE:', { fontFamily: 'monospace', fontSize: '16px' }).setOrigin(0.5);

        this.nameText = this.add.text(width / 2, 40, '_', { fontFamily: 'monospace', fontSize: '16px' }).setOrigin(0.5);
        this.nameText.setTint(0x0000FF);

        this.nameInputContainer.add([nameLabel, this.nameText]);

        // Keyboard
        const startY = 70;
        const startX = 40;
        const keySize = 15;
        const padding = 5;

        this.KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
            this.keyboardKeys[rowIndex] = [];
            row.forEach((key, colIndex) => {
                const x = startX + colIndex * (keySize + padding);
                const y = startY + rowIndex * (keySize + padding);

                const keyText = this.add.text(x, y, key, { fontFamily: 'monospace', fontSize: '16px' }).setOrigin(0.5);

                this.nameInputContainer.add(keyText);
                this.keyboardKeys[rowIndex].push(keyText);
            });
        });

        this.updateKeyboardCursor();

        // Input Handling
        this.input.keyboard?.on('keydown-UP', () => this.moveKeyboardCursor(-1, 0));
        this.input.keyboard?.on('keydown-DOWN', () => this.moveKeyboardCursor(1, 0));
        this.input.keyboard?.on('keydown-LEFT', () => this.moveKeyboardCursor(0, -1));
        this.input.keyboard?.on('keydown-RIGHT', () => this.moveKeyboardCursor(0, 1));

        this.input.keyboard?.on('keydown-Z', () => this.handleKeySelection());
        this.input.keyboard?.on('keydown-X', () => this.handleDelete());
        this.input.keyboard?.on('keydown-ENTER', () => this.handleKeySelection());
    }

    private moveKeyboardCursor(dRow: number, dCol: number): void {
        const newRow = this.selectedKeyRow + dRow;

        if (newRow >= 0 && newRow < this.KEYBOARD_LAYOUT.length) {
            const newCol = this.selectedKeyCol + dCol;
            if (newCol >= 0 && newCol < this.KEYBOARD_LAYOUT[newRow].length) {
                this.selectedKeyRow = newRow;
                this.selectedKeyCol = newCol;
                this.updateKeyboardCursor();
            }
        }
    }

    private updateKeyboardCursor(): void {
        // Reset colors
        this.keyboardKeys.forEach(row => row.forEach(text => text.setTint(0xFFFFFF)));

        // Highlight selected
        this.keyboardKeys[this.selectedKeyRow][this.selectedKeyCol].setTint(0xFF0000);
    }

    private handleKeySelection(): void {
        const key = this.KEYBOARD_LAYOUT[this.selectedKeyRow][this.selectedKeyCol];

        if (key === 'DEL') {
            this.handleDelete();
        } else if (key === 'END') {
            if (this.currentName.length > 0) {
                this.confirmName();
            }
        } else {
            if (this.currentName.length < 7) {
                this.currentName += key;
                this.nameText.setText(this.currentName);
            }
        }
    }

    private handleDelete(): void {
        if (this.currentName.length > 0) {
            this.currentName = this.currentName.slice(0, -1);
            this.nameText.setText(this.currentName || '_');
        }
    }

    private confirmName(): void {
        GameState.setPlayerName(this.currentName);
        console.log(`[Intro] Nombre seleccionado: ${this.currentName}`);

        this.input.keyboard?.off('keydown-UP');
        this.input.keyboard?.off('keydown-DOWN');
        this.input.keyboard?.off('keydown-LEFT');
        this.input.keyboard?.off('keydown-RIGHT');
        this.input.keyboard?.off('keydown-Z');
        this.input.keyboard?.off('keydown-X');
        this.input.keyboard?.off('keydown-ENTER');

        this.nameInputContainer.destroy();
        this.professorSprite.setVisible(true);
        this.dialogBox.setVisible(true);
        this.dialogText.setVisible(true);

        this.showDialog([
            `AH, ${this.currentName}!`,
            "QUE NOMBRE MAS CASTIZO!"
        ], () => {
            this.introduceRival();
        });
    }

    private introduceRival(): void {
        this.showDialog(["AHORA, ESTE DE AQUI..."], () => {
            const { width, height } = this.cameras.main;

            this.professorSprite.setVisible(false);

            // Rival Sprite (Placeholder)
            this.rivalSprite = this.add.sprite(width / 2, height / 2 - 20, 'npc', 0); // Using NPC sprite for now
            this.rivalSprite.setScale(2);
            this.rivalSprite.setTint(0x555555); // Darker tint

            this.showDialog([
                "ESTE ES PABLO.",
                "ES TU VECINO DE TODA LA VIDA.",
                "HA SIDO TU RIVAL Y AMIGO",
                "DESDE QUE ERAIS PEQUENOS."
            ], () => {
                this.finishIntro();
            });
        });
    }

    private finishIntro(): void {
        this.rivalSprite.destroy();
        this.professorSprite.setVisible(true);

        this.showDialog([
            `${this.currentName}...`,
            "TU AVENTURA ESTA A PUNTO",
            "DE COMENZAR.",
            "ADELANTE!"
        ], () => {
            // Transition to Overworld
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start(SCENES.OVERWORLD, { map: 'room_start' });
            });
        });
    }
}
