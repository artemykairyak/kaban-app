'use client';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FC, useMemo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import { TodoCard } from '../TodoCard/TodoCard';
import { useBoardStore } from '@/store/BoardStore';

interface ColumnProps {
  id: TypedColumn;
  todos: Todo[];
  index: number;
  className?: string;
}

const columnName: Record<TypedColumn, string> = {
  done: 'Done',
  todo: 'To Do',
  inProgress: 'In Progress',
};

export const Column: FC<ColumnProps> = ({ id, index, todos, className }) => {
  const { searchString } = useBoardStore(({ searchString }) => ({
    searchString,
  }));

  const todosCount = useMemo(() => {
    return searchString
      ? todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchString.toLowerCase()),
        ).length
      : todos.length;
  }, [searchString, todos]);

  return (
    <div className={className}>
      <Droppable droppableId={index.toString()} type="card">
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={clsx(s.column, {
                [s.draggable]: snapshot.isDraggingOver,
              })}
            >
              <h2 className={s.columnTitle}>
                {columnName[id]}
                <span className={s.count}>{todosCount}</span>
              </h2>
              <div className={s.cards}>
                {todos.map((todo, index) => {
                  if (
                    searchString &&
                    !todo.title
                      .toLowerCase()
                      .includes(searchString.toLowerCase())
                  ) {
                    return null;
                  }
                  return (
                    <Draggable
                      draggableId={todo.id}
                      index={index}
                      key={todo.id}
                    >
                      {(provided) => {
                        return (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
