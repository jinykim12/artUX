# Phase 12: 컨벤션 문서화 - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

클래스 네이밍, SCSS 작성 규칙, HTML 기본 구조, 코딩 스타일, Git 커밋 규칙을 명문화하여 팀 전체의 코드 일관성을 보장한다. Phase 10 Eleventy Convention 섹션에 최종 콘텐츠를 반영한다.

Requirements: CONV-01, CONV-02, CONV-03, CONV-04, CONV-05

</domain>

<decisions>
## Implementation Decisions

### 문서 위치
- **D-01:** `docs/conventions/` 디렉토리에 주제별 마크다운 파일로 작성
- **D-02:** Phase 10에서 생성한 conventions/index.md를 허브 페이지로 활용, 개별 문서 링크 추가
- **D-03:** Eleventy frontmatter 포함하여 문서 사이트 자동 통합

### 문서 구성
- **D-04:** naming.md — 클래스 네이밍 규칙 (Bootstrap 유틸리티 사용 기준, BEM 적용 경계)
- **D-05:** scss-rules.md — SCSS 작성 규칙 (중첩 3단계, 속성 순서, @use vs @import)
- **D-06:** html-structure.md — HTML 마크업 기본 구조 (메타태그, lang, viewport, 본문건너뛰기)
- **D-07:** coding-style.md — 코딩 스타일 (2 spaces, UTF-8, LF, .editorconfig)
- **D-08:** git-rules.md — Git 커밋/브랜치 규칙 (한국어 명령형, 타입 분류)

### Claude's Discretion
- 각 문서의 세부 내용 및 예시 코드
- conventions/index.md 업데이트 방식
- 내부 링크 유효성 검증 방법

</decisions>

<canonical_refs>
## Canonical References

### 기존 컨벤션 문서
- `docs/conventions/index.md` — Phase 10에서 생성된 허브 페이지 (업데이트 대상)

### 프로젝트 설정
- `.editorconfig` — 코딩 스타일 설정 원본
- `package.json` — 빌드 스크립트 참고
- `scss/style.scss` — @use/@import 전략 실제 구현

### 요구사항
- `.planning/REQUIREMENTS.md` §컨벤션 — CONV-01~05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/conventions/index.md` — Phase 10 기존 내용 (BEM, 속성 순서, Git 커밋 기본 내용 이미 포함)
- `.editorconfig` — 2 spaces, UTF-8, LF 설정
- `scss/style.scss` — @use 전략 실제 구현 예시

### Integration Points
- `docs/conventions/` — 개별 문서 추가
- `docs/_data/navigation.js` — 컨벤션 섹션 하위 메뉴 추가 (필요 시)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>

---

*Phase: 12-컨벤션-문서화*
*Context gathered: 2026-03-27*
