/**
 * Tipos de Pokémon de Madrid
 */
export type PokemonType =
  | 'normal'
  | 'fuego'
  | 'agua'
  | 'planta'
  | 'electrico'
  | 'hielo'
  | 'lucha'
  | 'veneno'
  | 'tierra'
  | 'volador'
  | 'psiquico'
  | 'bicho'
  | 'roca'
  | 'fantasma'
  | 'dragon'
  | 'siniestro'
  | 'acero'
  | 'hada';

/**
 * Efectividad de tipos
 */
export const TYPE_EFFECTIVENESS: Record<PokemonType, {
  strong: PokemonType[];
  weak: PokemonType[];
  immune: PokemonType[];
}> = {
  fuego: {
    strong: ['planta', 'hielo', 'bicho', 'acero'],
    weak: ['fuego', 'agua', 'roca', 'dragon'],
    immune: [],
  },
  agua: {
    strong: ['fuego', 'tierra', 'roca'],
    weak: ['agua', 'planta', 'dragon'],
    immune: [],
  },
  planta: {
    strong: ['agua', 'tierra', 'roca'],
    weak: ['fuego', 'planta', 'veneno', 'volador', 'bicho', 'dragon', 'acero'],
    immune: [],
  },
  electrico: {
    strong: ['agua', 'volador'],
    weak: ['electrico', 'planta', 'dragon'],
    immune: ['tierra'],
  },
  normal: {
    strong: [],
    weak: ['roca', 'acero'],
    immune: ['fantasma'],
  },
  hielo: {
    strong: ['planta', 'tierra', 'volador', 'dragon'],
    weak: ['fuego', 'agua', 'hielo', 'acero'],
    immune: [],
  },
  lucha: {
    strong: ['normal', 'hielo', 'roca', 'siniestro', 'acero'],
    weak: ['veneno', 'volador', 'psiquico', 'bicho', 'hada'],
    immune: ['fantasma'],
  },
  veneno: {
    strong: ['planta', 'hada'],
    weak: ['veneno', 'tierra', 'roca', 'fantasma'],
    immune: ['acero'],
  },
  tierra: {
    strong: ['fuego', 'electrico', 'veneno', 'roca', 'acero'],
    weak: ['planta', 'bicho'],
    immune: ['volador'],
  },
  volador: {
    strong: ['planta', 'lucha', 'bicho'],
    weak: ['electrico', 'roca', 'acero'],
    immune: [],
  },
  psiquico: {
    strong: ['lucha', 'veneno'],
    weak: ['psiquico', 'acero'],
    immune: ['siniestro'],
  },
  bicho: {
    strong: ['planta', 'psiquico', 'siniestro'],
    weak: ['fuego', 'lucha', 'veneno', 'volador', 'fantasma', 'acero', 'hada'],
    immune: [],
  },
  roca: {
    strong: ['fuego', 'hielo', 'volador', 'bicho'],
    weak: ['lucha', 'tierra', 'acero'],
    immune: [],
  },
  fantasma: {
    strong: ['psiquico', 'fantasma'],
    weak: ['siniestro'],
    immune: ['normal'],
  },
  dragon: {
    strong: ['dragon'],
    weak: ['acero'],
    immune: ['hada'],
  },
  siniestro: {
    strong: ['psiquico', 'fantasma'],
    weak: ['lucha', 'siniestro', 'hada'],
    immune: [],
  },
  acero: {
    strong: ['hielo', 'roca', 'hada'],
    weak: ['fuego', 'agua', 'electrico', 'acero'],
    immune: [],
  },
  hada: {
    strong: ['lucha', 'dragon', 'siniestro'],
    weak: ['fuego', 'veneno', 'acero'],
    immune: [],
  },
};

/**
 * Movimiento de Pokémon
 */
export interface Move {
  name: string;
  type: PokemonType;
  power: number;
  accuracy: number;
  pp: number;
  maxPP: number;
  description: string;
}

/**
 * Estadísticas de Pokémon
 */
export interface PokemonStats {
  hp: number;
  maxHP: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  exp: number;
  expToNext: number;
}

/**
 * Definición de especie de Pokémon
 */
