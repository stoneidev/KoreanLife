export type CommunityPost = {
  id: string
  title: string
  author: string
  comments: number
  score: number
  flair: string | null
  excerpt: string
  url: string
  createdUtc: number
}

/** Raw shape is `unknown` — the API returns full Reddit listing objects. */
type RawPost = Record<string, unknown> | null | undefined

const EXCERPT_MAX = 160

function toExcerpt(selftext: unknown): string {
  if (typeof selftext !== 'string' || !selftext.trim()) return ''
  // Collapse whitespace/newlines, strip common markdown link/format noise.
  const flat = selftext
    .replace(/\s+/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
  return flat.length > EXCERPT_MAX ? `${flat.slice(0, EXCERPT_MAX - 1).trimEnd()}…` : flat
}

/**
 * Convert one raw Reddit/Arctic-Shift post into our domain model.
 * Returns null when the entry is unusable (removed, missing id/title).
 */
export function parsePost(raw: RawPost): CommunityPost | null {
  if (!raw || typeof raw !== 'object') return null
  const id = typeof raw.id === 'string' ? raw.id : ''
  const title = typeof raw.title === 'string' ? raw.title : ''
  if (!id || !title) return null

  const permalink = typeof raw.permalink === 'string' ? raw.permalink : ''

  return {
    id,
    title,
    author: typeof raw.author === 'string' ? raw.author : '[unknown]',
    comments: typeof raw.num_comments === 'number' ? raw.num_comments : 0,
    score: typeof raw.score === 'number' ? raw.score : 0,
    flair: typeof raw.link_flair_text === 'string' && raw.link_flair_text ? raw.link_flair_text : null,
    excerpt: toExcerpt(raw.selftext),
    url: permalink ? `https://www.reddit.com${permalink}` : `https://redd.it/${id}`,
    createdUtc: typeof raw.created_utc === 'number' ? raw.created_utc : 0,
  }
}

/** Parse a list, dropping invalid, NSFW and stickied entries. */
export function parsePosts(raws: unknown[]): CommunityPost[] {
  const result: CommunityPost[] = []
  for (const raw of raws) {
    if (raw && typeof raw === 'object') {
      const obj = raw as Record<string, unknown>
      if (obj.over_18 === true || obj.stickied === true) continue
    }
    const post = parsePost(raw as RawPost)
    if (post) result.push(post)
  }
  return result
}
