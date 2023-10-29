import { formatDate } from '@/utils/utils';
import s from './styles.module.scss';
import { IComment } from '@commonTypes/Comment';
import { FC } from 'react';
import { SVG } from '@/components/ui/SVG/SVG';
import DeleteIcon from '@/images/icons/deleteIcon.svg';

interface CommentProps {
  comment: IComment;
  onDelete: (commentId: string) => void;
}

export const Comment: FC<CommentProps> = ({ comment, onDelete }) => {
  return (
    <div className={s.comment}>
      <div className={s.info}>
        <span className={s.author}>{comment.author}</span>
        <span className={s.date}>
          {formatDate(new Date(comment.createdAt))}
        </span>
      </div>
      <div className={s.content}>
        <pre className={s.text}>{comment.text}</pre>
        <button
          className={s.deleteBtn}
          type="button"
          onClick={() => onDelete(comment.id)}
        >
          <SVG src={DeleteIcon} />
        </button>
      </div>
    </div>
  );
};
