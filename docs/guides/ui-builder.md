# UI Builder Guide

A comprehensive guide to building custom interfaces that invoke workflows with real-time streaming responses.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Component Reference](#component-reference)
4. [Architecture](#architecture)
5. [Visual Guide](#visual-guide)
6. [Customization](#customization)

---

## Overview

The UI Builder enables users to:
- Drag and drop UI components (buttons, inputs, cards, etc.) onto a canvas
- Configure component properties visually
- Select a workflow to execute
- Trigger workflows from UI components (typically buttons)
- View real-time streaming responses as workflows execute

### Location

**Page:** `/ui-builder` ([app/ui-builder/page.tsx](../../app/ui-builder/page.tsx))

**Components:**
- `UIBuilderCanvas` - Main canvas orchestrator ([components/ui-builder/UIBuilderCanvas.tsx](../../components/ui-builder/UIBuilderCanvas.tsx))
- `ComponentPalette` - Draggable component library ([components/ui-builder/ComponentPalette.tsx](../../components/ui-builder/ComponentPalette.tsx))
- `DropZone` - Canvas drop area ([components/ui-builder/DropZone.tsx](../../components/ui-builder/DropZone.tsx))
- `DroppedComponent` - Individual component renderer ([components/ui-builder/DroppedComponent.tsx](../../components/ui-builder/DroppedComponent.tsx))
- `WorkflowSelector` - Workflow dropdown ([components/ui-builder/WorkflowSelector.tsx](../../components/ui-builder/WorkflowSelector.tsx))
- `ResponseDisplay` - Real-time response viewer ([components/ui-builder/ResponseDisplay.tsx](../../components/ui-builder/ResponseDisplay.tsx))

### Features

#### 1. Drag-and-Drop Interface

Built with `@dnd-kit/core` for smooth drag-and-drop interactions:

**Available Components:**
- Button - Triggers workflow execution
- Input - Text input field
- Text Area - Multi-line text input
- Card - Content card with title and body
- Heading - H1, H2, or H3 headings
- Text - Paragraph text
- Image - Display images

#### 2. Component Configuration

Each component can be configured with:
- Visual properties (labels, placeholders, text)
- Styling variants (primary/secondary buttons)
- User input values (inputs and textareas)

#### 3. Workflow Integration

- **Workflow Selection:** Choose from user's saved workflows via dropdown
- **Execution:** Click button components to trigger workflow
- **Input Mapping:** Input and textarea values are automatically collected and sent as workflow inputs

#### 4. Real-Time Streaming Responses

Uses Server-Sent Events (SSE) to stream workflow execution:

**Events Displayed:**
- `workflow_started` - Workflow begins
- `node_started` - Node execution starts
- `node_completed` - Node finishes with results
- `node_failed` - Node error
- `workflow_completed` - Workflow finishes
- `error` - Error occurred

---

## Quick Start

### Step 1: Access the UI Builder

1. Sign in to your account
2. Click **"UI Builder"** in the top navigation
3. You'll see three panels:
   - **Left:** Component Palette
   - **Center:** Canvas
   - **Right:** Response Display

### Step 2: Build Your UI

**Drag components from the left palette onto the canvas:**

1. **Add a heading** - Drag "Heading" component, set text to "Product Research"
2. **Add an input** - Drag "Input" component, set label to "Product URL"
3. **Add a text area** - Drag "Text Area" component, set label to "Search Keywords"
4. **Add a button** - Drag "Button" component, set label to "Start Research"

**Configure each component:**
- Click the ⚙️ (settings) icon to edit properties
- Change text, labels, placeholders
- Choose button variants (primary/secondary)

### Step 3: Select a Workflow

1. At the top of the page, use the **"Select Workflow"** dropdown
2. Choose an existing workflow (e.g., "Amazon Product Research")
3. This workflow will execute when you click buttons

### Step 4: Execute and View Results

1. Fill in the input fields you created
2. Click your button component
3. Watch the **right sidebar** for real-time updates:
   - Workflow starts
   - Each node executes
   - View outputs
   - See final results

### Example Use Cases

#### 1. Web Scraping Form
```
Components:
- Heading: "Web Scraper"
- Input: "Website URL"
- Button: "Scrape Now"

Workflow: Simple web scraper
Result: Extracted content appears in sidebar
```

#### 2. Stock Analysis Dashboard
```
Components:
- Heading: "Stock Analysis"
- Input: "Stock Ticker (e.g., AAPL)"
- Button: "Analyze"

Workflow: Stock research workflow
Result: Real-time analysis with price, news, recommendations
```

#### 3. Customer Support Ticket
```
Components:
- Heading: "Submit Support Ticket"
- Input: "Your Name"
- Input: "Email"
- Text Area: "Describe your issue"
- Button: "Submit & Auto-Categorize"

Workflow: Ticket categorization workflow
Result: AI categorizes ticket and suggests response
```

#### 4. Content Generator
```
Components:
- Heading: "Blog Post Generator"
- Input: "Topic"
- Text Area: "Key Points"
- Button: "Generate Post"

Workflow: Content generation workflow
Result: AI-generated blog post with SEO optimization
```

---

## Component Reference

### Button
- **Purpose:** Trigger workflow execution
- **Props:**
  - Label: Button text
  - Variant: primary (red) or secondary (gray)
- **Behavior:** Clicking executes the selected workflow

### Input
- **Purpose:** Single-line text input
- **Props:**
  - Label: Field label
  - Placeholder: Hint text
  - Value: Current input value
- **Behavior:** Value sent to workflow as input

### Text Area
- **Purpose:** Multi-line text input
- **Props:**
  - Label: Field label
  - Placeholder: Hint text
  - Rows: Number of lines
  - Value: Current input value
- **Behavior:** Value sent to workflow as input

### Card
- **Purpose:** Display content in a card
- **Props:**
  - Title: Card heading
  - Content: Card body text
- **Behavior:** Static display

### Heading
- **Purpose:** Page/section titles
- **Props:**
  - Text: Heading content
  - Level: h1, h2, or h3
- **Behavior:** Static display

### Text
- **Purpose:** Paragraph text
- **Props:**
  - Text: Content
- **Behavior:** Static display

### Image
- **Purpose:** Display images
- **Props:**
  - URL: Image source
  - Alt: Alternative text
- **Behavior:** Static display

### How Input Values Work

When you click a button to execute a workflow:

1. **All input and textarea values are collected**
2. **Values are sent as workflow inputs** with keys based on labels:
   - "Product URL" → `product_url`
   - "Search Keywords" → `search_keywords`
3. **Workflow receives inputs** and can use them with `{{input.product_url}}`

**Example:**
```
Input Label: "Website URL"
User enters: "https://example.com"
Workflow receives: { "website_url": "https://example.com" }
```

### Real-Time Response Events

The right sidebar shows these event types:

| Event | Icon | Meaning |
|-------|------|---------|
| `workflow_started` | 🕐 | Workflow execution begins |
| `node_started` | ⏳ | A node starts processing |
| `node_completed` | ✅ | Node finishes successfully |
| `node_failed` | ❌ | Node encounters error |
| `workflow_completed` | ✅ | Entire workflow done |
| `error` | ❌ | Error occurred |

Each event shows:
- Event type and time
- Node name (for node events)
- Output/result data
- Detailed information (expandable)

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         UI Builder Page                              │
│                      (/ui-builder/page.tsx)                         │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      UIBuilderCanvas Component                       │
│  • Manages component state                                          │
│  • Handles drag-and-drop context                                    │
│  • Orchestrates workflow execution                                  │
│  • Collects input values                                            │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────────┐
│ ComponentPalette │  │   DropZone   │  │ ResponseDisplay  │
│                  │  │              │  │                  │
│ • Draggable      │  │ • Droppable  │  │ • SSE Events     │
│   components     │  │   area       │  │ • Real-time      │
│ • Source of      │  │ • Canvas     │  │   updates        │
│   UI elements    │  │   grid       │  │ • Event icons    │
└──────────────────┘  └──────────────┘  └──────────────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │  DroppedComponent    │
                   │                      │
                   │ • Renders UI element │
                   │ • Editable props     │
                   │ • Executes workflow  │
                   └──────────────────────┘
```

### Data Flow

#### Component Creation Flow

```
User Drags Component
        │
        ▼
┌───────────────────┐
│ ComponentPalette  │ (useDraggable)
│ Component ID      │
└───────────────────┘
        │
        ▼ Drag Start Event
┌───────────────────┐
│  UIBuilderCanvas  │ (DndContext)
│  setActiveId()    │
└───────────────────┘
        │
        ▼ Drag End Event
┌───────────────────┐
│    DropZone       │ (useDroppable)
│    over.id        │
└───────────────────┘
        │
        ▼ Create Component
┌───────────────────────────┐
│  UIBuilderCanvas          │
│  components.push({        │
│    id: 'button-123',      │
│    type: 'button',        │
│    props: { label: '...' }│
│  })                       │
└───────────────────────────┘
        │
        ▼ Render
┌───────────────────┐
│ DroppedComponent  │
│ Renders button    │
└───────────────────┘
```

#### Workflow Execution Flow

```
User Fills Inputs → User Clicks Button
        │                    │
        ▼                    ▼
┌──────────────────────────────────┐
│      DroppedComponent            │
│      onClick Handler             │
│      • Collect component props   │
│      • Call onExecute()          │
└──────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│      UIBuilderCanvas             │
│      handleExecuteWorkflow()     │
│      • Collect all input values  │
│      • Build inputs object       │
└──────────────────────────────────┘
                │
                ▼
        Inputs Object
        {
          "product_url": "https://...",
          "search_keywords": "laptop"
        }
                │
                ▼
┌──────────────────────────────────────────┐
│  POST /api/workflows/{id}/execute-stream │
│  • Authorization: Bearer <token>         │
│  • Body: inputs object                   │
└──────────────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│    Workflow Execution API        │
│    • Validate auth               │
│    • Fetch workflow from Convex  │
│    • Create LangGraphExecutor    │
│    • Start streaming execution   │
└──────────────────────────────────┘
                │
                ▼
        SSE Stream Events
                │
                ▼
┌──────────────────────────────────┐
│      UIBuilderCanvas             │
│      • Read SSE stream           │
│      • Parse events              │
│      • Update responses state    │
└──────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│      ResponseDisplay             │
│      • Map events to UI          │
│      • Show icons & timestamps   │
│      • Display results           │
└──────────────────────────────────┘
```

### Component State Management

#### UIBuilderCanvas State

```typescript
const [components, setComponents] = useState<UIComponent[]>([
  {
    id: 'button-1699123456789',
    type: 'button',
    props: { label: 'Click Me', variant: 'primary' },
    position: { x: 100, y: 50 }
  },
  {
    id: 'input-1699123456790',
    type: 'input',
    props: { label: 'URL', placeholder: 'Enter URL...', value: '' },
    position: { x: 100, y: 150 }
  }
]);

const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('');
const [workflowResponses, setWorkflowResponses] = useState<WorkflowResponse[]>([]);
const [isExecuting, setIsExecuting] = useState(false);
const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
```

### Technology Stack

#### Frontend
- **React 19** - UI components
- **Next.js 16** - App Router, API routes
- **@dnd-kit/core** - Drag and drop
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Convex React** - Real-time queries

#### Backend
- **Next.js API Routes** - Server endpoints
- **Convex** - Database & real-time updates
- **LangGraph** - Workflow execution
- **Server-Sent Events (SSE)** - Streaming responses

### API Integration

**Endpoint:** `POST /api/workflows/{workflowId}/execute-stream`

**Request Body:**
```json
{
  "input_field": "value from input component",
  "text_area": "value from textarea component"
}
```

**Response:** Server-Sent Events stream

```
event: node_completed
data: {"nodeId":"agent_1","result":{"output":"..."}}

event: workflow_completed
data: {"status":"completed","results":{...}}
```

---

## Visual Guide

### Application Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Header                                                                      │
│  [Logo]           [UI Builder] [GitHub]  [Sign In] / [User Avatar]         │
└─────────────────────────────────────────────────────────────────────────────┘
│
│  Workflow Selector Bar
│  Select Workflow: [▼ Amazon Product Research          ] 5 workflows available
│
┌─────────────────┬────────────────────────────────────┬──────────────────────┐
│  Palette        │         Canvas                      │   Response Display   │
│  (256px)        │         (flex)                      │   (384px)            │
│─────────────────│────────────────────────────────────│──────────────────────│
│                 │                                     │                      │
│ UI Components   │  ┌──────────────┐  ┌────────────┐  │ Workflow Response    │
│                 │  │   Heading    │  │   Input    │  │                      │
│ 🔘 Button       │  │ "Product..."  │  │ Label: URL │  │ ⏰ Workflow started │
│ 📝 Input        │  │              │  │ [_______]  │  │                      │
│ 📄 Text Area    │  └──────────────┘  └────────────┘  │ ⏳ Node: Scraper    │
│ 🃏 Card         │                                     │                      │
│ 📌 Heading      │  ┌──────────────┐  ┌────────────┐  │ ✅ Scraper complete │
│ 📝 Text         │  │  Text Area   │  │   Button   │  │ Output: "Found..."   │
│ 🖼️  Image       │  │ Keywords...  │  │ [Search]   │  │                      │
│                 │  │ [_________]  │  │            │  │ ⏳ Node: Analyzer   │
│ Drag components │  │ [_________]  │  │            │  │                      │
│ onto canvas     │  └──────────────┘  └────────────┘  │ ✅ Analysis done    │
│                 │                                     │                      │
│                 │  Drop components here               │ ✅ Workflow complete │
│                 │                                     │                      │
└─────────────────┴────────────────────────────────────┴──────────────────────┘
```

### Component States

#### Component in Palette (Draggable)
```
┌──────────────────┐
│ 🔘 Button        │  ← Hover: border turns red
│                  │  ← Click & drag: becomes semi-transparent
└──────────────────┘
```

#### Component on Canvas (Dropped)
```
┌────────────────────────┐
│ BUTTON            ⚙️ ❌ │  ← Hover: shows settings & delete icons
│────────────────────────│
│  [Click Me]            │  ← Actual rendered component
└────────────────────────┘
```

#### Component Being Edited
```
┌────────────────────────┐
│ BUTTON            ⚙️ ❌ │
│────────────────────────│
│ Label:                 │
│ [Click Me___________]  │  ← Editable fields
│                        │
│ Variant:               │
│ [▼ Primary       ]     │
│                        │
│ [Save Changes]         │
└────────────────────────┘
```

### Response Event Visualizations

#### workflow_started
```
┌─────────────────────────────────────┐
│ 🕐 WORKFLOW STARTED         10:30am │  ← Blue background
│ Amazon Product Research             │
│ 8 nodes to execute                  │
└─────────────────────────────────────┘
```

#### node_started
```
┌─────────────────────────────────────┐
│ ⏳ NODE STARTED             10:30am │  ← Blue background
│ Firecrawl Scraper                   │  ← Spinner animates
│ Type: mcp                           │
└─────────────────────────────────────┘
```

#### node_completed
```
┌─────────────────────────────────────┐
│ ✅ NODE COMPLETED           10:31am │  ← Green background
│ Firecrawl Scraper                   │
│ ┌─────────────────────────────────┐ │
│ │ Output:                         │ │  ← Code block
│ │ "Successfully scraped 10        │ │
│ │  products from Amazon..."       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### node_failed
```
┌─────────────────────────────────────┐
│ ❌ NODE FAILED              10:31am │  ← Red background
│ Firecrawl Scraper                   │
│ Error: Rate limit exceeded          │  ← Red text
└─────────────────────────────────────┘
```

#### workflow_completed
```
┌─────────────────────────────────────┐
│ ✅ WORKFLOW COMPLETED       10:32am │  ← Dark green
│ Status: completed                   │
│ ▼ View all results (8 nodes)       │  ← Expandable
│   ┌───────────────────────────────┐ │
│   │ {                             │ │
│   │   "scraper": {...},           │ │  ← Full JSON
│   │   "analyzer": {...}           │ │
│   │ }                             │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Color Coding System

```
Events:
🔵 Blue    = In Progress (workflow_started, node_started)
🟢 Green   = Success (node_completed, workflow_completed)
🔴 Red     = Error (node_failed, error)
🟡 Yellow  = State Update (state_update)
⚪ Gray    = Unknown/Other

Backgrounds:
bg-blue-500/10    = Light blue (in progress)
bg-green-500/10   = Light green (success)
bg-red-500/10     = Light red (error)
bg-yellow-500/10  = Light yellow (update)
```

---

## Customization

### Adding New Component Types

1. **Add to ComponentPalette:**
```typescript
{ id: "newtype", label: "New Type", icon: "🎨" }
```

2. **Add default props in UIBuilderCanvas:**
```typescript
case "newtype":
  return { text: "Default text", variant: "default" };
```

3. **Add renderer in DroppedComponent:**
```typescript
case "newtype":
  return <div>{component.props.text}</div>;
```

4. **Add editor in DroppedComponent:**
```typescript
case "newtype":
  return (
    <input
      value={localProps.text}
      onChange={(e) => setLocalProps({...localProps, text: e.target.value})}
    />
  );
```

### Styling

Uses Tailwind CSS with design system variables:
- `bg-background-base` - Base background
- `bg-background-elevated` - Elevated surfaces
- `border-border-faint` - Subtle borders
- `text-text-primary` - Primary text
- `text-text-secondary` - Secondary text
- `bg-heat-100` - Primary action color

---

## Tips and Best Practices

### 1. Input Naming
- Use clear, descriptive labels
- Labels become input keys (spaces → underscores)
- Keep labels consistent with workflow expectations

### 2. Component Organization
- Start with a heading to describe the form
- Group related inputs together
- Place the action button at the bottom

### 3. Workflow Selection
- Choose workflows that match your input fields
- Test workflows first in the main workflow builder
- Ensure workflow expects the inputs you're providing

### 4. Testing
- Fill in test data
- Click button to execute
- Watch sidebar for errors
- Adjust inputs if workflow fails

### 5. Layout
- Components appear in a responsive grid
- Delete unwanted components with ❌ icon
- Edit properties with ⚙️ icon
- Components can't be repositioned yet (future feature)

---

## Common Issues

### "Please select a workflow first"
**Problem:** No workflow selected
**Solution:** Use the workflow dropdown at the top

### "Workflow {id} not found"
**Problem:** Invalid workflow ID or workflow deleted
**Solution:** Choose a different workflow from dropdown

### No response in sidebar
**Problem:** Workflow not executing or taking time
**Solution:** Check console for errors, verify workflow exists

### Input values not reaching workflow
**Problem:** Label → key mapping issue
**Solution:** Use simple labels without special characters

---

## Future Enhancements

Potential improvements:
- [ ] Layout grid with positioning
- [ ] Component grouping/containers
- [ ] Save/load UI configurations
- [ ] More component types (dropdowns, checkboxes, radio buttons)
- [ ] Conditional component visibility based on workflow state
- [ ] Form validation
- [ ] Response mapping to update UI components
- [ ] Export UI as standalone page
- [ ] Theme customization
- [ ] Mobile responsive preview

---

## Development

**Run locally:**
```bash
npm run dev
# Visit http://localhost:3000/ui-builder
```

**Test workflow integration:**
1. Create a workflow in the main workflow builder
2. Go to UI Builder
3. Add components
4. Select your workflow
5. Click button to execute

---

## Related Files

- Workflow execution API: [app/api/workflows/[workflowId]/execute-stream/route.ts](../../app/api/workflows/[workflowId]/execute-stream/route.ts)
- Workflow storage: [convex/workflows.ts](../../convex/workflows.ts)
- Main workflow builder: [components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx](../../components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx)

---

**Built for:** Open Agent Builder
**Last Updated:** 2026-02-13
**Status:** Production Ready ✅
