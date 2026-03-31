# Phase 10: Eleventy 문서 사이트 - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

모든 컴포넌트 패턴과 가이드를 열람할 수 있는 Eleventy 기반 정적 문서 사이트를 구축하여, 팀원 누구나 브라우저에서 가이드를 확인하고 코드를 복사할 수 있도록 한다.

Requirements: DOCS-01, DOCS-02, DOCS-03, DOCS-04, DOCS-05, DOCS-06, DOCS-07

</domain>

<decisions>
## Implementation Decisions

### Eleventy 설정
- **D-01:** Eleventy 3.x ESM 설정 — `eleventy.config.js` (ESM)
- **D-02:** input: "docs", output: "_site"
- **D-03:** SCSS는 별도 빌드 (npm run build:css) — Eleventy passthrough로 dist/artux.css 복사
- **D-04:** Nunjucks 템플릿 엔진

### 레이아웃/네비게이션
- **D-05:** `docs/_includes/layouts/base.njk` — 사이드 네비게이션 + 콘텐츠 영역
- **D-06:** 사이드 네비 섹션: 시작하기 / SCSS 구조 / 디자인 토큰 / 반응형 / 접근성 / 컴포넌트 / 스타터 킷 / 컨벤션
- **D-07:** 모바일 대응은 간단한 토글 메뉴 (복잡한 반응형 불필요 — 내부 문서 사이트)

### 기존 콘텐츠 통합
- **D-08:** docs/components/ 기존 마크다운 파일들(header.md, forms.md, button.md 등)을 Eleventy 페이지로 자동 변환
- **D-09:** docs/accessibility/ 기존 마크다운 파일들도 동일하게 통합
- **D-10:** 각 마크다운 파일에 Eleventy frontmatter(layout, title, tags) 추가 필요

### 코드 복사 기능
- **D-11:** 바닐라 JS 클립보드 API — `<button class="copy-btn" aria-label="코드 복사">`
- **D-12:** 최소한의 JS — 프레임워크 없이 querySelector + navigator.clipboard.writeText

### 빌드 스크립트
- **D-13:** `npm run serve` — npm-run-all2 --parallel로 SCSS watch + Eleventy dev 서버 병렬 실행
- **D-14:** `npm run build` — SCSS 빌드 → Eleventy 빌드 순차 실행

### Claude's Discretion
- Nunjucks 레이아웃 세부 HTML 구조
- 사이드 네비 스타일링 (artux.css 활용 vs 별도 docs CSS)
- 코드 복사 버튼 위치 및 스타일
- 토큰 섹션의 시각화 방식 (색상 스워치, 간격 미리보기 등)
- 컨벤션 섹션 페이지 구체적 내용

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 기존 콘텐츠
- `docs/components/` — header.md, forms.md, button.md, card.md, table.md, pagination.md, breadcrumb.md, modal.md, tab.md, slider.md
- `docs/accessibility/` — images.md, color-contrast.md, keyboard.md, forms.md, checklist.md, dynamic-content.md

### 빌드 설정
- `package.json` — 기존 npm scripts (build:css, watch:css)
- `scss/style.scss` — SCSS 진입점

### 요구사항
- `.planning/REQUIREMENTS.md` §문서 사이트 (DOCS) — DOCS-01~07

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/components/*.md` — 10개 컴포넌트 마크다운 (Phase 6~9)
- `docs/accessibility/*.md` — 6개 접근성 가이드 (Phase 5)
- `dist/artux.css` — 컴파일된 CSS (문서 사이트에서 직접 사용 가능)

### Integration Points
- `package.json` — serve, build 스크립트 추가
- `docs/` — Eleventy 입력 디렉토리로 활용 (기존 마크다운 자동 변환)
- `.gitignore` — _site/ 추가 필요

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 10-eleventy-문서-사이트*
*Context gathered: 2026-03-27*
