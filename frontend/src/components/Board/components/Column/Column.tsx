'use client';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FC, memo, useMemo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import { TodoCard } from '../TodoCard/TodoCard';
import { useBoardStore } from '@/store/BoardStore';
import { Task, TaskStatus } from '@commonTypes/Task';

interface ColumnProps {
  id: TaskStatus;
  todos: Task[];
  index: number;
  className?: string;
}

const columnName: Record<TaskStatus, string> = {
  done: 'Done',
  todo: 'To Do',
  inProgress: 'In Progress',
};

export const Column: FC<ColumnProps> = memo(
  ({ id, index, todos, className }) => {
    const { searchString } = useBoardStore(({ searchString }) => ({
      searchString,
    }));

    console.log('RERENDER', id, todos);

    const todosCount = useMemo(() => {
      return searchString
        ? todos.filter((todo) =>
            todo.title.toLowerCase().includes(searchString.toLowerCase()),
          ).length
        : todos.length;
    }, [searchString, todos.length]);

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
                          console.log('todo', todo);
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
  },
);

Column.displayName = 'Column';
