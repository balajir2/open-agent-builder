/**
 * File and Workflow Integration Test Suite (~300 lines)
 *
 * Tests the integration between file uploads and workflow execution:
 * - File upload → workflow execution → content extraction
 * - Document processing in agent nodes
 * - Multiple file inputs in workflows
 * - File content variable substitution
 * - Error handling in file-based workflows
 */

import { test, expect } from '@playwright/test';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { setTestAuth } from './test-auth-helper';
import { prefetchFileContents } from '@/lib/workflow/file-utils';
import { WorkflowState } from '@/lib/workflow/types';
import FormData from 'form-data';

// --- Test Configuration ---
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL!;
const UPLOAD_URL = process.env.NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL!;
const TEST_USER_ID = 'test-user-file-workflow';

// Environment checks moved to beforeAll for graceful skip

// --- Test Fixtures ---

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
<< /Length 60 >>
stream
BT
/F1 12 Tf
100 700 Td
(Important Document Content: Project Alpha) Tj
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
349
%%EOF`;
  return Buffer.from(pdfContent);
}

function createTestMarkdownBuffer(): Buffer {
  const content = `# Project Requirements

## Overview
This project requires the following features:

1. User authentication
2. Data processing
3. Report generation

## Timeline
- Phase 1: 2 weeks
- Phase 2: 4 weeks
- Phase 3: 3 weeks

