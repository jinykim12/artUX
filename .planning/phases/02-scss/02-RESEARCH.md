# Phase 2: SCSS 기반 파일 표준화 - Research

**Researched:** 2026-03-26
**Domain:** SCSS 파일 5종 표준화 — variables, mixin, common, font, root (Bootstrap 5 + Dart Sass 환경)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions (Phase 1 확정 사항)

- **SCSS 디렉토리 구조:** ITCSS 숫자 폴더 (`1-settings/` ~ `7-utilities/`) + `style.scss` 메인 진입점
- **Bootstrap SCSS 임포트 전략:** `3-generic/_vendor.scss`에 `@import`로 격리. `style.scss`에서 모든 `@use` 레이어를 먼저 선언하고 `@import '3-generic/vendor'`를 마지막에 배치
- **62.5% REM 트릭:** 유지. `html { font-size: 62.5% }` (`4-elements/_base.scss`), `$font-size-base: 1.6rem` (`3-generic/_vendor.scss` 내 `@import` 스코프에서 선언)
- **빌드 도구:** npm 스크립트만 사용. `build:css` = `sass scss/style.scss dist/artux.css --style=compressed --source-map --load-path=node_modules`
- **파일 로드 순서:** `style.scss`에서 1→2→4→5→6→7 (@use) → Bootstrap (@import) 순서, 한국어 주석 필수
- **`_index.scss` @forward 패턴:** 각 레이어 폴더에 `_index.scss`를 두고 `@forward`로 파셜을 재내보냄. `style.scss`는 레이어 index만 `@use`

### Bootstrap 오버라이드 변수의 핵심 제약 (Phase 1 빌드에서 발견)

- **`_variables.scss` → `@use`로 전달은 Bootstrap에 도달하지 않음.** Sass `@use` 모듈 시스템의 네임스페이스 격리로 인해, `1-settings/_variables.scss`에서 선언한 변수는 `3-generic/_vendor.scss` 내부의 `@import` 스코프에서 읽히지 않는다.
- **Bootstrap 오버라이드 변수의 실제 위치:** `3-generic/_vendor.scss` 내부 `@import "bootstrap/scss/bootstrap"` **이전** 줄에서 선언해야 한다. 이 위치에서만 Bootstrap의 `!default` 변수를 덮어쓸 수 있다.
- **`1-settings/_variables.scss`의 역할 재정의:** Bootstrap 오버라이드 변수의 **문서화 원본** 역할. 실제 오버라이드 효력은 `_vendor.scss`에서 발생하지만, 팀원이 "어떤 값이 오버라이드되는지"를 `_variables.scss`에서 확인할 수 있도록 주석과 함께 동일한 값을 기록한다. Phase 2에서 이 역할을 명확히 주석으로 안내해야 한다.

### Claude's Discretion

- 정확한 `package.json` 의존성 버전 (STACK.md 기준)
- `.editorconfig` 세부 규칙
- `.gitignore` 항목 목록
- Stylelint 초기 설정 세부사항 (v1은 warning 수준)

### Deferred Ideas (OUT OF SCOPE)

(없음)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SCSS-02 | Bootstrap 변수 오버라이드 파일(`_variables.scss`)이 Bootstrap 로드 이전에 적용된다 | `_vendor.scss` 내 `@import` 스코프 선언 패턴 (Phase 1 발견). `_variables.scss`는 문서화 원본 역할. |
| SCSS-03 | 팀 공통 믹스인 파일(`_mixin.scss`)이 표준화된다 (focus, flex, ellipsis, position, drop-shadow, ani 등) | 팀 기존 믹스인 6종 확인 완료 (제주플로깅.zip 참조). Dart Sass 호환 업데이트 필요 항목 식별. |
| SCSS-04 | 공통 기본 스타일 파일(`_common.scss`)이 표준화된다 (reset 보완, sr-only, 기본 요소 스타일) | 팀 기존 `_common.scss` 확인. Bootstrap Reboot 이후 보완 항목 분석 완료. |
| SCSS-05 | 폰트 파일(`_font.scss`)이 표준화된다 (Pretendard GOV / Noto Sans KR 전환 가이드 포함) | 팀 기존 `_font.scss` 9종 `@font-face` 확인 완료. 로컬 파일 경로 기반. CDN 전환 방법 주석 패턴 정의. |
| SCSS-06 | CSS Custom Properties 루트 파일(`_root.scss`)에 팀 공통 토큰이 정의된다 | Phase 2 범위는 뼈대만 (`root {}` 빈 블록 + Phase 3 예정 주석). 토큰 채우기는 Phase 3. |
| SCSS-07 | SCSS 파일 로드 순서가 문서화된다 | Phase 1에서 `style.scss` 7-레이어 주석 확립. Phase 2에서 5종 파일 추가 후 순서 업데이트. |
</phase_requirements>

---

## Summary

Phase 1에서 SCSS 컴파일 파이프라인이 확립되었다. Bootstrap은 `3-generic/_vendor.scss`에 `@import`로 격리되었고, 실제 오버라이드 변수(`$font-size-base: 1.6rem`)도 이 파일 내 `@import` 스코프에서 선언된 상태다. Phase 2는 이 기반 위에 5종 SCSS 파일을 추가하는 작업이다.

