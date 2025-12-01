import { WorkflowNode, WorkflowState } from '../types';
import { substituteVariables } from '../variable-substitution';
import { resolveMCPServers, migrateMCPData } from '@/lib/mcp/resolver';
import { ToolFactory } from './tool-factory';
import { APIKeys } from '@/lib/api/config';
import { convertToOpenAITool } from '@langchain/core/utils/function_calling';
import { parseToolCallResult, truncateContent } from './tool-utils';
import { prefetchFileContents } from '../file-utils';
import { unwrapMCPResponse, convertMcpToOpenAiTool, executeMcpTool, fetchMcpTools } from './mcp-utils';


export async function executeAgentNode(
  node: WorkflowNode,
  state: WorkflowState,
  apiKeys?: { anthropic?: string; groq?: string; openai?: string; firecrawl?: string; arcade?: string; google?: string }
): Promise<any> {
  const { data } = node;

  // Log available keys (security: only log names)
  console.log('[Agent] Available API Keys:', Object.keys(apiKeys || {}).filter(k => !!(apiKeys as any)[k]));
  console.log('[Agent] Selected Tools Config:', JSON.stringify(data.selectedTools || [], null, 2));

  try {
    // 1. Migrate data if using old format
    const migratedData = migrateMCPData(data);

    // 2. Resolve MCP server IDs to full configurations
    let mcpTools = migratedData.mcpTools || [];
    if (migratedData.mcpServerIds && migratedData.mcpServerIds.length > 0) {
      mcpTools = await resolveMCPServers(migratedData.mcpServerIds);
    }

    // Filter out invalid MCP tool entries
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

    // Flatten tools from all MCP servers
    const flattenedMcpTools = (await Promise.all(mcpTools.map(async (server: any) => {
      const url = server.url && server.url.includes('{FIRECRAWL_API_KEY}')
        ? server.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys?.firecrawl || ''))
        : (server.url || '');

      if (server.name.toLowerCase().includes('firecrawl') && !apiKeys?.firecrawl) {
        console.warn(`[Tools] ⚠️ Firecrawl tool detected but no API key provided in apiKeys.firecrawl`);
      }

      let tools = server.availableTools || [];

      // Check if tools are just strings (names) or missing, and fetch if needed
      if (tools.length === 0 || (tools.length > 0 && typeof tools[0] === 'string')) {
        console.log(`[Tools] Fetching full tool definitions for ${server.name}...`);
        const fetchedTools = await fetchMcpTools(server, apiKeys);
        console.log(`[Tools] Fetched ${fetchedTools.length} tools from ${server.name}`);
        if (fetchedTools.length > 0) {
          tools = fetchedTools;
        } else {
          console.warn(`[Tools] ⚠️ Failed to fetch tools from ${server.name} or no tools available.`);
        }
      }

      return tools.map((tool: any) => {
        const toolObj = typeof tool === 'string' ? { name: tool } : tool;
        return {
          ...toolObj,
          serverName: server.name,
          serverUrl: url,
          serverAuthToken: server.accessToken
        };
      });
    }))).flat();

    console.log(`[Tools] Total flattened MCP tools: ${flattenedMcpTools.length}`);

    // 3. Prefetch file contents
    await prefetchFileContents(migratedData.instructions || '', state);

    // 4. Substitute Variables
    const instructions = substituteVariables(migratedData.instructions || '', state);

    // 5. Instantiate Standard Tools
    const standardTools: any[] = [];
    if (data.selectedTools && Array.isArray(data.selectedTools)) {
      for (const toolConfig of data.selectedTools) {
        try {
          const tool = await ToolFactory.createTool(toolConfig, apiKeys || {});
          if (tool) {
            standardTools.push(tool);
          }
        } catch (error) {
          // Fix: Handle both id and toolId
          console.error(`Failed to instantiate tool ${(toolConfig as any).toolId || (toolConfig as any).id}:`, error);
        }
      }
    }

    // Debug logging
    if (process.env.DEBUG_TOOLS || process.env.NODE_ENV === 'development') {
      console.log(`[Tools] MCP tools count: ${mcpTools.length}`, mcpTools.map((m: any) => ({ name: m?.name, hasUrl: !!m?.url })));
      console.log(`[Tools] Created ${standardTools.length} standard tools:`, standardTools.map(t => t?.name || 'unnamed'));
    }

    // 6. Validate API Keys
    if (!apiKeys) {
      throw new Error('API keys are required for server-side execution');
    }

    // 7. Mock Response Check (Server-side execution only)
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

    // 8. Prepare Execution Context
    const contextualPrompt = instructions;
    const messages = data.includeChatHistory && state.chatHistory.length > 0
      ? [
        ...state.chatHistory,
        { role: 'user' as const, content: contextualPrompt },
      ]
      : [{ role: 'user' as const, content: contextualPrompt }];

    // Parse model string
    const modelString = data.model || 'anthropic/claude-3-5-sonnet-20241022';
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

    // Initialize usage and toolCalls
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
    let responseText = '';

    const hasMcpTools = mcpTools.length > 0;
    const maxTokens = data.tokenLimit || 4096;

    // 9. Execute based on Provider
    if (provider === 'anthropic' && apiKeys?.anthropic) {
      // --- Anthropic Implementation ---
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const client = new Anthropic({ apiKey: apiKeys.anthropic });

      if (hasMcpTools || standardTools.length > 0) {
        const arcadeTools = mcpTools.filter((mcp: any) => mcp.name?.toLowerCase().includes('arcade'));
        const realMcpTools = mcpTools.filter((mcp: any) => !mcp.name?.toLowerCase().includes('arcade'));

        if (arcadeTools.length > 0) {
          console.warn('⚠️ Arcade tools detected in MCP config - these will be skipped');
        }

        const mcpServers = realMcpTools
          .map((mcp: any) => {
            const url = mcp.url && mcp.url.includes('{FIRECRAWL_API_KEY}')
              ? mcp.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys.firecrawl || ''))
              : (mcp.url || '');

            // Validate that we have required fields
            if (!url || !mcp.name) {
              console.warn(`⚠️ Skipping invalid MCP server: ${mcp.name || 'unnamed'} - missing URL or name`);
              return null;
            }

            const server: any = {
              type: 'url' as const,
              url: url,
              name: mcp.name,
            };

            // Only include authorization_token if it exists (some MCP servers don't require auth)
            if (mcp.accessToken) {
              server.authorization_token = mcp.accessToken;
            }

            return server;
          })
          .filter(Boolean)
          .filter((s: any) => !s.name.toLowerCase().includes('firecrawl'));

        let useManualToolCalling = false;
        let anthropicError: any = null;

        const manualMcpTools = flattenedMcpTools.filter((t: any) =>
          t.name.includes('firecrawl') || t.serverName?.toLowerCase().includes('firecrawl')
        );

        const finalTools = [
          ...standardTools.map(t => {
            const openAITool = convertToOpenAITool(t);
            return {
              name: openAITool.function.name,
              description: openAITool.function.description,
              input_schema: openAITool.function.parameters,
            };
          }),
          ...flattenedMcpTools.map((t: any) => {
            const openAITool = convertMcpToOpenAiTool(t);
            return {
              name: openAITool.function.name,
              description: openAITool.function.description,
              input_schema: openAITool.function.parameters,
            };
          })
        ].filter((tool, index, self) =>
            index === self.findIndex((t) => t.name === tool.name)
        );

        console.log('[Agent] Final Tools passed to LLM:', JSON.stringify(finalTools.map(t => ({ name: t.name, description: t.description })), null, 2));

        try {
          const response = await client.beta.messages.create({
            model: modelName,
            max_tokens: maxTokens,
            messages: messages as any,
            mcp_servers: mcpServers.length > 0 ? mcpServers as any : undefined,
            tools: finalTools,
            betas: mcpServers.length > 0 ? ['mcp-client-2025-04-04'] : undefined,
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

          const manualToolUses = toolUses.filter((tu: any) =>
            standardTools.some(st => st.name === tu.name) ||
            manualMcpTools.some((mt: any) => (mt.name || mt.toolName) === tu.name)
          );

          let extraToolResults: any[] = [];

          if (manualToolUses.length > 0) {
            extraToolResults = await Promise.all(manualToolUses.map(async (tu: any) => {
              const tool = standardTools.find(t => t.name === tu.name);
              if (tool) {
                try {
                  const result = await tool.invoke(tu.input);
                  const stringResult = typeof result === 'string' ? result : JSON.stringify(result);
                  return {
                    type: 'tool_result',
                    tool_use_id: tu.id,
                    content: truncateContent(stringResult)
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

              const mcpTool = manualMcpTools.find((t: any) => (t.name || t.toolName) === tu.name);
              if (mcpTool) {
                try {
                  const mcpServer = {
                    name: mcpTool.serverName,
                    url: mcpTool.serverUrl,
                    authToken: mcpTool.serverAuthToken
                  };
                  console.log(`🔧 Manual MCP tool call: ${tu.name}`, {
                    input: tu.input,
                    inputType: typeof tu.input,
                    schema: mcpTool.inputSchema
                  });

                  const result = await executeMcpTool(mcpServer, tu.name, tu.input, apiKeys);
                  const stringResult = JSON.stringify(result.result || result);
                  return {
                    type: 'tool_result',
                    tool_use_id: tu.id,
                    content: truncateContent(stringResult)
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

            extraToolResults = extraToolResults.filter(Boolean);

            if (extraToolResults.length > 0) {
              const finalResponse = await client.beta.messages.create({
                model: modelName,
                max_tokens: maxTokens,
                messages: [
                  ...messages as any,
                  { role: 'assistant', content: response.content },
                  { role: 'user', content: extraToolResults }
                ],
                mcp_servers: mcpServers as any,
                tools: finalTools,
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

            const existingResult = toolResults.find((tr: any) => tr.tool_use_id === item.id);
            const extraResult = extraToolResults.find((tr: any) => tr.tool_use_id === item.id);
            const result = existingResult || extraResult;

            if (result) {
              toolCall.output = result.is_error ? { error: result.content } : (Array.isArray(result.content) ? result.content[0]?.text || result.content : result.content);
            }
            return toolCall;
          });
        } catch (err: any) {
          anthropicError = err;
          useManualToolCalling = true;
          const errorMsg = err.message || '';
          const isMCPError = errorMsg.includes('Input should be an object') ||
            errorMsg.includes('input_type=list') ||
            errorMsg.includes('Internal server error') ||
            err.status === 500;

          console.error('❌ Anthropic API error:', {
            status: err.status,
            message: errorMsg,
            mcpServers: mcpServers.map((s: any) => ({ name: s.name, url: s.url, hasAuth: !!s.authorization_token })),
            isMCPError,
          });

          if (!isMCPError) {
            throw err;
          }
          console.warn('⚠️ Anthropic MCP failed, falling back to manual tool execution. Error:', errorMsg.substring(0, 200));
        }

        if (useManualToolCalling) {
          console.log('⚠️ Anthropic MCP failed, attempting manual tool calling for all tools...');

          const allManualMcpTools = flattenedMcpTools;
          const allFinalTools = [
            ...standardTools.map(t => {
              const openAITool = convertToOpenAITool(t);
              return {
                name: openAITool.function.name,
                description: openAITool.function.description,
                input_schema: openAITool.function.parameters,
              };
            }),
            ...allManualMcpTools.map((t: any) => {
              const openAITool = convertMcpToOpenAiTool(t);
              return {
                name: openAITool.function.name,
                description: openAITool.function.description,
                input_schema: openAITool.function.parameters,
              };
            })
          ];

          const initialResponse = await client.messages.create({
            model: modelName,
            max_tokens: maxTokens,
            messages: messages as any,
            tools: allFinalTools,
          });

          const toolUses = initialResponse.content.filter((item: any) => item.type === 'tool_use');
          const textBlocks = initialResponse.content.filter((item: any) => item.type === 'text');
          responseText = textBlocks.map((item: any) => item.text).join('\n');
          usage = (initialResponse.usage as any) || {};

          if (toolUses.length > 0) {
            const toolResults = await Promise.all(toolUses.map(async (tu: any) => {
              const tool = standardTools.find(t => t.name === tu.name);
              if (tool) {
                try {
                  const result = await tool.invoke(tu.input);
                  const stringResult = typeof result === 'string' ? result : JSON.stringify(result);
                  return {
                    type: 'tool_result',
                    tool_use_id: tu.id,
                    content: truncateContent(stringResult)
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

              const mcpTool = allManualMcpTools.find((t: any) => (t.name || t.toolName) === tu.name);
              if (mcpTool) {
                try {
                  const mcpServer = {
                    name: mcpTool.serverName,
                    url: mcpTool.serverUrl,
                    authToken: mcpTool.serverAuthToken
                  };
                  const result = await executeMcpTool(mcpServer, tu.name, tu.input, apiKeys);
                  const stringResult = JSON.stringify(result.result || result);
                  return {
                    type: 'tool_result',
                    tool_use_id: tu.id,
                    content: truncateContent(stringResult)
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
              return {
                type: 'tool_result',
                tool_use_id: tu.id,
                content: JSON.stringify({ error: `Tool not found: ${tu.name}` }),
                is_error: true
              };
            }));

            const finalResponse = await client.messages.create({
              model: modelName,
              max_tokens: maxTokens,
              messages: [
                ...messages as any,
                { role: 'assistant', content: initialResponse.content },
                { role: 'user', content: toolResults }
              ],
              tools: allFinalTools,
            });

            const finalTextBlocks = finalResponse.content.filter((item: any) => item.type === 'text');
            responseText = finalTextBlocks.map((item: any) => item.text).join('\n');
            const finalUsage = (finalResponse.usage as any) || {};
            usage = {
              input_tokens: (usage.input_tokens || 0) + (finalUsage.input_tokens || 0),
              output_tokens: (usage.output_tokens || 0) + (finalUsage.output_tokens || 0),
              total_tokens: (usage.total_tokens || 0) + (finalUsage.total_tokens || 0),
            };

            toolCalls = toolUses.map((item: any, idx: number) => {
                const mcpTool = allManualMcpTools.find((t: any) => (t.name || t.toolName) === item.name);
                return {
                    type: item.type,
                    name: item.name,
                    server_name: mcpTool ? mcpTool.serverName : undefined,
                    arguments: item.input,
                    tool_use_id: item.id,
                    output: toolResults[idx] ? parseToolCallResult(toolResults[idx].content) : null,
                };
            });
          }
        }
      } else {
        const response = await client.messages.create({
          model: modelName,
          max_tokens: maxTokens,
          messages: messages as any,
        });
        responseText = response.content[0].type === 'text' ? response.content[0].text : '';
        usage = (response.usage as any) || {};
      }

    } else if ((provider === 'openai' && apiKeys?.openai) || (provider === 'groq' && apiKeys?.groq)) {
      // --- OpenAI / Groq Implementation ---
      const OpenAI = (await import('openai')).default;
      const client = new OpenAI({
        apiKey: provider === 'groq' ? apiKeys.groq : apiKeys.openai,
        baseURL: provider === 'groq' ? 'https://api.groq.com/openai/v1' : undefined,
      });

      if (hasMcpTools || standardTools.length > 0) {
        const tools = [
          ...flattenedMcpTools.map(convertMcpToOpenAiTool),
          ...standardTools.map(tool => convertToOpenAITool(tool))
        ];

        const response = await client.chat.completions.create({
          model: modelName,
          messages: messages as any,
          tools,
          tool_choice: "auto",
          ...(data.tokenLimit ? { max_tokens: maxTokens } : {}),
        });

        const message = response.choices[0].message;
        usage = (response.usage as unknown as LLMUsage) || ({} as LLMUsage);

        if (message.tool_calls && message.tool_calls.length > 0) {
          const toolResults = await Promise.all(
            message.tool_calls.map(async (call: any) => {
              try {
                const mcpTool = flattenedMcpTools.find((t: any) =>
                  (t.name || t.toolName) === call.function.name
                );

                if (mcpTool) {
                  const args = JSON.parse(call.function.arguments);
                  const mcpServer = {
                    name: mcpTool.serverName,
                    url: mcpTool.serverUrl,
                    authToken: mcpTool.serverAuthToken
                  };
                  console.log(`🔧 Calling MCP tool: ${call.function.name} with args: `, JSON.stringify(args, null, 2));
                  const result = await executeMcpTool(mcpServer, call.function.name, args, apiKeys);
                  console.log(`✅ MCP tool ${call.function.name} returned: `, JSON.stringify(result, null, 2).substring(0, 500));
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: truncateContent(JSON.stringify(result.result || result))
                  };
                }

                const standardTool = standardTools.find(t => t.name === call.function.name);
                if (standardTool) {
                  const args = JSON.parse(call.function.arguments);
                  const result = await standardTool.invoke(args);
                  const stringResult = typeof result === 'string' ? result : JSON.stringify(result);
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: truncateContent(stringResult)
                  };
                }

                throw new Error(`Tool not found: ${call.function.name} `);
              } catch (error) {
                console.error(`❌ Tool execution failed for ${call.function.name}:`, error);
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
            ],
            ...(data.tokenLimit ? { max_tokens: maxTokens } : {}),
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
        const response = await client.chat.completions.create({
          model: modelName,
          messages: messages as any,
          ...(data.tokenLimit ? { max_tokens: maxTokens } : {}),
        });
        responseText = response.choices[0].message.content || '';
        usage = (response.usage as unknown as LLMUsage) || ({} as LLMUsage);
      }

    } else if (provider === 'google' && apiKeys?.google) {
      // --- Google Gemini Implementation ---
      const { ChatGoogleGenerativeAI } = await import('@langchain/google-genai');

      if (hasMcpTools || standardTools.length > 0) {
        const model = new ChatGoogleGenerativeAI({
          apiKey: apiKeys.google,
          model: modelName,
          maxOutputTokens: data.tokenLimit,
        });

        const tools = [
          ...flattenedMcpTools.map(convertMcpToOpenAiTool),
          ...standardTools.map(tool => convertToOpenAITool(tool))
        ];

        const response = await model.invoke(messages, {
          tools: tools as any,
        });

        usage = response.response_metadata?.usage || {};

        if (response.tool_calls && response.tool_calls.length > 0) {
          const toolResults = await Promise.all(
            response.tool_calls.map(async (call: any) => {
              try {
                const mcpTool = flattenedMcpTools.find((t: any) =>
                  (t.name || t.toolName) === call.name
                );

                if (mcpTool) {
                  // Construct a server object for executeMcpTool
                  const mcpServer = {
                    name: mcpTool.serverName,
                    url: mcpTool.serverUrl,
                    authToken: mcpTool.serverAuthToken
                  };
                  console.log(`🔧 Calling MCP tool: ${call.name} with args: `, JSON.stringify(call.args, null, 2));
                  const result = await executeMcpTool(mcpServer, call.name, call.args, apiKeys);
                  console.log(`✅ MCP tool ${call.name} returned: `, JSON.stringify(result, null, 2).substring(0, 500));
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: truncateContent(JSON.stringify(result.result || result))
                  };
                }

                const standardTool = standardTools.find(t => t.name === call.name);
                if (standardTool) {
                  const result = await standardTool.invoke(call.args);
                  const stringResult = typeof result === 'string' ? result : JSON.stringify(result);
                  return {
                    tool_call_id: call.id,
                    role: "tool" as const,
                    content: truncateContent(stringResult)
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
        const model = new ChatGoogleGenerativeAI({
          apiKey: apiKeys.google,
          model: modelName,
          maxOutputTokens: data.tokenLimit,
        });
        const response = await model.invoke(messages);
        responseText = response.content as string;
        usage = response.response_metadata?.usage || {};
      }

    } else {
      throw new Error(`No API key available for provider: ${provider} `);
    }

    // 10. Return Result
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
      __usage: {
        input_tokens: usage.input_tokens || usage.prompt_tokens || 0,
        output_tokens: usage.output_tokens || usage.completion_tokens || 0,
        total_tokens: usage.total_tokens || ((usage.input_tokens || usage.prompt_tokens || 0) + (usage.output_tokens || usage.completion_tokens || 0)),
      },
    };

  } catch (error) {
    console.error('Agent execution error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Agent execution failed: ${errorMessage} `);
  }
}
