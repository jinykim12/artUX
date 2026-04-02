---
layout: layouts/base.njk
title: 키보드 접근성
tags: accessibility
section: accessibility
permalink: /accessibility/keyboard/
---

# 키보드 탐색 가이드

**KWCAG 2.1 기준:** 2.1.1 키보드 사용 보장, 2.1.2 초점 이동
**적용 수준:** AA
**작성일:** 2026-03-26

---

## 개요

모든 기능은 마우스 없이 키보드만으로 사용 가능해야 한다. 지체 장애, 운동 장애 사용자는 마우스를 사용하지 못하고 키보드만으로 웹을 이용한다. 키보드로 접근할 수 없는 기능은 이들에게 완전히 차단된 기능과 같다.

> **규칙: 마우스로만 동작하는 기능(hover, drag, 우클릭 등)에는 반드시 키보드 대안이 있어야 한다. KWCAG 2.1.1 위반 시 공공기관 납품 접근성 심사에서 즉시 탈락 사유가 된다.**

> **참고:** 본문건너뛰기 링크(skip-nav) SCSS 구현은 Phase 5 Plan 01에서 완료됨. 이 문서는 키보드 탐색 전반의 원칙과 패턴을 다룬다.

---

## 탭 순서 원칙

### DOM 순서 = 탭 순서

키보드 Tab 이동 순서는 HTML DOM 순서를 따른다. CSS로 시각적 위치를 변경해도 탭 순서는 DOM 순서 기준이다. 이 불일치는 스크린리더 사용자와 키보드 사용자 모두에게 혼란을 준다.

아래 코드는 DOM 순서와 시각 순서가 일치하는 올바른 구조이다.

```html
<!-- 좋은 예: DOM 순서와 시각적 순서 일치 — 키보드 탐색이 예측 가능 -->
<nav aria-label="주 메뉴">
  <a href="/">홈</a>
  <a href="/about">소개</a>
  <a href="/contact">연락처</a>
</nav>
<main>
  <h1>페이지 제목</h1>
  <p>본문 내용</p>
  <button type="button">확인</button>
</main>
```

아래 코드처럼 CSS `order`로 시각 순서를 바꾸면 탭 순서와 시각 순서가 어긋나 사용자가 화면에 보이는 순서와 다른 순서로 이동하게 된다.

```css
/* 나쁜 예: CSS order로 시각적 순서 변경 — 탭 순서와 시각 순서 불일치 발생 */
.nav-item:last-child { order: -1; } /* 피해야 할 패턴 */
```

**위반 시 영향:** 키보드 사용자가 화면의 논리적 순서와 다른 방향으로 이동하면서 현재 위치를 잃고 혼란에 빠집니다.

### tabindex 사용 기준

| 값 | 동작 | 사용 시점 |
|----|------|-----------|
| `tabindex="0"` | 탭 가능, DOM 순서에 따름 | 비대화형 요소(div, span)를 포커스 가능하게 만들 때 |
| `tabindex="-1"` | 탭 불가, JS로 `.focus()` 가능 | 모달 초점 관리, 스킵 후 도달점 지정 시 |
| `tabindex="1"` 이상 | **사용 금지** | 탭 순서가 DOM 순서를 깨뜨려 혼란 야기 |

> **규칙: `tabindex` 양수 값(1, 2, 3...)은 절대 사용하지 않는다. 숫자가 클수록 탭 순서가 DOM 구조와 완전히 달라져 키보드 사용자가 예측 불가능한 순서로 이동하게 된다.**

아래 코드는 `tabindex` 각 값의 올바른 사용법과 금지 패턴을 함께 보여준다.

```html
<!-- tabindex="0": 커스텀 대화형 요소에 포커스를 받을 수 있도록 추가 -->
<div role="button" tabindex="0" onclick="doAction()">커스텀 버튼</div>

<!-- tabindex="-1": 모달 진입점, skip-nav 도달점 — JS로만 포커스 이동 -->
<main id="main-content" tabindex="-1">
  <h1>본문 시작</h1>
</main>

<!-- tabindex 양수: 금지 — DOM 순서를 무너뜨려 탐색 혼란 유발 -->
<!-- <button tabindex="2">나쁜 예</button> -->
```

---

## 포커스 가능 요소

다음 요소들은 기본적으로 키보드 포커스를 받는다.

| 요소 | 조건 |
|------|------|
| `<a href="...">` | `href` 속성이 있어야 함 |
| `<button>` | `disabled` 상태가 아니어야 함 |
| `<input>` | `type="hidden"`, `disabled`가 아닌 경우 |
| `<select>` | `disabled`가 아닌 경우 |
| `<textarea>` | `disabled`가 아닌 경우 |
| `[tabindex="0"]` | 커스텀 대화형 요소 |

> **규칙: `<a>` 태그에 `href`가 없으면 키보드 포커스를 받지 못한다. 클릭 동작만 있는 요소라면 `<a>` 대신 `<button>` 태그를 사용해야 한다.**

❌ 이렇게 하면 안 된다: `href` 없는 `<a>` 태그는 Tab 키로 도달할 수 없어 키보드 사용자가 해당 기능을 아예 사용할 수 없다.

