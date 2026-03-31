# ROADMAP: artpqUX 퍼블리싱 가이드 시스템

**프로젝트:** artpqUX (아트피큐) 퍼블리싱 가이드 시스템
**생성일:** 2026-03-26
**Granularity:** Fine (12 phases)
**Coverage:** 46/46 v1 requirements mapped

---

## 핵심 가치

> 신규 프로젝트 시작 시 퍼블리싱 규칙을 처음부터 다시 정하지 않고,
> 검증된 팀 표준을 즉시 적용할 수 있어야 한다.

---

## Phases

- [ ] **Phase 1: 프로젝트 초기 설정** — 레포 구조, npm, Bootstrap 5 설치, SCSS 진입점 확립
- [ ] **Phase 2: SCSS 기반 파일 표준화** — variables, mixin, common, font, root 파일 체계화
- [ ] **Phase 3: 디자인 토큰** — CSS Custom Properties 정의 (색상/타이포/간격/기타)
- [x] **Phase 4: 반응형 시스템** — 브레이크포인트 기준 및 미디어쿼리 믹스인 (completed 2026-03-26)
- [x] **Phase 5: 접근성 기반** — sr-only, 포커스 스타일, 본문건너뛰기, KRDS 체크리스트 (completed 2026-03-26)
- [x] **Phase 6: 핵심 컴포넌트 — 레이아웃** — 헤더/GNB 패턴, 컨테이너, 그리드 확장 (completed 2026-03-26)
- [x] **Phase 7: 핵심 컴포넌트 — 폼** — input, select, textarea, checkbox, radio (접근성 포함) (completed 2026-03-26)
- [x] **Phase 8: 핵심 컴포넌트 — UI** — button, card, table, pagination, breadcrumb (completed 2026-03-26)
- [x] **Phase 9: 핵심 컴포넌트 — 오버레이** — modal, tab, slider/Swiper 접근성 패턴 (completed 2026-03-26)
- [x] **Phase 10: Eleventy 문서 사이트** — 설정, 섹션 구성, 코드 복사 기능 (completed 2026-03-27)
- [x] **Phase 11: 스타터 킷** — 패키징, README, 신규 프로젝트 시작 가이드 (completed 2026-03-27)
- [x] **Phase 12: 컨벤션 문서화** — 네이밍, 코딩 스타일, Git 커밋 규칙 (completed 2026-03-27)
- [x] **Phase 13: v1.0 Tech Debt 정리** — 추적 테이블 업데이트, 문서 사이트 minor gap, 주석 수정 (completed 2026-03-26)

---

## Phase Details

### Phase 1: 프로젝트 초기 설정
**Goal**: Bootstrap 5 기반 레포지토리 골격을 구성하고, SCSS 컴파일 파이프라인이 정상 동작하는 상태를 만든다. 이후 모든 단계의 전제 조건이 되는 빌드 환경과 `@use` 전략을 이 단계에서 확정한다.
**Depends on**: 없음 (첫 번째 단계)
**Requirements**: SCSS-01, SCSS-07

**Plans**:
1. 디렉토리 구조 생성: `scss/`, `starter/`, `docs/`, `dist/` 루트 폴더 초기화
2. `package.json` 초기화 — npm, `sass` (Dart Sass 1.98.0+), `postcss`, `autoprefixer`, `npm-run-all2` 설치
3. Bootstrap 5 npm 패키지 설치 (`bootstrap` 최신 5.x) 및 `node_modules` 경로 확인
4. SCSS 진입점 파일 `scss/style.scss` 생성 — 파일 로드 순서 주석과 함께 빈 뼈대 작성
5. Bootstrap을 `@use "bootstrap/scss/bootstrap"` 방식으로 임포트하는 타당성 검증; 불가 시 `scss/3-generic/_vendor.scss` 격리 전략으로 대체
6. npm 스크립트 `build:css`, `watch:css` 작성 — Dart Sass로 `scss/style.scss` → `dist/artux.css` 컴파일 확인
7. `.editorconfig` 작성 (2 spaces, UTF-8, LF, trim trailing whitespace)
8. `.gitignore` 작성 (`node_modules/`, `dist/`, `.DS_Store`)
9. `stylelint.config.json` 뼈대 작성 (`stylelint-config-standard-scss` 기반) — v1 단계에서는 경고 수준 설정
10. SCSS 파일 로드 순서 의사결정 문서 작성 (주석 형태): `1-settings → 2-tools → 3-generic(Bootstrap) → 4-elements → 5-objects → 6-components → 7-utilities`

**Success Criteria** (what must be TRUE):
1. `npm run build:css` 실행 시 오류 없이 `dist/artux.css`가 생성된다
2. 생성된 `artux.css`에 Bootstrap 기본 스타일이 포함되어 있다
3. `scss/style.scss`에 파일 로드 순서가 한국어 주석으로 명시되어 있다
4. `.editorconfig`가 존재하고 2 spaces 들여쓰기 규칙을 포함한다
5. Bootstrap `@use` 또는 `@import` 전략이 결정되어 진입점 파일에 구현되어 있다

