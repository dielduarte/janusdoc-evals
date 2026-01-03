/**
 * Task comment functionality
 */

export interface Comment {
  id: string;
  taskId: string;
  author: string;
  text: string;
  createdAt: Date;
}

const comments = new Map<string, Comment[]>();

function generateCommentId(): string {
  return `comment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function addComment(taskId: string, author: string, text: string): Comment {
  const comment: Comment = {
    id: generateCommentId(),
    taskId,
    author,
    text,
    createdAt: new Date(),
  };

  const taskComments = comments.get(taskId) || [];
  taskComments.push(comment);
  comments.set(taskId, taskComments);

  return comment;
}

export function getComments(taskId: string): Comment[] {
  return comments.get(taskId) || [];
}

export function deleteComment(commentId: string): boolean {
  for (const [taskId, taskComments] of comments.entries()) {
    const index = taskComments.findIndex((c) => c.id === commentId);
    if (index !== -1) {
      taskComments.splice(index, 1);
      return true;
    }
  }
  return false;
}
