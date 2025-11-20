import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import { Serper } from "@langchain/community/tools/serper";
import { SerpAPI } from "@langchain/community/tools/serpapi";
import { DynamicTool, StructuredTool } from "@langchain/core/tools";
import { APIKeys } from "@/lib/api/config";
import * as cheerio from "cheerio";

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
                    func: async (query: string) => {
                        const docs = await retriever.invoke(query);
                        return docs.map(doc => doc.pageContent).join("\n\n");
                    },
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
                    func: async (url: string) => {
                        const params = new URLSearchParams({
                            api_key: apiKeys.scraperapi!,
                            url: url,
                            render: toolConfig.renderJS ? "true" : "false",
                        });
                        const response = await fetch(`https://api.scraperapi.com/?${params.toString()}`);
                        return await response.text();
                    },
                });

            case "browserless":
                if (!apiKeys.browserless) return null;
                return new DynamicTool({
                    name: "browserless",
                    description: "Scrape a webpage using Browserless (Headless Chrome).",
                    func: async (url: string) => {
                        const response = await fetch(`https://chrome.browserless.io/content?token=${apiKeys.browserless}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ url }),
                        });
                        return await response.text();
                    },
                });

            case "content-extractor":
                return new DynamicTool({
                    name: "content-extractor",
                    description: "Extract the main text content from a webpage HTML.",
                    func: async (html: string) => {
                        const $ = cheerio.load(html);
                        // Remove scripts, styles, and other non-content elements
                        $('script, style, nav, footer, header, aside, iframe, noscript').remove();

                        // Get text
                        let text = $('body').text();

                        // Clean up whitespace
                        text = text.replace(/\s+/g, ' ').trim();

                        return text;
                    },
                });

            default:
                console.warn(`Unknown tool ID: ${id}`);
                return null;
        }
    }
}
