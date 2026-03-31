# artpqUX (아트피큐) 퍼블리싱 가이드 시스템

## What This Is

아트피큐 퍼블리싱 전담팀의 HTML/CSS 작업 규칙과 템플릿을 체계화한 가이드 시스템.
Bootstrap 5를 기반으로 팀 공통 변수, 믹스인, 컴포넌트 패턴을 정의하고, KRDS 및 KWCAG/WCAG 2.1 AA 접근성 기준을 준수하는 퍼블리싱 표준을 문서화한다.
신규 프로젝트 투입 시 팀원 누구나 동일한 구조와 컨벤션으로 바로 시작할 수 있도록 스타터 킷과 가이드 문서를 제공한다.

## Core Value

신규 프로젝트 시작 시 퍼블리싱 규칙을 처음부터 다시 정하지 않고, 검증된 팀 표준을 즉시 적용할 수 있어야 한다.

## Current State (v1.0 shipped)

v1.0 마일스톤 완료. 12개 Phase, 26개 Plan, 46개 v1 요구사항 모두 구현.

**산출물:**
- SCSS: ITCSS 7단계 구조, 10종 컴포넌트, 디자인 토큰, 반응형 믹스인, 접근성 패턴 (1,702 LOC)
- 문서: 10종 컴포넌트 마크다운, 6종 접근성 가이드, 5종 컨벤션, KRDS 체크리스트
- Eleventy 문서 사이트: `npm run serve` / `npm run build`
- 스타터 킷: `starter/` 복사 → `npm install && npm run build:css` 즉시 시작

## Requirements

### Validated (v1.0)

- ✓ 팀 공통 SCSS 구조 정의 — v1.0 (Phase 1~2)
- ✓ Bootstrap 5 커스터마이징 방법 문서화 — v1.0 (Phase 2~3)
- ✓ 공통 디자인 토큰 정의 — v1.0 (Phase 3)
- ✓ 팀 공통 믹스인 라이브러리 정리 — v1.0 (Phase 2, 4, 5)
- ✓ 클래스 네이밍 컨벤션 문서화 — v1.0 (Phase 12)
- ✓ 접근성 가이드 및 체크리스트 — v1.0 (Phase 5)
- ✓ 공통 UI 컴포넌트 패턴 — v1.0 (Phase 6~9)
- ✓ HTML 마크업 스니펫 + 접근성 주의사항 — v1.0 (Phase 6~9)
- ✓ 반응형 브레이크포인트 기준 및 미디어쿼리 믹스인 — v1.0 (Phase 4)
- ✓ 신규 프로젝트 스타터 킷 — v1.0 (Phase 11)
- ✓ Eleventy 기반 문서 사이트 — v1.0 (Phase 10)

### Active (v2 candidates)

- [ ] Stylelint로 SCSS 네이밍 규칙 자동 검증 (AUTO-01)
- [ ] pa11y-ci로 접근성 기준 자동 테스트 (AUTO-02)
- [ ] 다크모드 대응 가이드 (EXT-01)
- [ ] 인쇄 스타일 가이드 (EXT-02)
- [ ] 애니메이션/전환효과 가이드 (EXT-03)

### Out of Scope

- 피그마 디자인 작업 — 퍼블리싱 전담팀이므로 디자인 도구 규칙은 범위 외
- JavaScript 프레임워크(React/Vue/Angular) 컴포넌트 — HTML/CSS 퍼블리싱 팀 특성상 불필요
- Bootstrap 완전 제거/대체 — 현행 Bootstrap 5 기반 유지가 팀 방향

## Context

- 디자인은 외부(디자이너)에서 받고, 팀은 HTML/CSS 퍼블리싱 전담
- **기술 스택**: Bootstrap 5.3.8 + Dart Sass 1.98.0 + ITCSS 7단계 + Eleventy 3.x
- **SCSS 구조**: @use/@forward 기반 모듈화 (Bootstrap만 @import 격리)
- **컴포넌트**: 10종 (skip-nav, header, form, button, card, table, breadcrumb, modal, tab, slider)
- **접근성**: KWCAG 2.1 AA, 24개 검사항목 체크리스트, WAI-ARIA Disclosure Navigation
- **문서**: Eleventy 정적 사이트 (8개 섹션, 코드 복사 기능)
- 공공기관 납품 포함 다양한 프로젝트 수행 → KRDS/KWCAG 준수

## Constraints

- **CSS 기반**: Bootstrap 5 — 팀 표준, 완전 대체 불가
- **전처리기**: SCSS(dart-sass) — 팀 표준
- **패키지 매니저**: npm — 팀 표준
- **접근성**: KRDS / KWCAG 2.1 AA 이상 — 공공기관 납품 요건
- **폰트**: Pretendard GOV (공공기관), Noto Sans KR (일반) — 프로젝트별 선택
- **주석/커밋 언어**: 한국어 — 팀 내 소통 언어
- **코딩 스타일**: 4 spaces 들여쓰기, 한국어 주석

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bootstrap 5 기반 유지 | 팀 기존 작업 모두 Bootstrap 기반, 전환 비용 불필요 | ✓ Good |
| CSS Custom Properties 도입 | Bootstrap 변수와 병행하여 프로젝트별 테마 오버라이드 지원 | ✓ Good |
| Eleventy 문서 사이트 | 프레임워크 없는 순수 HTML/CSS 팀에 최적, JS 의존 없음 | ✓ Good |
| KRDS 컴포넌트 기준 적용 | 공공기관 납품 품질 보장, 마크업/접근성 패턴 표준화 | ✓ Good |
| ITCSS 7단계 구조 | 역할 명확, 신규 팀원 파일 위치 즉시 파악 | ✓ Good |
| 62.5% REM 트릭 유지 | 기존 프로젝트 일관성, 1rem=10px 환산 편의 | ✓ Good |
| Sass Map 브레이크포인트 | map.get + @error로 잘못된 키워드 방지 | ✓ Good |
| WAI-ARIA Disclosure Navigation | role="menu" 대신 W3C APG 권장 패턴 | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-03-27 after v1.0 milestone*
