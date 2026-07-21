import { BOARD_API_BASE, getDeviceId } from '@/shared/config/board'
import type { BoardPost, BoardReply } from '@/entities/board-post'

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `request failed (${res.status})`
    try {
      const body = (await res.json()) as { error?: string }
      if (body.error) message = body.error
    } catch {
      /* ignore */
    }
    throw new Error(message)
  }
  return res.json() as Promise<T>
}

export async function fetchBoardPosts(): Promise<BoardPost[]> {
  const res = await fetch(`${BOARD_API_BASE}/api/board/posts`)
  const data = await parseJson<{ posts: BoardPost[] }>(res)
  return data.posts
}

export async function fetchBoardPost(
  id: string,
): Promise<{ post: BoardPost; replies: BoardReply[] }> {
  const res = await fetch(`${BOARD_API_BASE}/api/board/posts/${id}`)
  return parseJson(res)
}

export async function createBoardPost(input: {
  title: string
  body: string
  authorName: string
  lang: string
}): Promise<BoardPost> {
  const res = await fetch(`${BOARD_API_BASE}/api/board/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': getDeviceId(),
    },
    body: JSON.stringify(input),
  })
  const data = await parseJson<{ post: BoardPost }>(res)
  return data.post
}

export async function createBoardReply(
  postId: string,
  input: { body: string; authorName: string },
): Promise<BoardReply> {
  const res = await fetch(`${BOARD_API_BASE}/api/board/posts/${postId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-Id': getDeviceId(),
    },
    body: JSON.stringify(input),
  })
  const data = await parseJson<{ reply: BoardReply }>(res)
  return data.reply
}
