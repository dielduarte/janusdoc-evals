# Expected Results for JanusDoc Evaluation

This document describes what documentation updates JanusDoc **should** suggest for each test scenario.

## Test Scenario 1: New Endpoint (`test/new-endpoint`)

**Branch:** `test/new-endpoint`
**Change:** Added `POST /tasks/:id/duplicate` endpoint to duplicate existing tasks

**Expected Suggestions:**

1. **docs/api-reference.md** - Add documentation for the new duplicate endpoint
   - Should include endpoint path, method, parameters, request/response format
   - Should explain the duplication behavior (title gets "(copy)" appended)

2. **docs/api/tasks.md** - Add the duplicate endpoint to the detailed tasks API documentation
   - Include in the endpoints table
   - Add usage example

3. **docs/examples.md** - Add example showing how to duplicate a task

**Reasoning:** This is a new public API endpoint that needs to be documented for users.

---

## Test Scenario 2: Rename Parameter (`test/rename-parameter`)

**Branch:** `test/rename-parameter`
**Change:** Renamed `listTasks()` parameter from `filters` to `query`

**Expected Suggestions:**

1. **docs/guides/filtering.md** - Update TypeScript example that references the `filters` parameter
   - Line 35-40 shows code using `filters` variable name
   - Should be updated to use `query` to match the new API

2. **docs/api/tasks.md** - May need to update if it references the parameter name in examples

**Reasoning:** The documentation explicitly shows code examples using the old parameter name, which will confuse developers.

---

## Test Scenario 3: Breaking Change (`test/breaking-change`)

**Branch:** `test/breaking-change`
**Change:** Added `tags?: string[]` field to `Task` and `UpdateTaskInput` interfaces

**Expected Suggestions:**

1. **docs/types.md** - Update type definitions to include the new `tags` field
   - Update `Task` interface definition
   - Update `UpdateTaskInput` interface definition

2. **docs/api-reference.md** - Update task response examples to show the new field
   - Add `tags` to the response body examples

3. **docs/api/tasks.md** - Update request body table to include the `tags` field
   - Add row for `tags` field with type and description

4. **docs/changelog.md** - Document this as a new feature/change

**Reasoning:** This is a schema change that affects the API contract. All type documentation must be updated.

---

## Test Scenario 4: New Feature (`test/new-feature`)

**Branch:** `test/new-feature`
**Change:** Added task commenting feature with new endpoints and Comment type

**Expected Suggestions:**

1. **docs/api-reference.md** - Add documentation for comment endpoints
   - `POST /tasks/:id/comments` - Add comment
   - `GET /tasks/:id/comments` - Get comments

2. **docs/api/tasks.md** - Include comment endpoints in tasks API documentation

3. **docs/types.md** - Add `Comment` interface documentation

4. **docs/guides/** (NEW FILE) - Create a new guide explaining how to use comments
   - How to add comments to tasks
   - How to retrieve comments
   - Use cases for comments

5. **docs/examples.md** - Add examples for adding and retrieving comments

6. **docs/getting-started.md** - Potentially mention commenting feature in the overview

**Reasoning:** This is a significant new feature that needs comprehensive documentation including a dedicated guide.

---

## Test Scenario 5: Deprecation (`test/deprecation`)

**Branch:** `test/deprecation`
**Change:** Deprecated `GET /stats` in favor of `GET /tasks/stats`

**Expected Suggestions:**

1. **docs/api-reference.md** - Add deprecation notice for `GET /stats`
   - Mark old endpoint as deprecated
   - Add the new `GET /tasks/stats` endpoint
   - Explain migration path

2. **docs/api/stats.md** - Update endpoint URL and add deprecation notice
   - Change from `/api/stats` to `/api/tasks/stats`
   - Note that `/api/stats` is deprecated

3. **docs/examples.md** - Update examples to use new endpoint

4. **docs/changelog.md** - Document the deprecation

**Reasoning:** Users need to know about the deprecation and how to migrate to the new endpoint.

---

## Test Scenario 6: Internal Refactor (`test/internal-refactor`)

**Branch:** `test/internal-refactor`
**Change:** Refactored internal implementation (extracted filter logic, reformatted ID generation)

**Expected Suggestions:**

**NONE** - This is an internal refactoring that doesn't change the public API or behavior.

**Reasoning:** The public API signature and behavior remain unchanged. Internal implementation details are not documented in user-facing docs.

---

## Test Scenario 7: Configuration Change (`test/config-change`)

**Branch:** `test/config-change`
**Change:** Added `ENABLE_LOGGING` and `REQUEST_TIMEOUT` environment variables

**Expected Suggestions:**

1. **docs/configuration.md** - Add documentation for new environment variables
   - Add `ENABLE_LOGGING` section with type, default, example
   - Add `REQUEST_TIMEOUT` section with type, default, example

2. **docs/deployment.md** - Update deployment guide to mention new configuration options
   - Add to environment setup section

**Reasoning:** New configuration options need to be documented so users know how to use them.

---

## Test Scenario 8: Behavior Change (`test/behavior-change`)

**Branch:** `test/behavior-change`
**Change:** Changed `listTasks()` to return tasks sorted by creation date (newest first)

**Expected Suggestions:**

1. **docs/api-reference.md** - Update `GET /tasks` endpoint documentation
   - Add note that results are sorted by creation date (newest first)

2. **docs/api/tasks.md** - Update the endpoint description
   - Mention the sorting behavior

3. **docs/guides/filtering.md** - Add note about result ordering
   - Explain that filtered results are also sorted

4. **docs/changelog.md** - Document this behavior change

**Reasoning:** This changes the behavior of an existing endpoint. Users relying on insertion order need to know about this change.

---

## Evaluation Criteria

For each scenario, JanusDoc should be evaluated on:

1. **Precision** - Does it correctly identify which docs need updates?
2. **Recall** - Does it catch all the docs that need updates?
3. **Accuracy** - Are the suggested changes appropriate and specific?
4. **False Positives** - Does it suggest updates for docs that don't need changes?
5. **Specificity** - Does it identify specific files and sections, not just general suggestions?

## Edge Cases to Note

- **Scenario 6** is specifically designed to produce NO suggestions (internal changes)
- **Scenario 4** should ideally suggest creating a NEW guide document
- **Scenario 2** tests whether JanusDoc can detect parameter name changes in code examples
- **Scenario 8** tests detection of behavioral changes even when the signature doesn't change
