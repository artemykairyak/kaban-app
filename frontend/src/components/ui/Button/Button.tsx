import { FC, PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import { SVG } from '@/components/ui/SVG/SVG';
import s from './styles.module.scss';

interface ButtonProps extends PropsWithChildren {
  type: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  onClick?: VoidFunction;
  icon?: { src: string };
  className?: string;
  iconClassName?: string;
}

export const Button: FC<ButtonProps> = ({
  icon,
  iconClassName,
  className,
  type,
  loading,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={clsx(
        s.button,
        type === 'primary' ? s.primaryButton : s.secondaryButton,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <SVG src={icon} />}
      {children}
    </button>
  );
};
