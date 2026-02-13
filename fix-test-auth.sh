#!/bin/bash
# Script to add setTestAuth calls to test files

cd tests

# file-upload-download.spec.ts
if ! grep -q "setTestAuth(convex" file-upload-download.spec.ts; then
  sed -i '/new ConvexHttpClient(CONVEX_URL);/a\    setTestAuth(convex, TEST_USER_ID);' file-upload-download.spec.ts
  echo "✓ Updated file-upload-download.spec.ts"
fi

# file-workflow-integration.spec.ts
if ! grep -q "setTestAuth(convex" file-workflow-integration.spec.ts; then
  sed -i '/new ConvexHttpClient(CONVEX_URL);/a\    setTestAuth(convex, TEST_USER_ID);' file-workflow-integration.spec.ts
  echo "✓ Updated file-workflow-integration.spec.ts"
fi

# interoperability.spec.ts
if ! grep -q "setTestAuth(convex" interoperability.spec.ts; then
  sed -i '/new ConvexHttpClient(CONVEX_URL);/a\    setTestAuth(convexClient, TEST_USER_ID);' interoperability.spec.ts
  echo "✓ Updated interoperability.spec.ts"
fi

# mcp-lifecycle.spec.ts
if ! grep -q "setTestAuth(convex" mcp-lifecycle.spec.ts; then
  sed -i '/new ConvexHttpClient(CONVEX_URL);/a\    setTestAuth(convexClient, TEST_USER_ID);' mcp-lifecycle.spec.ts
  echo "✓ Updated mcp-lifecycle.spec.ts"
fi

# template-verification.spec.ts
if ! grep -q "setTestAuth(convex" template-verification.spec.ts; then
  sed -i '/new ConvexHttpClient(CONVEX_URL);/a\    setTestAuth(convexClient, TEST_USER_ID);' template-verification.spec.ts
  echo "✓ Updated template-verification.spec.ts"
fi

# workflow-execution.spec.ts
if ! grep -q "setTestAuth(convex" workflow-execution.spec.ts; then
  sed -i '/new ConvexHttpClient(CONVEX_URL);/a\    setTestAuth(convexClient, TEST_USER_ID);' workflow-execution.spec.ts
  echo "✓ Updated workflow-execution.spec.ts"
fi

echo "✅ All test files updated with setTestAuth"
