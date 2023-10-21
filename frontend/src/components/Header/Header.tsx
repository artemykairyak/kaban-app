'use client';
import SearchIcon from '@/images/icons/searchIcon.svg';
import s from './styles.module.scss';
import { Avatar } from '@/components/Header/components/Avatar';
import { useBoardStore } from '@/store/BoardStore';
import { Input } from '@/components/ui/Input/Input';
import { AuthModal } from '@/components/Header/components/AuthModal/AuthModal';
import { Modal } from '@/components/Modal/Modal';
import { useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { signOut, useSession } from 'next-auth/react';
import { HEADER_HEIGHT } from '@/constants/constants';

export const Header = () => {
  useProtectedRoute();

  const { searchString, setSearchString } = useBoardStore(
    ({ searchString, setSearchString }) => ({
      searchString,
      setSearchString,
    }),
  );

  const { data } = useSession();

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const onClickAvatar = () => {
    if (!data?.user) {
      setIsOpenedModal(true);
      return;
    }

    signOut();
  };

  return (
    <>
      <header className={s.header} style={{ height: HEADER_HEIGHT }}>
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
          <Avatar user={data?.user} onClick={onClickAvatar} />
        </div>
      </header>
      <Modal isOpen={isOpenedModal} onClose={() => setIsOpenedModal(false)}>
        <AuthModal />
      </Modal>
    </>
  );
};
