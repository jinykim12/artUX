# Phase 8: 핵심 컴포넌트 — UI - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

button, card, table, pagination, breadcrumb 5종 컴포넌트의 표준 마크업 패턴과 SCSS를 제공하여, Bootstrap 확장 방식의 팀 커스텀 컴포넌트 작성 방법을 보여준다.

Requirements: COMP-02, COMP-04, COMP-05, COMP-08, COMP-09

</domain>

<decisions>
## Implementation Decisions

### 문서 구성
- **D-01:** `docs/components/` 디렉토리에 컴포넌트별 개별 마크다운 파일로 작성 — button.md, card.md, table.md, pagination.md, breadcrumb.md
- **D-02:** Phase 6/7 패턴 따름 — 코드 블록 + 접근성 주석 + (필요 시) JS 예시
- **D-03:** 각 문서에 접근성 속성 사용법과 주의사항 포함

### SCSS 스타일링
- **D-04:** Phase 7과 동일하게 본격적 팀 스타일링 수준 — Bootstrap 오버라이드 + CSS 토큰 전용
- **D-05:** 각 컴포넌트 SCSS 파일을 `6-components/`에 생성하고 `_index.scss`에 @forward 추가
- **D-06:** button — Bootstrap .btn 오버라이드 + 팀 커스텀 variant, focus() 적용
- **D-07:** card — Bootstrap .card 오버라이드, 그림자/전환 토큰 적용
- **D-08:** table — Bootstrap .table 오버라이드, 반응형 스크롤 wrapper
- **D-09:** breadcrumb — Bootstrap 기본 + 구분자 커스텀, 색상 토큰
- **D-10:** pagination은 Bootstrap 기본 스타일 유지 (별도 SCSS 불필요) — 마크업 문서만 작성

### Claude's Discretion
- 각 컴포넌트 SCSS의 구체적 스타일링 값
- 마크업 스니펫의 세부 HTML 구조
- button variant 종류와 상태별 스타일 세부사항
- table 반응형 패턴의 구체적 구현 방식
- @forward 추가 시 _index.scss 병렬 실행 race condition 방지 — 모든 @forward를 한 번에 추가할 것

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SCSS 구조
- `scss/6-components/_index.scss` — @forward 추가 위치 (skip-nav, header, form 이미 있음)
- `scss/6-components/_header.scss` — Phase 6 SCSS 컴포넌트 패턴 참고
- `scss/6-components/_form.scss` — Phase 7 SCSS 컴포넌트 패턴 참고
- `scss/3-generic/_root.scss` — CSS 토큰 (그림자, 전환, z-index 등)
- `scss/4-elements/_focus.scss` — focus 스타일

### 마크업 문서
- `docs/components/header.md` — Phase 6 마크업 문서 패턴
- `docs/components/forms.md` — Phase 7 마크업 문서 패턴

### 요구사항
- `.planning/REQUIREMENTS.md` §컴포넌트 — COMP-02, COMP-04, COMP-05, COMP-08, COMP-09

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/6-components/_header.scss` — respond-to(), CSS 토큰, 한국어 주석 패턴
- `scss/6-components/_form.scss` — Bootstrap 오버라이드, 에러/성공 토큰 패턴
- `scss/4-elements/_focus.scss` — focus() 믹스인
- `scss/3-generic/_root.scss` — --shadow-sm/md/lg, --transition-fast/base, --z-* 토큰

### Established Patterns
- 6-components @forward 모듈 노출
- docs/components/ 마크다운 문서 (코드 블록 + 접근성)
- CSS 토큰 전용, transition: none (공공기관)

### Integration Points
- `scss/6-components/_index.scss` — @forward 4종 추가 (button, card, table, breadcrumb)

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

*Phase: 08-핵심-컴포넌트-UI*
*Context gathered: 2026-03-27*
