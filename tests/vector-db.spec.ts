/**
 * Vector DB Node Regression Test Suite
 *
 * Comprehensive regression testing for the Vector DB component covering:
 * - Executor: All 5 providers (Pinecone, Qdrant, Chroma, Weaviate, Milvus)
 * - Embeddings: OpenAI dimension handling, API key resolution
 * - Variable substitution in endpoint, collection, prompt
 * - Score threshold filtering
 * - Result joining (separator, prefix, suffix)
 * - Error handling: missing endpoint, prompt, API key
 */

import { test, expect } from '@playwright/test';
import { executeVectorDbNode } from '@/lib/workflow/executors/vector-db';
import type { WorkflowNode, WorkflowState } from '@/lib/workflow/types';

// --- Global Fetch Mocking ---
// We capture ALL fetch calls so we can assert on request bodies and headers.

interface MockMatch {
  url: string | RegExp;
  method?: string;
}

interface MockResponse {
  status?: number;
  body: any;
}

interface CapturedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
}

let dynamicFetchMocks: { match: MockMatch; response: MockResponse }[] = [];
let capturedRequests: CapturedRequest[] = [];
let savedFetch: typeof global.fetch;

function addFetchMock(match: MockMatch, response: MockResponse) {
  dynamicFetchMocks.push({ match, response });
}

function getCapturedRequests(urlPattern: string | RegExp): CapturedRequest[] {
  return capturedRequests.filter((r) => {
    if (typeof urlPattern === 'string') return r.url.includes(urlPattern);
    return urlPattern.test(r.url);
  });
}

