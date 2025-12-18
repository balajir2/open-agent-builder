import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, createUnauthorizedResponse } from '@/lib/api/auth';
import { getAuthenticatedConvexClient, api } from '@/lib/convex/client';

export const dynamic = 'force-dynamic';

/**
 * Import workflow from Markdown file
 * POST /api/workflows/import-markdown
 * Expects multipart/form-data with markdown file
 */
export async function POST(request: NextRequest) {
  try {
    // Validate authentication
    const auth = await validateApiKey(request);
    if (!auth.authenticated || !auth.userId) {
      return createUnauthorizedResponse(auth.error || 'Authentication required');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      return NextResponse.json(
        { error: 'File must be a markdown file (.md or .markdown)' },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();

    // Parse markdown to workflow
    const workflow = parseMarkdownToWorkflow(content, auth.userId);

    // Generate a unique customId to prevent duplicate workflows on subsequent saves
    const customId = `imported_${Date.now()}`;

    // Create workflow in database using authenticated Convex client
    const convex = await getAuthenticatedConvexClient();
    const workflowId = await convex.mutation(api.workflows.saveWorkflow, {
      customId,
      name: workflow.name,
      description: workflow.description,
      nodes: workflow.nodes,
      edges: workflow.edges,
    });

    return NextResponse.json({
      success: true,
      workflowId: workflowId,
      name: workflow.name,
    });
  } catch (error) {
    console.error('Markdown import error:', error);
    return NextResponse.json(
      {
        error: 'Import failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Parse markdown content to workflow structure
 * Note: This is a basic parser. Complex workflows may need manual adjustment.
 */
function parseMarkdownToWorkflow(markdown: string, userId: string): any {
  // First, try to extract JSON data from the markdown (new export format)
  const jsonMatch = markdown.match(/```json\n([\s\S]+?)\n```/);

  if (jsonMatch) {
    try {
      const jsonData = JSON.parse(jsonMatch[1]);

      // Extract title and description from markdown
      let name = 'Imported Workflow';
      const titleMatch = markdown.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        name = titleMatch[1].trim();
      }

      let description = '';
      const descMatch = markdown.match(/^#\s+.+\n\n([\s\S]+?)\n\n\*\*Exported:/);
      if (descMatch) {
        description = descMatch[1].trim();
      }

      // Clean up nodes - remove React label objects and unnecessary fields
      const cleanedNodes = (jsonData.nodes || []).map((node: any) => {
        const cleanedNode = { ...node };

        // Remove React-specific fields that can't be deserialized properly
        if (cleanedNode.data) {
          // Keep the simple string label if it exists, otherwise use nodeName
          if (typeof cleanedNode.data.label === 'object') {
            delete cleanedNode.data.label;
          }

          // Remove execution-specific fields
          delete cleanedNode.data.executionStatus;
          delete cleanedNode.data._executionUpdate;
          delete cleanedNode.data.isRunning;

          // Remove measured/selected fields
          delete cleanedNode.measured;
          delete cleanedNode.selected;
        }

        return cleanedNode;
      });

      // Clean up edges
      const cleanedEdges = (jsonData.edges || []).map((edge: any) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
        type: edge.type,
        label: edge.label,
      }));

      return {
        name,
        description,
        nodes: cleanedNodes,
        edges: cleanedEdges,
      };
    } catch (e) {
      console.error('Failed to parse JSON from markdown:', e);
      // Fall through to legacy parser
    }
  }

  // Legacy markdown parser (for old format)
  const lines = markdown.split('\n');

  // Extract title (first # heading)
  let name = 'Imported Workflow';
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    name = titleMatch[1].trim();
  }

  // Extract description (text after title, before first ---)
  let description = '';
  const descMatch = markdown.match(/^#\s+.+\n\n([\s\S]+?)\n\n---/);
  if (descMatch) {
    description = descMatch[1].trim();
  }

  // Initialize nodes and edges
  const nodes: any[] = [];
  const edges: any[] = [];

  // Add start node
  nodes.push({
    id: 'node_0',
    type: 'start',
    position: { x: 250, y: 100 },
    data: {
      label: 'Start',
      nodeName: 'Start',
      nodeType: 'start',
      inputVariables: {},
    },
  });

  // Parse nodes section - handle both single and double newlines
  const nodesSection = markdown.match(/## Nodes\n+?([\s\S]+?)(?=\n---\n|## Connections|$)/);

  if (nodesSection) {
    const nodeBlocks = nodesSection[1].split(/\n### \d+\. /);

    nodeBlocks.forEach((block, index) => {
      if (!block.trim()) return;

      // Parse node details
      const nodeMatch = block.match(/^(.+?)\s+\((.+?)\)/);
      if (!nodeMatch) return;

      const label = nodeMatch[1].trim();
      const type = nodeMatch[2].trim();

      // Skip start and end nodes as we add them separately
      if (type === 'start' || type === 'end') return;

      const nodeId = `node_${index + 1}`;

      // Create node based on type
      const node: any = {
        id: nodeId,
        type,
        position: { x: 250, y: 100 + (index + 1) * 150 },
        data: {
          label,
          nodeName: label,
          nodeType: type,
        },
      };

      // Extract type-specific data
      if (type === 'agent') {
        const modelMatch = block.match(/\*\*Model\*\*:\s*(.+)/);
        // Match multi-line instructions until next --- or next section
        const instructionsMatch = block.match(/\*\*Instructions\*\*:\s*([\s\S]+?)(?=\n\n---|$)/);
        const toolsMatch = block.match(/\*\*Tools\*\*:\s*(.+)/);

        if (modelMatch) node.data.model = modelMatch[1].trim();
        if (instructionsMatch) {
          // Clean up the instructions text
          const instructions = instructionsMatch[1]
            .trim()
            .replace(/\n+/g, '\n') // Normalize newlines
            .replace(/\n---\n.*$/s, ''); // Remove trailing section markers
          node.data.prompt = instructions;
        }
        if (toolsMatch) node.data.tools = toolsMatch[1].split(',').map((t: string) => t.trim());
      } else if (type === 'extract') {
        const modelMatch = block.match(/\*\*Model\*\*:\s*(.+)/);
        const promptMatch = block.match(/\*\*Prompt\*\*:\s*([\s\S]+?)(?=\n\n---|$)/);

        if (modelMatch) node.data.model = modelMatch[1].trim();
        if (promptMatch) node.data.prompt = promptMatch[1].trim();
      } else if (type === 'http') {
        const urlMatch = block.match(/\*\*URL\*\*:\s*(.+)/);
        const methodMatch = block.match(/\*\*Method\*\*:\s*(.+)/);

        if (urlMatch) node.data.url = urlMatch[1].trim();
        if (methodMatch) node.data.method = methodMatch[1].trim();
      } else if (type === 'if-else' || type === 'while') {
        const conditionMatch = block.match(/\*\*Condition\*\*:\s*`(.+)`/);

        if (conditionMatch) node.data.condition = conditionMatch[1].trim();
      } else if (type === 'gamma-ai') {
        const promptMatch = block.match(/\*\*Prompt\*\*:\s*(.+)/);
        const formatMatch = block.match(/\*\*Format\*\*:\s*(.+)/);
        const numCardsMatch = block.match(/\*\*Number of Cards\*\*:\s*(\d+)/);

        if (promptMatch) node.data.prompt = promptMatch[1].trim();
        if (formatMatch) node.data.format = formatMatch[1].trim();
        if (numCardsMatch) node.data.numCards = parseInt(numCardsMatch[1]);
      } else if (type === 'note') {
        // Extract note content (everything between the header and ---)
        const contentMatch = block.match(/\*\*Type\*\*:\s*Note\n\n([\s\S]+?)(?=\n---|$)/);
        if (contentMatch) node.data.content = contentMatch[1].trim();
      }

      nodes.push(node);
    });
  }

  // Add end node
  nodes.push({
    id: `node_${nodes.length}`,
    type: 'end',
    position: { x: 250, y: 100 + nodes.length * 150 },
    data: {
      label: 'End',
      nodeName: 'End',
      nodeType: 'end',
    },
  });

  // Parse connections section
  const connectionsSection = markdown.match(/## Connections\n\n\|[\s\S]+?\|\n([\s\S]+?)(?=\n---|$)/);

  if (connectionsSection) {
    const connectionLines = connectionsSection[1].split('\n').filter(line => line.trim().startsWith('|'));

    connectionLines.forEach((line, index) => {
      const parts = line.split('|').map(p => p.trim()).filter(p => p);
      if (parts.length >= 2) {
        const fromLabel = parts[0];
        const toLabel = parts[1];
        const edgeLabel = parts[2] || '';

        // Find node IDs by label or nodeName
        const fromNode = nodes.find(n =>
          n.data.label === fromLabel ||
          n.data.nodeName === fromLabel ||
          n.type === fromLabel.toLowerCase()
        );
        const toNode = nodes.find(n =>
          n.data.label === toLabel ||
          n.data.nodeName === toLabel ||
          n.type === toLabel.toLowerCase()
        );

        if (fromNode && toNode) {
          edges.push({
            id: `edge_${index}`,
            source: fromNode.id,
            target: toNode.id,
            label: edgeLabel === '-' ? '' : edgeLabel,
          });
        }
      }
    });
  }

  // If no connections were parsed, create sequential connections
  if (edges.length === 0 && nodes.length > 1) {
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        id: `edge_${i}`,
        source: nodes[i].id,
        target: nodes[i + 1].id,
      });
    }
  }

  return {
    name,
    description,
    nodes,
    edges,
  };
}
