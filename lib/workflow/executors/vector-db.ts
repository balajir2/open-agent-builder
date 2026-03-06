import { WorkflowNode, WorkflowState } from '../types';
import { substituteVariables } from '../variable-substitution';

export type VectorDbProvider = 'pinecone' | 'qdrant' | 'weaviate' | 'chroma' | 'milvus';

export interface VectorDbResult {
    id: string;
    score: number;
    text: string;
    metadata?: Record<string, any>;
    vector?: number[];
}

export interface VectorDbOutput {
    query: string;
    results: VectorDbResult[];
    total: number;
    provider: VectorDbProvider;
    collection: string;
    dimension: number;
    top_k: number;
    joined?: string;
}


/**
 * Embed a text string using the OpenAI embeddings API.
 */
async function embedText(
    text: string,
    model: string = 'text-embedding-3-small',
    apiKey: string
): Promise<number[]> {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ input: text, model }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenAI embedding error (${response.status}): ${err}`);
    }

    const data = await response.json();
    return data.data[0].embedding as number[];
}

/**
 * Query Pinecone REST API.
 */
async function queryPinecone(
    embedding: number[],
    endpoint: string,
    apiKey: string,
    indexName: string,
    topK: number,
    namespace?: string,
    filter?: Record<string, any>,
    includeMetadata: boolean = true,
    includeVector: boolean = false,
    textField?: string
): Promise<VectorDbResult[]> {
    const url = `${endpoint.replace(/\/$/, '')}/query`;

    const body: Record<string, any> = {
        vector: embedding,
        topK: Number(topK),
        top_k: Number(topK), // Redundant snake_case
        includeMetadata: true, // Force true for retrieval
        include_metadata: true, // Redundant snake_case
        includeValues: !!includeVector,
        include_values: !!includeVector, // Redundant snake_case
    };

    if (namespace) {
        body.namespace = namespace;
    }

    if (filter && Object.keys(filter).length > 0) {
        body.filter = filter;
    }

    // Request logging
    console.log(`[VectorDB] POST to ${url}`, {
        headers: { 'Api-Key': apiKey.slice(0, 4) + '...' },
        body: JSON.stringify(body, null, 2)
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Api-Key': apiKey,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Pinecone query error (${response.status}): ${err}`);
    }

    const data = await response.json();

    // Response logging
    console.log(`[VectorDB] Raw Match 0:`, JSON.stringify(data.matches?.[0] || 'NONE', null, 2));

    const extractText = (metadata: any) => {
        if (!metadata) return '';

        if (typeof metadata === 'string') {
            try {
                const p = JSON.parse(metadata);
                if (p && typeof p === 'object') metadata = p;
            } catch {
                if (metadata.length > 0) return metadata;
            }
        }

        const getString = (val: any): string => {
            if (Array.isArray(val)) return val.join(' ');
            return String(val ?? '');
        };

        if (textField && metadata[textField]) return getString(metadata[textField]);

        const commonKeys = ['text', 'content', 'page_content', 'body', 'description', 'message'];
        for (const key of commonKeys) {
            if (metadata[key]) return getString(metadata[key]);
        }

        const metaKeys = Object.keys(metadata);
        const lowerMetaKeys = metaKeys.map(k => k.toLowerCase());
        for (const key of commonKeys) {
            const idx = lowerMetaKeys.indexOf(key);
            if (idx !== -1) return getString(metadata[metaKeys[idx]]);
        }

        return '';
    };

    return (data.matches || []).map((match: any) => ({
        id: match.id,
        score: match.score,
        text: extractText(match.metadata),
        // metadata: match.metadata.text,
        vector: includeVector ? match.values : undefined,
    }));
}



/**
 * Query Qdrant REST API.
 */
