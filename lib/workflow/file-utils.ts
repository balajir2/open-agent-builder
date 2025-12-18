import { WorkflowState } from './types';
import { extractVariableReferences, evaluateExpression } from './variable-substitution';
import { getConvexClient } from '../convex/client';
import { api } from '../convex/client';
import { handler } from './pdf-utils';
import { handler as docxHandler } from './docx-utils';

/**
 * Check if a file is a PDF based on MIME type or filename
 */
function isPdfFile(contentType: string | null, filename: string | null): boolean {
    if (contentType && contentType.includes('pdf')) {
        return true;
    }
    if (filename && filename.toLowerCase().endsWith('.pdf')) {
        return true;
    }
    return false;
}

function isDocxFile(contentType: string | null, filename: string | null): boolean {
    if (contentType && (
        contentType.includes('wordprocessingml') ||
        contentType.includes('msword') ||
        contentType.includes('officedocument')
    )) {
        return true;
    }
    if (filename && filename.toLowerCase().endsWith('.docx')) {
        return true;
    }
    return false;
}

function isMarkdownFile(contentType: string | null, filename: string | null): boolean {
    if (contentType && (contentType.includes('markdown') || contentType.includes('text/plain'))) {
        // text/plain is broad, so check extension too if it's text/plain
        if (contentType.includes('text/plain') && filename && filename.toLowerCase().endsWith('.md')) {
            return true;
        }
        if (contentType.includes('markdown')) return true;
    }
    if (filename && filename.toLowerCase().endsWith('.md')) {
        return true;
    }
    return false;
}

/**
 * Prefetches file contents and injects them into the workflow state.
 */
export async function prefetchFileContents(text: string, state: WorkflowState): Promise<void> {
    console.log('[FileUtils] ========== prefetchFileContents called ==========');
    console.log('[FileUtils] Text to scan:', text?.substring(0, 300));

    if (!text) {
        console.log('[FileUtils] No text provided, returning early');
        return;
    }

    const references = extractVariableReferences(text);
    console.log('[FileUtils] Found variable references:', references);

    const convex = getConvexClient();

    // Track unique file IDs to fetch
    const filesToFetch = new Map<string, { storageId: string; variablePath: string }>();

    for (const ref of references) {
        try {
            const value = evaluateExpression(ref, state);
            console.log(`[FileUtils] Evaluating "${ref}":`, {
                type: typeof value,
                isObject: typeof value === 'object',
                hasStorageId: !!value?.storageId,
                hasContent: !!value?.content,
                storageId: value?.storageId,
            });

            // Check if it's a file object (has storageId) and missing content
            if (value &&
                typeof value === 'object' &&
                value.storageId &&
                typeof value.storageId === 'string' &&
                !value.content) {

                console.log(`[FileUtils] 🎯 Found file to fetch: ${ref} with storageId: ${value.storageId}`);

                // Use the storageId as the key to avoid duplicates
                if (!filesToFetch.has(value.storageId)) {
                    filesToFetch.set(value.storageId, {
                        storageId: value.storageId,
                        variablePath: ref
                    });
                }
            }
        } catch (e) {
            console.log(`[FileUtils] Error evaluating "${ref}":`, e);
        }
    }

    if (filesToFetch.size === 0) {
        console.log('[FileUtils] No files to fetch, returning early');
        return;
    }

    console.log(`[FileUtils] Prefetching content for ${filesToFetch.size} files...`);

    // Fetch all files in parallel
    await Promise.all(Array.from(filesToFetch.values()).map(async ({ storageId, variablePath }) => {
        try {
            // Get the file object from state to check for filename
            const fileObj = evaluateExpression(variablePath, state);
            const filename = fileObj?.originalFilename || fileObj?.name || null;

            // Get file metadata to determine file type
            let metadata;
            try {
                metadata = await convex.query(api.files.getFileMetadata, { storageId });
                if (!metadata) {
                    console.error(`[FileUtils] ❌ No metadata found for storageId: ${storageId}`);
                    console.error(`[FileUtils] This likely means the file doesn't exist in Convex storage`);
                    return;
                }
                console.log(`[FileUtils] File metadata:`, {
                    contentType: metadata.contentType,
                    size: metadata.size,
                    sha256: metadata.sha256
                });
            } catch (err) {
                console.error(`[FileUtils] ❌ Error fetching metadata for ${storageId}:`, err);
                return;
            }
            const contentType = metadata?.contentType || null;

            // Get the download URL
            let url;
            try {
                url = await convex.query(api.files.getDownloadUrl, { storageId });
                if (!url) {
                    console.error(`[FileUtils] ❌ No download URL returned for storageId: ${storageId}`);
                    console.error(`[FileUtils] This usually means the file exists but Convex couldn't generate a URL`);
                    return;
                }
                console.log(`[FileUtils] Download URL obtained (length: ${url.length})`);
            } catch (err) {
                console.error(`[FileUtils] ❌ Error getting download URL for ${storageId}:`, err);
                return;
            }

            // Fetch the content
            console.log(`[FileUtils] Fetching file content from URL...`);
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`[FileUtils] ❌ Failed to fetch file content:`, {
                    status: response.status,
                    statusText: response.statusText,
                    url: url.substring(0, 100) + '...'
                });
                return;
            }
            console.log(`[FileUtils] ✅ File fetch successful, response size: ${response.headers.get('content-length') || 'unknown'}`);


            let content: string;

            // Check if this is a PDF file
            if (isPdfFile(contentType, filename)) {
                console.log(`[FileUtils] Detected PDF file: ${filename || storageId}`);

                // Fetch as array buffer for PDF processing
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Extract text from PDF
                content = await handler(buffer);
                // console.log(`[FileUtils] Extracted ${content.length} characters from PDF`);
            } else if (isDocxFile(contentType, filename)) {
                console.log(`[FileUtils] Detected DOCX file: ${filename || storageId}`);

                // Fetch as array buffer for DOCX processing
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Extract text from DOCX
                content = await docxHandler(buffer);
            } else if (isMarkdownFile(contentType, filename)) {
                // Read as text for Markdown
                content = await response.text();
            } else {
                // Read as text for other files
                content = await response.text();
            }

            // Inject content back into the state variable
            const value = evaluateExpression(variablePath, state);
            console.log(`[FileUtils] Variable path: ${variablePath}, value type: ${typeof value}, has storageId: ${!!value?.storageId}`);

            if (value && typeof value === 'object') {
                // Store both raw content and a convenient 'text' field
                value.content = content;
                // Some downstream code expects a 'text' property
                (value as any).text = content;
                console.log(`[FileUtils] ✅ Injected ${content.length} characters into ${variablePath}`);
                console.log(`[FileUtils] Content preview: ${content.substring(0, 200)}...`);
                console.log(`[FileUtils] Verify - value.content exists: ${!!value.content}, length: ${value.content?.length}`);
                console.log(`[FileUtils] Verify - value.text exists: ${!!(value as any).text}, length: ${(value as any).text?.length}`);
                console.log(`[FileUtils] Full value keys:`, Object.keys(value));
            } else {
                console.error(`[FileUtils] ❌ Failed to inject content - value is not an object or is null`);
            }
        } catch (error) {
            console.error(`[FileUtils] Error fetching file ${storageId}:`, error);
        }
    }));

    console.log('[FileUtils] ========== prefetchFileContents completed ==========');
}
