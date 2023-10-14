import { TaskStatus } from '@commonTypes/Task';

export const columns: { title: string; key: TaskStatus }[] = [
  { title: 'To do', key: 'todo' },
  { title: 'In progress', key: 'inProgress' },
  { title: 'Done', key: 'done' },
];
