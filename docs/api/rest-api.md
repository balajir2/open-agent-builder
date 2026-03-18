# REST API Reference

Complete API documentation for Open Agent Builder.

## Authentication

All API endpoints require authentication. Two methods are supported:

### Method 1: Azure AD Session (UI Users)

Authenticated automatically via NextAuth.js when using the browser UI. Session cookies are sent with each request.

### Method 2: API Key (Programmatic Access)

```bash
curl -H "Authorization: Bearer <your-api-key>" \
  https://your-domain.com/api/workflows/{id}/execute
```

**Generate API Key:**
1. Settings → API Keys
2. Click "Generate New Key"
3. Copy key (shown once)

**How API Key Auth Works on Execute Routes:**
- The execute and execute-stream routes detect whether the request uses session auth or API key auth
- For API key auth, the route validates the key and then uses the `workflows.getWorkflowForExecution` Convex action to retrieve the workflow
- This action validates requests via `CONVEX_TEST_SECRET` and supports lookup by both `customId` and Convex document ID
- **Requirement:** `CONVEX_TEST_SECRET` must be set in both Convex environment and Vercel environment for production API key execution to work

> **Note:** All CRUD endpoints (`GET /api/workflows`, `POST /api/workflows`, etc.) now require authentication. Unauthenticated requests return 401.

## Endpoints

### Workflows

#### List Workflows

```http
GET /api/workflows
```

**Headers:**
- `Authorization: Bearer <api-key-or-session>`

**Response:**
```json
{
  "workflows": [
    {
      "id": "wf_123",
      "name": "Web Scraper",
      "description": "Scrapes websites",
      "createdAt": 1732419600000,
      "updatedAt": 1732419600000
    }
  ]
}
```

#### Create Workflow

```http
POST /api/workflows
```

**Headers:**
- `Authorization: Bearer <api-key-or-session>`
- `Content-Type: application/json`

**Body:**
```json
{
  "name": "My Workflow",
  "description": "Description",
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "id": "wf_123",
  "name": "My Workflow",
  ...
}
```

#### Execute Workflow

```http
POST /api/workflows/{id}/execute
```

**Headers:**
- `Authorization: Bearer <api-key-or-session>` OR `X-API-Key: <api-key>`
- `Content-Type: application/json`

**Body:**
```json
{
  "input": {
    "url": "https://example.com",
    "query": "search term"
  }
}
```

**Response:**
```json
{
  "executionId": "exec_456",
  "status": "completed",
  "output": {
    "result": "..."
  },
  "duration": 5420
}
```

#### Execute Workflow (Streaming)

```http
POST /api/workflows/{id}/execute-stream
```

**Headers:**
- `Authorization: Bearer <api-key-or-session>` OR `X-API-Key: <api-key>`
- `Content-Type: application/json`

**Body:**
```json
{
  "input": { ... }
}
```

**Response:** Server-Sent Events stream

```
event: workflow_started
data: {"workflowId":"wf_123"}

event: node_started
data: {"nodeId":"start","nodeName":"Start"}

event: node_completed
data: {"nodeId":"start","output":{...}}

event: workflow_completed
data: {"output":{...}}
```

### Executions

#### Get Execution

```http
GET /api/executions/{id}
```

**Response:**
```json
{
  "id": "exec_456",
  "workflowId": "wf_123",
  "status": "completed",
  "input": { ... },
  "output": { ... },
  "startedAt": 1732419600000,
  "completedAt": 1732419605000
}
```

#### List Executions

```http
GET /api/executions?workflowId={id}
```

**Response:**
```json
{
  "executions": [...]
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid request",
  "message": "Missing required field: input"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "You do not have access to this resource"
}
```

### 429 Too Many Requests

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again in 30 seconds.",
  "retryAfter": 30
}
```

**Headers:**
- `Retry-After: 30`
- `X-RateLimit-Limit: 10`
- `X-RateLimit-Remaining: 0`
- `X-RateLimit-Reset: 2024-11-24T12:35:00Z`

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Workflow Execution | 10/minute per user |
| API General | 60/minute per user |
| Heavy Operations | 10/minute per user |

## Examples

### cURL

```bash
# Execute workflow
curl -X POST https://your-domain.com/api/workflows/wf_123/execute \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "url": "https://example.com"
    }
  }'
```

### JavaScript (Fetch)

```javascript
const response = await fetch('/api/workflows/wf_123/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    input: { url: 'https://example.com' }
  })
});

const result = await response.json();
console.log(result);
```

### JavaScript (SSE Stream)

```javascript
const eventSource = new EventSource('/api/workflows/wf_123/execute-stream');

eventSource.addEventListener('node_completed', (e) => {
  const data = JSON.parse(e.data);
  console.log('Node completed:', data);
});

eventSource.addEventListener('workflow_completed', (e) => {
  const data = JSON.parse(e.data);
  console.log('Workflow completed:', data);
  eventSource.close();
});

eventSource.addEventListener('error', (e) => {
  console.error('Error:', e);
  eventSource.close();
});
```

### Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/workflows/wf_123/execute',
    headers={
        'X-API-Key': 'your-api-key',
        'Content-Type': 'application/json'
    },
    json={
        'input': {
            'url': 'https://example.com'
        }
    }
)

result = response.json()
print(result)
```

## Related Documentation

- [webhooks.md](./webhooks.md) - Webhook documentation
- [USER-MANUAL.md](../../USER-MANUAL.md) - User guide
- [ARCHITECTURE.md](../architecture/README.md) - System architecture
