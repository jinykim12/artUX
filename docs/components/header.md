---
layout: layouts/base.njk
title: 헤더 / GNB
tags: components
section: components
permalink: /components/header/
---

# 헤더 / GNB (COMP-01)

**KWCAG 2.1 기준:** 2.4.3 초점 순서, 2.4.6 제목 및 레이블, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-26

> 헤더 컴포넌트는 PC 환경에서 수평 GNB(WAI-ARIA Disclosure Navigation 패턴)를,
> 모바일 환경에서 햄버거 버튼 + 전체메뉴 패널(aria-hidden 토글 방식)을 제공한다.
> CSS 클래스명은 `scss/6-components/_header.scss`와 일치시킨다.

---

## 기본 구조

헤더는 다음 순서로 구성된다. 이 순서는 스크린리더 사용자가 탐색하는 DOM 순서와 일치해야 한다:

```
<header class="header" role="banner">
  ├── <a class="skip-nav">본문 바로가기</a>        (스크린리더/키보드 전용)
  ├── <div class="header__inner">
  │     ├── <a class="header__logo">로고</a>
  │     ├── <nav class="header__gnb">PC GNB</nav>  (pc-sm 이상 표시)
  │     └── <button class="header__hamburger">     (pc-sm 미만 표시)
  └── <div class="header__mobile-menu">             (모바일 전체메뉴 패널)
```

- `role="banner"` — 페이지 헤더 랜드마크다. 스크린리더 사용자가 "랜드마크 탐색" 기능으로 헤더를 바로 찾을 수 있게 한다. `<header>` 태그의 암묵적 role이므로 별도 추가 없이도 적용된다.
- skip-nav(본문건너뛰기 링크)는 키보드 사용자가 반복되는 메뉴를 건너뛰고 바로 본문으로 이동할 수 있게 한다. `_skip-nav.scss` 참고 (`docs/accessibility/keyboard.md`)
- PC GNB와 모바일 전체메뉴 패널은 별도 마크업으로 작성한다. 두 메뉴를 하나로 공유하면 DOM 순서와 화면 표시가 어긋나 스크린리더 탐색에 혼란을 준다.

---

## PC GNB 마크업

**패턴:** WAI-ARIA Disclosure Navigation
**출처:** <a href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Disclosure Navigation <span class="sr-only">(새 창)</span></a>

**규칙: GNB 내비게이션에는 `role="menu"` / `role="menuitem"`을 절대 사용하지 않는다. `<nav>` + `<button>`(Disclosure 패턴)만 사용한다.**

PC GNB 전체 구조다. 서브메뉴가 있는 항목은 `<button>` + 숨겨진 `<ul>`로 구성하고, 없는 항목은 `<a>` 링크만 배치한다:

<div class="docs-preview">
<nav aria-label="주 메뉴" class="header__gnb">
  <ul class="gnb list-unstyled d-flex gap-3 m-0 p-0">
    <li class="gnb__item">
      <button type="button" class="gnb__toggle btn btn-link p-2 text-decoration-none" aria-expanded="false" aria-controls="preview-submenu-about">
        기관 소개
      </button>
      <ul id="preview-submenu-about" class="gnb__sub list-unstyled m-0 pt-2 ps-3" hidden>
        <li><a href="#preview-about-intro" class="gnb__link" onclick="return false;">기관 소개</a></li>
        <li><a href="#preview-about-org" class="gnb__link" onclick="return false;">조직도</a></li>
        <li><a href="#preview-about-history" class="gnb__link" onclick="return false;">연혁</a></li>
      </ul>
    </li>
    <li class="gnb__item">
      <button type="button" class="gnb__toggle btn btn-link p-2 text-decoration-none" aria-expanded="false" aria-controls="preview-submenu-service">
        사업 안내
      </button>
      <ul id="preview-submenu-service" class="gnb__sub list-unstyled m-0 pt-2 ps-3" hidden>
        <li><a href="#preview-service-a" class="gnb__link" onclick="return false;">사업 A</a></li>
        <li><a href="#preview-service-b" class="gnb__link" onclick="return false;">사업 B</a></li>
      </ul>
    </li>
    <li class="gnb__item">
      <a href="#preview-news" class="gnb__link" onclick="return false;">소식</a>
    </li>
    <li class="gnb__item">
      <a href="#preview-contact" class="gnb__link" aria-current="page" onclick="return false;">문의</a>
    </li>
  </ul>
