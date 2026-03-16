// import { NextRequest, NextResponse } from 'next/server';
// import { getConvexClient, getAuthenticatedConvexClient, api, isConvexConfigured } from '@/lib/convex/client';

// export const dynamic = 'force-dynamic';

// /**
//  * GET /api/workflows - List all workflows
//  * Uses Convex for storage
//  */
// export async function GET(request: NextRequest) {
//   try {
//     if (!isConvexConfigured()) {
//       return NextResponse.json({
//         workflows: [],
//         total: 0,
//         source: 'none',
//         message: 'Convex not configured. Add NEXT_PUBLIC_CONVEX_URL to .env.local',
//       });
//     }

//     const convex = await getAuthenticatedConvexClient();
//     const workflows = await convex.query(api.workflows.listWorkflows, {});

//     return NextResponse.json({
//       workflows: workflows.map((w: any) => ({
//         id: (w.customId && w.customId.trim() !== '') ? w.customId : w._id, // Use non-empty customId, otherwise Convex ID
//         name: w.name,
//         description: w.description,
//         category: w.category,
//         tags: w.tags,
//         difficulty: w.difficulty,
//         estimatedTime: w.estimatedTime,
//         nodes: w.nodes,
//         edges: w.edges,
//         createdAt: w.createdAt,
//         updatedAt: w.updatedAt,
//         nodeCount: w.nodes?.length || 0,
//         edgeCount: w.edges?.length || 0,
//         userId: w.userId,
//       })),
//       total: workflows.length,
//       source: 'convex',
//     });
//   } catch (error) {
//     console.error('Error fetching workflows:', error);
//     return NextResponse.json(
//       {
//         error: 'Failed to fetch workflows',
//         message: error instanceof Error ? error.message : 'Unknown error',
//       },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * POST /api/workflows - Save a workflow to Convex
//  */
// export async function POST(request: NextRequest) {
//   try {
//     let workflow;
//     try {
//       const body = await request.text();
//       if (!body || body.trim() === '') {
//         return NextResponse.json(
//           { error: 'Request body is empty' },
//           { status: 400 }
//         );
//       }
//       workflow = JSON.parse(body);
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       return NextResponse.json(
//         { error: 'Invalid JSON in request body' },
//         { status: 400 }
//       );
//     }

//     if (!workflow.id && !workflow.name) {
//       return NextResponse.json(
//         { error: 'Workflow must have either id or name' },
//         { status: 400 }
//       );
//     }

//     if (!isConvexConfigured()) {
//       return NextResponse.json({
//         success: false,
//         message: 'Convex not configured. Add NEXT_PUBLIC_CONVEX_URL to .env.local',
//       }, { status: 500 });
//     }

//     // Validate workflow has required fields
//     if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
//       return NextResponse.json(
//         { error: 'Workflow must have a nodes array' },
//         { status: 400 }
//       );
//     }

//     if (!workflow.edges || !Array.isArray(workflow.edges)) {
//       return NextResponse.json(
//         { error: 'Workflow must have an edges array' },
//         { status: 400 }
//       );
//     }

//     console.log('Workflow being saved:', JSON.stringify(workflow, null, 2));

//     const convex = await getAuthenticatedConvexClient();

//     // Use workflow.id as customId for Convex
//     const customId = workflow.id || `workflow_${Date.now()}`;

//     const savedId = await convex.mutation(api.workflows.saveWorkflow, {
//       customId,
//       name: workflow.name || 'Untitled Workflow',
//       description: workflow.description,
//       category: workflow.category,
//       tags: workflow.tags,
//       difficulty: workflow.difficulty,
//       estimatedTime: workflow.estimatedTime,
//       nodes: workflow.nodes,
//       edges: workflow.edges,
//       version: workflow.version,
//       isTemplate: workflow.isTemplate,
//     });

//     return NextResponse.json({
//       success: true,
//       workflowId: savedId,
//       source: 'convex',
//       message: 'Workflow saved successfully',
//     });
//   } catch (error) {
//     console.error('Error saving workflow:', error);
//     // Log detailed error info
//     if (typeof error === 'object' && error !== null) {
//       console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     }
//     return NextResponse.json(
//       {
//         error: 'Failed to save workflow',
//         message: error instanceof Error ? error.message : 'Unknown error',
//       },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * DELETE /api/workflows?id=xxx - Delete a workflow from Convex
//  */
// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const workflowId = searchParams.get('id');

//     if (!workflowId) {
//       return NextResponse.json(
//         { error: 'Workflow ID is required' },
//         { status: 400 }
//       );
//     }

//     if (!isConvexConfigured()) {
//       return NextResponse.json({
//         success: false,
//         message: 'Convex not configured',
//       }, { status: 500 });
//     }

//     const convex = await getAuthenticatedConvexClient();

//     // Look up by customId to get Convex ID
//     let workflow = await convex.query(api.workflows.getWorkflowByCustomId, {
//       customId: workflowId,
//     });

//     // If not found, try direct lookup as Convex ID
//     if (!workflow) {
//       try {
//         workflow = await convex.query(api.workflows.getWorkflow, {
//           id: workflowId as any,
//         });
//       } catch (e) {
//         // Not a valid Convex ID
//       }
//     }

//     if (!workflow) {
//       return NextResponse.json(
//         { error: `Workflow ${workflowId} not found` },
//         { status: 404 }
//       );
//     }

//     // Delete using Convex ID
//     await convex.mutation(api.workflows.deleteWorkflow, {
//       id: workflow._id,
//     });

//     return NextResponse.json({
//       success: true,
//       source: 'convex',
//       message: `Workflow ${workflowId} deleted`,
//     });
//   } catch (error) {
//     console.error('Error deleting workflow:', error);
//     return NextResponse.json(
//       {
//         error: 'Failed to delete workflow',
//         message: error instanceof Error ? error.message : 'Unknown error',
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import { getConvexClient, getAuthenticatedConvexClient, api, isConvexConfigured } from '@/lib/convex/client';

// export const dynamic = 'force-dynamic';

// /**
//  * GET /api/workflows
//  */
// export async function GET(request: NextRequest) {
//   try {
//     if (!isConvexConfigured()) {
//       return NextResponse.json({
//         workflows: [],
//         total: 0,
//         source: 'none',
//         message: 'Convex not configured. Add NEXT_PUBLIC_CONVEX_URL to .env.local',
//       });
//     }

//     const convex = await getAuthenticatedConvexClient();
//     const workflows = await convex.query(api.workflows.listWorkflows, {});

//     return NextResponse.json({
//       workflows: workflows.map((w: any) => ({
//         id: (w.customId && w.customId.trim() !== '') ? w.customId : w._id,
//         name: w.name,
//         description: w.description,
//         category: w.category,
//         tags: w.tags,
//         difficulty: w.difficulty,
//         estimatedTime: w.estimatedTime,
//         nodes: w.nodes,
//         edges: w.edges,
//         createdAt: w.createdAt,
//         updatedAt: w.updatedAt,
//         nodeCount: w.nodes?.length || 0,
//         edgeCount: w.edges?.length || 0,
//         userId: w.userId,
//       })),
//       total: workflows.length,
//       source: 'convex',
//     });
//   } catch (error) {
//     console.error('Error fetching workflows:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to fetch workflows',
//         message: error instanceof Error ? error.message : 'Unknown error'
//       }
//     );
//   }
// }

// /**
//  * POST /api/workflows
//  */
// export async function POST(request: NextRequest) {
//   try {
//     let workflow;

//     try {
//       const body = await request.text();
//       if (!body || body.trim() === '') {
//         return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
//       }
//       workflow = JSON.parse(body);
//       delete workflow._id;
//       delete workflow._creationTime;
//       delete workflow.createdAt;
//       delete workflow.updatedAt;
//       delete workflow.userId;
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
//     }

//     if (!workflow.id && !workflow.name) {
//       return NextResponse.json(
//         { error: 'Workflow must have either id or name' },
//         { status: 400 }
//       );
//     }

//     if (!isConvexConfigured()) {
//       return NextResponse.json(
//         { success: false, message: 'Convex not configured. Add NEXT_PUBLIC_CONVEX_URL to .env.local' },
//         { status: 500 }
//       );
//     }

//     if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
//       return NextResponse.json({ error: 'Workflow must have a nodes array' }, { status: 400 });
//     }

//     if (!workflow.edges || !Array.isArray(workflow.edges)) {
//       return NextResponse.json({ error: 'Workflow must have an edges array' }, { status: 400 });
//     }

//     console.log('Workflow being saved:', JSON.stringify(workflow, null, 2));

//     const convex = await getAuthenticatedConvexClient();
//     const customId = workflow.id || `workflow_${Date.now()}`;

//     /** 🔥 REQUIRED FIX — SANITIZE NODES AND EDGES */
//     const cleanNodes = workflow.nodes.map((n: any) => ({
//       id: n.id,
//       type: n.type,
//       position: n.position,
//       data: n.data,
//     }));

//     const cleanEdges = workflow.edges.map((e: any) => ({
//       id: e.id,
//       source: e.source,
//       target: e.target,
//       sourceHandle: e.sourceHandle,
//       targetHandle: e.targetHandle,
//       type: e.type,
//     }));

//     console.log("CLEAN NODES SENDING:", JSON.stringify(cleanNodes, null, 2));
//     console.log("CLEAN EDGES SENDING:", JSON.stringify(cleanEdges, null, 2));


//     const savedId = await convex.mutation(api.workflows.saveWorkflow, {
//       customId,
//       name: workflow.name || 'Untitled Workflow',
//       description: workflow.description,
//       category: workflow.category,
//       tags: workflow.tags,
//       difficulty: workflow.difficulty,
//       estimatedTime: workflow.estimatedTime,
//       nodes: cleanNodes,  // 🔥 FIXED
//       edges: cleanEdges,  // 🔥 FIXED
//       version: workflow.version,
//       isTemplate: workflow.isTemplate,
//     });

//     return NextResponse.json({
//       success: true,
//       workflowId: savedId,
//       source: 'convex',
//       message: 'Workflow saved successfully',
//     });
//   } catch (error: any) {
//     console.error('Error saving workflow:', error);
//     console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
//     return NextResponse.json(
//       { error: 'Failed to save workflow', message: error?.message || 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * DELETE /api/workflows?id=xxx
//  */
// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const workflowId = searchParams.get('id');

//     if (!workflowId) {
//       return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
//     }

//     if (!isConvexConfigured()) {
//       return NextResponse.json({ success: false, message: 'Convex not configured' }, { status: 500 });
//     }

//     const convex = await getAuthenticatedConvexClient();

//     let workflow = await convex.query(api.workflows.getWorkflowByCustomId, {
//       customId: workflowId,
//     });

//     if (!workflow) {
//       try {
//         workflow = await convex.query(api.workflows.getWorkflow, {
//           id: workflowId as any,
//         });
//       } catch {}
//     }

//     if (!workflow) {
//       return NextResponse.json({ error: `Workflow ${workflowId} not found` }, { status: 404 });
//     }

//     await convex.mutation(api.workflows.deleteWorkflow, {
//       id: workflow._id,
//     });

//     return NextResponse.json({
//       success: true,
//       source: 'convex',
//       message: `Workflow ${workflowId} deleted`,
//     });
//   } catch (error) {
//     console.error('Error deleting workflow:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete workflow', message: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedConvexClient,
  api,
  isConvexConfigured,
} from "@/lib/convex/client";
export const dynamic = "force-dynamic";

