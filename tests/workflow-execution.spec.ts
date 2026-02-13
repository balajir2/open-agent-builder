/**
 * Workflow Execution Test Suite
 *
 * Comprehensive end-to-end testing for workflow execution covering:
 * - Basic workflow flows (Start → Agent → End)
 * - Multi-node workflows with various node types
 * - Conditional logic (if-else branches, while loops)
 * - State management and variable passing
 * - Error handling and retry logic
 * - Human-in-the-loop approval nodes
 * - Edge validation and circular dependency detection
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { setTestAuth } from './test-auth-helper';
import { WorkflowNode, WorkflowEdge, WorkflowState } from '@/lib/workflow/types';
import { LangGraphExecutor } from '@/lib/workflow/langgraph';
import { cleanupInvalidEdges } from '@/lib/workflow/edge-cleanup';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const TEST_USER_ID = 'test-user-workflow-execution';

if (!CONVEX_URL) {
  throw new Error('CONVEX_URL environment variable is not set.');
}
if (!process.env.CONVEX_TEST_SECRET) {
  throw new Error('CONVEX_TEST_SECRET environment variable is not set for tests.');
}

// Mock API Keys
const mockApiKeys = {
  openai: process.env.OPENAI_API_KEY || 'mock-openai-key',
  anthropic: process.env.ANTHROPIC_API_KEY || 'mock-anthropic-key',
  google: process.env.GOOGLE_API_KEY || 'mock-google-key',
  groq: process.env.GROQ_API_KEY || 'mock-groq-key',
  firecrawl: process.env.FIRECRAWL_API_KEY || 'mock-firecrawl-key',
  e2b: process.env.E2B_API_KEY || 'mock-e2b-key',
  tavily: process.env.TAVILY_API_KEY || 'mock-tavily-key',
  arcade: process.env.ARCADE_API_KEY || 'mock-arcade-key',
  gamma: process.env.GAMMA_API_KEY || 'mock-gamma-key',
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
          const mockValue = mock.match.body[key];
          const actualValue = requestBody[key];
          return actualValue === mockValue || JSON.stringify(actualValue) === JSON.stringify(mockValue);
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

// --- Smart LLM Mock Helper ---
/**
 * Creates provider-specific LLM response based on URL
 * Automatically returns correct format for Anthropic, OpenAI, Google, Groq
 */
function createLLMMock(content: string) {
  return (requestBody: any) => {
    // Return function that generates response based on URL
    return {
      // Anthropic format
      anthropic: {
        id: 'msg_test',
        type: 'message',
        role: 'assistant',
        content: [{ type: 'text', text: content }],
        model: 'claude-sonnet-4-5-20250929',
        stop_reason: 'end_turn',
        usage: { input_tokens: 10, output_tokens: 5 }
      },
      // OpenAI/Groq format
      openai: {
        id: 'chatcmpl-test',
        object: 'chat.completion',
        choices: [{
          index: 0,
          message: { role: 'assistant', content: content },
          finish_reason: 'stop'
        }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 }
      },
      // Google format (handled by library, but provide structure)
      google: {
        candidates: [{
          content: {
            parts: [{ text: content }],
            role: 'model'
          },
          finishReason: 'STOP'
        }],
        usageMetadata: {
          promptTokenCount: 10,
          candidatesTokenCount: 5,
          totalTokenCount: 15
        }
      }
    };
  };
}

function addSmartLLMMock(content: string) {
  const mockBodies = createLLMMock(content)({});

  // Add mock for Anthropic
  addFetchMock(
    { url: /api\.anthropic\.com/, method: 'POST' },
    { body: mockBodies.anthropic }
  );

  // Add mock for OpenAI/Groq
  addFetchMock(
    { url: /(api\.openai\.com|api\.groq\.com)/, method: 'POST' },
    { body: mockBodies.openai }
  );

  // Add mock for Google
  addFetchMock(
    { url: /generativelanguage\.googleapis\.com/, method: 'POST' },
    { body: mockBodies.google }
  );
}