가장 중요한 아키텍처 제약은 **Bootstrap 오버라이드 변수 위치**다. `_variables.scss`는 `@use`로 로드되기 때문에 Dart Sass 모듈 격리에 의해 Bootstrap의 `@import` 스코프에서 읽히지 않는다. Phase 2의 `_variables.scss` 확장(`$primary`, `$secondary`, `$spacers`, `$border-radius` 추가)은 반드시 `_vendor.scss` 내에도 같은 값을 선언해야 효력이 발생한다. `_variables.scss`는 "팀 오버라이드 목록 문서"로서의 역할에 집중한다.

팀 기존 믹스인 6종(focus, flex, ellipsis, position, drop-shadow, ani)은 `제주플로깅.zip` 참조 코드에서 확인 완료했다. 일부 패턴은 Dart Sass 1.x 환경에서 정리가 필요하다: `transparentize()` 함수는 Dart Sass에서 `color.adjust()` 또는 `rgba()` 직접 사용으로 대체 권장되고, `-webkit-flex`/`-moz-` 등 구식 벤더 프리픽스는 Autoprefixer가 있으므로 제거 가능하다.

**Primary recommendation:** `_variables.scss`는 문서화 원본으로 운용하고, 모든 Bootstrap 오버라이드는 `_vendor.scss` 내 선언을 정본으로 유지한다. `_mixin.scss`는 6종을 Dart Sass 호환으로 정리하되, Autoprefixer 대상 벤더 프리픽스는 제거한다. `_common.scss`는 Bootstrap Reboot 이후 팀 보완 초기화 레이어로 정의한다.

---

## Standard Stack

### Core (Phase 2 직접 사용)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `sass` | **1.98.0** | Dart Sass SCSS 컴파일러 | Phase 1에서 설치 완료. `@use`/`@forward` 완전 지원 |
| `bootstrap` | **5.3.8** | CSS 프레임워크 SCSS 소스 | Phase 1에서 설치 완료. 오버라이드 패턴 확정 |

Phase 2는 새 npm 패키지 설치 없음. 기존 `devDependencies` 그대로 사용.

**Version verification:** Phase 1에서 `npm view` 직접 확인 완료.
- `sass`: 1.98.0
- `bootstrap`: 5.3.8
- `npm-run-all2`: 8.0.4
- `stylelint`: 17.5.0

---

## Architecture Patterns

### Phase 2 목표 파일 구조

```
scss/
├── 1-settings/
│   ├── _index.scss        # @forward 'variables' (이미 존재)
│   └── _variables.scss    # 확장: $primary, $secondary, $spacers, $border-radius 추가 (문서화 원본)
├── 2-tools/
│   ├── _index.scss        # @forward 'mixin' 활성화 (현재 주석 처리됨)
│   └── _mixin.scss        # 신규 생성: 팀 믹스인 6종
├── 3-generic/
│   ├── _index.scss        # 현재 비어 있음 (변경 없음)
│   ├── _vendor.scss       # Bootstrap 오버라이드 변수 추가 ($primary 등)
│   └── _root.scss         # 신규 생성: :root {} 뼈대
├── 4-elements/
│   ├── _index.scss        # @forward 'base', 'common', 'font' 추가
│   ├── _base.scss         # 이미 존재 (62.5% REM)
│   ├── _common.scss       # 신규 생성: Reboot 보완 reset
│   └── _font.scss         # 신규 생성: Pretendard GOV @font-face
└── style.scss             # 업데이트: 로드 순서에 _root.scss 반영
```

### Pattern 1: `_variables.scss` 문서화 원본 역할

**What:** `_variables.scss`는 Bootstrap 오버라이드 변수의 "팀 관리 문서" 역할만 수행한다. 실제 Bootstrap `!default` 오버라이드 효력은 `_vendor.scss`에서만 발생한다. 두 파일 모두 동기화하여 유지한다.

**Why:** Dart Sass `@use` 모듈 격리 때문에 `_variables.scss` 선언이 Bootstrap `@import` 스코프에 도달하지 않는다. 이는 Phase 1 빌드에서 확인된 실제 동작 결과다.

**패턴:**
```scss
// scss/1-settings/_variables.scss
// ====================================================
// artpqUX Bootstrap 오버라이드 변수 — 문서화 원본
// ====================================================
//
// [중요] 실제 Bootstrap 오버라이드 효력 위치:
//   scss/3-generic/_vendor.scss 내 @import 스코프
//
// 이 파일은 팀이 "어떤 값을 오버라이드하는지" 확인하는
// 문서 역할을 한다. 값을 변경할 때는 반드시
// _vendor.scss도 동일하게 업데이트할 것.
//
// ====================================================
//
// [62.5% REM 트릭 대응]
// html { font-size: 62.5% } → 1rem = 10px
// Bootstrap 기본 1rem = 16px 유지를 위해 1.6rem으로 재설정
$font-size-base: 1.6rem; // 16px

// [색상 오버라이드 예시 — Phase 3에서 실제값 결정]
// $primary: #0d6efd;       // Bootstrap 기본값 유지 예시
// $secondary: #6c757d;     // Bootstrap 기본값 유지 예시

// [간격 오버라이드 예시]
// $spacer: 1rem;           // Bootstrap 기본값: 1rem (= 10px in 62.5% 환경)
// spacers는 $spacer 기준으로 자동 계산됨
// 주의: 62.5% 환경에서 $spacer가 10px로 축소됨
// 필요 시 $spacer: 1.6rem으로 16px 기준 유지

// [기타 오버라이드 예시]
// $border-radius: 0.4rem;  // 4px (기본 0.375rem = 3.75px)
// $font-family-base: "Pretendard GOV", sans-serif;
```

