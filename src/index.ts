import express from 'express';
import routes from './routes.js';
import { getConfig } from './config.js';

const app = express();
const config = getConfig();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(config.port, () => {
  console.log(`TaskFlow API running on port ${config.port}`);
  console.log(`Environment: ${config.env}`);
});
