/**
 * build-tokens.js
 * tokens.json을 읽어 scss/3-generic/_root.scss를 자동 생성한다.
 *
 * 사용법: node scripts/build-tokens.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const tokens = JSON.parse(readFileSync(resolve(ROOT, 'tokens.json'), 'utf8'));

// ── 헬퍼 ───────────────────────────────────────────────────────────────────

/**
 * 숫자 값을 CSS 속성 값 문자열로 변환.
 * fontWeight / number 는 단위 없이, dimension 은 rem/px 그대로.
 */
function toCSS(token) {
    const v = token['$value'];
    return String(v);
}

/**
 * CSS Custom Property 선언 줄 생성.
 * 값 컬럼을 정렬하기 위해 propWidth(최대 속성명 길이)를 받는다.
 */
function decl(name, value, comment, propWidth) {
    const prop = `--${name}:`;
    const padded = prop.padEnd(propWidth + 1);
    const line = comment
        ? `    ${padded} ${value}; // ${comment}`
        : `    ${padded} ${value};`;
    return line;
}

/**
 * 카테고리 내 선언들의 최대 속성명 길이 반환 (정렬용).
 */
function maxPropLen(entries) {
    return Math.max(...entries.map(([name]) => `--${name}:`.length));
}

// ── 섹션별 출력 빌더 ────────────────────────────────────────────────────────

function buildColorSection(color) {
    const entries = Object.entries(color).filter(([k]) => !k.startsWith('$'));
    const w = maxPropLen(entries.map(([k]) => [`color-${k}`]));
    const lines = [
        '    // ── 색상 토큰 (TOKEN-01) ──────────────────────────',
        '    // Bootstrap Sass 변수 ↔ CSS Custom Properties 매핑:',
        '    //   $primary (#0d6efd)        → --color-primary',
        '    //   $secondary (#6c757d)      → --color-secondary',
        '    //   $body-color (#212529)     → --color-text',
        '    //   $text-muted (#6c757d)     → --color-text-muted',
        '    //   $body-bg (#fff)           → --color-bg',
        '    //   $border-color (#dee2e6)   → --color-border',
        '    //   $danger (#dc3545)         → --color-error',
        '    //   $success (#198754)        → --color-success',
        '    //',
        '    // [중요] $primary: var(--color-primary) 사용 불가',
        '    // Sass 변수는 컴파일-타임 정적값이어야 한다.',
        '    // 값 변경 시 _vendor.scss의 $primary도 동일하게 수정할 것.',
    ];
    for (const [key, token] of entries) {
        lines.push(decl(`color-${key}`, toCSS(token), null, w));
    }
    return lines.join('\n');
}

function buildFontSizeSection(fontSize) {
    const entries = Object.entries(fontSize).filter(([k]) => !k.startsWith('$'));
    const w = maxPropLen(entries.map(([k]) => [`font-size-${k}`]));
    const lines = [
        '    // ── 타이포그래피 토큰 (TOKEN-02) ──────────────────',
        '    // [62.5% REM] 1rem = 10px',
    ];
    for (const [key, token] of entries) {
        const px = token['$px'];
        const comment = px ? `${px}px${token['$note'] ? ' — ' + token['$note'] : ''}` : (token['$note'] || null);
        lines.push(decl(`font-size-${key}`, toCSS(token), comment, w));
    }
    return lines.join('\n');
}

function buildFontWeightSection(fontWeight) {
    const entries = Object.entries(fontWeight).filter(([k]) => !k.startsWith('$'));
    const w = maxPropLen(entries.map(([k]) => [`font-weight-${k}`]));
    const lines = [];
    for (const [key, token] of entries) {
        lines.push(decl(`font-weight-${key}`, toCSS(token), null, w));
    }
    return lines.join('\n');
}

function buildLeadingSection(leading) {
    const entries = Object.entries(leading).filter(([k]) => !k.startsWith('$'));
    const w = maxPropLen(entries.map(([k]) => [`leading-${k}`]));
    const lines = [];
    for (const [key, token] of entries) {
        const comment = token['$note'] || null;
        lines.push(decl(`leading-${key}`, toCSS(token), comment, w));
    }
    return lines.join('\n');
}