</nav>
<script>
(function(){
  var toggles = document.querySelectorAll('.docs-preview .gnb__toggle');
  toggles.forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var submenu = document.getElementById(btn.getAttribute('aria-controls'));
      if(expanded){
        btn.setAttribute('aria-expanded','false');
        submenu.setAttribute('hidden','');
      } else {
        toggles.forEach(function(other){
          if(other !== btn){
            other.setAttribute('aria-expanded','false');
            var otherSub = document.getElementById(other.getAttribute('aria-controls'));
            if(otherSub) otherSub.setAttribute('hidden','');
          }
        });
        btn.setAttribute('aria-expanded','true');
        submenu.removeAttribute('hidden');
      }
    });
  });
})();
</script>
</div>

```html
<!-- PC GNB: Disclosure Navigation 패턴 -->
<nav aria-label="주 메뉴" class="header__gnb">
  <ul class="gnb">

    <!-- 서브메뉴가 있는 항목 -->
    <li class="gnb__item">
      <button type="button" class="gnb__toggle" aria-expanded="false" aria-controls="submenu-about">
        기관 소개
      </button>
      <ul id="submenu-about" class="gnb__sub" hidden>
        <li><a href="/about/intro" class="gnb__link">기관 소개</a></li>
        <li><a href="/about/org" class="gnb__link">조직도</a></li>
        <li><a href="/about/history" class="gnb__link">연혁</a></li>
      </ul>
    </li>

    <!-- 서브메뉴가 있는 항목 (예시 2) -->
    <li class="gnb__item">
      <button type="button" class="gnb__toggle" aria-expanded="false" aria-controls="submenu-service">
        사업 안내
      </button>
      <ul id="submenu-service" class="gnb__sub" hidden>
        <li><a href="/service/a" class="gnb__link">사업 A</a></li>
        <li><a href="/service/b" class="gnb__link">사업 B</a></li>
      </ul>
    </li>

    <!-- 단순 링크 항목 (서브메뉴 없음) -->
    <li class="gnb__item">
      <a href="/news" class="gnb__link">소식</a>
    </li>

    <!-- 현재 페이지 항목 (aria-current="page" 적용) -->
    <li class="gnb__item">
      <a href="/contact" class="gnb__link" aria-current="page">문의</a>
    </li>

  </ul>
</nav>
```

❌ 나쁜 예: GNB에 `role="menu"` / `role="menuitem"` 사용

```html
<!-- 잘못된 패턴 — 절대 사용 금지 -->
<ul role="menu">
  <li role="menuitem">기관 소개</li>
</ul>
```

이렇게 하면 스크린리더가 Tab 탐색을 막고 방향키 전용 탐색을 강제한다. 키보드 사용자가 메뉴를 Tab으로 이동할 수 없게 된다. `role="menu"`는 데스크탑 애플리케이션의 우클릭 컨텍스트 메뉴 전용이다.

✅ 좋은 예: `<nav>` + `<button>` (Disclosure Navigation 패턴)

```html
<nav aria-label="주 메뉴">
  <ul>
    <li>
      <button type="button" aria-expanded="false" aria-controls="submenu-about">기관 소개</button>
      <ul id="submenu-about" hidden>...</ul>
    </li>
  </ul>
</nav>
```

> **주의:** `aria-haspopup`은 Disclosure Navigation 패턴에서 사용하지 않습니다.
> `aria-haspopup`은 `role="menu"` 또는 `role="dialog"` 팝업에서만 의미 있다.
> Disclosure 서브메뉴(`<ul hidden>` 토글)에는 `aria-expanded`만으로 충분하다.

