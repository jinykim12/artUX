# Project Research Summary

**Project:** artpqUX 퍼블리싱 가이드 시스템
**Domain:** HTML/CSS Publishing Guide System — Bootstrap 5 + SCSS, Korean government/web publishing team
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH (stack HIGH, Bootstrap reconciliation MEDIUM)

---

## Executive Summary

artpqUX 팀은 Bootstrap 5 기반의 HTML/CSS 퍼블리싱 표준 가이드를 구축한다. 이는 순수 ITCSS를 처음부터 쌓는 것이 아니라, 이미 검증된 Bootstrap 5 위에 팀 고유 SCSS 레이어(변수 오버라이드, 믹스인, 공통 스타일)와 KRDS/KWCAG 접근성 기준을 체계화하는 작업이다. 연구를 통해 수집된 ITCSS 원칙, BEM 네이밍, Style Dictionary 토큰 파이프라인은 모두 적용 가능하나, Bootstrap의 `$primary` / `$spacers` 변수 시스템과 유틸리티 클래스(`d-flex`, `container`)가 이미 팀 SCSS의 기반을 이루고 있으므로 이를 대체하지 않고 위에 쌓아야 한다.

가장 높은 즉시 가치를 제공하는 산출물은 두 가지다. 첫째, Bootstrap 오버라이드 + 팀 공통 믹스인을 담은 SCSS 보일러플레이트(스타터 킷). 둘째, 그 규칙과 컴포넌트 패턴을 열람할 수 있는 Eleventy 문서 사이트. 핵심 리스크는 기존 `@import` 기반 코드와 신규 `@use/@forward` 가이드 사이의 과도기 혼란, Bootstrap 변수 오버라이드 타이밍 오류(Bootstrap `@import` 이전에 변수를 정의하지 않는 실수), 그리고 KWCAG 자동화 테스트의 한계(pa11y-ci는 이슈의 30-40%만 감지)다.

연구에서 제안된 ITCSS 7계층 구조는 Bootstrap 5 커스터마이징 컨텍스트에서도 그대로 유효하다. 단, `3-generic/` 레이어는 Bootstrap의 Reboot/Normalize가 이미 담당하므로 `_bootstrap-override.scss` 진입점으로 대체되고, `5-objects/` 컨테이너·그리드는 Bootstrap 내장 클래스와 중복되므로 팀 커스텀 확장만 추가하는 방식으로 조정한다. Style Dictionary는 토큰을 CSS Custom Properties로 관리하는 데 유효하지만, Bootstrap `$primary` 등의 SCSS 변수와 이중 관리가 발생할 수 있으므로 Bootstrap 변수 오버라이드 파일이 단일 편집 지점 역할을 명확히 해야 한다.

---

## Bootstrap 5 현실 재조정 (Critical Context)

연구 시점 이후 확인된 팀의 실제 스택:

| 항목 | 연구 가정 | 실제 현황 | 조정 방향 |
|------|---------|---------|---------|
| CSS 기반 | 순수 ITCSS | Bootstrap 5 | ITCSS 원칙을 Bootstrap 커스터마이징 레이어에 적용 |
| SCSS 구조 | 7계층 폴더 | flat 파일 (`_variables.scss`, `_mixin.scss` 등) | 점진적으로 계층화, 기존 파일명 존중 |
| 모듈 시스템 | `@use/@forward` | `@import` (현재) | 신규 가이드는 `@use` 권장, 기존 프로젝트는 병행 허용 |
| 변수 시스템 | Style Dictionary → SCSS 변수 | Bootstrap `$primary`, `$spacers` 오버라이드 | CSS Custom Properties 병행 도입으로 두 시스템 연결 |
| 컨테이너/그리드 | `5-objects/` 자체 구현 | Bootstrap `.container`, `.row`, `.col-*` | Bootstrap 내장 사용, 커스텀 확장만 Objects에 추가 |
| 유틸리티 | `7-utilities/` 자체 구현 | Bootstrap 유틸리티 + 커스텀 혼용 | Bootstrap 유틸리티 우선, 팀 커스텀만 `7-utilities/`에 추가 |
| 폰트 | 토큰화 | Pretendard GOV / Noto Sans KR | 폰트 스위치를 토큰 변수로 관리 |

