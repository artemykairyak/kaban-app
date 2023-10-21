import { TaskStatus } from '@commonTypes/Task';
import { ColumnColorObj } from '@/types/types';

export const columns: { title: string; key: TaskStatus }[] = [
  { title: 'To do', key: 'todo' },
  { title: 'In progress', key: 'inProgress' },
  { title: 'Done', key: 'done' },
];

export const HEADER_HEIGHT = 88;

export const columnColors: ColumnColorObj = {
  todo: { default: '#5030E5', trasparent: 'rgba(80, 48, 229, 0.06)' },
  inProgress: { default: '#FFA500', trasparent: 'rgba(255, 165, 0, 0.06)' },
  done: { default: '#8BC48A', trasparent: 'rgba(139, 196, 138, 0.06)' },
};
