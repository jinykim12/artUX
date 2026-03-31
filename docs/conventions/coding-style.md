---
layout: layouts/base.njk
title: 코딩 스타일
tags: conventions
section: conventions
permalink: /conventions/coding-style/
---

# 코딩 스타일

아트피큐 팀의 HTML/CSS/SCSS 코딩 스타일 기준. `.editorconfig` 실제 설정값 기반으로 정의한다.

> **왜 코딩 스타일을 통일하는가?**
> 들여쓰기가 어떤 파일은 탭, 어떤 파일은 스페이스 4칸이면 `git diff`에 스타일 변경이 섞여 실제 로직 변경을 찾기 어려워진다. `.editorconfig`로 에디터 설정을 강제하면 어떤 팀원이 파일을 열어도 동일한 스타일로 저장된다.

---

## 1. .editorconfig 기반 설정

프로젝트 루트 `.editorconfig` 파일을 항상 유지하며, 모든 에디터 설정의 근거는 이 파일이다.

아래 코드는 팀 표준 `.editorconfig` 전체 내용이다. 새 프로젝트에 그대로 복사한다.

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 4
trim_trailing_whitespace = true
insert_final_newline = true

[*.{scss,css}]
indent_size = 4

[*.md]
trim_trailing_whitespace = false
```

### 각 항목 설명

| 항목 | 값 | 이유 |
|------|----|------|
| `charset` | `utf-8` | 모든 파일 UTF-8 인코딩 — 한국어 포함 다국어 처리 표준 |
| `end_of_line` | `lf` | 줄바꿈 LF 통일 — Windows CRLF는 Git diff 노이즈 발생 |
| `indent_style` | `space` | 탭 문자 금지 — 에디터마다 탭 너비(2, 4, 8칸) 달라져 코드가 달라 보임 |
| `indent_size` | `4` | 들여쓰기 단위 4칸 — 코드 구조가 한눈에 보이고 중첩 깊이를 시각적으로 파악하기 쉬움 |
| `trim_trailing_whitespace` | `true` | 행 끝 불필요한 공백 자동 제거 — 의미 없는 변경이 commit에 포함되는 것 방지 |
| `insert_final_newline` | `true` | 파일 끝 빈 줄 1개 유지 — Unix 표준, `git diff`에서 "No newline at end of file" 경고 제거 |

### `*.md` 예외 처리

마크다운(`.md`) 파일은 `trim_trailing_whitespace = false`로 예외 처리한다. 마크다운에서 줄 끝 스페이스 2개는 `<br>` 줄바꿈을 의미하므로, 자동 제거하면 의도치 않게 줄바꿈이 사라진다.

---

## 2. 들여쓰기 규칙

4 spaces 고정, 탭 문자(`\t`) 사용 금지다.

탭 너비는 에디터마다 다르게 표시된다. VS Code는 기본 4칸, 터미널은 8칸, 일부 에디터는 2칸으로 표시한다. 탭으로 들여쓴 코드는 보는 환경마다 정렬이 달라 보인다. 스페이스는 어디서 보든 동일한 너비를 유지한다.

❌ 나쁜 예: 탭 문자 — 에디터마다 정렬이 다르게 보인다
```html
<ul>
	<li>
		<a href="#">링크</a>
	</li>
</ul>
```

✅ 좋은 예: 4 spaces — 어느 에디터에서도 동일하게 보인다
```html
<ul>
    <li>
        <a href="#">링크</a>
    </li>
</ul>
```

아래 코드는 SCSS에서 4 spaces 들여쓰기를 적용한 예시다.

```scss
/* SCSS 4 spaces 들여쓰기 */
.component {
    display: flex;
    align-items: center;

    &__title {
        font-size: var(--font-size-lg);
    }
}
```

> **규칙: 모든 파일(HTML, SCSS, CSS, JS)의 들여쓰기는 스페이스 4칸을 사용한다. 탭 문자와 2 spaces는 금지이다.**

---

## 3. 한국어 주석 규칙

팀 내부 문서이므로 모든 주석은 한국어로 작성한다. 영문 주석은 외국 라이브러리 코드를 인용할 때만 허용하며, 팀이 직접 작성하는 주석은 한국어를 사용한다.

### 기본 원칙

아래 코드는 HTML과 SCSS에서 한국어 주석을 올바르게 작성한 예시다.

```html
<!-- 헤더 영역 시작 -->
<header role="banner">
  <!-- GNB 내비게이션 -->
  <nav aria-label="주요 메뉴">
  </nav>