---

## Key Findings

### Recommended Stack

연구는 Bootstrap 5 기반 팀에 최적화된 도구 조합을 제안한다. Eleventy 3.1.5는 JS 프레임워크 없이 순수 HTML/CSS 팀에 최적이며, Dart Sass(`sass` 1.98.0)는 Bootstrap 5의 SCSS를 컴파일하는 공식 경로다. PostCSS + Autoprefixer는 공공기관 납품의 구형 브라우저 대응에 필수다.

**Style Dictionary에 대한 재평가:** Bootstrap이 이미 `$primary`, `$spacers` 등 변수 시스템을 갖추고 있으므로, Style Dictionary는 "SCSS 변수 생성"보다 "CSS Custom Properties 병행 관리"에 집중하는 역할이 더 적합하다. Node.js 22 요건(v5 기준)이 팀 환경 제약이 된다면 도입 우선순위를 낮추고, Bootstrap 변수 오버라이드 파일(`_variables.scss`)을 단일 소스로 삼는 단순한 방식을 Phase 1 기본으로 설정할 수 있다.

**핵심 기술:**
- `@11ty/eleventy` 3.1.5: 문서 사이트 생성 — JS 의존 없는 HTML/CSS 팀 최적
- `sass` 1.98.0 (Dart Sass): SCSS 컴파일 — Bootstrap 5 SCSS 공식 컴파일러
- `postcss` 8.5.8 + `autoprefixer` 10.4.27: CSS 후처리 — 구형 브라우저 공공기관 납품 대응
- `stylelint` 17.5.0 + `stylelint-config-standard-scss`: SCSS 린팅 — 팀 컨벤션 자동 강제
- `pa11y-ci` 4.1.0: 접근성 자동화 테스트 — KWCAG CI 검증 (이슈 30-40% 감지, 수동 보완 필수)
- `style-dictionary` 5.4.0 (조건부): CSS Custom Properties 생성 — Node.js 22 필요, 도입 시기 팀 환경 확인 후 결정
- `npm-run-all2` 6.x: 빌드 스크립트 오케스트레이션

**Node.js 권장 버전:** 22 LTS (Style Dictionary v5 요건이 최대값; 팀 환경 통일 전 v5 도입을 보류하고 Node 20에서 시작하는 것도 현실적 선택).

### Expected Features

Bootstrap 5 컨텍스트에서 재분류한 기능 목록:

**반드시 포함 (table stakes):**
- Bootstrap 5 변수 오버라이드 체계 (`_variables.scss`에 `$primary`, `$spacers` 등 문서화) — 모든 프로젝트의 시작점
- 팀 공통 믹스인 라이브러리 정리 (기존 `focus`, `flex`, `ellipsis`, `position`, `drop-shadow`, `ani` 등 표준화)
- 클래스 네이밍 컨벤션 (Bootstrap 유틸리티 사용 기준 + 커스텀 클래스 명명 규칙 명확화)
- 공통 UI 컴포넌트 패턴 HTML 스니펫 + 접근성 주의사항
- KWCAG/WCAG 2.1 AA 접근성 체크리스트 및 패턴 (skip-nav, focus indicator, sr-only)
- 반응형 브레이크포인트 기준 (Bootstrap 기본 + 한국 웹 실정 조정)
- Eleventy 기반 문서 사이트 (컨벤션/컴포넌트/접근성 열람)
- 신규 프로젝트 스타터 킷

**차별화 요소 (should have):**
- CSS Custom Properties 도입으로 Bootstrap 변수와 병행 테마 지원
- Pretendard GOV / Noto Sans KR 폰트 스위치 패턴 문서화
- pa11y-ci 접근성 자동화 (CI 통합 또는 npm script 수준)
- `@use/@forward` 마이그레이션 가이드 (기존 `@import` 프로젝트의 점진적 이행 경로)
- BEM 네이밍 적용 여부 팀 결정 후 Stylelint 설정 (현행 서술형 클래스와 BEM 공존 전략 문서화)
- 컴포넌트별 variant 문서 (default + Bootstrap modifier + 커스텀 modifier)
- Git 브랜치/커밋 컨벤션 문서

