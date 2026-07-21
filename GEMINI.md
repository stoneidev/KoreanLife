# GEMINI.md — KoreanLife

> Gemini용 프로젝트 컨텍스트입니다. **정본은 [`CLAUDE.md`](./CLAUDE.md)** 이며, 공통 요약은 [`AGENTS.md`](./AGENTS.md)에 있습니다. 상세 규칙은 그쪽을 따르세요.

## 프로젝트

r/AskAKorean pain point 기반 **외국인용 한국 생활 정착 PWA**. 모바일 우선, 영어 기본(한국어 토글). 백엔드 없는 정적 PWA + 푸시용 Cloudflare Worker.

- 배포: https://koreanlife.pages.dev
- 저장소: https://github.com/stoneidev/KoreanLife
- 스택: Vite 8 + React 19 + TypeScript 6, react-router-dom 7, vite-plugin-pwa, vitest, oxlint, Cloudflare(Pages + Workers).

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:5173)
npm run build    # tsc -b && vite build (배포 전 필수)
npm test         # vitest run — 127개 통과 유지
npx tsc -b       # 타입체크
npm run lint     # oxlint
```

## 반드시 지킬 규칙

1. **TDD 우선.** 테스트를 먼저 작성하고 구현한다. 변경 후 `npm test` + `npx tsc -b` 통과 필수.
2. **작은 논리 단위로 커밋.** push·deploy는 사용자가 요청할 때만.
3. **외부 UI 라이브러리 금지. 이모지 금지.** 아이콘은 `src/shared/ui/Icon.tsx`의 24×24 stroke 픽토그램 사용, 없으면 같은 규격으로 추가.
4. **모든 사용자 노출 문자열은 i18n.** UI는 `src/shared/i18n/dictionary.ts`(EN/KO 둘 다), 콘텐츠는 `Localized{en,ko}` + `pick(value, lang)`. 영어 기본.
5. **Feature-Sliced Design.** 슬라이스는 `index.ts` public API로만 소비. 의존 방향 `app→pages→widgets→features→entities→shared`. 별칭 `@/* → src/*`.

## 구조

```
src/app       셸/라우팅/글로벌 스타일
src/pages     화면 (home, guides, guide-detail, phrases, reality, safety, community, apps)
src/widgets   독립 UI 블록
src/features  사용자 액션 (diagnose-scam, use-phrase-sheet, community-feed, push-notify 등)
src/entities  도메인 모델+UI (guide, phrase, reality-check, scam-check, community-post, essential-app)
src/shared    공용 (ui/, i18n/, config/, lib/)
worker/       Cloudflare Worker (푸시 백엔드, 독립 배포)
```

## 주의점

- 푸시 VAPID 키는 `webpush-webcrypto`의 `{publicKey, privateKey}` 형식(일반 EC JWK 아님). 공개키는 `features/push-notify/config.ts`, 개인키는 Worker secret `VAPID_JWK`. 키를 바꾸면 클라이언트가 재구독한다.
- wrangler 명령은 `--config <절대경로>` 사용(셸 cd가 유지되지 않음).
- jsdom `localStorage` shim은 `src/test/setup.ts`.
- 자세한 배포/푸시/함정은 `CLAUDE.md` 참조.

## 완료 체크리스트

TDD 작성 → `npm test` 통과 → `npx tsc -b` 통과 → i18n EN/KO + 이모지 없음 → 논리 단위 커밋(요청 시 push).
