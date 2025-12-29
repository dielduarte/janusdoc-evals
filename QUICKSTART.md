# Quick Start: Running JanusDoc Evaluations

## Setup (One Time)

1. **Set Environment Variables**

```bash
export GITHUB_TOKEN=ghp_your_token_here
export OPENAI_API_KEY=sk-your_key_here
```

Or create `.envrc` file (recommended):
```bash
echo 'export GITHUB_TOKEN=ghp_your_token' > .envrc
echo 'export OPENAI_API_KEY=sk_your_key' >> .envrc
direnv allow  # if using direnv
```

2. **Install Dependencies**

```bash
npm install
```

## Run Evaluations

```bash
npm run eval
```

This will:
- ✅ Run JanusDoc on all 8 test PRs using `--dry-run`
- ✅ Score results against expected suggestions
- ✅ Generate metrics (Precision, Recall, F1)
- ✅ Save results to `eval-results/`

## Expected Output

```
🧪 Testing: New Endpoint (PR #1)
   Add POST /tasks/:id/duplicate endpoint
   📊 3 suggestions
   Precision: 100.0% | Recall: 100.0% | F1: 100.0%

🧪 Testing: Rename Parameter (PR #2)
   Rename listTasks() parameter from 'filters' to 'query'
   📊 2 suggestions
   Precision: 100.0% | Recall: 100.0% | F1: 100.0%

...

📊 Final Scores:
   Average Precision: 92.5%
   Average Recall: 87.5%
   Average F1: 89.8%
```

## Testing a Single Scenario

```bash
# Test just the "new endpoint" scenario
evalite evals/janusdoc.eval.ts --filter "New Endpoint"

# Test just PR #1
evalite evals/janusdoc.eval.ts --filter "new-endpoint"
```

## View Results

Results are saved in `eval-results/`:
- `latest.json` - Most recent results
- `YYYY-MM-DD-HHMMSS.json` - Timestamped results

## What Gets Evaluated

| Scenario | What It Tests | Expected Behavior |
|----------|---------------|-------------------|
| PR #1 | New undocumented endpoint | Should suggest 3 doc updates |
| PR #2 | Parameter rename in code | Should catch code example updates |
| PR #3 | Schema change | Should update type docs |
| PR #4 | Major new feature | Should suggest comprehensive docs |
| PR #5 | Deprecation | Should add deprecation notices |
| PR #6 | Internal refactor | Should suggest ZERO updates (negative case) |
| PR #7 | Config change | Should update config docs |
| PR #8 | Behavior change | Should detect behavior changes |

## Troubleshooting

**"janusdoc: command not found"**
```bash
npm install -g janusdoc
# or use local link
cd ../janusdoc && npm link
cd ../janusdoc-evals && npm link janusdoc
```

**"GitHub API error"**
- Ensure `GITHUB_TOKEN` is set
- Token needs `repo` scope

**"OpenAI API error"**
- Ensure `OPENAI_API_KEY` is set
- Check you have API credits

## Next Steps

1. ✅ Run initial evaluation
2. 📊 Review scores in `eval-results/latest.json`
3. 🔧 Improve JanusDoc based on failures
4. 🔁 Re-run to measure improvement
5. 🚀 Set up CI for continuous evaluation

See `EVALITE_GUIDE.md` for detailed documentation.
