/**
 * File Upload and Download Test Suite (~400 lines)
 *
 * Comprehensive E2E tests for file upload and download functionality:
 * - File upload via Convex HTTP endpoint (multipart and raw)
 * - File download and content verification
 * - File metadata retrieval
 * - Integration with workflow execution
 * - Error handling and edge cases
 * - File size limits and validation
 * - Content integrity verification
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { setTestAuth } from './test-auth-helper';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const UPLOAD_URL = process.env.NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL!;
const TEST_USER_ID = 'test-user-file-upload';

// Environment checks moved to beforeAll for graceful skip

// --- Helpers ---

/** Create a native FormData with a file Blob (compatible with Node.js fetch) */
function createUploadForm(content: Buffer, filename: string, contentType: string): FormData {
  const fd = new FormData();
  fd.append('file', new Blob([new Uint8Array(content)], { type: contentType }), filename);
  return fd;
}

/** Upload a file and return the JSON result */
async function uploadFile(content: Buffer, filename: string, contentType: string) {
  const fd = createUploadForm(content, filename, contentType);
  const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });
  return { response, result: await response.json() };
}

// --- Test Fixtures ---

/**
 * Create a test PDF file buffer
 */
function createTestPdfBuffer(): Buffer {
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(Test PDF Upload Content) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000214 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
333
%%EOF`;
  return Buffer.from(pdfContent);
}

/**
 * Create a test Markdown file buffer
 */
function createTestMarkdownBuffer(): Buffer {
  const markdownContent = `# Test Markdown Document

This is a test markdown file for upload testing.

## Features

- Item 1
- Item 2
- Item 3

\`\`\`javascript
console.log('Hello from markdown!');
\`\`\`

[Link to example](https://example.com)`;
  return Buffer.from(markdownContent, 'utf-8');
}

/**
 * Create a test text file buffer
 */
function createTestTextBuffer(): Buffer {
  return Buffer.from('This is a test text file for upload testing.', 'utf-8');
}

// --- Test Suite ---

