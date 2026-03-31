# Phase 11: 스타터 킷 - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1~9에서 검증된 구조를 `starter/` 디렉토리에 패키징하여, 신규 프로젝트에서 복사 한 번으로 즉시 표준 환경을 시작할 수 있도록 한다.

Requirements: STARTER-01, STARTER-02, STARTER-03, STARTER-04

</domain>

<decisions>
## Implementation Decisions

### 스타터 킷 구조
- **D-01:** `starter/` 디렉토리에 독립 패키지로 구성 — 별도 package.json, 자체 빌드 가능
- **D-02:** ITCSS 7단계 폴더 구조 포함 (1-settings ~ 7-utilities)
- **D-03:** 표준 SCSS 5종 파일 스타터 킷 버전으로 정리 (불필요한 실험 코드 제거, 주석 표준화)
- **D-04:** _project-overrides.scss 포함 — 프로젝트별 색상 오버라이드 예시

### HTML 보일러플레이트
- **D-05:** starter/html/index.html — lang="ko", charset, viewport, 본문건너뛰기 링크, 메타태그

### 빌드 및 문서
- **D-06:** starter/package.json — sass, postcss, autoprefixer 의존성 + build:css/watch:css 스크립트
- **D-07:** starter/README.md — 한국어, 5단계 이내 시작 방법, SCSS 구조 설명

### Claude's Discretion
- 스타터 킷에 포함할 SCSS 파일의 정확한 범위 (컴포넌트 SCSS 포함 여부)
- README.md 세부 내용
- package.json 버전 및 의존성 세부사항

</decisions>

<canonical_refs>
## Canonical References

### 소스 코드 (복사 원본)
- `scss/` — 전체 SCSS 구조 (스타터 킷 원본)
- `package.json` — 빌드 스크립트 참고
- `.editorconfig` — 코딩 스타일 설정
- `scss/1-settings/_project-overrides.scss` — 오버라이드 패턴

### 요구사항
- `.planning/REQUIREMENTS.md` §스타터 킷 — STARTER-01~04

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scss/style.scss` — ITCSS 진입점 패턴
- `scss/1-settings/`, `2-tools/`, `3-generic/` 등 — 복사 대상 구조
- `.editorconfig`, `.gitignore` — 설정 파일 복사 대상

### Integration Points
- `starter/` — 신규 디렉토리 생성 (프로젝트 루트)

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

*Phase: 11-스타터-킷*
*Context gathered: 2026-03-27*
