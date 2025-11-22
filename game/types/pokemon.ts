/**
 * Sistema de tipos de Pokémon para Pokémon Madrid
 * Basado en mecánicas de Generación 3 (Ruby/Sapphire/Emerald)
 */

/**
 * Los 18 tipos de Pokémon (Gen 1-3 completos)
 */
export enum PokemonType {
  NORMAL = 'Normal',
  FIGHTING = 'Fighting',
  FLYING = 'Flying',
  POISON = 'Poison',
  GROUND = 'Ground',
  ROCK = 'Rock',
  BUG = 'Bug',
  GHOST = 'Ghost',
  STEEL = 'Steel',
  FIRE = 'Fire',
  WATER = 'Water',
  GRASS = 'Grass',
  ELECTRIC = 'Electric',
  PSYCHIC = 'Psychic',
  ICE = 'Ice',
  DRAGON = 'Dragon',
  DARK = 'Dark',
  FAIRY = 'Fairy', // Añadido en Gen 6 pero popular
}

/**
 * Naturalezas de Pokémon (25 naturalezas de Gen 3)
 */
export enum Nature {
  HARDY = 'Hardy',
  LONELY = 'Lonely',
  BRAVE = 'Brave',
  ADAMANT = 'Adamant',
  NAUGHTY = 'Naughty',
  BOLD = 'Bold',
  DOCILE = 'Docile',
  RELAXED = 'Relaxed',
  IMPISH = 'Impish',
  LAX = 'Lax',
  TIMID = 'Timid',
  HASTY = 'Hasty',
  SERIOUS = 'Serious',
  JOLLY = 'Jolly',
  NAIVE = 'Naive',
  MODEST = 'Modest',
  MILD = 'Mild',
  QUIET = 'Quiet',
  BASHFUL = 'Bashful',
  RASH = 'Rash',
  CALM = 'Calm',
  GENTLE = 'Gentle',
  SASSY = 'Sassy',
  CAREFUL = 'Careful',
  QUIRKY = 'Quirky',
}

/**
 * Estadísticas base de un Pokémon
 */
export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

/**
 * Effort Values (EVs) - puntos de entrenamiento
 */
export interface EVs extends BaseStats {}

/**
 * Individual Values (IVs) - genética del Pokémon (0-31)
 */
export interface IVs extends BaseStats {}

/**
 * Movimiento de Pokémon
 */
export interface Move {
  id: number;
  name: string;
  type: PokemonType;
  category: 'physical' | 'special' | 'status';
  power: number | null; // null para movimientos de status
  accuracy: number | null; // null para movimientos que siempre aciertan
  pp: number;
  description: string;
}

/**
 * Especie de Pokémon (datos de la Pokédex)
 */
export interface PokemonSpecies {
  id: number;
  name: string;
  dexNumber: number; // Número en la Pokédex de Madrid
  type1: PokemonType;
  type2: PokemonType | null;
  baseStats: BaseStats;
  abilities: string[]; // IDs de habilidades
  hiddenAbility: string | null;
  catchRate: number; // 0-255 (255 = más fácil)
  baseExpYield: number;
  growthRate: 'slow' | 'medium-slow' | 'medium-fast' | 'fast';
  eggGroups: string[];
  genderRatio: number; // -1 = sin género, 0-100 = % hembra
  baseHappiness: number;
  sprites: {
    frontDefault: string; // Ruta al sprite frontal
    backDefault: string; // Ruta al sprite de espalda
  };
  description: string; // Entrada de la Pokédex
}

/**
 * Instancia individual de un Pokémon
 */
export interface Pokemon {
  species: PokemonSpecies;
  nickname: string | null;
  level: number;
  exp: number;
  nature: Nature;
  ability: string; // ID de la habilidad activa
  ivs: IVs;
  evs: EVs;
  moves: Move[]; // Máximo 4 movimientos
  currentHp: number;
  maxHp: number;
  status: 'healthy' | 'poisoned' | 'burned' | 'paralyzed' | 'frozen' | 'asleep';
  friendship: number; // 0-255
  isShiny: boolean;
  metLocation: string;
  metLevel: number;
  originalTrainer: string;
  trainerId: number;
}

/**
 * Habilidades exclusivas de Madrid
 */
