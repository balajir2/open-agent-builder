import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function GET(
  req: Request,
  { params }: any
) {
  try {
    const { workflowId } = await params;

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
