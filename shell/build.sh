#!/usr/bin/env bash
set -euo pipefail

# 脚本所在目录（shell）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# RN 项目根目录
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

BUILD_DIR="$PROJECT_ROOT/build"

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/android"
mkdir -p "$BUILD_DIR/ios"

pnpm react-native bundle \
  --platform android \
  --dev false \
  --entry-file index.js \
  --bundle-output "$BUILD_DIR/android/index.android.bundle" \
  --assets-dest "$BUILD_DIR/android"

pnpm react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output "$BUILD_DIR/ios/main.jsbundle" \
  --assets-dest "$BUILD_DIR/ios"
