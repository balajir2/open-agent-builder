# Webhooks

Webhook integration documentation for Open Agent Builder.

## Overview

Webhooks allow you to receive real-time notifications when workflow executions complete.

## Setup (Future Feature)

> **Note:** Webhooks are planned for a future release. Current workflow execution uses Server-Sent Events (SSE) for real-time updates.

### Expected Workflow

1. **Configure Webhook URL** in workflow settings
2. **Execute Workflow**
3. **Receive POST Request** at your URL when execution completes

### Payload Format (Planned)

```json
{
  "event": "workflow.completed",
  "timestamp": 1732419605000,
  "data": {
    "executionId": "exec_456",
    "workflowId": "wf_123",
    "status": "completed",
    "input": { ... },
    "output": { ... },
    "duration": 5420
  }
}
```

### Signature Verification (Planned)

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(expected, signature)
```

## Current Alternative: SSE

For real-time updates, use Server-Sent Events:

```javascript
const eventSource = new EventSource('/api/workflows/wf_123/execute-stream');

eventSource.addEventListener('workflow_completed', (e) => {
  const data = JSON.parse(e.data);
  // Handle completion
});
```

See [rest-api.md](./rest-api.md#execute-workflow-streaming) for details.

## Related Documentation

- [rest-api.md](./rest-api.md) - API reference
- [execution-engine.md](../architecture/execution-engine.md) - Execution flow
