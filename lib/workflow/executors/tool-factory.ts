import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { Serper } from "@langchain/community/tools/serper";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { DynamicTool, StructuredTool } from "@langchain/core/tools";
import { APIKeys } from "@/lib/api/config";
import * as cheerio from "cheerio";
import { wrapToolFunction, normalizeToolResult, formatToolResultForLLM } from "./tool-utils";

interface ToolConfig {
    id?: string;
    toolId?: string;
    name?: string;
    [key: string]: any;
}

export class ToolFactory {
    static async createTool(toolConfig: ToolConfig, apiKeys: APIKeys): Promise<StructuredTool | null> {
        // Handle both 'id' and 'toolId' properties (UI sends 'toolId', but we expect 'id')
        const id = toolConfig.id || (toolConfig as any).toolId;

        if (!id) {
            console.error('[ToolFactory] No id or toolId found in toolConfig:', toolConfig);
            return null;
        }

        switch (id) {
            case "tavily-search":
                if (!apiKeys.tavily) {
                    return null;
                }
                // Tavily is a retriever, wrap it as a tool
                const retriever = new TavilySearchAPIRetriever({
                    apiKey: apiKeys.tavily,
                    k: toolConfig.maxResults || 5,
                });
                return new DynamicTool({
                    name: "tavily_search",
                    description: "Search the web using Tavily API. Input should be a search query string.",
                    func: wrapToolFunction(async (query: string) => {
                        const docs = await retriever.invoke(query);
                        return docs.map(doc => doc.pageContent).join("\n\n");
                    }, { name: "tavily_search" }),
                });

            case "serper-search":
                if (!apiKeys.serper) {
                    return null;
                }
                console.log('[ToolFactory] Creating serper_search tool');
                // Wrap LangChain's Serper tool for consistent error handling
                const serperTool = new Serper(apiKeys.serper);
                return new DynamicTool({
                    name: "serper_search",
                    description: "Search the web using Serper (Google Search API). Input should be a search query string.",
                    func: wrapToolFunction(async (input: string) => {
                        return await serperTool.call(input);
                    }, { name: "serper_search" }),
                });

            case "serpapi-search":
                if (!apiKeys.serpapi) {
                    console.warn('[ToolFactory] Missing SerpAPI key');
                    return null;
                }
                // Wrap LangChain's SerpAPI tool for consistent error handling
                const serpApiTool = new SerpAPI(apiKeys.serpapi);
                return new DynamicTool({
                    name: serpApiTool.name,
                    description: serpApiTool.description,
                    func: wrapToolFunction(async (input: string) => {
                        return await serpApiTool.call(input);
                    }, { name: "serpapi_search" }),
                });

            case "scraperapi":
                if (!apiKeys.scraperapi) return null;
                return new DynamicTool({
                    name: "scraperapi",
                    description: "Scrape a webpage using ScraperAPI to handle CAPTCHAs and IP rotation.",
                    func: wrapToolFunction(async (url: string) => {
                        const params = new URLSearchParams({
                            api_key: apiKeys.scraperapi!,
                            url: url,
                            render: toolConfig.renderJS ? "true" : "false",
                        });
                        const response = await fetch(`https://api.scraperapi.com/?${params.toString()}`);
                        return await response.text();
                    }, { name: "scraperapi" }),
                });

            case "browserless":
                if (!apiKeys.browserless) return null;
                return new DynamicTool({
                    name: "browserless",
                    description: "Advanced web scraping using Browserless (Headless Chrome/Playwright). Supports JavaScript execution, screenshots, PDF generation, and custom selectors. Input should be a valid URL.",
                    func: wrapToolFunction(async (url: string) => {
                        const {
                            waitForSelector,
                            executeScript,
                            screenshot,
                            pdf,
                            timeout = 30000
                        } = toolConfig;

                        // Build the request payload for Browserless
                        const payload: any = {
                            url,
                            gotoOptions: {
                                waitUntil: 'networkidle2',
                                timeout,
                            },
                        };

                        // Add wait for selector if specified
                        if (waitForSelector) {
                            payload.waitForSelector = {
                                selector: waitForSelector,
                                timeout,
                            };
                        }

                        // Add JavaScript execution if specified
                        if (executeScript) {
                            payload.waitForFunction = {
                                fn: executeScript,
                                timeout,
                            };
                        }

                        const results: any = {
                            url,
                            timestamp: new Date().toISOString(),
                        };

                        // Handle screenshot request
                        if (screenshot) {
                            const screenshotResponse = await fetch(
                                `https://chrome.browserless.io/screenshot?token=${apiKeys.browserless}`,
                                {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        ...payload,
                                        options: {
                                            fullPage: true,
                                            type: 'png',
                                        },
                                    }),
                                }
                            );

                            if (screenshotResponse.ok) {
                                const buffer = await screenshotResponse.arrayBuffer();
                                const base64 = Buffer.from(buffer).toString('base64');
                                results.screenshot = `data:image/png;base64,${base64}`;
                                results.screenshotSize = buffer.byteLength;
                            } else {
                                results.screenshotError = `Failed to capture screenshot: ${screenshotResponse.status}`;
                            }
                        }

                        // Handle PDF request
                        if (pdf) {
                            const pdfResponse = await fetch(
                                `https://chrome.browserless.io/pdf?token=${apiKeys.browserless}`,
                                {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        ...payload,
                                        options: {
                                            printBackground: true,
                                            format: 'A4',
                                        },
                                    }),
                                }
                            );

                            if (pdfResponse.ok) {
                                const buffer = await pdfResponse.arrayBuffer();
                                const base64 = Buffer.from(buffer).toString('base64');
                                results.pdf = `data:application/pdf;base64,${base64}`;
                                results.pdfSize = buffer.byteLength;
                            } else {
                                results.pdfError = `Failed to generate PDF: ${pdfResponse.status}`;
                            }
                        }

                        // Always fetch the content
                        const contentResponse = await fetch(
                            `https://chrome.browserless.io/content?token=${apiKeys.browserless}`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload),
                            }
                        );

