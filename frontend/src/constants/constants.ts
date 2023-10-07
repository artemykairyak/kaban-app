import { getServerSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/navigation';

export const columns: { title: string; key: TypedColumn }[] = [
  { title: 'To do', key: 'todo' },
  { title: 'In progress', key: 'inProgress' },
  { title: 'Done', key: 'done' },
];

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
};
