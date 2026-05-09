interface RateLimitAllowed {
  allowed: true;
  remaining: number;
  resetTime: number;
}

interface RateLimitDenied {
  allowed: false;
  remaining: 0;
  resetTime: number;
  retryAfter: number;  // ← Agora é obrigatório quando allowed = false
}

type RateLimitResult = RateLimitAllowed | RateLimitDenied;
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, limit = 100, windowMs = 60000): RateLimitResult {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  // Primeira requisição ou janela expirada
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs
    };
  }
  
  // Limite excedido
  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    };
  }
  
  // Dentro do limite
  record.count++;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime
  };
}

// Opcional: Limpar rate limits antigos periodicamente
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, 60000); // Limpa a cada minuto