# Technology Stack

**Project:** artpqUX 퍼블리싱 가이드 시스템
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH (all versions verified via npm/official docs, March 2026)

---

## Recommended Stack

### Documentation Site Generator

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@11ty/eleventy` | **3.1.5** (stable) | Static doc site generator | HTML/CSS팀에 최적 — 프레임워크 없는 순수 HTML 출력, Nunjucks 내장, JS 없이 완전 동작. ESM 기반 v3 stable. v4 alpha 존재하나 아직 production 비권장 |

**Eleventy version decision:** v3.1.5 사용. v3.0.0(2024년 10월 정식)→v3.1.0(2025년 5월, 빌드 11% 빠름/22% 경량화)→v3.1.5 현재 stable. v4.0.0-alpha.6 존재하나 alpha이므로 제외.

**Template language:** Nunjucks (`.njk`) — Eleventy 내장, 반복/조건/매크로 지원, HTML팀 학습 곡선 낮음. Liquid 대신 Nunjucks 이유: JavaScript in front matter 지원 및 shortcodes 풀 지원.

---

### SCSS Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `sass` | **1.98.0** | SCSS 컴파일러 (Dart Sass) | 공식 npm 패키지명은 `sass`. `dart-sass` 패키지(1.25.0, 6년 미관리)와 혼동 금지. `@use`/`@forward` 완전 지원, `@import` deprecated 처리. 현재 Dart Sass 표준 |
| `postcss` | **8.5.8** | CSS 후처리 파이프라인 | Autoprefixer 실행 플랫폼. 공공기관 납품에서 구형 브라우저 지원 필요 시 필수 |
| `autoprefixer` | **10.4.27** | 벤더 프리픽스 자동 추가 | Can I Use 데이터 기반 자동 프리픽스. 공공기관 IE/구형 Edge 지원 요건 대응 |
| `postcss-cli` | **latest** | PostCSS CLI 실행 | npm scripts에서 PostCSS 단독 실행 시 필요 |

**npm 패키지명 주의:** `dart-sass`(구버전 비권장)가 아닌 `sass`를 설치해야 함. `sass-embedded` (동일 버전 1.98.0)는 네이티브 바이너리 버전으로 빌드 속도 약간 빠르나 `sass` 순수 JS 버전으로도 소규모 프로젝트 충분.

**Eleventy-SCSS 연동 방법:** 외부 플러그인 없이 Eleventy 공식 `addExtension` API 사용 권장 (고신뢰):

```javascript
// eleventy.config.js
import path from "node:path";
import * as sass from "sass";

