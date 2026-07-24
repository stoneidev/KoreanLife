import type { Localized } from '@/shared/i18n'
import type { IconName } from '@/shared/ui'

export type AppCategory = {
  id: string
  icon: IconName
  label: Localized
}

export type EssentialApp = {
  id: string
  name: string
  category: string
  /** Local thumbnail shown in the card icon slot (`/icons/apps/...`). */
  icon: string
  tagline: Localized
  why: Localized
  url: string
  /** True for the small set nearly everyone needs from day one. */
  mustHave?: boolean
}

export const appCategories: AppCategory[] = [
  { id: 'messaging', icon: 'chat', label: { en: 'Messaging', ko: '메신저' } },
  { id: 'maps', icon: 'map', label: { en: 'Maps & Transit', ko: '지도·교통' } },
  { id: 'pay', icon: 'wallet', label: { en: 'Pay & Banking', ko: '결제·뱅킹' } },
  { id: 'food', icon: 'scooter', label: { en: 'Food Delivery', ko: '배달' } },
  { id: 'shopping', icon: 'bag', label: { en: 'Shopping', ko: '쇼핑' } },
  { id: 'translate', icon: 'translate', label: { en: 'Translation', ko: '번역' } },
  { id: 'transport', icon: 'car', label: { en: 'Taxi & Travel', ko: '택시·이동' } },
]

