
import { test, expect } from '@playwright/test';
import { llmProviders, LLMProvider } from '@/lib/config/llm-config';
import { toolRegistry, ToolDefinition } from '@/lib/tools/registry';
import { executeAgentNode } from '@/lib/workflow/executors/agent';
import { WorkflowNode, WorkflowState } from '@/lib/workflow/types';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL!;
const CONVEX_DEPLOY_KEY = process.env.CONVEX_DEPLOY_KEY!;
const TEST_USER_ID = 'test-user-id-for-interoperability-tests';

// Ensure Convex URL is set
if (!CONVEX_URL) {
  throw new Error('CONVEX_URL environment variable is not set.');
}
if (!CONVEX_DEPLOY_KEY) {
    throw new Error('CONVEX_DEPLOY_KEY environment variable is not set for admin access in tests.');
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

// --- Helper Functions for Mocking ---

// Helper function to mock LLM API calls to return a tool_calls response
async function mockLLMToolCall(page: any, providerId: string, modelName: string, toolName: string, toolArgs: any, expectedTextResponse: string = '') {
    const openaiToolCall = {
        id: 'call_mock_id',
        type: 'function',
        function: {
            name: toolName,
            arguments: JSON.stringify(toolArgs),
        },
    };

    const openaiResponse = {
        choices: [{
            message: {
                tool_calls: [openaiToolCall],
                content: expectedTextResponse || null,
            },
        }],
    };

    const anthropicToolUse = {
        type: 'tool_use',
        id: 'tooluse_mock_id',
        name: toolName,
        input: toolArgs,
    };
    
    const anthropicResponse = {
        content: [anthropicToolUse],
        stop_reason: 'tool_use',
        model: modelName,
        usage: { input_tokens: 10, output_tokens: 10 },
    };

    const googleToolCall = {
        functionCall: {
            name: toolName,
            args: toolArgs,
        },
    };

    const googleResponse = {
        content: null, // Google often returns null content when tool_calls are present
        tool_calls: [googleToolCall],
        response_metadata: {
            usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
        },
    };


    await page.route(async (url: URL) => {
        if (['openai', 'groq'].includes(providerId) && url.pathname.includes('/chat/completions')) {
            // OpenAI and Groq APIs are compatible for mocking
            return true;
        }
        if (providerId === 'anthropic' && url.hostname.includes('anthropic.com') && url.pathname.includes('/messages')) {
            return true;
        }
        if (providerId === 'google' && url.hostname.includes('generativelanguage.googleapis.com') && url.pathname.includes('/models/')) {
             return true;
        }
        return false;
    }, async route => {
        let responseBody: any;
        if (providerId === 'anthropic') {
            responseBody = anthropicResponse;
        } else if (providerId === 'google') {
            responseBody = googleResponse;
        } else { // openai and groq
            responseBody = openaiResponse;
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(responseBody),
        });
    });
}

// Helper function to mock tool API calls (both standard and MCP)
async function mockToolResponse(page: any, toolName: string, toolEndpointUrl: string | undefined, expectedResult: string) {
    await page.route(async (url: URL) => {
        // For MCP tools, we specifically check the provided toolEndpointUrl
        if (toolEndpointUrl && url.href.startsWith(toolEndpointUrl)) {
            return true;
        }
        // For standard tools, this part needs to be more specific.
        // It's hard to generically mock all standard tool APIs without knowing their exact endpoints.
        // For this file, we primarily focus on MCP tool mocking.
        // Standard tools would typically have dedicated mocks in their own test files or more specific routing here.
        return false;
    }, async route => {
        const requestBody = route.request().postDataJSON();
        // MCP tools have a specific structure for tools/list and tools/call
        if (toolEndpointUrl && requestBody?.method === 'tools/call' && requestBody?.params?.name === toolName) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ result: { content: [{ type: 'text', text: expectedResult }] } }),
            });
        } else if (toolEndpointUrl && requestBody?.method === 'tools/list') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ result: { tools: [{ name: toolName, description: 'Mocked Tool' }] } }),
            });
        } else {
            // For standard tools that might get caught by a broader rule, or unhandled MCP calls
            console.warn(`[MockToolResponse] Unhandled request to ${route.request().url()} for tool ${toolName}`);
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: `Unhandled mock for tool: ${toolName}` }),
            });
        }
    });
}

