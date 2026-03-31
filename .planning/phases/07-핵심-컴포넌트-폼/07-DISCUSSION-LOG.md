# Phase 7: 핵심 컴포넌트 — 폼 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.

**Date:** 2026-03-26
**Phase:** 07-핵심-컴포넌트-폼
**Areas discussed:** 폼 스니펫 문서 형식, 폼 SCSS 스타일링 범위, 폼 오류 처리 패턴

---

## 폼 스니펫 문서 형식

### Q1: 문서 구성

| Option | Description | Selected |
|--------|-------------|----------|
| docs/components/forms.md 통합 | 5종 폼 요소를 하나의 마크다운에. Phase 6 header.md 패턴 일관성. | ✓ |
| 요소별 개별 파일 | form-input.md 등 5개 별도. 파일 수 많아짐. | |

**User's choice:** docs/components/forms.md 통합

---

## 폼 SCSS 스타일링 범위

### Q2: Bootstrap 오버라이드 범위

| Option | Description | Selected |
|--------|-------------|----------|
| 최소 커스텀 | Bootstrap 기본 유지. 에러/성공 토큰, focus 일관성, 커스텀 체크박스만. | |
| 본격적 팀 스타일링 | 입력 필드 전체 리디자인. 높이, 패딩, 테두리 등 팀 표준 재정의. | ✓ |

**User's choice:** 본격적 팀 스타일링

---

## 폼 오류 처리 패턴

### Q3: JS 예시 코드 포함 여부

| Option | Description | Selected |
|--------|-------------|----------|
| JS 예시 포함 | aria-describedby, role="alert", 포커스 이동 JS 스니펫. Phase 6 패턴 일관성. | ✓ |
| 문서화만 | HTML 마크업 + 접근성 속성 안내만. | |

**User's choice:** JS 예시 포함

---

## Claude's Discretion

- _form.scss 구체적 스타일링 값
- 폼 오류 JS 구현 방식
- 각 폼 요소 마크업 세부 구조

## Deferred Ideas

None
