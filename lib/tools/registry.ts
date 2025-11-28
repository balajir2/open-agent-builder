import { ToolDefinition } from "./types";
import { Search, Globe, FileText, Database, Layers } from "lucide-react";

export const toolRegistry: ToolDefinition[] = [
    // --- Web Search Tools ---
    {
        id: "serper-search",
        name: "serper",
        label: "Serper Search",
        description: "Google Search API via Serper.dev. Fast and cheap.",
        category: "web-search",
        icon: Search,
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Serper API Key",
                description: "Get it from serper.dev",
                global: true
            },
            {
                name: "numResults",
                label: "Number of Results",
                type: "number",
                defaultValue: 5,
                required: false
            }
        ]
    },
    {
        id: "serpapi-search",
        name: "serpapi",
        label: "SerpAPI",
        description: "Real-time API to access Google search results.",
        category: "web-search",
        icon: Search,
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your SerpAPI Key",
                description: "Get it from serpapi.com",
                global: true
            },
            {
                name: "engine",
                label: "Engine",
                type: "select",
                defaultValue: "google",
                options: [
                    { label: "Google", value: "google" },
                    { label: "Bing", value: "bing" },
                    { label: "DuckDuckGo", value: "duckduckgo" }
                ]
            }
        ]
    },
    {
        id: "tavily-search",
        name: "tavily",
        label: "Tavily Search",
        description: "Search engine optimized for LLMs and RAG.",
        category: "web-search",
        icon: Search,
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Tavily API Key",
                description: "Get it from tavily.com",
                global: true
            },
            {
                name: "searchDepth",
                label: "Search Depth",
                type: "select",
                defaultValue: "basic",
                options: [
                    { label: "Basic", value: "basic" },
                    { label: "Advanced", value: "advanced" }
                ]
            }
        ]
    },

    // --- Scraping Tools ---
    {
        id: "scraperapi",
        name: "scraperapi",
        label: "ScraperAPI",
        description: "Proxy API for web scraping. Handles CAPTCHAs and IP rotation.",
        category: "scraping",
        icon: Globe,
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your ScraperAPI Key",
                description: "Get it from scraperapi.com",
                global: true
            },
            {
                name: "renderJS",
                label: "Render JavaScript",
                type: "boolean",
                defaultValue: false
            }
        ]
    },
    {
        id: "firecrawl",
        name: "firecrawl",
        label: "Firecrawl",
        description: "Turn any website into LLM-ready markdown.",
        category: "scraping",
        icon: Globe,
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Firecrawl API Key",
                description: "Get it from firecrawl.dev",
                global: true
            },
            {
                name: "mode",
                label: "Mode",
                type: "select",
                defaultValue: "scrape",
                options: [
                    { label: "Scrape (Single Page)", value: "scrape" },
                    { label: "Crawl (Entire Site)", value: "crawl" }
                ]
            }
        ]
    },
    {
        id: "browserless",
        name: "browserless",
        label: "Browserless / Playwright",
        description: "Headless Chrome as a service for scraping, automation, screenshots, and PDF generation.",
        category: "scraping",
        icon: Globe,
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Browserless API Key",
                description: "Get it from browserless.io or use local Playwright",
                global: true
            },
            {
                name: "waitForSelector",
                label: "Wait for Selector",
                type: "string",
                required: false,
                placeholder: "e.g., .content, #main",
                description: "CSS selector to wait for before scraping"
            },
            {
                name: "executeScript",
                label: "Execute JavaScript",
                type: "string",
                required: false,
                placeholder: "e.g., window.scrollTo(0, document.body.scrollHeight)",
                description: "JavaScript to execute on the page"
            },
            {
                name: "screenshot",
                label: "Take Screenshot",
                type: "boolean",
                defaultValue: false,
                description: "Capture a screenshot of the page"
            },
            {
                name: "pdf",
                label: "Generate PDF",
                type: "boolean",
                defaultValue: false,
                description: "Generate a PDF of the page"
            },
            {
                name: "timeout",
                label: "Timeout (ms)",
                type: "number",
                defaultValue: 30000,
                description: "Maximum wait time in milliseconds"
            }
        ]
    },

    // --- Content Extraction ---
    {
        id: "content-extractor",
        name: "content-extractor",
        label: "Content Extractor",
        description: "Extract main content from a webpage URL.",
        category: "extraction",
        icon: FileText,
        fields: [
            {
                name: "includeImages",
                label: "Include Images",
                type: "boolean",
                defaultValue: false
            }
        ]
    }
];

export const getToolDefinition = (toolId: string) => toolRegistry.find(t => t.id === toolId);
export const getToolsByCategory = (category: string) => toolRegistry.filter(t => t.category === category);
