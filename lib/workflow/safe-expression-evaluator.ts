/**
 * Safe expression evaluator for if-else conditions and set-state values
 * Uses expr-eval library which provides a safe subset of JavaScript expressions
 * without access to dangerous functions or global objects
 */

import { Parser } from 'expr-eval';

/**
 * Safely evaluate an expression with given context
 * Supports mathematical operations, comparisons, logical operators, and property access
 *
 * @param expression - The expression to evaluate (e.g., "input.price > 100")
 * @param context - Variables available in the expression (e.g., { input, state, lastOutput })
 * @returns The result of the expression evaluation
 */
export function safeEvaluate(expression: string, context: Record<string, any>): any {
  if (!expression || expression.trim() === '') {
    throw new Error('Expression cannot be empty');
  }

  // Maximum expression length to prevent DoS
  const MAX_LENGTH = 1000;
  if (expression.length > MAX_LENGTH) {
    throw new Error(`Expression too long (max ${MAX_LENGTH} characters)`);
  }

  try {
    // Create parser with safe functions only
    const parser = new Parser({
      allowMemberAccess: true, // Allow object property access (e.g., input.price)
    });

    // Add custom safe functions
    parser.functions = {
      // String functions
      toLowerCase: (str: any) => String(str).toLowerCase(),
      toUpperCase: (str: any) => String(str).toUpperCase(),
      trim: (str: any) => String(str).trim(),
      includes: (str: any, search: any) => String(str).includes(String(search)),
      startsWith: (str: any, search: any) => String(str).startsWith(String(search)),
      endsWith: (str: any, search: any) => String(str).endsWith(String(search)),

      // Array functions
      length: (arr: any) => (Array.isArray(arr) ? arr.length : String(arr).length),

      // Type checking
      isNull: (val: any) => val === null || val === undefined,
      isNumber: (val: any) => typeof val === 'number' && !isNaN(val),
      isString: (val: any) => typeof val === 'string',
      isBoolean: (val: any) => typeof val === 'boolean',
      isArray: (val: any) => Array.isArray(val),

      // Math functions (already provided by expr-eval, but listed for reference)
      // abs, ceil, floor, round, sqrt, pow, min, max, random
    };

    // Parse and evaluate the expression
    const result = parser.evaluate(expression, context);

    return result;
  } catch (error) {
    // Provide helpful error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Expression evaluation failed: ${errorMessage}`);
  }
}

/**
 * Validate an expression without evaluating it
 * Useful for checking syntax at workflow save time
 */
export function validateExpression(expression: string): { valid: boolean; error?: string } {
  try {
    const parser = new Parser({
      allowMemberAccess: true,
    });

    // Try to parse (but don't evaluate)
    parser.parse(expression);

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid expression',
    };
  }
}

/**
 * Get list of variables used in an expression
 * Useful for workflow validation
 */
export function getExpressionVariables(expression: string): string[] {
  try {
    const parser = new Parser();
    const parsed = parser.parse(expression);
    return parsed.variables();
  } catch {
    return [];
  }
}

/**
 * Safe comparison helper for if-else conditions
 * Handles string comparison with case-insensitive and trim options
 */
export function safeCompare(
  left: any,
  operator: '==' | '===' | '!=' | '!==' | '>' | '<' | '>=' | '<=',
  right: any,
  options?: { caseInsensitive?: boolean; trim?: boolean }
): boolean {
  let leftVal = left;
  let rightVal = right;

  // String normalization if requested
  if (options?.trim && typeof leftVal === 'string') {
    leftVal = leftVal.trim();
  }
  if (options?.trim && typeof rightVal === 'string') {
    rightVal = rightVal.trim();
  }
  if (options?.caseInsensitive && typeof leftVal === 'string') {
    leftVal = leftVal.toLowerCase();
  }
  if (options?.caseInsensitive && typeof rightVal === 'string') {
    rightVal = rightVal.toLowerCase();
  }

  switch (operator) {
    case '==':
      return leftVal == rightVal; // eslint-disable-line eqeqeq
    case '===':
      return leftVal === rightVal;
    case '!=':
      return leftVal != rightVal; // eslint-disable-line eqeqeq
    case '!==':
      return leftVal !== rightVal;
    case '>':
      return leftVal > rightVal;
    case '<':
      return leftVal < rightVal;
    case '>=':
      return leftVal >= rightVal;
    case '<=':
      return leftVal <= rightVal;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
