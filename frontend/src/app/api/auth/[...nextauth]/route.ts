import NextAuth from 'next-auth';
import { authConfig } from '@/services/authService/config';

const handler = NextAuth(authConfig as any);

export { handler as GET, handler as POST };