**v2+ 이후 검토:**
- Style Dictionary 완전 도입 (Node.js 22 환경 확보 후)
- pa11y-ci CI 파이프라인 자동화 (문서 사이트 구축 완료 후)
- 문서 사이트 전문 검색 기능 (콘텐츠 충분히 쌓인 후)
- 고급 컴포넌트 (Accordion, Date Picker, Tooltip, Slider)

**명시적으로 제외 (anti-features):**
- Bootstrap 완전 제거/대체 — 팀 결정
- JavaScript 컴포넌트 로직 — 퍼블리싱 범위 외
- Storybook — JS 중심 도구, HTML/CSS 스니펫 워크플로와 불일치
- React/Vue/Angular 래퍼 — 범위 외

### Architecture Approach

전체 레포지토리는 두 서브시스템으로 구성된다: (1) `scss/` — Bootstrap 5 커스터마이징 소스이자 스타터 킷의 핵심 산출물, (2) `docs/` — Eleventy 문서 사이트. 데이터 흐름은 `tokens/base.json`(또는 `_variables.scss`) → SCSS 컴파일 → `dist/artux.css` → Eleventy 문서 사이트 CSS로 이어진다.

Bootstrap 5 컨텍스트에서 수정된 SCSS 구조 (연구의 ITCSS 7계층을 Bootstrap에 맞게 조정):

**주요 컴포넌트:**
1. `scss/1-settings/` — Bootstrap 변수 오버라이드(`$primary`, `$spacers` 등) + 팀 고유 변수. Bootstrap `@import` 이전에 정의되어야 함 (순서 중요)
2. `scss/2-tools/` — 팀 믹스인 라이브러리 (기존 `focus`, `flex`, `ellipsis` 등 정리 + `respond-to()` 브레이크포인트 믹스인)
3. `scss/3-generic/` — Bootstrap 진입점(`@import "bootstrap"` 또는 `@use "bootstrap"`) + 팀 global reset 추가
4. `scss/4-elements/` — Bootstrap Reboot 이후 한국어 타이포그래피 기본값 (`word-break: keep-all`, Pretendard 폰트 스택)
5. `scss/5-objects/` — Bootstrap에 없는 팀 커스텀 레이아웃 패턴만 추가 (Bootstrap `.container`/`.row` 중복 금지)
6. `scss/6-components/` — Bootstrap 컴포넌트 커스터마이징 + 팀 고유 컴포넌트 (BEM 또는 팀 서술형 네이밍)
7. `scss/7-utilities/` — Bootstrap 유틸리티로 커버 안 되는 팀 커스텀 유틸리티만 추가

### Critical Pitfalls (Bootstrap 5 관점에서 재해석)

연구에서 발견된 15개 함정 중 Bootstrap 5 프로젝트에서 가장 위험한 5개:

1. **Bootstrap 변수 오버라이드 순서 오류** — Bootstrap을 `@import`/`@use`하기 전에 `$primary` 등 변수를 정의하지 않으면 오버라이드가 무시된다. `1-settings/_variables.scss`가 반드시 Bootstrap import 이전에 로드되어야 한다. (연구에서 직접 다루지 않은 Bootstrap 특화 함정 — 팀이 이미 알 수도 있으나 가이드에 명시 필요)

2. **`@import` 유지와 신규 `@use` 도입 혼재** — 기존 프로젝트는 `@import`, 신규 가이드는 `@use`를 권장하는 상황에서, Bootstrap 5 자체도 `@import` 기반 SCSS를 제공(Bootstrap의 `@use` 지원은 v6에서 완전화 예정). 신규 가이드에서 `@use "bootstrap/scss/bootstrap"` 방식 사용 가능 여부를 Phase 1에서 확인하고, 불가 시 Bootstrap import를 위한 `_vendor.scss` 파일에 격리하는 전략이 필요하다.

