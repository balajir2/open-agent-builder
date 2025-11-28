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

    const toolName = mcp.name || mcp.toolName || (mcp.function && mcp.function.name) || 'unknown_tool';

    if (toolName === 'unknown_tool') {
        console.warn('MCP tool has no name:', JSON.stringify(mcp));
    }

    // Force safe schema for Firecrawl tools to prevent validation errors
    if (toolName.includes('firecrawl')) {
        if (toolName.includes('scrape')) {
            schema.properties = {
                url: { type: 'string', description: 'The URL to scrape (e.g. https://example.com)' },
                formats: { type: 'array', items: { type: 'string' }, description: 'Formats to return (markdown, html, etc.)' }
            };
            schema.required = ['url'];
        } else if (toolName.includes('crawl')) {
            schema.properties = {
                url: { type: 'string', description: 'The URL to start crawling from' },
                limit: { type: 'number', description: 'Maximum number of pages to crawl' },
                scrapeOptions: { type: 'object', properties: { formats: { type: 'array', items: { type: 'string' } } } }
            };
            schema.required = ['url'];
        } else if (toolName.includes('search')) {
            schema.properties = {
                query: { type: 'string', description: 'The search query (e.g. "Diageo competitors"). Do NOT pass a URL here.' }
            };
            schema.required = ['query'];
        }
    } else if (Object.keys(schema).length === 0) {
        // ... existing fallback for other tools ...
    }

    return {
        type: "function" as const,
        function: {
            name: toolName,
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
            'Accept': 'application/json, text/event-stream',
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

    const contentType = mcpResponse.headers.get('content-type');
    let result;

    if (contentType && contentType.includes('text/event-stream')) {
        const text = await mcpResponse.text();
        // Parse SSE events
        const lines = text.split('\n');
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                try {
                    const data = JSON.parse(line.slice(6));
                    if (data.result || data.error) {
                        result = data;
                        break;
                    }
                } catch (e) {
                    // Ignore parse errors for intermediate lines
                }
            }
        }
        if (!result) {
            // Fallback: try to parse the whole text if it's not standard SSE but just JSON with wrong header
            try {
                result = JSON.parse(text);
            } catch (e) {
                throw new Error(`Failed to parse SSE response from ${mcpServer.name}. Raw text: ${text.substring(0, 500)}`);
            }
        }
    } else {
        result = await mcpResponse.json();
    }

    if (result && result.error) {
        throw new Error(`MCP error ${result.error.code}: ${result.error.message}`);
    }

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
                'Accept': 'application/json, text/event-stream',
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
            const contentType = rpcResponse.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('text/event-stream')) {
                const text = await rpcResponse.text();
                const lines = text.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const parsed = JSON.parse(line.slice(6));
                            if (parsed.result) {
                                data = parsed;
                                break;
                            }
                        } catch (e) { }
                    }
                }
            } else {
                data = await rpcResponse.json();
            }

            if (data && data.result && data.result.tools) {
                return data.result.tools;
            }
        }

        // Fallback to GET /tools/list (AdarshMCP specific?)
        const getUrl = resolvedMcpUrl.endsWith('/') ? `${resolvedMcpUrl}tools/list` : `${resolvedMcpUrl}/tools/list`;
        const getResponse = await fetch(getUrl, {
            headers: {
                'Accept': 'application/json, text/event-stream',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` })
            }
        });

        if (getResponse.ok) {
            const contentType = getResponse.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('text/event-stream')) {
                const text = await getResponse.text();
                const lines = text.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const parsed = JSON.parse(line.slice(6));
                            if (parsed.tools || (parsed.result && parsed.result.tools)) {
                                data = parsed;
                                break;
                            }
                        } catch (e) { }
                    }
                }
            } else {
                data = await getResponse.json();
            }

            if (data) {
                if (data.tools) return data.tools;
                if (data.result && data.result.tools) return data.result.tools;
            }
        }

        console.warn(`Failed to fetch tools from ${mcpServer.name}`);
        return [];
    } catch (error) {
        console.error(`Error fetching tools from ${mcpServer.name}:`, error);
        return [];
    }
}