export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) return; // 파셜 파일 제외
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });
      this.addDependencies(inputPath, result.loadedUrls);
      return async () => result.css;
    },
  });
};
```

대안 플러그인 `@jgarber/eleventy-plugin-sass`(zero-config)도 존재하나, 공식 방식이 의존성 최소화와 커스터마이징 면에서 우월.

---

### Linting

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `stylelint` | **17.5.0** | CSS/SCSS 린팅 코어 | 2025년 3월 현재 최신 stable. v16부터 flat config 지원, v17에서 안정화 |
| `stylelint-config-standard-scss` | **17.0.0** | SCSS 표준 ruleset | stylelint-scss + stylelint-config-standard 통합 공식 config. `@use`/`@forward` 규칙 포함 |
| `stylelint-selector-bem-pattern` | **4.0.1** | BEM 셀렉터 패턴 강제 | postcss-bem-linter 기반. BEM 블록/엘리먼트/수정자 패턴 정규식 검증. 최종 업데이트 2년 전이나 Stylelint 17 peer dep 충족 확인 필요 |

**BEM 린팅 전략:** `stylelint-selector-bem-pattern`이 1차 선택이나, Stylelint 17 호환성이 불명확한 경우 대안: Stylelint 내장 `selector-class-pattern` 규칙에 BEM 정규식 직접 적용:

```json
"selector-class-pattern": [
  "^[a-z][a-z0-9-]*(__[a-z][a-z0-9-]*)?(--[a-z][a-z0-9-]*)?$",
  { "message": "BEM 네이밍 규칙 위반" }
]
```

이 방식은 외부 플러그인 불필요, Stylelint 내장 기능만 사용. Phase 1에서 호환성 검증 후 결정.

**Prettier 통합:** `stylelint-prettier` 사용 고려 가능하나, 팀 코딩 스타일(세미콜론 없음, 싱글 쿼트)이 Prettier 기본 설정과 충돌할 수 있으므로 Stylelint 단독으로 포맷 규칙 관리 권장.

---

### Accessibility Testing

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `pa11y-ci` | **4.1.0** | 접근성 자동 테스트 (CI) | MIT 라이선스, CLI 우선, URL 목록/사이트맵 기반 배치 테스트. Node.js 20+ 필요. WCAG 2.1 AA 지원 |
| `pa11y` | **9.x** | pa11y-ci 의존성 | pa11y-ci 4.x가 pa11y 9 + Puppeteer 24 기반 |

**pa11y-ci 선택 이유:** 공공기관 납품용 WCAG 2.1 AA 검증 → 자동화 CI 통합 필수. axe-core 대비 장점: 추가 test runner(Jest/Mocha) 불필요, 순수 CLI, npm script 통합 단순. 단, pa11y-ci는 WCAG 이슈의 약 30-40% 자동 감지(axe-core는 약 57%) — 자동 테스트는 보조 수단이며 수동 검토 필수.

**대안으로 axe-core 고려 시점:** JavaScript 컴포넌트 테스트나 더 높은 감지율 필요 시. 현재 프로젝트 범위(HTML/CSS 순수 퍼블리싱)에서는 pa11y-ci로 충분.

**Node.js 요건:** pa11y-ci 4.x는 Node.js 20+ (짝수 안정 버전) 필요. 팀 환경 확인 필요.

---

### Design Token Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `style-dictionary` | **5.4.0** | 디자인 토큰 빌드 시스템 | JSON 단일 소스 → SCSS 변수 + CSS 커스텀 프로퍼티 동시 생성. v5 (2025년 현재)가 현행 stable major. Node.js 22+ 필요 |

**Style Dictionary v5 주요 변경사항:**
- Node.js 22.0.0 이상 필요 (Set.prototype.union 활용)
- 토큰 참조가 실제 디자인 토큰 값만 참조 가능 (non-token leaf 노드 참조 불가)
- DTCG (Design Tokens Community Group) 포맷 호환성 진행 중
- v5.4.0이 2026년 3월 현재 최신 (2일 전 배포)

**Node.js 버전 주의:** Style Dictionary v5는 Node.js 22 필요. pa11y-ci는 Node.js 20+. 팀 개발환경 Node.js 22 사용 권장 (양쪽 호환).

**v4 → v5 선택 이유:** v4가 아닌 v5 신규 프로젝트 시작. 마이그레이션 가이드 존재하나 greenfield이므로 최신 버전 직접 시작이 올바른 접근.

---

### Build Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `npm` scripts | (npm 내장) | 빌드 오케스트레이션 | 추가 번들러 불필요. Eleventy + SCSS + PostCSS 모두 npm scripts로 충분 |
| `npm-run-all2` | **6.0.x** | 병렬/직렬 스크립트 실행 | 원본 `npm-run-all` 유지보수 포크. `run-p`(병렬), `run-s`(직렬) 제공. Node.js 20+ 필요. 크로스플랫폼 |

**Vite 미사용 이유:** 이 프로젝트는 HTML/CSS 전용 퍼블리싱 가이드 사이트. JS 번들링 불필요, HMR 불필요. Vite 도입 시 설정 복잡도 증가 대비 이득 없음. Eleventy 자체 dev server (`--serve`) + SCSS watch로 충분.

**Webpack 미사용 이유:** 동일. CSS-only 워크플로에 번들러 오버엔지니어링.

**권장 npm scripts 구조:**

```json
{
  "scripts": {
    "dev": "run-p dev:*",
    "dev:eleventy": "eleventy --serve",
    "dev:sass": "sass --watch src/scss:_site/assets/css --style expanded",
    "build": "run-s build:tokens build:sass build:eleventy build:postcss",
    "build:tokens": "node tokens/build.js",
    "build:sass": "sass src/scss:_site/assets/css --style compressed --no-source-map",
    "build:eleventy": "eleventy",
    "build:postcss": "postcss _site/assets/css/*.css --replace",
    "lint": "stylelint 'src/scss/**/*.scss'",
    "a11y": "pa11y-ci --sitemap http://localhost:8080/sitemap.xml"
  }
}
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Doc site | Eleventy 3 | Astro | Astro는 JS 프레임워크 의존. HTML/CSS 전담팀에 불필요한 복잡도 |
| Doc site | Eleventy 3 | VitePress | Vue 의존, JS 빌드 시스템 필수. 범위 외 |
| Doc site | Eleventy 3 | Jekyll | Ruby 의존, npm 생태계 분리. 팀 표준(npm) 불일치 |
| SCSS 컴파일 | `sass` 1.98.0 | `dart-sass` (npm) | 6년 미관리 구버전 패키지. 동명 혼동 위험 |
| SCSS 컴파일 | `sass` JS버전 | `sass-embedded` | 소규모 프로젝트 속도 차이 무의미. 네이티브 바이너리 추가 복잡도 |
| Eleventy SCSS | 공식 addExtension | `eleventy-sass` 플러그인 | eleventy-sass@3.x는 Node.js 실험적 플래그 필요(`--experimental-require-module`). 공식 방식이 안정적 |
| Eleventy SCSS | 공식 addExtension | `@jgarber/eleventy-plugin-sass` | 단순한 케이스엔 OK이나 ITCSS 구조 같은 커스텀 loadPaths 제어 필요 시 공식 방식 우위 |
| 빌드 도구 | npm scripts | Vite | JS 번들링 불필요한 CSS 프로젝트에 오버엔지니어링 |
| 접근성 | pa11y-ci | axe-core | axe-core는 test runner 필요(JS 환경). CLI 단독 사용 복잡. pa11y-ci가 CI 통합 단순 |
| 디자인 토큰 | style-dictionary | Theo | Salesforce Theo 미관리 상태. style-dictionary 생태계 압도적으로 우위 |
| 린팅 | stylelint 17 | CSSLint | 미관리 프로젝트. 2025년 시점 사용 근거 없음 |