```scss
// scss/3-generic/_vendor.scss (Phase 2에서 추가할 변수)
// Bootstrap 오버라이드 변수 — 이 위치에서만 Bootstrap !default가 덮어써진다
$font-size-base: 1.6rem;       // 16px (62.5% REM 대응)
// $primary: #0d6efd;          // Phase 3에서 실제 색상 결정
// $secondary: #6c757d;
// $font-family-base: "Pretendard GOV", sans-serif;

@import "bootstrap/scss/bootstrap";
```

### Pattern 2: `_mixin.scss` — 팀 믹스인 6종 Dart Sass 호환 구현

**팀 기존 믹스인 출처:** `제주플로깅.zip` → `pub/css/_mixin.scss` (실제 운영 코드 확인)

**6종 확인 및 업데이트 방향:**

| 믹스인 | 기존 패턴 | Phase 2 업데이트 |
|--------|-----------|-----------------|
| `focus()` | `transparentize($color, $transparent)` 사용 | `rgba($color, $alpha)` 직접 사용으로 교체 (`transparentize` deprecated 예정) |
| `flex()` | `-webkit-flex`, `-webkit-align-item` 하드코딩 | 벤더 프리픽스 제거 (Autoprefixer 담당) |
| `ellipsis($line)` | `-webkit-box-orient: vertical` 사용 | 그대로 유지 (실제 필요한 프리픽스) |
| `position()` | `$p, $t, $b, $l, $r` 파라미터 | 그대로 유지 |
| `drop-shadow()` | `-webkit-box-shadow`, `-moz-box-shadow` 하드코딩 | `-moz-box-shadow` 제거 (Autoprefixer 담당), `-webkit-` 선택적 유지 |
| `ani()` | `-webkit-transition`, `-moz-transition`, `-o-transition`, `-ms-transition` | Autoprefixer 담당 4종 모두 제거, `transition: all $time linear`만 유지 |

**업데이트된 6종 패턴:**
```scss
// scss/2-tools/_mixin.scss

// ====================================================
// artpqUX 팀 공통 믹스인
// Dart Sass 1.x 호환. Autoprefixer가 벤더 프리픽스를 처리하므로
// -webkit-, -moz-, -ms-, -o- 수동 작성 불필요.
// ====================================================

// [포커스 스타일]
// 사용 예: @include focus();
//          @include focus($color: #007bff, $alpha: 0.6);
// 파라미터:
//   $offset: outline-offset 값 (기본 -0.4rem)
//   $color:  outline 색상 (기본 Bootstrap $primary)
//   $alpha:  불투명도 0~1 (기본 0.8)
@mixin focus($offset: -0.4rem, $color: #0d6efd, $alpha: 0.8) {
  outline-offset: $offset;
  outline: 2px solid rgba($color, $alpha);
}

// [flex 중앙정렬]
// 사용 예: @include flex();
// 수평+수직 중앙 정렬 shorthand
@mixin flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

// [여러 줄 말줄임]
// 사용 예: @include ellipsis(2); // 2줄 말줄임
// 파라미터: $line — 표시할 최대 줄 수
@mixin ellipsis($line) {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $line;
}

// [포지션 단축]
// 사용 예: @include position(absolute, $t: 0, $r: 0);
//          @include position(fixed, $b: 2rem, $l: 50%);
// 파라미터: $p=position 속성값, $t=top, $b=bottom, $l=left, $r=right
@mixin position($p: absolute, $t: null, $b: null, $l: null, $r: null) {
  position: $p;
  top: $t;
  bottom: $b;
  left: $l;
  right: $r;
}

// [박스 그림자]
// 사용 예: @include drop-shadow();
//          @include drop-shadow($x: 2px, $y: 4px, $blur: 8px, $alpha: 0.15);
// 파라미터: $x=가로 오프셋, $y=세로 오프셋, $blur=흐림반경, $spread=확산, $alpha=불투명도
@mixin drop-shadow($x: 0, $y: 2px, $blur: 2px, $spread: 0, $alpha: 0.25) {
  box-shadow: $x $y $blur $spread rgba(0, 0, 0, $alpha);
}

// [전환 애니메이션]
// 사용 예: @include ani();         // 0.4s linear 전환
//          @include ani(0.2s);     // 0.2s linear 전환
// 파라미터: $time — 전환 시간 (기본 0.4s)
@mixin ani($time: 0.4s) {
  transition: all $time linear;
}
```

### Pattern 3: `_common.scss` — Bootstrap Reboot 이후 보완 초기화

**Bootstrap Reboot가 이미 처리하는 항목** (중복 작성 불필요):
- `box-sizing: border-box` (전체 적용)
- `body` 기본 `font-family`, `font-size`, `line-height`, `color`
- `p { margin-top: 0 }`
- `a { text-decoration: none }` (Bootstrap 5는 underline 유지, 팀에서 재정의)
- `img { max-width: 100% }`

