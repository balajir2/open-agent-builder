import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { Serper } from "@langchain/community/tools/serper";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { DynamicTool, StructuredTool } from "@langchain/core/tools";
import { APIKeys } from "@/lib/api/config";
import * as cheerio from "cheerio";
import { wrapToolFunction, normalizeToolResult, formatToolResultForLLM } from "./tool-utils";

interface ToolConfig {
    id: string;
    name: string;
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
                if (!apiKeys.tavily) return null;
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
                if (!apiKeys.serper) return null;
                return new Serper(apiKeys.serper);

            case "serpapi-search":
                if (!apiKeys.serpapi) return null;
                return new SerpAPI(apiKeys.serpapi);

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
                    description: "Scrape a webpage using Browserless (Headless Chrome).",
                    func: wrapToolFunction(async (url: string) => {
                        const response = await fetch(`https://chrome.browserless.io/content?token=${apiKeys.browserless}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ url }),
                        });
                        return await response.text();
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
