# Configuration

TaskFlow is configured through environment variables.

## Environment Variables

### PORT

Server port number.

- **Type:** `number`
- **Default:** `3000`
- **Example:** `PORT=8080`

### NODE_ENV

Application environment.

- **Type:** `string`
- **Default:** `development`
- **Options:** `development`, `production`, `test`
- **Example:** `NODE_ENV=production`

### MAX_TASKS_PER_USER

Maximum number of tasks allowed per user.

- **Type:** `number`
- **Default:** `100`
- **Example:** `MAX_TASKS_PER_USER=500`

## Configuration File

The configuration is loaded in `src/config.ts` using the `getConfig()` function:

```typescript
import { getConfig } from './config.js';

const config = getConfig();
console.log(config.port); // 3000
```

## Example .env File

```bash
PORT=3000
NODE_ENV=development
MAX_TASKS_PER_USER=100
```
