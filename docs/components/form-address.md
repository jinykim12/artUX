---
layout: layouts/base.njk
title: 주소 검색
tags: components
section: components
permalink: /components/form-address/
---

# 주소 검색 (COMP-03-ADDRESS)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정, 2.1.1 키보드 사용 보장, 2.4.3 초점 순서
**적용 수준:** AA
**작성일:** 2026-03-31

> 주소 검색은 우편번호 검색 팝업과 연동되므로 포커스 관리가 핵심이다.
> 팝업 열기 전 트리거 버튼을 기억하고, 팝업 닫힌 후 해당 버튼으로 포커스를 복귀시켜야 한다.
> 자동 채워진 읽기 전용 필드에는 `readonly` 속성을 적용하여 사용자가 직접 수정하지 못하게 한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 팝업 닫힌 후 반드시 트리거 버튼으로 포커스를 복귀시킨다. 자동 채워진 필드에 `readonly`를 적용하고, 상세주소 입력 필드에 포커스를 이동한다.**

---

## 기본 주소 검색 폼

우편번호 검색 버튼, 자동 채워지는 우편번호/기본주소 필드, 직접 입력하는 상세주소 필드로 구성한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <fieldset class="mb-3">
    <legend class="form-label">주소 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>
    <div class="form-row mb-2">
      <div class="form-group">
        <label for="preview-postcode" class="form-label">우편번호</label>
        <input type="text" id="preview-postcode" name="postcode" class="form-control" readonly aria-describedby="preview-addr-hint" placeholder="우편번호" autocomplete="postal-code">
      </div>
      <button type="button" id="preview-btn-postcode" class="btn btn-outline" aria-haspopup="dialog">우편번호 검색</button>
    </div>
    <div class="mb-2">
      <label for="preview-addr-road" class="form-label">기본주소</label>
      <input type="text" id="preview-addr-road" name="address" class="form-control" readonly placeholder="기본주소" autocomplete="street-address">
    </div>
    <div class="mb-2">
      <label for="preview-addr-detail" class="form-label">상세주소</label>
      <input type="text" id="preview-addr-detail" name="address_detail" class="form-control" required aria-required="true" placeholder="상세주소를 입력하세요" autocomplete="address-line2">
    </div>
    <p id="preview-addr-hint" class="form-text">우편번호 검색 버튼을 눌러 주소를 선택한 후 상세주소를 입력해 주세요.</p>
  </fieldset>
</form>
</div>

```html
<!-- 주소 검색 폼 — 우편번호 검색 → 자동 채움 → 상세주소 입력 -->
<fieldset class="mb-3">
    <legend class="form-label">주소 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>

    <div class="form-row mb-2">
        <div class="form-group">
            <label for="addr-postcode" class="form-label">우편번호</label>
            <input type="text" id="addr-postcode" name="postcode" class="form-control" readonly aria-describedby="addr-hint" placeholder="우편번호" autocomplete="postal-code">
        </div>
        <!-- 우편번호 검색 버튼 — 팝업 트리거, 포커스 복귀 대상 -->
        <button type="button" id="btn-postcode" class="btn btn-outline" aria-haspopup="dialog">우편번호 검색</button>
    </div>

    <div class="mb-2">
        <label for="addr-road" class="form-label">기본주소</label>
        <input type="text" id="addr-road" name="address" class="form-control" readonly placeholder="기본주소" autocomplete="street-address">
    </div>

    <div class="mb-2">
        <label for="addr-detail" class="form-label">상세주소</label>
        <input type="text" id="addr-detail" name="address_detail" class="form-control" required aria-required="true" placeholder="상세주소를 입력하세요" autocomplete="address-line2">
    </div>

    <p id="addr-hint" class="form-text">우편번호 검색 버튼을 눌러 주소를 선택한 후 상세주소를 입력해 주세요.</p>
</fieldset>
```

---

## 우편번호 검색 팝업