**Bootstrap Reboot 이후 팀에서 보완해야 할 항목:**
```scss
// scss/4-elements/_common.scss

// ====================================================
// artpqUX 공통 기본 스타일 — Bootstrap Reboot 이후 보완
// ====================================================

// [한국어 줄바꿈 — 공공기관 필수]
// Bootstrap Reboot은 word-break을 설정하지 않음
html, body {
  word-break: keep-all;   // 한국어 단어 단위 줄바꿈
  word-wrap: break-word;  // 긴 URL 등 강제 줄바꿈
}

// [기본 링크 스타일]
// Bootstrap 5 Reboot은 color: $link-color + text-decoration: underline
// 팀 관행: hover에서도 underline 제거
a {
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
}

// [버튼 초기화]
button {
  border-radius: 0;
  white-space: nowrap;
  // outline: none은 접근성 위반 — 사용 금지
  // 포커스 스타일은 focus 믹스인으로 별도 정의
}

// [폰트 패밀리 — common에서 선언, Phase 2 이후 _font.scss 로드 이후 적용]
// $font-family-base 오버라이드는 _vendor.scss에서
// body에서 직접 선언하지 않음 — Bootstrap이 $font-family-base로 처리

// [비활성화 상태]
button:disabled,
button[disabled],
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

// [스크린리더 전용 텍스트 — A11Y-02 기반]
// Bootstrap 5에도 .visually-hidden이 있으나 팀 관행명(.sr-only) 유지
// clip-path 방식이 최신이나 IE11+ 호환을 위해 clip: rect 방식 유지
.sr-only {
  position: absolute !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  clip: rect(0, 0, 0, 0) !important;
  border: 0 !important;
}

.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  overflow: visible !important;
  clip: auto !important;
}
```

### Pattern 4: `_font.scss` — Pretendard GOV + Noto Sans KR 전환 가이드

**팀 기존 `_font.scss`의 접근:** 로컬 woff2/woff 파일 참조 (`../font/woff2/`, `../font/woff/`)

**artpqUX 가이드 시스템에서의 변환:** 로컬 파일 참조를 기본으로 하되, CDN 전환 방법을 주석으로 안내.

```scss
// scss/4-elements/_font.scss

// ====================================================
// artpqUX 폰트 선언
//
// [공공기관 프로젝트] Pretendard GOV (아래 @font-face 활성화)
// [일반 프로젝트]    Noto Sans KR CDN 방식 사용 (아래 주석 참고)
//
// [Noto Sans KR CDN 전환 방법]
// 1. 아래 @font-face 블록 전체를 주석 처리
// 2. HTML <head>에 아래 링크 태그 추가:
//    <link rel="preconnect" href="https://fonts.googleapis.com">
//    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
// 3. _vendor.scss에서 $font-family-base 변수 변경:
//    $font-family-base: "Noto Sans KR", sans-serif;
// ====================================================

// [Pretendard GOV — 로컬 파일 방식]
// 폰트 파일 위치: 프로젝트/font/woff2/, 프로젝트/font/woff/
// 공공기관 웹 접근성 적합 (KS X 3253 준거 글꼴)
// 다운로드: https://github.com/orioncactus/pretendard/releases

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 900;
  font-display: swap;
  src: local("Pretendard GOV Black"),
    url(../font/woff2/PretendardGOV-Black.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-Black.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 800;
  font-display: swap;
  src: local("Pretendard GOV ExtraBold"),
    url(../font/woff2/PretendardGOV-ExtraBold.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-ExtraBold.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 700;
  font-display: swap;
  src: local("Pretendard GOV Bold"),
    url(../font/woff2/PretendardGOV-Bold.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-Bold.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 600;
  font-display: swap;
  src: local("Pretendard GOV SemiBold"),
    url(../font/woff2/PretendardGOV-SemiBold.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-SemiBold.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 500;
  font-display: swap;
  src: local("Pretendard GOV Medium"),
    url(../font/woff2/PretendardGOV-Medium.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-Medium.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 400;
  font-display: swap;
  src: local("Pretendard GOV Regular"),
    url(../font/woff2/PretendardGOV-Regular.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-Regular.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 300;
  font-display: swap;
  src: local("Pretendard GOV Light"),
    url(../font/woff2/PretendardGOV-Light.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-Light.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 200;
  font-display: swap;
  src: local("Pretendard GOV ExtraLight"),
    url(../font/woff2/PretendardGOV-ExtraLight.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-ExtraLight.woff) format("woff");
}

@font-face {
  font-family: "Pretendard GOV";
  font-weight: 100;
  font-display: swap;
  src: local("Pretendard GOV Thin"),
    url(../font/woff2/PretendardGOV-Thin.woff2) format("woff2"),
    url(../font/woff/PretendardGOV-Thin.woff) format("woff");
}
```

### Pattern 5: `_root.scss` — CSS Custom Properties 뼈대 (Phase 2 범위)

