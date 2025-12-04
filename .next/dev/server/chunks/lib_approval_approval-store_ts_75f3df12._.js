module.exports = [
"[project]/lib/approval/approval-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrUpdateApprovalRecord",
    ()=>createOrUpdateApprovalRecord,
    "deleteApprovalRecord",
    ()=>deleteApprovalRecord,
    "generateApprovalId",
    ()=>generateApprovalId,
    "getApprovalRecord",
    ()=>getApprovalRecord,
    "listApprovalRecords",
    ()=>listApprovalRecords,
    "updateApprovalRecord",
    ()=>updateApprovalRecord
]);
function getMemoryStore() {
    if (!globalThis.__approvalStore) {
        globalThis.__approvalStore = new Map();
    }
    return globalThis.__approvalStore;
}
async function createOrUpdateApprovalRecord(data) {
    const now = new Date().toISOString();
    const record = {
        approvalId: data.approvalId,
        executionId: data.executionId,
        workflowId: data.workflowId,
        nodeId: data.nodeId,
        message: data.message,
        status: data.status ?? 'pending',
        userId: data.userId,
        createdAt: now,
        updatedAt: now,
        resolvedAt: data.status === 'approved' || data.status === 'rejected' ? now : undefined,
        resolvedBy: data.status === 'approved' || data.status === 'rejected' ? data.userId : undefined
    };
    // Use in-memory store
    getMemoryStore().set(record.approvalId, record);
    return record;
}
async function getApprovalRecord(approvalId) {
    // Use in-memory store
    const record = getMemoryStore().get(approvalId);
    return record ? {
        ...record
    } : null;
}
async function updateApprovalRecord(approvalId, updates) {
    const existing = await getApprovalRecord(approvalId);
    if (!existing) {
        return null;
    }
    const now = new Date().toISOString();
    const record = {
        ...existing,
        ...updates,
        updatedAt: now,
        resolvedAt: updates.status === 'approved' || updates.status === 'rejected' ? now : existing.resolvedAt,
        resolvedBy: updates.status === 'approved' || updates.status === 'rejected' ? updates.resolvedBy || existing.resolvedBy : existing.resolvedBy
    };
    // Use in-memory store
    getMemoryStore().set(approvalId, record);
    return record;
}
async function deleteApprovalRecord(approvalId) {
    // Delete from memory store
    getMemoryStore().delete(approvalId);
}
function listApprovalRecords() {
    return Array.from(getMemoryStore().values()).map((r)=>({
            ...r
        }));
}
function generateApprovalId() {
    return `approval_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
}),
];

//# sourceMappingURL=lib_approval_approval-store_ts_75f3df12._.js.map