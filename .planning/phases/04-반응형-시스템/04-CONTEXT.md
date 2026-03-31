# Phase 4: 반응형 시스템 - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

팀 표준 브레이크포인트 4단계를 정의하고 `respond-to()` 믹스인을 제공하여, 모든 컴포넌트가 일관된 반응형 기준을 사용하도록 한다.

Requirements: RESP-01, RESP-02, RESP-03

</domain>

<decisions>
## Implementation Decisions

### 믹스인 파일 구조
- **D-01:** `scss/2-tools/_breakpoints.scss` 신규 생성 — 브레이크포인트 변수 + respond-to() 믹스인 + 모바일 퍼스트 원칙 + Bootstrap 대조표를 한 파일에 응집
- **D-02:** 기존 `_mixin.scss`(6종)는 변경 없이 유지
- **D-03:** `2-tools/_index.scss`에 `@forward 'breakpoints'` 추가

### 브레이크포인트 변수 형식
- **D-04:** Sass Map 형태로 정의 — `$breakpoints: (mobile-max: 767px, tablet: 768px, tablet-max: 1023px, pc-sm: 1024px, pc-sm-max: 1279px, pc: 1280px)`
- **D-05:** respond-to()에서 `map-get`으로 조회, 잘못된 키워드 사용 시 `@error` 발생

### 미디어쿼리 전략
- **D-06:** min-width 기본 (모바일 퍼스트) + range(-only 접미사) 병행
  - `respond-to(tablet)` → `@media (min-width: 768px)`
  - `respond-to(pc-sm)` → `@media (min-width: 1024px)`
  - `respond-to(pc)` → `@media (min-width: 1280px)`
  - `respond-to(mobile-only)` → `@media (max-width: 767px)`
  - `respond-to(tablet-only)` → `@media (min-width: 768px) and (max-width: 1023px)`
  - `respond-to(pc-sm-only)` → `@media (min-width: 1024px) and (max-width: 1279px)`

### Bootstrap 그리드 호환성
- **D-07:** Bootstrap $grid-breakpoints는 오버라이드하지 않음 — 기본값(576/768/992/1200/1400) 유지
- **D-08:** Bootstrap 그리드 클래스(col-md-6 등)는 Bootstrap 기본 breakpoint로 동작, 팀 respond-to()는 커스텀 컴포넌트 전용
- **D-09:** _breakpoints.scss 상단에 Bootstrap vs 팀 breakpoint 대조표 주석 작성

### 모바일 퍼스트 작성 패턴
- **D-10:** 기본 원칙: 기본 스타일은 모바일 기준, respond-to()로 넓은 화면 확장
- **D-11:** 예외 허용: PC 전용 컴포넌트 등 특수한 경우 respond-to(mobile-only), respond-to(tablet-only) 등 -only 변형 사용 가능
- **D-12:** 모바일 퍼스트 원칙 및 예외 사용 시점 안내를 _breakpoints.scss 주석에 포함

### Claude's Discretion
- respond-to() 믹스인 내부 구현 세부사항 (map-has-key vs map-get null 체크 등)
- _breakpoints.scss 내 주석 구조 및 대조표 형식
- 사용 예시 코드 스니펫의 구체적 내용

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SCSS 구조
- `.planning/phases/01-프로젝트-초기-설정/01-CONTEXT.md` — ITCSS 폴더 구조, @use 전략, 62.5% REM 트릭 결정
- `scss/2-tools/_mixin.scss` — 기존 6종 믹스인 패턴 참고
- `scss/2-tools/_index.scss` — @forward 추가 위치
- `scss/style.scss` — 전체 로드 순서 및 Bootstrap 임포트 전략

### 요구사항
- `.planning/REQUIREMENTS.md` §반응형 (RESP) — RESP-01, RESP-02, RESP-03 요구사항

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/2-tools/_mixin.scss` — 6종 믹스인 (focus, flex, ellipsis, position, drop-shadow, ani). 동일 패턴으로 _breakpoints.scss 작성
- `scss/2-tools/_index.scss` — 현재 `@forward 'mixin'`만 포함. `@forward 'breakpoints'` 추가 필요

### Established Patterns
- 2-tools 레이어는 Bootstrap 로드 이전 → $primary 등 Bootstrap 변수 참조 불가 (Phase 1 결정)
- 각 믹스인에 한국어 주석 블록 (사용 예, 파라미터 설명) 패턴 확립됨
- `@error` 사용 가능 (Dart Sass 환경)

### Integration Points
- `scss/2-tools/_index.scss` — @forward 추가
- `scss/style.scss` — 변경 불필요 (이미 `@use '2-tools' as tools;` 포함)
- Phase 5+ 컴포넌트에서 `respond-to()` 사용 시작

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

*Phase: 04-반응형-시스템*
*Context gathered: 2026-03-26*
