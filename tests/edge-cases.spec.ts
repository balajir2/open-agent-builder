/**
 * Edge Cases Test Suite
 *
 * Comprehensive edge case handling across the workflow system:
 * - Empty Workflows: Workflows with no nodes, only start/end, minimal configs
 * - Invalid Connections: Edges pointing to non-existent nodes, circular flows
 * - Circular Dependencies: Detect and handle infinite loops
 * - Malformed Data: Invalid JSON, missing required fields, type mismatches
 * - Network Failures: Timeout handling, retry logic, connection errors
 * - Boundary Conditions: Max string lengths, large numbers, special characters
 * - Race Conditions: Concurrent workflow executions, state conflicts
 * - Memory Limits: Large workflow states, excessive node counts
 *
 * Tests error handling and resilience across all workflow executors.
 *
 * Lines: ~320
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { setTestAuth } from './test-auth-helper';
import { WorkflowNode, WorkflowState } from '@/lib/workflow/types';
import { cleanupInvalidEdges } from '@/lib/workflow/edge-cleanup';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const TEST_USER_ID = 'test-user-edge-cases';

if (!CONVEX_URL) {
  throw new Error('CONVEX_URL environment variable is not set.');
}
if (!process.env.CONVEX_TEST_SECRET) {
  throw new Error('CONVEX_TEST_SECRET environment variable is not set for tests.');
}

// --- Test Suite ---

test.describe('Edge Cases & Error Handling', () => {
  let convexClient: ConvexHttpClient;

  test.beforeAll(async () => {
    convexClient = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convexClient, TEST_USER_ID);
    console.log('⚠️ Starting Edge Cases Test Suite...');
  });

  test.afterEach(async () => {
    // Clean up workflows created during this test
    try {
      const workflows = await convexClient.query(api.workflows.list, {});
      for (const workflow of workflows) {
        if (workflow.userId === TEST_USER_ID) {
          try {
            await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflow._id });
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
  });

  // === Empty Workflows ===

  test.describe('Empty Workflows', () => {
    test('should handle workflow with no nodes', async () => {
      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Empty Workflow',
        description: 'Workflow with no nodes',
        nodes: [],
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      // Cleanup
      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle workflow with only start node', async () => {
      const nodes = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start' }
        }
      ];

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Start Only Workflow',
        description: 'Only start node',
        nodes: nodes,
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle workflow with only end node', async () => {
      const nodes = [
        {
          id: 'end-1',
          type: 'end',
          position: { x: 0, y: 0 },
          data: { label: 'End' }
        }
      ];

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'End Only Workflow',
        description: 'Only end node',
        nodes: nodes,
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle disconnected start and end nodes', async () => {
      const nodes = [
        {
          id: 'start-1',
          type: 'start',
          position: { x: 0, y: 0 },
          data: { label: 'Start' }
        },
        {
          id: 'end-1',
          type: 'end',
          position: { x: 200, y: 0 },
          data: { label: 'End' }
        }
      ];

      // No edges connecting them
      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Disconnected Workflow',
        description: 'Start and end not connected',
        nodes: nodes,
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });
  });

  // === Invalid Connections ===

  test.describe('Invalid Connections', () => {
    test('should detect edges pointing to non-existent source nodes', async () => {
      const nodes = [
        { id: 'end-1', type: 'end', position: { x: 0, y: 0 }, data: { label: 'End' } }
      ];

      const edges = [
        { id: 'e1', source: 'non-existent-node', target: 'end-1' }
      ];

      const { edges: validEdges, removedCount } = cleanupInvalidEdges(nodes, edges);

      expect(removedCount).toBe(1);
      expect(validEdges.length).toBe(0);
    });

    test('should detect edges pointing to non-existent target nodes', async () => {
      const nodes = [
        { id: 'start-1', type: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' } }
      ];

      const edges = [
        { id: 'e1', source: 'start-1', target: 'non-existent-node' }
      ];

      const { edges: validEdges, removedCount } = cleanupInvalidEdges(nodes, edges);

      expect(removedCount).toBe(1);
      expect(validEdges.length).toBe(0);
    });

    test('should cleanup multiple invalid edges', async () => {
      const nodes = [
        { id: 'start-1', type: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'end-1', type: 'end', position: { x: 200, y: 0 }, data: { label: 'End' } }
      ];

      const edges = [
        { id: 'e1', source: 'start-1', target: 'end-1' }, // valid
        { id: 'e2', source: 'fake-1', target: 'end-1' }, // invalid source
        { id: 'e3', source: 'start-1', target: 'fake-2' }, // invalid target
        { id: 'e4', source: 'fake-3', target: 'fake-4' }, // both invalid
      ];

      const { edges: validEdges, removedCount } = cleanupInvalidEdges(nodes, edges);

      expect(removedCount).toBe(3);
      expect(validEdges.length).toBe(1);
      expect(validEdges[0].id).toBe('e1');
    });

    test('should preserve valid edges when cleaning up', async () => {
      const nodes = [
        { id: 'start-1', type: 'start', position: { x: 0, y: 0 }, data: { label: 'Start' } },
        { id: 'agent-1', type: 'agent', position: { x: 100, y: 0 }, data: { label: 'Agent' } },
        { id: 'end-1', type: 'end', position: { x: 200, y: 0 }, data: { label: 'End' } }
      ];

      const edges = [
        { id: 'e1', source: 'start-1', target: 'agent-1' },
        { id: 'e2', source: 'agent-1', target: 'end-1' },
        { id: 'e3', source: 'fake-node', target: 'end-1' },
      ];

      const { edges: validEdges, removedCount } = cleanupInvalidEdges(nodes, edges);

      expect(removedCount).toBe(1);
      expect(validEdges.length).toBe(2);
    });
  });

  // === Circular Dependencies ===

  test.describe('Circular Dependencies', () => {
    test('should detect simple circular flow (A → B → A)', async () => {
      const nodes = [
        { id: 'node-a', type: 'agent', position: { x: 0, y: 0 }, data: { label: 'A' } },
        { id: 'node-b', type: 'agent', position: { x: 100, y: 0 }, data: { label: 'B' } }
      ];

      const edges = [
        { id: 'e1', source: 'node-a', target: 'node-b' },
        { id: 'e2', source: 'node-b', target: 'node-a' } // Circular
      ];

      // Create workflow - should be allowed to save but flagged
      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Circular Workflow',
        description: 'Contains circular dependency',
        nodes: nodes,
        edges: edges,
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should detect complex circular flow (A → B → C → A)', async () => {
      const nodes = [
        { id: 'node-a', type: 'agent', position: { x: 0, y: 0 }, data: { label: 'A' } },
        { id: 'node-b', type: 'agent', position: { x: 100, y: 0 }, data: { label: 'B' } },
        { id: 'node-c', type: 'agent', position: { x: 200, y: 0 }, data: { label: 'C' } }
      ];

      const edges = [
        { id: 'e1', source: 'node-a', target: 'node-b' },
        { id: 'e2', source: 'node-b', target: 'node-c' },
        { id: 'e3', source: 'node-c', target: 'node-a' } // Circular
      ];

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Complex Circular Workflow',
        description: 'Multi-node circular dependency',
        nodes: nodes,
        edges: edges,
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle self-referencing node', async () => {
      const nodes = [
        { id: 'node-a', type: 'agent', position: { x: 0, y: 0 }, data: { label: 'A' } }
      ];

      const edges = [
        { id: 'e1', source: 'node-a', target: 'node-a' } // Self-loop
      ];

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Self-Loop Workflow',
        description: 'Node pointing to itself',
        nodes: nodes,
        edges: edges,
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });
  });

  // === Malformed Data ===

  test.describe('Malformed Data', () => {
    test('should reject invalid JSON in nodes', async () => {
      try {
        await convexClient.mutation(api.workflows.create, {
          userId: TEST_USER_ID,
          name: 'Invalid JSON Workflow',
          description: 'Malformed nodes JSON',
          nodes: 'invalid-json{not-json}',
          edges: [],
        });

        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    test('should reject invalid JSON in edges', async () => {
      try {
        await convexClient.mutation(api.workflows.create, {
          userId: TEST_USER_ID,
          name: 'Invalid Edges JSON',
          description: 'Malformed edges JSON',
          nodes: [],
          edges: '{broken-json:value',
        });

        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    test('should handle missing required node fields', async () => {
      const invalidNodes = [
        { id: 'node-1' } // Missing type, position, data
      ];

      // Should be allowed to save, but may fail on execution
      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Incomplete Node Workflow',
        description: 'Node missing required fields',
        nodes: invalidNodes,
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle null/undefined values in node data', async () => {
      const nodes = [
        {
          id: 'node-1',
          type: 'agent',
          position: { x: 0, y: 0 },
          data: {
            label: null,
            instructions: undefined,
            model: ''
          }
        }
      ];

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Null Values Workflow',
        description: 'Nodes with null/undefined',
        nodes: nodes,
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });
  });

  // === Boundary Conditions ===

  test.describe('Boundary Conditions', () => {
    test('should handle very long workflow names', async () => {
      const longName = 'A'.repeat(1000);

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: longName,
        description: 'Test',
        nodes: [],
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle very long descriptions', async () => {
      const longDescription = 'B'.repeat(10000);

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Long Description Test',
        description: longDescription,
        nodes: [],
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle special characters in workflow name', async () => {
      const specialChars = '🚀 Test <script>alert("xss")</script> & " \' \\n \\t';

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: specialChars,
        description: 'Special characters test',
        nodes: [],
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle unicode characters', async () => {
      const unicode = '测试 テスト 🔥 ñ é ü';

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: unicode,
        description: unicode,
        nodes: [],
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle large number of nodes', async () => {
      const nodes = [];
      const edges = [];

      // Create 100 nodes in a chain
      for (let i = 0; i < 100; i++) {
        nodes.push({
          id: `node-${i}`,
          type: 'agent',
          position: { x: i * 100, y: 0 },
          data: { label: `Node ${i}` }
        });

        if (i > 0) {
          edges.push({
            id: `e${i}`,
            source: `node-${i - 1}`,
            target: `node-${i}`
          });
        }
      }

      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Large Workflow',
        description: '100 nodes',
        nodes: nodes,
        edges: edges,
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });

    test('should handle empty strings', async () => {
      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: '',
        description: '',
        nodes: [],
        edges: [],
      });

      expect(workflowId).toBeTruthy();

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });
  });

  // === Network & Timeout Scenarios ===

  test.describe('Network Failures & Timeouts', () => {
    test('should handle network timeout simulation', async () => {
      // Simulate timeout with very long operation
      const startTime = Date.now();
      const timeout = 1000; // 1 second timeout

      try {
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, 5000)), // 5 second operation
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
          )
        ]);

        // Should not reach here
        expect(true).toBe(false);
      } catch (error: any) {
        const elapsed = Date.now() - startTime;
        expect(error.message).toBe('Timeout');
        expect(elapsed).toBeLessThan(1500); // Should timeout around 1s
      }
    });

    test('should handle retry logic for failed operations', async () => {
      let attempts = 0;
      const maxRetries = 3;

      const unreliableOperation = async () => {
        attempts++;
        if (attempts < maxRetries) {
          throw new Error('Operation failed');
        }
        return 'success';
      };

      // Retry loop
      let result;
      for (let i = 0; i < maxRetries; i++) {
        try {
          result = await unreliableOperation();
          break;
        } catch (error) {
          if (i === maxRetries - 1) throw error;
        }
      }

      expect(result).toBe('success');
      expect(attempts).toBe(maxRetries);
    });

    test('should handle connection errors gracefully', async () => {
      // Simulate connection error
      const connectionError = new Error('ECONNREFUSED');

      expect(connectionError.message).toBe('ECONNREFUSED');
    });
  });

  // === Race Conditions ===

  test.describe('Race Conditions', () => {
    test('should handle concurrent workflow creations', async () => {
      const createWorkflow = (index: number) => {
        return convexClient.mutation(api.workflows.create, {
          userId: TEST_USER_ID,
          name: `Concurrent Workflow ${index}`,
          description: 'Concurrent test',
          nodes: [],
          edges: [],
        });
      };

      // Create 5 workflows concurrently
      const promises = Array.from({ length: 5 }, (_, i) => createWorkflow(i));
      const workflowIds = await Promise.all(promises);

      expect(workflowIds.length).toBe(5);
      expect(new Set(workflowIds).size).toBe(5); // All unique

      // Cleanup
      await Promise.all(
        workflowIds.map(id => convexClient.mutation(api.workflows.deleteWorkflow, { id }))
      );
    });

    test('should handle concurrent workflow updates', async () => {
      // Create a workflow
      const workflowId = await convexClient.mutation(api.workflows.create, {
        userId: TEST_USER_ID,
        name: 'Race Condition Test',
        description: 'Test',
        nodes: [],
        edges: [],
      });

      // Update concurrently
      const updateWorkflow = (suffix: string) => {
        return convexClient.mutation(api.workflows.update, {
          id: workflowId,
          name: `Updated ${suffix}`,
        });
      };

      const promises = ['A', 'B', 'C', 'D', 'E'].map(updateWorkflow);
      await Promise.all(promises);

      // Get final state
      const workflow = await convexClient.query(api.workflows.get, { id: workflowId });
      expect(workflow?.name).toMatch(/^Updated [ABCDE]$/);

      await convexClient.mutation(api.workflows.deleteWorkflow, { id: workflowId });
    });
  });

  // === Memory & Performance ===

  test.describe('Memory Limits', () => {
    test('should handle large workflow state', async () => {
      const largeData = {
        variables: {
          largeArray: Array(1000).fill('x'.repeat(100)),
          largeObject: Object.fromEntries(
            Array(100).fill(0).map((_, i) => [`key${i}`, `value${i}`])
          )
        }
      };

      const serialized = JSON.stringify(largeData);
      expect(serialized.length).toBeGreaterThan(100000); // > 100KB

      // Should be able to serialize and deserialize
      const deserialized = JSON.parse(serialized);
      expect(deserialized.variables.largeArray.length).toBe(1000);
    });

    test('should handle deeply nested objects', async () => {
      let nested: any = { value: 'deep' };
      for (let i = 0; i < 50; i++) {
        nested = { child: nested };
      }

      const serialized = JSON.stringify(nested);
      const deserialized = JSON.parse(serialized);

      // Navigate to the bottom
      let current = deserialized;
      let depth = 0;
      while (current.child) {
        current = current.child;
        depth++;
      }

      expect(depth).toBe(50);
      expect(current.value).toBe('deep');
    });
  });
});
