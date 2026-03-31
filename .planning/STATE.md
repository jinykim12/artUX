---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: Tech Debt 정리
status: Milestone complete
stopped_at: Completed 13-01-PLAN.md
last_updated: "2026-03-27T02:10:49.787Z"
progress:
  total_phases: 13
  completed_phases: 13
  total_plans: 27
  completed_plans: 27
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-26)

**Core value:** 신규 프로젝트 시작 시 퍼블리싱 규칙을 처음부터 다시 정하지 않고, 검증된 팀 표준을 즉시 적용할 수 있어야 한다.
**Current focus:** Phase 13 — v1-0-tech-debt

## Current Status

**Milestone:** v1.0 — 아트피큐 퍼블리싱 가이드 시스템
**Phase:** 13
**Last action:** Phase 13-01 완료 — v1.0 tech debt 5건 일괄 정리. REQUIREMENTS.md 13항목 Complete, 문서 사이트 gap 3건 해소, _index.scss 주석 수정 (2026-03-26)
**Stopped at:** Completed 13-01-PLAN.md

## Roadmap Progress

| Phase | Name | Status |
|-------|------|--------|
| 1 | 프로젝트 초기 설정 | ⏳ 미시작 |
| 2 | SCSS 기반 파일 표준화 | ⏳ 미시작 |
| 3 | 디자인 토큰 | ⏳ 미시작 |
| 4 | 반응형 시스템 | ✅ 완료 |
| 5 | 접근성 기반 | ✅ 완료 |
| 6 | 핵심 컴포넌트 — 레이아웃 | ⏳ 미시작 |
| 7 | 핵심 컴포넌트 — 폼 | ✅ 완료 |
| 8 | 핵심 컴포넌트 — UI | ✅ 완료 (2/2 플랜 완료) |
| 9 | 핵심 컴포넌트 — 오버레이 | ✅ 완료 (2/2 플랜 완료) |
| 10 | Eleventy 문서 사이트 | ✅ 완료 (3/3 플랜 완료) |
| 11 | 스타터 킷 | ✅ 완료 (2/2 플랜 완료) |
| 12 | 컨벤션 문서화 | ✅ 완료 (3/3 플랜 완료) |
| 13 | v1.0 Tech Debt 정리 | ✅ 완료 (1/1 플랜 완료) |

## Key Decisions Made

- Bootstrap 5 기반 유지 (iux-pub/guide의 순수 ITCSS 방식과 다름)
- 퍼블리싱 전담팀, 디자인 관련 가이드는 범위 외
- Fine 세분화, YOLO 모드, Git 추적 활성화
- 인포마인드 언급 금지
- [Phase 04] sass:map + sass:list 내장 모듈로 Dart Sass 1.98.0 deprecation 없는 respond-to() 구현
- [Phase 04] Bootstrap $grid-breakpoints 오버라이드 없이 팀 respond-to() 6키워드 병행 운용
- [Phase 05] focus() 믹스인을 4-elements 레이어로 이동 — CSS 토큰 var(--color-primary) 사용을 위해 Bootstrap 로드 이후 레이어 필요
- [Phase 05] skip-nav에 transition 없음 — 공공기관 표준(즉시 노출) per D-13
- [Phase 05] checklist.md는 납품 시 복사하여 즉시 사용 가능한 KWCAG 2.1 AA 24개 항목 4원칙 분류 체크리스트
- [Phase 05] 동적 콘텐츠 JS 포커스 트랩 구현은 Phase 9로 위임, dynamic-content.md는 패턴 가이드 문서만 제공
- [Phase 06-02] WAI-ARIA Disclosure Navigation 확정 — role="menu" 사용 금지, aria-haspopup Disclosure 패턴 사용 금지 (W3C APG 명시)
- [Phase 06-02] 방향키 탐색은 선택적(참고용) 제공 — Tab만으로 KWCAG 2.1.1 충족
- [Phase 06-01] _layout.scss는 주석 전용 파일 — Bootstrap 그리드 중복 금지 원칙만 명시 (D-05, D-06)
- [Phase 06-01] _header.scss respond-to(pc-sm) 분기 — CSS 토큰(var(--*))만 사용, 트랜지션 없음 (공공기관 즉시 표시)
- [Phase 07-01] Bootstrap :focus box-shadow 제거 — _form.scss의 :focus에 box-shadow: none; outline: 0 명시, 전역 :focus-visible(_focus.scss) 단독 처리
- [Phase 07-01] Sass 변수 오버라이드 방식 금지 확인 — CSS 선택자 오버라이드만 사용 (Bootstrap 격리 구조 준수)
- [Phase 07-01] Bootstrap --bs-form-check-bg-image SVG 유지 — 커스텀 SVG 재작성 금지 (고대비 모드 forced-colors 대응)