**Disclosure Navigation 핵심 규칙:**

| 속성 | 닫힘 상태 | 열린 상태 | 적용 요소 |
|------|-----------|-----------|-----------|
| `aria-expanded` | `"false"` | `"true"` | `<button class="gnb__toggle">` |
| `hidden` | 있음 | 없음 (JS로 제거) | `<ul class="gnb__sub">` |
| `aria-controls` | 서브메뉴 `id` 참조 | 동일 | `<button class="gnb__toggle">` |

- `aria-expanded` — 메뉴가 열려있는지 닫혀있는지를 스크린리더에 알려준다. 이 속성이 없으면 시각장애인은 버튼을 눌렀을 때 무슨 일이 일어났는지 알 수 없다.
- `aria-controls` — "이 버튼이 어떤 요소를 제어하는지"를 보조 기기에 알려준다. 서브메뉴의 `id`와 반드시 일치해야 한다.
- `hidden` — CSS가 아닌 HTML 속성으로 숨겨야 스크린리더가 완전히 무시한다. `display: none`은 CSS에 따라 동작이 달라질 수 있다.

---

## 모바일 전체메뉴 마크업

**패턴:** aria-hidden 토글 (D-04)

모바일 전체메뉴 패널은 DOM에 항상 존재하되, `aria-hidden="true"`로 숨겼다가
열 때 `aria-hidden="false"`로 전환한다. `display: none`으로 숨기지 않는 이유는 CSS 애니메이션과 JS 포커스 이동을 함께 처리하기 위해서다.

아래는 햄버거 버튼과 모바일 메뉴 패널의 전체 마크업이다:

```html
<!-- 헤더 내부 (header__inner 안) -->

<!-- 햄버거 버튼: pc-sm 이상에서 CSS로 숨김 -->
<button type="button" class="header__hamburger" aria-expanded="false" aria-controls="mobile-menu" aria-label="전체 메뉴 열기">
  <!-- 아이콘 막대 (스크린리더에서 숨김) -->
  <span class="header__hamburger-bar" aria-hidden="true"></span>
  <span class="header__hamburger-bar" aria-hidden="true"></span>
  <span class="header__hamburger-bar" aria-hidden="true"></span>
</button>

<!-- 모바일 메뉴 패널: header 태그 내부, header__inner 외부 -->
<div id="mobile-menu" class="header__mobile-menu" aria-hidden="true">
  <nav aria-label="전체 메뉴">
    <ul class="mobile-gnb">

      <!-- 현재 페이지 -->
      <li><a href="/" class="gnb__link" aria-current="page">홈</a></li>

      <!-- 서브메뉴 있는 항목 -->
      <li>
        <button type="button" class="gnb__toggle" aria-expanded="false" aria-controls="m-submenu-about">
          기관 소개
        </button>
        <ul id="m-submenu-about" class="gnb__sub" hidden>
          <li><a href="/about/intro" class="gnb__link">기관 소개</a></li>
          <li><a href="/about/org" class="gnb__link">조직도</a></li>
        </ul>
      </li>

      <!-- 단순 링크 -->
      <li><a href="/news" class="gnb__link">소식</a></li>
      <li><a href="/contact" class="gnb__link">문의</a></li>

    </ul>
  </nav>
</div>
```

**모바일 메뉴 핵심 규칙:**

| 속성 | 닫힘 상태 | 열린 상태 | 적용 요소 |
|------|-----------|-----------|-----------|
| `aria-expanded` | `"false"` | `"true"` | `<button class="header__hamburger">` |
| `aria-hidden` | `"true"` | `"false"` | `<div class="header__mobile-menu">` |
| `aria-label` | `"전체 메뉴 열기"` | `"전체 메뉴 닫기"` | `<button class="header__hamburger">` (JS로 업데이트) |

