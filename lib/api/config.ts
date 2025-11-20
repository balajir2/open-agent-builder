/**
 * Server-side API configuration utilities
 * Use this for getting API keys in API routes and server components
 */

export interface APIKeys {
  anthropic?: string;
  groq?: string;
  openai?: string;
  google?: string;  // Google Gemini
  firecrawl?: string;
  arcade?: string;
  e2b?: string;
  tavily?: string;
  serper?: string;
  serpapi?: string;
  scraperapi?: string;
  browserless?: string;
}

/**
 * Get API keys from environment variables (server-side only)
 * Returns available keys even if some are missing
 */
export function getServerAPIKeys(): APIKeys {
  return {
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
}

/**
 * Check if required API keys are configured
 */
export function hasServerAPIKeys(): boolean {
  const hasLLMKey = !!(process.env.ANTHROPIC_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || process.env.GOOGLE_API_KEY);
  return hasLLMKey && !!process.env.FIRECRAWL_API_KEY;
}
