import { useState, useEffect, useCallback, useRef } from 'react';
import { Workflow, WorkflowNode, WorkflowEdge, MCPServer } from '@/lib/workflow/types';
import {
  saveWorkflow as saveWorkflowToStorage,
  getWorkflows,
  getWorkflow,
  deleteWorkflow as deleteWorkflowFromStorage,
  setCurrentWorkflow,
  getCurrentWorkflowId,
  saveMCPServer,
  getMCPServers,
} from '@/lib/workflow/storage';
import { cleanupInvalidEdges } from '@/lib/workflow/edge-cleanup';
import { DEFAULT_MODELS } from '@/lib/api/models';

// Prevents circular reference errors during JSON serialization
// by removing problematic properties from React components.
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (key === 'Provider' || key === '$$typeof' || key === '_owner' || key === '_store') {
      return undefined;
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export function useWorkflow(workflowId?: string) {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [convexId, setConvexId] = useState<string | null>(null); // Track Convex ID
  const saveToConvexTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load workflow from Redis via API
  useEffect(() => {
    const loadWorkflow = async () => {
      setLoading(true);

      if (workflowId) {
        // Fetch workflow from API (Redis)
        try {
          const response = await fetch(`/api/workflows/${workflowId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch workflow with status: ${response.status}`);
          }
          const fullWorkflow = await response.json();
          let workflowData = fullWorkflow.workflow;

          if (workflowData) {
            // Clean up any invalid edges before setting the workflow
            const cleaned = cleanupInvalidEdges(workflowData.nodes, workflowData.edges);
            if (cleaned.removedCount > 0) {
              console.log(`🧹 Cleaned ${cleaned.removedCount} invalid edges from loaded workflow`);
              workflowData = {
                ...workflowData,
                nodes: cleaned.nodes,
                edges: cleaned.edges,
              };
            }

            setWorkflow(workflowData);
            setConvexId(workflowData._convexId || workflowData._id || null);
          } else {
            console.error('Workflow not found, creating a new one.');
            createNewWorkflow();
          }
        } catch (error) {
          console.error('Failed to load workflow from Convex:', error);
          createNewWorkflow();
        }
      } else {
        createNewWorkflow();
      }

      setLoading(false);
    };

    loadWorkflow();
  }, [workflowId]);

  // Load all workflows from API
  const loadWorkflows = useCallback(async () => {
    try {
      const response = await fetch('/api/workflows');
      const data = await response.json();
      setWorkflows(data.workflows || []);
    } catch (error) {
      console.error('Failed to load workflows from API:', error);
      setWorkflows([]);
    }
  }, []);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  // Create new workflow
  const createNewWorkflow = useCallback(() => {
    const newWorkflow: Workflow = {
      id: `workflow_${Date.now()}`,
      name: 'New Workflow',
      nodes: [
        {
          id: 'node_0',
          type: 'start',
          position: { x: 250, y: 100 },
          data: { label: 'Start' },
        },
        {
          id: 'node_1',
          type: 'agent',
          position: { x: 250, y: 250 },
          data: {
            label: 'Agent',
            name: 'My agent',
            instructions: 'You are a helpful assistant.',
            model: DEFAULT_MODELS.openai,
            includeChatHistory: true,
            tools: [],
            outputFormat: 'Text',
          },
        },
      ],
      edges: [
        {
          id: 'edge_0_1',
          source: 'node_0',
          target: 'node_1',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setWorkflow(newWorkflow);
    // No longer save to localStorage
    // Workflow will be saved via API when user makes changes

    return newWorkflow;
  }, []);

  // Save workflow with debounce to prevent multiple rapid saves
  // Use useCallback with minimal deps to prevent infinite loops
  const saveWorkflow = useCallback(async (updates?: Partial<Workflow>) => {
    // If no workflow exists yet, create a new one from updates
    if (!workflow) {
      if (!updates || !updates.nodes || !updates.edges) {
        console.warn('⚠️ Cannot save workflow: no workflow state and incomplete updates');
        return;
      }

      // Create a complete workflow from updates
      const newWorkflow: Workflow = {
        id: updates.id || `workflow_${Date.now()}`,
        name: updates.name || 'New Workflow',
        description: updates.description,
        nodes: updates.nodes,
        edges: updates.edges,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setWorkflow(newWorkflow);

      // Save immediately to Convex
      try {
        const response = await fetch('/api/workflows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWorkflow, getCircularReplacer()),
        });
        const data = await response.json();
        console.log('💾 New workflow saved to Convex:', data.success ? 'SUCCESS' : 'FAILED');

        // Store the Convex ID from the response
        if (data.success && data.workflowId) {
          setConvexId(data.workflowId);
        }
      } catch (error) {
        console.error('Failed to save new workflow to Convex:', error);
      }
      return;
    }

    const updated: Workflow = {
      ...workflow,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    setWorkflow(updated);

    // Clear any pending save timeout
    if (saveToConvexTimeoutRef.current) {
      clearTimeout(saveToConvexTimeoutRef.current);
    }

    // Debounce the save to Convex to prevent rapid saves
    saveToConvexTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch('/api/workflows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated, getCircularReplacer()),
        });
        const data = await response.json();

        // Store the Convex ID from the response
        if (data.success && data.workflowId) {
          setConvexId(data.workflowId);
        }

        // Don't reload workflows on every save - only when explicitly needed
        // This prevents unnecessary re-fetches and duplicate saves
      } catch (error) {
        console.error('Failed to save workflow to Convex:', error);
      }
    }, 1000); // 1000ms debounce to batch rapid saves
  }, [workflow, loadWorkflows]);

  // Update nodes
  const updateNodes = useCallback((nodes: WorkflowNode[]) => {
    if (!workflow) {
      console.warn('⚠️ updateNodes called but no workflow exists');
      return;
    }

    console.log('📝 updateNodes called with', nodes.length, 'nodes');
    saveWorkflow({ nodes });
  }, [workflow, saveWorkflow]);

  // Update edges
  const updateEdges = useCallback((edges: WorkflowEdge[]) => {
    if (!workflow) return;

    saveWorkflow({ edges });
  }, [workflow, saveWorkflow]);

  // Update node data
  const updateNodeData = useCallback((nodeId: string, data: any) => {
    if (!workflow) return;

    const nodes = workflow.nodes.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, ...data } }
        : node
    );

    updateNodes(nodes);
  }, [workflow, updateNodes]);

  // Delete workflow
  const deleteWorkflow = useCallback((id: string) => {
    deleteWorkflowFromStorage(id);
    loadWorkflows();

    if (workflow?.id === id) {
      createNewWorkflow();
    }
  }, [workflow, loadWorkflows, createNewWorkflow]);

  // Save workflow immediately (non-debounced) - used before execution
  const saveWorkflowImmediate = useCallback(async (updates?: Partial<Workflow>) => {
    if (!workflow) {
      console.warn('⚠️ Cannot save workflow immediately: no workflow state');
      return;
    }

    const updated: Workflow = {
      ...workflow,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    setWorkflow(updated);

    // Cancel any pending debounced saves
    if (saveToConvexTimeoutRef.current) {
      clearTimeout(saveToConvexTimeoutRef.current);
      saveToConvexTimeoutRef.current = null;
    }

    // Save immediately without debounce
    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated, getCircularReplacer()),
      });
      const data = await response.json();
      console.log('💾 [IMMEDIATE SAVE] Workflow saved to Convex:', data.success ? '✅ SUCCESS' : '❌ FAILED');

      if (data.success && data.workflowId) {
        setConvexId(data.workflowId);
      }

      return data.success;
    } catch (error) {
      console.error('❌ Failed to save workflow immediately:', error);
      return false;
    }
  }, [workflow]);

  return {
    workflow,
    workflows,
    loading,
    convexId, // Expose Convex ID for templates and other features
    saveWorkflow,
    saveWorkflowImmediate, // Non-debounced save for before execution
    updateNodes,
    updateEdges,
    updateNodeData,
    deleteWorkflow,
    createNewWorkflow,
    loadWorkflows,
  };
}

export function useMCPServers() {
  const [servers, setServers] = useState<MCPServer[]>([]);

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = () => {
    const loaded = getMCPServers();
    setServers(loaded);
  };

  const addServer = useCallback((server: MCPServer) => {
    saveMCPServer(server);
    loadServers();
  }, []);

  const updateServer = useCallback((id: string, updates: Partial<MCPServer>) => {
    const existing = servers.find(s => s.id === id);
    if (existing) {
      saveMCPServer({ ...existing, ...updates });
      loadServers();
    }
  }, [servers]);

  return {
    servers,
    addServer,
    updateServer,
    loadServers,
  };
}
