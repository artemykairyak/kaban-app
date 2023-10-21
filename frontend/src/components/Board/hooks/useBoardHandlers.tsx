import { DropResult } from 'react-beautiful-dnd';
import { IColumn } from '@/types/types';
import { useBoardStore } from '@/store/BoardStore';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { TaskStatus } from '@commonTypes/Task';
export const useBoardHandlers = (session: Session) => {
  const { board, getBoard, setBoardState, updateTask, setEditingTask } =
    useBoardStore(
      ({ board, getBoard, setBoardState, updateTask, setEditingTask }) => ({
        board,
        getBoard,
        setBoardState,
        updateTask,
        setEditingTask,
      }),
    );

  const [openedModal, setOpenedModal] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');

  useEffect(() => {
    if (session?.user.id) {
      getBoard(session.user.id);
    }
  }, [getBoard, session?.user]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    const columns = [...board.columns];
    const startColIndex = columns[+source.droppableId];
    const finishColIndex = columns[+destination.droppableId];

    const startCol: IColumn = {
      id: startColIndex[0],
      tasks: startColIndex[1].tasks,
    };

    const finishCol: IColumn = {
      id: finishColIndex[0],
      tasks: finishColIndex[1].tasks,
    };

    if (!startCol || !finishCol) {
      return;
    }

    if (source.index === destination.index && startCol.id === finishCol.id) {
      return;
    }

    const newTodos = startCol.tasks;
    const [movedTask] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, movedTask);

      const newCol: IColumn = { id: startCol.id, tasks: newTodos };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      updateTask(session?.user.id, movedTask, finishCol.id, destination.index);
      setBoardState({ ...board, columns: newColumns });
    } else {
      const finalTasks = [...finishCol.tasks];
      finalTasks.splice(destination.index, 0, movedTask);

      const newColumns = new Map(board.columns);
      const newCol: IColumn = { id: startCol.id, tasks: newTodos };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        tasks: finalTasks,
      });

      updateTask(session?.user.id, movedTask, finishCol.id, destination.index);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  const onAddTask = (columnId: TaskStatus) => {
    setNewTaskStatus(columnId);
    setOpenedModal(true);
  };

  const onEditTask = () => {
    setOpenedModal(true);
  };

  const onCloseModal = () => {
    setEditingTask(null);
    setOpenedModal(false);
  };

  return {
    handleOnDragEnd,
    onAddTask,
    onEditTask,
    onCloseModal,
    openedModal,
    newTaskStatus,
  };
};
