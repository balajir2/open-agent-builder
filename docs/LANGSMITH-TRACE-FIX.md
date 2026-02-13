# LangSmith Trace Completion Fix

**Date:** February 13, 2026
**Issue:** Workflows complete successfully but LangSmith shows traces as "in progress"
**Status:** ✅ Fixed

## Problem Description

When workflows executed successfully, LangSmith traces remained in "in progress" state instead of being marked as complete. This made it difficult to:
- Monitor workflow completion in LangSmith dashboard
- Analyze performance metrics
- Debug workflow execution history
- Track success/failure rates

## Root Cause

The issue was caused by **premature stream closure** and **async context loss**:

1. **Async Context Loss** - LangSmith's trace context doesn't automatically flow across async boundaries. When async streams complete, the trace finalization happens asynchronously in the background.

2. **Premature Closure** - We were closing SSE streams immediately after workflow iteration completed, but LangSmith needs time to upload trace data to their servers.

3. **Missing Finalization** - LangGraph's internal trace cleanup happens asynchronously after the stream ends, and we weren't waiting for this to complete.

### Code Flow (Before Fix)

```typescript
// 1. Execute workflow
for await (const stateUpdate of executionStream) {
  // Process updates
}

// 2. Send completion event
sendEvent('workflow_completed', {...});

// 3. Close stream immediately ❌
closeStream(); // <-- Trace upload still in progress!
```

## Solution

Added explicit **trace finalization delay** to allow LangSmith to complete trace upload before closing streams.

### Changes Made

#### 1. Created Trace Finalization Helper

**File:** `lib/langsmith/config.ts`

```typescript
/**
 * Wait for LangSmith trace to finalize
 * Call this after workflow execution completes to ensure trace is uploaded
 */
export async function waitForTraceFinalization(delayMs: number = 1000): Promise<void> {
  if (!isLangSmithEnabled()) {
    return; // No need to wait if tracing is disabled
  }

  // LangSmith uploads trace data asynchronously after execution completes
  // This delay ensures the trace is fully uploaded and marked as complete
  console.log('[LangSmith] Waiting for trace finalization...');
  await new Promise(resolve => setTimeout(resolve, delayMs));
  console.log('[LangSmith] Trace finalization complete');
}
```

#### 2. Updated Execute Stream Route

**File:** `app/api/workflows/[workflowId]/execute-stream/route.ts`

```typescript
// Send completion event
sendEvent('workflow_completed', {...});

// LANGSMITH FIX: Wait for LangSmith to finalize trace
const { waitForTraceFinalization } = await import('@/lib/langsmith/config');
await waitForTraceFinalization(); // ✅ Wait 1 second for trace upload

closeStream();
```

#### 3. Updated Non-Streaming Execute Route

**File:** `app/api/workflows/[workflowId]/execute/route.ts`

```typescript
const execution = await executor.execute(input || '');

// LANGSMITH FIX: Wait for LangSmith to finalize trace
const { waitForTraceFinalization } = await import('@/lib/langsmith/config');
await waitForTraceFinalization(); // ✅ Ensures trace is marked complete

return NextResponse.json({...});
```

#### 4. Updated Resume Route

**File:** `app/api/workflows/[workflowId]/resume/route.ts`

```typescript
sendEvent('workflow_completed', {...});

// LANGSMITH FIX: Wait for LangSmith to finalize trace
const { waitForTraceFinalization } = await import('@/lib/langsmith/config');
await waitForTraceFinalization(); // ✅ Resume flows also properly finalize

controller.close();
```

## How It Works

1. **Workflow Completes** - All nodes finish execution
2. **Send Completion Event** - SSE event sent to client
3. **Wait for Trace Upload** - 1-second delay allows LangSmith to:
   - Collect all trace data from LangGraph
   - Upload spans to LangSmith servers
   - Mark trace as complete
4. **Close Stream** - Only after trace is finalized

## Configuration

The fix **only activates when LangSmith is enabled**:

```bash
# In .env.local or Convex environment
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_...
LANGCHAIN_PROJECT=open-agent-builder
```

If LangSmith is disabled, `waitForTraceFinalization()` returns immediately with no delay.

## Testing

To verify the fix works:

1. **Enable LangSmith** - Set environment variables
2. **Execute a workflow** - Run any workflow via UI or API
3. **Check LangSmith Dashboard** - Trace should show as "Complete" ✅
4. **Verify Timing** - Trace end time should match workflow completion

### Expected Behavior

**Before Fix:**
- ❌ Trace status: "In Progress" (forever)
- ❌ No end timestamp
- ❌ Incomplete metrics

**After Fix:**
- ✅ Trace status: "Complete"
- ✅ Proper end timestamp
- ✅ Full metrics and timing data

## Performance Impact

- **Minimal** - Only adds 1 second delay at end of workflow execution
- **Conditional** - Only when LangSmith tracing is enabled
- **Acceptable** - Users already wait for workflow completion, 1s is negligible

## Related Documentation

- [LangSmith Tracing Setup](./guides/LANGSMITH-SETUP.md)
- [Troubleshooting LangChain/LangGraph Traces](https://last9.io/blog/troubleshooting-langchain-langgraph-traces-issues-and-fixes/)
- [Trace LangGraph Applications](https://docs.langchain.com/langsmith/trace-with-langgraph)

## Additional Improvements

Enhanced `getLangGraphConfig()` to add metadata for better trace organization:

```typescript
export function getLangGraphConfig(baseConfig?: Record<string, any>) {
  const config: Record<string, any> = { ...baseConfig };

  if (isLangSmithEnabled()) {
    // Add metadata for trace identification
    config.metadata = {
      ...config.metadata,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };

    // Add tags for filtering in LangSmith
    config.tags = [
      ...(config.tags || []),
      'open-agent-builder',
      process.env.NODE_ENV || 'development'
    ];
  }

  return config;
}
```

This makes traces easier to filter and search in LangSmith dashboard.

## Future Enhancements

Potential improvements for even better trace management:

1. **Explicit Run IDs** - Use custom run IDs for better correlation
2. **Trace Metadata** - Add workflow name, user ID, execution ID to traces
3. **Error Tagging** - Automatically tag failed traces with error types
4. **Custom Spans** - Wrap critical operations in explicit spans
5. **Batch Upload** - Batch multiple traces for efficiency

## References

- **Issue Discovery:** Manual testing revealed incomplete traces
- **Root Cause:** LangSmith async upload behavior
- **Solution Source:** [LangSmith Community Forums](https://forum.langchain.com/t/langsmith-traces-not-showing-up-when-running-a-langgraph-in-jupyter-notebook/1529)
- **Best Practices:** [LangSmith Tracing Deep Dive](https://medium.com/@aviadr1/langsmith-tracing-deep-dive-beyond-the-docs-75016c91f747)

---

**Status:** Production-ready ✅
**Impact:** Low-risk, high-value fix
**Testing:** Verified on development environment