3. **62.5% REM 트릭 + Bootstrap의 기본 16px 기반 충돌** — Bootstrap의 기본값(`$font-size-base: 1rem = 16px`)과 팀의 62.5% 트릭(1rem = 10px) 사이에서 Bootstrap 컴포넌트 크기가 의도치 않게 바뀐다. Bootstrap 변수를 10px 기준으로 재정의(`$font-size-base: 1.6rem`)하거나 62.5% 트릭을 포기하고 `px → rem` 변환 함수 믹스인으로 대체하는 것이 더 안전할 수 있다. 팀이 62.5%를 계속 사용한다면 Bootstrap 변수 전체를 새 기준으로 재계산해야 한다.

4. **BEM과 Bootstrap 유틸리티 클래스 혼용 전략 미정** — 현재 팀은 Bootstrap 유틸리티(`d-flex`, `container`)와 서술형 커스텀 클래스를 혼용한다. 신규 가이드에서 BEM을 강제하면 기존 코드베이스와 충돌한다. 가이드는 "어디에 BEM을 적용하고 어디에 Bootstrap 유틸리티를 그대로 쓰는가"를 명확히 선언해야 하며, Stylelint 설정도 Bootstrap 유틸리티를 허용 목록에 추가해야 한다.

5. **pa11y-ci Puppeteer CI 실패** — Ubuntu CI 환경에서 Chrome 경로 문제로 접근성 테스트가 silently skip된다. `.pa11yci` 설정에 `--no-sandbox` 플래그를 추가하고 `sitemap`과 `urls` 키를 동시에 쓰지 않는 것이 필수다.

---

## Implications for Roadmap

Bootstrap 5 현실을 반영한 권장 단계별 구조:

### Phase 1: Bootstrap 5 SCSS 구조 표준화 + 스타터 킷 기반
**Rationale:** 모든 후속 작업의 전제 조건. 구조가 없으면 컴포넌트도 없고 문서도 없다. Bootstrap 오버라이드 순서와 `@use` 전략을 가장 먼저 확정해야 후속 단계가 흔들리지 않는다.
**Delivers:** Bootstrap 변수 오버라이드 파일 구조, 팀 믹스인 라이브러리, 브레이크포인트 믹스인, `.editorconfig`, `stylelintrc` 초안
**Addresses (from FEATURES.md):** SCSS 구조 정의, 믹스인 라이브러리, 클래스 네이밍 컨벤션 초안
**Avoids (from PITFALLS.md):** Bootstrap 변수 오버라이드 순서 오류, `@import`/`@use` 혼재 전략 불명확

**Bootstrap 특화 결정 사항:**
- Bootstrap을 `@use` 또는 `@import` 중 어느 방식으로 가져올지 확정
- 62.5% REM 트릭 유지 vs 포기 결정 (Bootstrap 변수 재계산 범위에 영향)
- BEM vs 서술형 클래스 적용 경계 정의

**Research flag:** 이 단계에서 추가 리서치 필요 없음 — Bootstrap SCSS 모듈 시스템은 잘 문서화되어 있음. 단, Bootstrap 5의 `@use` 지원 범위를 팀 환경에서 직접 검증 필요.

---

### Phase 2: 디자인 토큰 + CSS Custom Properties
**Rationale:** Bootstrap `$primary` 오버라이드만으로는 프로젝트별 테마 오버라이드가 어렵다. CSS Custom Properties를 병행 도입하면 Bootstrap 변수와 런타임 테마 지원을 동시에 달성한다. Phase 1의 변수 구조가 완성된 후에야 토큰 범위가 정해진다.
**Delivers:** `:root` CSS Custom Properties (색상, 간격, 타이포그래피), 토큰 명명 규칙, Pretendard GOV / Noto Sans KR 폰트 토큰
**Uses (from STACK.md):** Style Dictionary (선택) 또는 수동 `_root.scss` 관리
**Implements (from ARCHITECTURE.md):** `1-settings/` + `3-generic/_root.scss` 토큰 파이프라인

