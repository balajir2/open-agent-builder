import { ToolFactory } from '../lib/workflow/executors/tool-factory';
import { APIKeys } from '../lib/api/config';

async function verifyToolFactory() {
    console.log('Verifying ToolFactory...');

    const mockApiKeys: APIKeys = {
        openai: 'mock-openai-key',
        anthropic: 'mock-anthropic-key',
        tavily: 'mock-tavily-key',
    };

    try {
        console.log('Testing Tavily tool creation...');
        const tavilyTool = await ToolFactory.createTool({
            id: 'tavily-search',
            name: 'tavily-search',
            config: { maxResults: 5 }
        }, mockApiKeys);

        if (tavilyTool && tavilyTool.name === 'tavily_search_results_json') {
            console.log('✅ Tavily tool created successfully');
        } else {
            console.error('❌ Failed to create Tavily tool', tavilyTool);
        }

    } catch (error) {
        console.error('❌ Error verifying ToolFactory:', error);
    }
}

verifyToolFactory();
