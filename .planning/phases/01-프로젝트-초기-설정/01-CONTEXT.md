# Phase 1 Context: 프로젝트 초기 설정

**Phase:** 1 — 프로젝트 초기 설정
**Goal:** Bootstrap 5 기반 레포지토리 골격 구성 + SCSS 컴파일 파이프라인 확립
**Requirements:** SCSS-01, SCSS-07

---

## Decisions

### SCSS 디렉토리 구조

**결정: ITCSS 숫자 폴더 구조 채택**

```
scss/
  1-settings/    ← 변수, 토큰, 브레이크포인트 (CSS 출력 없음)
  2-tools/       ← 믹스인, 함수 (CSS 출력 없음)
  3-generic/     ← Bootstrap 격리 + reset/normalize (요소 선택자만)
  4-elements/    ← HTML 태그 기본 스타일 (h1, a, p 등)
  5-objects/     ← 레이아웃 패턴 (container 확장, grid)
  6-components/  ← UI 컴포넌트 (btn, form, card 등)
  7-utilities/   ← 유틸리티 클래스 (sr-only, visibility)
  style.scss     ← 메인 진입점
```

역할이 명확하고, 신규 팀원도 파일 위치를 즉시 파악 가능. 컨벤션 충돌 방지.

### Bootstrap SCSS 임포트 전략

**결정: `@use` 먼저 시도, 실패 시 `3-generic/_vendor.scss`로 격리하여 `@import` 사용**

- Bootstrap 5.3의 `@use` 호환성을 Phase 1 빌드 시 직접 검증
- `@use "bootstrap/scss/bootstrap"` 또는 `@use "../../node_modules/bootstrap/scss/bootstrap"` 시도
- 불가 시: `scss/3-generic/_vendor.scss`에 `@import "bootstrap/scss/bootstrap"` 격리
- 이 파일은 `style.scss`에서 `@use "3-generic/vendor"` 없이 별도 처리 (Sass @import 경계)
- 선택된 전략을 `style.scss` 상단에 한국어 주석으로 명시

### 62.5% REM 트릭

**결정: 62.5% 트릭 유지 (기존 프로젝트 일관성)**

```scss
// scss/4-elements/_base.scss
html {
  font-size: 62.5%; // 1rem = 10px
}
```

- Bootstrap `$font-size-base` 재설정 필요: `$font-size-base: 1.6rem !default;` (16px 유지)
- `$spacers` 재계산 불필요 (Bootstrap은 $spacer 기준으로 계산)
- 폼 요소(`input`, `select`, `textarea`)는 `font-size: inherit` 명시 필요 (접근성)
- 주의: Bootstrap 컴포넌트 내 일부 하드코딩된 rem 값이 의도와 다르게 렌더링될 수 있음 → Phase 2 에서 `_variables.scss`에 주석 경고 추가

### npm 빌드 스크립트

**결정: npm 스크립트만 사용 (Gulp/Vite 불필요)**

```json
{
  "scripts": {
    "build:css": "sass scss/style.scss dist/artux.css --style=compressed --source-map",
    "watch:css": "sass --watch scss/style.scss:dist/artux.css",
    "build": "npm run build:css",
    "lint:css": "stylelint \"scss/**/*.scss\""
  }
}
```

### 파일 로드 순서

**결정: `style.scss` 내 로드 순서 (한국어 주석 필수)**

```scss
// ====================================================
// artpqUX 퍼블리싱 가이드 — 메인 진입점
// 로드 순서: 1-settings → 2-tools → 3-generic(Bootstrap) → 4-elements → 5-objects → 6-components → 7-utilities
// ====================================================

// 1. 설정 (Bootstrap 오버라이드 변수 포함 — 반드시 Bootstrap보다 먼저)
@use '1-settings' as settings;

// 2. 도구 (믹스인, 함수)
@use '2-tools' as tools;

// 3. 외부 라이브러리 + 리셋 (@use 또는 @import로 Bootstrap 로드)
@use '3-generic' as generic;

// 4. HTML 요소 기본 스타일
@use '4-elements' as elements;

// 5. 레이아웃 오브젝트
@use '5-objects' as objects;

// 6. UI 컴포넌트
@use '6-components' as components;

// 7. 유틸리티
@use '7-utilities' as utilities;
```

---

## Canonical Refs

- `.planning/REQUIREMENTS.md` — SCSS-01, SCSS-07 요구사항
- `.planning/PROJECT.md` — 프로젝트 컨텍스트 및 제약사항
- `.planning/research/STACK.md` — 검증된 패키지 버전 목록
- `.planning/research/PITFALLS.md` — Bootstrap + Dart Sass 주의사항
- `~/Desktop/art참고/제주플로깅.zip` — 팀 기존 SCSS 패턴 (variables, mixin, common, font, root)

---

## Claude's Discretion

다음 항목은 플래너가 결정:
- 정확한 `package.json` 의존성 버전 (STACK.md 기준)
- `.editorconfig` 세부 규칙
- `.gitignore` 항목 목록
- Stylelint 초기 설정 세부사항 (v1은 warning 수준)

---

## Deferred Ideas

(없음)

---

*Created: 2026-03-26*
