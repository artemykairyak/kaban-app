'use client';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FC } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import { TodoCard } from '../TodoCard/TodoCard';

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
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={className}
          >
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
                      <span className={s.count}>{todos.length}</span>
                    </h2>
                    <div className={s.cards}>
                      {todos.map((todo, index) => {
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
      }}
    </Draggable>
  );
};
