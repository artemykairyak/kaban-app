import { Task, TaskStatus } from '@commonTypes/Task';
import { User } from '@commonTypes/User';

export interface IUser extends User {
  id: string;
}

export interface IColumn {
  id: TaskStatus;
  tasks: Task[];
}

export interface IBoard {
  columns: Map<TaskStatus, IColumn>;
}

export interface TasksData {
  tasks: Task[];
}

export type ColumnColor = { default: string; trasparent: string };
export type ColumnColorObj = Record<TaskStatus, ColumnColor>;
