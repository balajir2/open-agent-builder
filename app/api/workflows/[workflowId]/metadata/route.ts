import { NextResponse } from 'next/server';
import { getAuthenticatedConvexClient } from '@/lib/convex/client';
import { api } from '@/convex/_generated/api';
import { extractTrueVariableNames } from '@/lib/workflow/deep-variable-extractor';

/**
 * Workflow metadata endpoint
 *
 * Returns workflow metadata including input variables, suitable for UI Builder
 */
export async function GET(
  request: Request,
  { params }: any
) {
  const { workflowId } = await params;

  try {
    // Use authenticated client — will throw if no valid session
    const convex = await getAuthenticatedConvexClient();

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

    // Map to a format expected by the UI Builder
    const inputVariables = trueVariables.length > 0 ?
      trueVariables.map(name => ({
        name,
        type: 'string',
        description: 'True workflow variable'
      })) : [];

    // Prepare metadata response
    const metadata = {
      id: workflow._id,
      customId: workflow.customId,
      name: workflow.name,
      description: workflow.description,
      inputs: inputVariables,
      nodeCount: workflow.nodes?.length || 0,
      edgeCount: workflow.edges?.length || 0,
      createdAt: workflow.createdAt,
      updatedAt: workflow.updatedAt,
    };

    return NextResponse.json(metadata);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Authentication')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    console.error('Error fetching workflow metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflow metadata' },
      { status: 500 }
    );
  }
}