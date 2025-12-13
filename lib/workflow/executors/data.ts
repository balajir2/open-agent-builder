import { WorkflowNode, WorkflowState } from '../types';
import CodeInterpreter from '@e2b/code-interpreter';

/**
 * Execute Data Nodes - Transform, Set State
 *
 * SECURITY NOTE: Transform Node Script Execution
 *
 * E2B SANDBOX INTEGRATION (ENABLED):
 * - Uses E2B CodeInterpreter for secure sandboxed JavaScript execution
 * - Executes in isolated cloud environment with 5-minute timeout
 * - Safe for untrusted code execution
 * - Requires E2B_API_KEY environment variable
 *
 * E2B Execution:
 * - Creates isolated sandbox per execution
 * - Supports JavaScript via Node.js subprocess in Python sandbox
 * - 60-second timeout per execution
 * - Automatic cleanup after execution
 */
export async function executeDataNode(
  node: WorkflowNode,
  state: WorkflowState
): Promise<any> {
  const { data } = node;
  const nodeType = data.nodeType || node.type;

  try {
    switch (nodeType) {
      case 'transform':
      case 'data-transform':
        return await executeTransform(data, state);

      case 'set-state':
      case 'set state':
        return await executeSetState(data, state);

      case 'export':
        return await executeExport(data, state);

      default:
        throw new Error(`Unknown data node type: ${nodeType}`);
    }
  } catch (error) {
    // Log error with context
    console.error(`Data node ${node.id} (${nodeType}) failed:`, error);

    // Re-throw with more context
    throw new Error(
      `Node ${node.id} execution failed: ${error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

/**
 * Execute transform using E2B sandbox (REQUIRED FOR SECURITY)
 */
async function executeTransform(data: any, state: WorkflowState): Promise<any> {
  // Get the transform script from node data
  // Support both transformScript (UI) and transformation (templates)
  const transformScript = data.transformScript || data.transformation;

  // If no transform script, just pass through the input
  if (!transformScript || transformScript.trim() === '') {
    console.log('⚠️ No transform script provided, passing through input');
    return state.variables.lastOutput || {};
  }

  // E2B sandbox is REQUIRED for security
  if (!process.env?.E2B_API_KEY) {
    throw new Error(
      'E2B_API_KEY is required for secure code execution. ' +
      'Get your key at https://e2b.dev and set it in your environment variables. ' +
      'Transform nodes execute user-provided code and must run in a secure sandbox.'
    );
  }

  return await executeTransformE2B(transformScript, state);
}

/**
 * Execute transform using E2B CodeInterpreter (SECURE)
 * Uses Python to run Node.js for JavaScript execution
 */
async function executeTransformE2B(transformScript: string, state: WorkflowState): Promise<any> {
  console.log('🔒 Executing transform in E2B sandbox...');

  // Prepare the data for the sandbox
  const sandboxedInput = JSON.parse(JSON.stringify(state.variables.lastOutput || {}));
  const sandboxedState = {
    variables: JSON.parse(JSON.stringify(state.variables))
  };

  // Create E2B sandbox
  const sandbox = await CodeInterpreter.create({
    apiKey: process.env.E2B_API_KEY,
  });

  try {
    // E2B CodeInterpreter runs Python by default
    // To avoid JSON escaping issues, write data to files
    await sandbox.files.write('/tmp/input.json', JSON.stringify(sandboxedInput));
    await sandbox.files.write('/tmp/state.json', JSON.stringify(sandboxedState));
    await sandbox.files.write('/tmp/transform.js', transformScript);

    // Create Node.js wrapper script
    const wrapperScript = `const fs = require('fs');
const input = JSON.parse(fs.readFileSync('/tmp/input.json', 'utf8'));
const lastOutput = input;
const state = JSON.parse(fs.readFileSync('/tmp/state.json', 'utf8'));
const transformCode = fs.readFileSync('/tmp/transform.js', 'utf8');

let transform;
try {
  // Try to wrap as an expression first
  transform = new Function('input', 'lastOutput', 'state', 'return (' + transformCode + ')');
} catch (e) {
  // If syntax error (likely because it's not an expression), try as a full script body
  transform = new Function('input', 'lastOutput', 'state', transformCode);
}

try {
  const result = transform(input, lastOutput, state);
  console.log(JSON.stringify(result === undefined ? null : result));
} catch (error) {
  console.error('Transform error:', error.message);
  process.exit(1);
}`;

    await sandbox.files.write('/tmp/wrapper.js', wrapperScript);

    console.log('🔍 E2B executing JavaScript transform...');

    // Use Python to run Node.js
    const pythonCode = `import subprocess
import sys
try:
    result = subprocess.run(['node', '/tmp/wrapper.js'], capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        print(f"Error: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    print(result.stdout)
except subprocess.TimeoutExpired:
    print("Error: Timeout after 60s", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"Error: {str(e)}", file=sys.stderr)
    sys.exit(1)`;

    const execution = await sandbox.runCode(pythonCode);

    // Check for errors
    if (execution.error) {
      console.error('❌ E2B Execution Failed:', JSON.stringify(execution, null, 2));
      const stderr = (execution.logs?.stderr || []).join('\n');
      const errorMsg = execution.error.value || execution.error.name || JSON.stringify(execution.error);
      throw new Error(`E2B execution error: ${errorMsg}\nStderr: ${stderr}`);
    }

    // Parse the result from stdout
    const resultText = (execution.logs?.stdout || []).join('\n').trim();

    if (!resultText) {
      throw new Error('Transform returned no output');
    }

    let result;
    try {
      result = JSON.parse(resultText);
    } catch (e) {
      console.error('Failed to parse E2B execution result:', resultText);
      throw new Error(`Transform returned invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`);
    }

    console.log('✅ E2B execution successful:', result);

    // Update state with the result
    state.variables['lastOutput'] = result;

    return result;
  } finally {
    // Always close the sandbox
    await sandbox.kill();
  }
}

/**
 * REMOVED: Insecure fallback execution using Function constructor
 *
 * This function has been removed for security reasons. It used the Function constructor
 * to execute user code, which is inherently unsafe even with regex-based filtering.
 *
 * Regex patterns can be bypassed using:
 * - String concatenation: 'req' + 'uire'
 * - Array/object access: global['process']
 * - Unicode escapes: \u0072equire
 * - Computed property access: this[String.fromCharCode(112,114,111,99,101,115,115)]
 *
 * All code execution now REQUIRES E2B sandbox for security.
 * See executeTransformE2B() for the secure implementation.
 */

async function executeSetState(data: any, state: WorkflowState): Promise<any> {
  const key = data.stateKey || 'variable';

  try {
    let rawValue = data.stateValue || null;
    const valueType = data.valueType || 'string';

    console.log('🔧 Set State - Key:', key);
    console.log('🔧 Set State - Raw Value:', rawValue);
    console.log('🔧 Set State - Type:', valueType);

    // Import variable substitution
    const { substituteVariables } = await import('../variable-substitution');

    // Substitute variables in the value (e.g., {{lastOutput.price}})
    if (typeof rawValue === 'string') {
      rawValue = substituteVariables(rawValue, state);
      console.log('🔧 Set State - After substitution:', rawValue);
    }

    // Parse value based on type
    let finalValue: any;

    switch (valueType) {
      case 'number':
        finalValue = parseFloat(rawValue);
        if (isNaN(finalValue)) {
          throw new Error(`Cannot convert "${rawValue}" to number`);
        }
        break;

      case 'boolean':
        if (typeof rawValue === 'boolean') {
          finalValue = rawValue;
        } else {
          const str = String(rawValue).toLowerCase();
          finalValue = str === 'true' || str === '1' || str === 'yes';
        }
        break;

      case 'json':
        try {
          finalValue = typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
        } catch (e) {
          throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`);
        }
        break;

      case 'expression':
        // Evaluate JavaScript expression using safe evaluator
        try {
          const { safeEvaluate } = await import('../safe-expression-evaluator');

          // Create evaluation context
          const context = {
            input: state.variables.input,
            lastOutput: state.variables.lastOutput,
            state: state.variables,
            // Also expose individual state variables
            ...state.variables,
          };

          finalValue = safeEvaluate(rawValue, context);
        } catch (e) {
          throw new Error(`Expression evaluation failed: ${e instanceof Error ? e.message : 'Unknown error'}`);
        }
        break;

      default:
        // String - just use the substituted value
        finalValue = rawValue;
    }

    console.log('🔧 Set State - Final Value:', finalValue);

    // Set the state variable
    state.variables[key] = finalValue;

    return {
      key,
      value: finalValue,
      valueType,
      stateUpdated: true,
    };
  } catch (error) {
    // Provide context about what failed
    throw new Error(
      `Failed to set state variable '${key}': ${error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

async function executeExport(data: any, state: WorkflowState): Promise<any> {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Get the data to export from lastOutput
  const input = state.variables['lastOutput'] || {};

  // For now, just return the data formatted for export
  // In a real implementation, this would handle different export formats
  return {
    exportData: input,
    exported: true,
  };
}

/**
 * TODO: Real implementation
 *
 * For transform:
 * - Execute JavaScript transform script safely (sandboxed)
 * - Support common transformation libraries (lodash, etc)
 * - Handle errors gracefully
 * - Support async transformations
 *
 * For set-state:
 * - Parse value expressions
 * - Support references to other variables
 * - Validate types
 * - Support nested object paths
 */
