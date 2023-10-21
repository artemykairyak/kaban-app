'use client';

import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FC, memo, useMemo } from 'react';
import s from './styles.module.scss';
import clsx from 'clsx';
import { TaskCard } from '../TodoCard/TaskCard';
import { useBoardStore } from '@/store/BoardStore';
import { Task, TaskStatus } from '@commonTypes/Task';
import { columnColors } from '@/constants/constants';
import { SVG } from '@/components/ui/SVG/SVG';
import AddTaskIcon from '@/images/icons/addTaskIcon.svg';
import { ColumnColor } from '@/types/types';

interface ColumnProps {
  id: TaskStatus;
  tasks: Task[];
  index: number;
  onEditTask: VoidFunction;
  onAddTask: (columnId: TaskStatus) => void;
  className?: string;
}

const columnName: Record<TaskStatus, string> = {
  done: 'Done',
  todo: 'To Do',
  inProgress: 'In Progress',
};

export const Column: FC<ColumnProps> = memo(
  ({ id, index, tasks, className, onEditTask, onAddTask }) => {
    const { searchString } = useBoardStore(({ searchString }) => ({
      searchString,
    }));

    const todosCount = useMemo(() => {
      return searchString
        ? tasks.filter((todo) =>
            todo.title.toLowerCase().includes(searchString.toLowerCase()),
          ).length
        : tasks.length;
    }, [searchString, tasks.length]);

    const columnColor: ColumnColor = columnColors[id];

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
                style={{
                  background: snapshot.isDraggingOver
                    ? columnColor.trasparent
                    : '',
                  borderColor: snapshot.isDraggingOver
                    ? columnColor.default
                    : '',
                }}
              >
                <div
                  className={s.columnHeader}
                  style={{ borderBottomColor: columnColor.default }}
                >
                  <span
                    className={s.columnColor}
                    style={{ backgroundColor: columnColor.default }}
                  />
                  <h2 className={s.columnTitle}>
                    {columnName[id]}
                    <span className={s.count}>{todosCount}</span>
                  </h2>
                  <button
                    style={{ color: columnColor.default }}
                    className={s.addTaskBtn}
                    onClick={() => onAddTask(id)}
                  >
                    <SVG src={AddTaskIcon} className={s.addTaskIcon} />
                  </button>
                </div>
                <div className={s.cards}>
                  {tasks.map((task, index) => {
                    if (
                      searchString &&
                      !task.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    ) {
                      return null;
                    }
                    return (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                        style={{
                          backgroundColor: snapshot.isDraggingOver ? 'red' : '',
                        }}
                      >
                        {(provided) => {
                          return (
                            <TaskCard
                              task={task}
                              index={index}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              onClick={onEditTask}
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
