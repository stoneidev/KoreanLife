export type PushSubscriptionShape = {
  endpoint: string
  keys: { p256dh: string; auth: string }
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: string }

const MAX_ENDPOINT_LEN = 2048

/** Validate an incoming Web Push subscription object from the client. */
export function validateSubscription(input: unknown): Result<PushSubscriptionShape> {
  if (!input || typeof input !== 'object') return { ok: false, error: 'not an object' }
  const obj = input as Record<string, unknown>

  const endpoint = obj.endpoint
  if (typeof endpoint !== 'string' || !endpoint.startsWith('https://')) {
    return { ok: false, error: 'invalid endpoint' }
  }
  if (endpoint.length > MAX_ENDPOINT_LEN) {
    return { ok: false, error: 'endpoint too long' }
  }

  const keys = obj.keys
  if (!keys || typeof keys !== 'object') return { ok: false, error: 'missing keys' }
  const k = keys as Record<string, unknown>
  if (typeof k.p256dh !== 'string' || typeof k.auth !== 'string') {
    return { ok: false, error: 'missing p256dh/auth' }
  }

  return {
    ok: true,
    value: { endpoint, keys: { p256dh: k.p256dh, auth: k.auth } },
  }
}

/** CORS headers scoped to the configured site origin (or * as a fallback). */
export function corsHeaders(allowedOrigin: string | undefined): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': allowedOrigin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

/** Stable KV key for a subscription (hash of endpoint keeps keys bounded). */
export async function subscriptionKey(endpoint: string): Promise<string> {
  const data = new TextEncoder().encode(endpoint)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(digest)
  let hex = ''
  for (const b of bytes) hex += b.toString(16).padStart(2, '0')
  return `sub:${hex}`
}
