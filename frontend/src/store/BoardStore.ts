import { create } from 'zustand';
import { getTodosGroupedByColumn } from '../../utils/utils';

interface BoardState {
  board: Board;
  getBoard: VoidFunction;
  setBoardState: (board: Board) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo, columnId: TypedColumn) => void;
  deleteTodo: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  addTodo: async (todo) => {
    set((state) => {
      const columnId = todo.status;
      const newColumns = new Map(state.board.columns);
      //todo: add to db

      const newTodoFromDb: Todo = { ...todo, id: Date.now().toString() };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodoFromDb],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodoFromDb);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
  updateTodo: async (todo, columnId) => {
    //  todo: update

    const newTodo = { title: todo.title, status: columnId };
  },
  deleteTodo: (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColumns } });

    //  todo: delete in db
  },
}));
