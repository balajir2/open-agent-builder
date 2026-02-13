/**
 * Playwright Test Fixtures
 *
 * Extends Playwright test with custom fixtures that provide:
 * - Automatic API mocking for external services
 * - Pre-configured page with mocks enabled
 * - Test isolation and cleanup
 */

import { test as base, Page } from '@playwright/test';
import { setupApiMocks } from './api-mocks';

type TestFixtures = {
  mockedPage: Page;
};

/**
 * Extended test with API mocking fixture
 *
 * Usage:
 *   import { test, expect } from './fixtures';
 *
 *   test('my test', async ({ mockedPage }) => {
 *     // All external APIs are automatically mocked
 *     await mockedPage.goto('http://localhost:3000');
 *   });
 */
export const test = base.extend<TestFixtures>({
  /**
   * Provides a page with all API mocks pre-configured
   */
  mockedPage: async ({ page }, use) => {
    // Setup API mocks before the test
    await setupApiMocks(page);
    console.log('🎭 API mocks enabled for test');

    // Provide the mocked page to the test
    await use(page);

    // Cleanup happens automatically after test
  },
});

export { expect } from '@playwright/test';
