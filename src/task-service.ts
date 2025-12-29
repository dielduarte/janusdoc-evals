import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilters,
} from './types.js';
import { TaskStatus, TaskPriority } from './types.js';

/**
 * In-memory storage for tasks
 */
const tasks = new Map<string, Task>();

/**
 * Generate a unique task ID
 */
function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a new task
 * @param input - Task creation data
 * @returns The created task
 */
export function createTask(input: CreateTaskInput): Task {
  const id = generateId();
  const now = new Date();

  const task: Task = {
    id,
    title: input.title,
    description: input.description,
    status: TaskStatus.TODO,
    priority: input.priority || TaskPriority.MEDIUM,
    assignee: input.assignee,
    createdAt: now,
    updatedAt: now,
    dueDate: input.dueDate,
  };

  tasks.set(id, task);
  return task;
}

/**
 * Get a task by ID
 * @param id - Task ID
 * @returns The task if found, undefined otherwise
 */
export function getTask(id: string): Task | undefined {
  return tasks.get(id);
}

/**
 * List all tasks with optional filters
 * Results are now sorted by createdAt date (newest first)
 * @param filters - Optional filters to apply
 * @returns Array of tasks matching the filters, sorted by creation date
 */
export function listTasks(filters?: TaskFilters): Task[] {
  let result = Array.from(tasks.values());

  if (filters?.status) {
    result = result.filter((task) => task.status === filters.status);
  }

  if (filters?.priority) {
    result = result.filter((task) => task.priority === filters.priority);
  }

  if (filters?.assignee) {
    result = result.filter((task) => task.assignee === filters.assignee);
  }

  // Sort by creation date, newest first
  result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return result;
}

/**
 * Update an existing task
 * @param id - Task ID
 * @param updates - Fields to update
 * @returns The updated task if found, undefined otherwise
 */
export function updateTask(
  id: string,
  updates: UpdateTaskInput
): Task | undefined {
  const task = tasks.get(id);
  if (!task) {
    return undefined;
  }

  const updatedTask: Task = {
    ...task,
    ...updates,
    updatedAt: new Date(),
  };

  tasks.set(id, updatedTask);
  return updatedTask;
}

/**
 * Delete a task
 * @param id - Task ID
 * @returns true if task was deleted, false if not found
 */
export function deleteTask(id: string): boolean {
  return tasks.delete(id);
}

/**
 * Get count of tasks grouped by status
 * @returns Object with counts for each status
 */
export function getTaskStats(): Record<TaskStatus, number> {
  const stats: Record<TaskStatus, number> = {
    [TaskStatus.TODO]: 0,
    [TaskStatus.IN_PROGRESS]: 0,
    [TaskStatus.DONE]: 0,
  };

  for (const task of tasks.values()) {
    stats[task.status]++;
  }

  return stats;
}
