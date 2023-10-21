import { columns } from '@/constants/constants';
import s from './styles.module.scss';
import { Input } from '@/components/ui/Input/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addTaskSchema } from '@/components/Board/components/AddTodoModal/validationSchema';
import { Label } from '@/components/ui/Label/Label';
import clsx from 'clsx';
import { useBoardStore } from '@/store/BoardStore';
import { ListItem, ListItems, Task, TaskStatus } from '@commonTypes/Task';
import { useSession } from 'next-auth/react';
import { FC, MouseEvent, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { formatDate } from '@/utils/utils';
import { CheckList } from '@/components/Board/components/AddTodoModal/components/CheckList/CheckList';

interface TaskModalProps {
  onClose: VoidFunction;
  status: TaskStatus;
}

export const TaskModal: FC<TaskModalProps> = ({ onClose, status }) => {
  const { addTask, updateTask, editingTask, board, deleteTask } = useBoardStore(
    ({ board, addTask, updateTask, editingTask, deleteTask }) => ({
      board,
      addTask,
      editingTask,
      updateTask,
      deleteTask,
    }),
  );

  const defaultValues = editingTask ? editingTask : { status };

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
      updateTask(session.user.id, task, editingTask.status, task.order);
    } else {
      const tasksCount = board.columns.get(task.status).tasks.length;
      addTask(session.user.id, task, tasksCount);
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

  const onDeleteTask = (e: MouseEvent) => {
    e.stopPropagation();
    deleteTask(editingTask.index, editingTask);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
      noValidate={true}
    >
      <span className={s.title}>{editingTask ? 'Edit task' : 'New task'}</span>
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
        <CheckList listItems={listItems} setListItems={setListItems} />
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
      {editingTask && (
        <Button kind="secondary" type="button" onClick={onDeleteTask}>
          Delete task
        </Button>
      )}
      {editingTask && (
        <span className={s.date}>
          Created: {formatDate(new Date(editingTask.createdAt))}
        </span>
      )}
    </form>
  );
};