function buildAccessibilitySection(accessibility) {
    const entries = Object.entries(accessibility).filter(([k]) => !k.startsWith('$'));
    const w = maxPropLen(entries.map(([k]) => [k]));
    const lines = [
        '    // ── 접근성 토큰 (TOKEN-02b) ───────────────────────',
    ];
    for (const [key, token] of entries) {
        const px = token['$px'];
        const note = token['$note'];
        const comment = [px ? `${px}px` : null, note].filter(Boolean).join(' — ');
        lines.push(decl(key, toCSS(token), comment || null, w));
    }
    return lines.join('\n');
}

function buildSpacingSection(spacing) {
    const entries = Object.entries(spacing).filter(([k]) => !k.startsWith('$'));
    const w = maxPropLen(entries.map(([k]) => [`spacing-${k}`]));
    const lines = [
        '    // ── 간격 토큰 — 4px 기반 7단계 (TOKEN-03) ────────',
        '    // [62.5% REM] 4px = 0.4rem',
    ];
    for (const [key, token] of entries) {
        const px = token['$px'];
        const comment = px ? `${px}px`.padStart(4) : null;
        lines.push(decl(`spacing-${key}`, toCSS(token), comment, w));
    }
    return lines.join('\n');
}

function buildMiscSection(shadow, transition, z) {
    const lines = [
        '    // ── 기타 토큰 (TOKEN-04) ─────────────────────────',
        '    // 그림자 — Bootstrap --bs-box-shadow-* 값 참조',
    ];

    // shadow
    {
        const entries = Object.entries(shadow).filter(([k]) => !k.startsWith('$'));
        const w = maxPropLen(entries.map(([k]) => [`shadow-${k}`]));
        for (const [key, token] of entries) {
            lines.push(decl(`shadow-${key}`, toCSS(token), null, w));
        }
    }

    lines.push('');
    lines.push('    // 전환');

    // transition
    {
        const entries = Object.entries(transition).filter(([k]) => !k.startsWith('$'));
        const w = maxPropLen(entries.map(([k]) => [`transition-${k}`]));
        for (const [key, token] of entries) {
            lines.push(decl(`transition-${key}`, toCSS(token), null, w));
        }
    }

    lines.push('');
    lines.push('    // z-index — Bootstrap z-index 체계와 정렬');

    // z-index
    {
        const entries = Object.entries(z).filter(([k]) => !k.startsWith('$'));
        const w = maxPropLen(entries.map(([k]) => [`z-${k}`]));
        for (const [key, token] of entries) {
            lines.push(decl(`z-${key}`, toCSS(token), null, w));
        }
    }

    return lines.join('\n');
}

// ── 메인 ────────────────────────────────────────────────────────────────────

const t = tokens;

const sections = [
    buildColorSection(t.color),
    '',
    buildFontSizeSection(t['font-size']),
    buildFontWeightSection(t['font-weight']),
    '',
    buildLeadingSection(t.leading),
    '',
    buildAccessibilitySection(t.accessibility),
    '',
    buildSpacingSection(t.spacing),
    '',
    buildMiscSection(t.shadow, t.transition, t.z),
].join('\n');

const output = `// 자동 생성 — tokens.json에서 생성됨. 직접 수정 금지.
// 토큰 수정: tokens.json → node scripts/build-tokens.js
// ====================================================
// artpqUX CSS Custom Properties (디자인 토큰)
//
// 토큰 네이밍 규칙: --[카테고리]-[이름]-[변형]
//   --color-*       색상
//   --font-size-*   폰트 크기
//   --font-weight-* 폰트 굵기
//   --leading-*     줄간격
//   --spacing-*     간격
//   --shadow-*      그림자
//   --transition-*  전환 속도
//   --z-*           z-index
//
// Bootstrap 충돌 방지:
//   Bootstrap 5.3은 --bs-* 접두어 사용 → 팀 토큰과 이름 충돌 없음
//
// [62.5% REM 환경] html { font-size: 62.5% } → 1rem = 10px
//   px→rem 환산: px / 10 = rem (예: 16px = 1.6rem)
// ====================================================

:root {
${sections}
}
`;

const outPath = resolve(ROOT, 'scss/3-generic/_root.scss');
writeFileSync(outPath, output, 'utf8');
console.log(`생성 완료: ${outPath}`);
