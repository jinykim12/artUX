# Architecture Patterns

**Project:** artpqUX 퍼블리싱 가이드 시스템
**Researched:** 2026-03-26
**Confidence:** HIGH (ITCSS/BEM patterns), MEDIUM (Eleventy integration), HIGH (token pipeline)

---

## Overview

Two subsystems live in the same repository and must be understood as separate concerns:

| Subsystem | What it is | Output |
|-----------|-----------|--------|
| `scss/` | ITCSS source — the actual deliverable | Compiled CSS for starter kit |
| `docs/` | Eleventy documentation site | Static HTML site for team reference |

The SCSS system is the primary artifact. The Eleventy site documents and previews it. Style Dictionary bridges both by generating both SCSS variables and CSS custom properties from a single JSON token source.

---

## 1. ITCSS 7-Layer Directory Structure

### Exact directory tree

```
scss/
├── 1-settings/
│   ├── _colors.scss          # 색상 팔레트 변수 ($color-primary 등)
│   ├── _typography.scss      # 폰트 패밀리, 웨이트, 라인높이
│   ├── _spacing.scss         # 간격 스케일 ($spacing-1: 0.4rem 등)
│   ├── _breakpoints.scss     # 반응형 브레이크포인트
│   ├── _grid.scss            # 그리드 컬럼 수, 거터
│   ├── _z-index.scss         # z-index 스케일 맵
│   └── _index.scss           # @forward 배럴
│
├── 2-tools/
│   ├── _mixins.scss          # 반응형, 말줄임, clearfix 등 믹스인
│   ├── _functions.scss       # rem(), em() 변환 함수
│   ├── _a11y.scss            # 접근성 믹스인 (visually-hidden 등)
│   └── _index.scss
│
├── 3-generic/
│   ├── _reset.scss           # 브라우저 기본 스타일 초기화
│   ├── _box-sizing.scss      # *, *::before, *::after { box-sizing: border-box }
│   ├── _root.scss            # :root CSS 커스텀 프로퍼티 (토큰 출력)
│   └── _index.scss
│
├── 4-elements/
│   ├── _headings.scss        # h1–h6 기본 스타일 (클래스 없음)
│   ├── _links.scss           # a 기본 스타일
│   ├── _lists.scss           # ul, ol 기본 스타일
│   ├── _tables.scss          # table 기본 스타일
│   ├── _forms.scss           # input, button, select, textarea 기본 스타일
│   └── _index.scss
│
├── 5-objects/
│   ├── _container.scss       # .o-container (최대 너비 + 좌우 패딩)
│   ├── _grid.scss            # .o-grid (CSS Grid 래퍼)
│   ├── _flex.scss            # .o-flex (Flexbox 래퍼)
│   ├── _media.scss           # .o-media (이미지 + 텍스트 패턴)
│   ├── _section.scss         # .o-section (섹션 패딩 패턴)
│   └── _index.scss
│
├── 6-components/
│   ├── _button.scss          # .c-button, .c-button--primary 등
│   ├── _form.scss            # .c-form, .c-form__field, .c-form__label 등
│   ├── _card.scss            # .c-card, .c-card__header, .c-card__body 등
│   ├── _table.scss           # .c-table (장식된 테이블)
│   ├── _modal.scss           # .c-modal, .c-modal__overlay 등
│   ├── _tab.scss             # .c-tab, .c-tab__item, .c-tab__panel 등
│   ├── _pagination.scss      # .c-pagination, .c-pagination__item 등
│   ├── _breadcrumb.scss      # .c-breadcrumb, .c-breadcrumb__item 등
│   ├── _badge.scss           # .c-badge
│   ├── _alert.scss           # .c-alert, .c-alert--success 등
│   └── _index.scss
│
├── 7-utilities/
│   ├── _display.scss         # .u-hidden, .u-sr-only, .u-visible
│   ├── _spacing.scss         # .u-mt-1, .u-mb-2 등 (생성형 또는 수동)
│   ├── _text.scss            # .u-text-center, .u-text-bold 등
│   ├── _color.scss           # .u-color-primary 등 (최소한으로 사용)
│   └── _index.scss
│
└── main.scss                 # 모든 레이어를 @use로 가져오는 진입점
```

### 핵심 규칙

