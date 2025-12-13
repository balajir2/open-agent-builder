import { getAuthenticatedConvexClient, api } from "./lib/convex/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testConvexAuth() {
    console.log("Testing Convex Auth...");
    try {
        const convex = await getAuthenticatedConvexClient();
        console.log("Client obtained.");

        console.log("Calling getAllSystemApiKeys...");
        const keys = await convex.action(api.systemApiKeys.getAllSystemApiKeys);
        console.log("Keys retrieved:", keys ? Object.keys(keys) : "null");

    } catch (error) {
        console.error("Convex Auth Test Failed:", error);
    }
}

testConvexAuth();
