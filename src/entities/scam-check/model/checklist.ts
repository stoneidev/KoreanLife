export type ScamCheckItem = {
  id: string
  text: string
  weight: number
}

export const scamChecklist: ScamCheckItem[] = [
  { id: 'no-visit', text: '방을 직접 또는 영상통화로 보여주지 않으려 한다', weight: 3 },
  { id: 'pre-deposit', text: '계약서 작성 전에 보증금·예약금 송금을 요구한다', weight: 3 },
  { id: 'other-account', text: '임대인 본인 명의가 아닌 계좌로 송금을 요구한다', weight: 3 },
  { id: 'too-cheap', text: '주변 시세보다 눈에 띄게 저렴하다', weight: 2 },
  { id: 'rush', text: '"다른 사람이 기다린다"며 결정을 재촉한다', weight: 2 },
  { id: 'chat-only', text: '카카오톡·메신저로만 소통하고 전화·대면을 피한다', weight: 2 },
  { id: 'no-registry', text: '등기부등본 확인을 거절하거나 회피한다', weight: 3 },
  { id: 'foreigner-target', text: '"외국인이라 서류 없이 가능하다"고 강조한다', weight: 2 },
]
