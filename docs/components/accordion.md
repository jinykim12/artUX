---
layout: layouts/base.njk
title: 아코디언
tags: components
section: components
permalink: /components/accordion/
---

# 아코디언 (COMP-11)

**KWCAG 2.1 기준:** 2.1.1 키보드 접근, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-31

> 아코디언 컴포넌트는 콘텐츠를 접고 펼치는 패널 목록이다.
> KWCAG 2.1 AA 접근성 기준(aria-expanded, aria-controls, 키보드 조작)을 준수한다.
> CSS 클래스명은 `scss/6-components/_accordion.scss`와 일치시킨다.

**규칙: 아코디언 헤더 버튼은 반드시 `aria-expanded` 상태를 토글해야 하며, `aria-controls`로 연결된 패널의 `hidden` 속성을 제어해야 한다.**

---

## 기본 구조

아코디언은 다음 순서로 구성된다:

```
<div class="accordion">
  └── <div class="accordion-item">
        ├── <h3 class="accordion-header">
        │     └── <button aria-expanded aria-controls> — 토글 버튼
        └── <div class="accordion-panel" role="region" aria-labelledby>
              └── 콘텐츠
```

---

## 기본 HTML 마크업

각 아코디언 항목은 헤더 버튼과 패널로 구성된다. `aria-expanded`는 현재 열림/닫힘 상태를 보조 기기에 전달하고, `aria-controls`는 버튼이 제어하는 패널을 연결한다:

<div class="docs-preview">
<div class="accordion" id="previewAccordion">
  <div class="accordion-item">
    <div class="accordion-header" id="preview-acc-h1">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#preview-acc-panel-1" aria-expanded="true" aria-controls="preview-acc-panel-1">서비스 소개</button>
    </div>
    <div id="preview-acc-panel-1" class="accordion-collapse collapse show" aria-labelledby="preview-acc-h1" data-bs-parent="#previewAccordion">
      <div class="accordion-body">서비스 소개 내용이 여기에 들어갑니다.</div>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header" id="preview-acc-h2">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#preview-acc-panel-2" aria-expanded="false" aria-controls="preview-acc-panel-2">자주 묻는 질문</button>
    </div>
    <div id="preview-acc-panel-2" class="accordion-collapse collapse" aria-labelledby="preview-acc-h2" data-bs-parent="#previewAccordion">
      <div class="accordion-body">자주 묻는 질문 내용이 여기에 들어갑니다.</div>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header" id="preview-acc-h3">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#preview-acc-panel-3" aria-expanded="false" aria-controls="preview-acc-panel-3">이용 안내</button>
    </div>
    <div id="preview-acc-panel-3" class="accordion-collapse collapse" aria-labelledby="preview-acc-h3" data-bs-parent="#previewAccordion">
      <div class="accordion-body">이용 안내 내용이 여기에 들어갑니다.</div>
    </div>
  </div>
</div>
</div>

