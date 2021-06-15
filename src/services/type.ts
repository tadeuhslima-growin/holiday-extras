
export interface PokemonList {
  id: string;
  name: string;
  artist: string;
  supertype: string;
  subtypes: string[];
  hp: number;
  types: string[];
  evolvesTo: string[];
  attacks: Attacks[];
  weaknesses: Weaknesses[];
  retreatCost: string[];
  convertedRetreatCost: number;
  images: {
    large: string;
    small: string;
  }
  tcgplayer : {
    url: string;
  }
  abilities: Abilities[];
}

interface Attacks {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Abilities {
  name: string;
  text: string;
  type: string;
}

interface Weaknesses {
  type: string;
  value: string;
}