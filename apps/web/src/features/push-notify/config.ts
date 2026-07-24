/**
 * Push backend config. The VAPID public key is safe to ship to the client;
 * the private key lives only as a Worker secret. Values can be overridden at
 * build time via VITE_* env vars, with working defaults baked in.
 */
export const VAPID_PUBLIC_KEY =
  import.meta.env.VITE_VAPID_PUBLIC_KEY ??
  'BDaOKZ0CQ6l2te2zoi87jlKiK-8FT_4dMmLUHZfPgvsviwvd0ofY7EJ9UB8rYdQyKJD1WZs7qW6zRFyTJLXZK6Y'

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