export const MADRID_ABILITIES = [
  {
    id: 'espiritu-castizo',
    name: 'Espíritu Castizo',
    description:
      'Aumenta la Defensa cuando el Pokémon está en un estadio o gimnasio.',
  },
  {
    id: 'eco-del-tunel',
    name: 'Eco del Túnel',
    description:
      'Los movimientos de tipo Sonido tienen 30% más de potencia cuando está bajo techo.',
  },
  {
    id: 'chulapo',
    name: 'Chulapo',
    description:
      'Si el Pokémon es del género masculino, su Ataque aumenta un 10%.',
  },
  {
    id: 'calor-verano',
    name: 'Calor de Verano',
    description:
      'Durante el clima soleado, la Velocidad aumenta un 50%.',
  },
  {
    id: 'retiro-secreto',
    name: 'Retiro Secreto',
    description:
      'Puede recuperar HP gradualmente cuando está en un parque o bosque.',
  },
  {
    id: 'metro-rapido',
    name: 'Metro Rápido',
    description:
      'Aumenta la prioridad de movimientos de tipo Eléctrico en +1.',
  },
  {
    id: 'aguante-madrileno',
    name: 'Aguante Madrileño',
    description:
      'Si el HP baja a menos del 25%, todos los stats aumentan en 1 nivel.',
  },
] as const;

/**
 * Pokémon iniciales de Madrid (starters)
 */
export const STARTER_POKEMON: PokemonSpecies[] = [
  {
    id: 1,
    name: 'Gatolegre',
    dexNumber: 1,
    type1: PokemonType.NORMAL,
    type2: PokemonType.DARK,
    baseStats: {
      hp: 45,
      attack: 55,
      defense: 40,
      spAttack: 35,
      spDefense: 40,
      speed: 65,
    },
    abilities: ['chulapo', 'aguante-madrileno'],
    hiddenAbility: 'espiritu-castizo',
    catchRate: 45,
    baseExpYield: 62,
    growthRate: 'medium-slow',
    eggGroups: ['field'],
    genderRatio: 87.5, // 87.5% macho (típico de starters)
    baseHappiness: 70,
    sprites: {
      frontDefault: '/assets/sprites/pokemon/gatolegre-front.png',
      backDefault: '/assets/sprites/pokemon/gatolegre-back.png',
    },
    description:
      'Un felino ágil que merodea por los barrios de Madrid. Es conocido por su astucia y lealtad a su entrenador.',
  },
  {
    id: 2,
    name: 'Ursabón',
    dexNumber: 2,
    type1: PokemonType.FIGHTING,
    type2: PokemonType.NORMAL,
    baseStats: {
      hp: 55,
      attack: 65,
      defense: 50,
      spAttack: 30,
      spDefense: 45,
      speed: 35,
    },
    abilities: ['aguante-madrileno', 'espiritu-castizo'],
    hiddenAbility: 'chulapo',
    catchRate: 45,
    baseExpYield: 65,
    growthRate: 'medium-slow',
    eggGroups: ['field'],
    genderRatio: 87.5,
    baseHappiness: 70,
    sprites: {
      frontDefault: '/assets/sprites/pokemon/ursabon-front.png',
      backDefault: '/assets/sprites/pokemon/ursabon-back.png',
    },
    description:
      'Un oso fuerte y valiente que habita en los parques de Madrid. Protege a los más débiles con fiereza.',
  },
  {
    id: 3,
    name: 'Azulejín',
    dexNumber: 3,
    type1: PokemonType.WATER,
    type2: null,
    baseStats: {
      hp: 50,
      attack: 40,
      defense: 55,
      spAttack: 60,
      spDefense: 50,
      speed: 45,
    },
    abilities: ['metro-rapido', 'retiro-secreto'],
    hiddenAbility: 'eco-del-tunel',
    catchRate: 45,
    baseExpYield: 63,
    growthRate: 'medium-slow',
    eggGroups: ['water1'],
    genderRatio: 87.5,
    baseHappiness: 70,
    sprites: {
      frontDefault: '/assets/sprites/pokemon/azulejin-front.png',
      backDefault: '/assets/sprites/pokemon/azulejin-back.png',
    },
    description:
      'Una criatura acuática inspirada en los azulejos del Metro de Madrid. Se desplaza rápidamente por túneles subterráneos.',
  },
];