function installFetchMock() {
  savedFetch = global.fetch;
  global.fetch = async (url, init): Promise<Response> => {
    const urlString = url.toString();
    const method = init?.method?.toUpperCase() || 'GET';
    const headers = (init?.headers as Record<string, string>) || {};
    let parsedBody: any = undefined;
    try {
      if (init?.body) parsedBody = JSON.parse(init.body.toString());
    } catch {}

    // Capture every request for later assertion
    capturedRequests.push({ url: urlString, method, headers, body: parsedBody });

    for (const mock of dynamicFetchMocks) {
      let urlMatches = false;
      if (typeof mock.match.url === 'string') {
        urlMatches = urlString.includes(mock.match.url);
      } else {
        urlMatches = mock.match.url.test(urlString);
      }

      const methodMatches =
        !mock.match.method ||
        method === mock.match.method.toUpperCase();

      if (urlMatches && methodMatches) {
        let responseBody = mock.response.body;
        if (typeof responseBody === 'function') {
          responseBody = responseBody(parsedBody);
        }

        return new Response(JSON.stringify(responseBody), {
          status: mock.response.status || 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Unmocked calls fail loudly
    return new Response(JSON.stringify({ error: `Unmocked fetch: ${urlString}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}

function uninstallFetchMock() {
  global.fetch = savedFetch;
}

// --- Helpers ---

function makeNode(overrides: Partial<WorkflowNode['data']> = {}): WorkflowNode {
  return {
    id: 'vector-db-1',
    type: 'vector-db',
    position: { x: 0, y: 0 },
    data: {
      label: 'Vector DB',
      nodeType: 'vector-db',
      vectorDbProvider: 'pinecone',
      vectorDbEndpoint: 'https://my-index-abc.svc.pinecone.io',
      vectorDbApiKey: 'pcsk_test_key',
      vectorDbCollection: 'my-index',
      vectorDbDimension: 1536,
      vectorDbEmbeddingProvider: 'openai',
      vectorDbEmbeddingModel: 'text-embedding-3-small',
      vectorDbQueryPrompt: 'What is AI?',
      vectorDbTopK: 5,
      vectorDbScoreThreshold: 0,
      vectorDbIncludeMetadata: true,
      vectorDbIncludeVector: false,
      vectorDbOutputVariable: 'vectorDbResults',
      vectorDbTextField: 'text',
      ...overrides,
    },
  };
}

function makeState(variables: Record<string, any> = {}): WorkflowState {
  return {
    chatHistory: [],
    variables: { lastOutput: '', ...variables },
  };
}

function mockOpenAIEmbedding(defaultDim: number = 1536) {
  addFetchMock(
    { url: 'api.openai.com/v1/embeddings', method: 'POST' },
    {
      body: (reqBody: any) => {
        const dim = reqBody?.dimensions || defaultDim;
        return { data: [{ embedding: Array(dim).fill(0.01) }] };
      },
    }
  );
}

function mockPineconeQuery(matches?: any[]) {
  addFetchMock(
    { url: /pinecone\.io\/query/, method: 'POST' },
    {
      body: {
        matches: matches || [
          { id: 'vec-1', score: 0.95, metadata: { text: 'AI is artificial intelligence.' } },
          { id: 'vec-2', score: 0.88, metadata: { text: 'Machine learning is a subset of AI.' } },
          { id: 'vec-3', score: 0.72, metadata: { text: 'Deep learning uses neural networks.' } },
        ],
      },
    }
  );
}

function mockQdrantQuery(results?: any[]) {
  addFetchMock(
    { url: /\/collections\/.*\/points\/search/, method: 'POST' },
    {
      body: {
        result: results || [
          { id: 'q-1', score: 0.93, payload: { text: 'Qdrant is a vector database.' } },
          { id: 'q-2', score: 0.85, payload: { text: 'Qdrant supports filtering.' } },
        ],
      },
    }
  );
}

function mockChromaCollection(id: string = 'col-uuid-123') {
  addFetchMock(
    { url: /\/api\/v1\/collections\/[^/]+$/ },
    { body: { id, name: 'my-collection' } }
  );
}

function mockChromaQuery() {
  addFetchMock(
    { url: /\/api\/v1\/collections\/.*\/query/, method: 'POST' },
    {
      body: {
        ids: [['c-1', 'c-2']],
        distances: [[0.1, 0.3]],
        metadatas: [[{ source: 'doc1' }, { source: 'doc2' }]],
        documents: [['Chroma stores embeddings.', 'Chroma supports filtering.']],
      },
    }
  );
}

function mockWeaviateQuery(className: string = 'Document') {
  addFetchMock(
    { url: /\/v1\/graphql/, method: 'POST' },
    {
      body: {
        data: {
          Get: {
            [className]: [
              { text: 'Weaviate uses GraphQL.', _additional: { id: 'w-1', distance: 0.05 } },
              { text: 'Weaviate supports vectors.', _additional: { id: 'w-2', distance: 0.15 } },
            ],
          },
        },
      },
    }
  );
}

function mockMilvusQuery() {
  addFetchMock(
    { url: /\/v1\/vector\/search/, method: 'POST' },
    {
      body: {
        data: [
          { id: 'm-1', distance: 0.92, text: 'Milvus scales to billions of vectors.' },
          { id: 'm-2', distance: 0.80, text: 'Milvus supports hybrid search.' },
        ],
      },
    }
  );
}

// --- Test Suite ---

test.describe('Vector DB Node', () => {
  test.beforeEach(() => {
    dynamicFetchMocks = [];
    capturedRequests = [];
    installFetchMock();
  });

  test.afterEach(() => {
    uninstallFetchMock();
  });

  // =========================================================================
  // 1. PINECONE PROVIDER
  // =========================================================================

  test.describe('Pinecone Provider', () => {
    test('should query Pinecone and return formatted results', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const result = await executeVectorDbNode(makeNode(), makeState(), { openai: 'sk-test' });

      expect(result.__variableUpdates).toBeDefined();
      const vdb = result.__variableUpdates.vectorDbResults;
      expect(vdb.provider).toBe('pinecone');
      expect(vdb.results.length).toBe(3);
      expect(vdb.results[0].text).toBe('AI is artificial intelligence.');
      expect(vdb.results[0].score).toBe(0.95);
      expect(vdb.results[0].id).toBe('vec-1');
    });

    test('should pass namespace to Pinecone when provided', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbNamespace: 'production' });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const pineconeReq = getCapturedRequests(/pinecone\.io\/query/)[0];
      expect(pineconeReq.body.namespace).toBe('production');
    });

    test('should pass metadata filter to Pinecone', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbMetadataFilter: '{"category": "docs"}' });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const pineconeReq = getCapturedRequests(/pinecone\.io\/query/)[0];
      expect(pineconeReq.body.filter).toEqual({ category: 'docs' });
    });

    test('should send correct Api-Key header to Pinecone', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbApiKey: 'pcsk_my_secret' });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const pineconeReq = getCapturedRequests(/pinecone\.io\/query/)[0];
      expect(pineconeReq.headers['Api-Key']).toBe('pcsk_my_secret');
    });

    test('should pass topK value to Pinecone', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbTopK: 20 });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const pineconeReq = getCapturedRequests(/pinecone\.io\/query/)[0];
      expect(pineconeReq.body.topK).toBe(20);
    });

    test('should pass includeValues flag to Pinecone', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbIncludeVector: true });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const pineconeReq = getCapturedRequests(/pinecone\.io\/query/)[0];
      expect(pineconeReq.body.includeValues).toBe(true);
    });
  });

  // =========================================================================
  // 2. QDRANT PROVIDER
  // =========================================================================

  test.describe('Qdrant Provider', () => {
    test('should query Qdrant and return formatted results', async () => {
      mockOpenAIEmbedding();
      mockQdrantQuery();

      const node = makeNode({
        vectorDbProvider: 'qdrant',
        vectorDbEndpoint: 'https://my-qdrant.cloud.qdrant.io:6333',
        vectorDbCollection: 'my-collection',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const vdb = result.__variableUpdates.vectorDbResults;
      expect(vdb.provider).toBe('qdrant');
      expect(vdb.results.length).toBe(2);
      expect(vdb.results[0].text).toBe('Qdrant is a vector database.');
    });

    test('should send api-key header for Qdrant', async () => {
      mockOpenAIEmbedding();
      mockQdrantQuery();

      const node = makeNode({
        vectorDbProvider: 'qdrant',
        vectorDbEndpoint: 'https://my-qdrant.cloud.qdrant.io:6333',
        vectorDbApiKey: 'qdrant-secret-key',
        vectorDbCollection: 'test-col',
      });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const qdrantReq = getCapturedRequests(/points\/search/)[0];
      expect(qdrantReq.headers['api-key']).toBe('qdrant-secret-key');
    });

    test('should pass limit to Qdrant', async () => {
      mockOpenAIEmbedding();
      mockQdrantQuery();

      const node = makeNode({
        vectorDbProvider: 'qdrant',
        vectorDbEndpoint: 'https://my-qdrant.cloud.qdrant.io:6333',
        vectorDbCollection: 'test',
        vectorDbTopK: 15,
      });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const qdrantReq = getCapturedRequests(/points\/search/)[0];
      expect(qdrantReq.body.limit).toBe(15);
    });
  });

  // =========================================================================
  // 3. CHROMA PROVIDER
  // =========================================================================

  test.describe('Chroma Provider', () => {
    test('should query Chroma with two-step flow', async () => {
      mockOpenAIEmbedding();
      mockChromaCollection('col-uuid-123');
      mockChromaQuery();

      const node = makeNode({
        vectorDbProvider: 'chroma',
        vectorDbEndpoint: 'http://localhost:8000',
        vectorDbCollection: 'my-collection',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const vdb = result.__variableUpdates.vectorDbResults;
      expect(vdb.provider).toBe('chroma');
      expect(vdb.results.length).toBe(2);
      expect(vdb.results[0].text).toBe('Chroma stores embeddings.');
    });

    test('should convert Chroma distances to scores', async () => {
      mockOpenAIEmbedding();
      mockChromaCollection();
      mockChromaQuery();

      const node = makeNode({
        vectorDbProvider: 'chroma',
        vectorDbEndpoint: 'http://localhost:8000',
        vectorDbCollection: 'my-collection',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      // score = 1 - distance; distance 0.1 -> score 0.9
      expect(result.__variableUpdates.vectorDbResults.results[0].score).toBeCloseTo(0.9, 1);
      expect(result.__variableUpdates.vectorDbResults.results[1].score).toBeCloseTo(0.7, 1);
    });
  });

  // =========================================================================
  // 4. WEAVIATE PROVIDER
  // =========================================================================

  test.describe('Weaviate Provider', () => {
    test('should query Weaviate via GraphQL and return results', async () => {
      mockOpenAIEmbedding();
      mockWeaviateQuery('Document');

      const node = makeNode({
        vectorDbProvider: 'weaviate',
        vectorDbEndpoint: 'https://my-weaviate.weaviate.cloud',
        vectorDbCollection: 'document', // lowercase, should be capitalized internally
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const vdb = result.__variableUpdates.vectorDbResults;
      expect(vdb.provider).toBe('weaviate');
      expect(vdb.results.length).toBe(2);
      expect(vdb.results[0].text).toBe('Weaviate uses GraphQL.');
    });

    test('should convert Weaviate distance to score', async () => {
      mockOpenAIEmbedding();
      mockWeaviateQuery('Document');

      const node = makeNode({
        vectorDbProvider: 'weaviate',
        vectorDbEndpoint: 'https://my-weaviate.weaviate.cloud',
        vectorDbCollection: 'document',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      // score = 1 - distance; distance 0.05 -> score 0.95
      expect(result.__variableUpdates.vectorDbResults.results[0].score).toBeCloseTo(0.95, 1);
    });
  });

  // =========================================================================
  // 5. MILVUS PROVIDER
  // =========================================================================

  test.describe('Milvus Provider', () => {
    test('should query Milvus/Zilliz and return results', async () => {
      mockOpenAIEmbedding();
      mockMilvusQuery();

      const node = makeNode({
        vectorDbProvider: 'milvus',
        vectorDbEndpoint: 'https://my-milvus.zillizcloud.com',
        vectorDbCollection: 'my-collection',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const vdb = result.__variableUpdates.vectorDbResults;
      expect(vdb.provider).toBe('milvus');
      expect(vdb.results.length).toBe(2);
      expect(vdb.results[0].text).toBe('Milvus scales to billions of vectors.');
    });
  });

  // =========================================================================
  // 6. OPENAI EMBEDDINGS - DIMENSION HANDLING
  // =========================================================================

  test.describe('OpenAI Embeddings', () => {
    test('should send dimensions param for text-embedding-3-small with 512', async () => {
      mockOpenAIEmbedding(512);
      mockPineconeQuery();

      const node = makeNode({
        vectorDbDimension: 512,
        vectorDbEmbeddingModel: 'text-embedding-3-small',
      });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const embReq = getCapturedRequests('openai.com/v1/embeddings')[0];
      expect(embReq.body.dimensions).toBe(512);
      expect(embReq.body.model).toBe('text-embedding-3-small');
    });

    test('should send dimensions param for text-embedding-3-large with 1024', async () => {
      mockOpenAIEmbedding(1024);
      mockPineconeQuery();

      const node = makeNode({
        vectorDbDimension: 1024,
        vectorDbEmbeddingModel: 'text-embedding-3-large',
      });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const embReq = getCapturedRequests('openai.com/v1/embeddings')[0];
      expect(embReq.body.dimensions).toBe(1024);
    });

    test('should NOT send dimensions param for text-embedding-ada-002', async () => {
      mockOpenAIEmbedding(1536);
      mockPineconeQuery();

      const node = makeNode({
        vectorDbDimension: 1536,
        vectorDbEmbeddingModel: 'text-embedding-ada-002',
      });
      await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const embReq = getCapturedRequests('openai.com/v1/embeddings')[0];
      expect(embReq.body.dimensions).toBeUndefined();
    });

    test('should report actual embedding dimension in output', async () => {
      mockOpenAIEmbedding(512);
      mockPineconeQuery();

      const node = makeNode({ vectorDbDimension: 512 });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(result.__variableUpdates.vectorDbResults.dimension).toBe(512);
    });
  });

  // =========================================================================
  // 7. API KEY RESOLUTION
  // =========================================================================

  test.describe('API Key Resolution', () => {
    test('should use apiKeys.openai for embedding requests', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      await executeVectorDbNode(makeNode(), makeState(), { openai: 'sk-user-provided-key' });

      const embReq = getCapturedRequests('openai.com/v1/embeddings')[0];
      expect(embReq.headers['Authorization']).toBe('Bearer sk-user-provided-key');
    });

    test('should throw if no OpenAI key is available', async () => {
      // Remove OPENAI_API_KEY from env temporarily
      const saved = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      try {
        await expect(async () => {
          await executeVectorDbNode(makeNode(), makeState(), {});
        }).rejects.toThrow(/OpenAI API key is required/);
      } finally {
        if (saved) process.env.OPENAI_API_KEY = saved;
      }
    });
  });

  // =========================================================================
  // 8. VARIABLE SUBSTITUTION
  // =========================================================================

  test.describe('Variable Substitution', () => {
    test('should substitute variables in query prompt', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbQueryPrompt: 'Find documents about {{userQuery}}' });
      const state = makeState({ userQuery: 'machine learning' });
      await executeVectorDbNode(node, state, { openai: 'sk-test' });

      const embReq = getCapturedRequests('openai.com/v1/embeddings')[0];
      expect(embReq.body.input).toBe('Find documents about machine learning');
    });

    test('should substitute variables in endpoint', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbEndpoint: '{{pineconeUrl}}' });
      const state = makeState({ pineconeUrl: 'https://dynamic-index.svc.pinecone.io' });

      const result = await executeVectorDbNode(node, state, { openai: 'sk-test' });
      expect(result.__variableUpdates.vectorDbResults).toBeDefined();
    });

    test('should substitute variables in collection name', async () => {
      mockOpenAIEmbedding();
      mockQdrantQuery();

      const node = makeNode({
        vectorDbProvider: 'qdrant',
        vectorDbEndpoint: 'https://my-qdrant.cloud.qdrant.io:6333',
        vectorDbCollection: '{{collectionName}}',
      });
      const state = makeState({ collectionName: 'dynamic-collection' });
      const result = await executeVectorDbNode(node, state, { openai: 'sk-test' });

      expect(result.__variableUpdates.vectorDbResults.collection).toBe('dynamic-collection');
    });
  });

  // =========================================================================
  // 9. SCORE THRESHOLD FILTERING
  // =========================================================================

  test.describe('Score Threshold', () => {
    test('should filter results below score threshold', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([
        { id: 'v1', score: 0.95, metadata: { text: 'High relevance' } },
        { id: 'v2', score: 0.60, metadata: { text: 'Medium relevance' } },
        { id: 'v3', score: 0.30, metadata: { text: 'Low relevance' } },
      ]);

      const node = makeNode({ vectorDbScoreThreshold: 0.5 });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const vdb = result.__variableUpdates.vectorDbResults;
      expect(vdb.results.length).toBe(2);
      expect(vdb.results[0].text).toBe('High relevance');
      expect(vdb.results[1].text).toBe('Medium relevance');
    });

    test('should return all results when threshold is 0', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([
        { id: 'v1', score: 0.95, metadata: { text: 'A' } },
        { id: 'v2', score: 0.10, metadata: { text: 'B' } },
      ]);

      const node = makeNode({ vectorDbScoreThreshold: 0 });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(result.__variableUpdates.vectorDbResults.results.length).toBe(2);
    });
  });

  // =========================================================================
  // 10. RESULT JOINING
  // =========================================================================

  test.describe('Result Joining', () => {
    test('should join results with separator and prefix', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([
        { id: 'v1', score: 0.9, metadata: { text: 'First chunk' } },
        { id: 'v2', score: 0.8, metadata: { text: 'Second chunk' } },
      ]);

      const node = makeNode({
        vectorDbJoinResults: true,
        vectorDbJoinSeparator: '---',
        vectorDbJoinPrefix: 'Chunk {{index}}: ',
        vectorDbJoinSuffix: '',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      const joined = result.__variableUpdates.vectorDbResults.joined;
      expect(joined).toContain('Chunk 1: First chunk');
      expect(joined).toContain('Chunk 2: Second chunk');
      expect(joined).toContain('---');
    });

    test('should set lastOutput to joined string when joining is enabled', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([{ id: 'v1', score: 0.9, metadata: { text: 'Content' } }]);

      const node = makeNode({
        vectorDbJoinResults: true,
        vectorDbJoinSeparator: '---',
        vectorDbJoinPrefix: '',
        vectorDbJoinSuffix: '',
      });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(typeof result.__variableUpdates.lastOutput).toBe('string');
    });

    test('should set lastOutput to full output object when joining is disabled', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([{ id: 'v1', score: 0.9, metadata: { text: 'Content' } }]);

      const node = makeNode({ vectorDbJoinResults: false });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(typeof result.__variableUpdates.lastOutput).toBe('object');
      expect(result.__variableUpdates.lastOutput.provider).toBe('pinecone');
    });
  });

  // =========================================================================
  // 11. CUSTOM OUTPUT VARIABLE
  // =========================================================================

  test.describe('Output Variable', () => {
    test('should use custom output variable name', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbOutputVariable: 'myCustomResults' });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(result.__variableUpdates.myCustomResults).toBeDefined();
      expect(result.__variableUpdates.myCustomResults.provider).toBe('pinecone');
    });
  });

  // =========================================================================
  // 12. TEXT EXTRACTION FROM METADATA
  // =========================================================================

  test.describe('Text Extraction', () => {
    test('should extract text from custom textField in Pinecone metadata', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([
        { id: 'v1', score: 0.9, metadata: { body: 'Custom field content', other: 'data' } },
      ]);

      const node = makeNode({ vectorDbTextField: 'body' });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(result.__variableUpdates.vectorDbResults.results[0].text).toBe('Custom field content');
    });

    test('should fallback to common keys when textField is not found', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery([
        { id: 'v1', score: 0.9, metadata: { content: 'Fallback content', other: 'data' } },
      ]);

      const node = makeNode({ vectorDbTextField: 'nonexistent' });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      expect(result.__variableUpdates.vectorDbResults.results[0].text).toBe('Fallback content');
    });
  });

  // =========================================================================
  // 13. ERROR HANDLING
  // =========================================================================

  test.describe('Error Handling', () => {
    test('should throw when endpoint is missing', async () => {
      const node = makeNode({ vectorDbEndpoint: '' });

      await expect(async () => {
        await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/connection endpoint is required/);
    });

    test('should throw when query prompt is missing', async () => {
      const node = makeNode({ vectorDbQueryPrompt: '' });

      await expect(async () => {
        await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/query prompt is required/);
    });

    test('should throw clear error on Pinecone 403', async () => {
      mockOpenAIEmbedding();
      addFetchMock(
        { url: /pinecone\.io\/query/, method: 'POST' },
        { status: 403, body: 'Forbidden' }
      );

      await expect(async () => {
        await executeVectorDbNode(makeNode(), makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/Pinecone query error \(403\)/);
    });

    test('should throw clear error on Qdrant failure', async () => {
      mockOpenAIEmbedding();
      addFetchMock(
        { url: /\/collections\/.*\/points\/search/, method: 'POST' },
        { status: 404, body: 'Collection not found' }
      );

      const node = makeNode({
        vectorDbProvider: 'qdrant',
        vectorDbEndpoint: 'https://my-qdrant.cloud.qdrant.io:6333',
        vectorDbCollection: 'nonexistent',
      });

      await expect(async () => {
        await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/Qdrant query error \(404\)/);
    });

    test('should throw clear error on Chroma collection not found', async () => {
      mockOpenAIEmbedding();
      addFetchMock(
        { url: /\/api\/v1\/collections\/[^/]+$/ },
        { status: 404, body: 'Not found' }
      );

      const node = makeNode({
        vectorDbProvider: 'chroma',
        vectorDbEndpoint: 'http://localhost:8000',
        vectorDbCollection: 'nonexistent',
      });

      await expect(async () => {
        await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/Chroma.*Could not find collection/);
    });

    test('should throw clear error on OpenAI embedding failure', async () => {
      addFetchMock(
        { url: 'api.openai.com/v1/embeddings', method: 'POST' },
        { status: 401, body: { error: { message: 'Invalid API key' } } }
      );

      await expect(async () => {
        await executeVectorDbNode(makeNode(), makeState(), { openai: 'sk-bad-key' });
      }).rejects.toThrow(/OpenAI embedding error \(401\)/);
    });

    test('should handle invalid metadata filter JSON gracefully', async () => {
      mockOpenAIEmbedding();
      mockPineconeQuery();

      const node = makeNode({ vectorDbMetadataFilter: 'not valid json{' });
      const result = await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });

      // Should still return results (filter is ignored)
      expect(result.__variableUpdates.vectorDbResults.results.length).toBeGreaterThan(0);
    });

    test('should throw on Weaviate GraphQL errors', async () => {
      mockOpenAIEmbedding();
      addFetchMock(
        { url: /\/v1\/graphql/, method: 'POST' },
        {
          body: {
            errors: [{ message: 'class Document has no property "nonexistent"' }],
          },
        }
      );

      const node = makeNode({
        vectorDbProvider: 'weaviate',
        vectorDbEndpoint: 'https://my-weaviate.weaviate.cloud',
        vectorDbCollection: 'document',
      });

      await expect(async () => {
        await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/Weaviate GraphQL error/);
    });

    test('should throw on Milvus query failure', async () => {
      mockOpenAIEmbedding();
      addFetchMock(
        { url: /\/v1\/vector\/search/, method: 'POST' },
        { status: 500, body: 'Internal server error' }
      );

      const node = makeNode({
        vectorDbProvider: 'milvus',
        vectorDbEndpoint: 'https://my-milvus.zillizcloud.com',
        vectorDbCollection: 'test',
      });

      await expect(async () => {
        await executeVectorDbNode(node, makeState(), { openai: 'sk-test' });
      }).rejects.toThrow(/Milvus query error \(500\)/);
    });
  });
});
