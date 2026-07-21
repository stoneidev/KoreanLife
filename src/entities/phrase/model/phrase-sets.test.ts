import { describe, expect, it } from 'vitest'
import { getPhraseSetById, phraseSets } from './phrase-sets'

describe('phraseSets', () => {
  it('has the four core situations', () => {
    expect(phraseSets.map((s) => s.id)).toEqual(['hospital', 'salon', 'delivery', 'housing'])
  })

  it('every phrase carries ko, roman and en', () => {
    for (const set of phraseSets) {
      for (const p of set.phrases) {
        expect(p.ko).toBeTruthy()
        expect(p.roman).toBeTruthy()
        expect(p.en).toBeTruthy()
      }
    }
  })

  it('every set label is bilingual', () => {
    for (const set of phraseSets) {
      expect(set.label.en).toBeTruthy()
      expect(set.label.ko).toBeTruthy()
    }
  })

  it('getPhraseSetById finds a set', () => {
    expect(getPhraseSetById('hospital')?.label.en).toBe('Clinic')
  })

  it('getPhraseSetById returns undefined for unknown ids', () => {
    expect(getPhraseSetById('nope')).toBeUndefined()
  })
})
