---
phase: 07-핵심-컴포넌트-폼
plan: "02"
subsystem: forms-markup
tags: [forms, accessibility, kwcag, aria, bootstrap5, markup]
dependency_graph:
  requires: []
  provides: [docs/components/forms.md]
  affects: [docs/accessibility/forms.md]
tech_stack:
  added: []
  patterns:
    - label for/id 매칭 (Bootstrap form-label + form-control 패턴)
    - aria-required + 시각적 * + sr-only 3중 필수 필드 처리
    - is-invalid + aria-invalid 오류 상태 쌍 처리
    - fieldset/legend 체크박스·라디오 그룹 패턴
    - aria-describedby 힌트·오류 메시지 연결
    - IIFE + querySelector + role=alert 오류 처리 JS 패턴
key_files:
  created:
    - docs/components/forms.md
  modified: []
decisions:
  - "D-01: docs/components/forms.md 통합 문서로 작성 — 5종 폼 요소를 하나의 마크다운에 포함"
  - "D-02: Phase 6 header.md 패턴과 일관성 유지 (코드 블록 + 접근성 주석 + JS 예시)"
  - "D-03: docs/accessibility/forms.md는 접근성 원칙 문서로 유지, forms.md는 실제 마크업 패턴"
  - "D-09: IIFE + data-validate 기반 JS 오류 처리 예시 포함"
  - "D-10: Phase 6 GNB JS 패턴(IIFE + querySelector + setAttribute)과 일관성 유지"
metrics:
  duration: "87초"
  completed_date: "2026-03-26"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 7 Plan 02: 폼 컴포넌트 마크업 통합 문서 Summary

**한 줄 요약:** KWCAG 2.1 AA 기준 5종 폼 요소(input/select/textarea/checkbox/radio) 마크업 패턴 + IIFE 기반 JS 오류 처리(is-invalid + aria-invalid 쌍, role="alert", focus() 이동)를 담은 `docs/components/forms.md` 통합 문서 생성

---

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | docs/components/forms.md 통합 문서 생성 | ce16c7d | docs/components/forms.md (신규, +458줄) |

---

## What Was Built

`docs/components/forms.md` — 폼 컴포넌트 마크업 패턴 통합 문서 (458줄)

### 포함 내용

**5종 폼 요소 마크업 패턴:**

1. **텍스트 입력 (input)** — 기본 필수 필드 패턴, 오류 상태 패턴
2. **선택 (select)** — 기본 select, 오류 상태 select
3. **텍스트 영역 (textarea)** — 기본 textarea, 힌트+오류 동시 참조 패턴
4. **체크박스 (checkbox)** — 단일 체크박스, fieldset/legend 그룹 패턴
5. **라디오 (radio)** — fieldset/legend 그룹 패턴, 필수 라디오 그룹 패턴

**JS 오류 처리 예시:**
- IIFE + querySelector 구조 (Phase 6 GNB JS 패턴 일관성)
- `data-validate` 속성 기반 필드 순회
- `is-invalid` + `aria-invalid="true"` 쌍 처리
- `role="alert"` + `textContent` 업데이트 (스크린 리더 즉시 알림)
- 첫 번째 오류 필드 `focus()` 이동

---

## Decisions Made

- `is-invalid`와 `aria-invalid="true"`는 항상 쌍으로 처리 — CSS만 추가하면 스크린 리더가 오류 상태 인식 불가
- `role="alert"` 컨테이너는 DOM에 미리 배치하되 내용 비움 — `textContent` 변경 시 스크린 리더 알림 트리거
- 오류 메시지 id 규칙: `필드id + '-error'` — JS에서 자동 연결 가능하도록 패턴화
- `<legend class="form-label">` — Bootstrap `legend` 기본 margin 이중 적용 주의 (RESEARCH.md Pitfall 4 반영)
- `fieldset aria-required="true"` — 필수 라디오 그룹에서 그룹 전체에 필수 표시

---

## Must-Haves Verification

| Truth | Status |
|-------|--------|
| input, select, textarea, checkbox, radio 5종 마크업 스니펫 모두 존재 | PASS |
| 모든 폼 요소에 label for/id 매칭 적용 | PASS (17개 매칭) |
| 에러 메시지가 aria-describedby로 입력 요소와 연결되는 패턴 포함 | PASS (13개) |
| 체크박스/라디오 그룹에 fieldset + legend 패턴 사용 | PASS (fieldset 14개, legend 14개) |
| required 필드가 aria-required="true" + 시각적 "*" 양쪽 처리 | PASS |
| JS 오류 처리 예시: aria-invalid + is-invalid 쌍, role="alert" 적용 | PASS |

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Known Stubs

None — 모든 마크업 패턴은 실제 사용 가능한 완성형 스니펫으로 제공된다.

---

## Self-Check

파일 존재 확인:
- [x] `docs/components/forms.md` — 존재함 (458줄)

커밋 존재 확인:
- [x] `ce16c7d` — feat(07-02): 5종 폼 마크업 패턴 + JS 오류 처리 통합 문서 생성

## Self-Check: PASSED
