# Contributing to Open Agent Builder

Thank you for your interest in contributing to Open Agent Builder! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-agent-builder.git
   cd open-agent-builder
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/balajir2/open-agent-builder.git
   ```

## Development Setup

See the [Installation Guide](./docs/getting-started/installation.md) for complete setup instructions.

**Quick Start:**

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development servers
npm run dev:all
```

## Project Structure

```
open-agent-builder/
├── app/                    # Next.js App Router pages and API routes
├── components/             # React components
│   ├── app/               # Application-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Core libraries and utilities
│   ├── workflow/          # Workflow execution engine
│   ├── api/               # API utilities
│   └── mcp/               # MCP protocol integration
├── convex/                # Convex backend (database, auth)
├── docs/                  # Documentation
└── scripts/               # Utility scripts
```

For detailed architecture, see [Architecture Documentation](./docs/architecture/README.md).

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [coding standards](#coding-standards)

3. **Test your changes**:
   ```bash
   npm run test
   npm run lint
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Syncing with Upstream

Keep your fork up to date:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Pull Request Process

1. **Ensure your PR**:
   - Has a clear title and description
   - References any related issues
   - Includes tests for new functionality
   - Updates documentation if needed
   - Passes all CI checks

2. **PR Review**:
   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, your PR will be merged

3. **After Merge**:
   - Delete your feature branch
   - Sync your fork with upstream

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any` when possible)
- Export interfaces for reusable types
- Use strict mode

### React

- Use functional components with hooks
- Use `'use client'` directive for client components
- Server components by default in App Router
- Follow React 19 best practices

### Code Style

- Use Prettier for formatting (runs automatically)
- Use ESLint for linting: `npm run lint`
- Keep functions small and focused
- Write descriptive variable and function names
- Add comments for complex logic

### File Organization

- Group related files together
- Use index files for clean imports
- Keep components in `components/`
- Keep utilities in `lib/`
- Server-only code should use `import 'server-only'`

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run specific test suite
npm run test:simple
npm run test:comprehensive
```

### Writing Tests

- Use Playwright for E2E tests
- Test workflow execution via API routes
- Verify SSE streaming events
- Check database state after operations
- Test authentication flows

Example test structure:

```typescript
test('should execute workflow successfully', async ({ page }) => {
  // Setup
  await page.goto('/');
  
  // Action
  await page.click('[data-testid="run-workflow"]');
  
  // Assert
  await expect(page.locator('[data-testid="execution-status"]'))
    .toHaveText('Completed');
});
```

## Adding New Features

### Adding a New Node Type

See [Adding New Tools Guide](./docs/development/adding-tools.md) for detailed instructions.

**Quick overview:**

1. Define type in `lib/workflow/types.ts`
2. Create executor in `lib/workflow/executors/your-node.ts`
3. Integrate in `lib/workflow/langgraph.ts`
4. Create UI panel in `components/app/(home)/sections/workflow-builder/`
5. Update WorkflowBuilder to show panel

### Adding a New Tool

1. Define tool in `lib/tools/registry.ts`
2. Implement in `lib/workflow/executors/tool-factory.ts`
3. Use `wrapToolFunction()` for automatic error handling
4. Test in a workflow

## Documentation

When adding features:

- Update relevant documentation in `/docs`
- Add JSDoc comments to functions
- Update README.md if needed
- Add examples to User Manual

## Getting Help

- **Questions**: [GitHub Discussions](https://github.com/balajir2/open-agent-builder/discussions)
- **Bugs**: [GitHub Issues](https://github.com/balajir2/open-agent-builder/issues)
- **Documentation**: [docs/README.md](./docs/README.md)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Open Agent Builder!** 🎉
