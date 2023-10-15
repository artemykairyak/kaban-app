import { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import s from './styles.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  checked,
  onChange,
}) => {
  return (
    <input
      className={clsx(s.checkbox, className)}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
