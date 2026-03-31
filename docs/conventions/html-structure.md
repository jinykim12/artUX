---
layout: layouts/base.njk
title: HTML 마크업 기본 구조
tags: conventions
section: conventions
permalink: /conventions/html-structure/
---

# HTML 마크업 기본 구조

아트피큐 팀 HTML 파일의 초기 구조 기준을 정의한다. 모든 신규 HTML 파일은 아래 보일러플레이트를 기반으로 시작한다.

> **왜 표준 보일러플레이트가 필요한가?**
> 파일마다 `charset`을 빠뜨리거나 `lang` 속성이 없으면 공공기관 접근성 검수에서 즉시 지적된다. 표준 시작점을 팀 전체가 공유하면 "이 파일에는 본문건너뛰기가 있는지?" "viewport는 올바른가?"를 매번 확인하지 않아도 된다.

---

## 1. HTML 보일러플레이트

모든 신규 HTML 파일은 아래 구조에서 시작한다. `starter/html/index.html`이 이 구조를 그대로 포함하고 있으므로 복사해서 쓴다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="프로젝트 설명을 입력하세요">
  <title>페이지 제목 | 사이트명</title>
  <link rel="stylesheet" href="../dist/style.css">
</head>
<body>
  <!-- 본문건너뛰기 링크 (KWCAG 2.1 AA — 접근성 필수) -->
  <a href="#main-content" class="skip-nav">본문 바로가기</a>

  <!-- 헤더 영역 -->
  <header role="banner">
    <nav aria-label="주요 메뉴">
      <!-- GNB 마크업 -->
    </nav>
  </header>

  <!-- 메인 콘텐츠 -->
  <main id="main-content">
    <div class="container">
      <!-- 페이지 콘텐츠 -->
    </div>
  </main>

  <!-- 푸터 -->
  <footer role="contentinfo">
    <!-- 저작권, 연락처, 사이트맵 -->
  </footer>
</body>
</html>
```

> **규칙: 신규 HTML 파일은 위 보일러플레이트를 그대로 복사해서 시작한다. `lang`, `charset`, `viewport`, 본문건너뛰기, `id="main-content"` 다섯 항목은 절대 삭제하지 않는다.**

---

## 2. 필수 head 메타태그

각 메타태그가 왜 필요한지 이유와 함께 확인한다. 공공기관 검수에서 이 항목들을 빠짐없이 확인한다.

| 태그 | 설명 |
|------|------|
| `<meta charset="UTF-8">` | 파일 인코딩과 동일하게 UTF-8 설정 — 한국어 깨짐 방지 |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | 반응형 레이아웃 필수. 없으면 모바일에서 PC 화면 그대로 축소됨 |
| `<meta http-equiv="X-UA-Compatible" content="IE=edge">` | IE 호환성 — 공공기관 납품 시 IE 최신 렌더링 모드 강제 적용 |
| `<title>` | 형식: **페이지 제목 \| 사이트명** — 스크린 리더 첫 읽음 항목, SEO 기준 |

### title 작성 기준

`<title>`은 스크린 리더가 페이지를 열자마자 가장 먼저 읽는 항목이다. "어느 페이지인지"와 "어느 사이트인지"를 함께 전달해야 한다. 사이트명만 반복하면 탭을 여러 개 열었을 때 구분이 불가능하다.

❌ 나쁜 예: 사이트명만 반복 — 어느 페이지인지 알 수 없음
```html
<title>마라톤 포털</title>
<title>마라톤 포털</title>
```

✅ 좋은 예: 페이지 제목 + 구분자(`|`) + 사이트명 형식 유지
```html
<title>회원가입 | 제주어사전</title>
<title>공지사항 목록 | 마라톤 포털</title>
```

---

## 3. lang 속성 규칙

`<html lang="ko">` 는 스크린 리더가 언어를 인식해 올바른 발음으로 읽게 한다. 이 속성이 없으면 스크린 리더가 한국어 텍스트를 영어 발음으로 읽어 전혀 이해할 수 없는 소리가 난다. KWCAG 2.1 "이해 가능" 원칙의 핵심 요구사항이다.

- `<html lang="ko">` 필수 — **모든 HTML 파일**에 적용
- 영문 혼용 페이지에서 영문 구간은 `<span lang="en">`으로 인라인 처리

영문 텍스트를 `lang="en"`으로 감싸면 스크린 리더가 해당 구간만 영어 발음으로 전환하여 읽는다.

```html
<!-- 영문 혼용 시 lang 인라인 처리 예시 -->
<p>최신 버전은 <span lang="en">Bootstrap 5</span>입니다.</p>
```

> **규칙: 모든 HTML 파일에 `<html lang="ko">`를 작성한다. 영문 단어나 문장이 포함된 경우 `<span lang="en">`으로 감싸서 스크린 리더가 올바르게 읽도록 처리한다.**

---

## 4. 본문건너뛰기 (Skip Navigation)

키보드 사용자와 스크린 리더 사용자가 헤더, GNB 등 반복 내비게이션을 건너뛰고 바로 본문으로 이동할 수 있는 링크다. 이 링크가 없으면 탭 키로 페이지를 탐색하는 사용자가 매번 GNB 메뉴 전체를 통과해야 한다. **KWCAG 2.1 — 2.4.1 블록 건너뛰기** 필수 항목이다.

### 구현 기준

- 항상 `<body>` 최상단에 위치 — 탭 키를 누르면 가장 먼저 포커스가 이동해야 함
- `transition: none` — 공공기관 표준, 즉시 노출 (애니메이션 없음)
- `href="#main-content"` 로 `<main id="main-content">`와 연결

아래 코드는 본문건너뛰기를 `body` 최상단에 배치하고 연결 대상 `<main>`에 id를 부여하는 올바른 구현이다.

```html
<!-- body 최상단 배치 — 탭 시 첫 번째 포커스 요소 -->
<a href="#main-content" class="skip-nav">본문 바로가기</a>

