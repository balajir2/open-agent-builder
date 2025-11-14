"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

// Try to import the toast from UI components, but provide a fallback implementation
let toast: (args: { title: string; description?: string; variant?: string }) => void;
try {
  const toastModule = require("@/components/ui/shadcn/use-toast");
  toast = toastModule.toast;
} catch (e) {
  // Fallback toast implementation if the import fails
  toast = (args: { title: string; description?: string; variant?: string }) => {
    console.log(`Toast: ${args.title} - ${args.description || ''}`);
    if (args.variant === "destructive" && typeof window !== "undefined") {
      try { alert(`${args.title}\n${args.description || ''}`); } catch {}
    }
  };
}

import { Save, FileQuestion, AlertCircle, Play, Info, Plus } from "lucide-react";
import { DndContext, DragEndEvent, DragStartEvent, useSensor, useSensors, PointerSensor, DragOverlay } from "@dnd-kit/core";
import ComponentPalette from "./ComponentPalette";
import DropZone from "./DropZone";
import WorkflowSelector from "./WorkflowSelector";
import ResponseDisplay from "./ResponseDisplay";
import { ResizablePane, ResizableRightPane } from "./ResizablePane";
import { useWorkflow } from "@/hooks/useWorkflow";
import VariableReferencePicker from "../app/(home)/sections/workflow-builder/VariableReferencePicker";

export interface UIComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowResponse {
  event: string;
  data: any;
  timestamp: string;
}

export default function UIBuilderCanvas() {
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const router = useRouter();
  const [showNameModal, setShowNameModal] = useState(false);
  const [workflowName, setWorkflowName] = useState("");


useEffect(() => {
  if (!selectedWorkflowId) return;

  let isMounted = true;

  const sanitizeValue = (value: any): any => {
    if (value == null) return "";
    if (["string", "number", "boolean"].includes(typeof value)) return value;

    if (typeof value === "object") {
      // Prevent React elements from crashing render
      if (value._owner || value._store || value.type || value.props) return "[ReactElement]";
      if (Array.isArray(value)) return value.map(sanitizeValue);
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitizeValue(v)]));
    }

    return String(value);
  };

