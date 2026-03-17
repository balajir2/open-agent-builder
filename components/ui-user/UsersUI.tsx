"use client";

import React, { useState, useEffect } from "react";
import { Play, GripVertical, Search, Save, X, Plus } from "lucide-react";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner"; // Assuming sonner is installed/used elsewhere

// Drag and Drop imports
import { DndContext, useDraggable, useDroppable, DragEndEvent, DragOverlay, DragStartEvent, defaultDropAnimationSideEffects, DropAnimation, pointerWithin } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

// ------------------------------------------------------------------
// Internal Components
// ------------------------------------------------------------------

function DraggableWorkflowCard({ workflow, onRun, isAssigned }: { workflow: any; onRun: (id: string) => void, isAssigned?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: workflow._id,
    data: { type: "workflow", workflow },
  });

  const style = isDragging ? { opacity: 0.5 } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white border rounded-xl px-5 py-4 
        shadow-sm hover:shadow-md 
        transition-all duration-300 
        flex items-center gap-4
        mb-3
        ${isAssigned ? 'border-blue-200 bg-blue-50' : 'border-indigo-100 hover:bg-gray-50'}
      `}
    >
      <div className="cursor-grab active:cursor-grabbing flex items-center gap-3 flex-1" {...listeners} {...attributes}>
        <GripVertical size={20} className="text-indigo-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-lg text-gray-900 truncate">{workflow.name}</h4>
          {workflow.description && (
            <p className="text-sm text-gray-500 truncate mt-0.5">{workflow.description}</p>
          )}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRun(workflow.customId || workflow._id);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center flex-shrink-0 cursor-pointer"
        title="Run Workflow"
      >
        <Play size={18} className="fill-current" />
      </button>
    </div>
  );
}

function DroppableUserArea({
  user,
  assignedWorkflows,
  onRemove,
  onSave,
  isDirty
}: {
  user: any;
  assignedWorkflows: any[];
  onRemove: (id: string) => void;
  onSave: () => void;
  isDirty: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "user-drop-zone",
    data: { type: "user-target" }
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        {isDirty && (
          <button
            onClick={onSave}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
          >
            <Save size={16} />
            Save Changes
          </button>
        )}
      </div>

      {/* Drop Zone List */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 overflow-y-auto transition-colors ${isOver ? 'bg-indigo-50/30' : ''}`}
      >
        {assignedWorkflows.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center border-2 border-dashed border-gray-100 rounded-xl p-4">
            <Plus className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Drag workflows here to assign</p>
          </div>
        ) : (
          <div className="space-y-2">
            {assignedWorkflows.map(wf => {
              const isOwner = wf.userId === user.clerkId;
              return (
                <div key={wf._id} className="group flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 truncate">{wf.name}</h4>
                    {isOwner && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                        Created
                      </span>
                    )}
                  </div>
                  {!isOwner && (
                    <button
                      onClick={() => onRemove(wf._id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="Remove assignment"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------

export default function UsersUI() {
  const { isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(api.users.currentUser);

  // Strict check: Must be loaded (not undefined), logged in (not null), and have admin role
  const isAdmin = currentUser !== undefined && currentUser !== null && currentUser.role === "admin";

  // Queries
  const allWorkflows = useQuery(api.workflows.listAll, isAuthenticated ? {} : "skip") || [];
  const allUsers = useQuery(api.users.list, isAdmin ? {} : "skip") || [];

  // Mutations
  const batchUpdate = useMutation(api.workflows.batchUpdateAssignments);

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pendingAssignments, setPendingAssignments] = useState<any[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<any>(null);

  // Fetch assignments when user is selected
  // We use a separate query that depends on selectedUser
  // Note: We can't conditionally call hooks easily inside effects, so we use the hook at top level
  // Also pass "skip" if no user is selected
  const selectedUserId = selectedUser?.clerkId; // use clerkId for consistency with backend args
  // Wait, backend expects userId (string). convex/workflows.ts: getWorkflowsForUser expects "userId".
  // AND batchUpdateAssignments expects "userId". 
  // In `users.ts`, `clerkId` is the unique ID used for query.
  // We should pass `selectedUser.clerkId` as the `userId`.

  const dbAssignments = useQuery(api.workflows.getWorkflowsForUser, selectedUserId ? { userId: selectedUserId } : "skip");

  // Sync state with DB when user changes or DB updates (unless dirty)
  useEffect(() => {
    if (dbAssignments && !isDirty) {
      setPendingAssignments(dbAssignments);
    }
  }, [dbAssignments, isDirty, selectedUser]);

  // Reset dirty state when switching users
  useEffect(() => {
    setIsDirty(false);
    setPendingAssignments([]); // Clear until loaded
  }, [selectedUser?.clerkId]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'workflow') {
      setActiveWorkflow(active.data.current.workflow);
    }
  };


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveWorkflow(null); // Clear the active workflow

    if (!over || !selectedUser) return;

    if (active.data.current?.type === 'workflow' && over.id === 'user-drop-zone') {
      const workflow = active.data.current.workflow;

      // Add if not already present
      if (!pendingAssignments.find(w => w._id === workflow._id)) {
        setPendingAssignments(prev => [...prev, workflow]);
        setIsDirty(true);
      }
    }
  };

  const handleRemove = (workflowId: string) => {
    setPendingAssignments(prev => prev.filter(w => w._id !== workflowId));
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    try {
      // @ts-ignore
      await batchUpdate({
        userId: selectedUser.clerkId,
        // @ts-ignore
        workflowIds: pendingAssignments.map(w => w._id)
      });
      toast.success("Assignments saved successfully");
      setIsDirty(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save assignments");
    }
  };

  const handleRunWorkflow = (id: string) => {
    const url = `${window.location.origin}/workflow-runner?workflowid=${id}`;
    window.open(url, "_blank");
  };

  const filteredUsers = allUsers.filter((u: any) =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAdmin) {
    // Regular user view with WorkflowRunnerUI theme
    return (
      <div
        className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-8"
        style={{
          backgroundImage: `url('/wave-blue.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 rounded-xl shadow-sm border border-indigo-100">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-800 drop-shadow-sm">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                My Workflows
              </span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">Select a workflow to execute</p>
          </div>

          {/* Single Column Workflow List */}
          <div className="space-y-4">
            {allWorkflows.map((wf: any) => (
              <div
                key={wf._id}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-gray-900 truncate">{wf.name}</h3>
                  {wf.description && (
                    <p className="text-sm text-gray-500 mt-1 truncate">{wf.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRunWorkflow(wf.customId || wf._id)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center flex-shrink-0"
                >
                  <Play size={18} className="fill-current" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div
        className="flex h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
        style={{
          backgroundImage: `url('/wave-blue.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >

        {/* Left Panel: All Workflows */}
        <div className="w-1/2 flex flex-col border-r border-indigo-100 bg-white/80 backdrop-blur-sm">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight text-slate-800 drop-shadow-sm">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                All Workflows
              </span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">Drag to assign to users</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {allWorkflows.map((wf: any) => (
              <DraggableWorkflowCard
                key={wf._id}
                workflow={wf}
                onRun={handleRunWorkflow}
                // Check if assigned in current view
                isAssigned={pendingAssignments.some(p => p._id === wf._id)}
              />
            ))}
          </div>
        </div>

        {/* Right Panel: User Selection & Assignment */}
        <div className="w-1/2 flex flex-col bg-white/60 backdrop-blur-sm">
          {/* Top Bar: User Search */}
          <div className="p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-200 border-b border-indigo-100 shadow-sm">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
              <input
                type="text"
                placeholder="Search users to assign..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-white/90 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSelectedUser(null)}
              />

              {/* User Dropdown Results */}
              {!selectedUser && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg border border-indigo-100 shadow-xl max-h-60 overflow-y-auto z-50">
                  {filteredUsers.length === 0 ? (
                    <div className="p-3 text-gray-500 text-sm text-center">No users found</div>
                  ) : (
                    filteredUsers.map((u: any) => (
                      <button
                        key={u._id}
                        onClick={() => {
                          setSelectedUser(u);
                          setSearchQuery(u.name);
                        }}
                        className="w-full text-left p-3 hover:bg-indigo-50 flex flex-col border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span className="font-medium text-sm text-gray-900">{u.name}</span>
                        <span className="text-xs text-gray-500">{u.email}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 flex flex-col min-h-0">
            {selectedUser ? (
              <DroppableUserArea
                user={selectedUser}
                assignedWorkflows={pendingAssignments}
                onRemove={handleRemove}
                onSave={handleSave}
                isDirty={isDirty}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <Search className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-gray-500">Select a user to manage assignments</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <DragOverlay
        dropAnimation={null}
        modifiers={[snapCenterToCursor]}
        style={{ cursor: 'grabbing' }}
      >
        {activeWorkflow ? (
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg px-3 py-2 shadow-2xl flex items-center gap-2 max-w-[200px]"
            style={{
              pointerEvents: 'none',
              transform: 'translate(-8px, -8px)'
            }}
          >
            <GripVertical size={14} className="flex-shrink-0" />
            <span className="font-medium text-sm truncate">{activeWorkflow.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