**Plans**: TBD
**UI hint**: yes

---

### Phase 2: SCSS 기반 파일 표준화
**Goal**: 팀 공통 SCSS 파일 5종(variables, mixin, common, font, root)을 표준화하여, 모든 팀원이 동일한 파일 구조에서 작업을 시작할 수 있도록 한다.
**Depends on**: Phase 1
**Requirements**: SCSS-02, SCSS-03, SCSS-04, SCSS-05, SCSS-06, SCSS-07

**Plans**:
1. `scss/1-settings/_variables.scss` 작성 — Bootstrap `$primary`, `$secondary`, `$spacers`, `$font-size-base`, `$border-radius` 오버라이드 패턴 주석 포함. Bootstrap `@use`/`@import` 이전에 로드됨을 명시
2. Bootstrap 변수 오버라이드 순서 오류 방지 주석 추가 — "이 파일은 반드시 Bootstrap 로드 이전에 `@use`되어야 한다" 경고 블록
3. `scss/2-tools/_mixin.scss` 작성 — 팀 기존 믹스인 6종 표준화: `focus()`, `flex()`, `ellipsis()`, `position()`, `drop-shadow()`, `ani()`
4. 각 믹스인 사용법 한국어 주석 문서화 — 파라미터 설명, 사용 예시 포함
5. `scss/4-elements/_common.scss` 작성 — Bootstrap Reboot 이후 보완 reset, `word-break: keep-all`, 기본 요소 스타일, `sr-only` 클래스 초안
6. `scss/4-elements/_font.scss` 작성 — Pretendard GOV `@font-face` 선언과 Noto Sans KR CDN 방식 주석, 프로젝트별 전환 가이드 (`/* 공공기관: Pretendard GOV / 일반: Noto Sans KR */`)
7. `scss/3-generic/_root.scss` 뼈대 작성 — `:root {}` 빈 블록과 토큰 정의 예정 주석 (Phase 3에서 채울 예정)
8. `scss/style.scss` 업데이트 — 5종 파일을 올바른 순서로 `@use` 추가, `@import` 병행 허용 주석 포함
9. 62.5% REM 트릭 적용 여부 결정 및 `_variables.scss`에 주석으로 팀 결정 사항 기록
10. 기존 `@import` 프로젝트와의 공존 전략 주석 추가 (`@import` → `@use` 마이그레이션 경로 안내)

**Success Criteria** (what must be TRUE):
1. 5종 SCSS 파일이 모두 존재하고 `npm run build:css`가 오류 없이 통과한다
2. `_variables.scss`에 Bootstrap 주요 변수 오버라이드 예시가 포함되어 있다
3. `_mixin.scss`에 6종 믹스인이 사용 예시와 함께 정의되어 있다
4. `_font.scss`에 Pretendard GOV와 Noto Sans KR 전환 방법이 주석으로 안내되어 있다
5. 파일 로드 순서가 `style.scss`에 명확히 구현되어 있고, Bootstrap 오버라이드 순서가 보장된다

**Plans**: TBD
**UI hint**: yes

---

### Phase 3: 디자인 토큰
**Goal**: CSS Custom Properties 기반의 공통 디자인 토큰을 정의하여, Bootstrap 변수와 런타임 테마 오버라이드를 동시에 지원하는 단일 편집 지점을 구축한다.
**Depends on**: Phase 2
**Requirements**: TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04, TOKEN-05, TOKEN-06

**Plans**:
1. `scss/3-generic/_root.scss` 색상 토큰 정의 — `--color-primary`, `--color-secondary`, `--color-text`, `--color-text-muted`, `--color-bg`, `--color-border`, `--color-error`, `--color-success`
2. 타이포그래피 토큰 정의 — `--font-size-xs` ~ `--font-size-2xl`, `--font-weight-regular` / `bold`, `--leading-tight` / `normal` / `loose`
3. 간격 토큰 정의 — 4px 기반 스케일: `--spacing-xs(4px)`, `--spacing-sm(8px)`, `--spacing-md(16px)`, `--spacing-lg(24px)`, `--spacing-xl(32px)`, `--spacing-2xl(48px)`, `--spacing-3xl(64px)`
4. 기타 토큰 정의 — `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--transition-fast(150ms)`, `--transition-base(300ms)`, `--z-modal(1050)`, `--z-overlay(1040)`, `--z-dropdown(1000)`
5. Bootstrap `$primary` 등 SCSS 변수와 CSS Custom Properties 매핑 관계 주석 문서화 (예: `$primary: var(--color-primary)` 연결 패턴)
6. `_project-overrides.scss` 파일 패턴 작성 — 프로젝트별 `:root {}` 오버라이드 방법 예시 (다른 primary 색상 적용 시나리오)
7. 토큰 네이밍 규칙 문서화 — `--[카테고리]-[이름]-[변형]` 규칙, Bootstrap 접두어 충돌 방지 방침
8. `npm run build:css` 재실행하여 `:root` 블록이 컴파일 결과에 포함됨 확인
9. (선택) Style Dictionary v5 도입 여부 결정 후 `tokens/base.json` 뼈대 생성 — Node.js 22 환경이 확보된 경우만 진행

