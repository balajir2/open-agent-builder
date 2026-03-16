/**
 * LLM API Key Management
 *
 * Provides API keys for LLM providers with fallback logic:
 * 1. Check user-specific keys from database (via authenticated Convex client)
 * 2. Fall back to environment variables if no user key exists
 *
 * SECURITY: All Convex calls use the authenticated client so userId
 * is derived server-side from the session token, not from caller args.
 */

import { api } from "@/convex/_generated/api";
import { getAuthenticatedConvexClient } from "@/lib/convex/client";

/**
 * Get the API key for a specific LLM provider
 * Checks user keys first, then falls back to environment variables
 *
 * @param provider - The LLM provider ('anthropic', 'openai', 'groq', 'google')
 * @param userId - Ignored (kept for backwards-compatible call sites). Auth is derived from session.
 * @returns The API key or null if not found
 */
export async function getLLMApiKey(
  provider: 'anthropic' | 'openai' | 'groq' | 'google',
  userId?: string
): Promise<string | null> {
  // Try to get user-specific key via authenticated client
  try {
    const client = await getAuthenticatedConvexClient();
    const userKey = await client.action(api.userLLMKeysActions.getActiveKey, {
      provider,
    });

    if (userKey?.apiKey) {
      // Update usage stats (fire-and-forget)
      client.mutation(api.userLLMKeys.updateKeyUsage, {
        provider,
      }).catch(() => {}); // Don't fail if usage update fails

      return userKey.apiKey;
    }
  } catch (error) {
    // If auth fails or no user key, fall through to env vars
  }

  // Fall back to environment variables
  const envKeyMap = {
    anthropic: 'ANTHROPIC_API_KEY',
    openai: 'OPENAI_API_KEY',
    groq: 'GROQ_API_KEY',
    google: 'GOOGLE_API_KEY',
  };

  const envKey = envKeyMap[provider];
  const apiKey = process.env[envKey];

  if (apiKey) {
    return apiKey;
  }

  return null;
}

/**
 * Get the API key for a specific tool (e.g., 'firecrawl', 'serper')
 * Checks user keys first, then falls back to environment variables
 */
export async function getToolApiKey(
  toolId: string,
  userId?: string
): Promise<string | null> {
  // Try to get user-specific key via authenticated client
  try {
    const client = await getAuthenticatedConvexClient();
    const userKey = await client.action(api.userToolKeysActions.getActiveKey, {
      toolId,
    });

    if (userKey?.apiKey) {
      return userKey.apiKey;
    }
  } catch (error) {
    // If auth fails or no user key, fall through to env vars
  }

  // Fall back to environment variables
  const envKeyMap: Record<string, string> = {
    'firecrawl': 'FIRECRAWL_API_KEY',
    'serper': 'SERPER_API_KEY',
    'serper-search': 'SERPER_API_KEY',
    'serpapi': 'SERPAPI_API_KEY',
    'serpapi-search': 'SERPAPI_API_KEY',
    'tavily': 'TAVILY_API_KEY',
    'tavily-search': 'TAVILY_API_KEY',
    'scraperapi': 'SCRAPERAPI_API_KEY',
    'browserless': 'BROWSERLESS_API_KEY',
    'arcade': 'ARCADE_API_KEY',
    'e2b': 'E2B_API_KEY',
  };

  const envKey = envKeyMap[toolId];
  if (envKey && process.env[envKey]) {
    return process.env[envKey] || null;
  }

  return null;
}

/**
 * Check if a provider has an API key configured (either user or env)
 */
export async function isProviderConfigured(
  provider: 'anthropic' | 'openai' | 'groq' | 'google',
  userId?: string
): Promise<boolean> {
  const apiKey = await getLLMApiKey(provider, userId);
  return !!apiKey;
}

/**
 * Get all configured providers for a user
 */
export async function getConfiguredProviders(userId?: string): Promise<string[]> {
  const providers: ('anthropic' | 'openai' | 'groq' | 'google')[] = ['anthropic', 'openai', 'groq', 'google'];
  const configured: string[] = [];

  for (const provider of providers) {
    if (await isProviderConfigured(provider, userId)) {
      configured.push(provider);
    }
  }

  return configured;
}

/**
 * Initialize LLM client with appropriate API key
 * This is a helper function that can be used by the execute routes
 */
export async function initializeLLMClient(
  provider: 'anthropic' | 'openai' | 'groq' | 'google',
  userId?: string
): Promise<{ apiKey: string; provider: string }> {
  const apiKey = await getLLMApiKey(provider, userId);

  if (!apiKey) {
    throw new Error(
      `No API key found for ${provider}. Please configure your API key in Settings or set the ${provider === 'anthropic' ? 'ANTHROPIC_API_KEY' :
        provider === 'openai' ? 'OPENAI_API_KEY' :
          provider === 'google' ? 'GOOGLE_API_KEY' :
            'GROQ_API_KEY'
      } environment variable.`
    );
  }

  return { apiKey, provider };
}

/**
 * Get configuration status for all providers
 * Useful for the settings panel to show which providers are configured
 */
export async function getProvidersStatus(userId?: string): Promise<{
  anthropic: { configured: boolean; source: 'user' | 'env' | null };
  openai: { configured: boolean; source: 'user' | 'env' | null };
  groq: { configured: boolean; source: 'user' | 'env' | null };
  google: { configured: boolean; source: 'user' | 'env' | null };
}> {
  const status: any = {};

  for (const provider of ['anthropic', 'openai', 'groq', 'google'] as const) {
    // Check user key first via authenticated client
    try {
      const client = await getAuthenticatedConvexClient();
      const userKey = await client.action(api.userLLMKeysActions.getActiveKey, {
        provider,
      });

      if (userKey) {
        status[provider] = { configured: true, source: 'user' };
        continue;
      }
    } catch (error) {
      // Continue to env check
    }

    // Check environment variable
    const envKeyMap = {
      anthropic: 'ANTHROPIC_API_KEY',
      openai: 'OPENAI_API_KEY',
      groq: 'GROQ_API_KEY',
      google: 'GOOGLE_API_KEY',
    };

    const envKey = envKeyMap[provider];
    if (process.env[envKey]) {
      status[provider] = { configured: true, source: 'env' };
    } else {
      status[provider] = { configured: false, source: null };
    }
  }

  return status;
}
