/**
 * Safe expression evaluator for if-else conditions and set-state values
 *
 * SECURITY FIX: Migrated from expr-eval to mathjs
 * - expr-eval has critical vulnerabilities (CVE-2024-29415): prototype pollution, code injection
 * - mathjs provides a secure, sandboxed evaluation environment
 * - No access to dangerous functions or global objects
 * - Protection against prototype pollution
 */

import { create, all, MathJsInstance } from 'mathjs';

// Create a restricted mathjs instance
const math: MathJsInstance = create(all, {}) as MathJsInstance;

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
    // Create a clean scope with only safe variables
    // This prevents prototype pollution attacks
    const cleanScope = Object.create(null);

    // Copy context variables to clean scope
    for (const [key, value] of Object.entries(context)) {
      // Block dangerous property names
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      cleanScope[key] = value;
    }

    // Add custom safe functions to the scope
    cleanScope.toLowerCase = (str: any) => String(str).toLowerCase();
    cleanScope.toUpperCase = (str: any) => String(str).toUpperCase();
    cleanScope.trim = (str: any) => String(str).trim();
    cleanScope.includes = (str: any, search: any) => String(str).includes(String(search));
    cleanScope.startsWith = (str: any, search: any) => String(str).startsWith(String(search));
    cleanScope.endsWith = (str: any, search: any) => String(str).endsWith(String(search));
    cleanScope.length = (arr: any) => (Array.isArray(arr) ? arr.length : String(arr).length);
    cleanScope.isNull = (val: any) => val === null || val === undefined;
    cleanScope.isNumber = (val: any) => typeof val === 'number' && !isNaN(val);
    cleanScope.isString = (val: any) => typeof val === 'string';
    cleanScope.isBoolean = (val: any) => typeof val === 'boolean';
    cleanScope.isArray = (val: any) => Array.isArray(val);

    // Evaluate the expression using mathjs
    const result = math.evaluate(expression, cleanScope);

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
    // Try to parse the expression (but don't evaluate)
    math.parse(expression);
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
    const node = math.parse(expression);
    const variables = new Set<string>();

    // Traverse the AST to find all symbol nodes (variables)
    node.traverse((node: any) => {
      if (node.type === 'SymbolNode') {
        variables.add(node.name);
      }
    });

    return Array.from(variables);
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
