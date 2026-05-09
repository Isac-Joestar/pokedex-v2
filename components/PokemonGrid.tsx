import { Pokemon } from "@/types";
import PokemonCard from "./PokemonCard";

interface PokemonGridProps {
  pokemonList: Pokemon[];
}

export default function PokemonGrid({ pokemonList }: PokemonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemonList.map((pokemon, key) => (
        <PokemonCard key={key} pokemon={pokemon} />
      ))}
    </div>
  );
}

