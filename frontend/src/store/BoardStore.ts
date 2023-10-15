import { create } from 'zustand';
import { getTasksGroupedByColumn } from '@/utils/utils';
import { Task, TaskStatus } from '@commonTypes/Task';
import { IBoard, IColumn, TasksData } from '@/types/types';
import { instance } from '@/services/apiService/apiService';

interface BoardState {
  board: IBoard;
  getBoard: (userId: string) => void;
  setBoardState: (board: IBoard) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTask: (userId: string, task: Task) => void;
  editingTask: Task;
  setEditingTask: (id: string, status: TaskStatus) => void;
  updateTask: (task: Task, columnId: TaskStatus) => void;
  deleteTask: (taskIndex: number, task: Task, id: TaskStatus) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TaskStatus, IColumn>(),
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async (userId) => {
    const { data } = await instance.get<TasksData>(`/tasks/${userId}`);

    if (data.tasks) {
      const board = await getTasksGroupedByColumn(data.tasks);

      set({ board });
    }
  },
  setBoardState: (board) => set({ board }),
  editingTask: null,
  setEditingTask: (id, status) => {
    set((state) => {
      const findedTask = state.board.columns
        .get(status)
        .tasks.find((item) => item.id === id);

      if (findedTask) {
        return { editingTask: { ...findedTask } };
      }

      return state;
    });
  },
  addTask: async (userId, task) => {
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
            tasks: [newTask],
          });
        } else {
          newColumns.get(columnId)?.tasks.push(newTask);
        }
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
  updateTask: async (task, columnId) => {
    //  todo: update

    const newTodo = { title: task.title, status: columnId };
  },
  deleteTask: async (taskIndex, task, id) => {
    const { data: isSuccess } = await instance.delete<boolean>(
      `/tasks/${task.id}`,
    );

    if (isSuccess) {
      const newColumns = new Map(get().board.columns);

      newColumns.get(id)?.tasks.splice(taskIndex, 1);

      set({ board: { columns: newColumns } });
    }
  },
}));
