import { NextResponse } from 'next/server';
import { getAuthenticatedConvexClient, api } from '@/lib/convex/client';

/**
 * DELETE /api/workflows/cleanup
 * Clean up workflows without userId (development/admin only)
 */
export async function DELETE() {
  // This endpoint is disabled - the mutation deleteWorkflowsWithoutUserId does not exist
  return NextResponse.json(
    {
      error: 'Endpoint disabled',
      message: 'This cleanup endpoint is not available',
    },
    { status: 501 }
  );
}
