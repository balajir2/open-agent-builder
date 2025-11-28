import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { extractVariableNames, findVariablesInTemplates } from '../../../../../lib/workflow/variable-extractor';
import { extractTrueVariableNames } from '../../../../../lib/workflow/deep-variable-extractor';

// This endpoint provides a dedicated way to access workflow variables
// specifically optimized for UI builder integration

export async function GET(
  request: Request,
  { params }: any
) {
  const { workflowId } = await params;

  try {
    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Get workflow
    let workflow;
    try {
      // Try to fetch by Convex ID first (cast to any to satisfy Convex Id typing)
      workflow = await convex.query(api.workflows.getWorkflow, { id: workflowId as any });
    } catch (e) {
      // If that fails, try by custom ID
      workflow = await convex.query(api.workflows.getWorkflowByCustomId, { customId: workflowId });
    }

    if (!workflow) {
      return NextResponse.json(
        { error: `Workflow with ID ${workflowId} not found` },
        { status: 404 }
      );
    }

    // Extract workflow variables using multiple methods for maximum coverage
    const standardVariables = extractWorkflowVariables(workflow);
    const internalVars = extractVariableNames(workflow);
    const templateVars = findVariablesInTemplates(workflow);

    // Use the deep variable extractor for most aggressive variable detection
    const trueVariables = extractTrueVariableNames(workflow);

    console.log('Deep extraction - TRUE VARIABLES:', trueVariables);
    console.log('Variables from standard extraction:', standardVariables.map(v => v.name));
    console.log('Variables from internal extractor:', internalVars);
    console.log('Variables from templates:', templateVars);

    // Format all variables
    let allVariables: Array<{
      name: string;
      label?: string;
      type?: string;
      default?: any;
      description?: string;
      required?: boolean;
      internal?: boolean;
      trueVariable?: boolean;
    }> = [];

    // Highest priority: If we found true variables from deep extraction, use those first
    if (trueVariables && trueVariables.length > 0) {
      // Convert true variables to the expected format with special flags
      const trueVarObjects = trueVariables.map(name => ({
        name,
        label: name,
        type: 'string',
        internal: true,
        trueVariable: true, // Special flag to indicate this is a true workflow variable
        description: 'This is a true variable used directly in the workflow code'
      }));

      // Start with the true variables (highest priority)
      allVariables = [...trueVarObjects];

      console.log('Using TRUE VARIABLES as primary source:', trueVarObjects.map(v => v.name));
    } else {
      // If no true variables found, fall back to other extraction methods
      console.log('No true variables found, using fallback extraction methods');

      // Convert other internal variables to the expected format
      const internalVariables = [...internalVars, ...templateVars].map(name => ({
        name,
        label: name,
        type: 'string',
        internal: true // Mark these as internal variables
      }));

      // Add these internal variables first
      const existingNames = new Set(standardVariables.map(v => v.name));
      const newVars = internalVariables.filter(v => !existingNames.has(v.name));

      // Combine variables, putting internal ones first for priority
      allVariables = [...newVars, ...standardVariables];
    }

    return NextResponse.json(allVariables);
  } catch (error) {
    console.error('Error fetching workflow variables:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflow variables' },
      { status: 500 }
    );
  }
}

/**
 * Extract variables from a workflow definition
 * This function is specialized in finding actual workflow variables
 * rather than just edge connections
 */