**Success Criteria** (what must be TRUE):
1. 컴파일된 `dist/artux.css`의 `:root` 블록에 색상, 타이포, 간격, 기타 토큰이 모두 포함된다
2. `--spacing-xs`부터 `--spacing-3xl`까지 7단계 간격 토큰이 4px 배수로 정의되어 있다
3. `_project-overrides.scss` 예시 파일이 존재하고 색상 오버라이드 방법을 보여준다
4. Bootstrap `$primary`와 `--color-primary`의 연결 관계가 주석으로 명시되어 있다

**Plans**: TBD

---

### Phase 4: 반응형 시스템
**Goal**: 팀 표준 브레이크포인트 4단계를 정의하고 `respond-to()` 믹스인을 제공하여, 모든 컴포넌트가 일관된 반응형 기준을 사용하도록 한다.
**Depends on**: Phase 2
**Requirements**: RESP-01, RESP-02, RESP-03

**Plans**:
1. `scss/2-tools/_breakpoints.scss` 작성 — 4단계 브레이크포인트 변수 정의: `$bp-mobile: 767px`, `$bp-tablet: 768px`, `$bp-tablet-max: 1023px`, `$bp-pc-sm: 1024px`, `$bp-pc-sm-max: 1279px`, `$bp-pc: 1280px`
2. Bootstrap 기본 그리드 브레이크포인트(`sm`, `md`, `lg`, `xl`, `xxl`)와 팀 기준의 관계 주석 문서화
3. `respond-to()` 믹스인 작성 — `mobile`, `tablet`, `pc-small`, `pc` 4개 키워드 지원, `@content` 활용
4. 모바일 퍼스트 작성 기준 주석 작성 — "기본 스타일은 모바일 기준, 넓어질수록 덮어쓴다" 원칙과 예시
5. 믹스인 사용 예시 작성 — `.component` 블록에서 `respond-to(pc)` 호출 패턴 코드 스니펫
6. `_breakpoints.scss`를 `style.scss`의 `2-tools` 섹션에 추가하여 전체 빌드에 포함
7. 빌드 후 미디어쿼리가 컴파일 결과에 정확한 픽셀값으로 출력되는지 확인

**Success Criteria** (what must be TRUE):
1. `respond-to(mobile)`, `respond-to(tablet)`, `respond-to(pc-small)`, `respond-to(pc)` 네 키워드가 모두 동작한다
2. 팀 브레이크포인트 4단계(~767 / 768~1023 / 1024~1279 / 1280~)가 변수로 정의되어 있다
3. 모바일 퍼스트 작성 원칙이 주석과 예시 코드로 명시되어 있다
4. Bootstrap 브레이크포인트와 팀 기준의 관계가 문서화되어 있다

**Plans**: 1 plan

Plans:
- [x] 04-01-PLAN.md — _breakpoints.scss 생성 + _index.scss @forward 추가 + 빌드 통합 검증

---

### Phase 5: 접근성 기반
**Goal**: KRDS 및 KWCAG 2.1 AA 기준을 충족하는 접근성 기반 패턴(sr-only, 포커스 스타일, 본문건너뛰기)을 코드로 제공하고, 팀 공통 체크리스트를 문서화한다.
**Depends on**: Phase 2, Phase 3
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, A11Y-06, A11Y-07, A11Y-08, A11Y-09

**Plans**:
1. `scss/4-elements/_common.scss`에 `.sr-only` 클래스 표준 구현 추가 — Bootstrap `visually-hidden` 기반 + 한국어 사용처 주석
2. `.sr-only-focusable` 변형 클래스 추가 — 포커스 시 가시화되는 패턴 (본문건너뛰기에 사용)
3. `scss/2-tools/_mixin.scss`의 `focus()` 믹스인 표준화 — `outline: 2px solid var(--color-primary)`, `outline-offset: 2px` 기본값, 고대비 모드 대응
4. `scss/6-components/_skip-nav.scss` 작성 — `#skip-to-content` 패턴: 평소에 화면 밖 위치, 포커스 시 최상단에 노출
5. 이미지 대체텍스트 기준 주석 파일 작성 (`scss/6-components/_a11y-notes.scss` 또는 별도 마크다운) — 장식 이미지 `alt=""`, 의미 이미지 설명 규칙
6. 색상 대비 기준 주석 작성 — 텍스트 4.5:1, 대형 텍스트(18pt/14pt bold) 3:1, UI 컴포넌트 3:1
7. 키보드 탐색 가이드 작성 — 탭 순서 원칙, `tabindex` 사용 기준, 포커스 트랩 패턴 설명
8. 동적 콘텐츠 접근성 패턴 작성 — `aria-live="polite"`, `role="alert"`, 모달 포커스 트랩 시나리오
9. KRDS 공공기관 납품 접근성 체크리스트 작성 — 항목별 KWCAG 2.1 조항 번호, 자동/수동 구분, 체크박스 형식
10. `npm run build:css` 재실행하여 `.sr-only`, 포커스 스타일이 `dist/artux.css`에 포함되는지 확인

