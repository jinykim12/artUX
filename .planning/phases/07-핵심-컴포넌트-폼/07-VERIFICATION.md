---
phase: 07-핵심-컴포넌트-폼
verified: 2026-03-26T00:00:00Z
status: gaps_found
score: 8/10 must-haves verified
re_verification: false
gaps:
  - truth: "Bootstrap 폼 클래스(.form-control, .form-select, .form-check-input)가 팀 CSS 토큰으로 재정의된다"
    status: failed
    reason: "_form.scss는 존재하고 내용이 올바르나, _index.scss에 @forward 'form'이 없어 dist/artux.css에 팀 오버라이드가 포함되지 않는다. dist/artux.css의 .form-control은 Bootstrap 기본값(padding:.375rem .75rem, transition:border-color .15s)을 사용 중이다."
    artifacts:
      - path: "scss/6-components/_index.scss"
        issue: "@forward 'form' 누락 — 파일은 @forward 'skip-nav' 한 줄만 존재하며 header, form 모두 없음"
      - path: "dist/artux.css"
        issue: ".form-control 오버라이드 미반영 — Bootstrap 기본 스타일만 출력됨. 4.8rem height, transition:none, var(--color-error) 등 팀 토큰 적용 없음"
    missing:
      - "scss/6-components/_index.scss에 '@forward 'header';' 및 '@forward 'form';' 추가"
      - "추가 후 npm run build:css 재실행하여 dist/artux.css 재생성"
  - truth: "오류/성공 상태(.is-invalid, .is-valid)에 --color-error, --color-success 토큰이 적용된다"
    status: failed
    reason: "_form.scss에 is-invalid/is-valid 규칙이 올바르게 작성되어 있으나, _index.scss 미등록으로 dist/artux.css에 포함되지 않는다. Bootstrap 기본 is-invalid(red 하드코딩)가 동작 중이다."
    artifacts:
      - path: "scss/6-components/_index.scss"
        issue: "@forward 'form' 누락으로 오류/성공 상태 토큰 오버라이드 미출력"
    missing:
      - "_index.scss에 @forward 'form' 추가 후 재빌드"
human_verification: []
---

# Phase 7: 핵심 컴포넌트 — 폼 Verification Report

**Phase Goal:** 입력 요소 전체(input, select, textarea, checkbox, radio)에 대한 표준 마크업 패턴과 접근성 구현을 제공하여, 폼 관련 공공기관 납품 요건을 충족한다.
**Verified:** 2026-03-26
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Bootstrap 폼 클래스(.form-control, .form-select, .form-check-input)가 팀 CSS 토큰으로 재정의된다 | ✗ FAILED | _form.scss 내용 정확하나 _index.scss에 @forward 'form' 없음 → dist/artux.css 미반영 확인 |
| 2 | 오류/성공 상태(.is-invalid, .is-valid)에 --color-error, --color-success 토큰이 적용된다 | ✗ FAILED | dist/artux.css의 .form-control.is-invalid는 Bootstrap 기본값 사용 중 |
| 3 | 커스텀 체크박스/라디오가 팀 디자인 토큰으로 스타일링된다 | ✗ FAILED | _form.scss에 올바르게 작성되었으나 _index.scss 미등록으로 dist 미출력 |
| 4 | Bootstrap 기본 focus box-shadow가 제거되고 전역 :focus-visible만 동작한다 | ✗ FAILED | _form.scss에 box-shadow:none 작성되었으나 dist에 반영되지 않음 |
| 5 | input, select, textarea, checkbox, radio 5종 마크업 스니펫이 모두 존재한다 | ✓ VERIFIED | docs/components/forms.md 458줄에 5종 섹션 모두 포함 확인 |
| 6 | 모든 폼 요소에 label for/id 매칭이 적용되어 있다 | ✓ VERIFIED | forms.md 내 label for= 속성 전수 확인 — 17개 매칭 |
| 7 | 에러 메시지가 aria-describedby로 입력 요소와 연결되는 패턴이 포함되어 있다 | ✓ VERIFIED | forms.md에 aria-describedby 13개 이상 사용 확인 |
| 8 | 체크박스/라디오 그룹에 fieldset + legend 패턴이 사용되어 있다 | ✓ VERIFIED | forms.md에 fieldset/legend 14개씩 확인 |
| 9 | required 필드가 aria-required="true" + 시각적 '*' 양쪽으로 처리되어 있다 | ✓ VERIFIED | forms.md의 모든 필수 필드 예시에 aria-required + span aria-hidden="true"*" + sr-only "(필수)" 3중 처리 확인 |
| 10 | JS 오류 처리 예시가 aria-invalid + is-invalid 쌍으로 처리하고 role='alert'를 적용한다 | ✓ VERIFIED | forms.md JS 스니펫에 classList.add('is-invalid') + setAttribute('aria-invalid','true') + errorEl.setAttribute('role','alert') + firstInvalid.focus() 모두 확인 |

