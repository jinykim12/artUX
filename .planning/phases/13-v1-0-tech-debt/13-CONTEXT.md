# Phase 13: v1.0 Tech Debt 정리 - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning
**Source:** v1.0-MILESTONE-AUDIT.md gap closure

<domain>
## Phase Boundary

v1.0 마일스톤 감사에서 발견된 tech debt 5건을 정리한다. 코드 기능은 모두 완료되어 있으며, 문서 정합성 + 문서 사이트 minor gap + 코드 주석 수정만 수행한다.

</domain>

<decisions>
## Implementation Decisions

### 문서 정합성
- **D-01:** REQUIREMENTS.md 추적 테이블에서 SCSS-01~07, TOKEN-01~06 13항목 상태를 Complete로 업데이트
- **D-02:** SCSS-03 요구사항 텍스트에 focus() _focus.scss 이동 아키텍처 결정 반영

### 문서 사이트 보완
- **D-03:** base.njk에 artux.css link 추가 — 토큰 페이지 색상 스워치가 실제 토큰 값으로 표시
- **D-04:** docs/starter/index.md 생성 — starter/README.md 내용을 문서 사이트에서 열람 가능하게
- **D-05:** navigation.js에 스타터 킷 섹션 추가

### 코드 주석 수정
- **D-06:** 7-utilities/_index.scss 주석 수정 — "Phase 5에서 채워짐" → 실제 상태 반영

### Claude's Discretion
- 각 수정의 구체적 텍스트

</decisions>

<canonical_refs>
## Canonical References

- `.planning/v1.0-MILESTONE-AUDIT.md` — 감사 보고서 (gap 목록)
- `.planning/REQUIREMENTS.md` — 추적 테이블 업데이트 대상
- `docs/_includes/layouts/base.njk` — artux.css link 추가 대상
- `docs/_data/navigation.js` — 스타터 킷 섹션 추가 대상
- `scss/7-utilities/_index.scss` — 주석 수정 대상
- `starter/README.md` — 문서 사이트 페이지 원본

</canonical_refs>

<code_context>
## Existing Code Insights

모든 수정은 기존 파일 편집이며 신규 파일은 docs/starter/index.md 1개만 생성.

</code_context>

<specifics>
## Specific Ideas

No specific requirements

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>

---

*Phase: 13-v1-0-tech-debt*
*Context gathered: 2026-03-27*