function extractWorkflowVariables(workflow: any) {
  const result: Array<{
    name: string,
    label?: string,
    type?: string,
    default?: any,
    description?: string,
    required?: boolean
  }> = [];

  // Directly check for standard workflow variable definitions
  if (workflow.variables && Array.isArray(workflow.variables)) {
    workflow.variables.forEach((v: any) => {
      result.push({
        name: typeof v === 'string' ? v : v.name,
        label: typeof v === 'string' ? v : (v.label || v.name),
        type: typeof v === 'string' ? 'string' : (v.type || 'string'),
        default: typeof v === 'string' ? '' : v.default,
        description: typeof v === 'string' ? undefined : v.description,
        required: typeof v === 'string' ? false : (v.required || false)
      });
    });
    return result;
  }

  // Check nodes for input definitions
  if (workflow.nodes && Array.isArray(workflow.nodes)) {
    // Find the start node
    const startNode = workflow.nodes.find((n: any) =>
      n.type === 'start' ||
      n.id === 'start' ||
      n.name === 'start' ||
      n.nodeType === 'start'
    );

    if (startNode) {
      // Check for output definitions (often represent workflow inputs)
      if (startNode.outputs) {
        if (Array.isArray(startNode.outputs)) {
          startNode.outputs.forEach((output: any) => {
            result.push({
              name: typeof output === 'string' ? output : output.name,
              label: typeof output === 'string' ? output : (output.label || output.title || output.name),
              type: typeof output === 'string' ? 'string' : (output.type || 'string'),
              default: typeof output === 'string' ? '' : output.default,
              description: typeof output === 'string' ? undefined : output.description,
              required: typeof output === 'string' ? false : (output.required || false)
            });
          });
        } else if (typeof startNode.outputs === 'object') {
          Object.entries(startNode.outputs).forEach(([key, value]: [string, any]) => {
            result.push({
              name: key,
              label: typeof value === 'object' && value.label ? value.label : key,
              type: typeof value === 'object' && value.type ? value.type : 'string',
              default: typeof value === 'object' && value.default !== undefined ? value.default : '',
              description: typeof value === 'object' && value.description ? value.description : undefined,
              required: typeof value === 'object' && value.required !== undefined ? value.required : false
            });
          });
        }
      }

      // Check data.inputs
      if (startNode.data && startNode.data.inputs) {
        if (Array.isArray(startNode.data.inputs)) {
          startNode.data.inputs.forEach((input: any) => {
            result.push({
              name: typeof input === 'string' ? input : input.name,
              label: typeof input === 'string' ? input : (input.label || input.title || input.name),
              type: typeof input === 'string' ? 'string' : (input.type || 'string'),
              default: typeof input === 'string' ? '' : input.default,
              description: typeof input === 'string' ? undefined : input.description,
              required: typeof input === 'string' ? false : (input.required || false)
            });
          });
        }
      }
    }

    // Check for agent nodes with parameters
    const agentNodes = workflow.nodes.filter((n: any) =>
      n.type === 'agent' ||
      n.nodeType === 'agent' ||
      (n.data && n.data.type === 'agent')
    );

    for (const agentNode of agentNodes) {
      if (agentNode.data && agentNode.data.parameters && Array.isArray(agentNode.data.parameters)) {
        agentNode.data.parameters.forEach((param: any) => {
          if (!result.some(v => v.name === param.name)) {
            result.push({
              name: param.name,
              label: param.label || param.title || param.name,
              type: param.type || 'string',
              default: param.default,
              description: param.description,
              required: param.required || false
            });
          }
        });
      }
    }
  }

  // If no variables found yet, try to extract input data from the top level
  if (result.length === 0 && workflow.inputs) {
    if (Array.isArray(workflow.inputs)) {
      workflow.inputs.forEach((input: any) => {
        result.push({
          name: typeof input === 'string' ? input : input.name,
          label: typeof input === 'string' ? input : (input.label || input.title || input.name),
          type: typeof input === 'string' ? 'string' : (input.type || 'string'),
          default: typeof input === 'string' ? '' : input.default,
          description: typeof input === 'string' ? undefined : input.description,
          required: typeof input === 'string' ? false : (input.required || false)
        });
      });
    } else if (typeof workflow.inputs === 'object') {
      Object.entries(workflow.inputs).forEach(([key, value]: [string, any]) => {
        result.push({
          name: key,
          label: typeof value === 'object' && value.label ? value.label : key,
          type: typeof value === 'object' && value.type ? value.type : 'string',
          default: typeof value === 'object' && value.default !== undefined ? value.default : '',
          description: typeof value === 'object' && value.description ? value.description : undefined,
          required: typeof value === 'object' && value.required !== undefined ? value.required : false
        });
      });
    }
  }

  return result;
}