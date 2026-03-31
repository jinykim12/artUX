---
phase: 12-컨벤션-문서화
plan: "03"
subsystem: conventions
tags: [conventions, navigation, hub-page, index]
dependency_graph:
  requires:
    - 12-01-PLAN.md
    - 12-02-PLAN.md
  provides:
    - conventions/index.md 허브 페이지 (5개 링크 포함)
  affects:
    - docs/conventions/index.md
    - docs/_data/navigation.js
tech_stack:
  added: []
  patterns:
    - 허브 인덱스 페이지 패턴 (요약 + 링크 테이블)
key_files:
  modified:
    - docs/conventions/index.md
  created: []
decisions:
  - base.njk 플랫 구조 확인으로 navigation.js children 미추가 — index.md 링크로 충분
  - index.md 핵심 원칙 5개 bullet 요약 — 상세 내용은 개별 문서에 위임
metrics:
  duration: "5 minutes"
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_modified: 1
requirements:
  - CONV-01
  - CONV-02
  - CONV-03
  - CONV-04
  - CONV-05
---

# Phase 12 Plan 03: 컨벤션 허브 페이지 전환 Summary

**One-liner:** conventions/index.md를 5개 개별 문서 링크 테이블이 포함된 허브 페이지로 재구성, navigation.js는 플랫 구조 유지

## What Was Built

Phase 12 Plans 01/02에서 생성된 5개 개별 컨벤션 문서(naming, scss-rules, html-structure, coding-style, git-rules)를 `conventions/index.md`에서 링크로 연결하는 허브 페이지를 구성했다. v1.0 마일스톤 마지막 플랜이다.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | conventions/index.md 허브 페이지 전환 | ad47211 | docs/conventions/index.md |
| 2 | navigation.js 컨벤션 하위 메뉴 분석 | (no change) | docs/_data/navigation.js |

## Decisions Made

1. **base.njk 플랫 구조 — children 미지원:** `base.njk`의 네비게이션 렌더링이 `{% for item in navigation %}` 단순 루프로만 구현되어 있어 `children` 배열을 처리할 수 없다. 계획 지시에 따라 `navigation.js`를 수정하지 않고 `index.md` 링크 테이블로 충분히 대체한다.

2. **index.md 상세 내용 제거:** 기존 BEM 코드 예시, SCSS 속성 순서, Git 타입 표 등 상세 내용은 모두 개별 파일에 이관되었으므로 index.md에서 제거. 허브 + 핵심 원칙 요약 형태로 재구성.

## Deviations from Plan

None — plan executed exactly as written. Task 2의 "base.njk가 children 미지원 시 현상 유지" 조건에 해당되어 navigation.js 무수정 처리.

## Verification Results

- docs/conventions/에 6개 파일 존재 (index.md + 개별 5개): PASSED
- index.md에 5개 링크 모두 포함: PASSED
- 각 개별 문서 고유 permalink 확인: PASSED
- navigation.js 유효한 구문 유지: PASSED
- frontmatter permalink: /conventions/ 유지, tags 미포함: PASSED

## Known Stubs

None.

## Self-Check: PASSED

- docs/conventions/index.md: FOUND (modified)
- docs/_data/navigation.js: FOUND (unchanged, intentional)
- commit ad47211: FOUND
