# TaskFlow - JanusDoc Evaluation Repository

This repository contains a realistic TypeScript/Express API project specifically designed to evaluate [JanusDoc](https://github.com/yourusername/janusdoc)'s ability to suggest documentation updates based on code changes.

## Purpose

This test repository allows systematic evaluation of JanusDoc's documentation suggestion quality across different types of code changes. Each test scenario is a separate branch with specific code changes that should (or should not) trigger documentation update suggestions.

## Project Overview

**TaskFlow** is a simple task management API with:
- CRUD operations for tasks
- Task filtering and statistics
- Comprehensive documentation (14 markdown files)
- TypeScript with strict typing
- Express-based REST API

The `main` branch contains the baseline implementation where **all code and documentation are in perfect sync**.

## Repository Structure

```
janusdoc-evals/
├── src/                    # TypeScript source code
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API endpoints
│   ├── task-service.ts    # Business logic
│   ├── types.ts           # TypeScript interfaces
│   └── config.ts          # Configuration
├── docs/                   # Comprehensive documentation
│   ├── getting-started.md
│   ├── api-reference.md
│   ├── architecture.md
│   ├── configuration.md
│   ├── types.md
│   ├── examples.md
│   ├── deployment.md
│   ├── contributing.md
│   ├── troubleshooting.md
│   ├── changelog.md
│   ├── api/
│   │   ├── tasks.md
│   │   └── stats.md
│   └── guides/
│       ├── filtering.md
│       └── task-lifecycle.md
├── EXPECTED_RESULTS.md    # Expected JanusDoc suggestions for each scenario
└── README.md              # This file
```

## Test Scenarios

Eight test scenarios cover different types of changes:

### 1. New Endpoint (`test/new-endpoint`)
**Change:** Add `POST /tasks/:id/duplicate` endpoint
**Expected:** Should suggest updating API docs with new endpoint

### 2. Rename Parameter (`test/rename-parameter`)
**Change:** Rename `listTasks()` parameter from `filters` to `query`
**Expected:** Should detect parameter name in code examples needs updating

### 3. Breaking Change (`test/breaking-change`)
**Change:** Add `tags` field to Task interface
**Expected:** Should suggest updating type docs and API reference

### 4. New Feature (`test/new-feature`)
**Change:** Add task commenting feature
**Expected:** Should suggest comprehensive docs including new guide

### 5. Deprecation (`test/deprecation`)
**Change:** Deprecate `/stats` in favor of `/tasks/stats`
**Expected:** Should suggest adding deprecation notices and migration guide

### 6. Internal Refactor (`test/internal-refactor`)
**Change:** Refactor internal implementation
**Expected:** Should suggest **NO** documentation updates (negative test case)

### 7. Configuration Change (`test/config-change`)
**Change:** Add new environment variables
**Expected:** Should suggest updating configuration documentation

### 8. Behavior Change (`test/behavior-change`)
**Change:** Change task sorting behavior
**Expected:** Should detect behavior change and suggest updating API docs

## Using This Repository

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd janusdoc-evals

# Install dependencies
npm install
```

### Running JanusDoc on Test Scenarios

For each test scenario:

```bash
# Checkout the test branch
git checkout test/new-endpoint

# Run JanusDoc
janusdoc run --repo <owner/repo> --pr <pr-number>

# Or run locally against main
janusdoc run --base main --head test/new-endpoint
```

### Evaluating Results

1. Run JanusDoc on each test branch
2. Compare the suggestions against `EXPECTED_RESULTS.md`
3. Score using the evaluation criteria below

## Evaluation Criteria

For each test scenario, evaluate JanusDoc on:

### 1. **Precision**
```
Precision = Correct Suggestions / Total Suggestions
```
Are the suggested documentation updates actually needed?

### 2. **Recall**
```
Recall = Correct Suggestions / Expected Suggestions
```
Did JanusDoc catch all the documentation that needs updating?

### 3. **Accuracy**
Are the suggestions specific and actionable? Do they identify:
- Specific files that need updates
- Specific sections within files
- The nature of the required update

### 4. **False Positives**
Does JanusDoc suggest updating documentation that doesn't need changes?

### 5. **False Negatives**
Does JanusDoc miss documentation that clearly needs updating?

## Expected Results

See [`EXPECTED_RESULTS.md`](./EXPECTED_RESULTS.md) for detailed expected suggestions for each test scenario.

## Test Scenarios Summary Table

| Scenario | Branch | Change Type | Expected Docs | Difficulty |
|----------|--------|-------------|---------------|------------|
| 1 | `test/new-endpoint` | New API endpoint | 3 files | Easy |
| 2 | `test/rename-parameter` | Parameter rename | 2 files | Medium |
| 3 | `test/breaking-change` | Schema change | 4 files | Easy |
| 4 | `test/new-feature` | Major feature | 5+ files | Hard |
| 5 | `test/deprecation` | Deprecation | 4 files | Medium |
| 6 | `test/internal-refactor` | Internal only | 0 files | Hard (negative case) |
| 7 | `test/config-change` | New config | 2 files | Easy |
| 8 | `test/behavior-change` | Behavior change | 4 files | Hard |

## Interpreting Results

### Excellent Performance (90%+ accuracy)
- Catches all or nearly all required documentation updates
- Minimal false positives
- Provides specific file and section references
- Correctly identifies that scenario 6 needs no updates

### Good Performance (70-89% accuracy)
- Catches most required documentation updates
- Some false positives or false negatives
- Generally specific suggestions
- May incorrectly flag scenario 6

### Needs Improvement (<70% accuracy)
- Misses significant documentation updates
- Many false positives
- Vague or generic suggestions
- Struggles with edge cases

## Integration with Evalite

This repository is designed to work with [Evalite](https://www.evalite.dev/) for automated evaluation:

```typescript
// Example Evalite test (to be implemented)
import { evalite } from 'evalite';

evalite('JanusDoc Evaluation', {
  data: async () => {
    return testScenarios; // Load all test scenarios
  },
  task: async (scenario) => {
    // Run JanusDoc on scenario
    return await runJanusDoc(scenario.branch);
  },
  scorers: [
    precision,
    recall,
    accuracy,
  ],
});
```

## Contributing

To add new test scenarios:

1. Create a branch from `main`
2. Make specific code changes
3. Document expected results in `EXPECTED_RESULTS.md`
4. Update this README's scenarios table
5. Open a PR

## License

MIT