**Success Criteria** (what must be TRUE):
1. `.sr-only` 클래스가 컴파일 결과에 포함되고 스크린 리더에서만 내용이 읽힌다 (시각적으로 숨겨짐)
2. 본문건너뛰기 링크(`#skip-to-content`)가 구현되어 포커스 시 화면에 노출된다
3. `focus()` 믹스인을 적용한 요소가 키보드 탐색 시 outline으로 표시된다
4. KRDS 기반 체크리스트가 존재하고 각 항목에 KWCAG 조항이 명시되어 있다
5. 동적 콘텐츠 접근성 패턴(aria-live, 포커스 트랩)이 코드 예시와 함께 문서화되어 있다

**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — SCSS 접근성 코드 (focus 믹스인 이동 + skip-nav 컴포넌트)
- [x] 05-02-PLAN.md — 접근성 가이드 문서 4종 (이미지, 색상대비, 키보드, 폼)
- [x] 05-03-PLAN.md — KRDS 체크리스트 + 동적 콘텐츠 가이드

**UI hint**: yes

---

### Phase 6: 핵심 컴포넌트 — 레이아웃
**Goal**: 헤더/GNB 마크업 패턴과 팀 커스텀 레이아웃 확장을 제공하여, 프로젝트마다 반복되는 레이아웃 마크업을 표준화한다.
**Depends on**: Phase 3, Phase 4, Phase 5
**Requirements**: COMP-01

**Plans**:
1. `scss/5-objects/_layout.scss` 작성 — Bootstrap `.container` / `.row` / `.col-*` 사용 원칙, 팀 커스텀 레이아웃 보완 규칙 (Bootstrap 내장 중복 금지 주석)
2. `docs/_includes/snippets/header-pc.html` 작성 — PC 헤더 마크업: `<header>`, `<nav role="navigation" aria-label="주요 메뉴">`, `<ul>` 구조
3. `docs/_includes/snippets/header-mobile.html` 작성 — 모바일 전체메뉴: 햄버거 버튼 (`aria-expanded`, `aria-controls`), 메뉴 패널 (`role="dialog"` 또는 `aria-hidden`)
4. GNB 접근성 주의사항 작성 — `aria-current="page"` 현재 메뉴 표시, 서브메뉴 `aria-haspopup`, 포커스 관리
5. `scss/6-components/_header.scss` 작성 — 헤더 공통 스타일, `respond-to()` 믹스인으로 PC/모바일 분기
6. 헤더 컴포넌트 HTML 스니펫 완성본 작성 (접근성 속성 전체 포함, 한국어 주석)
7. 레이아웃 확장 예시 작성 — `container-fluid` 확장, sticky 헤더 패턴, z-index 토큰 적용 예시

**Success Criteria** (what must be TRUE):
1. PC 헤더와 모바일 전체메뉴 마크업 스니펫이 각각 존재하고 접근성 속성이 포함되어 있다
2. 현재 페이지 메뉴에 `aria-current="page"` 적용 방법이 명시되어 있다
3. 햄버거 버튼에 `aria-expanded`와 `aria-controls`가 올바르게 사용되어 있다
4. `respond-to()` 믹스인을 사용하여 PC/모바일 헤더 스타일이 분기된다

**Plans:** 2/2 plans complete

Plans:
- [x] 06-01-PLAN.md — SCSS 레이아웃+헤더 컴포넌트 (_layout.scss 주석 + _header.scss 스타일)
- [x] 06-02-PLAN.md — 헤더/GNB 마크업 패턴 문서 (PC + 모바일 + JS 예시)
**UI hint**: yes

---

### Phase 7: 핵심 컴포넌트 — 폼
**Goal**: 입력 요소 전체(input, select, textarea, checkbox, radio)에 대한 표준 마크업 패턴과 접근성 구현을 제공하여, 폼 관련 공공기관 납품 요건을 충족한다.
**Depends on**: Phase 3, Phase 5
**Requirements**: COMP-03, A11Y-05

**Plans:** 2/2 plans complete

Plans:
- [x] 07-01-PLAN.md — _form.scss Bootstrap 폼 오버라이드 + _index.scss 등록
- [x] 07-02-PLAN.md — forms.md 5종 폼 마크업 패턴 통합 문서 + JS 오류 처리 예시

**Success Criteria** (what must be TRUE):
1. input, select, textarea, checkbox, radio 5종 마크업 스니펫이 모두 존재한다
2. 모든 폼 요소에 `<label for>` 또는 `aria-label`이 적용되어 있다
3. 에러 메시지가 `aria-describedby`로 입력 요소와 연결되는 패턴이 구현되어 있다
4. 체크박스/라디오 그룹에 `<fieldset>` + `<legend>` 패턴이 사용되어 있다
5. `required` 필드 표시 방법이 시각적 표시와 `aria-required="true"` 양쪽으로 처리되어 있다

