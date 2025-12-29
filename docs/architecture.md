# Architecture

TaskFlow follows a simple three-layer architecture.

## Layers

### 1. API Layer (`routes.ts`)

The API layer handles HTTP requests and responses. It:
- Validates request data
- Calls the service layer
- Formats responses
- Handles errors

### 2. Service Layer (`task-service.ts`)

The service layer contains business logic. It:
- Manages task lifecycle
- Enforces business rules
- Handles data persistence
- Provides query functionality

### 3. Data Layer

Currently uses in-memory storage via a `Map`. Tasks are stored with their ID as the key.

## Data Flow

```
Client Request
    ↓
Express Router (routes.ts)
    ↓
Task Service (task-service.ts)
    ↓
In-Memory Store (Map)
    ↓
Response
```

## Type System

All types are defined in `types.ts`:

- **Task** - Core task entity
- **CreateTaskInput** - Input for creating tasks
- **UpdateTaskInput** - Input for updating tasks
- **TaskFilters** - Query filters
- **TaskStatus** - Enum for task states
- **TaskPriority** - Enum for priority levels

## Configuration

Application configuration is managed through `config.ts`, which reads from environment variables.

See [Configuration](./configuration.md) for details.
