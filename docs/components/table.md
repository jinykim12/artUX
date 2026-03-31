---
layout: layouts/base.njk
title: 테이블
tags: components
section: components
permalink: /components/table/
---

# 테이블 컴포넌트 (COMP-05)

**KWCAG 2.1 기준:** 1.3.1 정보와 관계, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-26

> 테이블 접근성 원칙(caption, scope, id/headers 연결 등)은
> `docs/accessibility/` 가이드를 참고한다. 이 문서는 실제 마크업 패턴을 제공한다.
> CSS 클래스는 `scss/6-components/_table.scss`와 일치시킨다.

**규칙: 데이터 테이블에는 `<caption>`, `<th scope>` 가 필수다. 레이아웃 목적으로 `<table>`을 사용하면 안 된다.**

---

## 기본 테이블

`<caption>`은 테이블 제목 역할을 한다. 스크린리더 사용자가 테이블을 탐색하기 전에 "이 테이블이 무엇을 담고 있는지" 먼저 안내받는다. `<th scope="col">`은 열 헤더임을 명시하여 각 데이터 셀이 어떤 항목에 속하는지 스크린리더가 파악하도록 한다:

<div class="docs-preview">
  <table class="table">
    <caption>사용자 목록 (총 3명)</caption>
    <thead>
      <tr>
        <th scope="col">이름</th>
        <th scope="col">이메일</th>
        <th scope="col">가입일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>홍길동</td>
        <td>hong@example.com</td>
        <td>2026-01-15</td>
      </tr>
      <tr>
        <td>김철수</td>
        <td>kim@example.com</td>
        <td>2026-02-03</td>
      </tr>
      <tr>
        <td>이영희</td>
        <td>lee@example.com</td>
        <td>2026-03-10</td>
      </tr>
    </tbody>
  </table>
</div>

```html
<!-- 기본 데이터 테이블 — caption 필수, th에 scope 필수 -->
<table class="table">
  <caption>사용자 목록 (총 3명)</caption>
  <thead>
    <tr>
      <th scope="col">이름</th>
      <th scope="col">이메일</th>
      <th scope="col">가입일</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>홍길동</td>
      <td>hong@example.com</td>
      <td>2026-01-15</td>
    </tr>
    <tr>
      <td>김철수</td>
      <td>kim@example.com</td>
      <td>2026-02-03</td>
    </tr>
    <tr>
      <td>이영희</td>
      <td>lee@example.com</td>
      <td>2026-03-10</td>
    </tr>
  </tbody>
</table>
```

❌ 나쁜 예: caption 없음, scope 없음

```html
<table class="table">
  <thead>
    <tr>
      <th>이름</th>
      <th>이메일</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

스크린리더가 테이블을 탐색할 때 "이것이 무슨 테이블인지", 각 셀이 "어느 열에 속하는지" 알 수 없다. KWCAG 1.3.1 정보와 관계 기준 부적합 판정이다.

✅ 좋은 예: caption + scope 모두 적용

```html
<table class="table">
  <caption>사용자 목록 (총 3명)</caption>
  <thead>
    <tr>
      <th scope="col">이름</th>
      <th scope="col">이메일</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

---

## 행 헤더 테이블 (scope="row")

행 방향 헤더가 있는 테이블에서는 `<th scope="row">`를 사용한다.
스크린 리더가 각 행의 데이터를 읽을 때 행 헤더를 먼저 안내한다. 예를 들어 "1분기, 1,200만원, +15%"처럼 각 셀 앞에 행 레이블을 붙여서 읽어준다:

```html
<!-- 행 헤더 테이블 — 각 행의 첫 번째 열이 헤더인 경우 scope="row" 적용 -->
<table class="table">
  <caption>분기별 매출 현황</caption>
  <thead>
    <tr>
      <th scope="col">분기</th>
      <th scope="col">매출</th>
      <th scope="col">전년 대비</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1분기</th>
      <td>1,200만원</td>
      <td>+15%</td>
    </tr>
    <tr>
      <th scope="row">2분기</th>
      <td>1,450만원</td>
      <td>+20%</td>
    </tr>
    <tr>
      <th scope="row">3분기</th>
      <td>1,350만원</td>
      <td>+12%</td>
    </tr>
  </tbody>
</table>
```

---

## 반응형 테이블

모바일 화면에서 열이 많은 테이블은 `table-responsive` wrapper를 사용하여
수평 스크롤을 허용한다. `table-responsive` 없이 넘치는 테이블은 레이아웃을 깨뜨리고 가로 스크롤바 없이 내용이 잘린다:

```html
<!-- 반응형 테이블 — 모바일에서 수평 스크롤 -->
<div class="table-responsive">
  <table class="table">
    <caption>상세 데이터 테이블</caption>
    <thead>
      <tr>
        <th scope="col">번호</th>
        <th scope="col">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">작성일</th>
        <th scope="col">조회수</th>
        <th scope="col">첨부</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>공지사항 제목입니다</td>
        <td>관리자</td>
        <td>2026-03-01</td>
        <td>245</td>
        <td>없음</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 접근성 체크리스트

테이블 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<caption>` 필수 — 테이블 용도 설명 (스크린 리더 사전 안내)
- [ ] 열 헤더 `<th>`에 `scope="col"` 필수
- [ ] 행 헤더 `<th>`에 `scope="row"` 필수
- [ ] 복잡한 테이블(셀 병합 등)은 `id`/`headers` 속성 사용
- [ ] 레이아웃 용도로 `<table>` 사용 금지 (CSS Grid/Flexbox 사용) — 레이아웃 테이블을 스크린리더가 데이터 테이블로 오인해 읽으면 사용자 혼란이 생깁니다
- [ ] 반응형이 필요한 테이블은 `table-responsive` wrapper 사용

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_table.scss` | 테이블 컴포넌트 스타일 (Bootstrap 오버라이드) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-border`, `--spacing-md` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Table (표)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<caption>` | 필수 — 표 제목 | ✅ |
| `<thead>` / `<tbody>` | 필수 — 구조 구분 | ✅ |
| `scope="col"` / `scope="row"` | 필수 — 헤더 셀 방향 | ✅ |
| 반응형 스크롤 | 권장 — `overflow-x: auto` 래퍼 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Table <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 표 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.3.1 정보와 관계 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/tutorials/tables/" target="_blank" rel="noopener" title="새 창으로 열림">W3C WAI — Table Concepts <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/caption" target="_blank" rel="noopener">MDN — `<caption>`</a>
- <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/th#scope" target="_blank" rel="noopener" title="새 창으로 열림">MDN — scope 속성 <span class="sr-only">(새 창)</span></a>
