"use client";

import { useCoAgentStateRender } from "@copilotkit/react-core";
import { Workflow, NodeExecutionResult } from "@/lib/workflow/types";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Download,
  FileDown,
  FileText,
  FileSpreadsheet,
  Loader2,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  generateDocument,
  downloadDocument,
  getSaveLocation,
} from "@/utils/document-export-sync";
import { FileLocationModal } from "@/components/ui/FileLocationModal";

interface WorkflowExecutionRendererProps {
  workflow: Workflow;
}

interface AgentState {
  variables: Record<string, any>;
  chatHistory: Array<{ role: string; content: string }>;
  currentNodeId: string;
  nodeResults: Record<string, NodeExecutionResult>;
  pendingAuth: any | null;
}

/**
 * Real-time workflow execution renderer using CopilotKit
 * Automatically updates UI based on LangGraph state changes
 */
export function WorkflowExecutionRenderer({
  workflow,
}: WorkflowExecutionRendererProps) {
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [downloadLocation, setDownloadLocation] = useState("");
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFormatDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle document download
  const handleDownloadResults = (
    state: AgentState,
    format: 'html' | 'docx' | 'ppt'
  ) => {
    if (!state || !state.nodeResults || Object.keys(state.nodeResults).length === 0) {
      return;
    }

    setIsDownloading(true);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const extension =
      format === "docx" ? "docx" : format === "ppt" ? "pptx" : "html";
    const filename = `workflow-results-${workflow.id}-${timestamp}.${extension}`;

    try {
      setDownloadedFormat(
        format === "docx"
          ? "Word document"
          : format === "ppt"
          ? "PowerPoint presentation"
          : "HTML document"
      );

      const docBlob = generateDocument(
        format,
        workflow.id,
        workflow.name || workflow.id,
        state.nodeResults,
        state.variables || {}
      );

      downloadDocument(docBlob, filename);
    } catch (error) {
      console.error("Error generating document:", error);
      alert(
        `Failed to generate ${format.toUpperCase()} document: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setIsDownloading(false);
      return;
    }

    setDownloadLocation(getSaveLocation());
    setShowDownloadSuccess(true);
    setShowLocationModal(true);
    setIsDownloading(false);

    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 5000);
  };

  // Render agent state in real-time as it changes
  const StateDisplay = useCoAgentStateRender<AgentState>({
    name: workflow.id,
    render: ({ state }) => {
      if (!state || !state.nodeResults || Object.keys(state.nodeResults).length === 0) {
        return null;
      }

      return (
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Workflow Execution Progress
            </h3>

            {/* Download Button with Format Options */}
            {Object.keys(state.nodeResults).length > 0 && (
              <div className="relative" ref={dropdownRef}>
                <div className="flex">
                  <button
                    onClick={() => handleDownloadResults(state, "html")}
                    disabled={isDownloading}
                    className={`flex items-center gap-1.5 px-3 py-1.5 ${
                      isDownloading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-100"
                    } text-xs font-medium rounded-l-md transition-colors`}
                    title="Download execution results as HTML document"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    {isDownloading ? "Generating..." : "Download Results"}
                  </button>
                  <button
                    onClick={() =>
                      !isDownloading && setShowFormatDropdown(!showFormatDropdown)
                    }
                    disabled={isDownloading}
                    className={`flex items-center px-2 ${
                      isDownloading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-100"
                    } text-xs rounded-r-md border-l border-blue-200 dark:border-blue-700 transition-colors`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Format Dropdown */}
                {showFormatDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        handleDownloadResults(state, "html");
                        setShowFormatDropdown(false);
                      }}
                      disabled={isDownloading}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
                    >
                      <FileText className="w-4 h-4" />
                      HTML Document
                    </button>

                    <button
                      onClick={() => {
                        handleDownloadResults(state, "docx");
                        setShowFormatDropdown(false);
                      }}
                      disabled={isDownloading}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
                    >
                      <FileDown className="w-4 h-4" />
                      Word Document (.docx)
                    </button>

                    <button
                      onClick={() => {
                        handleDownloadResults(state, "ppt");
                        setShowFormatDropdown(false);
                      }}
                      disabled={isDownloading}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-not-allowed"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      PowerPoint (.pptx)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Download Success Message */}
          {showDownloadSuccess && (
            <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  {downloadedFormat} downloaded successfully!
                </p>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  File saved to your {downloadLocation}
                </p>
              </div>
            </div>
          )}

          {/* Current Node Indicator */}
          {state.currentNodeId && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Executing:{" "}
                {workflow.nodes.find((n) => n.id === state.currentNodeId)?.data?.nodeName ||
                  state.currentNodeId}
              </span>
            </div>
          )}

          {/* Node Results */}
          <div className="space-y-2">
            {Object.entries(state.nodeResults).map(([nodeId, result]) => {
              const node = workflow.nodes.find((n) => n.id === nodeId);
              const nodeName = node?.data?.nodeName || nodeId;

              return (
                <div
                  key={nodeId}
                  className={`flex items-start gap-3 p-3 rounded-md border ${
                    result.status === "completed"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : result.status === "failed"
                      ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                      : result.status === "running"
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {/* Status Icon */}
                  <div className="mt-0.5">
                    {result.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                    {result.status === "failed" && (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                    {result.status === "running" && (
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400" />
                    )}
                    {result.status === "pending" && (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  {/* Node Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {nodeName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {result.status}
                      </span>
                    </div>

                    {/* Output Preview */}
                    {result.output && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="font-medium mb-1">Output:</div>
                        <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 max-h-32 overflow-auto">
                          <pre className="text-xs whitespace-pre-wrap break-words">
                            {typeof result.output === "string"
                              ? result.output
                              : JSON.stringify(result.output, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Error Display */}
                    {result.error && (
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        <div className="font-medium mb-1">Error:</div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                          {result.error}
                        </div>
                      </div>
                    )}

                    {/* Timing Info */}
                    {(result.startedAt || result.completedAt) && (
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        {result.startedAt && (
                          <div>
                            Started: {new Date(result.startedAt).toLocaleTimeString()}
                          </div>
                        )}
                        {result.completedAt && (
                          <div>
                            Completed: {new Date(result.completedAt).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Variables Display */}
          {state.variables && Object.keys(state.variables).length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                Workflow Variables ({Object.keys(state.variables).length})
              </summary>
              <div className="mt-2 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 max-h-64 overflow-auto">
                <pre className="text-xs">
                  {JSON.stringify(state.variables, null, 2)}
                </pre>
              </div>
            </details>
          )}

          {/* Pending Auth Display */}
          {state.pendingAuth && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Waiting for authorization...
                </span>
              </div>
              {state.pendingAuth.message && (
                <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                  {state.pendingAuth.message}
                </p>
              )}
            </div>
          )}
        </div>
      );
    },
  });

  return (
    <>
      {StateDisplay}

      {/* File Location Modal */}
      <FileLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        fileType={downloadedFormat}
        location={downloadLocation}
      />
    </>
  );
}
