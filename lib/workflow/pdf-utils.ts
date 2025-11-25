/**
 * PDF text extraction using pdf2json
 * This is a pure Node.js library without browser dependencies
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export async function handler(buffer: Buffer): Promise<string> {
    try {
        console.log("[PDF] Starting PDF text extraction with pdf2json...");
        console.log("[PDF] Buffer size:", buffer?.length, "bytes");

        // Validate buffer
        if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
            return `[PDF error: Invalid buffer provided]`;
        }

        // Load pdf2json
        const PDFParser = require('pdf2json');

        return new Promise((resolve, reject) => {
            const pdfParser = new PDFParser();

            // Set up event handlers
            pdfParser.on("pdfParser_dataError", (errData: any) => {
                console.error("[PDF] Parse error:", errData.parserError);
                resolve(`[PDF content could not be extracted: ${errData.parserError}]`);
            });

            pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                try {
                    // Extract text from all pages
                    let fullText = '';

                    // pdfData.Pages is an array of page objects
                    if (pdfData && pdfData.Pages && Array.isArray(pdfData.Pages)) {
                        for (const page of pdfData.Pages) {
                            if (page.Texts && Array.isArray(page.Texts)) {
                                for (const textItem of page.Texts) {
                                    if (textItem.R && Array.isArray(textItem.R)) {
                                        for (const run of textItem.R) {
                                            if (run.T) {
                                                // Decode URI-encoded text
                                                fullText += decodeURIComponent(run.T) + ' ';
                                            }
                                        }
                                    }
                                }
                            }
                            fullText += '\n\n'; // Add page break
                        }
                    }

                    fullText = fullText.trim();
                    console.log(`[PDF] ✅ Successfully extracted ${fullText.length} characters from ${pdfData.Pages?.length || 0} pages`);

                    if (fullText.length === 0) {
                        resolve('[PDF appears to be empty or contains only images]');
                    } else {
                        resolve(fullText);
                    }
                } catch (error) {
                    console.error("[PDF] Error extracting text:", error);
                    resolve(`[PDF text extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}]`);
                }
            });

            // Parse the buffer
            pdfParser.parseBuffer(buffer);
        });
    } catch (error) {
        console.error("[PDF] Error in PDF handler:", error);
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        return `[PDF processing failed: ${errorMsg}]`;
    }
}
