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

    // Create workflow in database using authenticated Convex client
    const convex = await getAuthenticatedConvexClient();
    const workflowId = await convex.mutation(api.workflows.saveWorkflow, {
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
      inputVariables: {},
    },
  });

  // Parse nodes section
  const nodesSection = markdown.match(/## Nodes\n\n([\s\S]+?)(?=\n## |---\n\n## Connections|$)/);

  if (nodesSection) {
    const nodeBlocks = nodesSection[1].split(/\n### \d+\. /);

    nodeBlocks.forEach((block, index) => {
      if (!block.trim()) return;

      // Parse node details
      const nodeMatch = block.match(/^(.+?)\s+\((.+?)\)/);
      if (!nodeMatch) return;

      const label = nodeMatch[1].trim();
      const type = nodeMatch[2].trim();

      const nodeId = `node_${index + 1}`;

      // Create node based on type
      const node: any = {
        id: nodeId,
        type,
        position: { x: 250, y: 100 + (index + 1) * 150 },
        data: {
          label,
        },
      };

      // Extract type-specific data
      if (type === 'agent') {
        const modelMatch = block.match(/\*\*Model\*\*:\s*(.+)/);
        const instructionsMatch = block.match(/\*\*Instructions\*\*:\s*(.+)/);
        const toolsMatch = block.match(/\*\*Tools\*\*:\s*(.+)/);

        if (modelMatch) node.data.model = modelMatch[1].trim();
        if (instructionsMatch) node.data.instructions = instructionsMatch[1].trim();
        if (toolsMatch) node.data.tools = toolsMatch[1].split(',').map((t: string) => t.trim());
      } else if (type === 'extract') {
        const modelMatch = block.match(/\*\*Model\*\*:\s*(.+)/);
        const promptMatch = block.match(/\*\*Prompt\*\*:\s*(.+)/);

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

        // Find node IDs by label
        const fromNode = nodes.find(n => n.data.label === fromLabel);
        const toNode = nodes.find(n => n.data.label === toLabel);

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