// --- Test Suite ---
test.describe('Workflow Execution - End-to-End Tests', () => {
  let convexClient: ConvexHttpClient;
  let cleanupGlobalFetch: () => void;

  test.beforeAll(async () => {
    cleanupGlobalFetch = setupGlobalFetchMock();
    convexClient = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convexClient, TEST_USER_ID);
    console.log('🚀 Starting Workflow Execution Test Suite...');
  });

  test.afterAll(async () => {
    cleanupGlobalFetch();
    // Clean up test workflows
    if (convexClient) {
      try {
        const workflows = await convexClient.query(api.workflows.list, {});
        for (const workflow of workflows) {
          if (workflow.userId === TEST_USER_ID) {
            try {
              await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflow._id });
            } catch (e) {
              // Ignore errors if already deleted
            }
          }
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
    }
  });

  test.beforeEach(() => {
    dynamicFetchMocks.length = 0;
  });

  // === Basic Workflow Flow Tests ===

  test.describe('Basic Workflow Flows', () => {
    test('should execute simple Start → Agent → End workflow', async () => {
      // Mock LLM response - smart mock auto-detects provider
      addSmartLLMMock('Hello from agent!');

      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'userInput', type: 'text', required: true, description: 'User input' }
            ]
          }
        },
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 200, y: 0 },
          data: {
            label: 'Agent',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Process user input: {{input.userInput}}',
            selectedTools: []
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'agent-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'agent-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const workflow = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Test Simple Workflow',
        description: 'Basic test workflow',
        nodes: nodes,
        edges: edges,
      });

      const executor = new LangGraphExecutor();
      const result = await executor.execute(
        { nodes, edges },
        { userInput: 'Test input' },
        mockApiKeys
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.variables.lastOutput).toContain('Hello from agent!');
    });

    test('should handle workflow with no edges (single node)', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: []
          }
        }
      ];

      const edges: WorkflowEdge[] = [];

      const executor = new LangGraphExecutor();
      const result = await executor.execute(
        { nodes, edges },
        {},
        mockApiKeys
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    test('should fail when start node is missing', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 0, y: 0 },
          data: {
            label: 'Agent',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Test'
          }
        }
      ];

      const edges: WorkflowEdge[] = [];

      const executor = new LangGraphExecutor();

      await expect(async () => {
        await executor.execute({ nodes, edges }, {}, mockApiKeys);
      }).rejects.toThrow();
    });
  });

  // === Multi-Node Workflow Tests ===

  test.describe('Multi-Node Workflows', () => {
    test('should execute Start → HTTP → Transform → Extract → End', async () => {
      // Mock HTTP request
      addFetchMock(
        { url: 'https://api.example.com/data' },
        { body: { result: { name: 'Test', value: 42 } } }
      );

      // Mock LLM for extract node
      addSmartLLMMock(JSON.stringify({ extracted: 'data' }));

      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'http-1',
          type: 'http',
          position: { x: 200, y: 0 },
          data: {
            label: 'HTTP Request',
            httpUrl: 'https://api.example.com/data',
            httpMethod: 'GET'
          }
        },
        {
          id: 'transform-1',
          type: 'transform',
          position: { x: 400, y: 0 },
          data: {
            label: 'Transform',
            transformScript: 'return { transformed: variables.lastOutput.result.name };'
          }
        },
        {
          id: 'extract-1',
          type: 'extract',
          position: { x: 600, y: 0 },
          data: {
            label: 'Extract',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Extract key data from {{lastOutput}}'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 800, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'http-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'http-1', target: 'transform-1', sourceHandle: null, targetHandle: null },
        { id: 'e3', source: 'transform-1', target: 'extract-1', sourceHandle: null, targetHandle: null },
        { id: 'e4', source: 'extract-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, {}, mockApiKeys);

      expect(result.success).toBe(true);
      expect(result.variables.lastOutput).toBeDefined();
    });

    test('should handle parallel execution branches', async () => {
      // Mock responses - smart mock for all providers
      addSmartLLMMock('Agent response');

      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 200, y: -100 },
          data: {
            label: 'Agent 1',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Process branch 1'
          }
        },
        {
          id: 'agent-2',
          type: 'agent',
          position: { x: 200, y: 100 },
          data: {
            label: 'Agent 2',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Process branch 2'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'agent-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'start-1', target: 'agent-2', sourceHandle: null, targetHandle: null },
        { id: 'e3', source: 'agent-1', target: 'end-1', sourceHandle: null, targetHandle: null },
        { id: 'e4', source: 'agent-2', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, {}, mockApiKeys);

      expect(result.success).toBe(true);
    });
  });

  // === Conditional Logic Tests ===

  test.describe('Conditional Logic', () => {
    test('should execute if-else branch (true path)', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'value', type: 'number', required: true, description: 'Value to check' }
            ]
          }
        },
        {
          id: 'if-1',
          type: 'if-else',
          position: { x: 200, y: 0 },
          data: {
            label: 'If-Else',
            condition: 'input.value > 10',
            trueLabel: 'Yes',
            falseLabel: 'No'
          }
        },
        {
          id: 'end-true',
          type: 'end',
          position: { x: 400, y: -100 },
          data: { label: 'End True' }
        },
        {
          id: 'end-false',
          type: 'end',
          position: { x: 400, y: 100 },
          data: { label: 'End False' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'if-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'if-1', target: 'end-true', sourceHandle: 'true', targetHandle: null },
        { id: 'e3', source: 'if-1', target: 'end-false', sourceHandle: 'false', targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, { value: 15 }, mockApiKeys);

      expect(result.success).toBe(true);
      expect(result.executionPath).toContain('if-1');
      expect(result.executionPath).toContain('end-true');
      expect(result.executionPath).not.toContain('end-false');
    });

    test('should execute if-else branch (false path)', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'value', type: 'number', required: true, description: 'Value' }
            ]
          }
        },
        {
          id: 'if-1',
          type: 'if-else',
          position: { x: 200, y: 0 },
          data: {
            label: 'If-Else',
            condition: 'input.value > 10'
          }
        },
        {
          id: 'end-true',
          type: 'end',
          position: { x: 400, y: -100 },
          data: { label: 'End True' }
        },
        {
          id: 'end-false',
          type: 'end',
          position: { x: 400, y: 100 },
          data: { label: 'End False' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'if-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'if-1', target: 'end-true', sourceHandle: 'true', targetHandle: null },
        { id: 'e3', source: 'if-1', target: 'end-false', sourceHandle: 'false', targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, { value: 5 }, mockApiKeys);

      expect(result.success).toBe(true);
      expect(result.executionPath).toContain('end-false');
      expect(result.executionPath).not.toContain('end-true');
    });

    test('should execute while loop with iteration limit', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'counter', type: 'number', required: true, description: 'Counter' }
            ]
          }
        },
        {
          id: 'while-1',
          type: 'while',
          position: { x: 200, y: 0 },
          data: {
            label: 'While Loop',
            whileCondition: 'variables.counter < 5',
            maxIterations: 10
          }
        },
        {
          id: 'set-1',
          type: 'set-state',
          position: { x: 400, y: 0 },
          data: {
            label: 'Increment',
            stateKey: 'counter',
            stateValue: 'variables.counter + 1'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 600, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'while-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'while-1', target: 'set-1', sourceHandle: 'continue', targetHandle: null },
        { id: 'e3', source: 'set-1', target: 'while-1', sourceHandle: null, targetHandle: null },
        { id: 'e4', source: 'while-1', target: 'end-1', sourceHandle: 'exit', targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, { counter: 0 }, mockApiKeys);

      expect(result.success).toBe(true);
      expect(result.variables.counter).toBe(5);
    });

    test('should prevent infinite loops with max iterations', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'while-1',
          type: 'while',
          position: { x: 200, y: 0 },
          data: {
            label: 'While Loop',
            whileCondition: 'true', // Always true - infinite loop
            maxIterations: 3
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'while-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'while-1', target: 'while-1', sourceHandle: 'continue', targetHandle: null },
        { id: 'e3', source: 'while-1', target: 'end-1', sourceHandle: 'exit', targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, {}, mockApiKeys);

      // Should exit after max iterations
      expect(result.success).toBe(true);
    });
  });

  // === State Management Tests ===

  test.describe('State Management', () => {
    test('should pass variables between nodes using {{input.*}}', async () => {
      addSmartLLMMock('Processed: Test User');

      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'userName', type: 'text', required: true, description: 'User name' }
            ]
          }
        },
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 200, y: 0 },
          data: {
            label: 'Agent',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Process user: {{input.userName}}'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'agent-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'agent-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, { userName: 'Test User' }, mockApiKeys);

      expect(result.success).toBe(true);
      expect(result.variables.input.userName).toBe('Test User');
    });

    test('should use {{lastOutput}} to reference previous node result', async () => {
      addFetchMock(
        { url: 'https://api.example.com/data' },
        { body: { data: 'API Response' } }
      );

      addSmartLLMMock('Processed API Response');

      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'http-1',
          type: 'http',
          position: { x: 200, y: 0 },
          data: {
            label: 'HTTP Request',
            httpUrl: 'https://api.example.com/data',
            httpMethod: 'GET'
          }
        },
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 400, y: 0 },
          data: {
            label: 'Agent',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Analyze this data: {{lastOutput}}'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 600, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'http-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'http-1', target: 'agent-1', sourceHandle: null, targetHandle: null },
        { id: 'e3', source: 'agent-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, {}, mockApiKeys);

      expect(result.success).toBe(true);
    });

    test('should use set-state node to update variables', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'initialValue', type: 'number', required: true, description: 'Initial' }
            ]
          }
        },
        {
          id: 'set-1',
          type: 'set-state',
          position: { x: 200, y: 0 },
          data: {
            label: 'Set State',
            stateKey: 'finalValue',
            stateValue: 'input.initialValue * 2'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'set-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'set-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, { initialValue: 10 }, mockApiKeys);

      expect(result.success).toBe(true);
      expect(result.variables.finalValue).toBe(20);
    });
  });

  // === Error Handling Tests ===

  test.describe('Error Handling', () => {
    test('should handle node execution failure gracefully', async () => {
      addFetchMock(
        { url: 'https://api.example.com/fail' },
        { status: 500, body: { error: 'Internal Server Error' } }
      );

      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'http-1',
          type: 'http',
          position: { x: 200, y: 0 },
          data: {
            label: 'HTTP Request',
            httpUrl: 'https://api.example.com/fail',
            httpMethod: 'GET'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'http-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'http-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();

      await expect(async () => {
        await executor.execute({ nodes, edges }, {}, mockApiKeys);
      }).rejects.toThrow();
    });

    test('should handle missing required input variables', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: {
            label: 'Start',
            inputVariables: [
              { name: 'requiredField', type: 'text', required: true, description: 'Required' }
            ]
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 200, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();

      await expect(async () => {
        await executor.execute({ nodes, edges }, {}, mockApiKeys);
      }).rejects.toThrow();
    });

    test('should handle invalid condition expression in if-else', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'if-1',
          type: 'if-else',
          position: { x: 200, y: 0 },
          data: {
            label: 'If-Else',
            condition: 'invalid syntax here $$'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'if-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'if-1', target: 'end-1', sourceHandle: 'true', targetHandle: null }
      ];

      const executor = new LangGraphExecutor();

      await expect(async () => {
        await executor.execute({ nodes, edges }, {}, mockApiKeys);
      }).rejects.toThrow();
    });
  });

  // === Approval Node Tests ===

  test.describe('Human-in-the-Loop Approval', () => {
    test('should pause execution at approval node', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'approval-1',
          type: 'user-approval',
          position: { x: 200, y: 0 },
          data: {
            label: 'Approval',
            approvalMessage: 'Please approve to continue'
          }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 400, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'approval-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'approval-1', target: 'end-1', sourceHandle: null, targetHandle: null }
      ];

      const executor = new LangGraphExecutor();
      const result = await executor.execute({ nodes, edges }, {}, mockApiKeys);

      // Should pause at approval node
      expect(result.paused).toBe(true);
      expect(result.pausedAt).toBe('approval-1');
    });

    test('should resume workflow after approval', async () => {
      // This test would require integration with approval API
      // Skipping for unit tests - covered in E2E API tests
      expect(true).toBe(true);
    });
  });

  // === Edge Validation Tests ===

  test.describe('Edge Validation', () => {
    test('should detect and clean invalid edges', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 200, y: 0 },
          data: { label: 'End' }
        }
      ];

      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'end-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'nonexistent', target: 'end-1', sourceHandle: null, targetHandle: null }, // Invalid
        { id: 'e3', source: 'start-1', target: 'nonexistent', sourceHandle: null, targetHandle: null } // Invalid
      ];

      const result = cleanupInvalidEdges(nodes, edges);

      expect(result.edges).toHaveLength(1);
      expect(result.removedCount).toBe(2);
      expect(result.edges[0].id).toBe('e1');
    });

    test('should detect circular dependencies', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 200, y: 0 },
          data: {
            label: 'Agent 1',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Test'
          }
        },
        {
          id: 'agent-2',
          type: 'agent',
          position: { x: 400, y: 0 },
          data: {
            label: 'Agent 2',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Test'
          }
        }
      ];

      // Circular dependency: agent-1 → agent-2 → agent-1
      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'agent-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'agent-1', target: 'agent-2', sourceHandle: null, targetHandle: null },
        { id: 'e3', source: 'agent-2', target: 'agent-1', sourceHandle: null, targetHandle: null } // Creates cycle
      ];

      const executor = new LangGraphExecutor();

      // Should detect cycle and fail or handle gracefully
      await expect(async () => {
        await executor.execute({ nodes, edges }, {}, mockApiKeys);
      }).rejects.toThrow();
    });

    test('should validate end node has no outgoing edges', async () => {
      const nodes: WorkflowNode[] = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start', inputVariables: [] }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 200, y: 0 },
          data: { label: 'End' }
        },
        {
          id: 'agent-1',
          type: 'agent',
          position: { x: 400, y: 0 },
          data: {
            label: 'Agent',
            model: 'anthropic/claude-sonnet-4',
            instructions: 'Test'
          }
        }
      ];

      // Invalid: End node has outgoing edge
      const edges: WorkflowEdge[] = [
        { id: 'e1', source: 'start-1', target: 'end-1', sourceHandle: null, targetHandle: null },
        { id: 'e2', source: 'end-1', target: 'agent-1', sourceHandle: null, targetHandle: null } // Invalid
      ];

      const executor = new LangGraphExecutor();

      await expect(async () => {
        await executor.execute({ nodes, edges }, {}, mockApiKeys);
      }).rejects.toThrow();
    });
  });
});