- 파일명은 항상 `_` 언더스코어로 시작 (파셜). `main.scss`만 예외.
- 레이어 번호 폴더 접두사는 Git에서 정렬 순서를 보장하며, 개발자가 레이어 경계를 한눈에 파악하게 한다.
- Settings, Tools 레이어는 실제 CSS를 출력하면 안 된다(변수·믹스인·함수만).
- Objects(`o-`), Components(`c-`), Utilities(`u-`) 에 BEMIT 네임스페이스 접두사를 사용한다.

---

## 2. SCSS @use / @forward 모듈 시스템

### 배럴(Barrel) 패턴

각 레이어 폴더에 `_index.scss`를 두고, 해당 레이어의 모든 파셜을 `@forward`로 재내보낸다.

```scss
// scss/1-settings/_index.scss
@forward 'colors';
@forward 'typography';
@forward 'spacing';
@forward 'breakpoints';
@forward 'grid';
@forward 'z-index';
```

`main.scss`는 각 레이어의 인덱스만 `@use`로 가져온다.

```scss
// scss/main.scss
// Settings와 Tools는 CSS를 출력하지 않으므로 @use로만 가져옴
// (레이어 3–7이 내부적으로 @use 해서 사용)
@use '1-settings' as settings;
@use '2-tools' as tools;
@use '3-generic';
@use '4-elements';
@use '5-objects';
@use '6-components';
@use '7-utilities';
```

### 레이어 간 의존성 처리

Settings와 Tools 레이어를 다른 레이어 파일에서 사용할 때:

```scss
// scss/6-components/_button.scss
@use '../1-settings' as settings;
@use '../2-tools' as tools;

.c-button {
  padding: tools.rem(8px) tools.rem(16px);
  background-color: settings.$color-primary;
  border-radius: settings.$border-radius-md;
}
```

### 반드시 지켜야 할 규칙

| 규칙 | 이유 |
|------|------|
| `@import` 절대 금지 | Dart Sass 3.0에서 제거 예정 (1.80.0에서 deprecated) |
| `as *` 사용 금지 | 네임스페이스 무력화로 충돌 발생 위험 |
| 네임스페이스는 레이어 이름 약어 사용 | `settings.$color-primary` — 출처가 명확 |
| 컴포넌트 변수는 해당 파셜 안에서만 | 컴포넌트 간 의존성이 생기면 Settings로 이동 |
| `@forward`에서 `hide` 활용 | 내부 구현 변수를 외부에 노출하지 않을 때 |

---

## 3. 디자인 토큰 파이프라인

### 전체 흐름

```
tokens/
  base.json           (단일 소스 오브 트루스)
      |
      v
Style Dictionary v4   (style-dictionary.config.mjs)
      |
      +-----> scss/1-settings/_tokens.scss   ($color-primary: #...)
      |
      +-----> scss/3-generic/_root.scss      (:root { --color-primary: #... })
      |
      +-----> docs/src/_data/tokens.json     (Eleventy 토큰 페이지용 데이터)
```

### 토큰 JSON 구조

```json
// tokens/base.json
{
  "color": {
    "primary": { "$value": "#1A6EFF", "$type": "color" },
    "secondary": { "$value": "#F5A623", "$type": "color" },
    "gray": {
      "100": { "$value": "#F7F8FA", "$type": "color" },
      "900": { "$value": "#1A1D23", "$type": "color" }
    }
  },
  "spacing": {
    "1": { "$value": "0.4rem", "$type": "dimension" },
    "2": { "$value": "0.8rem", "$type": "dimension" },
    "4": { "$value": "1.6rem", "$type": "dimension" },
    "8": { "$value": "3.2rem", "$type": "dimension" }
  },
  "font": {
    "size": {
      "sm":  { "$value": "1.2rem", "$type": "dimension" },
      "md":  { "$value": "1.6rem", "$type": "dimension" },
      "lg":  { "$value": "2.0rem", "$type": "dimension" },
      "xl":  { "$value": "2.4rem", "$type": "dimension" }
    },
    "weight": {
      "regular": { "$value": "400", "$type": "fontWeight" },
      "bold":    { "$value": "700", "$type": "fontWeight" }
    }
  }
}
```

**참고:** 62.5% REM 트릭을 사용하므로 (`html { font-size: 62.5% }`) 모든 rem 값은 `1rem = 10px` 기준으로 정의한다. 단, 외부 라이브러리 연동 시 충돌에 주의.

### Style Dictionary v4 설정

```js
// style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'scss/1-settings/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
          options: { outputReferences: true }
        }
      ]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'scss/3-generic/',
      files: [
        {
          destination: '_root.scss',
          format: 'css/variables',
          options: {
            selector: ':root',
            outputReferences: true
          }
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'docs/src/_data/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    }
  }
})

await sd.buildAllPlatforms()
```

