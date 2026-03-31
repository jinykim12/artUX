# Phase 5: 접근성 기반 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-26
**Phase:** 05-접근성-기반
**Areas discussed:** 포커스 스타일 표준화, 문서화 범위와 형식, KRDS 체크리스트 구성, 본문건너뛰기 패턴

---

## 포커스 스타일 표준화

### Q1: focus() 색상 처리 방식

| Option | Description | Selected |
|--------|-------------|----------|
| 하드코딩 유지 | 2-tools 레이어는 Bootstrap 로드 이전이므로 var() 사용 불가. 하드코딩 #0d6efd 유지, 토큰 매핑 주석 안내. | |
| 토큰 기반으로 변경 | focus() 믹스인을 4-elements 레이어로 이동하여 var(--color-primary) 사용. 믹스인 위치 변경 필요. | ✓ |

**User's choice:** 토큰 기반으로 변경
**Notes:** Phase 3에서 도입한 CSS 토큰을 활용하는 방향

### Q2: 믹스인 이동 위치

| Option | Description | Selected |
|--------|-------------|----------|
| 4-elements 레이어 | _common.scss 또는 신규 _focus.scss에 배치. Bootstrap 로드 이후라 var() 사용 가능. | ✓ |
| 6-components 레이어 | 6-components/_a11y.scss에 접근성 관련 코드 모음. skip-nav과 함께 배치. | |

**User's choice:** 4-elements 레이어
**Notes:** 기존 2-tools/_mixin.scss의 focus() 제거하고 이동

### Q3: 고대비 모드 대응

| Option | Description | Selected |
|--------|-------------|----------|
| 기본 대응만 | outline 기반 포커스는 고대비 모드에서 자동으로 보임. 주석으로 안내만. | ✓ |
| forced-colors 미디어쿼리 추가 | @media (forced-colors: active) 블록으로 포커스/버튼 스타일 보완. | |

**User's choice:** 기본 대응만
**Notes:** 공공기관 납품 시 플러스이지만 현재는 주석 안내로 충분

---

## 문서화 범위와 형식

### Q4: 접근성 가이드 위치

| Option | Description | Selected |
|--------|-------------|----------|
| docs/ 마크다운 | docs/accessibility/ 디렉토리에 별도 마크다운 파일. Phase 10(Eleventy)에서 통합 용이. | ✓ |
| SCSS 주석 통합 | 6-components/_a11y-notes.scss에 주석으로 작성. 코드 옆에 보이지만 길어짐. | |
| Claude 재량 | 플래너가 최적 위치 판단. | |

**User's choice:** docs/ 마크다운
**Notes:** Eleventy 문서 사이트와 자연스러운 통합

### Q5: 문서 구성

| Option | Description | Selected |
|--------|-------------|----------|
| 주제별 분리 | images.md, color-contrast.md, keyboard.md 등 별도 파일. 독립적 참조 가능. | ✓ |
| 단일 파일 | accessibility-guide.md 하나에 모든 내용. 간단하지만 길어질 수 있음. | |

**User's choice:** 주제별 분리

---

## KRDS 체크리스트 구성

### Q6: 체크리스트 형식

| Option | Description | Selected |
|--------|-------------|----------|
| 마크다운 체크리스트 | docs/accessibility/checklist.md에 마크다운 체크박스. KWCAG 조항, 자동/수동, 테스트 방법 포함. | ✓ |
| SCSS 주석 + 마크다운 병행 | 코드 연관 항목은 SCSS에도 요약 반복. 두 곳 관리 필요. | |

**User's choice:** 마크다운 체크리스트
**Notes:** 납품 시 복사해서 사용 가능한 실무 형태

---

## 본문건너뛰기 패턴

### Q7: skip-nav 배치 위치

| Option | Description | Selected |
|--------|-------------|----------|
| 6-components/_skip-nav.scss | 독립 컴포넌트로 분리. ROADMAP 제안 일치. | ✓ |
| 7-utilities에 포함 | sr-only와 유사한 성격이지만 스타일링 포함되어 애매. | |

**User's choice:** 6-components/_skip-nav.scss

### Q8: 포커스 시 노출 애니메이션

| Option | Description | Selected |
|--------|-------------|----------|
| 애니메이션 없음 | 포커스 시 즉시 노출. 단순하고 접근성 문제 없음. 공공기관 표준 패턴. | ✓ |
| 슬라이드다운 애니메이션 | transition으로 상단에서 내려오는 효과. prefers-reduced-motion 고려 필요. | |

**User's choice:** 애니메이션 없음

---

## Claude's Discretion

- focus() 믹스인의 새 위치 내 정확한 파일명
- 각 접근성 가이드 문서의 세부 목차 및 예시 코드 수준
- KRDS 체크리스트의 구체적 항목 수와 분류 체계
- skip-nav 스타일링 세부사항

## Deferred Ideas

- 동적 콘텐츠 접근성 코드 구현 → Phase 9
- forced-colors 미디어쿼리 상세 대응 → v2 또는 추후
