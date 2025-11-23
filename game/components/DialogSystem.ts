import Phaser from 'phaser';

export class DialogSystem {
    private scene: Phaser.Scene;
    private dialogBox!: Phaser.GameObjects.Sprite;
    private dialogText!: Phaser.GameObjects.BitmapText;
    private isVisible: boolean = false;
    private isTyping: boolean = false;
    private currentDialog: string[] = [];
    private textIndex: number = 0;
    private onComplete?: () => void;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.createUI();
    }

    private createUI(): void {
        const { width, height } = this.scene.cameras.main;

        // Dialog Box (using the same asset as Intro/Battle)
        this.dialogBox = this.scene.add.sprite(width / 2, height - 25, 'battle-dialog');
        this.dialogBox.setDisplaySize(width - 10, 45);
        this.dialogBox.setScrollFactor(0); // Fix to camera
        this.dialogBox.setDepth(100);
        this.dialogBox.setVisible(false);

        // Dialog Text
        this.dialogText = this.scene.add.bitmapText(20, height - 40, 'font', '', 8);
        this.dialogText.setMaxWidth(width - 40);
        this.dialogText.setScrollFactor(0); // Fix to camera
        this.dialogText.setDepth(101);
        this.dialogText.setVisible(false);
    }

    public show(lines: string[], onComplete?: () => void): void {
        if (this.isVisible) return; // Prevent double show

        this.currentDialog = lines;
        this.onComplete = onComplete;
        this.isVisible = true;
        this.dialogBox.setVisible(true);
        this.dialogText.setVisible(true);

        // Pause player movement if possible (handled by scene usually, but we can emit event)
        this.scene.events.emit('dialog-start');

        this.showLine(0);
    }

    private showLine(index: number): void {
        if (index >= this.currentDialog.length) {
            this.hide();
            return;
        }

        const line = this.currentDialog[index];
        this.dialogText.setText('');
        this.textIndex = 0;
        this.isTyping = true;

        // Typing effect
        this.scene.time.addEvent({
            delay: 30,
            callback: () => {
                if (this.textIndex < line.length) {
                    this.dialogText.setText(line.substring(0, this.textIndex + 1));
                    this.textIndex++;
                } else {
                    this.isTyping = false;
                    this.waitForInput(index);
                }
            },
            repeat: line.length - 1
        });
    }

    private waitForInput(lineIndex: number): void {
        const advance = () => {
            if (this.isTyping) {
                // Instant finish line (optional feature, skipping for now to keep simple)
                return;
            }

            // Remove listeners
            this.scene.input.keyboard?.off('keydown-Z', advance);
            this.scene.input.keyboard?.off('keydown-ENTER', advance);
            this.scene.input.keyboard?.off('keydown-SPACE', advance);
            this.scene.input.off('pointerdown', advance);

            // Show next line
            this.showLine(lineIndex + 1);
        };

        // Add listeners
        this.scene.input.keyboard?.once('keydown-Z', advance);
        this.scene.input.keyboard?.once('keydown-ENTER', advance);
        this.scene.input.keyboard?.once('keydown-SPACE', advance);
        this.scene.input.once('pointerdown', advance);
    }

    public hide(): void {
        this.isVisible = false;
        this.dialogBox.setVisible(false);
        this.dialogText.setVisible(false);
        this.scene.events.emit('dialog-end');

        if (this.onComplete) {
            this.onComplete();
            this.onComplete = undefined;
        }
    }

    public isActive(): boolean {
        return this.isVisible;
    }
}
