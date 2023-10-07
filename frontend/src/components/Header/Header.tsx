'use client';
import Logo from './images/logo.svg';
import SearchIcon from './images/search.svg';
import s from './styles.module.scss';
import { Avatar } from '@/components/Header/components/Avatar';
import { useBoardStore } from '@/store/BoardStore';
import { Input } from '@/components/ui/Input/Input';
import { useAuthStore } from '@/store/AuthStore';
import { AuthModal } from '@/components/Header/components/AuthModal/AuthModal';
import { Modal } from '@/components/Modal/Modal';
import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { signOut } from 'next-auth/react';

export const Header = () => {
  useProtectedRoute();

  const { searchString, setSearchString } = useBoardStore(
    ({ searchString, setSearchString }) => ({
      searchString,
      setSearchString,
    }),
  );
  const { isLogged, user } = useAuthStore(({ user, isLogged }) => ({
    user,
    isLogged,
  }));

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  console.log('USER', user);

  const onClickAvatar = () => {
    if (!isLogged) {
      setIsOpenedModal(true);
      return;
    }

    signOut();
  };

  return (
    <>
      <header className={s.header}>
        <a className={s.logo} href="/">
          <img src={Logo.src} alt="Kaban logo" className={s.logoPic} /> Kaban
        </a>
        <div className={s.controls}>
          <form className={s.search}>
            <Input
              name="search"
              placeholder="Search"
              icon={SearchIcon}
              value={searchString}
              onChange={(v) => setSearchString(v)}
            />
          </form>
          <Avatar user={user} onClick={onClickAvatar} />
        </div>
      </header>
      <Modal isOpen={isOpenedModal} onClose={() => setIsOpenedModal(false)}>
        <AuthModal />
      </Modal>
    </>
  );
};
