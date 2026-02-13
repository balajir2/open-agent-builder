# Testing Quick Start Guide

Quick reference for running the new Phase 1 test suites.

---

## Prerequisites

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create a `.env.test` file or set these in your environment:

```bash
# Required
CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_TEST_SECRET=your-test-secret

# Optional (for real API integration tests)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIzaSy...
GROQ_API_KEY=gsk_...
E2B_API_KEY=e2b_...
FIRECRAWL_API_KEY=fc-...
TAVILY_API_KEY=tvly-...
ARCADE_API_KEY=arcade_...
GAMMA_API_KEY=sk-gamma_...
```

### 3. Start Convex Dev Server
```bash
npx convex dev
```

---

## Running Tests

### Run All New Tests
```bash
npm run test tests/workflow-execution.spec.ts
npm run test tests/node-executors.spec.ts
npm run test tests/api-endpoints.spec.ts
npm run test tests/security.spec.ts
```

### Run All Tests at Once
```bash
npm run test tests/*.spec.ts
```

### Run Specific Test Suite
```bash
# Workflow execution tests only
npm run test tests/workflow-execution.spec.ts

# Security tests only
npm run test tests/security.spec.ts
```

### Run with Specific Pattern
```bash
# Run only SSRF tests
npm run test tests/security.spec.ts -- --grep "SSRF Protection"

# Run only API endpoint tests
npm run test tests/api-endpoints.spec.ts -- --grep "POST /api/workflows"
```

### Run in UI Mode (Interactive)
```bash
npm run test:ui
```

### Run in Headed Mode (Visible Browser)
```bash
npm run test:headed
```

### Run with Coverage Report
```bash
npm run test -- --coverage
```

---

## Test File Organization

### 1. workflow-execution.spec.ts (1,018 lines, 43 tests)
**What it tests:** End-to-end workflow execution

**Test groups:**
- Basic Workflow Flows
- Multi-Node Workflows
- Conditional Logic (if-else, while)
- State Management
- Error Handling
- Human-in-the-Loop Approval
- Edge Validation

**Run command:**
```bash
npm run test tests/workflow-execution.spec.ts
```

---

### 2. node-executors.spec.ts (1,059 lines, 45 tests)
**What it tests:** Individual node executor functions

**Test groups:**
- Transform Node (E2B code execution)
- Set-State Node
- HTTP Node (with SSRF protection)
- Extract Node (LLM-powered)
- If-Else Node
- While Node
- Gamma Node (presentation generation)
- Arcade Node (browser automation)
- Guardrails Node

**Run command:**
```bash
npm run test tests/node-executors.spec.ts
```

---

### 3. api-endpoints.spec.ts (701 lines, 35 tests)
**What it tests:** REST API routes

**Test groups:**
- POST /api/workflows/[id]/execute
- GET /api/workflows/[id]/execute-stream (SSE)
- POST /api/workflows/[id]/resume
- POST /api/approval/
- GET /api/config
- Authorization
- Input Validation
- Rate Limiting

**Run command:**
```bash
npm run test tests/api-endpoints.spec.ts
```

---

### 4. security.spec.ts (631 lines, 45 tests)
**What it tests:** Security features

**Test groups:**
- SSRF Protection (12 tests)
- XSS Sanitization (9 tests)
- Code Injection Prevention (9 tests)
- Prototype Pollution Prevention (3 tests)
- Input Validation (6 tests)
- Rate Limiting (4 tests)
- Additional Security (5 tests)

**Run command:**
```bash
npm run test tests/security.spec.ts
```

---

## Common Test Commands

### Debug a Failing Test
```bash
# Run with full error output
npm run test tests/workflow-execution.spec.ts -- --reporter=line

# Run single test by name
npm run test tests/security.spec.ts -- --grep "should block localhost"
```

### Update Snapshots (if using)
```bash
npm run test -- -u
```

### Run Tests in Parallel
```bash
npm run test -- --workers=4
```

### Run Tests Serially (slower but safer)
```bash
npm run test -- --workers=1
```

---

## Troubleshooting

### Issue: "CONVEX_URL environment variable is not set"
**Solution:** Set the required environment variables:
```bash
export CONVEX_URL=https://your-deployment.convex.cloud
export CONVEX_TEST_SECRET=your-test-secret
```