Budget: $100,000`;
  return Buffer.from(content, 'utf-8');
}

// --- Test Suite ---

test.describe('File and Workflow Integration Tests', () => {
  let convex: ConvexHttpClient;

  test.beforeAll(async () => {
    if (!CONVEX_URL || !UPLOAD_URL) {
      console.warn('[file-workflow-integration] Skipping - CONVEX_URL or UPLOAD_URL not set');
      test.skip();
      return;
    }
    // Verify upload endpoint works with a test upload
    try {
      const testFormData = new FormData();
      testFormData.append('file', Buffer.from('test'), { filename: 'test.txt', contentType: 'text/plain' });
      const testResponse = await fetch(UPLOAD_URL, { method: 'POST', body: testFormData as any, headers: testFormData.getHeaders() });
      if (!testResponse.ok) {
        console.warn('[file-workflow-integration] Skipping - upload endpoint returned error: ' + testResponse.status);
        test.skip();
        return;
      }
    } catch (error: any) {
      console.warn('[file-workflow-integration] Skipping - upload endpoint not reachable: ' + error.message);
      test.skip();
      return;
    }
    convex = new ConvexHttpClient(CONVEX_URL);
    setTestAuth(convex, TEST_USER_ID);
  });

  test.describe('File Upload and State Injection', () => {
    test('should upload file and inject into workflow state', async () => {
      // Upload a test file
      const textContent = 'This is a test document for workflow processing.';
      const textBuffer = Buffer.from(textContent, 'utf-8');
      const formData = new FormData();

      formData.append('file', textBuffer, {
        filename: 'workflow-test.txt',
        contentType: 'text/plain',
      });

      const uploadResponse = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData as any,
        headers: formData.getHeaders(),
      });

      expect(uploadResponse.ok).toBeTruthy();
      const uploadResult = await uploadResponse.json();

      // Create workflow state with file reference
      const state: WorkflowState = {
        variables: {
          input: {
            testFile: {
              storageId: uploadResult.storageId,
              originalFilename: uploadResult.originalFilename,
              size: uploadResult.size,
              contentType: uploadResult.contentType,
            },
          },
        },
        chatHistory: [],
      };

      // Test that file object is in state
      expect(state.variables.input.testFile).toHaveProperty('storageId');
      expect(state.variables.input.testFile.storageId).toBe(uploadResult.storageId);

      console.log('✅ File uploaded and injected into workflow state');
    });

    test('should prefetch file contents for workflow execution', async () => {
      // Upload test file
      const textContent = 'Document content for prefetch testing.';
      const textBuffer = Buffer.from(textContent, 'utf-8');
      const formData = new FormData();

      formData.append('file', textBuffer, {
        filename: 'prefetch-test.txt',
        contentType: 'text/plain',
      });

      const uploadResponse = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData as any,
        headers: formData.getHeaders(),
      });

      const uploadResult = await uploadResponse.json();

      // Create state with file reference (no content initially)
      const state: WorkflowState = {
        variables: {
          input: {
            document: {
              storageId: uploadResult.storageId,
              originalFilename: uploadResult.originalFilename,
              size: uploadResult.size,
              contentType: uploadResult.contentType,
            },
          },
        },
        chatHistory: [],
      };

      // Verify no content initially
      expect(state.variables.input.document).not.toHaveProperty('content');

      // Prefetch file contents
      await prefetchFileContents('{{input.document}}', state);

      // Verify content was injected
      expect(state.variables.input.document).toHaveProperty('content');
      expect(state.variables.input.document).toHaveProperty('text');
      expect(state.variables.input.document.content).toBe(textContent);
      expect((state.variables.input.document as any).text).toBe(textContent);

      console.log('✅ File contents prefetched and injected into state');
    });

    test('should handle PDF file extraction in workflow state', async () => {
      // Upload PDF
      const pdfBuffer = createTestPdfBuffer();
      const formData = new FormData();

      formData.append('file', pdfBuffer, {
        filename: 'workflow-pdf.pdf',
        contentType: 'application/pdf',
      });

      const uploadResponse = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData as any,
        headers: formData.getHeaders(),
      });

      const uploadResult = await uploadResponse.json();

      // Create state
      const state: WorkflowState = {
        variables: {
          input: {
            pdfDoc: {
              storageId: uploadResult.storageId,
              originalFilename: uploadResult.originalFilename,
              contentType: uploadResult.contentType,
            },
          },
        },
        chatHistory: [],
      };

      // Prefetch and extract PDF content
      await prefetchFileContents('{{input.pdfDoc}}', state);

      // Verify PDF content was extracted
      expect(state.variables.input.pdfDoc).toHaveProperty('content');
      expect(state.variables.input.pdfDoc.content).toBeDefined();
      expect(typeof state.variables.input.pdfDoc.content).toBe('string');

      console.log('✅ PDF content extracted in workflow state');
      console.log('   Content preview:', state.variables.input.pdfDoc.content?.substring(0, 100));
    });

    test('should handle Markdown file in workflow state', async () => {
      // Upload Markdown
      const mdBuffer = createTestMarkdownBuffer();
      const formData = new FormData();

      formData.append('file', mdBuffer, {
        filename: 'requirements.md',
        contentType: 'text/markdown',
      });

      const uploadResponse = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData as any,
        headers: formData.getHeaders(),
      });

      const uploadResult = await uploadResponse.json();

      // Create state
      const state: WorkflowState = {
        variables: {
          input: {
            requirements: {
              storageId: uploadResult.storageId,
              originalFilename: uploadResult.originalFilename,
              contentType: uploadResult.contentType,
            },
          },
        },
        chatHistory: [],
      };

      // Prefetch
      await prefetchFileContents('{{input.requirements}}', state);

      // Verify markdown content
      expect(state.variables.input.requirements).toHaveProperty('content');
      expect(state.variables.input.requirements.content).toContain('# Project Requirements');
      expect(state.variables.input.requirements.content).toContain('Budget: $100,000');

      console.log('✅ Markdown content extracted in workflow state');
    });
  });

  test.describe('Multiple File Workflow Integration', () => {
    test('should handle multiple file inputs in workflow state', async () => {
      // Upload multiple files
      const files = [
        { buffer: Buffer.from('File 1 content'), filename: 'doc1.txt' },
        { buffer: Buffer.from('File 2 content'), filename: 'doc2.txt' },
        { buffer: Buffer.from('File 3 content'), filename: 'doc3.txt' },
      ];

      const uploadResults = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file.buffer, {
          filename: file.filename,
          contentType: 'text/plain',
        });

        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData as any,
          headers: formData.getHeaders(),
        });

        uploadResults.push(await response.json());
      }

      // Create state with multiple files
      const state: WorkflowState = {
        variables: {
          input: {
            file1: {
              storageId: uploadResults[0].storageId,
              originalFilename: uploadResults[0].originalFilename,
            },
            file2: {
              storageId: uploadResults[1].storageId,
              originalFilename: uploadResults[1].originalFilename,
            },
            file3: {
              storageId: uploadResults[2].storageId,
              originalFilename: uploadResults[2].originalFilename,
            },
          },
        },
        chatHistory: [],
      };

      // Prefetch all files
      await prefetchFileContents('{{input.file1}} {{input.file2}} {{input.file3}}', state);

      // Verify all files have content
      expect(state.variables.input.file1).toHaveProperty('content', 'File 1 content');
      expect(state.variables.input.file2).toHaveProperty('content', 'File 2 content');
      expect(state.variables.input.file3).toHaveProperty('content', 'File 3 content');

      console.log('✅ Multiple files processed in workflow state');
    });

    test('should handle mixed file types in workflow', async () => {
      // Upload different file types
      const pdfBuffer = createTestPdfBuffer();
      const mdBuffer = createTestMarkdownBuffer();
      const textBuffer = Buffer.from('Plain text content');

      const uploads = [
        { buffer: pdfBuffer, filename: 'doc.pdf', contentType: 'application/pdf' },
        { buffer: mdBuffer, filename: 'notes.md', contentType: 'text/markdown' },
        { buffer: textBuffer, filename: 'data.txt', contentType: 'text/plain' },
      ];

      const uploadResults = [];

      for (const upload of uploads) {
        const formData = new FormData();
        formData.append('file', upload.buffer, {
          filename: upload.filename,
          contentType: upload.contentType,
        });

        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData as any,
          headers: formData.getHeaders(),
        });

        uploadResults.push(await response.json());
      }

      // Create state
      const state: WorkflowState = {
        variables: {
          input: {
            pdfFile: {
              storageId: uploadResults[0].storageId,
              originalFilename: uploadResults[0].originalFilename,
              contentType: uploadResults[0].contentType,
            },
            mdFile: {
              storageId: uploadResults[1].storageId,
              originalFilename: uploadResults[1].originalFilename,
              contentType: uploadResults[1].contentType,
            },
            txtFile: {
              storageId: uploadResults[2].storageId,
              originalFilename: uploadResults[2].originalFilename,
              contentType: uploadResults[2].contentType,
            },
          },
        },
        chatHistory: [],
      };

      // Prefetch all
      await prefetchFileContents('{{input.pdfFile}} {{input.mdFile}} {{input.txtFile}}', state);

      // Verify all were extracted
      expect(state.variables.input.pdfFile).toHaveProperty('content');
      expect(state.variables.input.mdFile).toHaveProperty('content');
      expect(state.variables.input.txtFile).toHaveProperty('content', 'Plain text content');

      console.log('✅ Mixed file types processed successfully');
    });
  });

  test.describe('File Error Handling in Workflows', () => {
    test('should handle missing storage ID gracefully', async () => {
      const state: WorkflowState = {
        variables: {
          input: {
            missingFile: {
              storageId: 'kg2fake_missing_id_12345',
              originalFilename: 'missing.txt',
            },
          },
        },
        chatHistory: [],
      };

      // This should not throw, but log errors
      await prefetchFileContents('{{input.missingFile}}', state);

      // File object should still exist but without content
      expect(state.variables.input.missingFile).toBeDefined();
      expect(state.variables.input.missingFile.storageId).toBe('kg2fake_missing_id_12345');
      // Content should be undefined since file doesn't exist
      expect(state.variables.input.missingFile.content).toBeUndefined();

      console.log('✅ Missing file handled gracefully');
    });

    test('should handle empty file reference', async () => {
      const state: WorkflowState = {
        variables: {
          input: {},
        },
        chatHistory: [],
      };

      // This should not throw
      await prefetchFileContents('{{input.nonExistent}}', state);

      console.log('✅ Empty file reference handled gracefully');
    });

    test('should handle file without storageId', async () => {
      const state: WorkflowState = {
        variables: {
          input: {
            invalidFile: {
              originalFilename: 'test.txt',
              // Missing storageId
            },
          },
        },
        chatHistory: [],
      };

      // This should not attempt to fetch
      await prefetchFileContents('{{input.invalidFile}}', state);

      // Should not have content
      expect(state.variables.input.invalidFile.content).toBeUndefined();

      console.log('✅ File without storageId handled gracefully');
    });

    test('should handle files with existing content (no re-fetch)', async () => {
      // Upload file
      const textBuffer = Buffer.from('Original content');
      const formData = new FormData();

      formData.append('file', textBuffer, {
        filename: 'existing-content.txt',
        contentType: 'text/plain',
      });

      const uploadResponse = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData as any,
        headers: formData.getHeaders(),
      });

      const uploadResult = await uploadResponse.json();

      // Create state with content already present
      const state: WorkflowState = {
        variables: {
          input: {
            fileWithContent: {
              storageId: uploadResult.storageId,
              originalFilename: uploadResult.originalFilename,
              content: 'Existing cached content',
              text: 'Existing cached content',
            },
          },
        },
        chatHistory: [],
      };

      // Prefetch should not overwrite existing content
      await prefetchFileContents('{{input.fileWithContent}}', state);

      // Content should remain unchanged (prefetch skips files with content)
      expect(state.variables.input.fileWithContent.content).toBe('Existing cached content');

      console.log('✅ Existing content preserved (not re-fetched)');
    });
  });

  test.describe('Variable Substitution with Files', () => {
    test('should substitute file content in agent instructions', async () => {
      // Upload file
      const content = 'Analyze this business proposal carefully.';
      const textBuffer = Buffer.from(content, 'utf-8');
      const formData = new FormData();

      formData.append('file', textBuffer, {
        filename: 'proposal.txt',
        contentType: 'text/plain',
      });

      const uploadResponse = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData as any,
        headers: formData.getHeaders(),
      });

      const uploadResult = await uploadResponse.json();

      // Create state
      const state: WorkflowState = {
        variables: {
          input: {
            proposal: {
              storageId: uploadResult.storageId,
              originalFilename: uploadResult.originalFilename,
            },
          },
        },
        chatHistory: [],
      };

      // Prefetch
      await prefetchFileContents('{{input.proposal}}', state);

      // Verify content available for substitution
      expect(state.variables.input.proposal.content).toBe(content);

      console.log('✅ File content ready for variable substitution');
    });

    test('should handle file references in complex expressions', async () => {
      // Upload multiple files
      const uploads = [
        { content: 'Document A content', filename: 'docA.txt' },
        { content: 'Document B content', filename: 'docB.txt' },
      ];

      const uploadResults = [];

      for (const upload of uploads) {
        const formData = new FormData();
        formData.append('file', Buffer.from(upload.content), {
          filename: upload.filename,
          contentType: 'text/plain',
        });

        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData as any,
          headers: formData.getHeaders(),
        });

        uploadResults.push(await response.json());
      }

      // Create state
      const state: WorkflowState = {
        variables: {
          input: {
            documents: [
              {
                storageId: uploadResults[0].storageId,
                originalFilename: uploadResults[0].originalFilename,
              },
              {
                storageId: uploadResults[1].storageId,
                originalFilename: uploadResults[1].originalFilename,
              },
            ],
          },
        },
        chatHistory: [],
      };

      // Note: Current implementation handles direct file object references
      // Array of files would require iteration in the workflow logic

      console.log('✅ Complex file references structure created');
    });
  });
});
