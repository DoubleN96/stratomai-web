import type { Pokemon } from '../types/Pokemon';
import { createStarterPokemon } from '../types/Pokemon';

/**
 * Estado global del juego
 * Singleton que mantiene el progreso del jugador
 */
class GameStateManager {
  private static instance: GameStateManager;

  // Party de Pokémon del jugador (máximo 6)
  public party: Pokemon[] = [];

  // Items del jugador
  public items: {
    pokeballs: number;
    potions: number;
    superPotions: number;
    ultraBalls: number;
  } = {
    pokeballs: 5,
    potions: 3,
    superPotions: 0,
    ultraBalls: 0,
  };

  // Dinero del jugador
  public money: number = 3000;

  // Pokémon vistos y capturados
  public pokedex: {
    seen: Set<number>;
    caught: Set<number>;
  } = {
    seen: new Set(),
    caught: new Set(),
  };

  // Posición del jugador en el mapa
  public playerPosition: {
    x: number;
    y: number;
    map: string;
  } = {
    x: 0,
    y: 0,
    map: 'madrid_start',
  };

  // Badges conseguidas
  public badges: string[] = [];

  // Historia completada
  public storyFlags: Set<string> = new Set();

  private constructor() {
    // Singleton - no se puede instanciar directamente
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  /**
   * Inicializa el juego con un Pokémon inicial
   */
  public initializeGame(starterId: number = 1): void {
    const starter = createStarterPokemon(starterId);
    this.party.push(starter);
    this.pokedex.seen.add(starterId);
    this.pokedex.caught.add(starterId);
    console.log(`[GameState] Juego inicializado con ${starter.name} Lv.${starter.stats.level}`);
  }

  /**
   * Agrega un Pokémon al party
   */
  public addPokemon(pokemon: Pokemon): boolean {
    if (this.party.length >= 6) {
      console.warn('[GameState] Party lleno, no se puede agregar Pokémon');
      return false;
    }

    this.party.push(pokemon);
    this.pokedex.caught.add(pokemon.id);
    console.log(`[GameState] ${pokemon.name} agregado al party`);
    return true;
  }

  /**
   * Registra un Pokémon como visto en la Pokédex
   */
  public seePokemon(id: number): void {
    this.pokedex.seen.add(id);
  }

  /**
   * Usa una poción en un Pokémon
   */
  public usePotion(pokemonIndex: number): boolean {
    if (this.items.potions <= 0) {
      return false;
    }

    const pokemon = this.party[pokemonIndex];
    if (!pokemon) {
      return false;
    }

    const healAmount = Math.min(20, pokemon.stats.maxHP - pokemon.stats.hp);
    pokemon.stats.hp += healAmount;
    this.items.potions--;

    console.log(`[GameState] Usada poción en ${pokemon.name}. HP: ${pokemon.stats.hp}/${pokemon.stats.maxHP}`);
    return true;
  }

  /**
   * Usa una Pokéball (para captura)
   */
  public usePokeball(): boolean {
    if (this.items.pokeballs <= 0) {
      return false;
    }

    this.items.pokeballs--;
    return true;
  }

  /**
   * Obtiene el Pokémon líder del party
   */
  public getLeadPokemon(): Pokemon | null {
    return this.party.find((p) => p.stats.hp > 0) || null;
  }

  /**
   * Verifica si el jugador tiene Pokémon disponibles
   */
  public hasAvailablePokemon(): boolean {
    return this.party.some((p) => p.stats.hp > 0);
  }

  /**
   * Cura a todo el party (Pokémon Center)
   */
  public healAllPokemon(): void {
    this.party.forEach((pokemon) => {
      pokemon.stats.hp = pokemon.stats.maxHP;
      pokemon.moves.forEach((move) => {
        move.pp = move.maxPP;
      });
    });
    console.log('[GameState] Todo el party ha sido curado');
  }

  /**
   * Guarda el estado del juego en LocalStorage
   */
  public saveGame(): void {
    try {
      const saveData = {
        party: this.party,
        items: this.items,
        money: this.money,
        pokedex: {
          seen: Array.from(this.pokedex.seen),
          caught: Array.from(this.pokedex.caught),
        },
        playerPosition: this.playerPosition,
        badges: this.badges,
        storyFlags: Array.from(this.storyFlags),
        timestamp: Date.now(),
      };

      localStorage.setItem('pokemon_madrid_save', JSON.stringify(saveData));
      console.log('[GameState] Juego guardado');
    } catch (error) {
      console.error('[GameState] Error al guardar:', error);
    }
  }

  /**
   * Carga el estado del juego desde LocalStorage
   */
  public loadGame(): boolean {
    try {
      const saveDataString = localStorage.getItem('pokemon_madrid_save');
      if (!saveDataString) {
        return false;
      }

      const saveData = JSON.parse(saveDataString);

      this.party = saveData.party || [];
      this.items = saveData.items || this.items;
      this.money = saveData.money || 0;
      this.pokedex.seen = new Set(saveData.pokedex?.seen || []);
      this.pokedex.caught = new Set(saveData.pokedex?.caught || []);
      this.playerPosition = saveData.playerPosition || this.playerPosition;
      this.badges = saveData.badges || [];
      this.storyFlags = new Set(saveData.storyFlags || []);

      console.log('[GameState] Juego cargado');
      console.log(`[GameState] Party: ${this.party.length} Pokémon`);
      console.log(`[GameState] Pokédex: ${this.pokedex.caught.size}/${this.pokedex.seen.size}`);

      return true;
    } catch (error) {
      console.error('[GameState] Error al cargar:', error);
      return false;
    }
  }

  /**
   * Resetea el estado del juego
   */
  public resetGame(): void {
    this.party = [];
    this.items = {
      pokeballs: 5,
      potions: 3,
      superPotions: 0,
      ultraBalls: 0,
    };
    this.money = 3000;
    this.pokedex.seen.clear();
    this.pokedex.caught.clear();
    this.playerPosition = { x: 0, y: 0, map: 'madrid_start' };
    this.badges = [];
    this.storyFlags.clear();

    localStorage.removeItem('pokemon_madrid_save');
    console.log('[GameState] Juego reseteado');
  }

  /**
   * Obtiene estadísticas del juego
   */
  public getStats() {
    return {
      partySize: this.party.length,
      pokemonCaught: this.pokedex.caught.size,
      pokemonSeen: this.pokedex.seen.size,
      badges: this.badges.length,
      money: this.money,
      items: this.items,
    };
  }
}

// Export singleton instance
export const GameState = GameStateManager.getInstance();
