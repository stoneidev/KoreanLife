export type Phrase = {
  ko: string
  roman: string
  en: string
}

export type PhraseSet = {
  id: string
  label: string
  phrases: Phrase[]
}

export const phraseSets: PhraseSet[] = [
  {
    id: 'hospital',
    label: '병원',
    phrases: [
      {
        ko: '안녕하세요, 진료 예약하고 싶어요. 한국어가 서툴러서 천천히 말씀해 주세요.',
        roman: 'Annyeonghaseyo, jinryo yeyak-hago sipeoyo.',
        en: "Hello, I'd like to book an appointment. My Korean isn't fluent, please speak slowly.",
      },
      {
        ko: '외국인 등록번호로 접수 가능한가요?',
        roman: 'Oegugin deungnok-beonho-ro jeopsu ganeung-hangayo?',
        en: 'Can I register with my ARC (Alien Registration Card) number?',
      },
      {
        ko: '영어 가능한 선생님이 계신가요?',
        roman: 'Yeongeo ganeunghan seonsaengnim-i gyesingayo?',
        en: 'Is there a doctor who speaks English?',
      },
    ],
  },
  {
    id: 'salon',
    label: '미용실',
    phrases: [
      {
        ko: '오늘 오후에 커트 예약 가능할까요?',
        roman: 'Oneul ohu-e keoteu yeyak ganeung-halkkayo?',
        en: 'Is a haircut appointment available this afternoon?',
      },
      {
        ko: '사진처럼 잘라 주세요. 너무 짧지 않게 부탁드려요.',
        roman: 'Sajin-cheoreom jalla juseyo.',
        en: 'Please cut it like this photo, not too short.',
      },
    ],
  },
  {
    id: 'delivery',
    label: '배달',
    phrases: [
      {
        ko: '문 앞에 놓아 주시고 벨은 누르지 말아 주세요.',
        roman: 'Mun ape noa jusigo bel-eun nureuji mara juseyo.',
        en: "Please leave it at the door, don't ring the bell.",
      },
      {
        ko: '해외 카드라 현장 결제가 안 될 수 있어요. 계좌이체 가능한가요?',
        roman: 'Haeoe kadeu-ra hyeonjang gyeolje-ga an doel su isseoyo.',
        en: 'My card is foreign so on-site payment may fail. Is bank transfer OK?',
      },
    ],
  },
  {
    id: 'housing',
    label: '부동산',
    phrases: [
      {
        ko: '계약서 쓰기 전에는 보증금을 보낼 수 없어요.',
        roman: 'Gyeyakseo sseugi jeon-eneun bojeunggeum-eul bonael su eopseoyo.',
        en: "I can't send a deposit before signing a contract.",
      },
      {
        ko: '등기부등본을 확인하고 싶어요.',
        roman: 'Deunggibu-deungbon-eul hwaginhago sipeoyo.',
        en: "I'd like to check the property registry (deunggibu-deungbon).",
      },
    ],
  },
]

export function getPhraseSetById(id: string) {
  return phraseSets.find((s) => s.id === id)
}
