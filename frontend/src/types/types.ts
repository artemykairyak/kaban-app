import { Task, TaskPriority, TaskStatus } from '@commonTypes/Task';
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

export type Color = { default: string; trasparent: string };
export type ColumnColorObj = Record<TaskStatus, Color>;
export type PriorityColorObj = Record<TaskPriority, Color>;

export interface BaseResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface Priority {
  title: string;
  key: TaskPriority;
}
