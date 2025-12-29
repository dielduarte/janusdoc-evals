# Evalite Integration Guide

This guide explains how to run automated evaluations of JanusDoc using Evalite.

## Prerequisites

1. **Environment Variables**

Create a `.envrc` or `.env` file with:

```bash
export GITHUB_TOKEN=ghp_your_github_token
export OPENAI_API_KEY=sk-your_openai_key
```

2. **JanusDoc Installation**

Ensure JanusDoc is installed and in your PATH:

```bash
npm install -g janusdoc
# or use the local version
npm link ../janusdoc
```

## Running Evaluations

### Run All Test Scenarios

```bash
npm run eval
```

This will:
1. Run JanusDoc on all 8 test scenarios (PR #1-8)
2. Capture the JSON output using `--dry-run`
3. Score each result using precision, recall, and F1 metrics
4. Generate a report in `eval-results/`

### Watch Mode

Run evaluations automatically when code changes:

```bash
npm run eval:watch
```

### Run Specific Scenarios

```bash
evalite evals/janusdoc.eval.ts --filter "New Endpoint"
```

## Understanding the Metrics

### Precision
```
Precision = Correct Suggestions / Total Suggestions
```

Measures **false positives**. High precision means few unnecessary suggestions.

**Example:**
- JanusDoc suggests: `[api-reference.md, types.md, random.md]`
- Expected: `[api-reference.md, types.md]`
- Precision: 2/3 = 66.7% (1 false positive)

### Recall
```
Recall = Correct Suggestions / Expected Suggestions
```

Measures **false negatives**. High recall means few missed suggestions.

**Example:**
- JanusDoc suggests: `[api-reference.md]`
- Expected: `[api-reference.md, types.md, examples.md]`
- Recall: 1/3 = 33.3% (2 missed files)

### F1 Score
```
F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

Harmonic mean of precision and recall. Overall accuracy metric.

**Target Scores:**
- 🟢 **Excellent**: F1 ≥ 90%
- 🟡 **Good**: F1 ≥ 70%
- 🔴 **Needs Improvement**: F1 < 70%

## Test Scenarios

| ID | PR | Scenario | Expected Files | Difficulty |
|----|----|----|----|----|
| new-endpoint | #1 | New API endpoint | 3 | Easy |
| rename-parameter | #2 | Parameter rename | 2 | Medium |
| breaking-change | #3 | Schema change | 4 | Easy |
| new-feature | #4 | Major feature | 4+ | Hard |
| deprecation | #5 | Deprecation | 4 | Medium |
| internal-refactor | #6 | Internal only (negative) | 0 | Hard |
| config-change | #7 | New config | 2 | Easy |
| behavior-change | #8 | Behavior change | 4 | Hard |

## Output Structure

Evalite generates results in `eval-results/`:

```
eval-results/
├── latest.json           # Latest evaluation results
├── 2024-01-01-120000.json  # Timestamped results
└── summary.txt          # Human-readable summary
```

## Example Output

```
🧪 Testing: New Endpoint (PR #1)
   Add POST /tasks/:id/duplicate endpoint
   📊 3 suggestions
   Precision: 100.0% | Recall: 100.0% | F1: 100.0%

🧪 Testing: Rename Parameter (PR #2)
   Rename listTasks() parameter from 'filters' to 'query'
   📊 1 suggestions
   Precision: 100.0% | Recall: 50.0% | F1: 66.7%

...

📊 Overall Results:
   Precision: 91.2%
   Recall: 85.7%
   F1 Score: 88.3%
```

## Customizing Evaluations

### Add New Scorers

Edit `evals/scorers.ts`:

```typescript
export function specificity(output: JanusDocOutput, scenario: TestScenario): number {
  // Check if suggestions include specific sections, not just files
  const hasSpecificSections = output.suggestions.every(
    s => s.updatedContent.length > 100
  );
  return hasSpecificSections ? 1.0 : 0.0;
}
```

### Modify Test Scenarios

Edit `evals/test-scenarios.ts` to add/modify test cases.

## Troubleshooting

### Error: "JanusDoc command not found"

Ensure JanusDoc is installed:
```bash
npm install -g janusdoc
# or
npm link ../janusdoc
```

### Error: "GitHub API rate limit"

Set `GITHUB_TOKEN` environment variable.

### Error: "OpenAI API error"

Set `OPENAI_API_KEY` environment variable.

### Slow Evaluation

Each test scenario makes an OpenAI API call. Running all 8 scenarios takes ~2-5 minutes depending on API response times.

## Continuous Integration

Add to GitHub Actions:

```yaml
name: JanusDoc Evaluation
on: [push, pull_request]

jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run eval
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      - uses: actions/upload-artifact@v4
        with:
          name: eval-results
          path: eval-results/
```

## Next Steps

1. Run initial evaluation: `npm run eval`
2. Review results in `eval-results/latest.json`
3. Improve JanusDoc based on metrics
4. Re-run evaluations to track progress
5. Set up CI to run on every commit
