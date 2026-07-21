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
  },
}
