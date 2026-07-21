# CLAUDE.md — KoreanLife 개발 가이드

> 이 문서는 AI 코딩 어시스턴트(및 사람)를 위한 **정본(source of truth)** 입니다.
> `GEMINI.md`, `cursor.md`, `AGENTS.md`는 이 문서를 가리킵니다. 규칙을 바꾸면 여기부터 고치세요.

## 프로젝트 한 줄 요약

r/AskAKorean pain point 분석을 기반으로 한, **외국인을 위한 한국 생활 정착 PWA**.
모바일 우선, 영어 기본(한국어 토글), 백엔드 없는 정적 PWA + 푸시 알림용 Cloudflare Worker.

- **배포**: https://koreanlife.pages.dev (Cloudflare Pages)
- **푸시 백엔드**: https://koreanlife-push.nijin39.workers.dev (Cloudflare Worker)
- **저장소**: https://github.com/stoneidev/KoreanLife (public)

## 기술 스택

- Vite 8 + React 19 + TypeScript 6, react-router-dom 7
- vite-plugin-pwa (Workbox `generateSW`, autoUpdate)
- 테스트: vitest 4 + @testing-library/react + jsdom
- 린트: oxlint
- 외부 UI 라이브러리 **없음** — 커스텀 CSS 디자인 시스템 (`src/app/styles/index.css`)
- 푸시 백엔드: Cloudflare Workers + KV, `webpush-webcrypto`

## 명령어

```bash
npm run dev          # 개발 서버 (localhost:5173)
npm run build        # tsc -b && vite build  (배포 전 반드시 통과)
npm run preview      # 빌드 결과 미리보기 (PWA 설치 테스트는 여기서)
npm test             # vitest run (전체 1회)
npm run test:watch   # vitest watch
npm run lint         # oxlint

# 특정 테스트만
npx vitest run src/features/push-notify
npx tsc -b           # 타입체크만
```

## 핵심 원칙 (반드시 지킬 것)

1. **TDD가 기본이다.** 새 로직/기능은 **테스트를 먼저** 쓰고 구현한다. 순수 함수·모델은 단위 테스트, 컴포넌트는 렌더/상호작용 테스트. 현재 **127개 테스트 / 24파일**, 전부 통과 상태를 유지한다.
2. **작업 단위마다 로컬 커밋.** 하나의 기능/수정이 끝나고 `npm test` + `npx tsc -b`가 통과하면 커밋한다. 커밋 메시지 끝에 아래 co-author 라인을 붙인다:
   ```
   Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
   ```
   (다른 도구는 자기 서명을 쓰되, 커밋을 작게 유지하는 원칙은 동일)
3. **커밋/푸시/배포는 사용자가 요청할 때만.** 자동으로 push·deploy하지 않는다.
4. **외부 UI 라이브러리를 추가하지 않는다.** 아이콘은 `src/shared/ui/Icon.tsx`의 라인 픽토그램 세트를 쓴다. **이모지를 UI에 쓰지 않는다** (촌스럽다는 명시적 피드백). 새 아이콘이 필요하면 24×24 stroke SVG로 `Icon.tsx`에 추가한다.
5. **모든 사용자 노출 문자열은 i18n을 거친다.** 하드코딩 금지. UI 문자열은 `dictionary.ts`, 콘텐츠 데이터는 `Localized`(`{en, ko}`) + `pick()`.
6. **영어가 기본(EN-first), 한국어는 토글.** 타깃이 외국인이다.

> 아키텍처·구조 상세는 [`docs/architecture.md`](./docs/architecture.md)와 [`docs/structure.md`](./docs/structure.md) 참조. 아래는 요약.

## 아키텍처 — Feature-Sliced Design (FSD)

```
src/
  app/        # 앱 셸, 라우팅(AppRoot), 글로벌 스타일(styles/index.css)
  pages/      # 화면 조합 (home, guides, guide-detail, phrases, reality, safety, community, apps)
  widgets/    # 독립 UI 블록 (topbar, bottom-nav, home-hero, quick-index, community-note, essential-apps)
  features/   # 사용자 액션 (diagnose-scam, use-phrase-sheet, filter-by-category, community-feed, push-notify)
  entities/   # 도메인 모델+UI (guide, phrase, reality-check, scam-check, community-post, essential-app)
  shared/     # 공용 (ui/, i18n/, config/routes, lib/)
worker/       # Cloudflare Worker (푸시 백엔드) — 독립 배포 단위
```

규칙:
- 각 슬라이스는 **`index.ts` public API만** 노출/소비한다. 내부 경로 직접 import 금지.
- 의존 방향: `app → pages → widgets → features → entities → shared` (역방향 금지).
- 경로 별칭: `@/*` → `src/*`.
- 슬라이스 내부 구조: `model/`(데이터·로직), `ui/`(컴포넌트), `api/`·`lib/`(필요 시).

