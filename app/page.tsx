"use client";

import { useEffect, useState } from "react";
import { PokemonListResponse } from "@/types";
import PokemonGrid from "@/components/PokemonGrid";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { getPokemonByPage } from "@/lib/pokemon-data";

export default function Home() {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await getPokemonByPage(page, limit, searchQuery)
        setData(res)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erro desconhecido");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [page, limit, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pokédex
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Explore o catálogo completo de Pokémon
          </p>
        </header>

        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && <LoadingSpinner />}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && data && (
          <>
            <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Mostrando {data.results.length} de {data.total} Pokémon
              {searchQuery && ` (filtrado por "${searchQuery}")`}
            </div>

            <PokemonGrid pokemonList={data.results} />

            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

