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

            default:
                console.warn(`Unknown tool ID: ${id}`);
                return null;
        }
    }
}
