import { columns } from '@/constants/constants';
import s from './styles.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addTodoSchema } from '@/components/Board/components/AddTodoModal/validationSchema';
import { Button } from '@/components/ui/Button/Button';
import { Label } from '@/components/ui/Label/Label';
import clsx from 'clsx';

interface AddTodoForm {
  title: string;
  status: TypedColumn;
  description: string;
}

export const AddTodoModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddTodoForm>({
    resolver: yupResolver(addTodoSchema),
    defaultValues: { status: 'todo' },
  });

  const onSubmit = async (data: AddTodoForm) => {
    console.log(data);
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
                key={col.key}
                className={clsx(s.status, {
                  [s.selected]: getValues('status') === col.key,
                })}
                onClick={() => {
                  setValue('status', col.key);
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
      <Button type="primary">Add task</Button>
    </form>
  );
};
