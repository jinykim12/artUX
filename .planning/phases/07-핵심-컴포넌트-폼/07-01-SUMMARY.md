---
phase: 07-핵심-컴포넌트-폼
plan: "01"
subsystem: ui
tags: [scss, bootstrap, forms, css-custom-properties, a11y]

# Dependency graph
requires:
  - phase: 06-핵심-컴포넌트-레이아웃
    provides: _header.scss 패턴 (한국어 주석, @use, CSS 토큰 방식)
  - phase: 05-접근성-기반
    provides: _focus.scss 전역 :focus-visible, forms.md 접근성 원칙
  - phase: 03-디자인-토큰
    provides: _root.scss CSS Custom Properties (--color-*, --font-size-*, --spacing-*)
provides:
  - Bootstrap .form-control / .form-select / .form-check-input CSS 토큰 오버라이드
  - 오류(.is-invalid)/성공(.is-valid) 상태 스타일 (--color-error, --color-success)
  - 커스텀 체크박스/라디오 크기 및 포커스 스타일
  - fieldset legend 이중 margin-bottom 방지 (Pitfall 4)
  - Bootstrap focus box-shadow 제거 (전역 :focus-visible 단독 동작)
affects:
  - 07-02 (docs/components/forms.md — 마크업 패턴 문서가 이 SCSS 클래스를 참조)
  - 모든 후속 컴포넌트 폼 요소 사용

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Bootstrap 클래스를 CSS 선택자로 직접 오버라이드 (Sass 변수 방식 금지)
    - CSS Custom Properties(var(--*))만 사용하는 팀 토큰 기반 스타일링
    - transition: none — 공공기관 즉시 표시 원칙
    - :focus에 box-shadow: none + outline: 0 — 전역 :focus-visible 위임 패턴

key-files:
  created:
    - scss/6-components/_form.scss
  modified:
    - scss/6-components/_index.scss

key-decisions:
  - "Bootstrap :focus box-shadow 제거 — _form.scss의 :focus에 box-shadow: none; outline: 0 명시, _focus.scss 전역 :focus-visible이 단독 처리"
  - "Sass 변수 오버라이드 방식 금지 — $input-border-color 등 Bootstrap Sass 변수 사용 않고 CSS 선택자 오버라이드만 사용"
  - "Bootstrap --bs-form-check-bg-image SVG 유지 — 커스텀 SVG 재작성 금지 (Pitfall 5: 고대비 모드 forced-colors 대응)"
  - "fieldset legend.form-label margin-bottom 명시 — Bootstrap _reboot.scss 이중 margin 방지 (Pitfall 4)"

patterns-established:
  - "Pattern 1: CSS 선택자 오버라이드 — .form-control { ... } 직접 정의, 후속 cascade로 Bootstrap 기본 덮어쓰기"
  - "Pattern 2: 터치 타겟 최소 크기 — height: 4.8rem (48px) 공공기관 접근성 기준"

requirements-completed: [COMP-03]

# Metrics
duration: 2min
completed: 2026-03-26
---

# Phase 07 Plan 01: 폼 컴포넌트 SCSS Summary

**Bootstrap .form-control / .form-select / .form-check-input를 팀 CSS 토큰으로 CSS 선택자 오버라이드하는 _form.scss 생성 (7개 섹션, transition: none, focus box-shadow 제거)**

## Performance

- **Duration:** 2min
- **Started:** 2026-03-26T14:22:11Z
- **Completed:** 2026-03-26T14:23:22Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments

- `_form.scss` 신규 생성 — .form-label, .form-control, .form-select, .form-check-input, .invalid-feedback/.form-error, .valid-feedback/.form-success, .form-text/.form-hint 7개 섹션 구현
- 모든 스타일 값을 CSS 토큰(var(--*))으로 정의 — Sass 변수 오버라이드 방식 미사용
- `_index.scss`에 `@forward 'form'` 등록 완료 — `npm run build:css`로 dist/artux.css에 폼 스타일 출력 확인

## Task Commits

Each task was committed atomically:

1. **Task 1: _form.scss 생성 및 _index.scss 등록** - `fec6c13` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `scss/6-components/_form.scss` - Bootstrap 폼 클래스 CSS 토큰 오버라이드 (7개 섹션)
- `scss/6-components/_index.scss` - `@forward 'form'` 추가

## Decisions Made

- Bootstrap :focus box-shadow를 `_form.scss`의 `:focus { box-shadow: none; outline: 0; }`로 제거. `_focus.scss`의 전역 `*:focus-visible`이 outline을 단독 처리.
- `fieldset { legend.form-label { margin-bottom: var(--spacing-xs); } }` 추가 — Bootstrap `_reboot.scss` `legend { margin-bottom: 0.5rem }` 이중 margin 방지 (Pitfall 4).
- Bootstrap `--bs-form-check-bg-image` SVG 체크마크 그대로 유지 — 커스텀 SVG 재작성 시 forced-colors(고대비) 모드 대응 누락 위험.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. `npm run build:css` 출력의 deprecation warning은 Bootstrap 5.3.8 / Dart Sass 버전 충돌에서 발생하는 기존 경고이며, 이번 작업과 무관하다.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `_form.scss` 완성 — Phase 07-02에서 `docs/components/forms.md` 마크업 패턴 문서 작성 시 이 SCSS 클래스명을 그대로 참조 가능
- `dist/artux.css`에 폼 스타일 포함 확인 완료

---
*Phase: 07-핵심-컴포넌트-폼*
*Completed: 2026-03-26*
