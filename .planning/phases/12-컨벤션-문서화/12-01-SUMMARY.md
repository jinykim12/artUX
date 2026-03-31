---
phase: 12-컨벤션-문서화
plan: "01"
subsystem: docs/conventions
tags:
  - conventions
  - naming
  - scss
  - documentation
dependency_graph:
  requires: []
  provides:
    - docs/conventions/naming.md
    - docs/conventions/scss-rules.md
  affects:
    - Eleventy 문서 사이트 /conventions/naming/
    - Eleventy 문서 사이트 /conventions/scss-rules/
tech_stack:
  added: []
  patterns:
    - Eleventy frontmatter (tags: conventions, permalink)
    - BEM 변형 팀 표준 문서화
    - SCSS 5그룹 속성 순서
key_files:
  created:
    - docs/conventions/naming.md
    - docs/conventions/scss-rules.md
  modified: []
decisions:
  - "naming.md는 기존 index.md BEM/클래스 원칙을 확장 — 중복 없이 세분화"
  - "scss-rules.md는 기존 index.md SCSS 속성 순서를 그대로 이관 + @use/@forward 전략 추가"
  - "공공기관 납품 transition:none 원칙을 scss-rules.md에 명시적으로 문서화"
metrics:
  duration: "2m 27s"
  completed_date: "2026-03-27"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 12 Plan 01: 클래스 네이밍 규칙 + SCSS 작성 규칙 문서화 Summary

**One-liner:** BEM 변형 팀 표준 + Bootstrap 유틸리티 사용 기준 + SCSS 5그룹/중첩/`@use` 규칙을 Eleventy 통합 가능한 Markdown 문서 2종으로 명문화

---

## What Was Built

### docs/conventions/naming.md

클래스 네이밍 규칙 문서 — 6개 섹션 구성:

1. BEM 변형 (팀 표준) — 블록/요소/수정자 SCSS 예시 포함
2. Bootstrap 유틸리티 사용 기준 — 클래스 작성 시점 표 포함
3. 커스텀 클래스 작성 기준 — HTML 마크업 클래스 순서, 팀 표준 variant 목록
4. `js-` 접두사 규칙 — JS 훅 전용, `is-` 상태 클래스 패턴 병기
5. 파일 네이밍 규칙 — SCSS/HTML/JS 파일명 규칙
6. 피해야 할 패턴 — camelCase/약어/Bootstrap 덮어쓰기 Bad/Good 대조 4종

Eleventy frontmatter: `tags: conventions`, `permalink: /conventions/naming/`

### docs/conventions/scss-rules.md

SCSS 작성 규칙 문서 — 6개 섹션 구성:

1. 중첩 깊이 제한 (3단계) — Bad/Good/Better 3단계 대조 예시
2. 속성 순서 (5그룹) — 포지셔닝/박스모델/타이포그래피/시각효과/기타, 실제 `.component {}` 블록 예시
3. `@use` vs `@import` 전략 — Bootstrap 격리 패턴(`_vendor.scss`), 점진적 마이그레이션 방침
4. 주석 규칙 — 섹션 구분선, 파일 상단 주석, TODO/TEMP/DEBUG 태그
5. 공공기관 납품 필수 규칙 — `transition: none`, CSS Custom Properties 우선, 포커스 아웃라인
6. `@forward` 사용 지침 — `_index.scss` 집계 패턴, 컴포넌트 추가 시 동시 등록 원칙

Eleventy frontmatter: `tags: conventions`, `permalink: /conventions/scss-rules/`

---

## Decisions Made

1. **naming.md 는 기존 index.md 확장 방식 채택** — 중복 없이 BEM/클래스 원칙을 세분화. index.md는 개요 역할 유지.
2. **scss-rules.md에 기존 5그룹 순서 이관** — index.md 속성 순서를 그대로 이관하고 overflow/box-shadow/opacity 등 세부 속성 추가.
3. **공공기관 납품 `transition: none` 원칙 문서화** — Phase 09 결정을 scss-rules.md에 명시적으로 기록, 팀원 납품 전 체크포인트로 활용.

---

## Deviations from Plan

None - 계획대로 정확히 실행됨.

---

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | `0497b1d` | docs(12-01): 클래스 네이밍 규칙 문서 작성 (naming.md) |
| Task 2 | `427c8e1` | docs(12-01): SCSS 작성 규칙 문서 작성 (scss-rules.md) |

---

## Self-Check: PASSED

- [x] docs/conventions/naming.md 존재 확인
- [x] docs/conventions/scss-rules.md 존재 확인
- [x] naming.md: `tags: conventions`, `permalink: /conventions/naming/` 포함
- [x] scss-rules.md: `tags: conventions`, `permalink: /conventions/scss-rules/` 포함
- [x] naming.md: BEM, js- 접두사, Bootstrap 유틸리티 기준 포함
- [x] scss-rules.md: 중첩, @use, 속성 5그룹 포함
- [x] 커밋 0497b1d, 427c8e1 존재 확인