### 생성 결과 예시

```scss
// 자동 생성됨: scss/1-settings/_tokens.scss
$color-primary: #1A6EFF;
$spacing-1: 0.4rem;
$font-size-md: 1.6rem;
```

```css
/* 자동 생성됨: scss/3-generic/_root.scss */
:root {
  --color-primary: #1A6EFF;
  --spacing-1: 0.4rem;
  --font-size-md: 1.6rem;
}
```

**이 파일들은 git에 커밋하되, 직접 편집하지 않는다.** `tokens/base.json`만 편집 지점.

---

## 4. Eleventy 문서 사이트 구조

### 디렉토리 트리

```
docs/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk          # HTML shell (head, nav, footer)
│   │   │   ├── doc.njk           # 문서 페이지 (사이드바 포함)
│   │   │   └── component.njk     # 컴포넌트 미리보기 페이지
│   │   └── components/           # Nunjucks 매크로 (재사용 UI)
│   │       ├── preview.njk       # 컴포넌트 미리보기 iframe 래퍼
│   │       ├── code-block.njk    # 코드 하이라이팅 블록
│   │       └── token-table.njk   # 토큰 색상/간격 테이블
│   │
│   ├── _data/
│   │   ├── tokens.json           # Style Dictionary 자동 생성
│   │   ├── navigation.js         # 사이드바 내비게이션 구조
│   │   └── site.json             # 사이트 메타 (타이틀, 베이스URL 등)
│   │
│   ├── tokens/
│   │   ├── index.njk             # 토큰 개요
│   │   ├── colors.njk            # 색상 팔레트 페이지
│   │   ├── typography.njk        # 타이포그래피 스케일
│   │   └── spacing.njk           # 간격 스케일
│   │
│   ├── conventions/
│   │   ├── index.njk             # 컨벤션 개요
│   │   ├── bem.njk               # BEM 네이밍 규칙
│   │   ├── itcss.njk             # ITCSS 레이어 설명
│   │   └── coding-style.njk     # 들여쓰기, 따옴표 등
│   │
│   ├── components/
│   │   ├── index.njk             # 컴포넌트 목록
│   │   ├── button.njk            # 버튼 컴포넌트 문서
│   │   ├── form.njk              # 폼 컴포넌트 문서
│   │   ├── card.njk              # 카드 컴포넌트 문서
│   │   ├── table.njk             # 테이블 컴포넌트 문서
│   │   ├── modal.njk             # 모달 컴포넌트 문서
│   │   ├── tab.njk               # 탭 컴포넌트 문서
│   │   ├── pagination.njk        # 페이지네이션 컴포넌트 문서
│   │   └── breadcrumb.njk        # 브레드크럼 컴포넌트 문서
│   │
│   ├── accessibility/
│   │   ├── index.njk             # 접근성 개요
│   │   ├── checklist.njk         # KWCAG/WCAG 2.1 AA 체크리스트
│   │   └── patterns.njk          # 접근성 패턴 (skip nav, aria 등)
│   │
│   └── index.njk                 # 홈 페이지
│
├── .eleventy.js                  # Eleventy 설정
└── package.json                  # docs 전용 또는 루트 공유
```

### 레이아웃 체인

```
base.njk          (HTML shell: <!DOCTYPE>, head, nav, footer)
  └── doc.njk     (두 컬럼: 사이드바 + 메인 콘텐츠)
        └── component.njk  (컴포넌트 페이지: 미리보기 + 코드)
```

### .eleventy.js 핵심 설정

```js
// docs/.eleventy.js
module.exports = function(eleventyConfig) {
  // 컴파일된 CSS를 _site에 직접 연결 (복사 아님)
  eleventyConfig.setUseGitIgnore(false)

  // CSS 변경 시 BrowserSync 자동 새로고침
  eleventyConfig.setBrowserSyncConfig({
    files: './_site/css/**/*.css'
  })

  // 정적 파일 passthrough
  eleventyConfig.addPassthroughCopy('src/assets')

  // SCSS watch (Eleventy가 직접 컴파일하지 않고, 외부 sass 프로세스가 담당)
  eleventyConfig.addWatchTarget('../scss/')

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
}
```

---

## 5. 컴포넌트 HTML 스니펫과 SCSS 공존 구조

### 접근 방식: SCSS + HTML 스니펫을 같은 레포에서 관리

