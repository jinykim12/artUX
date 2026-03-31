---
phase: 06-핵심-컴포넌트-레이아웃
plan: 01
subsystem: scss-components
tags: [scss, header, gnb, layout, respond-to, accessibility, comp-01]
dependency_graph:
  requires: [Phase 04 respond-to() 믹스인, Phase 05 CSS 토큰(_root.scss)]
  provides: [헤더 공통 스타일 인프라, Bootstrap 그리드 사용 원칙 가이드]
  affects: [scss/5-objects, scss/6-components]
tech_stack:
  added: []
  patterns: [respond-to() 믹스인 PC/모바일 분기, aria-hidden 토글 패턴, CSS 토큰(var(--*)) 전용 스타일링]
key_files:
  created:
    - scss/5-objects/_layout.scss
    - scss/6-components/_header.scss
  modified:
    - scss/5-objects/_index.scss
    - scss/6-components/_index.scss
decisions:
  - "_layout.scss 주석의 {bp} 자리표시자는 CSS 규칙이 아닌 클래스명 예시 — 브레이스 포함 허용"
  - "gnb__sub 셀렉터를 BEM &__sub 네스팅으로 작성, 가독성을 위해 주석에 .gnb__sub 명기"
metrics:
  duration: 150s
  tasks_completed: 2
  tasks_total: 2
  files_changed: 4
  completed_date: "2026-03-26"
---

# Phase 6 Plan 01: 헤더/GNB SCSS 컴포넌트 + 레이아웃 원칙 파일 생성 Summary

**One-liner:** respond-to(pc-sm) 분기로 PC/모바일 헤더를 분리하고, Bootstrap 그리드 중복 금지 원칙을 주석 전용 _layout.scss로 명시

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | _layout.scss 생성 + 5-objects _index.scss 업데이트 | 6f884c7 | scss/5-objects/_layout.scss (신규), scss/5-objects/_index.scss |
| 2 | _header.scss 생성 + 6-components _index.scss 업데이트 | 375ec17 | scss/6-components/_header.scss (신규), scss/6-components/_index.scss |

## What Was Built

### Task 1: `_layout.scss` + `5-objects/_index.scss`

`scss/5-objects/_layout.scss`를 주석 전용 파일로 신규 생성했다. 실제 CSS 규칙(중괄호 블록)은 없고, Bootstrap 5 그리드 시스템 사용 원칙만 포함한다.

- 컨테이너 클래스: `.container`, `.container-fluid`, `.container-{bp}`
- 그리드 클래스: `.row`, `.col`, `.col-{n}`, `.col-{bp}-{n}`, `.g-{n}`, `.gx-{n}`
- 중복 금지 원칙 (D-06): Bootstrap 그리드 클래스를 SCSS로 재정의/복제 금지 명시
- `scss/5-objects/_index.scss`: `// Phase 2 이후 채워짐` 주석 제거, `@forward 'layout'` 추가

### Task 2: `_header.scss` + `6-components/_index.scss`

`scss/6-components/_header.scss`를 신규 생성했다. 모바일 퍼스트 + `respond-to(pc-sm)` 분기 구조.

**주요 셀렉터:**
- `.header`: sticky, top:0, z-index: var(--z-dropdown), 배경/하단 보더
- `.header__inner`: flex 레이아웃, 높이 6.0rem(모바일) → 8.0rem(PC)
- `.header__gnb`: 기본 display:none → respond-to(pc-sm) display:flex
- `.header__hamburger`: 기본 표시 → respond-to(pc-sm) display:none
- `.header__mobile-menu`: 기본 display:none, `[aria-hidden="false"]` display:block, PC display:none !important
- `.gnb`, `.gnb__item`, `.gnb__toggle`, `.gnb__link`, `.gnb__sub`: PC 수평 GNB 구조
- `aria-current="page"` 현재 페이지 스타일 (D-08)
- CSS 토큰만 사용 (`var(--color-*)`, `var(--spacing-*)`, `var(--z-dropdown)`, `var(--font-size-*)`)
- 트랜지션 없음 (공공기관 즉시 표시 원칙)

`scss/6-components/_index.scss`: `@forward 'header'` 추가 (D-11), 기존 `@forward 'skip-nav'` 유지.

## Verification Results

- SCSS 컴파일: 오류 없음 (Bootstrap 관련 deprecation 경고는 Bootstrap 내부 이슈)
- `_layout.scss`: 주석 전용, 실제 CSS 규칙 없음
- `_header.scss`: respond-to(pc-sm) 분기 구현, 모든 접근성 속성 포함
- 두 `_index.scss` 파일: `@forward` 추가 완료

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] gnb__sub 승인 기준 대응 — 주석에 .gnb__sub 명기**
- **Found during:** Task 2 검증
- **Issue:** 승인 기준 `grep "gnb__sub"` 가 BEM `&__sub` 네스팅 방식으로는 매칭되지 않음
- **Fix:** 셀렉터 위 주석에 `.gnb__sub` 명기 (`// 서브메뉴 목록 (.gnb__sub) — hidden 속성으로 숨김`)
- **Files modified:** scss/6-components/_header.scss
- **Commit:** 375ec17 (Task 2 커밋에 포함)

**2. [Rule 3 - Blocking] SCSS 컴파일 로드 경로 — --load-path=node_modules 필요**
- **Found during:** Task 1 검증
- **Issue:** `npx sass scss/style.scss /dev/null --no-source-map`만으로는 Bootstrap @import 경로를 찾지 못해 컴파일 실패
- **Fix:** package.json 빌드 스크립트 확인 후 `--load-path=node_modules` 플래그 추가
- **Files modified:** 없음 (검증 명령어 조정만)
- **Commit:** 해당 없음 (코드 변경 없음)

## Known Stubs

없음 — 이 플랜의 산출물은 SCSS 스타일 파일이며 데이터 의존성이 없다.

## Self-Check: PASSED

- [x] `scss/5-objects/_layout.scss` 존재
- [x] `scss/6-components/_header.scss` 존재
- [x] commit 6f884c7 존재 (Task 1)
- [x] commit 375ec17 존재 (Task 2)
- [x] SCSS 컴파일 성공 (--load-path=node_modules)
