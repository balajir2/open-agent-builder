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
    // Support both 'schema' and 'input_schema' (AdarshMCP uses input_schema)
    const schema = mcp.schema || mcp.input_schema || {};

    // Clean properties: remove unsupported fields like 'examples', 'default', 'arguments'
    // Google Gemini API only supports: type, description, enum, items, properties, required
    const cleanProperties = (props: any): any => {
        if (!props || typeof props !== 'object') return props;

        const cleaned: any = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === 'object' && value !== null) {
                const propCopy: any = {};
                // Only keep standard JSON Schema fields
                if ('type' in value) propCopy.type = value.type;
                if ('description' in value) propCopy.description = value.description;
                if ('enum' in value) propCopy.enum = value.enum;
                if ('items' in value) propCopy.items = value.items;
                if ('properties' in value) propCopy.properties = cleanProperties(value.properties);
                if ('required' in value) propCopy.required = value.required;
                cleaned[key] = propCopy;
            } else {
                cleaned[key] = value;
            }
        }
        return cleaned;
    };

    return {
        type: "function" as const,
        function: {
            name: mcp.name || mcp.toolName || 'unknown_tool',
            description: mcp.description || 'No description',
            parameters: {
                type: "object",
                properties: cleanProperties(schema.properties || {}),
                required: schema.required || []
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

    // Support both authToken and accessToken for backward compatibility
    const authToken = mcpServer.authToken || mcpServer.accessToken;

    const mcpResponse = await fetch(resolvedMcpUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
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

/**
 * Fetch tools from an MCP server
 */
export async function fetchMcpTools(
    mcpServer: any,
    apiKeys: { firecrawl?: string } = {}
): Promise<any[]> {
    // Replace URL placeholders
    const resolvedMcpUrl = mcpServer.url && mcpServer.url.includes('{FIRECRAWL_API_KEY}')
        ? mcpServer.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys.firecrawl || ''))
        : (mcpServer.url || '');

    // Support both authToken and accessToken for backward compatibility
    const authToken = mcpServer.authToken || mcpServer.accessToken;

    try {
        // Try JSON-RPC first (Standard MCP)
        const rpcResponse = await fetch(resolvedMcpUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: Date.now(),
                method: 'tools/list',
                params: {}
            })
        });

        if (rpcResponse.ok) {
            const data = await rpcResponse.json();
            if (data.result && data.result.tools) {
                return data.result.tools;
            }
        }

        // Fallback to GET /tools/list (AdarshMCP specific?)
        const getUrl = resolvedMcpUrl.endsWith('/') ? `${resolvedMcpUrl}tools/list` : `${resolvedMcpUrl}/tools/list`;
        const getResponse = await fetch(getUrl, {
            headers: {
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            }
        });

        if (getResponse.ok) {
            const data = await getResponse.json();
            if (data.tools) return data.tools;
            if (data.result && data.result.tools) return data.result.tools;
        }

        console.warn(`Failed to fetch tools from ${mcpServer.name}`);
        return [];
    } catch (error) {
        console.error(`Error fetching tools from ${mcpServer.name}:`, error);
        return [];
    }
}
