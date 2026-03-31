# Phase 7: 핵심 컴포넌트 — 폼 - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

input, select, textarea, checkbox, radio 5종 입력 요소에 대한 표준 마크업 패턴과 접근성 구현을 제공하고, Bootstrap 폼 스타일을 팀 표준으로 재정의한다.

Requirements: COMP-03, A11Y-05

</domain>

<decisions>
## Implementation Decisions

### 폼 스니펫 문서 형식
- **D-01:** `docs/components/forms.md` 통합 문서로 작성 — input, select, textarea, checkbox, radio 5종을 하나의 마크다운에 코드 블록으로 포함
- **D-02:** Phase 6 header.md 패턴과 일관성 유지 (docs/components/ 디렉토리)
- **D-03:** 기존 `docs/accessibility/forms.md`(Phase 5)는 접근성 원칙 문서로 유지, 이 문서는 실제 마크업 패턴 제공

### 폼 SCSS 스타일링
- **D-04:** `scss/6-components/_form.scss` — Bootstrap 폼 전체 리디자인 (본격적 팀 스타일링)
- **D-05:** 입력 필드 높이, 패딩, 테두리 등 팀 표준으로 재정의
- **D-06:** 에러/성공 상태에 CSS 토큰(--color-error, --color-success) 적용
- **D-07:** 커스텀 체크박스/라디오 스타일링 포함
- **D-08:** `6-components/_index.scss`에 `@forward 'form'` 추가

### 폼 오류 처리 패턴
- **D-09:** JS 예시 코드 포함 — 오류 발생 시 aria-describedby 연결, role="alert" 적용, 포커스 이동 기본 스니펫
- **D-10:** Phase 6 GNB JS 패턴과 일관성 유지

### Claude's Discretion
- _form.scss의 구체적 스타일링 값 (높이, 패딩, 테두리 색상 등)
- 폼 오류 JS 예시의 구체적 구현 방식
- 각 폼 요소별 마크업 스니펫의 세부 구조
- 에러/성공 토큰 색상값 (기존 _root.scss 토큰 활용)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 기존 접근성 문서
- `docs/accessibility/forms.md` — Phase 5에서 작성된 폼 접근성 원칙 문서 (A11Y-05 문서 파트)

### SCSS 구조
- `scss/6-components/_index.scss` — @forward 'form' 추가 위치 (header, skip-nav 이미 있음)
- `scss/6-components/_header.scss` — Phase 6 컴포넌트 패턴 참고 (respond-to, CSS 토큰 사용)
- `scss/3-generic/_root.scss` — 색상 토큰 (--color-error, --color-success 등)
- `scss/4-elements/_focus.scss` — focus 스타일 (폼 요소 포커스에 활용)

### 마크업 문서 패턴
- `docs/components/header.md` — Phase 6 마크업 문서 패턴 참고 (코드 블록 + 접근성 주석 + JS 예시)

### 요구사항
- `.planning/REQUIREMENTS.md` §컴포넌트 (COMP) — COMP-03
- `.planning/REQUIREMENTS.md` §접근성 (A11Y) — A11Y-05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/6-components/_header.scss` — Phase 6 컴포넌트 SCSS 패턴 (respond-to, CSS 토큰, 한국어 주석)
- `docs/components/header.md` — Phase 6 마크업 문서 패턴 (코드 블록 + JS 예시)
- `scss/4-elements/_focus.scss` — focus() 믹스인 (폼 요소 포커스)
- `scss/3-generic/_root.scss` — --color-error, --color-success 토큰

### Established Patterns
- 6-components: @forward 기반 모듈 노출
- docs/components/: 통합 마크다운 문서 (코드 블록 + 접근성 + JS)
- Bootstrap 오버라이드: _vendor.scss 스코프 내 변수 선언

### Integration Points
- `scss/6-components/_index.scss` — @forward 'form' 추가
- `docs/components/` — forms.md 추가

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

*Phase: 07-핵심-컴포넌트-폼*
*Context gathered: 2026-03-26*
