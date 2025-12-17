import { NextResponse } from "next/server";
import { getAuthenticatedConvexClient, api } from "@/lib/convex/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(
  req: Request,
  { params }: any
) {
  try {
    const { workflowId } = await params;

    if (!workflowId) {
      return NextResponse.json({ error: "Missing workflowId" }, { status: 400 });
    }

    // Use authenticated client to maintain context
    const convex = await getAuthenticatedConvexClient();

    // Get user session for role/id check
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const userId = session?.user?.id; // This is the Clerk ID (subject)

    // Fetch details
    const workflow = await convex.query(api.workflows.getWorkflowDetails, {
      customId: workflowId,
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    // Permission Check
    // 1. If public template -> Allow
    if (workflow.isTemplate) {
      return NextResponse.json(workflow);
    }

    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Get user role from DB to check for admin
    const user = await convex.query(api.users.curretUser); // Using existing query (typo preserved for now)
    const isAdmin = user?.role === "admin";

    // 2. If Owner -> Allow
    // 3. If Assigned -> Allow
    // 4. If Admin -> Allow
    const isOwner = workflow.userId === userId;
    const isAssigned = workflow.assignedTo === userId;

    if (!isOwner && !isAssigned && !isAdmin) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    return NextResponse.json(workflow);
  } catch (error: any) {
    console.error("Error fetching workflow details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

