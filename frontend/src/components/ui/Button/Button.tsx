import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { SVG } from '@/components/ui/SVG/SVG';
import s from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind: 'primary' | 'secondary';
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: VoidFunction;
  icon?: { src: string };
  className?: string;
  iconClassName?: string;
  square?: boolean;
}

export const Button: FC<ButtonProps> = ({
  icon,
  iconClassName,
  className,
  kind,
  loading,
  onClick,
  disabled,
  children,
  square = false,
  ...props
}) => {
  return (
    <button
      className={clsx(
        s.button,
        kind === 'primary' ? s.primaryButton : s.secondaryButton,
        className,
        { [s.square]: square },
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <SVG src={icon} />}
      {children}
    </button>
  );
};
