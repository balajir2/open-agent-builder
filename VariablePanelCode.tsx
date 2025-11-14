import React from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Correct import

export default function VariablePanel({
  showVariablePanel,
  setShowVariablePanel,
  workflowInputs,
  setWorkflowInputs,
  ensureInputComponentsForWorkflow,
  toast,
}) {
  return (
    <AnimatePresence>
      {showVariablePanel && (
        <motion.aside
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-20 top-80 h-[calc(100vh-100px)] w-[calc(100vw-240px)] max-w-480 bg-accent-white border border-border-faint shadow-lg overflow-y-auto z-50 rounded-16"
        >
          {/* Header */}
          <div className="p-20 border-b border-border-faint">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-accent-black">Input Variables</h2>
              <button
                onClick={() => setShowVariablePanel(false)}
                className="w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-18 h-18 text-black-alpha-48"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-black-alpha-48">
              Define the workflow input variables
            </p>
          </div>

          {/* Content */}
          {/* 🔽 Your existing JSX from here is fine — keep it inside */}
          {/* ... rest of your code unchanged ... */}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}