import type { Localized } from '@/shared/i18n'

export type RealityCheck = {
  id: string
  topic: Localized
  drama: Localized
  real: Localized
  source: Localized
}

export const realityChecks: RealityCheck[] = [
  {
    id: 'bullying',
    topic: { en: 'School bullying & violence', ko: '학교 왕따·폭력' },
    drama: {
      en: 'Extreme physical violence happens daily, like in The Glory',
      ko: '더 글로리처럼 극단적 신체 폭력이 일상적으로 벌어진다',
    },
    real: {
      en: 'Bullying exists, but dramas are heightened — verbal, social exclusion and cyber forms dominate today',
      ko: '괴롭힘 문제는 존재하지만 드라마는 극화된 사례. 현재는 언어·따돌림·사이버 형태가 다수',
    },
    source: {
      en: '“Is school bullying this extreme?” + 3 recurring threads',
      ko: '"Is school bullying this extreme?" 외 반복 질문 3건',
    },
  },
  {
    id: 'dating-speed',
    topic: { en: 'Dating speed', ko: '연애 속도' },
    drama: {
      en: 'A fated meeting, then a whirlwind romance with a chaebol heir',
      ko: '운명적 만남 후 재벌과 초고속 연애',
    },
    real: {
      en: 'Mostly set-ups and apps, 100-day anniversary culture. Going quiet after a few days is a common soft rejection',
      ko: '소개팅·앱 중심, 100일 단위 기념일 문화. 며칠 만에 연락이 끊기는 건 흔한 소프트 거절',
    },
    source: {
      en: '“Why Koreans disappear after a few days of talking?”',
      ko: '"Why Koreans disappear after a few days of talking?"',
    },
  },
  {
    id: 'dystopia',
    topic: { en: 'A cyberpunk dystopia?', ko: '사이버펑크 디스토피아?' },
    drama: {
      en: 'Squid Game & Parasite = all of Korea is a hyper-competitive hell',
      ko: '오징어게임·기생충 = 한국 전체가 초경쟁 지옥',
    },
    real: {
      en: 'Structural stress (exams, work) is real, but daily life scores high on convenience, safety and infrastructure',
      ko: '구조적 스트레스(입시·근로)는 실재하지만, 일상은 편의·안전·인프라 만족도가 높은 편',
    },
    source: {
      en: '“koreaboos view South Korea as a cyberpunk dystopia” (65 replies)',
      ko: '"koreaboos view South Korea as a cyberpunk dystopia" (65 댓글)',
    },
  },
  {
    id: 'net-worth',
    topic: { en: '₩200M net worth in your 30s?', ko: '30대 순자산 2억?' },
    drama: {
      en: '“₩200M by your early 30s is normal” — per social media and acquaintances',
      ko: '"30대 초반에 2억은 보통" — SNS·지인발 기준',
    },
    real: {
      en: 'The median net worth for households in their 30s is well below that; top-tier cases circulate as if they were average',
      ko: '통계상 30대 가구 순자산 중앙값은 그보다 낮음. 상위권 사례가 평균처럼 유통되는 것',
    },
    source: {
      en: '“200 million won net worth by early 30s” (66 replies)',
      ko: '"200 million won net worth by early 30s" (66 댓글)',
    },
  },
  {
    id: 'crossed-arms',
    topic: { en: 'Are crossed arms rude?', ko: '팔짱은 무례?' },
    drama: {
      en: 'A chaebol crossing his arms signals anger or authority',
      ko: 'K드라마 속 재벌이 팔짱 끼면 분노·권위의 표시',
    },
    real: {
      en: 'In daily life it’s usually just a comfortable posture — though avoid it during a face-to-face with a superior',
      ko: '일상에서 팔짱은 대부분 그냥 편한 자세. 다만 상사 앞 면담 중이라면 피하는 게 무난',
    },
    source: {
      en: '“Is crossed arms considered rude in Korea?” (22 replies)',
      ko: '"Is crossed arms considered rude in Korea?" (22 댓글)',
    },
  },
]
