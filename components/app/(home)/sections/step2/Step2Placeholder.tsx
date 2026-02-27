"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { listTemplates } from "@/lib/workflow/templates";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { FileDown } from "lucide-react";
import { ImportMarkdownButton } from "../workflow-builder/ImportMarkdownButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Step2PlaceholderProps {
  onReset: () => void;
  onCreateWorkflow: () => void;
  onLoadWorkflow?: (workflowId: string) => void;
  onLoadTemplate?: (templateId: string) => void;
}

interface Workflow {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  userId?: string;
}

export default function Step2Placeholder({ onReset, onCreateWorkflow, onLoadWorkflow, onLoadTemplate }: Step2PlaceholderProps) {
  const { data: session } = useSession();
  const user = session?.user as any;
  const currentUser = useQuery(api.users.currentUser);
  const isAdmin = currentUser !== undefined && currentUser !== null && currentUser.role === "admin";
  const allUsers = useQuery(api.users.list, isAdmin ? {} : "skip") || [];
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [teamWorkflows, setTeamWorkflows] = useState<Workflow[]>([]);
  const [activeTab, setActiveTab] = useState<"workflows" | "templates" | "team">("workflows");
  const templates = listTemplates();

  function cleanName(name: string) {
    let cleaned = name.replace(/^copy of\s*/i, ""); // remove "Copy of"

    const parts = cleaned.split("_");

    // If pattern: [prefix, number, suffix]
    if (parts.length === 3 && /^\d+$/.test(parts[1])) {
      cleaned = `${parts[0]}_${parts[2]}`;
    }

    return cleaned;
  }

  useEffect(() => {
    const loadWorkflows = async () => {
      try {
        const response = await fetch('/api/workflows', {
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to fetch workflows:', response.status);
          return;
        }

        const data = await response.json();

        if (data.workflows && Array.isArray(data.workflows)) {
          setWorkflows(data.workflows.map((w: any) => ({
            id: w.id,
            title: cleanName(w.name),
            description: w.description,
            createdAt: new Date(w.updatedAt || w.createdAt).toLocaleDateString(),
            userId: w.userId,
          })));
        }
      } catch (error) {
        console.error('Error loading workflows:', error);
      }
    };

    const loadTeamWorkflows = async () => {
      try {
        const response = await fetch('/api/team-workflows', {
          credentials: 'include', // Include cookies in the request
        });
        const data = await response.json();

        if (data.workflows && Array.isArray(data.workflows)) {
          setTeamWorkflows(data.workflows.map((w: any) => ({
            id: w.id,
            title: cleanName(w.name),
            description: w.description,
            createdAt: new Date(w.updatedAt || w.createdAt).toLocaleDateString(),
            userId: w.userId,
          })));
        }
      } catch (error) {
        console.error('Error loading team workflows:', error);
      }
    };

    loadWorkflows();
    loadTeamWorkflows();
  }, []);


  const handleExportMarkdown = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();

    try {
      const response = await fetch(`/api/workflows/${id}/export-markdown`);

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Download the markdown file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Workflow exported as Markdown');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export workflow');
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string, isTeam: boolean) => {
    e.stopPropagation();

    toast("Are you sure you want to delete this workflow?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const response = await fetch(`/api/workflows?id=${id}`, {
              method: 'DELETE',
            });

            if (response.ok) {
              if (isTeam) {
                setTeamWorkflows(prev => prev.filter(w => w.id !== id));
              } else {
                setWorkflows(prev => prev.filter(w => w.id !== id));
              }
              toast.success("Workflow deleted successfully");
            } else {
              console.error('Failed to delete workflow');
              toast.error("Failed to delete workflow");
            }
          } catch (error) {
            console.error('Error deleting workflow:', error);
            toast.error("Error deleting workflow");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => { },
      },
    });
  };

  const renderWorkflows = (items: Workflow[], isTeam: boolean = false) => {
    if (items.length > 0) {
      return items.map((workflow, index) => {
        // Find owner name if it's a team workflow
        let ownerName = "";
        if (isTeam && workflow.userId) {
          // Check if the owner is the current user (using clerkId)
          if (currentUser && workflow.userId === currentUser.clerkId) {
            ownerName = "Me";
          } else if (allUsers.length === 0) {
            // Users list still loading or failed to load
            ownerName = "Loading...";
          } else {
            const owner = allUsers.find((u: any) => u.clerkId === workflow.userId);
            ownerName = owner?.name || owner?.email || workflow.userId.slice(0, 12) + "...";
          }
        }

        return (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: (index + 1) * 0.1,
              ease: "easeOut"
            }}
            className="relative cursor-pointer"
            onClick={() => onLoadWorkflow?.(workflow.id)}
          >
            <div className="bg-accent-white rounded-12 p-24 border border-border-faint hover:border-heat-100 hover:shadow-sm transition-all h-full min-h-[160px] group relative">
              <div className="absolute inset-0 rounded-12 bg-gradient-to-br from-heat-4 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-label-large text-accent-black font-medium pr-8">{workflow.title}</h3>
                  <div className="flex items-center gap-2">
                    {/* Export button */}
                    <button
                      onClick={(e) => handleExportMarkdown(e, workflow.id, workflow.title)}
                      className="text-black-alpha-48 hover:text-heat-100 transition-colors p-4 -mr-2 -mt-4 rounded-full hover:bg-heat-4"
                      title="Export as Markdown"
                    >
                      <FileDown className="w-16 h-16" />
                    </button>
                    {/* Only show delete button if user is the owner */}

                    {(user?.id === workflow.userId || isAdmin) && (
                      <button
                        onClick={(e) => handleDelete(e, workflow.id, isTeam)}
                        className="text-black-alpha-32 hover:text-red-500 transition-colors p-4 -mr-4 -mt-4 rounded-full hover:bg-red-50"
                        title="Delete workflow"
                      >
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                {workflow.description && (
                  <p className="text-body-small text-black-alpha-48 mb-12 line-clamp-2">{workflow.description}</p>
                )}
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-body-small text-black-alpha-32">Updated {workflow.createdAt}</p>
                  {isTeam && ownerName && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ownerName === "Me"
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                      {ownerName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      });
    }
    return (
      <div className="col-span-1 lg:col-span-3 flex items-center justify-center min-h-[160px]">
        <p className="text-body-medium text-black-alpha-48">No saved workflows yet</p>
      </div>
    );
  };

  return (
    <div className="max-w-[900px] mx-auto w-full">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-24"
      >
        <h2 className="text-title-h2 text-accent-black mb-8">Get Started</h2>
        <p className="text-body-large text-black-alpha-48">
          Create a new workflow, use a template, or continue where you left off
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-24">
        <button
          onClick={() => setActiveTab("workflows")}
          className={`px-20 py-10 rounded-8 text-body-medium transition-all ${activeTab === "workflows"
            ? "bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-[0.98]"
            : "bg-background-base text-accent-black hover:bg-black-alpha-4 border border-border-faint"
            }`}
        >
          Your Workflows ({workflows.length})
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab("team")}
            className={`px-20 py-10 rounded-8 text-body-medium transition-all ${activeTab === "team"
              ? "bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-[0.98]"
              : "bg-background-base text-accent-black hover:bg-black-alpha-4 border border-border-faint"
              }`}
          >
            Team Workflows ({teamWorkflows.length})
          </button>
        )}
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-20 py-10 rounded-8 text-body-medium transition-all ${activeTab === "templates"
            ? "bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:brightness-110 active:scale-[0.98]"
            : "bg-background-base text-accent-black hover:bg-black-alpha-4 border border-border-faint"
            }`}
        >
          Templates ({templates.length})
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
        {/* Create Workflow Tile - Always first */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: "easeOut"
          }}
          className="relative cursor-pointer"
          onClick={onCreateWorkflow}
        >
          <div className="bg-accent-white rounded-12 p-24 border-2 border-dashed border-border-light hover:border-heat-100 transition-all h-full flex items-center justify-center min-h-[160px]">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full bg-heat-4 flex items-center justify-center mx-auto mb-12">
                <svg className="w-24 h-24 text-heat-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-label-large text-accent-black font-medium">Create Workflow</h3>
            </div>
          </div>
        </motion.div>

        {/* Import Workflow Tile - Second */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.05,
            ease: "easeOut"
          }}
          className="relative"
        >
          <div className="bg-accent-white rounded-12 p-24 border-2 border-dashed border-border-light hover:border-heat-100 transition-all h-full flex items-center justify-center min-h-[160px]">
            <div className="text-center">
              <div className="w-48 h-48 rounded-full bg-heat-4 flex items-center justify-center mx-auto mb-12">
                <svg className="w-24 h-24 text-heat-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <ImportMarkdownButton onImportSuccess={(workflowId) => {
                // Reload workflows and navigate to the imported workflow
                onLoadWorkflow?.(workflowId);
              }} />
            </div>
          </div>
        </motion.div>

        {/* Show Workflows or Templates based on tab */}
        {activeTab === "workflows" && renderWorkflows(workflows, false)}
        {activeTab === "team" && renderWorkflows(teamWorkflows, true)}
        {activeTab === "templates" && (
          templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: (index + 1) * 0.1,
                ease: "easeOut"
              }}
              className="relative cursor-pointer"
              onClick={() => onLoadTemplate?.(template.id)}
            >
              <div className="bg-accent-white rounded-12 p-24 border border-border-faint hover:border-gray-700 hover:shadow-md transition-all h-full min-h-[160px] relative overflow-hidden group">
                <div className="relative">
                  <h3 className="text-label-large text-accent-black font-medium mb-8">{template.name}</h3>
                  <p className="text-body-small text-black-alpha-48">{template.description}</p>
                  <div className="mt-12 inline-flex items-center gap-6 text-body-small text-accent-black group-hover:text-gray-700">
                    <span>Use template</span>
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center"
      >
        <button
          onClick={onReset}
          className="px-24 py-12 text-label-large text-black-alpha-48 hover:text-accent-black transition-colors"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}