"use client";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";

interface WorkflowSelectorProps {
  selectedWorkflowId: string;
  onSelectWorkflow: (workflowId: string) => void;
}

export default function WorkflowSelector({
  selectedWorkflowId,
  onSelectWorkflow,
}: WorkflowSelectorProps) {
  const { isAuthenticated } = useConvexAuth();
  const workflows = useQuery(api.workflows.listAll, isAuthenticated ? {} : "skip");


  const filteredWorkflows =
    workflows?.filter(
      (workflow) =>
        !workflow.name?.trim().toLowerCase().startsWith("copy of")
    ) || [];

  return (
    <div className="flex items-center gap-12">
      <label className="text-sm font-medium whitespace-nowrap">
        Select Workflow:
      </label>

      <select
        value={selectedWorkflowId}
        onChange={(e) => onSelectWorkflow(e.target.value)}
        className="flex-1 px-12 py-8 bg-background-base border border-border-faint rounded-8 focus:outline-none focus:border-heat-100"
      >
        <option value="">-- Choose a workflow --</option>
        {filteredWorkflows.map((workflow) => (
          <option key={workflow._id} value={workflow.customId || workflow._id}>
            {workflow.name}
          </option>
        ))}
      </select>

      <div className="text-xs text-text-secondary">
        {workflows
          ? `${filteredWorkflows.length} of ${workflows.length} workflows available`
          : "Loading..."}
      </div>
    </div>
  );
}
