import { beforeEach, describe, expect, it, vi } from 'vitest'

// The push crypto lib needs real VAPID keys; stub it so the handler logic
// (routing, KV, fetch to the push server) is what's under test here.
vi.mock('webpush-webcrypto', () => ({
  ApplicationServerKeys: { fromJSON: vi.fn(async () => ({})) },
  generatePushHTTPRequest: vi.fn(async () => ({
    endpoint: 'https://fcm.googleapis.com/fcm/send/abc',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: new Uint8Array([1, 2, 3]),
  })),
}))

import worker from './index'

// In-memory KV fake
function makeKV() {
  const store = new Map<string, string>()
  return {
    store,
    get: vi.fn(async (k: string) => store.get(k) ?? null),
    put: vi.fn(async (k: string, v: string) => void store.set(k, v)),
    delete: vi.fn(async (k: string) => void store.delete(k)),
  }
}

const VALID_SUB = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/abc',
  keys: { p256dh: 'BKxxx', auth: 'authtoken' },
}

const SITE = 'https://koreanlife.pages.dev'

function makeEnv(kv = makeKV()) {
  return {
    SUBSCRIPTIONS: kv as unknown as KVNamespace,
    VAPID_SUBJECT: 'mailto:test@example.com',
    ALLOWED_ORIGIN: SITE,
    VAPID_JWK: JSON.stringify({ publicKey: 'stub-public', privateKey: 'stub-private' }),
    _kv: kv,
  }
}

function post(path: string, body: unknown, origin = SITE) {
  return new Request(`https://worker.dev${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
    },
    body: JSON.stringify(body),
  })
}

describe('worker fetch handler (Hono)', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('health check returns ok with CORS', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      new Request('https://worker.dev/health', { headers: { Origin: SITE } }),
      env,
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(SITE)
    expect(await res.json()).toEqual({ ok: true })
  })

  it('OPTIONS preflight returns 204 with CORS', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      new Request('https://worker.dev/api/push/subscribe', {
        method: 'OPTIONS',
        headers: {
          Origin: SITE,
          'Access-Control-Request-Method': 'POST',
        },
      }),
      env,
    )
    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST')
  })

  it('subscribe stores a valid subscription in KV (201)', async () => {
    const env = makeEnv()
    const res = await worker.fetch(post('/api/push/subscribe', { subscription: VALID_SUB }), env)
    expect(res.status).toBe(201)
    expect(env._kv.put).toHaveBeenCalledOnce()
    const stored = JSON.parse([...env._kv.store.values()][0])
    expect(stored.endpoint).toBe(VALID_SUB.endpoint)
  })

  it('subscribe rejects an invalid subscription (400)', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      post('/api/push/subscribe', { subscription: { endpoint: 'http://x' } }),
      env,
    )
    expect(res.status).toBe(400)
    expect(env._kv.put).not.toHaveBeenCalled()
  })

  it('subscribe from a foreign Origin is rejected (403)', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      post('/api/push/subscribe', { subscription: VALID_SUB }, 'https://evil.example'),
      env,
    )
    expect(res.status).toBe(403)
    expect(env._kv.put).not.toHaveBeenCalled()
  })

  it('subscribe from localhost is allowed for Vite dev', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      post('/api/push/subscribe', { subscription: VALID_SUB }, 'http://localhost:5173'),
      env,
    )
    expect(res.status).toBe(201)
  })

  it('test endpoint sends a push and returns ok (200)', async () => {
    const env = makeEnv()
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 201 }))
    const res = await worker.fetch(post('/api/push/test', { subscription: VALID_SUB }), env)
    expect(fetchSpy).toHaveBeenCalledOnce()
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ ok: true })
  })

  it('test endpoint drops a gone (410) subscription', async () => {
    const env = makeEnv()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 410 }))
    const res = await worker.fetch(post('/api/push/test', { subscription: VALID_SUB }), env)
    expect(res.status).toBe(502)
    expect(env._kv.delete).toHaveBeenCalledOnce()
  })

  it('test endpoint errors clearly when VAPID_JWK is the wrong shape', async () => {
    const env = makeEnv()
    // a bare EC JWK (what we mistakenly stored at first) lacks publicKey/privateKey
    env.VAPID_JWK = JSON.stringify({ kty: 'EC', crv: 'P-256', d: 'x', x: 'y', z: 'z' })
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const res = await worker.fetch(post('/api/push/test', { subscription: VALID_SUB }), env)
    expect(res.status).toBe(500)
    expect((await res.json() as { error: string }).error).toMatch(/VAPID_JWK must be/)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('unknown route returns 404', async () => {
    const env = makeEnv()
    const res = await worker.fetch(new Request('https://worker.dev/nope'), env)
    expect(res.status).toBe(404)
  })
})
