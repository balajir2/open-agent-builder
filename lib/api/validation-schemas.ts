/**
 * SECURITY FIX: Zod validation schemas for API input validation
 * Prevents injection attacks and ensures data integrity
 */

import { z } from 'zod';

// Maximum lengths to prevent DoS attacks
const MAX_STRING_LENGTH = 10000;
const MAX_ARRAY_LENGTH = 100;
const MAX_WORKFLOW_NAME_LENGTH = 255;
const MAX_NODE_COUNT = 100;

/**
 * Workflow node schema
 */
const WorkflowNodeSchema = z.object({
  id: z.string().max(255),
  type: z.enum([
    'start',
    'agent',
    'mcp',
    'extract',
    'http',
    'transform',
    'if-else',
    'while',
    'user-approval',
    'end',
    'set-state',
    'guardrails',
    'arcade',
    'note',
    'data-transform'
  ]),
  position: z.object({
    x: z.number(),
    y: z.number()
  }).optional(),
  data: z.record(z.any()).optional(),
}).passthrough(); // Allow additional fields for node-specific data

/**
 * Workflow edge schema
 */
const WorkflowEdgeSchema = z.object({
  id: z.string().max(255),
  source: z.string().max(255),
  target: z.string().max(255),
  sourceHandle: z.string().max(255).optional(),
  targetHandle: z.string().max(255).optional(),
  label: z.string().max(255).optional(),
  type: z.string().max(50).optional(),
}).passthrough();

/**
 * Complete workflow schema
 */
export const WorkflowExecutionSchema = z.object({
  input: z.union([
    z.string().max(MAX_STRING_LENGTH),
    z.record(z.any()),
    z.null()
  ]).optional(),
  workflow: z.object({
    id: z.string().max(255).optional(),
    name: z.string().max(MAX_WORKFLOW_NAME_LENGTH).optional(),
    description: z.string().max(1000).optional(),
    nodes: z.array(WorkflowNodeSchema).max(MAX_NODE_COUNT),
    edges: z.array(WorkflowEdgeSchema).max(MAX_NODE_COUNT * 3), // Max 3 edges per node
    customId: z.string().max(255).optional(),
    userId: z.string().max(255).optional(),
  }).passthrough(),
});

/**
 * Simple input validation for streaming execution
 */
export const WorkflowInputSchema = z.union([
  z.string().max(MAX_STRING_LENGTH),
  z.record(z.any()),
  z.null()
]).optional();

/**
 * Workflow ID schema (for path parameters)
 */
export const WorkflowIdSchema = z.string()
  .max(255)
  .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid workflow ID format');

/**
 * Resume workflow schema (for human-in-the-loop)
 */
export const WorkflowResumeSchema = z.object({
  threadId: z.string().max(255),
  approved: z.boolean(),
  reason: z.string().max(1000).optional(),
  modifiedData: z.record(z.any()).optional(),
});

/**
 * API key validation schema
 */
export const ApiKeySchema = z.object({
  provider: z.enum([
    'anthropic',
    'openai',
    'groq',
    'google',
    'firecrawl',
    'e2b',
    'tavily-search',
    'serper-search',
    'serpapi-search',
    'scraperapi',
    'browserless',
    'arcade'
  ]),
  key: z.string()
    .min(10, 'API key too short')
    .max(500, 'API key too long')
    .regex(/^[A-Za-z0-9_-]+$/, 'Invalid API key format'),
});

/**
 * MCP server configuration schema
 */
export const McpServerSchema = z.object({
  name: z.string().max(255),
  url: z.string().url().max(1000),
  type: z.enum(['sse', 'stdio', 'http', 'websocket']),
  config: z.record(z.any()).optional(),
});

/**
 * HTTP node URL validation
 */
export const HttpUrlSchema = z.string()
  .url('Invalid URL format')
  .max(2000)
  .refine(
    (url) => {
      // Block localhost and private IPs to prevent SSRF
      const hostname = new URL(url).hostname;
      const privateRanges = [
        /^localhost$/i,
        /^127\./,
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[01])\./,
        /^192\.168\./,
        /^169\.254\./,
        /^\[::1\]$/,
        /^\[fc00:/,
      ];
      return !privateRanges.some(pattern => pattern.test(hostname));
    },
    { message: 'Private IP addresses and localhost are not allowed (SSRF protection)' }
  );

/**
 * Transform script validation
 */
export const TransformScriptSchema = z.string()
  .max(10000, 'Script too long')
  .refine(
    (script) => {
      // Block dangerous patterns
      const dangerousPatterns = [
        /eval\s*\(/i,
        /Function\s*\(/i,
        /setTimeout\s*\(/i,
        /setInterval\s*\(/i,
        /__proto__/i,
        /constructor\s*\[/i,
      ];
      return !dangerousPatterns.some(pattern => pattern.test(script));
    },
    { message: 'Script contains potentially dangerous code patterns' }
  );

/**
 * Generic pagination schema
 */
export const PaginationSchema = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

/**
 * Safe validation helper that returns parsed data or null
 */
export function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  error?: string;
} {
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      const errorMessage = result.error.errors
        .map(e => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Validation failed'
    };
  }
}

/**
 * Validation error response helper
 */
export function createValidationErrorResponse(error: string) {
  return {
    error: 'Validation failed',
    details: error,
    status: 400
  };
}
