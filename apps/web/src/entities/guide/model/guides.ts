import { DEFAULT_LANG } from '@/shared/i18n'
import type { Lang, Localized } from '@/shared/i18n'
import type { IconName } from '@/shared/ui'

export type Guide = {
  id: string
  code: string
  icon: IconName
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
    icon: 'phone',
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
    icon: 'scooter',
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
    icon: 'house',
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
    icon: 'subway',
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
    icon: 'gift',
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
    icon: 'handshake',
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
  {
    id: 'dating-ldr',
    code: '07',
    icon: 'heart',
    category: { en: 'Dating & Relationships', ko: '연애·관계' },
    title: { en: 'Dating & long-distance, realistically', ko: '연애·장거리, 현실적으로' },
    summary: {
      en: 'Read soft rejection, set an LDR plan, and spot romance scams',
      ko: '소프트 거절 해석, LDR 계획, 연애 사기 구분',
    },
    pain: {
      en: 'LDR after an exchange year, sudden ghosting, and "is this a green-card scam?" doubts',
      ko: '교환학생 후 장거리, 갑작스러운 고스트링, "그린카드 사기 아닌가" 의심',
    },
    steps: [
      {
        en: 'Going quiet after a few days is usually a soft rejection, not an emergency — don’t over-read it',
        ko: '며칠 만에 연락이 뜸해지는 건 대개 소프트 거절 — 과잉 해석하지 않기',
      },
      {
        en: 'For LDR, agree on a concrete "close-the-gap" date and visa path early, not "someday"',
        ko: '장거리는 "언젠가"가 아니라 구체적 합가 시점·비자 경로를 초반에 합의',
      },
      {
        en: 'Scam signals: fast declarations of love, money/gift-card requests, refusing video calls',
        ko: '사기 신호: 초고속 사랑 고백, 돈·상품권 요구, 영상통화 거부',
      },
      {
        en: 'Never send money or your ARC/passport scans to someone you haven’t met in person',
        ko: '직접 만난 적 없는 상대에게 돈·외국인등록증·여권 스캔 절대 전송 금지',
      },
    ],
    dos: [
      { en: 'Keep first meetings in public and tell a friend', ko: '첫 만남은 공공장소에서, 지인에게 공유' },
      { en: 'Talk about family expectations early — they matter here', ko: '가족의 기대치를 초반에 대화 — 한국에선 중요' },
    ],
    donts: [
      { en: 'Send money for "flights/emergencies" to someone online', ko: '온라인 상대에게 "항공권·급전" 송금' },
      { en: 'Assume K-drama pacing is real life', ko: 'K드라마식 전개를 현실로 가정하기' },
    ],
  },
  {
    id: 'jobs-visa',
    code: '08',
    icon: 'passport',
    category: { en: 'Jobs & Visa', ko: '취업·비자' },
    title: { en: 'Working in Korea & visa basics', ko: '한국 취업과 비자 기본기' },
    summary: {
      en: 'What’s realistic without fluent Korean, and which visa fits',
      ko: '한국어 없이 현실적인 선택지와 맞는 비자',
    },
    pain: {
      en: 'Little info, "fluent Korean or bust", and TEFL limited to native English speakers',
      ko: '정보 부족, 한국어 유창 필수, TEFL은 영어권만 — 반복 질문',
    },
    steps: [
      {
        en: 'Most office jobs expect business-level Korean; English-only roles cluster in IT, global firms and teaching',
        ko: '대부분 사무직은 비즈니스 한국어 요구. 영어만으로는 IT·외국계·강사에 집중',
      },
      {
        en: 'E-2 (teaching) generally needs a passport from a designated English-speaking country + a degree',
        ko: 'E-2(강사)는 보통 지정 영어권 국적 여권 + 학위 필요',
      },
      {
        en: 'D-10 (job-seeker) lets you stay and look; E-7 is employer-sponsored skilled work',
        ko: 'D-10(구직)으로 체류하며 구직 가능, E-7은 고용주 스폰서 전문직',
      },
      {
        en: 'A degree from a Korean university + some Korean dramatically widens your options',
        ko: '한국 대학 학위 + 어느 정도의 한국어가 선택지를 크게 넓힘',
      },
    ],
    dos: [
      { en: 'Verify visa rules on the official Hi Korea portal', ko: '하이코리아 공식 포털에서 비자 규정 확인' },
      { en: 'Build Korean to TOPIK 3–4 to unlock roles', ko: '한국어 TOPIK 3~4까지 올려 선택지 확보' },
    ],
    donts: [
      { en: 'Expect special hiring quotas for your nationality', ko: '국적 이유의 특별 채용 쿼터 기대' },
      { en: 'Work on the wrong visa — it risks a ban', ko: '체류자격 외 취업 — 입국 금지 위험' },
    ],
  },
  {
    id: 'military-enlistment',
    code: '09',
    icon: 'medal',
    category: { en: 'Family & Military', ko: '가족·군복무' },
    title: { en: 'Enlistment: what changes for dual citizens', ko: '군 복무: 이중국적자에게 달라지는 것' },
    summary: {
      en: 'How service affects jobs, housing and income — and the timeline',
      ko: '복무가 직장·주거·수입에 미치는 영향과 일정',
    },
    pain: {
      en: 'Enlistment cuts off job/housing/income; dual-national obligations are confusing',
      ko: '복무 중 직장·주거·수입 단절, 이중국적 의무 혼란',
    },
    steps: [
      {
        en: 'Dual citizens generally must resolve their status before a cutoff age — check the MMA rules early',
        ko: '이중국적자는 정해진 나이 전에 국적을 정리해야 하는 경우가 많음 — 병무청 규정을 일찍 확인',
      },
      {
        en: 'Service is ~18 months; plan a housing/lease pause and income gap around it',
        ko: '복무는 약 18개월 — 주거·임대 중단과 수입 공백을 미리 계획',
      },
      {
        en: 'Employers must reinstate; keep documentation of your leave for return',
        ko: '고용주는 복직 의무 — 복귀 위해 휴직 서류 보관',
      },
      {
        en: 'Overseas Koreans: confirm how visits and residence affect your obligation',
        ko: '재외국민: 방문·체류가 병역 의무에 어떻게 영향을 주는지 확인',
      },
    ],
    dos: [
      { en: 'Get written confirmation from the MMA (병무청) for your case', ko: '본인 사례에 대해 병무청의 서면 확인 받기' },
      { en: 'Sort finances/lease before your enlistment date', ko: '입영일 전 재정·임대 정리' },
    ],
    donts: [
      { en: 'Rely on hearsay about dual-national rules', ko: '이중국적 규정을 소문에 의존' },
      { en: 'Miss the age deadline for choosing nationality', ko: '국적 선택 연령 기한 놓치기' },
    ],
  },
  {
    id: 'disability-access',
    code: '10',
    icon: 'accessibility',
    category: { en: 'Health & Access', ko: '건강·접근성' },
    title: { en: 'Disability & accessibility in Korea', ko: '한국의 장애·접근성' },
    summary: {
      en: 'What to expect for mobility, autism and care — and how to prepare',
      ko: '이동·자폐·돌봄에서 기대할 것과 준비 방법',
    },
    pain: {
      en: 'Stigma around autism/disability, worry about stares when traveling with a disabled child',
      ko: '자폐·장애 스티그마, 장애 아동 동반 여행 시선 걱정',
    },
    steps: [
      {
        en: 'Subways and major venues have elevators/ramps; older streets and small shops can be harder',
        ko: '지하철·주요 시설은 엘리베이터·경사로 있음. 오래된 골목·소형 상점은 더 어려움',
      },
      {
        en: 'Big hospitals have English-speaking international clinics; book ahead for accessibility needs',
        ko: '대형 병원엔 영어 가능한 국제진료센터가 있음. 접근성 필요 시 사전 예약',
      },
      {
        en: 'Awareness of autism is growing but uneven — carry a short explanation card if helpful',
        ko: '자폐 인식은 커지고 있으나 편차 큼 — 필요하면 간단한 설명 카드 지참',
      },
      {
        en: 'Use the "Seoul Danurim" accessibility guide for barrier-free routes and facilities',
        ko: '"서울 다누림" 접근성 안내로 무장애 동선·시설 확인',
      },
    ],
    dos: [
      { en: 'Call venues ahead to confirm step-free access', ko: '시설에 미리 전화해 무단차 접근 확인' },
      { en: 'Keep medication with its prescription/English name', ko: '약은 처방전·영문명과 함께 소지' },
    ],
    donts: [
      { en: 'Assume every small clinic can accommodate needs', ko: '모든 소형 클리닉이 수용 가능하다고 가정' },
      { en: 'Let stares deter you — they usually mean curiosity, not hostility', ko: '시선에 위축되기 — 대개 적대가 아닌 호기심' },
    ],
  },
  {
    id: 'digital-life',
    code: '11',
    icon: 'smartphone',
    category: { en: 'Digital Life', ko: '디지털 생활' },
    title: { en: 'KakaoTalk, Naver & staying scam-safe', ko: '카카오톡·네이버, 그리고 사기 예방' },
    summary: {
      en: 'Set up the essential apps and lock down privacy & fraud risks',
      ko: '필수 앱 세팅과 프라이버시·사기 위험 차단',
    },
    pain: {
      en: 'Kakao profile/privacy worries, permanent Naver bans, spam and phishing',
      ko: '카카오 프로필·프라이버시 걱정, 네이버 영구정지, 스팸·피싱',
    },
    steps: [
      {
        en: 'KakaoTalk is essential; lock down who can find you by phone/ID in privacy settings',
        ko: '카카오톡은 필수 — 개인정보 설정에서 전화번호·ID 검색 허용 범위 제한',
      },
      {
        en: 'Naver often needs ID verification; a foreigner account can be limited — keep a backup email',
        ko: '네이버는 본인인증 요구가 많고 외국인 계정은 제한될 수 있음 — 백업 이메일 유지',
      },
      {
        en: 'Common scams: fake delivery/toll texts with links, "prosecutor" calls, romance transfers',
        ko: '흔한 사기: 가짜 택배·통행료 문자 링크, "검찰" 사칭 전화, 연애 송금',
      },
      {
        en: 'Never tap links in unexpected texts; report spam to 118 (KISA)',
        ko: '예상치 못한 문자의 링크 절대 클릭 금지, 스팸은 118(KISA)에 신고',
      },
    ],
    dos: [
      { en: 'Enable app lock + 2FA on Kakao and banking', ko: '카카오·뱅킹에 앱 잠금 + 2단계 인증' },
      { en: 'Verify a caller by hanging up and calling the official number', ko: '전화는 끊고 공식 번호로 되걸어 확인' },
    ],
    donts: [
      { en: 'Install APKs sent by strangers ("delivery app")', ko: '낯선 사람이 보낸 APK("배달앱") 설치' },
      { en: 'Share verification codes with anyone', ko: '인증번호를 누구에게도 공유' },
    ],
  },
  {
    id: 'phone-verification',
    code: '12',
    icon: 'smartphone',
    category: { en: 'Digital Life', ko: '디지털 생활' },
    title: {
      en: 'Get a number that passes 본인인증',
      ko: '본인인증 되는 번호 만들기',
    },
    summary: {
      en: 'Korean verification checks your name, not just an SMS — here’s what actually works',
      ko: '본인인증은 문자가 아니라 명의를 확인합니다 — 실제로 되는 방법',
    },
    pain: {
      en: 'The Baemin/bank ID-verification wall — the #1 shared foreigner pain. "Is there any temporary number?"',
      ko: '배민·은행 본인인증 벽 — 외국인 공통 pain 1순위. "임시 번호는 없나요?"',
    },
    steps: [
      {
        en: 'Key fact: 본인인증 matches the name/birthdate/ARC registered to the SIM — it is not just receiving an SMS code',
        ko: '핵심: 본인인증은 SIM에 등록된 이름·생년월일·외국인등록번호가 일치하는지를 봅니다. 단순 문자 수신이 아닙니다',
      },
      {
        en: 'Passport prepaid SIM: short-term visitors can open a SIM in their own name with a passport — this passes verification on many services',
        ko: '여권 선불 SIM: 단기 방문자도 여권으로 본인 명의 SIM 개통 가능 — 상당수 서비스의 본인인증 통과',
      },
      {
        en: 'ARC postpaid: 90+ day residents get the most reliable path — works for banking and government services too',
        ko: 'ARC 후불: 90일 이상 체류자는 가장 확실. 은행·정부 서비스까지 됩니다',
      },
      {
        en: 'Data-only tourist SIMs and online virtual/rental numbers fail — no name is registered, so verification is rejected',
        ko: '데이터 전용 관광 SIM과 온라인 가상·대여 번호는 실패 — 명의 등록이 없어 인증이 거부됩니다',
      },
      {
        en: 'Policies vary by carrier/MVNO and change often — confirm current 본인인증 support before you pay',
        ko: '통신사·알뜰폰마다 다르고 정책이 자주 바뀝니다 — 결제 전 현재 본인인증 지원 여부 확인',
      },
    ],
    dos: [
      { en: 'Open the SIM in your own name (passport or ARC)', ko: '본인 명의로 개통(여권 또는 ARC)' },
      { en: 'Ask the seller directly if 본인인증 is supported', ko: '판매처에 본인인증 지원 여부를 직접 확인' },
    ],
    donts: [
      {
        en: 'Pay for "verification proxy" or virtual-number services — they break and risk fraud',
        ko: '"인증 대행"·가상번호 서비스 결제 — 잘 안 되고 사기 위험',
      },
      {
        en: 'Expect a data-only tourist SIM to unlock 본인인증',
        ko: '데이터 전용 관광 SIM으로 본인인증이 될 거라 기대하기',
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
