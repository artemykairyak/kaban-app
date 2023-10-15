import { columns } from '@/constants/constants';
import s from './styles.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addTaskSchema } from '@/components/Board/components/AddTodoModal/validationSchema';
import { Label } from '@/components/ui/Label/Label';
import clsx from 'clsx';
import { useBoardStore } from '@/store/BoardStore';
import { ListItem, ListItems, Task } from '@commonTypes/Task';
import { useSession } from 'next-auth/react';
import { FC, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { SVG } from '@/components/ui/SVG/SVG';
import CloseIcon from '@/images/closeIcon.svg';

export const TaskModal: FC<{ onClose: VoidFunction }> = ({ onClose }) => {
  const { addTask, updateTask, editingTask } = useBoardStore(
    ({ addTask, updateTask, editingTask }) => ({
      addTask,
      editingTask,
      updateTask,
    }),
  );

  const defaultValues = editingTask ? editingTask : { status: 'todo' };

  console.log('EDITING', editingTask);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    resolver: yupResolver(addTaskSchema),
    defaultValues,
  });

  const [listItems, setListItems] = useState<ListItems>(
    editingTask ? editingTask.list : {},
  );
  const isListItems = useMemo(
    () => !!Object.keys(listItems || {}).length,
    [listItems],
  );

  const { data: session } = useSession();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const task = { ...data, list: listItems } as Task;

    if (editingTask) {
      updateTask(editingTask, editingTask.status);
    } else {
      addTask(session.user.id, task);
    }

    onClose();
  };

  const onAddListItem = () => {
    const newItem: ListItem = {
      checked: false,
      text: '',
    };

    setListItems((prev) => ({
      ...prev,
      [Date.now().toString()]: newItem,
    }));
  };

  const onChangeListItem = (id: string, value: string | boolean) => {
    const newItems = { ...listItems };

    if (typeof value === 'string') {
      newItems[id] = { ...newItems[id], text: value };
    } else {
      newItems[id] = { ...newItems[id], checked: value };
    }

    setListItems(newItems);
  };

  const onDeleteListItem = (id: string) => {
    const newItems = { ...listItems };
    delete newItems[id];

    setListItems(newItems);
  };

  console.log(listItems);

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
        {Object.entries(listItems).map(([id, item]) => {
          return (
            <div className={s.listItem} key={id}>
              <Label className={s.label} htmlFor={`listItem${id}`}>
                <Checkbox
                  checked={item.checked}
                  id={`listItem${id}`}
                  onChange={({ target }) =>
                    onChangeListItem(id, target.checked)
                  }
                />
                <Input
                  name={`listItemInput${id}`}
                  value={item.text}
                  onChange={(v) => onChangeListItem(id, v)}
                  className={s.checkboxInput}
                />
              </Label>
              <Button
                type="button"
                kind="secondary"
                square={true}
                className={s.deleteBtn}
                onClick={() => onDeleteListItem(id)}
              >
                <SVG src={CloseIcon} className={s.deleteIcon} />
              </Button>
            </div>
          );
        })}
        <Button
          kind="secondary"
          onClick={onAddListItem}
          square={isListItems}
          type="button"
        >
          {isListItems ? '+' : 'Add list'}
        </Button>
      </div>
      <div className={s.inputWrapper}>
        <Label className={s.label}>Description</Label>
        <textarea className={s.desc} {...register('description')} />
      </div>
      <Button kind="primary" type="submit">
        {editingTask ? 'Save task' : 'Add task'}
      </Button>
    </form>
  );
};
