/**
 * Application configuration
 */
export interface Config {
  /** Server port number */
  port: number;
  /** Environment (development, production, test) */
  env: string;
  /** Maximum number of tasks per user */
  maxTasksPerUser: number;
}

/**
 * Get application configuration from environment variables
 */
export function getConfig(): Config {
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    maxTasksPerUser: parseInt(process.env.MAX_TASKS_PER_USER || '100', 10),
  };
}
