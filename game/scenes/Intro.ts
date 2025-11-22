import Phaser from 'phaser';
import { SCENES, MADRID_PALETTE } from '../config/gameConfig';
import { GameState } from '../managers/GameState';

export default class Intro extends Phaser.Scene {
    private dialogBox!: Phaser.GameObjects.Graphics;
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
    private selectionCursor!: Phaser.GameObjects.Graphics;

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

        // Decorative particles (optional)
        const particles = this.add.particles(0, 0, 'arrow', {
            x: { min: 0, max: width },
            y: { min: 0, max: height },
            speed: 20,
            scale: { start: 0.2, end: 0 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 2000,
            quantity: 1,
            frequency: 500,
            tint: 0x87CEEB
        });
    }

    private createDialogBox(): void {
        const { width, height } = this.cameras.main;

        this.dialogBox = this.add.graphics();
        this.dialogBox.fillStyle(0xFFFFFF, 0.9);
        this.dialogBox.fillRoundedRect(10, height - 50, width - 20, 45, 4);
        this.dialogBox.lineStyle(2, 0x000000, 1);
        this.dialogBox.strokeRoundedRect(10, height - 50, width - 20, 45, 4);

        this.dialogText = this.add.text(20, height - 45, '', {
            fontFamily: 'monospace',
            fontSize: '10px',
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
                    this.input.keyboard?.once('keydown-Z', () => {
                        if (lines.length > 1) {
                            this.showDialog(lines.slice(1), callback);
                        } else {
                            if (callback) callback();
                        }
                    });
                }
            },
            repeat: lines[0].length - 1
        });
    }

    // --- SEQUENCE STEPS ---

    private startProfessorIntro(): void {
        const { width, height } = this.cameras.main;

        // Professor Sprite (Placeholder)
        this.professorSprite = this.add.sprite(width / 2, height / 2 - 20, 'npc');
        this.professorSprite.setScale(2);
        this.professorSprite.setAlpha(0);

        this.tweens.add({
            targets: this.professorSprite,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.showDialog([
                    "¡Hola! ¡Bienvenido al mundo",
                    "de los Pokémon de Madrid!"
                ], () => {
                    this.showDialog([
                        "Mi nombre es Galdós.",
                        "¡Pero la gente me llama",
                        "el Profesor Pokémon!"
                    ], () => {
                        this.showDialog([
                            "Este mundo está habitado",
                            "por criaturas llamadas Pokémon."
                        ], () => {
                            this.startGenderSelection();
                        });
                    });
                });
            }
        });
    }

    private startGenderSelection(): void {
        this.showDialog(["Pero antes de continuar...", "¡Cuéntame sobre ti!", "¿Eres chico o chica?"], () => {
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
        this.boySprite = this.add.sprite(width * 0.3, height / 2, 'player');
        this.boySprite.setScale(3);
        this.boySprite.setFrame(0); // Down facing

        const boyText = this.add.text(width * 0.3, height / 2 + 40, 'CHICO', {
            fontFamily: 'monospace', fontSize: '12px', color: '#000000'
        }).setOrigin(0.5);

        // Girl Option
        this.girlSprite = this.add.sprite(width * 0.7, height / 2, 'player'); // Using same sprite for now
        this.girlSprite.setScale(3);
        this.girlSprite.setFrame(0); // Placeholder
        this.girlSprite.setTint(0xFFB6C1); // Tint to differentiate

        const girlText = this.add.text(width * 0.7, height / 2 + 40, 'CHICA', {
            fontFamily: 'monospace', fontSize: '12px', color: '#000000'
        }).setOrigin(0.5);

        this.genderSelectionContainer.add([this.boySprite, boyText, this.girlSprite, girlText]);

        // Cursor
        this.selectionCursor = this.add.graphics();
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

        this.input.keyboard?.once('keydown-Z', () => {
            this.confirmGender();
        });
    }

    private updateGenderCursor(): void {
        this.selectionCursor.clear();
        this.selectionCursor.lineStyle(2, 0xFF0000, 1);

        const { width, height } = this.cameras.main;
        const x = this.selectedGender === 'boy' ? width * 0.3 : width * 0.7;

        this.selectionCursor.strokeRect(x - 30, height / 2 - 40, 60, 100);
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

        this.showDialog(["¡Muy bien!", "¿Y cuál es tu nombre?"], () => {
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
        const nameLabel = this.add.text(width / 2, 20, 'TU NOMBRE:', {
            fontFamily: 'monospace', fontSize: '12px', color: '#000000'
        }).setOrigin(0.5);

        this.nameText = this.add.text(width / 2, 40, '_', {
            fontFamily: 'monospace', fontSize: '16px', color: '#0000FF'
        }).setOrigin(0.5);

        this.nameInputContainer.add([nameLabel, this.nameText]);

        // Keyboard
        const startY = 70;
        const startX = 20;
        const keySize = 20;
        const padding = 5;

        this.KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
            this.keyboardKeys[rowIndex] = [];
            row.forEach((key, colIndex) => {
                const x = startX + colIndex * (keySize + padding);
                const y = startY + rowIndex * (keySize + padding);

                const keyText = this.add.text(x, y, key, {
                    fontFamily: 'monospace', fontSize: '12px', color: '#000000'
                }).setOrigin(0.5);

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
        this.keyboardKeys.forEach(row => row.forEach(text => text.setColor('#000000')));

        // Highlight selected
        this.keyboardKeys[this.selectedKeyRow][this.selectedKeyCol].setColor('#FF0000');
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

        this.nameInputContainer.destroy();
        this.professorSprite.setVisible(true);
        this.dialogBox.setVisible(true);
        this.dialogText.setVisible(true);

        this.showDialog([
            `¡Ah, ${this.currentName}!`,
            "¡Qué nombre más castizo!"
        ], () => {
            this.introduceRival();
        });
    }

    private introduceRival(): void {
        this.showDialog(["Ahora, este de aquí..."], () => {
            const { width, height } = this.cameras.main;

            this.professorSprite.setVisible(false);

            // Rival Sprite (Placeholder)
            this.rivalSprite = this.add.sprite(width / 2, height / 2 - 20, 'npc'); // Using NPC sprite for now
            this.rivalSprite.setScale(2);
            this.rivalSprite.setTint(0x555555); // Darker tint

            this.showDialog([
                "Este es Pablo.",
                "Es tu vecino de toda la vida.",
                "Ha sido tu rival y amigo",
                "desde que erais pequeños."
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
            "Tu aventura está a punto",
            "de comenzar.",
            "¡Adelante!"
        ], () => {
            // Transition to Overworld
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start(SCENES.OVERWORLD);
            });
        });
    }
}
