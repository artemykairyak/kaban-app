import { create } from 'zustand';
import { getTasksGroupedByColumn } from '@/utils/utils';
import { Task, TaskStatus } from '@commonTypes/Task';
import { BaseResponse, IBoard, IColumn } from '@/types/types';
import { instance } from '@/services/apiService/apiService';
import { useAuthStore } from '@/store/AuthStore';
import { useProjectsStore } from '@/store/ProjectsStore';
import { IComment } from '@commonTypes/Comment';

interface BoardState {
  board: IBoard;
  getBoard: VoidFunction;
  setBoardState: (board: IBoard) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTask: (task: Task) => void;
  editingTask: Task & { index: number };
  getEditingTask: (taskId?: string, index?: number) => void;
  updateTask: (
    userId: string,
    task: Task,
    columnId: TaskStatus,
    taskIndex: number,
  ) => void;
  deleteTask: (task: Task & { index: number }) => void;

  addComment: (comment: string) => Promise<boolean>;
  deleteComment: (commentId: string) => Promise<boolean>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TaskStatus, IColumn>(),
  },
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const userId = useAuthStore.getState().user.id;
    const projectId = useProjectsStore.getState().selectedProject.id;

    const { data } = await instance.get<BaseResponse<Task[]>>(
      `/tasks/${userId}?projectId=${projectId}`,
    );

    if (data.isSuccess) {
      const board = await getTasksGroupedByColumn(data.data);

      set({ board });
    }
  },
  setBoardState: (board) => set({ board }),
  editingTask: null,
  getEditingTask: async (taskId?, index?: number) => {
    if (!taskId) {
      set(() => ({ editingTask: null }));
      return;
    }

    const userId = useAuthStore.getState().user.id;

    const { data } = await instance.get<BaseResponse<Task>>(
      `/tasks/${userId}?taskId=${taskId}`,
    );

    set(() => {
      if (data.isSuccess) {
        return { editingTask: { ...data.data, index } };
      }

      return { editingTask: null };
    });
  },
  addTask: async (task) => {
    const userId = useAuthStore.getState().user.id;
    const tasksCount = useBoardStore.getState().board.columns.get(task.status)
      .tasks.length;
    const projectId = useProjectsStore.getState().selectedProject.id;

    const newTask: Task = {
      ...task,
      order: tasksCount,
      createdAt: new Date(Date.now()),
    };

    const { data: createdTask } = await instance.post<Task>(
      `/tasks/${userId}/${projectId}`,
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
    const filteredList = {};

    for (const key in task.list) {
      const value = task.list[key];

      if (value.text) {
        filteredList[key] = value;
      }
    }

    const newTask: Task = {
      ...task,
      order: taskIndex,
      status: columnId,
      list: filteredList,
    };

    const { data: isSuccess } = await instance.put<boolean>(
      `/tasks/${userId}/${task.id}`,
      newTask,
    );

    const newColumns = new Map(get().board.columns);

    newColumns.get(columnId).tasks = newColumns
      .get(columnId)
      ?.tasks?.map((item) => {
        if (item.id === newTask.id) {
          return { ...newTask };
        }

        return item;
      });

    set((state) => {
      return { board: { ...state.board } };
    });

    if (!isSuccess) {
      console.log('ERROR UPD');
    }
  },
  deleteTask: async (task) => {
    const { data } = await instance.delete<BaseResponse<null>>(
      `/tasks/${task.id}`,
    );

    if (data.isSuccess) {
      const newColumns = new Map(get().board.columns);

      newColumns.get(task.status)?.tasks.splice(task.index, 1);

      set({ board: { columns: newColumns } });
    }
  },
  addComment: async (comment) => {
    const userId = useAuthStore.getState().user.id;
    const taskId = useBoardStore.getState().editingTask.id;

    const { data } = await instance.post<BaseResponse<IComment>>(
      `/comments/${userId}/${taskId}`,
      { text: comment },
    );

    if (data.isSuccess) {
      set((state) => ({
        editingTask: {
          ...state.editingTask,
          comments: [...state.editingTask.comments, data.data],
        },
      }));
    }

    return data.isSuccess;
  },
  deleteComment: async (commentId) => {
    const userId = useAuthStore.getState().user.id;

    const { data } = await instance.delete<BaseResponse<boolean>>(
      `/comments/${userId}/${commentId}`,
    );

    if (data.isSuccess) {
      set((state) => ({
        editingTask: {
          ...state.editingTask,
          comments: state.editingTask.comments.filter(
            (item) => item.id !== commentId,
          ),
        },
      }));
    }

    return data.isSuccess;
  },
}));
