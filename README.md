# JanusDoc Evaluation Suite

Automated evaluation system for [JanusDoc](https://github.com/dielduarte/janusdoc) using [Evalite](https://www.evalite.dev/).

## Overview

This repository contains 8 realistic test scenarios to measure JanusDoc's ability to suggest documentation updates based on code changes. Each scenario is a separate PR with specific code changes that should (or should not) trigger documentation suggestions.

**Test Project:** TaskFlow - A simple TypeScript/Express task management API with 14 documentation files.

## Running Evaluations

```bash
# Install dependencies
npm install

# Run all evaluations
npm run eval

# Run in watch mode
npm run eval:watch
```

## Test Scenarios

| # | Scenario | Change Type | Expected Files | Difficulty |
|---|----------|-------------|----------------|------------|
| 1 | New Endpoint | Add POST endpoint | 3 files | Easy |
| 2 | Rename Parameter | Parameter rename | 2 files | Medium |
| 3 | Breaking Change | Schema change | 4 files | Easy |
| 4 | New Feature | Major feature | 4+ files | Hard |
| 5 | Deprecation | Deprecate endpoint | 4 files | Medium |
| 6 | Internal Refactor | No API changes | 0 files (negative) | Hard |
| 7 | Config Change | New env vars | 2 files | Easy |
| 8 | Behavior Change | Sorting behavior | 4 files | Hard |

See [EXPECTED_RESULTS.md](./EXPECTED_RESULTS.md) for detailed expected suggestions per scenario.

## Evaluation Metrics

- **Precision:** Correct suggestions / Total suggestions (avoids false positives)
- **Recall:** Correct suggestions / Expected suggestions (catches all needed updates)
- **F1 Score:** Harmonic mean of Precision and Recall

## Repository Structure

```
janusdoc-evals/
├── src/                    # TaskFlow API source code
├── docs/                   # TaskFlow documentation (test fixtures)
├── evals/                  # Evalite test configuration
│   ├── janusdoc.eval.ts   # Main eval file
│   ├── test-scenarios.ts  # Scenario definitions
│   ├── scorers.ts         # Precision/Recall/F1 scorers
│   └── utils.ts           # Helper functions
├── EXPECTED_RESULTS.md    # Expected suggestions per scenario
└── README.md              # This file
```

## Environment Setup

Create a `.envrc` file (or export manually):

```bash
export GITHUB_TOKEN="your_github_token"
export OPENAI_API_KEY="your_openai_key"
```

## Results

Current JanusDoc performance:
- **5/8 scenarios** completing successfully
- **Precision:** 100% (no false positives)
- **Recall:** 25-50% (room for improvement)
- **Best F1 Score:** 66.7% on behavior changes

See evaluation output for detailed per-scenario results.

## License

MIT
