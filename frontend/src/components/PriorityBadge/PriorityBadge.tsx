import s from './styles.module.scss';
import { Color } from '@/types/types';
import { priorities, priorityColors } from '@/constants/constants';
import { TaskPriority } from '@commonTypes/Task';
import { FC, useMemo } from 'react';
import clsx from 'clsx';

interface PriorityBadgeProps {
  as: 'button' | 'span';
  priority: TaskPriority;
  selected?: boolean;
  onClick?: VoidFunction;
  className?: string;
}

export const PriorityBadge: FC<PriorityBadgeProps> = ({
  priority,
  selected,
  onClick,
  className,
  as,
}) => {
  const priorityTitle = priorities.find((item) => item.key === priority)?.title;
  const buttonColor: Color = priorityColors[priority];

  const styles = useMemo(
    () => ({
      backgroundColor: selected ? buttonColor.default : buttonColor.trasparent,
      color: selected ? 'white' : buttonColor.default,
      borderColor: buttonColor.default,
    }),
    [selected],
  );

  return as === 'button' ? (
    <button
      type="button"
      className={clsx(s.priority, className)}
      onClick={onClick && onClick}
      style={styles}
    >
      {priorityTitle}
    </button>
  ) : (
    <span style={styles} className={clsx(s.priority, className)}>
      {priorityTitle}
    </span>
  );
};
