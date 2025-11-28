import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { extractTrueVariableNames } from '@/lib/workflow/deep-variable-extractor';

/**
 * Workflow inputs endpoint
 * 
 * Returns the input variables needed for workflow execution
 */
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
      // Try to fetch by Convex ID first
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

    // Extract true variable names from the workflow definition
    const trueVariables = extractTrueVariableNames(workflow);

    // If we found true variables, return them as the inputs
    if (trueVariables.length > 0) {
      const inputVariables = trueVariables.map(name => ({
        name,
        type: 'string',
        trueVariable: true
      }));

      return NextResponse.json({ inputs: inputVariables });
    }

    // Fallback: Check for standard input definitions
    if ((workflow as any).inputs) {
      return NextResponse.json({ inputs: (workflow as any).inputs });
    }

    // Last resort: create a generic input
    return NextResponse.json({
      inputs: [
        {
          name: 'input',
          type: 'string',
          description: 'Generic input for workflow'
        }
      ]
    });
  } catch (error) {
    console.error('Error fetching workflow inputs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflow inputs' },
      { status: 500 }
    );
  }
}