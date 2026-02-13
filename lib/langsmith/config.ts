/**
 * LangSmith Tracing Configuration
 *
 * Automatically enables LangSmith tracing when environment variables are set.
 * LangSmith provides monitoring and debugging for LLM applications.
 *
 * Setup:
 * 1. Sign up at https://smith.langchain.com/
 * 2. Get your API key from Settings → API Keys
 * 3. Set environment variables in .env.local:
 *    LANGCHAIN_TRACING_V2=true
 *    LANGCHAIN_API_KEY=lsv2_pt_...
 *    LANGCHAIN_PROJECT=open-agent-builder
 *    LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
 */

/**
 * Check if LangSmith tracing is enabled
 * NOTE: Reads environment variables dynamically each time it's called
 * to support runtime configuration from Convex
 */
export function isLangSmithEnabled(): boolean {
  const enabled = process.env.LANGCHAIN_TRACING_V2 === 'true' &&
    !!process.env.LANGCHAIN_API_KEY;
  return enabled;
}

/**
 * Get LangSmith configuration
 */
export function getLangSmithConfig() {
  if (!isLangSmithEnabled()) {
    return null;
  }

  return {
    project: process.env.LANGCHAIN_PROJECT || 'open-agent-builder',
    apiKey: process.env.LANGCHAIN_API_KEY,
    endpoint: process.env.LANGCHAIN_ENDPOINT || 'https://api.smith.langchain.com',
  };
}

/**
 * Get LangGraph invoke/stream config with LangSmith tracing
 *
 * Usage:
 * ```typescript
 * const config = getLangGraphConfig({ thread_id: 'my-thread' });
 * const result = await graph.invoke(input, config);
 * ```
 */
export function getLangGraphConfig(baseConfig?: Record<string, any>) {
  const config: Record<string, any> = {
    ...baseConfig,
  };

  // LangSmith tracing is automatically enabled by environment variables
  // No explicit callbacks needed - LangChain handles this internally
  // when LANGCHAIN_TRACING_V2=true

  if (isLangSmithEnabled()) {
    console.log('[LangSmith] Tracing enabled for project:', process.env.LANGCHAIN_PROJECT || 'open-agent-builder');

    // Add metadata to help identify and group traces
    config.metadata = {
      ...config.metadata,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };

    // Add tags for better organization in LangSmith
    config.tags = [
      ...(config.tags || []),
      'open-agent-builder',
      process.env.NODE_ENV || 'development'
    ];
  }

  return config;
}

/**
 * Wait for LangSmith trace to finalize
 * Call this after workflow execution completes to ensure trace is uploaded
 */
export async function waitForTraceFinalization(delayMs: number = 1000): Promise<void> {
  if (!isLangSmithEnabled()) {
    return; // No need to wait if tracing is disabled
  }

  // LangSmith uploads trace data asynchronously after execution completes
  // This delay ensures the trace is fully uploaded and marked as complete
  // Without this, traces may remain in "in progress" state
  console.log('[LangSmith] Waiting for trace finalization...');
  await new Promise(resolve => setTimeout(resolve, delayMs));
  console.log('[LangSmith] Trace finalization complete');
}

/**
 * Log LangSmith status on module load
 */
if (typeof window === 'undefined') {
  // Server-side only
  if (isLangSmithEnabled()) {
    const config = getLangSmithConfig();
    console.log('✅ LangSmith tracing enabled');
    console.log('   Project:', config?.project);
    console.log('   Endpoint:', config?.endpoint);
  } else {
    console.log('⚠️  LangSmith tracing disabled');
    if (!process.env.LANGCHAIN_TRACING_V2) {
      console.log('   Set LANGCHAIN_TRACING_V2=true in .env.local to enable');
    }
    if (!process.env.LANGCHAIN_API_KEY) {
      console.log('   Set LANGCHAIN_API_KEY in .env.local (get from https://smith.langchain.com/)');
    }
  }
}
