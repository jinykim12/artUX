---
layout: layouts/base.njk
title: 토스트
tags: components
section: components
permalink: /components/toast/
---

# 토스트 (COMP-12)

**KWCAG 2.1 기준:** 4.1.3 상태 메시지, 2.2.1 시간 제한 조절
**적용 수준:** AA
**작성일:** 2026-03-31

> 토스트 컴포넌트는 사용자에게 짧은 알림 메시지를 일시적으로 표시한다.
> KWCAG 2.1 AA 접근성 기준(role="alert", aria-live)을 준수한다.
> CSS 클래스명은 `scss/6-components/_toast.scss`와 일치시킨다.

**규칙: 토스트 메시지는 `role="alert"` 또는 `aria-live="polite"`로 스크린리더에 자동 전달되어야 한다. 중요한 행동 결과는 `role="alert"`(assertive), 일반 안내는 `aria-live="polite"`를 사용한다.**

---

## 기본 구조

토스트는 다음 순서로 구성된다:

```
<div class="toast-container" aria-live="polite">
  └── <div class="toast" role="alert">
        ├── <div class="toast-body"> — 메시지 텍스트
        └── <button class="btn-close" aria-label="닫기"> — 닫기 버튼
```

---

## 기본 HTML 마크업

토스트 컨테이너는 페이지 내 고정 위치에 배치하고, 토스트 메시지는 JS로 동적 삽입한다. `aria-live="polite"`가 설정된 컨테이너에 요소가 추가되면 스크린리더가 자동으로 내용을 읽어준다:

<div class="docs-preview">
<div class="toast-container position-relative">
  <div class="toast show" role="alert" aria-live="polite" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">알림</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="닫기"></button>
    </div>
    <div class="toast-body">저장이 완료되었습니다.</div>
  </div>
</div>
</div>

```html
<!-- 토스트 컨테이너 — 우측 하단 고정 -->
<div class="toast-container position-fixed bottom-0 end-0 p-3" id="toastContainer">

    <!-- Bootstrap 토스트 -->
    <div class="toast" role="alert" aria-live="polite" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">알림</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="닫기"></button>
        </div>
        <div class="toast-body">저장이 완료되었습니다.</div>
    </div>

</div>
```

긴급 알림(오류 등)에는 `role="alert"`과 `aria-live="assertive"`를 사용한다:

```html
<!-- 긴급 토스트 — 오류 알림 -->
<div class="toast toast--error" role="alert" aria-live="assertive">
    <div class="toast-body">
        <span class="toast-icon" aria-hidden="true">!</span>
        <span class="toast-message">저장에 실패했습니다. 다시 시도해주세요.</span>
    </div>
    <button type="button" class="btn-close" aria-label="닫기"></button>
</div>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `role="alert"` | — | 중요한 메시지임을 보조 기기에 즉시 전달 |
| `aria-live="polite"` | — | 현재 읽고 있는 내용이 끝난 후 메시지를 전달 |
| `aria-live="assertive"` | — | 현재 읽고 있는 내용을 중단하고 즉시 메시지를 전달 |
| `aria-atomic="true"` | — | 변경 시 전체 영역을 다시 읽음 (부분 변경 방지) |
| `aria-label="닫기"` | — | 아이콘 전용 닫기 버튼에 텍스트 대체 제공 |

- `aria-live="polite"` — 일반적인 성공/정보 메시지에 사용한다. 스크린리더가 현재 읽기를 마친 후 토스트 내용을 읽는다.
- `role="alert"` — 오류, 경고 등 긴급 메시지에 사용한다. 스크린리더가 즉시 토스트 내용을 읽는다.

---

## 접근성 체크리스트

토스트 마크업 검수 시 아래 항목을 확인한다.

- [ ] 토스트 컨테이너에 `aria-live` 영역 설정 (페이지 로드 시 이미 DOM에 존재)
- [ ] 일반 알림에 `aria-live="polite"` 적용
- [ ] 긴급 알림에 `role="alert"` 또는 `aria-live="assertive"` 적용
- [ ] `aria-atomic="true"` 적용 (전체 메시지 다시 읽기)
- [ ] 닫기 버튼에 `aria-label="닫기"` 적용
- [ ] 자동 사라짐 시간이 충분한지 확인 (최소 5초 권장, KWCAG 2.2.1)
- [ ] 마우스 호버 또는 키보드 포커스 시 자동 사라짐 일시 정지
- [ ] 포커스 인디케이터 동작 확인 (닫기 버튼)

---

## 토스트 삽입 JS 예시

토스트는 `aria-live` 영역에 동적으로 삽입하여 스크린리더가 자동으로 읽도록 한다. 자동 사라짐 타이머를 설정하되, 마우스 호버 시 타이머를 일시 정지한다:

```javascript
$(function () {
    var $container = $('#toastContainer');
    if (!$container.length) return;

    var autoDismissDelay = 5000; // 5초

    function showToast(message, type) {
        var icon = type === 'error' ? '!' : '✓';
        var $toast = $('<div>')
            .addClass('toast' + (type === 'error' ? ' toast--error' : ''))
            .attr('role', 'alert')
            .html(
                '<div class="toast-body">' +
                '    <span class="toast-icon" aria-hidden="true">' + icon + '</span>' +
                '    <span class="toast-message">' + message + '</span>' +
                '</div>' +
                '<button type="button" class="btn-close" aria-label="닫기"></button>'
            );

        $container.append($toast);

        // 닫기 버튼 이벤트
        $toast.find('.btn-close').on('click', function () {
            removeToast($toast);
        });

        // 자동 사라짐 타이머
        var timer = setTimeout(function () {
            removeToast($toast);
        }, autoDismissDelay);

        // 마우스 호버 시 타이머 일시 정지 (KWCAG 2.2.1)
        $toast.on('mouseenter', function () {
            clearTimeout(timer);
        });
        $toast.on('mouseleave', function () {
            timer = setTimeout(function () {
                removeToast($toast);
            }, autoDismissDelay);
        });
    }

    function removeToast($toast) {
        if ($toast && $toast.length) {
            $toast.remove();
        }
    }

    // 전역 함수로 노출
    window.showToast = showToast;
});
```

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_toast.scss` | 토스트 컴포넌트 스타일, 위치 고정, 애니메이션 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--z-toast`, `--color-success`, `--color-error` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Toast / Snackbar (토스트)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `role="alert"` | 필수 — 알림 전달 | ✅ |
| `aria-live` | 필수 — 동적 콘텐츠 전달 | ✅ polite / assertive 구분 |
| 자동 사라짐 | 권장 — 최소 5초 | ✅ 5초 기본값 |
| 호버 시 일시 정지 | 권장 | ✅ JS 예시 제공 |
| 닫기 버튼 | 필수 — 수동 닫기 지원 | ✅ `aria-label="닫기"` |
| 타입 구분 | 권장 — 성공/오류/정보 | ✅ 클래스 변형 |

> **참고:** KRDS에서는 토스트 위치를 화면 하단 중앙 또는 우측 하단으로 권장한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Toast <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 토스트 명세
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/alert/" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Alert Pattern <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.3 상태 메시지 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.2.1 시간 제한 조절 <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-live" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-live <span class="sr-only">(새 창)</span></a>