// --- Main Test Suite ---
test.describe('Interoperability and E2E Tests', () => {
  let convexClient: ConvexHttpClient;
  let allMCPs: any[] = [];
  let standardTools: ToolDefinition[] = [];

  // 1. Setup: Before all tests, initialize clients and fetch data
  test.beforeAll(async () => {
    convexClient = new ConvexHttpClient(CONVEX_URL);
    // Authenticate with deploy key for admin privileges
    convexClient.setAuth(CONVEX_DEPLOY_KEY);

    // Fetch standard tools
    standardTools = toolRegistry; // Using the imported toolRegistry for now

    // Ensure the TEST_USER_ID has some MCP servers, or create some dummy ones for testing.
    // Clean up any existing servers for TEST_USER_ID first to ensure a clean state.
    const existingServers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
    for (const server of existingServers) {
        await convexClient.mutation(api.mcpServers.deleteMCPServer, { id: server._id });
    }

    // Add some dummy MCP servers for testing enabled/disabled scenarios
    const dummyEnabledServer = {
        userId: TEST_USER_ID,
        name: 'Dummy Enabled MCP',
        url: 'https://dummy-enabled.mcp.test/api',
        description: 'An enabled dummy server',
        category: 'test',
        authType: 'none',
        enabled: true,
    };
    const dummyDisabledServer = {
        userId: TEST_USER_ID,
        name: 'Dummy Disabled MCP',
        url: 'https://dummy-disabled.mcp.test/api',
        description: 'A disabled dummy server',
        category: 'test',
        authType: 'none',
        enabled: false,
    };

    await convexClient.mutation(api.mcpServers.addMCPServer, dummyEnabledServer);
    await convexClient.mutation(api.mcpServers.addMCPServer, dummyDisabledServer);

    try {
      allMCPs = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
      console.log(`Fetched ${allMCPs.length} MCP servers for user ${TEST_USER_ID}`);
    } catch (error) {
      console.error('Failed to fetch MCP servers from Convex:', error);
      throw new Error('Could not fetch MCP servers for testing.');
    }
  });

  // Cleanup after all tests
  test.afterAll(async () => {
    if (convexClient) {
        const existingServers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
        for (const server of existingServers) {
            await convexClient.mutation(api.mcpServers.deleteMCPServer, { id: server._id });
        }
    }
  });


  // 2. Generate and run the test matrix for LLMs vs. Standard Tools
  // Note: Comprehensive testing of each standard tool's API endpoint requires specific mocks for each tool.
  // This section provides a template for how such tests would be structured, focusing on agent interaction.
  test.describe('LLM Interop with Standard Tools', () => {
    llmProviders.forEach(provider => {
      // Pick one standard tool for a basic test, or iterate through all if detailed mocks are set up
      const testStandardTool = standardTools.find(tool => tool.id === 'serper-search'); // Example
      if (testStandardTool) {
        test(`should execute successfully with ${provider.name} using ${testStandardTool.label}`, async ({ page }) => {
          // This test requires mocking the specific API endpoint for 'serper-search'
          // and making the LLM mock call that specific tool.
          const toolName = testStandardTool.name; // e.g., 'serper'
          const expectedResult = `Result from ${toolName} search`;
          const instructions = `Search for "test query" using the ${toolName} tool.`;

          // Mock LLM to call the standard tool
          await mockLLMToolCall(page, provider.id, provider.defaultModel, toolName, { query: 'test query' }, instructions);

          // Mock the standard tool's API endpoint if it makes direct HTTP calls
          // For Serper, this would be to serper.dev. This is very generic now.
          // Real implementation needs to target specific URLs based on tool.
          await page.route(/serper\.dev/, async route => {
              await route.fulfill({
                  status: 200,
                  contentType: 'application/json',
                  body: JSON.stringify({ organic: [{ title: expectedResult }] }),
              });
          });

          const node: WorkflowNode = {
            id: 'agent-standard-tool', type: 'agent', position: { x: 0, y: 0 },
            data: {
              label: `Agent with ${testStandardTool.label}`,
              model: `${provider.id}/${provider.defaultModel}`,
              selectedTools: [{ toolId: testStandardTool.id, configuration: {} }], // Agent needs to know about the tool
              instructions: instructions,
            },
          };
          const state: WorkflowState = { chatHistory: [], variables: {} };

          const result = await executeAgentNode(node, state, mockApiKeys as any);

          expect(result).toBeDefined();
          expect(result.__agentValue).toContain(expectedResult);
          expect(result.__agentToolCalls).toHaveLength(1);
          expect(result.__agentToolCalls[0].name).toBe(toolName);
        });
      }
    });
  });

  // 3. Generate and run the test matrix for LLMs vs. MCP Servers
  test.describe('LLM Interop with MCP Servers', () => {
    llmProviders.forEach(provider => {
      allMCPs.forEach(mcp => {
        const testToolName = 'mock_mcp_tool';
        const expectedToolResult = `Result from ${mcp.name} tool call via ${provider.name}`;
        const instructions = `Call the ${testToolName} tool on ${mcp.name}.`;

        if (mcp.enabled) {
          test(`LLM: ${provider.name} with ENABLED MCP: ${mcp.name} should succeed`, async ({ page }) => {
            console.log(`  - Running test: ${provider.name} with ENABLED MCP ${mcp.name}`);
            
            // Mock LLM to call the MCP tool
            await mockLLMToolCall(page, provider.id, provider.defaultModel, testToolName, { input: 'test' }, instructions);
            // Mock the MCP tool's execution endpoint and tool listing
            await mockToolResponse(page, testToolName, mcp.url, expectedToolResult);

            const node: WorkflowNode = {
              id: 'agent-mcp-enabled', type: 'agent', position: { x: 0, y: 0 },
              data: {
                label: `Agent with Enabled MCP (${mcp.name})`,
                model: `${provider.id}/${provider.defaultModel}`,
                mcpServerIds: [mcp._id],
                instructions: instructions,
              },
            };
            const state: WorkflowState = { chatHistory: [], variables: {} };

            const result = await executeAgentNode(node, state, mockApiKeys as any);

            expect(result).toBeDefined();
            expect(result.__agentValue).toContain(expectedToolResult);
            expect(result.__agentToolCalls).toHaveLength(1);
            expect(result.__agentToolCalls[0].name).toBe(testToolName);
            expect(result.__agentToolCalls[0].server_name).toBe(mcp.name);
          });
        } else {
          test(`LLM: ${provider.name} with DISABLED MCP: ${mcp.name} should NOT use the tool`, async ({ page }) => {
            console.log(`  - Running test: ${provider.name} with DISABLED MCP ${mcp.name}`);
            
            // Mock LLM to *try* to call the MCP tool (if the resolver was broken), but it won't be offered.
            await mockLLMToolCall(page, provider.id, provider.defaultModel, testToolName, { input: 'test' }, instructions);
            
            // No need to mock the MCP tool response, as it should not be called due to filtering by resolver.
            // If the agent attempts to call it (meaning resolver failed), the mockToolResponse might catch it as unhandled,
            // leading to a 500, which would fail the test if toolCalls were present.

            const node: WorkflowNode = {
              id: 'agent-mcp-disabled', type: 'agent', position: { x: 0, y: 0 },
              data: {
                label: `Agent with Disabled MCP (${mcp.name})`,
                model: `${provider.id}/${provider.defaultModel}`,
                mcpServerIds: [mcp._id], // This ID refers to a disabled server
                instructions: instructions,
              },
            };
            const state: WorkflowState = { chatHistory: [], variables: {} };

            const result = await executeAgentNode(node, state, mockApiKeys as any);

            // Expectation: The agent should not report a successful tool call for a disabled server.
            // Since the resolver filters out disabled servers, the LLM is not even aware of this tool.
            // So the agent should just return an LLM response without tool calls.
            expect(result).toBeDefined();
            expect(result.__agentToolCalls).toHaveLength(0); // No tool calls should be reported
            // Expect a text response from the LLM, likely the instructions themselves
            // or a generic response indicating it couldn't find a tool.
            expect(typeof result.__agentValue).toBe('string');
            // Depending on how the LLM generates content without tools, it might just echo instructions
            expect(result.__agentValue).toContain(instructions);
          });
        }
      });
    });
  });

  // 4. Test for Custom MCP Server Lifecycle (run serially)
  test.describe.serial('Custom MCP Server Lifecycle', () => {
    let newServerId: Id<'mcpServers'>;
    const customServer = {
      userId: TEST_USER_ID,
      name: 'My Custom Test MCP',
      url: 'https://custom-mcp.test/api',
      description: 'A temporary server for testing',
      category: 'custom',
      authType: 'none',
      enabled: true, // Ensure custom server is enabled for testing
    };
    const customToolName = 'custom_tool';
    const customToolResult = 'Custom tool executed successfully from lifecycle test';
    const customInstructions = `Use the ${customToolName} tool.`;


    test('Step 1: should add a new custom MCP server', async () => {
      newServerId = await convexClient.mutation(api.mcpServers.addMCPServer, customServer);
      expect(newServerId).toBeDefined();
    });

    test('Step 2: should retrieve the new custom MCP server', async () => {
      const servers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
      const found = servers.some(s => s._id === newServerId);
      expect(found).toBe(true);
      const retrievedServer = servers.find(s => s._id === newServerId);
      expect(retrievedServer?.name).toBe(customServer.name);
      expect(retrievedServer?.enabled).toBe(true);
    });

    test('Step 3: should execute a workflow with the custom MCP server', async ({ page }) => {
        // Mock the custom server's endpoint for tools/list and tools/call
        await mockToolResponse(page, customToolName, customServer.url, customToolResult);

        // For this test, we can use a mock LLM that is guaranteed to call our tool
        // Assuming provider 'openai' for simplicity, as mockLLMToolCall handles it.
        const providerId = 'openai'; 
        const model = 'gpt-4o';
        await mockLLMToolCall(page, providerId, model, customToolName, { message: 'hello' }, customInstructions);

        const node: WorkflowNode = {
            id: 'agent-custom-mcp', type: 'agent', position: { x: 0, y: 0 },
            data: {
                label: 'Agent with Custom MCP',
                model: `${providerId}/${model}`,
                mcpServerIds: [newServerId],
                instructions: customInstructions,
            },
        };
        const state: WorkflowState = { chatHistory: [], variables: {} };

        // We call it directly in the test's Node.js context.
        const result = await executeAgentNode(node, state, mockApiKeys as any);

        expect(result).toBeDefined();
        expect(result.__agentValue).toContain(customToolResult);
        expect(result.__agentToolCalls).toHaveLength(1);
        expect(result.__agentToolCalls[0].name).toBe(customToolName);
    });

    test('Step 4: should delete the custom MCP server', async () => {
      const result = await convexClient.mutation(api.mcpServers.deleteMCPServer, { id: newServerId });
      expect(result.success).toBe(true);
    });

    test('Step 5: should verify the custom MCP server is deleted', async () => {
      const servers = await convexClient.query(api.mcpServers.listUserMCPs, { userId: TEST_USER_ID });
      const found = servers.some(s => s._id === newServerId);
      expect(found).toBe(false);
    });
  });
});