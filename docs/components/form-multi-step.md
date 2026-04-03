---
layout: layouts/base.njk
title: 다단계 폼
tags: components
section: components
permalink: /components/form-multi-step/
---

# 다단계 폼 (COMP-03-MULTISTEP)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정, 2.4.3 초점 순서, 3.2.2 예측 가능성
**적용 수준:** AA
**작성일:** 2026-03-31

> 다단계 폼은 긴 입력 과정을 여러 단계로 나누어 사용자 부담을 줄인다.
> 각 단계의 진행 상황을 `aria-live`로 알리고, 단계별 유효성 검사를 수행한다.
> `<fieldset>`으로 각 단계의 필드를 묶고, 단계 표시기로 현재 위치를 시각/스크린리더 모두에 전달한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 단계 전환 시 `aria-live`로 진행 상황을 알리고, 각 단계의 첫 번째 필드로 포커스를 이동한다. 단계별 유효성 검사를 반드시 수행한다.**

---

## 단계 표시기

현재 단계를 `aria-current="step"`으로 표시한다. 완료된 단계와 미완료 단계를 시각적/의미적으로 구분한다:

<div class="docs-preview">
<nav aria-label="가입 진행 단계">
  <ol class="d-flex list-unstyled gap-3 m-0 p-0">
    <li class="d-flex align-items-center gap-1">
      <span class="badge rounded-circle bg-success">&#10003;</span>
      <span>기본 정보</span>
      <span class="sr-only">(완료)</span>
    </li>
    <li class="d-flex align-items-center gap-1" aria-current="step">
      <span class="badge rounded-circle bg-primary">2</span>
      <span class="fw-bold">상세 정보</span>
    </li>
    <li class="d-flex align-items-center gap-1">
      <span class="badge rounded-circle bg-secondary">3</span>
      <span class="text-muted">약관 동의</span>
    </li>
  </ol>
</nav>
</div>

```html
<!-- 단계 표시기 — aria-current="step"으로 현재 단계 표시 -->
<nav aria-label="가입 진행 단계">
    <ol class="step-indicator">
        <li class="step-complete"><span class="step-number">1</span> 기본 정보 <span class="sr-only">(완료)</span></li>
        <li aria-current="step" class="step-active"><span class="step-number">2</span> 상세 정보</li>
        <li class="step-pending"><span class="step-number">3</span> 약관 동의</li>
        <li class="step-pending"><span class="step-number">4</span> 가입 완료</li>
    </ol>
</nav>
```

---

## 진행 상황 알림 영역

단계가 전환될 때 `aria-live="polite"` 영역으로 진행 상황을 스크린리더에 알린다:

<div class="docs-preview">
<div id="preview-step-announce-demo" class="sr-only" aria-live="polite" aria-atomic="true">3단계 중 2단계입니다.</div>
<p class="border rounded p-2 bg-light m-0"><code>aria-live="polite"</code> 영역 (sr-only): <em>"3단계 중 2단계입니다."</em></p>
</div>

```html
<!-- 진행 상황 알림 — aria-live="polite"로 단계 전환 알림 -->
<div id="step-announce" class="sr-only" aria-live="polite" aria-atomic="true"></div>
```

---

## 다단계 폼 전체 구조

각 단계를 `<fieldset>`으로 묶고, 현재 활성 단계만 표시한다. 이전/다음 버튼으로 단계를 이동한다:

<div class="docs-preview">
<form id="preview-multi-step-form" onsubmit="return false;" novalidate>
  <div id="preview-step-announce" class="sr-only" aria-live="polite" aria-atomic="true"></div>
  <nav aria-label="가입 진행 단계">
    <ol class="step-indicator">
      <li aria-current="step" class="step-active"><span class="step-number">1</span> 기본 정보</li>
      <li class="step-pending"><span class="step-number">2</span> 상세 정보</li>
      <li class="step-pending"><span class="step-number">3</span> 약관 동의</li>
    </ol>
  </nav>
  <fieldset id="preview-step-1" class="step-panel">
    <legend class="form-legend">1단계: 기본 정보</legend>
    <div class="mb-3">
      <label for="preview-ms-name" class="form-label">이름 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
      <input type="text" id="preview-ms-name" name="name" class="form-control" required aria-required="true" autocomplete="name">
      <p id="preview-ms-name-error" class="form-error d-none"></p>
    </div>
    <div class="mb-3">
      <label for="preview-ms-email" class="form-label">이메일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
      <input type="email" id="preview-ms-email" name="email" class="form-control" required aria-required="true" autocomplete="email">
      <p id="preview-ms-email-error" class="form-error d-none"></p>
    </div>
    <div class="step-actions">
      <button type="button" class="btn btn-primary" data-step-next="2">다음</button>
    </div>
  </fieldset>
