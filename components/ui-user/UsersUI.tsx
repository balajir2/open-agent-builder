"use client";

import React, { useEffect, useState } from "react";
import { Play, Trash2 } from "lucide-react";

type Workflow = {
  id: string;
  name: string;
  description?: string;
  updatedAt?: string;
  createdAt: string;
  userId: string;
};

export default function UsersUI() {
  const [teamWorkflows, setTeamWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const fetchTeamWorkflows = async () => {
      try {
        const res = await fetch("/api/team-workflows");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.workflows)) {
            setTeamWorkflows(
              data.workflows.map((w: any) => ({
                id: w.id,
                name: w.name,
                description: w.description,
                updatedAt: new Date(w.updatedAt || w.createdAt).toLocaleString(),
                userId: w.userId,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Error fetching team workflows:", err);
      }
    };

    fetchTeamWorkflows();
  }, []);

  const cleanName = (name: string) => {
    let trimmed = name.replace(/copy of\s*/i, "");

    const parts = trimmed.split("_");
    if (parts.length === 3 && /^\d+$/.test(parts[1])) {
      trimmed = `${parts[0]}_${parts[2]}`;
    }

    return trimmed;
  };

  const handleRunWorkflow = (id: string) => {
    const url = `${window.location.origin}/workflow-runner?workflowid=${id}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl p-4">
        <h1 className="text-2xl font-bold mb-12 mt-4 ml-5">Workflow UI's</h1>

        <div className="flex flex-col gap-8 mt-3">
          {teamWorkflows.length > 0 ? (
            teamWorkflows.map((wf) => (
              <div
                key={wf.id}
                className="
            bg-white border border-gray-200 rounded-xl px-6 py-4 
            shadow-sm hover:shadow-md 
            hover:bg-gray-50 
            transition-all duration-300 
            flex items-center
        "
              >
                {/* Left Content */}
                <div className="flex-1 mr-6 ml-10">
                  <div className="text-lg font-semibold text-gray-900">
                    {cleanName(wf.name)}
                  </div>

                  <div className="text-gray-500 text-sm mt-1">
                    {wf.description || "No description"}
                  </div>

                  <div className="text-gray-400 text-xs mt-1">
                    Updated {wf.updatedAt}
                  </div>
                </div>

                {/* Actions (slightly shifted left) */}
                <div className="flex items-center gap-3 mr-20">
                  <button
                    onClick={() => handleRunWorkflow(wf.id)}
                    className="
                p-3 rounded-full 
                bg-heat-100 hover:bg-heat-200 
                text-white shadow-sm hover:shadow-md 
                transition flex items-center justify-start
            "
                    title="Run Workflow"
                  >
                    <Play className="w-23 h-23" />
                  </button>
                </div>
              </div>

            ))
          ) : (
            <div className="text-gray-500 text-center py-10">
              No team workflows found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
