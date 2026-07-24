import { Hono } from 'hono'
import type { Env } from '../env'
import { subscriptionKey, validateSubscription } from '../lib'
import { sendPush } from '../push/send'

export const pushRoutes = new Hono<{ Bindings: Env }>()

/** Register (or refresh) a push subscription in KV. */
pushRoutes.post('/subscribe', async (c) => {
  let payload: unknown
  try {
    payload = await c.req.json()
  } catch {
    return c.json({ error: 'invalid JSON' }, 400)
  }

  const check = validateSubscription((payload as { subscription?: unknown })?.subscription)
  if (!check.ok) return c.json({ error: check.error }, 400)

  const key = await subscriptionKey(check.value.endpoint)
  await c.env.SUBSCRIPTIONS.put(key, JSON.stringify(check.value))
  return c.json({ ok: true }, 201)
})

/** Send an immediate test notification to the given subscription. */
pushRoutes.post('/test', async (c) => {
  let payload: unknown
  try {
    payload = await c.req.json()
  } catch {
    return c.json({ error: 'invalid JSON' }, 400)
  }

  const check = validateSubscription((payload as { subscription?: unknown })?.subscription)
  if (!check.ok) return c.json({ error: check.error }, 400)

  const notification = JSON.stringify({
    title: 'KoreanLife',
    body: '알림이 켜졌어요! · Notifications are on!',
    url: c.env.ALLOWED_ORIGIN || '/',
  })

  try {
    const status = await sendPush(c.env, check.value, notification)
    if (status >= 400) {
      // Push server rejected (e.g. 404/410 gone) — drop the stale sub.
      if (status === 404 || status === 410) {
        await c.env.SUBSCRIPTIONS.delete(await subscriptionKey(check.value.endpoint))
      }
      return c.json({ error: `push failed (${status})` }, 502)
    }
    return c.json({ ok: true, status })
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500)
  }
})

/** Broadcast a message to all subscribers (Admin only). */
pushRoutes.post('/broadcast', async (c) => {
  const adminKey = c.req.header('X-Admin-Key')
  if (!adminKey || adminKey !== c.env.ADMIN_KEY) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  let payload: { title?: string, body?: string, url?: string }
  try {
    payload = await c.req.json()
  } catch {
    return c.json({ error: 'invalid JSON' }, 400)
  }

  const notification = JSON.stringify({
    title: payload.title || 'KoreanLife',
    body: payload.body || '새로운 알림이 도착했습니다! · New notification!',
    url: payload.url || (c.env.ALLOWED_ORIGIN || '/'),
  })

  try {
    const list = await c.env.SUBSCRIPTIONS.list()
    let successCount = 0
    let failCount = 0

    for (const key of list.keys) {
      const subJson = await c.env.SUBSCRIPTIONS.get(key.name)
      if (!subJson) continue

      const sub = JSON.parse(subJson)
      try {
        const status = await sendPush(c.env, sub, notification)
        if (status >= 400) {
          console.error(`Push failed for ${key.name} with status ${status}`)
          failCount++
          if (status === 404 || status === 410) {
            await c.env.SUBSCRIPTIONS.delete(key.name)
          }
        } else {
          successCount++
        }
      } catch (e) {
        console.error(`Push exception for ${key.name}:`, e)
        failCount++
      }
    }

    return c.json({ ok: true, success: successCount, failed: failCount })
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500)
  }
})
