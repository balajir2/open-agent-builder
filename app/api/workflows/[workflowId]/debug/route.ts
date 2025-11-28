import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * Debug endpoint to access the raw workflow definition
 * This helps us understand the structure and identify where variables are defined
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

    // Return the complete workflow object for debugging
    return NextResponse.json(workflow);
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflow' },
      { status: 500 }
    );
  }
}