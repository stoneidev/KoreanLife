import { describe, expect, it } from 'vitest'
import { iconNames } from '@/shared/ui'
import { appCategories, essentialApps, getAppsByCategory } from './apps'

describe('essentialApps data', () => {
  it('has a healthy number of curated apps', () => {
    expect(essentialApps.length).toBeGreaterThanOrEqual(10)
  })

  it('has unique ids', () => {
    const ids = essentialApps.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every app is fully bilingual and linked', () => {
    for (const app of essentialApps) {
      expect(app.name).toBeTruthy()
      expect(app.tagline.en).toBeTruthy()
      expect(app.tagline.ko).toBeTruthy()
      expect(app.why.en).toBeTruthy()
      expect(app.why.ko).toBeTruthy()
      expect(app.url).toMatch(/^https?:\/\//)
    }
  })

  it('every category is a registered icon', () => {
    const registered = new Set<string>(iconNames)
    for (const cat of appCategories) {
      expect(registered.has(cat.icon), `${cat.id} → ${cat.icon}`).toBe(true)
    }
  })

  it('every app references an existing category', () => {
    const catIds = new Set(appCategories.map((c) => c.id))
    for (const app of essentialApps) {
      expect(catIds.has(app.category), `${app.id} → ${app.category}`).toBe(true)
    }
  })

  it('marks some apps as must-have', () => {
    expect(essentialApps.some((a) => a.mustHave)).toBe(true)
  })
})

describe('getAppsByCategory', () => {
  it('groups apps under their category, preserving category order', () => {
    const groups = getAppsByCategory()
    expect(groups.length).toBe(appCategories.length)
    expect(groups[0].category.id).toBe(appCategories[0].id)
    // every app is placed in exactly one group
    const total = groups.reduce((n, g) => n + g.apps.length, 0)
    expect(total).toBe(essentialApps.length)
  })

  it('omits empty categories', () => {
    for (const g of getAppsByCategory()) {
      expect(g.apps.length).toBeGreaterThan(0)
    }
  })
})
