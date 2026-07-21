/**
 * Push backend config. The VAPID public key is safe to ship to the client;
 * the private key lives only as a Worker secret. Values can be overridden at
 * build time via VITE_* env vars, with working defaults baked in.
 */
export const VAPID_PUBLIC_KEY =
  import.meta.env.VITE_VAPID_PUBLIC_KEY ??
  'BF3o6m9HResNwUpkOSTc_O5Gm7-8Zpawo3rDRjWCDTEwuPvpIVGHIxAbIaSmqTFF3rdlgSfV9S-h6g1OZ3ehpMc'

export const PUSH_API_BASE =
  import.meta.env.VITE_PUSH_API_BASE ?? 'https://koreanlife-push.nijin39.workers.dev'

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  )
}
