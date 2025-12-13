"use client";

import { useState } from "react";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { toolRegistry } from "@/lib/tools/registry";
import { Loader2, Key, Trash2, Check, AlertCircle } from "lucide-react";

export default function ToolKeysSettings() {
    const { data: session } = useSession();
    const user = session?.user;
    const [editingToolId, setEditingToolId] = useState<string | null>(null);
    const [tempKey, setTempKey] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Fetch configured keys
    const configuredKeys = useQuery(api.userToolKeys.getUserToolKeys,
        user?.id ? { userId: user.id } : "skip"
    );

    const upsertKey = useAction(api.userToolKeysActions.upsertToolKey);
    const deleteKey = useMutation(api.userToolKeys.deleteToolKey);

    const handleSaveKey = async (toolId: string) => {
        if (!user?.id || !tempKey.trim()) return;

        setIsSaving(true);
        try {
            await upsertKey({
                userId: user.id,
                toolId,
                apiKey: tempKey.trim(),
            });
            toast.success("API Key saved successfully");
            setEditingToolId(null);
            setTempKey("");
        } catch (error) {
            toast.error("Failed to save API Key");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteKey = async (id: any) => {
        if (!user?.id) return;

        try {
            await deleteKey({ id, userId: user.id });
            toast.success("API Key removed");
        } catch (error) {
            toast.error("Failed to remove API Key");
        }
    };

    if (!configuredKeys) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-black-alpha-32" />
            </div>
        );
    }

    // Group tools by category
    const categories = ['web-search', 'scraping', 'ai-generation'];

    return (
        <div className="space-y-12">
            <div className="bg-background-base border border-border-faint rounded-12 p-20">
                <h3 className="text-lg font-semibold text-accent-black mb-4">Tool API Keys</h3>
                <p className="text-sm text-black-alpha-64 mb-12">
                    Configure API keys for standard tools here. These keys will be securely encrypted and used by all your agents.
                </p>

                <div className="space-y-16">
                    {categories.map(category => {
                        const tools = toolRegistry.filter(t => t.category === category);
                        if (tools.length === 0) return null;

                        return (
                            <div key={category}>
                                <h4 className="text-xs font-semibold text-black-alpha-48 uppercase tracking-wider mb-6 border-b border-border-faint pb-2">
                                    {category.replace('-', ' ')}
                                </h4>
                                <div className="space-y-4">
                                    {tools.map(tool => {
                                        const existingKey = configuredKeys.find(k => k.toolId === tool.id);
                                        const isEditing = editingToolId === tool.id;

                                        return (
                                            <div key={tool.id} className="flex items-center justify-between p-12 bg-accent-white border border-border-faint rounded-8">
                                                <div className="flex items-center gap-12">
                                                    <div className="w-32 h-32 bg-black-alpha-4 rounded-6 flex items-center justify-center">
                                                        {tool.icon ? <tool.icon className="w-16 h-16 text-black-alpha-64" /> : <Key className="w-16 h-16 text-black-alpha-64" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-accent-black">{tool.label}</div>
                                                        <div className="text-xs text-black-alpha-48 flex items-center gap-4">
                                                            {existingKey ? (
                                                                <span className="text-green-600 flex items-center gap-2">
                                                                    <Check className="w-10 h-10" /> Configured ({existingKey.keyPrefix})
                                                                </span>
                                                            ) : (
                                                                <span className="text-orange-500 flex items-center gap-2">
                                                                    <AlertCircle className="w-10 h-10" /> Not configured
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-8">
                                                    {isEditing ? (
                                                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-200">
                                                            <input
                                                                type="password"
                                                                value={tempKey}
                                                                onChange={(e) => setTempKey(e.target.value)}
                                                                placeholder="Enter API Key"
                                                                className="px-10 py-6 bg-background-base border border-border-faint rounded-6 text-sm focus:outline-none focus:border-heat-100 w-200"
                                                                autoFocus
                                                            />
                                                            <button
                                                                onClick={() => handleSaveKey(tool.id)}
                                                                disabled={isSaving || !tempKey}
                                                                className="px-10 py-6 bg-heat-100 text-white rounded-6 text-xs font-medium hover:bg-heat-200 disabled:opacity-50"
                                                            >
                                                                {isSaving ? <Loader2 className="w-12 h-12 animate-spin" /> : "Save"}
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingToolId(null);
                                                                    setTempKey("");
                                                                }}
                                                                className="px-10 py-6 bg-black-alpha-4 text-accent-black rounded-6 text-xs font-medium hover:bg-black-alpha-8"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => setEditingToolId(tool.id)}
                                                                className="px-10 py-6 bg-white border border-border-faint text-accent-black rounded-6 text-xs font-medium hover:bg-black-alpha-4"
                                                            >
                                                                {existingKey ? "Update" : "Configure"}
                                                            </button>
                                                            {existingKey && (
                                                                <button
                                                                    onClick={() => handleDeleteKey(existingKey._id)}
                                                                    className="p-6 text-black-alpha-32 hover:text-red-500 transition-colors"
                                                                    title="Remove Key"
                                                                >
                                                                    <Trash2 className="w-14 h-14" />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