</form>
</div>

```html
<!-- 다단계 폼 — fieldset으로 단계 그룹화, 활성 단계만 표시 -->
<form id="multi-step-form" action="/register" method="post" novalidate>
    <!-- 진행 상황 알림 영역 -->
    <div id="step-announce" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    <!-- 단계 표시기 -->
    <nav aria-label="가입 진행 단계">
        <ol class="step-indicator">
            <li aria-current="step" class="step-active"><span class="step-number">1</span> 기본 정보</li>
            <li class="step-pending"><span class="step-number">2</span> 상세 정보</li>
            <li class="step-pending"><span class="step-number">3</span> 약관 동의</li>
        </ol>
    </nav>

    <!-- 1단계: 기본 정보 -->
    <fieldset id="step-1" class="step-panel">
        <legend class="form-legend">1단계: 기본 정보</legend>

        <div class="mb-3">
            <label for="ms-name" class="form-label">이름 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
            <input type="text" id="ms-name" name="name" class="form-control" required aria-required="true" autocomplete="name">
            <p id="ms-name-error" class="invalid-feedback d-block" class="d-none"></p>
        </div>

        <div class="mb-3">
            <label for="ms-email" class="form-label">이메일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
            <input type="email" id="ms-email" name="email" class="form-control" required aria-required="true" autocomplete="email">
            <p id="ms-email-error" class="invalid-feedback d-block" class="d-none"></p>
        </div>

        <div class="step-actions">
            <button type="button" class="btn btn-primary" data-step-next="2">다음</button>
        </div>
    </fieldset>

    <!-- 2단계: 상세 정보 (초기 비활성) -->
    <fieldset id="step-2" class="step-panel" class="d-none" disabled>
        <legend class="form-legend">2단계: 상세 정보</legend>

        <div class="mb-3">
            <label for="ms-phone" class="form-label">휴대전화 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
            <input type="tel" id="ms-phone" name="phone" class="form-control" required aria-required="true" autocomplete="tel" aria-describedby="ms-phone-hint">
            <p id="ms-phone-hint" class="form-text">숫자만 입력 (예: 01012345678)</p>
            <p id="ms-phone-error" class="invalid-feedback d-block" class="d-none"></p>
        </div>

        <div class="mb-3">
            <label for="ms-address" class="form-label">주소</label>
            <input type="text" id="ms-address" name="address" class="form-control" autocomplete="street-address">
        </div>

        <div class="step-actions">
            <button type="button" class="btn btn-secondary" data-step-prev="1">이전</button>
            <button type="button" class="btn btn-primary" data-step-next="3">다음</button>
        </div>
    </fieldset>

    <!-- 3단계: 약관 동의 (초기 비활성) -->
    <fieldset id="step-3" class="step-panel" class="d-none" disabled>
        <legend class="form-legend">3단계: 약관 동의</legend>

        <fieldset class="mb-3">
            <legend class="form-label">약관 동의 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>
            <div class="form-check">
                <input type="checkbox" id="ms-agree-terms" name="agree_terms" class="form-check-input" required aria-required="true">
                <label for="ms-agree-terms" class="form-check-label">이용약관 동의 (필수)</label>
            </div>
            <div class="form-check">
                <input type="checkbox" id="ms-agree-privacy" name="agree_privacy" class="form-check-input" required aria-required="true">
                <label for="ms-agree-privacy" class="form-check-label">개인정보 수집·이용 동의 (필수)</label>
            </div>
        </fieldset>
        <p id="ms-agree-error" class="invalid-feedback d-block" class="d-none"></p>

        <div class="step-actions">
            <button type="button" class="btn btn-secondary" data-step-prev="2">이전</button>
            <button type="submit" class="btn btn-primary">가입 완료</button>
        </div>
    </fieldset>
</form>
```

---

## 단계 전환 JS

단계 전환 시 현재 단계의 유효성 검사를 수행하고, 통과하면 다음 단계를 활성화한다. 포커스를 다음 단계의 첫 번째 필드로 이동하고, `aria-live` 영역에 진행 상황을 알린다:

