export function scoreScamChecks(checkedIds: Set<string>, weights: Record<string, number>) {
  let score = 0
  for (const id of checkedIds) {
    score += weights[id] ?? 0
  }
  return score
}

export function getScamVerdict(score: number) {
  if (score === 0) {
    return { cls: 'idle' as const, label: '해당 사항을 체크하면 위험도를 진단합니다.' }
  }
  if (score <= 2) {
    return { cls: 'warn' as const, label: `주의 (${score}점) — 계약서·등기부등본을 꼭 확인하세요.` }
  }
  if (score <= 5) {
    return { cls: 'warn' as const, label: `위험 신호 (${score}점) — 송금 보류하고 매물을 재검증하세요.` }
  }
  return {
    cls: 'danger' as const,
    label: `사기 패턴과 강하게 일치 (${score}점) — 절대 송금하지 마세요.`,
  }
}
