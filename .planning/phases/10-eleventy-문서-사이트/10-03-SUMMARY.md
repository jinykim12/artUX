---
phase: 10-eleventy-문서-사이트
plan: "03"
subsystem: ui
tags: [eleventy, markdown, njk, tokens, conventions, clipboard, vanilla-js]

requires:
  - phase: 10-01
    provides: Eleventy 3.x 설정 + base.njk 베이스 레이아웃 (script src="/js/copy.js" defer 포함) + passthrough docs/js 설정
  - phase: 10-02
    provides: 컴포넌트/접근성 마크다운 16개 frontmatter 추가 + 섹션 인덱스 2개

provides:
  - 디자인 토큰 섹션 페이지 (permalink: /tokens/) — 색상/타이포/간격 토큰 테이블 + 색상 스워치
  - 컨벤션 섹션 페이지 (permalink: /conventions/) — SCSS 네이밍/코딩 스타일/Git 커밋/HTML 규칙
  - 코드 복사 바닐라 JS (docs/js/copy.js) — navigator.clipboard.writeText + 2초 원복 + 접근성 aria-label

affects: []

tech-stack:
  added: []
  patterns:
    - IIFE 패턴('use strict') + DOMContentLoaded 분기로 안전한 DOM 초기화
    - pre > code 선택자로 모든 코드 블록에 복사 버튼 자동 주입
    - 인라인 CSS 스타일로 docs.css 없이도 복사 버튼 독립 동작

key-files:
  created:
    - docs/tokens/index.md
    - docs/conventions/index.md
    - docs/js/copy.js
  modified: []

key-decisions:
  - "copy.js IIFE 패턴 사용 — 전역 오염 없이 바닐라 JS 격리"
  - "복사 버튼 인라인 스타일 — docs.css 의존 없이 독립 동작 보장"

patterns-established:
  - "코드 복사 버튼: pre.style.position=relative + btn.position=absolute top:.5rem right:.5rem"
  - "aria-label 상태 전환: '코드 복사' → '코드가 복사되었습니다' → '코드 복사' (2000ms 원복)"

requirements-completed: [DOCS-02, DOCS-03, DOCS-06]

duration: 2min
completed: 2026-03-27
---

# Phase 10 Plan 03: 토큰·컨벤션 페이지 + 코드 복사 JS Summary

**디자인 토큰 섹션(/tokens/)과 컨벤션 섹션(/conventions/) 마크다운 페이지, navigator.clipboard 기반 코드 복사 버튼(copy.js) 추가로 Phase 10 Eleventy 문서 사이트 완성**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-27T00:32:30Z
- **Completed:** 2026-03-27T00:34:28Z
- **Tasks:** 2
- **Files modified:** 3 (3 created)

## Accomplishments

- docs/tokens/index.md: 색상 8개/타이포 5개/간격 5개 토큰 테이블 + 색상 스워치 div 블록 + 사용 예시 코드
- docs/conventions/index.md: BEM 변형 네이밍/코딩 스타일 5그룹 순서/Git 커밋 타입 테이블/HTML 규칙 4항
- docs/js/copy.js: IIFE + 'use strict', navigator.clipboard.writeText, 2초 후 원복, 접근성 aria-label 전환
- npm run build 후 _site/tokens/index.html, _site/conventions/index.html, _site/js/copy.js 전체 생성 확인

## Task Commits

1. **Task 1: 디자인 토큰 섹션 페이지 + 컨벤션 섹션 페이지 생성** - `e4ad456` (feat)
2. **Task 2: 코드 복사 바닐라 JS 구현 (copy.js)** - `b123326` (feat)

**Plan metadata:** (아래 docs 커밋에서 기록)

## Files Created/Modified

- `docs/tokens/index.md` - 색상/타이포/간격 토큰 섹션 페이지 (permalink: /tokens/)
- `docs/conventions/index.md` - SCSS/Git/HTML 컨벤션 섹션 페이지 (permalink: /conventions/)
- `docs/js/copy.js` - 코드 블록 복사 바닐라 JS, 접근성 aria-label 상태 전환

## Decisions Made

- copy.js를 IIFE 패턴으로 구현 — 전역 네임스페이스 오염 없이 격리 실행
- 버튼 스타일을 인라인으로 지정 — 외부 CSS 파일(docs.css) 없이도 독립 동작 보장

## Deviations from Plan

None - 플랜 그대로 실행.

## Issues Encountered

None

## User Setup Required

None - 외부 서비스 설정 불필요.

## Next Phase Readiness

- Phase 10 Eleventy 문서 사이트 3개 플랜 모두 완료
- DOCS-01~DOCS-07 전체 요구사항 충족
- Phase 11 스타터 킷 진행 가능

## Self-Check: PASSED

- docs/tokens/index.md — FOUND
- docs/conventions/index.md — FOUND
- docs/js/copy.js — FOUND
- _site/tokens/index.html — FOUND
- _site/conventions/index.html — FOUND
- _site/js/copy.js — FOUND
- Commit e4ad456 — FOUND
- Commit b123326 — FOUND

---
*Phase: 10-eleventy-문서-사이트*
*Completed: 2026-03-27*
