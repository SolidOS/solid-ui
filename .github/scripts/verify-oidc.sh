#!/bin/bash
# Verify OIDC authentication setup for npm trusted publishing
# This script checks that all prerequisites for OIDC are met
# Note: We don't use 'set -e' here so we can continue checking even if some conditions fail

echo "=== Verifying OIDC Authentication Setup ==="
echo ""
echo "Workflow name: ${GITHUB_WORKFLOW:-unknown}"
echo "Workflow file: ${GITHUB_WORKFLOW_REF:-unknown}"
echo "Repository: ${GITHUB_REPOSITORY:-unknown}"
echo "Ref: ${GITHUB_REF:-unknown}"
echo "Actor: ${GITHUB_ACTOR:-unknown}"
echo "Event name: ${GITHUB_EVENT_NAME:-unknown}"
echo ""

# Check if NODE_AUTH_TOKEN is set (from repository secrets)
if [ -n "$NODE_AUTH_TOKEN" ]; then
  echo "⚠️  WARNING: NODE_AUTH_TOKEN secret is configured in repository"
  echo "   This may prevent OIDC from working. Please remove the NODE_AUTH_TOKEN secret"
  echo "   from repository Settings > Secrets and variables > Actions"
  echo ""
else
  echo "✓ No NODE_AUTH_TOKEN secret found (good for OIDC)"
fi

# Check if ACTIONS_ID_TOKEN_REQUEST_TOKEN is available (required for OIDC)
if [ -z "$ACTIONS_ID_TOKEN_REQUEST_TOKEN" ]; then
  echo "⚠️  WARNING: ACTIONS_ID_TOKEN_REQUEST_TOKEN not set - OIDC may not work"
  echo "   Ensure the workflow has 'id-token: write' permission"
else
  echo "✓ OIDC token request token is available"
fi

echo ""
echo "=== Node.js and npm Versions ==="
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Ensure npm is at least 10.0.0 for OIDC support
npm_version=$(npm --version | cut -d. -f1)
if [ "$npm_version" -lt 10 ]; then
  echo "⚠️  WARNING: npm version is less than 10.0.0, OIDC may not work properly"
else
  echo "✓ npm version supports OIDC (10.0.0+)"
fi

echo ""
echo "=== npm Configuration ==="
npm config list

echo ""
echo "=== Checking for .npmrc ==="
if [ -f .npmrc ]; then
  echo "Found .npmrc in current directory:"
  cat .npmrc
  # Check if it contains token auth (should not for OIDC)
  if grep -q "_authToken" .npmrc; then
    echo "⚠️  WARNING: .npmrc contains _authToken - this will prevent OIDC"
    echo "Removing token configuration..."
    sed -i '/^\/\/registry\.npmjs\.org\/:_authToken/d' .npmrc || true
    sed -i '/^_authToken/d' .npmrc || true
  fi
else
  echo "No .npmrc file found in current directory (this is expected for OIDC)"
fi

echo ""
echo "=== Environment Variables ==="
env | grep -i "npm\|node" || echo "No npm/node env vars found"

echo ""
echo "=== OIDC Verification Complete ==="
