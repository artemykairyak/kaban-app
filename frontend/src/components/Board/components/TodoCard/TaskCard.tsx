'use client';

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { FC } from 'react';
import s from './styles.module.scss';
import { useBoardStore } from '@/store/BoardStore';
import { Task } from '@commonTypes/Task';
import { cropText } from '@/utils/utils';
import { PriorityBadge } from '@/components/PriorityBadge/PriorityBadge';
import { SVG } from '@/components/ui/SVG/SVG';
import CommentsIcon from '@/images/icons/commentIcon.svg';

interface TodoCardProps {
  task: Task;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  onClick: VoidFunction;
}

export const TaskCard: FC<TodoCardProps> = ({
  task,
  draggableProps,
  dragHandleProps,
  innerRef,
  index,
  onClick,
}) => {
  const { title, description, priority, comments } = task;

  const { getEditingTask } = useBoardStore(({ getEditingTask }) => ({
    getEditingTask,
  }));

  const onClickTask = () => {
    getEditingTask(task.id, index);
    onClick();
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
      <PriorityBadge priority={priority} className={s.priority} as="span" />
      <div className={s.title}>
        <span className={s.titleText}>{title}</span>
      </div>
      {description && <p className={s.desc}>{cropText(description)}</p>}
      <div className={s.comments}>
        <SVG src={CommentsIcon} className={s.commentsIcon} />
        <span>{comments?.length} comments</span>
      </div>
    </div>
  );
};
