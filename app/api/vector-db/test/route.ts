import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface TestQueryBody {
    provider: 'pinecone' | 'qdrant';
    endpoint: string;
    apiKey: string;
    collection: string;
    dimension: number;
    embeddingProvider?: string;
    embeddingModel: string;
    prompt: string;
    topK: number;
    filter?: Record<string, any>;
    namespace?: string;
    includeMetadata?: boolean;
    includeVector?: boolean;
    textField?: string;
}

async function embedText(text: string, model: string, apiKey: string): Promise<number[]> {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ input: text, model }),
    });
    if (!res.ok) throw new Error(`OpenAI embedding failed: ${await res.text()}`);
    const data = await res.json();
    return data.data[0].embedding;
}

export async function POST(req: NextRequest) {
    const start = Date.now();
    try {
        const body: TestQueryBody = await req.json();
        const {
            provider, endpoint, apiKey, collection, dimension,
            embeddingProvider = 'openai', embeddingModel, prompt, topK, filter, namespace,
            includeMetadata = true, includeVector = false, textField,
        } = body;

        if (!endpoint || !prompt) {
            return NextResponse.json({ error: 'endpoint and prompt are required' }, { status: 400 });
        }

        // Generate embedding based on provider
        let embedding: number[] = [];
        if (embeddingProvider === 'openai') {
            const openaiKey = process.env.OPENAI_API_KEY || '';
            if (!openaiKey) {
                return NextResponse.json({ error: 'An OpenAI API key is required for embeddings. Please ensure OPENAI_API_KEY is set in your environment.' }, { status: 400 });
            }
            embedding = await embedText(prompt, embeddingModel || 'text-embedding-3-small', openaiKey);
        } else {
            return NextResponse.json({ error: `Embedding provider '${embeddingProvider}' not yet supported in test query` }, { status: 400 });
        }

        let results: any[] = [];

        if (provider === 'pinecone') {
            const url = `${endpoint.replace(/\/$/, '')}/query`;
            const pineconeBody: Record<string, any> = {
                vector: embedding,
                topK: Number(topK),
                top_k: Number(topK),
                includeMetadata: true,
                include_metadata: true,
                includeValues: !!includeVector,
                include_values: !!includeVector,
            };
            if (namespace) pineconeBody.namespace = namespace;
            if (filter && Object.keys(filter).length > 0) pineconeBody.filter = filter;

            console.log(`[VectorDB Test] POST to ${url}`, JSON.stringify(pineconeBody, null, 2));

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Api-Key': apiKey },
                body: JSON.stringify(pineconeBody),
            });
            if (!res.ok) throw new Error(`Pinecone error: ${await res.text()}`);
            const data = await res.json();

            console.log(`[VectorDB Test] Raw Match 0:`, JSON.stringify(data.matches?.[0] || 'NONE', null, 2));

            const extractText = (metadata: any) => {
                if (!metadata) return '';
                if (typeof metadata === 'string') {
                    try {
                        const p = JSON.parse(metadata);
                        if (p && typeof p === 'object') metadata = p;
                    } catch { if (metadata.length > 0) return metadata; }
                }
                const getString = (val: any): string => {
                    if (Array.isArray(val)) return val.join(' ');
                    return String(val ?? '');
                };
                if (textField && metadata[textField]) return getString(metadata[textField]);
                const commonKeys = ['text', 'content', 'page_content', 'body', 'description', 'message'];
                for (const k of commonKeys) {
                    if (metadata[k]) return getString(metadata[k]);
                }
                const keys = Object.keys(metadata);
                const lKeys = keys.map(k => k.toLowerCase());
                for (const k of commonKeys) {
                    const i = lKeys.indexOf(k);
                    if (i !== -1) return getString(metadata[keys[i]]);
                }
                return '';
            };
            results = (data.matches || []).map((m: any) => ({
                id: m.id, score: m.score,
                text: extractText(m.metadata),
                metadata: m.metadata,
            }));
        } else if (provider === 'qdrant') {
            const url = `${endpoint.replace(/\/$/, '')}/collections/${collection}/points/search`;
            const qdrantBody: Record<string, any> = {
                vector: embedding, limit: topK, with_payload: true, with_vector: !!includeVector,
            };
            if (filter && Object.keys(filter).length > 0) qdrantBody.filter = filter;

            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (apiKey) headers['api-key'] = apiKey;

            const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(qdrantBody) });
            if (!res.ok) throw new Error(`Qdrant error: ${await res.text()}`);
            const data = await res.json();
            const extractText = (payload: any) => {
                if (!payload) return '';
                if (typeof payload === 'string') {
                    try {
                        const p = JSON.parse(payload);
                        if (p && typeof p === 'object') payload = p;
                    } catch { return payload; }
                }
                const getString = (val: any): string => {
                    if (Array.isArray(val)) return val.join(' ');
                    return String(val ?? '');
                };
                if (textField && payload[textField]) return getString(payload[textField]);
                const commonKeys = ['text', 'content', 'page_content', 'body', 'description', 'message'];
                for (const k of commonKeys) {
                    if (payload[k]) return getString(payload[k]);
                }
                const keys = Object.keys(payload);
                const lKeys = keys.map(k => k.toLowerCase());
                for (const k of commonKeys) {
                    const i = lKeys.indexOf(k);
                    if (i !== -1) return getString(payload[keys[i]]);
                }
                return '';
            };
            results = (data.result || []).map((p: any) => ({
                id: String(p.id), score: p.score,
                text: extractText(p.payload),
                metadata: p.payload,
            }));
        } else {
            return NextResponse.json({ error: `Provider '${provider}' not supported` }, { status: 400 });
        }

        return NextResponse.json({
            results,
            total: results.length,
            latency_ms: Date.now() - start,
            dimension: embedding.length,
        });
    } catch (err) {
        console.error('Vector DB test query error:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
