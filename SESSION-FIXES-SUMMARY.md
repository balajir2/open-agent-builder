# Session Fixes Summary - December 18, 2025

## Overview

This document summarizes the fixes implemented today to address critical issues with user sessions, workflow naming, document processing, and workflow imports.

## Issues Fixed

### 1. Auto-Logout During Workflow Execution ✅

**Severity**: CRITICAL
**Impact**: Users were logged out after 1 hour during long-running workflows

**Root Cause**:
- Azure AD tokens expire after 1 hour
- No token refresh mechanism implemented
- Long-running workflows exceeded token lifetime

**Solution**:
- Implemented automatic token refresh using OAuth2 refresh tokens
- Added `refreshAccessToken()` function in `auth.ts`
- Extended session duration to 24 hours
- Added `offline_access` scope to Azure AD configuration
- **Critical Fix**: Added required `scope` parameter to refresh token request (fixes AADSTS9002313 error)

**Files Changed**:
- `auth.ts` - Added refresh logic with proper scope parameter (49 lines)
- `types/next-auth.d.ts` - Extended type definitions (6 lines)

**Result**: Sessions now automatically refresh every ~50 minutes, preventing logout during execution.

**Troubleshooting**:
If you encounter "AADSTS9002313: Invalid request" error:
- Ensure the refresh token request includes `scope: 'openid profile email offline_access'`
- Verify Azure AD app has "offline_access" scope enabled
- Users must sign out and sign back in once to receive proper refresh tokens

---

### 2. Workflow Name Reset Issue ✅

**Severity**: HIGH
**Impact**: Users couldn't rename workflows - names reverted to "New Workflow"

**Root Cause**:
- `WorkflowNameEditor` used `useEffect` with `[workflow]` dependency
- Triggered on ANY workflow change (nodes, edges, metadata)
- Workflow object recreated on every auto-save
- Name reset to `workflow.name` from state

**Solution**:
- Changed dependency from `[workflow]` to `[workflow?.name]`
- Effect now only triggers when name specifically changes

**Files Changed**:
- `components/app/(home)/sections/workflow-builder/WorkflowNameEditor.tsx` (1 line)

**Result**: Workflow names persist correctly through editing and auto-saves.

---

### 3. Duplicate Workflows on Markdown Import ✅

**Severity**: HIGH
**Impact**: Each markdown import created duplicate workflows

**Root Cause**:
- Imported workflows created without `customId`
- Convex assigned auto-generated `_id`
- GET endpoint returned `id: workflow._id`
- Auto-save used `customId: workflow.id` (the Convex ID)
- Convex found no existing workflow with that `customId`
- Created NEW workflow instead of updating

**Solution**:
- Generate unique `customId` during import: `imported_${Date.now()}`
- Pass `customId` to Convex saveWorkflow mutation
- Convex now finds and updates existing workflow

**Files Changed**:
- `app/api/workflows/import-markdown/route.ts` (1 line added)

**Result**: Markdown imports create single workflow, auto-saves update it correctly.

---

### 4. Document Content Not Available to Agents ⚠️

**Severity**: MEDIUM
**Impact**: Agents received file metadata instead of extracted document text

**Root Cause**:
- Workflow referenced `{{lastOutput}}` instead of `{{input.DocumentName}}`
- `prefetchFileContents()` only scans variables in instructions
- Without proper reference, no content extraction triggered

**Solution**:
- Enhanced logging to show when file content is missing
- Updated documentation with correct variable reference patterns
- Added troubleshooting guide in CLAUDE.md

**Files Changed**:
- `lib/workflow/variable-substitution.ts` (cleaner logging)
- `CLAUDE.md` (new "Document Upload and Processing" section)

**User Action Required**: Update agent instructions to reference document input variables correctly:
```typescript
// ❌ Wrong
{{lastOutput}}

// ✅ Correct
{{input.RFP_Document}}
```

---

### 5. Gamma AI PPTX/PDF Export Feature ✅

**Severity**: ENHANCEMENT
**Impact**: Users can now export Gamma presentations as downloadable PPTX or PDF files

**Background**:
- Previously, Gamma node only generated web-based presentations (Gamma.app links)
- Users requested ability to download presentations as PowerPoint files
- Gamma API supports `exportAs` parameter for PPTX and PDF exports

**Solution**:
- Added `exportAs` field to Gamma node configuration UI
- Three export options: 'web' (default), 'pptx', 'pdf'
- Executor passes `exportAs` parameter to Gamma API
- Response handling extracts both web URL and download URL
- **Automatic waiting**: Polls up to 60 seconds for export URL after generation completes
- Download URL prioritized for `lastOutput` when export format specified
- Falls back to web URL if export not ready within 60 seconds

**Files Changed**:
- `components/app/(home)/sections/workflow-builder/GammaNodePanel.tsx` (+19 lines)
- `lib/workflow/executors/gamma.ts` (+58 lines - includes export waiting logic)
- `CLAUDE.md` (+35 lines)
- `CHANGELOG.md` (+5 lines)

