---
layout: layouts/base.njk
title: 카드
tags: components
section: components
permalink: /components/card/
---

# 카드 컴포넌트 (COMP-04)

**KWCAG 2.1 기준:** 1.1.1 대체 텍스트, 1.3.1 정보와 관계, 2.4.6 제목 및 레이블
**적용 수준:** AA
**작성일:** 2026-03-26

> 카드 컴포넌트의 이미지 대체 텍스트 및 시맨틱 구조에 대한 원칙은
> `docs/accessibility/` 관련 문서를 참고한다. 이 문서는 실제 마크업 패턴을 제공한다.
> CSS 클래스는 `scss/6-components/_card.scss`와 일치시킨다.

**규칙: 카드 내 이미지에는 반드시 `alt` 속성이 있어야 한다. 의미 있는 이미지는 내용을 설명하고, 장식 이미지는 `alt=""`로 처리한다.**

---

## 기본 카드

가장 단순한 카드 구조다. `<h3>`를 사용하는 경우 페이지 전체 heading 계층(`h1` → `h2` → `h3`)이 맞는지 확인해야 한다. heading 계층이 깨지면 스크린리더 사용자가 페이지 구조를 파악하기 어렵다:

<div class="docs-preview">
  <div class="card">
    <div class="card-body">
      <div class="card-title fw-bold">카드 제목</div>
      <p class="card-text">카드 설명 텍스트입니다.</p>
    </div>
  </div>
</div>

```html
<!-- 기본 카드 — card-body 안에 제목과 본문 텍스트 배치 -->
<div class="card">
  <div class="card-body">
    <h3 class="card-title">카드 제목</h3>
    <p class="card-text">카드 설명 텍스트입니다.</p>
  </div>
</div>
```

---

## 이미지 카드

이미지의 `alt` 속성은 이미지가 전달하는 정보를 텍스트로 대체한다. 시각장애인은 `alt` 텍스트로 이미지를 "본다". `alt`를 빠뜨리면 스크린리더가 파일명을 그대로 읽어 의미 없는 소음이 된다:

```html
<!-- 이미지 카드 — alt 속성에 이미지 설명 필수 -->
<!-- 의미 있는 이미지: alt="이미지 내용 설명" -->
<!-- 장식 이미지(제목이 충분한 설명): alt="" -->
<div class="card">
  <img src="example.jpg" class="card-img-top" alt="프로젝트 미리보기 화면">
  <div class="card-body">
    <h3 class="card-title">프로젝트명</h3>
    <p class="card-text">프로젝트 설명입니다.</p>
  </div>
</div>

<!-- 장식 이미지 예시 — alt="" (스크린 리더가 건너뜀) -->
<div class="card">
  <img src="decorative.jpg" class="card-img-top" alt="">
  <div class="card-body">
    <h3 class="card-title">공지사항 제목</h3>
    <p class="card-text">공지사항 내용 요약입니다.</p>
  </div>
</div>
```

❌ 나쁜 예: alt 속성 없음 또는 파일명

```html
<img src="example.jpg" class="card-img-top">
<img src="example.jpg" class="card-img-top" alt="example.jpg">
```

스크린리더가 "이미지"라고만 읽거나, 파일명 "example.jpg"를 읽어버린다. KWCAG 1.1.1 대체 텍스트 기준 부적합 판정이다.

✅ 좋은 예: 이미지 내용을 설명하는 alt

```html
<img src="example.jpg" class="card-img-top" alt="프로젝트 미리보기 화면">
```

> **주의:** 이미지의 alt 속성은 맥락에 맞게 작성한다.
> 이미지가 카드 내용을 보충하는 경우 설명 텍스트를 작성하고,
> 카드 제목이 이미 충분한 설명을 제공하는 경우 `alt=""`로 처리한다.

---

## 링크 카드 (전체 클릭)

카드 전체를 `<a>`로 감싸면 스크린리더가 카드 안의 모든 텍스트를 링크 텍스트로 읽어버린다. "카드 제목, 설명 텍스트, 날짜, 카테고리" 전부를 하나의 링크로 읽는 것은 매우 불편하다. `stretched-link` 패턴을 사용하면 시각적으로는 전체 영역이 클릭되지만 스크린리더에는 제목 텍스트만 링크로 노출된다:

```html
<!-- 링크 카드 — article 태그 사용 (독립 콘텐츠 단위), 제목 내 a 태그 배치 -->
<!-- a 태그가 카드 전체를 감싸면 스크린 리더에서 모든 텍스트를 링크 텍스트로 읽음 — 주의 -->
<article class="card">
  <div class="card-body">
    <h3 class="card-title">
      <a href="/detail/1">카드 제목</a>
    </h3>
    <p class="card-text">설명 텍스트</p>
  </div>
</article>

<!-- 전체 영역 클릭 가능 카드 — CSS stretch link 패턴 활용 -->
<!-- ::after 가상 요소로 클릭 영역 확장 (스크린 리더에는 링크 텍스트만 노출) -->
<article class="card">
  <div class="card-body">
    <h3 class="card-title">
      <!-- stretched-link: Bootstrap 유틸리티 — 카드 전체를 클릭 영역으로 확장 -->
      <a href="/detail/2" class="stretched-link">카드 제목</a>
    </h3>
    <p class="card-text">설명 텍스트</p>
  </div>
</article>
```

❌ 나쁜 예: `<a>`로 카드 전체를 감싸는 방식

```html
<a href="/detail/1">
  <div class="card">
    <img src="thumb.jpg" alt="썸네일">
    <div class="card-body">
      <h3>카드 제목</h3>
      <p>설명 텍스트 입니다.</p>
    </div>
  </div>
</a>
```

스크린리더가 "썸네일 이미지, 카드 제목, 설명 텍스트 입니다. 링크"처럼 모든 내용을 하나의 링크 텍스트로 읽는다. 어디로 이동하는 링크인지 파악하기 어렵다.

✅ 좋은 예: 제목에만 링크, stretched-link로 클릭 영역 확장

```html
<article class="card">
  <img src="thumb.jpg" class="card-img-top" alt="">
  <div class="card-body">
    <h3 class="card-title"><a href="/detail/1" class="stretched-link">카드 제목</a></h3>
    <p class="card-text">설명 텍스트입니다.</p>
  </div>
</article>
```

> **주의:** `<a>` 태그가 카드 전체를 감싸지 않도록 한다.
> 전체 영역 클릭이 필요한 경우 Bootstrap `.stretched-link` 유틸리티를 활용한다.
> 스크린 리더에는 링크 텍스트(제목)만 노출되므로 제목 텍스트가 카드 목적을 설명해야 한다.

---

## 헤더/푸터 카드

카드 상단에 카테고리, 하단에 액션 버튼을 배치하는 구조다. `card-header`의 텍스트는 장식 목적이라도 스크린리더가 읽으므로 의미 있는 텍스트를 사용한다:

```html
<!-- 헤더/푸터 카드 — 카테고리 표시 + 액션 버튼 배치 -->
<div class="card">
  <div class="card-header">카테고리</div>
  <div class="card-body">
    <h3 class="card-title">제목</h3>
    <p class="card-text">내용</p>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-primary">자세히</button>
  </div>
</div>
```

---

## 수평 카드 (이미지 + 텍스트)

Bootstrap Grid를 사용하여 이미지와 텍스트를 좌우로 나란히 배치한다. `h-100`은 이미지를 카드 높이에 꽉 채우기 위한 유틸리티 클래스다:

```html
<!-- 수평 레이아웃 — Bootstrap Grid 활용, 이미지와 텍스트를 나란히 배치 -->
<div class="card">
  <div class="row g-0">
    <div class="col-4">
      <img src="example.jpg" class="card-img-top h-100" alt="항목 이미지 설명">
    </div>
    <div class="col-8">
      <div class="card-body">
        <h3 class="card-title">카드 제목</h3>
        <p class="card-text">카드 본문 내용입니다.</p>
      </div>
    </div>
  </div>
</div>
```

---

## 접근성 체크리스트

카드 마크업 검수 시 아래 항목을 확인한다.

- [ ] 이미지에 적절한 `alt` 속성 필수 — 의미 이미지: 설명 텍스트, 장식 이미지: `alt=""`
- [ ] 카드 제목에 적절한 heading 레벨 사용 (`h2`~`h4`, 페이지 구조에 맞게)
- [ ] 링크 카드에서 `<a>` 태그 텍스트가 카드 목적을 설명해야 함
- [ ] `<article>` 사용 시 카드가 독립적 콘텐츠 단위일 때만 사용
- [ ] `<a>` 태그가 카드 전체를 감싸지 않도록 처리 (스크린 리더 중복 읽기 방지)
- [ ] 전체 클릭 영역이 필요한 경우 Bootstrap `.stretched-link` 활용

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_card.scss` | 카드 컴포넌트 스타일 (Bootstrap 오버라이드) |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--shadow-sm`, `--color-border` 등) |

---

## 참고

- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.1.1 대체 텍스트 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.3.1 정보와 관계 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.6 제목 및 레이블 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/images/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Images Tutorial <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/article" target="_blank" rel="noopener" title="새 창으로 열림">MDN — article 요소 <span class="sr-only">(새 창)</span></a>
