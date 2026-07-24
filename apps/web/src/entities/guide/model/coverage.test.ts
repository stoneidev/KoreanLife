import { describe, expect, it } from 'vitest'
import { guides } from './guides'
import { realityChecks } from '../../reality-check/model/reality-checks'

/**
 * Phase 3 — guard that the previously-uncovered r/AskAKorean pain points
 * now have a home in the app.
 */
describe('pain-point coverage', () => {
  const guideIds = new Set(guides.map((g) => g.id))
  const realityIds = new Set(realityChecks.map((r) => r.id))

  it('covers dating / long-distance relationships', () => {
    expect(guideIds.has('dating-ldr')).toBe(true)
  })

  it('covers jobs / visa / immigration', () => {
    expect(guideIds.has('jobs-visa')).toBe(true)
  })

  it('covers military enlistment', () => {
    expect(guideIds.has('military-enlistment')).toBe(true)
  })

  it('covers disability & accessibility', () => {
    expect(guideIds.has('disability-access')).toBe(true)
  })

  it('covers digital life & fraud (Kakao/Naver)', () => {
    expect(guideIds.has('digital-life')).toBe(true)
  })

  it('covers getting a phone number & passing identity verification', () => {
    expect(guideIds.has('phone-verification')).toBe(true)
  })

  it('covers gyopo identity as a reality check', () => {
    expect(realityIds.has('gyopo')).toBe(true)
  })

  it('covers Korea–Japan relations as a reality check', () => {
    expect(realityIds.has('korea-japan')).toBe(true)
  })
})