**UI hint**: yes

---

### Phase 8: 핵심 컴포넌트 — UI
**Goal**: button, card, table, pagination, breadcrumb 5종 컴포넌트의 표준 마크업 패턴과 SCSS를 제공하여, Bootstrap 확장 방식의 팀 커스텀 컴포넌트 작성 방법을 보여준다.
**Depends on**: Phase 3, Phase 5
**Requirements**: COMP-02, COMP-04, COMP-05, COMP-08, COMP-09

**Plans:** 2/2 plans complete

Plans:
- [x] 08-01-PLAN.md — Button + Card SCSS + 마크업 문서 + _index.scss 일괄 @forward
- [x] 08-02-PLAN.md — Table + Breadcrumb SCSS + Table/Pagination/Breadcrumb 마크업 문서

**Success Criteria** (what must be TRUE):
1. button, card, table, pagination, breadcrumb 5종 마크업 스니펫이 각각 존재한다
2. 테이블에 `<caption>`, `scope` 속성이 포함되어 있다
3. 페이지네이션에 `aria-label="페이지 탐색"`, `aria-current="page"`가 적용되어 있다
4. 브레드크럼에 `<nav aria-label="breadcrumb">`이 사용되어 있다
5. 버튼 컴포넌트에 :focus box-shadow: none 적용되어 전역 :focus-visible 위임된다

**UI hint**: yes

---

### Phase 9: 핵심 컴포넌트 — 오버레이
**Goal**: modal, tab, slider/Swiper 3종 컴포넌트의 동적 접근성 패턴(포커스 트랩, ARIA 역할, 자동 재생 제어)을 표준화한다.
**Depends on**: Phase 3, Phase 5
**Requirements**: COMP-06, COMP-07, COMP-10, A11Y-09

**Plans**:
1. `docs/_includes/snippets/modal.html` 작성 — `role="dialog"`, `aria-modal="true"`, `aria-labelledby` 제목 연결, 닫기 버튼 (`aria-label="닫기"`), 포커스 트랩 주석 설명
2. `scss/6-components/_modal.scss` 작성 — Bootstrap `.modal` 오버라이드, 오버레이 색상 토큰, z-index 토큰 적용
3. 모달 포커스 트랩 구현 패턴 문서화 — `focusable elements` 선택자 목록, `Tab`/`Shift+Tab` 순환 로직 설명 (JS 예시 코드 또는 링크)
4. `docs/_includes/snippets/tab.html` 작성 — `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `aria-labelledby` 완전한 ARIA 패턴
5. `scss/6-components/_tab.scss` 작성 — Bootstrap `.nav-tabs` 오버라이드, `aria-selected="true"` 상태 스타일 (CSS attribute selector 활용)
6. `docs/_includes/snippets/slider.html` 작성 — Swiper.js 기반 마크업, `aria-live="off"` (자동재생 중) / `"polite"` (정지 후) 전환 패턴, 정지/재생 버튼 (`aria-label`, `aria-pressed`)
7. Swiper 접근성 설정 주석 작성 — `a11y: true`, `keyboard: { enabled: true }` Swiper 옵션 설명
8. `scss/6-components/_slider.scss` 작성 — 슬라이더 정지 버튼 스타일, 네비게이션 포커스 스타일

**Success Criteria** (what must be TRUE):
1. 모달 스니펫에 `role="dialog"`, `aria-modal="true"`, `aria-labelledby`가 모두 포함되어 있다
2. 탭 스니펫에 `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"` ARIA 패턴이 완전히 구현되어 있다
3. 슬라이더 스니펫에 정지/재생 버튼과 `aria-live` 전환 패턴이 포함되어 있다
4. 모달 포커스 트랩 구현 방법이 코드 예시 또는 구체적 설명으로 제공된다

**Plans:** 2/2 plans complete

Plans:
- [x] 09-01-PLAN.md — Modal + Tab SCSS/문서 + _index.scss @forward 3종 일괄 추가
- [x] 09-02-PLAN.md — Slider/Swiper SCSS/문서 (aria-live + 정지/재생 버튼)
**UI hint**: yes

---

### Phase 10: Eleventy 문서 사이트
**Goal**: 모든 컴포넌트 패턴과 가이드를 열람할 수 있는 Eleventy 기반 정적 문서 사이트를 구축하여, 팀원 누구나 브라우저에서 가이드를 확인하고 코드를 복사할 수 있도록 한다.
**Depends on**: Phase 1 ~ Phase 9 (콘텐츠 산출물이 먼저 존재해야 함)
**Requirements**: DOCS-01, DOCS-02, DOCS-03, DOCS-04, DOCS-05, DOCS-06, DOCS-07

