import { LIMITS } from './validate'

/**
 * Sliding 60s window counter in KV.
 * Returns false when the caller should be rejected (429).
 */
export async function checkRateLimit(
  kv: KVNamespace,
  keyParts: string[],
): Promise<{ ok: true } | { ok: false; retryAfter: number }> {
  const key = `rl:${keyParts.join(':')}`
  const raw = await kv.get(key)
  const count = raw ? Number(raw) : 0
  if (Number.isFinite(count) && count >= LIMITS.ratePerMinute) {
    return { ok: false, retryAfter: 60 }
  }
  const next = (Number.isFinite(count) ? count : 0) + 1
  await kv.put(key, String(next), { expirationTtl: 60 })
  return { ok: true }
}