</header>
<!-- 헤더 영역 끝 -->
```

```scss
/* === 버튼 공통 === */
.btn-custom {
  /* 포커스 스타일 — 키보드 사용자 접근성 필수 */
  &:focus-visible {
    outline: 2px solid var(--color-primary);
  }
}
```

### 접두사 규칙

특수 목적의 주석은 접두사를 붙여 IDE 검색이나 납품 전 일괄 처리를 쉽게 한다.

| 접두사 | 용도 | 납품 전 처리 |
|--------|------|------------|
| `// TODO:` | 추후 작업 필요 — 담당자 명시 권장 | 유지 가능 (이슈 추적용) |
| `// FIXME:` | 알려진 버그/문제 — 증상 설명 함께 작성 | 가능하면 납품 전 해결 |
| `// TEMP:` | 임시 코드 — 이유 함께 작성 | **반드시 제거** |
| `// DEBUG:` | 디버그용 코드 — 테두리, 배경색 시각화 등 | **반드시 제거** |

아래 코드는 각 접두사를 실전에서 사용하는 예시다.

```scss
// TODO: 모바일 대응 추가 — 담당자: 홍길동, 2025년 2분기 예정
.hero__banner { padding: var(--spacing-2xl); }

// FIXME: IE11에서 flex-gap이 지원되지 않아 레이아웃 깨짐 — 확인 필요
.card__grid { gap: var(--spacing-md); }

// TEMP: 디자인 확정 전 임시값 — 납품 전 반드시 삭제
.hero { height: 600px; }

// DEBUG: 레이아웃 디버그용 — 납품 전 반드시 삭제
* { outline: 1px solid red; }
```

> **규칙: 납품 전 `Ctrl+Shift+F`(VS Code)로 프로젝트 전체에서 `TEMP:`, `DEBUG:`를 검색하여 남은 임시 코드를 모두 제거한다.**

---

## 4. 파일 인코딩 및 줄바꿈

### 인코딩

**UTF-8 (BOM 없음)** 으로 저장한다.

BOM(Byte Order Mark)이 포함되면 일부 서버에서 파일 첫 줄에 보이지 않는 문자가 추가되어 PHP/서버사이드 렌더링에서 헤더 오류가 발생할 수 있다. VS Code 하단 상태바에서 인코딩을 확인하고 `UTF-8` 으로 유지한다.

### 줄바꿈

**LF (`\n`)** 만 사용하며, CRLF(`\r\n`)는 절대 금지다.

Windows 기본값인 CRLF로 저장하면 Git 커밋 시 파일 전체가 변경된 것처럼 보이는 노이즈가 발생한다. `.editorconfig`로 자동 처리되지만, Windows 환경에서는 Git 설정도 함께 맞춘다.

아래 명령은 Windows와 macOS/Linux 각각에서 Git 줄바꿈 설정을 올바르게 지정하는 명령이다.

```bash
# Git 전역 설정 (Windows) — CRLF 자동 변환 비활성화
git config --global core.autocrlf false

# Git 전역 설정 (macOS/Linux) — 체크아웃 시 LF 유지
git config --global core.autocrlf input
```

### 파일 끝 빈 줄

모든 파일 끝에 빈 줄(`newline`) 1개를 유지한다. Unix 표준을 따르며, 없으면 `git diff`에서 "No newline at end of file" 경고가 표시된다. `.editorconfig`의 `insert_final_newline = true`로 자동 처리된다.

---

## 5. 에디터 설정 권장사항

### VS Code 기준

아래 확장 프로그램을 설치하면 `.editorconfig` 설정이 VS Code에 자동으로 적용된다.

**필수 확장 프로그램:**

| 확장 | ID | 용도 |
|------|----|------|
| EditorConfig for VS Code | `EditorConfig.EditorConfig` | `.editorconfig` 자동 적용 |
| Stylelint | `stylelint.vscode-stylelint` | SCSS 린팅 |
| Prettier | `esbenp.prettier-vscode` | 코드 포매팅 |

아래 설정은 VS Code `settings.json`에 추가하는 권장 설정이다. 저장 시 자동 포매팅과 인코딩 설정이 포함된다.

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "editor.insertSpaces": true,
  "files.eol": "\n",
  "files.encoding": "utf8"
}
```

### SCSS 작성 순서 (5그룹) 참고

일관된 CSS 속성 순서를 유지하여 가독성을 높인다. 자세한 내용은 [SCSS 작성 규칙 — 속성 순서](/conventions/scss-rules/)를 참고한다.

아래 코드는 5그룹 순서를 간략히 보여주는 요약 예시다.

```scss
.component {
  /* 1. 포지셔닝 */
  position: absolute;
  top: 0;
  z-index: 1;

  /* 2. 박스 모델 */
  display: flex;
  width: 100%;
  padding: var(--spacing-md);
  margin: 0;

  /* 3. 타이포그래피 */
  font-size: var(--font-size-base);
  line-height: var(--leading-normal);
  color: var(--color-text);

  /* 4. 시각 효과 */
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: .25rem;

  /* 5. 기타 */
  cursor: pointer;
}
```
