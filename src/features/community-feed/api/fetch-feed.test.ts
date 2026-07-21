import { describe, expect, it, vi } from 'vitest'
import { fetchCommunityFeed } from './fetch-feed'

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as Response
}

describe('fetchCommunityFeed', () => {
  it('calls the Arctic Shift endpoint for r/AskAKorean, newest first', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ data: [] }))
    await fetchCommunityFeed({ fetchImpl, limit: 15 })
    const url = fetchImpl.mock.calls[0][0] as string
    expect(url).toContain('subreddit=AskAKorean')
    expect(url).toContain('sort=desc')
    expect(url).toContain('limit=15')
  })

  it('returns parsed, filtered posts', async () => {
    const body = {
      data: [
        { id: 'a', title: 'First', num_comments: 3, created_utc: 1, permalink: '/r/x/a/' },
        { id: 'b', title: '', num_comments: 0 }, // dropped (no title)
        { id: 'c', title: 'NSFW', over_18: true }, // dropped
      ],
    }
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(body))
    const posts = await fetchCommunityFeed({ fetchImpl })
    expect(posts.map((p) => p.id)).toEqual(['a'])
  })

  it('throws on a non-ok response', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({}, false, 503))
    await expect(fetchCommunityFeed({ fetchImpl })).rejects.toThrow(/503/)
  })

  it('tolerates either {data:[...]} or a bare array', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(jsonResponse([{ id: 'z', title: 'Bare', permalink: '/r/x/z/' }]))
    const posts = await fetchCommunityFeed({ fetchImpl })
    expect(posts.map((p) => p.id)).toEqual(['z'])
  })
})
