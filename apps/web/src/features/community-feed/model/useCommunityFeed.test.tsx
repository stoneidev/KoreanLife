import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { CommunityPost } from '@/entities/community-post'
import { useCommunityFeed } from './useCommunityFeed'

const mocks = vi.hoisted(() => ({ fetchCommunityFeed: vi.fn() }))
vi.mock('../api/fetch-feed', () => ({ fetchCommunityFeed: mocks.fetchCommunityFeed }))

function post(id: string): CommunityPost {
  return {
    id,
    title: `Post ${id}`,
    author: 'u',
    comments: 1,
    score: 1,
    flair: null,
    excerpt: '',
    url: `https://redd.it/${id}`,
    createdUtc: 1,
  }
}

function Probe() {
  const { status, posts, refetch } = useCommunityFeed()
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="count">{posts.length}</span>
      <button onClick={refetch}>refetch</button>
    </div>
  )
}

afterEach(() => {
  mocks.fetchCommunityFeed.mockReset()
})

describe('useCommunityFeed', () => {
  it('goes loading → success and exposes posts', async () => {
    mocks.fetchCommunityFeed.mockResolvedValue([post('a'), post('b')])
    render(<Probe />)
    expect(screen.getByTestId('status')).toHaveTextContent('loading')
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('success'))
    expect(screen.getByTestId('count')).toHaveTextContent('2')
  })

  it('goes loading → error when the fetch rejects', async () => {
    mocks.fetchCommunityFeed.mockRejectedValue(new Error('boom'))
    render(<Probe />)
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('error'))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('refetch re-runs the request', async () => {
    mocks.fetchCommunityFeed.mockRejectedValueOnce(new Error('boom'))
    mocks.fetchCommunityFeed.mockResolvedValueOnce([post('a')])
    render(<Probe />)
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('error'))
    await userEvent.click(screen.getByText('refetch'))
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('success'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })
})
