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
