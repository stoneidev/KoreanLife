export type RealityCheck = {
  id: string
  topic: string
  drama: string
  real: string
  source: string
}

export const realityChecks: RealityCheck[] = [
  {
    id: 'bullying',
    topic: '학교 왕따·폭력',
    drama: '더 글로리처럼 극단적 신체 폭력이 일상적으로 벌어진다',
    real: '괴롭힘 문제는 존재하지만 드라마는 극화된 사례. 현재는 언어·따돌림·사이버 형태가 다수',
    source: '"Is school bullying this extreme?" 외 반복 질문 3건',
  },
  {
    id: 'dating-speed',
    topic: '연애 속도',
    drama: '운명적 만남 후 재벌과 초고속 연애',
    real: '소개팅·앱 중심, 100일 단위 기념일 문화. 며칠 만에 연락이 끊기는 건 흔한 소프트 거절',
    source: '"Why Koreans disappear after a few days of talking?"',
  },
  {
    id: 'dystopia',
    topic: '사이버펑크 디스토피아?',
    drama: '오징어게임·기생충 = 한국 전체가 초경쟁 지옥',
    real: '구조적 스트레스(입시·근로)는 실재하지만, 일상은 편의·안전·인프라 만족도가 높은 편',
    source: '"koreaboos view South Korea as a cyberpunk dystopia" (65 댓글)',
  },
  {
    id: 'net-worth',
    topic: '30대 순자산 2억?',
    drama: '"30대 초반에 2억은 보통" — SNS·지인발 기준',
    real: '통계상 30대 가구 순자산 중앙값은 그보다 낮음. 상위권 사례가 평균처럼 유통되는 것',
    source: '"200 million won net worth by early 30s" (66 댓글)',
  },
  {
    id: 'crossed-arms',
    topic: '팔짱은 무례?',
    drama: 'K드라마 속 재벌이 팔짱 끼면 분노·권위의 표시',
    real: '일상에서 팔짱은 대부분 그냥 편한 자세. 다만 상사 앞 면담 중이라면 피하는 게 무난',
    source: '"Is crossed arms considered rude in Korea?" (22 댓글)',
  },
]
