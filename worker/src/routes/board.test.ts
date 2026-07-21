import { beforeEach, describe, expect, it, vi } from 'vitest'
import worker from '../index'

function makeKV() {
  const store = new Map<string, string>()
  return {
    store,
    get: vi.fn(async (k: string) => store.get(k) ?? null),
    put: vi.fn(async (k: string, v: string) => void store.set(k, v)),
    delete: vi.fn(async (k: string) => void store.delete(k)),
  }
}

type Row = Record<string, unknown>

function makeD1() {
  const posts: Row[] = []
  const replies: Row[] = []

  function prepare(sql: string) {
    const binds: unknown[] = []
    const stmt = {
      bind(...args: unknown[]) {
        binds.push(...args)
        return stmt
      },
      async first<T>() {
        if (sql.includes('FROM posts') && sql.includes('WHERE p.id = ?')) {
          const id = binds[0]
          const p = posts.find((row) => row.id === id)
          if (!p) return null
          const reply_count = replies.filter((r) => r.post_id === id).length
          return { ...p, reply_count } as T
        }
        return null
      },
      async all<T>() {
        if (/SELECT \* FROM replies/i.test(sql)) {
          const postId = binds[0]
          return {
            results: replies
              .filter((r) => r.post_id === postId)
              .sort((a, b) => Number(a.created_at) - Number(b.created_at)) as T[],
          }
        }
        if (/FROM posts p/i.test(sql) && /ORDER BY p\.created_at DESC/i.test(sql)) {
          const before = Number(binds[0])
          const limit = Number(binds[1])
          const rows = posts
            .filter((p) => Number(p.created_at) < before)
            .sort((a, b) => Number(b.created_at) - Number(a.created_at))
            .slice(0, limit)
            .map((p) => ({
              ...p,
              reply_count: replies.filter((r) => r.post_id === p.id).length,
            }))
          return { results: rows as T[] }
        }
        return { results: [] as T[] }
      },
      async run() {
        if (sql.startsWith('INSERT INTO posts')) {
          posts.push({
            id: binds[0],
            title: binds[1],
            body: binds[2],
            author_name: binds[3],
            device_hash: binds[4],
            created_at: binds[5],
            lang: binds[6],
          })
        }
        if (sql.startsWith('INSERT INTO replies')) {
          replies.push({
            id: binds[0],
            post_id: binds[1],
            body: binds[2],
            author_name: binds[3],
            device_hash: binds[4],
            created_at: binds[5],
          })
        }
        return { success: true }
      },
    }
    return stmt
  }

  return { prepare: vi.fn(prepare), _posts: posts, _replies: replies }
}

const SITE = 'https://koreanlife.pages.dev'
const DEVICE = 'testdevice001'

function makeEnv() {
  const kv = makeKV()
  const d1 = makeD1()
  return {
    SUBSCRIPTIONS: kv as unknown as KVNamespace,
    BOARD: d1 as unknown as D1Database,
    VAPID_SUBJECT: 'mailto:test@example.com',
    ALLOWED_ORIGIN: SITE,
    VAPID_JWK: JSON.stringify({ publicKey: 'stub-public', privateKey: 'stub-private' }),
    _kv: kv,
    _d1: d1,
  }
}

function post(path: string, body: unknown, headers: Record<string, string> = {}) {
  return new Request(`https://worker.dev${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: SITE,
      'X-Device-Id': DEVICE,
      ...headers,
    },
    body: JSON.stringify(body),
  })
}

describe('board routes', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('creates a post and lists it', async () => {
    const env = makeEnv()
    const create = await worker.fetch(
      post('/api/board/posts', {
        title: 'SIM card tips?',
        body: 'Where do I buy one at Incheon?',
        authorName: 'Alex',
      }),
      env,
    )
    expect(create.status).toBe(201)
    const created = (await create.json()) as { post: { id: string; title: string } }
    expect(created.post.title).toBe('SIM card tips?')

    const list = await worker.fetch(
      new Request('https://worker.dev/api/board/posts', { headers: { Origin: SITE } }),
      env,
    )
    expect(list.status).toBe(200)
    const body = (await list.json()) as { posts: { id: string }[] }
    expect(body.posts).toHaveLength(1)
    expect(body.posts[0].id).toBe(created.post.id)
  })

  it('rejects post without device id', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      post(
        '/api/board/posts',
        { title: 't', body: 'b', authorName: 'a' },
        { 'X-Device-Id': '' },
      ),
      env,
    )
    // empty header may be omitted — send request without it
    const bare = await worker.fetch(
      new Request('https://worker.dev/api/board/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Origin: SITE },
        body: JSON.stringify({ title: 't', body: 'b', authorName: 'a' }),
      }),
      env,
    )
    expect(bare.status).toBe(400)
    expect(res.status).toBe(400)
  })

  it('adds a reply to a post', async () => {
    const env = makeEnv()
    const create = await worker.fetch(
      post('/api/board/posts', { title: 'Hello', body: 'First post', authorName: 'Alex' }),
      env,
    )
    const { post: p } = (await create.json()) as { post: { id: string } }

    const reply = await worker.fetch(
      post(`/api/board/posts/${p.id}/replies`, { body: 'Welcome!', authorName: 'Sam' }),
      env,
    )
    expect(reply.status).toBe(201)

    const detail = await worker.fetch(
      new Request(`https://worker.dev/api/board/posts/${p.id}`, { headers: { Origin: SITE } }),
      env,
    )
    const data = (await detail.json()) as { replies: { body: string }[] }
    expect(data.replies).toHaveLength(1)
    expect(data.replies[0].body).toBe('Welcome!')
  })

  it('returns 404 for unknown post detail', async () => {
    const env = makeEnv()
    const res = await worker.fetch(
      new Request('https://worker.dev/api/board/posts/missing', { headers: { Origin: SITE } }),
      env,
    )
    expect(res.status).toBe(404)
  })
})
