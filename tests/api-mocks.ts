/**
 * Centralized API Mocking for Tests
 *
 * This module provides mock responses for all external APIs used by the application.
 * Mocks are activated globally via Playwright fixtures.
 */

import { Page } from '@playwright/test';

/**
 * Mock responses for various external APIs
 */
export const mockResponses = {
  // E2B Code Interpreter API
  e2b: {
    execute: {
      success: {
        status: 200,
        body: {
          results: [{
            type: 'success',
            data: { result: 'mocked execution result' },
            stdout: 'Execution completed',
            stderr: ''
          }]
        }
      },
      error: {
        status: 401,
        body: { error: 'Invalid API key' }
      }
    }
  },

  // Anthropic Claude API
  anthropic: {
    messages: {
      success: {
        status: 200,
        body: {
          id: 'msg_test123',
          type: 'message',
          role: 'assistant',
          content: [{ type: 'text', text: 'Mocked Claude response' }],
          model: 'claude-sonnet-4-5-20250929',
          stop_reason: 'end_turn',
          usage: { input_tokens: 10, output_tokens: 20 }
        }
      }
    }
  },

  // OpenAI API
  openai: {
    chatCompletions: {
      success: {
        status: 200,
        body: {
          id: 'chatcmpl-test123',
          object: 'chat.completion',
          created: Date.now(),
          model: 'gpt-5.2',
          choices: [{
            index: 0,
            message: {
              role: 'assistant',
              content: 'Mocked GPT response'
            },
            finish_reason: 'stop'
          }],
          usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
        }
      }
    }
  },

  // Google Gemini API
  google: {
    generateContent: {
      success: {
        status: 200,
        body: {
          candidates: [{
            content: {
              parts: [{ text: 'Mocked Gemini response' }],
              role: 'model'
            },
            finishReason: 'STOP'
          }],
          usageMetadata: {
            promptTokenCount: 10,
            candidatesTokenCount: 20,
            totalTokenCount: 30
          }
        }
      }
    }
  },

  // Groq API (OpenAI-compatible)
  groq: {
    chatCompletions: {
      success: {
        status: 200,
        body: {
          id: 'chatcmpl-test123',
          object: 'chat.completion',
          created: Date.now(),
          model: 'llama-4-maverick-17b',
          choices: [{
            index: 0,
            message: {
              role: 'assistant',
              content: 'Mocked Groq response'
            },
            finish_reason: 'stop'
          }],
          usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
        }
      }
    }
  },

  // Gamma AI API
  gamma: {
    generate: {
      success: {
        status: 200,
        body: {
          success: true,
          generationId: 'test-gen-123',
          url: 'https://gamma.app/docs/test-123'
        }
      },
      withDownload: {
        status: 200,
        body: {
          success: true,
          generationId: 'test-gen-123',
          url: 'https://gamma.app/docs/test-123',
          downloadUrl: 'https://gamma.app/download/test-123.pptx'
        }
      }
    },
    status: {
      complete: {
        status: 200,
        body: {
          status: 'complete',
          url: 'https://gamma.app/docs/test-123'
        }
      }
    }
  },

  // Arcade AI API
  arcade: {
    execute: {
      success: {
        status: 200,
        body: {
          success: true,
          executionId: 'test-exec-123',
          result: { data: 'mocked arcade result' }
        }
      }
    }
  },

  // Generic HTTP endpoints for testing
  http: {
    get: {
      success: {
        status: 200,
        body: { message: 'Success', data: { test: true } }
      }
    },
    post: {
      success: {
        status: 200,
        body: { message: 'Created', id: 'test-123' }
      }
    }
  }
};

/**
 * Setup API mocks for a Playwright page
 * This intercepts all external API calls and returns mock responses
 */
export async function setupApiMocks(page: Page) {
  // E2B API
  await page.route('**/*/e2b.dev/**', async (route) => {
    const url = route.request().url();
    if (url.includes('/execute') || url.includes('/run')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.e2b.execute.success.body)
      });
    } else {
      await route.continue();
    }
  });

  // Anthropic API
  await page.route('**/api.anthropic.com/**', async (route) => {
    const url = route.request().url();
    if (url.includes('/messages')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.anthropic.messages.success.body)
      });
    } else {
      await route.continue();
    }
  });

  // OpenAI API
  await page.route('**/api.openai.com/**', async (route) => {
    const url = route.request().url();
    if (url.includes('/chat/completions')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.openai.chatCompletions.success.body)
      });
    } else {
      await route.continue();
    }
  });

  // Google Gemini API
  await page.route('**/generativelanguage.googleapis.com/**', async (route) => {
    const url = route.request().url();
    if (url.includes('/generateContent')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.google.generateContent.success.body)
      });
    } else {
      await route.continue();
    }
  });

  // Groq API
  await page.route('**/api.groq.com/**', async (route) => {
    const url = route.request().url();
    if (url.includes('/chat/completions')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.groq.chatCompletions.success.body)
      });
    } else {
      await route.continue();
    }
  });

  // Gamma AI API
  await page.route('**/api.gamma.app/**', async (route) => {
    const url = route.request().url();
    if (url.includes('/generate')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.gamma.generate.success.body)
      });
    } else if (url.includes('/status')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.gamma.status.complete.body)
      });
    } else {
      await route.continue();
    }
  });

  // Arcade AI API
  await page.route('**/api.arcade-ai.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponses.arcade.execute.success.body)
    });
  });

  // Generic test endpoints (api.example.com used in tests)
  await page.route('**/api.example.com/**', async (route) => {
    const method = route.request().method();
    if (method === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.http.get.success.body)
      });
    } else if (method === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponses.http.post.success.body)
      });
    } else {
      await route.continue();
    }
  });
}

/**
 * Enable API mocking for tests that need it
 * Add this to test fixtures or beforeEach hooks
 */
export async function enableApiMocks(page: Page) {
  await setupApiMocks(page);
  console.log('🎭 API mocks enabled for test');
}
