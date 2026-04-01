---
layout: layouts/base.njk
title: 모달
tags: components
section: components
permalink: /components/modal/
---

# 모달 (COMP-06)

**KWCAG 2.1 기준:** 2.1.1 키보드 접근, 2.4.3 초점 순서, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-26

> 모달 컴포넌트는 Bootstrap `.modal`을 CSS 토큰으로 오버라이드한다.
> KWCAG 2.1 AA 접근성 기준(role="dialog", aria-modal, 포커스 트랩)을 준수한다.
> CSS 클래스명은 `scss/6-components/_modal.scss`와 일치시킨다.

**규칙: 모달이 열리면 포커스가 모달 안으로 이동해야 하고, 모달 안에서 Tab이 모달 밖으로 빠져나가면 안 된다(포커스 트랩). 모달이 닫히면 반드시 열기 버튼으로 포커스가 복귀해야 한다.**

---

## 기본 구조

모달은 다음 순서로 구성된다:

```
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="modal">
  └── <div class="modal-dialog">
        └── <div class="modal-content">
              ├── <div class="modal-header"> — 제목 + 닫기 버튼
              ├── <div class="modal-body">   — 본문 콘텐츠
              └── <div class="modal-footer"> — 액션 버튼
```

---

## 기본 HTML 마크업

모달 트리거 버튼과 모달 마크업은 분리하여 작성한다. `aria-labelledby`로 모달 제목(`id="modal-title"`)을 참조하면 스크린리더가 모달이 열릴 때 "공지사항, 대화 상자"처럼 제목을 자동으로 읽어준다:

<div class="docs-preview">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#previewModal">공지사항 보기</button>
<div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="preview-modal-title" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title fw-bold fs-5 m-0" id="preview-modal-title">공지사항</div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
      </div>
      <div class="modal-body">
        <p>모달 본문 내용이 여기에 들어갑니다.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">확인</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>
</div>

```html
<!-- 모달 트리거 버튼 -->
<button type="button" id="modal-trigger" class="btn btn-primary">
  공지사항 보기
</button>

<!-- 모달 -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" id="exampleModal" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h2 class="modal-title" id="modal-title">공지사항</h2>
        <button type="button" class="btn-close" aria-label="닫기"></button>
      </div>

      <div class="modal-body">
        <p>모달 본문 내용이 여기에 들어갑니다.</p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary">확인</button>
        <button type="button" class="btn btn-secondary" id="modal-close-btn">닫기</button>
      </div>

    </div>
  </div>
</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="dialog"` | — | 이 요소가 대화 상자임을 보조 기기에 전달 |
| `aria-modal="true"` | — | 모달 배경 콘텐츠를 보조 기기에서 숨김 |
| `aria-labelledby` | 모달 제목 요소의 `id` | 모달 제목을 스크린리더가 자동으로 읽도록 연결 |
| `tabindex="-1"` | — | JS로 `focus()` 호출이 가능하도록 포커스 가능 상태로 만듦 |
| `aria-label="닫기"` | — | 아이콘 전용 닫기 버튼에 텍스트 대체 제공 (KWCAG 4.1.2) |

- `aria-modal="true"` — 이 속성이 없으면 스크린리더 사용자가 Tab으로 모달 밖의 배경 콘텐츠도 탐색할 수 있다. 시각적으로는 모달이 열려있어 배경이 차단된 것처럼 보이지만, 스크린리더는 배경 DOM을 그대로 읽는다.
- `tabindex="-1"` — 일반적으로 `<div>`는 Tab으로 포커스가 가지 않는다. `tabindex="-1"`을 추가하면 JS의 `focus()` 메서드로 프로그래밍 방식 포커스 이동이 가능해진다.

---

## 접근성 체크리스트

모달 마크업 검수 시 아래 항목을 확인한다.

