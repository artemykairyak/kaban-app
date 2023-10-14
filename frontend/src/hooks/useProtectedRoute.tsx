import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useProtectedRoute = () => {
  const session = useSession();
  const router = useRouter();

  console.log('SESSION', session);

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  return null;
};