컴포넌트 파일들은 `scss/6-components/`에 있고, 대응하는 HTML 스니펫은 `snippets/` 폴더에 명확히 매핑된다.

```
snippets/
├── button/
│   ├── button-primary.html
│   ├── button-secondary.html
│   └── button-group.html
├── form/
│   ├── form-basic.html
│   ├── form-input.html
│   └── form-select.html
├── card/
│   ├── card-basic.html
│   └── card-horizontal.html
├── table/
│   └── table-basic.html
├── modal/
│   └── modal-basic.html
├── tab/
│   └── tab-basic.html
├── pagination/
│   └── pagination-basic.html
└── breadcrumb/
    └── breadcrumb-basic.html
```

### Eleventy에서 스니펫 읽기

Eleventy의 `_data` 기능과 커스텀 shortcode로 스니펫 파일을 읽어서 문서 페이지에 코드 + 미리보기를 함께 표시한다.

```js
// docs/.eleventy.js 내 shortcode 등록
const fs = require('fs')
const path = require('path')

eleventyConfig.addPairedShortcode('preview', function(content, title) {
  return `
    <div class="c-component-preview">
      <div class="c-component-preview__title">${title}</div>
      <div class="c-component-preview__demo">${content}</div>
      <details class="c-component-preview__code">
        <summary>코드 보기</summary>
        <pre><code class="language-html">${escapeHtml(content)}</code></pre>
      </details>
    </div>
  `
})
```

컴포넌트 문서 페이지에서 사용:

```njk
{# docs/src/components/button.njk #}
---
layout: layouts/component.njk
title: 버튼 컴포넌트
---

{% preview "기본 버튼" %}
<button class="c-button c-button--primary" type="button">확인</button>
{% endpreview %}

{% preview "버튼 그룹" %}
<div class="c-button-group">
  <button class="c-button c-button--secondary" type="button">취소</button>
  <button class="c-button c-button--primary" type="button">저장</button>
</div>
{% endpreview %}
```

---

## 6. npm 스크립트 아키텍처

### 전체 레포 루트 package.json 스크립트

```json
{
  "scripts": {
    "tokens:build": "node style-dictionary.config.mjs",

    "sass:build": "sass scss/main.scss dist/artux.css --style=compressed --no-source-map",
    "sass:watch": "sass scss/main.scss dist/artux.css --watch",
    "sass:build:dev": "sass scss/main.scss dist/artux.css --style=expanded --source-map",

    "docs:build": "npm run sass:build && cd docs && npx @11ty/eleventy",
    "docs:serve": "sass scss/main.scss docs/_site/css/artux.css --watch & cd docs && npx @11ty/eleventy --serve",

    "lint:scss": "stylelint 'scss/**/*.scss'",
    "lint:html": "htmlhint 'snippets/**/*.html'",
    "lint": "npm run lint:scss && npm run lint:html",

    "tokens": "npm run tokens:build",
    "build": "npm run tokens:build && npm run sass:build && npm run docs:build",
    "start": "npm run tokens:build && npm run docs:serve",

    "a11y": "pa11y-ci docs/_site/**/*.html",
    "test": "npm run lint && npm run a11y"
  }
}
```

### 스크립트 의존성 흐름

```
tokens:build          (JSON → SCSS 변수 + CSS 커스텀 프로퍼티 생성)
      |
      v
sass:build            (scss/main.scss → dist/artux.css)
      |
      v
docs:build            (Eleventy → docs/_site/)
```

### 주요 설계 결정

- `sass` CLI를 직접 사용 (플러그인 없이). `eleventy-sass` 플러그인은 편리하지만 빌드 파이프라인이 Eleventy에 결합(lock-in)된다.
- `&` 연산자로 병렬 watch 실행. `npm-run-all`의 `--parallel`은 Eleventy `addWatchTarget`과 충돌하는 알려진 이슈가 있다.
- `tokens:build`는 항상 가장 먼저 실행 — 생성된 `_tokens.scss`와 `_root.scss` 없이는 SCSS 컴파일이 실패한다.
- `dist/` 폴더는 스타터 킷 배포용 컴파일 결과물. `docs/_site/css/`는 문서 사이트용 CSS (서로 다른 경로).

---

## 7. Stylelint 설정 구조

### 패키지

```bash
npm install -D stylelint stylelint-config-standard-scss stylelint-scss stylelint-selector-bem-pattern
```

### .stylelintrc.json

