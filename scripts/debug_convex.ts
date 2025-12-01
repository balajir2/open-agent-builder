
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
    console.error("NEXT_PUBLIC_CONVEX_URL is not defined");
    process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

const payload = {
    "id": "workflow_1763970578906",
    "name": "Basic Sales Team Brief Flow (w/ finnhub)",
    "nodes": [
        {
            "className": "completed-node",
            "data": {
                "executionStatus": "completed",
                "isRunning": false,
                "label": "Node",
                "nodeName": "Start",
                "nodeType": "start",
                "inputVariables": [
                    {
                        "name": "input_as_text",
                        "type": "string",
                        "required": true,
                        "defaultValue": "aapl",
                        "description": ""
                    }
                ]
            },
            "dragging": false,
            "id": "node_0",
            "measured": {
                "height": 54,
                "width": 140
            },
            "position": {
                "x": 100,
                "y": 400
            },
            "selected": false,
            "type": "start"
        },
        {
            "className": "completed-node",
            "data": {
                "_executionUpdate": 1763990207194,
                "executionStatus": "completed",
                "includeChatHistory": true,
                "instructions": "Use the finnhub tool to get the stock price of {{input}} and write me a short summary of the same.",
                "isRunning": false,
                "label": "Node",
                "mcpServerIds": [
                    "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6"
                ],
                "model": "anthropic/claude-sonnet-4-5-20250929",
                "name": "Agent",
                "nodeName": "Agent",
                "nodeType": "agent",
                "outputFormat": "Text",
                "showSearchSources": false
            },
            "dragging": false,
            "id": "node_2",
            "measured": {
                "height": 54,
                "width": 140
            },
            "position": {
                "x": 450,
                "y": 250
            },
            "selected": false,
            "type": "agent"
        },
        {
            "className": "",
            "data": {
                "includeChatHistory": true,
                "instructions": "Use the finnhub tool to get the news about {{input}} in the last 5 days.Then provide a summary of the same in a neat format.",
                "isRunning": false,
                "label": "Node",
                "mcpServerIds": [
                    "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6"
                ],
                "mcpTools": [
                    {
                        "authType": "none",
                        "id": "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6",
                        "label": "finnhub",
                        "name": "finnhub",
                        "url": "https://integration.bounteous.tools/webhook/finnhub-mcp"
                    }
                ],
                "model": "anthropic/claude-sonnet-4-5-20250929",
                "name": "Agent",
                "nodeName": "Agent",
                "nodeType": "agent",
                "outputFormat": "Text",
                "showSearchSources": false
            },
            "dragging": false,
            "id": "node_6",
            "measured": {
                "height": 54,
                "width": 140
            },
            "position": {
                "x": 450,
                "y": 400
            },
            "selected": false,
            "type": "agent"
        },
        {
            "className": "",
            "data": {
                "includeChatHistory": true,
                "instructions": "Use the finnhub tool to get the Company profile of  {{input}}. You can use the Standard Stock ticker symbol to get this. Then provide a summary of the same in a neat format.",
                "isRunning": false,
                "label": "Node",
                "mcpServerIds": [
                    "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6"
                ],
                "mcpTools": [
                    {
                        "authType": "none",
                        "id": "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6",
                        "label": "finnhub",
                        "name": "finnhub",
                        "url": "https://integration.bounteous.tools/webhook/finnhub-mcp"
                    }
                ],
                "model": "anthropic/claude-sonnet-4-5-20250929",
                "name": "Agent",
                "nodeName": "Agent",
                "nodeType": "agent",
                "outputFormat": "Text",
                "showSearchSources": false
            },
            "dragging": false,
            "id": "node_7",
            "measured": {
                "height": 54,
                "width": 140
            },
            "position": {
                "x": 450,
                "y": 550
            },
            "selected": false,
            "type": "agent"
        },
        {
            "className": "",
            "data": {
                "includeChatHistory": true,
                "instructions": "Use the information provided below about {{input}} to give a summary for a tech-sales team about the company.\n\n {{node_2}}\n\n-------------\n\n {{node_6}}\n\n---------\n\n{{node_7}}",
                "isRunning": false,
                "label": "Node",
                "mcpServerIds": [
                    "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6"
                ],
                "mcpTools": [
                    {
                        "authType": "none",
                        "id": "jn7ddwmz0qhf0vvkb9nmtqb2ws7w1jb6",
                        "label": "finnhub",
                        "name": "finnhub",
                        "url": "https://integration.bounteous.tools/webhook/finnhub-mcp"
                    }
                ],
                "model": "anthropic/claude-sonnet-4-5-20250929",
                "name": "Agent",
                "nodeName": "Agent",
                "nodeType": "agent",
                "outputFormat": "Text",
                "showSearchSources": false
            },
            "id": "node_9",
            "measured": {
                "height": 54,
                "width": 140
            },
            "position": {
                "x": 800,
                "y": 400
            },
            "selected": false,
            "type": "agent"
        }
    ],
    "edges": [
        {
            "animated": false,
            "className": "",
            "id": "xy-edge__node_0output-node_2input",
            "interactionWidth": 20,
            "selected": false,
            "source": "node_0",
            "sourceHandle": "output",
            "style": {
                "cursor": "pointer",
                "stroke": "#d1d5db",
                "strokeWidth": 1
            },
            "target": "node_2",
            "targetHandle": "input",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "className": "",
            "id": "xy-edge__node_0output-node_6input",
            "interactionWidth": 20,
            "source": "node_0",
            "sourceHandle": "output",
            "style": {
                "cursor": "pointer",
                "stroke": "#d1d5db",
                "strokeWidth": 1
            },
            "target": "node_6",
            "targetHandle": "input",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "className": "",
            "id": "xy-edge__node_0output-node_7input",
            "interactionWidth": 20,
            "source": "node_0",
            "sourceHandle": "output",
            "style": {
                "cursor": "pointer",
                "stroke": "#d1d5db",
                "strokeWidth": 1
            },
            "target": "node_7",
            "targetHandle": "input",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "className": "",
            "id": "xy-edge__node_7output-node_9input",
            "interactionWidth": 20,
            "source": "node_7",
            "sourceHandle": "output",
            "style": {
                "cursor": "pointer",
                "stroke": "#d1d5db",
                "strokeWidth": 1
            },
            "target": "node_9",
            "targetHandle": "input",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "className": "",
            "id": "xy-edge__node_6output-node_9input",
            "interactionWidth": 20,
            "source": "node_6",
            "sourceHandle": "output",
            "style": {
                "cursor": "pointer",
                "stroke": "#d1d5db",
                "strokeWidth": 1
            },
            "target": "node_9",
            "targetHandle": "input",
            "type": "smoothstep"
        },
        {
            "animated": false,
            "className": "",
            "id": "xy-edge__node_2output-node_9input",
            "interactionWidth": 20,
            "source": "node_2",
            "sourceHandle": "output",
            "style": {
                "cursor": "pointer",
                "stroke": "#d1d5db",
                "strokeWidth": 1
            },
            "target": "node_9",
            "targetHandle": "input",
            "type": "smoothstep"
        }
    ]
};

async function main() {
    try {
        console.log("Saving workflow...");
        const result = await client.mutation(api.workflows.saveWorkflow, {
            customId: payload.id,
            name: payload.name,
            nodes: payload.nodes,
            edges: payload.edges,
            // Optional fields that might be missing in payload but are optional in schema
            description: undefined,
            category: undefined,
            tags: undefined,
            difficulty: undefined,
            estimatedTime: undefined,
            version: undefined,
            isTemplate: undefined,
        });
        console.log("Workflow saved successfully:", result);
    } catch (error) {
        console.error("Error saving workflow:", error);
        if (typeof error === 'object' && error !== null) {
            console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        }
    }
}

main();
