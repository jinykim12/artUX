# artpqUX 퍼블리싱 가이드 — Claude 작업 규칙

이 프로젝트는 아트피큐 팀의 퍼블리싱 표준을 따른다.
코드 생성, 수정, 리뷰 시 아래 규칙을 반드시 준수한다.

## 가이드 문서 참조

**artpqUX 퍼블리싱 가이드 전체 문서:** https://github.com/jinykim12/artpqUX

가이드 문서에는 다음 내용이 포함되어 있다:
- 컴포넌트 마크업 패턴 (헤더, 폼, 버튼, 카드, 테이블, 모달, 탭, 슬라이더 등)
- 접근성 가이드 (KRDS 체크리스트, 색상 대비, 키보드 탐색, 이미지 대체텍스트)
- 컨벤션 (네이밍, SCSS 작성 규칙, HTML 구조, 코딩 스타일, Git 커밋)
- 디자인 토큰 (색상, 타이포, 간격, 그림자, z-index)

**코드 작성 전에 해당 컴포넌트/패턴의 가이드 문서를 반드시 읽고 따른다.**

---

## 핵심 규칙

### SCSS

- **ITCSS 7단계 구조를 따른다:** 1-settings → 2-tools → 3-generic → 4-elements → 5-objects → 6-components → 7-utilities
- **계층형 중첩으로 작성한다.** HTML 구조를 SCSS에 반영하되, 최대 4단계 이내로 유지한다.
- **`&` 결합자를 활용한다.** BEM 수정자(`&--modifier`), 의사 클래스(`&:hover`), 미디어쿼리(`@include respond-to()`)는 중첩 깊이에 포함하지 않는다.
- **CSS Custom Properties(토큰)를 사용한다.** 색상은 `var(--color-*)`, 폰트는 `var(--font-size-*)`, 간격은 `var(--spacing-*)`. 하드코딩된 값 사용 금지.
- **들여쓰기는 4 spaces.** 탭 문자 금지.
- **한국어 주석을 작성한다.** 영문 주석은 외부 라이브러리 인용 시에만 허용.
- **`transition: none`** — 공공기관 납품 기준. 애니메이션/전환 효과는 기본적으로 사용하지 않는다.
- **Bootstrap 클래스를 직접 수정하지 않는다.** CSS 선택자 후속 선언으로 오버라이드한다.

### 반응형

- **`respond-to()` 믹스인을 사용한다.** 미디어쿼리 픽셀값을 직접 쓰지 않는다.
- **모바일 퍼스트:** 기본 스타일은 모바일 기준, `respond-to(tablet)` / `respond-to(pc)` 등으로 넓은 화면 확장.
- **키워드:** `mobile-only`, `tablet`, `tablet-only`, `pc-sm`, `pc-sm-only`, `pc`

### 접근성 (KWCAG 2.1 AA)

- **`outline: none` 사용 금지.** 포커스 스타일은 `_focus.scss`의 전역 `:focus-visible` 규칙이 처리한다.
- **최소 터치영역 44px(4.4rem)을 보장한다.** 버튼, 탭, 체크박스, 라디오, 슬라이더 컨트롤 등 모든 인터랙티브 요소에 `min-height: var(--touch-target-min)` 적용.
- **`aria-*` 속성을 빠뜨리지 않는다.** 특히 `aria-expanded`, `aria-controls`, `aria-label`, `aria-current="page"`.
- **`<img>`에 `alt` 속성 필수.** 장식 이미지는 `alt=""`, 의미 이미지는 내용 설명.
- **폼 요소에 `<label for="id">` 연결 필수.** `aria-describedby`로 에러 메시지 연결.
- **색상 대비 4.5:1 이상.** 대형 텍스트(18pt/14pt bold)는 3:1.

### 컴포넌트 작성 패턴

- **6-components/ 디렉토리에 파일을 추가한다.** 파일명: `_컴포넌트명.scss`
- **`_index.scss`에 `@forward '컴포넌트명';`을 추가한다.**
- **`@use '../2-tools/breakpoints' as *;`** 로 반응형 믹스인을 임포트한다.
- **디자인 토큰만 사용한다.** `color: #333` 대신 `color: var(--color-text)`.

### HTML

- **`lang="ko"`** 필수.
- **본문건너뛰기 링크** `<a href="#main-content" class="skip-nav">본문 바로가기</a>` 포함.
- **시맨틱 태그 사용:** `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`.

### Git 커밋

- **한국어 명령형:** `feat: 헤더 컴포넌트 추가`, `fix: 모달 포커스 트랩 수정`
- **타입:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `a11y`

---

## REM 환경

이 프로젝트는 `Bootstrap 기본값` 설정을 사용한다.
- **1rem = 16px** (일반적인 1rem = 16px와 다르다)
- px → rem 환산: `px / 16 = rem` (예: 44px = 2.75rem)
- 모든 크기값은 rem 단위로 작성한다.

## 디자인 토큰 빠른 참조

```
색상:     --color-primary, --color-secondary, --color-text, --color-bg, --color-border, --color-error, --color-success
폰트:     --font-size-xs(11px), --font-size-sm(13px), --font-size-base(16px), --font-size-md(19px), --font-size-lg(22px), --font-size-xl(28px), --font-size-2xl(36px)
간격:     --spacing-xs(4px), --spacing-sm(8px), --spacing-md(20px), --spacing-lg(28px), --spacing-xl(32px), --spacing-2xl(48px), --spacing-3xl(64px)
터치:     --touch-target-min(44px)
그림자:   --shadow-sm, --shadow-md, --shadow-lg
전환:     --transition-fast(150ms), --transition-base(300ms)
z-index:  --z-dropdown(1000), --z-overlay(1040), --z-modal(1050)
```
