import { describe, expect, it } from 'vitest'
import { formatRelativeTime } from './relative-time'

// fixed "now": 2026-01-01T00:00:00Z in seconds
const now = 1767225600

describe('formatRelativeTime', () => {
  it('shows "just now" under a minute', () => {
    expect(formatRelativeTime(now - 30, 'en', now)).toBe('just now')
    expect(formatRelativeTime(now - 30, 'ko', now)).toBe('방금')
  })

  it('shows minutes', () => {
    expect(formatRelativeTime(now - 5 * 60, 'en', now)).toBe('5m ago')
    expect(formatRelativeTime(now - 5 * 60, 'ko', now)).toBe('5분 전')
  })

  it('shows hours', () => {
    expect(formatRelativeTime(now - 3 * 3600, 'en', now)).toBe('3h ago')
    expect(formatRelativeTime(now - 3 * 3600, 'ko', now)).toBe('3시간 전')
  })

  it('shows days', () => {
    expect(formatRelativeTime(now - 2 * 86400, 'en', now)).toBe('2d ago')
    expect(formatRelativeTime(now - 2 * 86400, 'ko', now)).toBe('2일 전')
  })

  it('clamps future timestamps to "just now"', () => {
    expect(formatRelativeTime(now + 500, 'en', now)).toBe('just now')
  })
})
