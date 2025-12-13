import { test, expect } from '@playwright/test';
import { llmProviders } from '@/lib/config/llm-config';
import { toolRegistry } from '@/lib/tools/registry';
import { ToolDefinition } from '@/lib/tools/types';
import { executeAgentNode } from '@/lib/workflow/executors/agent';
import { WorkflowNode, WorkflowState } from '@/lib/workflow/types';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const TEST_USER_ID = 'test-user-id-for-interoperability-tests';

// Ensure Convex URL and test secret is set
if (!CONVEX_URL) {
  throw new Error('CONVEX_URL environment variable is not set.');
}
if (!process.env.CONVEX_TEST_SECRET) {
    throw new Error('CONVEX_TEST_SECRET environment variable is not set for tests.');
}

// Mock API Keys for agent execution
const mockApiKeys = {
  openai: process.env.OPENAI_API_KEY || 'mock-openai-key',
  anthropic: process.env.ANTHROPIC_API_KEY || 'mock-anthropic-key',
  google: process.env.GOOGLE_API_KEY || 'mock-google-key',
  groq: process.env.GROQ_API_KEY || 'mock-groq-key',
  firecrawl: process.env.FIRECRAWL_API_KEY || 'mock-firecrawl-key',
  serpapi: process.env.SERPAPI_API_KEY || 'mock-serpapi-key',
  tavily: process.env.TAVILY_API_KEY || 'mock-tavily-key',
};

// --- Global Fetch Mocking Infrastructure for Node.js Context ---

interface MockMatch {
    url: string | RegExp;
    method?: string;
    body?: any; // For POST requests, can be a partial match
}

interface MockResponse {
    status?: number;
    contentType?: string;
    body: any;
}

const dynamicFetchMocks: { match: MockMatch; response: MockResponse }[] = [];

/**
 * Adds a new mock entry to the global fetch mock registry.
 */
function addFetchMock(match: MockMatch, response: MockResponse) {
    dynamicFetchMocks.push({ match, response });
}

/**
 * Sets up a global mock for `fetch` that intercepts requests based on the registry.
 * Returns a cleanup function to restore the original `fetch`.
 */
const setupGlobalFetchMock = () => {
    const originalFetch = global.fetch;

    global.fetch = async (url, init): Promise<Response> => {
        const urlString = url.toString();
        const requestBody = init?.body ? JSON.parse(init.body.toString()) : undefined;

        for (const mock of dynamicFetchMocks) {
            let urlMatches = false;
            if (typeof mock.match.url === 'string') {
                urlMatches = urlString.startsWith(mock.match.url);
            } else { // RegExp
                urlMatches = mock.match.url.test(urlString);
            }

            const methodMatches = !mock.match.method || (init?.method?.toUpperCase() === mock.match.method.toUpperCase());
            
            let bodyMatches = true; // Default to true if no body match is required
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
                    // If the body is a function, execute it to get the dynamic response
                    responseBody = responseBody(requestBody);
                }
                
                return new Response(JSON.stringify(responseBody), {
                    status: mock.response.status || 200,
                    headers: { 'Content-Type': mock.response.contentType || 'application/json' },
                });
            }
        }
        // Fallback to original fetch for any unmatched requests
        return originalFetch(url, init);
    };

    // Return a cleanup function
    return () => {
        global.fetch = originalFetch;
    };
};


