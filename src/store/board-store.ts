import { create } from 'zustand';

type BoardStore = {
  draggingCard: string | null;
  setDraggingCard: (cardId: string | null) => void;
  draggingColumn: string | null;
  setDraggingColumn: (columnId: string | null) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  draggingCard: null,
  setDraggingCard: (cardId: string | null) => set({ draggingCard: cardId }),
  draggingColumn: null,
  setDraggingColumn: (columnId: string | null) =>
    set({ draggingColumn: columnId }),
}));
