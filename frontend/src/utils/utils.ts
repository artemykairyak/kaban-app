import { Task, TaskStatus } from '@commonTypes/Task';
import { IBoard, IColumn } from '@/types/types';

export const getTasksGroupedByColumn = (tasks: Task[]) => {
  const columns = tasks.reduce((acc, task) => {
    if (!acc.get(task.status)) {
      acc.set(task.status, {
        id: task.status,
        tasks: [],
      });
    }

    acc.get(task.status)!.tasks.push(task);

    return acc;
  }, new Map<TaskStatus, IColumn>());

  const columnTypes: TaskStatus[] = ['todo', 'inProgress', 'done'];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        tasks: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort((a, b) => {
      return columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]);
    }),
  );

  const board: IBoard = {
    columns: sortedColumns,
  };

  return board;
};
