import { ApplicationServerKeys, generatePushHTTPRequest } from 'webpush-webcrypto'
import { corsHeaders, subscriptionKey, validateSubscription } from './lib'
import type { PushSubscriptionShape } from './lib'

type Env = {
  SUBSCRIPTIONS: KVNamespace
  VAPID_SUBJECT: string
  ALLOWED_ORIGIN?: string
  // JSON string of the VAPID private JWK (set via `wrangler secret put VAPID_JWK`)
  VAPID_JWK: string
}

function json(body: unknown, status: number, env: Env): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(env.ALLOWED_ORIGIN) },
  })
}

/** Send one Web Push message to a subscription. Returns the push server status. */
async function sendPush(
  env: Env,
  sub: PushSubscriptionShape,
  payload: string,
): Promise<number> {
  let parsed: unknown
  try {
    parsed = JSON.parse(env.VAPID_JWK)
  } catch {
    throw new Error('VAPID_JWK is not valid JSON')
  }
  // webpush-webcrypto expects { publicKey, privateKey } (base64url raw + pkcs8)
  const p = parsed as { publicKey?: unknown; privateKey?: unknown }
  if (typeof p?.publicKey !== 'string' || typeof p?.privateKey !== 'string') {
    throw new Error('VAPID_JWK must be {"publicKey","privateKey"} (from ApplicationServerKeys.toJSON)')
  }
  const keys = await ApplicationServerKeys.fromJSON(parsed as { publicKey: string; privateKey: string })
  const { headers, body, endpoint } = await generatePushHTTPRequest({
    applicationServerKeys: keys,
    payload,
    target: sub,
    adminContact: env.VAPID_SUBJECT,
    ttl: 60,
    urgency: 'normal',
  })
  const res = await fetch(endpoint, { method: 'POST', headers, body })
  return res.status
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env.ALLOWED_ORIGIN) })
    }

    if (url.pathname === '/health') {
      return json({ ok: true }, 200, env)
    }

    // Register (or refresh) a subscription
    if (url.pathname === '/api/push/subscribe' && request.method === 'POST') {
      let payload: unknown
      try {
        payload = await request.json()
      } catch {
        return json({ error: 'invalid JSON' }, 400, env)
      }
      const check = validateSubscription((payload as { subscription?: unknown })?.subscription)
      if (!check.ok) return json({ error: check.error }, 400, env)

      const key = await subscriptionKey(check.value.endpoint)
      await env.SUBSCRIPTIONS.put(key, JSON.stringify(check.value))
      return json({ ok: true }, 201, env)
    }

    // Send an immediate test notification to a given subscription
    if (url.pathname === '/api/push/test' && request.method === 'POST') {
      let payload: unknown
      try {
        payload = await request.json()
      } catch {
        return json({ error: 'invalid JSON' }, 400, env)
      }
      const check = validateSubscription((payload as { subscription?: unknown })?.subscription)
      if (!check.ok) return json({ error: check.error }, 400, env)

      const notification = JSON.stringify({
        title: 'KoreanLife',
        body: '알림이 켜졌어요! · Notifications are on!',
        url: env.ALLOWED_ORIGIN || '/',
      })

      try {
        const status = await sendPush(env, check.value, notification)
        if (status >= 400) {
          // Push server rejected (e.g. 404/410 gone) — drop the stale sub.
          if (status === 404 || status === 410) {
            await env.SUBSCRIPTIONS.delete(await subscriptionKey(check.value.endpoint))
          }
          return json({ error: `push failed (${status})` }, 502, env)
        }
        return json({ ok: true, status }, 200, env)
      } catch (err) {
        return json({ error: (err as Error).message }, 500, env)
      }
    }

    return json({ error: 'not found' }, 404, env)
  },
}
