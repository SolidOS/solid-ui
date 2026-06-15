#!/usr/bin/env bash
set -euo pipefail

# Clone, build, and link solid-logic for CI (peer dependency of solid-ui).
# Run after `npm ci` so the local install is not removed.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOLID_LOGIC_DIR="${ROOT_DIR}/.ci-deps/solid-logic"
SOLID_LOGIC_REPO="https://github.com/SolidOS/solid-logic.git"
SOLID_LOGIC_REF="${GITHUB_BASE_REF:-${GITHUB_REF_NAME:-main}}"

echo ">>>>> Setting up solid-logic from ${SOLID_LOGIC_REPO} (${SOLID_LOGIC_REF})"

rm -rf "$SOLID_LOGIC_DIR"
mkdir -p "$(dirname "$SOLID_LOGIC_DIR")"
git clone --depth 1 --branch "$SOLID_LOGIC_REF" "$SOLID_LOGIC_REPO" "$SOLID_LOGIC_DIR"

echo ">>>>> Installing solid-logic dependencies"
(cd "$SOLID_LOGIC_DIR" && npm ci)

echo ">>>>> Building solid-logic"
(cd "$SOLID_LOGIC_DIR" && npm run build)

echo ">>>>> Installing solid-logic as a local dependency in solid-ui"
cd "$ROOT_DIR"
npm install --no-save "solid-logic@file:${SOLID_LOGIC_DIR}"

echo ">>>>> solid-logic setup complete"
