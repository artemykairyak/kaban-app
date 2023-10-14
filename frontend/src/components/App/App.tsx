'use client';

import { Header } from '@/components/Header/Header';
import { Board } from '@/components/Board/Board';
import { SessionProvider } from 'next-auth/react';
import { AuthScreen } from '@/components/AuthScreen/AuthScreen';
import s from './styles.module.scss';

export const App = ({ session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <div className={s.content}>
          {session?.user ? <Board /> : <AuthScreen />}
        </div>
      </SessionProvider>
    </>
  );
};
