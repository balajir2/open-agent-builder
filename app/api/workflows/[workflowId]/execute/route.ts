import { NextRequest, NextResponse } from 'next/server';
import { LangGraphExecutor } from '@/lib/workflow/langgraph';
import { validateApiKey, createUnauthorizedResponse } from '@/lib/api/auth';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/src/lib/api/distributed-rate-limiter';
import { WorkflowExecutionSchema, WorkflowIdSchema, safeValidate, createValidationErrorResponse } from '@/lib/api/validation-schemas';
import { getAuthenticatedConvexClient, api } from '@/lib/convex/client';

export const dynamic = 'force-dynamic';

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

    // SECURITY FIX: Validate request body with Zod
    const validation = safeValidate(WorkflowExecutionSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        createValidationErrorResponse(validation.error || 'Invalid request body'),
        { status: 400 }
      );
    }

    const { input, workflow } = validation.data!;

    console.log('API: Executing workflow', workflowId, 'with input:', input);

    if (!workflow || !workflow.nodes) {
      return NextResponse.json(
        { error: 'Workflow data is required in request body' },
        { status: 400 }
      );
    }

    console.log('API: Loaded workflow:', workflow.name);

    // Get API keys - check user keys first, then fall back to system keys from Convex
    const { getLLMApiKey, getToolApiKey } = await import('@/lib/api/llm-keys') as any;
    const userId = authResult.userId;

    // Get system API keys from Convex environment
    // Get system API keys from Convex environment
    const convex = await getAuthenticatedConvexClient();
    let systemKeys: any = {};
    try {
      systemKeys = await convex.action(api.systemApiKeys.getAllSystemApiKeys);
    } catch (err) {
      console.warn('Failed to fetch system API keys:', err);
      // Continue without system keys
    }

    const apiKeys = {
      anthropic: (userId ? await getLLMApiKey('anthropic', userId) : undefined) ?? systemKeys.anthropic,
      groq: (userId ? await getLLMApiKey('groq', userId) : undefined) ?? systemKeys.groq,
      openai: (userId ? await getLLMApiKey('openai', userId) : undefined) ?? systemKeys.openai,
      google: (userId ? await getLLMApiKey('google', userId) : undefined) ?? systemKeys.google,
      firecrawl: (userId ? await getToolApiKey('firecrawl', userId) : undefined) ?? systemKeys.firecrawl,
      arcade: (userId ? await getToolApiKey('arcade', userId) : undefined) ?? systemKeys.arcade,
      e2b: (userId ? await getToolApiKey('e2b', userId) : undefined) ?? systemKeys.e2b,
      tavily: (userId ? await getToolApiKey('tavily-search', userId) : undefined) ?? systemKeys.tavily,
      serper: (userId ? await getToolApiKey('serper-search', userId) : undefined) ?? systemKeys.serper,
      serpapi: (userId ? await getToolApiKey('serpapi-search', userId) : undefined) ?? systemKeys.serpapi,
      scraperapi: (userId ? await getToolApiKey('scraperapi', userId) : undefined) ?? systemKeys.scraperapi,
      browserless: (userId ? await getToolApiKey('browserless', userId) : undefined) ?? systemKeys.browserless,
      gamma: (userId ? await getToolApiKey('gamma-api', userId) : undefined) ?? systemKeys.gamma,
    };

    // Add required timestamp fields to match Workflow type interface
    // Also ensure all nodes have position and data fields (required by Workflow type)
    const completeWorkflow = {
      ...workflow,
      id: workflow.id || workflowId,
      name: workflow.name || 'Untitled Workflow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nodes: workflow.nodes.map(node => ({
        ...node,
        position: node.position || { x: 0, y: 0 }, // Ensure position is always defined
        data: { label: '', ...node.data } as import('@/lib/workflow/types').NodeData, // Ensure data conforms to NodeData type
      })),
    };

    // Execute workflow using LangGraph
    const executor = new LangGraphExecutor(completeWorkflow, undefined, apiKeys);
    const execution = await executor.execute(input || '');

    console.log('API: Execution complete:', execution.status);

    return NextResponse.json({
      success: execution.status === 'completed',
      execution,
      input,
      workflowName: workflow.name,
    });
  } catch (error) {
    console.error('Workflow execution error:', error);
    return NextResponse.json(
      {
        error: 'Workflow execution failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