                        if (contentResponse.ok) {
                            results.content = await contentResponse.text();
                        } else {
                            results.contentError = `Failed to fetch content: ${contentResponse.status}`;
                        }

                        // Return structured results
                        return results;
                    }, { name: "browserless" }),
                });

            case "content-extractor":
                return new DynamicTool({
                    name: "content-extractor",
                    description: "Extract the main text content from a webpage HTML.",
                    func: wrapToolFunction(async (html: string) => {
                        const $ = cheerio.load(html);
                        // Remove scripts, styles, and other non-content elements
                        $('script, style, nav, footer, header, aside, iframe, noscript').remove();

                        // Get text
                        let text = $('body').text();

                        // Safety check: ensure text is a string
                        if (!text || typeof text !== 'string') {
                            console.warn('[content-extractor] Failed to extract text from body, returning empty string');
                            return '';
                        }

                        // Clean up whitespace
                        text = text.replace(/\s+/g, ' ').trim();

                        return text;
                    }, { name: "content-extractor" }),
                });

            case "firecrawl":
                if (!apiKeys.firecrawl) {
                    console.warn('[ToolFactory] Missing Firecrawl API key');
                    return null;
                }

                return new DynamicTool({
                    name: "firecrawl_scrape",
                    description: "Scrape and extract content from any website URL using Firecrawl. Returns clean, LLM-ready markdown content including main text, links, and images. Input should be a valid URL (e.g., 'https://example.com').",
                    func: wrapToolFunction(async (url: string) => {
                        const mode = toolConfig.mode || 'scrape';

                        if (mode === 'scrape') {
                            // Single page scrape using Firecrawl v1 API
                            const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${apiKeys.firecrawl}`,
                                },
                                body: JSON.stringify({
                                    url: url,
                                    formats: ['markdown', 'html'],
                                }),
                            });

                            if (!response.ok) {
                                const error = await response.text();
                                throw new Error(`Firecrawl API error: ${response.status} - ${error}`);
                            }

                            const result = await response.json();

                            if (!result.success) {
                                throw new Error(`Firecrawl scrape failed: ${result.error || 'Unknown error'}`);
                            }

                            // Return markdown content (best for LLMs)
                            return {
                                url: url,
                                markdown: result.data?.markdown || result.data?.content || '',
                                title: result.data?.metadata?.title || 'Unknown',
                                description: result.data?.metadata?.description || '',
                            };
                        } else {
                            // Crawl entire site using Firecrawl v1 API
                            const response = await fetch('https://api.firecrawl.dev/v1/crawl', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${apiKeys.firecrawl}`,
                                },
                                body: JSON.stringify({
                                    url: url,
                                    limit: toolConfig.maxPages || 10,
                                    scrapeOptions: {
                                        formats: ['markdown'],
                                    },
                                }),
                            });

                            if (!response.ok) {
                                const error = await response.text();
                                throw new Error(`Firecrawl API error: ${response.status} - ${error}`);
                            }

                            const result = await response.json();

                            if (!result.success) {
                                throw new Error(`Firecrawl crawl failed: ${result.error || 'Unknown error'}`);
                            }

                            // Return array of pages
                            return result.data?.map((page: any) => ({
                                url: page.url,
                                markdown: page.markdown || page.content,
                                title: page.metadata?.title || 'Unknown',
                            })) || [];
                        }
                    }, { name: "firecrawl_scrape" }),
                });

            // case "gamma-api":
            //     console.log('🚨🚨🚨 GAMMA AI TOOL CREATION STARTED 🚨🚨🚨');
            //     console.error('🚨🚨🚨 GAMMA AI TOOL CREATION STARTED (ERROR LOG) 🚨🚨🚨');
            //     console.log('[ToolFactory] Creating gamma-api tool');
            //     console.log('[ToolFactory] Gamma API key present:', !!apiKeys.gamma);
            //     console.log('[ToolFactory] Tool config:', JSON.stringify(toolConfig, null, 2));

            //     if (!apiKeys.gamma) {
            //         console.error('[ToolFactory] Missing Gamma API key - tool will not be created');
            //         return null;
            //     }

            //     return new DynamicTool({
            //         name: "gamma_create_presentation",
            //         description: "Create a presentation or document using Gamma AI. Input should be a JSON string with 'prompt' field describing what to create. Example: {\"prompt\": \"Create a presentation about AI trends\"}. The tool will create the generation and poll for completion (max 5 minutes). If timeout occurs, it continues in background and returns the generation ID for later retrieval.",
            //         func: wrapToolFunction(async (input: string) => {
            //             console.log('[gamma-api] ========== TOOL EXECUTION STARTED ==========');
            //             console.log('[gamma-api] Input received:', input);
            //             console.log('[gamma-api] Tool config:', JSON.stringify(toolConfig, null, 2));

            //             // Check if there's a configured prompt in toolConfig
            //             const configuredPrompt = toolConfig.config?.prompt || toolConfig.prompt;
            //             console.log('[gamma-api] Configured prompt from toolConfig:', configuredPrompt);

            //             // Parse input
            //             let prompt: string;

            //             // Priority: 1) Configured prompt, 2) Input from agent
            //             if (configuredPrompt) {
            //                 prompt = configuredPrompt;
            //                 console.log('[gamma-api] Using configured prompt');
            //             } else {
            //                 try {
            //                     const parsed = JSON.parse(input);
            //                     prompt = parsed.prompt || input;
            //                     console.log('[gamma-api] Parsed JSON input, extracted prompt');
            //                 } catch {
            //                     // If not JSON, treat entire input as prompt
            //                     prompt = input;
            //                     console.log('[gamma-api] Using raw input as prompt');
            //                 }
            //             }

            //             console.log('[gamma-api] Final prompt (first 200 chars):', prompt.substring(0, 200));
            //             console.log('[gamma-api] Prompt length:', prompt.length);

            //             // Step 1: Create generation
            //             console.log('[gamma-api] Step 1: Creating generation...');

            //             // Step 1: Create generation with hardcoded headers
            //             const createResponse = await fetch(
            //                 'https://public-api.gamma.app/v0.2/generations',
            //                 {
            //                     method: 'POST',
            //                     headers: {
            //                         'Authorization': `Bearer ${apiKeys.gamma}`,
            //                         'Content-Type': 'application/json',
            //                     },
            //                     body: JSON.stringify({ text: prompt }),
            //                 }
            //             );

            //             console.log('[gamma-api] Create response status:', createResponse.status);

            //             if (!createResponse.ok) {
            //                 const error = await createResponse.text();
            //                 console.error('[gamma-api] Create generation failed:', error);
            //                 throw new Error(`Gamma API error: ${createResponse.status} - ${error}`);
            //             }

            //             const createResult = await createResponse.json();
            //             console.log('[gamma-api] Create result:', JSON.stringify(createResult, null, 2));

            //             const generationId = createResult.id;

            //             if (!generationId) {
            //                 console.error('[gamma-api] No generation ID in response');
            //                 throw new Error('No generation ID returned from Gamma API');
            //             }

            //             console.log('[gamma-api] ✓ Generation created successfully. ID:', generationId);

            //             // Step 2: Poll for completion (max 5 minutes)
            //             console.log('[gamma-api] Step 2: Polling for completion (max 5 minutes)...');
            //             const maxWaitTime = 5 * 60 * 1000; // 5 minutes
            //             const pollInterval = 2000; // 2 seconds
            //             const startTime = Date.now();
            //             let pollCount = 0;

            //             while (Date.now() - startTime < maxWaitTime) {
            //                 // Wait before polling
            //                 await new Promise(resolve => setTimeout(resolve, pollInterval));
            //                 pollCount++;

            //                 // Step 3: Check generation status
            //                 console.log(`[gamma-api] Poll #${pollCount}: Checking status...`);
            //                 const statusResponse = await fetch(
            //                     `https://public-api.gamma.app/v0.2/generations/${generationId}`,
            //                     {
            //                         headers: {
            //                             'Authorization': `Bearer ${apiKeys.gamma}`,
            //                         },
            //                     }
            //                 );

            //                 console.log(`[gamma-api] Poll #${pollCount}: Status response code:`, statusResponse.status);

            //                 if (!statusResponse.ok) {
            //                     const error = await statusResponse.text();
            //                     console.warn(`[gamma-api] Poll #${pollCount}: Status check failed:`, error);
            //                     continue; // Continue polling despite error
            //                 }

            //                 const status = await statusResponse.json();
            //                 console.log(`[gamma-api] Poll #${pollCount}: Status data:`, JSON.stringify(status, null, 2));
            //                 console.log(`[gamma-api] Poll #${pollCount}: Current state:`, status.state || status.status);

            //                 // Check if completed
            //                 if (status.state === 'completed' || status.status === 'completed') {
            //                     console.log('[gamma-api] ✓✓✓ Generation COMPLETED successfully! ✓✓✓');
            //                     console.log('[gamma-api] URL:', status.url || status.webUrl);
            //                     const result = {
            //                         success: true,
            //                         generationId,
            //                         state: 'completed',
            //                         url: status.url || status.webUrl,
            //                         data: status,
            //                     };
            //                     console.log('[gamma-api] Returning result:', JSON.stringify(result, null, 2));
            //                     return result;
            //                 }

            //                 // Check if failed
            //                 if (status.state === 'failed' || status.status === 'failed') {
            //                     console.error('[gamma-api] ✗✗✗ Generation FAILED ✗✗✗');
            //                     console.error('[gamma-api] Error:', status.error);
            //                     throw new Error(`Generation failed: ${status.error || 'Unknown error'}`);
            //                 }

            //                 // Continue polling if still processing
            //                 const elapsed = Math.round((Date.now() - startTime) / 1000);
            //                 console.log(`[gamma-api] Still processing... (${elapsed}s elapsed)`);
            //             }

            //             // Timeout reached - continue in background
            //             console.log('[gamma-api] ⏱ Timeout reached (5 minutes), continuing in background');
            //             const timeoutResult = {
            //                 success: false,
            //                 generationId,
            //                 state: 'processing',
            //                 message: 'Generation is still processing in background. Use the generation ID to check status later.',
            //                 checkUrl: `https://public-api.gamma.app/v0.2/generations/${generationId}`,
            //             };
            //             console.log('[gamma-api] Returning timeout result:', JSON.stringify(timeoutResult, null, 2));
            //             console.log('[gamma-api] ========== TOOL EXECUTION ENDED (TIMEOUT) ==========');
            //             return timeoutResult;
            //         }, { name: "gamma_create_presentation" }),
            //     });

            default:
                console.warn(`Unknown tool ID: ${id}`);
                return null;
        }
    }
}
