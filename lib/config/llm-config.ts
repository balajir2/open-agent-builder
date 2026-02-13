/**
 * LLM Configuration
 *
 * Configure available LLM providers and models
 * API keys are still in .env.local for security
 */

export interface LLMModel {
  id: string;
  name: string;
  provider: 'anthropic' | 'openai' | 'groq' | 'google';
  contextWindow: number;
  inputCostPer1M: number;
  outputCostPer1M: number;
  supportsJSON: boolean;
  supportsMCP: boolean;
  maxTokens: number;
  description?: string;
}

export interface LLMProvider {
  id: string;
  name: string;
  envKey: string;
  models: LLMModel[];
  defaultModel: string;
}

/**
 * LLM Providers Configuration
 */
export const llmProviders: LLMProvider[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    envKey: 'ANTHROPIC_API_KEY',
    defaultModel: 'claude-sonnet-4-5-20250929',
    models: [
      {
        id: 'claude-sonnet-4-5-20250929',
        name: 'Claude Sonnet 4.5',
        provider: 'anthropic',
        contextWindow: 200000,
        inputCostPer1M: 3.00,
        outputCostPer1M: 15.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 8192,
        description: 'Latest Sonnet - balanced performance for most tasks',
      },
      {
        id: 'claude-opus-4-6',
        name: 'Claude Opus 4.6',
        provider: 'anthropic',
        contextWindow: 1000000,
        inputCostPer1M: 15.00,
        outputCostPer1M: 75.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 8192,
        description: 'Most capable model - 1M token context, strongest reasoning (Feb 2026)',
      },
      {
        id: 'claude-haiku-4-5-20251001',
        name: 'Claude Haiku 4.5',
        provider: 'anthropic',
        contextWindow: 200000,
        inputCostPer1M: 1.00,
        outputCostPer1M: 5.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 8192,
        description: 'Fastest and most cost-effective model',
      },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    envKey: 'OPENAI_API_KEY',
    defaultModel: 'gpt-5.2',
    models: [
      {
        id: 'gpt-5.2',
        name: 'GPT-5.2',
        provider: 'openai',
        contextWindow: 200000,
        inputCostPer1M: 5.00,
        outputCostPer1M: 15.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 32768,
        description: 'Default flagship model for ChatGPT (Feb 2026)',
      },
      {
        id: 'o3',
        name: 'o3',
        provider: 'openai',
        contextWindow: 200000,
        inputCostPer1M: 10.00,
        outputCostPer1M: 30.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 32768,
        description: 'Advanced reasoning model with enhanced capabilities',
      },
      {
        id: 'gpt-4.5',
        name: 'GPT-4.5',
        provider: 'openai',
        contextWindow: 150000,
        inputCostPer1M: 3.50,
        outputCostPer1M: 12.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 24576,
        description: 'Pro-tier model with advanced features',
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'openai',
        contextWindow: 128000,
        inputCostPer1M: 0.15,
        outputCostPer1M: 0.60,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 16384,
        description: 'Affordable and fast with function calling',
      },
    ],
  },
  {
    id: 'groq',
    name: 'Groq',
    envKey: 'GROQ_API_KEY',
    defaultModel: 'llama-3.3-70b-versatile',
    models: [
      {
        id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
        name: 'Llama 4 Maverick 17B',
        provider: 'groq',
        contextWindow: 131072,
        inputCostPer1M: 0.30,
        outputCostPer1M: 0.40,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 65536,
        description: 'Latest Llama 4 preview - enhanced reasoning (2026)',
      },
      {
        id: 'meta-llama/llama-4-scout-17b-16e-instruct',
        name: 'Llama 4 Scout 17B',
        provider: 'groq',
        contextWindow: 131072,
        inputCostPer1M: 0.25,
        outputCostPer1M: 0.35,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 65536,
        description: 'Llama 4 scout variant - fast and capable',
      },
      {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B Versatile',
        provider: 'groq',
        contextWindow: 131072,
        inputCostPer1M: 0.59,
        outputCostPer1M: 0.79,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 32768,
        description: 'Most capable Llama 3 model - excellent reasoning',
      },
      {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B Instant',
        provider: 'groq',
        contextWindow: 131072,
        inputCostPer1M: 0.05,
        outputCostPer1M: 0.08,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 131072,
        description: 'Ultra-fast and cost-effective - 560 tokens/second',
      },
      {
        id: 'openai/gpt-oss-120b',
        name: 'GPT OSS 120B',
        provider: 'groq',
        contextWindow: 131072,
        inputCostPer1M: 0.20,
        outputCostPer1M: 0.20,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 65536,
        description: 'Large Responses API model with extended output',
      },
      {
        id: 'openai/gpt-oss-20b',
        name: 'GPT OSS 20B',
        provider: 'groq',
        contextWindow: 131072,
        inputCostPer1M: 0.10,
        outputCostPer1M: 0.10,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 65536,
        description: 'Balanced model with high speed - 1000 tokens/second',
      },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    envKey: 'GOOGLE_API_KEY',
    defaultModel: 'gemini-3-pro-preview',
    models: [
      {
        id: 'gemini-3-pro-preview',
        name: 'Gemini 3 Pro (Preview)',
        provider: 'google',
        contextWindow: 2000000,
        inputCostPer1M: 1.25,
        outputCostPer1M: 5.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 16384,
        description: 'State-of-the-art reasoning and multimodal understanding (Feb 2026)',
      },
      {
        id: 'gemini-3-flash-preview',
        name: 'Gemini 3 Flash (Preview)',
        provider: 'google',
        contextWindow: 2000000,
        inputCostPer1M: 0.35,
        outputCostPer1M: 1.40,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 16384,
        description: 'Fast general-purpose model with powerful capabilities',
      },
      {
        id: 'gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        provider: 'google',
        contextWindow: 1500000,
        inputCostPer1M: 0.50,
        outputCostPer1M: 2.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 12288,
        description: 'Production-ready model with predictable latency',
      },
      {
        id: 'gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        provider: 'google',
        contextWindow: 1500000,
        inputCostPer1M: 0.20,
        outputCostPer1M: 0.80,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 12288,
        description: 'Cost-effective production model',
      },
      {
        id: 'gemini-2.5-flash-lite',
        name: 'Gemini 2.5 Flash Lite',
        provider: 'google',
        contextWindow: 1500000,
        inputCostPer1M: 0.10,
        outputCostPer1M: 0.40,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 12288,
        description: 'Fastest flash model optimized for cost-efficiency',
      },
    ],
  },
];

/**
 * Get default model for a provider
 */
export function getDefaultModel(provider: 'anthropic' | 'openai' | 'groq' | 'google'): string {
  const config = llmProviders.find(p => p.id === provider);
  return config?.defaultModel || '';
}

/**
 * Get all models for a provider
 */
export function getModelsForProvider(provider: 'anthropic' | 'openai' | 'groq' | 'google'): LLMModel[] {
  const config = llmProviders.find(p => p.id === provider);
  return config?.models || [];
}

/**
 * Get model info by full ID (provider/model-id)
 */
export function getModelInfo(fullModelId: string): LLMModel | null {
  const [provider, modelId] = fullModelId.split('/');
  const providerConfig = llmProviders.find(p => p.id === provider);
  if (!providerConfig) return null;

  return providerConfig.models.find(m => m.id === modelId) || null;
}

/**
 * Format model ID for API calls
 */
export function formatModelId(provider: string, modelId: string): string {
  return `${provider}/${modelId}`;
}

/**
 * Get all available models (flattened)
 */
export function getAllModels(): Array<LLMModel & { fullId: string }> {
  return llmProviders.flatMap(provider =>
    provider.models.map(model => ({
      ...model,
      fullId: `${provider.id}/${model.id}`,
    }))
  );
}

/**
 * Check if provider API key is configured
 */
export function isProviderConfigured(provider: 'anthropic' | 'openai' | 'groq' | 'google'): boolean {
  const config = llmProviders.find(p => p.id === provider);
  if (!config) return false;

  // This only works server-side
  if (typeof process === 'undefined') return false;

  return !!process.env[config.envKey];
}

/**
 * Get configured providers
 */
export function getConfiguredProviders(): string[] {
  return llmProviders
    .filter(p => isProviderConfigured(p.id as any))
    .map(p => p.id);
}
