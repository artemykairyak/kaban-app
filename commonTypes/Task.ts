export type TaskStatus = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  color?: string;
  image?: string;
}
