import { WorkflowNode, WorkflowState } from '../types';
import { substituteVariables } from '../variable-substitution';
import { DEFAULT_MODELS } from '@/lib/api/models';

/**
 * Execute Extract Node - Uses LLM with JSON schema to extract structured data
 * Server-side only - called from API routes
 */
export async function executeExtractNode(
  node: WorkflowNode,
  state: WorkflowState,
  apiKeys?: { anthropic?: string; groq?: string; openai?: string; firecrawl?: string }
): Promise<any> {
  const { data } = node;

  try {
    // Substitute variables in instructions
    const instructions = substituteVariables(data.instructions || 'Extract information from the input', state);

    // Build context from previous node output
    const lastOutput = state.variables?.lastOutput;

    // Validate API keys are provided
    if (!apiKeys) {
      throw new Error('API keys are required for server-side execution');
    }

    // Server-side execution only
    const OpenAI = (await import('openai')).default;
    const client = new OpenAI({ apiKey: apiKeys?.openai });

    // Build full prompt with context
    let fullPrompt = instructions;
    if (lastOutput) {
      const contextData = typeof lastOutput === 'string'
        ? lastOutput
        : JSON.stringify(lastOutput, null, 2);

      const maxLength = 10000;
      const truncated = contextData.substring(0, maxLength);
      const wasTruncated = contextData.length > maxLength;

      fullPrompt = `${fullPrompt}\n\nData to extract from:\n${truncated}`;

      if (wasTruncated) {
        const originalLength = contextData.length;
        console.warn(`[Extract] Input truncated from ${originalLength} to ${maxLength} characters`);
        fullPrompt += `\n\n[Note: Input was truncated from ${originalLength} to ${maxLength} characters due to length limits]`;
      }
    }

    // Parse JSON schema
    let schema;
    try {
      schema = typeof data.jsonSchema === 'string'
        ? JSON.parse(data.jsonSchema)
        : data.jsonSchema;
    } catch (e) {
      throw new Error(`Invalid JSON schema: ${e instanceof Error ? e.message : 'Parse error'}`);
    }

    // If MCP tools are configured, use Responses API
    if (data.mcpTools && data.mcpTools.length > 0) {
      const tools = data.mcpTools.map((mcp: any) => ({
        type: 'mcp' as const,
        server_label: mcp.name,
        server_url: mcp.url && mcp.url.includes('{FIRECRAWL_API_KEY}')
          ? mcp.url.replace('{FIRECRAWL_API_KEY}', encodeURIComponent(apiKeys?.firecrawl || ''))
          : (mcp.url || ''),
        authorization: mcp.accessToken ? `Bearer ${mcp.accessToken}` : undefined,
        require_approval: 'never' as const,
      }));

      const response = await client.responses.create({
        model: DEFAULT_MODELS.openai,
        tools,
        input: fullPrompt,
        text: {
          format: {
            type: 'json_schema',
            name: 'extraction',
            schema,
            strict: true,
          },
        },
      });

      let extractedData;
      try {
        extractedData = JSON.parse(response.output_text || '{}');
      } catch (e) {
        console.error('Failed to parse LLM extraction response:', response.output_text);
        throw new Error(`LLM returned invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`);
      }

      return {
        extractedData,
        model: DEFAULT_MODELS.openai,
        tokensUsed: response.usage?.total_tokens || 0,
        mcpToolsUsed: response.output.filter((item: any) => item.type === 'mcp_call').length,
        __variableUpdates: { lastOutput: extractedData }, // Return as separate field for reducer
      };
    }

    // No MCP - use regular Chat Completions with JSON mode
    const completion = await client.chat.completions.create({
      model: data.model || DEFAULT_MODELS.openai,
      messages: [
        { role: 'user', content: fullPrompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'extraction',
          schema,
          strict: true,
        },
      },
    });

    let extractedData;
    try {
      extractedData = JSON.parse(completion.choices[0].message.content || '{}');
    } catch (e) {
      console.error('Failed to parse LLM extraction response:', completion.choices[0].message.content);
      throw new Error(`LLM returned invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`);
    }

    return {
      extractedData,
      model: data.model,
      tokensUsed: completion.usage?.total_tokens || 0,
      __variableUpdates: { lastOutput: extractedData }, // Return as separate field for reducer
    };
  } catch (error) {
    console.error('Extract execution error:', error);
    throw new Error(`Failed to execute extract: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
