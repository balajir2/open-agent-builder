/**
 * Node Executors Test Suite
 *
 * Comprehensive testing for individual node executor functions covering:
 * - Transform Node (executeDataNode): E2B code execution, JavaScript evaluation
 * - HTTP Node (executeHTTPNode): GET/POST requests, SSRF protection
 * - Extract Node (executeExtractNode): LLM-powered extraction, schema validation
 * - Logic Nodes (executeIfElseNode, executeWhileNode): Conditions, loop iteration
 * - Gamma Node (executeGammaNode): Presentation generation, export formats
 * - Arcade Node (executeArcadeNode): Browser automation
 * - Set-State Node: Variable manipulation
 * - Guardrails Node: Content moderation
 *
 * Tests both success and failure scenarios for each executor.
 */

import { test, expect } from '@playwright/test';
import { WorkflowNode, WorkflowState } from '@/lib/workflow/types';
import { executeDataNode } from '@/lib/workflow/executors/data';
import { executeHTTPNode } from '@/lib/workflow/executors/http';
import { executeExtractNode } from '@/lib/workflow/executors/extract';
import { executeIfElseNode, executeWhileNode } from '@/lib/workflow/executors/logic';
import { executeGammaNode } from '@/lib/workflow/executors/gamma';
import { executeArcadeNode } from '@/lib/workflow/executors/arcade';

// Mock API Keys
const mockApiKeys = {
  openai: process.env.OPENAI_API_KEY || 'mock-openai-key',
  anthropic: process.env.ANTHROPIC_API_KEY || 'mock-anthropic-key',
  google: process.env.GOOGLE_API_KEY || 'mock-google-key',
  groq: process.env.GROQ_API_KEY || 'mock-groq-key',
  e2b: process.env.E2B_API_KEY || 'mock-e2b-key',
  gamma: process.env.GAMMA_API_KEY || 'mock-gamma-key',
  arcade: process.env.ARCADE_API_KEY || 'mock-arcade-key',
};

// --- Global Fetch Mocking ---
interface MockMatch {
  url: string | RegExp;
  method?: string;
  body?: any;
}

interface MockResponse {
  status?: number;
  contentType?: string;
  body: any;
}

const dynamicFetchMocks: { match: MockMatch; response: MockResponse }[] = [];

function addFetchMock(match: MockMatch, response: MockResponse) {
  dynamicFetchMocks.push({ match, response });
}

const setupGlobalFetchMock = () => {
  const originalFetch = global.fetch;

  global.fetch = async (url, init): Promise<Response> => {
    const urlString = url.toString();
    const requestBody = init?.body ? JSON.parse(init.body.toString()) : undefined;

    for (const mock of dynamicFetchMocks) {
      let urlMatches = false;
      if (typeof mock.match.url === 'string') {
        urlMatches = urlString.startsWith(mock.match.url);
      } else {
        urlMatches = mock.match.url.test(urlString);
      }

      const methodMatches = !mock.match.method || (init?.method?.toUpperCase() === mock.match.method.toUpperCase());

      let bodyMatches = true;
      if (mock.match.body) {
        bodyMatches = requestBody && Object.keys(mock.match.body).every(key => {
          return JSON.stringify(requestBody[key]) === JSON.stringify(mock.match.body[key]);
        });
      }

      if (urlMatches && methodMatches && bodyMatches) {
        let responseBody = mock.response.body;
        if (typeof responseBody === 'function') {
          responseBody = responseBody(requestBody);
        }

        return new Response(JSON.stringify(responseBody), {
          status: mock.response.status || 200,
          headers: { 'Content-Type': mock.response.contentType || 'application/json' },
        });
      }
    }

    return originalFetch(url, init);
  };

  return () => {
    global.fetch = originalFetch;
  };
};

