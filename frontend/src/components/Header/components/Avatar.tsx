import s from './styles.module.scss';
import { IUser } from '@/types/types';
import { FC } from 'react';
import SignInIcon from '../images/signInIcon.svg';
import { SVG } from '@/components/ui/SVG/SVG';

interface AvatarProps {
  user: IUser | null;
  onClick: VoidFunction;
}

const getInitials = (nameSurname: string) => {
  const [name, surname] = nameSurname.split(' ');
  return `${name.slice(0, 1)}${surname.slice(0, 1)}`;
};

export const Avatar: FC<AvatarProps> = ({ user, onClick }) => {
  if (!user) {
    return (
      <button className={s.avatar} onClick={onClick}>
        <SVG src={SignInIcon} className={s.icon} />
      </button>
    );
  }

  return (
    <div className={s.wrapper}>
      <span className={s.name}>{user.name}</span>
      <button className={s.avatar} onClick={onClick}>
        {user.image ? (
          <img
            className={s.img}
            src={user.image}
            alt={`${user.name}'s avatar`}
          />
        ) : (
          <span className={s.initials}>{getInitials(user.name)}</span>
        )}
      </button>
    </div>
  );
};
