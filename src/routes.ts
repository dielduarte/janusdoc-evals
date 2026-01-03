import { Router } from 'express';
import type { Request, Response } from 'express';
import * as taskService from './task-service.js';
import type { CreateTaskInput, UpdateTaskInput, TaskFilters } from './types.js';

const router = Router();

/**
 * POST /tasks - Create a new task
 */
router.post('/tasks', (req: Request, res: Response) => {
  const input: CreateTaskInput = req.body;

  if (!input.title || !input.description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  const task = taskService.createTask(input);
  res.status(201).json(task);
});

/**
 * GET /tasks - List all tasks
 */
router.get('/tasks', (req: Request, res: Response) => {
  const filters: TaskFilters = {
    status: req.query.status as any,
    priority: req.query.priority as any,
    assignee: req.query.assignee as string,
  };

  const tasks = taskService.listTasks(filters);
  res.json(tasks);
});

/**
 * GET /tasks/:id - Get a specific task
 */
router.get('/tasks/:id', (req: Request, res: Response) => {
  const task = taskService.getTask(req.params.id);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  res.json(task);
});

/**
 * PATCH /tasks/:id - Update a task
 */
router.patch('/tasks/:id', (req: Request, res: Response) => {
  const updates: UpdateTaskInput = req.body;
  const task = taskService.updateTask(req.params.id, updates);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  res.json(task);
});

/**
 * DELETE /tasks/:id - Delete a task
 */
router.delete('/tasks/:id', (req: Request, res: Response) => {
  const deleted = taskService.deleteTask(req.params.id);

  if (!deleted) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  res.status(204).send();
});

/**
 * GET /tasks/stats - Get task statistics
 */
router.get('/stats', (req: Request, res: Response) => {
  const stats = taskService.getTaskStats();
  res.json(stats);
});

/**
 * POST /tasks/:id/duplicate - Duplicate an existing task
 */
router.post('/tasks/:id/duplicate', (req: Request, res: Response) => {
  const original = taskService.getTask(req.params.id);

  if (!original) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  const duplicated = taskService.createTask({
    title: `${original.title} (copy)`,
    description: original.description,
    priority: original.priority,
    assignee: original.assignee,
    dueDate: original.dueDate,
  });

  res.status(201).json(duplicated);
});

export default router;
