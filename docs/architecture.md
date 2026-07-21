# 아키텍처

## 개요

KoreanLife는 **백엔드 없는 정적 PWA**(프론트) + **푸시 알림용 Cloudflare Worker**(경량 백엔드)로 구성된다.
프론트는 외부 API(Arctic Shift, Web Push)를 브라우저에서 직접 호출하고, 서버 상태를 두지 않는다.
유일한 서버 요소는 푸시 구독 저장·발송을 위한 Worker다.

```
┌──────────────────────── 브라우저 (PWA) ────────────────────────┐
│  React 19 SPA (react-router)                                   │
│   ├─ 정적 콘텐츠 (guides / phrases / reality / apps)  ← 번들 내장 │
│   ├─ community-feed ──HTTP──▶ Arctic Shift API (r/AskAKorean)  │
│   └─ push-notify   ──HTTP──▶ Cloudflare Worker                 │
│  Service Worker (Workbox generateSW + push-sw.js)              │
│   └─ 캐시(오프라인) · push/notificationclick 처리               │
└────────────────────────────────────────────────────────────────┘
             │ 정적 호스팅                    │ /api/push/*
             ▼                                ▼
   Cloudflare Pages                 Cloudflare Worker ──▶ KV (구독 저장)
   (koreanlife.pages.dev)           (koreanlife-push…)  └▶ 브라우저 푸시 서버(FCM 등)
```

## 레이어 — Feature-Sliced Design (FSD)

의존은 **위에서 아래로만** 흐른다. 하위 레이어는 상위를 모른다.

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

| 레이어 | 책임 | 예 |
| --- | --- | --- |
| **app** | 앱 셸, 라우팅, 글로벌 스타일, 프로바이더 | `AppRoot`, `styles/index.css` |
| **pages** | 라우트별 화면 조합 (레이아웃만, 로직 최소) | `HomePage`, `AppsPage` |
| **widgets** | 재사용 가능한 독립 UI 블록 | `BottomNav`, `EssentialApps` |
| **features** | 사용자 액션/상호작용 단위 | `diagnose-scam`, `push-notify` |
| **entities** | 도메인 모델(데이터·타입) + 표현 컴포넌트 | `guide`, `community-post` |
| **shared** | 도메인 무관 공용 (UI 킷, i18n, 라우트, 유틸) | `Icon`, `useI18n`, `routes` |

**규칙**
- 각 슬라이스는 자신의 `index.ts`(public API)로만 소비된다. 내부 경로 직접 import 금지.
- 역방향 의존 금지 (예: `entities`가 `features`를 import하면 안 됨).
- 경로 별칭 `@/*` → `src/*`.

## 라우팅 / 렌더링

- `src/main.tsx`에서 `LanguageProvider` → `BrowserRouter` → `App` 순으로 마운트.
- 라우트는 `src/shared/config/routes.ts`에 상수로 정의하고 `AppRoot`에서 매핑한다.

| 경로 | 화면 |
| --- | --- |
| `/` | HomePage |
| `/guides` · `/guides/:id` | GuidesPage · GuideDetailPage |
| `/phrases` | PhrasesPage |
| `/reality` | RealityPage |
| `/safety` | SafetyPage |
| `/community` | CommunityPage (실시간 피드) |
| `/apps` | AppsPage (필수 앱) |

- 하단 탭(`BottomNav`)이 주요 화면 간 이동을 담당(그리드 컬럼 수는 항목 수에 맞춰 동적).
- SPA이므로 딥링크 새로고침을 위해 `public/_redirects`(`/* /index.html 200`)로 fallback.

## 데이터 흐름

세 종류의 데이터가 있다.

1. **정적 콘텐츠** — `entities/*/model/*.ts`에 하드코딩된 이중언어 데이터(가이드, 문장, 리얼체크, 필수앱, 체크리스트). 번들에 포함되어 오프라인 동작.
2. **실시간 커뮤니티 피드** — `features/community-feed`가 Arctic Shift API를 브라우저에서 직접 fetch → `entities/community-post`의 `parsePosts`로 도메인 타입 변환(무효/NSFW/고정글 제거). 상태는 `useCommunityFeed` 훅(loading/success/error + refetch).
3. **푸시 구독** — `features/push-notify`가 브라우저 `PushManager` 구독을 만들고 Worker에 등록. 서버 상태는 Worker의 KV에만 존재.

