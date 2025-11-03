"use client";

import { useState } from "react";
import { Play, RefreshCw } from "lucide-react";

interface WorkflowExecutionPanelProps {
  selectedWorkflowId: string;
  onExecute: (workflowId: string, inputs: Record<string, any>) => void;
  isExecuting: boolean;
  inputs: Record<string, any>;
}

export default function WorkflowExecutionPanel({
  selectedWorkflowId,
  onExecute,
  isExecuting,
  inputs
}: WorkflowExecutionPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleExecute = () => {
    onExecute(selectedWorkflowId, inputs);
  };

  if (!selectedWorkflowId) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 shadow-sm">
        <p className="text-amber-800 text-sm flex items-center">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Please select a workflow to continue
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-sm mb-4 transition-all duration-200">
      <div 
        className="p-3 border-b border-blue-200 flex justify-between items-center cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h3 className="text-sm font-medium text-blue-800 flex items-center">
          <Play className="h-4 w-4 mr-2" />
          Workflow Execution Panel
        </h3>
        <button className="text-blue-500 hover:text-blue-700">
          {collapsed ? '▼' : '▲'}
        </button>
      </div>
      
      {!collapsed && (
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-blue-800 mb-2">
              Selected workflow: <span className="font-semibold">{selectedWorkflowId}</span>
            </p>
            <p className="text-xs text-blue-600 mb-2">
              This panel allows you to execute the selected workflow with all input values collected from your UI.
            </p>
          </div>

          <button
            className="w-full bg-heat-100 hover:bg-heat-200 text-white py-3 rounded-md flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98]"
            onClick={handleExecute}
            disabled={isExecuting || !selectedWorkflowId}
          >
            {isExecuting ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Executing Workflow...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Execute Workflow
              </span>
            )}
          </button>
          
          <div className="mt-4">
            <p className="text-xs text-blue-600 mb-2 font-medium">Input Values:</p>
            <div className="max-h-32 overflow-y-auto bg-white rounded border border-blue-200 p-2 text-xs font-mono">
              <pre className="text-gray-700">{JSON.stringify(inputs, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}