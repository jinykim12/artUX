# Phase 6: 핵심 컴포넌트 — 레이아웃 - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

헤더/GNB 마크업 패턴(PC + 모바일)과 팀 커스텀 레이아웃 사용 원칙을 제공하여, 프로젝트마다 반복되는 레이아웃 마크업을 표준화한다.

Requirements: COMP-01

</domain>

<decisions>
## Implementation Decisions

### 헤더/GNB 마크업 패턴
- **D-01:** HTML 스니펫은 `docs/components/header.md`에 마크다운 코드 블록으로 작성 — Phase 5 docs/ 패턴과 일관성 유지, Phase 10 Eleventy 통합 용이
- **D-02:** 2단계 서브메뉴(드롭다운) 포함 — aria-haspopup, aria-expanded 적용한 드롭다운 패턴
- **D-03:** PC 헤더와 모바일 전체메뉴 스니펫을 하나의 문서에 함께 작성 (별도 파일 분리 불필요)
- **D-04:** 모바일 전체메뉴 패널은 aria-hidden 토글 방식 — 햄버거 버튼에 aria-expanded + aria-controls, 패널에 aria-hidden="true/false" 토글

### 레이아웃 SCSS 구조
- **D-05:** `5-objects/_layout.scss`는 Bootstrap 그리드 사용 원칙 주석만 작성 — 커스텀 확장(sticky, container-fluid 변형 등)은 포함하지 않음
- **D-06:** Bootstrap 그리드 내장 클래스 중복 금지 원칙을 주석으로 명시

### GNB 접근성
- **D-07:** GNB 접근성 JS 예시 코드 포함 — 햄버거 토글, 키보드 탐색(방향키/ESC), 서브메뉴 열기/닫기 기본 JS 스니펫
- **D-08:** aria-current="page" 현재 페이지 표시 패턴 포함
- **D-09:** 포커스 관리 설명 — 메뉴 열기 시 첫 메뉴 항목으로 포커스 이동, ESC 시 트리거로 복귀

### 헤더 SCSS
- **D-10:** `scss/6-components/_header.scss` — 헤더 공통 스타일, respond-to() 믹스인으로 PC/모바일 분기
- **D-11:** `6-components/_index.scss`에 `@forward 'header'` 추가

### Claude's Discretion
- _layout.scss 주석의 구체적 내용 및 예시 수준
- 헤더 SCSS 스타일링 세부사항 (색상, 높이, 패딩 등)
- JS 예시 코드의 구체적 구현 방식
- 서브메뉴 드롭다운의 CSS 애니메이션 여부

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SCSS 구조
- `scss/5-objects/_index.scss` — @forward 추가 위치
- `scss/6-components/_index.scss` — skip-nav 이미 있음, header @forward 추가
- `scss/6-components/_skip-nav.scss` — 기존 컴포넌트 패턴 참고
- `scss/2-tools/_breakpoints.scss` — respond-to() 믹스인 키워드 참고
- `scss/style.scss` — 전체 로드 순서

### 접근성
- `docs/accessibility/keyboard.md` — 키보드 탐색 가이드 (Phase 5)
- `.planning/phases/05-접근성-기반/05-CONTEXT.md` — 접근성 결정사항

### 요구사항
- `.planning/REQUIREMENTS.md` §컴포넌트 (COMP) — COMP-01 요구사항

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/6-components/_skip-nav.scss` — 6-components 컴포넌트 패턴 참고 (42줄, 한국어 주석)
- `scss/4-elements/_focus.scss` — focus() 믹스인 (헤더 포커스 스타일에 활용)
- `scss/2-tools/_breakpoints.scss` — respond-to(tablet), respond-to(pc) 등 반응형 분기
- `scss/3-generic/_root.scss` — z-index 토큰 (--z-modal, --z-overlay 등)

### Established Patterns
- 6-components: @forward 기반 모듈 노출 (_index.scss)
- 한국어 주석 블록 패턴 (사용 예, 접근성 주의사항)
- docs/ 마크다운 문서 구조 (Phase 5 패턴)

### Integration Points
- `scss/5-objects/_index.scss` — @forward 'layout' 추가
- `scss/6-components/_index.scss` — @forward 'header' 추가
- `docs/components/` — 신규 디렉토리 생성

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

*Phase: 06-핵심-컴포넌트-레이아웃*
*Context gathered: 2026-03-26*
