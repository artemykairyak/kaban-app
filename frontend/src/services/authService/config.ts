import GoogleProvider from 'next-auth/providers/google';
import { IUser } from '@/types/types';
import { instance } from '@/services/apiService/apiService';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user?.email) {
        const { data } = await instance.post<{ user: IUser }>('/getUser', {
          email: session.user.email,
        });

        if (data.user) {
          session.user.id = data.user.id;
        }
      }
      return { ...session, accessToken: token.accessToken };
    },

    async signIn({ profile }) {
      try {
        const { data } = await instance.post<{ user: IUser; token?: string }>(
          '/signIn',
          profile,
        );
        console.log('RESSS', data);

        return true;
      } catch (error) {
        console.log('catsh', error);
        return false;
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
