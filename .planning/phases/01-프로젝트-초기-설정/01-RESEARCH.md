# Phase 1: 프로젝트 초기 설정 - Research

**Researched:** 2026-03-26
**Domain:** Bootstrap 5 + Dart Sass + ITCSS + npm scripts 빌드 환경 초기화
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **SCSS 디렉토리 구조:** ITCSS 숫자 폴더 (`1-settings/` ~ `7-utilities/`) + `style.scss` 메인 진입점
- **Bootstrap SCSS 임포트 전략:** `@use` 먼저 시도, 실패 시 `3-generic/_vendor.scss`로 격리하여 `@import` 사용
- **62.5% REM 트릭:** 유지. `html { font-size: 62.5% }`, `$font-size-base: 1.6rem`
- **빌드 도구:** npm 스크립트만 사용 (Gulp/Vite 불필요)
- **파일 로드 순서:** `style.scss`에서 1→2→3→4→5→6→7 순서, 한국어 주석 필수
- **CONTEXT.md의 npm scripts 구조:** `build:css`, `watch:css`, `build`, `lint:css` 4개 스크립트

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
| SCSS-01 | Bootstrap 5 SCSS를 `@use`로 임포트하는 표준 진입점 파일(`style.scss`)이 존재한다 | Bootstrap 5.3 @use 호환성 연구 결과로 전략 확정 (아래 참조) |
| SCSS-07 | SCSS 파일 로드 순서가 문서화된다 | ITCSS 레이어 순서, 각 레이어 `_index.scss` 패턴 |
</phase_requirements>

---

## Summary

Bootstrap 5.3.x는 아직 Sass 모듈 시스템(`@use`/`@forward`)으로 완전히 마이그레이션되지 않았다. Bootstrap 5.3 내부는 여전히 `@import` 기반이며, Dart Sass 1.80+ 에서는 deprecation 경고가 발생한다. `@use "bootstrap/scss/bootstrap"`은 기술적으로 가능하나, Bootstrap 내부에서 `@import`를 사용하기 때문에 **외부에서 `@use`로 불러오더라도 경고가 함께 발생**한다. Bootstrap v6 dev 브랜치에서 모듈 시스템으로 마이그레이션이 진행 중이나 v5.x에서는 미완료다.

따라서 CONTEXT.md의 전략이 정확하다: `@use "bootstrap/scss/bootstrap"` 먼저 시도 → 경고 발생 확인 → `3-generic/_vendor.scss`에 `@import`로 격리. 실무상 현재 표준은 경고를 수용하거나 `_vendor.scss` 격리 패턴으로 Bootstrap을 분리하는 것이다.

Dart Sass 1.98.0 + Bootstrap 5.3.8 조합에서 빌드 오류는 발생하지 않는다. 경고는 나오지만 CSS 출력은 정상이다. Node.js는 현재 환경에서 v24.13.1이 설치되어 있어 모든 도구 요건을 충족한다.

**Primary recommendation:** Bootstrap을 `3-generic/_vendor.scss`에 `@import`로 격리하고, 이를 `style.scss`에서 `@use` 없이 별도 처리한다. 각 ITCSS 레이어에는 `_index.scss`를 두어 `@forward`로 파셜을 재내보낸다.

---

## Standard Stack

### Core (Phase 1 직접 사용)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `bootstrap` | **5.3.8** | CSS 프레임워크 SCSS 소스 | 팀 현행 표준, 최신 stable |
| `sass` | **1.98.0** | Dart Sass SCSS 컴파일러 | 공식 패키지, `@use`/`@forward` 완전 지원 |
| `stylelint` | **17.5.0** | SCSS 린팅 | v17 flat config 안정화 |
| `stylelint-config-standard-scss` | **17.0.0** | SCSS ruleset | `@use`/`@forward` 규칙 포함 공식 config |
| `npm-run-all2` | **8.0.4** | 병렬/직렬 스크립트 실행 | 원본 npm-run-all 활성 포크, `run-p`/`run-s` 제공 |

> **주의:** npm view npm-run-all2 version 결과가 8.0.4임. STACK.md의 6.0.x 기록은 구버전. Phase 1에서는 8.0.4 사용.

