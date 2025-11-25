import { APIKeys } from '@/lib/api/config';

/**
 * Unwrap MCP response to get the actual content
 */
export function unwrapMCPResponse(response: any, serverName: string = 'MCP'): any {
    if (response && typeof response === 'object') {
        // Handle standard MCP result structure
        if (response.content && Array.isArray(response.content)) {
            // Extract text content from the array
            const textContent = response.content
                .filter((item: any) => item.type === 'text')
                .map((item: any) => item.text)
                .join('\n');

            if (textContent) return textContent;

            // If no text but has content, return the first item or the whole array
            return response.content.length === 1 ? response.content[0] : response.content;
        }

        // Handle direct result property (common in some implementations)
        if (response.result) {
            return unwrapMCPResponse(response.result, serverName);
        }
    }
    return response;
}

/**
 * Convert MCP tool definition to OpenAI tool format
 */
export function convertMcpToOpenAiTool(mcp: any) {
    return {
        type: "function" as const,
        function: {
            name: mcp.name || mcp.toolName || 'unknown_tool',
            description: mcp.description || 'No description',
            parameters: {
                type: "object",
                properties: mcp.schema?.properties || {},
                required: mcp.schema?.required || []
            }
        }
    };
}

/**
 * Execute an MCP tool via HTTP
 */
export async function executeMcpTool(
    mcpServer: any,
    toolName: string,
    args: any,
    apiKeys: { firecrawl?: string } = {}
): Promise<any> {
    // Replace URL placeholders
    const resolvedMcpUrl = mcpServer.url && mcpServer.url.includes('{FIRECRAWL_API_KEY}')
        ? mcpServer.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys.firecrawl || ''))
        : (mcpServer.url || '');

    const mcpResponse = await fetch(resolvedMcpUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(mcpServer.authToken && { 'Authorization': `Bearer ${mcpServer.authToken}` })
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: Date.now(),
            method: 'tools/call',
            params: {
                name: toolName,
                arguments: args
            }
        })
    });

    if (!mcpResponse.ok) {
        throw new Error(`MCP server returned ${mcpResponse.status}: ${mcpResponse.statusText}`);
    }

    let result = await mcpResponse.json();

    // Unwrap the response
    return unwrapMCPResponse(result, mcpServer.name);
}
