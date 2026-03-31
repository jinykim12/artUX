---
phase: 05-접근성-기반
plan: 03
subsystem: accessibility
tags: [kwcag, krds, wcag2.1, aria, aria-live, aria-modal, focus-trap, checklist, docs]

# Dependency graph
requires:
  - phase: 05-접근성-기반
    provides: 접근성 기반 코드 패턴 및 SCSS 구조 (05-01, 05-02 플랜)
provides:
  - KWCAG 2.1 AA 접근성 체크리스트 (checklist.md) — 공공기관 납품 검수용
  - 동적 콘텐츠 접근성 패턴 가이드 (dynamic-content.md) — aria-live, role=alert, 모달/탭/아코디언 패턴
affects: [06-핵심-컴포넌트-레이아웃, 07-핵심-컴포넌트-폼, 08-핵심-컴포넌트-UI, 09-핵심-컴포넌트-오버레이, 10-Eleventy-문서-사이트]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "KWCAG 2.1 24개 항목 4원칙 분류 체계 (인식/운용/이해/견고)"
    - "aria-live 영역을 페이지 초기 로드 시 빈 상태로 미리 삽입 패턴"
    - "모달: role=dialog + aria-modal=true + aria-labelledby + 포커스 트랩"
    - "탭: role=tablist/tab/tabpanel + aria-selected + tabindex 조합 패턴"
    - "아코디언: aria-expanded + aria-controls 패턴"

key-files:
  created:
    - docs/accessibility/checklist.md
    - docs/accessibility/dynamic-content.md
  modified: []

key-decisions:
  - "동적 콘텐츠 접근성 코드 구현(JS 포커스 트랩 등)은 Phase 9(오버레이 컴포넌트)로 미룸 — 이 플랜에서는 패턴 가이드 문서만 작성 (D-16)"
  - "checklist.md는 공공기관 납품 시 복사하여 즉시 사용 가능한 실무 형태로 작성 (D-10)"
  - "각 체크리스트 항목에 KWCAG 조항 번호, 자동/수동 구분, 1줄 테스트 방법 포함 (D-09)"

patterns-established:
  - "접근성 검수: 각 컴포넌트 구현 후 dynamic-content.md 하단 점검 항목 체크"
  - "새 컴포넌트에 aria-live 영역 필요 시: 페이지 최초 로드 시 빈 DOM 요소로 미리 삽입"
  - "폼 오류 메시지: role=alert 사용 (assertive + atomic 암시적 적용)"

requirements-completed: [A11Y-08, A11Y-09]

# Metrics
duration: 15min
completed: 2026-03-26
---

# Phase 5 Plan 03: 접근성 체크리스트 + 동적 콘텐츠 가이드 Summary

**KWCAG 2.1 AA 24개 검사항목 4원칙 분류 체크리스트와 aria-live/role=alert/모달 포커스 트랩 패턴 가이드를 공공기관 납품 즉시 사용 형태로 작성**

## Performance

- **Duration:** 약 15분
- **Started:** 2026-03-26T12:00:00Z
- **Completed:** 2026-03-26
- **Tasks:** 2/2
- **Files modified:** 2

## Accomplishments

- KWCAG 2.1 AA 24개 검사항목을 인식/운용/이해/견고 4개 원칙별로 분류한 마크다운 체크리스트 작성. 각 항목에 조항 번호, 자동/수동 구분, 구체적 테스트 방법 포함. 납품 시 복사하여 바로 사용 가능.
- 동적 콘텐츠 접근성 패턴 5가지(aria-live, role=alert, 모달 포커스 트랩, 탭 패널, 아코디언)를 HTML 코드 예시와 함께 작성. Phase 9에서 JS 구현 예정임을 명시.
- 자동 검사 도구(Lighthouse, axe DevTools, pa11y) 및 스크린리더(NVDA/VoiceOver/TalkBack) 수동 검사 가이드 포함.

## Task Commits

각 태스크는 개별 커밋으로 완료:

1. **Task 1: KRDS 기반 KWCAG 2.1 AA 접근성 체크리스트 작성** — `746bc43` (feat, checklist.md 포함)
2. **Task 2: 동적 콘텐츠 접근성 패턴 가이드 작성** — `746bc43` (feat)

## Files Created/Modified

- `docs/accessibility/checklist.md` — KWCAG 2.1 AA 24개 검사항목 4원칙 분류 체크리스트 (25개 마크다운 체크박스, 자동/수동 구분, 테스트 방법, 자동 검사 도구, 스크린리더 가이드)
- `docs/accessibility/dynamic-content.md` — 동적 콘텐츠 접근성 패턴 가이드 (aria-live, role=alert, 모달 포커스 트랩, 탭 패널, 아코디언, 점검 체크리스트 7개 항목)

## Decisions Made

- 동적 콘텐츠 JS 포커스 트랩 구현은 Phase 9(오버레이 컴포넌트)로 완전히 위임. 이 플랜에서는 HTML 구조 패턴과 ARIA 속성 설명만 제공.
- 체크리스트에 24개 항목 + 자동 검사 도구 + 수동 검사 방법 통합 — 단일 파일에서 검수 전체 흐름 제공.
- `aria-live` 구현 팁(페이지 초기 로드 시 빈 DOM 요소 삽입 필요)을 명시적으로 안내.

## Deviations from Plan

없음 — 플랜 그대로 실행.

## Issues Encountered

없음.

## User Setup Required

없음 — 외부 서비스 설정 불필요.

## Next Phase Readiness

- Phase 5 플랜 01, 02, 03 완료 시 접근성 기반 전체(SCSS 포커스/sr-only/skip-nav 코드 + 문서 6건) 완성
- Phase 9(오버레이 컴포넌트)에서 모달 포커스 트랩 JS 구현 시 `dynamic-content.md`의 HTML 구조 및 ARIA 패턴을 기준으로 사용
- Phase 10(Eleventy 문서 사이트)에서 `docs/accessibility/` 마크다운을 자연스럽게 통합 가능

---
*Phase: 05-접근성-기반*
*Completed: 2026-03-26*

## Self-Check: PASSED

- FOUND: docs/accessibility/checklist.md
- FOUND: docs/accessibility/dynamic-content.md
- FOUND: commit 746bc43 (contains both checklist.md and dynamic-content.md)