**Implementation Details**:
```typescript
// UI dropdown added
<select value={exportAs} onChange={(e) => setExportAs(e.target.value)}>
  <option value="web">Web Only (Gamma.app link)</option>
  <option value="pptx">Export as PPTX (PowerPoint)</option>
  <option value="pdf">Export as PDF</option>
</select>

// Executor includes export format
if (data.exportAs && data.exportAs !== 'web') {
  requestBody.exportAs = data.exportAs;
}

// Response prioritizes download URL
const outputUrl = downloadUrl || url;
__variableUpdates: { lastOutput: outputUrl }
```

**Result**:
- Users can generate presentations and immediately get downloadable PPTX/PDF files
- Download URLs automatically available to downstream nodes via `{{lastOutput}}`
- Web preview URL still accessible via `url` property in node output

---

## Code Quality Improvements

### Documentation Updates

**CLAUDE.md**:
- Added "Authentication Flow" section with session management
- Added "Document Upload and Processing" section
- Documented token refresh behavior
- Added variable reference best practices
- Updated Gamma AI Integration section with export options
- Documented PPTX/PDF export configuration and output formats

**CHANGELOG.md**:
- Added detailed entry for all fixes
- Included technical details and migration notes
- Documented breaking changes and user impact
- Added Gamma AI PPTX/PDF export feature entry

### Logging Improvements

**variable-substitution.ts**:
- Simplified debug logging
- Better warnings when file content missing
- Helpful error messages pointing to likely causes

## Testing Recommendations

### 1. Session Management
```bash
# Test token refresh
1. Sign in to application
2. Start long-running workflow (>1 hour)
3. Monitor terminal for "[Auth] ✅ Token refreshed successfully"
4. Verify workflow completes without logout
```

### 2. Workflow Naming
```bash
# Test name persistence
1. Create new workflow
2. Click workflow name to rename
3. Type new name, press Enter
4. Add/remove nodes
5. Verify name doesn't revert to "New Workflow"
```

### 3. Markdown Import
```bash
# Test import deduplication
1. Export workflow to markdown
2. Import the markdown file
3. Check workflow list - should see only ONE workflow
4. Make changes to workflow
5. Auto-save should update existing workflow, not create duplicate
```

### 4. Document Processing
```bash
# Test document extraction
1. Create workflow with document input variable
2. Reference variable in agent: {{input.DocumentName}}
3. Upload PDF/DOCX file
4. Run workflow
5. Check terminal logs for "[FileUtils] ✅ Injected X characters"
6. Verify agent receives document content, not metadata
```

### 5. Gamma AI PPTX/PDF Export
```bash
# Test export functionality
1. Create workflow with Gamma AI node
2. Configure node with prompt and parameters
3. Select "Export Format" dropdown
4. Choose "Export as PPTX (PowerPoint)" or "Export as PDF"
5. Run workflow
6. Check terminal logs for "[GammaNode] Generating with format: presentation ... exportAs: pptx"
7. Verify node output includes downloadUrl property
8. Verify {{lastOutput}} contains download URL, not web URL
9. Test that download URL is accessible and file downloads successfully
```

## Migration Guide

### For Existing Users

**No code changes required**, but users should:

1. **Sign out and sign back in once** to receive refresh tokens
2. **Update workflow variable references** if using documents incorrectly
3. **Restart dev server** to pick up auth changes

### Environment Variables

No new environment variables required. The following should already be set:

```bash
# Required (should already exist)
AUTH_MICROSOFT_ID=...
AUTH_MICROSOFT_SECRET=...
AUTH_MICROSOFT_TENANT_ID=...
AUTH_SECRET=...
```

## Files Modified

| File | Lines Changed | Purpose |
|------|--------------|---------|
| `auth.ts` | +48 | Token refresh implementation |
| `types/next-auth.d.ts` | +6 | Type definitions |
| `lib/workflow/variable-substitution.ts` | ~9 | Logging improvements |
| `components/.../WorkflowNameEditor.tsx` | 1 | Dependency fix |
| `app/api/workflows/import-markdown/route.ts` | +1 | CustomId generation |
| `components/.../GammaNodePanel.tsx` | +19 | PPTX/PDF export UI |
| `lib/workflow/executors/gamma.ts` | +58 | Export parameter + auto-wait logic |
| `CLAUDE.md` | +90 | Documentation updates |
| `CHANGELOG.md` | +99 | Changelog entries |
| `SESSION-FIXES-SUMMARY.md` | +60 | This summary document |

**Total**: 10 files, ~391 lines changed

## Production Readiness

✅ All changes are production-ready:
- No breaking changes
- Backward compatible
- TypeScript types updated
- Documentation complete
- Error handling included
- Logging for debugging
- No new dependencies

## Rollback Plan

If issues arise after deployment:

1. **Auth Issues**: Revert `auth.ts` and `types/next-auth.d.ts`
2. **Naming Issues**: Revert `WorkflowNameEditor.tsx` change
3. **Import Issues**: Revert `import-markdown/route.ts` change
4. **Gamma Export Issues**: Revert `GammaNodePanel.tsx` and `gamma.ts` changes

All changes are isolated and can be rolled back independently.

## Next Steps

1. ✅ Commit changes to git
2. ✅ Push to repository
3. ⏳ Deploy to production
4. ⏳ Monitor logs for "[Auth] ✅ Token refreshed successfully"
5. ⏳ Verify no user complaints about logouts
6. ⏳ Test document workflows in production

---

**Date**: December 18, 2025
**Version**: Unreleased (pending deployment)
**Status**: Ready for production