**Plans**:
1. `docs/` 디렉토리에 Eleventy 3.x 설정 — `eleventy.config.js` (ESM) 작성, `input: "docs"`, `output: "_site"` 설정, SCSS passthrough 또는 `addExtension` 처리
2. Nunjucks 기본 레이아웃 작성 — `docs/_includes/layouts/base.njk`: 사이드 네비게이션, 콘텐츠 영역, 코드 복사 버튼 포함
3. 사이드 네비게이션 구조 작성 — 섹션: 시작하기 / SCSS 구조 / 디자인 토큰 / 반응형 / 접근성 / 컴포넌트 / 스타터 킷 / 컨벤션
4. 컨벤션 섹션 페이지 작성 (`docs/convention/`) — SCSS 규칙, 네이밍 가이드, 코딩 스타일, Git 커밋 규칙 페이지
5. 토큰 섹션 페이지 작성 (`docs/tokens/`) — 색상 스워치 표, 타이포그래피 스케일 미리보기, 간격 시각화, 기타 토큰 목록
6. 컴포넌트 섹션 페이지 작성 (`docs/components/`) — Phase 6~9 스니펫 embed, 접근성 주의사항 카드, 코드 블록
7. 접근성 섹션 페이지 작성 (`docs/accessibility/`) — KRDS 체크리스트, 색상 대비 가이드, 키보드 탐색 패턴
8. 코드 복사 기능 구현 — `<button class="copy-btn" aria-label="코드 복사">` + 클립보드 API 바닐라 JS (최소화)
9. `npm run serve` 스크립트 설정 — Eleventy dev 서버 `localhost:8080` 실행, SCSS watch 병렬 실행 (`npm-run-all2 --parallel`)
10. `npm run build` 스크립트 설정 — SCSS 빌드 → Eleventy 빌드 순차 실행, `_site/` 출력 확인

**Success Criteria** (what must be TRUE):
1. `npm run serve` 실행 시 `localhost:8080`에서 문서 사이트가 열린다
2. `npm run build` 실행 시 오류 없이 `_site/` 디렉토리가 생성된다
3. 컨벤션, 토큰, 컴포넌트, 접근성 4개 섹션이 모두 탐색 가능하다
4. 코드 블록 옆의 복사 버튼 클릭 시 클립보드에 코드가 복사된다
5. 사이드 네비게이션에서 모든 섹션으로 이동할 수 있다

**Plans**: 3 plans

Plans:
- [x] 10-01-PLAN.md — Eleventy 설치/설정 + base.njk 레이아웃 + npm scripts
- [x] 10-02-PLAN.md — 기존 마크다운 16개 frontmatter 추가 + 섹션 인덱스 페이지
- [x] 10-03-PLAN.md — 토큰/컨벤션 신규 페이지 + 코드 복사 JS
**UI hint**: yes

---

### Phase 11: 스타터 킷
**Goal**: Phase 1~9에서 검증된 구조를 `starter/` 디렉토리에 패키징하여, 신규 프로젝트에서 복사 한 번으로 즉시 표준 환경을 시작할 수 있도록 한다.
**Depends on**: Phase 1 ~ Phase 9 (검증된 구조가 먼저 존재해야 함)
**Requirements**: STARTER-01, STARTER-02, STARTER-03, STARTER-04

**Plans**:
1. `starter/` 디렉토리 구성 — `package.json`, `.editorconfig`, `.gitignore`, `stylelint.config.json` 기본 파일 배치
2. `starter/scss/` 구조 작성 — `style.scss` 진입점 + `1-settings/`, `2-tools/`, `3-generic/`, `4-elements/`, `5-objects/`, `6-components/`, `7-utilities/` 빈 폴더 구조
3. SCSS 5종 파일 복사 및 정리 — `_variables.scss`, `_mixin.scss`, `_common.scss`, `_font.scss`, `_root.scss` 스타터 킷 버전으로 정리 (주석 표준화, 불필요한 실험 코드 제거)
4. `starter/html/` 기본 HTML 보일러플레이트 작성 — `index.html`: `lang="ko"`, `charset`, `viewport`, 본문건너뛰기 링크, Bootstrap JS CDN 주석, 올바른 메타태그 구조
5. `starter/package.json` 작성 — `sass`, `postcss`, `autoprefixer` 의존성, `build:css` / `watch:css` npm 스크립트
6. `starter/_project-overrides.scss` 파일 포함 — 프로젝트별 색상 오버라이드 예시 주석 포함
7. 스타터 킷 자체 빌드 테스트 — `starter/` 디렉토리에서 `npm install && npm run build:css` 실행하여 독립 동작 확인
8. `starter/README.md` 작성 (한국어) — 사전 요구사항, 시작 방법(5단계 이내), SCSS 구조 설명, Bootstrap 오버라이드 방법, 폰트 전환 방법

**Success Criteria** (what must be TRUE):
1. `starter/` 디렉토리를 복사하여 `npm install && npm run build:css` 실행 시 오류 없이 CSS가 생성된다
2. `starter/scss/`에 5종 표준 SCSS 파일이 모두 포함되어 있다
3. `starter/html/index.html`에 본문건너뛰기 링크, `lang="ko"`, `viewport` 메타태그가 포함되어 있다
4. `starter/README.md`에 신규 프로젝트 시작 방법이 5단계 이내로 안내되어 있다

