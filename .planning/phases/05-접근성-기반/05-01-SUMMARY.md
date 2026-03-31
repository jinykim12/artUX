---
phase: 05-접근성-기반
plan: "01"
subsystem: scss-accessibility
tags: [focus, skip-nav, a11y, kwcag, css-tokens]
dependency_graph:
  requires: []
  provides: [focus-mixin, skip-nav-component, focus-visible-global]
  affects: [scss/4-elements, scss/6-components, scss/2-tools]
tech_stack:
  added: []
  patterns: [CSS Custom Properties focus, focus-visible 선택자, skip-nav 패턴]
key_files:
  created:
    - scss/4-elements/_focus.scss
    - scss/6-components/_skip-nav.scss
  modified:
    - scss/4-elements/_index.scss
    - scss/6-components/_index.scss
    - scss/2-tools/_mixin.scss
decisions:
  - "focus() 믹스인을 4-elements 레이어로 이동 — CSS 변수(var(--color-primary)) 사용을 위해 Bootstrap 로드 이후 레이어 필요"
  - "_mixin.scss에서 focus() 제거 후 이동 안내 주석 유지 — 기존 코드 참조자를 위한 가이드 역할"
  - "skip-nav에 transition 없음 — 공공기관 표준(즉시 노출) per D-13"
metrics:
  duration: "10m"
  completed_date: "2026-03-26"
  tasks_completed: 2
  tasks_total: 2
  files_created: 2
  files_modified: 3
---

# Phase 05 Plan 01: 접근성 기반 SCSS 구현 Summary

## One-liner

focus() 믹스인을 CSS 토큰 기반으로 4-elements 레이어에 재작성하고, KWCAG 2.4.1 준수 skip-nav 컴포넌트를 6-components에 신규 작성.

## What Was Built

### Task 1: focus() 믹스인 이동 및 CSS 토큰 기반 재작성 (commit: a07743f)

- `scss/4-elements/_focus.scss` 신규 생성
  - `@mixin focus($offset: -0.4rem)` — `var(--color-primary)` 기반 outline 스타일
  - 전역 `*:focus-visible { @include focus(); }` — 키보드/보조기술 포커스 인디케이터
  - `*:focus:not(:focus-visible) { outline: none; }` — 구형 브라우저 폴백
- `scss/4-elements/_index.scss` — `@forward 'focus'` 추가 (A11Y-03)
- `scss/2-tools/_mixin.scss` — focus() 믹스인 제거, 이동 안내 주석으로 대체

### Task 2: 본문건너뛰기(skip-nav) 컴포넌트 작성 (commit: 18a363d)

- `scss/6-components/_skip-nav.scss` 신규 생성 (KWCAG 2.4.1, A11Y-01)
  - 기본 상태: 1px×1px clip — 화면에 보이지 않음
  - `:focus` 상태: 즉시 노출 (transition 없음, 공공기관 표준)
  - z-index: 9999, `#skip-to-content` ID 패턴 (per D-14)
- `scss/6-components/_index.scss` — `@forward 'skip-nav'` 추가

## Verification Results

| 항목 | 결과 |
|------|------|
| `npm run build:css` | 오류 없음 (Bootstrap deprecation 경고만) |
| `focus-visible` in dist/artux.css | 2건 |
| `skip-nav` in dist/artux.css | 1건 |
| `sr-only` in dist/artux.css | 1건 (A11Y-02 기존 유지 확인) |
| `@mixin focus` in _mixin.scss | 0건 (삭제 확인) |

## A11Y Coverage

| 요건 | 파일 | 상태 |
|------|------|------|
| A11Y-01 (반복 영역 건너뛰기) | _skip-nav.scss | 완료 |
| A11Y-02 (sr-only 스크린리더 텍스트) | _common.scss (기존) | 기존 코드로 충족 |
| A11Y-03 (포커스 인디케이터) | _focus.scss | 완료 |

## Deviations from Plan

None - plan executed exactly as written.

단, `grep "transition" scss/6-components/_skip-nav.scss`가 1건을 반환하지만, 이는 주석 내 "애니메이션/transition 사용 금지" 문구에서 발생한 것이며 실제 CSS transition 속성은 없음. 기능상 문제 없음.

## Known Stubs

None.

## Self-Check: PASSED

- [x] scss/4-elements/_focus.scss — 존재
- [x] scss/6-components/_skip-nav.scss — 존재
- [x] commit a07743f — 존재 (feat(05-01): focus() 믹스인)
- [x] commit 18a363d — 존재 (feat(05-01): 본문건너뛰기)
- [x] dist/artux.css — focus-visible, skip-nav, sr-only 모두 포함
