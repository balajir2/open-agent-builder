"use client";

import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, DragStartEvent, useSensor, useSensors, PointerSensor, DragOverlay } from "@dnd-kit/core";
import ComponentPalette from "./ComponentPalette";
import DropZone from "./DropZone";
import WorkflowSelector from "./WorkflowSelector";
import ResponseDisplay from "./ResponseDisplay";
import { ResizablePane, ResizableRightPane } from "./ResizablePane";
import { Play, Info, AlertCircle } from "lucide-react";

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
  const [workflowResponses, setWorkflowResponses] = useState<WorkflowResponse[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

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
      const componentType = active.id as string;

      // Create new component
      const newComponent: UIComponent = {
        id: `${componentType}-${Date.now()}`,
        type: componentType,
        props: getDefaultPropsForType(componentType),
        position: { x: Math.random() * 300, y: Math.random() * 200 },
      };

      setComponents((prev) => [...prev, newComponent]);
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
      default:
        return {};
    }
  };

  const handleComponentUpdate = (id: string, props: Record<string, any>) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, props } : comp))
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
      // Collect input values from UI components
      const inputs: Record<string, any> = {};
      components.forEach((comp) => {
        if (comp.type === "input" || comp.type === "textarea") {
          const key = comp.props.label?.replace(/\s+/g, "_").toLowerCase() || comp.id;
          inputs[key] = comp.props.value || comp.props.placeholder || "";
        }
      });

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

  return (
    <div className="flex h-[calc(100vh-160px)] bg-gray-50">
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Left Sidebar - Component Palette (Resizable) */}
        <ResizablePane
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
            <ComponentPalette />
          </div>
        </ResizablePane>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Top Bar - Workflow Selector */}
                    <div className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex-shrink-0">
            <div className="flex flex-col space-y-4">
              <WorkflowSelector
                selectedWorkflowId={selectedWorkflowId}
                onSelectWorkflow={setSelectedWorkflowId}
              />
              
              {/* Global Workflow Execution Button */}
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-sm">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-800">Execute Selected Workflow</h3>
                  <p className="text-xs text-blue-600">Run workflow with all input values</p>
                </div>
                <button
                                    onClick={() => selectedWorkflowId && handleExecuteWorkflow("global-workflow-button", selectedWorkflowId)}
                  disabled={isExecuting || !selectedWorkflowId}
                  className={`px-16 py-8 rounded-8 font-medium transition-all active:scale-[0.98] flex items-center gap-2
                    ${selectedWorkflowId ? 'bg-heat-100 hover:bg-heat-200 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  {isExecuting ? (
                    <>
                      <div className="w-16 h-16 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-16 h-16" />
                      Run Workflow
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
                    <div className="flex-1 overflow-auto p-6 min-h-0 bg-gray-50">
            {/* User Help Panel - shown initially */}
            {showIntro && components.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4 shadow-sm">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-indigo-800">Getting Started</h3>
                    <p className="text-xs text-indigo-700 mt-1">
                      1. Add UI components from the left panel<br/>
                      2. Configure each component by clicking the settings icon<br/>
                      3. Select a workflow above<br/>
                      4. Click the "Run Workflow" button to execute with all input values
                    </p>
                    <button 
                      onClick={() => setShowIntro(false)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 mt-2 underline"
                    >
                      Dismiss this message
                    </button>
                  </div>
                </div>
              </div>
            )}
            <DropZone
              components={components}
              onComponentUpdate={handleComponentUpdate}
              onComponentDelete={handleComponentDelete}
              onExecuteWorkflow={handleExecuteWorkflow}
              selectedWorkflowId={selectedWorkflowId}
              isExecuting={isExecuting}
              activeComponentId={activeComponentId}
            />
          </div>
        </div>

        {/* Right Sidebar - Response Display (Resizable) */}
                <ResizableRightPane
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
        </ResizableRightPane>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            <div className="bg-white border-2 border-blue-400 rounded-lg p-3 shadow-xl">
              <span className="text-sm font-medium text-gray-700">{activeId}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
