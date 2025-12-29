# Tasks API

Detailed documentation for task-related endpoints.

## Overview

The Tasks API provides CRUD operations for managing tasks. All endpoints are under `/api/tasks`.

## Endpoints

### POST /api/tasks

Create a new task.

**Authentication:** None (for now)

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Task title |
| description | string | Yes | Detailed description |
| priority | string | No | Priority level: 'low', 'medium', 'high' |
| assignee | string | No | Email of assigned person |
| dueDate | string | No | ISO date string |

**Success Response:** `201 Created`

**Error Responses:**
- `400 Bad Request` - Missing required fields

### GET /api/tasks

List all tasks with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by: 'todo', 'in_progress', 'done' |
| priority | string | Filter by: 'low', 'medium', 'high' |
| assignee | string | Filter by assignee email |

**Success Response:** `200 OK`

Returns an array of tasks.

### GET /api/tasks/:id

Get a specific task by ID.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Task ID |

**Success Response:** `200 OK`

**Error Responses:**
- `404 Not Found` - Task doesn't exist

### PATCH /api/tasks/:id

Update an existing task.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Task ID |

**Request Body:** (all fields optional)

| Field | Type | Description |
|-------|------|-------------|
| title | string | Task title |
| description | string | Detailed description |
| status | string | Status: 'todo', 'in_progress', 'done' |
| priority | string | Priority: 'low', 'medium', 'high' |
| assignee | string | Email of assigned person |
| dueDate | string | ISO date string |

**Success Response:** `200 OK`

**Error Responses:**
- `404 Not Found` - Task doesn't exist

### DELETE /api/tasks/:id

Delete a task permanently.

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Task ID |

**Success Response:** `204 No Content`

**Error Responses:**
- `404 Not Found` - Task doesn't exist

## Implementation

All task operations are handled by functions in `src/task-service.ts`:

- `createTask(input)` - Creates a task
- `getTask(id)` - Retrieves a task
- `listTasks(filters)` - Lists tasks with optional filters
- `updateTask(id, updates)` - Updates a task
- `deleteTask(id)` - Deletes a task
