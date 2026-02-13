# File Upload and Download Testing Guide

**Last Updated:** February 13, 2026

This guide covers the comprehensive test suite for file upload, download, and workflow integration functionality in the Open Agent Builder.

## Overview

The file testing suite consists of three test files covering different aspects of file handling:

1. **[file-processing.spec.ts](../../tests/file-processing.spec.ts)** - Document extraction and content processing (~370 lines)
2. **[file-upload-download.spec.ts](../../tests/file-upload-download.spec.ts)** - Upload/download via HTTP endpoints (~400 lines)
3. **[file-workflow-integration.spec.ts](../../tests/file-workflow-integration.spec.ts)** - Files in workflow execution (~300 lines)

**Total Coverage:** ~1,070 lines of comprehensive file handling tests

## Quick Start

```bash
# Run all file-related tests
npm run test:files

# Run with visible browser (headed mode)
npm run test:files:headed

# Run with interactive UI
npm run test:files:ui

# Run specific test suites
npm run test:upload-download           # Upload/download only
npm run test:file-integration          # Workflow integration only
npm run test                           # All tests including file tests
```

## Test Suite Breakdown

### 1. File Processing Tests (`file-processing.spec.ts`)

Tests document extraction and content processing after files are uploaded.

**Coverage:**
- ✅ PDF text extraction using pdf2json
- ✅ DOCX text extraction using mammoth
- ✅ Markdown file processing
- ✅ Content injection into workflow state
- ✅ Variable substitution with extracted content
- ✅ Multiple file input handling
- ✅ Error handling for corrupted files
- ✅ File type detection (by content type and extension)

**Example Test:**
```typescript
test('should extract text from valid PDF buffer', async () => {
  const pdfBuffer = createMockPdfBuffer();
  const result = await pdfHandler(pdfBuffer);

  expect(result).toBeDefined();
  expect(typeof result).toBe('string');
  expect(result).not.toContain('[PDF error:');
});
```

**Run:**
```bash
playwright test tests/file-processing.spec.ts
```

---

### 2. File Upload/Download Tests (`file-upload-download.spec.ts`)

Tests the actual HTTP endpoints for uploading and downloading files via Convex storage.

**Coverage:**

#### Upload Tests (Multipart Form Data)
- ✅ Upload PDF files
- ✅ Upload Markdown files
- ✅ Upload text files
- ✅ Upload without explicit filename
- ✅ Reject uploads without file field
- ✅ Large file uploads (1MB)

#### Upload Tests (Raw Binary)
- ✅ Upload raw PDF buffer
- ✅ Upload raw text buffer
- ✅ Upload without filename parameter

#### Download Tests
- ✅ Get download URL for uploaded file
- ✅ Download file and verify content integrity
- ✅ Get file metadata (size, SHA256, content type)
- ✅ Handle non-existent files gracefully

#### Multiple File Tests
- ✅ Upload multiple files sequentially
- ✅ Upload multiple files in parallel

#### File Size and Validation
- ✅ Handle empty files
- ✅ Preserve content integrity (special characters, UTF-8)
- ✅ Handle binary content correctly

#### CORS and Headers
- ✅ Verify CORS headers in responses
- ✅ Handle OPTIONS preflight requests

**Example Test:**
```typescript
test('should upload a PDF file successfully', async () => {
  const pdfBuffer = createTestPdfBuffer();
  const formData = new FormData();

  formData.append('file', pdfBuffer, {
    filename: 'test-upload.pdf',
    contentType: 'application/pdf',
  });

  const response = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders(),
  });

  expect(response.ok).toBeTruthy();
  const result = await response.json();

  expect(result).toHaveProperty('storageId');
  expect(result).toHaveProperty('originalFilename', 'test-upload.pdf');
  expect(result).toHaveProperty('contentType', 'application/pdf');
  expect(result.size).toBeGreaterThan(0);
});
```

**Run:**
```bash
npm run test:upload-download
npm run test:upload-download:headed  # With visible browser
```

---

### 3. File and Workflow Integration Tests (`file-workflow-integration.spec.ts`)

Tests how uploaded files integrate with workflow execution, including content extraction and variable substitution.

**Coverage:**

#### Upload and State Injection
- ✅ Upload file and inject into workflow state
- ✅ Prefetch file contents for workflow execution
- ✅ PDF file extraction in workflow state
- ✅ Markdown file extraction in workflow state

#### Multiple File Workflow Integration
- ✅ Handle multiple file inputs in workflow state
- ✅ Handle mixed file types (PDF, Markdown, text)

#### Error Handling in Workflows
- ✅ Handle missing storage IDs gracefully
- ✅ Handle empty file references
- ✅ Handle files without storageId
- ✅ Handle files with existing content (no re-fetch)

