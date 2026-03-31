---
phase: 12-컨벤션-문서화
plan: "02"
subsystem: docs
tags: [html, git, editorconfig, conventions, eleventy, accessibility]

requires:
  - phase: 10-eleventy-문서-사이트
    provides: Eleventy 문서 사이트 빌드 구조 (layouts/base.njk, frontmatter 패턴)
  - phase: 05-접근성-기반
    provides: skip-nav 즉시 노출 원칙, KWCAG 2.1 AA 기준

provides:
  - HTML 마크업 기본 구조 문서 (docs/conventions/html-structure.md)
  - 코딩 스타일 문서 (docs/conventions/coding-style.md)
  - Git 커밋/브랜치 규칙 문서 (docs/conventions/git-rules.md)

affects:
  - 12-컨벤션-문서화 (같은 Phase)
  - 전체 팀 온보딩 문서

tech-stack:
  added: []
  patterns:
    - Eleventy frontmatter 패턴 (layout/title/tags/section/permalink)
    - 한국어 주석 규칙 (TODO/FIXME/TEMP/DEBUG 접두사)
    - Git 커밋 타입 분류 (feat/fix/docs/style/refactor/chore/a11y/perf)

key-files:
  created:
    - docs/conventions/html-structure.md
    - docs/conventions/coding-style.md
    - docs/conventions/git-rules.md
  modified: []

key-decisions:
  - "[Phase 12-02] a11y 커밋 타입 팀 추가 — 공공기관 납품 접근성 커밋 별도 분류"
  - "[Phase 12-02] *.md trim_trailing_whitespace=false 예외 이유 명문화 — 마크다운 줄바꿈 의미 보존"
  - "[Phase 12-02] skip-nav transition 없음 재확인 — Phase 05 결정 상속, html-structure.md에 명시"

patterns-established:
  - "HTML 보일러플레이트: DOCTYPE > html[lang=ko] > head(charset/viewport/IE-edge/title) > body(skip-nav > header > main[id] > footer)"
  - "Git 커밋 형식: type(scope): 한국어 명령형 동사 마무리"
  - "한국어 주석 접두사: TEMP/DEBUG는 납품 전 전체 제거 대상"

requirements-completed:
  - CONV-03
  - CONV-04
  - CONV-05

duration: 7min
completed: 2026-03-26
---

# Phase 12 Plan 02: HTML 구조·코딩 스타일·Git 규칙 문서 Summary

**Eleventy frontmatter 포함 3종 컨벤션 문서(html-structure, coding-style, git-rules) 신규 작성 — HTML 보일러플레이트·skip-nav·시맨틱 태그·editorconfig 기반 스타일·한국어 주석·a11y 커밋 타입 기준 명문화**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-26T07:11:10Z
- **Completed:** 2026-03-26T07:18:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- `docs/conventions/html-structure.md` — HTML 보일러플레이트 전체 예시, head 메타태그, lang 속성, 본문건너뛰기(KWCAG 2.4.1), 시맨틱 태그 Bad/Good 대조, 기타 필수 규칙 6개 섹션 작성
- `docs/conventions/coding-style.md` — 실제 `.editorconfig` 코드 블록 포함, 들여쓰기/한국어주석/인코딩/줄바꿈/에디터 설정 5개 섹션 작성 (*.md 예외 이유 포함)
- `docs/conventions/git-rules.md` — 한국어 명령형 커밋 형식, 8종 타입 분류표(a11y 팀 추가), scope 예시, 브랜치 전략, 원자성 원칙 6개 섹션 작성

## Task Commits

Each task was committed atomically:

1. **Task 1: html-structure.md — HTML 마크업 기본 구조 문서 작성** - `b67b0d2` (docs)
2. **Task 2: coding-style.md + git-rules.md 작성** - `c4bbf35` (docs)

## Files Created/Modified

- `docs/conventions/html-structure.md` — HTML 마크업 기본 구조 (보일러플레이트, skip-nav, 시맨틱 태그 등 6섹션)
- `docs/conventions/coding-style.md` — 코딩 스타일 (.editorconfig 기반, 한국어 주석, SCSS 5그룹 순서 등 5섹션)
- `docs/conventions/git-rules.md` — Git 규칙 (커밋 형식, 8종 타입표, 브랜치 전략 등 6섹션)

## Decisions Made

- **a11y 커밋 타입 팀 추가**: 공공기관 납품 품질 관리 목적으로 기존 6종에 `a11y`, `perf` 추가. `index.md` 6종에서 8종으로 확장.
- ***.md trim_trailing_whitespace 예외 명문화**: 마크다운 줄바꿈 스페이스 2개의 의미를 보존하기 위한 `.editorconfig` 예외 규칙을 문서에 이유와 함께 명시.
- **skip-nav transition 없음 재확인**: Phase 05 결정(공공기관 즉시 노출 원칙)을 `html-structure.md`에 명시적으로 상속 기록.

## Deviations from Plan

None — 계획대로 정확히 실행.

## Issues Encountered

None.

## User Setup Required

None — 외부 서비스 설정 불필요.

## Next Phase Readiness

- Phase 12 컨벤션 문서화 3종 (`naming.md`, `scss-rules.md`, `html-structure.md`, `coding-style.md`, `git-rules.md`) 모두 생성 완료
- Eleventy 문서 사이트에서 `/conventions/html-structure/`, `/conventions/coding-style/`, `/conventions/git-rules/` 경로로 자동 렌더링 준비됨
- `docs/conventions/index.md` 와 연계하여 conventions 섹션 전체 구성 완성

---
*Phase: 12-컨벤션-문서화*
*Completed: 2026-03-26*

## Self-Check: PASSED

- docs/conventions/html-structure.md — FOUND
- docs/conventions/coding-style.md — FOUND
- docs/conventions/git-rules.md — FOUND
- .planning/phases/12-컨벤션-문서화/12-02-SUMMARY.md — FOUND
- commit b67b0d2 — FOUND
- commit c4bbf35 — FOUND
