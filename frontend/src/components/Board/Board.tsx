'use client';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '@/store/BoardStore';
import { useEffect } from 'react';
import s from './styles.module.scss';
import { Column } from './components/Column/Column';

export const Board = () => {
  const { board, getBoard, setBoardState } = useBoardStore(
    ({ board, getBoard, setBoardState }) => ({
      board,
      getBoard,
      setBoardState,
    }),
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    console.log(source, destination, type);

    if (!destination) {
      return;
    }

    if (type === 'column') {
      const entries = [...board.columns.entries()];
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    const columns = [...board.columns];
    const startColIndex = columns[+source.droppableId];
    const finishColIndex = columns[+destination.droppableId];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: Column = {
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
      console.log('equals', startCol.id, finishCol.id);
      newTodos.splice(destination.index, 0, todoMoved);

      const newCol: Column = { id: startCol.id, todos: newTodos };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      console.log('non equals');
      const finishTodos = [...finishCol.todos];
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol: Column = { id: startCol.id, todos: newTodos };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      //todo: update db

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1 className={s.title}>Board</h1>
        <button className={s.addTaskBtn}>Add task</button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable direction="horizontal" droppableId="board" type="column">
          {(provided) => (
            <div
              className={s.board}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Array.from(board.columns.entries()).map(
                ([id, column], index) => {
                  return (
                    <Column
                      id={id}
                      key={id}
                      todos={column.todos}
                      index={index}
                      className={s.column}
                    />
                  );
                },
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