- [Phase 07-02] is-invalid + aria-invalid="true" 쌍 처리 원칙 — CSS 클래스와 ARIA 속성은 항상 동시 적용
- [Phase 07-02] role="alert" 컨테이너는 DOM에 미리 배치하되 내용 비움 — textContent 변경 시 스크린 리더 알림 트리거
- [Phase 07-02] 오류 메시지 id 규칙: 필드id + "-error" — JS 자동 연결을 위한 패턴화
- [Phase 08-01] .btn-ghost 팀 커스텀 variant — Bootstrap에 없는 ghost 버튼 패턴 팀 표준화
- [Phase 08-01] Phase 8 @forward 4종 일괄 추가 — race condition 방지를 위해 Plan 01에서 미리 추가 (table, breadcrumb는 Plan 02에서 생성)
- [Phase 08-02] Pagination은 Bootstrap 기본 스타일 유지 (D-10) — 별도 SCSS 불필요, 마크업 문서만 작성
- [Phase 08-02] table-responsive는 Bootstrap 네이밍 유지 — 동일 클래스명 오버라이드로 Bootstrap 유틸리티와 혼용 가능
- [Phase 09-01] Phase 9 @forward 3종(modal/tab/slider) Plan 01에서 일괄 추가 — race condition 방지, _slider.scss 플레이스홀더로 컴파일 연결 유지
- [Phase 09-01] 탭 aria-selected attribute selector 병행 처리 — .active 클래스와 [aria-selected="true"] 동시 처리로 JS/Bootstrap 어느 쪽도 지원
- [Phase 09-02] transition: none 슬라이더(.swiper-slide)에도 적용 — 공공기관 즉시 표시 원칙 Swiper까지 확장
- [Phase 09-02] .slider__status는 sr-only 병행 사용 안내로 마크업 위임 — SCSS에 시각 숨김 직접 미작성 (sr-only 유틸리티로 처리)
- [Phase 10-01] package.json type:module 추가 — ESM eleventy.config.js 로드 필수
- [Phase 10-01] serve: npm-run-all2 --parallel watch:css + eleventy:serve 병렬 실행 (D-13)
- [Phase 10-01] base.njk 인라인 style 포함 — artux.css 로드 전 레이아웃 깨짐 방지
- [Phase 10-02] 인덱스 페이지(components-index.md, accessibility-index.md)에는 tags 미포함 — 섹션 랜딩이므로 컬렉션 제외
- [Phase 10-03] copy.js IIFE 패턴 사용 — 전역 오염 없이 바닐라 JS 격리
- [Phase 10-03] 복사 버튼 인라인 스타일 — docs.css 의존 없이 독립 동작 보장
- [Phase 11-01] starter/package.json에 type:module 미포함 — 순수 SCSS 빌드 환경으로 ESM 강제 불필요
- [Phase 11-01] artux-responsive-base 더미 클래스 제거 — respond-to 동작 확인용 실험 코드로 스타터 킷 불필요
- [Phase 11-02] skip-nav에 transition 없음 — 공공기관 표준(즉시 노출) Phase 05 결정 상속
- [Phase 11-02] CSS 경로 ../dist/style.css — html/ 디렉토리 기준 상대 경로 (starter/html/index.html → starter/dist/style.css)
- [Phase 12-01] naming.md는 기존 index.md BEM/클래스 원칙 확장 방식 채택 — 중복 없이 세분화
- [Phase 12-01] scss-rules.md에 기존 5그룹 속성 순서 이관 + overflow/box-shadow/opacity 세부 속성 추가
- [Phase 12-01] 공공기관 납품 transition:none 원칙을 scss-rules.md에 명시적으로 문서화 — Phase 09 결정 상속
- [Phase 12-02] a11y 커밋 타입 팀 추가 — 공공기관 납품 접근성 커밋 별도 분류
- [Phase 12-02] *.md trim_trailing_whitespace=false 예외 이유 명문화 — 마크다운 줄바꿈 의미 보존
- [Phase 12-02] skip-nav transition 없음 재확인 — Phase 05 결정 상속, html-structure.md에 명시
- [Phase 12-03] base.njk 플랫 구조 확인으로 navigation.js children 미추가 — index.md 링크 테이블로 충분
- [Phase 13-01] SCSS-03 텍스트에 _focus.scss로 분리됨 명시 — Phase 05 아키텍처 결정 REQUIREMENTS.md 소급 반영
- [Phase 13-01] artux.css를 docs.css 이후에 로드 — docs.css 오버라이드 방지

## Notes

- 기존 작업 참고파일: `~/Desktop/art참고/` (job(3).zip, 마라톤.zip, 제주어사전.zip, 제주플로깅.zip)
- Bootstrap `$primary` 오버라이드 패턴, `@import` flat 구조가 현행 방식
- KRDS / KWCAG 2.1 AA 준수 필수 (공공기관 납품)

---
*Last updated: 2026-03-26 — Phase 13-01 tech debt 정리 완료. v1.0 마일스톤 27/27 플랜 완료. 전체 완료.*
