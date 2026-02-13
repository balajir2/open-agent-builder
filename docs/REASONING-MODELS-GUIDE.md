# Reasoning Models - Token Parameter Guide

**Last Updated**: February 13, 2026

## Overview

Some LLM models use different parameter names for token limits. This guide explains which models require special handling and why.

---

## The Issue

OpenAI's reasoning models (o1, o3, GPT-5 series) use **`max_completion_tokens`** instead of **`max_tokens`** for specifying output token limits. Using the wrong parameter results in:

```
400 Unsupported parameter: 'max_tokens' is not supported with this model.
Use 'max_completion_tokens' instead.
```

---

## Which Models Are Affected?

### ✅ OpenAI Reasoning Models (Requires max_completion_tokens)

| Model | Parameter | Status |
|-------|-----------|--------|
| **o1** | `max_completion_tokens` | ✅ Supported |
| **o1-mini** | `max_completion_tokens` | ✅ Supported |
| **o3** | `max_completion_tokens` | ✅ Supported |
| **o3-mini** | `max_completion_tokens` | ✅ Supported |
| **gpt-5** | `max_completion_tokens` | ✅ Supported |
| **gpt-5.2** | `max_completion_tokens` | ✅ Supported |

### ✅ OpenAI Standard Models (Uses max_tokens)

| Model | Parameter | Status |
|-------|-----------|--------|
| **GPT-4o** | `max_tokens` | ✅ Supported |
| **GPT-4.5** | `max_tokens` | ✅ Supported |
| **gpt-4o-mini** | `max_tokens` | ✅ Supported |

---

## Other Providers

### Anthropic (Claude) - No Issue ✅

**Parameter**: `max_tokens`

All Anthropic models use the standard `max_tokens` parameter:
- Claude Opus 4.6
- Claude Sonnet 4.5
- Claude Haiku 4.5

**No special handling needed.**

```typescript
// Anthropic API call (from agent.ts line 277)
const response = await client.beta.messages.create({
  model: modelName,
  max_tokens: maxTokens,  // ✅ Works for all Claude models
  messages: messages as any,
});
```

---

### Google (Gemini) - No Issue ✅

**Parameter**: `maxOutputTokens` (constructor parameter)

Google uses a different API structure through LangChain. Token limits are set in the constructor, not the API call:

```typescript
// Google API call (from agent.ts line 1047)
const model = new ChatGoogleGenerativeAI({
  apiKey: apiKeys.google,
  model: modelName,
  maxOutputTokens: data.tokenLimit,  // ✅ Works for all Gemini models
});
```

**Supported models**:
- Gemini 3 Pro Preview
- Gemini 3 Flash
- Gemini 2.5 Pro
- Gemini 2.5 Flash

**No special handling needed.**

---

### Groq - Same as OpenAI ⚠️

**Parameter**: `max_tokens` or `max_completion_tokens` (depends on model)

Groq uses OpenAI-compatible API, so the same rules apply:
- **Standard models** (Llama 3.x, etc.): Use `max_tokens`
- **Reasoning models** (if/when Groq adds them): Would use `max_completion_tokens`

**Current supported models** (all use `max_tokens`):
- Llama 4 Maverick 17B
- Llama 4 Scout 8B
- Llama 3.3 70B
- Llama 3.1 8B Instant
- GPT OSS 120B
- GPT OSS 20B

**No special handling needed currently**, but would need same fix if reasoning models are added.

---

## How It's Implemented

### Detection Logic

```typescript
// lib/workflow/executors/agent.ts (line 13)
function isReasoningModel(modelName: string): boolean {
  const lowerModel = modelName.toLowerCase();
  return lowerModel.startsWith('o1') ||      // o1, o1-mini
         lowerModel.startsWith('o3') ||      // o3, o3-mini
         lowerModel.startsWith('gpt-5');     // gpt-5, gpt-5.2
}
```

### API Call Logic

```typescript
// lib/workflow/executors/agent.ts (line 838)
const response = await client.chat.completions.create({
  model: modelName,
  messages: messages as any,
  ...(data.tokenLimit ? (isReasoningModel(modelName)
    ? { max_completion_tokens: maxTokens }  // ← Reasoning models
    : { max_tokens: maxTokens })             // ← Standard models
  : {}),
});
```

This conditional logic ensures:
- ✅ Reasoning models use `max_completion_tokens`
- ✅ Standard models use `max_tokens`
- ✅ No impact on existing workflows
- ✅ Automatic detection based on model name

---

## Testing

### Regression Tests

Added comprehensive tests in `tests/model-regression.spec.ts`:

**Reasoning Model Tests**:
- Verifies `max_completion_tokens` is sent for o1, o3, gpt-5 models
- Captures actual API request body
- Ensures parameter is correct

**Control Test**:
- Verifies `max_tokens` still used for GPT-4o
- Ensures standard models unaffected

Run tests:
```bash
npm run test -- tests/model-regression.spec.ts
```

---

## Summary

| Provider | Parameter | Special Handling |
|----------|-----------|------------------|
| **OpenAI (reasoning)** | `max_completion_tokens` | ✅ Implemented |
| **OpenAI (standard)** | `max_tokens` | ✅ Working |
| **Anthropic** | `max_tokens` | ✅ No change needed |
| **Google** | `maxOutputTokens` | ✅ No change needed |
| **Groq** | `max_tokens` | ✅ No change needed |

**Bottom line**: Only OpenAI reasoning models (o1, o3, gpt-5) require special handling. All other providers work with their existing parameter structure.

---

## References

- OpenAI API Documentation: https://platform.openai.com/docs/guides/reasoning
- Implementation: `lib/workflow/executors/agent.ts`
- Tests: `tests/model-regression.spec.ts`
- Related Commits:
  - `8c967df` - Initial o1/o3 support
  - `5d33108` - Added GPT-5 series
  - `dda7155` - Added regression tests
