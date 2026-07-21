import { parsePosts } from '@/entities/community-post'
import type { CommunityPost } from '@/entities/community-post'

const ENDPOINT = 'https://arctic-shift.photon-reddit.com/api/posts/search'
const SUBREDDIT = 'AskAKorean'

type FetchFeedOptions = {
  limit?: number
  /** Injectable for tests; defaults to the global fetch. */
  fetchImpl?: typeof fetch
  signal?: AbortSignal
}

/**
 * Fetch the newest r/AskAKorean posts via the Arctic Shift mirror
 * (the official Reddit API 403s from the browser; this mirror sends CORS `*`).
 */
export async function fetchCommunityFeed({
  limit = 20,
  fetchImpl = fetch,
  signal,
}: FetchFeedOptions = {}): Promise<CommunityPost[]> {
  const url = `${ENDPOINT}?subreddit=${SUBREDDIT}&sort=desc&limit=${limit}`
  const res = await fetchImpl(url, { signal, headers: { Accept: 'application/json' } })

  if (!res.ok) {
    throw new Error(`Community feed request failed (${res.status})`)
  }

  const body: unknown = await res.json()
  const list = Array.isArray(body)
    ? body
    : Array.isArray((body as { data?: unknown })?.data)
      ? ((body as { data: unknown[] }).data)
      : []

  return parsePosts(list)
}
