---
layout: layouts/base.njk
title: 로그인 폼
tags: components
section: components
permalink: /components/form-login/
---

# 로그인 폼 (COMP-03-LOGIN)

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-31

> 로그인 폼은 `autocomplete` 속성으로 브라우저 자동완성을 지원하고,
> 오류 메시지를 `role="alert"`로 즉시 알려 스크린리더 사용자가 로그인 실패를 인지할 수 있게 한다.
> 폼 접근성 원칙은 `docs/accessibility/forms.md`를 참고한다.

**규칙: 아이디/비밀번호 필드에 적절한 `autocomplete` 값을 지정하고, 로그인 실패 시 `role="alert"`로 오류를 알린다.**

---

## 기본 로그인 폼

아이디에 `autocomplete="username"`, 비밀번호에 `autocomplete="current-password"`를 지정한다. 비밀번호 입력 규칙은 `aria-describedby`로 힌트를 연결한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="fw-bold fs-5 mb-3">로그인</div>
  <div id="preview-login-error" class="form-error d-none" role="alert"></div>
  <div class="mb-3">
    <label for="preview-login-id" class="form-label">아이디</label>
    <input type="text" id="preview-login-id" name="username" class="form-control" required aria-required="true" autocomplete="username">
  </div>
  <div class="mb-3">
    <label for="preview-login-pw" class="form-label">비밀번호</label>
    <input type="password" id="preview-login-pw" name="password" class="form-control" required aria-required="true" autocomplete="current-password" aria-describedby="preview-pw-hint">
    <p id="preview-pw-hint" class="form-text">영문, 숫자, 특수문자 포함 8자 이상</p>
  </div>
  <div class="form-check mb-3">
    <input type="checkbox" id="preview-remember-me" name="remember" class="form-check-input">
    <label for="preview-remember-me" class="form-check-label">로그인 상태 유지</label>
  </div>
  <button type="submit" class="btn btn-primary btn-block">로그인</button>
  <div class="form-links">
    <a href="/find-id">아이디 찾기</a>
    <a href="/find-pw">비밀번호 찾기</a>
    <a href="/register">회원가입</a>
  </div>
</form>
</div>

```html
<!-- 기본 로그인 폼 — autocomplete로 자동완성 지원, aria-describedby로 힌트 연결 -->
<form action="/login" method="post">
    <h2>로그인</h2>

    <!-- 로그인 오류 메시지 — role="alert"로 즉시 알림, 초기에는 비워둠 -->
    <div id="login-error" class="form-error" role="alert" class="d-none"></div>

    <div class="mb-3">
        <label for="login-id" class="form-label">아이디</label>
        <input type="text" id="login-id" name="username" class="form-control" required aria-required="true" autocomplete="username">
    </div>

    <div class="mb-3">
        <label for="login-pw" class="form-label">비밀번호</label>
        <input type="password" id="login-pw" name="password" class="form-control" required aria-required="true" autocomplete="current-password" aria-describedby="pw-hint">
        <p id="pw-hint" class="form-text">영문, 숫자, 특수문자 포함 8자 이상</p>
    </div>

    <div class="form-check mb-3">
        <input type="checkbox" id="remember-me" name="remember" class="form-check-input">
        <label for="remember-me" class="form-check-label">로그인 상태 유지</label>
    </div>

    <button type="submit" class="btn btn-primary btn-block">로그인</button>

    <div class="form-links">
        <a href="/find-id">아이디 찾기</a>
        <a href="/find-pw">비밀번호 찾기</a>
        <a href="/register">회원가입</a>
    </div>
</form>
```

---

## 로그인 오류 상태

로그인 실패 시 오류 메시지를 `role="alert"`로 표시하고, 해당 입력 필드에 `aria-invalid="true"`를 적용한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="fw-bold fs-5 mb-3">로그인</div>
  <div class="form-error mb-3" role="alert">
    <p>아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.</p>
  </div>
  <div class="mb-3">
    <label for="preview-login-id-err" class="form-label">아이디</label>
    <input type="text" id="preview-login-id-err" name="username" class="form-control is-invalid" aria-invalid="true" required aria-required="true" autocomplete="username">
  </div>
  <div class="mb-3">
    <label for="preview-login-pw-err" class="form-label">비밀번호</label>
    <input type="password" id="preview-login-pw-err" name="password" class="form-control is-invalid" aria-invalid="true" required aria-required="true" autocomplete="current-password">
  </div>
  <button type="submit" class="btn btn-primary btn-block">로그인</button>
</form>
</div>

