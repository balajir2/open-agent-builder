"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { Node } from "@xyflow/react";
import VariableReferencePicker from "./VariableReferencePicker";

interface VectorDbPanelProps {
    node: Node | null;
    nodes?: Node[];
    onClose: () => void;
    onDelete: (nodeId: string) => void;
    onUpdate: (nodeId: string, data: any) => void;
}

type Provider = "pinecone" | "qdrant" | "chroma" | "weaviate" | "milvus";

const EMBEDDING_MODELS: Record<string, { id: string; label: string; dimension: number; dimensions?: number[] }[]> = {
    openai: [
        { id: "text-embedding-3-small", label: "text-embedding-3-small", dimension: 1536, dimensions: [256, 512, 1536] },
        { id: "text-embedding-3-large", label: "text-embedding-3-large", dimension: 3072, dimensions: [256, 1024, 3072] },
        { id: "text-embedding-ada-002", label: "text-embedding-ada-002", dimension: 1536 },
    ],
    cohere: [
        { id: "embed-english-v3.0", label: "embed-english-v3.0", dimension: 1024, dimensions: [256, 384, 512, 768, 1024] },
        { id: "embed-multilingual-v3.0", label: "embed-multilingual-v3.0", dimension: 1024, dimensions: [256, 384, 512, 768, 1024] },
        { id: "embed-english-light-v3.0", label: "embed-english-light-v3.0", dimension: 384, dimensions: [256, 384] },
    ],
    pinecone: [
        { id: "pinecone-serverless-embed", label: "Pinecone Default", dimension: 1536 },
    ],
    jina: [
        { id: "jina-embeddings-v2-base-en", label: "jina-v2-base-en", dimension: 768 },
        { id: "jina-embeddings-v2-small-en", label: "jina-v2-small-en", dimension: 512 },
    ],
};

const DIMENSION_PRESETS = [256, 384, 512, 768, 1024, 1536, 3072];