#### Variable Substitution with Files
- ✅ Substitute file content in agent instructions
- ✅ Handle file references in complex expressions

**Example Test:**
```typescript
test('should prefetch file contents for workflow execution', async () => {
  // Upload test file
  const textContent = 'Document content for prefetch testing.';
  const uploadResult = await uploadFile(textContent, 'prefetch-test.txt');

  // Create state with file reference (no content initially)
  const state: WorkflowState = {
    variables: {
      input: {
        document: {
          storageId: uploadResult.storageId,
          originalFilename: uploadResult.originalFilename,
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
  expect(state.variables.input.document.content).toBe(textContent);
});
```

**Run:**
```bash
npm run test:file-integration
npm run test:file-integration:headed  # With visible browser
```

---

## Architecture: How File Upload/Download Works

### Upload Flow

```
User → HTTP POST → Convex HTTP Action → Convex Storage → Return storageId
         ↓
   multipart/form-data
   or raw binary
```

**Endpoint:** `convex/http/uploadFile.ts`

**Request:**
```typescript
// Multipart form data
POST /http/uploadFile
Content-Type: multipart/form-data

file: <binary data>
filename: "document.pdf"
```

**Response:**
```json
{
  "storageId": "kg2a1b2c3d4e5f6g7h8i9j0k",
  "originalFilename": "document.pdf",
  "size": 12345,
  "contentType": "application/pdf"
}
```

### Download Flow

```
storageId → Convex Query → Get Download URL → Fetch File → Extract Content
                ↓
         api.files.getDownloadUrl
                ↓
         Signed Convex URL
```

**Queries:**
- `api.files.getDownloadUrl` - Returns temporary download URL
- `api.files.getFileMetadata` - Returns file metadata (size, SHA256, contentType)

**Example:**
```typescript
// Get download URL
const downloadUrl = await convex.query(api.files.getDownloadUrl, {
  storageId: 'kg2a1b2c3d4e5f6g7h8i9j0k',
});

// Download file
const response = await fetch(downloadUrl);
const content = await response.text(); // or .arrayBuffer() for binary
```

### Workflow Integration Flow

```
1. Upload file → Get storageId
2. Create workflow with file input variable
3. Execute workflow
4. prefetchFileContents() detects file references
5. Download file from Convex storage
6. Extract content (PDF/DOCX/Markdown)
7. Inject content into workflow state
8. Variable substitution uses extracted content
9. Agent/nodes access file content via {{input.fileName}}
```

**Key Function:** `lib/workflow/file-utils.ts::prefetchFileContents()`

This function:
1. Scans text for variable references like `{{input.document}}`
2. Evaluates references to find file objects (objects with `storageId`)
3. Downloads files from Convex storage
4. Extracts text content based on file type
5. Injects content back into state (`file.content` and `file.text`)

---

## Supported File Types

| Format | Extension | Content Type | Extraction Method |
|--------|-----------|--------------|-------------------|
| PDF | `.pdf` | `application/pdf` | pdf2json |
| Word | `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | mammoth |
| Markdown | `.md` | `text/markdown` | Direct text |
| Text | `.txt` | `text/plain` | Direct text |

**File Type Detection:**
1. First check `contentType` header
2. Fallback to filename extension
3. Case-insensitive extension matching

---

## Test Data Fixtures

The test suite includes helper functions to create test files:

```typescript
// Create test PDF
function createTestPdfBuffer(): Buffer {
  // Returns valid PDF with text content
}

// Create test Markdown
function createTestMarkdownBuffer(): Buffer {
  // Returns markdown with headers, lists, code blocks
}

// Create test text
function createTestTextBuffer(): Buffer {
  // Returns plain text content
}
```

These fixtures create **valid file formats** that can be parsed by the extraction libraries.

---

## Environment Variables Required

The tests require these environment variables to be set:

```bash
# Convex connection
CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Upload endpoint
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://your-deployment.convex.site/http/uploadFile
```

These are automatically loaded from `.env.local` or `.env` files.

---

## Running Tests in CI/CD

The file tests can be run in CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run File Upload/Download Tests
  run: npm run test:files
  env:
    CONVEX_URL: ${{ secrets.CONVEX_URL }}
    NEXT_PUBLIC_CONVEX_URL: ${{ secrets.NEXT_PUBLIC_CONVEX_URL }}
    NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL: ${{ secrets.CONVEX_UPLOAD_URL }}
```

**Notes:**
- Tests create and clean up files in Convex storage
- Each test run generates unique filenames to avoid collisions
- Tests do not require authentication (uses public upload endpoint)

---

## Test Reports

Test results are available in multiple formats:

```bash
# Run tests and generate report
npm run test:files

# View HTML report
npx playwright show-report

# View JSON report
cat playwright-report/results.json
```

**Test Artifacts:**
- Screenshots on failure
- Video recordings (if enabled)
- Test traces for debugging
- Console logs from tests