```json
{
  "plugins": [
    "stylelint-scss",
    "stylelint-selector-bem-pattern"
  ],
  "extends": [
    "stylelint-config-standard-scss"
  ],
  "rules": {
    "plugin/selector-bem-pattern": {
      "preset": "bem",
      "componentName": "[a-z][-a-z0-9]+",
      "componentSelectors": {
        "initial": "^\\.{componentName}(__([-a-z0-9]+))?(--[-a-z0-9]+)?$",
        "combined": "^\\.{componentName}(__([-a-z0-9]+))?(--[-a-z0-9]+)?$"
      },
      "utilitySelectors": "^\\.u-[a-z][-a-z0-9]+$"
    },

    "scss/at-rule-no-unknown": true,
    "scss/selector-no-redundant-nesting-selector": true,
    "scss/no-global-function-names": true,

    "selector-class-pattern": [
      "^(c-|o-|u-)[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$",
      {
        "message": "클래스명은 BEMIT 패턴(c-, o-, u- 접두사)을 따라야 합니다."
      }
    ],

    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "no-duplicate-selectors": true,

    "max-nesting-depth": [2, {
      "ignore": ["blockless-at-rules", "pseudo-classes"]
    }],

    "scss/dollar-variable-pattern": "^[a-z][a-z0-9-]*$",
    "scss/percent-placeholder-pattern": "^[a-z][a-z0-9-]*$"
  },
  "overrides": [
    {
      "files": ["scss/1-settings/**/*.scss", "scss/2-tools/**/*.scss"],
      "rules": {
        "plugin/selector-bem-pattern": null
      }
    },
    {
      "files": ["scss/3-generic/**/*.scss"],
      "rules": {
        "selector-class-pattern": null
      }
    }
  ]
}
```

### 레이어별 규칙 예외 처리

Settings와 Tools 레이어는 선택자를 출력하지 않으므로 BEM 패턴 검사에서 제외. Generic 레이어는 리셋/정규화 코드로 BEMIT 패턴을 따르지 않는 선택자가 많으므로 `selector-class-pattern` 제외.

---

## 8. 전체 레포지토리 루트 구조

```
artux/
├── scss/                         # ITCSS SCSS 소스 (메인 산출물)
│   ├── 1-settings/
│   ├── 2-tools/
│   ├── 3-generic/
│   ├── 4-elements/
│   ├── 5-objects/
│   ├── 6-components/
│   ├── 7-utilities/
│   └── main.scss
│
├── tokens/                       # 디자인 토큰 단일 소스
│   └── base.json
│
├── snippets/                     # HTML 스니펫 (컴포넌트별)
│   ├── button/
│   ├── form/
│   └── ...
│
├── dist/                         # 컴파일된 CSS (git 추적, 스타터킷용)
│   ├── artux.css
│   └── artux.css.map
│
├── starter/                      # 신규 프로젝트 스타터 킷
│   ├── scss/                     # ITCSS 뼈대 (컴포넌트 없는 최소 구조)
│   ├── index.html
│   └── README.md
│
├── docs/                         # Eleventy 문서 사이트
│   ├── src/
│   ├── .eleventy.js
│   └── _site/                    # 빌드 출력 (gitignore)
│
├── style-dictionary.config.mjs   # 토큰 빌드 설정
├── .stylelintrc.json
├── .htmlhintrc
├── package.json
├── .gitignore
└── .nvmrc
```

---

## 9. 데이터 흐름 다이어그램

```
[디자이너 시안]
      |
      v
tokens/base.json                  ← 팀이 편집하는 유일한 토큰 소스
      |
      v (npm run tokens:build)
      +---> scss/1-settings/_tokens.scss   (SCSS 변수)
      +---> scss/3-generic/_root.scss      (CSS 커스텀 프로퍼티)
      +---> docs/src/_data/tokens.json     (문서 사이트 데이터)
      |
      v (npm run sass:build)
scss/main.scss
  @use 1-settings  ← _tokens.scss 포함
  @use 2-tools
  @use 3-generic   ← _root.scss 포함
  @use 4-elements
  @use 5-objects
  @use 6-components
  @use 7-utilities
      |
      v
dist/artux.css                    ← 스타터킷에 포함되는 컴파일 결과
      |
      v (docs 빌드 시 복사)
docs/_site/css/artux.css          ← 문서 사이트 스타일

snippets/**/*.html                ← 컴포넌트 HTML 스니펫
      |
      v (Eleventy shortcode)
docs/_site/components/**/*.html   ← 코드 + 미리보기 포함 문서 페이지
```

