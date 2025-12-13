# Gamma AI Node Implementation

**Last Updated:** December 13, 2025

## Overview

The Gamma AI node enables users to generate professional presentations, documents, and webpages directly within workflows using the Gamma API v0.2. This integration allows seamless conversion of workflow data into polished, shareable content.

## Features

### Core Functionality
- **Presentation Generation**: Create slide decks from workflow data
- **Document Creation**: Generate formatted documents
- **Webpage Building**: Create web-ready content
- **Variable Integration**: Use workflow variables via `{{variableName}}` syntax
- **Real-time Polling**: Automatic status checking with 1-minute initial wait + 30-second intervals
- **URL Output**: Returns shareable Gamma.app URLs in `lastOutput`

### Configurable Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `prompt` | string | `Generate a presentation using data from {{lastOutput}}` | Main instruction for Gamma AI |
| `format` | dropdown | `presentation` | Output type: presentation, document, or webpage |
| `textMode` | dropdown | `generate` | Content mode: generate (AI creates) or paste (uses input as-is) |
| `numCards` | number | `10` | Number of slides/sections to generate |
| `textAmount` | dropdown | `medium` | Content density: brief, medium, or detailed |
| `imageSource` | dropdown | `aiGenerated` | Image source: aiGenerated, search, or none |
| `language` | text | `en` | Output language code (ISO 639-1) |

## Architecture

### File Structure

```
lib/workflow/executors/
  └── gamma.ts                 # Gamma API executor

components/app/(home)/sections/workflow-builder/
  └── GammaNodePanel.tsx       # UI configuration panel

lib/workflow/
  └── langgraph.ts             # LangGraph integration (case 'gamma-ai')
```

### Data Flow

1. **User Configuration** → GammaNodePanel updates node data
2. **Workflow Execution** → LangGraph calls `executeGammaNode()`
3. **API Request** → POST to `https://public-api.gamma.app/v0.2/generations`
4. **Polling** → GET status every 30s until completed/failed
5. **Output** → URL stored in `lastOutput` variable
6. **Next Node** → Can reference via `{{lastOutput}}`

## Implementation Details

### Gamma Executor (`lib/workflow/executors/gamma.ts`)

**Key Functions:**
- `executeGammaNode(node, state, apiKey)` - Main entry point
- Variable substitution via `substituteVariables()`
- API key validation (system-level or user-provided)
- Timeout: 5 minutes total (configurable)
- Polling: 1 minute wait + 30-second intervals

**Request Body:**
```typescript
{
  inputText: string,           // Substituted prompt
  textMode: 'generate' | 'paste',
  format: 'presentation' | 'document' | 'webpage',
  numCards?: number,           // Optional
  textOptions?: {
    amount?: 'brief' | 'medium' | 'detailed',
    language?: string
  },
  imageOptions?: {
    source?: 'aiGenerated' | 'search' | 'none'
  }
}
```

**Response:**
```typescript
{
  success: boolean,
  generationId: string,
  url: string,                 // Gamma.app URL
  data: object,                // Full API response
  __variableUpdates: {
    lastOutput: string         // URL for next nodes
  }
}
```

### UI Panel (`GammaNodePanel.tsx`)

**Key Features:**
- VariableReferencePicker integration for easy variable insertion
- Debounced updates (300ms) to prevent excessive saves
- Advanced options collapsible section
- Real-time state management with React hooks

**State Management:**
```typescript
const [prompt, setPrompt] = useState(nodeData?.prompt || 'Generate a presentation using data from {{lastOutput}}');
const [format, setFormat] = useState(nodeData?.format || 'presentation');
const [textMode, setTextMode] = useState(nodeData?.textMode || 'generate');
// ... other parameters
```

**Bug Fix Applied (Dec 13, 2025):**
- Changed `onUpdate(nodeData?.id, ...)` → `onUpdate(node.id, ...)`
- Added `onUpdate` to useEffect dependencies
- Fixed node data not saving issue

### LangGraph Integration

**Non-Agent Node Variable Updates Fix:**

Prior to this implementation, only agent nodes could update workflow variables via `__variableUpdates`. We added support for non-agent nodes:

```typescript
// In lib/workflow/langgraph.ts, createNodeExecutor()
else if (output && typeof output === 'object' && output !== null && '__variableUpdates' in output) {
  // Extract variable updates from non-agent nodes (Gamma, Extract, Arcade, etc.)
  variableUpdates = (output as any).__variableUpdates || {};
  console.log(`Extracted __variableUpdates from non-agent node ${node.id}:`, Object.keys(variableUpdates));
}
```

This ensures Gamma's URL output properly updates `lastOutput` for downstream nodes.

## API Key Configuration

### Two-Tier System

**Tier 1: System-Level (Convex Environment)**
```bash
npx convex env set GAMMA_API_KEY "sk-gamma_..."
```

