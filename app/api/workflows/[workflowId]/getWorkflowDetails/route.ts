// app/api/workflows/[workflowId]/getWorkflowDetails/route.ts
import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface RouteContext {
  params: { workflowId: string };
}

export async function GET(req: Request, context: RouteContext) {
  try {
    const { workflowId } = await context.params;

    if (!workflowId) {
      return NextResponse.json({ error: "Missing workflowId" }, { status: 400 });
    }

    // ✅ Call Convex query to fetch workflow details
    const workflow = await fetchQuery(api.workflows.getWorkflowDetails, {
      customId: workflowId,
    });

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
    }

    return NextResponse.json(workflow);
  } catch (error: any) {
    console.error("Error fetching workflow details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
