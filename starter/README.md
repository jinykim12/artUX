# artpqUX 스타터 킷

아트피큐 팀 퍼블리싱 표준 환경 — 신규 프로젝트 시작 템플릿

## 빠른 시작

1. **이 디렉토리를 새 프로젝트에 복사**
   ```
   cp -r starter/ /path/to/my-project/
   cd /path/to/my-project
   ```

2. **의존성 설치**
   ```
   npm install
   ```

3. **프로젝트 정보 수정** — `package.json`의 `name`, `description` 수정

4. **CSS 빌드**
   ```
   npm run build:css
   ```
   → `html/pub/css/style.css` 생성

5. **개발 시작** — `html/index.html`을 열고 작업 시작
   ```
   npm run watch:css
   ```

---

## 프로젝트 구조

```
my-project/
├── html/
│   ├── index.html              # HTML 보일러플레이트
│   └── pub/
│       ├── css/
│       │   ├── style.css       # 빌드된 CSS (npm run build:css)
│       │   └── scss/           # ITCSS 7단계 SCSS 소스
│       │       ├── style.scss  # 진입점
│       │       ├── 1-settings/ # 변수, 프로젝트 오버라이드
│       │       ├── 2-tools/    # 믹스인 (respond-to 등)
│       │       ├── 3-generic/  # CSS 토큰, Bootstrap
│       │       ├── 4-elements/ # base, font, focus, sr-only
│       │       ├── 5-objects/  # 레이아웃
│       │       ├── 6-components/ # UI 컴포넌트 추가
│       │       └── 7-utilities/  # 유틸리티 추가
│       ├── js/                 # JavaScript
│       └── images/             # 이미지 리소스
├── .browserslistrc             # 지원 브라우저 범위
├── .editorconfig               # 4 spaces, UTF-8, LF
├── CLAUDE.md                   # AI 작업 규칙
└── package.json                # Sass + Bootstrap 5
```

---

## npm 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run build:css` | SCSS → html/pub/css/style.css 컴파일 |
| `npm run watch:css` | SCSS 변경 감지 + 자동 재컴파일 |

---

## 프로젝트 색상 변경

색상 변경 시 두 곳을 함께 수정해야 한다:

**1. CSS Custom Properties** — `html/pub/css/scss/3-generic/_root.scss`
```scss
:root {
  --color-primary: #1a73e8;  // 변경
}
```

**2. Bootstrap Sass 변수** — `html/pub/css/scss/3-generic/_vendor.scss`
```scss
$primary: #1a73e8;  // 동일하게 변경
```

---

## 반응형 브레이크포인트

`respond-to()` 믹스인 사용:

```scss
@use '../2-tools' as tools;

.element {
  font-size: 1.4rem;

  @include tools.respond-to(tablet) {
    font-size: 1.6rem;
  }

  @include tools.respond-to(pc) {
    font-size: 1.8rem;
  }
}
```

| 키워드 | 범위 |
|--------|------|
| `mobile-only` | ~767px |
| `tablet` | 768px~ |
| `tablet-only` | 768px~1023px |
| `pc-sm` | 1024px~ |
| `pc-sm-only` | 1024px~1279px |
| `pc` | 1280px~ |

---

## 접근성 기준

이 스타터 킷은 KWCAG 2.1 AA / KRDS v1.0.0 준수를 기본으로 한다:
- 본문건너뛰기 링크 포함 (`html/index.html`)
- 포커스 인디케이터 표준 적용 (`_focus.scss`)
- 스크린리더 전용 텍스트 유틸리티 `.sr-only` 내장
- `word-break: keep-all` 한국어 줄바꿈 처리

## REM 환경

`Bootstrap 기본값` 설정으로 **1rem = 16px** 환경을 사용한다.
px → rem 환산: `px / 16 = rem` (예: 44px = 2.75rem)
