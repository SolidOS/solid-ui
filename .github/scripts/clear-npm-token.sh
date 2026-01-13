#!/bin/bash
# Clear npm token configuration to ensure OIDC is used instead
# This script removes any token-based authentication from npm config
# Note: We use '|| true' for commands that may fail if config doesn't exist

echo "Clearing npm token configuration to force OIDC usage..."

# Remove any .npmrc file that might contain token auth
if [ -f "$HOME/.npmrc" ]; then
  echo "Found .npmrc at $HOME/.npmrc, checking for token auth..."
  if grep -q "_authToken" "$HOME/.npmrc"; then
    echo "Removing token auth from .npmrc..."
    sed -i '/_authToken/d' "$HOME/.npmrc" || true
  fi
fi

# Clear npm config token settings
npm config delete //registry.npmjs.org/:_authToken || true
npm config delete _authToken || true

# Note: If NODE_AUTH_TOKEN secret exists in repository, it should be removed
# from Settings > Secrets and variables > Actions to allow OIDC to work properly
if [ -n "$NODE_AUTH_TOKEN" ]; then
  echo "WARNING: NODE_AUTH_TOKEN secret is configured in repository"
  echo "This may prevent OIDC from working. Consider removing it from"
  echo "repository Settings > Secrets and variables > Actions"
fi

echo "✓ Cleared npm token configuration"
