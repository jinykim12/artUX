---
layout: layouts/base.njk
title: 푸터
tags: components
section: components
permalink: /components/footer/
---

# 푸터 (COMP-18)

**KWCAG 2.1 기준:** 1.3.1 정보와 관계, 2.4.1 블록 건너뛰기, 3.2.3 일관된 내비게이션
**적용 수준:** AA
**작성일:** 2026-03-31

> 푸터 컴포넌트는 페이지 하단에 배치되는 사이트 정보 영역이다.
> KWCAG 2.1 AA 접근성 기준(role="contentinfo", 구조화된 정보, 사이트맵 링크)을 준수한다.
> CSS 클래스명은 `scss/6-components/_footer.scss`와 일치시킨다.

**규칙: 푸터는 `<footer>` 태그(암묵적 role="contentinfo")를 사용하며, 사이트 정보, 저작권, 주요 링크를 구조화하여 제공해야 한다.**

---

## 기본 구조

푸터는 다음 순서로 구성된다:

```
<footer class="footer">
  ├── <div class="footer-nav"> — 사이트맵 링크
  │     └── <nav aria-label="푸터 메뉴">
  │           └── <ul> — 링크 목록
  ├── <div class="footer-info"> — 기관 정보
  │     ├── <address> — 연락처, 주소
  │     └── <p> — 저작권
  └── <div class="footer-identifier"> — 정부 식별자 (선택)
```

---

## 기본 HTML 마크업

푸터는 `<footer>` 태그를 사용한다. `<footer>`는 암묵적으로 `role="contentinfo"`를 가지므로 별도 role 속성은 불필요하다. 내비게이션 영역은 `<nav>`로 감싼다:

<div class="docs-preview">
<footer class="footer" style="background:#1a1a2e; color:#c9c9d4; padding:1.5rem 1.25rem; border-radius:0.375rem; font-size:0.875rem;">
  <div class="footer__inner">
    <nav aria-label="푸터 메뉴">
      <ul class="footer-nav" style="list-style:none; display:flex; flex-wrap:wrap; gap:1rem; margin:0 0 1rem; padding:0;">
        <li class="footer-nav-item"><a href="#preview-about" onclick="return false;" style="color:#e0e0e8;">기관 소개</a></li>
        <li class="footer-nav-item"><a href="#preview-sitemap" onclick="return false;" style="color:#e0e0e8;">사이트맵</a></li>
        <li class="footer-nav-item"><a href="#preview-privacy" onclick="return false;" style="color:#e0e0e8;">개인정보처리방침</a></li>
        <li class="footer-nav-item"><a href="#preview-terms" onclick="return false;" style="color:#e0e0e8;">이용약관</a></li>
        <li class="footer-nav-item"><a href="#preview-a11y" onclick="return false;" style="color:#e0e0e8;">웹 접근성 정책</a></li>
      </ul>
    </nav>
    <div class="footer-info">
      <div class="footer-logo" style="margin-bottom:0.5rem;">
        <span style="font-weight:700; color:#fff;">OO기관 로고</span>
      </div>
      <address class="footer-address" style="font-style:normal; margin-bottom:0.5rem;">
        (12345) 서울특별시 종로구 세종대로 00 OO기관<br>
        대표전화: <a href="tel:02-1234-5678" style="color:#e0e0e8;">02-1234-5678</a>
      </address>
      <p class="footer-copyright" style="margin:0 0 0.75rem; color:#8a8a9a;">Copyright &copy; 2026 OO기관. All rights reserved.</p>
    </div>
    <div class="footer-identifier">
      <p class="footer-identifier-text" style="margin:0; color:#8a8a9a;">이 사이트는 대한민국 정부 공식 웹사이트입니다.</p>
    </div>
  </div>
</footer>
</div>

```html
<!-- 푸터 -->
<footer class="footer">

    <!-- 사이트맵 링크 -->
    <nav aria-label="푸터 메뉴">
        <ul class="footer-nav">
            <li class="footer-nav-item"><a href="/about">기관 소개</a></li>
            <li class="footer-nav-item"><a href="/sitemap">사이트맵</a></li>
            <li class="footer-nav-item"><a href="/privacy">개인정보처리방침</a></li>
            <li class="footer-nav-item"><a href="/terms">이용약관</a></li>
            <li class="footer-nav-item"><a href="/a11y">웹 접근성 정책</a></li>
        </ul>
    </nav>

    <!-- 기관 정보 -->
    <div class="footer-info">
        <div class="footer-logo">
            <img src="/images/logo.svg" alt="OO기관 로고" width="120" height="40">
        </div>
        <address class="footer-address">
            (12345) 서울특별시 종로구 세종대로 00 OO기관<br>
            대표전화: <a href="tel:02-1234-5678">02-1234-5678</a>
        </address>
        <p class="footer-copyright">Copyright &copy; 2026 OO기관. All rights reserved.</p>
    </div>

    <!-- 정부 사이트 식별자 (공공기관 필수) -->
    <div class="footer-identifier">
        <p class="footer-identifier-text">이 사이트는 대한민국 정부 공식 웹사이트입니다.</p>
    </div>

</footer>
```

