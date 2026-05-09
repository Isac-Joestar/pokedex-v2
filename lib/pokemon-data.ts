import { Pokemon, PokemonListResponse } from "@/types";
import { fetchPokemonList } from "./pokemon-api";

const MOCK_POKEMON: Pokemon[] = [
  { id: 1, name: "bulbasaur", nameCapitalized: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
  { id: 2, name: "ivysaur", nameCapitalized: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png" },
  { id: 3, name: "venusaur", nameCapitalized: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png" },
  { id: 4, name: "charmander", nameCapitalized: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
  { id: 5, name: "charmeleon", nameCapitalized: "Charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" },
  { id: 6, name: "charizard", nameCapitalized: "Charizard", url: "https://pokeapi.co/api/v2/pokemon/6/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" },
  { id: 7, name: "squirtle", nameCapitalized: "Squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
  { id: 8, name: "wartortle", nameCapitalized: "Wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png" },
  { id: 9, name: "blastoise", nameCapitalized: "Blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png" },
  { id: 10, name: "caterpie", nameCapitalized: "Caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png" },
  { id: 11, name: "metapod", nameCapitalized: "Metapod", url: "https://pokeapi.co/api/v2/pokemon/11/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png" },
  { id: 12, name: "butterfree", nameCapitalized: "Butterfree", url: "https://pokeapi.co/api/v2/pokemon/12/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png" },
  { id: 13, name: "weedle", nameCapitalized: "Weedle", url: "https://pokeapi.co/api/v2/pokemon/13/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png" },
  { id: 14, name: "kakuna", nameCapitalized: "Kakuna", url: "https://pokeapi.co/api/v2/pokemon/14/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png" },
  { id: 15, name: "beedrill", nameCapitalized: "Beedrill", url: "https://pokeapi.co/api/v2/pokemon/15/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png" },
  { id: 16, name: "pidgey", nameCapitalized: "Pidgey", url: "https://pokeapi.co/api/v2/pokemon/16/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png" },
  { id: 17, name: "pidgeotto", nameCapitalized: "Pidgeotto", url: "https://pokeapi.co/api/v2/pokemon/17/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png" },
  { id: 18, name: "pidgeot", nameCapitalized: "Pidgeot", url: "https://pokeapi.co/api/v2/pokemon/18/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png" },
  { id: 19, name: "rattata", nameCapitalized: "Rattata", url: "https://pokeapi.co/api/v2/pokemon/19/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png" },
  { id: 20, name: "raticate", nameCapitalized: "Raticate", url: "https://pokeapi.co/api/v2/pokemon/20/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png" },
  { id: 21, name: "spearow", nameCapitalized: "Spearow", url: "https://pokeapi.co/api/v2/pokemon/21/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png" },
  { id: 22, name: "fearow", nameCapitalized: "Fearow", url: "https://pokeapi.co/api/v2/pokemon/22/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png" },
  { id: 23, name: "ekans", nameCapitalized: "Ekans", url: "https://pokeapi.co/api/v2/pokemon/23/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png" },
  { id: 24, name: "arbok", nameCapitalized: "Arbok", url: "https://pokeapi.co/api/v2/pokemon/24/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png" },
  { id: 25, name: "pikachu", nameCapitalized: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
  { id: 26, name: "raichu", nameCapitalized: "Raichu", url: "https://pokeapi.co/api/v2/pokemon/26/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png" },
  { id: 27, name: "sandshrew", nameCapitalized: "Sandshrew", url: "https://pokeapi.co/api/v2/pokemon/27/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png" },
  { id: 28, name: "sandslash", nameCapitalized: "Sandslash", url: "https://pokeapi.co/api/v2/pokemon/28/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png" },
  { id: 29, name: "nidoran-f", nameCapitalized: "Nidoran-f", url: "https://pokeapi.co/api/v2/pokemon/29/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png" },
  { id: 30, name: "nidorina", nameCapitalized: "Nidorina", url: "https://pokeapi.co/api/v2/pokemon/30/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png" },
  { id: 31, name: "nidoqueen", nameCapitalized: "Nidoqueen", url: "https://pokeapi.co/api/v2/pokemon/31/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png" },
  { id: 32, name: "nidoran-m", nameCapitalized: "Nidoran-m", url: "https://pokeapi.co/api/v2/pokemon/32/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png" },
  { id: 33, name: "nidorino", nameCapitalized: "Nidorino", url: "https://pokeapi.co/api/v2/pokemon/33/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png" },
  { id: 34, name: "nidoking", nameCapitalized: "Nidoking", url: "https://pokeapi.co/api/v2/pokemon/34/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png" },
  { id: 35, name: "clefairy", nameCapitalized: "Clefairy", url: "https://pokeapi.co/api/v2/pokemon/35/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png" },
  { id: 36, name: "clefable", nameCapitalized: "Clefable", url: "https://pokeapi.co/api/v2/pokemon/36/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png" },
  { id: 37, name: "vulpix", nameCapitalized: "Vulpix", url: "https://pokeapi.co/api/v2/pokemon/37/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png" },
  { id: 38, name: "ninetales", nameCapitalized: "Ninetales", url: "https://pokeapi.co/api/v2/pokemon/38/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png" },
  { id: 39, name: "jigglypuff", nameCapitalized: "Jigglypuff", url: "https://pokeapi.co/api/v2/pokemon/39/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png" },
  { id: 40, name: "wigglytuff", nameCapitalized: "Wigglytuff", url: "https://pokeapi.co/api/v2/pokemon/40/", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png" },
];

export async function getPokemonByPage(
  page: number,
  limit: number = 20,
  search?: string
): Promise<PokemonListResponse> {
  return fetchPokemonList(page, limit, search)
}

