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
        // Add export format (pptx, pdf, or web)
        if (data.exportAs && data.exportAs !== 'web') {
            requestBody.exportAs = data.exportAs;
        }

        console.log('[GammaNode] Generating with format:', requestBody.format, 'cards:', requestBody.numCards || 10, requestBody.exportAs ? `exportAs: ${requestBody.exportAs}` : '');

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

            // Extract URLs including download URL for PPTX/PDF exports
            const url = status.gammaUrl || status.url || status.webUrl;
            const downloadUrl = status.downloadUrl;

            if (status.state === 'completed' || status.status === 'completed') {
                console.log('[GammaNode] Generation completed!', downloadUrl ? `(download URL: ${downloadUrl})` : '');

                // If exportAs is specified but downloadUrl is not yet available, wait for it
                if (data.exportAs && data.exportAs !== 'web' && !downloadUrl) {
                    console.log(`[GammaNode] Waiting for ${data.exportAs.toUpperCase()} export to be ready...`);

                    // Wait up to 60 seconds for export URL (check every 5 seconds)
                    const exportMaxWait = 60 * 1000;
                    const exportPollInterval = 5 * 1000;
                    const exportStartTime = Date.now();

                    while (Date.now() - exportStartTime < exportMaxWait) {
                        await new Promise(resolve => setTimeout(resolve, exportPollInterval));

                        const exportCheckResponse = await fetch(
                            `https://public-api.gamma.app/v0.2/generations/${generationId}`,
                            {
                                headers: {
                                    'X-API-KEY': apiKey,
                                },
                            }
                        );

                        if (exportCheckResponse.ok) {
                            const exportStatus = await exportCheckResponse.json();
                            const exportDownloadUrl = exportStatus.downloadUrl;

                            if (exportDownloadUrl) {
                                console.log('[GammaNode] Export ready:', exportDownloadUrl);
                                return {
                                    success: true,
                                    generationId,
                                    url: url,
                                    downloadUrl: exportDownloadUrl,
                                    data: exportStatus,
                                    __variableUpdates: { lastOutput: exportDownloadUrl },
                                };
                            }
                        }
                    }

                    console.warn('[GammaNode] Export URL not ready after 60s, returning web URL');
                }

                // For PPTX/PDF exports, prioritize download URL
                const outputUrl = downloadUrl || url;

                return {
                    success: true,
                    generationId,
                    url: url,
                    downloadUrl: downloadUrl,
                    data: status,
                    // Update lastOutput variable with download URL for exports, or web URL
                    __variableUpdates: { lastOutput: outputUrl },
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
        let finalDownloadUrl = null;
        let finalState = 'processing';
        let finalData = {};

        if (finalStatusResponse.ok) {
            const finalStatus = await finalStatusResponse.json();
            finalUrl = finalStatus.gammaUrl || finalStatus.url || finalStatus.webUrl;
            finalDownloadUrl = finalStatus.downloadUrl;
            finalState = finalStatus.state || finalStatus.status;
            finalData = finalStatus;
        }

        // Prioritize download URL for exports
        const outputUrl = finalDownloadUrl || finalUrl;

        return {
            success: true, // Return success so workflow continues
            generationId,
            url: finalUrl,
            downloadUrl: finalDownloadUrl,
            state: finalState,
            data: finalData,
            message: 'Generation processing (timeout reached)',
            __variableUpdates: { lastOutput: outputUrl },
        };

    } catch (error) {
        console.error('Gamma execution error:', error);
        throw new Error(`Failed to execute Gamma node: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
