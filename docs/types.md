# Type Reference

Complete TypeScript type definitions used in TaskFlow.

## Task

The main task entity.

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}
```

## TaskStatus

Enum representing task states.

```typescript
enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
```

## TaskPriority

Enum representing priority levels.

```typescript
enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
```

## CreateTaskInput

Input type for creating new tasks.

```typescript
interface CreateTaskInput {
  title: string;
  description: string;
  priority?: TaskPriority;
  assignee?: string;
  dueDate?: Date;
}
```

## UpdateTaskInput

Input type for updating existing tasks. All fields are optional.

```typescript
interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  dueDate?: Date;
}
```

## TaskFilters

Query filters for listing tasks.

```typescript
interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
}
```

## Usage Example

```typescript
import { CreateTaskInput, TaskPriority } from './types.js';

const input: CreateTaskInput = {
  title: 'New task',
  description: 'Task description',
  priority: TaskPriority.HIGH,
};
```
