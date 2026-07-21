import { routes } from '@/shared/config/routes'

export const quickIndex = [
  {
    to: routes.phrases,
    num: '01',
    title: '전화 대신 문장 시트',
    desc: '병원·미용실·배달·부동산',
  },
  {
    to: routes.safety,
    num: '02',
    title: '선입금 사기 진단',
    desc: '계약 전 위험도 체크리스트',
  },
  {
    to: routes.guideDetail('delivery-no-phone'),
    num: '03',
    title: '번호 없이 배달',
    desc: '쿠팡이츠 · Shuttle · 대행',
  },
  {
    to: routes.reality,
    num: '04',
    title: '미디어 vs 현실',
    desc: '왕따·연애·순자산 괴리',
  },
] as const
