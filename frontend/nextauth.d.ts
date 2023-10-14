import { IUser } from '@/types/types';

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }
}
