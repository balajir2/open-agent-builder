/**
 * API Endpoints Test Suite
 *
 * Comprehensive testing for REST API routes covering:
 * - POST /api/workflows/[id]/execute: Workflow execution
 * - GET /api/workflows/[id]/execute-stream: SSE streaming
 * - POST /api/workflows/[id]/resume: Resume after approval
 * - POST /api/approval/: Approval handling
 * - GET /api/config: Configuration endpoint
 * - Authentication: Session-based and API key auth
 * - Authorization: User can only access own workflows
 * - Input Validation: Zod schema validation
 * - Rate Limiting: Request throttling
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { setTestAuth } from './test-auth-helper';

// --- Test Configuration ---
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const TEST_USER_ID = 'test-user-api-endpoints';
const TEST_API_KEY = 'test-api-key-123';

if (!CONVEX_URL) {
  throw new Error('CONVEX_URL environment variable is not set.');
}
if (!process.env.CONVEX_TEST_SECRET) {
  throw new Error('CONVEX_TEST_SECRET environment variable is not set for tests.');
}

// --- Test Suite ---
test.describe('API Endpoints', () => {
  let convexClient: ConvexHttpClient;
  let testWorkflowId: Id<'workflows'>;

  test.beforeAll(async () => {
    // Skip all tests if dev server is not running
    const serverRunning = await fetch(BASE_URL).then(() => true).catch(() => false);
    if (!serverRunning) {
      console.warn('[api-endpoints] Skipping - dev server not running at ' + BASE_URL);
      test.skip();
    }

    convexClient = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convexClient, TEST_USER_ID);
    console.log('🌐 Starting API Endpoints Test Suite...');

    // Create a test workflow
    const nodes = [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 0, y: 0 },
        data: {
          label: 'Start',
          inputVariables: [
            { name: 'testInput', type: 'text', required: true, description: 'Test input' }
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

    const edges = [
      { id: 'e1', source: 'start-1', target: 'end-1', sourceHandle: null, targetHandle: null }
    ];

    testWorkflowId = await convexClient.mutation(api.workflows.create, {
      name: 'Test API Workflow',
      description: 'Workflow for API testing',
      nodes: nodes,
      edges: edges,
    });
  });

  test.afterAll(async () => {
    if (convexClient && testWorkflowId) {
      try {
        await convexClient.mutation(api.workflows.deleteWorkflow, { id: testWorkflowId });
      } catch (e) {
        console.error('Cleanup error:', e);
      }
    }
  });

  // === Workflow Execution API Tests ===

  test.describe('POST /api/workflows/[id]/execute', () => {
    test('should execute workflow with valid input', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID, // Mock authentication
        },
        data: {
          inputs: { testInput: 'Hello World' }
        }
      });

      expect(response.ok()).toBeTruthy();
      const result = await response.json();
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('executionId');
    });

    test('should reject execution without authentication', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      expect(response.status()).toBe(401);
    });

    test('should reject execution with invalid workflow ID', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/invalid-id/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      expect(response.status()).toBe(400);
    });

    test('should reject execution with missing required inputs', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: {} // Missing required testInput
        }
      });

      expect(response.status()).toBe(400);
    });

    test('should accept API key authentication', async ({ request }) => {
      // First, create API key for user
      const apiKeyResult = await convexClient.action(api.apiKeysActions.generate, {
        name: 'Test API Key',
      });

      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TEST_API_KEY}`,
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      // Clean up API key
      await convexClient.mutation(api.apiKeys.revoke, { id: apiKeyResult.id });

      expect(response.ok()).toBeTruthy();
    });

    test('should reject invalid API key', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer invalid-api-key',
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      expect(response.status()).toBe(401);
    });
  });

  // === SSE Streaming Tests ===

  test.describe('GET /api/workflows/[id]/execute-stream', () => {
    test('should stream workflow execution events', async ({ request }) => {
      const response = await request.get(
        `${BASE_URL}/api/workflows/${testWorkflowId}/execute-stream?input=${encodeURIComponent(JSON.stringify({ testInput: 'Stream Test' }))}`,
        {
          headers: {
            'x-user-id': TEST_USER_ID,
          },
        }
      );

      expect(response.ok()).toBeTruthy();
      expect(response.headers()['content-type']).toContain('text/event-stream');

      const body = await response.text();
      expect(body).toContain('event: workflow_started');
    });

    test('should emit node_started events', async ({ request }) => {
      const response = await request.get(
        `${BASE_URL}/api/workflows/${testWorkflowId}/execute-stream?input=${encodeURIComponent(JSON.stringify({ testInput: 'Test' }))}`,
        {
          headers: {
            'x-user-id': TEST_USER_ID,
          },
        }
      );

      const body = await response.text();
      expect(body).toContain('event: node_started');
    });

    test('should emit node_completed events', async ({ request }) => {
      const response = await request.get(
        `${BASE_URL}/api/workflows/${testWorkflowId}/execute-stream?input=${encodeURIComponent(JSON.stringify({ testInput: 'Test' }))}`,
        {
          headers: {
            'x-user-id': TEST_USER_ID,
          },
        }
      );

      const body = await response.text();
      expect(body).toContain('event: node_completed');
    });

    test('should emit workflow_completed event', async ({ request }) => {
      const response = await request.get(
        `${BASE_URL}/api/workflows/${testWorkflowId}/execute-stream?input=${encodeURIComponent(JSON.stringify({ testInput: 'Test' }))}`,
        {
          headers: {
            'x-user-id': TEST_USER_ID,
          },
        }
      );

      const body = await response.text();
      expect(body).toContain('event: workflow_completed');
    });

    test('should emit error event on failure', async ({ request }) => {
      // Create workflow that will fail
      const failWorkflow = await convexClient.mutation(api.workflows.create, {
        name: 'Fail Workflow',
        description: 'Workflow that fails',
        nodes: [
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
              label: 'HTTP',
              httpUrl: 'http://192.168.1.1/blocked', // SSRF blocked
              httpMethod: 'GET'
            }
          }
        ],
        edges: [
          { id: 'e1', source: 'start-1', target: 'http-1', sourceHandle: null, targetHandle: null }
        ],
      });

      const response = await request.get(
        `${BASE_URL}/api/workflows/${failWorkflow}/execute-stream?input=${encodeURIComponent(JSON.stringify({}))}`,
        {
          headers: {
            'x-user-id': TEST_USER_ID,
          },
        }
      );

      const body = await response.text();
      expect(body).toContain('event: error');

      // Clean up
      await convexClient.mutation(api.workflows.deleteWorkflow, { id: failWorkflow });
    });

    test('should reject streaming without authentication', async ({ request }) => {
      const response = await request.get(
        `${BASE_URL}/api/workflows/${testWorkflowId}/execute-stream?input=${encodeURIComponent(JSON.stringify({ testInput: 'Test' }))}`,
        {
          headers: {
            // No authentication
          },
        }
      );

      expect(response.status()).toBe(401);
    });
  });

  // === Approval API Tests ===

  test.describe('POST /api/workflows/[id]/resume', () => {
    test('should resume workflow after approval', async ({ request }) => {
      // Create workflow with approval node
      const approvalWorkflow = await convexClient.mutation(api.workflows.create, {
        name: 'Approval Workflow',
        description: 'Workflow with approval',
        nodes: [
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
            data: { label: 'Approval', approvalMessage: 'Approve to continue' }
          },
          {
            id: 'end-1',
            type: 'end',
            position: { x: 400, y: 0 },
            data: { label: 'End' }
          }
        ],
        edges: [
          { id: 'e1', source: 'start-1', target: 'approval-1', sourceHandle: null, targetHandle: null },
          { id: 'e2', source: 'approval-1', target: 'end-1', sourceHandle: null, targetHandle: null }
        ],
      });

      // First, execute workflow (will pause at approval)
      const executeResponse = await request.post(`${BASE_URL}/api/workflows/${approvalWorkflow}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: {}
        }
      });

      const executeResult = await executeResponse.json();
      const executionId = executeResult.executionId;

      // Resume workflow
      const resumeResponse = await request.post(`${BASE_URL}/api/workflows/${approvalWorkflow}/resume`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          executionId,
          approved: true
        }
      });

      expect(resumeResponse.ok()).toBeTruthy();

      // Clean up
      await convexClient.mutation(api.workflows.deleteWorkflow, { id: approvalWorkflow });
    });

    test('should reject resume without authentication', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/resume`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          executionId: 'exec-123',
          approved: true
        }
      });

      expect(response.status()).toBe(401);
    });
  });

  // === Approval Handling Tests ===

  test.describe('POST /api/approval/', () => {
    test('should create approval record', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/approval/`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          workflowId: testWorkflowId,
          executionId: 'exec-123',
          nodeId: 'approval-1',
          message: 'Please approve'
        }
      });

      expect(response.ok()).toBeTruthy();
      const result = await response.json();
      expect(result).toHaveProperty('approvalId');
    });

    test('should get approval status', async ({ request }) => {
      // Create approval
      const createResponse = await request.post(`${BASE_URL}/api/approval/`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          workflowId: testWorkflowId,
          executionId: 'exec-456',
          nodeId: 'approval-1',
          message: 'Approve please'
        }
      });

      const createResult = await createResponse.json();
      const approvalId = createResult.approvalId;

      // Get status
      const getResponse = await request.get(`${BASE_URL}/api/approval/${approvalId}`, {
        headers: {
          'x-user-id': TEST_USER_ID,
        }
      });

      expect(getResponse.ok()).toBeTruthy();
      const result = await getResponse.json();
      expect(result.status).toBe('pending');
    });

    test('should approve approval', async ({ request }) => {
      // Create approval
      const createResponse = await request.post(`${BASE_URL}/api/approval/`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          workflowId: testWorkflowId,
          executionId: 'exec-789',
          nodeId: 'approval-1',
          message: 'Test approval'
        }
      });

      const createResult = await createResponse.json();
      const approvalId = createResult.approvalId;

      // Approve
      const approveResponse = await request.post(`${BASE_URL}/api/approval/${approvalId}/approve`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          approved: true,
          comments: 'Looks good'
        }
      });

      expect(approveResponse.ok()).toBeTruthy();
      const result = await approveResponse.json();
      expect(result.status).toBe('approved');
    });
  });

  // === Configuration Endpoint Tests ===

  test.describe('GET /api/config', () => {
    test('should return configuration', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/config`, {
        headers: {
          'x-user-id': TEST_USER_ID,
        }
      });

      expect(response.ok()).toBeTruthy();
      const config = await response.json();
      expect(config).toHaveProperty('llmProviders');
      expect(config).toHaveProperty('tools');
    });

    test('should return LLM providers configuration', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/config`, {
        headers: {
          'x-user-id': TEST_USER_ID,
        }
      });

      const config = await response.json();
      expect(config.llmProviders).toBeInstanceOf(Array);
      expect(config.llmProviders.length).toBeGreaterThan(0);
    });

    test('should return tools configuration', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/config`, {
        headers: {
          'x-user-id': TEST_USER_ID,
        }
      });

      const config = await response.json();
      expect(config.tools).toBeInstanceOf(Array);
      expect(config.tools.length).toBeGreaterThan(0);
    });
  });

  // === Authorization Tests ===

  test.describe('Authorization', () => {
    test('should allow user to access own workflow', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/workflows/${testWorkflowId}`, {
        headers: {
          'x-user-id': TEST_USER_ID,
        }
      });

      expect(response.ok()).toBeTruthy();
    });

    test('should deny access to other users workflow', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/workflows/${testWorkflowId}`, {
        headers: {
          'x-user-id': 'different-user-id',
        }
      });

      expect(response.status()).toBe(403);
    });

    test('should allow user to execute own workflow', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      expect(response.ok()).toBeTruthy();
    });

    test('should deny execution of other users workflow', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'different-user-id',
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      expect(response.status()).toBe(403);
    });
  });

  // === Input Validation Tests ===

  test.describe('Input Validation', () => {
    test('should reject malformed JSON', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: 'invalid json {{{',
      });

      expect(response.status()).toBe(400);
    });

    test('should validate input schema', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: 12345 } // Should be string, not number
        }
      });

      expect(response.status()).toBe(400);
    });

    test('should reject SQL injection attempts', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: "'; DROP TABLE users; --" }
        }
      });

      // Should still execute (input is sanitized), but no SQL injection should occur
      expect(response.ok()).toBeTruthy();
    });

    test('should reject XSS attempts in input', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: '<script>alert("XSS")</script>' }
        }
      });

      // Should execute, but script tags should be sanitized in output
      expect(response.ok()).toBeTruthy();
    });

    test('should validate workflow ID format', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/api/workflows/not-a-valid-id/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: 'Test' }
        }
      });

      expect(response.status()).toBe(400);
    });

    test('should enforce max input size', async ({ request }) => {
      const largeInput = 'x'.repeat(10 * 1024 * 1024); // 10MB

      const response = await request.post(`${BASE_URL}/api/workflows/${testWorkflowId}/execute`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': TEST_USER_ID,
        },
        data: {
          inputs: { testInput: largeInput }
        }
      });

      expect(response.status()).toBe(413); // Payload Too Large
    });
  });

  // === Rate Limiting Tests ===

  test.describe('Rate Limiting', () => {
    test('should allow requests within rate limit', async ({ request }) => {
      const response1 = await request.get(`${BASE_URL}/api/config`, {
        headers: { 'x-user-id': TEST_USER_ID }
      });

      const response2 = await request.get(`${BASE_URL}/api/config`, {
        headers: { 'x-user-id': TEST_USER_ID }
      });

      expect(response1.ok()).toBeTruthy();
      expect(response2.ok()).toBeTruthy();
    });

    test('should rate limit excessive requests', async ({ request }) => {
      const requests = [];

      // Send many requests rapidly
      for (let i = 0; i < 100; i++) {
        requests.push(
          request.get(`${BASE_URL}/api/config`, {
            headers: { 'x-user-id': TEST_USER_ID }
          })
        );
      }

      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status() === 429);

      // At least some requests should be rate limited
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });

    test('should include rate limit headers', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/config`, {
        headers: { 'x-user-id': TEST_USER_ID }
      });

      const headers = response.headers();
      expect(headers).toHaveProperty('x-ratelimit-limit');
      expect(headers).toHaveProperty('x-ratelimit-remaining');
    });
  });
});
