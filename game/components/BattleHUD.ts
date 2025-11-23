import Phaser from 'phaser';
import { Pokemon } from '../types/Pokemon';

export class BattleHUD extends Phaser.GameObjects.Container {
    private pokemon: Pokemon;
    private hpBar!: Phaser.GameObjects.Graphics;
    private nameText!: Phaser.GameObjects.Text;
    private levelText!: Phaser.GameObjects.Text;
    private hpText: Phaser.GameObjects.Text | null = null;
    private isPlayer: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, pokemon: Pokemon, isPlayer: boolean) {
        super(scene, x, y);
        this.pokemon = pokemon;
        this.isPlayer = isPlayer;

        this.createHUD();
        scene.add.existing(this);
    }

    private createHUD(): void {
        // Fondo del HUD (usando asset si es posible, o graphics como fallback)
        const bg = this.scene.add.image(0, 0, 'battle-hud');
        bg.setOrigin(0, 0);
        // Escalar si es necesario, asumiendo tamaño original pequeño
        // bg.setScale(2); 
        this.add(bg);

        // Nombre
        this.nameText = this.scene.add.text(30, 10, this.pokemon.name, {
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#000000',
            fontStyle: 'bold'
        });
        this.add(this.nameText);

        // Nivel
        this.levelText = this.scene.add.text(120, 10, `Lv${this.pokemon.stats.level}`, {
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#000000'
        });
        this.add(this.levelText);

        // Barra de HP
        this.hpBar = this.scene.add.graphics();
        this.add(this.hpBar);
        this.updateHPBar();

        // Texto HP (solo jugador)
        if (this.isPlayer) {
            this.hpText = this.scene.add.text(40, 35, `${this.pokemon.stats.hp}/${this.pokemon.stats.maxHP}`, {
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#000000'
            });
            this.add(this.hpText);
        }
    }

    public updateHP(newHP: number, animate: boolean = true): void {
        if (animate) {
            this.scene.tweens.addCounter({
                from: this.pokemon.stats.hp,
                to: newHP,
                duration: 500,
                onUpdate: (tween) => {
                    const currentHP = Math.floor(tween.getValue());
                    this.renderHPBar(currentHP);
                    if (this.hpText) {
                        this.hpText.setText(`${currentHP}/${this.pokemon.stats.maxHP}`);
                    }
                },
                onComplete: () => {
                    this.pokemon.stats.hp = newHP;
                }
            });
        } else {
            this.pokemon.stats.hp = newHP;
            this.updateHPBar();
        }
    }

    private updateHPBar(): void {
        this.renderHPBar(this.pokemon.stats.hp);
        if (this.hpText) {
            this.hpText.setText(`${this.pokemon.stats.hp}/${this.pokemon.stats.maxHP}`);
        }
    }

    private renderHPBar(currentHP: number): void {
        this.hpBar.clear();

        // Posición relativa al contenedor
        const x = 45; // Ajustar según 'battle-hud'
        const y = 25;
        const width = 96;
        const height = 6;

        // Fondo gris
        this.hpBar.fillStyle(0x555555);
        this.hpBar.fillRect(x, y, width, height);

        // Barra de color
        const percentage = currentHP / this.pokemon.stats.maxHP;
        let color = 0x00ff00; // Verde
        if (percentage < 0.5) color = 0xffff00; // Amarillo
        if (percentage < 0.2) color = 0xff0000; // Rojo

        this.hpBar.fillStyle(color);
        this.hpBar.fillRect(x, y, width * percentage, height);
    }
}
