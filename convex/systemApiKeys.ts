"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * System API Keys - Retrieved from Convex Environment Variables
 *
 * These are fallback keys used when users haven't configured their own keys.
 * All keys are stored in Convex environment (set via `npx convex env set KEY_NAME value`)
 *
 * NOTE: These must be actions (not queries) because they use Node.js runtime to access process.env
 */

/**
 * Get system API key for a specific provider or tool
 * This is called from Next.js API routes to retrieve system-level fallback keys
 */
export const getSystemApiKey = action({
  args: {
    keyName: v.string()
  },
  handler: async (ctx, args) => {
    // Map friendly names to environment variable names
    const envKeyMap: Record<string, string> = {
      'anthropic': 'ANTHROPIC_API_KEY',
      'openai': 'OPENAI_API_KEY',
      'groq': 'GROQ_API_KEY',
      'google': 'GOOGLE_API_KEY',
      'firecrawl': 'FIRECRAWL_API_KEY',
      'e2b': 'E2B_API_KEY',
      'tavily': 'TAVILY_API_KEY',
      'tavily-search': 'TAVILY_API_KEY',
      'serper': 'SERPER_API_KEY',
      'serper-search': 'SERPER_API_KEY',
      'serpapi': 'SERPAPI_API_KEY',
      'serpapi-search': 'SERPAPI_API_KEY',
      'scraperapi': 'SCRAPERAPI_API_KEY',
      'browserless': 'BROWSERLESS_API_KEY',
      'arcade': 'ARCADE_API_KEY',
      'gamma': 'GAMMA_API_KEY',
      'gamma-api': 'GAMMA_API_KEY',
      'encryption': 'ENCRYPTION_KEY',
    };

    const envKey = envKeyMap[args.keyName.toLowerCase()];

    if (!envKey) {
      console.warn(`Unknown API key name: ${args.keyName}`);
      return null;
    }

    // Return the key from Convex environment
    return process.env[envKey] || null;
  },
});

/**
 * Get all available system API keys
 * Returns an object with all configured system keys
 */
export const getAllSystemApiKeys = action({
  args: {},
  handler: async (ctx) => {
    return {
      anthropic: process.env.ANTHROPIC_API_KEY || null,
      openai: process.env.OPENAI_API_KEY || null,
      groq: process.env.GROQ_API_KEY || null,
      google: process.env.GOOGLE_API_KEY || null,
      firecrawl: process.env.FIRECRAWL_API_KEY || null,
      arcade: process.env.ARCADE_API_KEY || null,
      e2b: process.env.E2B_API_KEY || null,
      tavily: process.env.TAVILY_API_KEY || null,
      serper: process.env.SERPER_API_KEY || null,
      serpapi: process.env.SERPAPI_API_KEY || null,
      scraperapi: process.env.SCRAPERAPI_API_KEY || null,
      browserless: process.env.BROWSERLESS_API_KEY || null,
      gamma: process.env.GAMMA_API_KEY || null,
    };
  },
});
