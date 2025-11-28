import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Create a Convex client for direct API calls
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const tags = searchParams.get("tags")?.split(",") || [];
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const order = searchParams.get("order") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    // Fetch all workflows first (we'll filter them in-memory)
    const workflows = await convex.query(api.workflows.list);

    if (!workflows || !Array.isArray(workflows)) {
      return NextResponse.json({ workflows: [] });
    }

    // Apply filters
    let filteredWorkflows = [...workflows];

    // Filter by query text
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredWorkflows = filteredWorkflows.filter(workflow =>
        workflow.name?.toLowerCase().includes(lowerQuery) ||
        workflow.description?.toLowerCase().includes(lowerQuery)
      );
    }

    // Filter by tags
    if (tags.length > 0) {
      filteredWorkflows = filteredWorkflows.filter(workflow => {
        if (!workflow.tags || !Array.isArray(workflow.tags)) return false;
        return tags.some(tag => (workflow.tags as string[]).includes(tag));
      });
    }

    // Sort workflows
    filteredWorkflows.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);

        case "createdAt":
          aValue = a._creationTime || 0;
          bValue = b._creationTime || 0;
          return order === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);

        case "updatedAt":
        default:
          aValue = a.updatedAt || a._creationTime || 0;
          bValue = b.updatedAt || b._creationTime || 0;

          // Handle string dates if necessary
          if (typeof aValue === 'string') aValue = new Date(aValue).getTime();
          if (typeof bValue === 'string') bValue = new Date(bValue).getTime();

          return order === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });

    // Limit results
    filteredWorkflows = filteredWorkflows.slice(0, limit);

    // Get all unique tags from workflows (for filters)
    const allTags = new Set<string>();
    workflows.forEach(workflow => {
      if (workflow.tags && Array.isArray(workflow.tags)) {
        workflow.tags.forEach(tag => allTags.add(tag));
      }
    });

    return NextResponse.json({
      workflows: filteredWorkflows,
      total: filteredWorkflows.length,
      availableTags: Array.from(allTags)
    });
  } catch (error) {
    console.error("Error searching workflows:", error);
    return NextResponse.json(
      { error: "Failed to search workflows" },
      { status: 500 }
    );
  }
}