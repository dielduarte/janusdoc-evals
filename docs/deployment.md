# Deployment

Guide for deploying TaskFlow to production.

## Build

Create a production build:

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

## Environment Setup

Set production environment variables:

```bash
export NODE_ENV=production
export PORT=8080
export MAX_TASKS_PER_USER=1000
```

## Running in Production

```bash
npm start
```

Or directly with Node:

```bash
node dist/index.js
```

## Process Management

Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start dist/index.js --name taskflow
pm2 save
```

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Build and run:

```bash
docker build -t taskflow .
docker run -p 3000:3000 taskflow
```

## Health Checks

The `/health` endpoint can be used for health checks:

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "status": "ok"
}
```
