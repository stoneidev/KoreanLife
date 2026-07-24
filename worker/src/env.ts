export type Env = {
  SUBSCRIPTIONS: KVNamespace
  BOARD: D1Database
  VAPID_SUBJECT: string
  ALLOWED_ORIGIN?: string
  /** JSON string of `{ publicKey, privateKey }` — set via `wrangler secret put VAPID_JWK` */
  VAPID_JWK: string
  ADMIN_KEY: string
}
