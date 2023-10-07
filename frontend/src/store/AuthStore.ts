import { create } from 'zustand';
import { getTodosGroupedByColumn } from '../../utils/utils';
import { is } from '@babel/types';
import { User } from '@/types/types';

interface AuthState {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  user: User | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogged: false,
  user: null,
  setIsLogged: (isLogged) => set({ isLogged }),
  setUser: (user) => set({ user }),
}));