```scss
// scss/3-generic/_root.scss

// ====================================================
// artpqUX CSS Custom Properties (디자인 토큰)
//
// Phase 2: 뼈대만 생성 — 토큰은 Phase 3에서 정의
// Phase 3 예정 토큰:
//   --color-primary, --color-secondary, --color-text,
//   --color-border, --color-error, --color-success
//   --font-size-xs ~ --font-size-2xl
//   --spacing-xs(4px) ~ --spacing-3xl(64px)
//   --shadow-sm, --shadow-md, --shadow-lg
//   --transition-fast(150ms), --transition-base(300ms)
//   --z-modal(1050), --z-overlay(1040)
// ====================================================

:root {
  // 토큰은 Phase 3에서 채워진다
}
```

### Pattern 6: `style.scss` 업데이트 — 5종 파일 추가 후 로드 순서

```scss
// scss/style.scss (Phase 2 이후)
// ====================================================
// artpqUX 퍼블리싱 가이드 — 메인 진입점
//
// 로드 순서 (ITCSS 기반):
//   1-settings  → 변수 (문서화 원본) — CSS 출력 없음
//   2-tools     → 믹스인 6종 — CSS 출력 없음
//   3-generic   → _root.scss (CSS Custom Properties 뼈대)
//   4-elements  → _base.scss (62.5% REM), _font.scss, _common.scss
//   5-objects   → 레이아웃 패턴
//   6-components → UI 컴포넌트
//   7-utilities → 유틸리티 클래스
//   Bootstrap   → @import 격리 (@use 이후 마지막 배치)
//
// Bootstrap 오버라이드 변수 위치:
//   3-generic/_vendor.scss 내 @import 스코프에서 선언
// ====================================================

// @use 계층 — Sass 규칙상 @import보다 먼저 위치해야 한다
// 1. 설정 (변수 문서화 원본)
@use '1-settings' as settings;

// 2. 도구 (믹스인 6종)
@use '2-tools' as tools;

// 3. Generic (CSS Custom Properties 뼈대)
@use '3-generic' as generic;

// 4~7. 커스텀 스타일 레이어
@use '4-elements' as elements;
@use '5-objects' as objects;
@use '6-components' as components;
@use '7-utilities' as utilities;

// Bootstrap (@import 격리 — @use 이후에 위치)
@import '3-generic/vendor';
```

**주의:** `3-generic/_index.scss`에 `@forward 'root'`를 추가해야 `@use '3-generic'`이 `_root.scss`를 포함한다. `_vendor.scss`는 여전히 `@forward` 불가 (내부가 `@import` 기반).

### Anti-Patterns to Avoid

- **`_variables.scss`에서 선언한 값이 Bootstrap에 적용된다고 가정:** `@use` 모듈 격리로 Bootstrap이 읽지 못한다. `_vendor.scss`에 같은 값을 동기화해야 한다.
- **`focus()` 믹스인에서 `$primary` 변수 직접 참조:** `_mixin.scss`는 `@use '1-settings'`로 변수를 불러와야 하나, Phase 2에서는 `$primary` 실제값이 확정되지 않았으므로 기본값으로 하드코딩 (`#0d6efd`) 또는 파라미터로 전달받는 방식 사용.
- **`_common.scss`에 Bootstrap Reboot이 이미 처리하는 항목 중복 작성:** `* { box-sizing: border-box }`, `img { max-width: 100% }` 등 중복 선언 불필요.
- **`button { outline: none }` 접근성 위반:** 팀 기존 `_common.scss`에 포함된 패턴. Phase 2에서 제거. 포커스 스타일은 Phase 5(A11Y-03)에서 `focus()` 믹스인으로 정의.
- **`_font.scss` 경로 오류:** `../font/` 경로는 `scss/4-elements/_font.scss` 위치 기준이다. 컴파일된 `dist/artux.css` 기준이 아님. 실제 프로젝트 복사 시 폰트 폴더 위치를 확인해야 한다.
- **`_root.scss`를 `_vendor.scss`와 같이 `@import`로 처리:** `_root.scss`는 순수 CSS Custom Properties 선언이므로 `@forward` 가능. `3-generic/_index.scss`에서 `@forward 'root'`로 처리.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 벤더 프리픽스 | `-webkit-transition`, `-moz-` 수동 작성 | Autoprefixer (PostCSS) | Phase 1에서 설치 완료. Can I Use 기반 자동 처리 |
| `transparentize()` → 투명도 조정 | Sass 내장 함수 래퍼 | `rgba($color, $alpha)` 직접 사용 | `transparentize`는 Dart Sass에서 `color.adjust` 권장으로 교체 중. `rgba()` 직접 사용이 가장 단순 |
| 여러 줄 말줄임 CSS | JS 기반 구현 | `-webkit-line-clamp` CSS | 모든 현대 브라우저 지원. `-webkit-box-orient: vertical`은 여전히 필요한 프리픽스 |
| `.sr-only` 직접 구현 | 커스텀 클래스 | 팀 기존 `.sr-only` 패턴 유지 | Bootstrap 5의 `.visually-hidden`과 동일 동작. 팀 네이밍 관행 `.sr-only` 우선 |

**Key insight:** Autoprefixer가 설치되어 있으므로 Phase 2 믹스인에서 `-webkit-`, `-moz-`, `-ms-`, `-o-` 수동 작성은 전부 제거 가능. 단, `-webkit-line-clamp`와 `-webkit-box-orient`는 Autoprefixer가 처리하지 않으므로 수동 유지.

