import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Env } from './env'
import { isDevOrigin, resolveCorsOrigin } from './lib'
import { boardRoutes } from './routes/board'
import { healthRoutes } from './routes/health'
import { pushRoutes } from './routes/push'

const app = new Hono<{ Bindings: Env }>()

// CORS first (handles OPTIONS preflight). Origin is env-driven + localhost for Vite.
app.use('*', async (c, next) => {
  const allowed = c.env.ALLOWED_ORIGIN
  const handler = cors({
    origin: (origin) => resolveCorsOrigin(origin, allowed),
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'X-Device-Id'],
    maxAge: 86400,
  })
  return handler(c, next)
})

// Soft origin gate for mutating API (browsers send Origin; curl without Origin still works).
app.use('/api/*', async (c, next) => {
  if (c.req.method === 'OPTIONS') return next()

  const origin = c.req.header('Origin')
  const allowed = c.env.ALLOWED_ORIGIN
  if (origin && allowed && origin !== allowed && !isDevOrigin(origin)) {
    return c.json({ error: 'origin not allowed' }, 403)
  }
  await next()
})

app.route('/', healthRoutes)
app.route('/api/push', pushRoutes)
app.route('/api/board', boardRoutes)

app.notFound((c) => c.json({ error: 'not found' }, 404))

export default app
