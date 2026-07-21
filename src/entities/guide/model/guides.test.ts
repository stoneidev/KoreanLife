import { describe, expect, it } from 'vitest'
import {
  filterGuidesByCategory,
  getGuideById,
  getGuideCategories,
  guides,
} from './guides'

describe('guides data', () => {
  it('has unique ids', () => {
    const ids = guides.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every localized field is filled in both languages', () => {
    for (const g of guides) {
      for (const field of [g.category, g.title, g.summary, g.pain]) {
        expect(field.en, `${g.id} en`).toBeTruthy()
        expect(field.ko, `${g.id} ko`).toBeTruthy()
      }
      expect(g.steps.length).toBeGreaterThan(0)
      for (const step of g.steps) {
        expect(step.en).toBeTruthy()
        expect(step.ko).toBeTruthy()
      }
    }
  })
})

describe('getGuideById', () => {
  it('finds a guide', () => {
    expect(getGuideById('deposit-scam')?.icon).toBe('🏠')
  })
  it('returns undefined for unknown ids', () => {
    expect(getGuideById('nope')).toBeUndefined()
  })
})

describe('getGuideCategories', () => {
  it('leads with the "all" sentinel and de-duplicates', () => {
    const cats = getGuideCategories('en')
    expect(cats[0]).toBe('All')
    expect(new Set(cats).size).toBe(cats.length)
  })
})

describe('filterGuidesByCategory', () => {
  it('returns everything for the "all" sentinel', () => {
    expect(filterGuidesByCategory('All', 'en')).toHaveLength(guides.length)
    expect(filterGuidesByCategory('전체', 'ko')).toHaveLength(guides.length)
  })

  it('filters to a matching category', () => {
    const housing = filterGuidesByCategory('Housing & Safety', 'en')
    expect(housing.length).toBeGreaterThan(0)
    expect(housing.every((g) => g.category.en === 'Housing & Safety')).toBe(true)
  })
})
