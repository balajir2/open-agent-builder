"use client";

import { useDroppable } from "@dnd-kit/core";
import { UIComponent } from "./UIBuilderCanvas";
import DraggableComponent from "./DraggableComponent";

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
  const { setNodeRef, isOver } = useDroppable({
    id: "dropzone",
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[600px] border-2 border-dashed rounded-lg p-6 relative
        transition-all duration-200
        ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"}
      `}
      style={{ position: "relative" }}
    >
      {components.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <p className="text-lg mb-2">Drop components here to build your UI</p>
            <p className="text-sm">Drag components from the palette or move existing ones</p>
          </div>
        </div>
      ) : (
        <>
          {components.map((component) => (
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
          ))}
        </>
      )}
    </div>
  );
}