import { DEFAULT_LANG } from '@/shared/i18n'
import type { Lang, Localized } from '@/shared/i18n'

export type Guide = {
  id: string
  code: string
  icon: string
  category: Localized
  title: Localized
  summary: Localized
  pain: Localized
  steps: Localized[]
  dos: Localized[]
  donts: Localized[]
}

/** Sentinel label for the "show everything" filter, per language. */
export const ALL_CATEGORY: Localized = { en: 'All', ko: '전체' }

export const guides: Guide[] = [
  {
    id: 'phone-booking',
    code: '01',
    icon: '📞',
    category: { en: 'Booking & Calls', ko: '예약·전화' },
    title: {
      en: 'Book a clinic or salon without calling',
      ko: '전화 없이 병원·미용실 예약하기',
    },
    summary: {
      en: 'Skip the phone barrier with Naver Booking, KakaoMap and apps',
      ko: '네이버 예약·카카오맵·앱으로 전화 장벽 우회',
    },
    pain: {
      en: '"Local booking/phone call walls" — the triple barrier of phone + Korean + app',
      ko: '"Local booking/phone call walls" — 전화·한국어·앱 3중 장벽',
    },
    steps: [
      {
        en: 'On Naver Map, search clinics/salons and prefer ones with a "예약 (Book)" button',
        ko: '네이버 지도에서 병원·미용실 검색 후 "예약" 버튼이 있는 곳을 우선 선택',
      },
      {
        en: 'Naver Booking works on a foreigner account too (email sign-up, no ID verification)',
        ko: '네이버 예약은 외국인 계정으로도 가능 (본인인증 없이 이메일 가입)',
      },
      {
        en: 'No booking button? Ask via KakaoMap chat — copy a phrase card and send it',
        ko: '예약 버튼이 없으면 카카오맵 채팅 문의 → 문장 카드 복사해서 전송',
      },
      {
        en: 'If a call is the only way, open with "Please speak slowly"',
        ko: '전화가 유일한 방법이면 "천천히 말씀해 주세요" 문장으로 시작',
      },
    ],
    dos: [
      {
        en: 'Arrive 10 minutes early with your ARC (residence card)',
        ko: '방문 10분 전 도착, 외국인등록증(ARC) 지참',
      },
      { en: 'If you might no-show, always cancel ahead', ko: '노쇼가 예상되면 반드시 취소 연락' },
    ],
    donts: [
      {
        en: 'Show up without a booking at peak times (lunch, weekends)',
        ko: '예약 없이 피크 시간(점심·주말) 방문',
      },
      {
        en: 'Open a call in English — it often gets hung up',
        ko: '전화로 영어부터 시작 — 끊길 확률이 높아요',
      },
    ],
  },
  {
    id: 'delivery-no-phone',
    code: '02',
    icon: '🛵',
    category: { en: 'Delivery & Spending', ko: '배달·소비' },
    title: { en: 'Order delivery without a Korean number', ko: '한국 번호 없이 배달 시키기' },
    summary: {
      en: 'Coupang Eats + Google login = the lowest barrier to entry',
      ko: '쿠팡이츠 Google 로그인 → 가장 진입장벽 낮음',
    },
    pain: {
      en: 'Baemin/Yogiyo ID-verification wall — the #1 shared foreigner pain',
      ko: '배민·요기요 본인인증 벽 — 외국인 공통 pain 1순위',
    },
    steps: [
      {
        en: 'Coupang Eats: supports Google login, highest success rate for foreign cards',
        ko: '쿠팡이츠: Google 계정 로그인 지원, 해외 카드 등록 성공률 가장 높음',
      },
      {
        en: 'Baemin: needs a Korean number + ID verification → works after a SIM',
        ko: '배민: 한국 번호 + 본인인증 필요 → SIM 개통 후 가능',
      },
      {
        en: 'Short stay? Use Shuttle Delivery (English) or a Creatrip proxy order',
        ko: '단기 체류면 Shuttle Delivery(영어 지원) 또는 Creatrip 대행 이용',
      },
      {
        en: 'Enter the Korean road-name address (not English) so the rider can find you',
        ko: '주소는 영문 말고 한글 도로명 주소로 입력해야 기사님이 찾기 쉬움',
      },
    ],
    dos: [
      { en: 'Add "Leave it at the door" in the request note', ko: '요청사항에 "문 앞에 놓아주세요" 입력' },
      { en: 'Save your Korean address in a notes app in advance', ko: '한글 주소를 미리 메모장에 저장' },
    ],
    donts: [
      {
        en: 'Choose pay-on-arrival by card (terminals often reject foreign cards)',
        ko: '현장 카드 결제 선택 (해외 카드 단말기 거부 잦음)',
      },
    ],
  },
  {
    id: 'deposit-scam',
    code: '03',
    icon: '🏠',
    category: { en: 'Housing & Safety', ko: '주거·안전' },
    title: { en: 'Avoid goshiwon / one-room deposit scams', ko: '고시원·원룸 선입금 사기 피하기' },
    summary: {
      en: 'A transfer demanded before signing = the biggest red flag',
      ko: '계약 전 송금 요구 = 최대 위험 신호',
    },
    pain: {
      en: '"Sending deposits in advance" — many ₩200–300k pre-payment demands',
      ko: '"Sending deposits in advance" — 20~30만 원 선입금 요구 사례 다수',
    },
    steps: [
      {
        en: 'Never transfer before seeing the room in person (or over video)',
        ko: '방을 직접(또는 영상통화로) 보기 전에는 절대 송금하지 않기',
      },
      {
        en: '"Send a deposit to hold it" without a contract is a scam pattern',
        ko: '계약서 없이 "자리 맡아두려면 보증금 먼저"라는 말은 사기 패턴',
      },
      {
        en: 'Confirm the real owner via the property registry (₩700 at iros.go.kr)',
        ko: '등기부등본으로 실소유주 확인 (인터넷등기소 700원)',
      },
      {
        en: 'Only transfer to the landlord’s name exactly as on the contract',
        ko: '송금은 반드시 계약서상 임대인 명의 계좌로만',
      },
    ],
    dos: [
      { en: 'Run the risk checklist first', ko: '안전 체크리스트로 위험도 먼저 진단' },
      { en: 'Keep photos of the contract and receipts', ko: '계약서·영수증 사진 보관' },
    ],
    donts: [
      { en: 'Transfer to an account not in a personal name', ko: '개인 명의가 아닌 계좌로 송금' },
      {
        en: 'Deal with a "landlord" who only talks on KakaoTalk',
        ko: '카카오톡으로만 소통하는 "임대인"과 거래',
      },
    ],
  },
  {
    id: 'etiquette-transit',
    code: '04',
    icon: '🚇',
    category: { en: 'Etiquette & Manners', ko: '예의·매너' },
    title: { en: 'Transit etiquette — Koreans’ #1 pick', ko: '대중교통 에티켓 — 한국인이 꼽은 1순위' },
    summary: {
      en: 'A summary of 98 comments on "what foreigners should not do"',
      ko: '"외국인이 하지 않았으면 하는 것" 98개 댓글 요약',
    },
    pain: {
      en: 'Being loud on the subway/bus — the overwhelming #1 complaint',
      ko: '지하철·버스 내 큰 소리 — 한국인 지적 압도적 1위',
    },
    steps: [
      {
        en: 'Keep your voice at library level on the subway/bus',
        ko: '지하철·버스에서는 대화 볼륨을 도서관 수준으로',
      },
      {
        en: 'Keep calls short; no speakerphone or video calls',
        ko: '통화는 짧게, 스피커폰·영상통화는 금물',
      },
      {
        en: 'Leave priority seats empty even when free — the safe default',
        ko: '노약자석은 비어 있어도 앉지 않는 것이 무난',
      },
      { en: 'Wear your backpack on the front or place it on the rack', ko: '백팩은 앞으로 메거나 선반 위로' },
    ],
    dos: [
      { en: 'Use earphones; move to the door before your stop', ko: '이어폰 사용, 하차 시 미리 문 앞으로' },
    ],
    donts: [
      { en: 'Eat smelly takeout on board', ko: '음식 냄새 나는 테이크아웃 취식' },
      { en: 'Block people getting off by standing in the doorway', ko: '문 앞에서 내리는 사람 막고 서 있기' },
    ],
  },
  {
    id: 'gift-boss',
    code: '05',
    icon: '🎁',
    category: { en: 'Work & Etiquette', ko: '직장·예의' },
    title: { en: 'A gift on your first day — should you?', ko: '첫 출근 선물, 해야 할까?' },
    summary: {
      en: 'A gift for the boss isn’t required — team snacks are the safe choice',
      ko: '상사 선물은 필수 아님 — 팀 간식이 안전한 선택',
    },
    pain: {
      en: '"Should I give a gift to my boss" — confusion over taboo gifts (knives, etc.)',
      ko: '"Should I give a gift to my boss" — 선물 금기(칼 등) 혼란',
    },
    steps: [
      {
        en: 'A personal gift for the boss on day one can feel like pressure — not required',
        ko: '첫 출근에 상사 개인 선물은 오히려 부담 — 필수 아님',
      },
      {
        en: 'If you want to, snacks the whole team can share (coffee/fruit/sweets) are safest',
        ko: '주고 싶다면 팀 전체가 나눌 간식(커피·과일·과자)이 가장 안전',
      },
      {
        en: 'Avoid knives/scissors (cutting ties) and shoes (leaving)',
        ko: '칼·가위(관계를 끊는다는 의미), 신발(떠난다는 의미)은 피하기',
      },
      {
        en: 'A small snack from your home country makes a great conversation starter',
        ko: '해외에서 왔다면 본국의 작은 기념품 간식이 대화 소재로 최고',
      },
    ],
    dos: [
      { en: 'Give to the team rather than an individual', ko: '개인보다 팀 단위로' },
      { en: 'Keep it in the ₩10–20k range', ko: '부담 없는 1~2만 원대' },
    ],
    donts: [
      { en: 'Give an expensive gift (anti-graft law concerns)', ko: '고가 선물 (청탁금지법 이슈 소지)' },
      { en: 'Give to only one superior', ko: '상사 한 명에게만 주기' },
    ],
  },
  {
    id: 'making-friends',
    code: '06',
    icon: '🤝',
    category: { en: 'Belonging & Adjusting', ko: '적응·소속감' },
    title: { en: 'Making friends in Seoul', ko: '서울에서 친구 만들기' },
    summary: {
      en: '"Both sides are too shy to speak first" — solve it with structure',
      ko: '"양쪽 다 수줍어서 말을 못 건다" — 구조로 해결',
    },
    pain: {
      en: '"Where to Make Friends as a Foreigner" — still stuck after a year here',
      ko: '"Where to Make Friends as a Foreigner" — 1년 체류에도 방법을 모름',
    },
    steps: [
      {
        en: 'Language exchange (KO↔EN) is the most natural — both sides have a purpose',
        ko: '언어교환 모임(한국어↔영어)이 상호 목적이 있어 가장 자연스러움',
      },
      {
        en: 'Hobby meetups (hiking/running/board games) need less conversation',
        ko: '취미 기반 소모임(등산·러닝·보드게임)은 대화 부담이 적음',
      },
      { en: 'Start with events on a foreigner community app', ko: '외국인 커뮤니티 앱으로 이벤트부터 시작' },
      {
        en: 'At work/school, whoever proposes a meal first wins',
        ko: '직장·학교에서는 밥 약속을 먼저 제안하는 쪽이 이기는 게임',
      },
    ],
    dos: [
      {
        en: 'Attend the same meetup 3+ times so faces become familiar',
        ko: '같은 모임에 3회 이상 반복 참석 (얼굴 익히기)',
      },
    ],
    donts: [
      {
        en: 'Fire back personal questions (age, salary) on a first meeting — read it as a culture gap',
        ko: '첫 만남에 나이·연봉 등 개인 질문 되받아치기 — 문화 차이로 이해',
      },
    ],
  },
]

export function getGuideById(id: string) {
  return guides.find((g) => g.id === id)
}

export function getGuideCategories(lang: Lang): string[] {
  const seen = new Set<string>()
  const result: string[] = [ALL_CATEGORY[lang]]
  for (const g of guides) {
    const label = g.category[lang]
    if (!seen.has(label)) {
      seen.add(label)
      result.push(label)
    }
  }
  return result
}

export function filterGuidesByCategory(category: string, lang: Lang): Guide[] {
  if (category === ALL_CATEGORY[lang] || category === ALL_CATEGORY[DEFAULT_LANG]) {
    return guides
  }
  return guides.filter((g) => g.category[lang] === category)
}