**Style Dictionary 도입 여부 결정:**
- Node.js 22 환경이 팀 전체에 확보된 경우: Style Dictionary v5 도입 (JSON → SCSS + CSS Custom Properties 동시 생성)
- Node.js 22 미확보 시: `_variables.scss`를 수동 편집 단일 소스로 유지하고, CSS Custom Properties는 `_root.scss`에 수동 병기

**Research flag:** Style Dictionary 도입 결정 전 팀 Node.js 버전 확인 필요.

---

### Phase 3: 공통 UI 컴포넌트 패턴 (HTML 스니펫 + SCSS)
**Rationale:** Phase 1-2에서 확립된 변수와 믹스인 위에서만 컴포넌트가 일관성을 가진다. Bootstrap 기본 컴포넌트를 재정의하는 것이 아니라, 팀 커스텀 스타일 레이어를 추가하는 방식으로 접근한다.
**Delivers:** 버튼, 폼, 카드, 테이블, 모달, 탭, 페이지네이션, 브레드크럼 — HTML 스니펫 + SCSS + 접근성 주의사항
**Addresses (from FEATURES.md):** 공통 UI 컴포넌트 라이브러리 (최소 요구 컴포넌트 전체)
**Avoids (from PITFALLS.md):** BEM modifier-without-base 오류, BEM 이중 underscore 안티패턴, ITCSS Objects/Components 경계 혼동

**Bootstrap 특화 접근:**
- Bootstrap 컴포넌트가 있는 경우: Bootstrap 기본 + 팀 수정 클래스 오버레이 방식
- Bootstrap에 없는 컴포넌트(팀 고유 패턴): 새 BEM 블록 또는 서술형 클래스로 추가

**Research flag:** 표준 패턴으로 충분. 단, KWCAG 특화 HTML 패턴(focus trap, WAI-ARIA)은 공식 KWCAG 문서 대조 검토 필요.

---

### Phase 4: Eleventy 문서 사이트
**Rationale:** Phase 1-3에서 만들어진 결과물을 문서화한다. 문서보다 산출물이 먼저여야 한다 — 보여줄 컴포넌트가 없는 빈 문서 사이트는 가치가 없다.
**Delivers:** Eleventy 문서 사이트 (컨벤션 / 토큰 / 컴포넌트 / 접근성 섹션), 컴포넌트 미리보기 + 코드 복사, 팀 온보딩 가이드
**Uses (from STACK.md):** `@11ty/eleventy` 3.1.5, Nunjucks 템플릿, highlight.js, Pagefind (검색)
**Avoids (from PITFALLS.md):** Eleventy v3 ESM config 오류, YAML frontmatter 탭 오류, Eleventy-SCSS permalink 기본값 변경

**Research flag:** Eleventy 3 ESM 설정은 잘 문서화되어 있음. `addExtension` 공식 방식 사용으로 플러그인 호환성 문제 회피. `eleventy.config.js` ESM 전환을 처음부터 올바르게 설정하면 추가 리서치 불필요.

---

### Phase 5: 접근성 가이드 + 자동화 테스트
**Rationale:** 공공기관 납품 요건. 문서 사이트가 완성된 후 pa11y-ci가 실제 URL을 테스트할 수 있다. 컴포넌트 단위 접근성 주의사항은 Phase 3에서 문서화하되, 자동화 체크리스트와 CI 통합은 문서 사이트 URL이 생긴 Phase 4 이후에 완성된다.
**Delivers:** KWCAG/WCAG 2.1 AA 체크리스트, pa11y-ci 설정 + npm script, 스크린리더 수동 테스트 가이드, 각 컴포넌트 접근성 노트
**Uses (from STACK.md):** `pa11y-ci` 4.1.0, Puppeteer 24 (pa11y 의존)
**Avoids (from PITFALLS.md):** pa11y-ci Puppeteer CI 실패 (`--no-sandbox` 필수), sitemap + urls 동시 설정 금지

**Research flag:** KWCAG 2.2 완전 체크리스트(33항목)는 공식 KISA/NIA PDF 직접 확인 필요 (`https://www.wa.or.kr`). 연구에서 미확인.

---

