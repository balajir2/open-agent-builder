
import { LangGraphExecutor } from "./lib/workflow/langgraph";
import { Workflow } from "./lib/workflow/types";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const mockWorkflow: Workflow = {
    id: "debug-workflow",
    name: "Debug Workflow",
    description: "Simple debug workflow",
    nodes: [
        {
            id: "start-1",
            type: "start",
            position: { x: 0, y: 0 },
            data: { label: "Start" }
        },
        {
            id: "end-1",
            type: "end",
            position: { x: 200, y: 0 },
            data: { label: "End" }
        }
    ],
    edges: [
        {
            id: "edge-1",
            source: "start-1",
            target: "end-1"
        }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "debug-user",
    isPublished: false
};

async function testWorkflowExecution() {
    console.log("Testing Workflow Execution...");
    try {
        const executor = new LangGraphExecutor(mockWorkflow, undefined, {});
        console.log("Executor created.");

        const result = await executor.execute("test input");
        console.log("Execution Result:", JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("Workflow Execution Failed:", error);
    }
}

testWorkflowExecution();
