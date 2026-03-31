---
phase: 02-scss
plan: 02
subsystem: scss/elements-font-common
tags: [scss, font, common, pretendard, a11y, dart-sass, bootstrap]
dependency_graph:
  requires: [02-01]
  provides: [SCSS-04, SCSS-05, SCSS-07]
  affects: [03-01]
tech_stack:
  added: []
  patterns:
    - "Bootstrap Reboot 이후 보완 초기화 레이어 패턴 — _common.scss는 Reboot 중복 항목 제외하고 보완만 담당"
    - "Pretendard GOV 로컬 파일 방식 — woff2/woff 이중 src + font-display: swap"
    - "ITCSS 4-elements 로드 순서 — base(62.5% REM) → font(@font-face) → common(보완 초기화)"
    - "outline: none 완전 금지 패턴 — 주석으로도 '사용 금지' 명시, Phase 5 focus() 믹스인으로 위임"
key_files:
  created:
    - scss/4-elements/_common.scss
    - scss/4-elements/_font.scss
  modified:
    - scss/4-elements/_index.scss
    - scss/style.scss
    - scss/3-generic/_vendor.scss
decisions:
  - "comment-only outline:none — 실제 CSS 속성 없음, 주석 내 '사용 금지' 안내만 존재. Phase 5 접근성 레이어에서 focus() 믹스인으로 포커스 스타일 별도 정의 예정"
  - "_font.scss url() 경로는 dist/artux.css 기준 — Sass 컴파일 결과물 위치 기준으로 ../font/ 경로 유지. 프로젝트별 조정 필요 사항을 주석으로 안내"
  - "style.scss는 Plan 01 Fix에서 이미 @use '3-generic' as generic이 추가된 상태였으므로 주석 내용만 업데이트"
metrics:
  duration: "3 minutes"
  completed: "2026-03-26"
  tasks_completed: 2
  files_modified: 5
---

# Phase 2 Plan 02: _common.scss + _font.scss 표준화 및 빌드 검증 Summary

Pretendard GOV @font-face 9종 + Bootstrap Reboot 이후 공공기관 필수 보완 초기화(_common.scss) 생성으로 Phase 2 5종 SCSS 파일 표준화 완성, 빌드 검증 통과

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | _common.scss + _font.scss 생성 + _index.scss 업데이트 | 2bfb719 | scss/4-elements/_common.scss, scss/4-elements/_font.scss, scss/4-elements/_index.scss |
| 2 | style.scss 주석 업데이트 + _vendor.scss 주석 보강 + 빌드 검증 | d6b5c4a | scss/style.scss, scss/3-generic/_vendor.scss |

## Verification Results

1. **5종 파일 존재 확인:** _variables.scss, _mixin.scss, _common.scss, _font.scss, _root.scss 전부 확인됨

2. **`_common.scss` 내용 검증:**
   - `word-break: keep-all` 포함
   - 링크 초기화 (`text-decoration: none`)
   - 버튼 초기화 (`border-radius: 0`, `white-space: nowrap`)
   - 비활성 상태 (`.disabled`, `button:disabled`)
   - `.sr-only` / `.sr-only-focusable` 포함
   - `outline: none` 실제 CSS 속성 없음 (주석 내 금지 안내만 존재)

3. **`_font.scss` 내용 검증:**
   - Pretendard GOV @font-face 9종 (100~900 weight)
   - woff2/woff 이중 src
   - `font-display: swap` 전종 포함
   - Noto Sans KR CDN 전환 방법 3단계 주석 안내 포함

4. **`_index.scss` 로드 순서:** `@forward 'base'` → `'font'` → `'common'` 순서 확인

5. **`style.scss` @use/@import 순서:** @use 7개 (@import 이전 배치), @import '3-generic/vendor' 마지막 배치 확인

6. **빌드 검증:** `npm run build:css` 오류 없이 통과 (Dart Sass deprecation 경고는 Bootstrap @import 기반으로 정상)
   - `dist/artux.css`: 236,268 bytes 생성
   - `Pretendard GOV`: 18 occurrences (9종 × 2 src 라인)
   - `@font-face`: 9 occurrences (9종)
   - `word-break`: 5 occurrences
   - `.sr-only`: 3 occurrences
   - `:root`: 7 occurrences

7. **접근성 위반 패턴 없음:** `outline.*none` 실제 CSS 규칙 없음 (주석 내 언급만 존재)

## Decisions Made

1. **comment-only outline:none 허용:** `_common.scss` 및 `_mixin.scss` 파일에 "outline: none 사용 금지" 주석이 포함되어 있으나, 실제 CSS 속성으로 선언된 항목은 없음. 접근성 정책 안내 주석으로 유지.

2. **_font.scss url() 경로 기준:** `../font/` 경로는 컴파일된 `dist/artux.css` 기준으로 작성. 프로젝트별 폰트 파일 위치가 다를 경우 경로 조정 필요 사항을 파일 상단 주석으로 안내.

3. **style.scss 구조 유지:** Plan 01 Fix에서 `@use '3-generic' as generic`이 이미 추가된 상태. 이번 Plan에서는 주석 내용을 5종 파일 반영 상태로 업데이트하고 Bootstrap 오버라이드 변수 위치 안내를 보강.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

없음 — 모든 핵심 선언이 완전하게 구현됨.
- `_font.scss`: url() 경로가 `../font/woff2/...`로 작성되어 있으나, 이는 프로젝트별 폰트 파일 배치에 따라 조정이 필요한 설계상 의도된 값. 파일 상단 주석으로 조정 방법 안내됨.
- `_root.scss`: `:root {}` 블록이 비어 있음 (Phase 01에서 확인된 정상 상태 — Phase 3에서 채워질 예정).

## Self-Check: PASSED

- FOUND: scss/4-elements/_common.scss
- FOUND: scss/4-elements/_font.scss
- FOUND: scss/4-elements/_index.scss
- FOUND: scss/style.scss
- FOUND: scss/3-generic/_vendor.scss
- FOUND: .planning/phases/02-scss/02-02-SUMMARY.md
- Commit 2bfb719: FOUND
- Commit d6b5c4a: FOUND
