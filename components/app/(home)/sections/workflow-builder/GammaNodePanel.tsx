"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { Node } from "@xyflow/react";

interface GammaNodePanelProps {
    node: Node | null;
    onUpdate: (nodeId: string, updates: any) => void;
    onClose: () => void;
    onDelete?: (nodeId: string) => void;
}

export default function GammaNodePanel({
    node,
    onUpdate,
    onClose,
    onDelete,
}: GammaNodePanelProps) {
    const nodeData = node?.data as any;
    const [prompt, setPrompt] = useState(nodeData?.prompt || 'Generate a presentation about...');
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced update
    useEffect(() => {
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
            onUpdate(nodeData?.id, {
                prompt,
                nodeType: 'gamma-ai',
            });
        }, 300);

        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, [prompt, nodeData?.id]);

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
                            <h2 className="text-title-h3 text-accent-black">Gamma AI</h2>
                            <div className="flex items-center gap-8">
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(node.id)}
                                        className="w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center group"
                                        title="Delete node"
                                    >
                                        <svg className="w-16 h-16 text-black-alpha-48 group-hover:text-black-alpha-64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
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
                            Generate presentations, documents, or webpages using Gamma AI
                        </p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-20 space-y-24">
                        {/* Prompt */}
                        <div>
                            <label className="block text-label-small text-black-alpha-48 mb-8">
                                Prompt
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe what you want to generate..."
                                rows={6}
                                className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors resize-none"
                            />
                            <p className="text-body-small text-black-alpha-32 mt-6">
                                Provide a detailed description for the content you want to generate.
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="p-16 bg-accent-white rounded-12 border border-border-faint">
                            <p className="text-body-small text-accent-black">
                                <strong>Note:</strong> This node uses the Gamma API to generate content. Ensure your API key is configured in Settings.
                            </p>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
