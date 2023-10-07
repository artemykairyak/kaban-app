import NextAuth from 'next-auth';
import { authConfig } from '@/constants/constants';
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