✅ 이렇게 한다: 클릭 동작만 있는 링크 역할의 요소는 `<button>`을 사용한다.

```html
<!-- 나쁜 예: href 없는 a 태그는 키보드 포커스 불가 — 키보드 사용자 접근 불가 -->
<a onclick="openMenu()">메뉴 열기</a>

<!-- 좋은 예: button 태그 사용 — 기본적으로 키보드 포커스 가능 -->
<button type="button" onclick="openMenu()">메뉴 열기</button>

<!-- 차선책: tabindex="0" 추가 (button이 더 의미적으로 명확) -->
<a tabindex="0" onclick="openMenu()">메뉴 열기</a>
```

---

## 포커스 트랩

모달, 다이얼로그 등 레이어 UI가 열릴 때는 포커스가 레이어 안에서만 순환해야 한다. 레이어 뒤의 콘텐츠로 포커스가 빠져나가면 스크린리더 사용자는 모달이 열려 있는 상태에서 배경의 콘텐츠를 조작하게 되어 완전히 혼란에 빠진다.

**위반 시 영향:** 모달 뒤의 버튼이 의도치 않게 활성화되거나, 사용자가 모달을 닫는 방법을 찾지 못해 페이지에 갇힐 수 있다.

> **참고:** 포커스 트랩 JavaScript 구현은 Phase 9(오버레이 컴포넌트)에서 진행. 이 섹션은 원칙만 다룬다.

**원칙:**

1. 모달 열기 → 모달 첫 번째 포커스 가능 요소로 초점 이동
2. 모달 내 Tab 키 → 마지막 요소에서 첫 번째 요소로 순환
3. 모달 내 Shift+Tab 키 → 첫 번째 요소에서 마지막 요소로 역순환
4. 모달 닫기 → 모달을 열었던 원래 버튼으로 초점 복귀

아래 코드는 접근성을 갖춘 모달의 기본 HTML 구조이다. `role="dialog"`, `aria-modal="true"`, `aria-labelledby`가 핵심 속성이다.

```html
<!-- 모달 구조 예시 — role, aria-modal, aria-labelledby 세 속성이 필수 -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" id="confirm-modal">
  <h2 id="modal-title">확인</h2>
  <p>정말 삭제하시겠습니까?</p>
  <button type="button" id="modal-cancel">취소</button>
  <button type="button" id="modal-confirm">삭제</button>
  <!-- JS에서 Tab 키 이벤트를 가로채 포커스 순환 구현 -->
</div>
```

---

## 키보드 단축키

브라우저와 보조 기술의 표준 키보드 동작을 준수해야 한다. 스크린리더 사용자는 이미 이 키 동작을 학습하고 사용 중이며, 여기서 벗어나면 혼란이 생긴다.

| 키 | 동작 |
|----|------|
| `Tab` | 다음 포커스 가능 요소로 이동 |
| `Shift + Tab` | 이전 포커스 가능 요소로 이동 |
| `Enter` | 링크 활성화, 버튼 클릭, 폼 제출 |
| `Space` | 버튼 클릭, 체크박스 토글, 라디오 선택 |
| `Escape` | 모달/팝업/드롭다운 닫기, 편집 취소 |
| `방향키 (↑↓)` | select 옵션 선택, 라디오 그룹 이동, 탭 메뉴 탐색 |
| `방향키 (←→)` | 슬라이더 조작, 탭 메뉴 수평 탐색 |
| `Home / End` | 리스트/그리드의 첫 번째/마지막 항목으로 이동 |

아래 코드는 커스텀 버튼(`div` 기반)에서 Enter와 Space 키를 모두 처리하는 방법이다. 네이티브 `<button>`은 이 처리가 내장되어 있다.

```html
<!-- Enter/Space 모두 지원하는 커스텀 버튼 — 네이티브 button이 더 간단하고 권장됨 -->
<div role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') doAction()" onclick="doAction()">
  커스텀 버튼
</div>
```

---

## 커스텀 위젯 키보드 지원

`<div>`, `<span>` 등 비대화형 요소를 버튼, 체크박스, 탭 등으로 사용할 때는 반드시 다음 세 가지를 모두 추가해야 한다. 하나라도 빠지면 키보드 사용자나 스크린리더 사용자가 해당 위젯을 사용할 수 없다.

1. **`role`** — 위젯 역할 선언 (button, checkbox, tab, menuitem 등)
2. **`tabindex`** — 포커스 가능 설정 (`tabindex="0"`)
3. **키보드 이벤트** — Enter, Space 등 표준 키 동작 구현

❌ 이렇게 하면 안 된다: `<div>`로 체크박스를 만들고 클릭 이벤트만 추가 — 키보드로 Space 키를 눌러도 체크되지 않는다.

✅ 이렇게 한다: `role`, `tabindex`, 키보드 이벤트를 모두 추가하거나, 가능하면 네이티브 `<input type="checkbox">`를 사용한다.

아래 코드는 두 가지 방식을 비교한다. 네이티브 방식이 훨씬 간단하고 접근성이 보장된다.

