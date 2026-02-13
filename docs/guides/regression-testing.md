# Model Regression Testing Guide

A comprehensive guide to testing all LLM models across providers with tools and MCP protocol.

## Table of Contents

1. [Overview](#overview)
2. [What is Tested](#what-is-tested)
3. [Running Tests](#running-tests)
4. [Understanding Test Reports](#understanding-test-reports)
5. [Adding New Models](#adding-new-models)
6. [CI/CD Integration](#cicd-integration)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Model Regression Testing suite is an automated testing framework that validates all LLM models work correctly with:
- **Standard prompts** - Basic model functionality
- **Tool calling** - Integration with Firecrawl, Tavily, Serper, E2B, Arcade
- **MCP protocol** - Model Context Protocol tool execution
- **Structured output** - JSON mode and schema validation
- **Error handling** - Graceful failure and recovery

### Why Regression Testing?

As the platform supports 18+ models across 4 providers, regression testing ensures:
- **Model Updates** - New model versions don't break existing workflows
- **Tool Compatibility** - All models correctly use external tools
- **Provider Changes** - API changes are caught before affecting users
- **Quality Assurance** - Consistent behavior across providers
- **Documentation** - Automated proof that features work

---

## What is Tested

### Models Under Test

**Total: 19 Models across 4 Providers**

#### Anthropic (3 models)
- **Claude Sonnet 4.5** (`claude-sonnet-4-5-20250929`) - Balanced performance
- **Claude Opus 4.6** (`claude-opus-4-6`) - Most capable model (1M context)
- **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`) - Fast, lightweight model

#### OpenAI (4 models)
- **GPT-5.2** (`gpt-5.2`) - Default flagship model
- **o3** (`o3`) - Advanced reasoning model
- **GPT-4.5** (`gpt-4.5`) - Pro-tier model
- **GPT-4o Mini** (`gpt-4o-mini`) - Fast and affordable

#### Google (5 models)
- **Gemini 3 Pro Preview** (`gemini-3-pro-preview`) - Latest preview
- **Gemini 3 Flash Preview** (`gemini-3-flash-preview`) - Fast inference
- **Gemini 2.5 Pro** (`gemini-2.5-pro`) - Production stable
- **Gemini 2.5 Flash** (`gemini-2.5-flash`) - Fast production
- **Gemini 2.5 Flash Lite** (`gemini-2.5-flash-lite`) - Cost-effective

#### Groq (6 models)
- **Llama 4 Maverick 17B** (`meta-llama/llama-4-maverick-17b-128e-instruct`) - Latest Llama 4
- **Llama 4 Scout 17B** (`meta-llama/llama-4-scout-17b-16e-instruct`) - Llama 4 scout
- **Llama 3.3 70B** (`llama-3.3-70b-versatile`) - Previous generation
- **Llama 3.1 8B Instant** (`llama-3.1-8b-instant`) - Ultra-fast inference
- **GPT OSS 120B** (`openai/gpt-oss-120b`) - Open-source alternative
- **GPT OSS 20B** (`openai/gpt-oss-20b`) - Compact open-source

### Test Scenarios

Each model is tested with **3 test types**:

#### 1. Basic Prompt Test
**Purpose**: Verify model availability and basic functionality

**Test**: Simple question without tools
```
Prompt: "What is 2+2? Answer with just the number."
Expected: Numerical response containing "4"
```

**Validates**:
- Model API is accessible
- Authentication works
- Basic inference succeeds
- Response parsing works

#### 2. Tool Usage Test
**Purpose**: Verify tool calling capability

**Test**: Web scraping with Firecrawl
```
Prompt: "Use the Firecrawl scraper to fetch content from https://example.com"
Tools: [firecrawl_scrape]
Expected: Tool call with correct parameters
```

**Validates**:
- Model can invoke external tools
- Tool parameters are correctly formatted
- Tool results are processed
- Response includes tool usage

#### 3. Multi-Tool Test (Future)
**Purpose**: Verify complex tool orchestration

**Test**: Search + Scrape workflow
```
Prompt: "Search for 'Open Agent Builder' and scrape the first result"
Tools: [tavily_search, firecrawl_scrape]
Expected: Sequential tool calls
```

**Validates**:
- Multiple tool calls in sequence
- Context preservation between calls
- Complex workflow execution

---

## Running Tests

### Prerequisites

1. **API Keys Configured**:
   ```bash
   # System-level keys in Convex
   npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
   npx convex env set OPENAI_API_KEY "sk-..."
   npx convex env set GROQ_API_KEY "gsk_..."
   npx convex env set GOOGLE_API_KEY "AIzaSy..."
   npx convex env set FIRECRAWL_API_KEY "fc-..."
   ```

2. **Development Server Running**:
   ```bash
   npm run dev:all
   ```

3. **Playwright Installed**:
   ```bash
   npx playwright install
   ```

### Basic Commands

```bash
# Run all model regression tests (headless)
npm run test:regression

# Run with visible browser (useful for debugging)
npm run test:regression:headed

# Generate HTML test report
npm run test:regression:report
```

### Advanced Options

```bash
# Run specific provider only
npx playwright test tests/model-regression.spec.ts --grep "Anthropic"

# Run with specific browser
npx playwright test tests/model-regression.spec.ts --project=chromium

# Run with parallelization (faster)
npx playwright test tests/model-regression.spec.ts --workers=4

# Run with video recording (debugging)
npx playwright test tests/model-regression.spec.ts --video=on

# Run with trace (detailed debugging)
npx playwright test tests/model-regression.spec.ts --trace=on
```

### Execution Time

| Test Type | Duration | Notes |
|-----------|----------|-------|
| **Single Model** | ~30-60s | 3 test scenarios |
| **Single Provider** | ~3-5 min | 3-6 models |
| **All Providers** | ~15-20 min | 18 models total |
| **With Retries** | ~25-30 min | Includes 2 retries per failure |

**Tips for Faster Testing**:
- Use `--workers=4` for parallel execution
- Test specific providers during development
- Run full suite in CI/CD only

---

## Understanding Test Reports

### JSON Report Format

After running tests, a JSON report is generated at:
```
test-reports/model-regression-results.json
```

**Structure**:
```json
{
  "summary": {
    "totalTests": 54,
    "passed": 52,
    "failed": 2,
    "skipped": 0,
    "duration": 1234567,
    "timestamp": "2026-02-13T10:30:00.000Z"
  },
  "modelResults": [
    {
      "provider": "anthropic",
      "model": "claude-3-5-sonnet-20241022",
      "name": "Claude Sonnet 4.5",
      "tests": [
        {
          "type": "basic",
          "status": "passed",
          "duration": 1234,
          "error": null
        },
        {
          "type": "tool",
          "status": "passed",
          "duration": 2345,
          "error": null
        },
        {
          "type": "mcp",
          "status": "failed",
          "duration": 5678,
          "error": "Tool execution timeout"
        }
      ],
      "overallStatus": "partial"
    }
  ]
}
```

### HTML Report Format

Generate a visual HTML report with:
```bash
npm run test:regression:report
```

The report is saved at:
```
test-reports/model-regression-report.html
```

**Report Sections**:

#### 1. Summary Dashboard
- **Total Tests**: Number of test scenarios executed
- **Pass Rate**: Percentage of passing tests
- **Total Duration**: Time taken for full suite
- **Provider Breakdown**: Pass/fail by provider

#### 2. Provider Tables
| Model | Basic Test | Tool Test | MCP Test | Overall |
|-------|------------|-----------|----------|---------|
| Claude Sonnet 4.5 | ✅ Pass (1.2s) | ✅ Pass (2.3s) | ❌ Fail | ⚠️ Partial |
| Claude Haiku 4.5 | ✅ Pass (0.8s) | ✅ Pass (1.5s) | ✅ Pass (2.1s) | ✅ Pass |

#### 3. Failure Details
For each failed test:
- **Model**: Which model failed
- **Test Type**: Basic, Tool, or MCP
- **Error Message**: Detailed error information
- **Stack Trace**: For debugging
- **Timestamp**: When failure occurred

#### 4. Performance Charts
- **Test Duration by Provider**: Bar chart comparing execution times
- **Success Rate Trend**: Line chart showing pass rates over time (if historical data exists)
- **Model Comparison**: Heatmap showing which models pass which tests

### Interpreting Results

**Status Indicators**:
- ✅ **Pass** - Model works correctly for this test type
- ❌ **Fail** - Model failed this test type
- ⚠️ **Partial** - Model passed some tests but failed others
- ⏭️ **Skipped** - Test was not run (missing API key, etc.)

**Common Pass Rates**:
- **100%** - All models fully working ✅ Excellent
- **95-99%** - Minor issues with specific models ⚠️ Good
- **85-94%** - Some models need attention ⚠️ Fair
- **<85%** - Significant issues ❌ Action Required

### Example Report Analysis

```
Summary:
- 54 total tests (18 models × 3 tests each)
- 50 passed (92.6%)
- 4 failed (7.4%)
- Duration: 18m 23s

Provider Breakdown:
- Anthropic: 9/9 passed (100%) ✅
- OpenAI: 11/12 passed (91.7%) ⚠️
- Google: 14/15 passed (93.3%) ⚠️
- Groq: 17/18 passed (94.4%) ✅

Failures:
1. OpenAI GPT-5.2 - Tool Test - "Rate limit exceeded"
2. Google Gemini 3 Pro Preview - Tool Test - "Model not available"
3. Groq Llama 4 Scout - Basic Test - "Connection timeout"

Recommendations:
- Retry OpenAI test with backoff (rate limit is temporary)
- Check Google API quota (model availability)
- Investigate Groq connection stability
```

---

## Adding New Models

### Step 1: Update Model Configuration

Edit `tests/model-regression.spec.ts`:

```typescript
const models = [
  // ... existing models

  // Add new model
  {
    provider: 'anthropic',                    // anthropic | openai | google | groq
    model: 'claude-new-model-20260213',       // API model ID
    name: 'Claude New Model',                 // Display name
    supportsTools: true,                      // Does it support tool calling?
    supportsMCP: true,                        // Does it support MCP protocol?
  }
];
```

### Step 2: Configure API Access

Ensure the provider's API key is set:

```bash
# For Anthropic
npx convex env set ANTHROPIC_API_KEY "sk-ant-..."

# For OpenAI
npx convex env set OPENAI_API_KEY "sk-..."

# For Google
npx convex env set GOOGLE_API_KEY "AIzaSy..."

# For Groq
npx convex env set GROQ_API_KEY "gsk_..."
```

### Step 3: Run Tests

```bash
# Test only the new model (grep by name)
npx playwright test tests/model-regression.spec.ts --grep "Claude New Model"

# Or run full regression suite
npm run test:regression
```

### Step 4: Verify Results

Check the test report for:
- ✅ All 3 test types pass
- ⏱️ Reasonable execution times
- 📝 No error messages

### Step 5: Update Documentation

Add the model to:
1. `docs/USER-GUIDE.md` - Model selection section
2. `CLAUDE.md` - Supported models list
3. This guide - Models Under Test section

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/regression-tests.yml`:

```yaml
name: Model Regression Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'

jobs:
  regression:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Setup Convex
        run: npx convex dev --once
        env:
          CONVEX_DEPLOYMENT: ${{ secrets.CONVEX_DEPLOYMENT }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          FIRECRAWL_API_KEY: ${{ secrets.FIRECRAWL_API_KEY }}

      - name: Run development server
        run: npm run dev &
        env:
          NEXT_PUBLIC_CONVEX_URL: ${{ secrets.NEXT_PUBLIC_CONVEX_URL }}

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run regression tests
        run: npm run test:regression
        continue-on-error: true

      - name: Generate HTML report
        run: npm run test:regression:report
        if: always()

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-test-results
          path: |
            test-reports/
            playwright-report/
          retention-days: 30

      - name: Comment PR with results
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('test-reports/model-regression-results.json'));
            const summary = `
            ## Model Regression Test Results
            - **Total Tests**: ${results.summary.totalTests}
            - **Passed**: ${results.summary.passed} (${(results.summary.passed/results.summary.totalTests*100).toFixed(1)}%)
            - **Failed**: ${results.summary.failed}
            - **Duration**: ${(results.summary.duration/1000/60).toFixed(1)} minutes
            `;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: summary
            });

      - name: Fail if tests failed
        run: |
          if [ $(jq '.summary.failed' test-reports/model-regression-results.json) -gt 0 ]; then
            echo "Some regression tests failed"
            exit 1
          fi
```

### Vercel Deployment

Add to `.vercel/project.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build && npm run test:regression",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm ci && npx playwright install chromium"
}
```

### Automated Notifications

Set up Slack/Discord notifications on test failures:

```yaml
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Model regression tests failed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Troubleshooting

### Common Issues

#### 1. "Rate limit exceeded"

**Cause**: Too many API requests to provider
**Solution**:
```bash
# Add delay between tests
npx playwright test --workers=1 --timeout=60000

# Or increase retry delay in test file
```

#### 2. "Model not available"

**Cause**: Model not accessible with current API key
**Solution**:
```bash
# Verify API key has access to model
curl -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
  https://api.anthropic.com/v1/models

# Check model ID is correct
# Update to correct model ID if needed
```

#### 3. "Tool execution timeout"

**Cause**: Tool (Firecrawl, Tavily) taking too long
**Solution**:
```typescript
// Increase timeout in test file
test.setTimeout(120000); // 2 minutes

// Or skip slow tools for faster testing
const quickTests = models.filter(m => m.supportsTools);
```

#### 4. "Connection refused"

**Cause**: Development server not running
**Solution**:
```bash
# Ensure server is running
npm run dev:all

# Check server is accessible
curl http://localhost:3000

# Try different port if 3000 is in use
PORT=3001 npm run dev
```

#### 5. Tests pass locally but fail in CI

**Cause**: Missing environment variables or dependencies
**Solution**:
```yaml
# Ensure all secrets are set in GitHub Actions:
# - ANTHROPIC_API_KEY
# - OPENAI_API_KEY
# - GROQ_API_KEY
# - GOOGLE_API_KEY
# - FIRECRAWL_API_KEY
# - CONVEX_DEPLOYMENT
# - NEXT_PUBLIC_CONVEX_URL

# Check CI logs for missing dependencies
# Add to workflow: npx playwright install --with-deps
```

### Debugging Failed Tests

#### Enable Trace Mode

```bash
npx playwright test --trace=on
npx playwright show-trace trace.zip
```

#### Enable Video Recording

```bash
npx playwright test --video=on
# Videos saved to test-results/
```

#### Enable Verbose Logging

```bash
DEBUG=pw:api npx playwright test tests/model-regression.spec.ts
```

#### Run Single Test

```bash
# Test specific model
npx playwright test --grep "Claude Sonnet 4.5"

# Test specific scenario
npx playwright test --grep "Basic prompt test"

# Combine filters
npx playwright test --grep "Claude.*Basic"
```

### Performance Optimization

#### Parallel Execution

```bash
# Run with 4 parallel workers
npx playwright test --workers=4

# Run with max workers
npx playwright test --workers=100%
```

#### Timeout Configuration

```typescript
// In test file
test.setTimeout(30000); // 30 seconds per test
test.slow(); // Mark slow tests (3x timeout)
```

#### Skip Slow Tests in Development

```typescript
// Skip MCP tests in dev
test.skip(process.env.NODE_ENV === 'development', 'Skipping MCP in dev');
```

---

## Best Practices

### 1. Test Regularly

- **Daily**: Run full regression suite
- **Per PR**: Run affected provider tests only
- **Post-Deployment**: Verify production models work
- **New Model**: Test before announcing to users

### 2. Monitor Trends

- Track pass rates over time
- Identify flaky tests (intermittent failures)
- Monitor execution time increases
- Alert on provider issues

### 3. Document Failures

When tests fail:
- Note the model and test type
- Capture error messages
- Check provider status pages
- Update known issues list

### 4. Version Models

```typescript
// Use dated model IDs for reproducibility
model: 'claude-3-5-sonnet-20241022' // ✅ Good
model: 'claude-sonnet-4.5'          // ❌ Bad (ambiguous)
```

### 5. Retry Transient Failures

```typescript
// In playwright.config.ts
retries: process.env.CI ? 2 : 0
```

---

## Support

**Questions or issues?**

- Check [docs/development/testing.md](../development/testing.md) for general testing info
- Review [docs/DEVELOPERS-GUIDE.md](../DEVELOPERS-GUIDE.md) for architecture details
- Open an issue on GitHub for test failures
- Contact the team via Slack #testing channel

---

**Last Updated**: 2026-02-13
**Maintainer**: Development Team
**Status**: Production Ready ✅
