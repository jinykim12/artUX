---
layout: layouts/base.njk
title: 회원가입 폼
tags: components
section: components
permalink: /components/form-register/
---

# 회원가입 폼 (COMP-03-REGISTER)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-31

> 회원가입 폼은 다수의 필수 입력 필드를 포함하므로 필수 표시(`*` + sr-only)를 일관되게 적용하고,
> 비밀번호 강도 힌트와 약관 동의 체크박스를 접근성 있게 구현해야 한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 모든 필수 필드에 `aria-required="true"` + 시각적 `*` + sr-only 필수 텍스트를 일관 적용한다. 약관 동의는 `<fieldset>` + `<legend>`로 묶는다.**

---

## 기본 회원가입 폼

회원가입에 필요한 기본 필드를 포함한다. 비밀번호에 `autocomplete="new-password"`를 지정하고, 비밀번호 강도 힌트를 `aria-describedby`로 연결한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="fw-bold fs-5 mb-3">회원가입</div>
  <ol class="step-indicator" aria-label="가입 단계">
    <li aria-current="step"><span class="step-number">1</span> 정보 입력</li>
    <li><span class="step-number">2</span> 약관 동의</li>
    <li><span class="step-number">3</span> 가입 완료</li>
  </ol>
  <div class="mb-3">
    <label for="preview-reg-name" class="form-label">이름 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="text" id="preview-reg-name" name="name" class="form-control" required aria-required="true" autocomplete="name">
  </div>
  <div class="mb-3">
    <label for="preview-reg-email" class="form-label">이메일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="email" id="preview-reg-email" name="email" class="form-control" required aria-required="true" autocomplete="email" aria-describedby="preview-email-hint">
    <p id="preview-email-hint" class="form-text">예: example@domain.com</p>
  </div>
  <div class="mb-3">
    <label for="preview-reg-id" class="form-label">아이디 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="text" id="preview-reg-id" name="username" class="form-control" required aria-required="true" autocomplete="username" aria-describedby="preview-id-hint">
    <p id="preview-id-hint" class="form-text">영문 소문자, 숫자 조합 4~20자</p>
  </div>
  <div class="mb-3">
    <label for="preview-reg-pw" class="form-label">비밀번호 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="password" id="preview-reg-pw" name="password" class="form-control" required aria-required="true" autocomplete="new-password" aria-describedby="preview-pw-strength-hint">
    <p id="preview-pw-strength-hint" class="form-text">영문, 숫자, 특수문자 포함 8자 이상</p>
    <div id="preview-pw-strength" class="pw-strength" aria-live="polite" aria-atomic="true"></div>
  </div>
  <div class="mb-3">
    <label for="preview-reg-pw-confirm" class="form-label">비밀번호 확인 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="password" id="preview-reg-pw-confirm" name="password_confirm" class="form-control" required aria-required="true" autocomplete="new-password" aria-describedby="preview-pw-confirm-hint">
    <p id="preview-pw-confirm-hint" class="form-text">비밀번호를 다시 입력해 주세요.</p>
  </div>
  <div class="mb-3">
    <label for="preview-reg-phone" class="form-label">휴대전화 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="tel" id="preview-reg-phone" name="phone" class="form-control" required aria-required="true" autocomplete="tel" aria-describedby="preview-phone-hint">
    <p id="preview-phone-hint" class="form-text">숫자만 입력 (예: 01012345678)</p>
  </div>
  <button type="submit" class="btn btn-primary">다음 단계</button>
</form>
</div>

```html
<!-- 회원가입 폼 — 필수 표시 일관 적용, autocomplete로 자동완성 지원 -->
<form action="/register" method="post">
    <h2>회원가입</h2>

    <!-- 단계 표시기 — 현재 단계를 aria-current="step"으로 표시 -->
    <ol class="step-indicator" aria-label="가입 단계">
        <li aria-current="step"><span class="step-number">1</span> 정보 입력</li>
        <li><span class="step-number">2</span> 약관 동의</li>
        <li><span class="step-number">3</span> 가입 완료</li>
    </ol>

    <div class="mb-3">
        <label for="reg-name" class="form-label">이름 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
        <input type="text" id="reg-name" name="name" class="form-control" required aria-required="true" autocomplete="name">
    </div>

    <div class="mb-3">
        <label for="reg-email" class="form-label">이메일 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
        <input type="email" id="reg-email" name="email" class="form-control" required aria-required="true" autocomplete="email" aria-describedby="email-hint">
        <p id="email-hint" class="form-text">예: example@domain.com</p>
    </div>

    <div class="mb-3">
        <label for="reg-id" class="form-label">아이디 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
        <input type="text" id="reg-id" name="username" class="form-control" required aria-required="true" autocomplete="username" aria-describedby="id-hint">
        <p id="id-hint" class="form-text">영문 소문자, 숫자 조합 4~20자</p>
    </div>

    <div class="mb-3">
        <label for="reg-pw" class="form-label">비밀번호 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
        <input type="password" id="reg-pw" name="password" class="form-control" required aria-required="true" autocomplete="new-password" aria-describedby="pw-strength-hint">
        <p id="pw-strength-hint" class="form-text">영문, 숫자, 특수문자 포함 8자 이상</p>
        <!-- 비밀번호 강도 표시 — aria-live로 변경 시 스크린리더 알림 -->
        <div id="pw-strength" class="pw-strength" aria-live="polite" aria-atomic="true"></div>
    </div>

    <div class="mb-3">
        <label for="reg-pw-confirm" class="form-label">비밀번호 확인 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
        <input type="password" id="reg-pw-confirm" name="password_confirm" class="form-control" required aria-required="true" autocomplete="new-password" aria-describedby="pw-confirm-hint">
        <p id="pw-confirm-hint" class="form-text">비밀번호를 다시 입력해 주세요.</p>
    </div>

    <div class="mb-3">
        <label for="reg-phone" class="form-label">휴대전화 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
        <input type="tel" id="reg-phone" name="phone" class="form-control" required aria-required="true" autocomplete="tel" aria-describedby="phone-hint">
        <p id="phone-hint" class="form-text">숫자만 입력 (예: 01012345678)</p>
    </div>

    <button type="submit" class="btn btn-primary">다음 단계</button>
</form>
```

