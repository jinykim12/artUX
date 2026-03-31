---
layout: layouts/base.njk
title: 탭
tags: components
section: components
permalink: /components/tab/
---

# 탭 (COMP-07)

**KWCAG 2.1 기준:** 2.1.1 키보드 접근, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-26

> 탭 컴포넌트는 Bootstrap `.nav-tabs`를 CSS 토큰으로 오버라이드한다.
> WAI-ARIA Tab 패턴(role="tablist/tab/tabpanel")을 따라 KWCAG 2.1 AA 기준을 준수한다.
> CSS 클래스명은 `scss/6-components/_tab.scss`와 일치시킨다.

**규칙: 탭 버튼에는 `<button>` 태그와 `role="tab"`을 사용한다. 비활성 탭에 `tabindex="-1"`을 적용하여 Tab 키로는 활성 탭만 접근하고 방향키로 탭 간 이동한다.**

---

## 기본 구조

탭은 다음 순서로 구성된다:

```
<div class="tab-component">
  ├── <ul role="tablist" class="nav nav-tabs">  — 탭 목록
  │     └── <li role="presentation">
  │           └── <button role="tab">           — 각 탭 버튼
  └── <div role="tabpanel">                     — 각 탭 콘텐츠 패널
```

- `role="tablist"` — 탭 목록 컨테이너임을 보조 기기에 알린다. 이 역할 없이 `<ul>`만 사용하면 스크린리더가 일반 목록으로 인식한다.
- `role="tab"` — 각 탭 버튼임을 보조 기기에 알린다. `aria-selected`, `aria-controls` 필수.
- `role="tabpanel"` — 각 탭 콘텐츠 패널임을 보조 기기에 알린다. `aria-labelledby` 필수.
- `role="presentation"` — `<li>` 태그의 암묵적 list-item 역할을 제거한다. tablist 안에서 `<li>`가 list-item으로 읽히면 스크린리더가 "목록 항목 1 중 1" 처럼 불필요한 정보를 추가한다.

---

## 기본 HTML 마크업

활성 탭에는 `tabindex="0"`, 비활성 탭에는 `tabindex="-1"`을 적용한다. 탭 목록에 Tab 키로 진입하면 활성 탭 버튼 하나에만 포커스가 가고, 이후 방향키로 탭 간 이동한다. 모든 탭에 `tabindex="0"`을 적용하면 Tab 키로 탭마다 포커스가 멈춰서 콘텐츠에 도달하기까지 너무 많은 Tab 입력이 필요하다:

<div class="docs-preview">
<ul class="nav nav-tabs" id="preview-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="preview-tab1" data-bs-toggle="tab" data-bs-target="#preview-panel1" type="button" role="tab" aria-controls="preview-panel1" aria-selected="true">상세 정보</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="preview-tab2" data-bs-toggle="tab" data-bs-target="#preview-panel2" type="button" role="tab" aria-controls="preview-panel2" aria-selected="false">리뷰</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="preview-tab3" data-bs-toggle="tab" data-bs-target="#preview-panel3" type="button" role="tab" aria-controls="preview-panel3" aria-selected="false">Q&amp;A</button>
  </li>
</ul>
<div class="tab-content" id="preview-tabContent">
  <div class="tab-pane fade show active" id="preview-panel1" role="tabpanel" aria-labelledby="preview-tab1"><p class="pt-3">상세 정보 콘텐츠가 여기에 들어갑니다.</p></div>
  <div class="tab-pane fade" id="preview-panel2" role="tabpanel" aria-labelledby="preview-tab2"><p class="pt-3">리뷰 콘텐츠가 여기에 들어갑니다.</p></div>
  <div class="tab-pane fade" id="preview-panel3" role="tabpanel" aria-labelledby="preview-tab3"><p class="pt-3">Q&amp;A 콘텐츠가 여기에 들어갑니다.</p></div>
</div>
</div>

