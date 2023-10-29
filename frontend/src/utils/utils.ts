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

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return date.toLocaleDateString('en-US', options);
};

export const cropText = (text: string, maxLength = 103, ellipsis = '...') => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - ellipsis.length) + ellipsis;
  } else {
    return text;
  }
};

export const generateColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