- 햄버거 아이콘 막대(`<span>`)에 `aria-hidden="true"`를 붙이는 이유: 스크린리더가 이 장식용 요소를 읽지 않도록 한다. 버튼의 목적은 `aria-label`로 이미 설명된다.
- 메뉴를 열 때 `aria-label`을 "전체 메뉴 닫기"로 업데이트하지 않으면, 이미 메뉴가 열린 상태에서도 "열기"로 안내되어 혼란을 준다.

---

## 현재 페이지 표시

`aria-current="page"` 속성은 현재 사용자가 보고 있는 페이지 링크에 적용한다. 스크린리더가 "현재 페이지" 링크를 강조해 읽어주기 때문에, 시각적 활성 표시와 함께 반드시 병행해야 한다.

현재 페이지와 일반 페이지 링크의 차이를 보여주는 예시다:

```html
<!-- 현재 /about 페이지에 있는 경우 -->
<li class="gnb__item">
  <a href="/about" class="gnb__link" aria-current="page">소개</a>
</li>

<!-- 다른 페이지 링크는 aria-current 없음 또는 false -->
<li class="gnb__item">
  <a href="/news" class="gnb__link">소식</a>
</li>
```

**동적 적용 방법 (서버 렌더링):**

서버 사이드에서 현재 URL과 일치하는 링크에만 `aria-current="page"` 속성을 출력한다.

```html
<!-- 예: Thymeleaf/Jinja/EJS 등 템플릿 엔진 사용 시 -->
<a href="/about" class="gnb__link" th:attrappend="aria-current=${currentPage == '/about' ? 'page' : null}">
  소개
</a>
```

**동적 적용 방법 (클라이언트 사이드 JS):**

현재 URL을 기준으로 일치하는 링크를 찾아 `aria-current="page"`를 자동으로 붙여준다:

```javascript
// 현재 URL을 기반으로 aria-current="page" 동적 적용
$(function () {
  var currentPath = window.location.pathname;
  var $gnbLinks = $('.gnb__link, .mobile-gnb .gnb__link');

  $gnbLinks.each(function () {
    var $link = $(this);
    // 정확히 일치하거나 해당 경로로 시작하는 링크에 적용
    if ($link.attr('href') === currentPath) {
      $link.attr('aria-current', 'page');
    }
  });
});
```

---

## 접근성 JS 예시

### 1. 햄버거 토글 (모바일 전체메뉴 열기/닫기)

메뉴 열기 → 첫 항목으로 포커스 이동, ESC 또는 닫기 → 햄버거 버튼으로 포커스 복귀가 핵심이다. 포커스가 메뉴 밖으로 이탈하면 키보드 사용자는 방향을 잃는다:

```javascript
$(function () {
  var $hamburger = $('.header__hamburger');
  var $mobileMenu = $('#mobile-menu');

  if (!$hamburger.length || !$mobileMenu.length) return;

  // 모바일 메뉴 닫기 함수 (ESC 키 처리와 공유)
  function closeMenu() {
    $hamburger.attr('aria-expanded', 'false');
    $hamburger.attr('aria-label', '전체 메뉴 열기');
    $mobileMenu.attr('aria-hidden', 'true');
    // 닫을 때 트리거 버튼으로 포커스 복귀 (D-09)
    $hamburger.focus();
  }

  // 햄버거 버튼 클릭 이벤트
  $hamburger.on('click', function () {
    var isExpanded = $hamburger.attr('aria-expanded') === 'true';

    if (isExpanded) {
      // 열린 상태 → 닫기
      closeMenu();
    } else {
      // 닫힌 상태 → 열기
      $hamburger.attr('aria-expanded', 'true');
      $hamburger.attr('aria-label', '전체 메뉴 닫기');
      $mobileMenu.attr('aria-hidden', 'false');

      // 메뉴 열릴 때 첫 번째 메뉴 항목으로 포커스 이동 (D-09)
      var $firstLink = $mobileMenu.find('a, button').first();
      if ($firstLink.length) $firstLink.focus();
    }
  });

  // ESC 키: 열린 메뉴 닫기 + 햄버거 버튼으로 포커스 복귀 (D-09)
  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      var isExpanded = $hamburger.attr('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      }
    }
  });
});
```

