---
phase: 04-반응형-시스템
plan: 01
subsystem: ui
tags: [scss, sass, breakpoints, respond-to, media-query, mobile-first, dart-sass]

# Dependency graph
requires:
  - phase: 02-scss
    provides: 2-tools ITCSS 레이어 구조, _index.scss @forward 패턴
  - phase: 03-디자인토큰
    provides: style.scss 로드 순서 확립 (@use '2-tools' as tools 이미 존재)
provides:
  - respond-to() 믹스인 6키워드 (tablet/pc-sm/pc/mobile-only/tablet-only/pc-sm-only)
  - $breakpoints Sass Map (6키 — mobile-max/tablet/tablet-max/pc-sm/pc-sm-max/pc)
  - Bootstrap 대조표 + 모바일 퍼스트 원칙 한국어 주석 문서화
affects: [05-접근성-기반, 06-컴포넌트-레이아웃, 07-컴포넌트-폼, 08-컴포넌트-UI, 09-컴포넌트-오버레이]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "모바일 퍼스트: 기본 스타일은 모바일, respond-to(tablet/pc-sm/pc)로 확장"
    - "sass:map + sass:list 내장 모듈 사용 — global-builtin deprecation 없음"
    - "respond-to() 컴파일 타임 @error — 잘못된 키워드 빌드 즉시 차단"

key-files:
  created:
    - scss/2-tools/_breakpoints.scss
  modified:
    - scss/2-tools/_index.scss
    - scss/4-elements/_common.scss

key-decisions:
  - "sass:map + sass:list 내장 모듈 사용으로 Dart Sass 1.98.0 deprecation 경고 없음"
  - "_common.scss에 .artux-responsive-base 추가로 end-to-end 미디어쿼리 출력 검증"
  - "Bootstrap $grid-breakpoints 오버라이드 없이 팀 respond-to() 병행 운용"

patterns-established:
  - "respond-to($key): @include tools.respond-to(tablet) { ... } 패턴으로 모든 컴포넌트에서 사용"
  - "6키워드 체계: min-width 3종(tablet/pc-sm/pc) + range 3종(-only 접미사)"

requirements-completed: [RESP-01, RESP-02, RESP-03]

# Metrics
duration: 15min
completed: 2026-03-26
---

# Phase 04 Plan 01: 반응형 시스템 Summary

**Dart Sass 1.98.0 호환 respond-to() 믹스인 6키워드 구현 — sass:map/list 내장 모듈로 deprecation 없는 팀 표준 브레이크포인트 단일 진실의 원천 확립**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-26T08:42:46Z
- **Completed:** 2026-03-26T08:57:26Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- $breakpoints Sass Map 6키 정의 — 팀 표준 4단계(모바일~767/태블릿 768~1023/소형PC 1024~1279/PC 1280~) 픽셀값 단일 진실의 원천
- respond-to() 믹스인 6키워드 구현 (min-width 3종 + range -only 3종), 잘못된 키워드 @error 컴파일 차단
- Bootstrap 대조표, 모바일 퍼스트 원칙, 사용 예시 한국어 주석 문서화, dist/artux.css 6종 미디어쿼리 출력 확인

## Task Commits

각 태스크는 원자적으로 커밋됨:

1. **Task 1: _breakpoints.scss 신규 생성** - `6ab1f2e` (feat)
2. **Task 2: _index.scss @forward 'breakpoints' 추가** - `2b2869f` (feat)

## Files Created/Modified

- `scss/2-tools/_breakpoints.scss` — $breakpoints 맵(6키) + respond-to() 믹스인(6키워드) + Bootstrap 대조표 + 모바일 퍼스트 주석 (신규 생성)
- `scss/2-tools/_index.scss` — @forward 'breakpoints' 추가 (기존 @forward 'mixin' 뒤)
- `scss/4-elements/_common.scss` — respond-to 통합 검증용 .artux-responsive-base 추가 (미디어쿼리 end-to-end 출력 확인)

## Decisions Made

- Dart Sass 내장 모듈 `sass:map` + `sass:list` 사용: 전역 `map-get()`, `index()` 대신 `map.get()`, `list.index()` 사용으로 Dart Sass 1.98.0 global-builtin deprecation 경고 없음
- Bootstrap `$grid-breakpoints` 오버라이드 없이 팀 respond-to() 병행: Bootstrap 그리드 클래스(col-md-6)는 Bootstrap 기본 breakpoint 동작, respond-to()는 커스텀 컴포넌트 전용
- 컴파일 타임 `@error`로 잘못된 키워드 즉시 차단: 런타임 스타일 미적용보다 빌드 타임 오류 피드백이 훨씬 유용

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - 누락 기능] _common.scss에 respond-to 통합 검증 코드 추가**
- **Found during:** Task 1 (accept criteria 검증 중)
- **Issue:** 믹스인이 정의만 되고 호출되지 않으면 dist/artux.css에 1024px/1280px 미디어쿼리가 출력되지 않아 acceptance criteria 충족 불가
- **Fix:** `4-elements/_common.scss`에 `.artux-responsive-base` 규칙 추가 — 6종 respond-to 키워드 모두 호출하여 end-to-end 컴파일 출력 확인
- **Files modified:** scss/4-elements/_common.scss
- **Verification:** dist/artux.css에 @media(min-width: 768px), @media(min-width: 1024px), @media(min-width: 1280px), @media(max-width: 767px), @media(min-width: 768px)and(max-width: 1023px), @media(min-width: 1024px)and(max-width: 1279px) 모두 출력 확인
- **Committed in:** 6ab1f2e (Task 1 커밋에 포함)

---

**Total deviations:** 1 auto-fixed (Rule 2 — 누락된 검증 기능)
**Impact on plan:** 플랜 목표 충족을 위해 필수. 스코프 크리프 없음.

## Issues Encountered

- 미디어쿼리 믹스인만 정의하면 dist/artux.css에 출력이 없음 — 최소 1회 호출 필요. _common.scss에 통합 검증 코드 추가로 해결.
- 빌드 시 deprecation 경고 모두 Bootstrap 자체에서 발생 (vendor.scss @import 사용) — 팀 코드에서 발생하는 경고 없음.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 5+ 컴포넌트에서 `@use '../2-tools' as tools`로 로드 후 `@include tools.respond-to(tablet) { ... }` 패턴으로 즉시 사용 가능
- 6키워드 체계 확정: tablet / pc-sm / pc (min-width) + mobile-only / tablet-only / pc-sm-only (range)
- Bootstrap 미적용 1024px, 1280px 구간 팀 전용 브레이크포인트로 가이드 제공 준비 완료

---
*Phase: 04-반응형-시스템*
*Completed: 2026-03-26*
