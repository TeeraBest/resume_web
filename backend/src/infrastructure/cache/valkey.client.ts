import Redis from 'ioredis'

let client: Redis | null = null

export function getValkeyClient(): Redis {
  if (!client) {
    client = new Redis({
      host: process.env.VALKEY_HOST ?? 'localhost',
      port: Number(process.env.VALKEY_PORT ?? 6379),
      lazyConnect: true,
      retryStrategy: (times) => {
        if (times > 3) return null  // stop retrying, let callers handle null
        return Math.min(times * 100, 1000)
      },
    })
    client.on('error', (err) => {
      // Log but don't crash — service degrades gracefully without cache
      console.error('[Valkey] connection error:', err.message)
    })
  }
  return client
}

export const CACHE_TTL = Number(process.env.CACHE_TTL ?? 300)

export function cacheKey(...parts: string[]): string {
  return parts.join(':')
}

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await getValkeyClient().get(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function setInCache(key: string, value: unknown, ttl = CACHE_TTL): Promise<void> {
  try {
    await getValkeyClient().setex(key, ttl, JSON.stringify(value))
  } catch {
    // Cache write failures are silent — DB is source of truth
  }
}

export async function disconnectValkey(): Promise<void> {
  if (client) {
    await client.quit()
    client = null
  }
}
