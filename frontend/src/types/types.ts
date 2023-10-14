import { Task, TaskStatus } from '@commonTypes/Task';
import { User } from '@commonTypes/User';

export interface IUser extends User {
  id: string;
}

export interface IColumn {
  id: TaskStatus;
  todos: Task[];
}

export interface IBoard {
  columns: Map<TaskStatus, IColumn>;
}

export interface TasksData {
  tasks: Task[];
}
