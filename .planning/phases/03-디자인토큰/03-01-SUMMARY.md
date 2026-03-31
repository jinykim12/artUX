---
phase: 03-디자인토큰
plan: 01
subsystem: design-tokens
tags: [css-custom-properties, design-tokens, scss, bootstrap5]
dependency_graph:
  requires: []
  provides: [css-custom-properties-tokens]
  affects: [all-component-phases]
tech_stack:
  added: []
  patterns: [css-custom-properties, 62.5%-rem, itcss-generic-layer]
key_files:
  created: []
  modified:
    - scss/3-generic/_root.scss
decisions:
  - "62.5% REM 환경(1rem=10px) 기준으로 모든 rem 값 환산 — px/10=rem 규칙 일관 적용"
  - "Bootstrap --bs-* 접두어와 충돌 없는 --color-*, --font-size-*, --spacing-* 스키마 채택"
  - "Sass $primary: var(--color-primary) 패턴 불가 — 주석 전용 문서화로 매핑 관계 명시"
  - "Style Dictionary 미도입 — 정적 SCSS 파일 작성으로 충분, JSON 소스 관리 오버헤드 불필요"
metrics:
  duration: 71s
  completed: 2026-03-26T06:55:52Z
  tasks_completed: 1
  tasks_total: 1
  files_modified: 1
requirements_completed:
  - TOKEN-01
  - TOKEN-02
  - TOKEN-03
  - TOKEN-04
---

# Phase 3 Plan 01: 디자인 토큰 선언 Summary

**One-liner:** _root.scss에 색상 8종·타이포 13종·간격 7종·기타 8종, 총 36개 CSS Custom Properties 토큰을 62.5% REM 환경 기준으로 선언

## What Was Built

`scss/3-generic/_root.scss`의 빈 `:root {}` 블록을 4개 범주(색상·타이포그래피·간격·기타) CSS Custom Properties 토큰으로 채웠다.

| 범주 | 토큰 수 | 주요 토큰 |
|------|---------|---------|
| 색상 (TOKEN-01) | 8종 | `--color-primary` ~ `--color-success` |
| 타이포그래피 (TOKEN-02) | 13종 | `--font-size-xs` ~ `--font-size-2xl`, `--font-weight-*`, `--leading-*` |
| 간격 (TOKEN-03) | 7종 | `--spacing-xs(0.4rem)` ~ `--spacing-3xl(6.4rem)` |
| 기타 (TOKEN-04) | 8종 | `--shadow-*` 3종, `--transition-*` 2종, `--z-*` 3종 |

## Verification Results

```
npm run build:css   → EXIT:0 (성공)

dist/artux.css :root 블록 토큰 확인:
--color-primary: #0d6efd;       ... (8종)
--font-size-xs: 1.0rem;         ... (7종 font-size + 3 weight + 3 leading)
--spacing-xs: 0.4rem;           ... (7종, 4px 배수)
--shadow-sm: 0 0.125rem ...     ... (3종)
--transition-fast: 150ms ease;  ... (2종)
--z-dropdown: 1000;             ... (3종)
```

모든 성공 기준 충족.

## Decisions Made

1. **62.5% REM 환경 기준 rem 값** — `1rem = 10px`이므로 `px/10 = rem`. `16px = 1.6rem`, `4px = 0.4rem`으로 일관 적용.
2. **Bootstrap 충돌 방지 접두어** — Bootstrap 5.3은 `--bs-*` 접두어를 사용하므로 팀 토큰은 `--color-*`, `--font-size-*`, `--spacing-*` 등 별도 네임스페이스 채택.
3. **단방향 참조 주석 문서화** — `$primary: var(--color-primary)` 패턴은 Sass 컴파일-타임 제약으로 불가. 파일 상단 주석에 Bootstrap Sass 변수와 CSS Custom Properties 매핑 관계 명시.
4. **Style Dictionary 미도입** — Phase 3 목표는 정적 SCSS 파일 작성이며, Node.js v24 환경에서 기술적으로 가능하나 팀 규모상 JSON 소스 관리 오버헤드가 실익보다 크다.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1: _root.scss 4종 토큰 선언 | `9c80882` | feat(03-01): 4종 CSS Custom Properties 디자인 토큰 선언 |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — 모든 토큰이 실제 값으로 정의됨. `:root {}` 플레이스홀더 제거 완료.

## Self-Check: PASSED

- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/scss/3-generic/_root.scss` — 토큰 80라인 포함
- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/dist/artux.css` — 빌드 결과물, 토큰 포함 확인
- [FOUND] commit `9c80882` — git log에서 확인됨