async function queryQdrant(
    embedding: number[],
    endpoint: string,
    apiKey: string | undefined,
    collection: string,
    topK: number,
    filter?: Record<string, any>,
    includeMetadata: boolean = true,
    includeVector: boolean = false,
    textField?: string
): Promise<VectorDbResult[]> {
    const url = `${endpoint.replace(/\/$/, '')}/collections/${collection}/points/search`;

    const body: Record<string, any> = {
        vector: embedding,
        limit: topK,
        with_payload: true, // Force true to ensure we can extract text
        with_vector: !!includeVector,
    };

    if (filter && Object.keys(filter).length > 0) {
        body.filter = filter;
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['api-key'] = apiKey;

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Qdrant query error (${response.status}): ${err}`);
    }

    const data = await response.json();
    const extractText = (payload: any) => {
        if (!payload) return '';

        // Handle stringified payload
        if (typeof payload === 'string') {
            try {
                const parsed = JSON.parse(payload);
                if (typeof parsed === 'object') payload = parsed;
            } catch {
                return payload;
            }
        }

        const getStringValue = (val: any): string => {
            if (Array.isArray(val)) return val.join(' ');
            return String(val ?? '');
        };

        if (textField && (payload[textField] || payload[textField.toLowerCase()])) {
            const v = payload[textField] || payload[textField.toLowerCase()];
            if (v) return getStringValue(v);
        }

        // Expanded list of common keys
        const commonKeys = [
            'text', 'content', 'page_content', 'body', 'description',
            'message', 'data', 'input', 'chunk'
        ];

        for (const key of commonKeys) {
            if (payload[key]) return getStringValue(payload[key]);
            // case-insensitive check
            const foundKey = Object.keys(payload).find(k => k.toLowerCase() === key);
            if (foundKey && payload[foundKey]) return getStringValue(payload[foundKey]);
        }

        // If data is nested in a 'metadata' field (common in some ingestion tools)
        if (payload.metadata && typeof payload.metadata === 'object') {
            for (const key of commonKeys) {
                if (payload.metadata[key]) return getStringValue(payload.metadata[key]);
            }
        }

        return '';
    };

    console.log(`[VectorDB] Qdrant Results Count: ${data.result?.length || 0}`);
    if (data.result?.length > 0) {
        console.log(`[VectorDB] Qdrant Match 0 Payload:`, JSON.stringify(data.result[0].payload || 'NONE', null, 2));
    }


    return (data.result || []).map((point: any) => ({
        id: String(point.id),
        score: point.score,
        text: extractText(point.payload),
        metadata: point.payload,
        vector: includeVector ? point.vector : undefined,
    }));
}

/**
 * Query Chroma DB REST API.
 */
async function queryChroma(
    embedding: number[],
    endpoint: string,
    apiKey: string | undefined,
    collectionName: string,
    topK: number,
    filter?: Record<string, any>,
    includeMetadata: boolean = true,
    includeVector: boolean = false,
    textField?: string
): Promise<VectorDbResult[]> {
    const baseUrl = endpoint.replace(/\/$/, '');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    // 1. Get Collection ID by name
    const colRes = await fetch(`${baseUrl}/api/v1/collections/${collectionName}`, { headers });
    if (!colRes.ok) {
        throw new Error(`Chroma: Could not find collection '${collectionName}' at ${baseUrl}. (${colRes.status})`);
    }
    const collection = await colRes.json();
    const collectionId = collection.id;

    // 2. Query the collection
    const queryUrl = `${baseUrl}/api/v1/collections/${collectionId}/query`;
    const include = ["metadatas", "documents", "distances"];
    if (includeVector) include.push("embeddings");

    const body = {
        query_embeddings: [embedding],
        n_results: topK,
        where: filter && Object.keys(filter).length > 0 ? filter : undefined,
        include
    };

    const response = await fetch(queryUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Chroma query error (${response.status}): ${err}`);
    }

    const data = await response.json();

    // 3. Flatten Chroma's batch response format
    const ids = data.ids[0] || [];
    const distances = data.distances[0] || [];
    const metadatas = data.metadatas[0] || [];
    const documents = data.documents[0] || [];
    const embeddings = data.embeddings ? data.embeddings[0] : [];

    return ids.map((id: string, i: number) => {
        const metadata = metadatas[i] || {};
        // Chroma often stores text in 'document' field if using its internal doc management
        const text = documents[i] || metadata[textField || 'text'] || metadata['content'] || '';

        return {
            id,
            // Chroma returns distances (smaller is better). Convert to "score" (0-1) roughly if needed
            // But distance vs score is provider dependent. For consistency we can return as is or 1 - distance.
            score: 1 - (distances[i] || 0),
            text: String(text),
            metadata,
            vector: embeddings[i] || undefined,
        };
    });
}

/**
 * Query Weaviate REST API (GraphQL).
 */