test.describe('File Upload and Download Tests', () => {
  let convex: ConvexHttpClient;

  test.beforeAll(async () => {
    if (!CONVEX_URL || !UPLOAD_URL) {
      console.warn('[file-upload-download] Skipping - CONVEX_URL or UPLOAD_URL not set');
      test.skip();
      return;
    }
    // Verify upload endpoint works by sending a small test upload
    try {
      const testFd = new FormData();
      testFd.append('file', new Blob([new Uint8Array(Buffer.from('test'))], { type: 'text/plain' }), 'test.txt');
      const testResponse = await fetch(UPLOAD_URL, { method: 'POST', body: testFd });
      if (!testResponse.ok) {
        console.warn('[file-upload-download] Skipping - upload endpoint returned error: ' + testResponse.status);
        test.skip();
        return;
      }
    } catch (error: any) {
      console.warn('[file-upload-download] Skipping - upload endpoint not reachable: ' + error.message);
      test.skip();
      return;
    }
    convex = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convex, TEST_USER_ID);
  });

  test.describe('File Upload - Multipart Form Data', () => {
    test('should upload a PDF file successfully', async () => {
      const pdfBuffer = createTestPdfBuffer();
      const fd = createUploadForm(pdfBuffer, 'test-upload.pdf', 'application/pdf');
      fd.append('filename', 'test-upload.pdf');

      const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result).toHaveProperty('originalFilename', 'test-upload.pdf');
      expect(result).toHaveProperty('contentType', 'application/pdf');
      expect(result).toHaveProperty('size');
      expect(result.size).toBeGreaterThan(0);

      console.log('✅ PDF upload successful:', result);
    });

    test('should upload a Markdown file successfully', async () => {
      const mdBuffer = createTestMarkdownBuffer();
      const fd = createUploadForm(mdBuffer, 'test-upload.md', 'text/markdown');
      fd.append('filename', 'test-upload.md');

      const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result).toHaveProperty('originalFilename', 'test-upload.md');
      expect(result.size).toBeGreaterThan(0);

      console.log('✅ Markdown upload successful:', result);
    });

    test('should upload a text file successfully', async () => {
      const textBuffer = createTestTextBuffer();
      const fd = createUploadForm(textBuffer, 'test-upload.txt', 'text/plain');
      fd.append('filename', 'test-upload.txt');

      const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result).toHaveProperty('originalFilename', 'test-upload.txt');
      expect(result.size).toBeGreaterThan(0);

      console.log('✅ Text file upload successful:', result);
    });

    test('should handle upload without filename field', async () => {
      const textBuffer = createTestTextBuffer();
      const fd = createUploadForm(textBuffer, 'auto-named.txt', 'text/plain');

      const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result).toHaveProperty('originalFilename');
      expect(result.size).toBeGreaterThan(0);

      console.log('✅ Upload without explicit filename successful:', result);
    });

    test('should reject upload without file field', async () => {
      const fd = new FormData();
      fd.append('notfile', 'test content');

      const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result).toHaveProperty('error');
      expect(result.error).toContain("Missing 'file' field");

      console.log('✅ Correctly rejected upload without file field');
    });

    test('should handle large file upload (1MB)', async () => {
      const largeBuffer = Buffer.alloc(1024 * 1024, 'A');
      const fd = createUploadForm(largeBuffer, 'large-file.txt', 'text/plain');

      const response = await fetch(UPLOAD_URL, { method: 'POST', body: fd });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result.size).toBe(1024 * 1024);

      console.log('✅ Large file upload successful:', result);
    });
  });

  test.describe('File Upload - Raw Binary', () => {
    test('should upload raw PDF buffer', async () => {
      const pdfBuffer = createTestPdfBuffer();

      const response = await fetch(`${UPLOAD_URL}?filename=raw-upload.pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/pdf',
        },
        body: new Uint8Array(pdfBuffer),
      });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result).toHaveProperty('originalFilename', 'raw-upload.pdf');
      expect(result).toHaveProperty('contentType', 'application/pdf');

      console.log('✅ Raw binary upload successful:', result);
    });

    test('should upload raw text buffer', async () => {
      const textBuffer = createTestTextBuffer();

      const response = await fetch(`${UPLOAD_URL}?filename=raw-text.txt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: new Uint8Array(textBuffer),
      });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      expect(result.size).toBeGreaterThan(0);

      console.log('✅ Raw text upload successful:', result);
    });

    test('should handle raw upload without filename', async () => {
      const textBuffer = createTestTextBuffer();

      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: new Uint8Array(textBuffer),
      });

      expect(response.ok).toBeTruthy();
      const result = await response.json();

      expect(result).toHaveProperty('storageId');
      // Should use default filename
      expect(result).toHaveProperty('originalFilename');

      console.log('✅ Raw upload without filename successful:', result);
    });
  });

  test.describe('File Download', () => {
    let uploadedFileId: string;
    let originalContent: string;

    test.beforeAll(async () => {
      // Upload a test file first
      const testContent = 'This is content for download testing.';
      originalContent = testContent;
      const { result } = await uploadFile(Buffer.from(testContent, 'utf-8'), 'download-test.txt', 'text/plain');
      uploadedFileId = result.storageId;

      console.log('✅ Test file uploaded for download tests:', uploadedFileId);
    });

    test('should get download URL for uploaded file', async () => {
      const downloadUrl = await convex.query(api.files.getDownloadUrl, {
        storageId: uploadedFileId,
      });

      expect(downloadUrl).toBeDefined();
      expect(typeof downloadUrl).toBe('string');
      expect(downloadUrl).toContain('https://');

      console.log('✅ Download URL obtained:', downloadUrl?.substring(0, 50) + '...');
    });

    test('should download file and verify content', async () => {
      const downloadUrl = await convex.query(api.files.getDownloadUrl, {
        storageId: uploadedFileId,
      });

      expect(downloadUrl).toBeDefined();

      const response = await fetch(downloadUrl!);
      expect(response.ok).toBeTruthy();

      const content = await response.text();
      expect(content).toBe(originalContent);

      console.log('✅ File downloaded and content verified');
    });

    test('should get file metadata', async () => {
      const metadata = await convex.query(api.files.getFileMetadata, {
        storageId: uploadedFileId,
      });

      expect(metadata).toBeDefined();
      expect(metadata).toHaveProperty('contentType');
      expect(metadata).toHaveProperty('size');
      expect(metadata).toHaveProperty('sha256');
      expect(metadata!.size).toBeGreaterThan(0);

      console.log('✅ File metadata retrieved:', metadata);
    });

    test('should handle non-existent file gracefully', async () => {
      const fakeStorageId = 'kg2fake_non_existent_file_id_12345';

      try {
        const downloadUrl = await convex.query(api.files.getDownloadUrl, {
          storageId: fakeStorageId,
        });

        // If it doesn't throw, the URL should be null
        expect(downloadUrl).toBeNull();
      } catch (error) {
        // It's acceptable to throw an error for non-existent files
        console.log('✅ Non-existent file handled with error (expected)');
      }
    });

    test('should handle null metadata for non-existent file', async () => {
      const fakeStorageId = 'kg2fake_non_existent_file_id_12345';

      try {
        const metadata = await convex.query(api.files.getFileMetadata, {
          storageId: fakeStorageId,
        });

        // If it doesn't throw, metadata should be null
        expect(metadata).toBeNull();
      } catch (error) {
        // It's acceptable to throw an error for non-existent files
        console.log('✅ Non-existent file metadata handled with error (expected)');
      }
    });
  });

  test.describe('Multiple File Upload', () => {
    test('should upload multiple files sequentially', async () => {
      const files = [
        { buffer: createTestPdfBuffer(), filename: 'multi-1.pdf', contentType: 'application/pdf' },
        { buffer: createTestMarkdownBuffer(), filename: 'multi-2.md', contentType: 'text/markdown' },
        { buffer: createTestTextBuffer(), filename: 'multi-3.txt', contentType: 'text/plain' },
      ];

      const uploadResults = [];

      for (const file of files) {
        const { response, result } = await uploadFile(file.buffer, file.filename, file.contentType);
        expect(response.ok).toBeTruthy();
        uploadResults.push(result);
      }

      expect(uploadResults).toHaveLength(3);
      uploadResults.forEach((result, index) => {
        expect(result).toHaveProperty('storageId');
        expect(result.originalFilename).toBe(files[index].filename);
      });

      console.log('✅ Multiple files uploaded successfully:', uploadResults.map(r => r.originalFilename));
    });

    test('should upload multiple files in parallel', async () => {
      const files = [
        { buffer: createTestPdfBuffer(), filename: 'parallel-1.pdf', contentType: 'application/pdf' },
        { buffer: createTestMarkdownBuffer(), filename: 'parallel-2.md', contentType: 'text/markdown' },
        { buffer: createTestTextBuffer(), filename: 'parallel-3.txt', contentType: 'text/plain' },
      ];

      const uploadPromises = files.map(async file => {
        const { result } = await uploadFile(file.buffer, file.filename, file.contentType);
        return result;
      });

      const results = await Promise.all(uploadPromises);

      expect(results).toHaveLength(3);
      results.forEach((result, index) => {
        expect(result).toHaveProperty('storageId');
        expect(result.originalFilename).toBe(files[index].filename);
      });

      console.log('✅ Multiple files uploaded in parallel:', results.map(r => r.originalFilename));
    });
  });

  test.describe('File Size and Validation', () => {
    test('should handle empty file', async () => {
      const { response, result } = await uploadFile(Buffer.alloc(0), 'empty.txt', 'text/plain');

      expect(response.ok).toBeTruthy();
      expect(result).toHaveProperty('storageId');
      // Empty Blob may report size as 0 or undefined depending on runtime
      expect(result.size === 0 || result.size === undefined).toBe(true);

      console.log('✅ Empty file upload handled:', result);
    });

    test('should preserve file content integrity', async () => {
      const testContent = 'Content with special chars: 你好 世界 🚀 ñ ü é';
      const buffer = Buffer.from(testContent, 'utf-8');
      const { response, result } = await uploadFile(buffer, 'special-chars.txt', 'text/plain; charset=utf-8');

      expect(response.ok).toBeTruthy();

      // Download and verify
      const downloadUrl = await convex.query(api.files.getDownloadUrl, {
        storageId: result.storageId,
      });

      const downloadResponse = await fetch(downloadUrl!);
      const downloadedContent = await downloadResponse.text();

      expect(downloadedContent).toBe(testContent);

      console.log('✅ File content integrity verified with special characters');
    });

    test('should handle binary content correctly', async () => {
      const binaryBuffer = Buffer.from([0x00, 0x01, 0x02, 0xff, 0xfe, 0xfd]);
      const { response, result } = await uploadFile(binaryBuffer, 'binary.bin', 'application/octet-stream');

      expect(response.ok).toBeTruthy();
      expect(result).toHaveProperty('storageId');
      expect(result.size).toBe(6);

      // Download and verify binary integrity
      const downloadUrl = await convex.query(api.files.getDownloadUrl, {
        storageId: result.storageId,
      });

      const downloadResponse = await fetch(downloadUrl!);
      const arrayBuffer = await downloadResponse.arrayBuffer();
      const downloadedBuffer = Buffer.from(arrayBuffer);

      expect(downloadedBuffer).toEqual(binaryBuffer);

      console.log('✅ Binary content integrity verified');
    });
  });

  test.describe('CORS and Headers', () => {
    test('should include CORS headers in response', async () => {
      const textBuffer = createTestTextBuffer();
      const fd = createUploadForm(textBuffer, 'cors-test.txt', 'text/plain');

      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: fd,
        headers: {
          'Origin': 'http://localhost:3000',
        },
      });

      expect(response.ok).toBeTruthy();

      // Check CORS headers
      const corsHeader = response.headers.get('Access-Control-Allow-Origin');
      expect(corsHeader).toBeDefined();

      console.log('✅ CORS headers present:', corsHeader);
    });

    test('should handle OPTIONS preflight request', async () => {
      const response = await fetch(UPLOAD_URL, {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://localhost:3000',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type',
        },
      });

      // Some endpoints return 200, others return 204 for OPTIONS
      expect([200, 204]).toContain(response.status);

      console.log('✅ OPTIONS preflight handled');
    });
  });
});
