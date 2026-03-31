---
phase: 06-핵심-컴포넌트-레이아웃
plan: 02
subsystem: ui
tags: [html, accessibility, aria, gnb, header, wai-aria, disclosure-navigation, mobile-menu, kwcag]

# Dependency graph
requires:
  - phase: 05-접근성-기반
    provides: "focus() 믹스인, skip-nav 컴포넌트, keyboard.md 가이드, 접근성 패턴 기반"
  - phase: 06-01
    provides: "_header.scss CSS 클래스명 (header__, gnb__ BEM)"
provides:
  - "docs/components/header.md — PC GNB Disclosure Navigation HTML 스니펫"
  - "docs/components/header.md — 모바일 전체메뉴 aria-hidden 토글 HTML 스니펫"
  - "docs/components/header.md — 접근성 JS 예시 (햄버거 토글, ESC, 서브메뉴, 포커스, 방향키)"
  - "docs/components/header.md — aria-current='page' 현재 페이지 표시 패턴"
affects: [07-핵심-컴포넌트-폼, 08-핵심-컴포넌트-UI, 10-eleventy-문서-사이트]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "WAI-ARIA Disclosure Navigation — GNB 서브메뉴 접근성 패턴 (role='menu' 사용 금지)"
    - "aria-hidden 토글 — 모바일 전체메뉴 패널 숨김/노출 방식"
    - "포커스 관리 패턴 — 메뉴 열기 시 첫 항목 focus(), ESC 시 트리거 복귀"
    - "aria-current='page' — 현재 페이지 링크 표시 패턴"

key-files:
  created:
    - "docs/components/header.md"
    - "docs/components/ (신규 디렉토리)"
  modified: []

key-decisions:
  - "WAI-ARIA Disclosure Navigation 패턴 확정 — role='menu' 사용 금지 경고 포함 (W3C APG 명시)"
  - "aria-haspopup 사용 금지 확정 — Disclosure 패턴에서는 aria-expanded만으로 충분"
  - "방향키 탐색은 선택적(참고용) 제공 — Tab만으로 KWCAG 2.1.1 충족"
  - "aria-current='page' 동적 적용 방법 2가지 모두 제공 (서버 렌더링 / 클라이언트 JS)"

patterns-established:
  - "docs/components/ 디렉토리: Phase 5 docs/accessibility/ 패턴과 일관성 유지"
  - "접근성 JS 예시 IIFE 패턴: (function(){ ... })() 형식"

requirements-completed: [COMP-01]

# Metrics
duration: 5min
completed: 2026-03-26
---

# Phase 6 Plan 02: 헤더/GNB 마크업 패턴 Summary

**WAI-ARIA Disclosure Navigation 기반 PC GNB + aria-hidden 토글 모바일 전체메뉴 HTML 스니펫 및 접근성 JS 예시 문서 (`docs/components/header.md`, 448줄)**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-26T13:29:00Z
- **Completed:** 2026-03-26T13:31:57Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- `docs/components/header.md` 448줄 신규 생성 — 팀 GNB 마크업 표준 문서
- PC GNB: WAI-ARIA Disclosure Navigation 패턴 (`<button aria-expanded> + <ul hidden>`) HTML 스니펫 작성, `role="menu"` 금지 경고 명시
- 모바일 전체메뉴: `aria-hidden` 토글 방식 패널 + 햄버거 버튼 HTML 스니펫 작성
- 접근성 JS 예시 3종 제공: 햄버거 토글(ESC + 포커스 관리), GNB 서브메뉴 토글(ESC + 포커스 복귀), 방향키 탐색(참고용)
- `aria-current="page"` 현재 페이지 표시 패턴 (서버 렌더링 / 클라이언트 JS 두 가지 방법 제공)
- CSS 클래스명 `_header.scss`(06-01-PLAN)와 완전 일치 확인

## Task Commits

각 태스크는 개별 커밋으로 처리되었다:

1. **Task 1: docs/components/header.md 작성** - `33ceb2d` (feat)

**Plan metadata:** (아래 최종 커밋 참조)

## Files Created/Modified

- `docs/components/header.md` — PC GNB Disclosure Navigation + 모바일 전체메뉴 aria-hidden 토글 + 접근성 JS 예시 + aria-current 패턴 통합 문서 (448줄)

## Decisions Made

- WAI-ARIA Disclosure Navigation 패턴 확정: `role="menu"` 사용 금지 경고를 문서에 명시적으로 포함했다. 이는 W3C APG의 명시 경고로, 스크린리더가 방향키 전용 탐색을 강제하는 오용 패턴을 팀에서 방지하기 위한 조치다.
- `aria-haspopup` 사용 금지: Disclosure 패턴에서는 `aria-expanded`만 사용하고 `aria-haspopup`은 제거했다. `aria-haspopup`은 `role="menu"` 또는 `role="dialog"` 팝업에서만 유효하다.
- 방향키 탐색은 "선택적 적용"으로 명시: Tab만으로 KWCAG 2.1.1을 충족하므로 방향키는 UX 개선 목적의 선택 구현으로 제공했다.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `docs/components/` 디렉토리 확립 — 이후 버튼, 폼, 카드 등 컴포넌트 문서가 동일 경로에 추가될 예정
- Phase 10 Eleventy 문서 사이트에서 `docs/components/header.md` 직접 활용 가능
- Phase 7(폼), Phase 8(UI) 컴포넌트 문서 작성 시 header.md 패턴을 참고 기준으로 사용

---

*Phase: 06-핵심-컴포넌트-레이아웃*
*Completed: 2026-03-26*
