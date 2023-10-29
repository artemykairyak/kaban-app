import { getServerSession } from 'next-auth';
import { App } from '@/components/App/App';
import { authConfig } from '@/services/authService/config';

export default async function Home() {
  const session = await getServerSession(authConfig as any);

  return (
    <main>
      <App session={session} />
    </main>
  );
}
