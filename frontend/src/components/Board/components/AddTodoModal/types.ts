import { TaskStatus } from '@commonTypes/Task';

export interface AddTodoForm {
  title: string;
  status: TaskStatus;
  description: string;
  id?: string;
}