export interface PokemonSpecies {
  id: number;
  name: string;
  nickname: string;
  types: PokemonType[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  moves: Move[];
  spriteKey: {
    front: string;
    back: string;
  };
  catchRate: number;
  description: string;
  evolutions?: {
    targetId: number;
    level: number;
  }[];
}

/**
 * Pokémon capturado (instancia)
 */
export interface Pokemon extends PokemonSpecies {
  stats: PokemonStats;
  isWild: boolean;
}

/**
 * Pokédex de Madrid - 9 Pokémon castizos
 */
export const MADRID_POKEDEX: PokemonSpecies[] = [
  {
    id: 1,
    name: 'Gatolegre',
    nickname: 'Gatolegre',
    types: ['normal', 'lucha'],
    baseStats: { hp: 45, attack: 49, defense: 49, speed: 45 },
    moves: [
      {
        name: 'Arañazo',
        type: 'normal',
        power: 40,
        accuracy: 100,
        pp: 35,
        maxPP: 35,
        description: 'Araña al rival con garras afiladas.',
      },
      {
        name: 'Gruñido',
        type: 'normal',
        power: 0,
        accuracy: 100,
        pp: 40,
        maxPP: 40,
        description: 'Reduce el ataque del rival.',
      },
    ],
    spriteKey: { front: 'pokemon-front-1', back: 'pokemon-back-1' },
    catchRate: 45,
    description: 'Un gato callejero madrileño que defiende su territorio con fiereza.',
    evolutions: [
      { targetId: 10, level: 16 } // Evoluciona a Gatulapo (ID 10, placeholder)
    ]
  },
  {
    id: 2,
    name: 'Ursabón',
    nickname: 'Ursabón',
    types: ['normal'],
    baseStats: { hp: 60, attack: 80, defense: 50, speed: 35 },
    moves: [
      {
        name: 'Placaje',
        type: 'normal',
        power: 40,
        accuracy: 100,
        pp: 35,
        maxPP: 35,
        description: 'Embiste al rival con todo el cuerpo.',
      },
      {
        name: 'Gruñido',
        type: 'normal',
        power: 0,
        accuracy: 100,
        pp: 40,
        maxPP: 40,
        description: 'Reduce el ataque del rival.',
      },
    ],
    spriteKey: { front: 'pokemon-front-2', back: 'pokemon-back-2' },
    catchRate: 40,
    description: 'Oso de la Casa de Campo que protege el parque.',
    evolutions: [
      { targetId: 11, level: 18 }
    ]
  },
  {
    id: 3,
    name: 'Azulejín',
    nickname: 'Azulejín',
    types: ['agua', 'roca'],
    baseStats: { hp: 44, attack: 48, defense: 65, speed: 43 },
    moves: [
      {
        name: 'Pistola Agua',
        type: 'agua',
        power: 40,
        accuracy: 100,
        pp: 25,
        maxPP: 25,
        description: 'Dispara agua al rival.',
      },
      {
        name: 'Lanzarrocas',
        type: 'roca',
        power: 50,
        accuracy: 90,
        pp: 15,
        maxPP: 15,
        description: 'Lanza rocas pequeñas al rival.',
      },
    ],
    spriteKey: { front: 'pokemon-front-3', back: 'pokemon-back-3' },
    catchRate: 50,
    description: 'Habita en la Fuente de Cibeles, guardián de los azulejos madrileños.',
    evolutions: [
      { targetId: 12, level: 18 }
    ]
  },
  {
    id: 4,
    name: 'Churrabón',
    nickname: 'Churrabón',
    types: ['fuego', 'hada'],
    baseStats: { hp: 39, attack: 52, defense: 43, speed: 65 },
    moves: [
      {
        name: 'Ascuas',
        type: 'fuego',
        power: 40,
        accuracy: 100,
        pp: 25,
        maxPP: 25,
        description: 'Lanza llamas pequeñas al rival.',
      },
    ],
    spriteKey: { front: 'pokemon-front-4', back: 'pokemon-back-4' },
    catchRate: 45,
    description: 'Pokémon con forma de churro que deja un rastro de azúcar.',
    evolutions: [
      { targetId: 13, level: 16 }
    ]
  },
  {
    id: 5,
    name: 'Chulapalm',
    nickname: 'Chulapalm',
    types: ['planta', 'lucha'],
    baseStats: { hp: 45, attack: 67, defense: 45, speed: 50 },
    moves: [
      {
        name: 'Látigo Cepa',
        type: 'planta',
        power: 45,
        accuracy: 100,
        pp: 25,
        maxPP: 25,
        description: 'Azota con lianas.',
      },
    ],
    spriteKey: { front: 'pokemon-front-5', back: 'pokemon-back-5' },
    catchRate: 50,
    description: 'Chulapo del Retiro que baila chotis entre los árboles.',
    evolutions: [
      { targetId: 14, level: 16 }
    ]
  },
  {
    id: 6,
    name: 'Torreón',
    nickname: 'Torreón',
    types: ['roca', 'dragon'],
    baseStats: { hp: 52, attack: 84, defense: 86, speed: 35 },
    moves: [
      {
        name: 'Lanzarrocas',
        type: 'roca',
        power: 50,
        accuracy: 90,
        pp: 15,
        maxPP: 15,
        description: 'Lanza rocas pequeñas.',
      },
    ],
    spriteKey: { front: 'pokemon-front-6', back: 'pokemon-back-6' },
    catchRate: 30,
    description: 'Inspirado en la Torre de Madrid, guardián de los edificios históricos.',
  },
  {
    id: 7,
    name: 'Madriles',
    nickname: 'Madriles',
    types: ['electrico', 'volador'],
    baseStats: { hp: 40, attack: 45, defense: 40, speed: 70 },
    moves: [
      {
        name: 'Impactrueno',
        type: 'electrico',
        power: 40,
        accuracy: 100,
        pp: 30,
        maxPP: 30,
        description: 'Ataque eléctrico.',
      },
    ],
    spriteKey: { front: 'pokemon-front-7', back: 'pokemon-back-7' },
    catchRate: 60,
    description: 'Gorrión eléctrico que vive en el metro de Madrid.',
  },
  {
    id: 8,
    name: 'Verbena',
    nickname: 'Verbena',
    types: ['hada', 'psiquico'],
    baseStats: { hp: 60, attack: 45, defense: 50, speed: 75 },
    moves: [
      {
        name: 'Confusión',
        type: 'psiquico',
        power: 50,
        accuracy: 100,
        pp: 25,
        maxPP: 25,
        description: 'Ataque psíquico que confunde.',
      },
    ],
    spriteKey: { front: 'pokemon-front-8', back: 'pokemon-back-8' },
    catchRate: 35,
    description: 'Espíritu de las fiestas de San Isidro que trae alegría.',
  },
  {
    id: 9,
    name: 'Realejo',
    nickname: 'Realejo',
    types: ['acero', 'normal'],
    baseStats: { hp: 65, attack: 90, defense: 85, speed: 40 },
    moves: [
      {
        name: 'Cabeza de Hierro',
        type: 'acero',
        power: 80,
        accuracy: 100,
        pp: 15,
        maxPP: 15,
        description: 'Embiste con cabeza de acero.',
      },
    ],
    spriteKey: { front: 'pokemon-front-9', back: 'pokemon-back-9' },
    catchRate: 25,
    description: 'Toro mecánico del Palacio Real, símbolo de Madrid.',
  },
  {
    id: 10,
    name: 'Gatulapo',
    nickname: 'Gatulapo',
    types: ['normal', 'lucha'],
    baseStats: { hp: 70, attack: 85, defense: 70, speed: 90 },
    moves: [
      {
        name: 'Golpe Karate',
        type: 'lucha',
        power: 50,
        accuracy: 100,
        pp: 25,
        maxPP: 25,
        description: 'Golpe cortante con la mano.',
      },
    ],
    spriteKey: { front: 'pokemon-front-10', back: 'pokemon-back-10' },
    catchRate: 45,
    description: 'Evolución de Gatolegre. Baila chotis mientras pelea.',
  },
  {
    id: 11,
    name: 'Ursamajor',
    nickname: 'Ursamajor',
    types: ['normal', 'tierra'],
    baseStats: { hp: 90, attack: 110, defense: 80, speed: 50 },
    moves: [
      {
        name: 'Terremoto',
        type: 'tierra',
        power: 100,
        accuracy: 100,
        pp: 10,
        maxPP: 10,
        description: 'Sacude la tierra para atacar a todos.',
      },
    ],
    spriteKey: { front: 'pokemon-front-11', back: 'pokemon-back-11' },
    catchRate: 45,
    description: 'El oso definitivo de Madrid. Su fuerza mueve madroños.',
  },
  {
    id: 12,
    name: 'Azulejazo',
    nickname: 'Azulejazo',
    types: ['agua', 'roca'],
    baseStats: { hp: 70, attack: 75, defense: 110, speed: 60 },
    moves: [
      {
        name: 'Surf',
        type: 'agua',
        power: 90,
        accuracy: 100,
        pp: 15,
        maxPP: 15,
        description: 'Crea una ola gigante.',
      },
    ],
    spriteKey: { front: 'pokemon-front-12', back: 'pokemon-back-12' },
    catchRate: 45,
    description: 'Muralla de azulejos viviente. Nada puede romperlo.',
  },
  {
    id: 13,
    name: 'Churrasco',
    nickname: 'Churrasco',
    types: ['fuego', 'hada'],
    baseStats: { hp: 60, attack: 90, defense: 60, speed: 100 },
    moves: [
      {
        name: 'Lanzallamas',
        type: 'fuego',
        power: 90,
        accuracy: 100,
        pp: 15,
        maxPP: 15,
        description: 'Ataque de fuego intenso.',
      },
    ],
    spriteKey: { front: 'pokemon-front-13', back: 'pokemon-back-13' },
    catchRate: 45,
    description: 'Churro ardiente. Su aroma atrae a todos.',
  },
  {
    id: 14,
    name: 'Chulapower',
    nickname: 'Chulapower',
    types: ['planta', 'lucha'],
    baseStats: { hp: 80, attack: 100, defense: 80, speed: 70 },
    moves: [
      {
        name: 'Rayo Solar',
        type: 'planta',
        power: 120,
        accuracy: 100,
        pp: 10,
        maxPP: 10,
        description: 'Absorbe luz y ataca.',
      },
    ],
    spriteKey: { front: 'pokemon-front-14', back: 'pokemon-back-14' },
    catchRate: 45,
    description: 'El rey de la verbena. Sus movimientos son letales.',
  },
];

/**
 * Crea una instancia de Pokémon salvaje
 */
export function createWildPokemon(speciesId: number, level: number): Pokemon {
  const species = MADRID_POKEDEX.find((p) => p.id === speciesId);
  if (!species) {
    throw new Error(`Pokémon con ID ${speciesId} no encontrado`);
  }

  const maxHP = calculateStat(species.baseStats.hp, level);
  const attack = calculateStat(species.baseStats.attack, level);
  const defense = calculateStat(species.baseStats.defense, level);
  const speed = calculateStat(species.baseStats.speed, level);

  return {
    ...species,
    stats: {
      hp: maxHP,
      maxHP,
      attack,
      defense,
      speed,
      level,
      exp: 0,
      expToNext: level * level * level,
    },
    isWild: true,
  };
}

/**
 * Crea Pokémon inicial del jugador
 */
export function createStarterPokemon(speciesId: number): Pokemon {
  const pokemon = createWildPokemon(speciesId, 5);
  return {
    ...pokemon,
    isWild: false,
  };
}

/**
 * Calcula estadística basada en stats base y nivel
 */
function calculateStat(baseStat: number, level: number): number {
  return Math.floor(((2 * baseStat * level) / 100) + level + 10);
}

/**
 * Calcula daño de un ataque
 */
export function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move
): { damage: number; effectiveness: number } {
  if (move.power === 0) {
    return { damage: 0, effectiveness: 1 };
  }

  // Fórmula básica de Pokémon
  const level = attacker.stats.level;
  const attack = attacker.stats.attack;
  const defense = defender.stats.defense;
  const power = move.power;

  // Efectividad de tipo
  let effectiveness = 1;
  for (const defenderType of defender.types) {
    const typeData = TYPE_EFFECTIVENESS[move.type];
    if (typeData.strong.includes(defenderType)) {
      effectiveness *= 2;
    }
    if (typeData.weak.includes(defenderType)) {
      effectiveness *= 0.5;
    }
    if (typeData.immune.includes(defenderType)) {
      effectiveness = 0;
    }
  }

  // STAB (Same Type Attack Bonus)
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;

  // Random factor (0.85 a 1.0)
  const random = 0.85 + Math.random() * 0.15;

  // Cálculo final
  const baseDamage = (((2 * level / 5 + 2) * power * (attack / defense)) / 50 + 2);
  const finalDamage = Math.floor(baseDamage * stab * effectiveness * random);

  return { damage: Math.max(1, finalDamage), effectiveness };
}