---

## Common Pitfalls

### Pitfall 1: Bootstrap 오버라이드 변수가 적용 안 됨 (SCSS-02 핵심 위험)

**What goes wrong:** `_variables.scss`에 `$primary: #ff0000`을 선언해도 Bootstrap이 기본 파란색(`#0d6efd`)을 출력한다.

**Why it happens:** Dart Sass `@use` 모듈 시스템의 네임스페이스 격리. `_variables.scss`는 `@use`로 로드되므로 독립적인 모듈 스코프를 갖는다. Bootstrap은 `3-generic/_vendor.scss`의 `@import` 스코프에서만 접근할 수 있다.

**How to avoid:** 모든 Bootstrap 오버라이드 변수는 `_vendor.scss` 내 `@import "bootstrap/scss/bootstrap"` **위에** 선언. `_variables.scss`는 문서화 원본 역할만 수행하고, 두 파일을 동기화 유지.

**Warning signs:** `dist/artux.css`에서 오버라이드하려던 색상이 Bootstrap 기본값으로 출력됨.

### Pitfall 2: `_mixin.scss`에서 Bootstrap 변수 직접 참조

**What goes wrong:** `@mixin focus($color: $primary)` 처럼 Bootstrap의 `$primary`를 믹스인 기본값으로 사용하면 컴파일 오류 또는 undefined 변수 오류.

**Why it happens:** `2-tools/_mixin.scss`는 Bootstrap 로드 이전에 처리되는 레이어다. `$primary`는 Bootstrap이 로드된 후 `_vendor.scss` `@import` 스코프에서만 정의된다.

**How to avoid:** 믹스인 기본값에서 Bootstrap 변수 참조 금지. `rgba()` 직접 사용하거나 하드코딩된 기본값 사용. 예: `@mixin focus($color: #0d6efd, $alpha: 0.8)`.

**Warning signs:** `Undefined variable $primary` 컴파일 오류.

### Pitfall 3: `_common.scss`에 `button { outline: none }` 포함

**What goes wrong:** 키보드 탐색 시 포커스 인디케이터가 사라져 접근성 위반. 공공기관 납품 시 웹 접근성 검사 실패.

**Why it happens:** 팀 기존 `_common.scss` (제주플로깅 기준)에 해당 선언이 포함되어 있었음.

**How to avoid:** `outline: none` 완전 제거. 포커스 스타일 재정의는 Phase 5(A11Y-03)에서 `focus()` 믹스인으로 처리.

**Warning signs:** 포커스가 보이지 않는 버튼 요소.

### Pitfall 4: `_root.scss`를 `@import`로 처리하려는 시도

**What goes wrong:** `3-generic/_vendor.scss`와 혼동하여 `_root.scss`도 `@import`로 처리하면 불필요한 `@import` 경계를 만들어 Sass 경고가 증가한다.

**Why it happens:** `_vendor.scss`의 `@import` 격리 패턴이 모든 `3-generic/` 파일에 적용된다고 오해.

**How to avoid:** `_root.scss`는 순수 CSS 출력 파일이므로 `3-generic/_index.scss`에서 `@forward 'root'`로 처리하면 된다. `@import` 격리는 Bootstrap이 포함된 `_vendor.scss`에만 적용.

### Pitfall 5: `_font.scss` 로드 순서 — `@font-face`가 Bootstrap 이후에 오는 문제

**What goes wrong:** `style.scss`에서 현재 Bootstrap이 마지막에 `@import`로 로드된다. `_font.scss`는 `4-elements`에 포함되어 `@use`로 먼저 로드되므로 CSS 출력에서 `@font-face`가 Bootstrap보다 앞에 온다.

**Why it happens:** 현재 `style.scss` 구조에서 `@use` 계층이 `@import Bootstrap` 이전에 배치된다.

**How to avoid:** `@font-face`는 캐스케이드 순서에 무관하게 선언 위치만 있으면 된다. `_font.scss`가 `@use`로 먼저 로드되어도 `@font-face`는 정상 적용된다. 문제 없음.

### Pitfall 6: `$font-family-base` 오버라이드 위치 혼동

**What goes wrong:** `_variables.scss`에만 `$font-family-base: "Pretendard GOV", sans-serif`를 선언하면 Bootstrap이 기본 시스템 폰트를 사용한다.

**Why it happens:** Pitfall 1과 동일 원인 — `@use` 격리.

**How to avoid:** `_vendor.scss` 내 `@import "bootstrap/scss/bootstrap"` 이전에 `$font-family-base: "Pretendard GOV", sans-serif` 선언 필요. `_font.scss`와 `_variables.scss`는 각자의 역할만 수행하며, Bootstrap이 실제로 읽는 변수는 `_vendor.scss`에서만 동작.

---

## Code Examples

### `2-tools/_index.scss` 업데이트

```scss
// scss/2-tools/_index.scss
// ====================================================
// 2-tools: 믹스인, 함수
// CSS 출력 없음 — 도구만 정의
// ====================================================
@forward 'mixin';
```

### `3-generic/_index.scss` 업데이트 (`_root.scss` 포함)

