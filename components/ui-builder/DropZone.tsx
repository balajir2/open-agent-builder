"use client";

import { useDroppable } from "@dnd-kit/core";
import { UIComponent } from "./UIBuilderCanvas";
import DraggableComponent from "./DraggableComponent";
import { useMemo, useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";

interface DropZoneProps {
  components: UIComponent[];
  onComponentUpdate: (id: string, props: Record<string, any>) => void;
  onComponentMove: (id: string, position: { x: number; y: number }) => void;
  onComponentDelete: (id: string) => void;
  onExecuteWorkflow: (componentId: string, workflowId: string) => void;
  selectedWorkflowId: string;
  isExecuting: boolean;
  activeComponentId: string | null;
  
}

export default function DropZone({
  components,
  onComponentUpdate,
  onComponentMove,
  onComponentDelete,
  onExecuteWorkflow,
  selectedWorkflowId,
  isExecuting,
  activeComponentId,
 
}: DropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "dropzone" });
  const [zoom, setZoom] = useState(1);

  // 🔹 Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);
  const [component, setComponent] = useState<UIComponent[]>([]);




  return (
    <div className="relative w-full h-screen overflow-auto bg-white border border-gray-300 rounded-lg">
      {/* 🔹 Floating Zoom Controls — Bottom Center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 bg-white/95 border border-gray-300 rounded-full shadow-2xl px-6 py-3 backdrop-blur-md">
        <button
          onClick={handleZoomOut}
          className="p-4 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all shadow-md"
          title="Zoom Out"
        >
          <Minus className="w-8 h-8 text-gray-700 hover:text-blue-600" />
        </button>

        {/* <span className="px-5 py-2 text-lg font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-md shadow-inner">
          {Math.round(zoom * 100)}%
        </span> */}

        <button
          onClick={handleZoomIn}
          className="p-4 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all shadow-md"
          title="Zoom In"
        >
          <Plus className="w-8 h-8 text-gray-700 hover:text-blue-600" />
        </button>

        <button
          onClick={handleResetZoom}
          className="p-4 rounded-full bg-gray-100 hover:bg-blue-100 hover:scale-110 active:scale-95 transition-all shadow-md"
          title="Reset Zoom"
        >
          <RotateCcw className="w-8 h-8 text-gray-700 hover:text-blue-600" />
        </button>
      </div>

      {/* 🔹 Canvas */}
      <div
        ref={setNodeRef}
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200
          ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}
        `}
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          overflow: "auto",
          backgroundSize: "20px 20px",
          backgroundImage:
            "linear-gradient(to right, #f3f4f6 1.5px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1.5px, transparent 1px)"
          }}
      >
        {/* 🔹 Scaled Components */}
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            transition: "transform 0.25s ease-in-out",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {components.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="text-lg mb-2 font-medium">
                  Drop components here to build your UI
                </p>
                <p className="text-sm">
                  Select a workflow to edit its components
                </p>
              </div>
            </div>
          ) : (
            components.map((component) => (
              
              <DraggableComponent
                key={component.id}
                component={component}
                onUpdate={onComponentUpdate}
                onMove={onComponentMove}
                onDelete={onComponentDelete}
                onExecute={onExecuteWorkflow}
                selectedWorkflowId={selectedWorkflowId}
                isExecuting={isExecuting && activeComponentId === component.id}
                
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
