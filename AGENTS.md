# AGENTS.md — KoreanLife

> 여러 AI 코딩 도구가 공유하는 표준 가이드입니다. **전체 규칙과 상세 내용은 [`CLAUDE.md`](./CLAUDE.md)를 정본으로 따릅니다.** 이 파일은 그 요약입니다.

## 프로젝트

r/AskAKorean pain point 기반 **외국인용 한국 생활 정착 PWA**. 모바일 우선, 영어 기본(한국어 토글), 백엔드 없는 정적 PWA + 푸시용 Cloudflare Worker.

- 배포: https://koreanlife.pages.dev / 저장소: https://github.com/stoneidev/KoreanLife
- 스택: Vite + React 19 + TS 6, react-router 7, vite-plugin-pwa, vitest, oxlint, Cloudflare(Pages+Workers)

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # tsc -b && vite build (배포 전 필수 통과)
npm test         # vitest run — 현재 127개 전부 통과 유지
npx tsc -b       # 타입체크
npm run lint     # oxlint
```

## 반드시 지킬 규칙

1. **TDD 우선** — 테스트를 먼저 쓰고 구현. 모든 변경 후 `npm test` + `npx tsc -b` 통과.
2. **작은 단위로 커밋**, push/deploy는 **사용자 요청 시에만**.
3. **외부 UI 라이브러리 금지, 이모지 금지** — 아이콘은 `src/shared/ui/Icon.tsx` 라인 픽토그램 사용.
4. **모든 문자열 i18n** — UI는 `dictionary.ts`, 콘텐츠는 `Localized{en,ko}` + `pick()`. **EN 기본, KO 토글.**
5. **FSD 아키텍처** — 슬라이스는 `index.ts` public API만 사용. 의존 방향 `app→pages→widgets→features→entities→shared`. 별칭 `@/* → src/*`.

## 구조

```
src/{app,pages,widgets,features,entities,shared}   # Feature-Sliced Design
worker/                                             # Cloudflare Worker (푸시 백엔드)
```

## 주의점 (자세히는 CLAUDE.md)

- 푸시 VAPID 키는 `webpush-webcrypto` 형식 `{publicKey, privateKey}`(EC JWK 아님). 키 바꾸면 재구독 필요.
- wrangler는 `--config <절대경로>` 사용 (셸 cd 미유지).
- jsdom `localStorage` shim은 `src/test/setup.ts`에 있음.
- `applicationServerKey`는 `.buffer as ArrayBuffer`로 전달.

## 완료 체크리스트

TDD 작성 → `npm test` 통과 → `npx tsc -b` 통과 → i18n EN/KO + 이모지 없음 → 논리 단위 커밋.
