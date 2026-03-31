---
phase: 03-디자인토큰
plan: 02
subsystem: design-tokens
tags: [bootstrap-override, scss-variables, css-custom-properties, token-mapping]
dependency_graph:
  requires: [03-01]
  provides: [bootstrap-token-mapping, project-overrides-pattern]
  affects: [all-component-phases, brand-color-customization]
tech_stack:
  added: []
  patterns: [scss-import-scope-override, itcss-cascade-ordering, documentation-source-pattern]
key_files:
  created:
    - scss/1-settings/_project-overrides.scss
  modified:
    - scss/3-generic/_vendor.scss
    - scss/1-settings/_variables.scss
    - scss/style.scss
decisions:
  - "_project-overrides.scss은 1-settings/_index.scss @forward 체인에 포함하지 않고 style.scss에서 직접 @use로 로드 — cascade 위치 제어를 style.scss에서 명시적으로 관리"
  - "style.scss 3.5 슬롯에 project-overrides 배치 — 3-generic(:root 토큰) 이후, 4-elements 이전 cascade 순서 보장"
metrics:
  duration: 121s
  completed: 2026-03-26T07:19:47Z
  tasks_completed: 2
  tasks_total: 2
  files_modified: 4
requirements_completed:
  - TOKEN-05
  - TOKEN-06
---

# Phase 3 Plan 02: Bootstrap 변수 매핑 + 프로젝트 오버라이드 패턴 Summary

**One-liner:** Bootstrap $primary/$secondary 활성화, --color-* 매핑 주석 문서화, _project-overrides.scss 신규 생성으로 단일 편집 지점 완성

## What Was Built

### Task 1: _vendor.scss / _variables.scss 업데이트

`_vendor.scss` Bootstrap 오버라이드 변수를 주석에서 활성 코드로 전환하고 TOKEN-05 매핑 주석을 추가했다.

| 파일 | 변경 내용 |
|------|---------|
| `scss/3-generic/_vendor.scss` | `$primary: #0d6efd`, `$secondary: #6c757d` 활성화 + `↔ --color-*` 매핑 주석 |
| `scss/1-settings/_variables.scss` | 동일 변수 활성화 + TOKEN-05 매핑 주석 + 사용 불가 경고 추가 |

양쪽 파일 모두에 `$primary: var(--color-primary) 사용 절대 불가` 경고와 Bootstrap 컴파일-타임 제약 설명이 포함된다.

### Task 2: _project-overrides.scss 생성 + style.scss 로드 순서 업데이트

`scss/1-settings/_project-overrides.scss`를 신규 생성했다. 전체 내용이 주석이므로 현재 CSS 출력은 없으나, 향후 프로젝트에서 주석 해제 시 cascade가 올바르게 작동하는 진입점 역할을 한다.

포함 내용:
- 색상 변경 시 3단계 체크리스트
- `--color-primary`, `--color-secondary` 오버라이드 예시
- `--bs-primary`, `--bs-primary-rgb` Bootstrap 런타임 오버라이드 안내

`style.scss`에 `@use '1-settings/project-overrides'`를 `@use '3-generic' as generic;` 바로 다음(3.5 슬롯)에 배치하여 CSS cascade 순서를 명시적으로 관리한다.

## Verification Results

```
npm run build:css       → EXIT:0 (성공, Bootstrap deprecation 경고는 정상)

dist/artux.css :root 블록 토큰 전체 유지 확인:
--color-primary: #0d6efd;       (8종 색상 토큰 모두 포함)
--font-size-xs: 1.0rem;         (7종 font-size + 3 weight + 3 leading)
--spacing-xs: 0.4rem;           (7종 간격)
--shadow-sm: ...                (3종 그림자)
--transition-fast: 150ms ease;  (2종)
--z-dropdown: 1000;             (3종)

_vendor.scss $primary 활성: 3회 ✓
_vendor.scss --color-primary 매핑: 3회 ✓
_variables.scss --color-primary 매핑: 3회 ✓
_project-overrides.scss 파일 존재: yes ✓
style.scss project-overrides 참조: 2회 ✓
```

모든 성공 기준 충족.

## Decisions Made

1. **_project-overrides.scss 독립 로드** — `1-settings/_index.scss`의 `@forward` 체인에 포함하지 않고 `style.scss`에서 직접 `@use`로 로드. 이유: cascade 위치(3-generic 이후)를 style.scss에서 명시적으로 제어하기 위함. `_index.scss` 포함 시 1-settings 레이어와 함께 앞쪽에 배치되어 cascade 보장이 깨질 수 있음.

2. **style.scss 3.5 슬롯** — ITCSS 레이어 번호 체계를 유지하면서 3-generic과 4-elements 사이에 project-overrides를 배치. 주석에 "3.5. 프로젝트별 토큰 오버라이드" 레이블로 의도를 명시.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1: _vendor.scss / _variables.scss 업데이트 | `9bb11c7` | feat(03-02): Bootstrap $primary/$secondary 활성화 + --color-* 매핑 주석 |
| Task 2: _project-overrides.scss 생성 + style.scss 업데이트 | `44ffcd1` | feat(03-02): _project-overrides.scss 신규 생성 + style.scss 로드 순서 업데이트 |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — `_project-overrides.scss`는 의도적으로 전체 주석으로 작성된 진입점 파일이다. 실제 오버라이드 없이 예시 패턴만 제공하는 것이 Token-06 요구사항이며, 프로젝트별 색상을 설정할 때 주석을 해제하여 사용한다.

## Self-Check: PASSED

- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/scss/1-settings/_project-overrides.scss` — 파일 존재, --color-primary 예시 포함
- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/scss/3-generic/_vendor.scss` — $primary 활성, --color-primary 매핑 주석 3회
- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/scss/1-settings/_variables.scss` — $primary 활성, --color-primary 매핑 주석 3회
- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/scss/style.scss` — project-overrides @use 2회 참조
- [FOUND] `/Users/johyeonchang/Desktop/artpqUX/dist/artux.css` — :root 블록 36개 토큰 유지
- [FOUND] commit `9bb11c7` — git log 확인
- [FOUND] commit `44ffcd1` — git log 확인
