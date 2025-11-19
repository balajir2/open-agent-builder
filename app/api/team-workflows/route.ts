import { NextResponse } from "next/server";
import { getAuthenticatedConvexClient, api } from "@/lib/convex/client";

export const dynamic = "force-dynamic";

/**
 * GET /api/team-workflows
 *
 * Retrieves all team workflows from the Convex database.
 *
 * @returns {NextResponse} A JSON response with the list of team workflows.
 */
export async function GET() {
  try {
    const convex = await getAuthenticatedConvexClient();
    const workflows = await convex.query(api.workflows.listAll, {});

    return NextResponse.json({
      workflows: workflows.map((w: any) => ({
        ...w,
        id: (w.customId && w.customId.trim() !== '') ? w.customId : w._id.toString(),
      })),
    });
  } catch (error: any) {
    console.error("Error fetching team workflows:", error);
    return new NextResponse(
      JSON.stringify({
        error: error.message || "Error fetching team workflows",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