팝업(다이얼로그)에 `role="dialog"`, `aria-modal="true"`, `aria-label`을 적용한다. 팝업이 열리면 팝업 내부로 포커스를 이동하고, 키보드 트랩을 적용한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-popup-postcode" class="form-label">우편번호</label>
    <div class="d-flex gap-2">
      <input type="text" id="preview-popup-postcode" class="form-control" readonly placeholder="우편번호" autocomplete="postal-code">
      <button type="button" class="btn btn-outline-secondary text-nowrap" aria-haspopup="dialog">우편번호 검색</button>
    </div>
  </div>
</form>
</div>

```html
<!-- 우편번호 검색 팝업 — role="dialog", aria-modal, 키보드 트랩 -->
<div id="postcode-dialog" class="modal" role="dialog" aria-modal="true" aria-label="우편번호 검색" class="d-none">
    <div class="modal-content">
        <div class="modal-header">
            <h2 class="modal-title">우편번호 검색</h2>
            <button type="button" class="btn-close" aria-label="닫기" id="btn-postcode-close"></button>
        </div>
        <div class="modal-body">
            <form role="search" aria-label="주소 검색">
                <label for="postcode-search" class="sr-only">도로명 또는 지번 주소</label>
                <input type="search" id="postcode-search" class="form-control" placeholder="도로명 또는 지번 주소를 입력하세요" autocomplete="off">
                <button type="submit" class="btn btn-primary">검색</button>
            </form>
            <!-- 검색 결과 목록 — aria-live로 결과 갱신 알림 -->
            <div id="postcode-results" aria-live="polite" aria-atomic="true">
                <ul role="listbox" aria-label="검색 결과">
                    <li role="option" tabindex="0" data-postcode="06234" data-address="서울특별시 강남구 테헤란로 123">
                        <span class="postcode">06234</span>
                        <span class="address">서울특별시 강남구 테헤란로 123</span>
                    </li>
                    <li role="option" tabindex="-1" data-postcode="06235" data-address="서울특별시 강남구 테헤란로 125">
                        <span class="postcode">06235</span>
                        <span class="address">서울특별시 강남구 테헤란로 125</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
```

---

## 포커스 관리 (JS)

팝업 열기/닫기 시 포커스 이동을 관리한다. 주소 선택 후 상세주소 필드로 포커스를 이동하는 것이 핵심이다:

```javascript
// 주소 검색 팝업 포커스 관리
// 팝업 열기: 팝업 내 검색 필드로 포커스 이동
// 주소 선택: 팝업 닫고 → 자동 채움 → 상세주소 필드로 포커스 이동
// 팝업 닫기(취소): 트리거 버튼으로 포커스 복귀
$(function () {
    var $btnOpen = $('#btn-postcode');
    var $dialog = $('#postcode-dialog');
    var $btnClose = $('#btn-postcode-close');
    var $searchInput = $('#postcode-search');
    var $postcodeField = $('#addr-postcode');
    var $roadField = $('#addr-road');
    var $detailField = $('#addr-detail');

    if (!$btnOpen.length || !$dialog.length) return;

    // 팝업 열기 — 검색 필드로 포커스 이동
    $btnOpen.on('click', function () {
        $dialog.show();
        $searchInput.focus();
    });

    // 팝업 닫기(취소) — 트리거 버튼으로 포커스 복귀
    $btnClose.on('click', function () {
        $dialog.hide();
        $btnOpen.focus();
    });

    // ESC 키로 팝업 닫기 — 트리거 버튼으로 포커스 복귀
    $dialog.on('keydown', function (event) {
        if (event.key === 'Escape') {
            $dialog.hide();
            $btnOpen.focus();
        }
    });

    // 주소 선택 — 자동 채움 후 상세주소 필드로 포커스 이동
    $dialog.on('click', '[role="option"]', function () {
        var $item = $(this);
        $postcodeField.val($item.data('postcode'));
        $roadField.val($item.data('address'));
        $dialog.hide();
        // 상세주소 필드로 포커스 이동 — 사용자가 바로 입력할 수 있도록
        $detailField.focus();
    });

    $dialog.on('keydown', '[role="option"]', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            $(this).trigger('click');
        }
    });
});
```

---

## 주소 오류 상태

우편번호 미입력 또는 상세주소 미입력 시의 오류 상태이다:

