import { create, useStore } from 'zustand';
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

  addTask: (userId: string, task: Task, tasksCount: number) => void;
  editingTask: Task & { index: number };
  setEditingTask: (task: Task | null, index?: number) => void;
  updateTask: (
    userId: string,
    task: Task,
    columnId: TaskStatus,
    taskIndex: number,
  ) => void;
  deleteTask: (taskIndex: number, task: Task) => void;
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
  setEditingTask: (task, index?: number) => {
    set(() => {
      if (task) {
        return { editingTask: { ...task, index } };
      }

      return { editingTask: null };
    });
  },
  addTask: async (userId, task, tasksCount) => {
    const newTask: Task = {
      ...task,
      order: tasksCount,
      createdAt: new Date(Date.now()),
    };

    const { data: createdTask } = await instance.post<Task>(
      `/tasks/${userId}`,
      newTask,
    );

    set((state) => {
      const newColumns = new Map(state.board.columns);

      if (createdTask) {
        const columnId = task.status;
        const column = newColumns.get(columnId);

        if (!column) {
          newColumns.set(columnId, {
            id: columnId,
            tasks: [createdTask],
          });
        } else {
          newColumns.get(columnId)?.tasks.push(createdTask);
        }
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
  updateTask: async (userId, task, columnId, taskIndex) => {
    console.log('update', task, columnId, taskIndex);

    const newTask: Task = {
      ...task,
      order: taskIndex,
      status: columnId,
    };

    console.log('NRW', newTask);

    const { data: isSuccess } = await instance.put<boolean>(
      `/tasks/${userId}/${task.id}`,
      newTask,
    );

    const newColumns = new Map(get().board.columns);

    const newTasks = newColumns.get(columnId)?.tasks?.map((item) => {
      if (item.id === newTask.id) {
        return { ...newTask };
      }

      return item;
    });

    const newColumnWithTasks = (newColumns.get(columnId).tasks = newTasks);

    console.log(newColumnWithTasks);

    set((state) => {
      return { board: { ...state.board } };
    });

    console.log('UPD', isSuccess);
    if (!isSuccess) {
      console.log('ERROR UPD');
    }
  },
  deleteTask: async (taskIndex, task) => {
    const { data: isSuccess } = await instance.delete<boolean>(
      `/tasks/${task.id}`,
    );

    if (isSuccess) {
      const newColumns = new Map(get().board.columns);

      newColumns.get(task.status)?.tasks.splice(taskIndex, 1);

      set({ board: { columns: newColumns } });
    }
  },
}));