```html
<!-- 아코디언 -->
<div class="accordion" id="exampleAccordion">

    <!-- 아코디언 항목 1 (열림) -->
    <div class="accordion-item">
        <h3 class="accordion-header">
            <button type="button" class="accordion-trigger" id="acc-header-1" aria-expanded="true" aria-controls="acc-panel-1">서비스 소개</button>
        </h3>
        <div class="accordion-panel" id="acc-panel-1" role="region" aria-labelledby="acc-header-1">
            <p>서비스 소개 내용이 여기에 들어갑니다.</p>
        </div>
    </div>

    <!-- 아코디언 항목 2 (닫힘) -->
    <div class="accordion-item">
        <h3 class="accordion-header">
            <button type="button" class="accordion-trigger" id="acc-header-2" aria-expanded="false" aria-controls="acc-panel-2">자주 묻는 질문</button>
        </h3>
        <div class="accordion-panel" id="acc-panel-2" role="region" aria-labelledby="acc-header-2" hidden>
            <p>자주 묻는 질문 내용이 여기에 들어갑니다.</p>
        </div>
    </div>

    <!-- 아코디언 항목 3 (닫힘) -->
    <div class="accordion-item">
        <h3 class="accordion-header">
            <button type="button" class="accordion-trigger" id="acc-header-3" aria-expanded="false" aria-controls="acc-panel-3">이용 안내</button>
        </h3>
        <div class="accordion-panel" id="acc-panel-3" role="region" aria-labelledby="acc-header-3" hidden>
            <p>이용 안내 내용이 여기에 들어갑니다.</p>
        </div>
    </div>

</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `aria-expanded="true/false"` | 토글 상태 | 패널이 열려 있는지 닫혀 있는지를 보조 기기에 전달 |
| `aria-controls` | 패널 요소의 `id` | 버튼이 제어하는 패널을 프로그래밍적으로 연결 |
| `role="region"` | — | 패널이 독립적인 콘텐츠 영역임을 보조 기기에 전달 |
| `aria-labelledby` | 헤더 버튼의 `id` | 패널의 레이블을 헤더 버튼 텍스트로 연결 |
| `hidden` | — | 닫힌 패널을 보조 기기와 시각적으로 모두 숨김 |

- `aria-expanded` — 이 속성이 없으면 스크린리더 사용자는 패널이 열려 있는지 닫혀 있는지 알 수 없다.
- `hidden` — CSS `display: none`과 달리 HTML 표준 속성으로, 보조 기기에서도 확실히 숨겨진다.

---

## 접근성 체크리스트

아코디언 마크업 검수 시 아래 항목을 확인한다.

- [ ] 각 헤더에 `<button>` 태그 사용 (키보드 접근 보장)
- [ ] `aria-expanded` 상태가 열림/닫힘에 따라 `true`/`false` 토글
- [ ] `aria-controls`로 대응하는 패널 `id` 연결
- [ ] 닫힌 패널에 `hidden` 속성 적용
- [ ] 패널에 `role="region"` + `aria-labelledby` 적용
- [ ] Enter/Space 키로 패널 토글 동작 (KWCAG 2.1.1)
- [ ] 위/아래 화살표 키로 헤더 간 이동 지원
- [ ] Home/End 키로 첫 번째/마지막 헤더 이동 지원
- [ ] 포커스 인디케이터 동작 확인 (전역 `:focus-visible` — `_focus.scss`)

---

## 토글 JS 예시

아코디언 헤더 버튼 클릭 시 `aria-expanded` 상태를 토글하고 패널의 `hidden` 속성을 제어한다. 화살표 키로 헤더 간 이동을 지원한다:

```javascript
$(function () {
    var $accordion = $('#exampleAccordion');
    if (!$accordion.length) return;

    var $triggers = $accordion.find('.accordion-trigger');

    // 패널 토글
    function togglePanel($trigger) {
        var expanded = $trigger.attr('aria-expanded') === 'true';
        var panelId = $trigger.attr('aria-controls');
        var $panel = $('#' + panelId);
        if (!$panel.length) return;

        $trigger.attr('aria-expanded', String(!expanded));
        if (expanded) {
            $panel.attr('hidden', '');
        } else {
            $panel.removeAttr('hidden');
        }
    }

    // 클릭 이벤트
    $triggers.on('click', function () {
        togglePanel($(this));
    });

    // 키보드 내비게이션
    $triggers.on('keydown', function (event) {
        var key = event.key;
        var index = $triggers.index(this);
        var $target = null;

        if (key === 'ArrowDown') {
            $target = $triggers.eq((index + 1) % $triggers.length);
        } else if (key === 'ArrowUp') {
            $target = $triggers.eq((index - 1 + $triggers.length) % $triggers.length);
        } else if (key === 'Home') {
            $target = $triggers.eq(0);
        } else if (key === 'End') {
            $target = $triggers.eq($triggers.length - 1);
        }

        if ($target) {
            event.preventDefault();
            $target.focus();
        }
    });
});
```

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_accordion.scss` | 아코디언 컴포넌트 스타일 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--spacing-*`, `--color-border` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Accordion (아코디언)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `aria-expanded` | 필수 — 열림/닫힘 상태 | ✅ |
| `aria-controls` | 필수 — 패널 연결 | ✅ |
| `hidden` 속성 | 필수 — 닫힌 패널 숨김 | ✅ |
| 키보드 조작 | 필수 — Enter/Space 토글 | ✅ JS 예시 제공 |
| 화살표 키 내비게이션 | 권장 — 헤더 간 이동 | ✅ JS 예시 제공 |
| `role="region"` | 권장 — 패널 영역 식별 | ✅ |

> **참고:** KRDS에서는 한 번에 하나의 패널만 열리는 모드(exclusive)와 여러 패널이 동시에 열리는 모드를 모두 허용한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Accordion <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 아코디언 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Accordion Pattern <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 접근 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