<div class="docs-preview">
<form onsubmit="return false;">
  <fieldset class="mb-3">
    <legend class="form-label">주소 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>
    <div class="d-flex gap-2 mb-2">
      <input type="text" id="preview-postcode-err" class="form-control" readonly value="06234">
      <button type="button" class="btn btn-outline-secondary text-nowrap" aria-haspopup="dialog">우편번호 검색</button>
    </div>
    <div class="mb-2">
      <label for="preview-road-err" class="form-label">기본주소</label>
      <input type="text" id="preview-road-err" class="form-control" readonly value="서울특별시 강남구 테헤란로 123">
    </div>
    <div class="mb-2">
      <label for="preview-detail-err" class="form-label">상세주소</label>
      <input type="text" id="preview-detail-err" class="form-control is-invalid" required aria-required="true" aria-invalid="true" aria-describedby="preview-detail-error-msg">
      <p id="preview-detail-error-msg" class="text-danger small mt-1" role="alert">상세주소를 입력해 주세요.</p>
    </div>
  </fieldset>
</form>
</div>

```html
<!-- 주소 오류 — 상세주소 미입력 시 오류 처리 -->
<fieldset class="mb-3">
    <legend class="form-label">주소 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>

    <div class="form-row mb-2">
        <div class="form-group">
            <label for="addr-postcode-err" class="form-label">우편번호</label>
            <input type="text" id="addr-postcode-err" name="postcode" class="form-control" readonly value="06234">
        </div>
        <button type="button" class="btn btn-outline" aria-haspopup="dialog">우편번호 검색</button>
    </div>

    <div class="mb-2">
        <label for="addr-road-err" class="form-label">기본주소</label>
        <input type="text" id="addr-road-err" name="address" class="form-control" readonly value="서울특별시 강남구 테헤란로 123">
    </div>

    <div class="mb-2">
        <label for="addr-detail-err" class="form-label">상세주소</label>
        <input type="text" id="addr-detail-err" name="address_detail" class="form-control is-invalid" required aria-required="true" aria-invalid="true" aria-describedby="addr-detail-error">
        <p id="addr-detail-error" class="invalid-feedback d-block" role="alert">상세주소를 입력해 주세요.</p>
    </div>
</fieldset>
```

---

## 접근성 체크리스트

- [ ] 모든 주소 입력 필드에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] 주소 필드 그룹을 `<fieldset>` + `<legend>`로 묶음
- [ ] 자동 채워지는 필드에 `readonly` 적용
- [ ] 우편번호 검색 버튼에 `aria-haspopup="dialog"` 적용
- [ ] 팝업에 `role="dialog"` + `aria-modal="true"` + `aria-label` 적용
- [ ] 팝업 열릴 때 팝업 내부로 포커스 이동
- [ ] 팝업 닫힐 때(취소) 트리거 버튼으로 포커스 복귀
- [ ] 주소 선택 후 상세주소 필드로 포커스 이동
- [ ] ESC 키로 팝업 닫기 지원
- [ ] 검색 결과 영역에 `aria-live="polite"` 적용
- [ ] 오류 상태에 `is-invalid` + `aria-invalid="true"` 쌍 처리
- [ ] 오류 메시지에 `role="alert"` 적용
- [ ] `autocomplete` 속성 적용 (`postal-code`, `street-address`, `address-line2`)

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 패턴 중 **주소 입력** 패턴에 대응한다. KRDS에서 별도 주소 컴포넌트를 정의하지 않지만, Text input + Button + Dialog 조합으로 구현한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-required` + `required` | 필수 — 필수 입력 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `role="dialog"` 팝업 | 필수 — 모달 다이얼로그 | ✅ |
| `aria-modal="true"` | 필수 — 모달 상태 전달 | ✅ |
| 포커스 관리 | 필수 — 팝업 열기/닫기 | ✅ |
| `readonly` 자동 채움 | 권장 — 수정 방지 | ✅ |
| `autocomplete` | 권장 — 주소 자동완성 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Text input / Dialog <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.1.1 키보드 사용 보장 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.3 초점 순서 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI-ARIA — Dialog Pattern <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
- `docs/components/modal.md` — 모달 컴포넌트 패턴
