export type ScamLevel = 'idle' | 'caution' | 'warning' | 'danger'

export type ScamVerdict = {
  level: ScamLevel
  /** CSS modifier class for the verdict banner. */
  cls: 'idle' | 'warn' | 'danger'
  score: number
}

export function scoreScamChecks(
  checkedIds: Set<string>,
  weights: Record<string, number>,
): number {
  let score = 0
  for (const id of checkedIds) {
    score += weights[id] ?? 0
  }
  return score
}

/**
 * Map a weighted score to a risk level. The label text lives in the i18n
 * dictionary (keyed by level) so the logic stays language-agnostic.
 */
export function getScamVerdict(score: number): ScamVerdict {
  if (score === 0) return { level: 'idle', cls: 'idle', score }
  if (score <= 2) return { level: 'caution', cls: 'warn', score }
  if (score <= 5) return { level: 'warning', cls: 'warn', score }
  return { level: 'danger', cls: 'danger', score }
}
