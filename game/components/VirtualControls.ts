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
    // Action buttons (A and B) on the right side - GBA style
    const baseX = this.size * 2.2;
    const baseY = this.buttonSize;

    // B button (left, lower)
    const bButton = this.createButton(baseX - 15, baseY + 15, 'action', 0x8B5CF6); // Purple
    this.buttons.set('action', bButton);
    this.container.add(bButton);

    const bLabel = this.scene.add.text(baseX - 15 + this.buttonSize / 2, baseY + 15 + this.buttonSize / 2, 'B', {
      fontFamily: 'Arial Black',
      fontSize: '18px',
      color: '#FFFFFF',
    });
    bLabel.setOrigin(0.5);
    this.container.add(bLabel);

    // A button (right, higher) - larger and red like GBA
    const aButton = this.createButton(baseX + 25, baseY - 10, 'action', 0xEF4444); // Red
    this.buttons.set('action-a', aButton);
    this.container.add(aButton);

    const aLabel = this.scene.add.text(baseX + 25 + this.buttonSize / 2, baseY - 10 + this.buttonSize / 2, 'A', {
      fontFamily: 'Arial Black',
      fontSize: '20px',
      color: '#FFFFFF',
    });
    aLabel.setOrigin(0.5);
    this.container.add(aLabel);
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
