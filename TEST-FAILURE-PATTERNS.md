# Test Failure Patterns - Lessons Learned

**Date:** February 13, 2026
**Impact:** 8-9 hours wasted fixing preventable test defects
**Root Cause:** Insufficient validation before committing changes

---

## Critical Failure Patterns Introduced

### 1. **Missing Import Statements**
**Files Affected:** 3 file test suites
**Error:** `ReferenceError: setTestAuth is not defined`

**What Happened:**
- Created/modified test files without importing required test utilities
- Files affected:
  - `tests/file-processing.spec.ts`
  - `tests/file-upload-download.spec.ts`
  - `tests/file-workflow-integration.spec.ts`

**Missing Import:**
```typescript
import { setTestAuth } from './test-auth-helper';
```

**Prevention:**
- ✅ Always verify imports when creating new test files
- ✅ Run individual test file after creation to catch import errors immediately
- ✅ Use IDE auto-import features
- ✅ Check that all referenced functions are imported before committing

---

### 2. **Missing Test Constants**
**Files Affected:** 2 file test suites
**Error:** `ReferenceError: TEST_USER_ID is not defined`

**What Happened:**
- Test files referenced `TEST_USER_ID` without defining it
- Files affected:
  - `tests/file-upload-download.spec.ts`
  - `tests/file-workflow-integration.spec.ts`

**Missing Constant:**
```typescript
const TEST_USER_ID = 'test-user-[suite-name]';
```

**Prevention:**
- ✅ Define all required constants at the top of test files
- ✅ Copy boilerplate from working test files
- ✅ Run test file immediately after creation
- ✅ Use template/snippet for test file creation

---

### 3. **Incomplete Optional Chaining**
**Files Affected:** `lib/workflow/langgraph.ts`
**Error:** `TypeError: Cannot read properties of undefined (reading 'nodes'/'id')`

**What Happened:**
- Added optional chaining in some places but missed others
- Required 6 separate fixes across different locations:
  - Line 156: `this.workflow.nodes` → `this.workflow?.nodes`
  - Line 159: `this.workflow.edges` → `this.workflow?.edges`
  - Line 179: `this.workflow.nodes` → `this.workflow?.nodes`
  - Line 315: `this.workflow.nodes` → `this.workflow?.nodes`
  - Line 326: `this.workflow.nodes` → `this.workflow?.nodes`
  - Line 1229: `this.workflow.id` → `this.workflow?.id`

**Prevention:**
- ✅ Search entire file for ALL property accesses on the object
- ✅ Use regex: `this\.workflow\.[a-zA-Z]` to find all access points
- ✅ Fix ALL occurrences in one pass, not piecemeal
- ✅ Run tests immediately after making changes
- ✅ Use TypeScript strict null checks to catch these at compile time

---

### 4. **Wrong Data Format (JSON.stringify)**
**Files Affected:** 3 test files
**Error:** `ArgumentValidationError: Value does not match validator`

**What Happened:**
- Passed stringified objects instead of actual objects to Convex mutations
- Files affected:
  - `tests/api-endpoints.spec.ts`
  - `tests/workflow-execution.spec.ts`
  - `tests/edge-cases.spec.ts`

**Wrong:**
```typescript
nodes: JSON.stringify(nodes),
edges: JSON.stringify(edges),
```

**Correct:**
```typescript
nodes: nodes,
edges: edges,
```

**Prevention:**
- ✅ Understand API schema before passing data
- ✅ Check Convex function definitions to see expected types
- ✅ Never stringify unless explicitly required
- ✅ Test with actual API calls before committing

---

### 5. **Parameter Name Mismatches**
**Files Affected:** `tests/comprehensive-regression.spec.ts`
**Error:** `ArgumentValidationError: Object is missing required field` or `Object contains extra field`

**What Happened:**
- Used wrong parameter names for Convex functions
- Examples:
  - `{ workflowId: x }` should be `{ id: x }`
  - `{ userId: x }` passed when function accepts no parameters

