# Task Filtering Guide

Learn how to effectively filter tasks using the TaskFlow API.

## Basic Filtering

The `GET /tasks` endpoint supports filtering via query parameters.

## Filter by Status

Get only tasks in a specific status:

```bash
# Get all TODO tasks
curl "http://localhost:3000/api/tasks?status=todo"

# Get tasks in progress
curl "http://localhost:3000/api/tasks?status=in_progress"

# Get completed tasks
curl "http://localhost:3000/api/tasks?status=done"
```

Valid status values: `todo`, `in_progress`, `done`

## Filter by Priority

Get tasks by priority level:

```bash
# High priority tasks
curl "http://localhost:3000/api/tasks?priority=high"

# Medium priority tasks
curl "http://localhost:3000/api/tasks?priority=medium"

# Low priority tasks
curl "http://localhost:3000/api/tasks?priority=low"
```

Valid priority values: `low`, `medium`, `high`

## Filter by Assignee

Get tasks assigned to a specific person:

```bash
curl "http://localhost:3000/api/tasks?assignee=alice@example.com"
```

## Combining Filters

You can combine multiple filters:

```bash
# High priority TODO tasks
curl "http://localhost:3000/api/tasks?status=todo&priority=high"

# Alice's in-progress tasks
curl "http://localhost:3000/api/tasks?status=in_progress&assignee=alice@example.com"

# All filters combined
curl "http://localhost:3000/api/tasks?status=todo&priority=high&assignee=alice@example.com"
```

## TypeScript Example

```typescript
import type { TaskFilters } from './types.js';
import { listTasks } from './task-service.js';

const filters: TaskFilters = {
  status: 'todo',
  priority: 'high',
};

const tasks = listTasks(filters);
```

## Implementation Details

Filtering is implemented in the `listTasks()` function in `task-service.ts`. Each filter is applied sequentially to narrow down the results.
