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

export type ColumnColor = { default: string; trasparent: string };
export type ColumnColorObj = Record<TaskStatus, ColumnColor>;

export interface BaseResponse<T> {
  isSuccess: boolean;
  data: T;
}
