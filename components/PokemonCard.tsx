import { Pokemon } from "@/types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="group flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-32 w-32">
        <img
          src={pokemon.image}
          alt={pokemon.nameCapitalized}
          className="h-full w-full object-contain transition-transform group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {/* #{pokemon.id.toString().padStart(3, "0")} */}
        </p>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {pokemon.nameCapitalized}
        </h3>
      </div>
    </div>
  );
}

