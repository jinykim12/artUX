---
layout: layouts/base.njk
title: 이미지 접근성
tags: accessibility
section: accessibility
permalink: /accessibility/images/
---

# 이미지 대체텍스트 가이드

**KWCAG 2.1 기준:** 1.1.1 적절한 대체 텍스트 제공
**적용 수준:** AA
**작성일:** 2026-03-26

---

## 개요

모든 의미 있는 이미지에는 동등한 대체 텍스트를 제공해야 한다. 스크린리더 사용자는 이미지를 "볼" 수 없고 `alt` 텍스트로 내용을 "읽는다". `alt` 텍스트가 없으면 이미지에 담긴 정보는 스크린리더 사용자에게 완전히 차단된다.

또한 이미지 로딩 실패 상황(느린 인터넷, 이미지 서버 오류)에서 `alt` 텍스트가 대신 표시되어 콘텐츠 이해를 돕는다. 공공기관 납품 시 KWCAG 1.1.1 항목은 필수 통과 기준이다.

> **규칙: 모든 `<img>` 태그에는 반드시 `alt` 속성이 있어야 한다. 의미 이미지는 내용을 설명하는 텍스트를, 장식 이미지는 빈 값(`alt=""`)을 사용한다. `alt` 속성 자체를 생략하면 스크린리더가 파일명을 읽어 사용자를 혼란시킨다.**

---

## 장식 이미지

콘텐츠 전달에 기여하지 않는 순수 장식 목적의 이미지에는 빈 alt 값(`alt=""`)을 사용한다. 스크린리더가 이미지를 무시하도록 지시한다.

**왜 `alt=""`가 필요한가?** `alt` 속성을 아예 생략하면 스크린리더가 파일명(`decorative-divider.png`, `img_20240101_001.jpg` 등)을 읽어버린다. 이는 사용자에게 전혀 의미 없는 소음이 되며 탐색 흐름을 방해한다. `alt=""`는 "이 이미지는 장식입니다, 무시하세요"라는 명확한 지시이다.

**해당하는 경우:**
- 배경 분위기용 이미지
- 텍스트 옆 장식 아이콘 (내용과 무관)
- 단순 구분선, 테두리 이미지
- 이미 인근 텍스트가 충분히 설명하는 이미지

❌ 이렇게 하면 안 된다: `alt` 속성 생략 — 스크린리더가 파일명을 읽어 "decorative-divider.png 이미지" 처럼 읽는다.

✅ 이렇게 한다: 장식 이미지에는 반드시 `alt=""`를 명시한다.

아래 코드는 장식 이미지의 올바른 패턴이다.

```html
<!-- 장식 이미지 — alt="" 필수, alt 속성 생략은 오류 -->
<img src="decorative-divider.png" alt="">

<!-- 텍스트 옆 장식 아이콘 — 텍스트가 의미를 전달하므로 아이콘은 장식으로 처리 -->
<img src="icon-bullet.svg" alt="">
<span>공지사항 목록</span>

<!-- 배경 역할의 이미지 — 콘텐츠 전달에 기여하지 않으므로 빈 alt -->
<img src="hero-bg.jpg" alt="">
```

---

## 의미 이미지

정보를 전달하는 이미지에는 그 내용을 충분히 설명하는 대체 텍스트를 작성한다.

**원칙:**
- 이미지를 보지 못하는 사람이 동등한 정보를 얻을 수 있어야 한다
- 파일명, 치수, 기술 용어는 사용하지 않는다
- 이미지의 목적(무엇을 전달하는가)을 기준으로 작성한다
- 마침표 없이 간결하게 작성한다

**위반 시 영향:** 의미 이미지에 alt가 없으면 KWCAG 1.1.1 위반. 공공기관 납품 심사에서 가장 자주 지적되는 항목 중 하나입니다.

❌ 이렇게 하면 안 된다: 파일명을 그대로 alt로 쓰거나, "이미지"처럼 무의미한 설명을 작성하면 스크린리더 사용자가 이미지에서 어떤 정보도 얻지 못한다.

✅ 이렇게 한다: 이미지가 전달하는 내용을 간결하게 설명한다.

아래 코드는 좋은 alt 텍스트와 나쁜 alt 텍스트를 비교한 예시이다.

```html
<!-- 좋은 예: 이미지가 전달하는 구체적인 내용을 설명 -->
<img src="ceo-photo.jpg" alt="김철수 대표이사">
<img src="chart-sales.png" alt="2025년 4분기 매출 전년 대비 23% 증가">
<img src="warning-icon.svg" alt="경고">

<!-- 나쁜 예: 파일명, 무의미한 설명, 과도한 묘사 — 스크린리더 사용자에게 혼란 또는 무정보 -->
<img src="ceo-photo.jpg" alt="ceo-photo.jpg">   <!-- 파일명 그대로 사용 ❌ -->
<img src="chart-sales.png" alt="이미지">         <!-- "이미지"는 아무 정보도 없음 ❌ -->
<img src="warning-icon.svg" alt="빨간 삼각형 경고 아이콘 이미지">  <!-- 형태 묘사 불필요 ❌ -->
```

