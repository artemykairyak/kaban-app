import { columns } from '@/constants/constants';
import s from './styles.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addTodoSchema } from '@/components/Board/components/AddTodoModal/validationSchema';
import { Button } from '@/components/ui/Button/Button';
import { Label } from '@/components/ui/Label/Label';
import clsx from 'clsx';
import { useBoardStore } from '@/store/BoardStore';
import { Task } from '@commonTypes/Task';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

export const AddTodoModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    resolver: yupResolver(addTodoSchema),
    defaultValues: { status: 'todo' },
  });

  const { data: session } = useSession();

  const addTodo = useBoardStore((state) => state.addTodo);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('SUBMIT', data);
    addTodo(session.user.id, data as Task);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
      noValidate={true}
    >
      <span className={s.title}>New task</span>
      <div className={s.inputWrapper}>
        <Input
          name="title"
          label="Title"
          register={register}
          isError={!!errors['title']}
        />
      </div>
      <div className={s.inputWrapper}>
        <Label className={s.label}>Status</Label>
        <div className={s.statusList}>
          {columns.map((col) => {
            return (
              <button
                type="button"
                key={col.key}
                className={clsx(s.status, {
                  [s.selected]: getValues('status') === col.key,
                })}
                onClick={() => {
                  setValue('status', col.key, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {col.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className={s.inputWrapper}>
        <Label className={s.label}>Description</Label>
        <textarea className={s.desc} {...register('description')} />
      </div>
      <Button kind="primary" type="submit">
        Add task
      </Button>
    </form>
  );
};
