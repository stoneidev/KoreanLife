import { useCallback, useEffect, useState } from 'react'
import type { BoardPost, BoardReply } from '@/entities/board-post'
import { createBoardPost, createBoardReply, fetchBoardPost, fetchBoardPosts } from '../api/board-api'

export type BoardStatus = 'loading' | 'ready' | 'error'

export function useBoardList() {
  const [status, setStatus] = useState<BoardStatus>('loading')
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const next = await fetchBoardPosts()
      setPosts(next)
      setStatus('ready')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { status, posts, error, refetch, setPosts }
}

export function useBoardDetail(postId: string | null) {
  const [status, setStatus] = useState<BoardStatus>('loading')
  const [post, setPost] = useState<BoardPost | null>(null)
  const [replies, setReplies] = useState<BoardReply[]>([])
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!postId) return
    setStatus('loading')
    setError(null)
    try {
      const data = await fetchBoardPost(postId)
      setPost(data.post)
      setReplies(data.replies)
      setStatus('ready')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }, [postId])

  useEffect(() => {
    if (postId) void refetch()
  }, [postId, refetch])

  return { status, post, replies, error, refetch, setReplies, setPost }
}

export { createBoardPost, createBoardReply }