```html
<div class="tab-component">

  <!-- 탭 목록 -->
  <ul
    role="tablist"
    class="nav nav-tabs"
    aria-label="상품 정보"
  >
    <!-- 활성 탭 (첫 번째) -->
    <li role="presentation">
      <button
        role="tab"
        id="tab-detail"
        class="nav-link active"
        aria-selected="true"
        aria-controls="panel-detail"
        tabindex="0"
      >상세 정보</button>
    </li>

    <!-- 비활성 탭 -->
    <li role="presentation">
      <button
        role="tab"
        id="tab-review"
        class="nav-link"
        aria-selected="false"
        aria-controls="panel-review"
        tabindex="-1"
      >리뷰</button>
    </li>

    <!-- 비활성 탭 -->
    <li role="presentation">
      <button
        role="tab"
        id="tab-qna"
        class="nav-link"
        aria-selected="false"
        aria-controls="panel-qna"
        tabindex="-1"
      >Q&amp;A</button>
    </li>
  </ul>

  <!-- 탭 패널 -->
  <div
    role="tabpanel"
    id="panel-detail"
    class="tab-content"
    aria-labelledby="tab-detail"
  >
    <div class="tab-pane active">
      <p>상세 정보 콘텐츠가 여기에 들어갑니다.</p>
    </div>
  </div>

  <div
    role="tabpanel"
    id="panel-review"
    class="tab-content"
    aria-labelledby="tab-review"
    hidden
  >
    <div class="tab-pane">
      <p>리뷰 콘텐츠가 여기에 들어갑니다.</p>
    </div>
  </div>

  <div
    role="tabpanel"
    id="panel-qna"
    class="tab-content"
    aria-labelledby="tab-qna"
    hidden
  >
    <div class="tab-pane">
      <p>Q&A 콘텐츠가 여기에 들어갑니다.</p>
    </div>
  </div>

</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="tablist"` | — | 탭 목록 컨테이너임을 보조 기기에 전달 |
| `aria-label` | 탭 그룹 이름 | tablist에 접근 가능한 이름 제공 |
| `role="tab"` | — | 각 탭 버튼임을 보조 기기에 전달 |
| `aria-selected="true"` | — | 현재 활성 탭임을 전달 |
| `aria-selected="false"` | — | 현재 비활성 탭임을 전달 |
| `aria-controls` | 탭 패널 `id` | 이 탭이 제어하는 패널 영역 연결 |
| `tabindex="0"` | — | 활성 탭 — Tab 탐색 진입점 |
| `tabindex="-1"` | — | 비활성 탭 — Tab 탐색에서 제외, 방향키로만 접근 |
| `role="tabpanel"` | — | 탭 콘텐츠 패널임을 보조 기기에 전달 |
| `aria-labelledby` | 탭 버튼 `id` | 이 패널을 레이블링하는 탭 버튼 연결 — "상세 정보 패널"처럼 읽힘 |

---

## 키보드 상호작용

WAI-ARIA Tab 패턴에서 탭 간 이동은 Tab 키가 아닌 방향키로 한다. Tab 키는 탭 목록 전체를 하나의 포커스 그룹으로 처리하고, 방향키로 탭 간 전환을 한다:

| 키 | 동작 |
|----|------|
| `Tab` | 탭 목록 → 활성 탭 패널 내부로 이동 |
| `ArrowRight` | 다음 탭으로 이동 및 활성화 |
| `ArrowLeft` | 이전 탭으로 이동 및 활성화 |
| `Home` | 첫 번째 탭으로 이동 및 활성화 |
| `End` | 마지막 탭으로 이동 및 활성화 |

---

## 접근성 체크리스트

탭 마크업 검수 시 아래 항목을 확인한다.

