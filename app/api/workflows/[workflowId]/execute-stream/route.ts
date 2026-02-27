import { NextRequest } from 'next/server';
import { getConvexClient, getAuthenticatedConvexClient, api, isConvexConfigured } from '@/lib/convex/client';
import { LangGraphExecutor } from '@/lib/workflow/langgraph';
import { validateApiKey, createUnauthorizedResponse } from '@/lib/api/auth';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/src/lib/api/distributed-rate-limiter';
import { WorkflowIdSchema, WorkflowInputSchema, safeValidate } from '@/lib/api/validation-schemas';
import { resolveApiKeys, resolveLangSmithConfig } from '@/lib/api/execution-service';

export const dynamic = 'force-dynamic';

/**
 * Streaming workflow execution with real-time updates
 * Uses Server-Sent Events (SSE) to stream node execution progress
 *
 * Uses LangGraph executor for state management with Convex storage
 */
export async function POST(
  request: NextRequest,
  { params }: any
) {
  // Validate API key
  const authResult = await validateApiKey(request);

  if (!authResult.authenticated) {
    return createUnauthorizedResponse(authResult.error || 'Authentication required');
  }

  // Rate limiting - Using distributed Convex-based rate limiting
  const rateLimitKey = getRateLimitKey(authResult.userId || 'anonymous', 'workflow-execution');
  const rateLimitResponse = await checkRateLimit(rateLimitKey, RATE_LIMITS.WORKFLOW_EXECUTION);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const { workflowId } = await params;

  // SECURITY FIX: Validate workflow ID
  const idValidation = safeValidate(WorkflowIdSchema, workflowId);
  if (!idValidation.success) {
    return new Response(
      JSON.stringify({
        error: 'Validation failed',
        details: idValidation.error || 'Invalid workflow ID'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Create SSE stream
  const encoder = new TextEncoder();
  let isStreamClosed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const closeStream = () => {
        if (!isStreamClosed) {
          isStreamClosed = true;
          try {
            controller.close();
          } catch (e) {
            // Ignore if already closed
          }
        }
      };

      const sendEvent = (event: string, data: any) => {
        if (isStreamClosed) return;
        try {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        } catch (error) {
          // If enqueue fails, it might be because the stream is closed/errored
          if (error instanceof TypeError && (error.message.includes('closed') || error.message.includes('errored'))) {
            isStreamClosed = true;
            return; // Don't log expected closure errors
          }
          console.error('Failed to send SSE event:', error);
        }
      };

      // Hoist variables needed in both try and catch blocks
      let convex: any = null;
      let convexExecutionId: any = null;

      try {
        // Get inputs from request body
        const body = await request.json();

        // SECURITY FIX: Validate inputs
        const inputValidation = safeValidate(WorkflowInputSchema, body);
        if (!inputValidation.success) {
          sendEvent('error', {
            error: 'Invalid input format',
            details: inputValidation.error
          });
          closeStream();
          return;
        }

        const inputs = body || {};

        // Get workflow from Convex
        if (!isConvexConfigured()) {
          sendEvent('error', {
            error: 'Convex not configured',
            workflowId,
          });
          closeStream();
          return;
        }

        convex = await getAuthenticatedConvexClient();

        // Look up workflow - try customId first, then try as Convex ID
        let workflowDoc = await convex.query(api.workflows.getWorkflowByCustomId, {
          customId: workflowId,
        });

        // If not found by customId and looks like Convex ID, try direct lookup
        if (!workflowDoc && workflowId.startsWith('j')) {
          try {
            workflowDoc = await convex.query(api.workflows.getWorkflow, {
              id: workflowId as any,
            });
          } catch (e) {
            // Not a valid Convex ID
          }
        }

        if (!workflowDoc) {
          sendEvent('error', {
            error: `Workflow ${workflowId} not found`,
            workflowId,
          });
          closeStream();
          return;
        }

        // Convert Convex document to workflow format
        const workflowData = {
          ...workflowDoc,
          id: workflowDoc.customId || workflowDoc._id, // Use customId if exists, otherwise Convex ID
        };

        // Permission Check for Execution
        if (!workflowData.isTemplate) {
          // Get user information for permission check
          const user = await convex.query(api.users.currentUser); // Using existing query (typo preserved)
          const isAdmin = user?.role === "admin";
          const currentUserId = authResult.userId;

          const isOwner = workflowData.userId === currentUserId;
          const isAssigned = workflowData.assignedTo === currentUserId;

          if (!isOwner && !isAssigned && !isAdmin) {
            sendEvent('error', {
              error: 'Permission denied',
              details: 'You do not have permission to execute this workflow.',
              workflowId
            });
            closeStream();
            return;
          }
        }

        if (!workflowData) {
          sendEvent('error', {
            error: `Workflow ${workflowId} not found`,
            workflowId,
          });
          closeStream();
          return;
        }

        const workflow = workflowData as any;

        const startTime = Date.now();
        // Send start event
        sendEvent('workflow_started', {
          workflowId,
          workflowName: workflow.name,
          totalNodes: workflow.nodes.length,
          timestamp: new Date().toISOString(),
        });

        // Create execution record in Convex for persistence
        const executionId = `exec_${Date.now()}`;
        try {
          convexExecutionId = await convex.mutation(api.executions.createExecution, {
            workflowId: workflowDoc._id,
            userId: authResult.userId,
            input: inputs,
            threadId: `thread_${workflowId}_${Date.now()}`,
          });
        } catch (err) {
          // Non-fatal: workflow can still execute without persistence
          console.warn('[Execution] Failed to create execution record:', err);
        }
        const nodeResults: Record<string, any> = {};

        // Get API keys using shared two-tier resolution
        const userId = authResult.userId;

        let systemKeys: any = {};
        let langSmithConfig;
        try {
          systemKeys = await convex.action(api.systemApiKeys.getAllSystemApiKeys);
          // Resolve LangSmith config without mutating process.env per-request
          langSmithConfig = resolveLangSmithConfig(systemKeys);
        } catch (err) {
          console.warn('Failed to fetch system API keys:', err);
        }

        const apiKeys = await resolveApiKeys(userId, systemKeys);

        // Prepare initial input - pass as object if it's an object, otherwise as string
        let initialInput: any = '';
        if (typeof inputs === 'object' && Object.keys(inputs).length > 0) {
          // If the body has an "input" field, extract it (common pattern from curl/API calls)
          // Otherwise use the body directly
          initialInput = inputs.input || inputs;
        } else {
          // Otherwise use url or input field
          initialInput = inputs.url || inputs.input || '';
        }

        // LangGraph Execution Path
        const threadId = `thread_${workflowId}_${Date.now()}`;

        // Ensure workflow has required timestamp fields for Workflow type interface
        const completeWorkflow = {
          ...workflow,
          createdAt: workflow.createdAt || new Date().toISOString(),
          updatedAt: workflow.updatedAt || new Date().toISOString(),
        };

        let executor;
        try {
          executor = new LangGraphExecutor(
            completeWorkflow,
            (nodeId, result) => {
              nodeResults[nodeId] = result;

              if (result.status === 'running') {
                const node = workflow.nodes.find((n: any) => n.id === nodeId);
                sendEvent('node_started', {
                  nodeId,
                  nodeName: node?.data?.nodeName || node?.data?.label || nodeId,
                  nodeType: node?.type || 'unknown',
                  timestamp: new Date().toISOString(),
                });
              } else if (result.status === 'completed') {
                const node = workflow.nodes.find((n: any) => n.id === nodeId);
                sendEvent('node_completed', {
                  nodeId,
                  nodeName: node?.data?.nodeName || node?.data?.label || nodeId,
                  result,
                  timestamp: new Date().toISOString(),
                });
              } else if (result.status === 'failed') {
                const node = workflow.nodes.find((n: any) => n.id === nodeId);
                sendEvent('node_failed', {
                  nodeId,
                  nodeName: node?.data?.nodeName || node?.data?.label || nodeId,
                  error: result.error,
                  timestamp: new Date().toISOString(),
                });
              } else if (result.status === 'pending-authorization' || result.status === 'pending-approval') {
                const node = workflow.nodes.find((n: any) => n.id === nodeId);
                sendEvent('node_paused', {
                  nodeId,
                  nodeName: node?.data?.nodeName || node?.data?.label || nodeId,
                  status: result.status,
                  timestamp: new Date().toISOString(),
                });
              }
            },
            apiKeys
          );
        } catch (graphBuildError) {
          console.error('❌ Failed to build LangGraph:', graphBuildError);
          sendEvent('error', {
            error: graphBuildError instanceof Error ? graphBuildError.message : 'Graph compilation failed',
            timestamp: new Date().toISOString(),
          });
          closeStream();
          return;
        }

        // Execute with streaming
        const executionStream = await executor.executeStream(initialInput, {
          threadId,
          executionId,
        });

        let finalState: any = null;

        // Proper async iteration with error handling
        try {
          for await (const stateUpdate of executionStream) {
            const mergedState = {
              ...stateUpdate,
              nodeResults: {
                ...stateUpdate.nodeResults,
                ...nodeResults,
              },
            };

            finalState = mergedState;

            sendEvent('state_update', {
              nodeResults: mergedState.nodeResults,
              currentNodeId: mergedState.currentNodeId,
              pendingAuth: mergedState.pendingAuth,
              timestamp: new Date().toISOString(),
            });

            // Check for pending auth/approval
            if (mergedState.pendingAuth) {
              sendEvent('workflow_paused', {
                reason: 'pending_authorization',
                pendingAuth: mergedState.pendingAuth,
                executionId,
                threadId,
                timestamp: new Date().toISOString(),
              });

              // Persist paused state for resume capability
              if (convexExecutionId) {
                convex.mutation(api.executions.updateExecution, {
                  id: convexExecutionId,
                  status: 'paused',
                  nodeResults: mergedState.nodeResults,
                }).catch((err: any) => console.warn('[Execution] Failed to persist paused state:', err));
              }

              closeStream();
              return;
            }
          }
        } catch (streamError) {
          console.error('Stream iteration error:', streamError);
          sendEvent('error', {
            error: streamError instanceof Error ? streamError.message : 'Stream error',
            timestamp: new Date().toISOString(),
          });
          closeStream();
          return;
        }

        // Send completion event
        const status = finalState?.pendingAuth ? 'waiting-auth' : 'completed';

        // Calculate metrics
        const endTime = Date.now();
        const totalTime = endTime - startTime;

        let totalTokens = 0;
        if (finalState?.nodeResults) {
          Object.values(finalState.nodeResults).forEach((result: any) => {
            if (result.usage?.total_tokens) {
              totalTokens += result.usage.total_tokens;
            }
          });
        }

        sendEvent('workflow_completed', {
          workflowId,
          executionId,
          results: finalState?.nodeResults || {},
          status,
          timestamp: new Date().toISOString(),
          metrics: {
            totalTime,
            totalTokens
          }
        });

        // Persist completed execution to Convex
        if (convexExecutionId) {
          try {
            await convex.mutation(api.executions.completeExecution, {
              id: convexExecutionId,
              output: finalState?.nodeResults || {},
            });
          } catch (err) {
            console.warn('[Execution] Failed to persist completion:', err);
          }
        }

        // Wait for LangSmith to finalize trace before closing stream
        const { waitForTraceFinalization } = await import('@/lib/langsmith/config');
        await waitForTraceFinalization(1000, langSmithConfig);

        closeStream();
      } catch (error) {
        // Persist failure to Convex
        if (convexExecutionId) {
          convex.mutation(api.executions.completeExecution, {
            id: convexExecutionId,
            error: error instanceof Error ? error.message : 'Unknown error',
          }).catch((err: any) => console.warn('[Execution] Failed to persist error:', err));
        }

        // Log detailed error server-side, send sanitized message to client
        console.error('[Execution] Workflow execution error:', error);
        sendEvent('error', {
          error: 'Workflow execution failed',
          timestamp: new Date().toISOString(),
        });
        closeStream();
      }
    },
    cancel() {
      isStreamClosed = true;
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
