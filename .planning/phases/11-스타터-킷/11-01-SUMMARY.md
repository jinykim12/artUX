---
phase: 11-스타터-킷
plan: "01"
subsystem: ui
tags: [scss, itcss, bootstrap5, sass, starter-kit, css-custom-properties, pretendard]

# Dependency graph
requires:
  - phase: 04-반응형-시스템
    provides: respond-to() 6키워드 믹스인 패턴 (sass:map 기반)
  - phase: 05-접근성-기반
    provides: focus() 믹스인 + _focus.scss 4-elements 레이어 패턴

provides:
  - starter/ 독립 패키지 — ITCSS 7단계 폴더 구조 + 핵심 SCSS 파일 19종
  - starter/package.json — 독립 빌드 스크립트 (build:css, watch:css)
  - starter/scss/style.scss — ITCSS 진입점(@use 7단계 체인 + @import Bootstrap 격리)
  - 프로젝트별 복사 즉시 사용 가능한 SCSS 보일러플레이트

affects:
  - 11-02-PLAN.md (스타터 킷 README 문서화)
  - 12-컨벤션-문서화

# Tech tracking
tech-stack:
  added:
    - sass ^1.98.0 (starter 독립 패키지)
    - bootstrap ^5.3.8 (starter 독립 패키지)
    - autoprefixer ^10.4.27
    - postcss ^8.5.8
    - postcss-cli ^11.0.1
  patterns:
    - ITCSS 7단계 폴더 + @use/@forward 체인 (1-settings~7-utilities)
    - Bootstrap @import를 3-generic/_vendor.scss로 격리 (나머지는 순수 @use)
    - CSS Custom Properties 토큰과 Bootstrap Sass 변수 수동 동기화 패턴
    - 62.5% REM 트릭 (_base.scss html font-size: 62.5%)
    - focus() 믹스인을 4-elements 레이어로 분리 (CSS 토큰 var() 사용 위해)

key-files:
  created:
    - starter/scss/style.scss
    - starter/scss/1-settings/_index.scss
    - starter/scss/1-settings/_variables.scss
    - starter/scss/1-settings/_project-overrides.scss
    - starter/scss/2-tools/_index.scss
    - starter/scss/2-tools/_mixin.scss
    - starter/scss/2-tools/_breakpoints.scss
    - starter/scss/3-generic/_index.scss
    - starter/scss/3-generic/_root.scss
    - starter/scss/3-generic/_vendor.scss
    - starter/scss/4-elements/_index.scss
    - starter/scss/4-elements/_base.scss
    - starter/scss/4-elements/_font.scss
    - starter/scss/4-elements/_common.scss
    - starter/scss/4-elements/_focus.scss
    - starter/scss/5-objects/_index.scss
    - starter/scss/5-objects/_layout.scss
    - starter/scss/6-components/_index.scss
    - starter/scss/7-utilities/_index.scss
    - starter/package.json
    - starter/.editorconfig
  modified: []

key-decisions:
  - "starter/package.json에 type:module 미포함 — Eleventy 없는 순수 SCSS 빌드 환경이므로 ESM 강제 불필요"
  - "artux-responsive-base 더미 클래스 제거 — 반응형 동작 확인용 실험 코드로 스타터 킷 불필요"
  - "_font.scss 경로 dist/style.css 기준으로 수정 (artux.css → style.css)"

patterns-established:
  - "ITCSS 7단계: 1-settings → 2-tools → 3-generic → 4-elements → 5-objects → 6-components → 7-utilities"
  - "Bootstrap 격리: _vendor.scss에 @import 격리, 나머지는 @use/@forward"
  - "프로젝트 복사 패턴: starter/ 복사 후 npm install → npm run build:css 즉시 동작"

requirements-completed: [STARTER-01, STARTER-02]

# Metrics
duration: 5min
completed: 2026-03-27
---

# Phase 11 Plan 01: 스타터-킷 SCSS 구조 Summary

**ITCSS 7단계 폴더 + 핵심 SCSS 19종 + Bootstrap 격리 패턴이 담긴 신규 프로젝트 복사-즉시-빌드용 starter/ 독립 패키지 생성**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-27T00:47:38Z
- **Completed:** 2026-03-27T00:52:34Z
- **Tasks:** 3
- **Files modified:** 21