**Tier 2: User-Level (Convex Database)**
- Users can add their own keys via Settings UI
- Takes precedence over system keys
- Encrypted storage in `userLLMKeys` table

### Retrieval Logic
```typescript
// In app/api/workflows/[workflowId]/execute-stream/route.ts
const apiKeys = {
  gamma: (userId ? await getToolApiKey('gamma-api', userId) : undefined)
         ?? systemKeys.gamma,
};
```

## Usage Examples

### Example 1: Basic Presentation
```yaml
Workflow: Start → Agent (research) → Gamma → End

Gamma Node Config:
  prompt: "Generate a presentation using data from {{lastOutput}}"
  format: presentation
  numCards: 10

Output: https://gamma.app/docs/[id]
```

### Example 2: Detailed Report
```yaml
Gamma Node Config:
  prompt: "Create a detailed report about {{Agent.research_data}}"
  format: document
  textMode: generate
  textAmount: detailed
  numCards: 20
  language: en
```

### Example 3: Variable Reference
```yaml
Available Variables:
  - {{input.topic}}
  - {{lastOutput}}
  - {{Agent}} or {{node_2}}

Prompt Examples:
  - "Present findings on {{input.topic}}"
  - "Summarize: {{lastOutput}}"
  - "Create slides from {{Agent}}"
```

## Testing

### Manual Test Workflow
1. Create workflow: Start → Agent (web search) → Gamma → End
2. Configure Agent to search for an address
3. Configure Gamma with: `Generate a presentation using data from {{lastOutput}}`
4. Execute workflow
5. Verify: Presentation contains address information from agent output

### Expected Log Output
```
[GammaNode] Original prompt: Generate a presentation using data from {{lastOutput}}
[GammaNode] After variable substitution: Generate a presentation using data from The address...
[GammaNode] Available state variables: [ 'input', 'lastOutput', 'Agent', 'node_2' ]
[GammaNode] State variables contents: { ... }
[GammaNode] Generation created. ID: ...
[GammaNode] Generation completed!
[LangGraph] Node node_5 mergedVariableUpdates: ['lastOutput', 'Gamma AI', 'node_5'] lastOutput: https://gamma.app/docs/...
```

## Troubleshooting

### Issue: "Gamma API key is required for server-side execution"
**Cause:** API key not set in Convex environment
**Fix:** `npx convex env set GAMMA_API_KEY "your-key"`

### Issue: Node configuration not saving
**Cause:** Bug in GammaNodePanel (using `nodeData?.id` instead of `node.id`)
**Fix:** Applied in this implementation (Dec 13, 2025)

### Issue: Variables not substituting
**Cause:** Prompt doesn't contain `{{variableName}}` syntax
**Fix:** Use VariableReferencePicker or manually add `{{lastOutput}}`

### Issue: Presentation not using workflow data
**Cause:** Default prompt doesn't reference previous output
**Fix:** Update prompt to include `{{lastOutput}}` or specific variable

## Security Considerations

### API Key Storage
- ✅ System keys stored in Convex environment (server-side)
- ✅ User keys encrypted in Convex database
- ✅ Never exposed to client-side code
- ✅ Retrieved via Convex actions (Node.js runtime)

### Input Validation
- ✅ Prompt length limits
- ✅ Parameter type validation
- ✅ Timeout protection (5 minutes max)
- ✅ API key presence check before execution

### Rate Limiting
- Gamma API has built-in rate limits
- Polling uses 30-second intervals to avoid excessive requests
- Consider implementing workflow-level rate limiting for production

## Future Enhancements

### Potential Features
- [ ] Custom polling intervals
- [ ] Retry logic for failed generations
- [ ] Template presets (pitch deck, report, etc.)
- [ ] Image upload support
- [ ] Custom themes/branding
- [ ] Batch generation support
- [ ] Export to PowerPoint/PDF

### API Updates
- Monitor Gamma API changelog for new parameters
- Update `gamma.ts` and `GammaNodePanel.tsx` as needed
- Maintain backward compatibility with existing workflows

## References

- **Gamma API Documentation**: https://developers.gamma.app/reference/v0-2-generations-create
- **Convex Environment Variables**: https://docs.convex.dev/production/environment-variables
- **LangGraph Documentation**: https://langchain-ai.github.io/langgraph/
- **Variable Substitution**: See `lib/workflow/variable-substitution.ts`

## Changelog

### December 13, 2025
- ✅ Initial Gamma AI node implementation
- ✅ Added comprehensive parameter support (format, textMode, numCards, etc.)
- ✅ Integrated VariableReferencePicker for easy variable insertion
- ✅ Fixed non-agent node `__variableUpdates` extraction in LangGraph
- ✅ Fixed GammaNodePanel save bug (`nodeData?.id` → `node.id`)
- ✅ Set default prompt to use `{{lastOutput}}`
- ✅ Added detailed logging for debugging
- ✅ Implemented two-tier API key system
- ✅ Created comprehensive documentation
