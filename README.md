# KoreanLife — 외국인을 위한 한국 생활 정착 PWA

r/AskAKorean 3주치 데이터(게시글 200건, 댓글 ~993건) pain point 분석을 기반으로 기획한
모바일 우선 PWA 프로토타입입니다.

## 기획 요약

### 타깃

- 한국 단기~장기 체류 외국인 (관광 이상, 정착 초기가 핵심)
- 한류 접촉 후 한국행을 준비 중인 예비 방문자

### 문제 정의 (pain point → 제품 기능 매핑)

| Pain point (리포트 근거) | 기능 |
| --- | --- |
| 전화·한국어·앱 3중 예약 장벽 (병원·미용실·배달) | **문장카드** — 상황별 한국어 복사 + TTS 재생 |
| 고시원·원룸 선입금 사기 (계약 전 송금 요구) | **안전 진단** — 가중치 체크리스트로 위험도 산출 |
| 배민·요기요 본인인증 벽 | **가이드** — 쿠팡이츠/Shuttle/대행 우회 경로 |
| 대중교통 예의·선물 금기 등 매너 혼란 | **가이드** — Do/Don't 형식 + 커뮤니티 근거 명시 |
| K드라마 왕따·연애·재벌 이미지 vs 현실 괴리 | **리얼체크** — 미디어 이미지/현실 대비 카드 |
| 친구 만들기·소속감 | **가이드** — 언어교환·커뮤니티 앱 연결 |

### 차별점

- 기존 앱(Soo House, MySeoul, Creatrip 등)은 영역별로 분절 → 정착 초기 pain을 한 곳에서 해결
- 모든 콘텐츠에 "커뮤니티 근거(원 질문·댓글 수)"를 표기해 신뢰 확보
- PWA: 설치 배너·오프라인 캐시(서비스 워커)로 앱스토어 없이 배포

### 향후 로드맵 (프로토타입 미포함)

1. 다국어(EN/JA/ZH/VI) 전환, 문장카드 사용자 저장
2. 네이버 예약·카카오맵 딥링크 연동
3. 등기부등본 열람 안내 위저드, 사기 신고 사례 DB
4. 커뮤니티 Q&A (r/AskAKorean 주간 큐레이션 피드)

## 실행

```bash
npm install
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # 프로덕션 빌드 + 서비스 워커 생성
npm run preview  # 빌드 결과 확인 (PWA 설치 테스트는 여기서)
```

## 테스트 (TDD)

```bash
npm test          # vitest 1회 실행
npm run test:watch
```

- 모든 도메인 로직·i18n·상호작용 컴포넌트는 테스트 우선(TDD)으로 작성
- vitest + @testing-library/react + jsdom
- 신규 pain point는 `coverage.test.ts`가 존재 여부를 보증

## 다국어 (EN 우선 + KO 토글)

- 타깃이 외국인이므로 **영어가 기본**, 상단 🌐 토글로 한국어 전환 (localStorage 유지)
- UI 문자열: `shared/i18n/dictionary.ts` (dot-namespaced 키)
- 콘텐츠(가이드·문장·리얼체크): 각 데이터에 `{ en, ko }` 병기 (`Localized`), `pick()`으로 선택

## 디자인 시스템

- 벤치마크: **Airbnb / Klook** — 따뜻한 오프화이트, 라운드 카드, 소프트 섀도,
  pill 버튼·칩, 사진/이모지 커버 타일, 코랄·틸·골드 팔레트
- Pretendard + Noto Sans KR
- 외부 UI 라이브러리 없음 — 커스텀 CSS (`src/app/styles/index.css`)

## 실시간 커뮤니티 피드 (실제 동작)

- `커뮤니티` 탭은 **r/AskAKorean 최신 글을 실시간으로** 불러옵니다.
- 소스: Arctic Shift 미러 API (Reddit 공식 API는 브라우저에서 403 → 미러가 CORS `*` 허용)
- 백엔드 없이 클라이언트에서 직접 fetch → 파싱 → 로딩 스켈레톤·에러·재시도 UI
- 카드 탭 시 원문 Reddit 스레드로 이동. NSFW·고정글 필터, 상대시간(EN/KO) 표시
- 계층: `entities/community-post`(파싱) · `features/community-feed`(fetch·훅·UI) · `pages/community`

## 커버리지 (11개 가이드 + 7개 리얼체크)

정착 초기 실무(예약·배달·주거·예의·직장·친구)에 더해 리포트 상위 pain point 확장:

- 연애·장거리(LDR)·연애 사기 · 취업·비자·이민 · 군 복무(이중국적)
- 장애·접근성 · 디지털 생활(카카오·네이버·피싱)
- 교포 정체성 · 한일 관계 (리얼체크)

## 기술 스택

- Vite + React 19 + TypeScript
- react-router-dom (화면 라우팅)
- vite-plugin-pwa (manifest + Workbox 서비스 워커, autoUpdate)

## 구조 (Feature-Sliced Design)

```
src/
  app/           # 앱 셸, 라우팅, 글로벌 스타일
  pages/         # 화면 조합 (home, guides, phrases, reality, safety…)
  widgets/       # 독립 UI 블록 (bottom-nav, home-hero, quick-index…)
  features/      # 사용자 액션 (문장 복사/TTS, 사기 진단, 카테고리 필터)
  entities/      # 도메인 모델 (guide, phrase, reality-check, scam-check)
  shared/        # 공용 UI·i18n·라우트 상수
```

슬라이스 public API는 각 폴더의 `index.ts`만 사용합니다. 경로 별칭: `@/*` → `src/*`.
