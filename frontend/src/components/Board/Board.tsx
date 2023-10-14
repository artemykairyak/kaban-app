'use client';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Column } from './components/Column/Column';
import { Modal } from '@/components/Modal/Modal';
import { AddTodoModal } from '@/components/Board/components/AddTodoModal/AddTodoModal';
import { Button } from '@/components/ui/Button/Button';
import { IColumn } from '@/types/types';
import { useSession } from 'next-auth/react';

export const Board = () => {
  const { data } = useSession();
  const { board, getBoard, setBoardState, updateTodo } = useBoardStore(
    ({ board, getBoard, setBoardState, updateTodo }) => ({
      board,
      getBoard,
      setBoardState,
      updateTodo,
    }),
  );

  const [isOpenedModal, setIsOpenedModal] = useState(false);

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
      todos: startColIndex[1].todos,
    };

    const finishCol: IColumn = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) {
      return;
    }

    if (source.index === destination.index && startCol.id === finishCol.id) {
      return;
    }

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);

      const newCol: IColumn = { id: startCol.id, todos: newTodos };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      const finishTodos = [...finishCol.todos];
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol: IColumn = { id: startCol.id, todos: newTodos };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      //todo: update db

      updateTodo(todoMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  console.log('BOARD', board);

  return (
    <>
      <div className={s.container}>
        <div className={s.header}>
          <h1>Board</h1>
          <Button kind="primary" onClick={() => setIsOpenedModal(true)}>
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
                      todos={column.todos}
                      index={index}
                      className={s.column}
                    />
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal isOpen={isOpenedModal} onClose={() => setIsOpenedModal(false)}>
        <AddTodoModal onClose={() => setIsOpenedModal(false)} />
      </Modal>
    </>
  );
};
