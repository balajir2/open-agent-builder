"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { Node } from "@xyflow/react";
import { llmProviders } from "@/lib/config/llm-config";

interface ExtractNodePanelProps {
  node: Node | null;
  nodes: Node[];
  onUpdate: (nodeId: string, updates: any) => void;
  onClose: () => void;
  onDelete: (nodeId: string) => void;
}

export default function ExtractNodePanel({
  node,
  nodes,
  onUpdate,
  onClose,
  onDelete,
}: ExtractNodePanelProps) {
  const nodeData = node?.data as any;
  const [instructions, setInstructions] = useState(nodeData?.instructions || 'Extract information from the input');
  const [model, setModel] = useState(nodeData?.model || llmProviders[0]?.defaultModel || 'openai/gpt-4o');
  const [customModel, setCustomModel] = useState('');
  const [jsonSchema, setJsonSchema] = useState(
    nodeData?.jsonSchema || JSON.stringify({
      type: "object",
      properties: {
        title: { type: "string", description: "The title" },
        summary: { type: "string", description: "A brief summary" },
      },
      required: ["title"]
    }, null, 2)
  );
  const [schemaError, setSchemaError] = useState('');
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Validate JSON schema
  useEffect(() => {
    try {
      JSON.parse(jsonSchema);
      setSchemaError('');
    } catch (e) {
      setSchemaError('Invalid JSON');
    }
  }, [jsonSchema]);

  // Debounced update to prevent infinite loops
  useEffect(() => {
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Debounce the update
    updateTimeoutRef.current = setTimeout(() => {
      onUpdate(nodeData?.id, {
        instructions,
        model,
        jsonSchema,
        nodeType: 'extract',
      });
    }, 300); // 300ms debounce

    // Cleanup on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [instructions, model, jsonSchema, nodeData?.id]); // Remove onUpdate from deps to prevent loop

  return (
    <AnimatePresence>
      {node && (
        <motion.aside
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-20 top-80 h-[calc(100vh-100px)] w-[calc(100vw-240px)] max-w-480 bg-accent-white border border-border-faint shadow-lg overflow-hidden z-50 rounded-16 flex flex-col"
        >
          {/* Header */}
          <div className="p-20 border-b border-border-faint flex-shrink-0">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-title-h3 text-accent-black">Extract (Schema)</h2>
              <div className="flex items-center gap-8">
                <button
                  onClick={() => onDelete(node.id)}
                  className="w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center group"
                  title="Delete node"
                >
                  <svg className="w-16 h-16 text-black-alpha-48 group-hover:text-black-alpha-64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center"
                >
                  <svg className="w-16 h-16 text-black-alpha-48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-body-small text-black-alpha-48 mt-4">
              Use LLM to extract structured data with a JSON schema
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-20 space-y-24">
            {/* Instructions */}
            <div>
              <label className="block text-label-small text-black-alpha-48 mb-8">
                Extraction Instructions
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="What information should be extracted?"
                rows={4}
                className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors resize-none"
              />
              <p className="text-body-small text-black-alpha-32 mt-6">
                The LLM will extract data matching the schema below
              </p>
            </div>

            {/* Model Selection */}
            <div>
              <label className="block text-label-small text-black-alpha-48 mb-8">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
              >
                {llmProviders.map((provider) => (
                  <optgroup key={provider.id} label={provider.name}>
                    {provider.models.map((model) => (
                      <option key={model.id} value={`${provider.id}/${model.id}`}>
                        {model.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* JSON Schema */}
            <div>
              <label className="block text-label-small text-black-alpha-48 mb-8">
                Output Schema (JSON Schema)
              </label>
              <textarea
                value={jsonSchema}
                onChange={(e) => setJsonSchema(e.target.value)}
                rows={12}
                className={`w-full px-12 py-10 bg-background-base border rounded-8 text-body-small text-accent-black font-mono focus:outline-none focus:border-heat-100 transition-colors resize-none ${schemaError ? 'border-red-500' : 'border-border-faint'
                  }`}
              />
              {schemaError && (
                <p className="text-body-small text-accent-black mt-6">{schemaError}</p>
              )}
              <p className="text-body-small text-black-alpha-32 mt-6">
                Define the structure of data to extract
              </p>
            </div>

            {/* Info Box */}
            <div className="p-16 bg-accent-white rounded-12 border border-border-faint">
              <p className="text-body-small text-accent-black">
                <strong>How it works:</strong> The LLM analyzes the input and extracts data matching your JSON schema.
              </p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}