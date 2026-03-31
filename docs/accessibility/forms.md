---
layout: layouts/base.njk
title: 폼 접근성
tags: accessibility
section: accessibility
permalink: /accessibility/forms/
---

# 폼 접근성 가이드

**KWCAG 2.1 기준:** 3.4.1 레이블 제공, 3.4.2 오류 정정
**적용 수준:** AA
**작성일:** 2026-03-26

> **참고:** 이 문서는 마크업 패턴 가이드다. 폼 SCSS 컴포넌트(시각 스타일) 구현은 Phase 7에서 진행된다.

---

## 개요

폼은 사용자 입력이 발생하는 핵심 인터페이스이다. 스크린리더 사용자가 입력 필드의 목적을 파악하고, 오류 발생 시 원인과 수정 방법을 알 수 있도록 마크업을 작성해야 한다.

폼 접근성이 없으면 스크린리더 사용자는 "텍스트 편집" 이라는 말만 듣고 어떤 정보를 입력해야 할지 알 수 없으며, 오류가 발생해도 어디서 무엇이 잘못되었는지 파악하지 못한다. 공공기관 서비스에서 폼 접근성은 KWCAG 3.4.1, 3.4.2 필수 준수 항목이다.

---

## label-input 연결

모든 입력 필드에는 반드시 레이블이 연결되어야 한다.

**왜 레이블이 필요한가?** 스크린리더는 입력 필드에 포커스가 올라갈 때 연결된 레이블을 읽어준다. 레이블 없이 `placeholder`만 있는 경우, 일부 스크린리더는 플레이스홀더를 읽지 않거나 불안정하게 처리한다. 레이블은 입력 필드가 빌 때도, 내용이 채워진 후에도 항상 존재한다.

### 패턴 1: for/id 매칭 (기본 권장)

`<label>` 의 `for` 속성과 `<input>` 의 `id` 속성을 일치시킨다. 가장 명시적이고 스크린리더 호환성이 높은 방식이다.

아래 코드는 `for`와 `id`가 동일한 값으로 연결된 기본 패턴이다.

```html
<!-- 기본 label-input 연결 패턴 — for/id 값이 정확히 일치해야 연결됨 -->
<div class="form-group">
  <label for="user-name">이름</label>
  <input type="text" id="user-name" name="name">
</div>

<div class="form-group">
  <label for="user-email">이메일</label>
  <input type="email" id="user-email" name="email" autocomplete="email">
</div>
```

### 패턴 2: 감싸는 label (암묵적 연결)

`<label>` 태그로 입력 필드를 감싸는 방식이다. `for`/`id` 없이도 연결되지만, 일부 복잡한 레이아웃에서는 명시적 연결이 더 안전하다.

```html
<!-- label이 input을 감쌀 때는 for/id 없이도 자동 연결 -->
<label>
  이름
  <input type="text" name="name">
</label>
```

### 패턴 3: aria-labelledby (복수 참조)

이미 화면에 보이는 텍스트를 레이블로 활용할 때 사용한다. 여러 ID를 공백으로 나열해 복수의 텍스트를 조합할 수 있다.

아래 코드는 섹션 제목과 필드 레이블을 함께 스크린리더에 전달하는 방법이다. 스크린리더는 "배송 정보 주소 텍스트 편집"처럼 읽어준다.

```html
<h2 id="shipping-section">배송 정보</h2>
<div class="form-group">
  <!-- aria-labelledby로 섹션 제목 + 필드 레이블 동시 참조 -->
  <label id="addr-label" for="address">주소</label>
  <input type="text" id="address" name="address" aria-labelledby="shipping-section addr-label">
</div>
```

