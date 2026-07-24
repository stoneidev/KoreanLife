import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createBoardPost, fetchBoardPosts } from './board-api'

describe('board-api', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    vi.stubGlobal('localStorage', {
      getItem: () => 'testdevice001',
      setItem: () => undefined,
    })
  })

  it('lists posts from the worker', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ posts: [{ id: '1', title: 'Hi', body: 'x', authorName: 'A', createdAt: 1, lang: 'en', replyCount: 0 }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const posts = await fetchBoardPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe('Hi')
  })

  it('creates a post with device header', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          post: {
            id: 'p1',
            title: 'SIM',
            body: 'tips',
            authorName: 'Alex',
            createdAt: 1,
            lang: 'en',
            replyCount: 0,
          },
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const post = await createBoardPost({
      title: 'SIM',
      body: 'tips',
      authorName: 'Alex',
      lang: 'en',
    })
    expect(post.id).toBe('p1')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/board/posts'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'X-Device-Id': 'testdevice001' }),
      }),
    )
  })
})