export const essentialApps: EssentialApp[] = [
  {
    id: 'kakaotalk',
    icon: '/icons/apps/kakaotalk.jpg',
    name: 'KakaoTalk',
    category: 'messaging',
    mustHave: true,
    tagline: { en: 'The messenger everyone uses', ko: '모두가 쓰는 국민 메신저' },
    why: {
      en: 'Non-negotiable — friends, landlords, clinics and delivery all reach you here. Set it up first.',
      ko: '필수 — 친구·집주인·병원·배달 모두 여기로 연락합니다. 가장 먼저 설치하세요.',
    },
    url: 'https://www.kakaocorp.com/page/service/service/KakaoTalk',
  },
  {
    id: 'naver-map',
    icon: '/icons/apps/naver-map.jpg',
    name: 'Naver Map',
    category: 'maps',
    mustHave: true,
    tagline: { en: 'Maps that actually work in Korea', ko: '한국에서 진짜 되는 지도' },
    why: {
      en: 'Google Maps is crippled here (no walking/driving routes). Naver Map has English and real-time transit.',
      ko: '구글 지도는 한국에서 도보·차량 길찾기가 막혀 있습니다. 네이버 지도는 영어 지원 + 실시간 교통.',
    },
    url: 'https://map.naver.com',
  },
  {
    id: 'kakaomap',
    icon: '/icons/apps/kakaomap.jpg',
    name: 'KakaoMap',
    category: 'maps',
    tagline: { en: 'Great alternative map', ko: '훌륭한 대체 지도' },
    why: {
      en: 'A clean second opinion for routes and place info; pairs well with KakaoTalk chats to shops.',
      ko: '길찾기·장소 정보의 깔끔한 대안. 가게 카카오톡 문의와 연동이 편합니다.',
    },
    url: 'https://map.kakao.com',
  },
  {
    id: 'kakaomobility',
    icon: '/icons/apps/kakaomobility.jpg',
    name: 'Kakao T',
    category: 'transport',
    mustHave: true,
    tagline: { en: 'Hail taxis, no phone call', ko: '전화 없이 택시 호출' },
    why: {
      en: 'The standard taxi app — set destination in advance, pay in-app, no Korean phone call needed.',
      ko: '표준 택시 앱 — 목적지 미리 입력, 앱 결제, 전화 통화 불필요.',
    },
    url: 'https://www.kakaomobility.com',
  },
  {
    id: 'naver-pay',
    icon: '/icons/apps/naver-pay.jpg',
    name: 'Naver Pay',
    category: 'pay',
    tagline: { en: 'Pay online & offline', ko: '온·오프라인 간편결제' },
    why: {
      en: 'Widely accepted; ties into Naver accounts you already use for booking and shopping.',
      ko: '수용처가 넓고, 예약·쇼핑에 쓰는 네이버 계정과 연동됩니다.',
    },
    url: 'https://pay.naver.com',
  },
  {
    id: 'toss',
    icon: '/icons/apps/toss.jpg',
    name: 'Toss',
    category: 'pay',
    mustHave: true,
    tagline: { en: 'Send money & manage finances', ko: '송금·금융 올인원' },
    why: {
      en: 'The friendliest finance app for transfers and splitting bills once you have a Korean bank account.',
      ko: '한국 계좌가 생기면 송금·정산에 가장 편한 금융 앱.',
    },
    url: 'https://toss.im',
  },
  {
    id: 'coupang',
    icon: '/icons/apps/coupang.jpg',
    name: 'Coupang',
    category: 'shopping',
    mustHave: true,
    tagline: { en: 'Next-day everything', ko: '로켓배송 만능 쇼핑' },
    why: {
      en: 'Rocket delivery for daily goods, often next-morning. Foreign cards usually work.',
      ko: '생필품 로켓배송, 대개 다음날 아침 도착. 해외 카드도 대체로 가능.',
    },
    url: 'https://www.coupang.com',
  },
  {
    id: 'coupang-eats',
    icon: '/icons/apps/coupang-eats.jpg',
    name: 'Coupang Eats',
    category: 'food',
    mustHave: true,
    tagline: { en: 'Delivery, lowest sign-up barrier', ko: '가입 장벽 가장 낮은 배달' },
    why: {
      en: 'Supports Google login and foreign cards best — the easiest food delivery for newcomers.',
      ko: 'Google 로그인·해외 카드 지원이 가장 좋아 정착 초기 배달에 최적.',
    },
    url: 'https://www.coupangeats.com',
  },
  {
    id: 'baemin',
    icon: '/icons/apps/baemin.jpg',
    name: 'Baemin',
    category: 'food',
    tagline: { en: 'The biggest delivery app', ko: '배달 1위 앱' },
    why: {
      en: 'Widest restaurant selection, but needs a Korean number + ID verification. Set up after a SIM.',
      ko: '가맹점이 가장 많지만 한국 번호 + 본인인증 필요. SIM 개통 후 설치.',
    },
    url: 'https://www.baemin.com',
  },
  {
    id: 'papago',
    icon: '/icons/apps/papago.jpg',
    name: 'Papago',
    category: 'translate',
    mustHave: true,
    tagline: { en: 'Best KO↔EN translator', ko: '한↔영 번역 최강' },
    why: {
      en: 'Handles Korean far better than generic translators; camera mode reads menus and signs.',
      ko: '일반 번역기보다 한국어에 훨씬 강함. 카메라 모드로 메뉴·표지판 인식.',
    },
    url: 'https://papago.naver.com',
  },
  {
    id: 'naver-app',
    icon: '/icons/apps/naver-app.jpg',
    name: 'Naver',
    category: 'shopping',
    tagline: { en: 'Search, booking & reviews', ko: '검색·예약·리뷰 포털' },
    why: {
      en: 'Korea’s default search — clinic/salon booking, local reviews and maps live here.',
      ko: '한국의 기본 검색 — 병원·미용실 예약, 동네 리뷰, 지도가 모두 여기.',
    },
    url: 'https://www.naver.com',
  },
  {
    id: 'tmoney',
    icon: '/icons/apps/tmoney.jpg',
    name: 'T-money / Tmoney GO',
    category: 'transport',
    tagline: { en: 'Tap for bus & subway', ko: '버스·지하철 교통카드' },
    why: {
      en: 'Load a T-money card (or use the app) for tap-and-go transit; far cheaper than single tickets.',
      ko: 'T-money 카드 충전(또는 앱)으로 대중교통 태그 승차. 1회권보다 훨씬 저렴.',
    },
    url: 'https://www.t-money.co.kr',
  },
]

export type AppGroup = {
  category: AppCategory
  apps: EssentialApp[]
}

/** Group apps under their category, in category order, dropping empty groups. */
export function getAppsByCategory(): AppGroup[] {
  return appCategories
    .map((category) => ({
      category,
      apps: essentialApps.filter((a) => a.category === category.id),
    }))
    .filter((group) => group.apps.length > 0)
}
