# Statistics API

Documentation for the task statistics endpoint.

## Overview

The Statistics API provides insights into task distribution across different states.

## Endpoint

### GET /api/stats

Get task count statistics grouped by status.

**Authentication:** None (for now)

**Query Parameters:** None

**Success Response:** `200 OK`

```json
{
  "todo": 5,
  "in_progress": 3,
  "done": 12
}
```

Returns an object with three keys:
- `todo` - Number of tasks in TODO state
- `in_progress` - Number of tasks in IN_PROGRESS state
- `done` - Number of tasks in DONE state

## Use Cases

The statistics endpoint is useful for:

1. **Dashboard displays** - Show task distribution
2. **Progress tracking** - Monitor team velocity
3. **Reporting** - Generate completion metrics
4. **Workload analysis** - Identify bottlenecks

## Example Usage

```bash
curl http://localhost:3000/api/stats
```

## TypeScript Implementation

The statistics are calculated by the `getTaskStats()` function in `src/task-service.ts`:

```typescript
export function getTaskStats(): Record<TaskStatus, number> {
  const stats: Record<TaskStatus, number> = {
    [TaskStatus.TODO]: 0,
    [TaskStatus.IN_PROGRESS]: 0,
    [TaskStatus.DONE]: 0,
  };

  for (const task of tasks.values()) {
    stats[task.status]++;
  }

  return stats;
}
```

## Performance

Statistics are calculated in real-time by iterating through all tasks. For large datasets, consider caching this data.