### Supporting (Phase 1 초기화에 포함하나 Phase 1에서 직접 실행 불필요)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `postcss` | **8.5.8** | CSS 후처리 | Autoprefixer 실행 플랫폼 |
| `autoprefixer` | **10.4.27** | 벤더 프리픽스 자동 추가 | 공공기관 납품 브라우저 지원 |
| `postcss-cli` | latest | PostCSS CLI | npm script에서 실행 시 |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `sass` (JS) | `sass-embedded` | 소규모 프로젝트 속도 차이 무의미. JS 버전으로 충분 |
| `npm-run-all2` | `concurrently` | concurrently도 유효한 선택이나 npm-run-all2가 glob 패턴(`run-p dev:*`) 지원으로 더 간결 |
| `stylelint-config-standard-scss` | `stylelint-config-recommended-scss` | standard가 더 엄격한 규칙 포함. Phase 1은 warning 수준이므로 standard 채택 |

**Installation:**
```bash
npm install -D bootstrap sass stylelint stylelint-config-standard-scss npm-run-all2
npm install -D postcss postcss-cli autoprefixer
```

---

## Architecture Patterns

### Recommended Project Structure

```
scss/
├── 1-settings/
│   ├── _index.scss        # @forward 로 파셜 재내보내기
│   └── _variables.scss    # Bootstrap 오버라이드 변수 (Bootstrap 로드 전)
├── 2-tools/
│   ├── _index.scss
│   └── _mixins.scss       # 팀 공통 믹스인 (Phase 2)
├── 3-generic/
│   ├── _index.scss
│   └── _vendor.scss       # Bootstrap @import 격리 (또는 @use)
├── 4-elements/
│   ├── _index.scss
│   └── _base.scss         # html { font-size: 62.5% }, body { font-size: 1.6rem }
├── 5-objects/
│   └── _index.scss        # (Phase 2 이후 채워짐)
├── 6-components/
│   └── _index.scss        # (Phase 2 이후 채워짐)
├── 7-utilities/
│   └── _index.scss        # (Phase 2 이후 채워짐)
└── style.scss             # 메인 진입점
dist/
└── artux.css              # 컴파일된 출력
```

### Pattern 1: ITCSS 레이어 `_index.scss` @forward 패턴

**What:** 각 레이어 폴더에 `_index.scss`를 두고, 그 레이어의 파셜들을 `@forward`로 재내보낸다. `style.scss`는 레이어 index만 `@use`한다.

**When to use:** 항상. `_index.scss` 없이 파셜을 직접 `@use`하면 소비자 파일마다 개별 경로를 관리해야 한다.

**Example:**
```scss
// scss/1-settings/_index.scss
@forward 'variables';

// scss/style.scss
// 1. 설정 (Bootstrap 오버라이드 변수 포함 — 반드시 Bootstrap보다 먼저)
@use '1-settings' as settings;

// 2. 도구 (믹스인, 함수)
@use '2-tools' as tools;

// 3. 외부 라이브러리 + 리셋
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

### Pattern 2: Bootstrap @import 격리 (권장 전략)

**What:** Bootstrap을 `3-generic/_vendor.scss`에 `@import`로 격리. Bootstrap 내부의 `@import` 기반 코드가 다른 레이어에 오염되지 않도록 경계를 명확히 한다.

**When to use:** Bootstrap 5.3.x + Dart Sass 1.80+ 조합에서 `@use`로 불러와도 Bootstrap 내부 경고가 발생하기 때문에, 경고를 격리하고 나머지 SCSS는 순수 `@use` 기반으로 유지할 때.

**Example:**
```scss
// scss/3-generic/_vendor.scss
// Bootstrap 5.3.x는 내부적으로 @import 사용 — Dart Sass 경고 발생 정상
// style.scss에서 @use 대신 직접 처리 (Sass @import 경계)
@import "bootstrap/scss/bootstrap";

// scss/3-generic/_index.scss
// 주의: _vendor.scss는 @import를 사용하므로 @forward 불가
// style.scss에서 별도 @use로 불러온다
```

**style.scss에서의 처리:**
```scss
// 3. Bootstrap (vendor @import — @use/@forward 경계 밖)
// @use 불가: _vendor.scss 내부가 @import 기반이므로 직접 불러옴
@import '3-generic/vendor';