**Plans**: 2 plans

Plans:
- [x] 11-01-PLAN.md — ITCSS SCSS 구조 + 5종 핵심 파일 + package.json
- [x] 11-02-PLAN.md — HTML 보일러플레이트 + README 한국어 시작 가이드
**UI hint**: yes

---

### Phase 12: 컨벤션 문서화
**Goal**: 클래스 네이밍, SCSS 작성 규칙, HTML 기본 구조, 코딩 스타일, Git 커밋 규칙을 명문화하여 팀 전체의 코드 일관성을 보장한다.
**Depends on**: Phase 1 ~ Phase 11 (전체 구조가 확정된 후 문서화)
**Requirements**: CONV-01, CONV-02, CONV-03, CONV-04, CONV-05

**Plans**: 3 plans

Plans:
- [x] 12-01-PLAN.md — naming.md + scss-rules.md 생성 (CONV-01, CONV-02)
- [x] 12-02-PLAN.md — html-structure.md + coding-style.md + git-rules.md 생성 (CONV-03, CONV-04, CONV-05)
- [x] 12-03-PLAN.md — conventions/index.md 허브 전환 + navigation.js 업데이트

**Success Criteria** (what must be TRUE):
1. 클래스 네이밍 규칙 문서에 Bootstrap 유틸리티 사용 기준과 커스텀 클래스 작성 규칙이 명시되어 있다
2. SCSS 중첩 깊이 제한(3단계)과 속성 순서 규칙이 예시 코드와 함께 문서화되어 있다
3. Git 커밋 메시지 규칙에 타입 분류, 한국어 명령형, 실제 예시가 포함되어 있다
4. HTML 마크업 기본 구조 체크리스트가 존재한다
5. 문서 사이트의 Convention 섹션에서 모든 컨벤션 페이지를 열람할 수 있다

**Plans**: TBD
**UI hint**: yes

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. 프로젝트 초기 설정 | 0/10 | Not started | - |
| 2. SCSS 기반 파일 표준화 | 0/10 | Not started | - |
| 3. 디자인 토큰 | 0/9 | Not started | - |
| 4. 반응형 시스템 | 1/1 | Complete   | 2026-03-26 |
| 5. 접근성 기반 | 3/3 | Complete   | 2026-03-26 |
| 6. 핵심 컴포넌트 — 레이아웃 | 2/2 | Complete   | 2026-03-26 |
| 7. 핵심 컴포넌트 — 폼 | 2/2 | Complete   | 2026-03-26 |
| 8. 핵심 컴포넌트 — UI | 2/2 | Complete   | 2026-03-26 |
| 9. 핵심 컴포넌트 — 오버레이 | 2/2 | Complete   | 2026-03-26 |
| 10. Eleventy 문서 사이트 | 3/3 | Complete    | 2026-03-27 |
| 11. 스타터 킷 | 2/2 | Complete    | 2026-03-27 |
| 12. 컨벤션 문서화 | 3/3 | Complete    | 2026-03-27 |

---

## Coverage Map

