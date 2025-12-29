# API Reference

Complete reference for all TaskFlow API endpoints.

## Base URL

All endpoints are prefixed with `/api`:

```
http://localhost:3000/api
```

## Endpoints

### Create Task

**POST** `/tasks`

Creates a new task in the system.

**Request Body:**

```typescript
{
  title: string;          // Required
  description: string;    // Required
  priority?: 'low' | 'medium' | 'high';  // Optional, defaults to 'medium'
  assignee?: string;      // Optional
  dueDate?: string;       // Optional, ISO date string
}
```

**Response:** `201 Created`

```json
{
  "id": "task_1234567890_abc123",
  "title": "My task",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "assignee": "john@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

### List Tasks

**GET** `/tasks`

Retrieves all tasks, with optional filtering.

**Query Parameters:**

- `status` - Filter by status (`todo`, `in_progress`, `done`)
- `priority` - Filter by priority (`low`, `medium`, `high`)
- `assignee` - Filter by assignee email

**Example:**

```
GET /tasks?status=todo&priority=high
```

**Response:** `200 OK`

```json
[
  {
    "id": "task_1234567890_abc123",
    "title": "My task",
    ...
  }
]
```

### Get Task

**GET** `/tasks/:id`

Retrieves a specific task by ID.

**Response:** `200 OK` or `404 Not Found`

### Update Task

**PATCH** `/tasks/:id`

Updates an existing task. All fields are optional.

**Request Body:**

```typescript
{
  title?: string;
  description?: string;
  status?: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}
```

**Response:** `200 OK` or `404 Not Found`

### Delete Task

**DELETE** `/tasks/:id`

Deletes a task permanently.

**Response:** `204 No Content` or `404 Not Found`

### Get Statistics

**GET** `/stats`

Returns task counts grouped by status.

**Response:** `200 OK`

```json
{
  "todo": 5,
  "in_progress": 3,
  "done": 12
}
```

## Error Responses

All endpoints may return error responses:

**400 Bad Request** - Invalid input

```json
{
  "error": "Title and description are required"
}
```

**404 Not Found** - Resource not found

```json
{
  "error": "Task not found"
}
```
