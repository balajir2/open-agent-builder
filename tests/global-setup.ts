/**
 * Global setup for Playwright tests
 *
 * This file runs before all tests to configure the test environment.
 * It mocks the 'server-only' package to allow importing server-side code in tests.
 * It also sets up global fetch mocking for API calls in server-side tests.
 */

import { FullConfig } from '@playwright/test';
import Module from 'module';

// Store the original require function
const originalRequire = Module.prototype.require;

// Override require to mock 'server-only'
(Module.prototype.require as any) = function (this: any, id: string) {
  // Mock 'server-only' to do nothing in test environment
  if (id === 'server-only') {
    return {}; // Return empty object instead of throwing error
  }

  // Call original require for all other modules
  return originalRequire.apply(this, arguments as any);
};

/**
 * Setup global fetch mocking for server-side API calls
 * This is used by tests that import executors directly
 */
function setupGlobalFetchMocks() {
  const originalFetch = global.fetch;

  // @ts-ignore
  global.fetch = async (url: string | URL | Request, options?: any) => {
    const urlString = typeof url === 'string' ? url : url.toString();

    // Check if E2B_API_KEY is set, if not provide mock
    if (!process.env.E2B_API_KEY && urlString.includes('e2b.dev')) {
      console.log('🎭 Mocking E2B API call (no API key)');
      return new Response(JSON.stringify({
        results: [{ type: 'success', data: { result: 'mocked' }, stdout: '', stderr: '' }]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if LLM API keys are set, if not provide mocks
    if (!process.env.ANTHROPIC_API_KEY && urlString.includes('anthropic.com')) {
      console.log('🎭 Mocking Anthropic API call (no API key)');
      return new Response(JSON.stringify({
        id: 'msg_test',
        type: 'message',
        role: 'assistant',
        content: [{ type: 'text', text: 'Mocked response' }],
        model: 'claude-sonnet-4-5-20250929',
        stop_reason: 'end_turn',
        usage: { input_tokens: 10, output_tokens: 20 }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!process.env.OPENAI_API_KEY && urlString.includes('openai.com')) {
      console.log('🎭 Mocking OpenAI API call (no API key)');
      return new Response(JSON.stringify({
        id: 'chatcmpl-test',
        object: 'chat.completion',
        choices: [{
          index: 0,
          message: { role: 'assistant', content: 'Mocked response' },
          finish_reason: 'stop'
        }],
        usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mock api.example.com (used in tests)
    if (urlString.includes('api.example.com')) {
      console.log('🎭 Mocking api.example.com call');
      return new Response(JSON.stringify({
        message: 'Success',
        data: { test: true }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For all other requests, use original fetch
    return originalFetch(url, options);
  };

  console.log('🎭 Global fetch mocking enabled');
}

/**
 * Setup mock API keys for tests
 * Only sets keys if they're not already in the environment
 */
function setupMockApiKeys() {
  const mockKeys = {
    E2B_API_KEY: 'mock-e2b-key-for-tests',
    ANTHROPIC_API_KEY: 'mock-anthropic-key-for-tests',
    OPENAI_API_KEY: 'mock-openai-key-for-tests',
    GOOGLE_API_KEY: 'mock-google-key-for-tests',
    GROQ_API_KEY: 'mock-groq-key-for-tests',
    GAMMA_API_KEY: 'mock-gamma-key-for-tests',
    ARCADE_API_KEY: 'mock-arcade-key-for-tests',
    FIRECRAWL_API_KEY: 'mock-firecrawl-key-for-tests',
    TAVILY_API_KEY: 'mock-tavily-key-for-tests',
    SERPER_API_KEY: 'mock-serper-key-for-tests',
  };

  for (const [key, value] of Object.entries(mockKeys)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }

  console.log('🔑 Mock API keys configured for tests');
}

async function globalSetup(config: FullConfig) {
  console.log('🔧 Test environment configured: server-only imports enabled');
  setupMockApiKeys();
  setupGlobalFetchMocks();
  return;
}

export default globalSetup;