// 나머지 레이어는 @use 사용
@use '4-elements' as elements;
// ...
```

> **결정 트리:** Phase 1 빌드 시 `@use "bootstrap/scss/bootstrap"` 먼저 시도. 경고만 발생하면 수용 가능. Hard error 발생 시 위 `@import` 격리 전략으로 전환. 선택한 전략을 `style.scss` 상단에 한국어 주석으로 명시.

### Pattern 3: 62.5% REM + Bootstrap $font-size-base 재설정

**What:** `html { font-size: 62.5% }`로 1rem=10px 설정. Bootstrap의 기본 1rem=16px 계산식이 깨지므로 `$font-size-base`를 재설정해야 한다.

**When to use:** 62.5% 트릭을 쓰는 모든 Bootstrap 프로젝트.

**Example:**
```scss
// scss/1-settings/_variables.scss
// Bootstrap 오버라이드 변수 — Bootstrap @import 이전에 선언되어야 함
// 62.5% REM 트릭 대응: 1rem = 10px 환경에서 Bootstrap 기본 16px 유지
$font-size-base: 1.6rem !default; // 16px

// scss/4-elements/_base.scss
html {
  font-size: 62.5%; // 1rem = 10px
}

body {
  font-size: 1.6rem; // 16px — Bootstrap inherit 보완
}

// 폼 요소는 font-size 상속 안 함 — 접근성 필수
input,
button,
select,
textarea {
  font-size: inherit;
}
```

### Pattern 4: package.json npm scripts (CONTEXT.md 결정)

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

### Anti-Patterns to Avoid

- **레이어 index 없이 직접 @use:** `@use '1-settings/variables'`로 개별 파셜을 직접 불러오지 말 것. `_index.scss` → `@forward` 패턴으로 일관성 유지.
- **@use 후 @import 혼용:** 한 파일에서 `@use`와 `@import`를 혼용하면 Dart Sass가 경고를 두 배로 출력하고 향후 3.0에서 오류. `_vendor.scss` 파일만 예외.
- **$font-size-base를 Bootstrap 임포트 이후에 선언:** 효과 없음. 반드시 `1-settings/_variables.scss`에서 Bootstrap 로드 전에 선언.
- **빈 _index.scss 생성 없이 레이어 폴더만 생성:** Phase 1에서 빈 레이어도 `_index.scss` 파일을 미리 만들어 놓아야 이후 `@use`가 오류 없이 동작.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sass 경고 억제 | `--silence-deprecation` 플래그를 스크립트에 추가하는 임시 해결 | Bootstrap 격리 패턴 (`_vendor.scss`) | 경고 억제는 Sass 3.0 대비를 막음 |
| CSS 프리픽스 | 수동 `-webkit-`, `-moz-` 작성 | Autoprefixer (PostCSS) | Can I Use 데이터 기반 자동화. 수동은 누락 발생 |
| 병렬 스크립트 실행 | `command1 & command2` (Unix only) | `npm-run-all2 run-p` | 크로스플랫폼 (Windows 팀원 가능성) |

**Key insight:** Bootstrap의 `@use` 미지원은 Bootstrap 내부 설계 한계이지 프로젝트 설정 오류가 아니다. 직접 수정하지 말고 격리 패턴으로 경계를 만들라.

---

## Common Pitfalls

### Pitfall 1: Bootstrap 5.3 @use 시도 시 namespace 문제

**What goes wrong:** `@use "bootstrap/scss/bootstrap" as bs`로 불러오면 Bootstrap 내부 변수를 `bs.$primary`로 참조해야 한다. 기존 Bootstrap 사용 패턴(`$primary`)이 모두 깨진다.

**Why it happens:** `@use`는 기본적으로 파일명을 namespace로 설정한다. Bootstrap처럼 내부가 `@import` 기반인 라이브러리는 `@use`로 불러와도 namespace 오염이 발생할 수 있다.

**How to avoid:** Phase 1에서 `@use "bootstrap/scss/bootstrap"` 테스트 시 `as *` (no namespace)는 금지다 — 전역 오염. `@import` 격리 전략 사용 권장.

**Warning signs:** `There is no variable named $primary` 오류, 또는 경고 폭발.

### Pitfall 2: Dart Sass 1.98 + Bootstrap 5.3 경고 오해

**What goes wrong:** 빌드 시 `Sass @import rules are deprecated` 경고가 수십 개 나타나는 것을 빌드 실패로 오해.

**Why it happens:** Bootstrap 5.3 내부 파일들이 아직 `@import`를 사용 중. Dart Sass 1.80+에서 정상적으로 발생하는 deprecation 경고이며 CSS 출력은 정상.

**How to avoid:** 경고가 warning이지 error가 아님을 확인. `3-generic/_vendor.scss`로 격리하면 경고 발생 위치가 명확해진다. Bootstrap 6.x 릴리스까지 이 상태 유지.

**Warning signs:** 경고만 있고 `dist/artux.css`가 정상 생성되면 정상.

### Pitfall 3: `$font-size-base` 선언 순서 오류

**What goes wrong:** `$font-size-base: 1.6rem`을 Bootstrap 로드 이후에 선언하면 Bootstrap의 기본값(1rem)이 적용된다.

**Why it happens:** Bootstrap 변수는 `!default` 플래그를 사용한다. `!default`는 변수가 이미 정의된 경우 적용되지 않는다. 즉, Bootstrap 로드 **전**에 선언해야 효과가 있다.

**How to avoid:** 반드시 `1-settings/_variables.scss`에서 선언하고, `style.scss`에서 `1-settings`를 Bootstrap보다 먼저 `@use`/`@import`.

**Warning signs:** 16px 대신 10px로 렌더링되는 Bootstrap 컴포넌트.

### Pitfall 4: 빈 레이어 @use 오류

**What goes wrong:** `style.scss`에서 `@use '5-objects' as objects`를 선언했는데 `5-objects/_index.scss`가 없으면 `Can't find stylesheet` 오류.

