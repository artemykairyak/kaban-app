'use client';

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { FC } from 'react';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIcon.svg';
import s from './styles.module.scss';

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: TypedColumn;
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
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className={s.card}
    >
      <div className={s.title}>
        <span className={s.titleText}>{todo.title}</span>
        <button className={s.deleteBtn}>
          <SVG src={CloseIcon} />
        </button>
      </div>
    </div>
  );
};