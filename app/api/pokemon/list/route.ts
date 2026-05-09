import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { success, uuid, z } from "zod";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function GET(req: NextRequest) {
  const querySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().min(20).max(50).default(20),
    search: z.string().optional(),
  });

  const controler = new AbortController();
  const timeoutId = setTimeout(() => controler.abort(), 5000);
  try {
    const searchParams = req.nextUrl.searchParams;
    const params = querySchema.safeParse({
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      search: searchParams.get("search") || "",
    });

    if (!params.success) {
      clearTimeout(timeoutId);
      return NextResponse.json(
        {
          error: "Dados inválidos",
          success: false,
        },
        { status: 400 },
      );
    }

    const { page, limit, search } = params.data;
    const offset = (page - 1) * limit;

    const searchQuery = search?.trim().toLowerCase() || "";
    const hasSearch = searchQuery !== "";

    const pokeAPIUrl = new URL(`${BASE_URL}/pokemon`);
    if (hasSearch) {
      pokeAPIUrl.searchParams.append("offset", "0");
      pokeAPIUrl.searchParams.append("limit", "10000");
    } else {
      pokeAPIUrl.searchParams.append("offset", offset.toString());
      pokeAPIUrl.searchParams.append("limit", limit.toString());
    }

    const response = await fetch(pokeAPIUrl.toString(), {
      signal: controler.signal,
    });

    if (!response.ok) {
      clearTimeout(timeoutId);
      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "acesso negado",
            success: false,
          },
          { status: 401 },
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          {
            error: "Muitas resuisições, tente mais tarde",
            success: false,
          },
          { status: 429 },
        );
      }

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: "página não encontrada",
            success: false,
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          error: "Erro ao buscar pokemons",
          success: false,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    let results = data.results.map((p: { name: string; url: string }) => {
      const id = p.url.split("/").filter(Boolean).pop();
      const nameCapitalized = p.name[0].toUpperCase() + p.name.slice(1);
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        name: p.name,
        nameCapitalized,
        url: p.url,
        image,
      };
    });

    if (hasSearch) {
      results = results.filter((p: { name: string }) =>
        p.name.includes(searchQuery),
      );
    }

    const total = hasSearch ? results.length : data.count;
    const totalPages = total / limit || 1;

    if (hasSearch) {
      const searchOffset = (page - 1) * limit;
      results = results.slice(searchOffset, searchOffset + limit);
    }

    clearTimeout(timeoutId)
    return NextResponse.json(
      {
        success: true,
        data: {
          page,
          limit,
          total,
          totalPages,
          results,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    if (error instanceof DOMException && error.message.includes("AbortError")) {
      return NextResponse.json(
        {
          success: false,
          error: "requisição demorou demais. Tente novamente",
          code: "TIMOUT",
        },
        { status: 504 },
      );
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          success: false,
          error: "Falha na conecxão com a API",
          code: "NETWORK_ERROR",
        },
        { status: 503 },
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao tratar dados da API",
          code: "PARSE_ERROR",
        },
        { status: 502 },
      );
    }

    console.error("Erro no servidor", {
      message: error instanceof Error ? error.message : "unknow error",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar pokemons",
      },
      { status: 500 },
    );
  }
}

export async function POST( req: NextRequest ) {
  const querySchema = z.object({
    name: z.string(),
    image: z.string(),
  });

  const controler = new AbortController();
  const timeoutId = setTimeout(() => controler.abort(), 5000);

  try {
    const body = await req.json()
    const bodyValidation = querySchema.safeParse(body);

    if (!bodyValidation.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          success: false,
          details: bodyValidation.error.issues.map((err) => ({
            campo: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    const { name, image } = bodyValidation.data;
    const pokemon = {
      id: uuid,
      name,
      nameCaptalized: name[0].toUpperCase + name.slice(1),
      url: "",
      image,
    };

    const response = await fetch(`${BASE_URL}/pokemons`, {
      method: "POST",
      headers: {
        Authorization: "Bearer ${API_KEY}",
        "Content-Type": "application/json",
      },
      signal: controler.signal,
      body: JSON.stringify({ pokemon }),
    });

    if (!response.ok) {
      clearTimeout(timeoutId);
      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "Acesso negado",
            success: false,
          },
          { status: 401 },
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              "foram feitas  muitas requisiçoes. Tente novamente mais tarde",
            success: false,
          },
          { status: 429 },
        );
      }

      return NextResponse.json(
        {
          error: "Erro ao buscar pokemons",
          success: false,
        },
        { status: response.status },
      );
    }

    const newPokemon = await response.json();
    return NextResponse.json(
      {
        success: true,
        data: newPokemon,
        message: "Pokemon criado com sucesso!",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof DOMException && error.message.includes("AbortError")) {
      return NextResponse.json({
        error: "A requisisão demorou demais. Tente novamente",
        success: false,
        code: "TIMOUT",
      });
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "Erro de concexão com a API",
          success: false,
          code: "NETWORK_ERROR",
        },
        { status: 503 },
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "Falha ao tratar dados da API",
          success: false,
          code: "PARSE_ERROR",
        },
        { status: 502 },
      );
    }
  }
}

export async function DELETE(req: NextRequest){

}