---

## 핵심 ARIA 속성

| 속성 | 값 | 역할 |
|------|----|------|
| `<footer>` | 암묵적 `role="contentinfo"` | 페이지 하단 정보 영역임을 보조 기기에 전달 |
| `aria-label="푸터 메뉴"` | — | 푸터 내비게이션을 다른 `<nav>`와 구분 |
| `<address>` | — | 연락처 정보임을 시맨틱하게 전달 |

- `<footer>` — `role="contentinfo"`를 암묵적으로 가진다. 스크린리더 사용자가 랜드마크 탐색으로 바로 이동할 수 있다.
- `aria-label="푸터 메뉴"` — 페이지에 GNB, 사이드, 푸터 등 여러 `<nav>`가 있을 때 각각을 구분하기 위해 필수이다.

---

## 접근성 체크리스트

푸터 마크업 검수 시 아래 항목을 확인한다.

- [ ] `<footer>` 태그 사용 (암묵적 `role="contentinfo"`)
- [ ] 푸터 내비게이션에 `<nav>` + `aria-label` 적용
- [ ] 개인정보처리방침 링크 포함 (공공기관 필수)
- [ ] 연락처에 `<address>` 태그 사용
- [ ] 전화번호에 `<a href="tel:">` 링크 적용
- [ ] 로고 이미지에 `alt` 텍스트 제공
- [ ] 링크 목록에 `<ul>` / `<li>` 구조 유지
- [ ] 저작권 정보 제공
- [ ] 포커스 인디케이터 동작 확인 (모든 링크)

---

## SCSS 파일 참조

| 파일 | 역할 |
|------|------|
| `scss/6-components/_footer.scss` | 푸터 컴포넌트 스타일, 레이아웃, 색상 |
| `scss/4-elements/_focus.scss` | 포커스 인디케이터 (전역 적용) |
| `scss/3-generic/_root.scss` | CSS 토큰 (`--color-footer-bg`, `--color-footer-text` 등) |

---

## KRDS v1.0.0 대응

이 컴포넌트는 KRDS v1.0.0 **Footer (푸터)** 및 **Identifier (식별자)** 컴포넌트에 대응한다.

| 항목 | KRDS 명세 | artpqUX 구현 |
|------|-----------|------------|
| `<footer>` 태그 | 필수 | ✅ |
| 사이트맵 링크 | 필수 — 주요 페이지 링크 | ✅ |
| 개인정보처리방침 | 필수 — 공공기관 법적 요구 | ✅ |
| 기관 연락처 | 필수 — 주소, 전화번호 | ✅ `<address>` |
| 저작권 표시 | 필수 | ✅ |
| 정부 식별자 | 필수 — 공공기관 사이트 표시 | ✅ `.footer-identifier` |
| 반응형 레이아웃 | 권장 — 모바일 세로 정렬 | ✅ CSS 처리 |

> **참고:** KRDS에서는 공공기관 웹사이트의 경우 Identifier(식별자) 영역을 푸터 최하단에 반드시 배치할 것을 요구한다.

---

## 참고

- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Footer <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 푸터 명세
- <a href="https://www.krds.go.kr" target="_blank" rel="noopener" title="새 창으로 열림">KRDS v1.0.0 — Identifier <span class="sr-only">(새 창)</span></a> — 범정부 디자인시스템 식별자 명세
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 1.3.1 정보와 관계 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 2.4.1 블록 건너뛰기 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.wah.or.kr/Accessibility/kwcag.asp" target="_blank" rel="noopener" title="새 창으로 열림">KWCAG 2.1 — 3.2.3 일관된 내비게이션 <span class="sr-only">(새 창)</span></a>
- <a href="https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html" target="_blank" rel="noopener" title="새 창으로 열림">W3C APG — Contentinfo Landmark <span class="sr-only">(새 창)</span></a>
