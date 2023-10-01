import s from '@/components/ui/Input/styles.module.scss';
import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface LabelProps extends PropsWithChildren {
  htmlFor?: string;
  className?: string;
}

export const Label: FC<LabelProps> = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={clsx(s.label, className)}>
      {children}
    </label>
  );
};
