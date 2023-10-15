export type TaskStatus = "todo" | "inProgress" | "done";

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
  color?: string;
  image?: string;
  list?: ListItems;
}
