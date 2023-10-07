const cards: Todo[] = [
  {
    id: '1',
    status: 'inProgress',
    title: 'kek',
    description: '111',
  },
  {
    id: '2',
    status: 'todo',
    title: '333',
    description: '111',
  },
  {
    id: '3',
    status: 'done',
    title: '222',
    description: '111',
  },
  {
    id: '5',
    status: 'inProgress',
    title: '1212',
    description: '111',
  },
];

export const getTodosGroupedByColumn = async () => {
  const columns = cards.reduce((acc, todo) => {
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
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ['todo', 'inProgress', 'done'];

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

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
