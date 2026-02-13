# Test Suite Documentation

**Last Updated:** February 13, 2026

This directory contains comprehensive test suites for the Open Agent Builder platform.

## Test Suite Overview

| Test File | Lines | Purpose | Run Command |
|-----------|-------|---------|-------------|
| **Model & Provider Tests** ||||
| [model-regression.spec.ts](model-regression.spec.ts) | ~670 | Tests all LLM providers and models | `npm run test:regression` |
| **File Handling Tests** ||||
| [file-processing.spec.ts](file-processing.spec.ts) | ~370 | Document extraction (PDF, DOCX, Markdown) | `npm run test` |
| [file-upload-download.spec.ts](file-upload-download.spec.ts) | ~400 | HTTP upload/download endpoints | `npm run test:upload-download` |
| [file-workflow-integration.spec.ts](file-workflow-integration.spec.ts) | ~300 | Files in workflow execution | `npm run test:file-integration` |
| **Workflow Tests** ||||
| [template-verification.spec.ts](template-verification.spec.ts) | ~400 | Workflow template validation | `npm run test:templates` |
| [workflow-execution.spec.ts](workflow-execution.spec.ts) | ~350 | Workflow execution engine | `npm run test` |
| [comprehensive-workflow-tests.spec.ts](comprehensive-workflow-tests.spec.ts) | ~500 | End-to-end workflow scenarios | `npm run test:comprehensive` |
| **Node Executor Tests** ||||
| [node-executors.spec.ts](node-executors.spec.ts) | ~450 | Individual node type executors | `npm run test` |
| **Tool Integration Tests** ||||
| [tool-integrations.spec.ts](tool-integrations.spec.ts) | ~400 | Firecrawl, Tavily, E2B, Arcade, Gamma | `npm run test` |
| **Security & Edge Cases** ||||
| [authentication.spec.ts](authentication.spec.ts) | ~300 | Azure AD auth and API key auth | `npm run test:auth` |
| [security.spec.ts](security.spec.ts) | ~350 | XSS, SSRF, injection prevention | `npm run test` |
| [edge-cases.spec.ts](edge-cases.spec.ts) | ~400 | Error handling and edge cases | `npm run test:edge-cases` |
| **Database & API Tests** ||||
| [database-operations.spec.ts](database-operations.spec.ts) | ~300 | Convex CRUD operations | `npm run test` |
| [api-endpoints.spec.ts](api-endpoints.spec.ts) | ~350 | API route testing | `npm run test` |
| **Comprehensive Regression** ||||
| [comprehensive-regression.spec.ts](comprehensive-regression.spec.ts) | ~800 | Full regression suite | `npm run test:regression:full` |

**Total Test Coverage:** ~6,000+ lines across 15+ test files

---

## Quick Start

### Run All Tests
```bash
npm run test
```

### Run Specific Test Suites
```bash
# Model regression tests
npm run test:regression

# File upload/download tests
npm run test:files

# Workflow tests
npm run test:comprehensive
npm run test:templates

# Security tests
npm run test:auth
npm run test:edge-cases

# Full regression suite
npm run test:regression:full
```

### Run Tests with UI
```bash
npm run test:ui                    # Interactive UI for all tests
npm run test:files:ui              # File tests only
npm run test:regression:headed     # Model tests with visible browser
```

---

## Test Categories

### 1. Model & Provider Tests

**Coverage:** All LLM providers (Anthropic, OpenAI, Google, Groq) and their models

**Tests:**
- Basic agent execution
- Tool usage (MCP, Firecrawl, etc.)
- JSON mode
- Provider-specific response formats
- Error handling

**Report:** Generates HTML report in `test-reports/`

**Documentation:** [docs/guides/regression-testing.md](../docs/guides/regression-testing.md)

---

### 2. File Handling Tests (~1,070 lines)

**Coverage:** File upload, download, extraction, and workflow integration

**Test Files:**
1. **file-processing.spec.ts** - Content extraction
   - PDF text extraction (pdf2json)
   - DOCX text extraction (mammoth)
   - Markdown processing
   - File type detection

2. **file-upload-download.spec.ts** - HTTP endpoints
   - Multipart form data uploads
   - Raw binary uploads
   - File downloads and URL generation
   - Content integrity verification
   - CORS and headers

3. **file-workflow-integration.spec.ts** - Workflow integration
   - File state injection
   - Content prefetching
   - Variable substitution
   - Multiple file handling

**Documentation:** [docs/guides/file-upload-download-testing.md](../docs/guides/file-upload-download-testing.md)

**Run:**
```bash
npm run test:files                 # All file tests
npm run test:upload-download       # Upload/download only
npm run test:file-integration      # Workflow integration only
```

---

### 3. Workflow Tests

**Coverage:** End-to-end workflow execution and validation

**Tests:**
- Template verification (all 15 templates)
- Workflow execution engine
- Node type executors
- State management
- Error handling
- Human-in-the-loop approvals

**Run:**
```bash
npm run test:comprehensive
npm run test:templates
```

---

### 4. Tool Integration Tests

**Coverage:** External tool integrations

**Tools Tested:**
- Firecrawl (scrape, crawl, map, extract)
- Tavily (AI search)
- Serper (Google search)
- E2B (code execution)
- Arcade (browser automation)
- Gamma AI (presentation generation)

**Run:**
```bash
npm run test
```

---

### 5. Security Tests

**Coverage:** Security vulnerabilities and authentication

**Tests:**
- XSS prevention (DOMPurify)
- SSRF protection (private IP blocking)
- Code injection prevention (sandboxed execution)
- Azure AD authentication
- API key authentication
- Session management

