---
layout: layouts/base.njk
title: 색상 대비
tags: accessibility
section: accessibility
permalink: /accessibility/color-contrast/
---

# 색상 대비 기준 가이드

**KWCAG 2.1 기준:** 1.3.3 텍스트 콘텐츠의 명도 대비
**관련 기준:** 1.3.1 색에 무관한 인식 (색만으로 정보 전달 금지)
**적용 수준:** AA
**작성일:** 2026-03-26

---

## 개요

충분한 색상 대비는 저시력 사용자, 밝은 야외 환경 사용자, 흑백 프린트 사용자 등 다양한 상황의 사용자가 텍스트를 읽을 수 있도록 보장한다. 대비율이 낮은 텍스트는 시력이 좋은 사람도 햇빛 아래 스마트폰 화면에서 읽기 어렵다. KWCAG 2.1 AA 수준 준수를 위해 아래 기준값을 반드시 충족해야 한다.

> **규칙: 텍스트와 배경의 명도 대비는 4.5:1 이상이어야 한다. 이 기준을 지키지 않으면 저시력 사용자나 밝은 햇빛 아래에서 화면을 보는 사용자가 글자를 읽기 어렵다. 공공기관 납품 시 이 항목은 KWCAG 1.3.3 필수 검사 대상이다.**

---

## 기준값

### 텍스트 명도 대비 (KWCAG 1.3.3)

| 텍스트 유형 | 최소 대비율 | 비고 |
|-------------|------------|------|
| 일반 텍스트 | **4.5:1** | 18pt(24px) 미만, 14pt Bold(18.66px) 미만 |
| 대형 텍스트 | **3:1** | 18pt(24px) 이상 또는 14pt Bold(18.66px) 이상 |
| 비활성(disabled) 텍스트 | 제외 | 비활성 상태는 기준 적용 제외 |
| 로고/상표 텍스트 | 제외 | 브랜드 로고에 포함된 텍스트는 적용 제외 |

### UI 컴포넌트 / 그래픽 요소 (KWCAG 1.3.3 준용)

| 요소 | 최소 대비율 |
|------|------------|
| 버튼 테두리, 입력 필드 테두리 | **3:1** (배경 대비) |
| 아이콘, 차트 데이터 색상 | **3:1** (배경 대비) |
| 포커스 인디케이터(outline) | **3:1** (주변 색상 대비) |

**왜 UI 컴포넌트에도 대비 기준이 적용되나?** 버튼 테두리나 입력 필드 경계가 배경과 구분되지 않으면 저시력 사용자는 클릭 가능한 요소가 어디에 있는지 파악할 수 없다.

---

## 대형 텍스트 기준 상세

대형 텍스트(Large Text)는 글자 크기가 크므로 읽기 쉬워 3:1의 완화된 기준이 적용된다.

| 조건 | CSS 기준 |
|------|----------|
| Regular 18pt 이상 | `font-size: 24px` 이상 |
| Bold 14pt 이상 | `font-size: 18.66px` 이상 + `font-weight: 700` (또는 Bold) |

아래 코드는 대형 텍스트(3:1 기준)와 일반 텍스트(4.5:1 기준)가 각각 어떤 크기에 해당하는지 보여준다.

```css
/* 대형 텍스트 예시 — 3:1 대비율 기준 적용 */
h1 { font-size: 2rem; }      /* 32px — 대형 텍스트 */
h2 { font-size: 1.5rem; }    /* 24px — 대형 텍스트 경계 */
h3 { font-size: 1.25rem; }   /* 20px — 대형 텍스트 */

/* 소형 텍스트 예시 — 4.5:1 대비율 기준 적용 */
p  { font-size: 1rem; }      /* 16px — 일반 텍스트 */
small { font-size: 0.875rem; } /* 14px — 일반 텍스트 */
```

---

## 좋은 예 / 나쁜 예 대비

### 텍스트 대비