### 2. GNB 서브메뉴 토글 (PC GNB Disclosure Navigation)

서브메뉴를 열 때 다른 서브메뉴가 이미 열려 있다면 먼저 닫는다. 여러 서브메뉴가 동시에 열리면 시각적으로도, 스크린리더 탐색 흐름도 혼란스러워진다:

```javascript
$(function () {
  var $gnbToggles = $('.gnb__toggle');

  $gnbToggles.each(function () {
    var $toggle = $(this);
    // 토글 버튼이 제어하는 서브메뉴 가져오기
    var submenuId = $toggle.attr('aria-controls');
    var $submenu = $('#' + submenuId);

    if (!$submenu.length) return;

    // 서브메뉴 닫기 함수 (ESC 키 처리와 공유)
    function closeSubmenu() {
      $toggle.attr('aria-expanded', 'false');
      $submenu.prop('hidden', true);
      // ESC 시 토글 버튼으로 포커스 복귀 (D-09)
      $toggle.focus();
    }

    // 토글 버튼 클릭 이벤트
    $toggle.on('click', function () {
      var isExpanded = $toggle.attr('aria-expanded') === 'true';

      if (isExpanded) {
        // 열린 상태 → 닫기
        closeSubmenu();
      } else {
        // 닫힌 상태 → 열기: 다른 서브메뉴 먼저 닫기
        $gnbToggles.each(function () {
          var $otherToggle = $(this);
          if ($otherToggle.get(0) !== $toggle.get(0)) {
            var otherId = $otherToggle.attr('aria-controls');
            var $otherSubmenu = $('#' + otherId);
            if ($otherSubmenu.length) {
              $otherToggle.attr('aria-expanded', 'false');
              $otherSubmenu.prop('hidden', true);
            }
          }
        });

        // 현재 서브메뉴 열기
        $toggle.attr('aria-expanded', 'true');
        $submenu.prop('hidden', false);
      }
    });

    // ESC 키: 열린 서브메뉴 닫기 + 토글 버튼으로 포커스 복귀 (D-09)
    $submenu.on('keydown', function (event) {
      if (event.key === 'Escape') {
        var isExpanded = $toggle.attr('aria-expanded') === 'true';
        if (isExpanded) {
          closeSubmenu();
        }
      }
    });
  });
});
```

### 3. 방향키 탐색 (PC GNB 선택적 적용)

> 이 예시는 참고용이다. WAI-ARIA Disclosure Navigation 패턴에서 방향키 탐색은 필수가 아니다.
> Tab 키만으로 모든 항목에 접근 가능하면 KWCAG 2.1.1 기준을 충족한다.
> 방향키 탐색은 UX 개선을 위한 추가 기능으로 구현한다.

좌우 방향키로 GNB 최상위 항목 간 이동, 상하 방향키로 서브메뉴 내 이동을 구현하는 예시다:

```javascript
$(function () {
  var $gnbItems = $('.gnb > .gnb__item');

  $gnbItems.each(function (index) {
    var $item = $(this);
    var $focusableInItem = $item.find('.gnb__toggle, .gnb__link');
    var $submenu = $item.find('.gnb__sub');

    $focusableInItem.on('keydown', function (event) {

      // 좌우 방향키: GNB 최상위 항목 간 이동
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        var $nextItem = $gnbItems.eq(index + 1);
        if ($nextItem.length) {
          var $firstFocusable = $nextItem.find('.gnb__toggle, .gnb__link').first();
          if ($firstFocusable.length) $firstFocusable.focus();
        }
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        var $prevItem = $gnbItems.eq(index - 1);
        if ($prevItem.length && index - 1 >= 0) {
          var $firstFocusable = $prevItem.find('.gnb__toggle, .gnb__link').first();
          if ($firstFocusable.length) $firstFocusable.focus();
        }
      }

      // 상하 방향키: 서브메뉴 내 이동
      if ($submenu.length && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        var $submenuLinks = $submenu.find('.gnb__link');
        var currentIndex = $submenuLinks.index(document.activeElement);

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          var $nextLink = $submenuLinks.eq(currentIndex + 1);
          if (!$nextLink.length) $nextLink = $submenuLinks.eq(0);
          if ($nextLink.length) $nextLink.focus();
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          var $prevLink = (currentIndex - 1 >= 0) ? $submenuLinks.eq(currentIndex - 1) : $submenuLinks.eq($submenuLinks.length - 1);
          if ($prevLink.length) $prevLink.focus();
        }
      }

    });
  });
});
```

