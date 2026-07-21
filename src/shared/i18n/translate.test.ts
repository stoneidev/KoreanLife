import { describe, expect, it } from 'vitest'
import { resolveLang, translate } from './translate'
import type { Dictionary } from './translate'

const dict: Dictionary = {
  en: {
    'home.title': 'Living in Korea',
    'greet': 'Hi, {name}',
  },
  ko: {
    'home.title': '한국 생활',
    'greet': '{name}님 안녕하세요',
  },
}

describe('translate', () => {
  it('returns the string for the active language', () => {
    expect(translate(dict, 'en', 'home.title')).toBe('Living in Korea')
    expect(translate(dict, 'ko', 'home.title')).toBe('한국 생활')
  })

  it('interpolates {vars}', () => {
    expect(translate(dict, 'en', 'greet', { name: 'Sam' })).toBe('Hi, Sam')
    expect(translate(dict, 'ko', 'greet', { name: 'Sam' })).toBe('Sam님 안녕하세요')
  })

  it('falls back to English when a key is missing in the active language', () => {
    const partial: Dictionary = { en: { only: 'English' }, ko: {} }
    expect(translate(partial, 'ko', 'only')).toBe('English')
  })

  it('returns the key itself when it is missing everywhere', () => {
    expect(translate(dict, 'en', 'nope.key')).toBe('nope.key')
  })
})

describe('resolveLang', () => {
  it('keeps a supported language', () => {
    expect(resolveLang('ko')).toBe('ko')
    expect(resolveLang('en')).toBe('en')
  })

  it('defaults to English for anything unsupported or empty', () => {
    expect(resolveLang('fr')).toBe('en')
    expect(resolveLang(null)).toBe('en')
    expect(resolveLang(undefined)).toBe('en')
  })
})
