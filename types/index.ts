export interface Pokemon {
  id: number;
  name: string;
  nameCapitalized: string;
  url: string;
  image: string;
}

export interface PokemonListResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  results: Pokemon[];
}