**링크 내 이미지:**
링크 안에 이미지만 있을 때는 이미지 자체 설명이 아닌 링크의 목적(어디로 이동하는가)을 alt로 제공한다. 스크린리더는 링크를 클릭할 때 alt 텍스트를 읽으므로, 목적지를 알려주는 것이 중요하다.

```html
<!-- 링크 내 이미지 — 이미지 설명이 아닌 링크 목적을 alt로 제공 -->
<a href="/">
  <img src="logo.svg" alt="아트피큐 홈으로 이동">
</a>
```

---

## 복잡한 이미지

차트, 그래프, 다이어그램, 지도 등 복잡한 정보를 담은 이미지는 짧은 alt 값만으로는 설명이 부족하다. 스크린리더 사용자가 차트에서 얻을 수 있는 인사이트(예: 추이, 비율, 최고값)를 텍스트로 동등하게 제공해야 한다.

### 패턴 1: `aria-describedby`로 긴 설명 연결

아래 코드는 `aria-describedby`로 `<figcaption>` 내의 상세 설명을 이미지에 연결하는 패턴이다. 스크린리더는 이미지를 읽은 뒤 figcaption 내용도 읽어준다.

```html
<!-- alt는 제목 역할, aria-describedby로 상세 데이터 설명 연결 -->
<figure>
  <img src="monthly-sales-chart.png" alt="월별 매출 추이 차트" aria-describedby="chart-desc">
  <figcaption id="chart-desc">
    2025년 1월부터 12월까지 월별 매출 추이. 상반기는 꾸준한 증가세를 보이다가
    7월에 정점(12억 원)을 찍고, 하반기는 소폭 감소하여 12월 9억 원으로 마감.
    전체 연간 성장률은 18%.
  </figcaption>
</figure>
```

### 패턴 2: 본문 내 데이터 테이블로 제공

차트의 원본 데이터를 표로 제공하면 스크린리더 사용자도 시각 사용자와 동등한 수준으로 데이터를 탐색할 수 있다.

아래 코드는 파이 차트 아래에 동일한 데이터를 표로 제공하는 패턴이다.

```html
<!-- alt는 간략 설명, 상세 데이터는 아래 표로 제공 — 스크린리더 사용자도 데이터 탐색 가능 -->
<img src="pie-chart.png" alt="부서별 예산 비율 — 아래 표 참고">
<table>
  <caption>부서별 예산 비율 (2025년)</caption>
  <thead>
    <tr><th scope="col">부서</th><th scope="col">예산 비율</th></tr>
  </thead>
  <tbody>
    <tr><td>개발</td><td>40%</td></tr>
    <tr><td>마케팅</td><td>30%</td></tr>
    <tr><td>운영</td><td>30%</td></tr>
  </tbody>
</table>
```

---

## CSS 배경 이미지

CSS `background-image`로 적용된 이미지는 스크린리더가 인식하지 못한다. 순수 장식이라면 문제없지만, 의미 있는 정보를 전달하는 배경 이미지에는 대체 수단이 필요하다.

**왜 CSS 배경 이미지는 스크린리더가 못 읽나?** CSS는 문서의 시각적 표현을 담당하고, 스크린리더는 HTML DOM을 읽는다. `background-image`는 CSS에만 존재하고 DOM에는 없으므로 보조 기술이 접근하지 못한다.

아래 코드는 의미 있는 배경 이미지에 `role="img"`와 `aria-label`을 추가하는 패턴이다.

```html
<!-- 의미 있는 배경 이미지: role="img" + aria-label로 스크린리더에 내용 전달 -->
<div class="hero-banner" role="img" aria-label="봄 신상품 컬렉션 — 화사한 플라워 패턴의 의류 사진" style="background-image: url('hero-spring.jpg');">
  <!-- 시각적 텍스트 콘텐츠 -->
  <h2>2025 봄 신상품</h2>
</div>

<!-- 순수 장식 배경 이미지: 별도 처리 불필요 — 스크린리더가 무시함 -->
<div class="section-divider" style="background-image: url('wave-pattern.svg');"></div>
```

---

## 체크리스트

접근성 검수 시 아래 항목을 확인한다.

- [ ] 모든 `<img>` 태그에 `alt` 속성이 명시되어 있다 (생략 없음)
- [ ] 장식 이미지에는 `alt=""`가 사용되었다
- [ ] 의미 이미지의 alt 텍스트는 내용(무엇을 전달하는가)을 기준으로 작성되었다
- [ ] 링크 내 이미지의 alt는 링크 목적을 설명한다
- [ ] 복잡한 이미지(차트, 그래프)에는 `aria-describedby` 또는 본문 텍스트로 상세 설명이 제공된다
- [ ] 의미 있는 CSS 배경 이미지에는 `role="img"` + `aria-label`이 적용되었다
- [ ] alt 텍스트에 "이미지", "사진", "아이콘" 등 불필요한 단어가 포함되지 않았다

---

## 참고

- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.1.1 적절한 대체 텍스트 제공 <span class="sr-only">(새 창)</span></a>
- <a href="https://webaim.org/techniques/alttext/" target="_blank" rel="noopener" title="새 창으로 열림">WebAIM: Alternative Text <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/images/decision-tree/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — An alt Decision Tree <span class="sr-only">(새 창)</span></a>
