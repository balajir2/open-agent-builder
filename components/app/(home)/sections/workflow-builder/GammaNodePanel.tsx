"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { Node } from "@xyflow/react";
import VariableReferencePicker from "./VariableReferencePicker";

interface GammaNodePanelProps {
    node: Node | null;
    nodes?: Node[]; // All nodes for variable reference
    onUpdate: (nodeId: string, updates: any) => void;
    onClose: () => void;
    onDelete?: (nodeId: string) => void;
}

export default function GammaNodePanel({
    node,
    nodes,
    onUpdate,
    onClose,
    onDelete,
}: GammaNodePanelProps) {
    const nodeData = node?.data as any;
    const [prompt, setPrompt] = useState(nodeData?.prompt || 'Generate a presentation using data from {{lastOutput}}');
    const [format, setFormat] = useState(nodeData?.format || 'presentation');
    const [textMode, setTextMode] = useState(nodeData?.textMode || 'generate');
    const [numCards, setNumCards] = useState(nodeData?.numCards || '10');
    const [textAmount, setTextAmount] = useState(nodeData?.textAmount || 'medium');
    const [imageSource, setImageSource] = useState(nodeData?.imageSource || 'aiGenerated');
    const [language, setLanguage] = useState(nodeData?.language || 'en');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced update
    useEffect(() => {
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
            onUpdate(node.id, {
                prompt,
                format,
                textMode,
                numCards,
                textAmount,
                imageSource,
                language,
                nodeType: 'gamma-ai',
            });
        }, 300);

        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, [prompt, format, textMode, numCards, textAmount, imageSource, language, node.id, onUpdate]);

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
                            <div className="flex items-center justify-between mb-8">
                                <label className="block text-label-small text-black-alpha-48">
                                    Prompt
                                </label>
                                {nodes && (
                                    <VariableReferencePicker
                                        nodes={nodes}
                                        currentNodeId={node?.id || ""}
                                        onSelect={(ref) => setPrompt(prompt + ` {{${ref}}}`)}
                                    />
                                )}
                            </div>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Create a presentation about {{lastOutput}}"
                                rows={6}
                                className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors resize-none font-mono text-14"
                            />
                            <p className="text-body-small text-black-alpha-32 mt-6">
                                Use the "Insert Variable" button to add outputs from previous nodes.
                            </p>
                        </div>

                        {/* Format Selection */}
                        <div>
                            <label className="block text-label-small text-black-alpha-48 mb-8">
                                Output Format
                            </label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value)}
                                className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
                            >
                                <option value="presentation">Presentation</option>
                                <option value="document">Document</option>
                                <option value="webpage">Webpage</option>
                                <option value="social">Social Media</option>
                            </select>
                        </div>

                        {/* Text Mode */}
                        <div>
                            <label className="block text-label-small text-black-alpha-48 mb-8">
                                Text Mode
                            </label>
                            <select
                                value={textMode}
                                onChange={(e) => setTextMode(e.target.value)}
                                className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
                            >
                                <option value="generate">Generate - Rewrite and expand content</option>
                                <option value="condense">Condense - Summarize input text</option>
                                <option value="preserve">Preserve - Keep exact text</option>
                            </select>
                        </div>

                        {/* Advanced Options Toggle */}
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-8 text-body-small text-heat-100 hover:text-heat-120 transition-colors"
                        >
                            <svg className={`w-16 h-16 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            Advanced Options
                        </button>

                        {showAdvanced && (
                            <div className="space-y-20 pl-24 border-l-2 border-heat-100">
                                {/* Number of Cards */}
                                <div>
                                    <label className="block text-label-small text-black-alpha-48 mb-8">
                                        Number of Cards
                                    </label>
                                    <input
                                        type="number"
                                        value={numCards}
                                        onChange={(e) => setNumCards(e.target.value)}
                                        min="1"
                                        max="60"
                                        className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
                                    />
                                    <p className="text-body-small text-black-alpha-32 mt-4">Range: 1-60 (Pro), 1-75 (Ultra)</p>
                                </div>

                                {/* Text Amount */}
                                <div>
                                    <label className="block text-label-small text-black-alpha-48 mb-8">
                                        Text Amount
                                    </label>
                                    <select
                                        value={textAmount}
                                        onChange={(e) => setTextAmount(e.target.value)}
                                        className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
                                    >
                                        <option value="brief">Brief</option>
                                        <option value="medium">Medium</option>
                                        <option value="detailed">Detailed</option>
                                        <option value="extensive">Extensive</option>
                                    </select>
                                </div>

                                {/* Image Source */}
                                <div>
                                    <label className="block text-label-small text-black-alpha-48 mb-8">
                                        Image Source
                                    </label>
                                    <select
                                        value={imageSource}
                                        onChange={(e) => setImageSource(e.target.value)}
                                        className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
                                    >
                                        <option value="aiGenerated">AI Generated</option>
                                        <option value="unsplash">Unsplash</option>
                                        <option value="giphy">Giphy</option>
                                        <option value="webFreeToUse">Web - Free to Use</option>
                                        <option value="noImages">No Images</option>
                                    </select>
                                </div>

                                {/* Language */}
                                <div>
                                    <label className="block text-label-small text-black-alpha-48 mb-8">
                                        Output Language
                                    </label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-heat-100 transition-colors"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                        <option value="it">Italian</option>
                                        <option value="pt">Portuguese</option>
                                        <option value="zh">Chinese</option>
                                        <option value="ja">Japanese</option>
                                        <option value="ko">Korean</option>
                                        <option value="ar">Arabic</option>
                                        <option value="hi">Hindi</option>
                                        <option value="ru">Russian</option>
                                    </select>
                                </div>
                            </div>
                        )}

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