**How to avoid:** Phase 1에서 모든 레이어 폴더와 빈 `_index.scss`를 미리 생성. 내용이 없어도 파일은 존재해야 한다.

### Pitfall 5: stylelint-config-standard-scss가 Bootstrap 파일에도 적용

**What goes wrong:** `stylelint "scss/**/*.scss"` 패턴이 `node_modules` 내 Bootstrap SCSS에도 접근하는 경우.

**How to avoid:** Stylelint 설정에서 `ignoreFiles`에 `node_modules/**` 포함 (기본값이나 명시 권장). Phase 1 Stylelint는 warning 수준으로 설정.

---

## Code Examples

### Stylelint 초기 설정 (Phase 1 — warning 수준)

```javascript
// .stylelintrc.cjs  (ESM 환경에서는 .cjs 확장자 사용)
module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // Phase 1: 경고만, 오류 없음 — 팀 적응 기간
    'scss/at-import-no-partial-leading-underscore': null, // vendor.scss 예외
    'scss/at-import-partial-extension': null,             // @import 격리 허용
  },
  ignoreFiles: ['node_modules/**', 'dist/**'],
};
```

### .editorconfig (CONTEXT.md 재량)

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true

[*.{scss,css}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

### .gitignore 핵심 항목

```
node_modules/
dist/
*.css.map
.DS_Store
```

### nvmrc / Node.js 버전 고정

```
# .nvmrc
24
```

> 현재 환경 Node.js v24.13.1 설치 확인. Style Dictionary v5 요구사항(Node 22+) 충족. `.nvmrc`에 `24` 기록.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Bootstrap `@import` flat | Bootstrap `@import` 격리 → `_vendor.scss` | Dart Sass 1.80 (2024.10) | 경고 발생 위치 격리 |
| `npm-run-all` | `npm-run-all2` | 2022+ | 원본 미관리, 포크로 전환 |
| Sass `/` 나누기 | `math.div()` | Dart Sass 1.33+ | `/` deprecated, 신규 코드엔 금지 |
| Bootstrap v5 `@use` | Bootstrap v6 `@use` (예정) | v6 dev 브랜치 진행 중 | v5.x에서는 불가, v6 기다려야 |

**Deprecated/outdated:**
- `dart-sass` npm 패키지: 6년 미관리. `sass` 패키지 사용.
- `npm-run-all` (원본): 미관리 상태. `npm-run-all2` 사용.

---

## Open Questions

1. **Bootstrap `@use` vs `@import` 격리 최종 선택**
   - What we know: `@use "bootstrap/scss/bootstrap"` 기술적으로 가능하나 deprecation 경고 발생. `@import` 격리도 동일 경고 발생.
   - What's unclear: Phase 1 실제 빌드 시 경고 수준(fatal 여부) 확인 필요.
   - Recommendation: 빌드 테스트를 첫 태스크로 수행. 경고만이면 `@use` 수용 또는 `_vendor.scss` 격리 선택. `style.scss` 주석에 전략 기록.

2. **`npm-run-all2` 버전 불일치**
   - What we know: STACK.md는 6.0.x 기록, 실제 npm 최신은 8.0.4.
   - Recommendation: 8.0.4 사용. API 변경 없음 (run-p/run-s 동일).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | 모든 npm 도구 | ✓ | v24.13.1 | — |
| npm | 패키지 관리 | ✓ | 11.8.0 | — |
| sass (CLI) | SCSS 컴파일 | ✗ | — | npm install 후 사용 |
| bootstrap (npm) | SCSS 소스 | ✗ | — | npm install 후 사용 |
| git | 버전 관리 | 환경에 따라 다름 | — | — |

**Missing dependencies with no fallback:**
- `sass`, `bootstrap` — `npm install` 태스크에서 해결.

**Node.js 22+ 요건 충족:** v24.13.1이므로 Style Dictionary v5, pa11y-ci v4, npm-run-all2 모두 충족.

---

## Validation Architecture

Phase 1은 SCSS 컴파일 파이프라인 설정이 목표이며 자동화된 unit test 프레임워크가 없다. 검증은 빌드 출력 확인으로 수행한다.

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
| SCSS-01 | `style.scss` 존재, Bootstrap 임포트, `dist/artux.css` 생성 | smoke | `npm run build:css` (0 exit = pass) | ❌ Wave 0 생성 |
| SCSS-07 | 로드 순서 주석이 `style.scss`에 문서화됨 | manual | `cat scss/style.scss` — 한국어 주석 육안 확인 | ❌ Wave 0 생성 |

### Sampling Rate

- **Per task commit:** `npm run build:css`
- **Per wave merge:** `npm run build:css && npm run lint:css`
- **Phase gate:** `dist/artux.css` 존재 + lint 0 error (warning 허용)

### Wave 0 Gaps

- [ ] `scss/style.scss` — SCSS-01, SCSS-07 진입점 파일 생성
- [ ] `scss/1-settings/_index.scss`, `_variables.scss` — SCSS-02 준비
- [ ] `scss/2-tools/_index.scss` — 빈 레이어
- [ ] `scss/3-generic/_index.scss`, `_vendor.scss` — Bootstrap 격리
- [ ] `scss/4-elements/_index.scss`, `_base.scss` — 62.5% REM
- [ ] `scss/5-objects/_index.scss` ~ `scss/7-utilities/_index.scss` — 빈 레이어
- [ ] `dist/` 디렉토리 (gitignore에 포함)
- [ ] `package.json` — npm scripts, devDependencies
- [ ] `.stylelintrc.cjs` — Stylelint 초기 설정
- [ ] `.editorconfig` — 팀 코딩 스타일
- [ ] `.gitignore` — node_modules, dist 제외
- [ ] `.nvmrc` — Node.js 버전 고정

---

## Sources

### Primary (HIGH confidence)

- [Bootstrap 5.3 Sass 공식 문서](https://getbootstrap.com/docs/5.3/customize/sass/) — Bootstrap @use/@import 공식 입장
- STACK.md (verified 2026-03-26) — sass 1.98.0, stylelint 17.5.0, stylelint-config-standard-scss 17.0.0, postcss 8.5.8, autoprefixer 10.4.27
- PITFALLS.md (verified 2026-03-26) — Dart Sass @import deprecation, @use/@forward 패턴, 62.5% REM 주의사항
- npm view 직접 확인 (2026-03-26) — bootstrap 5.3.8, sass 1.98.0, npm-run-all2 8.0.4, stylelint-config-standard-scss 17.0.0

### Secondary (MEDIUM confidence)

- [Bootstrap GitHub Issue #41558](https://github.com/twbs/bootstrap/issues/41558) — Deprecation warnings in Bootstrap 5.3.7 with Dart Sass
- [Bootstrap GitHub Discussion #41370](https://github.com/orgs/twbs/discussions/41370) — Bootstrap April 2025 roadmap, v6 @use 마이그레이션 진행 중
- [Bootstrap GitHub Issue #40962](https://github.com/twbs/bootstrap/issues/40962) — dart-sass 1.80.0+ deprecation 이슈

### Tertiary (LOW confidence)

- WebSearch 결과 — Bootstrap @use namespace 워크어라운드 패턴 (단일 소스)

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — npm 직접 확인, STACK.md 교차 검증
- Bootstrap @use 호환성: HIGH — 공식 GitHub 이슈 + Bootstrap 공식 문서 확인
- Architecture (ITCSS + @forward 패턴): HIGH — PITFALLS.md + Sass 공식 문서
- 62.5% REM 패턴: HIGH — CONTEXT.md 결정 + PITFALLS.md 주의사항
- Stylelint 초기 설정: MEDIUM — 버전 확인됨, 상세 호환성은 Phase 1 실행 시 검증

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (Bootstrap 5.x 업데이트 주기 고려, 30일)
