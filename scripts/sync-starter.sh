#!/usr/bin/env bash
# sync-starter.sh
# 메인 scss/에서 starter/scss/로 핵심 파일을 자동 복사한다.
# 사용법: bash scripts/sync-starter.sh

set -euo pipefail

SRC="scss"
DEST="starter/scss"

echo "artUX sync-starter: 메인 scss → starter/scss 동기화 시작"
echo "------------------------------------------------------"

# ------------------------------------------------------------------
# 1-settings/ 전체
# ------------------------------------------------------------------
echo "복사: 1-settings/"
cp "${SRC}/1-settings/_variables.scss"         "${DEST}/1-settings/_variables.scss"
cp "${SRC}/1-settings/_project-overrides.scss" "${DEST}/1-settings/_project-overrides.scss"
cp "${SRC}/1-settings/_index.scss"             "${DEST}/1-settings/_index.scss"

# ------------------------------------------------------------------
# 2-tools/ 전체
# ------------------------------------------------------------------
echo "복사: 2-tools/"
cp "${SRC}/2-tools/_mixin.scss"       "${DEST}/2-tools/_mixin.scss"
cp "${SRC}/2-tools/_breakpoints.scss" "${DEST}/2-tools/_breakpoints.scss"
cp "${SRC}/2-tools/_index.scss"       "${DEST}/2-tools/_index.scss"

# ------------------------------------------------------------------
# 3-generic/ 전체
# ------------------------------------------------------------------
echo "복사: 3-generic/"
cp "${SRC}/3-generic/_root.scss"   "${DEST}/3-generic/_root.scss"
cp "${SRC}/3-generic/_vendor.scss" "${DEST}/3-generic/_vendor.scss"
cp "${SRC}/3-generic/_index.scss"  "${DEST}/3-generic/_index.scss"

# ------------------------------------------------------------------
# 4-elements/ 전체
# ------------------------------------------------------------------
echo "복사: 4-elements/"
cp "${SRC}/4-elements/_base.scss"   "${DEST}/4-elements/_base.scss"
cp "${SRC}/4-elements/_font.scss"   "${DEST}/4-elements/_font.scss"
cp "${SRC}/4-elements/_common.scss" "${DEST}/4-elements/_common.scss"
cp "${SRC}/4-elements/_focus.scss"  "${DEST}/4-elements/_focus.scss"
cp "${SRC}/4-elements/_index.scss"  "${DEST}/4-elements/_index.scss"

# ------------------------------------------------------------------
# 5-objects/ 전체
# ------------------------------------------------------------------
echo "복사: 5-objects/"
cp "${SRC}/5-objects/_layout.scss" "${DEST}/5-objects/_layout.scss"
cp "${SRC}/5-objects/_index.scss"  "${DEST}/5-objects/_index.scss"

# ------------------------------------------------------------------
# 6-components/ — 빈 _index.scss 생성 (컴포넌트는 프로젝트별 추가)
# 메인의 _index.scss를 복사하지 않는다 — 스타터는 컴포넌트가 없는 상태에서 시작한다.
# ------------------------------------------------------------------
echo "생성: 6-components/_index.scss (빈 상태 — 컴포넌트 파일은 프로젝트별 추가)"
cat > "${DEST}/6-components/_index.scss" << 'EMPTY_INDEX'
// ====================================================
// 6-components: UI 컴포넌트
// ====================================================
// 프로젝트별 컴포넌트를 추가한다.
// 예시: @forward 'button';
EMPTY_INDEX

# ------------------------------------------------------------------
# 7-utilities/_index.scss
# ------------------------------------------------------------------
echo "복사: 7-utilities/_index.scss"
cp "${SRC}/7-utilities/_index.scss" "${DEST}/7-utilities/_index.scss"

# ------------------------------------------------------------------
# .editorconfig
# ------------------------------------------------------------------
echo "복사: .editorconfig"
cp ".editorconfig" "starter/.editorconfig"

# ------------------------------------------------------------------
# starter/scss/style.scss는 복사하지 않음 — 스타터용 별도 유지
# ------------------------------------------------------------------

echo "------------------------------------------------------"
echo "sync-starter 완료. starter/ 디렉토리가 최신 상태입니다."
