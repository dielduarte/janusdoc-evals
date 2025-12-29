# Task Lifecycle Guide

Understanding how tasks move through different states in TaskFlow.

## Task States

Tasks progress through three states:

1. **TODO** - Initial state when task is created
2. **IN_PROGRESS** - Task is being worked on
3. **DONE** - Task is completed

## State Transitions

### Creating a Task

When you create a task, it starts in the `TODO` state:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New task",
    "description": "Description"
  }'
```

The task's `status` will be `"todo"`.

### Moving to In Progress

Update the task status to start work:

```bash
curl -X PATCH http://localhost:3000/api/tasks/task_123 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

### Completing a Task

Mark the task as done:

```bash
curl -X PATCH http://localhost:3000/api/tasks/task_123 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done"
  }'
```

## Timestamps

Tasks automatically track timing:

- **createdAt** - When the task was created (never changes)
- **updatedAt** - Last modification time (updates on every change)

## Best Practices

1. Always set a task to `in_progress` before starting work
2. Use the `assignee` field to track who owns the task
3. Set `dueDate` for time-sensitive tasks
4. Use `priority` to help with task ordering

## Status in Code

The `TaskStatus` enum (defined in `types.ts`) ensures type safety:

```typescript
import { TaskStatus } from './types.js';

const status = TaskStatus.IN_PROGRESS; // 'in_progress'
```
