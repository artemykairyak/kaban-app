import s from './styles.module.scss';
import { FC, HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Label } from '@/components/ui/Label/Label';
import { SVG } from '@/components/ui/SVG/SVG';

export interface InputProps extends Partial<HTMLInputElement> {
  name: string;
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
        type={type}
        name={name}
        className={clsx(s.input, className, { [s.error]: isError })}
        {...reg}
        {...rest}
      />
    </div>
  );
};
