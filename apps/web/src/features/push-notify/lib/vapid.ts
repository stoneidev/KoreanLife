/**
 * Convert a base64url VAPID public key into the Uint8Array that
 * `PushManager.subscribe({ applicationServerKey })` expects.
 */
export function urlBase64ToUint8Array(base64url: string): Uint8Array {
  const padding = '='.repeat((4 - (base64url.length % 4)) % 4)
  const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/')
  const raw = atob(base64)
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i)
  }
  return output
}

/** True if two byte arrays are identical (used to detect VAPID key rotation). */
export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/**
 * Whether an existing PushSubscription was created with `expectedKey`.
 * A null subscription (or one without a readable key) counts as no match.
 */
export function subscriptionMatchesKey(
  subscription: PushSubscription | null,
  expectedKey: Uint8Array,
): boolean {
  const raw = subscription?.options?.applicationServerKey
  if (!raw) return false
  return bytesEqual(new Uint8Array(raw as ArrayBuffer), expectedKey)
}
