/**
 * LangGraph Integration for Open Agent Builder
 *
 * This module provides LangGraph-powered workflow execution with:
 * - StateGraph-based orchestration
 * - Conditional routing
 * - State persistence
 * - Streaming support
 * - Export/Import capabilities
 * Server-side only - should not be imported in client code
 */

import 'server-only';
import { StateGraph, Annotation, START, END, Command, Send, interrupt, isInterrupted } from "@langchain/langgraph";
import { ConvexCheckpointSaver } from './convex-checkpointer';
import { safeEvaluate } from './safe-expression-evaluator';
import { Workflow, WorkflowState, NodeExecutionResult, WorkflowNode, WorkflowEdge, WorkflowPendingAuth } from './types';
import { executeAgentNode } from './executors/agent';
import { executeMCPNode } from './executors/mcp';
import { executeLogicNode } from './executors/logic';
import { executeDataNode } from './executors/data';
import { executeToolsNode } from './executors/tools';
import { executeHTTPNode } from './executors/http';
import { executeExtractNode } from './executors/extract';
import { executeArcadeNode } from './executors/arcade';
import { createOrUpdateArcadeAuthRecord } from '../arcade/auth-store';
import { DEFAULT_MODELS } from '@/lib/api/models';
import { getLangGraphConfig } from '../langsmith/config';

interface ArcadePendingResponse {
  __arcadePendingAuth: true;
  authUrl?: string | null;
  authId: string;
  toolName: string;
  userId?: string;
  message?: string;
  pendingInput?: any;
}

interface ApprovalPendingResponse {
  __pendingApproval: true;
  approvalId: string;
  message: string;
  status: string;
  createdAt: string;
}

/**
 * LangGraph State Annotation
 * Maps our WorkflowState to LangGraph's state management
 */
export const WorkflowStateAnnotation = Annotation.Root({
  // Core workflow variables
  variables: Annotation<Record<string, any>>({
    reducer: (left, right) => ({ ...left, ...right }),
    default: () => ({ input: '', lastOutput: '' }),
  }),

  // Chat history for conversational workflows
  chatHistory: Annotation<any>({
    reducer: (left, right) => [...(left || []), ...(right || [])],
    default: () => [],
  }),

  // Execution metadata
  currentNodeId: Annotation<string>({
    reducer: (_, right) => right,
    default: () => '',
  }),

  // Node results for tracking
  nodeResults: Annotation<any>({
    reducer: (left, right) => ({ ...left, ...right }),
    default: () => ({}),
  }),

  // Pending authorization state (for Arcade auth, user approval, etc.)
  pendingAuth: Annotation<any>({
    reducer: (_, right) => right,
    default: () => null,
  }),

  // Loop results accumulator (array that accumulates across iterations)
  loopResults: Annotation<any>({
    reducer: (left, right) => [...(left || []), ...(right || [])],
    default: () => [],
  }),
});

/**
 * LangGraph Workflow Executor
 * Converts Open Agent Builder workflows to LangGraph StateGraph
 */
export class LangGraphExecutor {
  private workflow: Workflow;
  private graph: any; // Compiled StateGraph
  private apiKeys?: { anthropic?: string; groq?: string; openai?: string; firecrawl?: string; arcade?: string; gamma?: string };
  private onNodeUpdate?: (nodeId: string, result: NodeExecutionResult) => void;
  private checkpointer: any;
  private parallelNodeIds = new Set<string>();
  private activeThreadId?: string;
  private activeExecutionId?: string;
  private pendingAuth: WorkflowPendingAuth | null = null;
  private lastStreamState: any = null;
  private edgesBySource: Map<string, WorkflowEdge[]> = new Map();

  constructor(
    workflow: Workflow,
    onNodeUpdate?: (nodeId: string, result: NodeExecutionResult) => void,
    apiKeys?: { anthropic?: string; groq?: string; openai?: string; firecrawl?: string; arcade?: string; gamma?: string }
  ) {
    this.workflow = workflow;
    this.onNodeUpdate = onNodeUpdate;
    this.apiKeys = apiKeys;

    // Initialize checkpointer for state persistence
    // - Required for human-in-the-loop (interrupts)
    // - Time-travel debugging
    // Using persistent Convex-based checkpointer to support resume across requests
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (convexUrl) {
      this.checkpointer = new ConvexCheckpointSaver(convexUrl);
    } else {
      console.warn('⚠️ NEXT_PUBLIC_CONVEX_URL not set, falling back to MemorySaver');
      // @ts-ignore - Importing MemorySaver dynamically if needed or just use it if available
      import('@langchain/langgraph').then(m => {
        this.checkpointer = new m.MemorySaver();
      });
    }

    // Build the LangGraph StateGraph
    this.graph = this.buildGraph();
  }

