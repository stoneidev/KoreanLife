import { describe, expect, it } from 'vitest'
import { parsePost, parsePosts } from './post'

const raw = {
  id: '1v252cl',
  title: 'Is this place in Busan real?',
  author: 'kpay10',
  created_utc: 1784599497,
  num_comments: 12,
  score: 34,
  permalink: '/r/AskAKorean/comments/1v252cl/is_this_place/',
  link_flair_text: 'Travel',
  selftext: 'I saw this on Facebook and wondered...',
  stickied: false,
  over_18: false,
}

describe('parsePost', () => {
  it('maps the fields we use', () => {
    const p = parsePost(raw)!
    expect(p.id).toBe('1v252cl')
    expect(p.title).toBe('Is this place in Busan real?')
    expect(p.author).toBe('kpay10')
    expect(p.comments).toBe(12)
    expect(p.score).toBe(34)
    expect(p.flair).toBe('Travel')
    expect(p.createdUtc).toBe(1784599497)
  })

  it('builds an absolute reddit url from the permalink', () => {
    expect(parsePost(raw)!.url).toBe(
      'https://www.reddit.com/r/AskAKorean/comments/1v252cl/is_this_place/',
    )
  })

  it('makes a short plain-text excerpt from selftext', () => {
    const p = parsePost({ ...raw, selftext: 'a'.repeat(300) })!
    expect(p.excerpt.length).toBeLessThanOrEqual(160)
  })

  it('handles a missing flair and empty selftext', () => {
    const p = parsePost({ ...raw, link_flair_text: null, selftext: '' })!
    expect(p.flair).toBeNull()
    expect(p.excerpt).toBe('')
  })

  it('returns null for entries without an id or title', () => {
    expect(parsePost({ ...raw, id: '' })).toBeNull()
    expect(parsePost({ ...raw, title: undefined })).toBeNull()
    expect(parsePost(null)).toBeNull()
  })
})

describe('parsePosts', () => {
  it('parses an array and drops removed/invalid entries', () => {
    const list = parsePosts([raw, { id: '', title: 'x' }, { ...raw, id: '2' }])
    expect(list).toHaveLength(2)
    expect(list.map((p) => p.id)).toEqual(['1v252cl', '2'])
  })

  it('filters out NSFW and stickied posts', () => {
    const list = parsePosts([
      { ...raw, id: 'a', over_18: true },
      { ...raw, id: 'b', stickied: true },
      { ...raw, id: 'c' },
    ])
    expect(list.map((p) => p.id)).toEqual(['c'])
  })
})
