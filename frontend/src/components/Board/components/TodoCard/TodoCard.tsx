'use client';

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { FC } from 'react';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIconRounded.svg';
import s from './styles.module.scss';
import { useBoardStore } from '@/store/BoardStore';
import { Task, TaskStatus } from '@commonTypes/Task';

interface TodoCardProps {
  todo: Task;
  index: number;
  id: TaskStatus;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export const TodoCard: FC<TodoCardProps> = ({
  id,
  todo,
  draggableProps,
  dragHandleProps,
  innerRef,
  index,
}) => {
  const { deleteTodo } = useBoardStore(({ deleteTodo }) => ({ deleteTodo }));

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className={s.card}
    >
      <div className={s.title}>
        <span className={s.titleText}>{todo.title}</span>
        <button
          className={s.deleteBtn}
          onClick={() => deleteTodo(index, todo, id)}
        >
          <SVG src={CloseIcon} />
        </button>
      </div>
    </div>
  );
};
