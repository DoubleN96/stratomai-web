import Phaser from 'phaser';

export interface VirtualControlsConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  size?: number;
  alpha?: number;
}

export interface VirtualControlState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  action: boolean;
}

/**
 * Virtual D-pad controls for mobile devices
 * Displays a virtual joystick/D-pad for touch input
 */
export class VirtualControls {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private buttons: Map<string, Phaser.GameObjects.Graphics>;
  private state: VirtualControlState;
  private size: number;
  private buttonSize: number;

  constructor(config: VirtualControlsConfig) {
    this.scene = config.scene;
    this.size = config.size || 120;
    this.buttonSize = this.size / 3;

    this.state = {
      up: false,
      down: false,
      left: false,
      right: false,
      action: false,
    };

    this.buttons = new Map();
    this.container = this.scene.add.container(config.x, config.y);
    this.container.setAlpha(config.alpha || 0.6);
    this.container.setScrollFactor(0); // Fixed to camera
    this.container.setDepth(1000); // Always on top

    this.createDPad();
    this.createActionButton();

    // Only show on touch devices
    if (!this.scene.sys.game.device.input.touch) {
      this.container.setVisible(false);
    }
  }

  private createDPad(): void {
    const buttonPositions = [
      { key: 'up', x: this.buttonSize, y: 0 },
      { key: 'down', x: this.buttonSize, y: this.buttonSize * 2 },
      { key: 'left', x: 0, y: this.buttonSize },
      { key: 'right', x: this.buttonSize * 2, y: this.buttonSize },
    ];

    buttonPositions.forEach(({ key, x, y }) => {
      const button = this.createButton(x, y, key);
      this.buttons.set(key, button);
      this.container.add(button);
    });
  }

  private createActionButton(): void {
    // Action button on the right side
    const x = this.size * 2.5;
    const y = this.buttonSize;
    const button = this.createButton(x, y, 'action', 0xFF6B6B);
    this.buttons.set('action', button);
    this.container.add(button);

    // Add "A" label
    const label = this.scene.add.text(x + this.buttonSize / 2, y + this.buttonSize / 2, 'A', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#FFFFFF',
    });
    label.setOrigin(0.5);
    this.container.add(label);
  }

  private createButton(x: number, y: number, key: string, color: number = 0x333333): Phaser.GameObjects.Graphics {
    const graphics = this.scene.add.graphics();

    // Draw button background
    graphics.fillStyle(color, 0.8);
    graphics.fillRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);

    // Draw border
    graphics.lineStyle(2, 0xFFFFFF, 0.5);
    graphics.strokeRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);

    // Make interactive
    graphics.setInteractive(
      new Phaser.Geom.Rectangle(x, y, this.buttonSize, this.buttonSize),
      Phaser.Geom.Rectangle.Contains
    );

    // Touch events
    graphics.on('pointerdown', () => {
      this.onButtonPress(key);
      graphics.clear();
      graphics.fillStyle(color, 1); // Full opacity when pressed
      graphics.fillRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);
      graphics.lineStyle(2, 0xFFFFFF, 1);
      graphics.strokeRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);
    });

    graphics.on('pointerup', () => {
      this.onButtonRelease(key);
      graphics.clear();
      graphics.fillStyle(color, 0.8);
      graphics.fillRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);
      graphics.lineStyle(2, 0xFFFFFF, 0.5);
      graphics.strokeRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);
    });

    graphics.on('pointerout', () => {
      this.onButtonRelease(key);
      graphics.clear();
      graphics.fillStyle(color, 0.8);
      graphics.fillRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);
      graphics.lineStyle(2, 0xFFFFFF, 0.5);
      graphics.strokeRoundedRect(x, y, this.buttonSize, this.buttonSize, 8);
    });

    return graphics;
  }

  private onButtonPress(key: string): void {
    if (key in this.state) {
      this.state[key as keyof VirtualControlState] = true;
    }
  }

  private onButtonRelease(key: string): void {
    if (key in this.state) {
      this.state[key as keyof VirtualControlState] = false;
    }
  }

  public getState(): VirtualControlState {
    return { ...this.state };
  }

  public isUp(): boolean {
    return this.state.up;
  }

  public isDown(): boolean {
    return this.state.down;
  }

  public isLeft(): boolean {
    return this.state.left;
  }

  public isRight(): boolean {
    return this.state.right;
  }

  public isAction(): boolean {
    return this.state.action;
  }

  public setVisible(visible: boolean): void {
    this.container.setVisible(visible);
  }

  public setAlpha(alpha: number): void {
    this.container.setAlpha(alpha);
  }

  public destroy(): void {
    this.container.destroy();
  }
}