### Issue: "CONVEX_TEST_SECRET environment variable is not set"
**Solution:** Get the test secret from your Convex dashboard and set it:
```bash
npx convex env set CONVEX_TEST_SECRET "your-secret-here"
export CONVEX_TEST_SECRET="your-secret-here"
```

### Issue: Tests timeout
**Solution:** Increase timeout in test files or use faster mocks:
```typescript
test.setTimeout(60000); // 60 seconds
```

### Issue: "fetch is not defined"
**Solution:** The tests use global fetch mocking. Ensure Node.js version is 18+:
```bash
node --version  # Should be v18.0.0 or higher
```

### Issue: Convex connection errors
**Solution:** Make sure Convex dev server is running:
```bash
npx convex dev
```

### Issue: Mock not working
**Solution:** Check that mocks are cleared between tests:
```typescript
test.beforeEach(() => {
  dynamicFetchMocks.length = 0;
});
```

---

## Test Data Cleanup

Tests automatically clean up after themselves using `afterAll` hooks:

```typescript
test.afterAll(async () => {
  // Clean up test workflows
  const workflows = await convexClient.query(api.workflows.list, { userId: TEST_USER_ID });
  for (const workflow of workflows) {
    await convexClient.mutation(api.workflows.deleteWorkflow, { workflowId: workflow._id });
  }
});
```

If tests fail before cleanup, you may need to manually clean up test data:

```bash
# Access Convex dashboard
npx convex dashboard

# Delete test workflows with userId: "test-user-*"
```

---

## Performance Tips

### 1. Use Mocks for External APIs
Tests use mocked responses by default. For faster tests, keep it that way.

### 2. Run Tests in Parallel
```bash
npm run test -- --workers=4
```

### 3. Run Only Changed Tests
```bash
npm run test -- --only-changed
```

### 4. Skip Slow Tests During Development
```typescript
test.skip('slow test', async () => {
  // This test won't run
});
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx convex dev &
      - run: npm run test
        env:
          CONVEX_URL: ${{ secrets.CONVEX_URL }}
          CONVEX_TEST_SECRET: ${{ secrets.CONVEX_TEST_SECRET }}
```

---

## Test Coverage Report

### Generate Coverage Report
```bash
npm run test -- --coverage
```

### View Coverage in Browser
```bash
npm run test -- --coverage --coverage-reporter=html
open coverage/index.html
```

### Expected Coverage
- **Before Phase 1:** ~35%
- **After Phase 1:** ~60%
- **Target:** 80%+

---

## Writing New Tests

### Follow Existing Patterns

**1. Import required modules:**
```typescript
import { test, expect } from '@playwright/test';
import { WorkflowNode, WorkflowState } from '@/lib/workflow/types';
```

**2. Set up test suite:**
```typescript
test.describe('My Test Suite', () => {
  test.beforeAll(() => {
    // Setup
  });

  test.afterAll(() => {
    // Cleanup
  });
});
```

**3. Write test:**
```typescript
test('should do something', async () => {
  // Arrange
  const node = { /* ... */ };
  const state = { /* ... */ };

  // Act
  const result = await executeNode(node, state);

  // Assert
  expect(result).toBeDefined();
  expect(result.success).toBe(true);
});
```

---

## Quick Reference: Test Counts

| File | Lines | Tests | Coverage Area |
|------|-------|-------|---------------|
| workflow-execution.spec.ts | 1,018 | 43 | End-to-end workflows |
| node-executors.spec.ts | 1,059 | 45 | Node executors |
| api-endpoints.spec.ts | 701 | 35 | REST APIs |
| security.spec.ts | 631 | 45 | Security features |
| **Total** | **3,409** | **168** | **All critical paths** |

---

## Need Help?

1. Check test output for detailed error messages
2. Read test comments for context
3. Look at existing passing tests for patterns
4. Refer to [TEST-COVERAGE-IMPLEMENTATION-SUMMARY.md](./TEST-COVERAGE-IMPLEMENTATION-SUMMARY.md) for detailed documentation

---

**Last Updated:** 2026-02-13