**Score:** 6/10 truths verified (Plan 02 전체 6개 VERIFIED, Plan 01 전체 4개 FAILED)

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scss/6-components/_form.scss` | Bootstrap 폼 오버라이드 SCSS | ✓ EXISTS / SUBSTANTIVE | 143줄, .form-control/.form-select/.form-check-input 7섹션 완전 구현. CSS 토큰만 사용. |
| `scss/6-components/_index.scss` | @forward 'form' 추가 | ✗ NOT_WIRED | 파일 존재하나 @forward 'skip-nav' 1줄만 있음. @forward 'header'도 없음. |
| `docs/components/forms.md` | 5종 폼 마크업 패턴 + JS 오류 처리 통합 문서 | ✓ VERIFIED | 458줄, 5종 마크업 + JS IIFE 패턴 + 접근성 체크리스트 완전 포함 |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `scss/6-components/_index.scss` | `scss/6-components/_form.scss` | `@forward 'form'` | ✗ NOT_WIRED | _index.scss에 @forward 'form' 없음 — grep 확인 |
| `scss/6-components/_form.scss` | `scss/3-generic/_root.scss` | `var(--color-*, --spacing-*, --font-size-*)` | ✓ WIRED | _form.scss 내 var(-- 다수 사용 확인 (단, dist 미출력 상태) |
| `docs/components/forms.md` | `docs/accessibility/forms.md` | 접근성 원칙 참조 | ✓ WIRED | forms.md 3곳에서 docs/accessibility/forms.md 명시 참조 |
| `docs/components/forms.md` | `scss/6-components/_form.scss` | CSS 클래스명 일치 | ✓ WIRED | forms.md에서 form-control, form-select, form-check 36회 이상 참조 |

---

## Data-Flow Trace (Level 4)

해당 없음 — 이 페이즈는 SCSS 스타일 파일 및 마크업 문서로 구성되며, 동적 데이터 렌더링 컴포넌트 없음.

---

## Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| _form.scss → dist/artux.css 출력 | `grep -o ".form-control{[^}]*}" dist/artux.css \| head -1` | `.form-control{display:block;width:100%;padding:.375rem .75rem;...}` (Bootstrap 기본값) | ✗ FAIL |
| @forward 'form' 존재 | `grep "@forward 'form'" scss/6-components/_index.scss` | 매치 없음 | ✗ FAIL |
| forms.md 파일 존재 + aria-describedby 포함 | `test -f docs/components/forms.md && grep -c "aria-describedby"` | 파일 존재, aria-describedby 13개 | ✓ PASS |
| fieldset/legend 패턴 포함 | `grep -c "fieldset" docs/components/forms.md` | 14개 | ✓ PASS |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| COMP-03 | 07-01-PLAN.md, 07-02-PLAN.md | 폼 컴포넌트 패턴이 제공된다 (input, select, textarea, checkbox, radio — 접근성 포함) | ✗ PARTIAL | 마크업 문서(forms.md)는 완전하나 SCSS 오버라이드가 dist/artux.css에 미반영. 공공기관 납품 시 Bootstrap 기본 스타일 적용됨 |
| A11Y-05 | 07-02-PLAN.md | 폼 접근성 패턴이 문서화된다 (label-input 연결, error 메시지, required 표시) | ✓ SATISFIED | docs/components/forms.md에 모든 접근성 패턴 완전 문서화. label for/id, aria-required, aria-describedby, aria-invalid, fieldset/legend, role="alert" 모두 포함 |

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `scss/6-components/_index.scss` | 전체 | @forward 'form' 미등록 | 🛑 Blocker | _form.scss 전체가 빌드에서 제외됨. Bootstrap 기본 폼 스타일만 출력되어 팀 토큰 오버라이드 전혀 적용되지 않음 |
| `scss/6-components/_index.scss` | 전체 | @forward 'header' 도 미등록 | ⚠️ Warning | 헤더 스타일도 _index.scss 경유 없이 빌드되는지 확인 필요 (dist에는 header 스타일 출력 확인됨 — 별도 경로 존재 가능성 있음) |

**비고:** _header.scss가 dist에 출력되는 경로를 추가 확인한 결과, dist/artux.css에 `.header{...}`, `.gnb{...}` 등이 존재함. _index.scss에 @forward 'header'도 없는 상태이므로, 빌드 구조에 다른 경로가 있을 수 있으나 본 페이즈 범위에서는 _form.scss 미등록이 핵심 갭이다.

---

## Human Verification Required

없음 — 핵심 갭은 모두 프로그래매틱하게 확인되었다.

---

## Gaps Summary

### 핵심 갭: _index.scss에 @forward 'form' 누락

`scss/6-components/_index.scss`는 현재 `@forward 'skip-nav'` 한 줄만 포함한다. SUMMARY.md는 "@forward 'form' 등록 완료" 및 "npm run build:css로 dist/artux.css에 폼 스타일 출력 확인"을 주장하나, 실제 파일을 확인한 결과 이는 사실과 다르다.

**실제 상태:**
- `scss/6-components/_form.scss` — 존재하고 내용이 완전하고 정확하다 (143줄, 7섹션)
- `scss/6-components/_index.scss` — `@forward 'skip-nav'` 1줄만 존재
- `dist/artux.css` — `.form-control`은 Bootstrap 기본 스타일(padding:.375rem .75rem, transition:border-color .15s ease-in-out)로 출력됨. 팀 토큰 오버라이드(height:4.8rem, transition:none, var(--color-error)) 없음

**결과:** Plan 01의 핵심 목표인 "Bootstrap 폼 클래스를 팀 CSS 토큰으로 재정의"가 달성되지 않았다. 4개 truth 모두 실패.

**수정 방법:** `scss/6-components/_index.scss`에 `@forward 'form';    // 폼 컴포넌트 (COMP-03)` 한 줄 추가 후 `npm run build:css` 재실행.

**Plan 02 상태:** `docs/components/forms.md` 관련 6개 truth는 모두 VERIFIED. A11Y-05 요건은 완전히 충족된다.

---

_Verified: 2026-03-26_
_Verifier: Claude (gsd-verifier)_
