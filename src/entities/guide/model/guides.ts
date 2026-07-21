export type Guide = {
  id: string
  code: string
  category: string
  title: string
  summary: string
  pain: string
  steps: string[]
  dos: string[]
  donts: string[]
}

export const guides: Guide[] = [
  {
    id: 'phone-booking',
    code: '01',
    category: '예약·전화',
    title: '전화 없이 병원·미용실 예약하기',
    summary: '네이버 예약·카카오맵·앱으로 전화 장벽 우회',
    pain: '"Local booking/phone call walls" — 전화·한국어·앱 3중 장벽',
    steps: [
      '네이버 지도에서 병원·미용실 검색 후 "예약" 버튼이 있는 곳을 우선 선택',
      '네이버 예약은 외국인 계정으로도 가능 (본인인증 없이 이메일 가입)',
      '예약 버튼이 없으면 카카오맵 채팅 문의 → 문장 카드 복사해서 전송',
      '전화가 유일한 방법이면 "천천히 말씀해 주세요" 문장으로 시작',
    ],
    dos: ['방문 10분 전 도착, 외국인등록증(ARC) 지참', '노쇼가 예상되면 반드시 취소 연락'],
    donts: ['예약 없이 피크 시간(점심·주말) 방문', '전화로 영어부터 시작 — 끊길 확률이 높아요'],
  },
  {
    id: 'delivery-no-phone',
    code: '02',
    category: '배달·소비',
    title: '한국 번호 없이 배달 시키기',
    summary: '쿠팡이츠 Google 로그인 → 가장 진입장벽 낮음',
    pain: '배민·요기요 본인인증 벽 — 외국인 공통 pain 1순위',
    steps: [
      '쿠팡이츠: Google 계정 로그인 지원, 해외 카드 등록 성공률 가장 높음',
      '배민: 한국 번호 + 본인인증 필요 → SIM 개통 후 가능',
      '단기 체류면 Shuttle Delivery(영어 지원) 또는 Creatrip 대행 이용',
      '주소는 영문 말고 한글 도로명 주소로 입력해야 기사님이 찾기 쉬움',
    ],
    dos: ['요청사항에 "문 앞에 놓아주세요" 입력', '한글 주소를 미리 메모장에 저장'],
    donts: ['현장 카드 결제 선택 (해외 카드 단말기 거부 잦음)'],
  },
  {
    id: 'deposit-scam',
    code: '03',
    category: '주거·안전',
    title: '고시원·원룸 선입금 사기 피하기',
    summary: '계약 전 송금 요구 = 최대 위험 신호',
    pain: '"Sending deposits in advance" — 20~30만 원 선입금 요구 사례 다수',
    steps: [
      '방을 직접(또는 영상통화로) 보기 전에는 절대 송금하지 않기',
      '계약서 없이 "자리 맡아두려면 보증금 먼저"라는 말은 사기 패턴',
      '등기부등본으로 실소유주 확인 (인터넷등기소 700원)',
      '송금은 반드시 계약서상 임대인 명의 계좌로만',
    ],
    dos: ['안전 체크리스트로 위험도 먼저 진단', '계약서·영수증 사진 보관'],
    donts: ['개인 명의가 아닌 계좌로 송금', '카카오톡으로만 소통하는 "임대인"과 거래'],
  },
  {
    id: 'etiquette-transit',
    code: '04',
    category: '예의·매너',
    title: '대중교통 에티켓 — 한국인이 꼽은 1순위',
    summary: '"외국인이 하지 않았으면 하는 것" 98개 댓글 요약',
    pain: '지하철·버스 내 큰 소리 — 한국인 지적 압도적 1위',
    steps: [
      '지하철·버스에서는 대화 볼륨을 도서관 수준으로',
      '통화는 짧게, 스피커폰·영상통화는 금물',
      '노약자석은 비어 있어도 앉지 않는 것이 무난',
      '백팩은 앞으로 메거나 선반 위로',
    ],
    dos: ['이어폰 사용, 하차 시 미리 문 앞으로'],
    donts: ['음식 냄새 나는 테이크아웃 취식', '문 앞에서 내리는 사람 막고 서 있기'],
  },
  {
    id: 'gift-boss',
    code: '05',
    category: '직장·예의',
    title: '첫 출근 선물, 해야 할까?',
    summary: '상사 선물은 필수 아님 — 팀 간식이 안전한 선택',
    pain: '"Should I give a gift to my boss" — 선물 금기(칼 등) 혼란',
    steps: [
      '첫 출근에 상사 개인 선물은 오히려 부담 — 필수 아님',
      '주고 싶다면 팀 전체가 나눌 간식(커피·과일·과자)이 가장 안전',
      '칼·가위(관계를 끊는다는 의미), 신발(떠난다는 의미)은 피하기',
      '해외에서 왔다면 본국의 작은 기념품 간식이 대화 소재로 최고',
    ],
    dos: ['개인보다 팀 단위로', '부담 없는 1~2만 원대'],
    donts: ['고가 선물 (청탁금지법 이슈 소지)', '상사 한 명에게만 주기'],
  },
  {
    id: 'making-friends',
    code: '06',
    category: '적응·소속감',
    title: '서울에서 친구 만들기',
    summary: '"양쪽 다 수줍어서 말을 못 건다" — 구조로 해결',
    pain: '"Where to Make Friends as a Foreigner" — 1년 체류에도 방법을 모름',
    steps: [
      '언어교환 모임(한국어↔영어)이 상호 목적이 있어 가장 자연스러움',
      '취미 기반 소모임(등산·러닝·보드게임)은 대화 부담이 적음',
      '외국인 커뮤니티 앱으로 이벤트부터 시작',
      '직장·학교에서는 밥 약속을 먼저 제안하는 쪽이 이기는 게임',
    ],
    dos: ['같은 모임에 3회 이상 반복 참석 (얼굴 익히기)'],
    donts: ['첫 만남에 나이·연봉 등 개인 질문 되받아치기 — 문화 차이로 이해'],
  },
]

export function getGuideById(id: string) {
  return guides.find((g) => g.id === id)
}

export function getGuideCategories() {
  return ['전체', ...Array.from(new Set(guides.map((g) => g.category)))]
}

export function filterGuidesByCategory(category: string) {
  return category === '전체' ? guides : guides.filter((g) => g.category === category)
}
