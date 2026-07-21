# 프로젝트 구조

Feature-Sliced Design(FSD) 기반. 레이어·규칙의 배경은 [architecture.md](./architecture.md) 참조.

## 최상위

```
KoreanLife/
├─ index.html                # 진입 HTML (폰트, PWA 메타)
├─ vite.config.ts            # Vite + PWA(manifest, Workbox importScripts) + vitest 설정
├─ tsconfig*.json            # app / node 분리 TS 설정
├─ public/                   # 정적 자산 (아이콘, _redirects, push-sw.js)
├─ src/                      # 프론트엔드 앱 (FSD)
├─ worker/                   # Cloudflare Worker (푸시 백엔드, 독립 배포)
├─ docs/                     # 이 문서들
├─ CLAUDE.md / AGENTS.md / GEMINI.md / cursor.md   # AI 어시스턴트 가이드
└─ README.md
```

### `public/`

| 파일 | 역할 |
| --- | --- |
| `_redirects` | SPA fallback (`/* /index.html 200`) — 딥링크 새로고침 404 방지 |
| `push-sw.js` | 서비스워커 push/notificationclick 핸들러 (Workbox가 importScripts로 주입) |
| `icons/`, `favicon.svg`, `icons.svg` | PWA·앱 아이콘 |

## `src/` — 프론트엔드

```
src/
├─ main.tsx                  # 마운트: LanguageProvider → BrowserRouter → App
├─ test/setup.ts             # vitest 셋업 (localStorage shim, cleanup)
│
├─ app/                      # [레이어] 앱 셸
│  ├─ index.ts               # App export
│  ├─ ui/AppRoot.tsx         # 라우트 정의 + BottomNav
│  └─ styles/index.css       # 글로벌 디자인 시스템 (단일 CSS)
│
├─ pages/                    # [레이어] 라우트별 화면 조합
│  ├─ home/                  #   / — 히어로·퀵인덱스·필수앱·커뮤니티노트·푸시카드
│  ├─ guides/                #   /guides — 카테고리 필터 + 가이드 목록
│  ├─ guide-detail/          #   /guides/:id — 단계·Do/Don't
│  ├─ phrases/               #   /phrases — 상황별 문장 시트
│  ├─ reality/               #   /reality — 미디어 vs 현실
│  ├─ safety/                #   /safety — 사기 진단
│  ├─ community/             #   /community — 실시간 r/AskAKorean 피드
│  └─ apps/                  #   /apps — 필수 앱(카테고리별)
│
├─ widgets/                  # [레이어] 독립 UI 블록
│  ├─ topbar/                #   브랜드 + 언어 토글
│  ├─ bottom-nav/            #   하단 탭 (model/nav-items + ui)
│  ├─ home-hero/             #   홈 히어로
│  ├─ quick-index/           #   홈 "즉시 해결" 타일 (→ /apps 포함)
│  ├─ community-note/        #   홈 "이번 주 질문"
│  └─ essential-apps/        #   홈 필수앱 가로 스트립
│
├─ features/                 # [레이어] 사용자 액션 단위
│  ├─ diagnose-scam/         #   model/verdict(점수·등급) + ui/ScamDiagnoser
│  ├─ use-phrase-sheet/      #   lib/phrase-actions(복사·TTS) + ui/PhraseSheet
│  ├─ filter-by-category/    #   ui/FilterBar (칩)
│  ├─ community-feed/        #   api/fetch-feed + model/useCommunityFeed + ui/CommunityFeed
│  └─ push-notify/           #   config + lib/vapid + model/{push-state,usePushNotify} + ui/PushCard
│
├─ entities/                 # [레이어] 도메인 모델 + 표현 컴포넌트
│  ├─ guide/                 #   model/guides(이중언어 데이터·필터) + ui/GuideCard
│  ├─ phrase/                #   model/phrase-sets
│  ├─ reality-check/         #   model/reality-checks + ui/RealityCard
│  ├─ scam-check/            #   model/checklist (가중치 항목)
│  ├─ community-post/        #   model/post(parsePosts) + ui/PostCard
│  └─ essential-app/         #   model/apps(카테고리·그룹핑) + ui/AppCard
│
└─ shared/                   # [레이어] 도메인 무관 공용
   ├─ ui/                    #   index.tsx(Screen/PageHead/BlockHead/Tip/Toast) + Icon.tsx(픽토그램)
   ├─ i18n/                  #   translate / LanguageProvider / dictionary / localized(pick)
   ├─ config/routes.ts       #   라우트 상수
   └─ lib/relative-time.ts   #   상대시간 포맷(EN/KO)
```

### 슬라이스 내부 관례

- `model/` — 데이터·타입·순수 로직·훅 (예: `verdict.ts`, `useCommunityFeed.ts`)
- `ui/` — React 컴포넌트
- `api/` — 외부 네트워크 호출 (예: `fetch-feed.ts`)
- `lib/` — 슬라이스 전용 순수 유틸 (예: `vapid.ts`, `phrase-actions.ts`)
- `index.ts` — **public API.** 바깥에서는 이것만 import한다.
- `*.test.ts(x)` — 대상 파일 옆에 배치(co-located).

## `worker/` — 푸시 백엔드

```
worker/
├─ wrangler.jsonc            # 이름, compatibility_date, vars, KV 바인딩(SUBSCRIPTIONS)
├─ tsconfig.json             # @cloudflare/workers-types
└─ src/
   ├─ index.ts               # fetch 핸들러: /health, /api/push/{subscribe,test}
   └─ lib.ts                 # 순수: validateSubscription, corsHeaders, subscriptionKey(해시)
```

- secret `VAPID_JWK`(개인키 전체 JSON)는 저장소에 없다 — `wrangler secret`으로만 주입.
- KV `SUBSCRIPTIONS`: 키는 endpoint의 SHA-256 해시, 값은 구독 JSON.

## 명명·의존 규칙 (요약)

- 슬라이스 간 import는 **`@/<layer>/<slice>`**(=그 슬라이스의 `index.ts`)만. 내부 파일 경로 직접 참조 금지.
- 의존 방향: `app → pages → widgets → features → entities → shared` (역방향 금지).
- 별칭 `@/*` → `src/*`.
- 컴포넌트 파일은 PascalCase(`GuideCard.tsx`), 모델·유틸은 kebab/camel(`reality-checks.ts`, `usePushNotify.ts`).

## 새 것 추가할 때 어디에?

| 추가하려는 것 | 위치 |
| --- | --- |
| 새 화면(라우트) | `pages/<name>/` + `routes.ts` + `AppRoot` + (필요 시) `nav-items` |
| 재사용 UI 블록 | `widgets/<name>/` |
| 사용자 액션/상호작용 | `features/<name>/` |
| 도메인 데이터·카드 | `entities/<name>/` (이중언어 데이터는 `model/`) |
| 공용 아이콘/유틸/문자열 | `shared/ui|lib|i18n` |
| 새 가이드/리얼체크/앱 항목 | 해당 `entities/*/model/*.ts` (테스트가 완결성 검증) |
