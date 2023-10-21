import s from './styles.module.scss';
import { FC, HTMLInputTypeAttribute, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/Label/Label';
import { SVG } from '@/components/ui/SVG/SVG';
import _logger from 'next-auth/utils/logger';

export interface InputProps {
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  icon?: { src: string };
  register?: UseFormRegister<FieldValues>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  validationOptions?: RegisterOptions;
  isError?: boolean;
  className?: string;
}

export const Input: FC<InputProps> = ({
  name,
  className,
  label,
  isError,
  validationOptions,
  register,
  onChange,
  type = 'text',
  icon,
  ...rest
}) => {
  const reg = register ? { ...register(name, { ...validationOptions }) } : {};

  return (
    <div className={s.inputWrapper}>
      {icon && <SVG src={icon} className={s.icon} />}
      {label && <Label htmlFor={name}>{label}</Label>}
      <input
        onChange={(e) => onChange && onChange(e.target.value)}
        type={type}
        name={name}
        className={clsx(s.input, className, {
          [s.error]: isError,
          [s.withIcon]: icon,
        })}
        {...reg}
        {...rest}
      />
    </div>
  );
};
