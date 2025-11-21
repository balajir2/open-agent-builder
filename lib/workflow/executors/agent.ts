import 'server-only';
import { WorkflowNode, WorkflowState } from '../types';
import { substituteVariables } from '../variable-substitution';
import { resolveMCPServers, migrateMCPData } from '@/lib/mcp/resolver';
import { ToolFactory } from './tool-factory';
import { APIKeys } from '@/lib/api/config';
import { convertToOpenAITool } from '@langchain/core/utils/function_calling';
import { parseToolCallResult } from './tool-utils';

// Helper to unwrap MCP responses
function unwrapMCPResponse(response: any, serverName: string = 'MCP'): any {
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
 * Execute Agent Node - Calls LLM with instructions and tools
 * Server-side only - called from API routes
 */
export async function executeAgentNode(
  node: WorkflowNode,
  state: WorkflowState,
  apiKeys?: APIKeys
): Promise<any> {
  const { data } = node;

  try {
    // Substitute variables in instructions
    const originalInstructions = data.instructions || 'Process the input';
    const instructions = substituteVariables(originalInstructions, state);

    // Build context from previous node output
    const lastOutput = state.variables?.lastOutput;

    // Migrate data if using old format
    const migratedData = migrateMCPData(data);

    // Resolve MCP server IDs to full configurations
    let mcpTools = migratedData.mcpTools || [];
    if (migratedData.mcpServerIds && migratedData.mcpServerIds.length > 0) {
      // Fetch MCP configurations from registry
      mcpTools = await resolveMCPServers(migratedData.mcpServerIds);
    }

    // Filter out invalid MCP tool entries (null, undefined, or missing required properties)
    mcpTools = mcpTools.filter((mcp: any) => {
      if (!mcp) {
        console.warn('[Agent] Filtered out null/undefined MCP tool');
        return false;
      }
      if (!mcp.name && !mcp.toolName) {
        console.warn('[Agent] Filtered out MCP tool without name:', mcp);
        return false;
      }
      return true;
    });

    // Instantiate standard tools
    const standardTools: any[] = [];
    if (data.selectedTools && Array.isArray(data.selectedTools)) {
      for (const toolConfig of data.selectedTools) {
        try {
          const tool = await ToolFactory.createTool(toolConfig, apiKeys);
          if (tool) {
            standardTools.push(tool);
          }
        } catch (error) {
          console.error(`Failed to instantiate tool ${toolConfig.id}:`, error);
        }
      }
    }
    // Debug logging (only in development)
    if (process.env.DEBUG_TOOLS || process.env.NODE_ENV === 'development') {
      console.log(`[Tools] MCP tools count: ${mcpTools.length}`, mcpTools.map((m: any) => ({ name: m?.name, hasUrl: !!m?.url })));
      console.log(`[Tools] Created ${standardTools.length} standard tools:`, standardTools.map(t => t?.name || 'unnamed'));
      console.log(`[Tools] Selected tools config:`, data.selectedTools);
    }


    // Validate API keys are provided
    if (!apiKeys) {
      throw new Error('API keys are required for server-side execution');
    }

    // Server-side execution only
    if (process.env.MOCK_AGENT_RESPONSE) {
      type MockConfig = string | Record<string, unknown>;
      let mockConfig: MockConfig = process.env.MOCK_AGENT_RESPONSE;
      try {
        mockConfig = JSON.parse(process.env.MOCK_AGENT_RESPONSE);
      } catch (e) {
        // Keep raw string if parsing fails
      }

      let mockOutput: unknown = mockConfig;
      if (mockConfig && typeof mockConfig === 'object') {
        const nodeKey = node.id;
        const nodeName = node.data.nodeName as string | undefined;
        mockOutput = mockConfig[nodeKey] ?? (nodeName ? mockConfig[nodeName] : undefined) ?? mockConfig.default ?? mockOutput;
      }

      if (mockOutput !== undefined) {
        const mockChatUpdates = data.includeChatHistory
          ? [
            { role: 'user', content: data.instructions || '' },
            { role: 'assistant', content: typeof mockOutput === 'string' ? mockOutput : JSON.stringify(mockOutput) },
          ]
          : [];

        return {
          __agentValue: mockOutput,
          __agentToolCalls: [],
          __chatHistoryUpdates: mockChatUpdates,
          __variableUpdates: { lastOutput: mockOutput },
        };
      }
    }

    // Use the already-substituted instructions
    const contextualPrompt = instructions;

    // Prepare messages
    const messages = data.includeChatHistory && state.chatHistory.length > 0
      ? [
        ...state.chatHistory,
        { role: 'user' as const, content: contextualPrompt },
      ]
      : [{ role: 'user' as const, content: contextualPrompt }];

    // Parse model string (handle models with slashes like groq/openai/gpt-oss-120b)
    const modelString = data.model || 'anthropic/claude-sonnet-4-5-20250929';
    let provider: string;
    let modelName: string;

    if (modelString.includes('/')) {
      const firstSlashIndex = modelString.indexOf('/');
      provider = modelString.substring(0, firstSlashIndex);
      modelName = modelString.substring(firstSlashIndex + 1);
    } else {
      provider = 'openai';
      modelName = modelString;
    }

    // Use native SDKs for better MCP support
    let responseText = '';
    interface LLMUsage {
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      prompt_tokens?: number;
      completion_tokens?: number;
      [key: string]: unknown;
    }
    let usage: LLMUsage = {
      input_tokens: 0,
      output_tokens: 0,
      total_tokens: 0,
      prompt_tokens: 0,
      completion_tokens: 0,
    };
    let toolCalls: any[] = [];

    // Check if MCP tools are configured
    const hasMcpTools = mcpTools.length > 0;

    if (provider === 'anthropic' && apiKeys?.anthropic) {
      // Use native Anthropic SDK for MCP support
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const client = new Anthropic({ apiKey: apiKeys.anthropic });

      if (hasMcpTools || standardTools.length > 0) {
        const arcadeTools = mcpTools.filter((mcp: any) => mcp.name?.toLowerCase().includes('arcade'));
        const realMcpTools = mcpTools.filter((mcp: any) => !mcp.name?.toLowerCase().includes('arcade'));

        if (arcadeTools.length > 0) {
          console.warn('⚠️ Arcade tools detected in MCP config - these will be skipped');
        }

        // Build MCP servers configuration
        const mcpServers = realMcpTools.map((mcp: any) => ({
          type: 'url' as const,
          url: mcp.url && mcp.url.includes('{FIRECRAWL_API_KEY}')
            ? mcp.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys.firecrawl || ''))
            : (mcp.url || ''),
          name: mcp.name,
          authorization_token: mcp.accessToken,
        }));

        let useManualToolCalling = false;
        let anthropicError: any = null;

        try {
          const response = await client.beta.messages.create({
            model: modelName,
            max_tokens: 4096,
            messages: messages as any,
            mcp_servers: mcpServers as any,
            tools: standardTools.map(t => {
              const openAITool = convertToOpenAITool(t);
              return {
                name: openAITool.function.name,
                description: openAITool.function.description,
                input_schema: openAITool.function.parameters,
              };
            }),
            betas: ['mcp-client-2025-04-04'],
          } as any);

          const toolUses = response.content.filter((item: any) =>
            item.type === 'tool_use' || item.type === 'mcp_tool_use'
          );
          const toolResults = response.content.filter((item: any) =>
            item.type === 'tool_result' || item.type === 'mcp_tool_result'
          );
          const textBlocks = response.content.filter((item: any) => item.type === 'text');

          responseText = textBlocks.map((item: any) => item.text).join('\n');
          usage = (response.usage as any) || {};

          // Check if we need to execute standard tools
          const standardToolUses = toolUses.filter((tu: any) => standardTools.some(st => st.name === tu.name));
          let extraToolResults: any[] = [];

          if (standardToolUses.length > 0) {
            extraToolResults = await Promise.all(standardToolUses.map(async (tu: any) => {
              const tool = standardTools.find(t => t.name === tu.name);
              if (tool) {
                try {
                  const result = await tool.invoke(tu.input);
                  return {
                    type: 'tool_result',
                    tool_use_id: tu.id,
                    content: typeof result === 'string' ? result : JSON.stringify(result)
                  };
                } catch (e) {
                  return {
                    type: 'tool_result',
                    tool_use_id: tu.id,
                    content: JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
                    is_error: true
                  };
                }
              }
              return null;
            }));

            // Filter out nulls
            extraToolResults = extraToolResults.filter(Boolean);

            // Call Anthropic again with results
            if (extraToolResults.length > 0) {
              const finalResponse = await client.beta.messages.create({
                model: modelName,
                max_tokens: 4096,
                messages: [
                  ...messages as any,
                  { role: 'assistant', content: response.content },
                  { role: 'user', content: extraToolResults }
                ],
                mcp_servers: mcpServers as any,
                tools: standardTools.map(t => {
                  const openAITool = convertToOpenAITool(t);
                  return {
                    name: openAITool.function.name,
                    description: openAITool.function.description,
                    input_schema: openAITool.function.parameters,
                  };
                }),
                betas: ['mcp-client-2025-04-04'],
              } as any);

              const finalTextBlocks = finalResponse.content.filter((item: any) => item.type === 'text');
              responseText = finalTextBlocks.map((item: any) => item.text).join('\n');
              usage = (finalResponse.usage as any) || {};
            }
          }

          toolCalls = toolUses.map((item: any, idx: number) => {
            const toolCall: any = {
              type: item.type,
              name: item.name,
              server_name: item.server_name || 'MCP',
              arguments: item.input,
              tool_use_id: item.id,
            };

            // Include tool result if available
            // Check existing toolResults (from MCP SDK) or extraToolResults (from standard tools)
            const existingResult = toolResults.find((tr: any) => tr.tool_use_id === item.id);
            const extraResult = extraToolResults.find((tr: any) => tr.tool_use_id === item.id);
            const result = existingResult || extraResult;

            if (result) {
              if (result.is_error) {
                toolCall.output = { error: result.content };
              } else if (Array.isArray(result.content)) {
                toolCall.output = result.content[0]?.text || result.content;
              } else {
                toolCall.output = result.content;
              }
            }

            return toolCall;
          });
        } catch (err: any) {
          anthropicError = err;
          useManualToolCalling = true;

          // Check if this is an MCP-related error
          const errorMsg = err.message || '';
          const isMCPError = errorMsg.includes('Input should be an object') ||
            errorMsg.includes('input_type=list') ||
            errorMsg.includes('Internal server error') ||
            err.status === 500;

          if (!isMCPError) {
            throw err; // Re-throw if it's not MCP-related
          }

          console.warn('⚠️ Anthropic MCP failed, falling back to manual tool execution. Error:', errorMsg.substring(0, 200));
        }

        if (useManualToolCalling) {

          // Use Anthropic without MCP, then manually call tools
          const toolSchemas = await Promise.all(realMcpTools.map(async (mcp: any) => {
            try {
              console.log(`[MCP] Listing tools from ${mcp.name}...`);

              // Replace URL placeholders
              const resolvedUrl = mcp.url && mcp.url.includes('{FIRECRAWL_API_KEY}')
                ? mcp.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys.firecrawl || ''))
                : (mcp.url || '');

              const listResponse = await fetch(resolvedUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  ...(mcp.accessToken && { 'Authorization': `Bearer ${mcp.accessToken}` })
                },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: 1,
                  method: 'tools/list'
                })
              });

              if (!listResponse.ok) {
                console.error(`[MCP] Failed to list tools from ${mcp.name}: ${listResponse.status}`);
                return [];
              }

              let toolsList = await listResponse.json();
              console.log(`[MCP] Raw response from ${mcp.name}:`, JSON.stringify(toolsList).substring(0, 200));

              toolsList = unwrapMCPResponse(toolsList, mcp.name);

              const tools = toolsList.tools || [];
              console.log(`[MCP] Found ${tools.length} tools from ${mcp.name}`);

              return tools.map((tool: any) => ({
                name: tool.name,
                description: tool.description || 'No description',
                input_schema: tool.input_schema || { type: 'object', properties: {} },
                mcpUrl: resolvedUrl,
                mcpName: mcp.name,
                mcpAccessToken: mcp.accessToken
              }));
            } catch (e) {
              console.error(`[MCP] Error listing tools from ${mcp.name}:`, e);
              return [];
            }
          }));

          const allTools = [
            ...toolSchemas.flat(),
            ...standardTools.map(t => {
              const openAITool = convertToOpenAITool(t);
              return {
                name: openAITool.function.name,
                description: openAITool.function.description,
                input_schema: openAITool.function.parameters,
              };
            })
          ];

          // First call with tools
          const initialResponse = await client.messages.create({
            model: modelName,
            max_tokens: 4096,
            messages: messages as any,
            tools: allTools.map(t => ({
              name: t.name,
              description: t.description,
              input_schema: t.input_schema
            }))
          });

          usage = (initialResponse.usage as any) || {};

          // Check for tool uses
          const initialToolUses = initialResponse.content.filter((item: any) => item.type === 'tool_use');

          if (initialToolUses.length > 0) {
            // Execute tools manually
            const toolResults = await Promise.all(
              initialToolUses.map(async (toolUse: any) => {
                // Check standard tools first
                const standardTool = standardTools.find(t => t.name === toolUse.name);
                if (standardTool) {
                  try {
                    const result = await standardTool.invoke(toolUse.input);
                    return {
                      type: 'tool_result',
                      tool_use_id: toolUse.id,
                      content: typeof result === 'string' ? result : JSON.stringify(result)
                    };
                  } catch (e) {
                    return {
                      type: 'tool_result',
                      tool_use_id: toolUse.id,
                      content: JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
                      is_error: true
                    };
                  }
                }

                const toolDef = allTools.find((t: any) => t.name === toolUse.name);
                if (!toolDef) {
                  return {
                    type: 'tool_result',
                    tool_use_id: toolUse.id,
                    content: JSON.stringify({ error: 'Tool not found' }),
                    is_error: true
                  };
                }

                try {
                  const callResponse = await fetch(toolDef.mcpUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      ...(toolDef.mcpAccessToken && { 'Authorization': `Bearer ${toolDef.mcpAccessToken}` })
                    },
                    body: JSON.stringify({
                      jsonrpc: '2.0',
                      id: Date.now(),
                      method: 'tools/call',
                      params: {
                        name: toolUse.name,
                        arguments: toolUse.input
                      }
                    })
                  });

                  let result = await callResponse.json();
                  result = unwrapMCPResponse(result, toolDef.mcpName);

                  return {
                    type: 'tool_result',
                    tool_use_id: toolUse.id,
                    content: JSON.stringify(result.result || result)
                  };
                } catch (e) {
                  return {
                    type: 'tool_result',
                    tool_use_id: toolUse.id,
                    content: JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
                    is_error: true
                  };
                }
              })
            );

            // Second call with results
            const finalResponse = await client.messages.create({
              model: modelName,
              max_tokens: 4096,
              messages: [
                ...messages as any,
                { role: 'assistant', content: initialResponse.content },
                { role: 'user', content: toolResults }
              ]
            });

            // Safely extract text from the content blocks (some block types don't have .text)
            const textBlock = finalResponse.content.find((item: any) => item.type === 'text');
            responseText = (textBlock as any)?.text || '';
            usage = {
              input_tokens: (usage.input_tokens || 0) + ((finalResponse.usage as any)?.input_tokens || 0),
              output_tokens: (usage.output_tokens || 0) + ((finalResponse.usage as any)?.output_tokens || 0),
              total_tokens: (usage.input_tokens || 0) + (usage.output_tokens || 0) +
                ((finalResponse.usage as any)?.input_tokens || 0) + ((finalResponse.usage as any)?.output_tokens || 0)
            };

            toolCalls = initialToolUses.map((tu: any, idx: number) => ({
              type: 'tool_use',
              name: tu.name,
              server_name: 'MCP',
              arguments: tu.input,
              tool_use_id: tu.id,
              output: parseToolCallResult(toolResults[idx].content)
            }));
          } else {
            const textBlock = initialResponse.content.find((item: any) => item.type === 'text') as any;
            responseText = textBlock?.text || '';
          }
        } else {
          // if (anthropicError) {
          throw anthropicError;
        }
      } else {
        // Regular Anthropic call without MCP
        const response = await client.messages.create({
          model: modelName,
          max_tokens: 4096,
          messages: messages as any,
        });

        responseText = response.content[0].type === 'text' ? response.content[0].text : '';
        usage = (response.usage as any) || {};
      }
    } else if (provider === 'openai' && apiKeys?.openai) {
      if (hasMcpTools || standardTools.length > 0) {
        // Use native OpenAI SDK for function calling
        const OpenAI = (await import('openai')).default;
        const client = new OpenAI({ apiKey: apiKeys.openai });

        // Convert MCP tools to OpenAI function format
        const tools = [
          ...mcpTools.map((mcp: any) => ({
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
          })),
          ...standardTools.map(tool => convertToOpenAITool(tool))
        ];

        // First call with tools
        const response = await client.chat.completions.create({
          model: modelName,
          messages: messages as any,
          tools,
          tool_choice: "auto"
        });

        const message = response.choices[0].message;
        usage = (response.usage as unknown as LLMUsage) || ({} as LLMUsage);

        if (message.tool_calls && message.tool_calls.length > 0) {
          const toolResults = await Promise.all(
            message.tool_calls.map(async (call: any) => {
              try {
                // Check MCP tools
                const mcpServer = mcpTools.find((m: any) =>
                  (m.name || m.toolName) === call.function.name
                );

                if (mcpServer) {
                  const args = JSON.parse(call.function.arguments);

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
                        name: call.function.name,
                        arguments: args
                      }
                    })
                  });

                  let result = await mcpResponse.json();

                  // CRITICAL FIX: Unwrap array responses
                  result = unwrapMCPResponse(result, mcpServer.name);

                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: JSON.stringify(result.result || result)
                  };
                }

                // Check standard tools
                const standardTool = standardTools.find(t => t.name === call.function.name);
                if (standardTool) {
                  const args = JSON.parse(call.function.arguments);
                  const result = await standardTool.invoke(args);
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: typeof result === 'string' ? result : JSON.stringify(result)
                  };
                }

                throw new Error(`Tool not found: ${call.function.name}`);
              } catch (error) {
                return {
                  tool_call_id: call.id,
                  role: "tool" as const,
                  content: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' })
                };
              }
            })
          );

          const finalResponse = await client.chat.completions.create({
            model: modelName,
            messages: [
              ...messages as any,
              message,
              ...toolResults
            ]
          });

          responseText = finalResponse.choices[0].message.content || '';
          usage = {
            ...usage,
            prompt_tokens: (usage.prompt_tokens || 0) + (finalResponse.usage?.prompt_tokens || 0),
            completion_tokens: (usage.completion_tokens || 0) + (finalResponse.usage?.completion_tokens || 0),
            total_tokens: (usage.total_tokens || 0) + (finalResponse.usage?.total_tokens || 0),
          };

          toolCalls = message.tool_calls.map((call: any, idx) => ({
            id: call.id,
            name: call.function.name,
            arguments: JSON.parse(call.function.arguments),
            output: toolResults[idx] ? parseToolCallResult(toolResults[idx].content) : null
          }));
        } else {
          responseText = message.content || '';
        }
      } else {
        const { ChatOpenAI } = await import('@langchain/openai');
        const model = new ChatOpenAI({
          apiKey: apiKeys.openai,
          model: modelName,
        });

        const response = await model.invoke(messages);
        responseText = response.content as string;
        usage = response.response_metadata?.usage || {};
      }
    } else if (provider === 'groq' && apiKeys?.groq) {
      // Groq implementation - currently only supports MCP tools via OpenAI SDK compatibility
      // TODO: Add standard tools support for Groq

      if (hasMcpTools) {
        const OpenAI = (await import('openai')).default;
        const client = new OpenAI({
          apiKey: apiKeys.groq,
          baseURL: 'https://api.groq.com/openai/v1',
        });

        const tools = mcpTools.map((mcp: any) => ({
          type: "mcp" as const,
          server_label: mcp.name || mcp.toolName || 'unknown_tool',
          server_url: mcp.url && mcp.url.includes('{FIRECRAWL_API_KEY}')
            ? mcp.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys.firecrawl || ''))
            : (mcp.url || ''),
        }));

        const response = await client.responses.create({
          model: modelName,
          input: messages[messages.length - 1].content as string,
          tools,
        } as any);

        responseText = (response as any).output_text || '';
        usage = (response as any).usage || {};

        const outputs = (response as any).output || [];
        toolCalls = outputs
          .filter((o: any) => o.type === 'tool_use')
          .map((o: any) => ({
            id: o.id,
            name: o.name,
            arguments: o.input,
            output: null,
          }));
      } else {
        const { ChatOpenAI } = await import('@langchain/openai');
        const model = new ChatOpenAI({
          apiKey: apiKeys.groq,
          model: modelName,
          configuration: {
            baseURL: 'https://api.groq.com/openai/v1',
          },
        });

        const response = await model.invoke(messages);
        responseText = response.content as string;
        usage = response.response_metadata?.usage || {};
      }
    } else if (provider === 'google' && apiKeys?.google) {
      // Google Gemini implementation
      const { ChatGoogleGenerativeAI } = await import('@langchain/google-genai');

      if (hasMcpTools || standardTools.length > 0) {
        // Gemini with tools
        const model = new ChatGoogleGenerativeAI({
          apiKey: apiKeys.google,
          modelName: modelName,
        });

        // Convert both MCP and standard tools to OpenAI format
        // LangChain will handle the conversion to Gemini's format internally
        const tools = [
          ...mcpTools.map((mcp: any) => ({
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
          })),
          ...standardTools.map(tool => convertToOpenAITool(tool))
        ];

        const response = await model.invoke(messages, {
          tools: tools as any,
        });

        usage = response.response_metadata?.usage || {};

        // Check for tool calls
        if (response.tool_calls && response.tool_calls.length > 0) {
          const toolResults = await Promise.all(
            response.tool_calls.map(async (call: any) => {
              try {
                // Check MCP tools first
                const mcpServer = mcpTools.find((m: any) =>
                  (m.name || m.toolName) === call.name
                );

                if (mcpServer) {
                  const args = call.args;

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
                        name: mcpServer.name || mcpServer.toolName,
                        arguments: args
                      }
                    })
                  });

                  const mcpResult = await mcpResponse.json();
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: JSON.stringify(mcpResult.result || mcpResult)
                  };
                }

                // Check standard tools
                const standardTool = standardTools.find(t => t.name === call.name);
                if (standardTool) {
                  const result = await standardTool.invoke(call.args);
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: typeof result === 'string' ? result : JSON.stringify(result)
                  };
                }

                return {
                  tool_call_id: call.id,
                  role: "tool" as const,
                  content: JSON.stringify({ error: 'Tool not found' })
                };
              } catch (error) {
                return {
                  tool_call_id: call.id,
                  role: "tool" as const,
                  content: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' })
                };
              }
            })
          );

          // Get final response with tool results
          const finalResponse = await model.invoke([
            ...messages as any,
            response,
            ...toolResults
          ]);

          responseText = finalResponse.content as string;
          usage = {
            ...usage,
            prompt_tokens: (usage.prompt_tokens || 0) + (finalResponse.response_metadata?.usage?.prompt_tokens || 0),
            completion_tokens: (usage.completion_tokens || 0) + (finalResponse.response_metadata?.usage?.completion_tokens || 0),
            total_tokens: (usage.total_tokens || 0) + (finalResponse.response_metadata?.usage?.total_tokens || 0),
          };

          toolCalls = response.tool_calls.map((call: any, idx) => ({
            id: call.id,
            name: call.name,
            arguments: call.args,
            output: toolResults[idx] ? parseToolCallResult(toolResults[idx].content) : null
          }));
        } else {
          responseText = response.content as string;
        }
      } else {
        // Regular Gemini call without tools
        const model = new ChatGoogleGenerativeAI({
          apiKey: apiKeys.google,
          modelName: modelName,
        });

        const response = await model.invoke(messages);
        responseText = response.content as string;
        usage = response.response_metadata?.usage || {};
      }
    } else {
      throw new Error(`No API key available for provider: ${provider}`);
    }

    const serverChatUpdates = data.includeChatHistory
      ? [
        { role: 'user', content: data.instructions || '' },
        { role: 'assistant', content: responseText },
      ]
      : [];

    let output: unknown = responseText;
    if (data.outputFormat === 'JSON') {
      try {
        output = JSON.parse(responseText);
      } catch (e) {
        console.warn('Could not parse JSON output, using raw text');
      }
    }

    return {
      __agentValue: output,
      __agentToolCalls: toolCalls,
      __chatHistoryUpdates: serverChatUpdates,
      __variableUpdates: { lastOutput: output },
    };
  } catch (error) {
    console.error('Agent execution error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('API key') || errorMessage.includes('api_key')) {
      throw new Error('Missing API key. Please add your LLM provider key in Settings.');
    }

    if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
      throw new Error('Rate limited. Please wait a moment and try again.');
    }

    if (errorMessage.includes('No API key available')) {
      throw new Error('No API key configured. Please add an Anthropic, OpenAI, or Groq API key in your .env.local file.');
    }

    throw new Error(`Agent execution failed: ${errorMessage}`);
  }
}