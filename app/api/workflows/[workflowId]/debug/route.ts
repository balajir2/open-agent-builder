import { NextResponse } from 'next/server';
import { getAuthenticatedConvexClient } from '@/lib/convex/client';
import { api } from '@/convex/_generated/api';

/**
 * Debug endpoint to access the raw workflow definition
 * SECURITY: Requires authentication. Disabled in production.
 */
export async function GET(
  request: Request,
  { params }: any
) {
  // Disable debug endpoint in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Debug endpoint is disabled in production' },
      { status: 403 }
    );
  }

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

    // Return the complete workflow object for debugging
    return NextResponse.json(workflow);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Authentication')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    console.error('Error fetching workflow:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflow' },
      { status: 500 }
    );
  }
}