**Run:**
```bash
npm run test:auth
npm run test
```

---

### 6. API & Database Tests

**Coverage:** API routes and Convex database operations

**Tests:**
- Workflow CRUD operations
- Execution tracking
- User API key management
- MCP server registry
- Approval records

**Run:**
```bash
npm run test
```

---

## Test Reports

### HTML Reports

```bash
# Generate and view HTML report
npm run test:regression:report
npx playwright show-report
```

### JSON Reports

Test results are saved to `test-reports/`:
```
test-reports/
├── model-regression-{timestamp}.json
├── model-regression-{timestamp}.html
└── playwright-report/
```

### Coverage Reports

```bash
# Run tests with coverage
npm run test -- --coverage
```

---

## Test Configuration

### Environment Variables

Tests require these environment variables (from `.env.local`):

```bash
# Convex
CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://your-deployment.convex.site/http/uploadFile

# Azure AD (for auth tests)
AUTH_MICROSOFT_ID=your-client-id
AUTH_MICROSOFT_SECRET=your-client-secret
AUTH_MICROSOFT_TENANT_ID=your-tenant-id

# LLM Provider API Keys (for integration tests)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIzaSy...
GROQ_API_KEY=gsk_...

# Tool API Keys (for tool integration tests)
FIRECRAWL_API_KEY=fc-...
TAVILY_API_KEY=tvly-...
E2B_API_KEY=e2b_...
ARCADE_API_KEY=arcade_...
GAMMA_API_KEY=sk-gamma_...
```

### Playwright Configuration

See [playwright.config.ts](../playwright.config.ts) for:
- Browser settings (Chromium, Firefox, WebKit)
- Timeout configurations
- Retry strategies
- Reporter settings

---

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name Tests', () => {
  test.beforeAll(async () => {
    // Setup before all tests
  });

  test.beforeEach(async () => {
    // Setup before each test
  });

  test('should do something', async () => {
    // Test implementation
    const result = await someFunction();
    expect(result).toBeDefined();
  });

  test.afterEach(async () => {
    // Cleanup after each test
  });

  test.afterAll(async () => {
    // Cleanup after all tests
  });
});
```

### Best Practices

1. **Use descriptive test names**
   ```typescript
   // ✅ Good
   test('should upload PDF file and extract text content', async () => {});

   // ❌ Bad
   test('test 1', async () => {});
   ```

2. **Isolate tests** - Each test should be independent
   ```typescript
   // ✅ Good - creates its own data
   test('should create workflow', async () => {
     const workflow = await createTestWorkflow();
     expect(workflow.id).toBeDefined();
   });

   // ❌ Bad - depends on previous test
   let sharedWorkflowId;
   test('should create workflow', async () => {
     sharedWorkflowId = await createWorkflow();
   });
   test('should update workflow', async () => {
     await updateWorkflow(sharedWorkflowId);
   });
   ```

3. **Clean up resources**
   ```typescript
   test('should handle file upload', async () => {
     const fileId = await uploadTestFile();
     try {
       // Test logic
     } finally {
       await deleteFile(fileId); // Cleanup
     }
   });
   ```

4. **Use helper functions** - Extract common logic
   ```typescript
   // helpers.ts
   export async function createTestWorkflow() {
     // Common workflow creation logic
   }

   // test.spec.ts
   import { createTestWorkflow } from './helpers';
   ```

5. **Test error cases**
   ```typescript
   test('should handle missing file gracefully', async () => {
     const result = await processFile('non-existent-id');
     expect(result.error).toBeDefined();
   });
   ```

---

## Debugging Tests

### Enable Debug Logs

```bash
# Run with debug output
DEBUG=pw:api npm run test

# Run specific test with logs
npm run test tests/file-upload-download.spec.ts --headed
```

### Use Playwright Inspector

```bash
# Open Playwright inspector
npm run test:ui

# Run with inspector
PWDEBUG=1 npm run test
```

### Generate Trace

```bash
# Tests automatically generate traces on failure
# View trace:
npx playwright show-trace trace.zip
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run tests
        run: npm run test
        env:
          CONVEX_URL: ${{ secrets.CONVEX_URL }}
          NEXT_PUBLIC_CONVEX_URL: ${{ secrets.CONVEX_URL }}

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-reports/
```

---

## Test Maintenance

### Regular Tasks

1. **Update test data** - Keep test fixtures current
2. **Review flaky tests** - Fix or skip unreliable tests
3. **Update API mocks** - Match current API responses
4. **Check coverage** - Ensure new features have tests
5. **Clean up reports** - Archive old test reports

### Deprecation Policy

When tests become outdated:
1. Mark as `.skip` with reason
2. Create issue to update or remove
3. Document in this README

```typescript
test.skip('outdated test', async () => {
  // TODO: Update for new API - Issue #123
});
```

---

## Related Documentation

- **[Testing Quick Start](../docs/guides/testing-quick-start.md)** - Getting started with testing
- **[Regression Testing Guide](../docs/guides/regression-testing.md)** - Model regression tests
- **[File Upload/Download Testing](../docs/guides/file-upload-download-testing.md)** - File handling tests
- **[CLAUDE.md](../CLAUDE.md)** - Development guidelines

---

## Getting Help

- **GitHub Issues:** Report test failures or request new tests
- **Documentation:** Check docs for specific test suites
- **Logs:** Review console output for error details

---

**Last Updated:** February 13, 2026
**Test Coverage:** 6,000+ lines across 15+ test files
**Maintained By:** Open Agent Builder Team