/* ----------------------------------------
   MINIMAL SAFE CLEANERS
----------------------------------------- */

function minimalCleanNodes(nodes: any[]) {
  return nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: {
      nodeName: node.data?.nodeName,
      nodeType: node.data?.nodeType,
      instructions: node.data?.instructions,
      model: node.data?.model,
      mcpServerIds: node.data?.mcpServerIds,
      mcpTools: node.data?.mcpTools,
      inputVariables: node.data?.inputVariables,
      outputFormat: node.data?.outputFormat,
      selectedTools: node.data?.selectedTools, // ✅ ADD THIS!
      jsonOutputSchema: node.data?.jsonOutputSchema,
      includeChatHistory: node.data?.includeChatHistory,
      showSearchSources: node.data?.showSearchSources,
      tokenLimit: node.data?.tokenLimit,
      // Include all other node data fields that might be needed
      ...node.data,
    },
  }));
}

function minimalCleanEdges(edges: any[]) {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
    type: edge.type,
  }));
}

/* ----------------------------------------
   GET /api/workflows
----------------------------------------- */

export async function GET() {
  console.log('📋 [GET /api/workflows] Request received');
  try {
    if (!isConvexConfigured()) {
      return NextResponse.json({
        workflows: [],
        total: 0,
        source: "none",
        message:
          "Convex not configured. Add NEXT_PUBLIC_CONVEX_URL to .env.local",
      });
    }

    let convex;
    try {
      convex = await getAuthenticatedConvexClient();
    } catch {
      // No auth available — return empty list instead of 500
      return NextResponse.json({
        workflows: [],
        total: 0,
        source: "convex",
      });
    }
    console.log('📋 [GET /api/workflows] Fetching from Convex...');
    let workflows;
    try {
      workflows = await convex.query(api.workflows.listWorkflows, {});
    } catch (queryError) {
      // Auth token may be expired/invalid — return empty list gracefully
      console.warn('[GET /api/workflows] Convex query failed, returning empty list:', queryError);
      return NextResponse.json({
        workflows: [],
        total: 0,
        source: "convex",
      });
    }
    console.log(`📋 [GET /api/workflows] Found ${workflows.length} workflows`);

    return NextResponse.json({
      workflows: workflows.map((w: any) => ({
        id: w.customId || w._id,
        name: w.name,
        description: w.description,
        category: w.category,
        tags: w.tags,
        difficulty: w.difficulty,
        estimatedTime: w.estimatedTime,
        nodes: w.nodes,
        edges: w.edges,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
        nodeCount: w.nodes?.length ?? 0,
        edgeCount: w.edges?.length ?? 0,
        userId: w.userId,
      })),
      total: workflows.length,
      source: "convex",
    });
  } catch (error: any) {
    console.error("Error fetching workflows:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch workflows",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   POST /api/workflows 
----------------------------------------- */

export async function POST(request: NextRequest) {
  console.log('💾 [POST /api/workflows] Request received');
  try {
    if (!isConvexConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Convex not configured. Add NEXT_PUBLIC_CONVEX_URL to .env.local",
        },
        { status: 500 }
      );
    }

    let convex;
    try {
      convex = await getAuthenticatedConvexClient();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const raw = await request.text();
    if (!raw) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    let workflow = JSON.parse(raw);

    /* ----------- HARD CLEAN (minimal-safe) ----------- */
    workflow.nodes = minimalCleanNodes(workflow.nodes || []);
    workflow.edges = minimalCleanEdges(workflow.edges || []);

    console.log(
      "FINAL CLEAN SIZE:",
      JSON.stringify(workflow).length,
      "bytes"
    );

    const savedId = await convex.mutation(api.workflows.saveWorkflow, {
      customId: workflow.id,
      name: workflow.name || "Untitled Workflow",
      description: workflow.description,
      category: workflow.category,
      tags: workflow.tags,
      difficulty: workflow.difficulty,
      estimatedTime: workflow.estimatedTime,
      nodes: workflow.nodes,
      edges: workflow.edges,
      version: workflow.version,
      isTemplate: workflow.isTemplate,
    });

    return NextResponse.json({
      success: true,
      workflowId: savedId,
      message: "Workflow saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to save workflow",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   DELETE /api/workflows?id=xxx
----------------------------------------- */

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workflowId = searchParams.get("id");

    if (!workflowId) {
      return NextResponse.json(
        { error: "Workflow ID is required" },
        { status: 400 }
      );
    }

    if (!isConvexConfigured()) {
      return NextResponse.json(
        { success: false, message: "Convex not configured" },
        { status: 500 }
      );
    }

    const convex = await getAuthenticatedConvexClient();

    let workflow =
      (await convex.query(api.workflows.getWorkflowByCustomId, {
        customId: workflowId,
      })) ||
      (await convex.query(api.workflows.getWorkflow, {
        id: workflowId as any,
      }));

    if (!workflow) {
      return NextResponse.json(
        { error: `Workflow ${workflowId} not found` },
        { status: 404 }
      );
    }

    await convex.mutation(api.workflows.deleteWorkflow, {
      id: workflow._id,
    });

    return NextResponse.json({
      success: true,
      message: `Workflow ${workflowId} deleted`,
    });
  } catch (error: any) {
    console.error("Error deleting workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to delete workflow",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
