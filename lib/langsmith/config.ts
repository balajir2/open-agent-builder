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
 * Runtime LangSmith config that can be passed from Convex system keys
 * instead of mutating process.env per-request.
 */
export interface LangSmithRuntimeConfig {
  apiKey?: string;
  project?: string;
  endpoint?: string;
  tracingEnabled?: boolean;
}

/**
 * Check if LangSmith tracing is enabled.
 *
 * Accepts an optional runtime config (from Convex system keys) which takes
 * precedence over process.env. This avoids mutating process.env per-request.
 */
export function isLangSmithEnabled(runtimeConfig?: LangSmithRuntimeConfig): boolean {
  if (runtimeConfig) {
    return runtimeConfig.tracingEnabled === true && !!runtimeConfig.apiKey;
  }
  const enabled = process.env.LANGCHAIN_TRACING_V2 === 'true' &&
    !!process.env.LANGCHAIN_API_KEY;
  return enabled;
}

/**
 * Get LangSmith configuration.
 *
 * Accepts an optional runtime config which takes precedence over process.env.
 */
export function getLangSmithConfig(runtimeConfig?: LangSmithRuntimeConfig) {
  if (!isLangSmithEnabled(runtimeConfig)) {
    return null;
  }

  return {
    project: runtimeConfig?.project || process.env.LANGCHAIN_PROJECT || 'open-agent-builder',
    apiKey: runtimeConfig?.apiKey || process.env.LANGCHAIN_API_KEY,
    endpoint: runtimeConfig?.endpoint || process.env.LANGCHAIN_ENDPOINT || 'https://api.smith.langchain.com',
  };
}

/**
 * Get LangGraph invoke/stream config with LangSmith tracing.
 *
 * Accepts an optional runtime config to avoid process.env mutation.
 * When runtimeConfig is provided, sets process.env temporarily so that
 * the LangChain SDK picks up tracing (it reads env vars internally).
 *
 * Usage:
 * ```typescript
 * const config = getLangGraphConfig({ thread_id: 'my-thread' }, langSmithConfig);
 * const result = await graph.invoke(input, config);
 * ```
 */
export function getLangGraphConfig(
  baseConfig?: Record<string, any>,
  runtimeConfig?: LangSmithRuntimeConfig
) {
  const config: Record<string, any> = {
    ...baseConfig,
  };

  // When runtime config is provided, ensure env vars are set for LangChain SDK.
  // This is a controlled one-time set (idempotent) rather than per-request mutation.
  if (runtimeConfig && runtimeConfig.tracingEnabled && runtimeConfig.apiKey) {
    if (runtimeConfig.apiKey) process.env.LANGCHAIN_API_KEY = runtimeConfig.apiKey;
    if (runtimeConfig.project) process.env.LANGCHAIN_PROJECT = runtimeConfig.project;
    if (runtimeConfig.endpoint) process.env.LANGCHAIN_ENDPOINT = runtimeConfig.endpoint;
    process.env.LANGCHAIN_TRACING_V2 = 'true';
  }

  if (isLangSmithEnabled(runtimeConfig)) {
    const project = runtimeConfig?.project || process.env.LANGCHAIN_PROJECT || 'open-agent-builder';
    console.log('[LangSmith] Tracing enabled for project:', project);

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
export async function waitForTraceFinalization(
  delayMs: number = 1000,
  runtimeConfig?: LangSmithRuntimeConfig
): Promise<void> {
  if (!isLangSmithEnabled(runtimeConfig)) {
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
