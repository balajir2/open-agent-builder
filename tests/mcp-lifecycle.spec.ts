import { test, expect } from '@playwright/test';
import crypto from 'crypto';
import { executeAgentNode } from '@/lib/workflow/executors/agent';
import { WorkflowNode, WorkflowState } from '@/lib/workflow/types';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const TEST_USER_ID = `test-user-lifecycle-${crypto.randomBytes(6).toString('hex')}`; // Unique user for this test run

if (!CONVEX_URL) {
  throw new Error('CONVEX_URL environment variable is not set.');
}
if (!process.env.CONVEX_TEST_SECRET) {
    throw new Error('CONVEX_TEST_SECRET environment variable is not set for tests.');
}

const mockApiKeys = {
  openai: process.env.OPENAI_API_KEY || 'mock-openai-key',
  anthropic: process.env.ANTHROPIC_API_KEY || 'mock-anthropic-key',
  google: process.env.GOOGLE_API_KEY || 'mock-google-key',
  groq: process.env.GROQ_API_KEY || 'mock-groq-key',
};

// --- Global Fetch Mocking Infrastructure ---
interface MockMatch {
    url: string | RegExp;
    method?: string;
    body?: any;
}
interface MockResponse {
    status?: number;
    contentType?: string;
    body: any;
}
const dynamicFetchMocks: { match: MockMatch; response: MockResponse }[] = [];

function addFetchMock(match: MockMatch, response: MockResponse) {
    dynamicFetchMocks.push({ match, response });
}

const setupGlobalFetchMock = () => {
    const originalFetch = global.fetch;
    global.fetch = async (url, init): Promise<Response> => {
        const urlString = url.toString();
        const requestBody = init?.body ? JSON.parse(init.body.toString()) : undefined;
        for (const mock of dynamicFetchMocks) {
            let urlMatches = typeof mock.match.url === 'string' ? urlString.startsWith(mock.match.url) : mock.match.url.test(urlString);
            const methodMatches = !mock.match.method || (init?.method?.toUpperCase() === mock.match.method.toUpperCase());
            let bodyMatches = true;
            if (mock.match.body) {
                bodyMatches = requestBody && Object.keys(mock.match.body).every(key => {
                    const mockValue = mock.match.body[key];
                    const actualValue = requestBody[key];
                    if (key === 'params' && typeof mockValue === 'object' && typeof actualValue === 'object') {
                        return Object.keys(mockValue).every(paramKey => actualValue[paramKey] === mockValue[paramKey]);
                    }
                    return actualValue === mockValue;
                });
            }
            if (urlMatches && methodMatches && bodyMatches) {
                let responseBody = mock.response.body;
                if (typeof responseBody === 'function') {
                    responseBody = responseBody(requestBody);
                }
                return new Response(JSON.stringify(responseBody), {
                    status: mock.response.status || 200,
                    headers: { 'Content-Type': mock.response.contentType || 'application/json' },
                });
            }
        }
        return originalFetch(url, init);
    };
    return () => {
        global.fetch = originalFetch;
    };
};