```html
<!-- 커스텀 체크박스 — role, tabindex, 키보드 이벤트 세 가지 모두 필요 -->
<div role="checkbox" aria-checked="false" tabindex="0" onkeydown="if(event.key===' ') toggleCheck(this)" onclick="toggleCheck(this)">
  알림 수신 동의
</div>

<!-- 권장: 네이티브 input — 키보드 지원이 브라우저에 내장되어 있어 추가 작업 불필요 -->
<label>
  <input type="checkbox" name="notification">
  알림 수신 동의
</label>
```

> **규칙: 네이티브 HTML 요소(`<button>`, `<input>`, `<select>` 등)는 키보드 지원이 기본 내장되어 있다. 커스텀 위젯은 키보드 지원을 직접 구현해야 하므로, 가능한 한 네이티브 요소를 사용한다.**

---

## 포커스 스타일

포커스 인디케이터는 키보드 사용자가 현재 자신이 어떤 요소에 있는지 파악하는 유일한 시각적 수단이다. 이것이 없으면 화면에서 "현재 위치"를 완전히 잃는다.

**위반 시 영향:** `outline: none`으로 포커스 인디케이터를 제거하면 키보드 사용자가 어디를 이동 중인지 전혀 알 수 없어 페이지 이용이 불가능해진다. KWCAG 2.1.1 위반 항목이다.

❌ 이렇게 하면 안 된다: `outline: none` — 키보드 사용자의 현재 위치가 화면에서 완전히 사라진다.

✅ 이렇게 한다: `:focus-visible`을 사용해 키보드 탐색 시에만 인디케이터를 표시한다.

아래 코드는 artpqUX 팀의 포커스 스타일 원칙이다. `outline: none`을 절대 사용하지 않는다.

```css
/* artpqUX 팀 포커스 스타일 — 키보드 탐색 시 명확한 테두리 표시 */
:focus-visible {
  outline: 2px solid var(--bs-primary);
  outline-offset: 2px;
}

/* 절대 사용 금지 — 키보드 사용자의 현재 위치를 지워버림 */
/* :focus { outline: none; } */
```

---

## 최소 터치 영역

터치 기반 기기(스마트폰, 태블릿)에서 인터랙티브 요소는 손가락으로 정확히 탭할 수 있는 충분한 크기를 가져야 한다. 너무 작은 버튼이나 컨트롤은 터치 오류를 유발하고, 손 떨림이 있는 사용자에게 심각한 장벽이 된다.

> **규칙: WCAG 2.5.8 최소 크기 기준에 따라 모든 인터랙티브 요소의 터치 영역은 최소 44×44px을 보장해야 한다.**

아래 컴포넌트는 반드시 44×44px 터치 영역을 확보한다.

| 컴포넌트 | 적용 방법 |
|----------|-----------|
| 버튼 (`.btn`) | `min-height: 44px` (텍스트 버튼), `width: 44px; height: 44px` (아이콘 버튼 `.btn--icon`) |
| 탭 (`.nav-link`) | `min-height: 44px`, 좌우 패딩으로 터치 범위 확보 |
| 체크박스 (`.form-check-input`) | `min-width: 44px; min-height: 44px` 또는 래퍼 패딩으로 확보 |
| 라디오 (`.form-check-input[type=radio]`) | `min-width: 44px; min-height: 44px` 또는 래퍼 패딩으로 확보 |
| 슬라이더 컨트롤 | 드래그 핸들 크기 44×44px 이상 확보 |

```scss
/* 터치 영역 최솟값 — WCAG 2.5.8 */
.btn {
  min-height: var(--touch-target-min); /* 44px */
}

.btn--icon {
  width: var(--touch-target-min);      /* 44px */
  height: var(--touch-target-min);     /* 44px */
}
```

---

## 체크리스트

접근성 검수 시 아래 항목을 확인한다.

- [ ] 모든 대화형 기능이 키보드만으로 사용 가능하다 (마우스 없이 테스트)
- [ ] 탭 이동 순서가 시각적 레이아웃과 논리적으로 일치한다
- [ ] `tabindex` 양수 값(1 이상)을 사용하지 않는다
- [ ] 포커스 인디케이터가 모든 포커스 가능 요소에 표시된다 (`outline: none` 미사용)
- [ ] 모달/레이어 UI가 열리면 포커스가 레이어 내부로 이동한다
- [ ] 모달 닫기 후 포커스가 모달을 연 원래 버튼으로 복귀한다
- [ ] 커스텀 위젯에 `role`, `tabindex`, 키보드 이벤트가 모두 적용되어 있다
- [ ] 버튼, 탭, 체크박스, 라디오, 슬라이더 컨트롤의 터치 영역이 최소 44×44px이다 (WCAG 2.5.8)

---

## 참고

- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 사용 보장 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.2 초점 이동 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/perspective-videos/keyboard/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Keyboard Compatibility <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/tabindex" target="_blank" rel="noopener" title="새 창으로 열림">MDN — tabindex <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/" target="_blank" rel="noopener" title="새 창으로 열림">WAI-ARIA Authoring Practices — Keyboard Interaction <span class="sr-only">(새 창)</span></a>
