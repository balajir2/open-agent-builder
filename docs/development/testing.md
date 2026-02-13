# Testing Guide

Comprehensive testing documentation for Open Agent Builder.

## Testing Stack

- **Playwright** - End-to-end testing
- **Vitest** - Unit testing (future)
- **TypeScript** - Type safety

## Running Tests

### All Tests

```bash
npm test
```

### Specific Test Suites

```bash
# Workflow templates
npm run test:templates

# Simple scraper
npm run test:simple

# Web search
npm run test:search

# Price tracker
npm run test:price

# Content research
npm run test:research

# Comprehensive suite
npm run test:comprehensive

# Model regression tests
npm run test:regression
npm run test:regression:headed
npm run test:regression:report
```

### Interactive Modes

```bash
# UI mode (test explorer)
npm run test:ui

# Headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug
```

## Test Structure

### Example Test

```typescript
// tests/workflow-execution.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Workflow Execution', () => {
  test('executes simple scraper workflow', async ({ page }) => {
    // Navigate
    await page.goto('http://localhost:3000');

    // Create workflow
    await page.click('text=New Workflow');
    await page.fill('[name="workflowName"]', 'Test Scraper');

    // Execute
    await page.click('button:has-text("Execute")');

    // Verify results
    await expect(page.locator('.execution-status')).toHaveText('Completed');
  });
});
```

## Model Regression Testing

The platform includes automated regression tests to verify that all LLM models work correctly with tools and MCP protocol.

### What is Tested

The regression test suite validates:
- **Model Availability**: All configured models are accessible
- **Tool Support**: Each model can successfully use tools (Firecrawl, Tavily, etc.)
- **MCP Protocol**: Models correctly handle MCP tool calls
- **Response Quality**: Models return valid, structured responses
- **Error Handling**: Models gracefully handle failures

### Running Regression Tests

```bash
# Run all model regression tests
npm run test:regression

# Run with visible browser (useful for debugging)
npm run test:regression:headed

# Generate HTML test report
npm run test:regression:report
```

### Test Coverage

**Models Tested:**
- **Anthropic**: Claude Haiku 4.5, Sonnet 4.5, Opus 4.6
- **OpenAI**: GPT-5.2, GPT-4.5, o3
- **Google**: Gemini 3 Pro Preview, Gemini 3 Flash, Gemini 2.5 Pro/Flash
- **Groq**: Llama 4 Maverick, Llama 4 Scout, Llama 3.3 70B, Llama 3.1 8B

**Test Scenarios:**
1. Simple prompt without tools (baseline)
2. Web scraping with Firecrawl
3. Web search with Tavily
4. Multi-tool usage
5. Structured output (JSON mode)

### Viewing Test Reports

After running `npm run test:regression:report`, open the generated HTML report:

```
test-reports/
├── model-regression-report.html  # Visual report with charts
├── test-results.json             # Raw test data
└── screenshots/                  # Failure screenshots (if any)
```

The HTML report includes:
- ✅ Pass/fail status for each model
- ⏱️ Execution times
- 📊 Success rate trends
- 🔍 Detailed failure analysis

### Adding New Model Tests

To add a new model to regression testing:

1. Add model to `tests/model-regression.spec.ts`:
   ```typescript
   const models = [
     // ... existing models
     {
       provider: 'anthropic',
       model: 'claude-new-model-id',
       name: 'Claude New Model'
     }
   ];
   ```

2. Ensure API key is configured:
   ```bash
   npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
   ```

3. Run regression tests:
   ```bash
   npm run test:regression
   ```

### CI/CD Integration

The regression tests can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
name: Model Regression Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run test:regression
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: regression-report
          path: test-reports/
```

## Best Practices

### 1. Test Isolation

Each test should be independent:

```typescript
test.beforeEach(async ({ page }) => {
  // Clean state
  await page.goto('http://localhost:3000');
  await page.evaluate(() => localStorage.clear());
});
```

### 2. Waiting for Elements

```typescript
// ✅ Good - wait for element
await page.waitForSelector('.execution-result');
const result = await page.textContent('.execution-result');

// ❌ Bad - race condition
const result = await page.textContent('.execution-result');
```

### 3. Assertions

```typescript
// ✅ Good - specific assertions
await expect(page.locator('.status')).toHaveText('Completed');
await expect(page.locator('.output')).toContainText('success');

// ❌ Bad - generic assertions
const text = await page.textContent('.status');
expect(text).toBeTruthy();
```

## Related Documentation

- [development-setup.md](./development-setup.md) - Dev environment
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Contribution guide
