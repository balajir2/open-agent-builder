import { NextResponse } from "next/server";

/**
 * This endpoint is for fetching, saving, and deleting input presets for a workflow
 * In this implementation, we're just returning mock data since the actual storage is handled client-side
 */

// GET - retrieve presets for a workflow
export async function GET(
  request: Request,
  { params }: { params: { workflowId: string } }
) {
  try {
    const { workflowId } = params;
    if (!workflowId) {
      return NextResponse.json({ error: "Missing workflowId" }, { status: 400 });
    }

    // For this demo, we'll return a sample response
    return NextResponse.json({
      presets: {
        "Company Comparison": {
          "company_name_1": "Microsoft",
          "company_name_2": "Apple"
        },
        "Tech Giants": {
          "company_name_1": "Google",
          "company_name_2": "Amazon"
        }
      }
    });
  } catch (error) {
    console.error("Error fetching workflow presets:", error);
    return NextResponse.json(
      { error: "Failed to fetch workflow presets" },
      { status: 500 }
    );
  }
}

// POST - save a new preset
export async function POST(
  request: Request,
  { params }: { params: { workflowId: string } }
) {
  try {
    const { workflowId } = params;
    if (!workflowId) {
      return NextResponse.json({ error: "Missing workflowId" }, { status: 400 });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }
    
    const { presetName, inputValues } = body;

    if (!presetName || !inputValues) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a real implementation, this would be saved to a database
    // For the demo, we just return success
    return NextResponse.json({
      success: true,
      message: "Preset saved successfully",
      preset: {
        name: presetName,
        values: inputValues
      }
    });
  } catch (error) {
    console.error("Error saving workflow preset:", error);
    return NextResponse.json(
      { error: "Failed to save workflow preset" },
      { status: 500 }
    );
  }
}

// DELETE - remove a preset
export async function DELETE(
  request: Request,
  { params }: { params: { workflowId: string } }
) {
  try {
    const { workflowId } = params;
    if (!workflowId) {
      return NextResponse.json({ error: "Missing workflowId" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const presetName = searchParams.get("name");

    if (!presetName) {
      return NextResponse.json({ error: "Missing preset name" }, { status: 400 });
    }

    // In a real implementation, this would delete from a database
    // For the demo, we just return success
    return NextResponse.json({
      success: true,
      message: "Preset deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting workflow preset:", error);
    return NextResponse.json(
      { error: "Failed to delete workflow preset" },
      { status: 500 }
    );
  }
}