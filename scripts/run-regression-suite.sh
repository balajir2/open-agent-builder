#!/bin/bash

# Comprehensive Regression Test Suite Runner
# Runs the full regression suite and generates detailed reports

echo "=========================================="
echo "🧪 Comprehensive Regression Test Suite"
echo "=========================================="
echo ""

# Check if Convex is running
if ! curl -s http://localhost:3000/api/config > /dev/null 2>&1; then
    echo "⚠️  Warning: Development server may not be running"
    echo "   Run 'npm run dev:all' in another terminal"
    echo ""
fi

# Check environment variables
if [ -z "$CONVEX_URL" ] && [ -z "$NEXT_PUBLIC_CONVEX_URL" ]; then
    echo "❌ Error: CONVEX_URL or NEXT_PUBLIC_CONVEX_URL must be set"
    exit 1
fi

if [ -z "$CONVEX_TEST_SECRET" ]; then
    echo "❌ Error: CONVEX_TEST_SECRET must be set for tests"
    exit 1
fi

echo "✅ Environment check passed"
echo ""

# Create test-reports directory if it doesn't exist
mkdir -p test-reports

echo "Running comprehensive regression suite..."
echo ""

# Run the comprehensive regression test
npx playwright test comprehensive-regression.spec.ts --reporter=html

TEST_EXIT_CODE=$?

echo ""
echo "=========================================="
echo "📊 Test Results"
echo "=========================================="

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Some tests failed (exit code: $TEST_EXIT_CODE)"
fi

echo ""
echo "📄 Reports generated in test-reports/ directory:"
ls -lh test-reports/*.html test-reports/*.json 2>/dev/null | tail -5

echo ""
echo "To view HTML report:"
echo "  npx playwright show-report"
echo ""

exit $TEST_EXIT_CODE
