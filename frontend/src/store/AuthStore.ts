import { create } from 'zustand';
import { IUser } from '@/types/types';

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
