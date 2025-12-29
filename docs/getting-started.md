# Getting Started with TaskFlow

TaskFlow is a simple task management API built with TypeScript and Express.

## Installation

```bash
npm install
```

## Running the Server

Development mode with hot reload:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

The server will start on port 3000 by default.

## Your First Task

Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first task",
    "description": "Learn how to use TaskFlow",
    "priority": "high"
  }'
```

List all tasks:

```bash
curl http://localhost:3000/api/tasks
```

## Next Steps

- Read the [API Reference](./api-reference.md) for detailed endpoint documentation
- Learn about [Configuration](./configuration.md) options
- Explore [Architecture](./architecture.md) to understand how TaskFlow works
