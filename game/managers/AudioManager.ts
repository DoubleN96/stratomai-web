import Phaser from 'phaser';

export class AudioManager {
    private static instance: AudioManager;
    private scene!: Phaser.Scene;
    private currentMusic: Phaser.Sound.BaseSound | null = null;
    private isMuted: boolean = false;

    // Web Audio Context for synth fallback
    private audioContext: AudioContext | null = null;

    private constructor() {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public setScene(scene: Phaser.Scene): void {
        this.scene = scene;
    }

    public playMusic(key: string): void {
        if (this.isMuted) return;

        // Si ya está sonando la misma música, no hacer nada
        if (this.currentMusic && this.currentMusic.key === key && this.currentMusic.isPlaying) {
            return;
        }

        // Parar música anterior
        if (this.currentMusic) {
            this.currentMusic.stop();
        }

        // Intentar reproducir asset de Phaser
        if (this.scene.cache.audio.exists(key)) {
            this.currentMusic = this.scene.sound.add(key, { loop: true, volume: 0.5 });
            this.currentMusic.play();
        } else {
            console.warn(`[AudioManager] Música '${key}' no encontrada. Usando synth fallback.`);
            this.playSynthMusic(key);
        }
    }

    public playSfx(key: string): void {
        if (this.isMuted) return;

        if (this.scene.cache.audio.exists(key)) {
            this.scene.sound.play(key, { volume: 0.7 });
        } else {
            // Fallback simple
            this.playSynthSfx(key);
        }
    }

    public stopMusic(): void {
        if (this.currentMusic) {
            this.currentMusic.stop();
        }
    }

    // --- Synth Fallbacks (para cuando no hay assets) ---

    private playSynthMusic(key: string): void {
        if (!this.audioContext) return;

        // Melodía simple basada en el nombre (hash)
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        // Frecuencia base según key
        const baseFreq = key === 'battle-theme' ? 440 : 330;
        osc.type = 'square';
        osc.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);

        // Arpegio simple
        osc.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
        osc.frequency.setValueAtTime(baseFreq * 1.25, this.audioContext.currentTime + 0.2);
        osc.frequency.setValueAtTime(baseFreq * 1.5, this.audioContext.currentTime + 0.4);

        gain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 2);

        osc.start();
        osc.stop(this.audioContext.currentTime + 2);
    }

    private playSynthSfx(key: string): void {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        if (key === 'menu-select') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, this.audioContext.currentTime);
            gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.1);
        } else if (key === 'attack') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.2);
        }
    }
}

export const Audio = AudioManager.getInstance();