<!-- 연결 대상 — id="main-content" 필수 -->
<main id="main-content">
  ...
</main>
```

### SCSS 구현 (`.skip-nav`)

이 스타일은 기본적으로 화면 밖에 숨겨져 있다가, 포커스를 받으면 화면 상단에 나타나는 패턴이다.

```scss
/* scss/6-components/_skip-nav.scss */
.skip-nav {
  position: absolute;
  top: -9999px; /* 평소에는 화면 밖으로 숨김 */
  left: 0;
  /* transition 없음 — 공공기관 즉시 노출 원칙 */

  &:focus {
    top: 0; /* 탭 키로 포커스 시 즉시 화면 상단에 노출 */
    z-index: 9999;
  }
}
```

---

## 5. 시맨틱 태그 사용 기준

`<div>` 남용을 지양하고 의미에 맞는 HTML5 시맨틱 태그를 사용한다. 시맨틱 태그를 올바르게 사용하면 스크린 리더가 페이지 구조를 자동으로 파악해서 "헤더로 이동", "메인 콘텐츠로 이동" 같은 빠른 이동 기능을 제공한다. `<div>`만 사용하면 이 기능이 작동하지 않는다.

| 태그 | 사용 기준 |
|------|-----------|
| `<header>` | 사이트 전체 또는 섹션의 소개/내비게이션 영역 |
| `<nav>` | 주요 내비게이션 링크 모음. 복수일 경우 `aria-label`로 구분 |
| `<main>` | 페이지 주요 콘텐츠. **한 페이지에 하나만** |
| `<section>` | 제목(`<h2>`~)을 가진 독립적인 콘텐츠 구역 |
| `<article>` | 독립적으로 배포 가능한 콘텐츠 (게시글, 카드, 뉴스 아이템) |
| `<aside>` | 보조 콘텐츠 (사이드바, 관련 링크, 광고 영역) |
| `<footer>` | 저작권, 연락처, 사이트맵 |

❌ 나쁜 예: `<div>` 남용 — 스크린 리더가 구조를 파악할 수 없다
```html
<div class="header">
  <div class="nav">...</div>
</div>
<div class="content">
  <div class="post">...</div>
</div>
```

✅ 좋은 예: 시맨틱 태그 활용 — 스크린 리더가 랜드마크로 빠르게 탐색 가능
```html
<header role="banner">
  <nav aria-label="주요 메뉴">...</nav>
</header>
<main id="main-content">
  <article>...</article>
</main>
```

> **규칙: 레이아웃 래퍼 외 의미 있는 구역에는 시맨틱 태그를 사용한다. `<nav>`가 여러 개일 경우 `aria-label`로 반드시 구분한다.**

---

## 6. 기타 필수 규칙

### type="button" 명시

`<form>` 안에 있는 버튼은 기본값이 `type="submit"`이다. 명시하지 않으면 버튼을 클릭할 때마다 폼이 제출되어 페이지가 새로고침되는 의도치 않은 동작이 발생한다.

❌ 나쁜 예: type 미지정 — form 안에서 클릭 시 의도치 않게 폼 제출됨
```html
<button>닫기</button>
```

✅ 좋은 예: type을 명시적으로 선언 — 동작 의도가 명확해짐
```html
<button type="button">닫기</button>
<button type="submit">저장</button>
```

> **규칙: `<button>` 요소는 반드시 `type="button"` 또는 `type="submit"`을 명시한다. type 생략은 금지이다.**

### alt 속성 필수

`alt` 속성이 없으면 스크린 리더가 파일명(`profile.jpg` 등)을 그대로 읽어 사용자가 이미지 내용을 알 수 없다. 장식용 이미지는 `alt=""`(빈 값)으로 스크린 리더가 건너뛰도록 지시한다.

모든 `<img>` 에 `alt` 속성을 반드시 추가한다.

```html
<!-- 장식용 이미지 — alt="" 빈 값으로 스크린 리더가 건너뜀 -->
<img src="deco-line.png" alt="">

<!-- 의미 있는 이미지 — 이미지가 전달하는 내용을 텍스트로 설명 -->
<img src="profile.jpg" alt="홍길동 프로필 사진">
```

> **규칙: 모든 `<img>` 에 `alt` 속성을 추가한다. 이미지가 장식용이라면 `alt=""`(빈 값)을 명시한다. `alt` 속성 자체를 생략하는 것은 금지이다.**

### tabindex 양수 사용 금지

`tabindex="1"` 이상의 양수 값은 자연스러운 탭 순서를 인위적으로 변경하여 키보드 사용자를 혼란스럽게 만든다. DOM 순서 자체가 논리적이도록 마크업을 구성하는 것이 올바른 방법이다.

❌ 나쁜 예: tabindex 양수 — 탭 순서가 DOM 순서와 달라 예측 불가능
```html
<button tabindex="3">세 번째</button>
<button tabindex="1">첫 번째</button>
```

✅ 좋은 예: DOM 순서 그대로 — 자연스러운 탭 흐름
```html
<button>첫 번째</button>
<button>세 번째</button>
```

### 이메일/전화번호 링크

이메일과 전화번호는 클릭/탭 시 기본 앱이 열리는 `href` 스킴을 사용한다. 스크린 리더도 링크 목적을 인식할 수 있다.

```html
<a href="mailto:contact@artux.kr">이메일 문의</a>
<a href="tel:02-0000-0000">02-0000-0000</a>
```
