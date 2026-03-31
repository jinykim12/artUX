---
phase: 08-핵심-컴포넌트-UI
plan: "01"
subsystem: components-scss
tags: [button, card, scss, accessibility, bootstrap-override]
dependency_graph:
  requires:
    - 07-01: _form.scss 패턴 (CSS 선택자 오버라이드, box-shadow: none, transition: none)
    - 07-02: docs/components/forms.md 문서 구조 패턴
  provides:
    - scss/6-components/_button.scss (Bootstrap .btn 오버라이드 + 팀 variant)
    - scss/6-components/_card.scss (Bootstrap .card 오버라이드)
    - docs/components/button.md (버튼 마크업 패턴 문서)
    - docs/components/card.md (카드 마크업 패턴 문서)
    - scss/6-components/_index.scss (Phase 8 전체 4종 @forward)
  affects:
    - scss/style.scss (컴파일 시 _button.scss, _card.scss 포함)
    - 08-02-PLAN.md (table, breadcrumb @forward는 이미 추가됨)
tech_stack:
  added: []
  patterns:
    - Bootstrap .btn 선택자 오버라이드 (CSS 토큰 var(--*) 사용)
    - Phase 7 _form.scss 패턴 동일 적용
    - .btn--icon BEM modifier (아이콘 전용 버튼)
    - .btn-ghost 팀 커스텀 variant
key_files:
  created:
    - scss/6-components/_button.scss
    - scss/6-components/_card.scss
    - docs/components/button.md
    - docs/components/card.md
  modified:
    - scss/6-components/_index.scss
decisions:
  - "[Phase 08-01] .btn-ghost 팀 커스텀 variant — Bootstrap에 없는 ghost 버튼 패턴 팀 표준화"
  - "[Phase 08-01] Phase 8 @forward 4종 일괄 추가 — race condition 방지를 위해 Plan 01에서 미리 추가 (table, breadcrumb는 Plan 02에서 생성)"
metrics:
  duration: "2분 32초 (152초)"
  completed_date: "2026-03-26"
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 1
---

# Phase 8 Plan 01: Button + Card 컴포넌트 SCSS + 마크업 문서 Summary

**One-liner:** Bootstrap .btn/.card 선택자 오버라이드 + 팀 ghost variant + BEM --icon modifier, CSS 토큰만 사용한 2종 컴포넌트 SCSS 및 KWCAG 2.1 AA 접근성 주석 포함 마크업 문서 작성

---

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Button + Card SCSS 작성 및 _index.scss @forward 4종 추가 | e903a79 | _button.scss (신규), _card.scss (신규), _index.scss (수정) |
| 2 | button.md + card.md 마크업 문서 작성 | 7019fa4 | docs/components/button.md (신규), docs/components/card.md (신규) |

---

## What Was Built

### Task 1: Button + Card SCSS

**_button.scss (COMP-02):**
- `.btn` 공통: padding/font-size/font-weight/border-radius CSS 토큰 적용, transition: none (공공기관 원칙)
- `.btn:focus`: box-shadow: none; outline: 0 — 전역 `:focus-visible` 위임 (Phase 7 패턴)
- `.btn-primary`: color-primary 토큰, hover filter: brightness(0.9)
- `.btn-secondary`: color-secondary 토큰
- `.btn-outline-primary`: 투명 배경, hover 시 primary 채움
- `.btn-ghost`: 팀 커스텀 variant — 배경/테두리 없는 텍스트 버튼
- `.btn[disabled]/.btn.disabled`: opacity 0.5, cursor not-allowed, pointer-events: none
- `.btn--icon`: BEM modifier — 40×40px 정사각형 아이콘 전용 버튼

**_card.scss (COMP-04):**
- `.card`: border/border-radius/background-color/box-shadow(--shadow-sm)/transition: none
- `.card-header`: border-bottom, font-weight-medium
- `.card-body`: padding-md
- `.card-footer`: border-top, padding-md
- `.card-title`: font-size-md, font-weight-bold
- `.card-text`: color-text-muted
- `.card-img-top`: width 100%, object-fit: cover

**_index.scss 업데이트:**
- 기존 3개(`skip-nav`, `header`, `form`) + 신규 4개(`button`, `card`, `table`, `breadcrumb`) = 7개 @forward
- `table`, `breadcrumb`은 Plan 02에서 파일 생성 예정, @forward는 여기서 미리 추가

### Task 2: 마크업 문서

**button.md (136줄):**
- Primary/Secondary/Outline/Ghost/disabled/아이콘/링크/로딩 버튼 패턴 수록
- 접근성 주석: aria-label, aria-disabled, role="button", aria-busy
- 접근성 체크리스트 7개 항목

**card.md (158줄):**
- 기본/이미지/링크(stretched-link)/헤더푸터/수평 카드 패턴 수록
- alt 속성 지침 (의미 이미지 vs 장식 이미지)
- 접근성 체크리스트 6개 항목

---

## Deviations from Plan

None — 플랜에 명시된 모든 선택자, 속성, 문서 패턴을 정확히 구현했다.

---

## Known Stubs

없음. 모든 구현이 완결 상태이다.

---

## Self-Check: PASSED

- [x] scss/6-components/_button.scss 존재 확인
- [x] scss/6-components/_card.scss 존재 확인
- [x] scss/6-components/_index.scss @forward 7개 확인
- [x] docs/components/button.md 존재 확인 (136줄 >= min 40)
- [x] docs/components/card.md 존재 확인 (158줄 >= min 30)
- [x] 커밋 e903a79 존재 확인
- [x] 커밋 7019fa4 존재 확인
