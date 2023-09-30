import { create } from 'zustand';
import { getTodosGroupedByColumn } from '../../utils/utils';

interface BoardState {
  board: Board;
  getBoard: VoidFunction;
  setBoardState: (board: Board) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
}));