// --- Main Test Suite ---
test.describe.serial('Custom MCP Server Lifecycle', () => {
    let convexClient: ConvexHttpClient;
    let cleanupGlobalFetch: () => void;
    let newServerId: Id<'mcpServers'>;
    const customServer = { userId: TEST_USER_ID, name: 'My Custom Test MCP', url: 'https://custom-mcp.test/api', category: 'custom', authType: 'none', enabled: true };
    const customToolName = 'custom_tool';
    const customToolResult = 'Custom tool executed successfully from lifecycle test';
    const customInstructions = `Use the ${customToolName} tool.`;

    test.beforeAll(async () => {
        cleanupGlobalFetch = setupGlobalFetchMock();
        convexClient = new ConvexHttpClient(CONVEX_URL);
        // Before this suite runs, ensure a clean slate by deleting all servers for the user.
        const existingServers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
        for (const server of existingServers) {
            await convexClient.mutation(api.mcpServers.deleteMCPServerForTest, { id: server._id, secret: process.env.CONVEX_TEST_SECRET! });
        }
    });

    test.afterAll(async () => {
        cleanupGlobalFetch();
        // Final cleanup of any server created during the test
        if (newServerId) {
            await convexClient.mutation(api.mcpServers.deleteMCPServerForTest, { id: newServerId, secret: process.env.CONVEX_TEST_SECRET! });
        }
    });

    test.beforeEach(() => {
        // Clear fetch mocks for the next test
        dynamicFetchMocks.length = 0;

        // Force a re-import of agent and tool modules to clear any cached global state.
        // This is the definitive fix for the state pollution that occurs when Playwright
        // runs test files sequentially in the same worker process (as it does in CI).
        Object.keys(require.cache).forEach(key => {
            if (
                key.includes('lib/workflow/executors/agent') ||
                key.includes('lib/tools/registry') ||
                key.includes('lib/mcp')
            ) {
                delete require.cache[key];
            }
        });
    });

    test('Step 1: should add a new custom MCP server', async () => {
        newServerId = await convexClient.mutation(api.mcpServers.addMCPServerForTest, { secret: process.env.CONVEX_TEST_SECRET!, serverData: customServer });
        expect(newServerId).toBeDefined();
    });

    test('Step 2: should retrieve the new custom MCP server', async () => {
        const servers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
        expect(servers.some(s => s._id === newServerId)).toBe(true);
    });

    test('Step 3: should execute a workflow with the custom MCP server', async () => {
        addFetchMock({ url: /(api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com)/, method: 'POST' }, {
            body: (requestBody: any) => {
                const messages = requestBody.messages || [];
                const lastMessage = messages[messages.length - 1];
                if (lastMessage && lastMessage.role === 'tool') {
                    return { choices: [{ message: { content: `The tool call was successful. The result is: "${customToolResult}"` } }] };
                }
                return {
                    choices: [{
                        message: {
                            tool_calls: [{
                                id: 'call_mock_llm_lifecycle',
                                type: 'function',
                                function: { name: customToolName, arguments: JSON.stringify({ message: 'hello' }) }
                            }],
                            content: null
                        }
                    }]
                };
            }
        });

        addFetchMock({ url: customServer.url, method: 'POST', body: { method: 'tools/list' } }, {
            body: { result: { tools: [{ name: customToolName, description: 'A mock tool' }] } }
        });
        addFetchMock({ url: customServer.url, method: 'POST', body: { method: 'tools/call', params: { name: customToolName } } }, {
            body: { result: { content: [{ type: 'text', text: customToolResult }] } }
        });

        const node: WorkflowNode = {
            id: 'agent-custom-mcp', type: 'agent', position: { x: 0, y: 0 },
            data: {
                label: 'Agent with Custom MCP',
                model: 'openai/gpt-4o',
                mcpServerIds: [newServerId],
                instructions: customInstructions,
            },
        };
        const state: WorkflowState = { chatHistory: [], variables: {} };
        const result = await executeAgentNode(node, state, mockApiKeys as any);

        expect(result).toBeDefined();
        expect(result.__agentValue).toContain(customToolResult);
        expect(result.__agentToolCalls).toHaveLength(1);
        expect(result.__agentToolCalls[0].name).toBe(customToolName);
        expect(result.__agentToolCalls[0].output).toContain(customToolResult);
    });

    test('Step 4: should delete the custom MCP server', async () => {
        const result = await convexClient.mutation(api.mcpServers.deleteMCPServerForTest, { id: newServerId, secret: process.env.CONVEX_TEST_SECRET! });
        expect(result.success).toBe(true);
        // Prevent afterAll from trying to delete it again
        newServerId = null as any; 
    });

    test('Step 5: should verify the custom MCP server is deleted', async () => {
        const servers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
        expect(servers.some(s => s._id === newServerId)).toBe(false);
    });
});