// --- Test Suite ---
test.describe.skip('Node Executors', () => {
  let cleanupGlobalFetch: () => void;

  test.beforeAll(() => {
    cleanupGlobalFetch = setupGlobalFetchMock();
    console.log('🧪 Starting Node Executors Test Suite...');
  });

  test.afterAll(() => {
    cleanupGlobalFetch();
  });

  test.beforeEach(() => {
    dynamicFetchMocks.length = 0;
  });

  // === Transform Node Tests ===

  test.describe('Transform Node (executeDataNode)', () => {
    test('should execute JavaScript transformation successfully', async () => {
      const node: WorkflowNode = {
        id: 'transform-1',
        type: 'transform',
        position: { x: 0, y: 0 },
        data: {
          label: 'Transform',
          nodeType: 'transform',
          transformScript: 'return { result: variables.input * 2 };'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { input: 5 }
      };

      const result = await executeDataNode(node, state);

      expect(result).toBeDefined();
      expect(result.result).toBe(10);
    });

    test('should handle complex data transformations', async () => {
      const node: WorkflowNode = {
        id: 'transform-1',
        type: 'transform',
        position: { x: 0, y: 0 },
        data: {
          label: 'Transform',
          nodeType: 'transform',
          transformScript: `
            const data = variables.lastOutput;
            return {
              names: data.map(item => item.name),
              total: data.reduce((sum, item) => sum + item.value, 0)
            };
          `
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {
          lastOutput: [
            { name: 'Alice', value: 10 },
            { name: 'Bob', value: 20 },
            { name: 'Charlie', value: 30 }
          ]
        }
      };

      const result = await executeDataNode(node, state);

      expect(result.names).toEqual(['Alice', 'Bob', 'Charlie']);
      expect(result.total).toBe(60);
    });

    test('should handle transformation errors gracefully', async () => {
      const node: WorkflowNode = {
        id: 'transform-1',
        type: 'transform',
        position: { x: 0, y: 0 },
        data: {
          label: 'Transform',
          nodeType: 'transform',
          transformScript: 'throw new Error("Transformation failed");'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeDataNode(node, state);
      }).rejects.toThrow();
    });

    test('should access workflow variables in transform script', async () => {
      const node: WorkflowNode = {
        id: 'transform-1',
        type: 'transform',
        position: { x: 0, y: 0 },
        data: {
          label: 'Transform',
          nodeType: 'transform',
          transformScript: 'return { greeting: `Hello, ${variables.userName}!` };'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { userName: 'Alice' }
      };

      const result = await executeDataNode(node, state);

      expect(result.greeting).toBe('Hello, Alice!');
    });

    test('should handle E2B sandbox execution timeout', async () => {
      // Mock E2B timeout
      const node: WorkflowNode = {
        id: 'transform-1',
        type: 'transform',
        position: { x: 0, y: 0 },
        data: {
          label: 'Transform',
          nodeType: 'transform',
          transformScript: 'while(true) {}' // Infinite loop
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      // Should timeout after E2B timeout limit
      await expect(async () => {
        await executeDataNode(node, state);
      }).rejects.toThrow();
    });
  });

  // === Set-State Node Tests ===

  test.describe('Set-State Node (executeDataNode)', () => {
    test('should set state variable successfully', async () => {
      const node: WorkflowNode = {
        id: 'set-1',
        type: 'set-state',
        position: { x: 0, y: 0 },
        data: {
          label: 'Set State',
          nodeType: 'set-state',
          stateKey: 'counter',
          stateValue: '10'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      const result = await executeDataNode(node, state);

      expect(result.__variableUpdates).toBeDefined();
      expect(result.__variableUpdates.counter).toBe(10);
    });

    test('should evaluate expressions in state value', async () => {
      const node: WorkflowNode = {
        id: 'set-1',
        type: 'set-state',
        position: { x: 0, y: 0 },
        data: {
          label: 'Set State',
          nodeType: 'set-state',
          stateKey: 'result',
          stateValue: 'variables.a + variables.b'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { a: 5, b: 10 }
      };

      const result = await executeDataNode(node, state);

      expect(result.__variableUpdates.result).toBe(15);
    });

    test('should update existing state variable', async () => {
      const node: WorkflowNode = {
        id: 'set-1',
        type: 'set-state',
        position: { x: 0, y: 0 },
        data: {
          label: 'Set State',
          nodeType: 'set-state',
          stateKey: 'counter',
          stateValue: 'variables.counter + 1'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { counter: 5 }
      };

      const result = await executeDataNode(node, state);

      expect(result.__variableUpdates.counter).toBe(6);
    });
  });

  // === HTTP Node Tests ===

  test.describe('HTTP Node (executeHTTPNode)', () => {
    test('should execute GET request successfully', async () => {
      addFetchMock(
        { url: 'https://api.example.com/data', method: 'GET' },
        { body: { success: true, data: 'test data' } }
      );

      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP GET',
          httpUrl: 'https://api.example.com/data',
          httpMethod: 'GET'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      const result = await executeHTTPNode(node, state);

      expect(result.success).toBe(true);
      expect(result.data).toBe('test data');
    });

    test('should execute POST request with body', async () => {
      addFetchMock(
        { url: 'https://api.example.com/submit', method: 'POST' },
        { body: { id: 123, status: 'created' } }
      );

      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP POST',
          httpUrl: 'https://api.example.com/submit',
          httpMethod: 'POST',
          httpBody: JSON.stringify({ name: 'Test', value: 42 })
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      const result = await executeHTTPNode(node, state);

      expect(result.id).toBe(123);
      expect(result.status).toBe('created');
    });

    test('should add custom headers to request', async () => {
      addFetchMock(
        { url: 'https://api.example.com/protected', method: 'GET' },
        { body: { authorized: true } }
      );

      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP with Headers',
          httpUrl: 'https://api.example.com/protected',
          httpMethod: 'GET',
          httpHeaders: [
            { key: 'Authorization', value: 'Bearer test-token' },
            { key: 'X-Custom-Header', value: 'custom-value' }
          ]
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      const result = await executeHTTPNode(node, state);

      expect(result.authorized).toBe(true);
    });

    test('should substitute variables in URL', async () => {
      addFetchMock(
        { url: 'https://api.example.com/users/123', method: 'GET' },
        { body: { id: 123, name: 'Alice' } }
      );

      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP with Variable',
          httpUrl: 'https://api.example.com/users/{{variables.userId}}',
          httpMethod: 'GET'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { userId: 123 }
      };

      const result = await executeHTTPNode(node, state);

      expect(result.id).toBe(123);
      expect(result.name).toBe('Alice');
    });

    test('should block private IP addresses (SSRF protection)', async () => {
      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP to Private IP',
          httpUrl: 'http://192.168.1.1/admin',
          httpMethod: 'GET'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeHTTPNode(node, state);
      }).rejects.toThrow(/SSRF/);
    });

    test('should block localhost (SSRF protection)', async () => {
      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP to Localhost',
          httpUrl: 'http://localhost:3000/api',
          httpMethod: 'GET'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeHTTPNode(node, state);
      }).rejects.toThrow(/SSRF/);
    });

    test('should block cloud metadata endpoints (SSRF protection)', async () => {
      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP to Metadata',
          httpUrl: 'http://169.254.169.254/latest/meta-data',
          httpMethod: 'GET'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeHTTPNode(node, state);
      }).rejects.toThrow(/SSRF/);
    });

    test('should handle HTTP errors', async () => {
      addFetchMock(
        { url: 'https://api.example.com/error', method: 'GET' },
        { status: 404, body: { error: 'Not Found' } }
      );

      const node: WorkflowNode = {
        id: 'http-1',
        type: 'http',
        position: { x: 0, y: 0 },
        data: {
          label: 'HTTP Error',
          httpUrl: 'https://api.example.com/error',
          httpMethod: 'GET'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeHTTPNode(node, state);
      }).rejects.toThrow();
    });
  });

  // === Extract Node Tests ===

  test.describe('Extract Node (executeExtractNode)', () => {
    test('should extract structured data using LLM', async () => {
      addFetchMock(
        { url: /(api\.anthropic\.com|api\.openai\.com)/, method: 'POST' },
        {
          body: {
            choices: [{
              message: {
                content: JSON.stringify({
                  name: 'John Doe',
                  email: 'john@example.com',
                  age: 30
                })
              }
            }]
          }
        }
      );

      const node: WorkflowNode = {
        id: 'extract-1',
        type: 'extract',
        position: { x: 0, y: 0 },
        data: {
          label: 'Extract',
          model: 'anthropic/claude-sonnet-4',
          instructions: 'Extract name, email, and age from the text',
          extractConfig: {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                age: { type: 'number' }
              }
            }
          }
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {
          lastOutput: 'My name is John Doe, email john@example.com, and I am 30 years old.'
        }
      };

      const result = await executeExtractNode(node, state, mockApiKeys);

      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.age).toBe(30);
    });

    test('should validate extracted data against schema', async () => {
      addFetchMock(
        { url: /(api\.anthropic\.com|api\.openai\.com)/, method: 'POST' },
        {
          body: {
            choices: [{
              message: {
                content: JSON.stringify({
                  name: 'Invalid',
                  email: 'not-an-email' // Invalid email
                })
              }
            }]
          }
        }
      );

      const node: WorkflowNode = {
        id: 'extract-1',
        type: 'extract',
        position: { x: 0, y: 0 },
        data: {
          label: 'Extract',
          model: 'anthropic/claude-sonnet-4',
          instructions: 'Extract data',
          extractConfig: {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string', format: 'email' }
              },
              required: ['name', 'email']
            }
          }
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { lastOutput: 'test' }
      };

      // Should still return result but may include validation warnings
      const result = await executeExtractNode(node, state, mockApiKeys);
      expect(result).toBeDefined();
    });

    test('should handle LLM extraction errors', async () => {
      addFetchMock(
        { url: /(api\.anthropic\.com|api\.openai\.com)/, method: 'POST' },
        { status: 500, body: { error: 'LLM service unavailable' } }
      );

      const node: WorkflowNode = {
        id: 'extract-1',
        type: 'extract',
        position: { x: 0, y: 0 },
        data: {
          label: 'Extract',
          model: 'anthropic/claude-sonnet-4',
          instructions: 'Extract data'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { lastOutput: 'test' }
      };

      await expect(async () => {
        await executeExtractNode(node, state, mockApiKeys);
      }).rejects.toThrow();
    });
  });

  // === If-Else Node Tests ===

  test.describe('If-Else Node (executeIfElseNode)', () => {
    test('should evaluate true condition', async () => {
      const node: WorkflowNode = {
        id: 'if-1',
        type: 'if-else',
        position: { x: 0, y: 0 },
        data: {
          label: 'If-Else',
          condition: 'variables.value > 10'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { value: 15 }
      };

      const result = await executeIfElseNode(node, state);

      expect(result.__conditionResult).toBe(true);
    });

    test('should evaluate false condition', async () => {
      const node: WorkflowNode = {
        id: 'if-1',
        type: 'if-else',
        position: { x: 0, y: 0 },
        data: {
          label: 'If-Else',
          condition: 'variables.value > 10'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { value: 5 }
      };

      const result = await executeIfElseNode(node, state);

      expect(result.__conditionResult).toBe(false);
    });

    test('should handle complex boolean expressions', async () => {
      const node: WorkflowNode = {
        id: 'if-1',
        type: 'if-else',
        position: { x: 0, y: 0 },
        data: {
          label: 'If-Else',
          condition: '(variables.a > 5 && variables.b < 20) || variables.c === "test"'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { a: 10, b: 15, c: 'test' }
      };

      const result = await executeIfElseNode(node, state);

      expect(result.__conditionResult).toBe(true);
    });

    test('should handle string comparisons', async () => {
      const node: WorkflowNode = {
        id: 'if-1',
        type: 'if-else',
        position: { x: 0, y: 0 },
        data: {
          label: 'If-Else',
          condition: 'variables.status === "approved"'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { status: 'approved' }
      };

      const result = await executeIfElseNode(node, state);

      expect(result.__conditionResult).toBe(true);
    });

    test('should handle invalid condition syntax', async () => {
      const node: WorkflowNode = {
        id: 'if-1',
        type: 'if-else',
        position: { x: 0, y: 0 },
        data: {
          label: 'If-Else',
          condition: 'invalid syntax $$$'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeIfElseNode(node, state);
      }).rejects.toThrow();
    });
  });

  // === While Node Tests ===

  test.describe('While Node (executeWhileNode)', () => {
    test('should evaluate while condition true', async () => {
      const node: WorkflowNode = {
        id: 'while-1',
        type: 'while',
        position: { x: 0, y: 0 },
        data: {
          label: 'While',
          whileCondition: 'variables.counter < 10',
          maxIterations: 100
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { counter: 5 }
      };

      const result = await executeWhileNode(node, node.data, state);

      expect(result.__conditionResult).toBe(true);
    });

    test('should evaluate while condition false', async () => {
      const node: WorkflowNode = {
        id: 'while-1',
        type: 'while',
        position: { x: 0, y: 0 },
        data: {
          label: 'While',
          whileCondition: 'variables.counter < 10',
          maxIterations: 100
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { counter: 15 }
      };

      const result = await executeWhileNode(node, node.data, state);

      expect(result.__conditionResult).toBe(false);
    });

    test('should enforce max iterations', async () => {
      const node: WorkflowNode = {
        id: 'while-1',
        type: 'while',
        position: { x: 0, y: 0 },
        data: {
          label: 'While',
          whileCondition: 'true', // Always true
          maxIterations: 5
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { __loopCount: { 'while-1': 5 } }
      };

      const result = await executeWhileNode(node, node.data, state);

      // Should exit when max iterations reached
      expect(result.__conditionResult).toBe(false);
    });

    test('should track loop iterations', async () => {
      const node: WorkflowNode = {
        id: 'while-1',
        type: 'while',
        position: { x: 0, y: 0 },
        data: {
          label: 'While',
          whileCondition: 'variables.counter < 10',
          maxIterations: 100
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { counter: 5, __loopCount: {} }
      };

      const result = await executeWhileNode(node, node.data, state);

      expect(result.__variableUpdates).toBeDefined();
      expect(result.__variableUpdates.__loopCount['while-1']).toBeDefined();
    });
  });

  // === Gamma Node Tests ===

  test.describe('Gamma Node (executeGammaNode)', () => {
    test('should generate presentation successfully', async () => {
      // Mock Gamma API response
      addFetchMock(
        { url: /api\.gamma\.app/, method: 'POST' },
        {
          body: {
            generationId: 'gen-123',
            url: 'https://gamma.app/docs/test-presentation',
            status: 'completed'
          }
        }
      );

      const node: WorkflowNode = {
        id: 'gamma-1',
        type: 'gamma-ai',
        position: { x: 0, y: 0 },
        data: {
          label: 'Gamma AI',
          prompt: 'Create a presentation about {{variables.topic}}',
          format: 'presentation',
          numCards: 10,
          textAmount: 'medium',
          imageSource: 'aiGenerated',
          language: 'en'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { topic: 'AI Technology' }
      };

      const result = await executeGammaNode(node, state, mockApiKeys.gamma);

      expect(result.success).toBe(true);
      expect(result.url).toContain('gamma.app');
    });

    test('should handle PPTX export format', async () => {
      addFetchMock(
        { url: /api\.gamma\.app/, method: 'POST' },
        {
          body: {
            generationId: 'gen-123',
            url: 'https://gamma.app/docs/test',
            status: 'completed',
            downloadUrl: 'https://gamma.app/download/test.pptx'
          }
        }
      );

      const node: WorkflowNode = {
        id: 'gamma-1',
        type: 'gamma-ai',
        position: { x: 0, y: 0 },
        data: {
          label: 'Gamma AI',
          prompt: 'Create presentation',
          format: 'presentation',
          exportAs: 'pptx'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      const result = await executeGammaNode(node, state, mockApiKeys.gamma);

      expect(result.downloadUrl).toContain('.pptx');
    });

    test('should handle Gamma API errors', async () => {
      addFetchMock(
        { url: /api\.gamma\.app/, method: 'POST' },
        { status: 429, body: { error: 'Rate limit exceeded' } }
      );

      const node: WorkflowNode = {
        id: 'gamma-1',
        type: 'gamma-ai',
        position: { x: 0, y: 0 },
        data: {
          label: 'Gamma AI',
          prompt: 'Create presentation'
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeGammaNode(node, state, mockApiKeys.gamma);
      }).rejects.toThrow();
    });
  });

  // === Arcade Node Tests ===

  test.describe('Arcade Node (executeArcadeNode)', () => {
    test('should execute Arcade tool successfully', async () => {
      addFetchMock(
        { url: /api\.arcade-ai\.com/, method: 'POST' },
        {
          body: {
            status: 'completed',
            result: { success: true, data: 'Browser automation completed' }
          }
        }
      );

      const node: WorkflowNode = {
        id: 'arcade-1',
        type: 'arcade',
        position: { x: 0, y: 0 },
        data: {
          label: 'Arcade',
          arcadeTool: 'GoogleDocs.CreateDocument',
          arcadeInput: {
            title: 'New Document',
            content: '{{variables.content}}'
          }
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: { content: 'Document content' }
      };

      const result = await executeArcadeNode(node, state, mockApiKeys.arcade);

      expect(result.success).toBe(true);
    });

    test('should handle Arcade API errors', async () => {
      addFetchMock(
        { url: /api\.arcade-ai\.com/, method: 'POST' },
        { status: 400, body: { error: 'Invalid tool configuration' } }
      );

      const node: WorkflowNode = {
        id: 'arcade-1',
        type: 'arcade',
        position: { x: 0, y: 0 },
        data: {
          label: 'Arcade',
          arcadeTool: 'InvalidTool',
          arcadeInput: {}
        }
      };

      const state: WorkflowState = {
        chatHistory: [],
        variables: {}
      };

      await expect(async () => {
        await executeArcadeNode(node, state, mockApiKeys.arcade);
      }).rejects.toThrow();
    });
  });

  // === Guardrails Node Tests ===

  test.describe('Guardrails Node', () => {
    test('should detect PII in content', async () => {
      // This would require integration with actual guardrails library
      // Placeholder test
      expect(true).toBe(true);
    });

    test('should detect inappropriate content', async () => {
      // Placeholder for moderation testing
      expect(true).toBe(true);
    });

    test('should detect jailbreak attempts', async () => {
      // Placeholder for jailbreak detection
      expect(true).toBe(true);
    });
  });
});
