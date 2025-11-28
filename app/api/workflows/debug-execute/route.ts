import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

/**
 * Debug endpoint to test workflow execution with different variable naming strategies
 * This helps identify exactly which variable names are being used by the workflow
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { workflowId, inputs } = body;

    if (!workflowId) {
      return NextResponse.json(
        { error: 'Missing workflowId' },
        { status: 400 }
      );
    }

    // Log the input variables we're trying
    console.log(`Attempting to execute workflow ${workflowId} with inputs:`, inputs);

    // Initialize Convex client
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    // Get workflow to examine
    let workflow;
    try {
      // Try to fetch by Convex ID first
      workflow = await convex.query(api.workflows.getWorkflow, { id: workflowId });
    } catch {
      // If that fails, try by custom ID
      workflow = await convex.query(api.workflows.getWorkflowByCustomId, { customId: workflowId });
    }

    if (!workflow) {
      return NextResponse.json(
        { error: `Workflow with ID ${workflowId} not found` },
        { status: 404 }
      );
    }

    // Execute the workflow with the provided inputs
    /*
    try {
      const result = await convex.mutation(api.workflows.executeWorkflow, {
        workflowId,
        inputs
      });
      
      return NextResponse.json({
        success: true,
        result,
        message: 'Workflow executed successfully with the provided variable names'
      });
    } catch (error) {
      console.error('Workflow execution error:', error);
      
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Workflow execution failed - the variable names may not be correct'
      }, { status: 500 });
    }
    */
    return NextResponse.json({ error: "Not Implemented" }, { status: 501 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}