**Wrong:**
```typescript
api.workflows.getWorkflow, { workflowId: testWorkflowId }
api.workflows.list, { userId: TEST_USER_ID }
```

**Correct:**
```typescript
api.workflows.getWorkflow, { id: testWorkflowId }
api.workflows.list, {}  // No parameters
```

**Prevention:**
- ✅ Always check function signatures in Convex files
- ✅ Use TypeScript autocomplete to see expected parameters
- ✅ Run single test immediately after writing it
- ✅ Don't assume parameter names - verify them

---

### 6. **Broken Test Cleanup Logic**
**Files Affected:** Multiple test files
**Error:** Test data accumulating in production database (439 workflows!)

**What Happened:**
- Tests created workflows without proper cleanup
- Admin auth resulted in workflows with null userId
- Cleanup hooks didn't handle null userId workflows
- Production database filled with test data

**Issues:**
1. Missing `afterEach` cleanup hooks in some test files
2. Cleanup logic didn't account for admin auth creating null userId
3. Tests not passing `userId` parameter to `saveWorkflow`

**Prevention:**
- ✅ ALWAYS add cleanup hooks (`afterEach`) in test files
- ✅ Test cleanup logic by running suite multiple times
- ✅ Monitor database for accumulating test data
- ✅ Use unique test user IDs per test suite
- ✅ Pass explicit `userId` parameter in tests using admin auth

---

## Process Improvements Needed

### Before Making Changes:
1. **Read and understand existing code** before modifying
2. **Check ALL usages** of a variable/function you're modifying
3. **Search for patterns** (e.g., all places where `this.workflow` is accessed)
4. **Verify imports and constants** are defined

### While Making Changes:
1. **Fix ALL instances** of a problem in one pass
2. **Use search/replace** carefully with regex
3. **Run affected tests immediately** after each change
4. **Don't assume** - verify function signatures and types

### After Making Changes:
1. **Run affected test suite** before moving to next change
2. **Run full test suite** before considering work complete
3. **Check for unintended side effects** in other areas
4. **Document breaking changes** and migration steps

---

## Testing Checklist

Before committing test changes:

- [ ] All imports are present and correct
- [ ] All constants/variables are defined
- [ ] Test runs successfully in isolation
- [ ] Test cleanup logic is implemented and tested
- [ ] No test data accumulating in database
- [ ] Function signatures match actual API
- [ ] Data types match expected schema (no unnecessary JSON.stringify)
- [ ] Optional chaining added where needed
- [ ] TypeScript compilation succeeds
- [ ] Full test suite runs without new failures

---

## Time Cost Analysis

| Issue | Time to Fix | Files Affected | Tests Broken |
|-------|-------------|----------------|--------------|
| Missing imports | 30 min | 3 | ~25 |
| Missing constants | 15 min | 2 | ~20 |
| Optional chaining | 2 hours | 1 | ~15 |
| JSON.stringify | 1 hour | 3 | ~10 |
| Parameter names | 1.5 hours | 1 | ~5 |
| Cleanup logic | 3 hours | Multiple | Production impacted |
| **TOTAL** | **~8 hours** | **10+** | **~75+** |

---

## Key Takeaways

1. **Verify immediately** - Run tests after every change
2. **Fix completely** - Don't leave partial fixes
3. **Search thoroughly** - Find ALL instances of a problem
4. **Test cleanup** - Verify cleanup logic works
5. **Check types** - Match actual API signatures
6. **Import correctly** - Verify all dependencies are imported
7. **Define constants** - Don't reference undefined variables

---

## Action Items Going Forward

1. ✅ Create test file template with proper imports and cleanup
2. ✅ Document common test patterns in TESTING.md
3. ✅ Add pre-commit hook to run affected tests
4. ✅ Create script to verify no test data accumulation
5. ✅ Use TypeScript strict mode to catch more errors at compile time
6. ✅ Run subset of tests in CI on every commit (not just full suite)

---

**Remember:** Taking 5 extra minutes to verify changes saves hours of debugging later.