```javascript
// 다단계 폼 — 단계 전환, 유효성 검사, 포커스 관리
// 단계 전환 시: 현재 단계 유효성 검사 → 다음 단계 활성화 → 포커스 이동 → 진행 알림
$(function () {
    var $form = $('#multi-step-form');
    var $announcer = $('#step-announce');
    if (!$form.length || !$announcer.length) return;

    var currentStep = 1;
    var totalSteps = 3;

    // 단계 전환 함수
    function goToStep(targetStep) {
        var $currentPanel = $('#step-' + currentStep);
        var $targetPanel = $('#step-' + targetStep);
        if (!$targetPanel.length) return;

        // 현재 단계 숨기기
        $currentPanel.hide().attr('disabled', '');

        // 대상 단계 표시
        $targetPanel.show().removeAttr('disabled');

        // 단계 표시기 업데이트
        $form.find('.step-indicator li').each(function (index) {
            var $step = $(this);
            $step.removeAttr('aria-current');
            $step.attr('class', index < targetStep - 1 ? 'step-complete' : index === targetStep - 1 ? 'step-active' : 'step-pending');
            if (index === targetStep - 1) $step.attr('aria-current', 'step');
        });

        currentStep = targetStep;

        // 첫 번째 입력 필드로 포커스 이동
        var $firstInput = $targetPanel.find('input, select, textarea').first();
        if ($firstInput.length) $firstInput.focus();

        // aria-live 영역에 진행 상황 알림
        $announcer.text(totalSteps + '단계 중 ' + currentStep + '단계입니다.');
    }

    // 단계별 유효성 검사
    function validateStep(stepNumber) {
        var $panel = $('#step-' + stepNumber);
        var $requiredFields = $panel.find('[required]');
        var isValid = true;
        var $firstInvalid = null;

        $requiredFields.each(function () {
            var $field = $(this);
            var $errorEl = $('#' + $field.attr('id') + '-error');
            var isEmpty = $field.attr('type') === 'checkbox' ? !$field.prop('checked') : !$field.val().trim();

            if (isEmpty) {
                $field.addClass('is-invalid').attr('aria-invalid', 'true');
                if ($errorEl.length) {
                    $errorEl.text('필수 입력 항목입니다.').attr('role', 'alert').show();
                }
                if (!$firstInvalid) $firstInvalid = $field;
                isValid = false;
            } else {
                $field.removeClass('is-invalid').removeAttr('aria-invalid');
                if ($errorEl.length) {
                    $errorEl.hide().removeAttr('role');
                }
            }
        });

        if ($firstInvalid) $firstInvalid.focus();
        return isValid;
    }

    // 이벤트 위임 — 다음/이전 버튼 클릭 처리
    $form.on('click', '[data-step-next], [data-step-prev]', function () {
        var $btn = $(this);

        if ($btn.data('step-next')) {
            if (validateStep(currentStep)) {
                goToStep(parseInt($btn.data('step-next'), 10));
            }
        } else if ($btn.data('step-prev')) {
            goToStep(parseInt($btn.data('step-prev'), 10));
        }
    });
});
```

---

## 접근성 체크리스트

- [ ] 각 단계를 `<fieldset>` + `<legend>`로 그룹화
- [ ] 비활성 단계에 `disabled` 속성 적용
- [ ] 단계 표시기에 `aria-current="step"` 적용
- [ ] 단계 전환 시 `aria-live="polite"` 영역으로 진행 상황 알림
- [ ] 단계 전환 시 새 단계의 첫 번째 필드로 포커스 이동
- [ ] 각 단계에서 유효성 검사 수행 후 다음 단계 진행
- [ ] 유효성 검사 실패 시 첫 번째 오류 필드로 포커스 이동
- [ ] 오류 상태에 `is-invalid` + `aria-invalid="true"` 쌍 처리
- [ ] 오류 메시지에 `role="alert"` 적용
- [ ] 이전 단계로 돌아갈 수 있는 "이전" 버튼 제공
- [ ] 모든 입력 필드에 `<label>` 연결 (`for`/`id` 매칭)

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Step indicator (단계 표시기)** + **Text input** + **Checkbox** 컴포넌트 조합에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-current="step"` | 필수 — 현재 단계 표시 | ✅ |
| `aria-live` 진행 알림 | 필수 — 단계 전환 알림 | ✅ |
| `fieldset` / `legend` | 필수 — 단계별 그룹화 | ✅ |
| `aria-required` + `required` | 필수 — 필수 입력 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `role="alert"` 오류 | 필수 — 즉시 알림 | ✅ |
| 포커스 관리 | 필수 — 단계 전환 시 이동 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Step indicator <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 단계 표시기 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.3 초점 순서 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/multi-page/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Multi-step Forms <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
