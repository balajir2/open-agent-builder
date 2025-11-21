import { NextRequest, NextResponse } from 'next/server';
import { LangGraphExecutor } from '@/lib/workflow/langgraph';
import { validateApiKey, createUnauthorizedResponse } from '@/lib/api/auth';
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from '@/src/lib/api/distributed-rate-limiter';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  // Validate API key
  const authResult = await validateApiKey(request);
  if (!authResult.authenticated) {
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
    const body = await request.json();
    const { input, workflow } = body;

    console.log('API: Executing workflow', workflowId, 'with input:', input);

    if (!workflow || !workflow.nodes) {
      return NextResponse.json(
        { error: 'Workflow data is required in request body' },
        { status: 400 }
      );
    }

    console.log('API: Loaded workflow:', workflow.name);

    const apiKeys = {
      anthropic: process.env.ANTHROPIC_API_KEY,
      groq: process.env.GROQ_API_KEY,
      openai: process.env.OPENAI_API_KEY,
      google: process.env.GOOGLE_API_KEY,
      firecrawl: process.env.FIRECRAWL_API_KEY,
      arcade: process.env.ARCADE_API_KEY,
      e2b: process.env.E2B_API_KEY,
      tavily: process.env.TAVILY_API_KEY,
      serper: process.env.SERPER_API_KEY,
      serpapi: process.env.SERPAPI_API_KEY,
      scraperapi: process.env.SCRAPERAPI_API_KEY,
      browserless: process.env.BROWSERLESS_API_KEY,
    };

    // Execute workflow using LangGraph
    const executor = new LangGraphExecutor(workflow, undefined, apiKeys);
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