> **규칙: `placeholder`는 레이블을 대체할 수 없다. 플레이스홀더는 입력 시작과 함께 사라지므로 레이블로 사용해서는 안 된다. (자세한 내용은 [placeholder 주의](#placeholder-주의) 섹션 참고)**

---

## 필수 입력 (required)

필수 입력 항목임을 기계(스크린리더)와 사람(시각) 모두에게 알려야 한다.

**왜 두 가지 모두 필요한가?** `required` 속성만 있으면 일부 스크린리더에서 "필수"라고 읽지 않는다. 시각적 `*` 표시만 있으면 스크린리더 사용자에게 전달되지 않는다. 두 방법을 병행해야 모든 사용자가 필수 항목임을 인식할 수 있다.

### 세 가지 방법의 병행

아래 코드는 시각 표시(`*`), 스크린리더 텍스트(`sr-only`), HTML 유효성 검사(`required`)를 함께 적용하는 권장 패턴이다.

```html
<div class="form-group">
  <!-- 1. 시각적 표시: * 또는 "(필수)" 텍스트 -->
  <!-- 2. aria-required="true": 스크린 리더에 필수 항목 알림 -->
  <!-- 3. required 속성: 브라우저 기본 유효성 검사 활성화 -->

  <label for="full-name">
    이름
    <!-- aria-hidden으로 스크린 리더의 중복 읽기 방지 -->
    <span aria-hidden="true">*</span>
    <!-- 스크린 리더 전용 텍스트 — 화면에는 보이지 않고 읽기만 됨 -->
    <span class="sr-only">(필수)</span>
  </label>
  <input type="text" id="full-name" name="fullName" required aria-required="true">
</div>
```

### 페이지 상단 안내

필수 항목이 여러 개일 때는 폼 상단에 전체 안내 문구를 제공한다. 스크린리더 사용자가 폼을 읽기 시작할 때 `*` 기호의 의미를 미리 파악할 수 있다.

```html
<form>
  <p>
    <span aria-hidden="true">*</span>
    표시된 항목은 필수 입력 항목입니다.
  </p>
  <!-- 이하 폼 필드 -->
</form>
```

---

## 오류 메시지

오류 발생 시 스크린리더 사용자도 즉시 오류 내용을 파악하고 수정할 수 있어야 한다.

**왜 특별한 처리가 필요한가?** 스크린리더 사용자는 빨간 테두리, 아이콘 변화, 색상 변경을 인식하지 못한다. 오류 메시지가 텍스트로 제공되지 않으면 제출을 눌러도 아무 피드백 없이 폼이 반응하지 않는 것처럼 느껴진다.

**위반 시 영향:** KWCAG 3.4.2 위반. 공공기관 납품 심사에서 오류 메시지 미제공은 탈락 사유입니다.

### 기본 오류 메시지 패턴

아래 코드는 오류 메시지를 `aria-describedby`로 입력 필드에 연결하고, `role="alert"`로 스크린리더에 즉시 알리는 기본 패턴이다.

```html
<div class="form-group">
  <label for="email">이메일</label>
  <input type="email" id="email" name="email" aria-describedby="email-hint email-error" aria-invalid="true">
  <!-- 보조 힌트 (항상 표시) -->
  <p id="email-hint" class="form-hint">예: example@artux.co.kr</p>
  <!-- 오류 메시지 — role="alert"로 내용 변경 시 스크린리더에 즉시 알림 -->
  <p id="email-error" class="form-error" role="alert">
    올바른 이메일 주소를 입력해 주세요.
  </p>
</div>
```

### aria-invalid 상태 관리

`aria-invalid`는 입력 필드가 오류 상태임을 스크린리더에 알린다. 시각적 오류 표시(빨간 테두리 등)가 스크린리더에는 전달되지 않으므로, 이 속성으로 상태를 명시해야 한다.

```html
<!-- 정상 상태: aria-invalid="false" -->
<input type="email" id="email" aria-invalid="false">

<!-- 오류 상태: aria-invalid="true" + 오류 메시지를 aria-describedby로 연결 -->
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" role="alert" class="form-error">
  이메일 형식이 올바르지 않습니다.
</p>
```

### 여러 오류를 한 번에 표시 (요약 패턴)

폼 제출 후 여러 오류가 있을 때는 상단에 요약을 제공한다. 스크린리더 사용자가 오류 목록을 한눈에 파악하고 각 필드로 직접 이동할 수 있다.

아래 코드는 오류 요약을 상단에 표시하고, 각 오류 항목을 해당 필드로 연결하는 패턴이다. `aria-live="assertive"`로 요약이 즉시 읽힌다.

```html
<!-- 폼 제출 후 복수 오류를 상단에 요약 표시 — 각 항목은 해당 필드로 이동 가능한 링크 -->
<div role="alert" aria-live="assertive" id="error-summary">
  <h3>입력 오류가 있습니다. 확인 후 다시 시도해 주세요.</h3>
  <ul>
    <li><a href="#full-name">이름: 필수 입력 항목입니다.</a></li>
    <li><a href="#email">이메일: 올바른 형식으로 입력해 주세요.</a></li>
  </ul>
</div>
```

---

## fieldset / legend

라디오 버튼, 체크박스 그룹은 `<fieldset>` 과 `<legend>` 로 묶어야 한다. 스크린리더는 각 옵션을 읽을 때 legend를 함께 읽어 그룹 맥락을 전달한다.

**왜 fieldset/legend가 필요한가?** `<legend>` 없이 라디오 버튼 그룹이 있으면 스크린리더는 "남성 라디오 버튼"처럼 그룹 맥락 없이 읽는다. 이 옵션이 무엇을 선택하는 것인지(성별? 연령대?) 알 수 없다. `<legend>`를 추가하면 "성별, 남성 라디오 버튼"처럼 읽혀 맥락이 전달된다.

아래 코드는 라디오 버튼과 체크박스 그룹에 `fieldset`/`legend`를 적용하는 표준 패턴이다.

```html
<!-- 라디오 버튼 그룹 — legend가 그룹 이름 역할 -->
<fieldset>
  <legend>성별</legend>
  <label>
    <input type="radio" name="gender" value="male"> 남성
  </label>
  <label>
    <input type="radio" name="gender" value="female"> 여성
  </label>
  <label>
    <input type="radio" name="gender" value="other"> 기타
  </label>
</fieldset>

<!-- 체크박스 그룹 — legend로 무엇을 선택하는지 맥락 제공 -->
<fieldset>
  <legend>관심 분야 (복수 선택 가능)</legend>
  <label>
    <input type="checkbox" name="interest" value="design"> 디자인
  </label>
  <label>
    <input type="checkbox" name="interest" value="dev"> 개발
  </label>
  <label>
    <input type="checkbox" name="interest" value="publish"> 퍼블리싱
  </label>
</fieldset>
```

> **규칙: `<legend>` 는 스크린 리더에서 각 옵션 앞에 자동으로 읽힌다. 예: "성별, 남성 라디오 버튼". `<legend>` 가 없으면 그룹 맥락 없이 "남성 라디오 버튼" 으로만 읽혀 사용자가 어떤 항목을 선택하는지 알 수 없다.**

---

## placeholder 주의

`placeholder`는 입력 힌트 역할이며, 레이블을 대체할 수 없다.

**왜 placeholder만으로는 안 되는가:**
- 텍스트 입력 시 placeholder가 사라져 사용자가 어떤 정보를 입력하고 있었는지 잊는다
- 일부 스크린리더에서 placeholder를 레이블처럼 읽지 않거나 불안정하게 처리한다
- 기본 placeholder 텍스트 색상은 배경과의 대비율이 4.5:1 미달인 경우가 많다

**위반 시 영향:** KWCAG 3.4.1(레이블 제공) 위반. 스크린리더 사용자가 필드 목적을 알 수 없습니다.

❌ 이렇게 하면 안 된다: `placeholder`만으로 레이블 역할 — 입력을 시작하면 무엇을 입력해야 하는지 사라져 버린다.

✅ 이렇게 한다: `<label>`은 항상 존재하고, `placeholder`는 추가 힌트로만 사용한다.

```html
<!-- 나쁜 예: placeholder만 있고 label이 없음 — 레이블 미제공으로 KWCAG 3.4.1 위반 -->
<input type="text" name="name" placeholder="이름을 입력하세요">

<!-- 좋은 예: label은 항상 표시, placeholder는 보조 힌트 역할만 담당 -->
<div class="form-group">
  <label for="search-input">검색어</label>
  <input type="search" id="search-input" name="q" placeholder="예: 접근성 가이드" autocomplete="off">
</div>
```

---

## 자동완성(autocomplete)

개인 정보와 관련된 입력 필드에는 `autocomplete` 속성을 제공한다. 운동 장애나 인지 장애 사용자는 긴 개인 정보를 반복 입력하는 과정에서 오류가 자주 발생한다. `autocomplete`는 브라우저가 이전 입력값을 자동으로 채워주어 입력 부담을 크게 줄인다.

아래 코드는 개인 정보 입력 필드에서 자주 사용되는 `autocomplete` 값 목록이다.

```html
<!-- 자주 사용되는 autocomplete 값 — 브라우저 자동완성 지원으로 입력 부담 감소 -->
<input type="text"     name="name"     autocomplete="name">
<input type="email"    name="email"    autocomplete="email">
<input type="tel"      name="phone"    autocomplete="tel">
<input type="text"     name="address"  autocomplete="street-address">
<input type="password" name="password" autocomplete="current-password">
<input type="password" name="new-pass" autocomplete="new-password">
```

---

## 체크리스트

접근성 검수 시 아래 항목을 확인한다.

- [ ] 모든 입력 필드에 `<label>` 이 연결되어 있다 (`for`/`id` 매칭 또는 감싸기)
- [ ] `placeholder` 만으로 레이블을 대체하지 않는다
- [ ] 필수 입력 항목에 `required` + `aria-required="true"` + 시각적 표시(*) 가 모두 적용되어 있다
- [ ] 오류 메시지가 `aria-describedby` 로 해당 입력 필드에 연결되어 있다
- [ ] 오류 발생 시 `aria-invalid="true"` 가 설정된다
- [ ] 라디오/체크박스 그룹은 `<fieldset>` + `<legend>` 로 묶여 있다
- [ ] 개인 정보 입력 필드에 `autocomplete` 속성이 적용되어 있다

---

## 참고

- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.1 레이블 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.4.2 오류 정정 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Form Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-describedby" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-describedby <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-invalid" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-invalid <span class="sr-only">(새 창)</span></a>
