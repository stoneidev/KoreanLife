import { ApplicationServerKeys, generatePushHTTPRequest } from 'webpush-webcrypto'
import type { Env } from '../env'
import type { PushSubscriptionShape } from '../lib'

/** Send one Web Push message to a subscription. Returns the push server status. */
export async function sendPush(
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
  const keys = await ApplicationServerKeys.fromJSON(
    parsed as { publicKey: string; privateKey: string },
  )
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