export default function VectorDbPanel({
    node,
    nodes,
    onClose,
    onDelete,
    onUpdate,
}: VectorDbPanelProps) {
    const nodeData = node?.data as any;

    const [provider, setProvider] = useState<Provider>(
        nodeData?.vectorDbProvider || "pinecone"
    );
    const [endpoint, setEndpoint] = useState(nodeData?.vectorDbEndpoint || "");
    const [apiKey, setApiKey] = useState(nodeData?.vectorDbApiKey || "");
    const [showApiKey, setShowApiKey] = useState(false);
    const [collection, setCollection] = useState(
        nodeData?.vectorDbCollection || ""
    );
    const [embeddingProvider, setEmbeddingProvider] = useState<string>(
        nodeData?.vectorDbEmbeddingProvider || "openai"
    );
    const [dimension, setDimension] = useState<number>(
        nodeData?.vectorDbDimension || 1536
    );
    const [customDimension, setCustomDimension] = useState(
        DIMENSION_PRESETS.includes(nodeData?.vectorDbDimension)
            ? ""
            : String(nodeData?.vectorDbDimension || "")
    );
    const [embeddingModel, setEmbeddingModel] = useState<string>(
        nodeData?.vectorDbEmbeddingModel || "text-embedding-3-small"
    );

    // Per-provider config storage: saves/restores field values when switching providers
    type ProviderConfig = {
        endpoint: string;
        apiKey: string;
        collection: string;
        embeddingProvider: string;
        dimension: number;
        customDimension: string;
        embeddingModel: string;
    };

    const perProviderConfig = useRef<Partial<Record<Provider, ProviderConfig>>>(
        // Seed from nodeData so existing saved data is restored on mount
        {
            ...(nodeData?.vectorDbPerProviderConfigs || {}),
            [nodeData?.vectorDbProvider || "pinecone"]: {
                endpoint: nodeData?.vectorDbEndpoint || "",
                apiKey: nodeData?.vectorDbApiKey || "",
                collection: nodeData?.vectorDbCollection || "",
                embeddingProvider: nodeData?.vectorDbEmbeddingProvider || "openai",
                dimension: nodeData?.vectorDbDimension || 1536,
                customDimension: DIMENSION_PRESETS.includes(nodeData?.vectorDbDimension)
                    ? ""
                    : String(nodeData?.vectorDbDimension || ""),
                embeddingModel: nodeData?.vectorDbEmbeddingModel || "text-embedding-3-small",
            }
        }
    );

    const handleProviderSwitch = (newProvider: Provider) => {
        if (newProvider === provider) return;
        // Save current values under the current provider key
        perProviderConfig.current[provider] = {
            endpoint, apiKey, collection,
            embeddingProvider, dimension, customDimension, embeddingModel,
        };
        // Load saved values for the new provider (default to empty)
        const saved = perProviderConfig.current[newProvider];
        setEndpoint(saved?.endpoint ?? "");
        setApiKey(saved?.apiKey ?? "");
        setCollection(saved?.collection ?? "");
        setEmbeddingProvider(saved?.embeddingProvider ?? "openai");
        setDimension(saved?.dimension ?? 1536);
        setCustomDimension(saved?.customDimension ?? "");
        setEmbeddingModel(saved?.embeddingModel ?? "text-embedding-3-small");
        setShowApiKey(false);
        setProvider(newProvider);
    };

    // Sync embedding model when embedding provider changes
    useEffect(() => {
        const models = EMBEDDING_MODELS[embeddingProvider] || [];
        if (models.length > 0) {
            const currentIsValid = models.some(m => m.id === embeddingModel);
            if (!currentIsValid) {
                setEmbeddingModel(models[0].id);
                setDimension(models[0].dimension);
                setCustomDimension("");
            }
        }
    }, [embeddingProvider]);

    // Dynamic embedding providers based on Vector DB provider
    // Only OpenAI embeddings are currently implemented; others are coming soon.
    const getEmbeddingProviders = () => {
        if (provider === "pinecone") {
            return [
                { id: "openai", label: "OpenAI", enabled: true },
                { id: "cohere", label: "Cohere (coming soon)", enabled: false },
                { id: "pinecone", label: "Pinecone Inference (coming soon)", enabled: false },
            ];
        }
        if (provider === "qdrant") {
            return [
                { id: "openai", label: "OpenAI", enabled: true },
                { id: "cohere", label: "Cohere (coming soon)", enabled: false },
                { id: "jina", label: "Jina (coming soon)", enabled: false },
            ];
        }
        if (provider === "chroma") {
            return [
                { id: "openai", label: "OpenAI", enabled: true },
                { id: "cohere", label: "Cohere (coming soon)", enabled: false },
            ];
        }
        if (provider === "weaviate") {
            return [
                { id: "openai", label: "OpenAI", enabled: true },
                { id: "cohere", label: "Cohere (coming soon)", enabled: false },
            ];
        }
        if (provider === "milvus") {
            return [
                { id: "openai", label: "OpenAI", enabled: true },
                { id: "cohere", label: "Cohere (coming soon)", enabled: false },
            ];
        }
        return [{ id: "openai", label: "OpenAI", enabled: true }];
    };

    const getEmbeddingModels = () => {
        return EMBEDDING_MODELS[embeddingProvider] || [];
    };

    const [queryPrompt, setQueryPrompt] = useState(
        nodeData?.vectorDbQueryPrompt || ""
    );
    const [topK, setTopK] = useState<number>(nodeData?.vectorDbTopK || 5);
    const [scoreThreshold, setScoreThreshold] = useState<number>(
        nodeData?.vectorDbScoreThreshold ?? 0
    );
    const [metadataFilter, setMetadataFilter] = useState(
        nodeData?.vectorDbMetadataFilter || ""
    );
    const [namespace, setNamespace] = useState(
        nodeData?.vectorDbNamespace || ""
    );
    const [includeMetadata, setIncludeMetadata] = useState<boolean>(
        nodeData?.vectorDbIncludeMetadata !== false
    );
    const [includeVector, setIncludeVector] = useState<boolean>(
        !!nodeData?.vectorDbIncludeVector
    );
    const [outputVar, setOutputVar] = useState(
        nodeData?.vectorDbOutputVariable || "vectorDbResults"
    );
    const [textField, setTextField] = useState(
        nodeData?.vectorDbTextField || "text"
    );
    const [joinResults, setJoinResults] = useState<boolean>(
        nodeData?.vectorDbJoinResults !== undefined ? nodeData.vectorDbJoinResults : true
    );
    const [joinSeparator, setJoinSeparator] = useState(
        nodeData?.vectorDbJoinSeparator || "---"
    );
    const [joinPrefix, setJoinPrefix] = useState(
        nodeData?.vectorDbJoinPrefix || "Chunk {{index}}"
    );
    const [joinSuffix, setJoinSuffix] = useState(
        nodeData?.vectorDbJoinSuffix || "\n"
    );



    // Auto-save on change
    useEffect(() => {
        if (!node) return;
        // Keep ref in sync so persisted map is always up-to-date
        perProviderConfig.current[provider] = {
            endpoint, apiKey, collection,
            embeddingProvider, dimension, customDimension, embeddingModel,
        };
        const id = setTimeout(() => {
            onUpdate(node.id, {
                vectorDbProvider: provider,
                vectorDbEndpoint: endpoint,
                vectorDbApiKey: apiKey,
                vectorDbCollection: collection,
                vectorDbDimension: dimension,
                vectorDbEmbeddingProvider: embeddingProvider,
                vectorDbEmbeddingModel: embeddingModel,
                vectorDbQueryPrompt: queryPrompt,
                vectorDbTopK: topK,
                vectorDbScoreThreshold: scoreThreshold,
                vectorDbMetadataFilter: metadataFilter,
                vectorDbNamespace: namespace,
                vectorDbIncludeMetadata: includeMetadata,
                vectorDbIncludeVector: includeVector,
                vectorDbTextField: textField,
                vectorDbOutputVariable: outputVar,
                vectorDbJoinResults: joinResults,
                vectorDbJoinSeparator: joinSeparator,
                vectorDbJoinPrefix: joinPrefix,
                vectorDbJoinSuffix: joinSuffix,
                // Persist the full per-provider map so data survives panel re-open,
                // but strip API keys to avoid saving dormant credentials in workflow JSON
                vectorDbPerProviderConfigs: Object.fromEntries(
                    Object.entries(perProviderConfig.current).map(([k, v]) => [
                        k,
                        v ? { ...v, apiKey: undefined } : v,
                    ])
                ),
            });
        }, 500);
        return () => clearTimeout(id);
    }, [
        provider, endpoint, apiKey, collection, dimension, embeddingProvider, embeddingModel,
        queryPrompt, topK, scoreThreshold, metadataFilter, namespace,
        includeMetadata, includeVector, textField, outputVar,
        joinResults, joinSeparator, joinPrefix, joinSuffix,
        node, onUpdate,
    ]);

    const handleDimensionPreset = (d: number) => {
        setDimension(d);
        setCustomDimension("");
    };

    const handleCustomDimension = (v: string) => {
        setCustomDimension(v);
        const n = parseInt(v, 10);
        if (!isNaN(n) && n > 0) setDimension(n);
    };



    const labelCls =
        "block text-label-small text-black-alpha-48 mb-6 uppercase tracking-wide text-[10px] font-semibold";
    const inputCls =
        "w-full px-12 py-8 bg-background-base border border-border-faint rounded-8 text-body-small text-accent-black focus:outline-none focus:border-heat-100 transition-colors";
    const sectionDiv = "space-y-16";

    return (
        <AnimatePresence>
            {node && (
                <motion.aside
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed right-20 top-80 h-[calc(100vh-100px)] w-[calc(100vw-240px)] max-w-480 bg-accent-white border border-border-faint shadow-lg overflow-y-auto z-50 rounded-16"
                >
                    {/* ── Header ── */}
                    <div className="p-16 border-b border-border-faint">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-10">
                                {/* Purple icon */}
                                <div className="w-32 h-32 rounded-8 bg-heat-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-18 h-18 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-title-h4 text-accent-black">Vector DB Query</h3>
                                    <span className="text-[10px] text-heat-100 font-semibold uppercase tracking-wide">
                                        {provider}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <button
                                    onClick={() => onDelete(node?.id || "")}
                                    className="w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center group"
                                    title="Delete node"
                                >
                                    <svg className="w-16 h-16 text-black-alpha-48 group-hover:text-accent-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                        <p className="text-body-small text-black-alpha-48">
                            Query any vector database with a natural-language prompt.
                        </p>
                    </div>

                    {/* ── Form ── */}
                    <div className="p-16 space-y-20">

                        {/* Provider */}
                        <div>
                            <label className={labelCls}>Provider</label>
                            <div className="flex gap-8 flex-wrap">
                                {(["pinecone", "qdrant", "chroma", "weaviate", "milvus"] as Provider[]).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => handleProviderSwitch(p)}
                                        className={`px-12 py-6 rounded-md text-caption font-medium border transition-all ${provider === p
                                            ? "bg-heat-100/5 border-heat-100 text-heat-100"
                                            : "bg-white border-border-faint text-black-alpha-44 hover:border-black-alpha-16"
                                            }`}
                                    >
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Connection Endpoint */}
                        <div>
                            <label className={labelCls}>Connection Endpoint</label>
                            <input
                                type="text"
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                                placeholder={
                                    provider === 'pinecone' ? "e.g., https://your-index-name-abcd.svc.pinecone.io" :
                                        provider === 'qdrant' ? "e.g., https://your-qdrant-cluster.cloud.qdrant.io:6333" :
                                            provider === 'chroma' ? "e.g., http://localhost:8000" :
                                                provider === 'weaviate' ? "e.g., https://your-weaviate-instance.weaviate.cloud" :
                                                    provider === 'milvus' ? "e.g., https://your-milvus-instance.zillizcloud.com" :
                                                        ""
                                }
                                className={inputCls + " font-mono text-xs"}
                            />
                            <p className="text-[10px] text-black-alpha-32 mt-4">
                                {provider === 'pinecone' && "e.g., https://your-index-name-abcd.svc.pinecone.io"}
                                {provider === 'qdrant' && "e.g., https://your-qdrant-cluster.cloud.qdrant.io:6333"}
                                {provider === 'chroma' && "e.g., http://localhost:8000"}
                                {provider === 'weaviate' && "e.g., https://your-weaviate-instance.weaviate.cloud"}
                                {provider === 'milvus' && "e.g., https://your-milvus-instance.zillizcloud.com"}
                            </p>
                        </div>

                        {/* API Key + Collection */}
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <label className={labelCls}>API Key</label>
                                <div className="relative">
                                    <input
                                        type={showApiKey ? "text" : "password"}
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="••••••••••••"
                                        className={inputCls + " pr-36 font-mono text-xs"}
                                    />
                                    <button
                                        onClick={() => setShowApiKey(!showApiKey)}
                                        className="absolute right-10 top-1/2 -translate-y-1/2 text-black-alpha-32 hover:text-accent-black transition-colors"
                                    >
                                        <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {showApiKey ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            ) : (
                                                <>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>
                                    {provider === "pinecone" ? "Index Name" : "Collection"}
                                </label>
                                <input
                                    type="text"
                                    value={collection}
                                    onChange={(e) => setCollection(e.target.value)}
                                    placeholder={provider === "pinecone" ? "my-index" : "my-collection"}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Embedding Provider Selection */}
                        <div>
                            <label className={labelCls}>Embedding Provider</label>
                            <select
                                value={embeddingProvider}
                                onChange={(e) => setEmbeddingProvider(e.target.value)}
                                className={inputCls}
                            >
                                {getEmbeddingProviders().map((ep) => (
                                    <option key={ep.id} value={ep.id} disabled={!ep.enabled}>
                                        {ep.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Vector Dimension */}
                        <div>
                            <label className={labelCls}>Vector Dimension</label>
                            <div className="flex flex-wrap gap-6 mb-8">
                                {DIMENSION_PRESETS.map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => handleDimensionPreset(d)}
                                        className={`px-12 py-6 rounded-6 border text-body-small font-mono transition-all ${dimension === d && !customDimension
                                            ? "bg-violet-alpha-12 border-heat-100 text-heat-100 font-semibold"
                                            : "bg-background-base border-border-faint text-black-alpha-48 hover:border-violet-alpha-20"
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                                <input
                                    type="number"
                                    value={customDimension}
                                    onChange={(e) => handleCustomDimension(e.target.value)}
                                    placeholder="Custom…"
                                    min={1}
                                    className={`px-12 py-6 rounded-6 border text-body-small font-mono w-24 transition-all focus:outline-none ${customDimension
                                        ? "bg-violet-alpha-12 border-heat-100 text-heat-100"
                                        : "bg-background-base border-border-faint text-black-alpha-48"
                                        }`}
                                />
                            </div>
                            <p className="text-[10px] text-black-alpha-32">
                                Selected: <span className="font-mono font-semibold text-heat-100">{dimension}</span>
                            </p>
                        </div>

                        {/* Embeddings Model */}
                        <div>
                            <label className={labelCls}>Embeddings Model</label>
                            <select
                                value={embeddingModel}
                                onChange={(e) => {
                                    const mId = e.target.value;
                                    setEmbeddingModel(mId);
                                    const model = getEmbeddingModels().find((m) => m.id === mId);
                                    if (model) {
                                        // Keep current dimension if it's valid for this model
                                        const validDims = model.dimensions || [model.dimension];
                                        if (!validDims.includes(dimension)) {
                                            setDimension(model.dimension);
                                            setCustomDimension("");
                                        }
                                    }
                                }}
                                className={inputCls}
                            >
                                {getEmbeddingModels().map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.label} ({m.dimensions ? m.dimensions.join(", ") : m.dimension})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border-faint" />

                        {/* Query Prompt */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <label className={labelCls + " mb-0"}>Query Prompt</label>
                                {nodes && (
                                    <VariableReferencePicker
                                        nodes={nodes}
                                        currentNodeId={node.id}
                                        onSelect={(ref) => setQueryPrompt(queryPrompt + `{{${ref}}}`)}
                                    />
                                )}
                            </div>
                            <textarea
                                value={queryPrompt}
                                onChange={(e) => setQueryPrompt(e.target.value)}
                                rows={5}
                                placeholder={"Find the most relevant documents about {{userQuery}}."}
                                className="w-full px-12 py-10 bg-gray-900 text-violet-300 border border-border-faint rounded-8 text-body-small font-mono focus:outline-none focus:border-heat-100 transition-colors resize-none"
                            />
                            <div className="flex gap-8 mt-8">
                                <button
                                    onClick={() =>
                                        setQueryPrompt("{{state.variables.lastOutput}}")
                                    }
                                    className="px-10 py-5 bg-violet-alpha-12 hover:bg-violet-alpha-20 border border-border-muted rounded-6 text-body-small text-heat-100 transition-colors"
                                >
                                    Use Previous Output
                                </button>
                                <button
                                    onClick={() =>
                                        setQueryPrompt("{{state.variables.input}}")
                                    }
                                    className="px-10 py-5 bg-violet-alpha-12 hover:bg-violet-alpha-20 border border-border-muted rounded-6 text-body-small text-heat-100 transition-colors"
                                >
                                    Use Workflow Input
                                </button>
                            </div>
                        </div>

                        {/* top_k */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <label className={labelCls + " mb-0"}>top_k Results</label>
                                <span className="text-body-small font-semibold text-heat-100 font-mono">{topK}</span>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={topK}
                                onChange={(e) => setTopK(Number(e.target.value))}
                                className="w-full accent-heat-100"
                            />
                            <div className="flex justify-between text-[10px] text-black-alpha-32 mt-4">
                                <span>1</span>
                                <span>50</span>
                                <span>100</span>
                            </div>
                        </div>

                        {/* Score Threshold */}
                        <div>
                            <label className={labelCls}>Score Threshold (0 = no filter)</label>
                            <input
                                type="number"
                                min={0}
                                max={1}
                                step={0.01}
                                value={scoreThreshold}
                                onChange={(e) => setScoreThreshold(Number(e.target.value))}
                                className={inputCls + " font-mono"}
                            />
                        </div>

                        {/* Namespace (Pinecone) */}
                        {provider === "pinecone" && (
                            <div>
                                <label className={labelCls}>Namespace (optional)</label>
                                <input
                                    type="text"
                                    value={namespace}
                                    onChange={(e) => setNamespace(e.target.value)}
                                    placeholder="default"
                                    className={inputCls}
                                />
                            </div>
                        )}

                        {/* Metadata Filter */}
                        <div>
                            <label className={labelCls}>Metadata Filter (JSON, optional)</label>
                            {provider === "weaviate" || provider === "milvus" ? (
                                <div className="px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-small text-black-alpha-48">
                                    Metadata filtering is not yet supported for {provider.charAt(0).toUpperCase() + provider.slice(1)}. This feature requires provider-specific filter syntax and will be added in a future update.
                                </div>
                            ) : (
                                <textarea
                                    value={metadataFilter}
                                    onChange={(e) => setMetadataFilter(e.target.value)}
                                    rows={3}
                                    placeholder={'{\n  "category": "docs",\n  "lang": "en"\n}'}
                                    className="w-full px-12 py-10 bg-gray-900 text-violet-300 border border-border-faint rounded-8 text-body-small font-mono focus:outline-none focus:border-heat-100 transition-colors resize-none"
                                />
                            )}
                        </div>

                        {/* Metadata Text Key */}
                        {includeMetadata && (
                            <div>
                                <label className={labelCls}>Metadata Text Key</label>
                                <input
                                    type="text"
                                    value={textField}
                                    onChange={(e) => setTextField(e.target.value)}
                                    placeholder="e.target.value (default: text)"
                                    className={inputCls + " font-mono"}
                                />
                                <p className="text-[10px] text-black-alpha-32 mt-4">
                                    The metadata key containing the text content. Fallbacks: <code className="bg-gray-100 px-4 py-1 rounded">content</code>, <code className="bg-gray-100 px-4 py-1 rounded">page_content</code>, <code className="bg-gray-100 px-4 py-1 rounded">body</code>.
                                </p>
                            </div>
                        )}

                        {/* Toggles */}
                        <div className="space-y-10">
                            {[
                                { label: "Include Metadata", val: includeMetadata, set: setIncludeMetadata },
                                { label: "Include Raw Vector", val: includeVector, set: setIncludeVector },
                            ].map(({ label, val, set }) => (
                                <label key={label} className="flex items-center gap-10 cursor-pointer select-none">
                                    <div
                                        onClick={() => set(!val)}
                                        className={`w-36 h-20 rounded-full transition-colors flex items-center px-2 ${val ? "bg-heat-100" : "bg-gray-200"
                                            }`}
                                    >
                                        <div
                                            className={`w-14 h-14 rounded-full bg-white shadow transition-transform ${val ? "translate-x-16" : ""
                                                }`}
                                        />
                                    </div>
                                    <span className="text-body-small text-accent-black">{label}</span>
                                </label>
                            ))}
                        </div>

                        {/* Output Variable */}
                        <div>
                            <label className={labelCls}>Output Variable Name</label>
                            <input
                                type="text"
                                value={outputVar}
                                onChange={(e) => setOutputVar(e.target.value)}
                                className={inputCls + " font-mono"}
                            />
                            <p className="text-[10px] text-black-alpha-32 mt-4">
                                Access results via{" "}
                                <code className="bg-gray-100 px-4 py-1 rounded text-heat-100">
                                    {`{{${outputVar}.results}}`}
                                </code>
                            </p>
                        </div>

                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