## i18n 규칙

- `src/shared/i18n/`: `LanguageProvider`(localStorage 유지) + `useI18n()` 훅 → `t(key, vars?)`.
- **UI 문자열**: `dictionary.ts`에 dot-namespaced 키 (`nav.home`, `push.enable` 등). EN/KO 양쪽 추가.
- **콘텐츠 데이터**(가이드 본문, 앱 설명 등): 타입에 `Localized`(`{en, ko}`)를 쓰고 컴포넌트에서 `pick(value, lang)`으로 선택.
- 새 키 추가 시 EN·KO **둘 다** 채운다. 누락 시 EN으로 폴백되지만 KO도 채우는 게 원칙.

## 콘텐츠 확장 패턴

- **새 가이드**: `entities/guide/model/guides.ts`에 항목 추가. 모든 필드 이중언어, `icon`은 `IconName`. `guides.test.ts`가 완결성을 검증하고, 미커버 pain point는 `coverage.test.ts`가 존재를 보증한다. 카테고리는 자동으로 필터에 반영됨.
- **새 리얼체크/필수앱**: 각 `entities/*/model/*.ts` + `*.test.ts` 패턴 동일.

## 푸시 알림 (동작하는 실제 기능)

흐름: 홈 "알림" 카드 → 권한 요청 → `PushManager.subscribe` → Worker `/api/push/subscribe`(KV 저장) → "테스트 보내기" → Worker `/api/push/test` → 실제 Web Push 수신.

- **프론트**: `features/push-notify/` (config, `usePushNotify` 훅, `PushCard`, `lib/vapid.ts`).
- **서비스워커**: `public/push-sw.js` (push/notificationclick) → `vite.config.ts`의 `workbox.importScripts`로 생성 SW에 주입.
- **백엔드**: `worker/src/index.ts` (라우팅·KV), `worker/src/lib.ts` (검증·CORS, 순수).
- **VAPID 키 주의 (중요)**: `webpush-webcrypto`의 `ApplicationServerKeys.fromJSON`은 **`{publicKey, privateKey}`** (base64url raw + pkcs8) 형식을 요구한다. 일반 EC JWK가 아니다. 로컬에서 `ApplicationServerKeys.generate().toJSON()`으로 생성한다(Node에선 `setWebCrypto(webcrypto)` 필요). 공개키는 `features/push-notify/config.ts`, 개인키 전체 JSON은 Worker secret `VAPID_JWK`.
- **키 로테이션**: 공개키를 바꾸면 기존 구독은 무효. 클라이언트가 `subscriptionMatchesKey`로 mount·enable 시점에 감지해 재구독한다.
- iOS는 "홈 화면에 추가"로 **설치 후에만** 푸시 가능(iOS 16.4+). Android/데스크톱 Chrome은 바로 됨.

### Worker 배포

```bash
# KV 네임스페이스 (최초 1회)
npx wrangler kv namespace create SUBSCRIPTIONS --config worker/wrangler.jsonc
# → 출력된 id를 worker/wrangler.jsonc의 kv_namespaces에 기록

# VAPID 개인키 secret (파일로 주입, 인자로 노출 금지)
npx wrangler secret put VAPID_JWK --config worker/wrangler.jsonc < keys.json && rm keys.json

npx wrangler deploy --config worker/wrangler.jsonc
```

Worker 테스트는 라이브러리를 mock하므로 **키 형식 버그를 못 잡는다**. `worker/src/index.ts`가 secret 형식을 런타임 검증한다(회귀 테스트 있음).

## 배포 (Cloudflare Pages)

```bash
npm run build
npx wrangler pages deploy dist --project-name koreanlife --branch main --commit-dirty=true
```

- SPA fallback: `public/_redirects` (`/* /index.html 200`) — 딥링크(`/apps` 등) 새로고침 404 방지.
- 첫 배포 직후 몇 초간 route 전파(에러 1042)될 수 있으니 대기 후 재확인.

## 자주 하는 실수 (피할 것)

- 셸 `cd`가 세션 간 유지되지 않음 → wrangler는 `--config <절대경로>` 권장.
- jsdom에 `localStorage`가 없어 `src/test/setup.ts`에서 shim 제공 (테스트 실패 시 확인).
- `applicationServerKey`에는 `Uint8Array`가 아닌 `.buffer as ArrayBuffer`를 넘긴다(TS lib 호환).
- UI에 이모지 추가 금지 → `Icon` 컴포넌트 사용.

## 작업 완료 체크리스트

- [ ] 테스트 먼저 작성했는가 (TDD)
- [ ] `npm test` 통과 (127+개)
- [ ] `npx tsc -b` 통과
- [ ] i18n EN/KO 둘 다 채움, 이모지 없음
- [ ] 논리 단위로 커밋 (사용자 요청 시 push)
- [ ] 배포 관련 변경이면 `npm run build` 통과 확인
