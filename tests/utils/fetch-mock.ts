// Mock fetch for MCP and other calls
export const createMockFetch = (responses: Record<string, any>) => {
    return async (url: string | Request, options?: RequestInit) => {
        const urlStr = url.toString();
        
        // Find matching response
        for (const [key, response] of Object.entries(responses)) {
            if (urlStr.includes(key)) {
                if (typeof response === 'function') {
                    return response(url, options);
                }
                return {
                    ok: true,
                    json: async () => response,
                    text: async () => typeof response === 'string' ? response : JSON.stringify(response),
                    headers: {
                        get: (name: string) => name.toLowerCase() === 'content-type' ? 'application/json' : null
                    }
                };
            }
        }
        
        console.warn(`[MockFetch] Unhandled URL: ${urlStr}`);
        return {
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: async () => ({ error: 'Not Found' }),
            text: async () => 'Not Found'
        };
    };
};