  /**
   * Build LangGraph StateGraph from workflow definition
   */
  private buildGraph() {
    console.log('Building LangGraph from workflow:', {
      workflowId: this.workflow.id,
      workflowName: this.workflow.name,
      nodes: this.workflow.nodes.length,
      edges: this.workflow.edges.length,
      nodeIds: this.workflow.nodes.map(n => n.id),
      nodeTypes: this.workflow.nodes.map(n => (n.data as any)?.nodeType || n.type),
      edgeSources: this.workflow.edges.map(e => e.source),
      edgeTargets: this.workflow.edges.map(e => e.target),
      fullNodes: this.workflow.nodes,
      fullEdges: this.workflow.edges,
    });

    const builder = new StateGraph(WorkflowStateAnnotation);
    this.parallelNodeIds.clear();
    this.edgesBySource = new Map();

    // Create a set of valid node IDs for edge validation
    const validNodeIds = new Set(this.workflow.nodes.map(n => n.id));

    // Build edge map, skipping edges with invalid source/target
    for (const edge of this.workflow.edges) {
      // Validate that both source and target nodes exist
      if (!validNodeIds.has(edge.source)) {
        console.warn(`⚠️ Skipping edge ${edge.id}: source node '${edge.source}' does not exist`);
        continue;
      }
      if (!validNodeIds.has(edge.target)) {
        console.warn(`⚠️ Skipping edge ${edge.id}: target node '${edge.target}' does not exist`);
        continue;
      }

      if (!this.edgesBySource.has(edge.source)) {
        this.edgesBySource.set(edge.source, []);
      }
      this.edgesBySource.get(edge.source)!.push(edge);
    }

    console.log('Edges by source:', Object.fromEntries(this.edgesBySource));

    // Add nodes to the graph
    for (const node of this.workflow.nodes) {
      const nodeType = (node.data as any)?.nodeType || node.type;

      // Skip note nodes entirely - they are visual-only sticky notes
      if (nodeType === 'note') {
        console.log(`Skipping note node ${node.id} (visual only)`);
        continue;
      }

      // Skip end nodes - LangGraph has built-in END
      // But we still want to execute them for UI feedback
      if (nodeType === 'end') {
        // Create a special end node executor that notifies UI before transitioning to END
        const endNodeExecutor = this.createNodeExecutor(node);
        builder.addNode(node.id, endNodeExecutor);
        continue;
      }

      // Handle start nodes - use regular executor but still connect to LangGraph's START
      if (nodeType === 'start') {
        const startNodeExecutor = this.createNodeExecutor(node);
        builder.addNode(node.id, startNodeExecutor);
        continue;
      }

      // Create node executor function
      const nodeExecutor = this.createNodeExecutor(node);
      const outgoingEdges = this.edgesBySource.get(node.id) || [];
      const shouldParallelize = this.shouldUseParallelRouting(nodeType, outgoingEdges);

      if (shouldParallelize) {
        this.parallelNodeIds.add(node.id);
      }

      builder.addNode(
        node.id,
        nodeExecutor,
        shouldParallelize ? { ends: this.getParallelEnds(outgoingEdges) } : undefined
      );
    }

    // Add edges (skip edges connected to note nodes)
    const conditionalNodes = new Set<string>();
    const whileLoopNodes = new Set<string>();

    for (const [sourceId, sourceEdges] of Array.from(this.edgesBySource.entries())) {
      const sourceNode = this.workflow.nodes.find(n => n.id === sourceId);
      const sourceType = (sourceNode?.data as any)?.nodeType || sourceNode?.type;

      // Skip edges from note nodes (notes are visual only)
      if (sourceType === 'note') {
        console.log(`Skipping edges from note node ${sourceId}`);
        continue;
      }

      if (sourceType === 'while') {
        if (!whileLoopNodes.has(sourceId)) {
          const routingFunction = this.createWhileLoopRouter(sourceId);
          const pathMap = this.buildWhilePathMap(sourceId, sourceEdges);

          builder.addConditionalEdges(sourceId as any, routingFunction, pathMap as any);
          whileLoopNodes.add(sourceId);
        }
        continue;
      }

      if (sourceType === 'if-else' || sourceType === 'if / else') {
        if (!conditionalNodes.has(sourceId)) {
          const routingFunction = this.createConditionalRouter(sourceId);
          const pathMap: Record<string, string> = {};

          for (const edge of sourceEdges) {
            const handle = edge.sourceHandle || 'default';
            pathMap[handle] = edge.target;
          }

          builder.addConditionalEdges(sourceId as any, routingFunction, pathMap as any);
          conditionalNodes.add(sourceId);
        }
        continue;
      }

      // Handle user-approval nodes with conditional routing
      if (['user-approval', 'user approval', 'approval'].includes(sourceType?.toLowerCase() || '')) {
        const routingFunction = this.createApprovalRouter(sourceId);
        const pathMap: Record<string, string> = {};

        // Build path map based on edge handles
        for (const edge of sourceEdges) {
          const handle = (edge.sourceHandle || edge.label || '').toLowerCase();

          if (['approved', 'approve', 'yes', 'true', 'confirm'].includes(handle)) {
            pathMap['approved'] = edge.target;
          } else if (['rejected', 'reject', 'no', 'false', 'deny', 'cancel'].includes(handle)) {
            pathMap['rejected'] = edge.target;
          } else {
            // Fallback for default handle - assume approved if not specified, or use as specific handle
            // For safety, let's map unknown handles to 'approved' if they look positive, otherwise generic
            pathMap['default'] = edge.target;
            if (!pathMap['approved']) pathMap['approved'] = edge.target;
          }
        }

        // Ensure we have targets for both branches if possible, or fallback to END checking
        // LangGraph requires all return values from router to be in pathMap if strictly typed, 
        // but here it's flexible. 

        builder.addConditionalEdges(sourceId as any, routingFunction, pathMap as any);
        continue;
      }

      // For regular nodes, add their outgoing edges
      for (const edge of sourceEdges) {
        // Verify target node exists
        const targetNode = this.workflow.nodes.find(n => n.id === edge.target);
        if (!targetNode) {
          console.warn(`⚠️ Skipping edge ${edge.id}: target node '${edge.target}' not found`);
          continue;
        }

        // Skip edges that connect to note nodes (notes are visual only)
        const targetType = (targetNode.data as any)?.nodeType || targetNode.type;

        if (targetType === 'note') {
          console.log(`Skipping edge to note node ${edge.target}`);
          continue;
        }

        // Use the actual target node ID for all edges, including end nodes
        // Since we're adding end nodes as actual nodes, we don't need to redirect to END
        builder.addEdge(sourceId as any, edge.target as any);
      }
    }

    // Connect LangGraph's START to our start node
    console.log('Connecting LangGraph START to workflow start node...');
    const startNode = this.workflow.nodes.find(n => {
      const nodeType = (n.data as any)?.nodeType || n.type;
      return nodeType === 'start';
    });

    if (startNode) {
      console.log(`Connecting LangGraph START to start node: ${startNode.id}`);
      builder.addEdge(START, startNode.id as any);
    }

    // Connect all end nodes to LangGraph's END
    const endNodes = this.workflow.nodes.filter(n => {
      const nodeType = (n.data as any)?.nodeType || n.type;
      return nodeType === 'end';
    });

    for (const endNode of endNodes) {
      console.log(`Connecting end node ${endNode.id} to LangGraph END`);
      builder.addEdge(endNode.id as any, END);
    }

    // Compile the graph WITH checkpointing (required for interrupts/approvals)
    try {
      return builder.compile({ checkpointer: this.checkpointer });
    } catch (error) {
      // Provide descriptive error messages for common issues
      if (error instanceof Error && error.message.includes('is not reachable')) {
        // Extract the unreachable node ID from the error
        const match = error.message.match(/Node `([^`]+)` is not reachable/);
        const unreachableNodeId = match ? match[1] : 'unknown';
        const unreachableNode = this.workflow.nodes.find(n => n.id === unreachableNodeId);
        const nodeName = (unreachableNode?.data as any)?.nodeName || unreachableNode?.type || unreachableNodeId;

        // Find what nodes ARE reachable to help debug
        const allNodeIds = new Set(this.workflow.nodes.map(n => n.id));
        const connectedFromStart = new Set<string>();

        // BFS from start node to find all reachable nodes
        const startNode = this.workflow.nodes.find(n => {
          const nodeType = (n.data as any)?.nodeType || n.type;
          return nodeType === 'start';
        });

        if (startNode) {
          const queue = [startNode.id];
          connectedFromStart.add(startNode.id);

          while (queue.length > 0) {
            const currentId = queue.shift()!;
            const outgoingEdges = this.edgesBySource.get(currentId) || [];

            for (const edge of outgoingEdges) {
              if (!connectedFromStart.has(edge.target)) {
                connectedFromStart.add(edge.target);
                queue.push(edge.target);
              }
            }
          }
        }

        const unreachableNodes = Array.from(allNodeIds).filter(id => !connectedFromStart.has(id));

        throw new Error(
          `Workflow configuration error: Node "${nodeName}" (${unreachableNodeId}) is not connected to the workflow.\n\n` +
          `Unreachable nodes: ${unreachableNodes.map(id => {
            const node = this.workflow.nodes.find(n => n.id === id);
            const name = (node?.data as any)?.nodeName || node?.type || id;
            return `"${name}" (${id})`;
          }).join(', ')}\n\n` +
          `To fix this:\n` +
          `1. Connect the Start node to your first agent/action node\n` +
          `2. Ensure all nodes have incoming connections (except Start)\n` +
          `3. Check that all edges point to valid nodes\n\n` +
          `Tip: Use the canvas to drag connections between node handles`
        );
      }

      // Re-throw other errors
      throw error;
    }
  }

  /**
   * Create node executor function for LangGraph (CLEAN VERSION)
   */
  private createNodeExecutor(node: WorkflowNode) {
    return async (state: typeof WorkflowStateAnnotation.State) => {
      console.log(`Executing node: ${node.id}`);

      // Notify UI
      const result: NodeExecutionResult = {
        nodeId: node.id,
        status: 'running',
        startedAt: new Date().toISOString(),
      };
      this.onNodeUpdate?.(node.id, result);

      try {
        // Execute the node (pure, server-side)
        const output = await this.executeNodePure(node, state);

        // Log full output shape for debugging
        console.log(`Node ${node.id} output shape:`, {
          outputType: typeof output,
          outputKeys: output && typeof output === 'object' && output !== null ? Object.keys(output) : [],
          hasAgentValue: output && typeof output === 'object' && output !== null && '__agentValue' in output,
          hasAgentToolCalls: output && typeof output === 'object' && output !== null && '__agentToolCalls' in output,
        });

        // Check if output is a pending approval (user-approval node)
        if (output && typeof output === 'object' && output !== null && '__pendingApproval' in output) {
          console.log(`Detected pending approval from node ${node.id}`);
          return await this.handlePendingApproval(node, result, output as ApprovalPendingResponse, state);
        }

        // Extract tool calls and chat history if this is an agent node
        let actualOutput = output;
        let toolCalls: any = undefined;
        let chatHistoryUpdates: any[] = [];
        let variableUpdates: Record<string, any> = {};
        let usage: any = undefined;

        if (output && typeof output === 'object' && output !== null && '__agentValue' in output) {
          actualOutput = output.__agentValue;
          toolCalls = (output as any).__agentToolCalls;
          chatHistoryUpdates = (output as any).__chatHistoryUpdates || [];
          variableUpdates = (output as any).__variableUpdates || {};
          usage = (output as any).__usage;

          console.log(`Extracted from agent output:`, {
            actualOutput: typeof actualOutput === 'string' ? actualOutput.substring(0, 100) : actualOutput,
            toolCallsCount: Array.isArray(toolCalls) ? toolCalls.length : 0,
            toolCalls: toolCalls,
            chatHistoryUpdates: chatHistoryUpdates.length,
            variableUpdates: Object.keys(variableUpdates),
            usage: usage
          });

        } else if (output && typeof output === 'object' && output !== null && '__variableUpdates' in output) {
          // Extract variable updates from non-agent nodes (Gamma, Extract, Arcade, etc.)
          variableUpdates = (output as any).__variableUpdates || {};
        }

        // Update result
        result.output = actualOutput;
        result.toolCalls = toolCalls;
        result.usage = usage;
        result.status = 'completed';
        result.completedAt = new Date().toISOString();
        this.onNodeUpdate?.(node.id, result);

        // For while loops, extract the iteration counter from output
        // Merge with any agent-provided variable updates
        // Use node name for variable storage, fallback to node ID
        const nodeKey = (node.data as any)?.nodeName || (node.data as any)?.name || node.id;
        const mergedVariableUpdates: Record<string, any> = {
          lastOutput: actualOutput,
          [nodeKey]: actualOutput,
          [node.id]: actualOutput, // Also store with ID for backward compatibility
          ...variableUpdates, // Include agent's variable updates
        };

        // Check if output wants to append to loop results
        let loopResultsUpdate: any[] | undefined;
        if (actualOutput && typeof actualOutput === 'object' && '__appendToLoopResults' in actualOutput) {
          const newResult = actualOutput.__appendToLoopResults;
          loopResultsUpdate = [newResult]; // Will be appended by reducer
          console.log(`Appending result to loopResults array`);

          // Remove the signal from lastOutput
          const { __appendToLoopResults, ...cleanOutput } = actualOutput;
          mergedVariableUpdates.lastOutput = cleanOutput;
          mergedVariableUpdates[node.id] = cleanOutput;
        }

        // If this is a while loop, save the iteration counter to variables
        const nodeType = (node.data as any)?.nodeType || node.type;

        if (nodeType === 'while' && actualOutput && typeof actualOutput === 'object') {
          const iterationKey = `${node.id}__iterationCount`;

          if (iterationKey in actualOutput) {
            mergedVariableUpdates[iterationKey] = actualOutput[iterationKey];
            console.log(`Saving iteration counter: ${iterationKey} = ${actualOutput[iterationKey]}`);
          }
        }

        // Return LangGraph state update (immutable, use reducer-friendly format)
        return {
          variables: mergedVariableUpdates, // Reducer merges this
          chatHistory: chatHistoryUpdates.length > 0 ? chatHistoryUpdates : [],
          currentNodeId: node.id,
          nodeResults: { [node.id]: result }, // Reducer merges this
          pendingAuth: null,
          ...(loopResultsUpdate ? { loopResults: loopResultsUpdate } : {}),
        };
      } catch (error) {
        // Robust check for LangGraph interrupts (can be an object or an array of records)
        if (this.isInterrupt(error)) {
          throw error;
        }

        result.status = 'failed';
        result.error = error instanceof Error ? error.message : String(error);
        result.completedAt = new Date().toISOString();
        this.onNodeUpdate?.(node.id, result);

        throw error;
      }
    };
  }

  /**
   * Pure node execution (no state mutation)
   */
  private async executeNodePure(
    node: WorkflowNode,
    state: typeof WorkflowStateAnnotation.State
  ): Promise<any> {
    const nodeType = (node.data as any)?.nodeType || node.type;
    const data = node.data as any;

    switch (nodeType) {
      case 'start':
        // Return the input object properly without spreading strings
        const input = state.variables.input;

        // If input is a JSON string, parse it
        let parsedInput = input;
        if (typeof input === 'string') {
          try {
            parsedInput = JSON.parse(input);
          } catch {
            // Not JSON, keep as string
            parsedInput = input;
          }
        }

        return {
          message: 'Workflow started',
          ...(typeof parsedInput === 'object' && parsedInput !== null ? parsedInput : { input: parsedInput })
        };

      case 'agent': {
        // Use the proper executeAgentNode which handles MCP tools
        console.log(`Agent node ${node.id} configuration:`, {
          hasMcpTools: !!data.mcpTools,
          mcpToolsCount: data.mcpTools?.length || 0,
          mcpTools: data.mcpTools,
        });
        const result = await executeAgentNode(node, state as WorkflowState, this.apiKeys);
        return result;
      }

      case 'mcp': {
        return await executeMCPNode(node, state as WorkflowState, this.apiKeys?.firecrawl);
      }

      case 'gamma-ai': {
        const { executeGammaNode } = await import('./executors/gamma');
        return await executeGammaNode(node, state as WorkflowState, this.apiKeys?.gamma);
      }

      case 'transform':
      case 'data-transform': {
        // SECURITY FIX: Use E2B sandbox instead of Function() constructor
        // Function() allows arbitrary code execution and bypasses security
        // Import and use the secure data executor instead
        const { executeDataNode } = await import('./executors/data');
        return await executeDataNode(node, state as WorkflowState);
      }

      case 'http': {
        return await executeHTTPNode(node, state as WorkflowState);
      }

      case 'if-else': {
        // SECURITY FIX: Use safe evaluator (mathjs-based) instead of Function() constructor
        const condition = data.condition || 'true';
        try {
          const result = safeEvaluate(condition, {
            input: state.variables.input,
            state: state,
            lastOutput: state.variables.lastOutput
          });
          return { condition: Boolean(result), branch: result ? 'if' : 'else' };
        } catch (error) {
          console.error(`If-else condition evaluation error:`, error);
          // Default to false branch on error
          return { condition: false, branch: 'else' };
        }
      }

      case 'while': {
        // Execute while loop check using the proper method
        const tempState: WorkflowState = {
          variables: state.variables,
          chatHistory: state.chatHistory,
        };
        return await this.executeWhileNode(node, tempState, state);
      }

      case 'end':
        return { message: 'Workflow completed', finalOutput: state.variables.lastOutput };

      default:
        // For node types not in executeNodePure, fall back to the full executeNode implementation
        console.log(`WARNING: Node type '${nodeType}' not in executeNodePure, using executeNode fallback`);
        const tempState = {
          variables: state.variables,
          chatHistory: state.chatHistory,
        };
        return await this.executeNode(node, tempState);
    }
  }

  /**
   * Create conditional router for if-else nodes
   */
  private createConditionalRouter(nodeId: string) {
    return async (state: typeof WorkflowStateAnnotation.State) => {
      const node = this.workflow.nodes.find(n => n.id === nodeId);
      if (!node) return 'default';

      // Execute the if-else condition
      const tempState: WorkflowState = {
        variables: state.variables,
        chatHistory: state.chatHistory,
      };

      const result = await executeLogicNode(node, tempState);

      // Return the branch handle ('if' or 'else')
      return result.branch || 'else';
    };
  }

  /**
   * Create conditional router for approval nodes
   */
  private createApprovalRouter(nodeId: string) {
    return async (state: typeof WorkflowStateAnnotation.State) => {
      const nodeResult = state.nodeResults?.[nodeId];

      // Check the output from the node execution
      // In handlePendingApproval, we set output to 'Approved' or 'Rejected'
      // We also verify the rejection status

      const output = nodeResult?.output;

      console.log(`Approval router for ${nodeId}:`, { output });

      if (output === 'Rejected' || output === 'Rejected by user') {
        return 'rejected';
      }

      // Default to approved for safety, or if output is 'Approved'
      return 'approved';
    };
  }

  private shouldUseParallelRouting(nodeType: string | undefined, edges: WorkflowEdge[]): boolean {
    if (!edges || edges.length <= 1) {
      return false;
    }

    if (!nodeType) {
      return false;
    }

    const normalized = nodeType.toLowerCase();
    if (['if-else', 'if / else', 'while', 'user-approval', 'user approval'].includes(normalized)) {
      return false;
    }

    if (edges.some(edge => edge.sourceHandle)) {
      return false;
    }

    const uniqueTargets = new Set<string>();
    let hasNonTerminalTarget = false;

    for (const edge of edges) {
      if (!edge.target) continue;
      uniqueTargets.add(edge.target);
      const targetNode = this.workflow.nodes.find(n => n.id === edge.target);
      const targetType = (targetNode?.data as any)?.nodeType || targetNode?.type;
      if (targetType !== 'end') {
        hasNonTerminalTarget = true;
      }
    }

    return uniqueTargets.size > 1 && hasNonTerminalTarget;
  }

  private getParallelEnds(edges: WorkflowEdge[]): string[] {
    const ends = new Set<string>();

    for (const edge of edges) {
      if (!edge.target) continue;
      const targetNode = this.workflow.nodes.find(n => n.id === edge.target);
      const targetType = (targetNode?.data as any)?.nodeType || targetNode?.type;
      if (targetType === 'end') {
        continue;
      }
      ends.add(edge.target);
    }

    return Array.from(ends);
  }

  private buildWhilePathMap(nodeId: string, edges: WorkflowEdge[]) {
    const pathMap: Record<string, string> = {};

    for (const edge of edges) {
      const handle = (edge.sourceHandle || edge.label || '').toLowerCase();

      if (['continue', 'true', 'yes', 'loop', 'next'].includes(handle)) {
        pathMap['continue'] = edge.target;
      } else if (['break', 'false', 'no', 'exit', 'stop', 'end', 'complete'].includes(handle)) {
        pathMap['break'] = edge.target;
      } else if (!pathMap['continue']) {
        pathMap['continue'] = edge.target;
      } else if (!pathMap['break']) {
        pathMap['break'] = edge.target;
      }
    }

    if (!pathMap['continue'] && edges[0]) {
      pathMap['continue'] = edges[0].target;
    }

    if (!pathMap['break']) {
      console.warn(`While loop ${nodeId}: no explicit break edge found, defaulting to END`);
      pathMap['break'] = END as unknown as string;
    }

    return pathMap;
  }

  /**
   * Create while loop router for iteration control
   */
  private createWhileLoopRouter(nodeId: string) {
    return async (state: typeof WorkflowStateAnnotation.State) => {
      const node = this.workflow.nodes.find(n => n.id === nodeId);
      if (!node) {
        console.warn(`While loop router: node ${nodeId} not found, breaking`);
        return 'break';
      }

      const iterationKey = `${nodeId}__iterationCount`;
      const result = state.nodeResults?.[nodeId];
      const loopOutput = (result?.output || state.variables?.[node.id]) as any;

      const maxIterations = this.parseMaxIterations((node.data as any)?.maxIterations);
      const currentIteration = Number(state.variables?.[iterationKey] || 0);

      console.log(`While loop router for ${nodeId}:`, {
        currentIteration,
        maxIterations,
        loopOutputCondition: loopOutput?.condition,
        stoppedReason: loopOutput?.stoppedReason,
      });

      // Check if loop already decided to break
      if (loopOutput?.condition === false || loopOutput?.stoppedReason === 'condition_false') {
        console.log(`While loop ${nodeId}: loop output says break (condition=false)`);
        return 'break';
      }

      // Check for max_iterations reason
      if (loopOutput?.stoppedReason === 'max_iterations') {
        console.log(`While loop ${nodeId}: loop output says break (max_iterations reached)`);
        return 'break';
      }

      if (currentIteration >= maxIterations) {
        console.log(`While loop ${nodeId}: iteration count (${currentIteration}) >= max (${maxIterations}), breaking`);
        return 'break';
      }

      const shouldContinue = this.getWhileCondition(node, state, currentIteration, loopOutput);

      if (shouldContinue) {
        console.log(`While loop ${nodeId}: condition true, continuing`);
        return 'continue';
      }

      console.log(`While loop ${nodeId}: condition false, breaking`);
      return 'break';
    };
  }

  private getWhileCondition(
    node: WorkflowNode,
    state: typeof WorkflowStateAnnotation.State,
    currentIteration: number,
    loopOutput?: any,
  ) {
    if (loopOutput && typeof loopOutput === 'object' && 'condition' in loopOutput) {
      if (loopOutput.condition === true && loopOutput.stoppedReason === 'max_iterations') {
        return false;
      }

      return Boolean(loopOutput.condition);
    }

    const conditionExpr = (node.data as any)?.whileCondition || (node.data as any)?.condition || 'false';

    try {
      return Boolean(
        safeEvaluate(conditionExpr, {
          input: state.variables.input,
          state: state,
          lastOutput: state.variables.lastOutput,
          iteration: currentIteration
        })
      );
    } catch (error) {
      console.error(`ERROR: While loop ${node.id}: condition evaluation error`, error);
      return false;
    }
  }

  private parseMaxIterations(rawValue: any) {
    const ABSOLUTE_MAX = 100; // Hard limit to prevent infinite loops
    const DEFAULT = 10;

    const parsed = Number.parseInt(rawValue ?? DEFAULT.toString(), 10);

    if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed <= 0) {
      return DEFAULT;
    }

    // Enforce absolute maximum
    if (parsed > ABSOLUTE_MAX) {
      console.warn(`While loop max iterations ${parsed} exceeds limit, capping at ${ABSOLUTE_MAX}`);
      return ABSOLUTE_MAX;
    }
    return parsed;
  }

  private async executeWhileNode(
    node: WorkflowNode,
    state: WorkflowState,
    langGraphState: typeof WorkflowStateAnnotation.State
  ) {
    const data: any = node.data || {};
    const ABSOLUTE_MAX = 100; // Hard safety limit
    const conditionExpr = data.whileCondition || data.condition || 'false';
    const maxIterations = Math.min(this.parseMaxIterations(data.maxIterations), ABSOLUTE_MAX);
    const iterationKey = `${node.id}__iterationCount`;
    const previousIteration = Number(langGraphState.variables?.[iterationKey] || 0);
    // Add absolute safety check
    if (previousIteration > ABSOLUTE_MAX) {
      console.error(`While loop ${node.id} exceeded absolute limit of ${ABSOLUTE_MAX}`);
      return {
        condition: false,
        iteration: previousIteration,
        nextIteration: previousIteration,
        maxIterations: ABSOLUTE_MAX,
        stoppedReason: 'absolute_limit_exceeded',
        error: `Loop terminated: exceeded absolute limit of ${ABSOLUTE_MAX} iterations`,
        timestamp: new Date().toISOString(),
      };
    }

    if (previousIteration > maxIterations) {
      return {
        condition: false,
        iteration: previousIteration,
        nextIteration: previousIteration,
        maxIterations,
        stoppedReason: 'max_iterations',
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const evaluationIteration = previousIteration + 1;
      // SECURITY FIX: Use safe evaluator (mathjs-based) instead of Function() constructor
      const shouldContinue = Boolean(
        safeEvaluate(conditionExpr, {
          input: state.variables.input,
          state: langGraphState,
          lastOutput: state.variables.lastOutput,
          iteration: evaluationIteration
        })
      );

      const nextIteration = shouldContinue ? evaluationIteration : previousIteration;

      // Get accumulated loop results
      // NOTE: We return immutable updates - the reducer will merge [iterationKey] into state.variables
      const loopResultsKey = `${node.id}__loopResults`;
      const accumulatedResults = langGraphState.variables[loopResultsKey] || [];

      if (!shouldContinue) {
        console.log(`Loop breaking, passing ${accumulatedResults.length} results to next node`);
      }

      return {
        condition: shouldContinue,
        iteration: shouldContinue ? evaluationIteration : previousIteration,
        previousIteration,
        nextIteration,
        maxIterations,
        stoppedReason: shouldContinue ? 'condition_true' : 'condition_false',
        timestamp: new Date().toISOString(),
        conditionExpression: conditionExpr,
        evaluationIteration,
        [iterationKey]: nextIteration,
        loopResults: accumulatedResults, // Include accumulated results in output
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`ERROR: While loop ${node.id}: condition evaluation failed`, error);
      throw new Error(`While loop ${node.id} condition evaluation failed: ${message}`);
    }
  }

  private async handleArcadePendingAuth(
    node: WorkflowNode,
    result: NodeExecutionResult,
    pending: ArcadePendingResponse,
    state: WorkflowState,
  ) {
    const message = pending.message ?? `Authorization required for ${pending.toolName}`;
    const pendingAuth: WorkflowPendingAuth = {
      authId: pending.authId,
      nodeId: node.id,
      toolName: pending.toolName,
      authUrl: pending.authUrl,
      status: 'pending',
      userId: pending.userId,
      message,
      threadId: this.activeThreadId,
      executionId: this.activeExecutionId,
    };

    result.status = 'pending-authorization';
    result.output = message;
    result.pendingAuth = pendingAuth;
    result.completedAt = new Date().toISOString();

    this.pendingAuth = pendingAuth;
    this.onNodeUpdate?.(node.id, result);

    const executionRef = this.activeExecutionId ?? this.activeThreadId ?? `exec_${Date.now()}`;

    await createOrUpdateArcadeAuthRecord({
      authId: pending.authId,
      executionId: executionRef,
      workflowId: this.workflow.id,
      nodeId: node.id,
      toolName: pending.toolName,
      authUrl: pending.authUrl,
      status: 'pending',
      userId: pending.userId,
      pendingInput: pending.pendingInput,
    });

    // TODO: Save arcade auth state to database when running on server
    // This should be handled by the API route that calls this executor

    const resumeValue = interrupt({
      type: 'arcade-auth',
      workflowId: this.workflow.id,
      nodeId: node.id,
      pendingAuth,
    }) as any;

    if (resumeValue && typeof resumeValue === 'object' && 'status' in resumeValue) {
      const normalized = String(resumeValue.status).toLowerCase();
      if (normalized !== 'completed' && normalized !== 'authorized' && normalized !== 'approved') {
        throw new Error('Arcade authorization not completed yet. Please finish authorization before resuming.');
      }
    }

    this.pendingAuth = null;
    result.status = 'running';
    result.pendingAuth = undefined;
    result.output = undefined;
    delete result.completedAt;
    this.onNodeUpdate?.(node.id, result);

    return await executeArcadeNode(node, state, this.apiKeys?.arcade);
  }

  private async handlePendingApproval(
    node: WorkflowNode,
    result: NodeExecutionResult,
    pending: ApprovalPendingResponse,
    state: typeof WorkflowStateAnnotation.State
  ) {
    const message = pending.message || 'Approval required';
    const pendingAuth: WorkflowPendingAuth = {
      authId: pending.approvalId,
      nodeId: node.id,
      toolName: 'user-approval',
      status: 'pending',
      message,
      threadId: this.activeThreadId,
      executionId: this.activeExecutionId,
    };

    result.status = 'pending-approval';
    result.output = message;
    result.pendingAuth = pendingAuth;
    result.completedAt = new Date().toISOString();

    this.pendingAuth = pendingAuth;
    this.onNodeUpdate?.(node.id, result);

    const executionRef = this.activeExecutionId ?? this.activeThreadId ?? `exec_${Date.now()}`;

    // TODO: Save approval state to database
    // This should be handled by the API route that calls this executor
    // The API route should save to Convex/Redis as needed

    const resumeValue = interrupt({
      type: 'user-approval',
      workflowId: this.workflow.id,
      nodeId: node.id,
      pendingAuth,
    });

    this.pendingAuth = null;

    // Check if approved
    const isApproved = (resumeValue as any)?.approved !== false && (resumeValue as any)?.status !== 'rejected';

    if (!isApproved) {
      // User requested change: invalid/rejected approval should still proceed to next node
      result.status = 'completed';
      result.output = 'Rejected';
      result.completedAt = new Date().toISOString();
      this.onNodeUpdate?.(node.id, result);

      // Return full state update so router sees the rejection
      return {
        variables: {
          ...state.variables,
          lastOutput: 'Rejected',
          [node.id]: 'Rejected'
        },
        nodeResults: { [node.id]: result },
        pendingAuth: null,
        currentNodeId: node.id
      };
    }

    result.status = 'completed';
    result.pendingAuth = undefined;
    const outputValue = (resumeValue as any)?.status === 'approved' ? 'Approved' : 'Action received';
    result.output = outputValue;
    result.completedAt = new Date().toISOString();
    this.onNodeUpdate?.(node.id, result);

    // Return full state update
    return {
      variables: {
        ...state.variables,
        lastOutput: outputValue,
        [node.id]: outputValue
      },
      nodeResults: { [node.id]: result },
      pendingAuth: null,
      currentNodeId: node.id
    };
  }

  /**
   * Execute individual node using existing executors
   */
  private async executeNode(node: WorkflowNode, state: WorkflowState): Promise<any> {
    const nodeType = (node.data as any).nodeType || node.type;

    switch (nodeType) {
      case 'start':
        await new Promise(resolve => setTimeout(resolve, 500));
        // Pass through the initial input variables so they're available to next nodes
        return {
          message: 'Workflow started',
          ...(state.variables.input || {})
        };

      case 'agent':
        return await executeAgentNode(node, state, this.apiKeys);

      case 'extract':
        return await executeExtractNode(node, state, this.apiKeys);

      case 'arcade':
        return await executeArcadeNode(node, state, this.apiKeys?.arcade);

      case 'mcp':
        return await executeMCPNode(node, state, this.apiKeys?.firecrawl);

      case 'if-else':
      case 'if / else':
      case 'while':
      case 'user-approval':
      case 'user approval':
      case 'approval':
        return await executeLogicNode(node, state);

      case 'transform':
      case 'data-transform':
      case 'set-state':
      case 'set state':
        return await executeDataNode(node, state);

      case 'file-search':
      case 'file search':
      case 'guardrails':
      case 'guardrail':
        return await executeToolsNode(node, state);

      case 'http':
      case 'http-request':
        return await executeHTTPNode(node, state);

      case 'note':
        return { message: 'Note node (visual only)' };

      case 'end':
        return { message: 'Workflow completed' };

      default:
        return await executeAgentNode(node, state);
    }
  }

  /**
   * Execute workflow with streaming support
   */
  async executeStream(input: any, config?: { threadId?: string; executionId?: string }) {
    const threadId = config?.threadId || `thread_${Date.now()}`;
    this.activeThreadId = threadId;
    if (config?.executionId) {
      this.activeExecutionId = config.executionId;
    }
    this.pendingAuth = null;

    const initialState = {
      variables: {
        input: typeof input === 'string' ? input : input,
        lastOutput: typeof input === 'string' ? input : '',
      },
      chatHistory: [],
      currentNodeId: '',
      nodeResults: {},
      pendingAuth: null,
    };

    this.lastStreamState = initialState;

    const rawStream = await this.graph.stream(initialState, getLangGraphConfig({
      configurable: { thread_id: threadId },
      streamMode: "values" as const,
      recursionLimit: 100, // Support up to 100 graph steps (default: 25)
    }));

    return this.wrapStreamWithInterruptHandling(rawStream, initialState);
  }

  async resumeFromAuth(threadId: string, resumeValue?: any, options?: { executionId?: string }) {
    this.activeThreadId = threadId;
    if (options?.executionId) {
      this.activeExecutionId = options.executionId;
    }

    const command = new Command({ resume: resumeValue });
    const rawStream = await this.graph.stream(command, getLangGraphConfig({
      configurable: { thread_id: threadId },
      streamMode: "values" as const,
      recursionLimit: 100, // Support up to 100 graph steps (default: 25)
    }));

    const fallback = this.lastStreamState ?? {
      variables: {},
      nodeResults: {},
      pendingAuth: null,
      currentNodeId: '',
    };

    return this.wrapStreamWithInterruptHandling(rawStream, fallback);
  }

  /**
   * Execute workflow (non-streaming)
   */
  async execute(input: any, config?: { threadId?: string }) {
    const threadId = config?.threadId || `thread_${Date.now()}`;

    const initialState = {
      variables: {
        input: typeof input === 'string' ? input : input,
        lastOutput: typeof input === 'string' ? input : '',
      },
      chatHistory: [],
      currentNodeId: '',
      nodeResults: {},
    };

    const result = await this.graph.invoke(initialState, getLangGraphConfig({
      configurable: { thread_id: threadId },
      recursionLimit: 100, // Support up to 100 graph steps (default: 25)
    }));

    return {
      id: `exec_${Date.now()}`,
      workflowId: this.workflow.id,
      status: 'completed' as const,
      nodeResults: result.nodeResults || {},
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
  }

  private isInterrupt(error: any): boolean {
    if (!error) return false;
    if (isInterrupted(error)) return true;
    if (error.__interrupt__) return true;
    if (Array.isArray(error)) {
      return error.some(e => e && ((e.id && e.value) || isInterrupted(e)));
    }
    if (error instanceof Error && (error.message.includes('"pendingAuth"') || error.message.includes('"__interrupt__"'))) {
      return true;
    }
    return false;
  }

  private extractPendingAuth(error: any): any {
    if (!error) return null;
    if (isInterrupted(error)) return (error as any).__interrupt__?.[0]?.value?.pendingAuth;
    if (error.__interrupt__) return error.__interrupt__?.[0]?.value?.pendingAuth;

    let array = null;
    if (Array.isArray(error)) {
      array = error;
    } else if (error instanceof Error && error.message.includes('"pendingAuth"')) {
      try {
        const parsed = JSON.parse(error.message);
        array = Array.isArray(parsed) ? parsed : parsed.__interrupt__;
      } catch (e) { /* ignore */ }
    }

    if (array && Array.isArray(array)) {
      for (const item of array) {
        if (item?.value?.pendingAuth) return item.value.pendingAuth;
        if (item?.__interrupt__?.[0]?.value?.pendingAuth) return item.__interrupt__[0].value.pendingAuth;
      }
    }
    return null;
  }

  private wrapStreamWithInterruptHandling(rawStream: AsyncIterable<any>, fallbackState: any) {
    const self = this;

    return (async function* () {
      let latestState = fallbackState;

      try {
        for await (const chunk of rawStream) {
          if (self.isInterrupt(chunk)) {
            const interruptRecord = Array.isArray(chunk) ? chunk[0] : (chunk as any).__interrupt__?.[0] ?? null;
            const pendingAuth = self.pendingAuth ?? self.extractPendingAuth(chunk) ?? interruptRecord?.value?.pendingAuth ?? null;
            const pauseState = {
              ...(latestState ?? {}),
              pendingAuth,
              currentNodeId: interruptRecord?.value?.nodeId ?? latestState?.currentNodeId ?? '',
              nodeResults: latestState?.nodeResults ?? {},
            };

            self.lastStreamState = pauseState;
            yield pauseState;
            return;
          }

          const enrichedChunk = {
            ...chunk,
            pendingAuth: self.pendingAuth,
          };

          latestState = enrichedChunk;
          self.lastStreamState = enrichedChunk;
          yield enrichedChunk;
        }
      } catch (streamError) {
        // If it's an interrupt thrown by the stream, handle it as a pause
        if (self.isInterrupt(streamError)) {
          const pauseState = {
            ...(latestState ?? {}),
            pendingAuth: self.pendingAuth ?? self.extractPendingAuth(streamError),
            currentNodeId: (Array.isArray(streamError) ? streamError[0] : null)?.value?.nodeId ?? latestState?.currentNodeId ?? '',
            nodeResults: latestState?.nodeResults ?? {},
          };

          self.lastStreamState = pauseState;
          yield pauseState;
          return;
        }

        console.error('ERROR: Stream iteration error in wrapStreamWithInterruptHandling:', streamError);
        // Yield error state instead of throwing
        const errorState = {
          ...(latestState ?? {}),
          error: streamError instanceof Error ? streamError.message : String(streamError),
          status: 'failed'
        };
        self.lastStreamState = errorState;
        yield errorState;
        return;
      }

      self.pendingAuth = null;
      self.lastStreamState = latestState;
    })();
  }

  /**
   * Export workflow as LangGraph JSON
   */
  exportToLangGraph(): any {
    return {
      nodes: this.workflow.nodes.map(node => ({
        id: node.id,
        type: (node.data as any)?.nodeType || node.type,
        data: node.data,
      })),
      edges: this.workflow.edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
      })),
      state: {
        schema: {
          variables: 'object',
          chatHistory: 'array',
          currentNodeId: 'string',
          nodeResults: 'object',
        },
      },
    };
  }

  /**
   * Get LangGraph mermaid diagram
   */
  async getMermaidDiagram(): Promise<string> {
    try {
      const graphDrawable = this.graph.getGraph();
      return graphDrawable.drawMermaid();
    } catch (error) {
      console.error('Failed to generate Mermaid diagram:', error);
      return '';
    }
  }

  /**
   * Get state checkpoints for a thread
   */
  async getCheckpoints(threadId: string) {
    const config = { configurable: { thread_id: threadId } };
    const checkpoints: any[] = [];

    for await (const checkpoint of this.checkpointer.list(config)) {
      checkpoints.push(checkpoint);
    }

    return checkpoints;
  }

  /**
   * Resume from a specific checkpoint
   */
  async resumeFromCheckpoint(threadId: string, checkpointId: string, input: any) {
    const config = getLangGraphConfig({
      configurable: {
        thread_id: threadId,
        checkpoint_id: checkpointId,
      },
      recursionLimit: 100, // Support up to 100 graph steps (default: 25)
    });

    return await this.graph.invoke(input, config);
  }
}

/**
 * Convert workflow to LangGraph format for export
 */
export function workflowToLangGraphJSON(workflow: Workflow) {
  return {
    name: workflow.name,
    description: workflow.description,
    nodes: workflow.nodes.map(node => ({
      id: node.id,
      type: (node.data as any)?.nodeType || node.type,
      position: node.position,
      data: {
        ...node.data,
        // Clean up any UI-specific data
        nodeType: (node.data as any)?.nodeType || node.type,
      },
    })),
    edges: workflow.edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      label: edge.label,
    })),
    metadata: {
      createdAt: workflow.createdAt,
      updatedAt: workflow.updatedAt,
      version: '1.0.0',
      framework: 'langgraph',
    },
  };
}

/**
 * Generate executable TypeScript code from workflow
 */
export function workflowToLangGraphCode(workflow: Workflow): string {
  const nodes = workflow.nodes;
  const edges = workflow.edges;

  // Generate node executors
  const nodeExecutors = nodes
    .filter(n => {
      const nodeType = (n.data as any)?.nodeType || n.type;
      return nodeType !== 'start' && nodeType !== 'end';
    })
    .map(node => {
      const nodeType = (node.data as any)?.nodeType || node.type;
      const data = node.data as any;

      if (nodeType === 'agent') {
        return `// ${data.nodeName || node.id} - AI Agent
const ${node.id} = async (state: typeof StateAnnotation.State) => {
  const response = await anthropic.messages.create({
    model: "${data.model || DEFAULT_MODELS.anthropic}",
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: \`${data.instructions || 'Process the input'}\${state.variables.lastOutput ? '\\n\\nContext: ' + JSON.stringify(state.variables.lastOutput) : ''}\`
    }]
  });

  return {
    ...state.variables,
    lastOutput: response.content[0].type === 'text' ? response.content[0].text : ''
  };
};`;
      }

      if (nodeType === 'transform') {
        return `// ${data.nodeName || node.id} - Transform Data
const ${node.id} = async (state: typeof StateAnnotation.State) => {
  // Transform logic here
  return {
    ...state.variables,
    lastOutput: state.variables.lastOutput // Add your transformation
  };
};`;
      }

      return `// ${node.id} - ${nodeType}
const ${node.id} = async (state: typeof StateAnnotation.State) => state.variables;`;
    })
    .join('\n\n');

  // Generate graph building code
  const startNode = nodes.find(n => ((n.data as any)?.nodeType || n.type) === 'start');
  const inputVars = startNode ? ((startNode.data as any)?.inputVariables || []) : [];

  const graphBuilder = `const graph = new StateGraph(StateAnnotation)
${nodes.filter(n => {
    const t = (n.data as any)?.nodeType || n.type;
    return t !== 'start' && t !== 'end';
  }).map(n => `  .addNode("${n.id}", ${n.id})`).join('\n')}
  .addNode("end", async (state) => state.variables)
${edges.map(e => `  .addEdge("${e.source}", "${e.target}")`).join('\n')}
  .addEdge(START, "${startNode?.id || 'start'}")
  .addEdge("end", END)
  .compile();`;

  return `import { Anthropic } from "@anthropic-ai/sdk";
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Define state structure
const StateAnnotation = Annotation.Root({
  variables: Annotation<{
    ${inputVars.map((v: any) => `${v.name}: string;`).join('\n    ')}
    lastOutput?: any;
  }>(),
});

${nodeExecutors}

// Build the graph
${graphBuilder}

// Execute the workflow
async function main() {
  const result = await graph.invoke({
    variables: {
      ${inputVars.map((v: any) => `${v.name}: "${v.defaultValue || ''}",`).join('\n      ')}
    }
  });

  console.log("Workflow Result:", result);
}

main();`;
}

/**
 * Import LangGraph JSON back to workflow format
 */
export function langGraphJSONToWorkflow(json: any): Workflow {
  return {
    id: json.metadata?.workflowId || `workflow_${Date.now()}`,
    name: json.name,
    description: json.description,
    nodes: json.nodes.map((node: any) => ({
      id: node.id,
      type: node.type,
      position: node.position || { x: 0, y: 0 },
      data: node.data,
    })),
    edges: json.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      label: edge.label,
    })),
    createdAt: json.metadata?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Create a simple example demonstrating LangGraph integration
 */
export async function createExampleLangGraphWorkflow() {
  // Example: Query classifier with conditional routing
  const ExampleStateAnnotation = Annotation.Root({
    query: Annotation<string>(),
    category: Annotation<string>(),
    result: Annotation<string>(),
  });

  // Router node - classifies the query
  const classifierNode = async (state: typeof ExampleStateAnnotation.State) => {
    const query = state.query.toLowerCase();

    let category = 'general';
    if (query.includes('stock') || query.includes('price') || /[A-Z]{2,5}/.test(state.query)) {
      category = 'finance';
    } else if (query.includes('product') || query.includes('buy') || query.includes('price comparison')) {
      category = 'shopping';
    } else if (query.includes('news') || query.includes('article')) {
      category = 'news';
    }

    return { category };
  };

  // Finance node
  const financeNode = async (state: typeof ExampleStateAnnotation.State) => {
    return { result: `Finance data for: ${state.query}` };
  };

  // Shopping node
  const shoppingNode = async (state: typeof ExampleStateAnnotation.State) => {
    return { result: `Shopping results for: ${state.query}` };
  };

  // News node
  const newsNode = async (state: typeof ExampleStateAnnotation.State) => {
    return { result: `News articles for: ${state.query}` };
  };

  // General node
  const generalNode = async (state: typeof ExampleStateAnnotation.State) => {
    return { result: `General info for: ${state.query}` };
  };

  // Conditional router
  const routeByCategory = (state: typeof ExampleStateAnnotation.State) => {
    switch (state.category) {
      case 'finance': return 'finance';
      case 'shopping': return 'shopping';
      case 'news': return 'news';
      default: return 'general';
    }
  };

  // Build the graph
  const graph = new StateGraph(ExampleStateAnnotation)
    .addNode('classifier', classifierNode)
    .addNode('finance', financeNode)
    .addNode('shopping', shoppingNode)
    .addNode('news', newsNode)
    .addNode('general', generalNode)
    .addEdge(START, 'classifier')
    .addConditionalEdges('classifier', routeByCategory, {
      finance: 'finance',
      shopping: 'shopping',
      news: 'news',
      general: 'general',
    })
    .addEdge('finance', END)
    .addEdge('shopping', END)
    .addEdge('news', END)
    .addEdge('general', END)
    .compile();

  return graph;
}