- [ ] `role="dialog"` 적용 (모달 컨테이너에)
- [ ] `aria-modal="true"` 적용 (배경 콘텐츠 보조 기기 숨김)
- [ ] `aria-labelledby` — 모달 제목 요소의 `id` 참조
- [ ] `tabindex="-1"` 적용 (JS `focus()` 호출 가능하게)
- [ ] 닫기 버튼에 `aria-label="닫기"` 적용 (아이콘만 있는 버튼)
- [ ] 모달 열릴 때 내부 첫 번째 요소로 포커스 이동 (포커스 트랩)
- [ ] 모달 내 Tab 순환이 모달 범위를 벗어나지 않음 (포커스 트랩)
- [ ] ESC 키로 모달 닫기 지원 (KWCAG 2.1.1)
- [ ] 모달 닫힌 후 트리거 버튼으로 포커스 복원 (KWCAG 2.4.3)

---

## 포커스 트랩 JS 예시

포커스 트랩은 모달 안에 있는 마지막 요소에서 Tab을 누르면 모달 밖으로 나가지 않고 모달 안의 첫 번째 요소로 순환하는 동작이다. 이것이 없으면 키보드 사용자가 Tab으로 모달 밖 배경 페이지까지 탐색하게 된다:

```javascript
$(function () {
  // 포커스 가능한 요소 선택자
  var focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  var $modal = $('#exampleModal');
  var $trigger = $('#modal-trigger');
  var $closeBtn = $('#modal-close-btn');

  if (!$modal.length || !$trigger.length) return;

  // 포커스 가능한 요소 목록 가져오기
  function getFocusable() {
    return $modal.find(focusableSelector);
  }

  // 모달 열기
  function openModal() {
    $modal.removeAttr('hidden');
    $modal.attr('aria-hidden', 'false');

    // 모달 열릴 때 첫 번째 포커스 가능 요소로 포커스 이동 (KWCAG 2.4.3)
    var $focusable = getFocusable();
    if ($focusable.length > 0) {
      $focusable.eq(0).focus();
    } else {
      $modal.focus();
    }
  }

  // 모달 닫기 — 트리거 요소로 포커스 복원 (KWCAG 2.4.3)
  function closeModal() {
    $modal.attr('hidden', '');
    $modal.attr('aria-hidden', 'true');
    $trigger.focus();
  }

  // 포커스 트랩 — Tab / Shift+Tab 순환 처리
  $modal.on('keydown', function (event) {
    var $focusable = getFocusable();
    if ($focusable.length === 0) return;

    var firstFocusable = $focusable.get(0);
    var lastFocusable = $focusable.get($focusable.length - 1);

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift+Tab: 첫 번째 요소에서 마지막 요소로 순환
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          $(lastFocusable).focus();
        }
      } else {
        // Tab: 마지막 요소에서 첫 번째 요소로 순환
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          $(firstFocusable).focus();
        }
      }
    }

    // ESC 키: 모달 닫기 (KWCAG 2.1.1)
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // 트리거 버튼 클릭 → 모달 열기
  $trigger.on('click', function () {
    openModal();
  });

  // 닫기 버튼 클릭 → 모달 닫기
  if ($closeBtn.length) {
    $closeBtn.on('click', function () {
      closeModal();
    });
  }

  // .btn-close 클릭 → 모달 닫기
  var $btnClose = $modal.find('.btn-close');
  if ($btnClose.length) {
    $btnClose.on('click', function () {
      closeModal();
    });
  }
});
```

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_modal.scss` | Bootstrap .modal 오버라이드, CSS 토큰 적용 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--z-overlay`, `--z-modal`, `--shadow-md` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Modal (모달)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `role="dialog"` | 필수 | ✅ |
| `aria-modal="true"` | 필수 | ✅ |
| `aria-labelledby` | 필수 — 모달 제목 연결 | ✅ |
| 포커스 트랩 | 필수 — Tab 순환 | ✅ JS 예시 제공 |
| ESC 닫기 | 필수 | ✅ |
| 포커스 복귀 | 필수 — 트리거 버튼으로 | ✅ |
| 닫기 버튼 `aria-label` | 필수 — 아이콘 버튼 | ✅ `"닫기"` |

> **참고:** KRDS에서는 모달 배경(backdrop) 클릭으로 닫기도 권장한다. Bootstrap `data-bs-backdrop` 기본 동작으로 지원된다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Modal <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 모달 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Dialog (Modal) <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 접근 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.3 초점 순서 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/dynamic-content.md` — 모달 포커스 트랩 원칙 및 동적 콘텐츠 접근성 패턴
