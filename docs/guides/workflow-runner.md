# Workflow Runner UI

A user-friendly interface for running workflows with custom inputs and downloading results.

## Overview

The Workflow Runner UI provides a simplified interface that allows users to:
- Select from saved workflows using a dropdown
- Enter input values for the selected workflow
- Run the workflow with a single click
- View real-time streaming responses
- Download results in various formats (HTML, DOCX, PPT)

## Features

### 1. Workflow Selection with Search
- Dropdown menu displays all available workflows
- Search functionality to quickly find workflows
- Selecting a workflow automatically shows relevant input fields

### 2. Input Fields with Validation
- Dynamic input fields based on the selected workflow
- Automatic field type detection (text, number, select)
- Input validation based on field type and requirements
- Visual feedback for validation errors

### 3. Save/Load Input Presets
- Save commonly used input configurations as presets
- Load presets with a single click
- Manage multiple presets per workflow
- Persistent storage across sessions

### 4. Execution Controls
- Prominent "Run Workflow" button
- Visual feedback during execution
- Error handling for failed workflows
- Validation before execution

### 5. Results Display
- Real-time updates as the workflow executes
- Clear indication of node execution status
- Formatted output from each node

### 6. Export Options
- Download results in multiple formats:
  - HTML Document
  - Word Document (.docx)
  - PowerPoint Presentation (.pptx)
- Success notification showing file save location

## Getting Started

### Accessing the Workflow Runner

1. Navigate to `/workflow-runner` in your browser
2. Or click the "Workflow Runner" link in the main navigation

### Running a Workflow

1. Select a workflow from the dropdown menu
2. Fill in the required input fields
3. Click the "Run Workflow" button
4. Watch real-time execution in the results panel

### Downloading Results

1. After a workflow completes, click the "Download" button
2. Choose your preferred format (HTML, DOCX, or PPT)
3. The file will be saved to your browser's download location

## Implementation Details

### Components

- `WorkflowRunnerUI` - Main component ([components/workflow-runner/WorkflowRunnerUI.tsx](components/workflow-runner/WorkflowRunnerUI.tsx))
- `FileLocationModal` - Download success notification ([components/ui/FileLocationModal.tsx](components/ui/FileLocationModal.tsx))

### Pages

- Workflow Runner Page - `/workflow-runner` ([app/workflow-runner/page.tsx](app/workflow-runner/page.tsx))

### API Endpoints

- Workflow Details - `GET /api/workflows/[workflowId]/details` ([app/api/workflows/[workflowId]/details/route.ts](app/api/workflows/[workflowId]/details/route.ts))
- Workflow Search - `GET /api/workflows/search` ([app/api/workflows/search/route.ts](app/api/workflows/search/route.ts))
- Workflow Presets - `GET/POST/DELETE /api/workflows/[workflowId]/presets` ([app/api/workflows/[workflowId]/presets/route.ts](app/api/workflows/[workflowId]/presets/route.ts))

### Utilities

- Workflow Analyzer - ([utils/workflow-analyzer.ts](utils/workflow-analyzer.ts))

### Integration Points

- Uses the same workflow execution API as the UI Builder
- Fetches workflow list from the Convex database
- Displays streaming responses in real-time
- Leverages existing document export utilities
- Stores input presets in localStorage (can be extended to database)

## Future Enhancements

Potential improvements:
- [x] Save input values for future runs
- [x] Workflow search and filtering
- [x] Input validation based on workflow requirements
- [ ] Workspace/folder organization for workflows
- [ ] Share workflow results via link
- [ ] Batch processing of multiple workflows
- [ ] Custom templates for results display
- [ ] Server-side storage of presets (currently in localStorage)
- [ ] Advanced filtering by tags and categories
- [ ] Input field dependencies (conditional fields based on other values)

---

**Built for:** Open Agent Builder
**Status:** Production Ready ✅