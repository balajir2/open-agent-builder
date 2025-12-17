import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, createUnauthorizedResponse } from '@/lib/api/auth';
import { getAuthenticatedConvexClient, api } from '@/lib/convex/client';

export const dynamic = 'force-dynamic';

/**
 * Export workflow as Markdown documentation
 * GET /api/workflows/:workflowId/export-markdown
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  try {
    const { workflowId } = await params;

    // Validate authentication
    const auth = await validateApiKey(request);
    if (!auth.authenticated || !auth.userId) {
      return createUnauthorizedResponse(auth.error || 'Authentication required');
    }

    // Fetch workflow from database using authenticated Convex client
    const convex = await getAuthenticatedConvexClient();
    const workflow = await convex.query(api.workflows.getWorkflowByCustomId, {
      customId: workflowId,
    });

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    if (!workflow || !workflow.nodes) {
      return NextResponse.json(
        { error: 'Invalid workflow data' },
        { status: 400 }
      );
    }

    // Generate markdown content
    const markdown = generateWorkflowMarkdown(workflow);

    // Return as downloadable markdown file
    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${workflow.name.replace(/\s+/g, '_')}.md"`,
      },
    });
  } catch (error) {
    console.error('Markdown export error:', error);
    return NextResponse.json(
      {
        error: 'Export failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Generate markdown documentation from workflow
 */
function generateWorkflowMarkdown(workflow: any): string {
  const { name, description, nodes, edges } = workflow;

  let markdown = `# ${name}\n\n`;

  if (description) {
    markdown += `${description}\n\n`;
  }

  markdown += `---\n\n`;
  markdown += `## Workflow Overview\n\n`;
  markdown += `- **Total Nodes**: ${nodes?.length || 0}\n`;
  markdown += `- **Total Connections**: ${edges?.length || 0}\n`;
  markdown += `- **Created**: ${new Date(workflow.createdAt || Date.now()).toLocaleDateString()}\n`;
  markdown += `- **Last Updated**: ${new Date(workflow.updatedAt || Date.now()).toLocaleDateString()}\n\n`;

  // Nodes section
  markdown += `## Nodes\n\n`;

  if (nodes && Array.isArray(nodes)) {
    nodes.forEach((node: any, index: number) => {
      markdown += `### ${index + 1}. ${node.data?.label || node.id} (${node.type})\n\n`;

      // Add node-specific details
      if (node.type === 'start') {
        markdown += `**Type**: Start Node\n\n`;
        if (node.data?.inputVariables) {
          markdown += `**Input Variables**:\n`;
          Object.entries(node.data.inputVariables).forEach(([key, value]) => {
            markdown += `- \`${key}\`: ${value}\n`;
          });
          markdown += `\n`;
        }
      } else if (node.type === 'agent') {
        markdown += `**Type**: AI Agent\n\n`;
        if (node.data?.model) markdown += `- **Model**: ${node.data.model}\n`;
        if (node.data?.instructions) markdown += `- **Instructions**: ${node.data.instructions}\n`;
        if (node.data?.tools && node.data.tools.length > 0) {
          markdown += `- **Tools**: ${node.data.tools.join(', ')}\n`;
        }
        markdown += `\n`;
      } else if (node.type === 'mcp') {
        markdown += `**Type**: MCP Tool\n\n`;
        if (node.data?.tool) markdown += `- **Tool**: ${node.data.tool}\n`;
        if (node.data?.serverId) markdown += `- **Server**: ${node.data.serverId}\n`;
        markdown += `\n`;
      } else if (node.type === 'extract') {
        markdown += `**Type**: Extract Node\n\n`;
        if (node.data?.model) markdown += `- **Model**: ${node.data.model}\n`;
        if (node.data?.prompt) markdown += `- **Prompt**: ${node.data.prompt}\n`;
        markdown += `\n`;
      } else if (node.type === 'http') {
        markdown += `**Type**: HTTP Request\n\n`;
        if (node.data?.url) markdown += `- **URL**: ${node.data.url}\n`;
        if (node.data?.method) markdown += `- **Method**: ${node.data.method}\n`;
        markdown += `\n`;
      } else if (node.type === 'if-else' || node.type === 'while') {
        markdown += `**Type**: ${node.type === 'if-else' ? 'Conditional' : 'Loop'}\n\n`;
        if (node.data?.condition) markdown += `- **Condition**: \`${node.data.condition}\`\n`;
        markdown += `\n`;
      } else if (node.type === 'gamma-ai') {
        markdown += `**Type**: Gamma AI Generation\n\n`;
        if (node.data?.prompt) markdown += `- **Prompt**: ${node.data.prompt}\n`;
        if (node.data?.format) markdown += `- **Format**: ${node.data.format}\n`;
        if (node.data?.numCards) markdown += `- **Number of Cards**: ${node.data.numCards}\n`;
        markdown += `\n`;
      } else if (node.type === 'note') {
        markdown += `**Type**: Note\n\n`;
        if (node.data?.content) markdown += `${node.data.content}\n\n`;
      } else if (node.type === 'end') {
        markdown += `**Type**: End Node\n\n`;
      }

      markdown += `---\n\n`;
    });
  }

  // Connections section
  if (edges && Array.isArray(edges) && edges.length > 0) {
    markdown += `## Connections\n\n`;
    markdown += `| From | To | Label |\n`;
    markdown += `|------|-----|-------|\n`;

    edges.forEach((edge: any) => {
      const sourceNode = nodes?.find((n: any) => n.id === edge.source);
      const targetNode = nodes?.find((n: any) => n.id === edge.target);
      const sourceLabel = sourceNode?.data?.label || edge.source;
      const targetLabel = targetNode?.data?.label || edge.target;
      const edgeLabel = edge.label || '-';

      markdown += `| ${sourceLabel} | ${targetLabel} | ${edgeLabel} |\n`;
    });

    markdown += `\n`;
  }

  // Footer
  markdown += `---\n\n`;
  markdown += `*Generated by Open Agent Builder*\n`;
  markdown += `*Export Date: ${new Date().toLocaleString()}*\n`;

  return markdown;
}
