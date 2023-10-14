import { Task, TaskStatus } from '@commonTypes/Task';
import { IBoard, IColumn } from '@/types/types';

export const getTodosGroupedByColumn = (tasks: Task[]) => {
  const columns = tasks.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      id: todo.id,
      title: todo.title,
      status: todo.status,
      description: todo.description,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TaskStatus, IColumn>());

  const columnTypes: TaskStatus[] = ['todo', 'inProgress', 'done'];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
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