❌ 이렇게 하면 안 됩니다: 회색 배경(#f0f0f0)에 연한 회색 텍스트(#aaaaaa) — 대비율 약 2.3:1 (기준 미달)

```css
/* 나쁜 예: 대비율 약 2.3:1 — 저시력 사용자 판독 불가 */
body {
  background-color: #f0f0f0;
  color: #aaaaaa;
}
```

✅ 이렇게 한다: 흰 배경(#ffffff)에 짙은 회색 텍스트(#333333) — 대비율 약 12.6:1 (기준 충족)

```css
/* 좋은 예: 대비율 약 12.6:1 — 어떤 환경에서도 선명하게 읽힘 */
body {
  background-color: #ffffff;
  color: #333333;
}
```

### 버튼 대비

❌ 이렇게 하면 안 됩니다: 흰 배경에 연한 노란 버튼(`#ffe066`) — 버튼 경계가 배경과 구분되지 않아 클릭 가능한 요소임을 인식하기 어렵습니다.

✅ 이렇게 한다: 버튼 테두리나 버튼 자체가 배경과 3:1 이상 대비를 유지한다.

---

## 검사 도구

### WebAIM Contrast Checker

- URL: <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener" title="새 창으로 열림">https://webaim.org/resources/contrastchecker/ <span class="sr-only">(새 창)</span></a>
- 전경색(Foreground)과 배경색(Background) HEX 값 입력 → 대비율 즉시 확인
- WCAG AA / AAA 통과 여부를 색상별로 표시
- 추천 색상 값 조정 슬라이더 기능 제공

### Chrome DevTools 색상 대비 확인

1. F12 → Elements 탭 → 텍스트 요소 선택
2. Styles 패널에서 `color` 속성의 색상 박스 클릭
3. Color Picker 하단에 **Contrast ratio** 수치 표시
4. AA 통과 시 체크 아이콘, 미통과 시 경고 표시

### Colour Contrast Analyser (데스크탑 앱)

- 화면 스포이트로 직접 색상 추출 — 이미지, 렌더링 결과에 직접 사용 가능
- URL: <a href="https://www.tpgi.com/color-contrast-checker/" target="_blank" rel="noopener" title="새 창으로 열림">https://www.tpgi.com/color-contrast-checker/ <span class="sr-only">(새 창)</span></a>

---

## artpqUX 디자인 토큰 대비 확인 안내

artpqUX 팀은 `scss/3-generic/_root.scss`에 정의된 CSS Custom Properties를 사용한다. 토큰 이름만 보고 대비율이 충족된다고 가정하지 않는다 — 실제 배경색과 조합한 결과를 반드시 검사해야 한다.

아래 코드는 팀 토큰 사용 시 어떤 색상 조합을 검사해야 하는지 보여준다.

```css
/* 팀 토큰 사용 시 반드시 배경색과 함께 대비 검사 */
color: var(--bs-body-color);        /* 본문 텍스트 — 배경과 4.5:1 이상 확인 */
color: var(--bs-primary);     /* 강조/링크 색상 — 사용 배경과 대비 확인 */
color: var(--bs-secondary);   /* 보조 색상 — 소형 텍스트에 4.5:1 확인 */
```

> **규칙: 색상 토큰을 수정하면 전체 프로젝트 대비율에 영향이 생긴다. 토큰 변경 시 WebAIM Contrast Checker로 주요 색상 조합을 반드시 재검사한다.**

---

## 색만으로 정보 전달 금지 (KWCAG 1.3.1)

색상만으로 정보를 구분하면 색각이상자(색맹 사용자)가 내용을 파악할 수 없다. 적록색맹의 경우 빨강과 초록을 동일하게 인식하므로, 빨간 테두리만으로 오류를 표시하면 오류 여부를 전혀 알 수 없다. 반드시 색상 외 추가 수단(아이콘, 텍스트, 패턴 등)을 병행해야 한다.

**위반 시 영향:** KWCAG 1.3.1 위반, 공공기관 납품 접근성 심사 탈락 사유.

### 오류 상태 표시 — 올바른 패턴

❌ 이렇게 하면 안 됩니다: 빨간 테두리만으로 오류 상태를 표시 — 색각이상자는 오류 발생 여부를 알 수 없습니다.

```html
<!-- 나쁜 예: 빨간 색상만으로 오류 표시 — 색각이상자에게 보이지 않음 -->
<input type="email" class="input-error" style="border-color: red;">
```

✅ 이렇게 한다: 색상 + 아이콘 + 텍스트를 함께 제공한다.

아래 코드는 색상, 아이콘, 텍스트 세 가지 방식을 모두 사용해 오류를 표시하는 권장 패턴이다.

```html
<!-- 좋은 예: 색상 + 아이콘 + 텍스트 병행 — 어떤 사용자도 오류 상태 인식 가능 -->
<div class="form-group">
  <label for="email">이메일</label>
  <input
    type="email"
    id="email"
    class="is-invalid"
    aria-describedby="email-error"
    aria-invalid="true"
  >
  <!-- 색상 + 아이콘(!) + 텍스트 세 가지를 함께 제공 -->
  <p id="email-error" class="error-message" role="alert">
    <!-- 아이콘은 aria-hidden으로 처리, 텍스트가 정보 전달 -->
    <span aria-hidden="true">!</span>
    올바른 이메일 주소를 입력해 주세요.
  </p>
</div>
```

### 링크 구분

❌ 이렇게 하면 안 됩니다: 링크를 색상만으로 본문 텍스트와 구분 — 색각이상자는 어디가 링크인지 알 수 없습니다.

```html
<!-- 나쁜 예: 색상만으로 링크를 본문 텍스트와 구분 -->
<p>자세한 내용은 <a href="/guide" style="color: blue;">가이드 페이지</a>를 참고하세요.</p>
```

✅ 이렇게 한다: 색상 + 밑줄을 함께 사용한다.

```html
<!-- 좋은 예: 색상 + 밑줄로 구분 — 색각이상자도 링크 위치를 파악 가능 -->
<p>자세한 내용은 <a href="/guide" style="color: blue; text-decoration: underline;">가이드 페이지</a>를 참고하세요.</p>
```

---

## 체크리스트

접근성 검수 시 아래 항목을 확인한다.

- [ ] 일반 텍스트(24px 미만)의 전경색과 배경색 대비율이 4.5:1 이상이다
- [ ] 대형 텍스트(24px 이상, 또는 18.66px 이상 Bold)의 대비율이 3:1 이상이다
- [ ] 버튼 테두리, 입력 필드 테두리의 대비율이 3:1 이상이다 (배경 대비)
- [ ] 정보를 전달하는 아이콘, 그래픽 요소의 대비율이 3:1 이상이다
- [ ] 오류, 성공, 경고 등 상태 표시에 색상 외 아이콘 또는 텍스트가 병행된다
- [ ] 링크 텍스트는 색상 외 밑줄 또는 시각적 구분 수단이 있다
- [ ] artpqUX 토큰 색상 변경 시 WebAIM Checker로 주요 조합을 재검사했다

---

## 참고

- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.3.3 텍스트 콘텐츠의 명도 대비 <span class="sr-only">(새 창)</span></a>
- <a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener" title="새 창으로 열림">WebAIM Contrast Checker <span class="sr-only">(새 창)</span></a>
- <a href="https://www.tpgi.com/color-contrast-checker/" target="_blank" rel="noopener" title="새 창으로 열림">TPGI Colour Contrast Analyser <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank" rel="noopener" title="새 창으로 열림">W3C Understanding WCAG 2.1 — 1.4.3 Contrast (Minimum) <span class="sr-only">(새 창)</span></a>
