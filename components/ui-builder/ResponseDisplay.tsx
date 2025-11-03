"use client";

import { useEffect, useRef, useState } from "react";
import { WorkflowResponse } from "./UIBuilderCanvas";
import { CheckCircle, XCircle, Clock, AlertCircle, Loader, Download, ChevronDown, FileText, FileDown } from "lucide-react";
import { generateDocumentFromResults, downloadDocument, getDocumentSaveLocation } from '@/utils/document-export';
import { FileLocationModal } from '@/components/ui/FileLocationModal';

interface ResponseDisplayProps {
  responses: WorkflowResponse[];
  isExecuting: boolean;
}

export default function ResponseDisplay({ responses, isExecuting }: ResponseDisplayProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
    const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [downloadLocation, setDownloadLocation] = useState("");
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFormatDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Function to extract workflow data from responses
  const getWorkflowData = () => {
    let workflowId = "workflow";
    let workflowName = "Workflow Execution";
    let nodeResults: Record<string, any> = {};
    let variables: Record<string, any> = {};
    
    // Find workflow info
    const workflowStarted = responses.find(r => r.event === "workflow_started");
    if (workflowStarted) {
      workflowId = workflowStarted.data.workflowId || workflowId;
      workflowName = workflowStarted.data.workflowName || workflowName;
    }
    
    // Collect node results
    responses.forEach(response => {
      if (response.event === "node_completed" || response.event === "node_failed") {
        const nodeId = response.data.nodeId;
        const nodeName = response.data.nodeName;
        nodeResults[nodeId] = {
          nodeName,
          status: response.event === "node_completed" ? "completed" : "failed",
          output: response.data.result?.output || null,
          error: response.data.error || null,
          startedAt: response.data.startedAt || response.timestamp,
          completedAt: response.timestamp
        };
      }
    });
    
    // Get variables from the latest state update
    const stateUpdates = responses.filter(r => r.event === "state_update");
    if (stateUpdates.length > 0) {
      const latestState = stateUpdates[stateUpdates.length - 1];
      variables = latestState.data.variables || {};
    }
    
    // If there's a workflow_completed event, check for variables there too
    const workflowCompleted = responses.find(r => r.event === "workflow_completed");
    if (workflowCompleted && workflowCompleted.data.variables) {
      variables = { ...variables, ...workflowCompleted.data.variables };
    }
    
    return {
      workflowId,
      workflowName,
      nodeResults,
      variables
    };
  };
  
    // Function to handle document download
    const handleDownloadResults = async (format: 'html' | 'docx' | 'ppt') => {
    if (responses.length === 0) {
      return;
    }
    
    // Set downloading state
    setIsDownloading(true);
    
    const { workflowId, workflowName, nodeResults, variables } = getWorkflowData();
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let extension;
    if (format === 'docx') extension = 'docx';
    else if (format === 'ppt') extension = 'pptx';
    else extension = 'html';
    
    const filename = `workflow-results-${workflowId}-${timestamp}.${extension}`;
    
    try {
      // Set the format for success messages
      setDownloadedFormat(format === 'docx' 
        ? 'Word document' 
        : format === 'ppt' 
          ? 'PowerPoint presentation' 
          : 'HTML document');
      
      // Generate the document
      const docBlob = await generateDocumentFromResults(
        format,
        workflowId,
        workflowName,
        nodeResults,
        variables
      );
      
      // Download the document
      downloadDocument(docBlob, filename);
    } catch (error) {
      console.error('Error generating document:', error);
      alert(`Failed to generate ${format.toUpperCase()} document: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsDownloading(false);
      return;
    }
    
    // Reset downloading state
    setIsDownloading(false);
    
    // Show success message and save location
    setDownloadLocation(getDocumentSaveLocation());
    setShowDownloadSuccess(true);
    setShowLocationModal(true);
    
    // Hide success message after some time
    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 5000);
  };

  // Auto-scroll to bottom when new responses arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  const getEventIcon = (event: string) => {
    switch (event) {
      case "workflow_started":
        return <Clock className="w-16 h-16 text-blue-500" />;
      case "node_started":
        return <Loader className="w-16 h-16 text-blue-500 animate-spin" />;
      case "node_completed":
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case "node_failed":
        return <XCircle className="w-16 h-16 text-red-500" />;
      case "workflow_completed":
        return <CheckCircle className="w-16 h-16 text-green-600" />;
      case "error":
        return <XCircle className="w-16 h-16 text-red-600" />;
      case "state_update":
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      default:
        return <AlertCircle className="w-16 h-16 text-gray-500" />;
    }
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case "workflow_started":
        return "bg-blue-500/10 border-blue-500/20";
      case "node_started":
        return "bg-blue-500/10 border-blue-500/20";
      case "node_completed":
        return "bg-green-500/10 border-green-500/20";
      case "node_failed":
        return "bg-red-500/10 border-red-500/20";
      case "workflow_completed":
        return "bg-green-600/10 border-green-600/20";
      case "error":
        return "bg-red-600/10 border-red-600/20";
      case "state_update":
        return "bg-yellow-500/10 border-yellow-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20";
    }
  };

  const formatEventData = (event: string, data: any) => {
    switch (event) {
      case "workflow_started":
        return (
          <div>
            <p className="font-medium">{data.workflowName}</p>
            <p className="text-xs text-text-secondary mt-4">
              {data.totalNodes} nodes to execute
            </p>
          </div>
        );

      case "node_started":
        return (
          <div>
            <p className="font-medium">{data.nodeName}</p>
            <p className="text-xs text-text-secondary mt-4">Type: {data.nodeType}</p>
          </div>
        );

      case "node_completed":
        return (
          <div>
            <p className="font-medium">{data.nodeName}</p>
            {data.result?.output && (
              <p className="text-xs mt-4 bg-background-base rounded-6 p-8 max-h-100 overflow-auto">
                {typeof data.result.output === "string"
                  ? data.result.output
                  : JSON.stringify(data.result.output, null, 2)}
              </p>
            )}
          </div>
        );

      case "node_failed":
        return (
          <div>
            <p className="font-medium">{data.nodeName}</p>
            <p className="text-xs text-red-500 mt-4">{data.error}</p>
          </div>
        );

      case "workflow_completed":
        return (
          <div>
            <p className="font-medium">Workflow Completed</p>
            <p className="text-xs text-text-secondary mt-4">Status: {data.status}</p>
            {data.results && Object.keys(data.results).length > 0 && (
              <details className="mt-8">
                <summary className="text-xs cursor-pointer hover:text-heat-100">
                  View all results ({Object.keys(data.results).length} nodes)
                </summary>
                <pre className="text-xs mt-4 bg-background-base rounded-6 p-8 max-h-200 overflow-auto">
                  {JSON.stringify(data.results, null, 2)}
                </pre>
              </details>
            )}
          </div>
        );

      case "error":
        return (
          <div>
            <p className="font-medium text-red-500">Error Occurred</p>
            <p className="text-xs mt-4">{data.error}</p>
          </div>
        );

      case "state_update":
        return (
          <div>
            <p className="font-medium">State Updated</p>
            <p className="text-xs text-text-secondary mt-4">
              Current Node: {data.currentNodeId}
            </p>
          </div>
        );

      default:
        return (
          <pre className="text-xs bg-background-base rounded-6 p-8 max-h-100 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
            {/* Header */}
      <div className="p-16 border-b border-border-faint">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Workflow Response</h3>
          
                    {/* Download Button with Format Options */}
          {responses.length > 0 && !isExecuting && (
            <div className="relative" ref={dropdownRef}>
              <div className="flex">
                <button
                  onClick={() => handleDownloadResults('html')}
                  disabled={isDownloading}
                  className={`flex items-center gap-1.5 px-3 py-1.5 ${isDownloading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-100'} 
                  text-xs font-medium rounded-l-md transition-colors`}
                  title="Download execution results as HTML document"
                >
                  {isDownloading 
                    ? <Loader className="w-3.5 h-3.5 animate-spin" /> 
                    : <Download className="w-3.5 h-3.5" />
                  }
                  {isDownloading ? 'Generating...' : 'Download Results'}
                </button>
                <button 
                  onClick={() => !isDownloading && setShowFormatDropdown(!showFormatDropdown)}
                  disabled={isDownloading}
                  className={`flex items-center px-2 ${isDownloading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-700 dark:text-blue-100'}
                  text-xs rounded-r-md border-l border-blue-200 dark:border-blue-700 transition-colors`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Format Dropdown */}
              {showFormatDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      handleDownloadResults('html');
                      setShowFormatDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FileText className="w-4 h-4" />
                    HTML Document
                  </button>
                                    <button
                    onClick={() => {
                      handleDownloadResults('docx');
                      setShowFormatDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FileDown className="w-4 h-4" />
                    Word Document (.docx)
                  </button>
                  
                  <button
                    onClick={() => {
                      handleDownloadResults('ppt');
                      setShowFormatDropdown(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {/* <FilePresentation className="w-4 h-4" /> */}
                    PowerPoint (.pptx)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Status Info */}
        <p className="text-xs text-text-secondary">
          {isExecuting ? (
            <span className="flex items-center gap-4 text-blue-500">
              <Loader className="w-12 h-12 animate-spin" />
              Executing workflow...
            </span>
          ) : responses.length > 0 ? (
            `${responses.length} events received`
          ) : (
            "No responses yet. Click a button to execute."
          )}
        </p>
        
        {/* Download Success Message */}
        {showDownloadSuccess && (
          <div className="flex items-start gap-2 p-3 mt-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
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
      </div>

      {/* Response List */}
      <div className="flex-1 overflow-auto p-16 space-y-12">
        {responses.length === 0 && !isExecuting && (
          <div className="flex items-center justify-center h-full text-center text-text-secondary">
            <div>
              <AlertCircle className="w-48 h-48 mx-auto mb-12 opacity-50" />
              <p>Workflow responses will appear here</p>
            </div>
          </div>
        )}

        {responses.map((response, index) => (
          <div
            key={index}
            className={`border rounded-8 p-12 ${getEventColor(response.event)}`}
          >
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0 mt-2">{getEventIcon(response.event)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {response.event.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {new Date(response.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {formatEventData(response.event, response.data)}
              </div>
            </div>
          </div>
        ))}

                <div ref={bottomRef} />
      </div>
      
      {/* File Location Modal */}
      <FileLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        fileType={downloadedFormat}
        location={downloadLocation}
      />
    </div>
  );
}
