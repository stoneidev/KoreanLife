import type { Dictionary } from './translate'

/**
 * Central string table. Keys are dot-namespaced by area (nav.*, home.*, …).
 * English is the source of truth; Korean is the toggle target.
 * New feature strings are appended here as features are built.
 */
export const dictionary: Dictionary = {
  en: {
    'app.name': 'KoreanLife',
    'app.tagline': 'Settle into Korea, step by step',

    'nav.home': 'Home',
    'nav.guides': 'Guides',
    'nav.phrases': 'Phrases',
    'nav.reality': 'Reality',
    'nav.safety': 'Safety',

    'lang.toggle': '한국어',

    'home.hero.kicker': 'r/AskAKorean · Jul 2026 field notes',
    'home.hero.title': 'Settle into Korea without the guesswork.',
    'home.hero.lead':
      'The real early-days barriers — phone calls, scams, and reading the room — solved in one place.',
    'home.hero.ctaPhrases': 'Phrase sheets',
    'home.hero.ctaSafety': 'Scam check',

    'quick.heading': 'Solve it now',
    'quick.phrases.title': 'Phrases, not calls',
    'quick.phrases.desc': 'Clinic · salon · delivery',
    'quick.safety.title': 'Deposit scam check',
    'quick.safety.desc': 'Before you transfer',
    'quick.delivery.title': 'Order without a #',
    'quick.delivery.desc': 'Coupang Eats · Shuttle',
    'quick.reality.title': 'Media vs reality',
    'quick.reality.desc': 'Bullying · dating · money',
  },
  ko: {
    'app.name': 'KoreanLife',
    'app.tagline': '한국 정착, 한 걸음씩',

    'nav.home': '홈',
    'nav.guides': '가이드',
    'nav.phrases': '문장',
    'nav.reality': '리얼',
    'nav.safety': '안전',

    'lang.toggle': 'EN',

    'home.hero.kicker': 'r/AskAKorean · 2026년 7월 현장 노트',
    'home.hero.title': '한국 정착, 더는 맨땅에 헤딩하지 않기.',
    'home.hero.lead':
      '전화·사기·눈치 — 정착 초기의 진짜 장벽만 한곳에서 해결합니다.',
    'home.hero.ctaPhrases': '문장 시트',
    'home.hero.ctaSafety': '사기 진단',

    'quick.heading': '즉시 해결',
    'quick.phrases.title': '전화 대신 문장',
    'quick.phrases.desc': '병원 · 미용실 · 배달',
    'quick.safety.title': '선입금 사기 진단',
    'quick.safety.desc': '송금하기 전에',
    'quick.delivery.title': '번호 없이 배달',
    'quick.delivery.desc': '쿠팡이츠 · Shuttle',
    'quick.reality.title': '미디어 vs 현실',
    'quick.reality.desc': '왕따 · 연애 · 순자산',
  },
}
