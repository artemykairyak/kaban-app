import { columnColors, columns } from '@/constants/constants';
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
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { formatDate } from '@/utils/utils';
import { CheckList } from '@/components/Board/components/AddTodoModal/components/CheckList/CheckList';
import { useAuthStore } from '@/store/AuthStore';
import { SVG } from '@/components/ui/SVG/SVG';
import CheckListIcon from '@/images/icons/checkListIcon.svg';
import AddIcon from '@/images/icons/addTaskIcon.svg';
import { ColumnColor } from '@/types/types';
import { Comment } from '@/components/Board/components/AddTodoModal/components/Comment/Comment';
import { IComment } from '@commonTypes/Comment';

interface TaskModalProps {
  onClose: VoidFunction;
  status: TaskStatus;
  taskId?: string;
}

export const TaskModal: FC<TaskModalProps> = ({ onClose, status, taskId }) => {
  const user = useAuthStore((state) => state.user);
  const {
    addTask,
    updateTask,
    editingTask,
    deleteTask,
    getEditingTask,
    addComment,
    deleteComment,
  } = useBoardStore((state) => state);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    resolver: yupResolver(addTaskSchema),
  });

  const watchField = watch('status', '');

  const [listItems, setListItems] = useState<ListItems>(
    editingTask ? editingTask.list : {},
  );
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');
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
      addTask(task);
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
    deleteTask(editingTask);
    onClose();
  };

  useEffect(() => {
    if (user && taskId) {
      getEditingTask(taskId);
    }
  }, [user, taskId]);

  useEffect(() => {
    if (editingTask) {
      setComments(editingTask.comments);

      Object.entries(editingTask).forEach(([key, value]) => {
        if (key === 'list') {
          setListItems(value as ListItems);
        }

        setValue(key, value);
      });
    } else {
      setValue('status', status);
    }
  }, [editingTask]);

  const onAddComment = async (comment: string) => {
    const isSuccess = await addComment(comment);

    if (isSuccess) {
      setNewComment('');
    }
  };

  const onDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.form}
      noValidate={true}
    >
      <span className={s.title}>{editingTask ? 'Edit task' : 'New task'}</span>
      <div className={s.formContent}>
        <div className={s.inputs}>
          <div className={s.inputWrapper}>
            <Input
              name="title"
              label="Title"
              register={register}
              isError={!!errors['title']}
            />
          </div>
          <div className={s.inputWrapper}>
            <Label className={s.label}>Description</Label>
            <textarea className={s.desc} {...register('description')} />
          </div>
          <div className={s.inputWrapper}>
            <div className={s.listHeader}>
              <button
                type="button"
                onClick={onAddListItem}
                className={clsx(s.list, { [s.disabled]: isListItems })}
                disabled={isListItems}
              >
                <SVG src={CheckListIcon} className={s.listIcon} />
                <span className={s.listAddLabel}>
                  {isListItems ? 'Checklist' : 'Add checklist'}
                </span>
              </button>
            </div>
            <CheckList
              listItems={listItems}
              setListItems={setListItems}
              onAddListItem={onAddListItem}
            />
          </div>
          {editingTask && (
            <div className={s.comments}>
              <span className={s.commentsTitle}>Comments</span>
              {comments.map((item) => {
                return (
                  <Comment
                    comment={item}
                    key={item.id}
                    onDelete={onDeleteComment}
                  />
                );
              })}
              <div className={s.newComment}>
                <textarea
                  className={clsx(s.desc, s.newCommentInput)}
                  name="newComment"
                  placeholder="Write new comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className={clsx(s.addCommentBtn)}
                  type="button"
                  disabled={!newComment}
                  onClick={() => onAddComment(newComment)}
                >
                  <SVG src={AddIcon} className={s.addCommentIcon} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={s.controls}>
          <div className={s.inputWrapper}>
            <Label className={s.label}>Status</Label>
            <div className={s.statusList}>
              {columns.map(({ key, title }) => {
                const buttonColor: ColumnColor = columnColors[key];
                const selected = watchField === key;

                return (
                  <button
                    type="button"
                    key={key}
                    style={{
                      backgroundColor: selected
                        ? buttonColor.default
                        : buttonColor.trasparent,
                      color: selected ? 'white' : buttonColor.default,
                      borderColor: buttonColor.default,
                    }}
                    className={clsx(s.status, {
                      [s.selected]: selected,
                    })}
                    onClick={() => {
                      setValue('status', key, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  >
                    {title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={s.footer}>
          <Button kind="primary" type="submit">
            {editingTask ? 'Save task' : 'Add task'}
          </Button>
          {editingTask && (
            <Button kind="error" type="button" onClick={onDeleteTask}>
              Delete task
            </Button>
          )}
          {editingTask && (
            <span className={s.date}>
              Created: {formatDate(new Date(editingTask.createdAt))}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
