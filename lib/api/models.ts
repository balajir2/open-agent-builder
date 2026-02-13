/**
 * Model validation and configuration for LLM providers
 */

import { llmProviders } from '@/lib/config/llm-config';

export type Provider = 'openai' | 'anthropic' | 'groq' | 'google';

export interface ModelConfig {
  provider: Provider;
  modelName: string;
  isValid: boolean;
  error?: string;
}

/**
 * Supported models by provider (MCP-compatible only)
 * Derived from llm-config.ts
 */
export const SUPPORTED_MODELS = {
  openai: llmProviders.find(p => p.id === 'openai')?.models.map(m => m.id) || [],
  anthropic: llmProviders.find(p => p.id === 'anthropic')?.models.map(m => m.id) || [],
  groq: llmProviders.find(p => p.id === 'groq')?.models.map(m => m.id) || [],
  google: llmProviders.find(p => p.id === 'google')?.models.map(m => m.id) || [],
} as const;

/**
 * Default models for each provider
 * Derived from llm-config.ts
 */
export const DEFAULT_MODELS = {
  openai: llmProviders.find(p => p.id === 'openai')?.defaultModel || 'gpt-5.2',
  anthropic: llmProviders.find(p => p.id === 'anthropic')?.defaultModel || 'claude-sonnet-4-5-20250929',
  groq: llmProviders.find(p => p.id === 'groq')?.defaultModel || 'llama-3.3-70b-versatile',
  google: llmProviders.find(p => p.id === 'google')?.defaultModel || 'gemini-3-pro-preview',
} as const;

/**
 * Parse a model string into provider and model name
 * Supports formats:
 * - "provider/model-name" (e.g., "openai/gpt-5.2")
 * - "model-name" (defaults to openai provider)
 */
export function parseModelString(modelString?: string): { provider: Provider; modelName: string } {
  if (!modelString) {
    return { provider: 'openai', modelName: DEFAULT_MODELS.openai };
  }

  if (modelString.includes('/')) {
    const [provider, modelName] = modelString.split('/', 2) as [string, string];

    // Validate provider
    if (provider !== 'openai' && provider !== 'anthropic' && provider !== 'groq' && provider !== 'google') {
      // Default to openai if provider is unknown
      return { provider: 'openai', modelName: DEFAULT_MODELS.openai };
    }

    return { provider: provider as Provider, modelName };
  }

  // No provider prefix, default to openai
  return { provider: 'openai', modelName: modelString };
}

/**
 * Validate a model configuration
 */
export function validateModel(modelString?: string): ModelConfig {
  const { provider, modelName } = parseModelString(modelString);

  // Check if model is in supported list
  const supportedModels = SUPPORTED_MODELS[provider];
  const isValid = (supportedModels as readonly string[]).includes(modelName);

  if (!isValid) {
    return {
      provider,
      modelName,
      isValid: false,
      error: `Model '${modelName}' is not supported for provider '${provider}'. Supported models: ${supportedModels.join(', ')}`,
    };
  }

  return {
    provider,
    modelName,
    isValid: true,
  };
}

/**
 * Get the default model for a provider
 */
export function getDefaultModel(provider: Provider): string {
  return DEFAULT_MODELS[provider];
}

/**
 * Check if a provider is supported
 */
export function isSupportedProvider(provider: string): provider is Provider {
  return provider === 'openai' || provider === 'anthropic' || provider === 'groq' || provider === 'google';
}

/**
 * Get model string with provider prefix
 */
export function getModelString(provider: Provider, modelName: string): string {
  return `${provider}/${modelName}`;
}

/**
 * Ensure model string is compatible with OpenAI Responses API
 * (only OpenAI models work with the Responses API)
 */
export function ensureOpenAIModel(modelString?: string): string {
  const { provider, modelName } = parseModelString(modelString);

  // If it's already an OpenAI model, return it
  if (provider === 'openai') {
    // Validate it's a supported OpenAI model
    const validation = validateModel(modelString);
    if (validation.isValid) {
      return modelName;
    }
    // Fall back to default if invalid
    return DEFAULT_MODELS.openai;
  }

  // For non-OpenAI providers, return default OpenAI model
  return DEFAULT_MODELS.openai;
}
