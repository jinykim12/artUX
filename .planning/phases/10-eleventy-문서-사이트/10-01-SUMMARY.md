---
phase: 10-eleventy-문서-사이트
plan: "01"
subsystem: ui
tags: [eleventy, nunjucks, esm, static-site, docs]

# Dependency graph
requires: []
provides:
  - Eleventy 3.x ESM 설정 (eleventy.config.js, input: docs, output: _site)
  - 공통 베이스 레이아웃 (docs/_includes/layouts/base.njk) — 사이드 네비 + 콘텐츠 영역
  - 사이드 네비 섹션 데이터 (docs/_data/navigation.js) — 8개 섹션
  - npm serve/build 스크립트 (npm-run-all2 병렬 SCSS watch + Eleventy dev)
  - docs/index.md 홈 페이지
affects:
  - 10-eleventy-문서-사이트 (10-02, 10-03)
  - 11-스타터-킷
  - 12-컨벤션-문서화

# Tech tracking
tech-stack:
  added: ["@11ty/eleventy@^3.x", "nunjucks (bundled)"]
  patterns:
    - "ESM eleventy.config.js — package.json type:module 필수"
    - "docs/ input 디렉토리, _site/ output, passthrough: dist/artux.css → artux.css"
    - "npm-run-all2 --parallel watch:css + eleventy:serve = serve 스크립트"

key-files:
  created:
    - eleventy.config.js
    - docs/_includes/layouts/base.njk
    - docs/_data/navigation.js
    - docs/index.md
  modified:
    - package.json
    - .gitignore

key-decisions:
  - "package.json에 type:module 추가 — eleventy.config.js ESM 로드 필수"
  - "serve 스크립트: npm-run-all2 --parallel watch:css + eleventy:serve (D-13)"
  - "build 스크립트: build:css && eleventy:build 순차 실행 (D-14)"
  - "인라인 <style>로 최소 레이아웃 CSS 포함 — artux.css 로드 전 깨짐 방지"

patterns-established:
  - "Eleventy 전역 데이터: docs/_data/navigation.js → base.njk에서 navigation 변수로 접근"
  - "현재 페이지 활성화: {% if page.url == item.url %} class=is-active"
  - "모바일 토글: aria-expanded + aria-controls 패턴, .is-open CSS 클래스 토글"

requirements-completed: [DOCS-01, DOCS-07]

# Metrics
duration: 15min
completed: 2026-03-27
---

# Phase 10 Plan 01: Eleventy 설치 + 기본 설정 Summary

**Eleventy 3.x ESM 설정, Nunjucks 베이스 레이아웃(사이드 네비 + 모바일 토글), 8개 섹션 navigation 데이터, npm serve/build 스크립트 구성으로 문서 사이트 실행 환경 완성**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-27T00:30:00Z
- **Completed:** 2026-03-27T00:45:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- @11ty/eleventy 3.x 설치 + ESM eleventy.config.js 생성 (passthrough: dist/artux.css, docs/js)
- docs/_includes/layouts/base.njk 베이스 레이아웃 — 사이드 네비, 모바일 토글, aria 접근성 속성
- docs/_data/navigation.js 8개 섹션 전역 데이터
- npm run build 실행 시 _site/index.html + _site/artux.css 생성 확인 (17개 페이지 자동 변환)

## Task Commits

Each task was committed atomically:

1. **Task 1: Eleventy 설치 + eleventy.config.js + npm 스크립트** - `a372cd9` (feat)
2. **Task 2: 베이스 레이아웃 + 사이드 네비 데이터 + 홈 인덱스 페이지** - `318742c` (feat)

**Plan metadata:** `b8feccc` (docs: complete plan)

## Files Created/Modified

- `eleventy.config.js` — Eleventy 3.x ESM 설정, passthrough artux.css/js
- `package.json` — type:module 추가, serve/build/eleventy:serve/eleventy:build 스크립트
- `.gitignore` — _site/ 추가
- `docs/_includes/layouts/base.njk` — HTML5 베이스 레이아웃 (사이드 네비, 모바일 토글, 접근성)
- `docs/_data/navigation.js` — 8개 섹션 사이드 네비 데이터 (ESM)
- `docs/index.md` — 홈 페이지 frontmatter + 소개

## Decisions Made

- package.json에 `"type": "module"` 추가 — ESM eleventy.config.js 로드를 위해 필수
- serve 스크립트는 npm-run-all2 --parallel로 watch:css + eleventy:serve 병렬 실행 (D-13)
- build 스크립트는 build:css → eleventy:build 순차 실행 (D-14)
- base.njk에 인라인 `<style>` 포함 — artux.css 로드 전 레이아웃 깨짐 방지

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Eleventy 실행 환경 완성. npm run serve로 localhost:8080 dev 서버 가동 가능
- 기존 docs/components/*.md, docs/accessibility/*.md 파일들이 Eleventy 페이지로 자동 변환됨 (17개)
- 다음 Plan 02: 기존 마크다운 파일들에 Eleventy frontmatter 추가 필요 (D-10)

## Self-Check: PASSED

- eleventy.config.js: FOUND
- docs/_includes/layouts/base.njk: FOUND
- docs/_data/navigation.js: FOUND
- docs/index.md: FOUND
- Commit a372cd9: FOUND
- Commit 318742c: FOUND

---
*Phase: 10-eleventy-문서-사이트*
*Completed: 2026-03-27*
