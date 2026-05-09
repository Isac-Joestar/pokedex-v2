import { Pokemon, PokemonListResponse } from "@/types";

export async function fetchPokemonList(
  page: number,
  limit: number,
  search?: string,
): Promise<PokemonListResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search && search.trim() !== "") {
    params.append("search", search.trim());
  }

  const response = await fetch(`/api/pokemon/list?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro em fetchPokemonList");
  }

  const result = await response.json();
  return result.data;
}

export async function createPokemons(
  name: string,
  image: string,
): Promise<Pokemon> {
  if (!name.trim() || !image.trim()) {
    throw new Error("Nome  e imagem são obrigatórios");
  }
  const body = { name, image };

  const response = await fetch(`/api/pokemon/list/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro em cratePokemons");
  }
  const result = await response.json();
  return result.data;
}
