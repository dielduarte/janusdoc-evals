# Troubleshooting

Common issues and solutions.

## Server Won't Start

### Port Already in Use

Error: `EADDRINUSE`

**Solution:** Change the port or kill the process using it:

```bash
PORT=3001 npm run dev
```

### Missing Dependencies

Error: `Cannot find module`

**Solution:** Install dependencies:

```bash
npm install
```

## API Errors

### 400 Bad Request

**Cause:** Missing required fields in request body.

**Solution:** Ensure `title` and `description` are provided when creating tasks.

### 404 Not Found

**Cause:** Task ID doesn't exist.

**Solution:** Verify the task ID is correct using `GET /tasks`.

## Build Issues

### TypeScript Errors

**Solution:** Check `tsconfig.json` and ensure all types are correct.

```bash
npm run build
```

## Performance Issues

If the API is slow:

1. Check task count: `GET /stats`
2. The in-memory storage has a limit (see `MAX_TASKS_PER_USER` in [Configuration](./configuration.md))
3. Consider implementing pagination for large task lists

## Getting Help

If you can't find a solution:

1. Check the [API Reference](./api-reference.md)
2. Review the [Architecture](./architecture.md)
3. Open an issue on GitHub
