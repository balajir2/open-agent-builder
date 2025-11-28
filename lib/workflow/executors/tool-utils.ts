/**
 * Tool Utilities
 * Centralized utilities for safe tool result handling
 * This ensures all tools work consistently regardless of response format
 */

/**
 * Safely parse JSON with automatic fallback to raw content
 * This prevents JSON parsing errors from breaking workflows
 */
export function safeJsonParse<T = any>(
  content: string,
  fallbackToRaw: boolean = true
): T | string {
  if (!content) {
    return ''; // Return empty string without type assertion
  }

  try {
    return JSON.parse(content) as T;
  } catch (e) {
    if (fallbackToRaw) {
      // If not valid JSON, return the raw content
      return content; // Return string without type assertion
    }
    throw new Error(
      `Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`
    );
  }
}

/**
 * Tool result types that tools can return
 */
export type ToolResult =
  | string
  | number
  | boolean
  | object
  | Array<any>
  | null
  | undefined;

/**
 * Normalized tool result format
 */
export interface NormalizedToolResult {
  /** The actual result data */
  data: ToolResult;
  /** Original raw response (for debugging) */
  raw?: string;
  /** Whether the response was JSON */
  isJson: boolean;
  /** Any error that occurred */
  error?: string;
}

/**
 * Normalize tool results to a consistent format
 * Handles:
 * - Plain text responses (like search results)
 * - JSON responses (like API data)
 * - Error responses
 * - Mixed content types
 *
 * @param result - The raw tool result
 * @param options - Normalization options
 * @returns Normalized result with metadata
 */
export function normalizeToolResult(
  result: any,
  options: {
    /** Prefer JSON parsing even for plain text */
    preferJson?: boolean;
    /** Include raw response in output */
    includeRaw?: boolean;
  } = {}
): NormalizedToolResult {
  const { preferJson = false, includeRaw = false } = options;

  // Handle null/undefined
  if (result === null || result === undefined) {
    return {
      data: result,
      isJson: false,
    };
  }

  // Handle non-string primitives (numbers, booleans)
  if (typeof result !== 'string' && typeof result !== 'object') {
    return {
      data: result,
      isJson: false,
    };
  }

  // Handle objects (already parsed)
  if (typeof result === 'object') {
    let raw: string | undefined;
    if (includeRaw) {
      try {
        raw = JSON.stringify(result);
      } catch (e) {
        // Handle circular references or other serialization errors
        raw = '[Object - Could not serialize: circular reference detected]';
        console.warn('[normalizeToolResult] Circular reference detected in tool result');
      }
    }

    return {
      data: result,
      isJson: true,
      ...(raw && { raw }),
    };
  }

  // Handle strings - try to parse as JSON if preferJson is true
  if (preferJson) {
    const parsed = safeJsonParse(result, false);
    if (typeof parsed !== 'string') {
      return {
        data: parsed,
        isJson: true,
        ...(includeRaw && { raw: result }),
      };
    }
  }

  // Return as plain text
  return {
    data: result,
    isJson: false,
    ...(includeRaw && { raw: result }),
  };
}

/**
 * Format tool result for LLM consumption
 * Ensures the result is in the best format for the LLM to understand
 *
 * @param result - The normalized tool result
 * @returns Formatted string or object for LLM
 */
export function formatToolResultForLLM(result: NormalizedToolResult): string {
  if (result.error) {
    return `Error: ${result.error}`;
  }

  const { data, isJson } = result;

  // Handle null/undefined
  if (data === null) return 'null';
  if (data === undefined) return 'undefined';

  // Handle primitives
  if (typeof data === 'string') return data;
  if (typeof data === 'number') return String(data);
  if (typeof data === 'boolean') return String(data);

  // Handle objects/arrays - stringify with pretty formatting
  if (isJson) {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      // Handle circular references
      if (e instanceof Error && e.message.includes('circular')) {
        console.warn('[formatToolResultForLLM] Circular reference detected, using fallback');
        // Try to extract useful information without full serialization
        if (Array.isArray(data)) {
          return `[Array with ${data.length} items - contains circular reference]`;
        }
        if (typeof data === 'object' && data !== null) {
          const keys = Object.keys(data);
          return `{Object with keys: ${keys.join(', ')} - contains circular reference}`;
        }
      }
      // Fallback to string representation
      return String(data);
    }
  }

  // Fallback
  return String(data);
}

/**
 * Wrap a tool function with automatic result normalization
 * Use this when creating new tools to ensure consistent behavior
 *
 * @example
 * const myTool = wrapTool(async (input) => {
 *   const response = await fetch(url);
 *   return response.text(); // Can return text or JSON - will be normalized
 * });
 */
/**
 * Truncate content to a safe token limit (approximation)
 * 1 token ~= 4 characters
 */