---

## Debugging Failed Tests

### Enable Headed Mode
```bash
npm run test:files:headed
```

This shows the browser window during test execution.

### Enable UI Mode
```bash
npm run test:files:ui
```

Interactive debugging with time-travel and step-through.

### Check Logs
```bash
# The tests output detailed logs
npm run test:files 2>&1 | tee test-output.log
```

### Common Issues

**Issue:** Upload fails with 400 error
- **Cause:** Missing 'file' field in form data
- **Fix:** Ensure formData.append('file', buffer, options)

**Issue:** Download URL returns null
- **Cause:** File doesn't exist in Convex storage
- **Fix:** Verify storageId is correct

**Issue:** Content extraction returns error
- **Cause:** Invalid file format or corrupted file
- **Fix:** Check file buffer is valid format

**Issue:** prefetchFileContents doesn't inject content
- **Cause:** Variable reference format incorrect or missing storageId
- **Fix:** Use `{{input.fileName}}` syntax and ensure storageId exists

---

## Test Coverage Metrics

Run tests with coverage:

```bash
npm run test:files -- --coverage
```

**Current Coverage:**
- ✅ File upload: Multipart & raw binary
- ✅ File download: URL retrieval & content verification
- ✅ File metadata: Size, type, SHA256
- ✅ Content extraction: PDF, DOCX, Markdown, Text
- ✅ Workflow integration: State injection & variable substitution
- ✅ Error handling: Missing files, corrupted files, invalid formats
- ✅ Multiple files: Sequential & parallel uploads
- ✅ File integrity: Binary & text content preservation
- ✅ CORS: Headers & preflight requests

**Not Yet Covered:**
- ❌ File size limits enforcement (10MB+)
- ❌ Virus scanning (future feature)
- ❌ File compression (ZIP, RAR)
- ❌ Image OCR extraction
- ❌ Excel/CSV parsing
- ❌ PowerPoint extraction

---

## Future Enhancements

### Planned Test Additions

1. **Large File Handling**
   - Test files > 10MB
   - Streaming upload/download
   - Progress tracking

2. **Additional File Formats**
   - Excel (`.xlsx`, `.xls`)
   - PowerPoint (`.pptx`)
   - Images with OCR (`.png`, `.jpg`)
   - Compressed archives (`.zip`)

3. **Performance Tests**
   - Concurrent upload stress testing
   - Download speed benchmarks
   - Memory usage profiling

4. **Security Tests**
   - File type validation
   - Malware detection integration
   - Size limit enforcement
   - Rate limiting

5. **Workflow Tests**
   - Multi-step workflows with files
   - File transformation pipelines
   - File output generation

---

## Related Documentation

- **[File Utils Implementation](../../lib/workflow/file-utils.ts)** - Content extraction logic
- **[Upload Endpoint](../../convex/http/uploadFile.ts)** - HTTP upload handler
- **[File Queries](../../convex/files.ts)** - Download URL & metadata queries
- **[Testing Guide](./testing-quick-start.md)** - General testing documentation
- **[Regression Testing Guide](./regression-testing.md)** - Model regression tests

---

## Troubleshooting

### Test Failures

**Symptom:** Tests fail with "CONVEX_URL not set"
```bash
# Solution: Set environment variables
cp .env.example .env.local
# Fill in CONVEX_URL and NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL
```

**Symptom:** Upload test fails with 500 error
```bash
# Solution: Check Convex is running
npx convex dev
# Ensure deployment is active
```

**Symptom:** Content extraction returns empty string
```bash
# Solution: Verify file format is valid
# Check pdf2json/mammoth can parse the test file
```

**Symptom:** prefetchFileContents doesn't work
```bash
# Solution: Ensure variable reference format is correct
# Use {{input.fileName}} not just fileName
```

### Getting Help

- **GitHub Issues:** https://github.com/anthropics/open-agent-builder/issues
- **Documentation:** [docs/](../../docs/)
- **Test Files:** [tests/](../../tests/)

---

## Summary

The file upload/download test suite provides comprehensive coverage of:

1. ✅ **HTTP Upload** - Multipart and raw binary uploads
2. ✅ **HTTP Download** - URL retrieval and content verification
3. ✅ **Content Extraction** - PDF, DOCX, Markdown processing
4. ✅ **Workflow Integration** - State injection and variable substitution
5. ✅ **Error Handling** - Graceful failure for edge cases
6. ✅ **Multiple Files** - Batch and parallel uploads
7. ✅ **File Integrity** - Content preservation across upload/download

**Total Tests:** ~50 test cases across 3 test files (~1,070 lines)

Run all file tests:
```bash
npm run test:files
```

---

**Last Updated:** February 13, 2026
**Maintained By:** Open Agent Builder Team
