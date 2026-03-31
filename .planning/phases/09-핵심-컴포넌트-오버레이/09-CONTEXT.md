# Phase 9: 핵심 컴포넌트 — 오버레이 - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

modal, tab, slider/Swiper 3종 컴포넌트의 동적 접근성 패턴(포커스 트랩, ARIA 역할, 자동 재생 제어)을 표준화한다.

Requirements: COMP-06, COMP-07, COMP-10, A11Y-09

</domain>

<decisions>
## Implementation Decisions

### 문서 구성
- **D-01:** `docs/components/` 디렉토리에 컴포넌트별 개별 마크다운 — modal.md, tab.md, slider.md
- **D-02:** Phase 6/7/8 패턴 따름 — 코드 블록 + 접근성 주석 + JS 예시

### SCSS 스타일링
- **D-03:** `scss/6-components/`에 _modal.scss, _tab.scss, _slider.scss 생성
- **D-04:** `_index.scss`에 @forward 3종 추가 — 한 task에서 일괄 처리 (race condition 방지)
- **D-05:** CSS 토큰 전용 (z-index, 오버레이 색상, 전환 등)

### 동적 접근성 패턴 (A11Y-09)
- **D-06:** 모달 — role="dialog" + aria-modal + 포커스 트랩 JS 예시 코드 포함
- **D-07:** 탭 — role="tablist/tab/tabpanel" + 방향키 탐색 JS 예시 포함
- **D-08:** 슬라이더 — Swiper.js 기반, aria-live 전환 + 정지/재생 버튼 패턴 + JS 예시
- **D-09:** Phase 5에서 작성된 docs/accessibility/dynamic-content.md와 상호 참조

### Claude's Discretion
- 각 SCSS 구체적 스타일링 값
- JS 예시 코드의 구체적 구현 (포커스 트랩 로직, 탭 방향키 등)
- Swiper.js 접근성 옵션 설명 수준
- 모달 오버레이 배경 스타일

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 접근성 문서
- `docs/accessibility/dynamic-content.md` — Phase 5 동적 콘텐츠 접근성 패턴 (aria-live, 포커스 트랩 원칙)

### SCSS 구조
- `scss/6-components/_index.scss` — @forward 추가 위치 (현재 7종)
- `scss/6-components/_header.scss` — Phase 6 SCSS 패턴 참고
- `scss/3-generic/_root.scss` — z-index, overlay 토큰

### 마크업 문서
- `docs/components/header.md` — JS 예시 포함 마크업 문서 패턴

### 요구사항
- `.planning/REQUIREMENTS.md` — COMP-06, COMP-07, COMP-10, A11Y-09

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/6-components/` — 7종 컴포넌트 패턴 확립
- `scss/3-generic/_root.scss` — --z-modal(1050), --z-overlay(1040), --transition-base(300ms)
- `scss/4-elements/_focus.scss` — focus 스타일
- `docs/accessibility/dynamic-content.md` — aria-live, 포커스 트랩 원칙 문서

### Integration Points
- `scss/6-components/_index.scss` — @forward 3종 추가 (modal, tab, slider)

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

*Phase: 09-핵심-컴포넌트-오버레이*
*Context gathered: 2026-03-27*
