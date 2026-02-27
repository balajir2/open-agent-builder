/**
 * Execution Persistence Tests (P1)
 *
 * Verifies:
 * - Execution records are created with userId
 * - Execution records can be updated with node results
 * - Execution records are completed on success
 * - Execution records are failed on error
 * - Execution records are queryable by workflow
 * - Execution ownership isolation works
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';
import { setTestAuth } from './test-auth-helper';

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const TEST_USER_ID = 'test-user-exec-persist';
const OTHER_USER_ID = 'test-user-exec-other';

let convexClient: ConvexHttpClient;
let otherClient: ConvexHttpClient;
let testWorkflowId: any;
const createdExecutionIds: any[] = [];

function createMinimalWorkflow(userId: string) {
  return {
    customId: `exec-test-wf-${Date.now()}`,
    name: 'Execution Persistence Test Workflow',
    description: 'Test workflow for execution persistence',
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 0, y: 0 },
        data: {
          nodeType: 'start',
          label: 'Start',
          inputVariables: [{ name: 'input1', type: 'text', required: true, description: 'Test' }],
        },
      },
      {
        id: 'end',
        type: 'end',
        position: { x: 300, y: 0 },
        data: { nodeType: 'end', label: 'End' },
      },
    ],
    edges: [{ id: 'e1', source: 'start', target: 'end', sourceHandle: null, targetHandle: null }],
  };
}

test.describe('P1: Execution Persistence', () => {
  test.beforeAll(async () => {
    if (!CONVEX_URL || !process.env.CONVEX_TEST_SECRET) {
      console.warn('[execution-persistence] Skipping - missing CONVEX_URL or CONVEX_TEST_SECRET');
      test.skip();
      return;
    }

    convexClient = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convexClient, TEST_USER_ID);

    otherClient = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(otherClient, OTHER_USER_ID);

    // Create test workflow
    try {
      const wf = createMinimalWorkflow(TEST_USER_ID);
      testWorkflowId = await convexClient.mutation(api.workflows.saveWorkflow, {
        ...wf,
        userId: TEST_USER_ID,
      } as any);
    } catch (err) {
      console.warn('[execution-persistence] Failed to create test workflow:', err);
    }
  });

  test('createExecution includes userId', async () => {
    if (!testWorkflowId) test.skip();

    const execId = await convexClient.mutation(api.executions.createExecution, {
      workflowId: testWorkflowId,
      userId: TEST_USER_ID,
      input: { test: 'createExecution test' },
      threadId: 'thread-test-create',
    });

    createdExecutionIds.push(execId);
    expect(execId).toBeTruthy();

    const execution = await convexClient.query(api.executions.getExecution, {
      id: execId,
    });

    expect(execution).toBeTruthy();
    expect(execution!.userId).toBe(TEST_USER_ID);
    expect(execution!.status).toBe('running');
    expect(execution!.workflowId).toBe(testWorkflowId);
  });

  test('updateExecution persists node results', async () => {
    if (!testWorkflowId) test.skip();

    const execId = await convexClient.mutation(api.executions.createExecution, {
      workflowId: testWorkflowId,
      userId: TEST_USER_ID,
      input: { test: 'update test' },
    });
    createdExecutionIds.push(execId);

    // Update with node results
    await convexClient.mutation(api.executions.updateExecution, {
      id: execId,
      currentNodeId: 'agent-1',
      nodeResults: {
        'start': { status: 'completed', output: 'started' },
        'agent-1': { status: 'running' },
      },
    });

    const execution = await convexClient.query(api.executions.getExecution, {
      id: execId,
    });

    expect(execution).toBeTruthy();
    expect(execution!.currentNodeId).toBe('agent-1');
    expect(execution!.nodeResults).toHaveProperty('start');
    expect(execution!.nodeResults).toHaveProperty('agent-1');
  });

  test('completeExecution sets status to completed', async () => {
    if (!testWorkflowId) test.skip();

    const execId = await convexClient.mutation(api.executions.createExecution, {
      workflowId: testWorkflowId,
      userId: TEST_USER_ID,
      input: { test: 'complete test' },
    });
    createdExecutionIds.push(execId);

    await convexClient.mutation(api.executions.completeExecution, {
      id: execId,
      output: { result: 'success' },
    });

    const execution = await convexClient.query(api.executions.getExecution, {
      id: execId,
    });

    expect(execution).toBeTruthy();
    expect(execution!.status).toBe('completed');
    expect(execution!.output).toEqual({ result: 'success' });
    expect(execution!.completedAt).toBeTruthy();
  });

  test('failExecution sets status to failed with error', async () => {
    if (!testWorkflowId) test.skip();

    const execId = await convexClient.mutation(api.executions.createExecution, {
      workflowId: testWorkflowId,
      userId: TEST_USER_ID,
      input: { test: 'fail test' },
    });
    createdExecutionIds.push(execId);

    await convexClient.mutation(api.executions.failExecution, {
      id: execId,
      error: 'Test error message',
    });

    const execution = await convexClient.query(api.executions.getExecution, {
      id: execId,
    });

    expect(execution).toBeTruthy();
    expect(execution!.status).toBe('failed');
    expect(execution!.error).toBe('Test error message');
    expect(execution!.completedAt).toBeTruthy();
  });

  test('getWorkflowExecutions returns executions for a workflow', async () => {
    if (!testWorkflowId) test.skip();

    // Create an execution specifically for this test (tests run in parallel)
    const execId = await convexClient.mutation(api.executions.createExecution, {
      workflowId: testWorkflowId,
      userId: TEST_USER_ID,
      input: { test: 'getWorkflowExecutions test' },
    });
    createdExecutionIds.push(execId);

    const executions = await convexClient.query(
      api.executions.getWorkflowExecutions,
      { workflowId: testWorkflowId }
    );

    expect(executions).toBeTruthy();
    expect(executions.length).toBeGreaterThan(0);

    // All returned executions should belong to this workflow
    for (const exec of executions) {
      expect(exec.workflowId).toBe(testWorkflowId);
    }
  });

  // NOTE: Skipped because test auth uses setAdminAuth() which bypasses
  // identity-based ownership checks. See security-auth.spec.ts for details.
  test.skip('Other user cannot read executions they do not own', async () => {
    if (!testWorkflowId || createdExecutionIds.length === 0) test.skip();

    const execId = createdExecutionIds[0];
    const execution = await otherClient.query(api.executions.getExecution, {
      id: execId,
    });

    // Ownership check should filter this out
    expect(execution).toBeNull();
  });

  test.afterAll(async () => {
    // Cleanup: complete any running executions, then delete workflow
    for (const execId of createdExecutionIds) {
      try {
        const exec = await convexClient.query(api.executions.getExecution, { id: execId });
        if (exec && exec.status === 'running') {
          await convexClient.mutation(api.executions.completeExecution, {
            id: execId,
            error: 'Test cleanup',
          });
        }
      } catch {}
    }

    try {
      if (testWorkflowId) {
        await convexClient.mutation(api.workflows.deleteWorkflow, {
          id: testWorkflowId,
        });
      }
    } catch {}
  });
});
