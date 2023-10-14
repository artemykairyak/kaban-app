import { create } from 'zustand';
import { getTodosGroupedByColumn } from '@/utils/utils';
import { Task, TaskStatus } from '@commonTypes/Task';
import { IBoard, IColumn, TasksData } from '@/types/types';
import { instance } from '@/services/apiService/apiService';

interface BoardState {
  board: IBoard;
  getBoard: (userId: string) => void;
  setBoardState: (board: IBoard) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTodo: (userId: string, task: Task) => void;
  updateTodo: (todo: Task, columnId: TaskStatus) => void;
  deleteTodo: (taskIndex: number, todo: Task, id: TaskStatus) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TaskStatus, IColumn>(),
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async (userId: string) => {
    const { data } = await instance.get<TasksData>(`/tasks/${userId}`);

    if (data.tasks) {
      const board = await getTodosGroupedByColumn(data.tasks);

      set({ board });
    }
  },
  setBoardState: (board) => set({ board }),
  addTodo: async (userId, task) => {
    const { data: newTask } = await instance.post<Task>(`/tasks/${userId}`, {
      ...task,
    });

    set((state) => {
      const newColumns = new Map(state.board.columns);

      if (newTask) {
        const columnId = task.status;
        const column = newColumns.get(columnId);

        if (!column) {
          newColumns.set(columnId, {
            id: columnId,
            todos: [newTask],
          });
        } else {
          newColumns.get(columnId)?.todos.push(newTask);
        }
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
  deleteTodo: async (taskIndex: number, todo: Task, id: TaskStatus) => {
    const { data: isSuccess } = await instance.delete<boolean>(
      `/tasks/${todo.id}`,
    );

    if (isSuccess) {
      const newColumns = new Map(get().board.columns);

      newColumns.get(id)?.todos.splice(taskIndex, 1);

      set({ board: { columns: newColumns } });
    }
  },
}));
