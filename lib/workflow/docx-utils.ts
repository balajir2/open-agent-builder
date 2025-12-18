
import * as mammoth from "mammoth";

/**
 * Extract raw text from a DOCX buffer using mammoth.
 */
export async function handler(buffer: Buffer): Promise<string> {
    try {
        if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
            return `[DOCX error: Invalid buffer provided]`;
        }

        // Try to handle potential CJS/ESM interop issues
        const m: any = (mammoth as any).default || mammoth;

        const result = await m.extractRawText({ buffer });

        const text = (typeof result.value === 'string' ? result.value : String(result.value)).trim();

        if (text.length === 0) {
            const msg = result.messages?.map((m: any) => m.message).join('; ') || 'No messages';
            let errorMsg = `[DOCX appears to be empty. Internal diagnostics: ${msg}]`;
            if (msg.includes('altChunk')) {
                errorMsg += " (Note: This document uses an unsupported 'altChunk' format. Please try saving it in a standard Word format or as a PDF.)";
            }
            return errorMsg;
        }

        return text;
    } catch (error) {
        console.error("[DOCX] Error extracting text:", error);
        return `[DOCX parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}]`;
    }
}