## Accomplishments

- starter/ 디렉토리에 ITCSS 7단계 폴더(1-settings~7-utilities) 생성 및 @forward 체인 연결
- 핵심 SCSS 11종 생성 — variables, project-overrides, mixin, breakpoints, root, vendor, base, font, common, focus, style.scss
- starter/package.json + .editorconfig 생성, npm install + npm run build:css → dist/style.css 정상 생성 확인

## Task Commits

각 태스크를 원자적으로 커밋:

1. **Task 1: ITCSS 7단계 디렉토리 구조 + _index.scss 생성** - `92d0a6e` (feat)
2. **Task 2: 핵심 SCSS 11종 생성** - `3563e1d` (feat)
3. **Task 3: starter/package.json + .editorconfig 생성** - `307b2d8` (feat)
4. **부가: starter/package-lock.json 추가** - `2ffe5eb` (chore)

## Files Created/Modified

- `starter/scss/style.scss` — ITCSS @use 7단계 체인 + Bootstrap @import 격리 진입점
- `starter/scss/1-settings/_variables.scss` — Bootstrap 오버라이드 변수 문서화 원본
- `starter/scss/1-settings/_project-overrides.scss` — 프로젝트별 색상/토큰 오버라이드 예시
- `starter/scss/2-tools/_mixin.scss` — flex/ellipsis/position/drop-shadow/ani 5종 믹스인
- `starter/scss/2-tools/_breakpoints.scss` — respond-to() 6키워드 믹스인 (sass:map 기반)
- `starter/scss/3-generic/_root.scss` — CSS Custom Properties 디자인 토큰 전체
- `starter/scss/3-generic/_vendor.scss` — Bootstrap @import 격리
- `starter/scss/4-elements/_base.scss` — 62.5% REM 트릭
- `starter/scss/4-elements/_font.scss` — Pretendard GOV @font-face + Noto Sans KR CDN 전환 가이드
- `starter/scss/4-elements/_common.scss` — sr-only, word-break, a, button (artux-responsive-base 제거)
- `starter/scss/4-elements/_focus.scss` — focus() 믹스인 + :focus-visible 전역 적용
- `starter/scss/5-objects/_layout.scss` — Bootstrap 그리드 중복 금지 원칙 주석 (D-06)
- `starter/package.json` — 독립 빌드 스크립트 build:css, watch:css
- `starter/.editorconfig` — 루트 설정 동일 복사

## Decisions Made

- `starter/package.json`에 `"type": "module"` 미포함 — 스타터 킷은 Eleventy 없는 순수 SCSS 빌드 환경이므로 ESM 강제 불필요
- `artux-responsive-base` 더미 클래스 블록 제거 (원본 _common.scss 77~107행) — respond-to 동작 확인용 실험 코드로 스타터 킷 불필요
- `_font.scss` 내 경로 주석을 `dist/style.css` 기준으로 명시 — 루트 artux.css가 아닌 스타터 킷 출력 파일명 반영

## Deviations from Plan

None — 플랜에 명시된 내용 그대로 실행. `_breakpoints.scss`는 플랜에서 기존 artpqUX 파일을 찾도록 했으나, 해당 파일이 별도 존재하지 않아 플랜에 제시된 기본 내용으로 생성 (플랜 자체에 대안이 명시되어 있었음).

## Issues Encountered

Bootstrap 5.3.x의 Dart Sass deprecation 경고가 다수 출력되었으나, 이는 `_vendor.scss`에 "Dart Sass deprecation 경고 발생은 정상"으로 문서화된 예상 동작. 빌드 결과물(`dist/style.css`) 정상 생성 확인.

## User Setup Required

None — 외부 서비스 설정 불필요.

## Next Phase Readiness

- starter/ 패키지 완성 — 신규 프로젝트에 복사 후 npm install + npm run build:css 즉시 동작
- 11-02-PLAN.md: starter/ 패키지 사용법 README 문서화 준비 완료

## Self-Check: PASSED

All 22 created files verified present. All 4 task commits confirmed in git log.

---
*Phase: 11-스타터-킷*
*Completed: 2026-03-27*
