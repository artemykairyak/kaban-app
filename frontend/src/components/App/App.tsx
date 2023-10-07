'use client';

import { FC, useEffect } from 'react';
import { Session } from 'next-auth';
import { Header } from '@/components/Header/Header';
import { Board } from '@/components/Board/Board';
import { useAuthStore } from '@/store/AuthStore';
import { SessionProvider } from 'next-auth/react';
import { User } from '@/types/types';

export const App: FC<{ session: Session | null }> = ({ session }) => {
  const { setUser, setIsLogged } = useAuthStore(({ setUser, setIsLogged }) => ({
    setIsLogged,
    setUser,
  }));

  // useProtectedRoute();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
      setIsLogged(true);
    }
  }, [session]);

  return (
    <>
      <SessionProvider session={session}>
        <Header />
        <Board />
      </SessionProvider>
    </>
  );
};
