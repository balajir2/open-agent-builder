// WorkflowRunnerUI.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Search, X, Save, Check, Download, ChevronDown,
  FileText, FileDown, Loader, CheckCircle,
  Play, AlertCircle
} from "lucide-react";
import {
  generateDocumentFromResults,
  downloadDocument,
  getDocumentSaveLocation
} from '@/utils/document-export';
import { FileLocationModal } from '@/components/ui/FileLocationModal';

import { useRouter, useSearchParams } from "next/navigation";

// Type definitions for input requirements and validation
interface InputRequirement {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  options?: string[];
}

interface InputValidation {
  isValid: boolean;
  message: string;
}

export default function WorkflowRunnerUI() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Core state
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
  const [workflowResponses, setWorkflowResponses] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [inputFields, setInputFields] = useState<Record<string, string>>({});
  const [workflowDetails, setWorkflowDetails] = useState<any>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [downloadLocation, setDownloadLocation] = useState("");
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [inputValidation, setInputValidation] = useState<Record<string, InputValidation>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedInputPresets, setSavedInputPresets] = useState<Record<string, Record<string, string>>>({});
  const [currentPresetName, setCurrentPresetName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formatDropdownRef = useRef<HTMLDivElement>(null);

  // NOTE: removed allWorkflows/searchTerm/workflows since page expects workflowid in URL

  // If URL contains ?workflowid=..., preselect it on mount / when searchParams available
  useEffect(() => {
    try {
      const paramId = searchParams?.get("workflowid");
      if (paramId) {
        setSelectedWorkflowId(paramId);
      } else {
        setSelectedWorkflowId("");
      }
    } catch (e) {
      console.warn("Failed to read workflowid from URL", e);
    }
  }, [searchParams]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formatDropdownRef.current && !formatDropdownRef.current.contains(event.target as Node)) {
        setShowFormatDropdown(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // reserved for future
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFormatDropdown]);

  // Load saved input presets from localStorage
  useEffect(() => {
    const savedPresets = localStorage.getItem('workflowInputPresets');
    if (savedPresets) {
      try {
        setSavedInputPresets(JSON.parse(savedPresets));
      } catch (error) {
        console.error('Failed to parse saved presets:', error);
      }
    }
  }, []);

  // Fetch workflow details when selectedWorkflowId set (populated from URL)
  useEffect(() => {
    if (!selectedWorkflowId) return;

    const fetchWorkflowDetails = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching details for workflow ID:", selectedWorkflowId);
        const res = await fetch(`/api/workflows/${selectedWorkflowId}/getWorkflowDetails`);
        if (!res.ok) throw new Error(`Failed to fetch workflow details: ${res.status}`);
        const data = await res.json();

        if (data) {
          setWorkflowDetails(data);

          // Initialize empty fields for all required inputs
          const inputs = Array.isArray(data.requiredInputs) ? data.requiredInputs : [];
          const initialInputs: Record<string, string> = {};
          inputs.forEach((i) => (initialInputs[i.name] = i.defaultValue || ""));
          setInputFields(initialInputs);
        }
      } catch (err) {
        console.error("Failed to load workflow details:", err);
        setWorkflowDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflowDetails();
  }, [selectedWorkflowId]);

  // Handle input change with validation
  const handleInputChange = (field: string, value: string) => {
    setInputFields(prev => ({
      ...prev,
      [field]: value
    }));
    validateField(field, value);
  };

  // Validate a single field
  const validateField = (field: string, value: string) => {
    if (!workflowDetails?.requiredInputs || !Array.isArray(workflowDetails.requiredInputs)) return;

    const inputRequirement = workflowDetails.requiredInputs.find(
      (input: InputRequirement) => input.name === field
    );

    if (!inputRequirement) return;

    let isValid = true;
    let message = "";

    if (inputRequirement.required && !value.trim()) {
      isValid = false;
      message = "This field is required";
    } else if (inputRequirement.type === "number") {
      const num = Number(value);
      if (isNaN(num)) {
        isValid = false;
        message = "Please enter a valid number";
      }
    } else if (inputRequirement.type === "select" && inputRequirement.options) {
      if (value && !inputRequirement.options.includes(value)) {
        isValid = false;
        message = "Please select a valid option";
      }
    }

    setInputValidation(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));
  };

  // Validate all fields
  const validateAllFields = (): boolean => {
    if (!workflowDetails?.requiredInputs || !Array.isArray(workflowDetails.requiredInputs)) return true;

    let allValid = true;
    const newValidation: Record<string, InputValidation> = {};

    workflowDetails.requiredInputs.forEach((input: InputRequirement) => {
      const value = inputFields[input.name] || "";

      let isValid = true;
      let message = "";

      if (input.required && !value.trim()) {
        isValid = false;
        message = "This field is required";
        allValid = false;
      } else if (input.type === "number" && value) {
        const num = Number(value);
        if (isNaN(num)) {
          isValid = false;
          message = "Please enter a valid number";
          allValid = false;
        }
      } else if (input.type === "select" && input.options && value) {
        if (!input.options.includes(value)) {
          isValid = false;
          message = "Please select a valid option";
          allValid = false;
        }
      }

      newValidation[input.name] = { isValid, message };
    });

    setInputValidation(newValidation);
    return allValid;
  };

  // Load a saved preset
  const loadPreset = (presetName: string) => {
    if (selectedWorkflowId && savedInputPresets && typeof savedInputPresets === 'object' && savedInputPresets[selectedWorkflowId]) {
      const presets = savedInputPresets[selectedWorkflowId];
      if (presetName in presets) {
        const preset = presets[presetName];
        if (preset && typeof preset === 'object' && !Array.isArray(preset) && preset !== null) {
          setInputFields(preset);
          setCurrentPresetName(presetName);
          setTimeout(() => {
            validateAllFields();
          }, 0);
        } else {
          console.error("Invalid preset format:", preset);
        }
      } else {
        console.error("Preset not found:", presetName);
      }
    } else {
      console.error("Cannot load preset - workflow or preset data missing");
    }
  };

  // Save current inputs as a preset
  const saveCurrentInputs = (presetName: string) => {
    if (!presetName.trim() || !selectedWorkflowId) return;

    try {
      const currentInputs = { ...inputFields };
      const currentPresets = savedInputPresets || {};
      const workflowPresets = currentPresets[selectedWorkflowId] || {};

      const updatedPresets = {
        ...currentPresets,
        [selectedWorkflowId]: {
          ...workflowPresets,
          [presetName]: currentInputs
        }
      };

      setSavedInputPresets(updatedPresets as Record<string, Record<string, string>>);
      localStorage.setItem('workflowInputPresets', JSON.stringify(updatedPresets));
      setShowSaveModal(false);
      setCurrentPresetName(presetName);
    } catch (error) {
      console.error('Error saving preset:', error);
    }
  };

  // Delete a saved preset
  const deletePreset = (presetName: string) => {
    if (!selectedWorkflowId || !savedInputPresets[selectedWorkflowId]) return;

    const workflowPresets = { ...savedInputPresets[selectedWorkflowId] };
    delete workflowPresets[presetName];

    const updatedPresets = {
      ...savedInputPresets,
      [selectedWorkflowId]: workflowPresets
    };

    setSavedInputPresets(updatedPresets);
    localStorage.setItem('workflowInputPresets', JSON.stringify(updatedPresets));

    if (currentPresetName === presetName) {
      setCurrentPresetName("");
    }
  };

  // Execute the selected workflow with the provided inputs
  const handleRunWorkflow = async () => {
    if (!selectedWorkflowId) {
      alert("Please provide a workflow id in the URL (workflowid query param).");
      return;
    }

    if (!validateAllFields()) {
      alert("Please fix the validation errors before running the workflow");
      return;
    }

    setIsExecuting(true);
    setWorkflowResponses([]);

    try {
      const response = await fetch(`/api/workflows/${selectedWorkflowId}/execute-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputFields),
      });

      if (!response.ok) {
        let errorText = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData?.error) errorText = errorData.error;
        } catch (e) {
          try {
            const errorDetail = await response.text();
            if (errorDetail) errorText += `: ${errorDetail}`;
          } catch {}
        }
        throw new Error(errorText);
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
              try {
                const event = eventMatch[1];
                const data = JSON.parse(dataMatch[1]);

                const responseData = {
                  event,
                  data,
                  timestamp: data.timestamp || new Date().toISOString(),
                };

                setWorkflowResponses((prev) => [...prev, responseData]);
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
                setWorkflowResponses((prev) => [...prev, {
                  event: 'error',
                  data: { error: 'Failed to parse server response' },
                  timestamp: new Date().toISOString(),
                }]);
              }
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
    }
  };

  // Extract workflow data from responses for download
  const getWorkflowData = () => {
    let workflowId = selectedWorkflowId || "workflow";
    let workflowName = workflowDetails?.name || "Workflow Execution";
    let nodeResults: Record<string, any> = {};
    let variables: Record<string, any> = {};

    const workflowStarted = workflowResponses.find(r => r.event === "workflow_started");
    if (workflowStarted) {
      workflowId = workflowStarted.data.workflowId || workflowId;
      workflowName = workflowStarted.data.workflowName || workflowName;
    }

    workflowResponses.forEach(response => {
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

    const stateUpdates = workflowResponses.filter(r => r.event === "state_update");
    if (stateUpdates.length > 0) {
      const latestState = stateUpdates[stateUpdates.length - 1];
      variables = latestState.data.variables || {};
    }

    return { workflowId, workflowName, nodeResults, variables };
  };

  // Handle document download
  const handleDownloadResults = async (format: 'html' | 'docx' | 'ppt') => {
    if (workflowResponses.length === 0) return;

    setIsDownloading(true);

    const { workflowId, workflowName, nodeResults, variables } = getWorkflowData();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    let extension = format === 'docx' ? 'docx' : format === 'ppt' ? 'pptx' : 'html';
    const filename = `workflow-results-${workflowId}-${timestamp}.${extension}`;

    try {
      setDownloadedFormat(format === 'docx' ? 'Word document' : format === 'ppt' ? 'PowerPoint presentation' : 'HTML document');

      const docBlob = await generateDocumentFromResults(format, workflowId, workflowName, nodeResults, variables);
      downloadDocument(docBlob, filename);
    } catch (error) {
      console.error('Error generating document:', error);
      alert(`Failed to generate ${format.toUpperCase()} document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
    }

    setDownloadLocation(getDocumentSaveLocation());
    setShowDownloadSuccess(true);
    setShowLocationModal(true);
    setTimeout(() => setShowDownloadSuccess(false), 5000);
  };

  // Debug logging
  useEffect(() => {
    console.log('Current workflow details:', workflowDetails);
    console.log('Current input fields:', inputFields);
  }, [workflowDetails, inputFields]);

  // If no workflow id provided in URL, show a friendly message (you can change to redirect)
  if (!selectedWorkflowId) {
    return (
      <div className="flex items-center justify-center h-screen p-6">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No workflow selected</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            This page expects a workflow id in the URL. Please open this page with a valid query param like:
            <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-600">
              <code>/workflow-runner?workflowid=workflow_1762276839721</code>
            </div>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 px-32 sm:px-64 lg:px-128"
      style={{
        backgroundImage: `url('wave-blue.svg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',       // try 'contain' or 'auto 100%' if needed
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="flex-1 w-full h-full overflow-hidden py-4">
        {/* --- UPDATED PANELS: gradient backgrounds (accent bars removed) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
          {/* LEFT PANEL - Workflow Runner */}
          <div className="col-span-1 lg:col-span-2 relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-indigo-100">
            {/* background gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(238,242,255,0.9) 0%, rgba(241,238,255,0.75) 50%, rgba(249,250,255,0.6) 100%)",
              }}
            ></div>

            {/* content */}
            <div className="relative z-10 flex flex-col h-full backdrop-blur-sm">
              {/* HEADER */}
              <div className="p-6 border-b border-gray-200 
                              bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200
                              flex items-center justify-between rounded-t-lg shadow-sm">
                <h2 className="text-xl font-semibold tracking-tight text-slate-800 flex items-center drop-shadow-sm">
                  <Play className="w-6 h-6 mr-3 text-indigo-600" />
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    Flow Executor
                  </span>
                </h2>
              </div>

              {/* BODY */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Play className="w-5 h-5 text-indigo-600" />
                    {workflowDetails?.name || selectedWorkflowId}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Provide the required inputs below and click{" "}
                    <strong>Run Workflow</strong> to execute.
                  </p>
                </div>

                {/* Workflow Inputs */}
                {workflowDetails && (
                  <div className="mb-6 bg-white/90 rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h3 className="text-md font-medium mb-4 text-gray-700 flex items-center">
                      <span className="mr-2">Required Inputs</span>
                      {workflowDetails.name && (
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                          {workflowDetails.name}
                        </span>
                      )}
                    </h3>

                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                        <p className="mt-2 text-sm text-gray-500">Loading input fields...</p>
                      </div>
                    ) : workflowDetails.requiredInputs &&
                      Array.isArray(workflowDetails.requiredInputs) &&
                      workflowDetails.requiredInputs.length > 0 ? (
                      <div className="space-y-6">
                        {workflowDetails.requiredInputs.map((input: InputRequirement) => (
                          <div
                            key={input.name}
                            className="bg-gray-50/70 p-4 rounded-md border border-gray-200"
                          >
                            <div className="flex justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                {input.name}{" "}
                                {input.required && <span className="text-red-500">*</span>}
                              </label>
                              {inputValidation[input.name] &&
                                !inputValidation[input.name].isValid && (
                                  <span className="text-xs text-red-500">
                                    {inputValidation[input.name].message}
                                  </span>
                                )}
                            </div>

                            {input.type === "select" && input.options ? (
                              <select
                                value={inputFields[input.name] || ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                  inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300"
                                }`}
                              >
                                <option value="">-- Select an option --</option>
                                {input.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : input.type === "number" ? (
                              <input
                                type="number"
                                value={inputFields[input.name] || ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                placeholder={input.description}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                  inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300"
                                }`}
                              />
                            ) : input.type === "textarea" ? (
                              <textarea
                                value={inputFields[input.name] || ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                placeholder={input.description}
                                rows={4}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                  inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300"
                                }`}
                              />
                            ) : (
                              <input
                                type="text"
                                value={inputFields[input.name] || ""}
                                onChange={(e) =>
                                  handleInputChange(input.name, e.target.value)
                                }
                                placeholder={input.description}
                                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                  inputValidation[input.name] &&
                                  !inputValidation[input.name].isValid
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-yellow-50 rounded-md border border-yellow-200">
                        <AlertCircle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-yellow-700">
                          This workflow doesn’t define specific inputs.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Run Button */}
                <button
                  onClick={handleRunWorkflow}
                  disabled={isExecuting || !selectedWorkflowId}
                  className={`w-full py-3 px-4 rounded-xl font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-2 duration-300
                    ${selectedWorkflowId
                      ? 'bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.5)] hover:brightness-110 active:scale-95'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                    relative overflow-hidden`}
                >
                  {isExecuting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Running Workflow...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Run Workflow</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Workflow Results */}
          <div className="col-span-1 lg:col-span-3 relative rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-indigo-100">
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(180deg, rgba(237,237,255,0.85) 0%, rgba(241,238,255,0.75) 60%, rgba(250,249,255,0.7) 100%)",
              }}
            ></div>

            <div className="relative z-10 flex flex-col h-full backdrop-blur-sm">
              <div className="p-6 border-b border-gray-200
                              bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200
                              flex items-center justify-between rounded-t-lg shadow-sm">
                <h2 className="text-xl font-semibold tracking-tight text-slate-800 flex items-center drop-shadow-sm">
                  <CheckCircle className="w-6 h-6 mr-3 text-indigo-600" />
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    Results
                  </span>
                </h2>

                {/* DOWNLOAD BUTTON (top-right of Results header) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadResults('docx')}
                    disabled={workflowResponses.length === 0 || isDownloading}
                    title={workflowResponses.length === 0 ? "No results to download" : "Download results as .docx"}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all focus:outline-none
                      ${workflowResponses.length > 0 && !isDownloading
                        ? 'bg-indigo-700 text-white shadow-sm hover:brightness-105 active:scale-95'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-hidden">
                {/* Download Success Message */}
                {showDownloadSuccess && (
                  <div className="flex items-start gap-2 p-3 mb-4 bg-green-50 rounded-md border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        {downloadedFormat} downloaded successfully!
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        File saved to your {downloadLocation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Results Display - Only Show Final Output */}
                {workflowResponses.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8">
                    <div className="p-8 rounded-full bg-indigo-50 mb-6">
                      <AlertCircle className="w-14 h-14 text-indigo-400" />
                    </div>
                    <p className="text-xl font-medium mb-3 text-gray-700">No Results Yet</p>
                    <p className="text-sm text-center max-w-md text-gray-500">
                      Provide inputs and click "Run Workflow" to see the final result here.
                    </p>
                  </div>
                ) : (
                  <div>
                    {isExecuting ? (
                      <div className="flex items-center justify-center h-full py-10 text-indigo-600">
                        <div className="flex flex-col items-center bg-indigo-50 p-8 rounded-lg shadow-inner">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-indigo-200 opacity-30 animate-ping"></div>
                            <Loader className="w-16 h-16 animate-spin relative z-10 text-indigo-600" />
                          </div>
                          <p className="text-xl font-medium mt-6 text-indigo-700">Executing Workflow...</p>
                          <p className="text-sm text-indigo-600 mt-2">Please wait while your workflow is running</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {getFinalWorkflowResult(workflowResponses)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* --- END UPDATED PANELS --- */}
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

// Helper functions (getFinalWorkflowResult, formatOutput, getEventIcon, getResponseCardStyle, formatResponseData)
// ... keep these helper functions from your original file (unchanged) ...

// Extract the final result from workflow responses
const getFinalWorkflowResult = (responses: any[]) => {
  const completedEvent = responses.find(r => r.event === "workflow_completed");

  if (!completedEvent) {
    const nodeCompletedEvents = responses.filter(r => r.event === "node_completed");
    const lastNodeCompleted = nodeCompletedEvents[nodeCompletedEvents.length - 1];
    const errorEvent = responses.find(r => r.event === "error" || r.event === "node_failed");

    if (errorEvent) {
      return (
        <div className="p-6 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Workflow Error</h3>
              <p className="text-sm text-red-700">
                {errorEvent.data.error || "An error occurred during workflow execution"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (lastNodeCompleted && lastNodeCompleted.data.result?.output) {
      return formatOutput(lastNodeCompleted.data.result.output);
    }

    return (
      <div className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-500 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">No Final Result</h3>
            <p className="text-sm text-yellow-700">
              The workflow ran but did not produce a final output.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const results = completedEvent.data.results || {};
  const nodeIds = Object.keys(results);

  const finalNodeIds = nodeIds.filter(id => {
    const nodeName = (results[id].nodeName || id).toLowerCase();
    return nodeName.includes('output') ||
      nodeName.includes('final') ||
      nodeName.includes('result') ||
      nodeName.includes('text') ||
      nodeName.includes('content');
  });

  for (const nodeId of finalNodeIds) {
    const nodeOutput = results[nodeId].output;
    if (nodeOutput && typeof nodeOutput === 'string') {
      return formatOutput(nodeOutput);
    }
  }

  for (const nodeId of nodeIds) {
    const nodeOutput = results[nodeId].output;
    if (nodeOutput && typeof nodeOutput === 'string') {
      return formatOutput(nodeOutput);
    }
  }

  const lastNodeId = nodeIds[nodeIds.length - 1];
  if (lastNodeId && results[lastNodeId].output) {
    return formatOutput(results[lastNodeId].output);
  }

  if (completedEvent.data.variables) {
    const variables = completedEvent.data.variables;
    const outputVarName = Object.keys(variables).find(name =>
      name.toLowerCase().includes('output') ||
      name.toLowerCase().includes('result') ||
      name.toLowerCase().includes('final')
    );

    if (outputVarName && variables[outputVarName]) {
      return formatOutput(variables[outputVarName]);
    }

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Workflow Complete</h3>
            <div className="bg-white rounded-md p-4 border border-blue-100 overflow-auto">
              <pre className="text-sm">{JSON.stringify(variables, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border border-green-200 rounded-lg bg-green-50">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-green-800 mb-2">Workflow Completed Successfully</h3>
          <p className="text-sm text-green-700">
            The workflow has completed, but no specific output format was detected.
          </p>
        </div>
      </div>
    </div>
  );
};

const formatOutput = (output: any) => {
  const displayAsText = (content: any): string => {
    if (typeof content === 'string') return content;
    if (typeof content === 'object') {
      if (content.text) return content.text;
      if (content.output) return displayAsText(content.output);
      if (content.result) return displayAsText(content.result);
      if (content.content) return displayAsText(content.content);
      if (content.message) return displayAsText(content.message);
      if (Array.isArray(content)) {
        return content.map(item => displayAsText(item)).join('\n\n');
      }
      try {
        return JSON.stringify(content, null, 2);
      } catch (e) {
        return String(content);
      }
    }
    return String(content);
  };

  if (output === null || output === undefined) {
    return (
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
        <p className="text-gray-500">No output data</p>
      </div>
    );
  }

  if (typeof output === 'string' && output.trim().startsWith('<') && output.includes('</')) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-blue-800 mb-2">HTML Result</h3>
            <div className="bg-white rounded-md p-4 border border-blue-100 overflow-auto">
              <iframe
                srcDoc={output}
                className="w-full h-[400px] border-0"
                title="Result Preview"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const resultText = displayAsText(output);

  function formatTextToHTML(text: string): string {
    if (!text) return "";

    let html = text.trim();

    html = html.replace(
      /<(?!\/?(?:b|strong|i|em|u|p|br|h1|h2|h3|h4|h5|h6|ul|ol|li|table|thead|tbody|tr|th|td|pre|code|hr)\b)[^>]*>/gi,
      (match) => match.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    );

    html = html.replace(
      /((?:\|.+\|\n)+)/g,
      (tableBlock) => {
        const lines = tableBlock
          .trim()
          .split("\n")
          .filter((l) => l.trim().startsWith("|") && l.includes("|"));

        if (lines.length < 2) return tableBlock;

        const headerCells = lines[0]
          .split("|")
          .slice(1, -1)
          .map((cell) => `<th>${cell.trim()}</th>`)
          .join("");

        const rows = lines
          .slice(2)
          .map((line) => {
            const cells = line
              .split("|")
              .slice(1, -1)
              .map((cell) => `<td>${cell.trim()}</td>`)
              .join("");
            return `<tr>${cells}</tr>`;
          })
          .join("");

        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`;
      }
    );

    html = html.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
    html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    html = html.replace(/\n{2,}/g, "</p><p>");
    html = html.replace(/\n/g, "<br/>");

    if (!/^<\s*(h\d|table|ul|ol|pre|p|code|blockquote)/i.test(html.trim())) {
      html = `<p>${html}</p>`;
    }

    html = html.replace(/<p><\/p>/g, "");

    return html;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
        <div className="flex-1">
          <div className="bg-white p-5 rounded-md border border-blue-100 h-[calc(100vh-80px)] overflow-y-auto">
            <div
              className="prose max-w-none text-gray-800 leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 
                      [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-2 
                      [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-2 [&_h3]:mb-1"
              dangerouslySetInnerHTML={{ __html: formatTextToHTML(resultText || "") }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon + formatting functions
function getEventIcon(event: string) {
  switch (event) {
    case "workflow_started":
      return <Loader className="w-5 h-5 text-blue-500" />;
    case "node_started":
      return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
    case "node_completed":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "node_failed":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "workflow_completed":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
}

function getResponseCardStyle(event: string) {
  switch (event) {
    case "workflow_started":
      return "bg-blue-50 border-blue-200";
    case "node_started":
      return "bg-blue-50 border-blue-200";
    case "node_completed":
      return "bg-green-50 border-green-200";
    case "node_failed":
      return "bg-red-50 border-red-200";
    case "workflow_completed":
      return "bg-green-50 border-green-200";
    case "error":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

function formatResponseData(event: string, data: any) {
  switch (event) {
    case "workflow_started":
      return (
        <div>
          <p className="font-medium">{data.workflowName}</p>
          <p className="text-xs text-gray-500 mt-1 italic">
            {data.totalNodes} nodes to execute
          </p>
        </div>
      );

    case "node_started":
      return (
        <div>
          <p className="font-medium">{data.nodeName}</p>
          <p className="text-xs text-gray-500 mt-1">Type: {data.nodeType}</p>
        </div>
      );

    case "node_completed":
      return (
        <div>
          <p className="font-medium">{data.nodeName}</p>
          {data.result?.output && (
            <p className="text-xs mt-2 bg-white rounded-md p-3 max-h-40 overflow-auto border border-gray-100">
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
          <p className="text-xs text-red-500 mt-1">{data.error}</p>
        </div>
      );

    case "workflow_completed":
      return (
        <div>
          <p className="font-medium">Workflow Completed</p>
          <p className="text-xs text-gray-500 mt-1">Status: {data.status}</p>
          {data.results && Object.keys(data.results).length > 0 && (
            <details className="mt-2">
              <summary className="text-xs cursor-pointer hover:text-blue-600">
                View all results ({Object.keys(data.results).length} nodes)
              </summary>
              <pre className="text-xs mt-2 bg-gray-50 rounded-md p-3 max-h-60 overflow-auto border border-gray-100">
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
          <p className="text-xs mt-1">{data.error}</p>
        </div>
      );

    default:
      return (
        <pre className="text-xs bg-gray-50 rounded-md p-3 max-h-40 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
  }
}
