# Phase 6: 핵심 컴포넌트 — 레이아웃 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 06-핵심-컴포넌트-레이아웃
**Areas discussed:** 헤더/GNB 마크업 패턴, 레이아웃 SCSS 구조, GNB 접근성 세부사항

---

## 헤더/GNB 마크업 패턴

### Q1: HTML 스니펫 위치

| Option | Description | Selected |
|--------|-------------|----------|
| docs/ 마크다운 | docs/components/header.md에 코드 블록으로 포함. Phase 5 패턴 일관성. | ✓ |
| docs/_includes/snippets/ | header-pc.html, header-mobile.html 별도 파일. Eleventy partial 직접 사용. | |

**User's choice:** docs/ 마크다운

### Q2: 서브메뉴 레벨

| Option | Description | Selected |
|--------|-------------|----------|
| 1단계 메뉴만 | 기본 GNB, 드롭다운 확장 방법만 주석 안내. | |
| 2단계 서브메뉴 포함 | aria-haspopup, aria-expanded 적용한 드롭다운 패턴. | ✓ |

**User's choice:** 2단계 서브메뉴 포함

### Q3: 모바일 전체메뉴 마크업

| Option | Description | Selected |
|--------|-------------|----------|
| aria-hidden 토글 | 패널에 aria-hidden 토글, 버튼에 aria-expanded. 단순하고 호환성 좋음. | ✓ |
| dialog 패턴 | role="dialog" + aria-modal + 포커스 트랩. 완전한 모달이지만 JS 필요. | |

**User's choice:** aria-hidden 토글

---

## 레이아웃 SCSS 구조

### Q4: _layout.scss 범위

| Option | Description | Selected |
|--------|-------------|----------|
| 사용 원칙 + 기본 확장 | 그리드 원칙 + sticky 헤더, container-fluid 확장 등 실무 패턴 포함. | |
| 사용 원칙만 | Bootstrap 그리드 중복 금지 원칙과 사용 가이드만. 커스텀 확장은 프로젝트별 직접 작성. | ✓ |

**User's choice:** 사용 원칙만

---

## GNB 접근성 세부사항

### Q5: JS 코드 포함 여부

| Option | Description | Selected |
|--------|-------------|----------|
| 문서화만 | HTML 마크업 + 접근성 속성 + JS 동작 설명 주석. 실제 JS 미포함. | |
| JS 예시 코드 포함 | 햄버거 토글, 키보드 탐색, 서브메뉴 열기/닫기 JS 스니펫 포함. | ✓ |

**User's choice:** JS 예시 코드 포함
**Notes:** HTML/CSS 퍼블리싱 팀이지만 GNB 접근성 JS는 실무에서 필수적

---

## Claude's Discretion

- _layout.scss 주석의 구체적 내용
- 헤더 SCSS 스타일링 세부사항
- JS 예시 코드 구현 방식
- 서브메뉴 CSS 애니메이션 여부

## Deferred Ideas

None
