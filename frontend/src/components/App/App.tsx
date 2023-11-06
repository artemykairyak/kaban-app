'use client';

import { Header } from '@/components/Header/Header';
import { SessionProvider } from 'next-auth/react';
import { AuthScreen } from '@/components/AuthScreen/AuthScreen';
import s from './styles.module.scss';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useAuthStore } from '@/store/AuthStore';
import { useEffect } from 'react';
import { Board } from '@/components/Board/Board';

export const App = ({ session }) => {
  const { user, setUser } = useAuthStore((state) => state);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <>
      <SessionProvider session={session}>
        {session?.status === 'authenticated' && !user ? (
          'loading'
        ) : (
          <div className={s.layout}>
            <Sidebar />
            <div className={s.wrapper}>
              <Header />
              <div className={s.content}>
                {user ? <Board /> : <AuthScreen />}
              </div>
            </div>
          </div>
        )}
      </SessionProvider>
    </>
  );
};
