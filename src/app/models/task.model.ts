export type TaskStatus = 'Completed' | 'Pending' | 'Planned' | 'all';

export interface Task {
  taskId?: string;
  name: string;
  status: TaskStatus;
  date: string;
  description?: string;
}