```html
<!-- 로그인 오류 상태 — role="alert"로 실패 알림, aria-invalid 쌍 처리 -->
<form action="/login" method="post">
    <h2>로그인</h2>

    <!-- 로그인 실패 메시지 — role="alert"가 스크린리더에 즉시 전달 -->
    <div id="login-error" class="form-error" role="alert">
        <p>아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.</p>
    </div>

    <div class="mb-3">
        <label for="login-id-err" class="form-label">아이디</label>
        <input type="text" id="login-id-err" name="username" class="form-control is-invalid" aria-invalid="true" aria-describedby="login-error" required aria-required="true" autocomplete="username">
    </div>

    <div class="mb-3">
        <label for="login-pw-err" class="form-label">비밀번호</label>
        <input type="password" id="login-pw-err" name="password" class="form-control is-invalid" aria-invalid="true" aria-describedby="login-error" required aria-required="true" autocomplete="current-password">
    </div>

    <button type="submit" class="btn btn-primary btn-block">로그인</button>
</form>
```

---

## 비밀번호 표시/숨기기 토글

비밀번호 입력 필드 옆에 표시/숨기기 토글 버튼을 제공한다. `aria-pressed`로 토글 상태를 전달한다:

<div class="docs-preview">
<form onsubmit="return false;">
  <div class="mb-3">
    <label for="preview-login-pw-toggle" class="form-label">비밀번호</label>
    <div class="input-group">
      <input type="password" id="preview-login-pw-toggle" name="password" class="form-control" required aria-required="true" autocomplete="current-password">
      <button type="button" class="btn btn-outline-secondary" aria-pressed="false" aria-label="비밀번호 표시">표시</button>
    </div>
  </div>
</form>
</div>

```html
<!-- 비밀번호 표시/숨기기 — aria-pressed로 토글 상태 전달 -->
<div class="mb-3 input-group">
    <label for="login-pw-toggle" class="form-label">비밀번호</label>
    <input type="password" id="login-pw-toggle" name="password" class="form-control" required aria-required="true" autocomplete="current-password">
    <button type="button" class="btn btn-outline" aria-pressed="false" aria-label="비밀번호 표시" onclick="togglePassword(this, 'login-pw-toggle')">
        <svg aria-hidden="true" class="icon"><use href="#icon-eye"></use></svg>
    </button>
</div>
```

### 토글 JS 스니펫

```javascript
// 비밀번호 표시/숨기기 토글
// aria-pressed 상태 전환, input type 변경, 버튼 레이블 업데이트
function togglePassword(button, inputId) {
    var $input = $('#' + inputId);
    var $btn = $(button);
    var isVisible = $input.attr('type') === 'text';

    $input.attr('type', isVisible ? 'password' : 'text');
    $btn.attr('aria-pressed', String(!isVisible));
    $btn.attr('aria-label', isVisible ? '비밀번호 표시' : '비밀번호 숨기기');
}
```

---

## 접근성 체크리스트

- [ ] 아이디 필드에 `autocomplete="username"` 적용
- [ ] 비밀번호 필드에 `autocomplete="current-password"` 적용
- [ ] 모든 입력 필드에 `<label>` 연결 (`for`/`id` 매칭)
- [ ] 필수 입력 항목에 `aria-required="true"` 적용
- [ ] 로그인 실패 메시지에 `role="alert"` 적용
- [ ] 오류 상태에 `is-invalid` + `aria-invalid="true"` 쌍 처리
- [ ] 오류 메시지가 `aria-describedby`로 입력 필드에 연결
- [ ] 비밀번호 규칙 힌트가 `aria-describedby`로 연결
- [ ] 비밀번호 토글 버튼에 `aria-pressed`와 `aria-label` 제공
- [ ] `placeholder`만으로 레이블을 대체하지 않음

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Text input (텍스트 입력 필드)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<label>` 연결 | 필수 — `for`/`id` 매칭 | ✅ |
| `aria-required` + `required` | 필수 — 필수 입력 표시 | ✅ |
| `aria-invalid` | 필수 — 오류 상태 전달 | ✅ |
| `aria-describedby` | 필수 — 힌트/오류 메시지 연결 | ✅ |
| `role="alert"` 오류 | 필수 — 즉시 알림 | ✅ |
| `autocomplete` | 필수 — 로그인 자동완성 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Text input <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 입력 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/autocomplete" target="_blank" rel="noopener" title="새 창으로 열림">MDN — autocomplete <span class="sr-only">(새 창)</span></a>
- `docs/accessibility/forms.md` — 폼 접근성 원칙 전체 가이드
- `docs/components/forms.md` — 폼 컴포넌트 기본 패턴
