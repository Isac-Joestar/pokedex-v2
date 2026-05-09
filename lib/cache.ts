interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Cache em memória (para desenvolvimento/pequeno porte)
const memoryCache = new Map<string, CacheEntry<unknown>>();

// 🔥 NOVO: Interface para o resultado do cache
export interface CacheResult<T> {
  data: T;           // Os dados cacheados/buscados
  fromCache: boolean; // true = veio do cache, false = busca nova
}

export async function getCachedOrFetch<T>(
  key: string, 
  fetcher: () => Promise<T>, 
  ttlMs: number = 300000 // 5 minutos default
): Promise<CacheResult<T>> {  // 🔥 MUDANÇA: Agora retorna CacheResult<T>
  const cached = memoryCache.get(key);
  const now = Date.now();
  
  // Se tem cache e ainda não expirou
  if (cached && (now - cached.timestamp) < cached.ttl) {
    console.log(`✅ Cache hit para: ${key}`);
    return {
      data: cached.data as T,
      fromCache: true    // 🔥 NOVO: Indica que veio do cache
    };
  }
  
  console.log(`❌ Cache miss para: ${key}, buscando dados...`);
  
  // Busca dados frescos
  const freshData = await fetcher();
  
  // Armazena no cache
  memoryCache.set(key, {
    data: freshData,
    timestamp: now,
    ttl: ttlMs
  });
  
  return {
    data: freshData,
    fromCache: false    // 🔥 NOVO: Indica que foi busca nova
  };
}

// Função opcional para limpar cache específico
export function invalidateCache(keyPattern?: string) {
  if (keyPattern) {
    // Remove apenas keys que correspondem ao padrão
    for (const key of memoryCache.keys()) {
      if (key.includes(keyPattern)) {
        memoryCache.delete(key);
      }
    }
  } else {
    // Limpa tudo
    memoryCache.clear();
  }
}