async function queryWeaviate(
    embedding: number[],
    endpoint: string,
    apiKey: string | undefined,
    className: string, // Weaviate calls collections "classes"
    topK: number,
    filter?: Record<string, any>,
    includeMetadata: boolean = true,
    includeVector: boolean = false,
    textField?: string
): Promise<VectorDbResult[]> {
    const baseUrl = endpoint.replace(/\/$/, '');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    // Capitalize first letter as Weaviate classes are typically PascalCase
    const formattedClassName = className.charAt(0).toUpperCase() + className.slice(1);

    // Build GraphQL Query
    // We try to fetch 'text', 'content' and any user-specified textField
    const fields = ['_additional { id distance vector }'];
    if (textField) fields.push(textField);
    const commonFields = ['text', 'content', 'page_content', 'body'];
    for (const f of commonFields) {
        if (f !== textField) fields.push(f);
    }

    const query = {
        query: `{
            Get {
                ${formattedClassName} (
                    nearVector: {
                        vector: ${JSON.stringify(embedding)}
                    }
                    limit: ${topK}
                    ${filter && Object.keys(filter).length > 0 ? `where: ${JSON.stringify(filter)}` : ''}
                ) {
                    ${fields.join(' ')}
                }
            }
        }`
    };

    const response = await fetch(`${baseUrl}/v1/graphql`, {
        method: 'POST',
        headers,
        body: JSON.stringify(query),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Weaviate query error (${response.status}): ${err}`);
    }

    const data = await response.json();
    if (data.errors) {
        throw new Error(`Weaviate GraphQL error: ${data.errors[0].message}`);
    }

    const results = data.data?.Get?.[formattedClassName] || [];

    return results.map((item: any) => {
        const additional = item._additional || {};
        const metadata = { ...item };
        delete metadata._additional;

        const text = item[textField || 'text'] || item['content'] || item['page_content'] || '';

        return {
            id: additional.id,
            score: 1 - (additional.distance || 0), // distance -> score conversion
            text: String(text),
            metadata,
            vector: includeVector ? additional.vector : undefined,
        };
    });
}

/**
 * Query Milvus / Zilliz REST API.
 */
async function queryMilvus(
    embedding: number[],
    endpoint: string,
    apiKey: string | undefined,
    collectionName: string,
    topK: number,
    filter?: string, // Milvus uses DSL strings
    includeMetadata: boolean = true,
    includeVector: boolean = false,
    textField?: string
): Promise<VectorDbResult[]> {
    const baseUrl = endpoint.replace(/\/$/, '');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey || ''}`
    };

    // Milvus High-level REST API
    const response = await fetch(`${baseUrl}/v1/vector/search`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            collectionName,
            vector: embedding,
            limit: topK,
            filter: filter || '',
            outputFields: ["*"]
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Milvus query error (${response.status}): ${err}`);
    }

    const data = await response.json();
    const results = data.data || [];

    return results.map((item: any) => {
        const text = item[textField || 'text'] || item['content'] || '';
        return {
            id: String(item.id),
            score: item.distance || 0, // Milvus often returns score directly or distance
            text: String(text),
            metadata: item,
            vector: includeVector ? item.vector : undefined,
        };
    });
}

/**
 * Execute the Vector DB Query node.
 */
export async function executeVectorDbNode(
    node: WorkflowNode,
    state: WorkflowState
): Promise<any> {
    const data = node.data as any;

    try {
        const provider: VectorDbProvider = data.vectorDbProvider || 'pinecone';
        const endpoint: string = substituteVariables(data.vectorDbEndpoint || '', state);
        const apiKey: string = substituteVariables(data.vectorDbApiKey || '', state);
        const collection: string = substituteVariables(data.vectorDbCollection || '', state);
        const dimension: number = Number(data.vectorDbDimension) || 1536;
        const embeddingProvider: string = data.vectorDbEmbeddingProvider || 'openai';
        const embeddingModel: string = data.vectorDbEmbeddingModel || 'text-embedding-3-small';
        const rawPrompt: string = data.vectorDbQueryPrompt || data.vectorDbPrompt || '';
        const resolvedPrompt = substituteVariables(rawPrompt, state);
        const topK: number = Number(data.vectorDbTopK) || 5;
        const scoreThreshold: number = data.vectorDbScoreThreshold != null ? Number(data.vectorDbScoreThreshold) : 0;
        const namespace: string | undefined = data.vectorDbNamespace ? substituteVariables(data.vectorDbNamespace, state) : undefined;
        const includeMetadata: boolean = data.vectorDbIncludeMetadata !== false;
        const includeVector: boolean = !!data.vectorDbIncludeVector;
        const textField: string | undefined = data.vectorDbTextField;
        const outputVar: string = data.vectorDbOutputVariable || 'vectorDbResults';

        let metadataFilter: Record<string, any> = {};
        if (data.vectorDbMetadataFilter) {
            try {
                metadataFilter = JSON.parse(substituteVariables(data.vectorDbMetadataFilter, state));
            } catch {
                console.warn('Vector DB: could not parse metadata filter JSON, ignoring filter.');
            }
        }

        if (!endpoint) throw new Error('Vector DB: connection endpoint is required.');
        if (!resolvedPrompt) throw new Error('Vector DB: query prompt is required.');

        // 1. Embed the prompt based on provider
        let embedding: number[] = [];

        if (embeddingProvider === 'openai') {
            const openaiKey = process.env.OPENAI_API_KEY || (state as any)?.openaiApiKey || '';
            if (!openaiKey) throw new Error('Vector DB: an OpenAI API key is required to generate embeddings. Please check your environment variables.');
            embedding = await embedText(resolvedPrompt, embeddingModel, openaiKey);
        } else if (embeddingProvider === 'pinecone' && provider === 'pinecone') {
            // Pinecone Inference (stub - implementation would go here)
            throw new Error('Vector DB: Pinecone Inference embeddings not yet fully implemented.');
        } else if (embeddingProvider === 'cohere') {
            // Cohere embeddings (stub)
            throw new Error('Vector DB: Cohere embeddings not yet implemented.');
        } else if (embeddingProvider === 'jina' && provider === 'qdrant') {
            // Jina embeddings (stub)
            throw new Error('Vector DB: Jina embeddings not yet implemented.');
        } else {
            throw new Error(`Vector DB: embedding provider '${embeddingProvider}' is not supported for ${provider}.`);
        }

        // Sanity-check dimension
        if (embedding.length !== dimension) {
            console.warn(`Vector DB: expected dimension ${dimension}, got ${embedding.length}. Proceeding anyway.`);
        }

        // 2. Query the provider
        let rawResults: VectorDbResult[] = [];

        if (provider === 'pinecone') {
            rawResults = await queryPinecone(
                embedding, endpoint, apiKey, collection, topK, namespace, metadataFilter, includeMetadata, includeVector, textField
            );
        } else if (provider === 'qdrant') {
            rawResults = await queryQdrant(
                embedding, endpoint, apiKey || undefined, collection, topK, metadataFilter, includeMetadata, includeVector, textField
            );
        } else if (provider === 'chroma' || provider === 'weaviate' || provider === 'milvus') {
            throw new Error(`Vector DB: provider '${provider}' is temporarily disabled in the backend and will be available soon.`);
        } else {
            throw new Error(`Vector DB: provider '${provider}' is not yet supported.`);
        }

        // 3. Apply score threshold
        const filteredResults = scoreThreshold > 0
            ? rawResults.filter(r => r.score >= scoreThreshold)
            : rawResults;

        // 4. Format output
        const output: VectorDbOutput = {
            query: resolvedPrompt,
            results: filteredResults,
            total: filteredResults.length,
            provider,
            collection,
            dimension: embedding.length,
            top_k: topK,
        };

        // 5. Join results if requested
        if (data.vectorDbJoinResults) {
            const separator = (data.vectorDbJoinSeparator || '----').replace(/\\n/g, '\n');
            const prefix = (data.vectorDbJoinPrefix || '').replace(/\\n/g, '\n');
            const suffix = (data.vectorDbJoinSuffix || '').replace(/\\n/g, '\n');

            output.joined = filteredResults.map((result, index) => {
                let text = result.text || '';

                // Process prefix/suffix placeholders
                let p = prefix.replace(/\{\{index\}\}/g, String(index + 1));
                let s = suffix.replace(/\{\{index\}\}/g, String(index + 1));

                return `${p}${text}${s}`;
            }).join(separator);

            console.log(`[VectorDB] Joined ${filteredResults.length} results (length: ${output.joined.length})`);
        }

        return {
            __variableUpdates: {
                [outputVar]: output,
                lastOutput: data.vectorDbJoinResults ? output.joined : output,
            },
        };
    } catch (error) {
        console.error('Vector DB node error:', error);
        throw new Error(
            `Vector DB query failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}