// --- Main Test Suite ---
test.describe('Interoperability and E2E Tests', () => {
  let convexClient: ConvexHttpClient;
  let allMCPs: any[] = [];
  let standardTools: ToolDefinition[] = [];
  let cleanupGlobalFetch: () => void;

  // Setup: Before all tests, initialize clients, data, and global fetch mock
  test.beforeAll(async () => {
    cleanupGlobalFetch = setupGlobalFetchMock(); // Setup global fetch mock

    convexClient = new ConvexHttpClient(CONVEX_URL);
    standardTools = toolRegistry;

    // Clean up any existing servers for TEST_USER_ID to ensure a clean state.
    const existingServers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
    for (const server of existingServers) {
        await convexClient.mutation(api.mcpServers.deleteMCPServerForTest, { id: server._id, secret: process.env.CONVEX_TEST_SECRET! });
    }

    // Add dummy MCP servers for testing
    const dummyEnabledServer = { userId: TEST_USER_ID, name: 'Dummy Enabled MCP', url: 'https://dummy-enabled.mcp.test/api', category: 'test', authType: 'none', enabled: true };
    const dummyDisabledServer = { userId: TEST_USER_ID, name: 'Dummy Disabled MCP', url: 'https://dummy-disabled.mcp.test/api', category: 'test', authType: 'none', enabled: false };
    
    await convexClient.mutation(api.mcpServers.addMCPServerForTest, { secret: process.env.CONVEX_TEST_SECRET!, serverData: dummyEnabledServer });
    await convexClient.mutation(api.mcpServers.addMCPServerForTest, { secret: process.env.CONVEX_TEST_SECRET!, serverData: dummyDisabledServer });

    try {
      allMCPs = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
      console.log(`Fetched ${allMCPs.length} MCP servers for user ${TEST_USER_ID}`);
    } catch (error) {
      console.error('Failed to fetch MCP servers from Convex:', error);
      throw new Error('Could not fetch MCP servers for testing.');
    }
  });

  // Cleanup after all tests are done
  test.afterAll(async () => {
    if (convexClient) {
        const existingServers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
        for (const server of existingServers) {
            await convexClient.mutation(api.mcpServers.deleteMCPServerForTest, { id: server._id, secret: process.env.CONVEX_TEST_SECRET! });
        }
    }
    cleanupGlobalFetch(); // Restore original fetch
  });
  
  // Clear mocks before each individual test
  test.beforeEach(() => {
    dynamicFetchMocks.length = 0;
  });

  // Test matrix for LLMs vs. Standard Tools
  test.describe('LLM Interop with Standard Tools', () => {
    llmProviders.forEach(provider => {
      standardTools.forEach(tool => {
        // Some tools may not be suitable for this generic test, skip them if needed.
        if (!tool.name || tool.id.startsWith('special-case')) {
          return;
        }

        test(`should execute successfully with ${provider.name} using ${tool.label}`, async () => {
          const toolName = tool.name;
          const expectedResult = `Mocked result for ${toolName}`;
          const instructions = `Use the ${toolName} tool to get information about 'test'.`;
          
          // 1. Dynamically generate mock arguments from the tool's schema
          const mockArgs: { [key: string]: any } = {};
          const functionParams = tool.parameters?.properties ?? {};
          for (const key in functionParams) {
            if (tool.parameters?.required?.includes(key)) {
              const param = functionParams[key];
              if (param.type === 'string') {
                mockArgs[key] = `test-${key}`;
              } else if (param.type === 'number') {
                mockArgs[key] = 1;
              } else if (param.type === 'boolean') {
                mockArgs[key] = true;
              } else {
                mockArgs[key] = 'test'; // Default fallback
              }
            }
          }
           if (Object.keys(mockArgs).length === 0) {
             mockArgs['query'] = 'test query'; // fallback for tools with no defined required args
           }

          // 2. Mock the LLM to call the current tool
          addFetchMock({ url: /(api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com)/, method: 'POST' }, {
            body: (requestBody: any) => {
              const messages = requestBody.messages || [];
              const lastMessage = messages[messages.length - 1];
               if (lastMessage && lastMessage.role === 'tool') {
                    return { choices: [{ message: { content: `The tool returned: ${expectedResult}` } }] };
               }
              return {
                choices: [{
                  message: {
                    tool_calls: [{
                      id: `call_mock_${toolName}`,
                      type: 'function',
                      function: { name: toolName, arguments: JSON.stringify(mockArgs) }
                    }],
                    content: null
                  }
                }]
              };
            }
          });

          // 3. Add a generic mock for ANY non-LLM API call (i.e., the tool's own API call)
          addFetchMock({ url: /^(?!.*(openai\.com|anthropic\.com|googleapis\.com)).*$/ }, {
              body: { result: expectedResult, data: expectedResult, content: expectedResult, organic: [{ title: expectedResult }] }, // Common success fields
          });

          // 4. Execute the agent node
          const node: WorkflowNode = {
            id: `agent-${tool.id}`, type: 'agent', position: { x: 0, y: 0 },
            data: {
              label: `Agent with ${tool.label}`,
              model: `${provider.id}/${provider.defaultModel}`,
              selectedTools: [{ toolId: tool.id, enabled: true, config: {} }],
              instructions,
            }
          };
          const state: WorkflowState = { chatHistory: [], variables: {} };

          const result = await executeAgentNode(node, state, mockApiKeys as any);
          
          // 5. Assert the results
          expect(result).toBeDefined();
          expect(result.__agentValue).toContain(expectedResult);
          expect(result.__agentToolCalls).toHaveLength(1);
          expect(result.__agentToolCalls[0].name).toBe(toolName);
        });
      });
    });
  });

  // Test matrix for LLMs vs. MCP Servers
  test.describe('LLM Interop with MCP Servers', () => {
    llmProviders.forEach(provider => {
      allMCPs.forEach(mcp => {
        const testToolName = 'mock_mcp_tool';
        const expectedToolResult = `Result from ${mcp.name} tool call via ${provider.name}`;
        const instructions = `Call the ${testToolName} tool on ${mcp.name}.`;

        if (mcp.enabled) {
          test(`LLM: ${provider.name} with ENABLED MCP: ${mcp.name} should succeed`, async () => {
            addFetchMock({ url: /(api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com)/, method: 'POST' }, {
                body: { choices: [{ message: { tool_calls: [{ id: 'call_mock_llm_mcp', type: 'function', function: { name: testToolName, arguments: JSON.stringify({ input: 'test' }) } }], content: instructions } }] },
            });
            addFetchMock({ url: mcp.url, method: 'POST', body: { method: 'tools/list' } }, { body: { result: { tools: [{ name: testToolName, description: 'Mocked Tool' }] } } });
            addFetchMock({ url: mcp.url, method: 'POST', body: { method: 'tools/call', params: { name: testToolName } } }, { body: { result: { content: [{ type: 'text', text: expectedToolResult }] } } });

            const node: WorkflowNode = { id: 'agent-mcp-enabled', type: 'agent', position: { x: 0, y: 0 }, data: { label: `Agent with Enabled MCP (${mcp.name})`, model: `${provider.id}/${provider.defaultModel}`, mcpServerIds: [mcp._id], instructions } };
            const state: WorkflowState = { chatHistory: [], variables: {} };
            const result = await executeAgentNode(node, state, mockApiKeys as any);

            expect(result).toBeDefined();
            expect(result.__agentValue).toContain(expectedToolResult);
            expect(result.__agentToolCalls).toHaveLength(1);
            expect(result.__agentToolCalls[0].name).toBe(testToolName);
            expect(result.__agentToolCalls[0].server_name).toBe(mcp.name);
          });
        } else {
          test(`LLM: ${provider.name} with DISABLED MCP: ${mcp.name} should NOT use the tool`, async () => {
            addFetchMock({ url: /(api\.openai\.com|api\.anthropic\.com|generativelanguage\.googleapis\.com)/, method: 'POST' }, {
                body: { choices: [{ message: { content: instructions } }] },
            });

            const node: WorkflowNode = { id: 'agent-mcp-disabled', type: 'agent', position: { x: 0, y: 0 }, data: { label: `Agent with Disabled MCP (${mcp.name})`, model: `${provider.id}/${provider.defaultModel}`, mcpServerIds: [mcp._id], instructions } };
            const state: WorkflowState = { chatHistory: [], variables: {} };
            const result = await executeAgentNode(node, state, mockApiKeys as any);

            expect(result).toBeDefined();
            expect(result.__agentToolCalls).toHaveLength(0);
            expect(typeof result.__agentValue).toBe('string');
            expect(result.__agentValue).toContain(instructions);
          });
        }
      });
    });
  });

  
});
