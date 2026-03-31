---
layout: layouts/base.njk
title: 페이지네이션
tags: components
section: components
permalink: /components/pagination/
---

# 페이지네이션 컴포넌트 (COMP-08)

**KWCAG 2.1 기준:** 2.4.3 초점 순서, 4.1.2 이름, 역할, 값
**적용 수준:** AA
**작성일:** 2026-03-26

> 페이지네이션은 Bootstrap 기본 스타일을 유지한다 (D-10, 별도 SCSS 불필요).
> 마크업 패턴 및 접근성 속성 적용 방법을 이 문서에서 안내한다.

**규칙: 페이지네이션은 `<nav>` 태그로 감싸고, 현재 페이지에는 `aria-current="page"`를 반드시 적용한다.**

---

## 기본 페이지네이션

`<nav aria-label="페이지 탐색">`으로 감싸는 이유는 스크린리더 사용자가 랜드마크 탐색으로 페이지네이션을 빠르게 찾을 수 있게 하기 위해서다. 이전/다음 버튼의 `«`, `»` 기호는 스크린리더가 의미 없이 읽거나 아예 읽지 않으므로 `aria-label`로 명확한 설명을 제공해야 한다:

<div class="docs-preview">
<nav aria-label="페이지 탐색">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="이전 페이지" onclick="return false;">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="return false;">1</a></li>
    <li class="page-item active" aria-current="page">
      <span class="page-link">2</span>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="return false;">3</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="return false;">4</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="return false;">5</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="다음 페이지" onclick="return false;">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>

```html
<!-- 페이지네이션 — nav + aria-label 필수 -->
<nav aria-label="페이지 탐색">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="이전 페이지">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page">
      <span class="page-link">2</span>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="다음 페이지">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
```

현재 페이지(2페이지)를 `<span>`으로 처리하는 이유: 현재 보고 있는 페이지로 이동하는 링크는 무의미하다. `<a>` 대신 `<span>`을 사용해 클릭할 수 없음을 명확히 한다. `aria-current="page"`는 스크린리더가 "현재 페이지, 2"처럼 읽어주어 사용자가 위치를 파악할 수 있게 한다.

❌ 나쁜 예: aria-label 없는 이전/다음 버튼, aria-current 없는 현재 페이지

```html
<li class="page-item">
  <a class="page-link" href="#">&laquo;</a>
</li>
<li class="page-item active">
  <a class="page-link" href="#">2</a>
</li>
```

스크린리더가 "«" 버튼을 "왼쪽 꺾쇠 두 개" 또는 빈 링크로 읽는다. 현재 페이지도 다른 페이지 링크와 구분이 없어 내가 몇 페이지에 있는지 알 수 없다.

✅ 좋은 예: aria-label + aria-current + span 사용

```html
<li class="page-item">
  <a class="page-link" href="#" aria-label="이전 페이지">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li>
<li class="page-item active" aria-current="page">
  <span class="page-link">2</span>
</li>
```

---

## 비활성(disabled) 이전/다음 버튼

첫 번째 페이지에서는 "이전" 버튼을, 마지막 페이지에서는 "다음" 버튼을
비활성 처리한다. 비활성 상태에서는 `<a>` 대신 `<span>`을 사용하여
클릭 불가 상태를 명확히 한다. `<a href="#">`는 비활성처럼 보여도 키보드로 여전히 Tab 이동이 되고 클릭도 된다:

```html
<!-- 비활성 이전 버튼 — 첫 페이지에서 사용 -->
<li class="page-item disabled">
  <span class="page-link" aria-label="이전 페이지 (없음)">
    <span aria-hidden="true">&laquo;</span>
  </span>
</li>

<!-- 비활성 다음 버튼 — 마지막 페이지에서 사용 -->
<li class="page-item disabled">
  <span class="page-link" aria-label="다음 페이지 (없음)">
    <span aria-hidden="true">&raquo;</span>
  </span>
</li>
```

---

## 접근성 체크리스트

페이지네이션 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<nav>` 태그에 `aria-label="페이지 탐색"` 필수 (랜드마크 구분)
- [ ] 현재 페이지에 `aria-current="page"` 필수
- [ ] 현재 페이지는 `<a>` 대신 `<span>` 사용 (클릭 불가 명시)
- [ ] 이전/다음 버튼에 `aria-label` 필수 (`&laquo;`, `&raquo;` 기호만으로는 스크린 리더 불충분)
- [ ] `aria-hidden="true"`로 장식 기호(`&laquo;`, `&raquo;`) 숨김 처리
- [ ] `disabled` 상태에서 `<a>` 대신 `<span>` 사용

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Pagination (페이지네이션)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<nav aria-label>` | 필수 — 탐색 영역 식별 | ✅ |
| `aria-current="page"` | 필수 — 현재 페이지 | ✅ |
| 이전/다음 `aria-label` | 필수 — 기호만으로 불충분 | ✅ |
| `disabled` 상태 처리 | 권장 — `<span>`으로 대체 | ✅ |

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Pagination <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 페이지네이션 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.3 초점 순서 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 4.1.2 이름, 역할, 값 <span class="sr-only">(새 창)</span></a>
- <a href="https://getbootstrap.com/docs/5.3/components/pagination/" target="_blank" rel="noopener" title="새 창으로 열림">Bootstrap 5 — Pagination <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-current <span class="sr-only">(새 창)</span></a>
- <a href="https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-label" target="_blank" rel="noopener" title="새 창으로 열림">MDN — aria-label <span class="sr-only">(새 창)</span></a>