| Requirement ID | Phase | Description |
|----------------|-------|-------------|
| SCSS-01 | Phase 1 | style.scss 표준 진입점 |
| SCSS-07 | Phase 1 | 파일 로드 순서 문서화 |
| SCSS-02 | Phase 2 | Bootstrap 변수 오버라이드 파일 |
| SCSS-03 | Phase 2 | 팀 공통 믹스인 표준화 |
| SCSS-04 | Phase 2 | 공통 기본 스타일 표준화 |
| SCSS-05 | Phase 2 | 폰트 파일 표준화 |
| SCSS-06 | Phase 2 | CSS Custom Properties 루트 파일 뼈대 |
| TOKEN-01 | Phase 3 | 색상 토큰 CSS Custom Properties |
| TOKEN-02 | Phase 3 | 타이포그래피 토큰 |
| TOKEN-03 | Phase 3 | 간격 토큰 4px 기반 스케일 |
| TOKEN-04 | Phase 3 | 그림자/전환/z-index 토큰 |
| TOKEN-05 | Phase 3 | Bootstrap 변수와 CSS Custom Properties 매핑 |
| TOKEN-06 | Phase 3 | 프로젝트별 색상 오버라이드 패턴 |
| RESP-01 | Phase 4 | 브레이크포인트 4단계 정의 |
| RESP-02 | Phase 4 | respond-to() 믹스인 |
| RESP-03 | Phase 4 | 모바일 퍼스트 기준 문서화 |
| A11Y-01 | Phase 5 | 본문건너뛰기 링크 패턴 |
| A11Y-02 | Phase 5 | sr-only / sr-only-focusable |
| A11Y-03 | Phase 5 | 포커스 스타일 표준 |
| A11Y-04 | Phase 5 | 이미지 대체텍스트 기준 |
| A11Y-05 | Phase 7 | 폼 접근성 패턴 |
| A11Y-06 | Phase 5 | 색상 대비 기준 |
| A11Y-07 | Phase 5 | 키보드 탐색 지원 기준 |
| A11Y-08 | Phase 5 | KRDS 접근성 체크리스트 |
| A11Y-09 | Phase 9 | 동적 콘텐츠 접근성 패턴 |
| COMP-01 | Phase 6 | 헤더/GNB 마크업 패턴 |
| COMP-02 | Phase 8 | 버튼 컴포넌트 패턴 |
| COMP-03 | Phase 7 | 폼 컴포넌트 패턴 |
| COMP-04 | Phase 8 | 카드 컴포넌트 패턴 |
| COMP-05 | Phase 8 | 테이블 컴포넌트 패턴 |
| COMP-06 | Phase 9 | 모달 컴포넌트 패턴 |
| COMP-07 | Phase 9 | 탭 컴포넌트 패턴 |
| COMP-08 | Phase 8 | 페이지네이션 컴포넌트 패턴 |
| COMP-09 | Phase 8 | 브레드크럼 컴포넌트 패턴 |
| COMP-10 | Phase 9 | 슬라이더/Swiper 접근성 패턴 |
| DOCS-01 | Phase 10 | Eleventy 문서 사이트 로컬 실행 |
| DOCS-02 | Phase 10 | 컨벤션 섹션 문서화 |
| DOCS-03 | Phase 10 | 토큰 섹션 문서화 |
| DOCS-04 | Phase 10 | 컴포넌트 섹션 문서화 |
| DOCS-05 | Phase 10 | 접근성 섹션 문서화 |
| DOCS-06 | Phase 10 | 코드 복사 기능 |
| DOCS-07 | Phase 10 | npm 단일 명령 빌드 |
| STARTER-01 | Phase 11 | starter/ 디렉토리 사용 가능 |
| STARTER-02 | Phase 11 | 스타터 킷 SCSS 파일 구조 |
| STARTER-03 | Phase 11 | 기본 HTML 보일러플레이트 |
| STARTER-04 | Phase 11 | 스타터 킷 README |
| CONV-01 | Phase 12 | 클래스 네이밍 규칙 |
| CONV-02 | Phase 12 | SCSS 작성 규칙 |
| CONV-03 | Phase 12 | HTML 마크업 기본 구조 |
| CONV-04 | Phase 12 | 코딩 스타일 규칙 |
| CONV-05 | Phase 12 | Git 커밋 메시지 규칙 |

**Coverage: 50/50 v1 requirements mapped (46 REQUIREMENTS.md + 4 A11Y-05 cross-phase)**

> 참고: A11Y-05 (폼 접근성 패턴)는 Phase 5(접근성 기반)와 Phase 7(핵심 컴포넌트 — 폼) 양쪽에 걸쳐 있으나, 구현 주체는 Phase 7로 단일 지정. Phase 5에서는 원칙 문서화, Phase 7에서는 코드 구현.

---

## Phase 의존성 다이어그램

```
Phase 1 (초기 설정)
  └─> Phase 2 (SCSS 기반)
        ├─> Phase 3 (디자인 토큰)
        │     └─> Phase 6 (레이아웃)
        │     └─> Phase 7 (폼)
        │     └─> Phase 8 (UI)
        │     └─> Phase 9 (오버레이)
        ├─> Phase 4 (반응형)
        │     └─> Phase 6 (레이아웃)
        └─> Phase 5 (접근성 기반)
              └─> Phase 6 (레이아웃)
              └─> Phase 7 (폼)
              └─> Phase 8 (UI)
              └─> Phase 9 (오버레이)

Phase 3 + 4 + 5 → Phase 6, 7, 8, 9 (병렬 진행 가능)

Phase 6 + 7 + 8 + 9
  └─> Phase 10 (Eleventy 문서 사이트)
  └─> Phase 11 (스타터 킷)

Phase 10 + 11 → Phase 12 (컨벤션 문서화)
```

**병렬 진행 가능 구간:**
- Phase 3, Phase 4, Phase 5 — Phase 2 완료 후 동시에 시작 가능
- Phase 6, Phase 7, Phase 8, Phase 9 — Phase 3 + 4 + 5 완료 후 동시에 시작 가능
- Phase 10, Phase 11 — Phase 6~9 완료 후 동시에 시작 가능

### Phase 13: v1.0 Tech Debt 정리

**Goal:** v1.0 마일스톤 감사에서 발견된 tech debt 5건을 정리한다. 추적 문서 정합성, 문서 사이트 minor gap, 코드 주석 수정.
**Requirements**: SCSS-01~07, TOKEN-01~06, STARTER-04, DOCS-03
**Depends on:** Phase 12
**Plans:** 1/1 plans complete

Plans:
- [ ] 13-01-PLAN.md — REQUIREMENTS.md 업데이트 + 문서 사이트 gap 3건 + 주석 수정

---

*Last updated: 2026-03-26 — Phase 13 완료. v1.0 마일스톤 전체 완료 (13 phases, 27 plans)*
