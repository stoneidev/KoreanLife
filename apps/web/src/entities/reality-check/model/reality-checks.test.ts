import { describe, expect, it } from 'vitest'
import { realityChecks } from './reality-checks'

describe('realityChecks', () => {
  it('has entries', () => {
    expect(realityChecks.length).toBeGreaterThanOrEqual(5)
  })

  it('every field is bilingual and non-empty', () => {
    for (const rc of realityChecks) {
      for (const field of [rc.topic, rc.drama, rc.real, rc.source]) {
        expect(field.en).toBeTruthy()
        expect(field.ko).toBeTruthy()
      }
    }
  })

  it('has unique ids', () => {
    const ids = realityChecks.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
