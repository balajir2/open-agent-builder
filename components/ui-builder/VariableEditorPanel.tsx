"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";

export interface InputVariable {
  name: string;
  type: "string" | "number" | "boolean" | "url" | "object";
  required: boolean;
  defaultValue?: string;
  description?: string;
}

interface VariableEditorPanelProps {
  workflowId: string;
  onClose: () => void;
  onSave: (variables: InputVariable[]) => void;
  existingVariables?: InputVariable[];
}

export default function VariableEditorPanel({
  workflowId,
  onClose,
  onSave,
  existingVariables = [],
}: VariableEditorPanelProps) {
  const [variables, setVariables] = useState<InputVariable[]>(existingVariables);

  const addVariable = () => {
    setVariables([
      ...variables,
      {
        name: `input${variables.length + 1}`,
        type: "string",
        required: false,
        description: "",
      },
    ]);
  };

  const updateVariable = (i: number, updates: Partial<InputVariable>) => {
    setVariables((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...updates } : v)));
  };

  const removeVariable = (i: number) => {
    setVariables((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    // Persist to backend
    await fetch(`/api/workflows/${workflowId}/variables`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });

    onSave(variables);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="fixed right-8 top-20 bg-white border border-gray-200 shadow-2xl rounded-xl w-[500px] max-h-[85vh] overflow-y-auto z-50"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add Variables</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {variables.map((v, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-center">
                <input
                  className="border rounded px-2 py-1 text-sm flex-1 mr-2"
                  value={v.name}
                  onChange={(e) => updateVariable(i, { name: e.target.value })}
                  placeholder="variable_name"
                />
                <button onClick={() => removeVariable(i)}>
                  <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={v.type}
                  onChange={(e) => updateVariable(i, { type: e.target.value as any })}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="url">URL</option>
                  <option value="object">Object</option>
                </select>

                <label className="flex items-center text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={v.required}
                    onChange={(e) => updateVariable(i, { required: e.target.checked })}
                    className="mr-1"
                  />
                  Required
                </label>
              </div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-2"
                placeholder="Default value"
                value={v.defaultValue || ""}
                onChange={(e) => updateVariable(i, { defaultValue: e.target.value })}
              />
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-2"
                placeholder="Description"
                value={v.description || ""}
                onChange={(e) => updateVariable(i, { description: e.target.value })}
              />
            </div>
          ))}

          <button
            onClick={addVariable}
            className="w-full py-2 border border-dashed border-gray-400 rounded-lg text-sm flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" /> Add Variable
          </button>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-blue-600 text-white rounded">
            Save Variables
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