---

## Node.js Version Requirements

| Tool | 최소 Node.js | 비고 |
|------|------------|------|
| `@11ty/eleventy` 3.x | 18+ | 권장 20+ |
| `pa11y-ci` 4.x | 20+ (짝수) | Puppeteer 24 의존 |
| `style-dictionary` 5.x | **22+** | Set.prototype.union 사용 |
| `npm-run-all2` 6.x | 20+ | — |

**결론: 팀 개발환경 Node.js 22 LTS 통일 권장.** Style Dictionary v5 사용을 위한 최소 요건이 22이며, 다른 도구들도 모두 충족.

---

## Installation

```bash
# 문서 사이트
npm install -D @11ty/eleventy

# SCSS 파이프라인
npm install -D sass postcss postcss-cli autoprefixer

# 린팅
npm install -D stylelint stylelint-config-standard-scss stylelint-selector-bem-pattern

# 접근성 테스트
npm install -D pa11y-ci

# 디자인 토큰
npm install -D style-dictionary

# 빌드 유틸리티
npm install -D npm-run-all2
```

---

## Confidence Assessment

| Component | Confidence | Basis |
|-----------|------------|-------|
| Eleventy 3.1.5 | HIGH | 공식 블로그 + npm 버전 직접 확인 |
| sass 1.98.0 | HIGH | npm 패키지 페이지 직접 확인 (14일 전 배포) |
| Eleventy SCSS 연동 (addExtension) | HIGH | Eleventy 공식 문서 직접 조회 |
| postcss 8.5.8 | HIGH | npm 직접 확인 |
| autoprefixer 10.4.27 | HIGH | npm 직접 확인 |
| stylelint 17.5.0 | HIGH | npm 직접 확인 (5일 전 배포) |
| stylelint-config-standard-scss 17.0.0 | HIGH | npm 직접 확인 |
| stylelint-selector-bem-pattern 4.0.1 (Stylelint 17 호환) | MEDIUM | 버전 확인됨. Stylelint 17 peer dep 호환성 릴리스 노트 미확인. Phase 1 검증 필요 |
| pa11y-ci 4.1.0 | HIGH | npm + Libraries.io 확인. Node.js 20+ 요건 확인 |
| style-dictionary 5.4.0 | HIGH | npm 직접 확인 (2일 전 배포). v5 마이그레이션 가이드 존재 확인 |
| npm-run-all2 | MEDIUM | npm 존재 및 활성 유지 확인. 정확 최신 버전 미조회 (6.0.x 계열) |

---

## Sources

- Eleventy 3.1.x: https://www.11ty.dev/blog/eleventy-v3-1/ — 공식 블로그
- Eleventy 2025 review: https://www.11ty.dev/blog/review-2025/
- Eleventy Sass 공식 docs: https://www.11ty.dev/docs/languages/sass/
- sass npm: https://www.npmjs.com/package/sass
- sass-lang.com Dart Sass: https://sass-lang.com/dart-sass/
- stylelint npm: https://www.npmjs.com/package/stylelint
- stylelint-config-standard-scss npm: https://www.npmjs.com/package/stylelint-config-standard-scss
- stylelint-selector-bem-pattern: https://www.npmjs.com/package/stylelint-selector-bem-pattern
- pa11y-ci npm: https://www.npmjs.com/package/pa11y-ci
- pa11y-ci GitHub: https://github.com/pa11y/pa11y-ci
- postcss npm: https://www.npmjs.com/package/postcss
- autoprefixer npm: https://www.npmjs.com/package/autoprefixer
- style-dictionary npm: https://www.npmjs.com/package/style-dictionary
- style-dictionary v5 migration: https://styledictionary.com/versions/v5/migration/
- npm-run-all2 npm: https://www.npmjs.com/package/npm-run-all2
- pa11y vs axe comparison: https://www.craigabbott.co.uk/blog/axe-core-vs-pa11y/
