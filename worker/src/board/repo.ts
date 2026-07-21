export type PostRow = {
  id: string
  title: string
  body: string
  author_name: string
  device_hash: string
  created_at: number
  lang: string
  reply_count?: number
}

export type ReplyRow = {
  id: string
  post_id: string
  body: string
  author_name: string
  device_hash: string
  created_at: number
}

export function publicPost(row: PostRow) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    authorName: row.author_name,
    createdAt: row.created_at,
    lang: row.lang,
    replyCount: row.reply_count ?? 0,
  }
}

export function publicReply(row: ReplyRow) {
  return {
    id: row.id,
    postId: row.post_id,
    body: row.body,
    authorName: row.author_name,
    createdAt: row.created_at,
  }
}

export async function listPosts(db: D1Database, limit: number, cursor?: number) {
  const before = cursor && Number.isFinite(cursor) ? cursor : Number.MAX_SAFE_INTEGER
  const { results } = await db
    .prepare(
      `SELECT p.*,
        (SELECT COUNT(*) FROM replies r WHERE r.post_id = p.id) AS reply_count
       FROM posts p
       WHERE p.created_at < ?
       ORDER BY p.created_at DESC
       LIMIT ?`,
    )
    .bind(before, limit)
    .all<PostRow>()
  return results ?? []
}

export async function getPost(db: D1Database, id: string) {
  return db
    .prepare(
      `SELECT p.*,
        (SELECT COUNT(*) FROM replies r WHERE r.post_id = p.id) AS reply_count
       FROM posts p WHERE p.id = ?`,
    )
    .bind(id)
    .first<PostRow>()
}

export async function listReplies(db: D1Database, postId: string) {
  const { results } = await db
    .prepare(`SELECT * FROM replies WHERE post_id = ? ORDER BY created_at ASC LIMIT 200`)
    .bind(postId)
    .all<ReplyRow>()
  return results ?? []
}

export async function insertPost(db: D1Database, row: Omit<PostRow, 'reply_count'>) {
  await db
    .prepare(
      `INSERT INTO posts (id, title, body, author_name, device_hash, created_at, lang)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(row.id, row.title, row.body, row.author_name, row.device_hash, row.created_at, row.lang)
    .run()
}

export async function insertReply(db: D1Database, row: ReplyRow) {
  await db
    .prepare(
      `INSERT INTO replies (id, post_id, body, author_name, device_hash, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(row.id, row.post_id, row.body, row.author_name, row.device_hash, row.created_at)
    .run()
}
