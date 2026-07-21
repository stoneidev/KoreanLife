export const LIMITS = {
  titleMax: 120,
  bodyMax: 4000,
  replyMax: 2000,
  authorMax: 40,
  listDefault: 20,
  listMax: 50,
  ratePerMinute: 10,
} as const

export type NewPostInput = {
  title: string
  body: string
  authorName: string
  lang?: string
}

export type NewReplyInput = {
  body: string
  authorName: string
}

export type ValidationOk<T> = { ok: true; value: T }
export type ValidationErr = { ok: false; error: string }

function trimText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateDeviceId(raw: string | undefined): ValidationOk<string> | ValidationErr {
  if (!raw || typeof raw !== 'string') return { ok: false, error: 'missing device id' }
  const id = raw.trim()
  if (id.length < 8 || id.length > 128) return { ok: false, error: 'invalid device id' }
  if (!/^[A-Za-z0-9_-]+$/.test(id)) return { ok: false, error: 'invalid device id' }
  return { ok: true, value: id }
}

export function validateNewPost(input: unknown): ValidationOk<NewPostInput> | ValidationErr {
  if (!input || typeof input !== 'object') return { ok: false, error: 'not an object' }
  const obj = input as Record<string, unknown>
  const title = trimText(obj.title)
  const body = trimText(obj.body)
  const authorName = trimText(obj.authorName ?? obj.author_name)
  const lang = trimText(obj.lang) || 'en'

  if (!title) return { ok: false, error: 'title required' }
  if (title.length > LIMITS.titleMax) return { ok: false, error: 'title too long' }
  if (!body) return { ok: false, error: 'body required' }
  if (body.length > LIMITS.bodyMax) return { ok: false, error: 'body too long' }
  if (!authorName) return { ok: false, error: 'author name required' }
  if (authorName.length > LIMITS.authorMax) return { ok: false, error: 'author name too long' }
  if (lang !== 'en' && lang !== 'ko') return { ok: false, error: 'invalid lang' }

  return { ok: true, value: { title, body, authorName, lang } }
}

export function validateNewReply(input: unknown): ValidationOk<NewReplyInput> | ValidationErr {
  if (!input || typeof input !== 'object') return { ok: false, error: 'not an object' }
  const obj = input as Record<string, unknown>
  const body = trimText(obj.body)
  const authorName = trimText(obj.authorName ?? obj.author_name)

  if (!body) return { ok: false, error: 'body required' }
  if (body.length > LIMITS.replyMax) return { ok: false, error: 'body too long' }
  if (!authorName) return { ok: false, error: 'author name required' }
  if (authorName.length > LIMITS.authorMax) return { ok: false, error: 'author name too long' }

  return { ok: true, value: { body, authorName } }
}

export function parseListLimit(raw: string | undefined): number {
  const n = Number(raw ?? LIMITS.listDefault)
  if (!Number.isFinite(n)) return LIMITS.listDefault
  return Math.min(LIMITS.listMax, Math.max(1, Math.floor(n)))
}
