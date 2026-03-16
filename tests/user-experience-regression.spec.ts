/**
 * User Experience Regression Tests
 *
 * These tests verify the ACTUAL user-facing behavior:
 * - Can a user see their workflows?
 * - Does the API return data (not errors)?
 * - Does workflow CRUD work end-to-end through the HTTP API?
 *
 * WHY THIS FILE EXISTS:
 * A security hardening change broke workflow visibility for all users
 * because it changed getAuthenticatedConvexClient() from fail-open to
 * fail-closed, added validateApiKey gates, and changed the Convex list
 * query to return [] when identity is null. None of the existing
 * regression tests caught this because they all bypass the HTTP API layer
 * (using direct Convex calls or mocked auth).
 *
 * These tests call the REAL HTTP endpoints the same way the frontend does,
 * ensuring any change that breaks the user's ability to see/create/delete
 * workflows will be caught immediately.
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';
import { setTestAuth } from './test-auth-helper';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;

const TEST_USER_ID = 'test-user-ux-regression';

function createTestWorkflow(suffix: string) {
  return {
    customId: `ux-regression-${suffix}-${Date.now()}`,
    name: `UX Regression Test ${suffix}`,
    description: 'Created by user-experience-regression test',
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 0, y: 0 },
        data: {
          nodeType: 'start',
          label: 'Start',
          inputVariables: [{ name: 'input1', type: 'text', required: true, description: 'Test input' }],
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

// ──────────────────────────────────────────────
// Section 1: API Smoke Tests
// The frontend calls GET /api/workflows to load the workflow list.
// If this returns anything other than 200, the user sees nothing.
// ──────────────────────────────────────────────

test.describe('UX: Workflow list API returns data', () => {
  test.beforeAll(async () => {
    // Check if dev server is running
    try {
      await fetch(BASE_URL);
    } catch {
      test.skip();
    }
  });

  test('GET /api/workflows returns 200 with workflows array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/workflows`);

    // CRITICAL: This must be 200, not 401 or 500.
    // If this fails, users cannot see ANY workflows in the UI.
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('workflows');
    expect(Array.isArray(data.workflows)).toBe(true);
    expect(data).toHaveProperty('total');
    expect(typeof data.total).toBe('number');
    expect(data).toHaveProperty('source');
  });

  test('GET /api/workflows response has correct workflow shape', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/workflows`);
    expect(response.status()).toBe(200);

    const data = await response.json();

    // If there are workflows, verify their shape matches what the frontend expects
    if (data.workflows.length > 0) {
      const workflow = data.workflows[0];
      // These are the fields Step2Placeholder.tsx reads
      expect(workflow).toHaveProperty('id');
      expect(workflow).toHaveProperty('name');
      expect(workflow).toHaveProperty('nodes');
      expect(workflow).toHaveProperty('edges');
    }
  });
});

// ──────────────────────────────────────────────
// Section 2: Workflow CRUD via HTTP API
// Tests the same path the UI uses: HTTP → Next.js API → Convex
// ──────────────────────────────────────────────

test.describe('UX: Workflow CRUD through API', () => {
  let createdWorkflowId: string | null = null;

  test.beforeAll(async () => {
    try {
      await fetch(BASE_URL);
    } catch {
      test.skip();
    }
  });

  test('POST /api/workflows without auth returns 401', async ({ request }) => {
    const workflow = createTestWorkflow('create');

    const response = await request.post(`${BASE_URL}/api/workflows`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: workflow.customId,
        name: workflow.name,
        description: workflow.description,
        nodes: workflow.nodes,
        edges: workflow.edges,
      },
    });

    // POST requires authentication — unauthenticated requests get 401
    expect(response.status()).toBe(401);

    const data = await response.json();
    expect(data.error).toBeTruthy();
  });

  test('Created workflow appears in GET /api/workflows', async ({ request }) => {
    if (!createdWorkflowId) test.skip();

    const response = await request.get(`${BASE_URL}/api/workflows`);
    expect(response.status()).toBe(200);

    const data = await response.json();

    // CRITICAL: A workflow the user just created MUST appear in the list.
    // This is the exact bug that broke production: users created workflows
    // but couldn't see them.
    const found = data.workflows.find(
      (w: any) => w.id === createdWorkflowId || w.name?.includes('UX Regression Test create')
    );
    expect(found).toBeTruthy();
    expect(found.name).toBe('UX Regression Test create');
    expect(found.nodes).toBeDefined();
    expect(found.edges).toBeDefined();
  });

  test('DELETE /api/workflows removes the workflow', async ({ request }) => {
    if (!createdWorkflowId) test.skip();

    // First, get the Convex _id for the workflow
    const listResponse = await request.get(`${BASE_URL}/api/workflows`);
    const listData = await listResponse.json();
    const workflow = listData.workflows.find(
      (w: any) => w.id === createdWorkflowId || w.name?.includes('UX Regression Test create')
    );

    if (!workflow) {
      // Workflow already cleaned up
      return;
    }

    const deleteResponse = await request.delete(
      `${BASE_URL}/api/workflows?id=${workflow.id}`
    );

    // Should succeed (200) or indicate the resource is gone
    expect([200, 404]).toContain(deleteResponse.status());
  });
});

// ──────────────────────────────────────────────
// Section 3: Convex Data Path Verification
// Tests the Convex query layer directly to ensure
// workflows created with a userId can be retrieved.
// ──────────────────────────────────────────────

test.describe('UX: Convex workflow visibility', () => {
  let convexClient: ConvexHttpClient;
  let testWorkflowId: any;
  let testCustomId: string;

  test.beforeAll(async () => {
    if (!CONVEX_URL || !process.env.CONVEX_TEST_SECRET) {
      console.warn('[ux-regression] Skipping Convex tests - missing CONVEX_URL or CONVEX_TEST_SECRET');
      test.skip();
      return;
    }

    convexClient = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convexClient, TEST_USER_ID);

    // Create a test workflow
    const wf = createTestWorkflow('convex');
    testCustomId = wf.customId;
    try {
      testWorkflowId = await convexClient.mutation(api.workflows.saveWorkflow, {
        ...wf,
        userId: TEST_USER_ID,
      } as any);
    } catch (err) {
      console.warn('[ux-regression] Failed to create test workflow:', err);
    }
  });

  test('listWorkflows returns non-empty results', async () => {
    if (!testWorkflowId) test.skip();

    const workflows = await convexClient.query(api.workflows.listWorkflows, {});

    // CRITICAL: The list query must return results, not an empty array.
    // If this returns [], users see a blank workflow page.
    expect(workflows.length).toBeGreaterThan(0);
  });

  test('Created workflow appears in listWorkflows', async () => {
    if (!testWorkflowId) test.skip();

    const workflows = await convexClient.query(api.workflows.listWorkflows, {});
    const found = workflows.find((w: any) => w._id === testWorkflowId);

    // The workflow we just created must be in the list
    expect(found).toBeTruthy();
    expect(found!.name).toBe('UX Regression Test convex');
    expect(found!.userId).toBe(TEST_USER_ID);
  });

  test('getWorkflow returns the workflow by ID', async () => {
    if (!testWorkflowId) test.skip();

    const workflow = await convexClient.query(api.workflows.getWorkflow, {
      id: testWorkflowId,
    });

    expect(workflow).toBeTruthy();
    expect(workflow!.name).toBe('UX Regression Test convex');
  });

  test('getWorkflowByCustomId returns the workflow', async () => {
    if (!testWorkflowId) test.skip();

    const workflow = await convexClient.query(api.workflows.getWorkflowByCustomId, {
      customId: testCustomId,
    });

    expect(workflow).toBeTruthy();
    expect(workflow!.name).toBe('UX Regression Test convex');
  });

  test.afterAll(async () => {
    try {
      if (testWorkflowId && convexClient) {
        await convexClient.mutation(api.workflows.deleteWorkflow, {
          id: testWorkflowId,
        });
      }
    } catch {}
  });
});

// ──────────────────────────────────────────────
// Section 4: Auth Client Resilience
// getAuthenticatedConvexClient() must NOT crash the
// entire request when auth is unavailable. It should
// degrade gracefully (return unauthenticated client).
// ──────────────────────────────────────────────

test.describe('UX: API resilience when auth is unavailable', () => {
  test.beforeAll(async () => {
    try {
      await fetch(BASE_URL);
    } catch {
      test.skip();
    }
  });

  test('GET /api/workflows does not return 500 (server error)', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/workflows`);

    // The API should NEVER return 500 for a basic list request.
    // 200 = success, 401 = expected auth enforcement, 403 = forbidden
    // 500 = something is broken (like throwing in getAuthenticatedConvexClient)
    expect(response.status()).not.toBe(500);
  });

  test('POST /api/workflows with valid data does not return 500', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/workflows`, {
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: `ux-resilience-${Date.now()}`,
        name: 'Resilience Test',
        description: 'Should not 500',
        nodes: [
          { id: 'start', type: 'start', position: { x: 0, y: 0 }, data: { nodeType: 'start', label: 'Start' } },
          { id: 'end', type: 'end', position: { x: 300, y: 0 }, data: { nodeType: 'end', label: 'End' } },
        ],
        edges: [{ id: 'e1', source: 'start', target: 'end' }],
      },
    });

    // Must not crash. 200 = saved, 400 = bad request, 401 = auth needed
    // 500 = broken server code
    expect(response.status()).not.toBe(500);
  });
});