const fetchWorkflowDetails = async () => {
  try {
    const res = await fetch(`/api/workflows/${selectedWorkflowId}`);
    if (!res.ok)
      throw new Error(`Failed to fetch workflow details (${res.status})`);

    const workflowData = await res.json();
    console.log("Fetched workflow details:", workflowData);

    const nodes = workflowData?.workflow?.nodes || workflowData?.nodes || [];
    if (!isMounted || !nodes?.length) {
      console.warn("⚠️ No nodes found in workflow data:", workflowData);
      return;
    }

    // 🧩 Backend node type → UI component type mapping
    const typeMap: Record<string, string> = {
      start: "input",
      agent: "textarea",
      input: "input",
      text: "text",
      button: "button",
      decision: "textarea",
      process: "textarea",
      task: "textarea",
      transform:"textarea",
      note:"textarea",
      end: "button",

    };

const nodeComponents = nodes.map((node: any, index: number) => {
  const backendType =
    node.data?.nodeType?.toLowerCase?.() || node.type?.toLowerCase?.() || "textarea";

  const mappedType = typeMap[backendType] || "textarea";
  const safeData = node.data ? JSON.parse(JSON.stringify(node.data)) : {};
      // 🧠 Build props dynamically based on node type
      const baseProps = {
        nodeId: node.id,
        label: sanitizeValue(
          safeData.nodeName ||
            safeData.label ||
            node.name ||
            backendType.charAt(0).toUpperCase() + backendType.slice(1)
        ),
        title: sanitizeValue(safeData.nodeName || safeData.title || "Untitled Node"),
        content: sanitizeValue(safeData.description || ""),
        placeholder: sanitizeValue(safeData.placeholder || ""),
        variant: "primary",
        _inputName: sanitizeValue(
          safeData.inputVariables?.[0]?.name || safeData._inputName || undefined
        ),
        trueVariable: sanitizeValue(safeData.trueVariable || false),
      };

      let textValue = "";
      let instructionsValue = "";

      // 🧩 Customize behavior per node type
      if (backendType === "agent") {
        textValue = sanitizeValue(
          safeData.instructions || safeData.text || "Write agent instructions..."
        );
        instructionsValue = textValue;
      } else if (backendType === "input" || backendType === "start") {
        textValue = sanitizeValue(
          safeData.text || safeData.placeholder || "Enter input"
        );
      } else if (backendType === "end" || backendType === "button") {
        textValue = sanitizeValue(safeData.text || "End");
      } else {
        textValue = sanitizeValue(safeData.text || node.name || "");
      }

      return {
        id: node.id || `node-${index}`,
        type: mappedType,
        props: {
          ...baseProps,
          // text: textValue,
          label: sanitizeValue(
        safeData.nodeName ||
          safeData.label ||
          node.name ||
          backendType.charAt(0).toUpperCase() + backendType.slice(1)
      ),
            text: sanitizeValue(safeData.instructions || safeData.text || ""),
      title: sanitizeValue(safeData.nodeName || safeData.title || "Untitled Node"),
      content: sanitizeValue(safeData.description || ""),
      placeholder: sanitizeValue(safeData.placeholder || ""),
      variant: "primary",
      _inputName: sanitizeValue(
        safeData.inputVariables?.[0]?.name || safeData._inputName || undefined
      ),
      trueVariable: sanitizeValue(safeData.trueVariable || false),
          // value: textValue,
          // instructions: instructionsValue,
               inputVariables: safeData.inputVariables || [],
      instructions: sanitizeValue(safeData.instructions || ""),
      value: sanitizeValue(safeData.text || safeData.instructions || ""),
        },
        position:
          node.position || { x: 100 + index * 150, y: 100 + index * 60 },
      };
    });

    setComponents(nodeComponents);
  } catch (err) {
    console.error("Error fetching workflow details:", err);
  }
};


  // 🚀 Small delay to avoid clash with savedConfig loader
  const delay = setTimeout(fetchWorkflowDetails, 600);

  return () => {
    isMounted = false;
    clearTimeout(delay);
  };
}, [selectedWorkflowId]);







  const [workflowResponses, setWorkflowResponses] = useState<WorkflowResponse[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [showVariableEditor, setShowVariableEditor] = useState(false);
  // const { workflow, convexId, saveWorkflow, saveWorkflowImmediate } = useWorkflow(selectedWorkflowId || undefined);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  const [instructions, setInstructions] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVariablePanel, setShowVariablePanel] = useState(false);
  const [showInstructionsPanel, setShowInstructionsPanel] = useState(false);

// 🧠 Derived list of all available input variables
const derivedInputVariables = useMemo(() => {
  return components
    .filter(c => c.type === "input")
    .map(c => ({
      name: c.props._inputName || c.props.label || "unnamed_input",
      type: "string",
    }));
}, [components]);


  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen(!isOpen);
  };

  const onSelect = item => {
    setInstructions(prev => prev + ` {{input.${item.name}}} `);
  }

  // Convex mutations and queries
  const saveConfig = useMutation(api.uiBuilderConfigurations.saveConfig);
  const savedConfig = useQuery(
    api.uiBuilderConfigurations.getConfigForWorkflow, 
    selectedWorkflowId ? { workflowId: selectedWorkflowId } : "skip"
  );

  // Store workflow-declared inputs and bindings to UI components
  const [workflowInputs, setWorkflowInputs] = useState<
    { name: string; label?: string; type?: string; default?: any; description?: string; required?: boolean; _originalName?: string; internal?: boolean; trueVariable?: boolean }[]
  >([]);
  // maps workflow input name -> componentId
  const [workflowInputBindings, setWorkflowInputBindings] = useState<Record<string, string>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "dropzone") {
      // Check if it's a new component from palette or existing component being moved
      if (active.id.toString().includes("-")) {
        // This is an existing component being moved
        const rect = event.delta;
        const componentId = active.id as string;

        setComponents((prev) => prev.map((comp) => {
          if (comp.id === componentId) {
            return {
              ...comp,
              position: {
                x: comp.position.x + rect.x,
                y: comp.position.y + rect.y,
              },
            };
          }
          return comp;
        }));
      } else {
        // This is a new component from the palette
        const componentType = active.id as string;
        const dropRect = event.over?.rect;
        const clientRect = event.activatorEvent?.target as HTMLElement;

        // Calculate position relative to drop zone
        let x = 50;
        let y = 50;

        if (event.activatorEvent && dropRect) {
          const mouseEvent = event.activatorEvent as MouseEvent;
          x = Math.max(0, mouseEvent.clientX - dropRect.left - 50);
          y = Math.max(0, mouseEvent.clientY - dropRect.top - 50);
        }

        // Create new component
        const newComponent: UIComponent = {
          id: `${componentType}-${Date.now()}`,
          type: componentType,
          props: getDefaultPropsForType(componentType),
          position: { x, y },
        };

        setComponents((prev) => [...prev, newComponent]);
      }
    }

    setActiveId(null);
  };

    const getDefaultPropsForType = (type: string): Record<string, any> => {
    switch (type) {
      case "button":
        return { label: "Execute Workflow", variant: "primary", buttonType: "workflow" };
      case "input":
        return { placeholder: "Enter text...", label: "Input Field", value: "" };
      case "textarea":
        return { placeholder: "Enter text...", label: "Text Area", rows: 4, value: "" };
      case "card":
        return { title: "Card Title", content: "Card content goes here" };
      case "heading":
        return { text: "Heading", level: "h2" };
      case "text":
        return { text: "Text content" };
      case "image":
        return { src: "https://via.placeholder.com/300x200", alt: "Placeholder" };
      case "select":
        return { label: "Select Option", placeholder: "Choose an option" };
      case "checkbox":
        return { label: "Check this box" };
      case "radio":
        return { label: "Radio option" };
      case "divider":
        return {};
      case "container":
        return { title: "Container" };
      case "list":
        return { items: ["Item 1", "Item 2", "Item 3"] };
      case "link":
        return { text: "Click here", href: "#" };
      case "badge":
        return { text: "New", variant: "primary" };
      default:
        return {};
    }
  };
  const [customVariables, setCustomVariables] = useState<
  { name: string; type: string; required: boolean; defaultValue?: string; description?: string }[]
>([]);
  const addCustomVariable = () => {
  const newVar = {
    name: `input${customVariables.length + 1}`,
    type: "string",
    required: false,
    defaultValue: "",
    description: "",
  };
  console.log("Custom Variables = ",customVariables);
  setCustomVariables([...customVariables, newVar]);

  // instantly add as input component on canvas
  ensureInputComponentsForWorkflow([...customVariables, newVar]);
};

const addInstructions = () => {
  const newVar = {
    name: `instructions`,
    type: "textarea",
    required: false,
    default: instructions,
    description: "",
  };

  // instantly add as input component on canvas
  ensureInputComponentsForWorkflow([...customVariables, newVar]);
}

const updateCustomVariable = (index: number, updates: Partial<typeof customVariables[0]>) => {
  setCustomVariables(customVariables.map((v, i) => (i === index ? { ...v, ...updates } : v)));
  ensureInputComponentsForWorkflow(customVariables.map((v, i) => (i === index ? { ...v, ...updates } : v)));
  // Reflect updates on existing components
  const variable = { ...customVariables[index], ...updates };
  setComponents((prev) =>
    prev.map((c) =>
      c.props?._inputName === variable.name
        ? {
            ...c,
            props: {
              ...c.props,
              label: variable.name,
              placeholder: variable.defaultValue ?? "",
              required: variable.required,
            },
          }
        : c
    )
  );
};

