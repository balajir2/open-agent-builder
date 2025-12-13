import 'server-only';
import { WorkflowNode, WorkflowState } from '../types';
import { substituteVariables } from '../variable-substitution';

/**
 * Execute Gamma AI Node
 * Server-side only - called from API routes
 */
export async function executeGammaNode(
    node: WorkflowNode,
    state: WorkflowState,
    apiKey?: string
): Promise<any> {
    const data = node.data as any;

    try {
        if (!apiKey) {
            throw new Error('Gamma API key is required for server-side execution');
        }

        // Substitute variables in prompt
        const originalPrompt = data.prompt || 'Create a presentation about AI';
        const prompt = substituteVariables(originalPrompt, state);

        // Build API request body with all parameters
        const requestBody: any = {
            inputText: prompt,
            textMode: data.textMode || 'generate',
            format: data.format || 'presentation',
        };

        // Add optional parameters if provided
        if (data.numCards) requestBody.numCards = parseInt(data.numCards);
        if (data.textAmount) requestBody.textOptions = { amount: data.textAmount };
        if (data.imageSource) requestBody.imageOptions = { source: data.imageSource };
        if (data.language) {
            requestBody.textOptions = { ...requestBody.textOptions, language: data.language };
        }

        console.log('[GammaNode] Generating with format:', requestBody.format, 'cards:', requestBody.numCards || 10);

        // Step 1: Create generation
        const createResponse = await fetch(
            'https://public-api.gamma.app/v0.2/generations',
            {
                method: 'POST',
                headers: {
                    'X-API-KEY': apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!createResponse.ok) {
            const error = await createResponse.text();
            throw new Error(`Gamma API error: ${createResponse.status} - ${error}`);
        }

        const createResult = await createResponse.json();

        // Try to find ID in various places
        const generationId = createResult.id || createResult.generationId || createResult.data?.id;

        if (!generationId) {
            throw new Error('No generation ID returned from Gamma API. Response: ' + JSON.stringify(createResult));
        }

        console.log('[GammaNode] Generation started:', generationId);

        // Wait 1 minute before checking status as requested
        console.log('[GammaNode] Polling for completion...');
        await new Promise(resolve => setTimeout(resolve, 60 * 1000));

        // Step 2: Poll for completion (max 5 minutes total, so 4 more minutes)
        const maxWaitTime = 4 * 60 * 1000; // 4 more minutes
        const pollInterval = 10 * 1000; // Check every 10 seconds
        const startTime = Date.now();

        while (Date.now() - startTime < maxWaitTime) {
            const statusResponse = await fetch(
                `https://public-api.gamma.app/v0.2/generations/${generationId}`,
                {
                    headers: {
                        'X-API-KEY': apiKey,
                    },
                }
            );

            if (!statusResponse.ok) {
                console.warn(`[GammaNode] Status check failed: ${statusResponse.status}`);
                await new Promise(resolve => setTimeout(resolve, pollInterval));
                continue;
            }

            const status = await statusResponse.json();

            // Extract URL including gammaUrl
            const url = status.gammaUrl || status.url || status.webUrl;

            if (status.state === 'completed' || status.status === 'completed') {
                console.log('[GammaNode] Generation completed!');
                return {
                    success: true,
                    generationId,
                    url: url,
                    data: status,
                    // Update lastOutput variable
                    __variableUpdates: { lastOutput: url },
                };
            }

            if (status.state === 'failed' || status.status === 'failed') {
                throw new Error(`Generation failed: ${status.error || 'Unknown error'}`);
            }

            // Wait before next poll
            await new Promise(resolve => setTimeout(resolve, pollInterval));
        }

        // Timeout reached - return current status and URL
        console.log('[GammaNode] Timeout reached (5 minutes total). Returning current status.');

        // Fetch latest status one last time
        const finalStatusResponse = await fetch(
            `https://public-api.gamma.app/v0.2/generations/${generationId}`,
            {
                headers: {
                    'X-API-KEY': apiKey,
                },
            }
        );

        let finalUrl = null;
        let finalState = 'processing';
        let finalData = {};

        if (finalStatusResponse.ok) {
            const finalStatus = await finalStatusResponse.json();
            finalUrl = finalStatus.gammaUrl || finalStatus.url || finalStatus.webUrl;
            finalState = finalStatus.state || finalStatus.status;
            finalData = finalStatus;
        }

        return {
            success: true, // Return success so workflow continues
            generationId,
            url: finalUrl,
            state: finalState,
            data: finalData,
            message: 'Generation processing (timeout reached)',
            __variableUpdates: { lastOutput: finalUrl },
        };

    } catch (error) {
        console.error('Gamma execution error:', error);
        throw new Error(`Failed to execute Gamma node: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