### Phase 6: 스타터 킷 패키징 + 온보딩 문서
**Rationale:** Phase 1-5에서 검증된 구조를 `starter/` 디렉토리로 정리. 실전 프로젝트에서 검증된 후 패키징하는 것이 핵심 가치다 — 미검증 보일러플레이트는 가이드가 아니다.
**Delivers:** `starter/` — 즉시 사용 가능한 SCSS 보일러플레이트, Bootstrap 오버라이드 구조, `.editorconfig`, `.stylelintrc`, `package.json`, `README.md` (한국어)
**Addresses (from FEATURES.md):** 스타터 킷, 신규 프로젝트 온보딩 즉시 시작 가능

**Research flag:** 표준 패턴. 추가 리서치 불필요.

---

### Phase Ordering Rationale

- **Phase 1이 먼저인 이유:** Bootstrap 오버라이드 구조와 `@use` 전략을 결정하지 않으면, 이후 토큰/컴포넌트/문서가 모두 잘못된 전제 위에 만들어진다.
- **Phase 2가 Phase 3 이전인 이유:** 컴포넌트가 하드코딩 hex 값 없이 변수를 참조하려면 토큰/변수 체계가 먼저 있어야 한다.
- **Phase 4(문서)가 Phase 3(컴포넌트) 이후인 이유:** 보여줄 것이 있어야 문서 사이트가 의미있다. 빈 문서 사이트 먼저 만들고 채우는 접근은 동기 저하를 유발한다.
- **Phase 5(접근성 자동화)가 Phase 4 이후인 이유:** pa11y-ci는 실제 URL을 필요로 하며, 문서 사이트 빌드 결과물이 그 URL을 제공한다.
- **Phase 6(스타터 킷)이 마지막인 이유:** 실전 검증 없는 스타터 킷은 팀에 잘못된 패턴을 퍼뜨린다. Phase 1-5를 통해 검증된 구조만 패키징한다.

### Research Flags

추가 리서치가 필요한 단계:
- **Phase 1:** Bootstrap 5 SCSS를 `@use "bootstrap/scss/bootstrap"` 방식으로 가져올 수 있는지 팀 환경에서 직접 검증 필요
- **Phase 2:** 팀 Node.js 버전 확인 후 Style Dictionary v5 도입 여부 결정
- **Phase 5:** KWCAG 2.2 공식 체크리스트 33항목 전체 (`https://www.wa.or.kr` 직접 접근 필요)

표준 패턴으로 추가 리서치 불필요한 단계:
- **Phase 3:** Bootstrap 컴포넌트 오버라이드 + BEM은 잘 문서화된 패턴
- **Phase 4:** Eleventy 3 ESM 설정, `addExtension` SCSS 연동 — 공식 문서 충분
- **Phase 6:** 스타터 킷 패키징 — 앞 단계 산출물 정리이므로 별도 리서치 불필요

---

## Top 5 Actionable Recommendations (Bootstrap 5 팀 특화)

이 팀이 가이드 시스템 구축을 시작하기 전에 결정해야 할 가장 중요한 5가지:

**1. Bootstrap 5 SCSS `@use` 전환 가능 여부 즉시 검증**
Bootstrap 5의 공식 SCSS는 `@use` 기반 로드를 지원하지만, 전체 트리(`bootstrap/scss/bootstrap`) 단일 `@use`는 일부 제약이 있다. Phase 1 시작 전 `@use "bootstrap/scss/bootstrap"` + `@use "bootstrap/scss/variables" as bs` 방식이 실제로 동작하는지 팀 빌드 환경에서 스파이크로 확인한다. 불가 시 Bootstrap import를 `_vendor.scss` 파일에 격리(`// stylelint-disable` 주석 포함)하고, 나머지 팀 파일은 `@use`로 작성한다.

**2. 62.5% REM 트릭 유지 vs 포기 팀 결정**
Bootstrap 5의 기본 `$font-size-base: 1rem` = 16px와 팀의 62.5% 설정이 충돌한다. 두 가지 선택지: (A) 62.5% 유지 — Bootstrap 변수를 모두 10px 기준으로 재정의 (`$font-size-base: 1.6rem`, `$spacer: 1rem` 등) + 제3자 라이브러리 통합 시 주의사항 문서화. (B) 62.5% 포기 — `rem()` 변환 함수 믹스인 도입 (`@function rem($px) { @return ($px / 16px) * 1rem; }`). 팀이 (A)를 선택하면 가이드에 Bootstrap 변수 재계산 목록을 반드시 포함해야 한다.