---

## 안티패턴 — 반드시 피할 것

### 안티패턴 1: Settings 레이어에서 CSS 출력
**문제:** `1-settings/_colors.scss`에 `.text-red { color: red; }` 작성.
**결과:** 특이성 관리가 무너지고 ITCSS 순서 보장이 깨짐.
**대신:** Settings는 `$변수`와 CSS 커스텀 프로퍼티 할당 변수만. 실제 CSS는 최소 Generic부터.

### 안티패턴 2: Components에서 직접 hex 색상 사용
**문제:** `_button.scss`에 `background-color: #1A6EFF`.
**결과:** 토큰 변경 시 전체 컴포넌트를 수작업으로 업데이트해야 함.
**대신:** 항상 `settings.$color-primary` 또는 CSS 커스텀 프로퍼티 `var(--color-primary)` 사용.

### 안티패턴 3: `@import`를 신규 파일에 사용
**문제:** Dart Sass 1.80.0에서 deprecated, 3.0에서 제거.
**결과:** 미래 컴파일 실패, 글로벌 네임스페이스 오염.
**대신:** `@use`와 `@forward`만 사용.

### 안티패턴 4: 4px 이외의 임의 간격값
**문제:** `padding: 7px 13px` 같은 임의 값.
**결과:** 디자인 일관성 붕괴, 토큰 시스템 무의미화.
**대신:** 4px 기반 스케일 토큰만 사용 (`$spacing-1: 0.4rem`, `$spacing-2: 0.8rem`, `$spacing-4: 1.6rem`...).

### 안티패턴 5: 컴포넌트 레이어에 레이아웃 패턴 중복
**문제:** 여러 컴포넌트에 동일한 flex 컨테이너 패턴이 중복.
**결과:** Objects 레이어가 의미 없어지고 중복 CSS 증가.
**대신:** 레이아웃 패턴은 `5-objects/`에 두고 컴포넌트는 `@extend` 대신 HTML에서 `o-grid c-card` 방식으로 조합.

---

## 확장성 고려사항

| 관심사 | 현 구조에서 | 컴포넌트 수 2배 증가 시 |
|--------|-----------|----------------------|
| 컴포넌트 추가 | `scss/6-components/`에 파셜 하나 추가, `_index.scss`에 `@forward` 추가 | 동일한 방식으로 확장 — 구조 변경 없음 |
| 새 토큰 카테고리 | `tokens/base.json`에 추가 후 `npm run tokens:build` | 동일. SCSS, CSS, 문서 데이터 자동 갱신 |
| 새 문서 섹션 | `docs/src/`에 폴더 + `navigation.js` 업데이트 | 동일 |
| 새 브레이크포인트 | `scss/1-settings/_breakpoints.scss` + `scss/2-tools/_mixins.scss` | 동일 |
| 멀티 프로젝트 테마 | Style Dictionary 플랫폼에 프로젝트별 출력 경로 추가 | `tokens/project-a.json`으로 토큰 오버라이드 가능 |

---

## Sources

- [ITCSS: Scalable and Maintainable CSS Architecture — xfive](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture)
- [Sass: Breaking Change: @import and global built-in functions](https://sass-lang.com/documentation/breaking-changes/import/)
- [Understanding @use and @forward in Dart Sass — mamutlove](https://mamutlove.com/en/blog/use-and-forward-with-dart-sass/)
- [Style Dictionary Configuration Reference](https://styledictionary.com/reference/config/)
- [Style Dictionary Built-in Formats](https://styledictionary.com/reference/hooks/formats/predefined/)
- [Eleventy Layouts Documentation](https://www.11ty.dev/docs/layouts/)
- [Using SASS With Eleventy — jkc.codes](https://jkc.codes/blog/using-sass-with-eleventy/)
- [eleventy-plugin-code-demo — GitHub](https://github.com/AleksandrHovhannisyan/eleventy-plugin-code-demo)
- [stylelint-selector-bem-pattern — GitHub](https://github.com/simonsmith/stylelint-selector-bem-pattern)
- [The 62.5% Font Size Trick — Aleksandr Hovhannisyan](https://www.aleksandrhovhannisyan.com/blog/62-5-percent-font-size-trick/)
- [Modular code with Nunjucks and Eleventy — Webstoemp](https://www.webstoemp.com/blog/modular-code-nunjucks-eleventy/)
- [BEMIT: ITCSS + BEM — DEV Community](https://dev.to/apium_hub/bemit-itcss-bem-75o)
