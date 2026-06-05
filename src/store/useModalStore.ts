import { create } from "zustand";

interface ModalData {
  boardMember?: {
    cardId?: number;
    boardId: number;
    workspaceId?: number;
  };
  workspaceMember?: {
    workspaceId: number;
  };
  boardLabel?: {
    boardId: number;
    cardId?: number;
  };
  boardActivity?: {
    boardId: number;
  };
  boardListForm?: {
    boardId: number;
  };
  cardsArchive?: {
    boardId: number;
  };
}

export type ModalType = keyof ModalData;

interface ModalStore {
  type: ModalType | null;
  data: ModalData[ModalType] | any;
  isOpen: boolean;
  onOpen: <T extends ModalType>(type: T, data: ModalData[T]) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) =>
    set({
      isOpen: true,
      type: type,
      data: data,
    }),
  onClose: () =>
    set({
      isOpen: false,
      type: null,
      data: {},
    }),
}));