- [ ] `role="tablist"` 적용 (탭 목록 컨테이너에)
- [ ] `role="tablist"`에 `aria-label` 적용 (탭 그룹 이름 제공)
- [ ] 각 탭 버튼에 `role="tab"` 적용
- [ ] 활성 탭에 `aria-selected="true"` + `tabindex="0"` 적용
- [ ] 비활성 탭에 `aria-selected="false"` + `tabindex="-1"` 적용
- [ ] 각 탭 버튼에 `aria-controls` 적용 (탭 패널 `id` 참조)
- [ ] 각 탭 패널에 `role="tabpanel"` 적용
- [ ] 각 탭 패널에 `aria-labelledby` 적용 (탭 버튼 `id` 참조)
- [ ] 비활성 패널에 `hidden` 속성 적용 (초기 숨김)
- [ ] `<li>` 태그에 `role="presentation"` 적용 (tablist 내 list 역할 제거)
- [ ] 방향키(ArrowLeft/ArrowRight)로 탭 간 이동 가능
- [ ] Home/End 키로 첫/마지막 탭 이동 가능

---

## 방향키 탐색 JS 예시

탭을 활성화할 때 `tabindex`, `aria-selected`, CSS 클래스, `hidden` 속성을 모두 동시에 업데이트해야 한다. 하나라도 빠지면 시각적 상태와 스크린리더 상태가 불일치하게 된다:

```javascript
$(function () {
  var $tablist = $('[role="tablist"]');
  if (!$tablist.length) return;

  var $tabs = $tablist.find('[role="tab"]');

  // 탭 활성화 함수 — 선택한 탭을 활성 상태로 전환
  function activateTab($tab) {
    // 모든 탭 비활성화
    $tabs.attr('aria-selected', 'false')
         .attr('tabindex', '-1')
         .removeClass('active');

    // 모든 탭 패널 숨기기
    $tabs.each(function () {
      var panelId = $(this).attr('aria-controls');
      $('#' + panelId).attr('hidden', '');
    });

    // 선택한 탭 활성화
    $tab.attr('aria-selected', 'true')
        .attr('tabindex', '0')
        .addClass('active')
        .focus();

    // 해당 탭 패널 표시
    var targetPanelId = $tab.attr('aria-controls');
    $('#' + targetPanelId).removeAttr('hidden');
  }

  // 탭 목록 키보드 이벤트 처리
  $tablist.on('keydown', function (event) {
    var currentIndex = $tabs.index(document.activeElement);
    if (currentIndex === -1) return;

    var nextIndex;

    // ArrowRight: 다음 탭으로 이동 (마지막에서 첫 번째로 순환)
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % $tabs.length;
      activateTab($tabs.eq(nextIndex));
    }

    // ArrowLeft: 이전 탭으로 이동 (첫 번째에서 마지막으로 순환)
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + $tabs.length) % $tabs.length;
      activateTab($tabs.eq(nextIndex));
    }

    // Home: 첫 번째 탭으로 이동
    if (event.key === 'Home') {
      event.preventDefault();
      activateTab($tabs.eq(0));
    }

    // End: 마지막 탭으로 이동
    if (event.key === 'End') {
      event.preventDefault();
      activateTab($tabs.eq($tabs.length - 1));
    }
  });

  // 탭 클릭 이벤트 처리 (마우스/터치 지원)
  $tabs.on('click', function () {
    activateTab($(this));
  });
});
```

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_tab.scss` | Bootstrap .nav-tabs 오버라이드, CSS 토큰 적용 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-primary`, `--spacing-*` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Tab (탭)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `role="tablist"` | 필수 | ✅ |
| `role="tab"` + `role="tabpanel"` | 필수 | ✅ |
| `aria-selected` | 필수 — 활성 탭 표시 | ✅ |
| `aria-controls` / `aria-labelledby` | 필수 — 탭-패널 연결 | ✅ |
| 좌/우 방향키 탐색 | 필수 | ✅ JS 예시 제공 |
| `tabindex` 관리 | 필수 — 비활성 탭 `-1` | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Tab <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 탭 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Tabs Pattern <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 접근 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/dynamic-content.md` — 탭 패널 접근성 패턴 및 aria-live 활용
