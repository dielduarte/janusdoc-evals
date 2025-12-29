# Examples

Common usage examples for TaskFlow API.

## Creating Tasks

### Basic Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Write documentation",
    "description": "Complete API documentation"
  }'
```

### Task with Priority

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Fix critical bug",
    "description": "Memory leak in production",
    "priority": "high",
    "assignee": "alice@example.com"
  }'
```

## Querying Tasks

### Get All Tasks

```bash
curl http://localhost:3000/api/tasks
```

### Filter by Status

```bash
curl "http://localhost:3000/api/tasks?status=in_progress"
```

### Filter by Multiple Criteria

```bash
curl "http://localhost:3000/api/tasks?status=todo&priority=high"
```

### Filter by Assignee

```bash
curl "http://localhost:3000/api/tasks?assignee=alice@example.com"
```

## Updating Tasks

### Change Status

```bash
curl -X PATCH http://localhost:3000/api/tasks/task_123 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }'
```

### Update Multiple Fields

```bash
curl -X PATCH http://localhost:3000/api/tasks/task_123 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done",
    "assignee": "bob@example.com"
  }'
```

## Getting Statistics

```bash
curl http://localhost:3000/api/stats
```

Response:

```json
{
  "todo": 5,
  "in_progress": 3,
  "done": 12
}
```
