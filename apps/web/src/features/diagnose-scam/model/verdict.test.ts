import { describe, expect, it } from 'vitest'
import { getScamVerdict, scoreScamChecks } from './verdict'

const weights = { a: 3, b: 2, c: 1 }

describe('scoreScamChecks', () => {
  it('sums the weights of checked ids', () => {
    expect(scoreScamChecks(new Set(['a', 'b']), weights)).toBe(5)
  })

  it('ignores unknown ids', () => {
    expect(scoreScamChecks(new Set(['a', 'zzz']), weights)).toBe(3)
  })

  it('is 0 for an empty selection', () => {
    expect(scoreScamChecks(new Set(), weights)).toBe(0)
  })
})

describe('getScamVerdict', () => {
  it('is idle at score 0', () => {
    expect(getScamVerdict(0)).toEqual({ level: 'idle', cls: 'idle', score: 0 })
  })

  it('is caution for low scores (1-2)', () => {
    expect(getScamVerdict(1).level).toBe('caution')
    expect(getScamVerdict(2).level).toBe('caution')
    expect(getScamVerdict(2).cls).toBe('warn')
  })

  it('is warning for mid scores (3-5)', () => {
    expect(getScamVerdict(3).level).toBe('warning')
    expect(getScamVerdict(5).level).toBe('warning')
    expect(getScamVerdict(5).cls).toBe('warn')
  })

  it('is danger for high scores (6+)', () => {
    expect(getScamVerdict(6).level).toBe('danger')
    expect(getScamVerdict(6).cls).toBe('danger')
  })

  it('carries the score through', () => {
    expect(getScamVerdict(4).score).toBe(4)
  })
})
