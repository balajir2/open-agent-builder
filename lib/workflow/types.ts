// Workflow and Node Types

export interface WorkflowNode {
  id: string;
  type: 'agent' | 'mcp' | 'if-else' | 'while' | 'user-approval' | 'transform' | 'set-state' | 'end' | 'start' | 'guardrails' | 'arcade' | 'note' | 'extract' | 'http' | 'data-transform' | 'gamma-ai' | 'vector-db' | 'join-chunks';
  position: { x: number; y: number };
  data: NodeData;
}

export interface NodeData {
  label: string;
  nodeType?: string;
  nodeName?: string;

  // Agent node data
  name?: string;
  instructions?: string;
  model?: string;
  includeChatHistory?: boolean;
  tools?: string[]; // MCP server IDs
  outputFormat?: string;
  reasoningEffort?: string;
  jsonOutputSchema?: string;
  jsonSchema?: any;
  mcpTools?: any[];
  mcpServerIds?: string[];
  selectedTools?: import('../../lib/tools/types').ToolConfig[]; // Standard tools configuration
  systemPrompt?: string;
  tokenLimit?: number;

  // MCP node data
  mcpServers?: MCPServer[];
  mcpAction?: string;
  outputField?: string;

  // Arcade node data
  arcadeTool?: string; // e.g., "GoogleDocs.CreateDocumentFromText@4.3.1"
  arcadeInput?: any; // Input parameters for the tool
  arcadeUserId?: string; // User ID for Arcade authorization

  // Extract node data
  extractConfig?: any;
  extractTool?: string;

  // Start node data
  inputVariables?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    defaultValue?: any;
  }>;

  // Logic node data
  condition?: string;
  truePath?: string;
  falsePath?: string;
  trueLabel?: string;
  falseLabel?: string;

  // Transform node data
  transformScript?: string;

  // State node data
  stateKey?: string;
  stateValue?: string;

  // Note node data
  noteText?: string;

  // HTTP node data
  httpUrl?: string;
  httpMethod?: string;
  httpHeaders?: Array<{ key: string; value: string }>;
  httpBody?: string;

  // Gamma AI node data
  prompt?: string;
  format?: string;
  textMode?: string;
  numCards?: number;
  textAmount?: string;
  imageSource?: string;
  language?: string;
  exportAs?: string;

  // Additional node data properties
  transformType?: string;
  mcpTool?: string;
  piiEnabled?: boolean;
  searchQuery?: string;
  mapUrl?: string;
  batchUrls?: string;
  guardrailType?: string;
  scrapeUrl?: string;
  whileCondition?: string;
  approvalMessage?: string;
  outputMapping?: string | any;
  scrapeFormats?: string[];
  mcpParams?: any;
  moderationEnabled?: boolean;
  jailbreakEnabled?: boolean;
  hallucinationEnabled?: boolean;
  searchLimit?: number;
  mapLimit?: number;
  actionOnViolation?: string;
  maxIterations?: number | string;
  timeoutMinutes?: number | string;

  // Vector DB node data
  vectorDbProvider?: 'pinecone' | 'qdrant' | 'weaviate' | 'chroma' | 'milvus';
  vectorDbEmbeddingProvider?: 'openai' | 'cohere' | 'pinecone' | 'jina';
  vectorDbEndpoint?: string;
  vectorDbApiKey?: string;
  vectorDbCollection?: string;
  vectorDbDimension?: number;
  vectorDbEmbeddingModel?: string;
  vectorDbQueryPrompt?: string;
  vectorDbTopK?: number;
  vectorDbScoreThreshold?: number;
  vectorDbMetadataFilter?: string;
  vectorDbNamespace?: string;
  vectorDbIncludeMetadata?: boolean;
  vectorDbIncludeVector?: boolean;
  vectorDbOutputVariable?: string;
  vectorDbTextField?: string;
  vectorDbJoinResults?: boolean;
  vectorDbJoinSeparator?: string;
  vectorDbJoinPrefix?: string;
  vectorDbJoinSuffix?: string;

  // Join Chunks node data
  joinChunksVariable?: string; // Path to array of chunks
  joinChunksSeparator?: string; // e.g. "\n\n---\n\n"
  joinChunksPrefix?: string; // e.g. "Content: "
  joinChunksSuffix?: string;
  joinChunksIncludeMetadata?: boolean;
}

export interface MCPServer {
  id: string;
  name: string;
  label: string;
  url: string;
  description?: string;
  authType: string;
  accessToken?: string;
  tools?: any[];
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string; // For conditional edges like "true"/"false"
  sourceHandle?: string; // For conditional edges like "if"/"else"
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  category?: string;
  tags?: string[];
  estimatedTime?: string;
  difficulty?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'paused' | 'waiting-auth';
  currentNodeId?: string;
  nodeResults: Record<string, NodeExecutionResult>;
  startedAt: string;
  completedAt?: string;
  error?: string;
  pendingAuth?: WorkflowPendingAuth;
}

export interface NodeExecutionResult {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'pending-authorization' | 'pending-approval';
  input?: any;
  output?: any;
  error?: string;
  startedAt?: string;
  completedAt?: string;
  toolCalls?: Array<{
    name?: string;
    arguments?: any;
    output?: any;
  }>;
  // usage?: {
  //   input_tokens: number;
  //   output_tokens: number;
  //   total_tokens: number;
  // };
  pendingAuth?: WorkflowPendingAuth;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
  };
}

export interface WorkflowState {
  variables: Record<string, any>;
  chatHistory: Array<{ role: string; content: string }>;
}

export interface WorkflowPendingAuth {
  authId: string;
  nodeId: string;
  toolName: string;
  authUrl?: string | null;
  status: 'pending' | 'completed' | 'failed';
  userId?: string;
  message?: string;
  threadId?: string;
  executionId?: string;
}

export interface AgentToolCall {
  id?: string;
  name: string;
  arguments: any;
  output: any;
  server_name?: string;
  type?: string;
  tool_use_id?: string;
}

export interface AgentExecutionResult {
  __agentValue: unknown;
  __agentToolCalls: AgentToolCall[];
  __chatHistoryUpdates: { role: string; content: string }[];
  __variableUpdates: {
    lastOutput: unknown;
    [key: string]: any;
  };
  __usage?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}