```scss
// scss/3-generic/_index.scss
// ====================================================
// 3-generic: CSS Custom Properties + 외부 라이브러리(Bootstrap)
// 주의: _vendor.scss는 @import 기반이므로 @forward 불가
// style.scss에서 @import '3-generic/vendor'로 별도 처리한다
// ====================================================
@forward 'root';
```

### `4-elements/_index.scss` 업데이트 (`_common.scss`, `_font.scss` 추가)

```scss
// scss/4-elements/_index.scss
// ====================================================
// 4-elements: HTML 태그 기본 스타일
// ====================================================
@forward 'base';    // 62.5% REM 설정
@forward 'font';    // @font-face 선언
@forward 'common';  // Bootstrap Reboot 이후 보완 초기화
```

**`@forward` 순서 이유:** `font`를 `base` 바로 다음에 두어 `common`에서 `font-family` 속성 선언 시 폰트가 이미 정의된 상태로 진행.

### `_vendor.scss`에 추가할 오버라이드 변수 블록

```scss
// scss/3-generic/_vendor.scss
// ====================================================
// Bootstrap 5.3 SCSS 격리 임포트
// ...기존 주석 유지...
// ====================================================

// Bootstrap 오버라이드 변수 — @import 스코프에서 선언해야 Bootstrap이 인식한다
// (Sass @use 모듈 시스템은 네임스페이스로 격리되므로 Bootstrap이 못 읽음)
//
// 실제값 참조 원본: scss/1-settings/_variables.scss
$font-size-base: 1.6rem;    // 16px (62.5% REM 트릭 대응)
// $primary: #0d6efd;        // Phase 3에서 팀 색상 확정 후 활성화
// $secondary: #6c757d;
// $font-family-base: "Pretendard GOV", sans-serif;  // _font.scss 로드 이후 활성화

@import "bootstrap/scss/bootstrap";
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `transparentize($color, 0.2)` | `rgba($color, 0.8)` 직접 사용 | Dart Sass 1.x | `transparentize`는 `color.adjust`로 교체 권장. 간단한 경우 `rgba` 직접 사용이 더 명확 |
| 믹스인 내 `-webkit-`, `-moz-` 하드코딩 | Autoprefixer에 위임 | PostCSS 보편화 (2015+) | 수동 프리픽스 제거로 믹스인 코드 간결화 |
| Bootstrap `$primary` 직접 사용 in 믹스인 | 믹스인 파라미터로 컬러 전달 | `@use` 모듈 시스템 도입 | 변수 스코프 격리로 전역 Bootstrap 변수 직접 참조 불가 |
| `.sr-only` clip 방식 | `clip-path: inset(50%)` 최신 방식 | 2020년 이후 | IE11 지원 여부에 따라 선택. 공공기관은 IE 지원 종료이나 팀 `clip: rect` 관행 유지 권장 |

**Deprecated/outdated:**
- `transparentize()`: Dart Sass에서 `color.adjust($color, $alpha: -0.2)`로 대체 예정. Phase 2에서 `rgba()` 직접 사용으로 전환.
- 믹스인 내 `-webkit-flex`, `-moz-transition` 등 수동 벤더 프리픽스: Autoprefixer 사용 환경에서 불필요.

---

## Open Questions

1. **`$font-family-base` 오버라이드 타이밍**
   - What we know: `_font.scss`에서 `@font-face`를 선언하고, `_vendor.scss`에서 `$font-family-base: "Pretendard GOV", sans-serif`를 선언해야 Bootstrap이 실제로 해당 폰트를 사용한다. 그러나 `_font.scss`는 `@use`로 먼저 처리되고, `_vendor.scss`는 `@import`로 나중에 처리되므로 선언 순서상 `@font-face`가 `$font-family-base` 적용보다 먼저 나온다.
   - What's unclear: CSS 파서는 `@font-face` 선언 위치와 무관하게 적용하므로 실제 문제는 없을 것으로 예상. 빌드 후 확인 권장.
   - Recommendation: Phase 2 구현 후 `npm run build:css` 실행하여 `dist/artux.css`에서 `Pretendard GOV` 문자열과 `@font-face` 블록이 모두 포함됨 확인.

2. **`_common.scss`의 배치 레이어 (4-elements vs 7-utilities)**
   - What we know: 팀 기존 `_common.scss`는 reset 보완 + 기본 요소 스타일 + sr-only + 커스텀 컴포넌트 초안이 혼재되어 있었다. ITCSS 관점에서 요소 선택자 스타일은 `4-elements`, 유틸리티 클래스(`.sr-only`)는 `7-utilities`가 맞다.
   - What's unclear: Phase 2에서 `_common.scss`를 `4-elements`에 배치할지, sr-only를 분리할지.
   - Recommendation: Phase 2에서는 `4-elements/_common.scss`에 모두 포함. Phase 5(A11Y)에서 `.sr-only`를 `7-utilities/_sr-only.scss`로 분리하는 리팩토링 진행.

---

## Environment Availability

Phase 2는 새 외부 도구 없음. Phase 1 환경 그대로 사용.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm 스크립트 | ✓ | v24.13.1 | — |
| sass | SCSS 컴파일 | ✓ | 1.98.0 (installed) | — |
| bootstrap | SCSS 소스 | ✓ | 5.3.8 (installed) | — |
| autoprefixer | 벤더 프리픽스 | ✓ | 10.4.27 (installed) | — |

**Missing dependencies with no fallback:** 없음. 모든 의존성 Phase 1에서 설치 완료.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | 없음 — 빌드 출력 확인 방식 |
| Config file | 해당 없음 |
| Quick run command | `npm run build:css` |
| Full suite command | `npm run build:css && npm run lint:css` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SCSS-02 | `_variables.scss` 존재, Bootstrap 오버라이드 예시 포함 | smoke | `npm run build:css` (0 exit = pass) + `dist/artux.css` 내 Bootstrap 클래스 확인 | ❌ Wave 0 생성 |
| SCSS-03 | `_mixin.scss` 존재, 6종 믹스인 정의, `@use`로 로드됨 | smoke | `npm run build:css` (0 exit = pass) | ❌ Wave 0 생성 |
| SCSS-04 | `_common.scss` 존재, `word-break: keep-all`, `.sr-only` 포함 | smoke | `npm run build:css` + `dist/artux.css`에서 `keep-all`, `sr-only` 검색 | ❌ Wave 0 생성 |
| SCSS-05 | `_font.scss` 존재, Pretendard GOV @font-face 9종, Noto Sans 전환 주석 | smoke | `npm run build:css` + `dist/artux.css`에서 `Pretendard GOV` 검색 | ❌ Wave 0 생성 |
| SCSS-06 | `_root.scss` 존재, `:root {}` 블록 포함 | smoke | `npm run build:css` + `dist/artux.css`에서 `:root` 검색 | ❌ Wave 0 생성 |
| SCSS-07 | `style.scss` 로드 순서 주석 업데이트, 5종 파일 포함 | manual | `cat scss/style.scss` — 한국어 주석 육안 확인 | ✅ 기존 파일 업데이트 |

### Sampling Rate

- **Per task commit:** `npm run build:css`
- **Per wave merge:** `npm run build:css && npm run lint:css`
- **Phase gate:** `dist/artux.css`에서 `@font-face`, `keep-all`, `:root`, `.sr-only` 검색으로 5종 파일 포함 확인

### Wave 0 Gaps

- [ ] `scss/2-tools/_mixin.scss` — SCSS-03 믹스인 파일
- [ ] `scss/3-generic/_root.scss` — SCSS-06 루트 파일
- [ ] `scss/4-elements/_common.scss` — SCSS-04 공통 스타일
- [ ] `scss/4-elements/_font.scss` — SCSS-05 폰트 파일
- [ ] `scss/2-tools/_index.scss` — `@forward 'mixin'` 활성화 (현재 주석 처리)
- [ ] `scss/3-generic/_index.scss` — `@forward 'root'` 추가
- [ ] `scss/4-elements/_index.scss` — `@forward 'font'`, `@forward 'common'` 추가
- [ ] `scss/1-settings/_variables.scss` — Bootstrap 오버라이드 예시 확장
- [ ] `scss/3-generic/_vendor.scss` — Phase 2 오버라이드 변수 주석 블록 추가
- [ ] `scss/style.scss` — 로드 순서 주석 업데이트

---

## Sources

### Primary (HIGH confidence)

- Phase 1 빌드 검증 결과 (2026-03-26) — Bootstrap 오버라이드 변수 위치 실제 동작 확인 (`01-02-SUMMARY.md`)
- `제주플로깅.zip` 팀 기존 코드 (`pub/css/_mixin.scss`, `_common.scss`, `_font.scss`, `_variables.scss`, `_root.scss`) — 직접 파일 분석
- `scss/3-generic/_vendor.scss` 현재 상태 — `$font-size-base` 오버라이드 위치 확인
- `scss/style.scss` 현재 상태 — `@use` + `@import` 혼용 구조 확인

### Secondary (MEDIUM confidence)

- [Sass 공식 문서 — @use](https://sass-lang.com/documentation/at-rules/use/) — 모듈 격리 동작 설명
- [Pretendard GOV GitHub](https://github.com/orioncactus/pretendard) — 폰트 파일 구성 및 font-weight 9종 확인
- [Bootstrap 5.3 Sass 커스터마이징](https://getbootstrap.com/docs/5.3/customize/sass/) — `!default` 변수 오버라이드 공식 가이드

### Tertiary (LOW confidence)

- `.planning/research/PITFALLS.md` — `transparentize` deprecated 경고 항목 (프로젝트 자체 문서)

---

## Metadata

**Confidence breakdown:**

- Bootstrap 오버라이드 변수 위치: HIGH — Phase 1 빌드에서 실제 동작 확인
- 믹스인 6종 구현 패턴: HIGH — 팀 기존 코드 직접 분석
- `_font.scss` Pretendard GOV 패턴: HIGH — 팀 기존 코드 그대로 이관
- `_common.scss` Bootstrap Reboot 보완 항목: MEDIUM — Bootstrap 5 Reboot 소스 기반이나 직접 확인 불완전
- `_root.scss` 뼈대: HIGH — Phase 2 범위가 빈 블록이므로 불확실성 없음

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (Bootstrap 5.x 업데이트 주기 고려, 30일)
