import { getServerSession } from 'next-auth';
import { authConfig } from '@/constants/constants';
import { App } from '@/components/App/App';

export default async function Home() {
  const session = await getServerSession(authConfig);

  return (
    <main>
      <App session={session} />
    </main>
  );
}
