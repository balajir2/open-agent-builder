import { NextRequest, NextResponse } from 'next/server';
import { LangGraphExecutor } from '@/lib/workflow/langgraph';
import { validateApiKey, createUnauthorizedResponse } from '@/lib/api/auth';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/src/lib/api/distributed-rate-limiter';
import { WorkflowExecutionSchema, WorkflowIdSchema, safeValidate, createValidationErrorResponse } from '@/lib/api/validation-schemas';
import { getAuthenticatedConvexClient, getConvexClient, api } from '@/lib/convex/client';
import { resolveApiKeys, resolveLangSmithConfig } from '@/lib/api/execution-service';

export const dynamic = 'force-dynamic';
export const maxDuration = 800;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  // Validate API key
  let authResult = await validateApiKey(request);



  if (!authResult.authenticated || !authResult.userId) {
    return createUnauthorizedResponse(authResult.error || 'Authentication required');
  }

  // Rate limiting - workflow execution is resource-intensive
  // Using distributed Convex-based rate limiting that works across multiple instances
  const rateLimitKey = getRateLimitKey(authResult.userId, 'workflow-execution');
  const rateLimitResponse = await checkRateLimit(rateLimitKey, RATE_LIMITS.WORKFLOW_EXECUTION);

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const { workflowId } = await params;

    // SECURITY FIX: Validate workflow ID
    const idValidation = safeValidate(WorkflowIdSchema, workflowId);
    if (!idValidation.success) {
      return NextResponse.json(
        createValidationErrorResponse(idValidation.error || 'Invalid workflow ID'),
        { status: 400 }
      );
    }

    const body = await request.json();
    const input = body?.input;

    console.log('API: Executing workflow', workflowId, 'with input:', input);

    // Look up workflow by ID — support both session and API key auth
    const isApiKeyAuth = authResult.authType === 'api-key';
    let convex: any;
    let workflowDoc: any = null;

    try {
      convex = await getAuthenticatedConvexClient();
    } catch {
      convex = getConvexClient();
    }

    if (isApiKeyAuth) {
      const executionSecret = process.env.CONVEX_TEST_SECRET;
      if (executionSecret) {
        workflowDoc = await convex.action(api.workflows.getWorkflowForExecution, {
          customId: workflowId,
          secret: executionSecret,
        });
        if (!workflowDoc && workflowId.startsWith('j')) {
          workflowDoc = await convex.action(api.workflows.getWorkflowForExecution, {
            convexId: workflowId,
            secret: executionSecret,
          });
        }
      }
    } else {
      workflowDoc = await convex.query(api.workflows.getWorkflowByCustomId, {
        customId: workflowId,
      });
      if (!workflowDoc && workflowId.startsWith('j')) {
        try {
          workflowDoc = await convex.query(api.workflows.getWorkflow, {
            id: workflowId as any,
          });
        } catch (e) {
          // Not a valid Convex ID
        }
      }
    }

    // Also accept workflow in request body (legacy support)
    const workflow = workflowDoc || body?.workflow;

    if (!workflow || !workflow.nodes) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    console.log('API: Loaded workflow:', workflow.name);

    const workflowWithTimestamps: any = {
      id: workflow.customId || workflow.id || workflowId,
      name: workflow.name || 'Untitled Workflow',
      nodes: workflow.nodes || [],
      edges: workflow.edges || [],
      createdAt: workflow.createdAt || new Date().toISOString(),
      updatedAt: workflow.updatedAt || new Date().toISOString(),
      description: workflow.description,
      category: workflow.category,
      tags: workflow.tags,
      estimatedTime: workflow.estimatedTime,
      difficulty: workflow.difficulty,
    };

    // Get API keys using shared two-tier resolution
    const userId = authResult.userId;
    const systemKeys = await convex.action(api.systemApiKeys.getAllSystemApiKeys);

    // Resolve LangSmith config without mutating process.env per-request
    const langSmithConfig = resolveLangSmithConfig(systemKeys);

    const apiKeys = await resolveApiKeys(userId, systemKeys);

    // Execute workflow using LangGraph
    const executor = new LangGraphExecutor(workflowWithTimestamps, undefined, apiKeys, langSmithConfig);
    const execution = await executor.execute(input || '');

    console.log('API: Execution complete:', execution.status);

    // Wait for LangSmith to finalize trace
    const { waitForTraceFinalization } = await import('@/lib/langsmith/config');
    await waitForTraceFinalization(1000, langSmithConfig);

    return NextResponse.json({
      success: execution.status === 'completed',
      execution,
      input,
      workflowName: workflowWithTimestamps.name,
    });
  } catch (error) {
    // Log detailed error server-side, return sanitized message to client
    console.error('[Execution] Workflow execution error:', error);
    return NextResponse.json(
      {
        error: 'Workflow execution failed',
        message: 'An internal error occurred during workflow execution.',
      },
      { status: 500 }
    );
  }
}
