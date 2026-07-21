import { Hono } from 'hono'
import { hashDeviceId } from '../board/hash'
import { checkRateLimit } from '../board/rate-limit'
import {
  getPost,
  insertPost,
  insertReply,
  listPosts,
  listReplies,
  publicPost,
  publicReply,
} from '../board/repo'
import {
  parseListLimit,
  validateDeviceId,
  validateNewPost,
  validateNewReply,
} from '../board/validate'
import type { Env } from '../env'

export const boardRoutes = new Hono<{ Bindings: Env }>()

boardRoutes.get('/posts', async (c) => {
  const limit = parseListLimit(c.req.query('limit'))
  const cursorRaw = c.req.query('cursor')
  const cursor = cursorRaw ? Number(cursorRaw) : undefined
  const rows = await listPosts(c.env.BOARD, limit, cursor)
  const posts = rows.map(publicPost)
  const nextCursor = rows.length === limit ? rows[rows.length - 1]?.created_at : undefined
  return c.json({ posts, nextCursor })
})

boardRoutes.get('/posts/:id', async (c) => {
  const id = c.req.param('id')
  const post = await getPost(c.env.BOARD, id)
  if (!post) return c.json({ error: 'not found' }, 404)
  const replies = await listReplies(c.env.BOARD, id)
  return c.json({ post: publicPost(post), replies: replies.map(publicReply) })
})

boardRoutes.post('/posts', async (c) => {
  const deviceCheck = validateDeviceId(c.req.header('X-Device-Id') ?? undefined)
  if (!deviceCheck.ok) return c.json({ error: deviceCheck.error }, 400)

  const ip = c.req.header('CF-Connecting-IP') || 'unknown'
  const rl = await checkRateLimit(c.env.SUBSCRIPTIONS, [
    'board',
    'post',
    ip,
    deviceCheck.value,
  ])
  if (!rl.ok) {
    return c.json({ error: 'rate limited' }, 429)
  }

  let payload: unknown
  try {
    payload = await c.req.json()
  } catch {
    return c.json({ error: 'invalid JSON' }, 400)
  }

  const check = validateNewPost(payload)
  if (!check.ok) return c.json({ error: check.error }, 400)

  const id = crypto.randomUUID()
  const createdAt = Date.now()
  const deviceHash = await hashDeviceId(deviceCheck.value)
  await insertPost(c.env.BOARD, {
    id,
    title: check.value.title,
    body: check.value.body,
    author_name: check.value.authorName,
    device_hash: deviceHash,
    created_at: createdAt,
    lang: check.value.lang || 'en',
  })

  return c.json(
    {
      post: publicPost({
        id,
        title: check.value.title,
        body: check.value.body,
        author_name: check.value.authorName,
        device_hash: deviceHash,
        created_at: createdAt,
        lang: check.value.lang || 'en',
        reply_count: 0,
      }),
    },
    201,
  )
})

boardRoutes.post('/posts/:id/replies', async (c) => {
  const deviceCheck = validateDeviceId(c.req.header('X-Device-Id') ?? undefined)
  if (!deviceCheck.ok) return c.json({ error: deviceCheck.error }, 400)

  const ip = c.req.header('CF-Connecting-IP') || 'unknown'
  const rl = await checkRateLimit(c.env.SUBSCRIPTIONS, [
    'board',
    'reply',
    ip,
    deviceCheck.value,
  ])
  if (!rl.ok) {
    return c.json({ error: 'rate limited' }, 429)
  }

  const postId = c.req.param('id')
  const existing = await getPost(c.env.BOARD, postId)
  if (!existing) return c.json({ error: 'not found' }, 404)

  let payload: unknown
  try {
    payload = await c.req.json()
  } catch {
    return c.json({ error: 'invalid JSON' }, 400)
  }

  const check = validateNewReply(payload)
  if (!check.ok) return c.json({ error: check.error }, 400)

  const id = crypto.randomUUID()
  const createdAt = Date.now()
  const deviceHash = await hashDeviceId(deviceCheck.value)
  await insertReply(c.env.BOARD, {
    id,
    post_id: postId,
    body: check.value.body,
    author_name: check.value.authorName,
    device_hash: deviceHash,
    created_at: createdAt,
  })

  return c.json(
    {
      reply: publicReply({
        id,
        post_id: postId,
        body: check.value.body,
        author_name: check.value.authorName,
        device_hash: deviceHash,
        created_at: createdAt,
      }),
    },
    201,
  )
})
