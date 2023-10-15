'use client';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Column } from './components/Column/Column';
import { Modal } from '@/components/Modal/Modal';
import { TaskModal } from '@/components/Board/components/AddTodoModal/TaskModal';
import { Button } from '@/components/ui/Button/Button';
import { IColumn } from '@/types/types';
import { useSession } from 'next-auth/react';

export const Board = () => {
  const { data } = useSession();
  const { board, getBoard, setBoardState, updateTask } = useBoardStore(
    ({ board, getBoard, setBoardState, updateTask }) => ({
      board,
      getBoard,
      setBoardState,
      updateTask,
    }),
  );

  const [openedModal, setOpenedModal] = useState<'add' | 'edit' | ''>('');

  useEffect(() => {
    if (data?.user.id) {
      getBoard(data.user.id);
    }
  }, [getBoard, data?.user]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    console.log(source, destination, type);

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

      updateTask(movedTask, finishCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  const onEditTask = () => {
    setOpenedModal('edit');
  };

  console.log('BOARD', board);

  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <h1>Board</h1>
          <Button kind="primary" onClick={() => setOpenedModal('add')}>
            Add task
          </Button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable direction="horizontal" droppableId="board" type="column">
            {(provided) => (
              <div
                className={s.board}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {[...board.columns.entries()].map(([id, column], index) => {
                  return (
                    <Column
                      id={id}
                      key={id}
                      tasks={column.tasks}
                      index={index}
                      className={s.column}
                      onEditTask={onEditTask}
                    />
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal isOpen={!!openedModal} onClose={() => setOpenedModal('')}>
        <TaskModal onClose={() => setOpenedModal('')} />
      </Modal>
    </>
  );
};
