# Phase 5: 접근성 기반 - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

KRDS 및 KWCAG 2.1 AA 기준을 충족하는 접근성 기반 패턴(sr-only, 포커스 스타일, 본문건너뛰기)을 코드로 제공하고, 팀 공통 체크리스트와 가이드 문서를 작성한다.

Requirements: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, A11Y-07, A11Y-08, A11Y-09

</domain>

<decisions>
## Implementation Decisions

### 포커스 스타일 표준화
- **D-01:** focus() 믹스인을 `scss/2-tools/_mixin.scss`에서 `scss/4-elements/` 레이어로 이동 — Bootstrap 로드 이후라 `var(--color-primary)` 사용 가능
- **D-02:** 기존 하드코딩 #0d6efd 대신 CSS 토큰 `var(--color-primary)` 기반으로 변경
- **D-03:** 고대비 모드(forced-colors)는 별도 코드 없이 outline 기반이 자동 대응하는 점을 주석으로 안내만 함
- **D-04:** 기존 `2-tools/_mixin.scss`의 focus() 제거하고 새 위치로 이동

### 문서화 범위와 형식
- **D-05:** 접근성 가이드는 `docs/accessibility/` 디렉토리에 마크다운으로 작성
- **D-06:** 주제별 분리: images.md, color-contrast.md, keyboard.md, dynamic-content.md, forms.md 등
- **D-07:** Phase 10(Eleventy 문서 사이트)에서 자연스럽게 통합 가능하도록 마크다운 형식 유지

### KRDS 체크리스트
- **D-08:** `docs/accessibility/checklist.md`에 마크다운 체크박스 형식으로 작성
- **D-09:** 각 항목에 KWCAG 2.1 조항 번호, 자동/수동 구분, 테스트 방법 포함
- **D-10:** 납품 시 복사해서 사용 가능한 실무 체크리스트 형태

### 본문건너뛰기 패턴
- **D-11:** `scss/6-components/_skip-nav.scss`에 독립 컴포넌트로 작성 (ROADMAP 제안 일치)
- **D-12:** `6-components/_index.scss`에 `@forward 'skip-nav'` 추가
- **D-13:** 포커스 시 즉시 노출 (애니메이션 없음) — 공공기관 표준 패턴
- **D-14:** `#skip-to-content` ID 패턴 사용

### 기존 코드 활용
- **D-15:** `.sr-only` / `.sr-only-focusable`은 이미 `_common.scss`에 구현됨 (A11Y-02) — 추가 작업 불필요, 기존 코드 유지
- **D-16:** 동적 콘텐츠 패턴(aria-live, role="alert", 모달 포커스 트랩)은 docs/ 문서로만 작성 (코드는 Phase 9에서 구현)

### Claude's Discretion
- focus() 믹스인의 새 위치 내 정확한 파일명 (_focus.scss vs _common.scss 내 포함)
- 각 접근성 가이드 문서의 세부 목차 및 예시 코드 수준
- KRDS 체크리스트의 구체적 항목 수와 분류 체계
- skip-nav 스타일링 세부사항 (배경색, 폰트 크기, z-index 등)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SCSS 구조
- `.planning/phases/01-프로젝트-초기-설정/01-CONTEXT.md` — ITCSS 폴더 구조, @use 전략
- `scss/2-tools/_mixin.scss` — 기존 focus() 믹스인 (이동 대상)
- `scss/4-elements/_common.scss` — .sr-only/.sr-only-focusable 기존 구현, outline 금지 주석
- `scss/6-components/_index.scss` — skip-nav @forward 추가 위치
- `scss/style.scss` — 전체 로드 순서

### 디자인 토큰
- `scss/3-generic/_root.scss` — --color-primary 등 토큰 정의 (focus 색상 참조)

### 요구사항
- `.planning/REQUIREMENTS.md` §접근성 (A11Y) — A11Y-01~A11Y-09 요구사항

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/4-elements/_common.scss` — .sr-only, .sr-only-focusable 이미 구현 (A11Y-02 충족)
- `scss/2-tools/_mixin.scss` — focus() 믹스인 존재 (이동 + 토큰 기반 변경 필요)
- `scss/2-tools/_breakpoints.scss` — respond-to() 믹스인 (skip-nav 반응형에 사용 가능)
- `scss/3-generic/_root.scss` — --color-primary 토큰 (focus 색상에 사용)

### Established Patterns
- 한국어 주석 블록 (사용 예, 파라미터 설명) — _mixin.scss, _breakpoints.scss 패턴
- @forward 기반 모듈 노출 — _index.scss 패턴
- outline: none 금지 원칙 — _common.scss 주석으로 확립

### Integration Points
- `scss/2-tools/_mixin.scss` — focus() 제거
- `scss/4-elements/` — focus 스타일 새 위치
- `scss/6-components/_index.scss` — skip-nav @forward 추가
- `docs/accessibility/` — 신규 디렉토리 생성

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

- 동적 콘텐츠 접근성 코드 구현 (aria-live, 모달 포커스 트랩) → Phase 9 (오버레이 컴포넌트)
- forced-colors 미디어쿼리 상세 대응 → v2 확장 문서 (EXT) 또는 필요 시 추후 Phase

</deferred>

---

*Phase: 05-접근성-기반*
*Context gathered: 2026-03-26*
