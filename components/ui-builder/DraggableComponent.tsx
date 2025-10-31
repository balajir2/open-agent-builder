"use client";

import { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { UIComponent } from "./UIBuilderCanvas";
import { X, Settings, Play, Move } from "lucide-react";

interface DraggableComponentProps {
  component: UIComponent;
  onUpdate: (id: string, props: Record<string, any>) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onDelete: (id: string) => void;
  onExecute: (componentId: string, workflowId: string) => void;
  selectedWorkflowId: string;
  isExecuting: boolean;
}

export default function DraggableComponent({
  component,
  onUpdate,
  onMove,
  onDelete,
  onExecute,
  selectedWorkflowId,
  isExecuting,
}: DraggableComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localProps, setLocalProps] = useState(component.props);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Manual drag implementation for better control
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the move handle
    if (!(e.target as HTMLElement).closest('.move-handle')) return;

    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX - component.position.x;
    const startY = e.clientY - component.position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const parentRect = containerRef.current?.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      const newX = Math.max(0, Math.min(e.clientX - startX, parentRect.width - 250));
      const newY = Math.max(0, Math.min(e.clientY - startY, parentRect.height - 150));

      onMove(component.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSave = () => {
    onUpdate(component.id, localProps);
    setIsEditing(false);
  };

  const handlePropChange = (key: string, value: any) => {
    const newProps = { ...localProps, [key]: value };
    setLocalProps(newProps);
    onUpdate(component.id, newProps);
  };

  const renderComponent = () => {
    switch (component.type) {
      case "button":
        return (
          <button
            className={`
              px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98]
              ${component.props.variant === "primary"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 border border-gray-400"}
            `}
            onClick={() => onExecute(component.id, selectedWorkflowId)}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Executing...
              </span>
            ) : (
              component.props.label
            )}
          </button>
        );

      case "input":
        return (
          <div className="w-full">
            {component.props.label && (
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {component.props.label}
              </label>
            )}
            <input
              type="text"
              placeholder={component.props.placeholder}
              value={component.props.value || ""}
              onChange={(e) => handlePropChange("value", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        );

      case "textarea":
        return (
          <div className="w-full">
            {component.props.label && (
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {component.props.label}
              </label>
            )}
            <textarea
              placeholder={component.props.placeholder}
              value={component.props.value || ""}
              onChange={(e) => handlePropChange("value", e.target.value)}
              rows={component.props.rows || 4}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        );

      case "card":
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{component.props.title}</h3>
            <p className="text-gray-600">{component.props.content}</p>
          </div>
        );

      case "heading":
        const HeadingTag = component.props.level || "h2";
        return (
          <HeadingTag
            className={`font-bold text-gray-800 ${
              HeadingTag === "h1" ? "text-3xl" : HeadingTag === "h2" ? "text-2xl" : "text-xl"
            }`}
          >
            {component.props.text}
          </HeadingTag>
        );

      case "text":
        return <p className="text-gray-700">{component.props.text}</p>;

      case "image":
        return (
          <img
            src={component.props.src}
            alt={component.props.alt}
            className="max-w-full h-auto rounded-lg"
          />
        );

      case "select":
        return (
          <div className="w-full">
            {component.props.label && (
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {component.props.label}
              </label>
            )}
            <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="w-4 h-4" />
            {component.props.label || "Checkbox"}
          </label>
        );

      case "radio":
        return (
          <label className="flex items-center gap-2 text-gray-700">
            <input type="radio" name={component.id} className="w-4 h-4" />
            {component.props.label || "Radio"}
          </label>
        );

      case "divider":
        return <hr className="border-gray-300 my-2" />;

      case "container":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px]">
            <p className="text-gray-500 text-sm">Container</p>
          </div>
        );

      case "list":
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        );

      case "link":
        return (
          <a href="#" className="text-blue-500 hover:underline">
            {component.props.text || "Link"}
          </a>
        );

      case "badge":
        return (
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {component.props.text || "Badge"}
          </span>
        );

      default:
        return <div>Unknown component type: {component.type}</div>;
    }
  };

  const renderEditor = () => {
    switch (component.type) {
      case "button":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">Label</label>
              <input
                type="text"
                value={localProps.label}
                onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Variant</label>
              <select
                value={localProps.variant}
                onChange={(e) => setLocalProps({ ...localProps, variant: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </div>
        );

      case "input":
      case "textarea":
      case "select":
      case "checkbox":
      case "radio":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">Label</label>
              <input
                type="text"
                value={localProps.label || ""}
                onChange={(e) => setLocalProps({ ...localProps, label: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Placeholder</label>
              <input
                type="text"
                value={localProps.placeholder || ""}
                onChange={(e) => setLocalProps({ ...localProps, placeholder: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );

      case "card":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={localProps.title}
                onChange={(e) => setLocalProps({ ...localProps, title: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={localProps.content}
                onChange={(e) => setLocalProps({ ...localProps, content: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>
          </div>
        );

      case "heading":
      case "text":
      case "link":
      case "badge":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">Text</label>
              <input
                type="text"
                value={localProps.text || ""}
                onChange={(e) => setLocalProps({ ...localProps, text: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
            {component.type === "heading" && (
              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select
                  value={localProps.level}
                  onChange={(e) => setLocalProps({ ...localProps, level: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                </select>
              </div>
            )}
          </div>
        );

      case "image":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={localProps.src}
                onChange={(e) => setLocalProps({ ...localProps, src: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={localProps.alt}
                onChange={(e) => setLocalProps({ ...localProps, alt: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        );

      default:
        return <div>No editor available</div>;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        absolute bg-white border-2 rounded-lg p-4 group
        ${isDragging ? 'border-blue-500 shadow-2xl z-50' : 'border-gray-200 hover:border-gray-400 shadow-md'}
        ${isEditing ? 'z-40' : ''}
      `}
      style={{
        left: `${component.position.x}px`,
        top: `${component.position.y}px`,
        minWidth: '200px',
        cursor: isDragging ? 'move' : 'default',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Controls */}
      <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          className="move-handle p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-all cursor-move"
          title="Move"
        >
          <Move className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-all"
          title="Edit"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(component.id)}
          className="p-1.5 bg-gray-100 hover:bg-red-500 hover:text-white border border-gray-300 rounded-md transition-all"
          title="Delete"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Component Type Badge */}
      <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
        {component.type}
      </div>

      {/* Render Component or Editor */}
      {isEditing ? (
        <div className="space-y-3">
          {renderEditor()}
          <button
            onClick={handleSave}
            className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Save Changes
          </button>
        </div>
      ) : (
        renderComponent()
      )}
    </div>
  );
}