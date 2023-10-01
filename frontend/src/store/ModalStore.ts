import { create } from 'zustand';
import { getTodosGroupedByColumn } from '../../utils/utils';

interface ModalState {
  isOpen: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
