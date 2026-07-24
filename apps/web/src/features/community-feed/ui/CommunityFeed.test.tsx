import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { CommunityPost } from '@/entities/community-post'
import { LanguageProvider, dictionary } from '@/shared/i18n'
import { CommunityFeed } from './CommunityFeed'

const mocks = vi.hoisted(() => ({ fetchCommunityFeed: vi.fn() }))
vi.mock('../api/fetch-feed', () => ({ fetchCommunityFeed: mocks.fetchCommunityFeed }))

function post(id: string, title: string): CommunityPost {
  return {
    id,
    title,
    author: 'someone',
    comments: 7,
    score: 3,
    flair: 'Travel',
    excerpt: 'excerpt',
    url: `https://redd.it/${id}`,
    createdUtc: 1,
  }
}

function renderFeed() {
  return render(
    <LanguageProvider dict={dictionary}>
      <CommunityFeed />
    </LanguageProvider>,
  )
}

afterEach(() => mocks.fetchCommunityFeed.mockReset())

describe('CommunityFeed', () => {
  it('shows skeletons while loading', () => {
    mocks.fetchCommunityFeed.mockReturnValue(new Promise(() => {}))
    const { container } = renderFeed()
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument()
    expect(container.querySelectorAll('.post-skeleton').length).toBeGreaterThan(0)
  })

  it('renders posts with an external Reddit link', async () => {
    mocks.fetchCommunityFeed.mockResolvedValue([post('a', 'Is Busan real?')])
    renderFeed()
    const link = await screen.findByRole('link', { name: /Is Busan real/ })
    expect(link).toHaveAttribute('href', 'https://redd.it/a')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('shows an error state with a retry button', async () => {
    mocks.fetchCommunityFeed.mockRejectedValue(new Error('boom'))
    renderFeed()
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
    expect(screen.getByRole('button', { name: /try again|다시/i })).toBeInTheDocument()
  })
})