---

## 접근성 체크리스트

헤더 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<nav>`에 `aria-label="주 메뉴"` (또는 `"전체 메뉴"`) 적용
- [ ] 서브메뉴 토글 버튼에 `aria-expanded` 필수 (`"true"` / `"false"`)
- [ ] 서브메뉴 토글 버튼에 `aria-controls` 필수 (서브메뉴 `id` 참조)
- [ ] 서브메뉴 `<ul>`에 `hidden` 속성으로 초기 숨김
- [ ] `role="menu"`, `role="menuitem"` 사용하지 않음 (W3C APG 경고)
- [ ] `aria-haspopup` 사용하지 않음 (Disclosure 패턴에서 불필요)
- [ ] 모바일 패널에 `aria-hidden="true"` 초기 설정
- [ ] 햄버거 버튼에 `aria-expanded` + `aria-controls` + `aria-label` 적용
- [ ] 현재 페이지 링크에 `aria-current="page"` 적용
- [ ] 키보드: Tab으로 모든 메뉴 항목 접근 가능 (마우스 없이 테스트)
- [ ] ESC 키로 열린 서브메뉴/전체메뉴 닫힘
- [ ] 메뉴 열기 시 첫 메뉴 항목으로 포커스 이동
- [ ] 메뉴/서브메뉴 닫힘 시 트리거 버튼으로 포커스 복귀

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_header.scss` | 헤더 기본 스타일, PC/모바일 respond-to() 분기 |
| `scss/6-components/_skip-nav.scss` | 본문건너뛰기 링크 스타일 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용, 헤더 별도 설정 불필요) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--z-dropdown`, `--color-bg` 등) |

**respond-to() 분기 기준:**

```scss
// _header.scss PC/모바일 분기 키워드
@include respond-to(pc-sm) {
  // pc-sm (1024px) 이상: GNB 수평 표시, 햄버거 버튼 숨김
}
```

`respond-to()` 키워드 전체 목록은 `scss/2-tools/_breakpoints.scss` 참고.

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Header (헤더)** + **Main menu (메인 메뉴)** + **Skip link (건너뛰기 링크)**에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| Skip link | 필수 — 본문건너뛰기 | ✅ `.skip-nav` |
| `<nav aria-label>` | 필수 — 주 메뉴 식별 | ✅ `"주 메뉴"` / `"전체 메뉴"` |
| Disclosure 패턴 | 권장 — `role="menu"` 미사용 | ✅ `<button>` + `aria-expanded` |
| `aria-current="page"` | 필수 — 현재 페이지 표시 | ✅ |
| 모바일 햄버거 | 권장 — `aria-expanded` + `aria-label` 토글 | ✅ |
| `aria-hidden` 패널 | 권장 — 모바일 메뉴 DOM 숨김 | ✅ |

> **KRDS 추가 권장:** 공공기관 사이트는 헤더 최상단에 **Masthead (공식 배너)**를 배치하여 정부 사이트임을 식별한다. 필요 시 KRDS 공식 배너 마크업을 참조한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Header / Main menu <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 헤더/메뉴 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Disclosure Navigation <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.3 초점 순서 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-expanded" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-expanded <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-hidden" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-hidden <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-current <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/keyboard.md` — 키보드 탐색 가이드 (Phase 5)
