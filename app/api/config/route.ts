import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * API route to check if system-level API keys are configured
 * Checks Convex environment variables for system keys
 */
export async function GET() {
  try {
    // Initialize Convex client to check system keys
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Get all system-level API keys from Convex environment
    const systemKeys = await convex.action(api.systemApiKeys.getAllSystemApiKeys);

    const config = {
      anthropicConfigured: !!systemKeys.anthropic,
      groqConfigured: !!systemKeys.groq,
      openaiConfigured: !!systemKeys.openai,
      googleConfigured: !!systemKeys.google,
      firecrawlConfigured: !!systemKeys.firecrawl,
      arcadeConfigured: !!systemKeys.arcade,
      e2bConfigured: !!systemKeys.e2b,
      tavilyConfigured: !!systemKeys.tavily,
      serperConfigured: !!systemKeys.serper,
      serpApiConfigured: !!systemKeys.serpapi,
      scraperapiConfigured: !!systemKeys.scraperapi,
      browserlessConfigured: !!systemKeys.browserless,
      gammaConfigured: !!systemKeys.gamma,
      hasKeys: !!(
        (systemKeys.anthropic || systemKeys.groq || systemKeys.openai || systemKeys.google) &&
        systemKeys.firecrawl
      ),
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    );
  }
}
