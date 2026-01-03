/**
 * Task priority levels
 */
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Task status values
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

/**
 * Represents a task in the system
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
}

/**
 * Input for creating a new task
 */
export interface CreateTaskInput {
  title: string;
  description: string;
  priority?: TaskPriority;
  assignee?: string;
  dueDate?: Date;
}

/**
 * Input for updating an existing task
 */
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  dueDate?: Date;
  tags?: string[];
}

/**
 * Query filters for listing tasks
 */
export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
}