> Reddit 공식 API는 브라우저에서 403 → CORS를 허용하는 Arctic Shift 미러를 사용한다.

## 국제화 (i18n)

- `shared/i18n`: `LanguageProvider`(localStorage 유지) + `useI18n()` → `t(key, vars?)`, `lang`.
- **UI 문자열**: `dictionary.ts`의 dot-namespaced 키(EN/KO 양쪽). 순수 로직 `translate()`가 EN 폴백 + `{var}` 치환.
- **콘텐츠 데이터**: `Localized`(`{en, ko}`) 타입 + `pick(value, lang)`로 선택.
- **EN이 기본**, 상단 토글로 KO 전환. 타깃이 외국인.

## 아이콘 / 디자인 시스템

- 외부 UI 라이브러리 없음. 아이콘은 `shared/ui/Icon.tsx`의 24×24 stroke 라인 픽토그램 세트(`currentColor`).
- **UI에 이모지 사용 금지.** 새 아이콘은 같은 규격으로 `Icon.tsx`에 추가하고, `guides.test.ts` 등이 아이콘 이름 유효성을 검증.
- 스타일은 단일 CSS 디자인 시스템(`app/styles/index.css`) — Airbnb/Klook풍(라운드 카드, 소프트 섀도, 코랄·틸·골드).

## PWA / 서비스 워커

- `vite-plugin-pwa`의 Workbox `generateSW` 모드 + `autoUpdate`.
- 커스텀 푸시 로직은 `public/push-sw.js`에 두고 `vite.config.ts`의 `workbox.importScripts`로 생성된 SW에 주입(push → `showNotification`, notificationclick → 앱 포커스/열기).
- manifest는 `vite.config.ts`에 정의(standalone, 코랄 테마).

## 푸시 백엔드 (Cloudflare Worker)

`worker/`는 독립 배포 단위다.

- **엔드포인트**: `/health`, `POST /api/push/subscribe`(KV 저장), `POST /api/push/test`(즉시 발송).
- **순수 로직 분리**: `worker/src/lib.ts`(구독 검증, CORS, KV 키 해시) — 러너 없이 단위 테스트 가능. `worker/src/index.ts`는 라우팅·발송.
- **발송**: `webpush-webcrypto`로 실제 Web Push 요청 생성 후 브라우저 푸시 서버에 fetch.
- **VAPID 키**: `{publicKey, privateKey}`(base64url raw + pkcs8) 형식. 공개키는 프론트 config, 개인키 전체 JSON은 Worker secret `VAPID_JWK`. 형식이 EC JWK가 아니라는 점에 주의(런타임 검증 있음).
- **키 로테이션**: 공개키가 바뀌면 기존 구독 무효 → 클라이언트가 `subscriptionMatchesKey`로 감지해 재구독.
- 만료(404/410) 구독은 발송 시 KV에서 정리.

## 배포 토폴로지

| 구성요소 | 플랫폼 | 산출물 |
| --- | --- | --- |
| 프론트 PWA | Cloudflare Pages | `npm run build` → `dist/` 업로드 |
| 푸시 백엔드 | Cloudflare Workers | `wrangler deploy --config worker/wrangler.jsonc` |
| 구독 저장소 | Workers KV | 네임스페이스 `SUBSCRIPTIONS` |

- 프론트 → Worker 연결은 `features/push-notify/config.ts`의 URL/공개키(빌드 시 `VITE_*`로 오버라이드 가능).
- 상세 절차·명령은 [../CLAUDE.md](../CLAUDE.md) 참조.

## 테스트 전략

- **TDD 기본.** 순수 함수·모델은 단위 테스트, 컴포넌트는 렌더/상호작용 테스트, Worker는 KV·fetch를 페이크로 통합 테스트.
- vitest + @testing-library + jsdom. `src/test/setup.ts`에서 `localStorage` shim·cleanup 제공.
- 콘텐츠 완결성(`guides.test.ts`)·pain point 커버리지(`coverage.test.ts`)를 테스트로 강제.
- 주의: Worker 테스트는 push 라이브러리를 mock하므로 **키 형식 버그는 못 잡는다** → 런타임 형식 검증 + 회귀 테스트로 보완.
