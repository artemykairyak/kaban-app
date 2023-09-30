interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = 'todo' | 'inProgress' | 'done';

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  id: string;
  title: string;
  status: TypedColumn;
  image?: string;
}