export function truncateContent(content: string, maxTokens: number = 15000): string {
  if (!content) return '';
  const maxLength = maxTokens * 4;
  if (content.length <= maxLength) return content;

  return content.substring(0, maxLength) + `\n...[Content truncated. Original size: ${content.length} chars. Showing first ${maxLength} chars]`;
}

/**
 * Wrap a tool function with automatic result normalization
 * Use this when creating new tools to ensure consistent behavior
 *
 * @example
 * const myTool = wrapTool(async (input) => {
 *   const response = await fetch(url);
 *   return response.text(); // Can return text or JSON - will be normalized
 * });
 */
export function wrapToolFunction<TInput = any, TOutput = any>(
  toolFn: (input: TInput) => Promise<TOutput> | TOutput,
  options: {
    /** Tool name for logging */
    name?: string;
    /** Normalize the result */
    normalize?: boolean;
    /** Maximum response size in bytes (default: 50KB ~ 12.5k tokens) */
    maxSize?: number;
  } = {}
): (input: TInput) => Promise<string> {
  const { name = 'unknown', normalize = true, maxSize = 50 * 1024 } = options;

  return async (input: TInput): Promise<string> => {
    try {
      const result = await toolFn(input);

      // Convert result to string to check size
      let stringResult: string;
      if (!normalize) {
        stringResult = typeof result === 'string' ? result : JSON.stringify(result);
      } else {
        const normalized = normalizeToolResult(result, { includeRaw: false });
        stringResult = formatToolResultForLLM(normalized);
      }

      // Check response size and truncate if necessary
      const sizeInBytes = Buffer.byteLength(stringResult, 'utf8');
      if (sizeInBytes > maxSize) {
        const sizeKB = (sizeInBytes / 1024).toFixed(2);
        const maxKB = (maxSize / 1024).toFixed(2);
        console.warn(`[Tool: ${name}] Response large: ${sizeKB}KB (max: ${maxKB}KB). Truncating...`);

        // Truncate to maxSize
        // Note: Buffer.byteLength is accurate but substring works on chars.
        // We'll approximate by chars for simplicity/speed.
        return stringResult.substring(0, maxSize) + `\n...[Content truncated. Original size: ${sizeKB}KB. Showing first ${maxKB}KB]`;
      }

      return stringResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      console.error(`[Tool: ${name}] Error:`, {
        message: errorMessage,
        stack: errorStack,
        input: typeof input === 'string' ? input.substring(0, 100) : '[complex input]',
      });

      // Return structured error for better handling
      return JSON.stringify({
        error: true,
        message: errorMessage,
        tool: name,
        timestamp: new Date().toISOString(),
      });
    }
  };
}

/**
 * Safe wrapper for tool call results from LLM
 * Handles the parsing of tool results that come from LLM tool calls
 *
 * @param toolResult - Tool result from LLM (might be string or object)
 * @returns Safely parsed result
 */
export function parseToolCallResult(toolResult: any): any {
  if (!toolResult) return null;

  // If it's already an object, return it
  if (typeof toolResult === 'object') {
    return toolResult;
  }

  // If it's a string, try to parse it
  if (typeof toolResult === 'string') {
    return safeJsonParse(toolResult, true);
  }

  // Return as-is for other types
  return toolResult;
}

/**
 * Validate tool result structure
 * Ensures tool results conform to expected format
 */
export function validateToolResult(
  result: any,
  options: {
    /** Required fields in the result */
    requiredFields?: string[];
    /** Expected result type */
    expectedType?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  } = {}
): { valid: boolean; error?: string } {
  const { requiredFields = [], expectedType } = options;

  if (result === null || result === undefined) {
    return { valid: false, error: 'Result is null or undefined' };
  }

  // Check expected type
  if (expectedType) {
    const actualType = Array.isArray(result) ? 'array' : typeof result;
    if (actualType !== expectedType) {
      return {
        valid: false,
        error: `Expected type ${expectedType}, got ${actualType}`,
      };
    }
  }

  // Check required fields (for objects)
  if (requiredFields.length > 0 && typeof result === 'object' && result !== null) {
    for (const field of requiredFields) {
      // Check if field exists
      if (!(field in result)) {
        return {
          valid: false,
          error: `Missing required field: ${field}`,
        };
      }

      // Check if field has a value (not null or undefined)
      const value = (result as any)[field];
      if (value === null || value === undefined) {
        return {
          valid: false,
          error: `Required field '${field}' is null or undefined`,
        };
      }

      // Check if string fields are not empty
      if (typeof value === 'string' && value.trim() === '') {
        return {
          valid: false,
          error: `Required field '${field}' is an empty string`,
        };
      }
    }
  }

  return { valid: true };
}