**3. Bootstrap 유틸리티와 커스텀 클래스 경계 명문화**
"어떤 경우에 `d-flex`를 쓰고, 어떤 경우에 커스텀 클래스를 쓰는가" — 팀이 이 기준을 명확히 선언하지 않으면 가이드를 만들어도 프로젝트마다 다르게 쓴다. 권장 기준 예시: "Bootstrap 유틸리티는 프로토타입/일회성 레이아웃 조정에 허용. 반복되는 패턴(3회 이상 동일 조합 등장)은 컴포넌트 클래스로 추출". 이 결정은 Stylelint `selector-class-pattern` 설정에도 영향을 준다.

**4. `@import` → `@use` 이행 전략 현실적으로 설정**
기존 프로젝트 SCSS는 `@import`로 유지한다. 신규 가이드/스타터 킷은 `@use`로 작성한다. 두 방식의 공존을 팀에 명확히 전달하고, 기존 프로젝트에 가이드의 `@use` 기반 파일을 가져다 쓸 때 Sass 마이그레이터(`npx sass-migrator module --migrate-deps`) 사용 방법을 가이드 README에 포함한다.

**5. KWCAG 체크리스트 공식 소스 확보**
연구는 KWCAG의 일반적 항목을 정리했으나 2022년 이후 개정된 33항목 전체 목록을 확인하지 못했다. Phase 5 시작 전 `https://www.wa.or.kr`에서 최신 KWCAG 2.2 전문(한국어 PDF)을 다운로드하고, 팀 내 공공기관 납품 경험자가 내용을 검토한 후 체크리스트를 작성한다. 자동화 도구(pa11y-ci)는 이슈의 30-40%만 감지하므로, 체크리스트의 나머지는 수동 테스트 항목으로 명시해야 한다.

---

## Open Questions (팀 입력 필요)

로드맵 확정 전 팀에서 직접 결정해야 할 미결 사항:

| 질문 | 선택지 | 결정이 미치는 영향 |
|------|--------|-----------------|
| Bootstrap SCSS를 `@use`로 가져올 수 있는가? | (A) 가능 — `@use "bootstrap/scss/bootstrap"` 사용 / (B) 불가 — `_vendor.scss`에 `@import`로 격리 | 전체 SCSS 구조의 모듈 시스템 방향 |
| 62.5% REM 트릭을 유지하는가? | (A) 유지 — Bootstrap 변수 재계산 필요 / (B) 포기 — `rem()` 함수 믹스인으로 대체 | Bootstrap 변수 오버라이드 범위, 문서 사이트 예제 모두 영향 |
| BEM 네이밍을 언제 적용하는가? | (A) 신규 컴포넌트 전체 BEM 강제 / (B) Bootstrap 확장 컴포넌트만 BEM / (C) 팀 서술형 유지 + 규칙만 문서화 | Stylelint 설정, HTML 스니펫 예제 스타일 |
| Style Dictionary를 도입하는가? | (A) v5 도입 (Node.js 22 필요) / (B) 수동 `_variables.scss` + `_root.scss` 유지 | Phase 2 복잡도, 토큰 빌드 파이프라인 유무 |
| 팀 Node.js 현재 버전은? | 18 / 20 / 22 (또는 혼재) | Style Dictionary v5, pa11y-ci v4 도입 가능 여부 |
| 한국 공공기관 납품 시 사용하는 화면읽기 프로그램은? | Sense Reader / NVDA / JAWS / 기타 | 접근성 수동 테스트 도구 목록 |
| 기존 프로젝트에서 팀이 IE11 납품 요건을 받은 경험이 있는가? | 있음 / 없음 / 프로젝트별 상이 | CSS Custom Properties `@supports` 폴백 필요 여부 |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack (버전, 도구) | HIGH | npm 직접 확인, 공식 문서 검증 |
| Features (기능 목록, 우선순위) | MEDIUM | KRDS/KWCAG 공식 소스 일부 미확인, Bootstrap 5 재조정 판단은 팀 확인 필요 |
| Architecture (ITCSS 구조, Bootstrap 조정) | MEDIUM | Bootstrap 5 + ITCSS 혼합 패턴은 커뮤니티 검증됨. 세부 Bootstrap `@use` 호환성은 현장 검증 필요 |
| Pitfalls (함정, 방지 전략) | HIGH | 공식 소스, 실제 이슈 트래커 기반 |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **KWCAG 2.2 완전 체크리스트:** `https://www.wa.or.kr` 공식 PDF 확인 필요. Phase 5 착수 전 팀 내 공공기관 납품 경험자 검토 필수
- **Bootstrap 5 `@use` 지원 범위:** Bootstrap 5 SCSS를 `@use` 방식으로 불러올 때의 실제 동작 확인 필요. Phase 1 초기에 스파이크 태스크로 검증
- **62.5% + Bootstrap 변수 충돌 범위:** 실제로 어떤 Bootstrap 변수가 재계산되어야 하는지 전체 목록화 필요. Phase 1에서 검증
- **팀 내 지배적 스크린리더:** 공공기관 납품 QA에서 실제 사용하는 화면읽기 프로그램을 팀원 인터뷰로 확인
- **Pretendard GOV CDN 경로:** GitHub orioncactus/pretendard 공식 URL에서 정부 변형 CDN 경로 확인 필요 (현재 self-host 또는 npmcdn 사용 여부 불명확)