const removeCustomVariable = (index: number) => {
  const removed = customVariables[index];
  setCustomVariables(customVariables.filter((_, i) => i !== index));
  // Remove linked component
  setComponents((prev) => prev.filter((c) => c.props?._inputName !== removed.name));
  ensureInputComponentsForWorkflow(customVariables.filter((_, i) => i !== index));
};

  const handleComponentUpdate = (id: string, props: Record<string, any>) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, props } : comp))
    );
  };

  const handleComponentMove = (id: string, position: { x: number; y: number }) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, position } : comp))
    );
  };

  const handleComponentDelete = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

    // Collect input values from UI components whenever components change
  useEffect(() => {
    const inputs: Record<string, any> = {};
    components.forEach((comp) => {
      if (comp.type === "input" || comp.type === "textarea") {
        const key = comp.props.label?.replace(/\s+/g, "_").toLowerCase() || comp.id;
        inputs[key] = comp.props.value || "";
      }
    });
  }, [components]);

        // Reset UI configuration to defaults based on workflow inputs
  const handleResetConfiguration = async () => {
    if (!selectedWorkflowId) {
      toast({
        title: "No workflow selected",
        description: "Please select a workflow before resetting configuration",
        variant: "destructive"
      });
      return;
    }

    // Confirm with the user before resetting
    if (typeof window !== 'undefined' && !window.confirm('This will reset all UI components to default. Any unsaved changes will be lost. Continue?')) {
      return;
    }

    setIsLoading(true);
    try {
      // Clear components and bindings
      setComponents([]);
      setWorkflowInputBindings({});

      // Re-fetch workflow inputs to rebuild the UI
      const url = `/api/workflows/${selectedWorkflowId}/variables`;
      const res = await fetch(url);
      if (res.ok) {
        const variables = await res.json();
        
        if (variables && variables.length > 0) {
          // Prioritize true variables
          const trueVars = variables.filter((v: any) => v.trueVariable === true);
          
          if (trueVars.length > 0) {
            console.log("Resetting with TRUE workflow variables:", trueVars);
            await ensureInputComponentsForWorkflow(trueVars);
          } else {
            // Fall back to all variables
            console.log("Resetting with all detected workflow variables:", variables);
            await ensureInputComponentsForWorkflow(variables);
          }
        }
      }

      toast({
        title: "UI configuration reset",
        description: "UI components have been reset to default"
      });
    } catch (error) {
      console.error("Error resetting configuration:", error);
      toast({
        title: "Error resetting configuration",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  
  // Save current configuration to Convex
  const handleSaveConfiguration = async () => {
    if (!selectedWorkflowId) {
      toast({
        title: "No workflow selected",
        description: "Please select a workflow before saving configuration",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      // Convert Record<string, string> to Map<string, string> for Convex
      const bindingsMap = new Map<string, string>();
      Object.entries(workflowInputBindings).forEach(([key, value]) => {
        bindingsMap.set(key, value);
      });
      
      await saveConfig({
        workflowId: selectedWorkflowId,
        components: components,
        workflowInputBindings: bindingsMap
      });

      toast({
        title: "Configuration saved",
        description: "Your UI components and bindings have been saved",
      });
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast({
        title: "Error saving configuration",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Load saved configuration when workflow changes or when saved config is fetched
  // useEffect(() => {
  //   if (savedConfig && selectedWorkflowId) {
  //     setIsLoading(true);
  //     try {
  //       // Load components from saved configuration
  //       if (savedConfig.components && Array.isArray(savedConfig.components)) {
  //         setComponents(savedConfig.components as UIComponent[]);
  //       }

  //       // Load input bindings - convert from Map to Record
  //       if (savedConfig.workflowInputBindings) {
  //         // Handle both Map and Record formats for backward compatibility
  //         const bindings: Record<string, string> = {};
  //         if (savedConfig.workflowInputBindings instanceof Map) {
  //           // Handle Map from Convex - cast to a typed Map so entries() yields [key, value] tuples
  //           const mapBindings = savedConfig.workflowInputBindings as Map<any, any>;
  //           Array.from(mapBindings.entries()).forEach(([key, value]) => {
  //             bindings[String(key)] = String(value);
  //           });
  //         } else if (typeof savedConfig.workflowInputBindings === 'object') {
  //           // Handle plain object
  //           Object.entries(savedConfig.workflowInputBindings as Record<string, any>).forEach(([key, value]) => {
  //             bindings[key] = value as string;
  //           });
  //         }
  //         setWorkflowInputBindings(bindings);
  //       }

  //       toast({
  //         title: "Configuration loaded",
  //         description: "Saved UI layout restored",
  //       });
  //     } catch (error) {
  //       console.error("Error loading saved configuration:", error);
  //       toast({
  //         title: "Error loading configuration",
  //         description: "Failed to restore saved layout",
  //         variant: "destructive"
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // }, [savedConfig, selectedWorkflowId]);

  const handleExecuteWorkflow = async (componentId: string | null, workflowId: string) => {
    if (!workflowId) {
      alert("Please select a workflow first");
      return;
    }

    setIsExecuting(true);
    setActiveComponentId(componentId);
    setWorkflowResponses([]);
    setShowIntro(false);

        try {
      // Build payload based on workflow-declared inputs and component bindings
      const inputs: Record<string, any> = {};
      
      // Include the raw components in debug
      console.debug("Components at execution time:", components);
      console.debug("Workflow input bindings:", workflowInputBindings);
      console.debug("Workflow inputs:", workflowInputs);
      
      if (workflowInputs && workflowInputs.length > 0) {
        // First pass: handle workflow-declared inputs
        for (const wi of workflowInputs) {
          const boundId = workflowInputBindings[wi.name];
          const boundComp = components.find((c) => c.id === boundId);
          
          if (boundComp) {
            // Get the correct input name for the workflow with updated priorities
            // Priority: 1) True variable (if flagged), 2) _originalName, 3) _inputName, 4) name from workflowInputs
            const inputName = wi.trueVariable ? wi.name : 
                             (boundComp.props._originalName || boundComp.props._inputName || wi.name); 
            inputs[inputName] = boundComp.props.value ?? boundComp.props.placeholder ?? wi.default ?? "";
            console.debug(`Setting workflow input '${inputName}' to:`, inputs[inputName]);
            
            // Also include it with the cleaned name if it differs (for compatibility)
            if (inputName !== wi.name && !inputs[wi.name]) {
              inputs[wi.name] = inputs[inputName];
              console.debug(`Also setting cleaned name '${wi.name}' to same value`);
            }
            
            // If we have a very complex original name, also include a simplified version
            if (boundComp.props._originalName && boundComp.props._originalName !== inputName) {
              // Try to extract a clean part from the original name
              const simplifiedName = boundComp.props._originalName
                .split(/\-|\_\_/)
                .find(part => !part.includes('node') && !part.includes('edge') && !part.includes('xy'));
              
              if (simplifiedName && !inputs[simplifiedName]) {
                inputs[simplifiedName] = inputs[inputName];
                console.debug(`Also including simplified name '${simplifiedName}' from complex original`);
              }
            }
          } else {
            // Fall back to default declared by workflow with exact name
            inputs[wi.name] = wi.default ?? "";
            console.debug(`Using default for workflow input '${wi.name}':`, inputs[wi.name]);
          }
        }
      }

      // Second pass: include all input/textarea components (for maximum compatibility)
      components.forEach((comp) => {
        if (comp.type === "input" || comp.type === "textarea") {
          // Already processed through workflow inputs? Skip to avoid duplication
          const inputName = comp.props._inputName || comp.props._originalName;
          if (inputName && inputs[inputName] !== undefined) {
            return; // Already included this input
          }
          
          // Try different naming strategies for maximum compatibility
          const possibleNames = [
            // Original name from the backend
            comp.props._originalName,
            // Our mapped input name
            comp.props._inputName,
            // Try to get a name from the component ID
            comp.id.split("-")[1],
            // Use the label (with spaces replaced by underscores)
            comp.props.label?.replace(/\s+/g, "_").replace(/\*$/, ""),  // Remove trailing *
            // Last resort: use the component ID
            comp.id
          ];
          
          // Use the first valid name
          const key = possibleNames.find(name => name && name.length > 0) || comp.id;
          
          // Add this input if we don't already have it
          if (inputs[key] === undefined) {
            inputs[key] = comp.props.value || comp.props.placeholder || "";
            console.debug(`Adding additional input '${key}' to:`, inputs[key]);
          }
        }
      });
      
      console.debug("Final workflow inputs:", inputs);

      // Call the streaming API
      const response = await fetch(`/api/workflows/${workflowId}/execute-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.trim().startsWith("event:")) {
            const eventMatch = line.match(/event:\s*(\w+)/);
            const dataMatch = line.match(/data:\s*(.+)/);

            if (eventMatch && dataMatch) {
              const event = eventMatch[1];
              const data = JSON.parse(dataMatch[1]);

              const response: WorkflowResponse = {
                event,
                data,
                timestamp: data.timestamp || new Date().toISOString(),
              };

              setWorkflowResponses((prev) => [...prev, response]);
            }
          }
        }
      }
    } catch (error) {
      console.error("Workflow execution error:", error);
      setWorkflowResponses((prev) => [
        ...prev,
        {
          event: "error",
          data: { error: error instanceof Error ? error.message : "Unknown error" },
          timestamp: new Date().toISOString(),
        },
      ]);
        } finally {
      setIsExecuting(false);
      // Only reset activeComponentId if it's not the global button
      if (activeComponentId !== "global-workflow-button") {
        setActiveComponentId(null);
      }
    }
  };

// Inside your component:
const saveWorkflow = useMutation(api.workflows.saveWorkflow);

  // Ensure canvas has input components for all workflow inputs and create bindings
  const handleSaveWorkflow = async (userWorkflowName: string) => {
  if (!selectedWorkflowId) {
    alert("Please select or create a workflow first!");
    return;
  }

  try {
    // 1️ Fetch original Firecrawl workflow
    const res = await fetch(`/api/workflows/${selectedWorkflowId}`);
    if (!res.ok) throw new Error(`Failed to fetch workflow details (${res.status})`);

    const originalWorkflow = await res.json();
    const originalNodes = originalWorkflow?.workflow?.nodes || originalWorkflow?.nodes || [];
    const originalEdges = originalWorkflow?.workflow?.edges || originalWorkflow?.edges || [];

    //  Prepare updates from UI builder
    const updates = Object.fromEntries(
      components.map((comp) => [
        comp.id,
        {
          newText:
            comp.props.value?.trim() ||
            comp.props.text?.trim() ||
            comp.props.instructions?.trim() ||
            "",
          newLabel: comp.props.label,
          newTitle: comp.props.title,
          newNodeType: comp.props.nodeType || comp.type,
          newInputs: comp.props.inputVariables || [],
        },
      ])
    );

    // Merge into Firecrawl-style nodes
    const mergedNodes = originalNodes.map((oldNode) => {
      const update = updates[oldNode.id];
      if (!update) return oldNode;

      const mergedData = { ...oldNode.data };

      //  Update instructions & text if edited in UI
      if (update.newText && update.newText !== mergedData.instructions) {
        mergedData.instructions = update.newText;
        mergedData.text = update.newText;
      }

      //Update labels and titles
      if (update.newLabel) mergedData.label = update.newLabel;
      if (update.newTitle) mergedData.title = update.newTitle;

      // Merge input variables (for Start/Input nodes)
      if (
        ["start", "input"].includes(
          (mergedData.nodeType || oldNode.type || "").toLowerCase()
        )
      ) {
        mergedData.inputVariables = Array.isArray(update.newInputs)
          ? update.newInputs
          : mergedData.inputVariables || [];
      }

      mergedData.nodeType = mergedData.nodeType || oldNode.type;

      return {
        ...oldNode,
        data: mergedData,
        type: mergedData.nodeType,
      };
    });

    //  Derive requiredInputs from Start/Input node
    const startNode = mergedNodes.find((n) =>
      ["start", "input"].includes((n.data?.nodeType || "").toLowerCase())
    );

    const requiredInputs = startNode?.data?.inputVariables?.map((v: any) => ({
      name: v.name,
      description: v.description || "Enter value",
      type: v.type || "string",
      required: !!v.required,
      defaultValue: v.defaultValue || "",
    })) || [];

    //  Build final workflow payload
    const payload = {
      customId: `workflow_${Date.now()}`,
      name: `Copy of ${originalWorkflow?.workflow?.name || originalWorkflow?.name || "Workflow"}_${Date.now()}_${userWorkflowName}`,
      description: "Saved workflow from UI Builder Canvas",
      nodes: mergedNodes,
      edges: originalEdges,
      category: "Custom",
      tags: [],
      version: "1.0.0",
      // requiredInputs,
    };

    console.log("🧩 Final workflow JSON before saving:", payload);

    // Save to backend
    await saveWorkflow(payload);
    alert("✅ Workflow saved successfully!");

    // Optional: open in new tab for verification
    // const url = `${window.location.origin}/api/workflows/${payload.customId}/getWorkflowDetails`;
    const url = `${window.location.origin}/workflow-runner?workflowid=${payload.customId}`;
    
    window.open(url, "_blank");
  } catch (err) {
    console.error("❌ Error saving workflow:", err);
    alert("Failed to save workflow.");
  }
};


  const ensureInputComponentsForWorkflow = async (
    inputs: { name: string; label?: string; type?: string; default?: any; description?: string; required?: boolean; _originalName?: string; internal?: boolean; trueVariable?: boolean }[]
  ) => {
    // Log what variables we've detected
    console.log("Working with workflow input variables:", inputs);
    
    // Prioritize internal variables from template analysis
    console.log("inputs = ",inputs);
    const internalInputs = inputs.filter(input => input.internal === true);
    
    // If we have internal variables, use only those as they are the true workflow variables
    const workingSet = internalInputs.length > 0 ? internalInputs : inputs;
    console.log(internalInputs.length > 0 ? 
      "Using internal workflow variables:" : 
      "No internal variables found, using all detected variables:", 
      workingSet);
    
    // Filter out system variables or edge IDs
    const cleanedInputs = workingSet.filter(input => {
      const name = input.name;
      // Exclude items that look like edge IDs
      if (
        name.startsWith('xy-') || 
        name.includes('node_') || 
        name.includes('-input') ||
        name.includes('-output') ||
        name.includes('__')
      ) {
        console.log(`Filtering out likely system variable: ${name}`);
        return false;
      }
      return true;
    });

    // If we filtered out a lot, warn in console
    if (cleanedInputs.length < inputs.length) {
      console.warn(`Filtered out ${inputs.length - cleanedInputs.length} likely system variables`);
    }

    // If no valid inputs found, try to extract from labels/descriptions
    // if (cleanedInputs.length === 0 && inputs.length > 0) {
    //   console.log("No clean input variables found, attempting to extract from labels/descriptions");
    //   // Try to clean up the variable names
    //   cleanedInputs.push(...inputs.map(input => {
    //     // Try to extract a better name from the variable
    //     let cleanName = input.name;
        
    //     // Remove common prefixes and suffixes
    //     cleanName = cleanName
    //       .replace(/^xy\-edge__/, "")
    //       .replace(/^node_\d+output\-/, "")
    //       .replace(/\-node_\d+input$/, "")
    //       .replace(/^output\-/, "")
    //       .replace(/\-input$/, "")
    //       .replace(/^input\-/, "");
          
    //     // If it still looks messy, use the label if available
    //     if (
    //       (cleanName.includes('node_') || cleanName.includes('__')) && 
    //       input.label && 
    //       !input.label.includes('node_')
    //     ) {
    //       cleanName = input.label;
    //     }
        
    //     return {
    //       ...input,
    //       name: cleanName,
    //       _originalName: input.name, // Keep track of the original name for mapping
    //     };
    //   }));
    // }

    // Update state with the cleaned inputs
    setWorkflowInputs(cleanedInputs);

    // Clear existing components if loading new workflow inputs
    // (only if there are no saved configurations being loaded)
   if (!isLoading && !savedConfig && components.length === 0) {
  setComponents([]);
}

    // Use current components snapshot and return a deterministic update
    const prevComponents = components;
    const updated = isLoading || savedConfig ? [...prevComponents] : [];
    const newBindings: Record<string, string> = { ...workflowInputBindings };

    // Create input components with proper spacing
    let yOffset = 40;
    
    cleanedInputs.forEach((input, index) => {
      // Keep the original input name exactly as it comes from the backend
      const inputName = input.name;
      const desiredLabel = input.label || input.name;
      const description = input.description || ""; 
      
      // Check if we already have a component for this input
      const found = updated.find(
        (c) =>
          (c.type === "input" || c.type === "textarea") &&
          (c.props?._inputName === inputName || // Match by our special tracking property
           c.id.includes(`input-${inputName}-`)) // Or by ID pattern
      );

      if (found) {
        // Update the binding but keep the existing component
        newBindings[inputName] = found.id;
        
        // Optionally update the component with any new metadata
        if (!found.props._inputName) {
          found.props._inputName = inputName;
        }
        
        return;
      }

      // Determine if this should be a textarea based on the input type or expected length
      const useTextarea = 
        input.type === "textarea" || 
        input.type === "text" || 
        (typeof input.default === "string" && input.default.length > 100);

      // Create new component with exact input name matching backend
      const newComp: UIComponent = {
        id: `input-${inputName}-${Date.now()}`,
        type: useTextarea ? "textarea" : "input",
        props: {
          label: desiredLabel + (input.required ? " *" : ""),
          placeholder: input.default ?? "",
          value: input.default ?? "",
          _inputName: inputName, // Store the exact backend input name
          description: description, // Store description for tooltips
        },
        position: { x: 40, y: yOffset },
      };

      // Add additional metadata to the component
      if (input.required) {
        newComp.props.required = true;
      }
      
      if (input._originalName) {
        newComp.props._originalName = input._originalName;
      }

      yOffset += useTextarea ? 120 : 80; // Space components vertically, more for textareas
      updated.push(newComp);
      newBindings[inputName] = newComp.id;
    });

    // If we're not loading a saved config, replace all components
    if (!isLoading && !savedConfig) {
      setComponents(updated);
    } else {
      // Otherwise just add any missing components
      const existingIds = new Set(prevComponents.map(c => c.id));
      const newComponents = updated.filter(c => !existingIds.has(c.id));
      setComponents([...prevComponents, ...newComponents]);
    }
    
    // Update bindings
    setWorkflowInputBindings((prev) => ({ ...prev, ...newBindings }));

    console.debug("ensureInputComponentsForWorkflow:", { 
      inputs: cleanedInputs, 
      addedBindings: newBindings, 
      componentsAfter: updated 
    });
  };

  
  return (
    <div className="flex h-[calc(100vh-160px)] bg-gray-50">
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Left Sidebar - Component Palette (Resizable) */}
        {/* <ResizablePane
          defaultWidth={288}
          minWidth={200}
          maxWidth={400}
          className="border-r-2 border-gray-200 bg-white shadow-lg"
        >
          <div className="p-4 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-bold text-gray-800">UI Components</h3>
            <p className="text-xs text-gray-600 mt-1">
              Drag components onto the canvas
            </p>
          </div>
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="text-sm font-bold text-blue-800 mb-2">How to Use</h4>
              <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                <li>Drag components from above onto the canvas</li>
                <li>Select a workflow to automatically create input fields</li>
                <li>Input fields will bind to workflow variables</li>
                <li>Use the Save button to store your UI for later use</li>
              </ul>
            </div>
          </div>
        </ResizablePane> */}

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white px-8 sm:px-12 lg:px-20">
          {/* Top Bar - Workflow Selector */}
                              <div className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex-shrink-0">
            <div className="flex flex-col space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center p-3">
                  <div className="w-16 h-16 border-2 border-gray-400 border-t-heat-100 rounded-full animate-spin mr-2" />
                  <span className="text-sm">Loading saved configuration...</span>
                </div>
              ) : (
                <WorkflowSelector
                  selectedWorkflowId={selectedWorkflowId}
                  onSelectWorkflow={setSelectedWorkflowId}
                />
              )}
              
                            {/* Save UI Configuration Section - Full Width & Prominent */}
              <div className="">
                <div className="flex flex-col space-y-3">
                  {/* <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-emerald-800">UI Configuration</h3>
                      <p className="text-sm text-emerald-700 mt-1">Save the current UI layout and component bindings to Convex. Your saved configuration will be loaded automatically when you select this workflow again.</p>
                    </div>
                  </div> */}
                  
                  <div className="flex gap-3 justify-end">
                    
                    {/* <button
                      onClick={handleResetConfiguration}
                      disabled={isLoading || !selectedWorkflowId}
                      className={`px-8 py-8 rounded-8 font-medium transition-all active:scale-[0.98] flex items-center gap-2 shadow-sm
                        ${(!isLoading && selectedWorkflowId) ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      title="Reset UI to default components based on workflow inputs"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12a9 9 0 1 1 9 9" />
                        <path d="M9 18l-3-3 3-3" />
                      </svg>
                      Reset UI
                    </button> */}
                    
                    
                    {/* <button
                      onClick={handleSaveConfiguration}
                      disabled={isSaving || !selectedWorkflowId || components.length === 0}
                      className={`px-16 py-8 rounded-8 font-medium text-base transition-all active:scale-[0.98] flex items-center gap-3 shadow-sm
                        ${(!isSaving && selectedWorkflowId && components.length > 0) ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {isSaving ? (
                        <>
                          <div className="w-16 h-16 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving Configuration...
                        </>
                      ) : (
                        <>
                          <Save className="w-16 h-16" />
                          Save UI Configuration
                        </>
                      )}
                    </button> */}
                  </div>
                </div>
              </div>

              {/* Workflow Execution Button - Full Width */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm mt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Create UI for the Selected Workflow</h3>
                    <p className="text-xs text-blue-600">Customise this workflow according to your requirement</p>
                  </div>
                  <div className="flex gap-2">
                    {/* <button
                      onClick={() => setShowVariablePanel(true)}
                      disabled={!selectedWorkflowId}
                      className={`px-10 py-6 rounded-8 font-medium transition-all active:scale-[0.98] flex items-center gap-2
                        ${selectedWorkflowId ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      <Plus className="w-14 h-14" />
                      Variables
                    </button> */}
                    
                      {/* <button
                        onClick={() => setShowInstructionsPanel(true)}
                        disabled={!selectedWorkflowId || components.length === 0}
                        className={`px-10 py-6 rounded-8 font-medium transition-all active:scale-[0.98] flex items-center gap-2
                          ${selectedWorkflowId ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                      >
                        <Plus className="w-14 h-14" />
                        Instructions
                      </button> */}

                      {/* <button
                          onClick={()=>handleSaveWorkflow()}
                          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
                        >
                          💾 Save Workflow
                      </button> */}

                      <button
                      // onClick={() => selectedWorkflowId && handleExecuteWorkflow("global-workflow-button", selectedWorkflowId)}
                      // onClick={()=>handleSaveWorkflow()}
                      onClick={() => {
                        if (!selectedWorkflowId) return;
                        setWorkflowName(""); 
                        setShowNameModal(true);   // <-- open modal
                      }}
                      disabled={isExecuting || !selectedWorkflowId}
                      className={`px-12 py-6 rounded-8 font-medium transition-all active:scale-[0.98] flex items-center gap-2
                        ${selectedWorkflowId ? 'bg-heat-100 hover:bg-heat-200 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {isExecuting ? (
                        <>
                          <div className="w-14 h-14 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-14 h-14" />
                          Create UI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Workflow Input Components Information */}
              {workflowInputs && workflowInputs.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start">
                    {/* <FileQuestion className="h-20 w-20 text-indigo-500 mt-1 mr-3 flex-shrink-0" /> */}
                    {/* <div className="flex-1"> */}
                      {/* <h3 className="text-sm font-semibold text-indigo-800">Workflow Input Variables</h3> */}
                      {/* <p className="text-xs text-indigo-700 mt-1 mb-2">
                        Found {workflowInputs.length} input variables for this workflow. 
                        {components.length === 0 ? " Input components will be automatically created for you." : " Input components are mapped to these variables."}
                        {workflowInputs.some(input => input.trueVariable) && 
                         " Using TRUE variables directly extracted from workflow code."}
                      </p> */}
                      
                      {/* <div className="mt-3 overflow-x-auto">
                        <table className="min-w-full border border-indigo-200 text-xs">
                          <thead className="bg-indigo-100">
                            <tr>
                              <th className="py-1 px-2 text-left border-b border-indigo-200">Variable Name</th>
                              <th className="py-1 px-2 text-left border-b border-indigo-200">Label</th>
                              <th className="py-1 px-2 text-left border-b border-indigo-200">Type</th>
                              <th className="py-1 px-2 text-left border-b border-indigo-200">Source</th>
                              <th className="py-1 px-2 text-left border-b border-indigo-200">Default Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workflowInputs.map((input, index) => (
                              <tr key={input.name} className={index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'}>
                                <td className="py-1 px-2 border-b border-indigo-100 font-medium">
                                  {input.name}{input.required && " *"}
                                </td>
                                <td className="py-1 px-2 border-b border-indigo-100">{input.label || '-'}</td>
                                <td className="py-1 px-2 border-b border-indigo-100">{input.type || 'string'}</td>
                                <td className="py-1 px-2 border-b border-indigo-100">
                                  {input.trueVariable ? 
                                    <span className="bg-green-100 text-green-800 py-0 px-1 rounded text-xs font-bold">TRUE</span> : 
                                    (input.internal ? 
                                      <span className="bg-blue-100 text-blue-800 py-0 px-1 rounded text-xs">Internal</span> : 
                                      <span className="text-gray-400">Standard</span>)}
                                </td>
                                <td className="py-1 px-2 border-b border-indigo-100 truncate max-w-[150px]">
                                  {input.default !== undefined ? 
                                    (typeof input.default === 'object' ? 
                                      JSON.stringify(input.default).substring(0, 20) + '...' : 
                                      String(input.default)) : 
                                    '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div> */}
                      
                      {/* Variable explanation */}
                      {/* <div className="mt-3 text-xs text-indigo-700">
                        <p className="font-semibold">Variable Source Types:</p>
                        <ul className="list-disc pl-4 mt-1">
                          <li><span className="bg-green-100 text-green-800 py-0 px-1 rounded text-xs font-bold inline-block w-10 text-center">TRUE</span> - Extracted directly from workflow code (highest accuracy)</li>
                          <li><span className="bg-blue-100 text-blue-800 py-0 px-1 rounded text-xs inline-block w-10 text-center">Internal</span> - Detected from workflow structure analysis</li>
                          <li><span className="text-gray-400 inline-block w-10 text-center">Standard</span> - Basic workflow metadata</li>
                        </ul>
                      </div> */}
                    {/* </div> */}
                  </div>
                </div>
              )}
            </div>
            {showNameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[99999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[380px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Enter Workflow Name
            </h2>

            <input
              type="text"
              className="w-full border rounded-md p-2 text-sm"
              placeholder="My Custom Workflow"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
            />

            <div className="flex justify-end mt-5 gap-3">
              <button
                onClick={() => setShowNameModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!workflowName.trim()) {
                    alert("Please enter a workflow name.");
                    return;
                  }
                  setShowNameModal(false);
                  handleSaveWorkflow(workflowName);  // <-- pass user name
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
      </div>
    </div>
  </div>
)}

          </div>

          {/* Canvas */}
            <div className="flex-1 overflow-auto p-6 min-h-0 bg-gray-50">
           
            {/* {showIntro && components.length > 0 && (
              // <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4 shadow-sm">
              //   <div className="flex items-start">
              //     <Info className="h-5 w-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
              //     <div>
              //       <h3 className="text-sm font-medium text-indigo-800">Getting Started</h3>
              //       <p className="text-xs text-indigo-700 mt-1">
              //         1. Add UI components from the left panel<br/>
              //         2. Configure each component by clicking the settings icon<br/>
              //         3. Select a workflow above<br/>
              //         4. Click the "Run Workflow" button to execute with all input values
              //       </p>
              //       <button 
              //         onClick={() => setShowIntro(false)}
              //         className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 underline"
              //       >
              //         Dismiss this message
              //       </button>
              //     </div>
              //   </div>
              // </div>
            )} */}
            <DropZone
              components={components}
              onComponentUpdate={handleComponentUpdate}              
              onComponentMove={handleComponentMove}
              onComponentDelete={handleComponentDelete}
              onExecuteWorkflow={handleExecuteWorkflow}
              selectedWorkflowId={selectedWorkflowId}
              isExecuting={isExecuting}
              activeComponentId={activeComponentId}
            />



          </div>
        </div>

        {/* Right Sidebar - Response Display (Resizable) */}
                {/* <ResizableRightPane
          defaultWidth={384}
          minWidth={300}
          maxWidth={600}
          className="border-l-2 border-gray-200 bg-white shadow-lg"
        >
          {workflowResponses.length === 0 && !isExecuting ? (
            <div className="p-4 flex flex-col items-center justify-center h-full text-center">
              <AlertCircle className="h-10 w-10 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No Workflow Results</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                Execute a workflow to see real-time results and node outputs here.
              </p>
            </div>
          ) : (
            <ResponseDisplay responses={workflowResponses} isExecuting={isExecuting} />
          )}
        </ResizableRightPane> */}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div className="bg-white border-2 border-blue-400 rounded-lg p-3 shadow-xl">
              <span className="text-sm font-medium text-gray-700">{activeId}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
              {/* 🆕 Custom Variable Editor Panel */}
      <AnimatePresence>
        {showVariablePanel && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-10 top-20 h-[calc(100vh-120px)] w-[420px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto z-[9999] p-6"
>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Custom Variables</h2>
              <button onClick={() => setShowVariablePanel(false)} className="text-gray-600 hover:text-gray-900">
                ✕
              </button>
            </div>

            <div className="flex justify-end mb-4">
              <button
                onClick={()=>addCustomVariable()}
                className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Variable
              </button>
            </div>

            {customVariables.length === 0 ? (
              <p className="text-sm text-gray-500">No variables defined yet.</p>
            ) : (
              <div className="space-y-3">
                {customVariables.map((v, i) => (
                  <div key={i} className="border p-3 rounded-md space-y-2 bg-gray-50">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Variable Name</label>
                      <input
                        type="text"
                        className="w-full text-sm border rounded p-1"
                        value={v.name}
                        onChange={(e) => updateCustomVariable(i, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Type</label>
                      <select
                        className="w-full text-sm border rounded p-1"
                        value={v.type}
                        onChange={(e) => updateCustomVariable(i, { type: e.target.value })}
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="url">URL</option>
                        <option value="object">Object</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Description</label>
                      <input
                        type="text"
                        className="w-full text-sm border rounded p-1"
                        value={v.description || ""}
                        onChange={(e) => updateCustomVariable(i, { description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Default Value</label>
                      <input
                        type="text"
                        className="w-full text-sm border rounded p-1"
                        value={v.defaultValue || ""}
                        onChange={(e) => updateCustomVariable(i, { defaultValue: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={v.required}
                          onChange={(e) => updateCustomVariable(i, { required: e.target.checked })}
                        />
                        Required
                      </label>
                      <button
                        onClick={() => removeCustomVariable(i)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInstructionsPanel && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-10 top-20 h-[calc(100vh-120px)] w-[420px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto z-[9999] p-6"
>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Custom Variables</h2>
              <button onClick={() => {addInstructions(); setShowInstructionsPanel(false)}} className="text-gray-600 hover:text-gray-900">
                ✕
              </button>
            </div>
            <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter agent instructions..."
                rows={8}
                className="w-full px-14 py-10 bg-background-base border border-border-faint rounded-10 text-sm text-accent-black placeholder-black-alpha-32 focus:outline-none focus:border-heat-100 transition-colors resize-y"
              />
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <button
                ref={buttonRef}
                onClick={handleOpen}
                className="px-12 py-6 bg-heat-4 hover:bg-heat-8 border border-heat-100 rounded-6 text-body-small text-heat-100 transition-colors flex items-center gap-6"
              >
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Insert Variable
              </button>
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div
                    className="fixed inset-0 z-[9998]"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="fixed w-400 max-w-[calc(100vw-40px)] bg-accent-white border border-border-faint rounded-12 shadow-2xl z-[9999] overflow-hidden"
                    style={{
                      top: `${buttonPosition.top}px`,
                      right: `${buttonPosition.right}px`,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-12 border-b border-border-faint">
                      <h4 className="text-label-small text-accent-black">Available Variables</h4>
                    </div>
      
                  <div className="max-h-320 overflow-y-auto">
                    {customVariables.map((item: any, itemIndex) => (
                        <button
                          key={itemIndex}
                          onClick={() => {
                            onSelect(item);
                            setIsOpen(false);
                          }}
                          className={`w-full px-12 py-10 text-left hover:bg-heat-4 transition-colors border-b border-border-faint last:border-0 ${
                            item.isField ? 'pl-24 bg-background-base' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-8">
                            <div className="flex-1 min-w-0">
                              <p className={`text-body-small font-medium break-all ${
                                item.isField || item.isInputVariable || item.isNested ? 'text-heat-100' : 'text-accent-black'
                              }`}>
                                {item.name}
                              </p>
                              {item.description && (
                                <p className="text-body-small text-black-alpha-48 mt-4 truncate">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
      
                    <div className="p-12 bg-background-base border-t border-border-faint">
                      <p className="text-body-small text-black-alpha-48">
                        Click a variable to insert its reference
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
    </div>
  );
}
