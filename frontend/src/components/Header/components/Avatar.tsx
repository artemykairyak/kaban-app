import s from './styles.module.scss';
import { User } from '@/types/types';
import { FC } from 'react';
import SignInIcon from '../../images/signInIcon.svg';
import { SVG } from '@/components/ui/SVG/SVG';
import Link from 'next/link';

interface AvatarProps {
  logged: boolean;
  user: User;
}

const getInitials = (name: string, surname: string) => {
  return `${name.slice(0, 1)}${surname.slice(0, 1)}`;
};

export const Avatar: FC<AvatarProps> = ({ user, logged }) => {
  const { name, surname, avatar } = user;

  if (!logged) {
    return (
      <Link href={'/'} className={s.avatar}>
        <SVG src={SignInIcon} className={s.icon} />
      </Link>
    );
  }

  return (
    <Link href={'/'} className={s.avatar}>
      {avatar ? (
        <img
          className={s.img}
          src={user.avatar}
          alt={`${name} ${surname}'s avatar`}
        />
      ) : (
        <span className={s.initials}>{getInitials(name, surname)}</span>
      )}
    </Link>
  );
};
