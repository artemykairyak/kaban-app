import { IComment } from "./Comment";
export type TaskStatus = "todo" | "inProgress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface ListItem {
  text: string;
  checked: boolean;
}

export type ListItems = Record<string, ListItem>;

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  order: number;
  createdAt: Date;
  comments: IComment[];
  priority: TaskPriority;
  color?: string;
  image?: string;
  list?: ListItems;
}
