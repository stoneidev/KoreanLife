import { useCallback, useEffect, useState } from 'react'
import type { CommunityPost } from '@/entities/community-post'
import { fetchCommunityFeed } from '../api/fetch-feed'

export type FeedStatus = 'loading' | 'success' | 'error'

type FeedState = {
  status: FeedStatus
  posts: CommunityPost[]
  refetch: () => void
}

export function useCommunityFeed(): FeedState {
  const [status, setStatus] = useState<FeedStatus>('loading')
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [nonce, setNonce] = useState(0)

  const refetch = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setStatus('loading')
    fetchCommunityFeed({ signal: controller.signal })
      .then((result) => {
        if (!active) return
        setPosts(result)
        setStatus('success')
      })
      .catch(() => {
        if (!active || controller.signal.aborted) return
        setStatus('error')
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [nonce])

  return { status, posts, refetch }
}
