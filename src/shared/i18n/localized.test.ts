import { describe, expect, it } from 'vitest'
import { pick } from './localized'
import type { Localized } from './localized'

const greeting: Localized = { en: 'Hello', ko: '안녕' }

describe('pick', () => {
  it('returns the value for the requested language', () => {
    expect(pick(greeting, 'en')).toBe('Hello')
    expect(pick(greeting, 'ko')).toBe('안녕')
  })

  it('falls back to English when the Korean value is empty', () => {
    const partial: Localized = { en: 'Only EN', ko: '' }
    expect(pick(partial, 'ko')).toBe('Only EN')
  })
})
