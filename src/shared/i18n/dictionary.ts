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
    'nav.community': 'Community',
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

    'scam.core': 'core',
    'scam.verdict.idle': 'Check the items that apply to see your risk level.',
    'scam.verdict.caution': 'Caution ({score} pts) — always verify the contract and registry.',
    'scam.verdict.warning': 'Warning signs ({score} pts) — hold the transfer and re-verify the listing.',
    'scam.verdict.danger': 'Strong scam pattern ({score} pts) — never transfer money.',

    'phrases.kicker': 'Phrase Sheets',
    'phrases.title': 'Say it right, situation by situation',
    'phrases.lead': 'Copy or play these on a call, in chat, or in person.',
    'phrases.copy': 'Copy',
    'phrases.listen': 'Listen',
    'phrases.copied': 'Copied — paste it into the chat',
    'phrases.copyFailed': 'Copy failed',
    'phrases.tip':
      'Nervous about calling? Always open with “My Korean isn’t fluent, please speak slowly.” It changes how fast people talk to you.',

    'reality.kicker': 'Reality Check',
    'reality.title': 'Media vs reality',
    'reality.lead': 'The misconceptions people keep asking about, side by side with the real context.',
    'reality.onScreen': 'On screen',
    'reality.reality': 'Reality',

    'common.viewAll': 'See all',
    'home.popularGuides': 'Popular guides',

    'guides.kicker': 'Guides · Handbook',
    'guides.title': 'Break-through guides for daily life',
    'guides.lead': 'The most repeated community questions, turned into step-by-step fixes.',

    'guide.why': 'Why — community signal',
    'guide.steps': 'Step-by-step',
    'guide.dosDonts': 'Do / Don’t',
    'guide.do': 'Do',
    'guide.dont': 'Don’t',
    'guide.notFound': 'Guide not found.',
    'guide.toPhrases': 'Phrases for this situation',

    'safety.kicker': 'Safety · Housing',
    'safety.title': 'Deposit scam check',
    'safety.lead': 'Renting a goshiwon or one-room? Tick everything that matches your situation.',
    'safety.helpTitle': 'If you suspect a scam',
    'safety.help1.title': 'Police 112 · Interpreter 1345',
    'safety.help1.desc': 'The Danuri call center interprets in 13 languages',
    'safety.help2.title': 'Check the registry at iros.go.kr',
    'safety.help2.desc': 'Confirm the real owner for ₩700 — essential before signing',
    'safety.fullGuide': 'Full deposit-scam guide',

    'community.heading': 'This week’s question',
    'community.question': 'What’s the #1 thing you wish foreigners wouldn’t do?',
    'community.answer':
      'Koreans’ overwhelming #1 answer: being loud on public transit. See the full summary in the etiquette guide.',
    'community.cta': 'Read the summary',

    'community.kicker': 'Live · r/AskAKorean',
    'community.title': 'Community feed',
    'community.lead': 'The newest questions on r/AskAKorean, live. Tap to open on Reddit.',
    'community.loading': 'Loading the latest posts…',
    'community.error': 'Couldn’t load the feed. Check your connection and try again.',
    'community.retry': 'Try again',
    'community.empty': 'No posts right now — check back soon.',
    'community.comments': '{n} comments',

    'apps.kicker': 'Essential Apps',
    'apps.title': 'Apps to install first',
    'apps.lead': 'The apps foreigners in Korea rely on daily. Tap a card to get it.',
    'apps.homeHeading': 'Must-have apps',
    'apps.mustHave': 'Must-have',
  },
  ko: {
    'app.name': 'KoreanLife',
    'app.tagline': '한국 정착, 한 걸음씩',

    'nav.home': '홈',
    'nav.guides': '가이드',
    'nav.phrases': '문장',
    'nav.reality': '리얼',
    'nav.community': '커뮤니티',
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

    'scam.core': '핵심',
    'scam.verdict.idle': '해당 사항을 체크하면 위험도를 진단합니다.',
    'scam.verdict.caution': '주의 ({score}점) — 계약서·등기부등본을 꼭 확인하세요.',
    'scam.verdict.warning': '위험 신호 ({score}점) — 송금 보류하고 매물을 재검증하세요.',
    'scam.verdict.danger': '사기 패턴과 강하게 일치 ({score}점) — 절대 송금하지 마세요.',

    'phrases.kicker': '문장 시트',
    'phrases.title': '상황별 문장 시트',
    'phrases.lead': '전화·채팅·대면에서 그대로 복사하거나 재생해서 보여주세요.',
    'phrases.copy': '복사',
    'phrases.listen': '듣기',
    'phrases.copied': '복사됨 — 채팅창에 붙여넣으세요',
    'phrases.copyFailed': '복사 실패',
    'phrases.tip':
      '전화가 두렵다면 첫 문장은 항상 "한국어가 서툴러서 천천히 말씀해 주세요"로 시작하세요. 상대의 말 속도가 확 달라집니다.',

    'reality.kicker': '리얼 체크',
    'reality.title': '미디어 vs 현실',
    'reality.lead': '커뮤니티에서 반복 질문된 오해를 실제 맥락과 나란히 놓았습니다.',
    'reality.onScreen': '미디어',
    'reality.reality': '현실',

    'common.viewAll': '전체',
    'home.popularGuides': '인기 가이드',

    'guides.kicker': '가이드 · 핸드북',
    'guides.title': '생활 돌파 가이드',
    'guides.lead': '커뮤니티에서 가장 많이 반복된 질문을 단계별 해법으로 정리했습니다.',

    'guide.why': 'Why — 커뮤니티 신호',
    'guide.steps': '단계별 해법',
    'guide.dosDonts': 'Do / Don’t',
    'guide.do': 'Do',
    'guide.dont': 'Don’t',
    'guide.notFound': '가이드를 찾을 수 없어요.',
    'guide.toPhrases': '이 상황에 쓸 문장 시트',

    'safety.kicker': '안전 · 주거',
    'safety.title': '선입금 사기 진단',
    'safety.lead': '고시원·원룸 구할 때 지금 상황에 해당하는 항목을 모두 선택하세요.',
    'safety.helpTitle': '사기 의심될 때',
    'safety.help1.title': '경찰 112 · 외국인 통역 1345',
    'safety.help1.desc': '다누리콜센터는 13개 언어 통역 지원',
    'safety.help2.title': '인터넷등기소에서 등기부등본 열람',
    'safety.help2.desc': '실소유주 확인 700원 — 계약 전 필수',
    'safety.fullGuide': '선입금 사기 전체 가이드',

    'community.heading': '이번 주 질문',
    'community.question': '외국인이 하지 않았으면 하는 것 1순위는?',
    'community.answer':
      '한국인 답변 압도적 1위는 대중교통에서의 큰 소리. 에티켓 가이드에서 전체 요약을 확인하세요.',
    'community.cta': '요약 보기',

    'community.kicker': '실시간 · r/AskAKorean',
    'community.title': '커뮤니티 피드',
    'community.lead': 'r/AskAKorean의 최신 질문을 실시간으로. 탭하면 Reddit에서 열립니다.',
    'community.loading': '최신 글을 불러오는 중…',
    'community.error': '피드를 불러오지 못했어요. 연결을 확인하고 다시 시도하세요.',
    'community.retry': '다시 시도',
    'community.empty': '지금은 글이 없어요 — 잠시 후 다시 확인하세요.',
    'community.comments': '댓글 {n}',

    'apps.kicker': '필수 앱',
    'apps.title': '가장 먼저 설치할 앱',
    'apps.lead': '한국 사는 외국인이 매일 쓰는 앱. 카드를 탭하면 받을 수 있어요.',
    'apps.homeHeading': '필수 앱',
    'apps.mustHave': '필수',
  },
}