---

## 비밀번호 강도 표시 (JS)

비밀번호 입력 시 실시간으로 강도를 평가하고, `aria-live="polite"` 영역에 결과를 알린다:

```javascript
// 비밀번호 강도 평가 — aria-live="polite" 영역에 결과 업데이트
$(function () {
    var $pwInput = $('#reg-pw');
    var $strengthEl = $('#pw-strength');
    if (!$pwInput.length || !$strengthEl.length) return;

    $pwInput.on('input', function () {
        var value = $pwInput.val();
        var strength = '';

        if (value.length < 8) {
            strength = '약함: 8자 이상 입력해 주세요.';
        } else if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
            strength = '강함: 안전한 비밀번호입니다.';
        } else {
            strength = '보통: 특수문자를 추가하면 더 안전합니다.';
        }

        $strengthEl.text(strength);
    });
});
```

---

## 오류 상태 (비밀번호 불일치)

비밀번호 확인이 일치하지 않을 때의 오류 상태이다:

```html
<!-- 비밀번호 불일치 오류 — is-invalid + aria-invalid 쌍 처리 -->
<div class="mb-3">
    <label for="reg-pw-confirm-err" class="form-label">비밀번호 확인 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></label>
    <input type="password" id="reg-pw-confirm-err" name="password_confirm" class="form-control is-invalid" required aria-required="true" aria-invalid="true" aria-describedby="pw-confirm-error" autocomplete="new-password">
    <p id="pw-confirm-error" class="form-error" role="alert">비밀번호가 일치하지 않습니다.</p>
</div>
```

---

## 약관 동의 (fieldset/legend)

약관 동의 항목은 `<fieldset>` + `<legend>`로 그룹화한다. 전체 동의 체크박스와 개별 동의 체크박스를 분리한다:

```html
<!-- 약관 동의 — fieldset/legend로 그룹화, 필수 체크박스에 aria-required -->
<fieldset class="mb-3">
    <legend class="form-label">약관 동의 <span aria-hidden="true">*</span><span class="sr-only">(필수)</span></legend>

    <div class="form-check mb-2">
        <input type="checkbox" id="agree-all" class="form-check-input">
        <label for="agree-all" class="form-check-label"><strong>전체 동의</strong></label>
    </div>

    <hr>

    <div class="form-check">
        <input type="checkbox" id="agree-terms" name="agree_terms" class="form-check-input" required aria-required="true">
        <label for="agree-terms" class="form-check-label">이용약관 동의 (필수)</label>
        <a href="/terms" target="_blank" class="form-link" aria-label="이용약관 전문 보기 (새 창)">전문 보기</a>
    </div>

    <div class="form-check">
        <input type="checkbox" id="agree-privacy" name="agree_privacy" class="form-check-input" required aria-required="true">
        <label for="agree-privacy" class="form-check-label">개인정보 수집·이용 동의 (필수)</label>
        <a href="/privacy" target="_blank" class="form-link" aria-label="개인정보 처리방침 전문 보기 (새 창)">전문 보기</a>
    </div>

    <div class="form-check">
        <input type="checkbox" id="agree-marketing" name="agree_marketing" class="form-check-input">
        <label for="agree-marketing" class="form-check-label">마케팅 정보 수신 동의 (선택)</label>
    </div>
</fieldset>

<button type="submit" class="btn btn-primary">가입 완료</button>
```

---

## 접근성 체크리스트

- [ ] 모든 입력 필드에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] 필수 입력 항목에 `aria-required="true"` + 시각적 `*` + `sr-only "(필수)"` 적용
- [ ] 비밀번호 필드에 `autocomplete="new-password"` 적용
- [ ] 아이디 필드에 `autocomplete="username"` 적용
- [ ] 비밀번호 강도 힌트가 `aria-describedby`로 연결
- [ ] 비밀번호 강도 표시 영역에 `aria-live="polite"` 적용
- [ ] 오류 상태에 `is-invalid` + `aria-invalid="true"` 쌍 처리
- [ ] 오류 메시지에 `role="alert"` 적용
- [ ] 약관 동의 그룹에 `<fieldset>` + `<legend>` 사용
- [ ] 새 창 링크에 `aria-label`로 "(새 창)" 안내
- [ ] 단계 표시기에 `aria-current="step"` 적용

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Text input (텍스트 입력 필드)** + **Checkbox (체크박스)** + **Step indicator (단계 표시기)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-required` + `required` | 필수 — 필수 입력 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `aria-describedby` | 필수 — 힌트/오류 메시지 연결 | ✅ |
| `role="alert"` 오류 | 필수 — 즉시 알림 | ✅ |
| `fieldset` / `legend` | 필수 — 약관 동의 그룹 | ✅ |
| `autocomplete` | 필수 — 개인 정보 자동완성 | ✅ |
| `aria-current="step"` | 권장 — 현재 단계 표시 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Text input / Checkbox / Step indicator <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/autocomplete" target="_blank" rel="noopener" title="새 창으로 열림">MDN — autocomplete <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
