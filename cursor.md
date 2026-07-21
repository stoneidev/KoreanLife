# cursor.md — KoreanLife

> Cursor용 프로젝트 규칙입니다. **정본은 [`CLAUDE.md`](./CLAUDE.md)**, 공통 요약은 [`AGENTS.md`](./AGENTS.md)입니다.
> 참고: Cursor가 자동으로 읽는 규칙 파일은 `.cursor/rules/*.mdc` 또는 `.cursorrules`입니다. 이 `cursor.md`를 자동 적용하려면 해당 위치로 심볼릭/복사하거나 프로젝트 규칙으로 등록하세요.

## 프로젝트

r/AskAKorean pain point 기반 **외국인용 한국 생활 정착 PWA**. 모바일 우선, 영어 기본(한국어 토글). 백엔드 없는 정적 PWA + 푸시용 Cloudflare Worker.

- 배포: https://koreanlife.pages.dev · 저장소: https://github.com/stoneidev/KoreanLife
- 스택: Vite 8 + React 19 + TypeScript 6, react-router-dom 7, vite-plugin-pwa, vitest, oxlint, Cloudflare(Pages + Workers).

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # tsc -b && vite build (배포 전 필수)
npm test         # vitest run — 127개 통과 유지
npx tsc -b       # 타입체크
npm run lint     # oxlint
```

## 반드시 지킬 규칙

1. **TDD 우선** — 테스트 먼저, 그다음 구현. 변경 후 `npm test` + `npx tsc -b` 통과.
2. **작은 논리 단위 커밋** — push/deploy는 사용자 요청 시에만.
3. **외부 UI 라이브러리 금지 · 이모지 금지** — 아이콘은 `src/shared/ui/Icon.tsx` 라인 픽토그램(24×24 stroke). 없으면 같은 규격으로 추가.
4. **모든 문자열 i18n** — UI는 `src/shared/i18n/dictionary.ts`(EN/KO 둘 다), 콘텐츠는 `Localized{en,ko}` + `pick()`. 영어 기본.
5. **Feature-Sliced Design** — 슬라이스는 `index.ts` public API만 사용. 의존 방향 `app→pages→widgets→features→entities→shared`. 별칭 `@/* → src/*`.

## 구조

```
src/{app,pages,widgets,features,entities,shared}   # FSD
worker/                                             # Cloudflare Worker (푸시 백엔드)
```

슬라이스 내부: `model/`(데이터·로직), `ui/`(컴포넌트), `api/`·`lib/`(필요 시). 각 폴더 `index.ts`가 public API.

## 주의점 (상세는 CLAUDE.md)

- 푸시 VAPID 키는 `webpush-webcrypto`의 `{publicKey, privateKey}` 형식(EC JWK 아님). 키 변경 시 재구독됨.
- wrangler는 `--config <절대경로>` 사용 (셸 cd 미유지).
- jsdom `localStorage` shim은 `src/test/setup.ts`.
- `applicationServerKey`는 `.buffer as ArrayBuffer`로 전달.

## 완료 체크리스트

TDD 작성 → `npm test` 통과 → `npx tsc -b` 통과 → i18n EN/KO + 이모지 없음 → 논리 단위 커밋.
