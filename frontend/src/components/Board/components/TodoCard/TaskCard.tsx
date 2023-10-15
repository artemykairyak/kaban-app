'use client';

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { FC, MouseEvent } from 'react';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIconRounded.svg';
import s from './styles.module.scss';
import { useBoardStore } from '@/store/BoardStore';
import { Task, TaskStatus } from '@commonTypes/Task';

interface TodoCardProps {
  task: Task;
  index: number;
  id: TaskStatus;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  onClick: VoidFunction;
}

export const TaskCard: FC<TodoCardProps> = ({
  id,
  task,
  draggableProps,
  dragHandleProps,
  innerRef,
  index,
  onClick,
}) => {
  const { deleteTask, setEditingTask } = useBoardStore(
    ({ deleteTask, setEditingTask }) => ({
      deleteTask,
      setEditingTask,
    }),
  );

  const onClickTask = () => {
    setEditingTask(task.id, task.status);
    onClick();
  };

  const onDeleteTask = (
    e: MouseEvent,
    index: number,
    task: Task,
    id: TaskStatus,
  ) => {
    e.stopPropagation();
    deleteTask(index, task, id);
  };

  return (
    <div
      role="presentation"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className={s.card}
      onClick={onClickTask}
    >
      <div className={s.title}>
        <span className={s.titleText}>{task.title}</span>
        <button
          className={s.deleteBtn}
          onClick={(e) => onDeleteTask(e, index, task, id)}
        >
          <SVG src={CloseIcon} />
        </button>
      </div>
    </div>
  );
};