---

## Sources

### Primary (HIGH confidence)
- Bootstrap 5 공식 SCSS 문서 — https://getbootstrap.com/docs/5.3/customize/sass/
- Eleventy 3.1.x 공식 블로그 — https://www.11ty.dev/blog/eleventy-v3-1/
- Dart Sass npm — https://www.npmjs.com/package/sass
- Stylelint npm — https://www.npmjs.com/package/stylelint
- pa11y-ci GitHub — https://github.com/pa11y/pa11y-ci
- Sass @import breaking change — https://sass-lang.com/documentation/breaking-changes/import/
- Sass @use / @forward documentation — https://sass-lang.com/documentation/at-rules/use/
- Style Dictionary v5 migration — https://styledictionary.com/versions/v5/migration/
- BEM official methodology — https://bem.info/methodology/
- W3C WAI — Republic of Korea KWCAG policy — https://www.w3.org/WAI/policies/republic-of-korea/
- Pretendard official docs — https://github.com/orioncactus/pretendard

### Secondary (MEDIUM confidence)
- KRDS component categories (HANUI) — https://hanui.io/components/list
- KWCAG 2025 expansion (24→33항목) — https://jinbytes.com/entry/KWCAG-2025
- Korean breakpoint analysis — https://velog.io/@sangpok/%EB%B0%98%EC%9D%91%ED%98%95-UI-%ED%95%B4%EC%83%81%EB%8F%84-%EA%B8%B0%EC%A4%80
- Korean typography (line-height, word-break) — https://lqez.github.io/blog/hangul-typo-on-web.html
- ITCSS scalable architecture — https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture
- 62.5% font-size accessibility analysis — https://fedmentor.dev/posts/rem-html-font-size-hack/
- Eleventy v3 upgrade notes — https://mxb.dev/blog/eleventy-v3-update/
- pa11y vs axe comparison — https://www.craigabbott.co.uk/blog/axe-core-vs-pa11y/

### Tertiary (LOW confidence — validation required)
- KWCAG 2.2 전체 체크리스트 — https://www.wa.or.kr (직접 접근 미확인)
- 한국 공공기관 화면읽기 프로그램 시장 점유율 — 커뮤니티 인용, 공식 통계 미확인
- KRDS 공식 브레이크포인트 수치 — 커뮤니티 관행에서 추론, https://uiux.egovframe.go.kr 직접 확인 필요

---
*Research completed: 2026-03-26*
*Bootstrap 5 context reconciled: 2026-03-26*
*Ready for roadmap: yes*
