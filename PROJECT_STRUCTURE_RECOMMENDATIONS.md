# Project Structure Recommendations for SaaS Scalability

## Executive Summary
The current project structure is functional but shows signs of "horizontal layering" (grouping by file type: components, lib, hooks) which can become unmanageable at scale. To support a SaaS deployment with multiple features (Auth, Billing, Workflows, Settings), we recommend migrating towards a **Feature-Based Architecture (Vertical Slices)**.

## 1. Proposed Directory Structure

```
src/
├── app/                    # Next.js App Router (Keep thin)
│   ├── (auth)/             # Auth routes
│   ├── (dashboard)/        # App routes
│   └── api/                # API routes
├── features/               # 🚀 NEW: Vertical Slices
│   ├── workflows/          # All workflow logic
│   │   ├── components/     # Workflow-specific UI
│   │   ├── hooks/          # Workflow hooks
│   │   ├── lib/            # Core engine (was lib/workflow)
│   │   └── types/          # Workflow types
│   ├── auth/               # Auth feature
│   └── billing/            # Billing feature
├── components/             # Global Shared Components
│   ├── ui/                 # Base UI atoms (Shadcn)
│   ├── layout/             # Global layouts (Header, Sidebar)
│   └── effects/            # Visual effects (from components/shared)
├── lib/                    # Global Utilities
│   ├── db/                 # Database config
│   └── utils/              # Generic helpers
└── convex/                 # Backend Functions
```

## 2. Specific Refactoring Steps

### A. Clean up `components/shared`
Currently, `components/shared` contains 131 items. It mixes generic UI, layout, and specific effects.
*   **Action:** Move `header`, `layout`, `section-head` to `components/layout`.
*   **Action:** Move `effects`, `hero-flame`, `ascii-background` to `components/effects`.
*   **Action:** Move generic UI atoms to `components/ui`.

### B. Modularize `lib/workflow`
`lib/workflow` has many top-level files and a massive `langgraph.ts`.
*   **Action:** Create `lib/workflow/variables/` and move `variable-extractor.ts`, `variable-substitution.ts`, `deep-variable-extractor.ts` there.
*   **Action:** Create `lib/workflow/security/` and move `ssrf-protection.ts`, `validation.ts`.
*   **Action:** Split `langgraph.ts` into `engine/executor.ts`, `engine/state.ts`, and `engine/nodes.ts`.

### C. Adopt Feature Folders
Instead of having `components/app/(home)/sections/workflow-builder`, move this to `features/workflows/components/builder`.
*   **Benefit:** When working on Workflows, you have all related code (UI, logic, types) in one place.

## 3. Scalability Benefits
1.  **Discoverability:** New developers know exactly where to look for a feature.
2.  **Isolation:** Changes in "Billing" won't accidentally break "Workflows".
3.  **Code Splitting:** Easier to lazy load entire features.
4.  **Ownership:** Teams can own specific features in the future.

## 4. Immediate Next Steps
1.  Create the `features/` directory.
2.  Start by moving the `workflows` domain logic from `lib/workflow` to `features/workflows/lib`.
3.  Refactor `components/shared` into `layout` and `effects`.
