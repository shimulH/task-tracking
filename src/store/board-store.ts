import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type BoardStore = {
  draggingCard: {
    id: string | null;
    columnIndex: number;
    cardIndex: number | null;
  } | null;
  setDraggingCard: (
    id: string | null,
    columnIndex: number,
    cardIndex: number | null
  ) => void;
  draggingColumn: string | null;
  setDraggingColumn: (columnId: string | null) => void;
  boardId: string | null;
  setBoardId: (boardId: string | null) => void;
};

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      draggingCard: { id: null, columnIndex: 0, cardIndex: null },
      setDraggingCard: (
        id: string | null,
        columnIndex: number,
        cardIndex: number | null
      ) => set({ draggingCard: { id, columnIndex, cardIndex } }),
      draggingColumn: null,
      setDraggingColumn: (columnId: string | null) =>
        set({ draggingColumn: columnId }),
      boardId: null,
      setBoardId: (boardId: string | null) => set({ boardId: boardId }),
    }),
    {
      name: 'boardId', // name of the item in the storage (must be unique)

      partialize: (state) => ({ boardId: state.boardId }),
    }
  )
);
