/**
 * Shared Execution Service Layer
 *
 * Extracts common logic from execute/ and execute-stream/ routes to eliminate
 * duplication and ensure consistent behavior for:
 * - Workflow resolution (customId → Convex ID) with permission checks
 * - Two-tier API key resolution (user keys → system keys)
 * - LangSmith configuration (returns config object, no process.env mutation)
 */

import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

export interface ResolvedWorkflow {
  /** The complete workflow document from Convex */
  workflow: any;
  /** The Convex _id (for use with execution mutations) */
  convexId: any;
}

export interface ResolvedApiKeys {
  anthropic?: string;
  groq?: string;
  openai?: string;
  google?: string;
  firecrawl?: string;
  arcade?: string;
  e2b?: string;
  tavily?: string;
  serper?: string;
  serpapi?: string;
  scraperapi?: string;
  browserless?: string;
  gamma?: string;
  userId?: string; // For OAuth MCP token resolution
}

export interface LangSmithConfig {
  apiKey?: string;
  project?: string;
  endpoint?: string;
  tracingEnabled?: boolean;
}

/**
 * Resolve a workflow by customId or Convex ID, with permission check.
 *
 * Returns null if the workflow is not found or the user lacks permission.
 */
export async function resolveWorkflow(
  convex: ConvexHttpClient,
  workflowId: string,
  userId?: string
): Promise<ResolvedWorkflow | null> {
  // Look up by customId first
  let workflowDoc = await convex.query(api.workflows.getWorkflowByCustomId, {
    customId: workflowId,
  });

  // If not found and looks like a Convex ID, try direct lookup
  if (!workflowDoc && workflowId.startsWith('j')) {
    try {
      workflowDoc = await convex.query(api.workflows.getWorkflow, {
        id: workflowId as any,
      });
    } catch {
      // Not a valid Convex ID
    }
  }

  if (!workflowDoc) return null;

  // Permission check for non-template workflows
  if (!workflowDoc.isTemplate) {
    try {
      const user = await convex.query(api.users.currentUser);
      const isAdmin = user?.role === 'admin';
      const isOwner = workflowDoc.userId === userId;
      const isAssigned = workflowDoc.assignedTo === userId;

      if (!isOwner && !isAssigned && !isAdmin) {
        return null;
      }
    } catch {
      // If we can't verify permissions, deny access
      return null;
    }
  }

  return {
    workflow: {
      ...workflowDoc,
      id: workflowDoc.customId || workflowDoc._id,
    },
    convexId: workflowDoc._id,
  };
}

/**
 * Resolve API keys using the two-tier system:
 * 1. User-specific keys (highest priority)
 * 2. System keys from Convex environment (fallback)
 *
 * @param userId - The authenticated user's ID
 * @param systemKeys - System keys fetched from Convex environment
 */
export async function resolveApiKeys(
  userId: string | undefined,
  systemKeys: any
): Promise<ResolvedApiKeys> {
  const { getLLMApiKey, getToolApiKey } = (await import(
    '@/lib/api/llm-keys'
  )) as any;

  return {
    anthropic:
      (userId ? await getLLMApiKey('anthropic', userId) : undefined) ??
      systemKeys.anthropic,
    groq:
      (userId ? await getLLMApiKey('groq', userId) : undefined) ??
      systemKeys.groq,
    openai:
      (userId ? await getLLMApiKey('openai', userId) : undefined) ??
      systemKeys.openai,
    google:
      (userId ? await getLLMApiKey('google', userId) : undefined) ??
      systemKeys.google,
    firecrawl:
      (userId ? await getToolApiKey('firecrawl', userId) : undefined) ??
      systemKeys.firecrawl,
    arcade:
      (userId ? await getToolApiKey('arcade', userId) : undefined) ??
      systemKeys.arcade,
    e2b:
      (userId ? await getToolApiKey('e2b', userId) : undefined) ??
      systemKeys.e2b,
    tavily:
      (userId ? await getToolApiKey('tavily-search', userId) : undefined) ??
      systemKeys.tavily,
    serper:
      (userId ? await getToolApiKey('serper-search', userId) : undefined) ??
      systemKeys.serper,
    serpapi:
      (userId ? await getToolApiKey('serpapi-search', userId) : undefined) ??
      systemKeys.serpapi,
    scraperapi:
      (userId ? await getToolApiKey('scraperapi', userId) : undefined) ??
      systemKeys.scraperapi,
    browserless:
      (userId ? await getToolApiKey('browserless', userId) : undefined) ??
      systemKeys.browserless,
    gamma:
      (userId ? await getToolApiKey('gamma-api', userId) : undefined) ??
      systemKeys.gamma,
    // Pass userId through for OAuth MCP token resolution
    userId,
  };
}

/**
 * Resolve LangSmith configuration from system keys.
 *
 * Returns a config object instead of mutating process.env.
 * The caller is responsible for passing this to the LangGraph executor.
 */
export function resolveLangSmithConfig(systemKeys: any): LangSmithConfig {
  return {
    apiKey: systemKeys.langchainApiKey || process.env.LANGCHAIN_API_KEY,
    project: systemKeys.langchainProject || process.env.LANGCHAIN_PROJECT,
    endpoint: systemKeys.langchainEndpoint || process.env.LANGCHAIN_ENDPOINT,
    tracingEnabled:
      (systemKeys.langchainTracingV2 || process.env.LANGCHAIN_TRACING_V2) ===
      'true',
  };
}
